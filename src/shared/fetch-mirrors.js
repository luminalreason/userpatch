import { isDirectFileLink, isHubCloudDownloadUrl } from "../hubcloud/detect.js"
import {
  cleanMirrorLabel,
  getButtonVariant,
  isWatchOnlineButton,
  wrapDownloadButtons,
} from "../hubcloud/mirror-rows.js"

const providerHosts = new Set([
  "greenmotors.club",
  "greenmotors.cc",
  "hubcloud.mov",
  "hubcloud.pw",
  "hubdrive.blog",
  "hubdrive.bar",
  "gamerxyt.com",
])

const httpsUrl = (value, base) => {
  try {
    const url = new URL(value, base)
    return url.protocol === "https:" &&
      !url.username &&
      !url.password &&
      !url.port
      ? url
      : null
  } catch {
    return null
  }
}

const providerUrl = (value, base) => {
  const url = httpsUrl(value, base)
  if (!url || !providerHosts.has(url.hostname) || isDirectFileLink(url.href)) {
    return null
  }
  if (url.hostname === "gamerxyt.com" && !isHubCloudDownloadUrl(url.href)) {
    return null
  }
  return url
}

const canonicalShareUrl = (value, base) => {
  const share = httpsUrl(value, base)
  if (!share) {
    return null
  }
  if (
    /^hubcloud\.[a-z]+$/.test(share.hostname) &&
    /^\/drive\/[a-z0-9]{15}\/?$/i.test(share.pathname)
  ) {
    share.hostname = "hubcloud.pw"
    return share
  }
  if (
    /^hubdrive\.[a-z]+$/.test(share.hostname) &&
    /^\/file\/\d+\/?$/.test(share.pathname)
  ) {
    share.hostname = "hubdrive.bar"
    return share
  }
  return null
}

