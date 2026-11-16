import {
  HUBCLOUD_LOGO_DATA_URI,
  HUBDRIVE_LOGO_DATA_URI,
} from "../shared/provider-logos.js"

export const RELEASE_PROVIDER_ORDER = Object.freeze(["HubCloud", "HubDrive"])

export const createReleaseActions = (sourceContainer) => {
  const actions = document.createElement("div")
  actions.className = "userpatch-release-actions"
  const providers = new Map()

  for (const sourceLink of sourceContainer.querySelectorAll("a[href]")) {
    const sourceLabel = sourceLink.textContent.toLowerCase()
    let provider = ""
    if (sourceLabel.includes("hubcloud")) {
      provider = "HubCloud"
    } else if (sourceLabel.includes("hubdrive")) {
      provider = "HubDrive"
    }
    if (!provider) {
      return null
    }

    let url
    try {
      url = new URL(sourceLink.href, location.href)
    } catch {
      return null
    }
    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return null
    }
    const existingLink = providers.get(provider)
    if (existingLink) {
      if (existingLink.href !== url.href) {
        return null
      }
      continue
    }

    const anchor = document.createElement("a")
    anchor.className = "userpatch-provider-link"
    anchor.href = url.href
    anchor.target = "_blank"
    anchor.rel = "noopener noreferrer"
    anchor.dataset.tooltip = provider
    anchor.setAttribute("aria-label", provider)

    const logo = document.createElement("img")
    logo.src =
      provider === "HubCloud" ? HUBCLOUD_LOGO_DATA_URI : HUBDRIVE_LOGO_DATA_URI
    logo.alt = ""
    logo.width = 36
    logo.height = 36
    logo.decoding = "async"
    anchor.append(logo)
    providers.set(provider, anchor)
  }

  for (const provider of RELEASE_PROVIDER_ORDER) {
    const anchor = providers.get(provider)
    if (anchor) {
      actions.append(anchor)
    }
  }
  return actions.childElementCount ? actions : null
}
