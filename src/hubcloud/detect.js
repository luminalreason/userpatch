import { getGeneratedPage } from "../shared/generated-page.js"
import { getGeneratedDirectDownloadButton } from "./action-buttons.js"
import { isHubCloudPackPage } from "./pack-page.js"

export const isCloudflareChallenge = () => {
  try {
    return (
      location.pathname.startsWith("/cdn-cgi/challenge-platform/") ||
      /^(Just a moment|Attention Required|Checking your browser)/i.test(
        document.title || ""
      ) ||
      Boolean(
        document.querySelector(
          "#challenge-form, #challenge-running, #cf-challenge-running"
        )
      )
    )
  } catch {
    return true
  }
}

export const isDirectFileLink = (url) => {
  try {
    const parsed = new URL(url)
    const host = parsed.hostname.toLowerCase()
    if (
      /(^|\.)r2\.dev$/.test(host) ||
      /(^|\.)cloudflarestorage\.com$/.test(host)
    ) {
      return true
    }
    return /\.(mkv|mp4|avi|mov|webm|ts|m2ts|zip|rar|7z|iso|mp3|flac)(\?|#|$)/i.test(
      parsed.pathname
    )
  } catch {
    return false
  }
}

export const isHubCloudDownloadUrl = (value) => {
  try {
    const url = new URL(value, location.href)
    return (
      /^https?:$/.test(url.protocol) &&
      url.pathname === "/hubcloud.php" &&
      /^(hubcloud|hubvid)$/.test(url.searchParams.get("host")) &&
      /^[a-z0-9_]+$/i.test(url.searchParams.get("id") || "") &&
      Boolean(url.searchParams.get("token")?.trim())
    )
  } catch {
    return false
  }
}

// The endpoint survives URL masking in the navigation entry, including video hops.
export const isDownloadPage = (() => {
  try {
    const url = new URL(
      performance.getEntriesByType("navigation")[0]?.name || location.href
    )
    return url.origin === location.origin && isHubCloudDownloadUrl(url.href)
  } catch {
    return false
  }
})()

export const hasHubCloudDomSignatures = (root = document) => {
  if (getGeneratedPage() || isHubCloudPackPage(root)) {
    return true
  }
  const card = root.querySelector("#section2 .card, .main > .card")
  const hasFileDetails = Boolean(
    card?.querySelector(".card-header") &&
    card.querySelector(".list-group-item")
  )
  // File metadata must accompany a tokenized HubCloud handoff; share inputs vary.
  return Boolean(
    hasFileDetails && (isDownloadPage || getGeneratedDirectDownloadButton(root))
  )
}
