import { normalizeText } from "./dom.js"
import { getHubProvider } from "./provider-marks.js"

export const extractSize = (text) => {
  const match = text.match(/(\d[\d.,]*)\s*(GB|MB)\b/i)
  return match ? `${match[1]}${match[2].toUpperCase()}` : ""
}

export const cleanRowTitle = (text, size) => {
  let out = size ? text.replace(size, " ") : text
  out = out.replaceAll(/\[([^[\]]*)\]/g, (_match, inner) => {
    const cleaned = normalizeText(inner.replaceAll(/[-–—|]/g, " "))
    return cleaned ? ` ${cleaned} ` : " "
  })
  // Release labels are decorated with emoji; strip them all, not just the
  // ones seen today.
  out = out.replaceAll(/\p{Extended_Pictographic}/gu, " ")
  out = out.replaceAll(/\s*[-–—|]\s*$/g, "")
  return normalizeText(out)
}

export const RELEASE_PROVIDERS = Object.freeze({
  drive: { label: "Drive", icon: "download" },
  instant: { label: "Instant", icon: "zap" },
  watch: { label: "Watch online", icon: "play" },
  download: { label: "Download", icon: "download" },
})

export const classifyHost = (href) => {
  try {
    const host = new URL(href, location.href).hostname.toLowerCase()
    if (/(?:^|\.)hubdrive\./.test(host)) {
      return "drive"
    }
    if (/(?:^|\.)hubcdn\./.test(host)) {
      return "instant"
    }
    if (/(?:^|\.)(?:playdrive|hdstream4u)\./.test(host)) {
      return "watch"
    }
    return ""
  } catch {
    return ""
  }
}

// A heading anchor counts as a download row only when it points at a known
// file host or its text reads like a download link; this keeps site links
// ("How To Download") and description anchors out of the lists.
export const isReleaseAnchor = (anchor) => {
  try {
    // Download rows always point at absolute external URLs; path-only
    // hrefs are site navigation (How To Download, requests, home).
    if (!/^https?:/i.test(anchor.getAttribute("href") || "")) {
      return false
    }
    const url = new URL(anchor.href, location.href)
    if (url.origin === location.origin) {
      return false
    }
    const text = normalizeText(anchor.textContent)
    return (
      /(?:hubdrive|hubcdn|playdrive|hdstream4u|greenmotors|4khdhub)\./.test(
        url.hostname.toLowerCase()
      ) ||
      /download|watch|trailer|(?:^|[^a-z0-9])(?:2160p|1080p|720p|480p|4k)(?=$|[^a-z0-9])|[\d.]+\s*(?:gb|mb)\b/i.test(
        text
      )
    )
  } catch {
    return false
  }
}

export const parseReleaseAnchor = (anchor) => {
  const text = normalizeText(anchor.textContent)
  const href = anchor.href
  const size = extractSize(text)
  const title = cleanRowTitle(text, size) || text
  const isWatch = /watch|player/i.test(text) || classifyHost(href) === "watch"
  const external = /4khdhub\.one/i.test(href)
  const hubProvider = getHubProvider(href, text)
  return {
    title,
    href,
    size,
    isWatch,
    external,
    audio: "",
    provider: hubProvider,
  }
}

export const classifyEpisodeLink = (anchor) => {
  const text = normalizeText(anchor.textContent)
  const lower = text.toLowerCase()
  let kind = classifyHost(anchor.href)
  if (!kind) {
    if (/watch/.test(lower)) {
      kind = "watch"
    } else {
      kind = "download"
    }
  }
  let host = ""
  try {
    host = new URL(anchor.href, location.href).hostname
  } catch {}
  const provider = RELEASE_PROVIDERS[kind] || RELEASE_PROVIDERS.download
  const hubProvider = getHubProvider(anchor.href, text)
  return {
    href: anchor.href,
    kind,
    icon: provider.icon,
    provider: hubProvider,
    // Provider buttons show the brand mark, so the tooltip names the
    // provider like on 4KHDHub; unbranded actions keep the action label.
    tooltip: hubProvider
      ? hubProvider.name
      : `${provider.label}${host ? ` · ${host}` : ""}`,
  }
}
