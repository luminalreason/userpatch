// Interface:
// Exports: HUBCDN_LOGO_DATA_URI, HUB_PROVIDERS, getHubProvider
// Options: getHubProvider takes a link URL and optional label for masked hosts.
// Invariants: rotating host prefixes win over labels; provider entries are frozen.
// Error modes: malformed URLs fall back to labels; unknown providers return null.

import {
  HUBCDN_LOGO_DATA_URI,
  HUBCLOUD_LOGO_DATA_URI,
  HUBDRIVE_LOGO_DATA_URI,
} from "../shared/provider-logos.js"

export { HUBCDN_LOGO_DATA_URI } from "../shared/provider-logos.js"

export const HUB_PROVIDERS = Object.freeze([
  Object.freeze({
    name: "HubCloud",
    slug: "hubcloud",
    logo: HUBCLOUD_LOGO_DATA_URI,
  }),
  Object.freeze({
    name: "HubDrive",
    slug: "hubdrive",
    logo: HUBDRIVE_LOGO_DATA_URI,
  }),
  Object.freeze({ name: "HubCDN", slug: "hubcdn", logo: HUBCDN_LOGO_DATA_URI }),
])

/**
 * Resolves a download link to its provider entry. Host prefixes win because
 * the domains rotate TLDs constantly (hubcloud.pw, hubcloud.mov, ...); when
 * the host is masked by a redirect service, a provider name in the link
 * text is still identifiable. Returns null for anything else.
 */
export const getHubProvider = (href, text = "") => {
  let host = ""
  try {
    host = new URL(href, location.href).hostname.toLowerCase()
  } catch {}
  for (const provider of HUB_PROVIDERS) {
    if (new RegExp(`(?:^|\\.)${provider.slug}\\.`).test(host)) {
      return provider
    }
  }
  const label = text.toLowerCase()
  for (const provider of HUB_PROVIDERS) {
    if (label.includes(provider.slug)) {
      return provider
    }
  }
  return null
}
