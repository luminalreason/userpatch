import { restoreManagedMeta } from "../shared/managed-meta.js"
import { dismissPageLoader } from "../shared/page-loader.js"
import { MAIA_CLASS } from "../shared/styles.js"
import {
  COLOR_SCHEME_META_ID,
  DETAIL_PAGE_CLASS,
  FONT_STYLE_ID,
  HBLINKS_PAGE_CLASS,
  KEEP_CLASS,
  LISTING_READY_CLASS,
  STYLE_ID,
  THEME_COLOR_META_ID,
} from "./config.js"
import { clearDetailTooltipCleanup } from "./download-rows.js"
import { resetHeaderNavigation } from "./header-nav.js"
import { resetMobileNavigationState } from "./mobile-nav.js"
import { resetScreenshotViewer } from "./screenshot-viewer.js"
import { resetSearchDialog } from "./search-dialog.js"

export const removeBookmarkOverlay = () => {
  try {
    for (const overlay of document.querySelectorAll("[id^='bb-overlay-']")) {
      overlay.remove()
    }
    const body = document.body
    if (body) {
      const classNames = (body.getAttribute("class") || "").split(/\s+/)
      for (const className of classNames) {
        if (className.startsWith("bb-")) {
          body.classList.remove(className)
        }
      }
    }
  } catch {}
}

// Site navigation, collected from the theme's category navbar. The pills
// header, the search dialog, and the mobile drawer are all built from this
// one snapshot so the three stay consistent.
export const removeAppChrome = () => {
  dismissPageLoader(true)
  resetHeaderNavigation()
  resetSearchDialog()
  resetMobileNavigationState()
  clearDetailTooltipCleanup()
  resetScreenshotViewer()
  for (const node of document.querySelectorAll(
    ".userpatch-header, dialog.userpatch-search-dialog, .userpatch-mobile-nav, .userpatch-mobile-menu, .userpatch-detail-root, .userpatch-provider-tooltip"
  )) {
    node.remove()
  }
  const main = document.querySelector("main#main-content")
  if (main) {
    main.classList.remove(LISTING_READY_CLASS)
    for (const child of main.querySelectorAll(`.${KEEP_CLASS}`)) {
      child.classList.remove(KEEP_CLASS)
    }
  }
  restoreManagedMeta([COLOR_SCHEME_META_ID, THEME_COLOR_META_ID])
  document.getElementById(FONT_STYLE_ID)?.remove()
  document.getElementById(STYLE_ID)?.remove()
  document.documentElement?.classList.remove(
    MAIA_CLASS,
    DETAIL_PAGE_CLASS,
    HBLINKS_PAGE_CLASS
  )
}
