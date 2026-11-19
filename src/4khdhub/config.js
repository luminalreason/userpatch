export const CONFIG = Object.freeze({
  themeColor: "#0a0a0a",
  seriesSelectPopupMaxHeightPx: 352,
  seriesSelectViewportInsetPx: 8,
  seriesSelectSideOffsetPx: 4,
  seriesSelectScrollControlHeightPx: 24,
  filenameClampLines: 2,
  mobileFilenameClampLines: 3,
  filenameLineHeight: 1.45,
  filenameMeasureBatchSize: 4,
  filenameMeasureRootMargin: "240px 0px",
  pageDiscoveryTimeoutMs: 4000,
  pageLoaderTimeoutMs: 4000,
  mobileLayoutBreakpointRem: 52,
  mobileQualityStickyTopPx: 8,
  mobileQualityScrollBehavior: "smooth",
  mobileCompactQualityBreakpointRem: 17,
  mobileCompactQualityTabPaddingInlinePx: 8,
  mobileDetailSectionGapRem: 0.75,
  mobileQualityVerticalGapRem: 0.75,
  mobileSearchDialogInsetPx: 12,
  mobileMenuId: "userpatch-mobile-menu",
  mobileNavigationWidth: "320px",
  fetchLinksKey: "userpatch-4khdhub-fetch-links",
  shortEpisodeNamesKey: "userpatch-4khdhub-short-episode-names",
  ongoingPosterSessionKey: "userpatch-4khdhub-ongoing-poster-path",
  storageKeys: Object.freeze({
    detailTab: "userpatch-4khdhub-detail-tab",
    movieQualityTab: "userpatch-4khdhub-quality-tab",
    seriesArchiveQualityTab: "userpatch-4khdhub-series-archive-quality-tab",
    seriesTab: "userpatch-4khdhub-series-tab",
    seriesQuality: "userpatch-4khdhub-series-quality",
    seriesSeasonPrefix: "userpatch-4khdhub-season:",
    openedReleases: "userpatch-4khdhub-opened-releases",
  }),
  mobileNavigationItems: Object.freeze([
    Object.freeze(["/", "Home", "house"]),
    Object.freeze(["menu", "Menu", "menu"]),
    Object.freeze(["search", "Search", "search"]),
  ]),
})

export const STYLE_ID = "userpatch-4khdhub-maia-style"
export const FONT_STYLE_ID = "userpatch-4khdhub-inter-font"
export const COLOR_SCHEME_META_ID = "userpatch-4khdhub-color-scheme"
export const THEME_COLOR_META_ID = "userpatch-4khdhub-theme-color"
export const NAV_INDICATOR_CLASS = "userpatch-nav-indicator"
