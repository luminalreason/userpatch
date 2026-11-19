import { restoreManagedMeta } from "../shared/managed-meta.js"
import { dismissPageLoader } from "../shared/page-loader.js"
import { removeSettings } from "../shared/redesign-settings.js"
import { MAIA_CLASS } from "../shared/styles.js"
import { ensureSystemTheme } from "../shared/system-theme.js"
import {
  COLOR_SCHEME_META_ID,
  FONT_STYLE_ID,
  STYLE_ID,
  THEME_COLOR_META_ID,
} from "./config.js"
import { cleanupReleaseLists } from "./download-lists.js"
import { headerNavigationCleanup, headerSearchCleanup } from "./header-nav.js"
import { removeMobileNavigation } from "./mobile-nav.js"

let originalTheme = null

export const followSystemTheme = () => {
  const root = document.documentElement
  originalTheme ||= {
    light: root.classList.contains("light"),
    dark: root.classList.contains("dark"),
    detailTheme: root.dataset.detailTheme,
  }
  const theme = ensureSystemTheme()
  root.classList.toggle("light", theme === "light")
  root.classList.toggle("dark", theme === "dark")
  root.dataset.detailTheme = theme
}

export const removeStyles = () => {
  try {
    dismissPageLoader(true)
    headerNavigationCleanup?.()
    headerSearchCleanup?.()
    cleanupReleaseLists()
    removeMobileNavigation()
    removeSettings()
    document
      .querySelector("header.sticky .userpatch-settings-trigger")
      ?.remove()
    restoreManagedMeta([COLOR_SCHEME_META_ID, THEME_COLOR_META_ID])
    document.getElementById(STYLE_ID)?.remove()
    document.getElementById(FONT_STYLE_ID)?.remove()
    document.documentElement?.classList.remove(
      MAIA_CLASS,
      "userpatch-detail-page"
    )
    delete document.documentElement.dataset.userpatchTheme
    if (originalTheme) {
      const root = document.documentElement
      root.classList.toggle("light", originalTheme.light)
      root.classList.toggle("dark", originalTheme.dark)
      if (originalTheme.detailTheme === undefined) {
        delete root.dataset.detailTheme
      } else {
        root.dataset.detailTheme = originalTheme.detailTheme
      }
      originalTheme = null
    }
  } catch {
    return
  }
}
