import { getGeneratedPage } from "../shared/generated-page.js"
import { HUBCDN_LOGO_DATA_URI } from "../shared/provider-logos.js"
import {
  COLOR_SCHEME_META_ID,
  CONFIG,
  GOOGLE_FONT_STYLE_ID,
  HEADER_ID,
  STYLE_ID,
  THEME_COLOR_META_ID,
} from "./config.js"
import { REDESIGN_CSS } from "./css.js"
import { isCloudflareChallenge } from "./detect.js"
import { HUBCLOUD_LOGO_DATA_URI } from "./icons.js"

export const ensureThemeMetadata = () => {
  let colorSchemeMeta = document.getElementById(COLOR_SCHEME_META_ID)
  if (!colorSchemeMeta) {
    colorSchemeMeta = document.createElement("meta")
    colorSchemeMeta.id = COLOR_SCHEME_META_ID
    colorSchemeMeta.name = "color-scheme"
    colorSchemeMeta.content = "dark"
    document.head?.append(colorSchemeMeta)
  }

  let themeColorMeta = document.getElementById(THEME_COLOR_META_ID)
  if (!themeColorMeta) {
    themeColorMeta = document.createElement("meta")
    themeColorMeta.id = THEME_COLOR_META_ID
    themeColorMeta.name = "theme-color"
    themeColorMeta.content = CONFIG.themeColor
    document.head?.append(themeColorMeta)
  }
}

export const ensureFavicon = () => {
  try {
    const logoUri =
      getGeneratedPage() === "HubCDN"
        ? HUBCDN_LOGO_DATA_URI
        : HUBCLOUD_LOGO_DATA_URI
    const head = document.head || document.documentElement
    if (!head) {
      return
    }
    const existingIcons = document.querySelectorAll(
      "link[rel~='icon' i], link[rel='shortcut icon' i], link[rel='apple-touch-icon' i]"
    )
    let hasValidIcon = false
    for (const el of existingIcons) {
      if (el.getAttribute("href") === logoUri) {
        hasValidIcon = true
      } else {
        el.remove()
      }
    }
    if (!hasValidIcon) {
      const link = document.createElement("link")
      link.rel = "icon"
      link.type = "image/svg+xml"
      link.href = logoUri
      head.append(link)

      const shortcut = document.createElement("link")
      shortcut.rel = "shortcut icon"
      shortcut.type = "image/png"
      shortcut.href = logoUri
      head.append(shortcut)
    }
  } catch {}
}

export const ensureStyles = () => {
  try {
    if (!document.body || isCloudflareChallenge()) {
      return false
    }

    const styleTarget = document.head || document.documentElement
    if (!styleTarget) {
      return false
    }

    if (!document.getElementById(GOOGLE_FONT_STYLE_ID)) {
      const googleFont = document.createElement("link")
      googleFont.id = GOOGLE_FONT_STYLE_ID
      googleFont.rel = "stylesheet"
      googleFont.href = CONFIG.googleFontUrl
      styleTarget.append(googleFont)
    }

    ensureThemeMetadata()
    ensureFavicon()

    const existingStyle = document.getElementById(STYLE_ID)
    if (existingStyle) {
      return true
    }

    const style = document.createElement("style")
    style.id = STYLE_ID
    style.textContent = REDESIGN_CSS
    styleTarget.append(style)
    return true
  } catch {
    return false
  }
}

export const ensureHeader = () => {
  if (!document.body) {
    return
  }

  const provider = getGeneratedPage() || CONFIG.brandName
  const logoUri =
    provider === "HubCDN" ? HUBCDN_LOGO_DATA_URI : HUBCLOUD_LOGO_DATA_URI
  const existing = document.getElementById(HEADER_ID)
  if (existing) {
    const logo = existing.querySelector("img")
    const name = existing.querySelector(".userpatch-brand-name")
    if (logo && logo.src !== logoUri) {
      logo.src = logoUri
    }
    if (name && name.textContent !== provider) {
      name.textContent = provider
    }
    return
  }
  const header = document.createElement("header")
  header.id = HEADER_ID
  header.className = "userpatch-hubcloud-header"

  const brand = document.createElement("div")
  brand.className = "userpatch-brand-container"

  const logo = document.createElement("img")
  logo.className = "userpatch-brand-logo"
  logo.src = logoUri
  logo.alt = ""
  logo.width = CONFIG.logoWidth
  logo.height = CONFIG.logoHeight

  const name = document.createElement("span")
  name.className = "userpatch-brand-name"
  name.textContent = provider

  brand.append(logo, name)
  header.append(brand)
  document.body.prepend(header)
}
