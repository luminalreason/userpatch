// Interface:
// Exports: initMaiaStyles, MAIA_CLASS, FONT_STYLESHEET_URL, ensureStyles
// Options: initMaiaStyles receives the site's context once — styleId, fontStyleId, colorSchemeMetaId, themeColorMetaId, themeColor, css (the site's MAIA_CSS), siteSignature predicate, and an optional preInject hook (4K-HDHub's system theme sync).
// Invariants: managed meta adopt/restore; the signature gate runs before any style install.
// Error modes: returns false (no styles) when the signature fails or DOM access throws.

import { isCloudflareChallenge } from "./cloudflare.js"
import { ensureSystemTheme } from "./system-theme.js"

let maiaStyles = null

export const initMaiaStyles = (context) => {
  maiaStyles = context
}

export const MAIA_CLASS = "userpatch-maia"

export const FONT_STYLESHEET_URL =
  "https://cdn.jsdelivr.net/npm/@fontsource-variable/inter@5.3.0/index.css"

export const ensureStyles = () => {
  try {
    if (isCloudflareChallenge() || !maiaStyles.siteSignature()) {
      return false
    }
    const styleTarget = document.head || document.documentElement
    if (!styleTarget) {
      return false
    }

    if (maiaStyles.preInject) {
      maiaStyles.preInject()
    }
    const theme = ensureSystemTheme()

    if (!document.getElementById(maiaStyles.fontStyleId)) {
      const fontStylesheet = document.createElement("link")
      fontStylesheet.id = maiaStyles.fontStyleId
      fontStylesheet.rel = "stylesheet"
      fontStylesheet.href = FONT_STYLESHEET_URL
      fontStylesheet.crossOrigin = "anonymous"
      styleTarget.append(fontStylesheet)
    }

    if (document.head) {
      const ensureManagedMeta = (id, name, content) => {
        let meta = document.getElementById(id)
        if (!meta) {
          meta = document.querySelector(`meta[name="${name}"]`)
          if (meta) {
            meta.dataset.originalId = meta.id
            meta.id = id
            meta.dataset.originalContent = meta.content || ""
          } else {
            meta = document.createElement("meta")
            meta.id = id
            meta.name = name
            document.head.append(meta)
          }
        }
        meta.content = content
      }

      ensureManagedMeta(
        maiaStyles.colorSchemeMetaId,
        "color-scheme",
        "light dark"
      )
      ensureManagedMeta(
        maiaStyles.themeColorMetaId,
        "theme-color",
        theme === "dark" ? maiaStyles.themeColor : "#ffffff"
      )

      const viewportMeta = document.querySelector('meta[name="viewport"]')
      if (viewportMeta) {
        const current = viewportMeta.content || ""
        const tokens = current
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean)
        const missing = [
          "viewport-fit=cover",
          "interactive-widget=resizes-content",
        ].filter((token) => !tokens.includes(token))

        if (missing.length) {
          if (viewportMeta.dataset.originalContent === undefined) {
            viewportMeta.dataset.originalContent = current
          }
          viewportMeta.content = [...tokens, ...missing].join(", ")
        }
      }
    }

    const existingStyle = document.getElementById(maiaStyles.styleId)
    if (existingStyle) {
      if (existingStyle.textContent !== maiaStyles.css) {
        existingStyle.textContent = maiaStyles.css
      }
      document.documentElement.classList.add(MAIA_CLASS)
      return true
    }

    const style = document.createElement("style")
    style.id = maiaStyles.styleId
    style.textContent = maiaStyles.css
    styleTarget.append(style)
    document.documentElement.classList.add(MAIA_CLASS)
    return true
  } catch {
    return false
  }
}
