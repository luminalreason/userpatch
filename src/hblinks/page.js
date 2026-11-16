import { normalizeText } from "../hdhub4u/dom.js"
import { setDetailTooltipCleanup } from "../hdhub4u/download-rows.js"
import { HUB_PROVIDERS, getHubProvider } from "../hdhub4u/provider-marks.js"
import { setupProviderTooltip } from "../shared/provider-tooltip.js"
import { ensureHblinksBranding } from "./branding.js"

export const isHblinksHost = () =>
  location.hostname.toLowerCase().replace(/^www\./, "") === "hblinks.lol"

export const isHblinksArchiveRoute = () =>
  isHblinksHost() && /^\/archives\/\d+\/?$/.test(location.pathname)

export const getHblinksEntryContent = () =>
  document.querySelector("main#main.site-main article.post .entry-content")

// Download rows are headings that carry quality labels or anchor into the
// Hub* host family. Guides and announcements keep their links inside
// paragraphs, never in headings, so this stays content-based.
const HUB_FAMILY_HOST_PATTERN = /(?:^|\.)hub[a-z]+\./

const isHubFamilyAnchor = (anchor) => {
  try {
    return HUB_FAMILY_HOST_PATTERN.test(
      new URL(anchor.href).hostname.toLowerCase()
    )
  } catch {
    return false
  }
}

const collectHblinksRows = (content) =>
  Array.from(content.querySelectorAll("h2, h3, h4, h5, h6, p")).filter(
    (element) => {
      if (!/^H[2-6]$/.test(element.tagName) && element.tagName !== "P") {
        return false
      }
      const anchors = Array.from(element.querySelectorAll(":scope > a[href]"))
      if (!anchors.length) {
        return false
      }
      return (
        /\b(?:480p|720p|1080p|2160p|4k)\b/i.test(element.textContent || "") ||
        (anchors.every(isHubFamilyAnchor) &&
          (element.tagName !== "P" ||
            anchors.every((anchor) => anchor.querySelector("img"))))
      )
    }
  )

const countRowLinks = (rows) =>
  rows.reduce(
    (count, row) => count + row.querySelectorAll(":scope > a[href]").length,
    0
  )

// Quality headings and image-only provider paragraphs are the two download
// layouts. Require several links so incidental provider mentions stand down.
const isEnoughHblinksRows = (rows) =>
  rows.length >= 2 && countRowLinks(rows) >= 3

export const isHblinksArchivePage = () => {
  if (
    !isHblinksArchiveRoute() ||
    !document.body?.classList.contains("single-post") ||
    !document.querySelector("#masthead.site-header")
  ) {
    return false
  }

  const content = getHblinksEntryContent()
  if (content?.dataset.userpatchHblinksReady === "true") {
    return true
  }
  if (!content) {
    return false
  }

  return isEnoughHblinksRows(collectHblinksRows(content))
}

