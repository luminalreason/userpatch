import {
  initPageLoop,
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
import { setupProgressiveImage } from "../shared/progressive-images.js"
import { initStorage } from "../shared/storage.js"
import { ensureStyles, initMaiaStyles, MAIA_CLASS } from "../shared/styles.js"
import {
  CONFIG,
  COLOR_SCHEME_META_ID,
  FONT_STYLE_ID,
  STYLE_ID,
  THEME_COLOR_META_ID,
} from "./config.js"
import { MAIA_CSS } from "./css.js"
import { applyDetailPageLayout } from "./detail-layout.js"
import { ensureDetailTabs } from "./detail-tabs.js"
import {
  cleanupReleaseLists,
  setupMovieReleaseList,
  setupSeriesReleaseList,
} from "./download-lists.js"
import { NAV_CONTAINER_SELECTOR, setupHeaderNavigation } from "./header-nav.js"
import { normalizeLucideIcons } from "./icons.js"
import { setupMobileNavigation } from "./mobile-nav.js"
import {
  markOngoingDetailPoster,
  markOngoingSeriesPosters,
  setupOngoingCardNavigationTracking,
} from "./ongoing-cards.js"
import { followSystemTheme, removeStyles } from "./style-lifecycle.js"

let releaseContentRoot = null
showRedesignLoader(/(^|\.)4khdhub\./i)

const processCurrentPage = () => {
  if (isCloudflareChallenge()) {
    dismissPageLoader(true)
    removeStyles()
    return true
  }

  if (!ensureStyles()) {
    if (document.documentElement?.classList.contains(MAIA_CLASS)) {
      removeStyles()
    }
    return false
  }

  const siteRoot = document.querySelector("#swup")
  if (!siteRoot) {
    return false
  }
  const contentRoot =
    siteRoot.querySelector(".content-grid .content-main") || siteRoot
  if (contentRoot !== releaseContentRoot) {
    cleanupReleaseLists()
    releaseContentRoot = contentRoot
  }

  markOngoingSeriesPosters(siteRoot)
  setupOngoingCardNavigationTracking()

  for (const heading of siteRoot.querySelectorAll(".latest-releases-header")) {
    heading.remove()
  }

  const isDetailPage = Boolean(
    siteRoot.querySelector(
      ".content-grid .content-main .page-title, .content-grid .content-sidebar .userpatch-detail-title"
    )
  )
  document.documentElement.classList.toggle(
    "userpatch-detail-page",
    isDetailPage
  )
  setupHeaderNavigation()
  setupMobileNavigation()
  if (isDetailPage) {
    applyDetailPageLayout(siteRoot)
    markOngoingDetailPoster(siteRoot)
  }
  let posterIndex = 0
  for (const image of siteRoot.querySelectorAll(
    ".poster-container img, .movie-card-image img"
  )) {
    if (posterIndex === 0) {
      image.fetchPriority = "high"
      image.loading = "eager"
    } else if (!image.hasAttribute("loading")) {
      image.loading = "lazy"
    }
    posterIndex += 1
    setupProgressiveImage(image)
  }
  normalizeLucideIcons(siteRoot)

  if (!isDetailPage) {
    return true
  }

  const hasSeriesPanel = Boolean(
    siteRoot.querySelector("#complete-pack, #episodes")
  )
  if (!hasSeriesPanel) {
    const ready = setupMovieReleaseList(siteRoot)
    if (ready) {
      ensureDetailTabs(siteRoot)
    }
    return ready
  }

  const ready = setupSeriesReleaseList(siteRoot)
  if (ready) {
    ensureDetailTabs(siteRoot)
  }
  return ready
}

initStorage({
  openedReleasesKey: CONFIG.storageKeys.openedReleases,
})
initPageLoop({
  processPage: processCurrentPage,
  attributeFilter: [
    "data-format-header-ready",
    "data-global-detail-ready",
    "href",
    "src",
    "srcset",
  ],
  characterData: true,
  discoveryTimeoutMs: CONFIG.pageDiscoveryTimeoutMs,
})
initMaiaStyles({
  styleId: STYLE_ID,
  fontStyleId: FONT_STYLE_ID,
  colorSchemeMetaId: COLOR_SCHEME_META_ID,
  themeColorMetaId: THEME_COLOR_META_ID,
  themeColor: CONFIG.themeColor,
  css: MAIA_CSS,
  siteSignature: () =>
    document.body &&
    document.querySelector("#swup") &&
    document.querySelector(`${NAV_CONTAINER_SELECTOR} .navbar-brand`) &&
    document.querySelector("#main-nav .nav-list"),
  preInject: followSystemTheme,
})
if (document.readyState === "loading") {
  if (ensureStyles()) {
    showInitialPageLoader(
      () => document.body,
      () => {
        const spinner = document.createElement("div")
        spinner.className = PAGE_SPINNER_CLASS
        return spinner
      },
      CONFIG.pageLoaderTimeoutMs
    )
  }
  document.addEventListener("DOMContentLoaded", watchCurrentPage, {
    once: true,
  })
}
document.addEventListener(
  "dragstart",
  (event) => {
    if (
      event.target instanceof Element &&
      event.target.closest("li.thumb, figure, img, a")
    ) {
      event.preventDefault()
    }
  },
  true
)

watchCurrentPage()

document.addEventListener("site:page", watchCurrentPage)
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
