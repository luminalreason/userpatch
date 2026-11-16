export const CONFIG = Object.freeze({
  themeColor: "#0a0a0a",
  pageDiscoveryTimeoutMs: 4000,
  pageLoaderTimeoutMs: 4000,
  mobileLayoutBreakpointRem: 52,
  searchPagePath: "/search.html",
  mobileMenuWidth: "280px",
  mobileMenuPopoverId: "userpatch-mobile-menu",
  mobileNavigationWidth: "260px",
  storageKeys: Object.freeze({
    movieQualityTab: "userpatch-hdhub4u-quality-tab",
    seriesTab: "userpatch-hdhub4u-series-tab",
    openedReleases: "userpatch-hdhub4u-opened-releases",
  }),
  mobileNavigationItems: Object.freeze([
    Object.freeze(["/", "Home"]),
    Object.freeze(["menu", "Menu"]),
    Object.freeze(["search", "Search"]),
  ]),
})

export const STYLE_ID = "userpatch-hdhub4u-maia-style"
export const FONT_STYLE_ID = "userpatch-hdhub4u-inter-font"
export const COLOR_SCHEME_META_ID = "userpatch-hdhub4u-color-scheme"
export const THEME_COLOR_META_ID = "userpatch-hdhub4u-theme-color"
export const DETAIL_PAGE_CLASS = "userpatch-detail-page"
export const HBLINKS_PAGE_CLASS = "userpatch-hblinks-page"
export const LISTING_READY_CLASS = "userpatch-listing-ready"
export const KEEP_CLASS = "userpatch-keep"
