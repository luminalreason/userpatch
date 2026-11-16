import { isHubCdnGeneratedPage } from "../hubcdn/detect.js"
import { isHubCloudGeneratedPage } from "../hubcloud/generated-page.js"
import { ensureMirrorGuide } from "../hubcloud/mirror-guide.js"
import { MIRROR_THEMES, wrapDownloadButtons } from "../hubcloud/mirror-rows.js"

export const getGeneratedPage = () => {
  if (isHubCloudGeneratedPage()) {
    return "HubCloud"
  }
  if (isHubCdnGeneratedPage()) {
    return "HubCDN"
  }
  return null
}

const isDownloadHref = (value) => {
  try {
    const url = new URL(value)
    return /^https?:$/.test(url.protocol) && url.href !== location.href
  } catch {
    return false
  }
}

// Use hostname boundaries rather than substring matching: a URL mentioning
// these domains in a query or path must not acquire their server identity.
export const getGeneratedMirrorDetails = (href) => {
  try {
    const host = new URL(href).hostname.toLowerCase()
    if (host === "video-downloads.googleusercontent.com") {
      return { label: "10Gbps Server", variant: "10gbps" }
    }
    if (/(^|\.)(workers\.dev|r2\.dev)$/.test(host)) {
      return { label: "Cloudflare Server", variant: "fsl" }
    }
  } catch {}
  return { label: "Download here", variant: "default" }
}

export const normalizeGeneratedPage = () => {
  const root = document.documentElement
  root.classList.add("userpatch-generated-page")
  const container =
    document.querySelector("#download_container") ||
    document.querySelector("body > main")
  if (!container) {
    return false
  }
  let status = container.querySelector(".userpatch-generated-status")
  if (!status) {
    status = document.createElement("div")
    status.className = "userpatch-generated-status"
    const spinner = document.createElement("progress")
    spinner.className = "userpatch-loading-spinner"
    spinner.setAttribute("aria-label", "Preparing download link")
    status.append(spinner)
    container.prepend(status)
  }
  const button = container.querySelector("a#vd, a#downloadBtn")
  // These templates receive the finished URL in the query string. Their
  // three-second animation does not generate it; do not hold a ready link back.
  const parameter = new URLSearchParams(location.search).get("link")
  if (button && isDownloadHref(parameter)) {
    button.href = parameter
  }
  const ready = Boolean(button && isDownloadHref(button.getAttribute("href")))
  root.dataset.userpatchGeneratedReady = String(ready)
  status.hidden = ready
  if (!ready) {
    return false
  }
  if (!button.classList.contains("userpatch-btn-main")) {
    // The source nests a button in an anchor. Keep the anchor ID for its late
    // URL setter, and let the existing mirror-row helper build the same group.
    button.replaceChildren(document.createTextNode("Download here"))
    button.className = "btn"
    wrapDownloadButtons(container, { preserveIds: true, guide: false })
  }
  const { label, variant } = getGeneratedMirrorDetails(button.href)
  const labelElement = button.querySelector(".userpatch-btn-label")
  if (labelElement && labelElement.textContent !== label) {
    labelElement.textContent = label
  }
  const group = button.closest(".userpatch-btn-group")
  if (group && group.dataset.mirrorType !== variant) {
    const theme = MIRROR_THEMES[variant]
    group.classList.replace(
      `userpatch-group-${group.dataset.mirrorType}`,
      `userpatch-group-${variant}`
    )
    button.classList.replace(
      `userpatch-mirror-${button.dataset.mirrorType}`,
      `userpatch-mirror-${variant}`
    )
    group.dataset.mirrorType = variant
    button.dataset.mirrorType = variant
    group.style.setProperty("--userpatch-btn-bg", theme.bg)
    group.style.setProperty("--userpatch-btn-color", theme.color)
  }
  // Use the same guide placement as the HubCloud mirror list.
  ensureMirrorGuide({ hubCdn: getGeneratedPage() === "HubCDN" })
  return true
}

export const GENERATED_PAGE_CSS = `
html.userpatch-generated-page body {
  display: block !important;
  min-block-size: 100dvh !important;
  background: var(--background) !important;
  color: var(--foreground) !important;
}
html.userpatch-generated-page body > main {
  display: block !important;
  min-block-size: 0 !important;
  width: 100% !important;
  max-width: 42rem !important;
  inline-size: 100% !important;
  max-inline-size: 42rem !important;
  box-sizing: border-box !important;
  margin: 0 auto !important;
  padding: 1rem calc(clamp(0.75rem, 3vw, 1.25rem) + 0.25rem) !important;
}
html.userpatch-generated-page #download_container,
html.userpatch-generated-page #download_container .container.main {
  display: block !important;
  min-block-size: 0 !important;
  width: 100% !important;
  max-width: 100% !important;
  inline-size: 100% !important;
  max-inline-size: 100% !important;
  margin: 0 !important;
  padding: 0 !important;
}
html.userpatch-generated-page :is(.state, .vd) {
  /* A ready link can precede the source's hidden-class removal. Its absolute
     positioning otherwise sizes the button against the wider padding box. */
  position: static !important;
  width: 100% !important;
  inline-size: 100% !important;
  box-sizing: border-box !important;
  margin: 0 !important;
  padding: 0 !important;
  text-align: start !important;
  background: transparent !important;
  box-shadow: none !important;
  border: 0 !important;
  max-inline-size: 100% !important;
}
html.userpatch-generated-page :is(.state .title, .vd h2, #loadingState, .loading, .badge, .wave, footer, .vd > section, .state > center, br, .ads-core-ads) {
  display: none !important;
}
html.userpatch-generated-page[data-userpatch-generated-ready="false"] :is(.vd, #successState) {
  display: none !important;
}
html.userpatch-generated-page[data-userpatch-generated-ready="true"] :is(.vd, #successState) {
  display: block !important;
  /* The source's hidden state also uses opacity/visibility for its fake wait. */
  opacity: 1 !important;
  visibility: visible !important;
  transform: none !important;
  animation: none !important;
  transition: none !important;
  pointer-events: auto !important;
}
html.userpatch-generated-page .userpatch-generated-status:not([hidden]) {
  display: grid !important;
  place-items: center;
  min-block-size: 7rem;
}
html.userpatch-generated-page .userpatch-generated-status[hidden] {
  display: none !important;
}
/* Generator templates animate every circle as a preloader. Keep our icon
   geometry static without changing their actual loading indicator. */
html.userpatch-generated-page svg[data-userpatch-lucide-icon] circle {
  animation: none !important;
  transform: none !important;
  stroke-dasharray: none !important;
  stroke-dashoffset: 0 !important;
  stroke-width: inherit !important;
  will-change: auto !important;
}
html.userpatch-generated-page .userpatch-btn-group {
  margin-block: 0 !important;
}
html.userpatch-generated-page :is(.note, .note-text) {
  display: none !important;
}
`