// The initial relay response carries the same static share destination that
// Hub Helper reads. Resolve only a recognized HubCloud or HubDrive share.
const getRelayShareUrl = ({ root, url }) => {
  if (
    !/^greenmotors\.(?:club|cc)$/.test(url.hostname) ||
    !url.searchParams.has("id")
  ) {
    return null
  }
  for (const script of root.querySelectorAll("script:not([src])")) {
    const payload = script.textContent.match(
      /\bs\(\s*['"]o['"]\s*,\s*['"]([A-Za-z0-9+/=]+)['"]/
    )?.[1]
    if (!payload) {
      continue
    }
    try {
      const decoded = atob(atob(payload)).replaceAll(/[a-z]/gi, (char) => {
        const start = char <= "Z" ? 65 : 97
        return String.fromCharCode(
          start + ((char.charCodeAt(0) - start + 13) % 26)
        )
      })
      const share = canonicalShareUrl(atob(JSON.parse(atob(decoded)).o))
      if (share) {
        return share
      }
    } catch {
      // A malformed payload might be unrelated to the requested release.
    }
  }
  return null
}

const readProviderPage = async (url, streamHandoff = false) => {
  if (!url || typeof GM_xmlhttpRequest !== "function") {
    return null
  }

  return await new Promise((resolve) => {
    const maxBytes = 768 * 1024
    const request = GM_xmlhttpRequest({
      method: "GET",
      url: url.href,
      anonymous: true,
      timeout: 6500,
      responseType: "text",
      headers: { Accept: "text/html" },
      onprogress: ({ loaded }) => {
        if (loaded > maxBytes) {
          resolve(null)
          request.abort()
        }
      },
      onload: (response) => {
        const finalUrl = streamHandoff
          ? httpsUrl(response.finalUrl || url.href)
          : providerUrl(response.finalUrl || url.href)
        if (
          !finalUrl ||
          response.status !== 200 ||
          !/^content-type:\s*(?:text\/html|application\/xhtml\+xml)\b/im.test(
            response.responseHeaders || ""
          ) ||
          typeof response.responseText !== "string" ||
          response.responseText.length > maxBytes
        ) {
          resolve(null)
          return
        }

        // Keep provider markup inert. The only elements added to the page
        // are new anchors built from validated URLs and plain-text labels.
        const template = document.createElement("template")
        template.innerHTML = response.responseText
        const root = template.content
        const title = root.querySelector("title")?.textContent || ""
        if (
          /just a moment|attention required|mediator page|checking your browser/i.test(
            title
          ) ||
          root.querySelector(
            "#challenge-form, #challenge-running, #cf-challenge-running"
          )
        ) {
          resolve({ requiresBrowser: true })
          return
        }
        resolve({ root, url: finalUrl })
      },
      onerror: () => resolve(null),
      onabort: () => resolve(null),
      ontimeout: () => resolve(null),
    })
  }).catch(() => null)
}

export const resolveProviderShare = async (href, provider) => {
  const host = provider === "HubCloud" ? "hubcloud.pw" : "hubdrive.bar"
  const direct = canonicalShareUrl(href)
  if (direct?.hostname === host) {
    return direct
  }

  const page = await readProviderPage(direct || providerUrl(href))
  if (!page?.root) {
    return null
  }
  const share = getRelayShareUrl(page) || canonicalShareUrl(page.url.href)
  if (share?.hostname === host) {
    return share
  }

  const targetPage =
    share && share.href !== page.url.href ? await readProviderPage(share) : page
  for (const anchor of targetPage?.root?.querySelectorAll("a[href]") || []) {
    const linkedShare = canonicalShareUrl(
      anchor.getAttribute("href"),
      targetPage.url.href
    )
    if (linkedShare?.hostname === host) {
      return linkedShare
    }
  }
  return null
}

export const resolvePlayableMirror = async (mirror) => {
  if (mirror.variant !== "10gbps") {
    return mirror
  }
  const wrapper = httpsUrl(mirror.url)
  if (
    !wrapper ||
    !wrapper.searchParams.get("id") ||
    isDirectFileLink(wrapper.href)
  ) {
    return mirror
  }

  const page = await readProviderPage(wrapper, true)
  if (
    !page?.root?.querySelector("main #loadingState.state") ||
    !/hubcloud/i.test(
      page.root.querySelector("header .logo-text")?.textContent || ""
    ) ||
    !page.root.querySelector("a#vd, a#downloadBtn")
  ) {
    return mirror
  }
  // The generator template carries the finished URL in its query. Leave
  // the media request to the user's player or browser.
  const playable = httpsUrl(page.url.searchParams.get("link"))
  return playable &&
    playable.href !== page.url.href &&
    playable.href !== wrapper.href
    ? { ...mirror, url: playable.href, playable: true }
    : mirror
}

const getMirrors = (page, requestedDownload = false) => {
  const { root, url } = page
  const card = root.querySelector("#section2 .card, .main > .card")
  if (
    !card?.querySelector(".card-header") ||
    !card.querySelector(".list-group-item") ||
    !(
      requestedDownload ||
      /^(?:hubcloud)\./i.test(url.hostname) ||
      isHubCloudDownloadUrl(url.href)
    )
  ) {
    return []
  }

  const mirrors = new Map()
  for (const link of root.querySelectorAll(
    "a.btn[href], a[id^=pxl][href], a:is(#fsl, #fsl2, #s3, #tgbtn)[href]"
  )) {
    const mirror = httpsUrl(link.getAttribute("href"), url.href)
    const label = cleanMirrorLabel(link.textContent)
    const variant = getButtonVariant(link)
    if (
      mirror &&
      label &&
      !isWatchOnlineButton(link) &&
      (variant !== "default" || isDirectFileLink(mirror.href)) &&
      !mirrors.has(mirror.href)
    ) {
      mirrors.set(mirror.href, {
        url: mirror.href,
        label,
        id: link.id,
        variant,
      })
    }
  }
  return [...mirrors.values()]
}

export const fetchReleaseMirrors = async (providers) => {
  const visited = new Set()
  let requiresBrowser = false
  const readChain = async (url, remaining) => {
    if (!url || !remaining || visited.has(url.href)) {
      return null
    }
    visited.add(url.href)
    const page = await readProviderPage(url)
    if (!page) {
      return null
    }
    if (page.requiresBrowser) {
      requiresBrowser = true
      return null
    }
    const share = getRelayShareUrl(page)
    if (share) {
      return readChain(share, remaining - 1)
    }
    const mirrors = getMirrors(page)
    if (mirrors.length) {
      return mirrors
    }
    for (const link of page.root.querySelectorAll("a[href]")) {
      const candidate = providerUrl(link.getAttribute("href"), page.url.href)
      if (
        candidate &&
        ((isHubCloudDownloadUrl(candidate.href) &&
          (candidate.hostname === page.url.hostname ||
            candidate.hostname === "gamerxyt.com") &&
          /generate\s+(?:direct\s+)?download\s+link/i.test(link.textContent)) ||
          (candidate.hostname.startsWith("hubcloud.") &&
            /hub\s*cloud/i.test(link.textContent))) &&
        !visited.has(candidate.href)
      ) {
        return readChain(candidate, remaining - 1)
      }
    }
    return null
  }

  const mirrors =
    (await readChain(providerUrl(providers.get("HubCloud")?.href), 4)) ||
    (await readChain(providerUrl(providers.get("HubDrive")?.href), 4)) ||
    []
  return { mirrors, requiresBrowser }
}

// A share page supplies the tokenized action. Its response still has to
// match the HubCloud file card before any links are read.
export const fetchHubCloudMirrors = async (href) => {
  const url = httpsUrl(href)
  if (!url || !isHubCloudDownloadUrl(url.href)) {
    return { mirrors: [], requiresBrowser: false }
  }
  const page = await readProviderPage(url, true)
  return {
    mirrors: page?.root ? getMirrors(page, true) : [],
    requiresBrowser: Boolean(page?.requiresBrowser),
  }
}

export const renderFetchedMirrors = (output, mirrors, onOpen) => {
  output.replaceChildren()
  for (const { url, label, id, playable } of mirrors) {
    const link = document.createElement("a")
    link.href = url
    link.target = "_blank"
    link.rel = "noopener noreferrer"
    link.dataset.noSwup = ""
    link.dataset.originalId = id
    if (playable) {
      link.dataset.userpatchDirectMirror = "true"
    }
    link.className = "btn"
    link.textContent = label
    if (onOpen) {
      link.addEventListener("click", () => onOpen(url))
    }
    output.append(link)
  }
  wrapDownloadButtons(output, { guide: false })
  return output.querySelector(".userpatch-btn-group") !== null
}
