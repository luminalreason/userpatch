import { createLucideIcon as createSharedLucideIcon } from "../shared/icons.js"

export const LUCIDE_ICON_SHAPES = {
  film: [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
    ["path", { d: "M7 3v18" }],
    ["path", { d: "M3 7.5h4" }],
    ["path", { d: "M3 12h18" }],
    ["path", { d: "M3 16.5h4" }],
    ["path", { d: "M17 3v18" }],
    ["path", { d: "M17 7.5h4" }],
    ["path", { d: "M17 16.5h4" }],
  ],
  "arrow-left": [
    ["path", { d: "m12 19-7-7 7-7" }],
    ["path", { d: "M19 12H5" }],
  ],
  "arrow-right": [
    ["path", { d: "M5 12h14" }],
    ["path", { d: "m12 5 7 7-7 7" }],
  ],
  "arrow-up": [
    ["path", { d: "m5 12 7-7 7 7" }],
    ["path", { d: "M12 19V5" }],
  ],
  "audio-lines": [
    ["path", { d: "M2 10v3" }],
    ["path", { d: "M6 6v11" }],
    ["path", { d: "M10 3v18" }],
    ["path", { d: "M14 8v7" }],
    ["path", { d: "M18 5v13" }],
    ["path", { d: "M22 10v3" }],
  ],
  "chevron-down": [["path", { d: "m6 9 6 6 6-6" }]],
  "chevron-up": [["path", { d: "m18 15-6-6-6 6" }]],
  check: [["path", { d: "m20 6-11 11-5-5" }]],
  clapperboard: [
    ["path", { d: "m12.296 3.464 3.02 3.956" }],
    [
      "path",
      {
        d: "M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.3z",
      },
    ],
    ["path", { d: "M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" }],
    ["path", { d: "m6.18 5.276 3.1 3.899" }],
  ],
  "file-archive": [
    [
      "path",
      {
        d: "M13.659 22H18a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v11.5",
      },
    ],
    ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5" }],
    ["path", { d: "M8 12v-1" }],
    ["path", { d: "M8 18v-2" }],
    ["path", { d: "M8 7V6" }],
    ["circle", { cx: "8", cy: "20", r: "2" }],
  ],
  "file-play": [
    [
      "path",
      {
        d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
      },
    ],
    ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5" }],
    [
      "path",
      {
        d: "M15.033 13.44a.647.647 0 0 1 0 1.12l-4.065 2.352a.645.645 0 0 1-.968-.56v-4.704a.645.645 0 0 1 .967-.56z",
      },
    ],
  ],
  download: [
    ["path", { d: "M12 15V3" }],
    ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }],
    ["path", { d: "m7 10 5 5 5-5" }],
  ],
  house: [
    ["path", { d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" }],
    [
      "path",
      {
        d: "M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
      },
    ],
  ],
  info: [
    ["circle", { cx: "12", cy: "12", r: "10" }],
    ["path", { d: "M12 16v-4" }],
    ["path", { d: "M12 8h.01" }],
  ],
  menu: [
    ["path", { d: "M4 5h16" }],
    ["path", { d: "M4 12h16" }],
    ["path", { d: "M4 19h16" }],
  ],
  moon: [
    [
      "path",
      {
        d: "M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401",
      },
    ],
  ],
  play: [
    [
      "path",
      {
        d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",
      },
    ],
  ],
  search: [
    ["path", { d: "m21 21-4.34-4.34" }],
    ["circle", { cx: "11", cy: "11", r: "8" }],
  ],
  tv: [
    ["path", { d: "m17 2-5 5-5-5" }],
    ["rect", { width: "20", height: "15", x: "2", y: "7", rx: "2" }],
  ],
  x: [
    ["path", { d: "M18 6 6 18" }],
    ["path", { d: "m6 6 12 12" }],
  ],
}

export const LUCIDE_ICON_RULES = [
  ["#menu-toggle svg", "menu"],
  ["#search-toggle svg, .search-icon, .search-icon-overlay", "search"],
  ["#theme-toggle .theme-icon", "moon"],
  [
    "#close-mobile-menu svg, #close-search svg, #close-trailer svg, #search-overlay .close-button svg",
    "x",
  ],
  [".nav-link.dropdown-toggle svg, .dropdown-indicator", "chevron-down"],
  [".breadcrumb svg", "arrow-left"],
  ["#play-btn svg, #trailer-btn svg", "play"],
  [
    ".download-header .chevron-icon, .series-season-toggle .chevron-icon",
    "chevron-down",
  ],
  [
    ".download-item a.btn .responsive-icon, .episode-links a.btn .responsive-icon",
    "download",
  ],
  ['#series-tabs .series-tab[data-tab="episodes"] svg', "clapperboard"],
  [".content-main .info-box > div:first-child > svg", "info"],
  [".pagination-next svg, a[rel='next'] svg", "arrow-right"],
  [
    ".pagination-prev svg, .pagination-previous svg, a[rel='prev'] svg",
    "arrow-left",
  ],
  ["#back-to-top svg", "arrow-up"],
]

export const applyLucideIcon = (svg, name) => {
  if (svg.dataset.userpatchLucideIcon === name) {
    return
  }

  const replacement = createLucideIcon(name)
  svg.replaceChildren(...replacement.childNodes)
  for (const attribute of [
    "width",
    "height",
    "viewBox",
    "fill",
    "stroke",
    "stroke-width",
    "stroke-linecap",
    "stroke-linejoin",
    "aria-hidden",
    "focusable",
  ]) {
    svg.setAttribute(attribute, replacement.getAttribute(attribute))
  }
  svg.dataset.userpatchLucideIcon = name
}

export const normalizeLucideIcons = (root = document) => {
  const isSeriesDetail = Boolean(
    root.querySelector("#series-tabs") &&
    root.querySelector("#complete-pack, #episodes")
  )
  for (const [selector, name] of LUCIDE_ICON_RULES) {
    if (isSeriesDetail && selector.includes(".download-item a.btn")) {
      continue
    }
    for (const svg of root.querySelectorAll(selector)) {
      applyLucideIcon(svg, name)
    }
  }
}

export const createLucideIcon = (name) =>
  createSharedLucideIcon(name, LUCIDE_ICON_SHAPES)