export const ensureHblinksPage = () => {
  const content = getHblinksEntryContent()
  if (!content) {
    return false
  }
  ensureHblinksBranding()
  if (content.dataset.userpatchHblinksReady === "true") {
    return true
  }

  const rows = collectHblinksRows(content)
  if (!isEnoughHblinksRows(rows)) {
    return false
  }

  const titleText = normalizeText(
    document.title
      .replace(/\s*[–—-]\s*HUBLinks\s*$/i, "")
      .replaceAll(/[._]+/g, " ")
  )
  const episodeMatch = titleText.match(/\bS(\d{1,2})E(\d{1,2})\b/i)
  const displayTitle =
    normalizeText(titleText.replace(/\bS\d{1,2}E\d{1,2}\b/i, "")) ||
    "Download options"

  const pageHeader = document.createElement("header")
  pageHeader.className = "userpatch-hblinks-titlebar"
  const title = document.createElement("h1")
  title.className = "userpatch-hblinks-title"
  title.textContent = displayTitle
  pageHeader.append(title)

  if (episodeMatch) {
    const episode = document.createElement("p")
    episode.className = "userpatch-hblinks-episode"
    const seasonLabel = document.createElement("span")
    seasonLabel.textContent = `Season ${Number(episodeMatch[1])}`
    const episodeLabel = document.createElement("span")
    episodeLabel.textContent = `Episode ${Number(episodeMatch[2])}`
    episode.append(seasonLabel, episodeLabel)
    pageHeader.append(episode)
  }

  // The "Note: use Chrome / iDM / ADM" paragraph is site chrome; drop it.
  const note = Array.from(content.children).find(
    (element) =>
      element.tagName === "P" &&
      /^note\b/i.test(normalizeText(element.textContent))
  )
  note?.remove()

  const options = document.createElement("div")
  options.className = "userpatch-hblinks-options"
  content.append(options)

  const getProviderLabel = (anchor) => {
    let hostname = ""
    try {
      hostname = new URL(anchor.href).hostname.toLowerCase()
    } catch {}
    if (hostname.endsWith("hubdrive.blog")) {
      return "Drive"
    }
    if (hostname.endsWith("hubcdn.club")) {
      return "Instant"
    }
    if (hostname.endsWith("hubcloud.pw")) {
      return "Direct"
    }
    return "Open link"
  }

  for (const row of rows) {
    const anchors = Array.from(row.querySelectorAll(":scope > a[href]"))
    const firstAnchor = anchors[0]
    let leadingText = ""
    for (const child of row.childNodes) {
      if (
        child === firstAnchor ||
        (child instanceof Element && child.contains(firstAnchor))
      ) {
        break
      }
      leadingText += child.textContent || ""
    }

    const heading = normalizeText(leadingText).replace(/[\s|–—:-]+$/, "")
    const isStandaloneLink = !heading
    const optionTitle = document.createElement("span")
    optionTitle.className = "userpatch-hblinks-option-title"
    optionTitle.textContent =
      heading ||
      normalizeText(firstAnchor.textContent) ||
      getHubProvider(firstAnchor.href, "")?.name ||
      getProviderLabel(firstAnchor)

    const actions = document.createElement("span")
    actions.className = "userpatch-hblinks-actions"
    const providerOrder = (anchor) => {
      const provider = getHubProvider(anchor.href, anchor.textContent)
      const index = HUB_PROVIDERS.indexOf(provider)
      return index < 0 ? HUB_PROVIDERS.length : index
    }
    anchors.sort((a, b) => providerOrder(a) - providerOrder(b))
    for (const anchor of anchors) {
      anchor.classList.add("userpatch-hblinks-action")
      const hubProvider = getHubProvider(anchor.href, anchor.textContent)
      if (hubProvider) {
        // Branded pills carry the provider mark, matching the detail rows;
        // the name feeds the shared hover tooltip and the accessible label.
        const image = document.createElement("img")
        image.src = hubProvider.logo
        image.alt = ""
        image.width = 36
        image.height = 36
        image.decoding = "async"
        anchor.replaceChildren(image)
        anchor.dataset.tooltip = hubProvider.name
        anchor.setAttribute("aria-label", hubProvider.name)
      } else if (isStandaloneLink) {
        anchor.textContent = getProviderLabel(anchor)
      }
      if (anchor.target === "_blank") {
        anchor.relList.add("noopener", "noreferrer")
      }
      actions.append(anchor)
    }

    row.classList.add("userpatch-hblinks-option-row")
    row.replaceChildren(optionTitle, actions)
    options.append(row)
  }

  // Only remove emptied wrappers from the image-link layout.
  for (const wrapper of content.querySelectorAll(":scope > div")) {
    if (
      !wrapper.querySelector("a, img") &&
      !normalizeText(wrapper.textContent)
    ) {
      wrapper.remove()
    }
  }
  content.prepend(pageHeader)
  for (const separator of content.querySelectorAll(":scope > hr")) {
    separator.remove()
  }
  content.dataset.userpatchHblinksReady = "true"
  setDetailTooltipCleanup(setupProviderTooltip(content))
  return true
}
