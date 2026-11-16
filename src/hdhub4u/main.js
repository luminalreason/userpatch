import {
  ensureHblinksPage,
  isHblinksArchivePage,
  isHblinksHost,
} from "../hblinks/page.js"
import {
  initPageLoop,
  schedulePageProcessing,
  stopWaiting,
  watchCurrentPage,
} from "../shared/bootstrap.js"
import { isCloudflareChallenge } from "../shared/cloudflare.js"
import {
  dismissPageLoader,
  PAGE_SPINNER_CLASS,
  showInitialPageLoader,
  showRedesignLoader,
} from "../shared/page-loader.js"
import { discoverSite } from "../shared/site-discovery.js"
import { initStorage } from "../shared/storage.js"
import { ensureStyles, initMaiaStyles, MAIA_CLASS } from "../shared/styles.js"
import { applySiteBranding } from "./branding.js"
import {
  CONFIG,
  COLOR_SCHEME_META_ID,
  DETAIL_PAGE_CLASS,
  FONT_STYLE_ID,
  HBLINKS_PAGE_CLASS,
  STYLE_ID,
  THEME_COLOR_META_ID,
} from "./config.js"
import { MAIA_CSS } from "./css.js"
import { ensureDetailPage } from "./detail.js"
import { ensureHeader } from "./header-nav.js"
import { createLucideIcon } from "./icons.js"
import { ensureListingPage, normalizePagination } from "./listing.js"
import { ensureMobileNavigation } from "./mobile-nav.js"
import { ensureSearchDialog } from "./search-dialog.js"
import { removeAppChrome, removeBookmarkOverlay } from "./teardown.js"

showRedesignLoader(/(^|\.)(hdhub4u|hblinks)\./i)

const processCurrentPage = () => {
  if (isCloudflareChallenge()) {
    dismissPageLoader(true)
    removeAppChrome()
    return true
  }

  if (!ensureStyles()) {
    if (document.documentElement?.classList.contains(MAIA_CLASS)) {
      removeAppChrome()
    }
    return false
  }

  if (isHblinksArchivePage()) {
    const pageReady = ensureHblinksPage()
    document.documentElement.classList.toggle(HBLINKS_PAGE_CLASS, pageReady)
    document.documentElement.classList.remove(DETAIL_PAGE_CLASS)
    return pageReady
  }
  document.documentElement.classList.remove(HBLINKS_PAGE_CLASS)

  removeBookmarkOverlay()
  applySiteBranding()

  const isDetail = Boolean(document.body?.classList.contains("single"))
  let detailBuilt = false
  if (isDetail) {
    detailBuilt = ensureDetailPage()
  }
  document.documentElement.classList.toggle(DETAIL_PAGE_CLASS, detailBuilt)

  ensureHeader()
  ensureSearchDialog()
  ensureMobileNavigation()
  if (!isDetail) {
    const listingReady = ensureListingPage()
    normalizePagination(document)
    return listingReady
  }
  return detailBuilt
}

const hasSiteSignature = () =>
  isHblinksArchivePage() ||
  (document.body?.classList.contains("wp-theme-9xhd") &&
    document.querySelector("main#main-content.content-wrapper"))

discoverSite(hasSiteSignature, () => {
  initStorage({
    openedReleasesKey: CONFIG.storageKeys.openedReleases,
  })
  initPageLoop({
    processPage: processCurrentPage,
    attributeFilter: ["href", "src"],
    discoveryTimeoutMs: CONFIG.pageDiscoveryTimeoutMs,
  })
  initMaiaStyles({
    styleId: STYLE_ID,
    fontStyleId: FONT_STYLE_ID,
    colorSchemeMetaId: COLOR_SCHEME_META_ID,
    themeColorMetaId: THEME_COLOR_META_ID,
    themeColor: CONFIG.themeColor,
    css: MAIA_CSS,
    siteSignature: hasSiteSignature,
  })
  if (!isCloudflareChallenge() && !isHblinksHost()) {
    showInitialPageLoader(
      () => document.body || document.documentElement,
      () => {
        const spinner = createLucideIcon("loader-2")
        spinner.classList.add(PAGE_SPINNER_CLASS)
        return spinner
      },
      CONFIG.pageLoaderTimeoutMs
    )
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", schedulePageProcessing, {
      once: true,
    })
  }
  document.addEventListener(
    "dragstart",
    (event) => {
      if (
        event.target instanceof Element &&
        event.target.closest("li.thumb, .userpatch-screenshot, figure, img, a")
      ) {
        event.preventDefault()
      }
    },
    true
  )

  watchCurrentPage()

  window.addEventListener("pagehide", () => {
    // Keep the outgoing frame styled until the browser replaces the document.
    // Removing CSS here exposes the original page during repeated refreshes.
    stopWaiting()
  })
  window.addEventListener("pageshow", (event) => {
    if (event.persisted) {
      watchCurrentPage()
    }
  })
})
