import { DETAIL_INFO_CSS } from "../shared/detail-info.js"
import { POSTER_FRAME_CSS } from "../shared/poster-frame.js"
import { PROGRESSIVE_IMAGE_CSS } from "../shared/progressive-images.js"
import { systemThemeCss } from "../shared/system-theme.js"
import { TRAILER_CSS } from "../shared/trailer.js"
import { CONFIG } from "./config.js"

// Only 36 micro-blocks (~7 KB, ~5%) match across ~460 block positions.
// Keep CSS per-site: regrouping those blocks could change cascade ties.
// The measurement tool is .temp/css-blocks.mjs.
export const MAIA_CSS = `
html.userpatch-maia {
  --background: 0 0% 3.94%;
  --foreground: 0 0% 98.03%;
  --card: 0 0% 9.05%;
  --card-foreground: 0 0% 98.03%;
  --popover: 0 0% 9.05%;
  --popover-foreground: 0 0% 98.03%;
  --primary: 0 0% 89.82%;
  --primary-foreground: 0 0% 9.05%;
  --secondary: 0 0% 14.94%;
  --secondary-foreground: 0 0% 98.03%;
  --muted: 0 0% 14.94%;
  --muted-foreground: 0 0% 63.02%;
  --accent: 0 0% 14.94%;
  --accent-foreground: 0 0% 98.03%;
  --destructive: 358.7 100% 69.6%;
  --border: 0 0% 100% / 10%;
  --input: 0 0% 100% / 15%;
  --ring: 0 0% 45.15%;
  --sidebar: 0 0% 9.05%;
  --sidebar-foreground: 0 0% 98.03%;
  --sidebar-primary: 225.3 84.1% 49%;
  --sidebar-primary-foreground: 0 0% 98.03%;
  --sidebar-accent: 0 0% 14.94%;
  --sidebar-accent-foreground: 0 0% 98.03%;
  --sidebar-border: 0 0% 100% / 10%;
  --sidebar-ring: 0 0% 45.15%;
  --maia-background: oklch(0.145 0 0);
  --maia-gutter: clamp(0.75rem, 1.5vw, 1rem);
  --maia-foreground: oklch(0.985 0 0);
  --maia-card: oklch(0.205 0 0);
  --maia-card-foreground: oklch(0.985 0 0);
  --maia-popover: oklch(0.205 0 0);
  --maia-popover-foreground: oklch(0.985 0 0);
  --maia-primary: oklch(0.922 0 0);
  --maia-primary-foreground: oklch(0.205 0 0);
  --maia-secondary: oklch(0.269 0 0);
  --maia-secondary-foreground: oklch(0.985 0 0);
  --maia-muted: oklch(0.269 0 0);
  --maia-muted-foreground: oklch(0.708 0 0);
  --maia-accent: oklch(0.269 0 0);
  --maia-accent-foreground: oklch(0.985 0 0);
  --maia-destructive: oklch(0.704 0.191 22.216);
  --maia-border: oklch(1 0 0 / 10%);
  --maia-input: oklch(1 0 0 / 15%);
  --maia-ring: oklch(0.556 0 0);
  --maia-ongoing-orange: #ff931e;
  --maia-ongoing-gold: #ffd27a;
  --maia-ongoing-deep-orange: #f97316;
  --maia-opened-blue: oklch(0.58 0.2 250);
  --ease-out: cubic-bezier(0.23, 1, 0.32, 1);
  --ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);
  --ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);
  --maia-radius: 0.625rem;
  --maia-card-depth-shadow: inset 0 1px 2px rgb(255 255 255 / 0.09),
    0 2px 4px rgb(0 0 0 / 0.5), 0 4px 8px rgb(0 0 0 / 0.3);
  --maia-radius-xl: calc(var(--maia-radius) * 1.4);
  --maia-radius-2xl: calc(var(--maia-radius) * 1.8);
  --maia-radius-4xl: calc(var(--maia-radius) * 2.6);
  --detail-bg: var(--maia-background);
  --detail-bg-2: var(--maia-muted);
  --detail-panel: var(--maia-card);
  --detail-panel-2: var(--maia-muted);
  --detail-panel-hover: var(--maia-accent);
  --detail-border: var(--maia-border);
  --detail-border-strong: var(--maia-border);
  --detail-text: var(--maia-foreground);
  --detail-soft: var(--maia-muted-foreground);
  --detail-muted: var(--maia-muted-foreground);
  --detail-accent: var(--maia-primary);
  --detail-accent-soft: var(--maia-secondary);
  --detail-green: var(--maia-secondary-foreground);
  --detail-teal: var(--maia-secondary-foreground);
  --detail-blue: var(--maia-secondary-foreground);
  --detail-file-blue: var(--maia-border);
  color-scheme: dark;
}

html.userpatch-maia {
  -webkit-tap-highlight-color: transparent;
  -webkit-text-size-adjust: 100%;
}

html.userpatch-maia button,
html.userpatch-maia [role="button"],
html.userpatch-maia .btn,
html.userpatch-maia .nav-link,
html.userpatch-maia .search-toggle,
html.userpatch-maia .theme-toggle,
html.userpatch-maia .menu-toggle,
html.userpatch-maia .userpatch-mobile-nav-item,
html.userpatch-maia .userpatch-quality-tab,
html.userpatch-maia .userpatch-quality-filter,
html.userpatch-maia .userpatch-season-trigger,
html.userpatch-maia .userpatch-season-item,
html.userpatch-maia .userpatch-season-scroll-control,
html.userpatch-maia .userpatch-provider-link,
html.userpatch-maia .userpatch-mobile-menu-link,
html.userpatch-maia .userpatch-mobile-menu-summary,
html.userpatch-maia .userpatch-mobile-menu-close {
  touch-action: manipulation;
  user-select: none;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
}

@media (pointer: coarse) {
  html.userpatch-maia input,
  html.userpatch-maia textarea,
  html.userpatch-maia select {
    font-size: 16px !important;
  }
}

html.userpatch-maia,
html.userpatch-maia body {
  color: var(--maia-foreground) !important;
  font-size: 1rem !important;
  line-height: 1.5;
  overscroll-behavior-x: auto;
  overscroll-behavior-y: none;
  font-family: "Inter Variable", ui-sans-serif, system-ui, -apple-system,
    BlinkMacSystemFont, "Segoe UI", sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

html.userpatch-maia,
html.userpatch-maia body,
html.userpatch-maia :where(*) {
  scrollbar-width: none !important;
  -ms-overflow-style: none !important;
}

html.userpatch-maia::-webkit-scrollbar,
html.userpatch-maia body::-webkit-scrollbar,
html.userpatch-maia :where(*)::-webkit-scrollbar {
  display: none !important;
  inline-size: 0 !important;
  block-size: 0 !important;
}

/* The site loads smaller utility classes after this userscript stylesheet. */
html.userpatch-maia[data-detail-theme] body :not(
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  svg,
  .userpatch-mobile-nav-item,
  .userpatch-release-file-title,
  .userpatch-release-file-text
) {
  font-size: 1rem !important;
}

html.userpatch-maia body :where(.text-xs, .text-sm, .small, small) {
  font-size: 1rem !important;
}

html.userpatch-maia #swup,
html.userpatch-maia main {
  color: var(--maia-foreground) !important;
}

html.userpatch-maia,
html.userpatch-maia body,
html.userpatch-maia #swup,
html.userpatch-maia main {
  transition: none !important;
}

html.userpatch-maia body,
html.userpatch-maia main {
  background: var(--maia-background) !important;
}

html.userpatch-maia #swup,
html.userpatch-maia .page-container,
html.userpatch-maia .content-grid,
html.userpatch-maia .content-sidebar,
html.userpatch-maia .content-main,
html.userpatch-maia .content-section,
html.userpatch-maia .series-tab-content {
  background: transparent !important;
  background-image: none !important;
  box-shadow: none !important;
  color: var(--maia-foreground) !important;
}

html.userpatch-maia .page-container {
  inline-size: 100%;
  max-inline-size: 88rem !important;
  margin-inline: auto;
  padding: var(--maia-gutter) !important;
  padding-block-end: clamp(4rem, 8vw, 6rem) !important;
}

html.userpatch-maia .container {
  inline-size: 100%;
  max-inline-size: 88rem !important;
  margin-inline: auto;
  padding-inline: var(--maia-gutter) !important;
}

html.userpatch-maia .content-grid.container {
  inline-size: 100%;
  max-inline-size: none !important;
  grid-template-columns: minmax(14rem, 22rem) minmax(0, 1fr);
  align-items: start;
  gap: clamp(1.5rem, 3vw, 3rem);
  padding-inline: 0 !important;
}

html.userpatch-maia .content-sidebar {
  display: block;
  inline-size: auto;
  min-inline-size: 0;
}

html.userpatch-maia .poster-container {
  inline-size: min(100%, 22rem);
  max-inline-size: 22rem;
  margin-inline: auto;
  padding: 0 !important;
  overflow: hidden;
  border: 1px solid var(--maia-border) !important;
  border-radius: var(--maia-radius) !important;
  background: transparent !important;
  box-shadow: none !important;
}

html.userpatch-maia .poster-image {
  overflow: hidden;
  border-radius: inherit;
}

html.userpatch-maia .poster-image img {
  display: block;
  inline-size: 100%;
  block-size: auto;
  aspect-ratio: 2 / 3;
  object-fit: cover;
}

html.userpatch-maia .content-main {
  min-inline-size: 0;
  padding-inline-start: 0 !important;
}

html.userpatch-maia header.sticky {
  inset-block-start: 3rem;
  border: 0 !important;
  background: transparent !important;
  box-shadow: none !important;
  transition: none !important;
  margin-block: 2.5rem;
  padding-block: 0;
}

html.userpatch-maia header.sticky > .header {
  position: relative;
  display: flex;
  inline-size: fit-content;
  max-inline-size: calc(100% - 1.5rem);
  block-size: 3.75rem !important;
  min-block-size: 3.75rem !important;
  box-sizing: border-box;
  align-items: center;
  isolation: isolate;
  margin-inline: auto;
  overflow: visible;
  border: 0 !important;
  border-radius: 1.25rem !important;
  background: transparent !important;
  box-shadow: none !important;
  backdrop-filter: none !important;
  padding: 0.375rem;
}

html.userpatch-maia header.sticky > .header::before,
html.userpatch-maia.userpatch-detail-page .userpatch-quality-tabs::before,
html.userpatch-maia.userpatch-detail-page .userpatch-season-control::before,
html.userpatch-maia.userpatch-detail-page .userpatch-series-language-badge::before {
  position: absolute;
  z-index: -1;
  inset: 0;
  border-radius: inherit;
  background: color-mix(in oklch, var(--maia-background) 82%, transparent);
  box-shadow: var(--maia-glass-shadow, 0 10px 40px rgb(0 0 0 / 0.2));
  backdrop-filter: saturate(2.2) blur(16px);
  -webkit-backdrop-filter: saturate(2.2) blur(16px);
  content: "";
  pointer-events: none;
}

html.userpatch-maia header.sticky > .header::before,
html.userpatch-maia[data-detail-theme] header.sticky > .header::before,
html.userpatch-maia.userpatch-detail-page .userpatch-quality-tabs::before,
html.userpatch-maia.userpatch-detail-page[data-detail-theme] .userpatch-quality-tabs::before,
html.userpatch-maia.userpatch-detail-page .userpatch-season-control::before,
html.userpatch-maia.userpatch-detail-page[data-detail-theme] .userpatch-season-control::before,
html.userpatch-maia.userpatch-detail-page .userpatch-series-language-badge::before,
html.userpatch-maia.userpatch-detail-page[data-detail-theme] .userpatch-series-language-badge::before {
  background: var(--maia-control-surface, color-mix(in oklch, var(--maia-card) 60%, transparent));
}

html.userpatch-maia header.sticky > .header::after,
html.userpatch-maia.userpatch-detail-page .userpatch-quality-tabs::after,
html.userpatch-maia.userpatch-detail-page .userpatch-season-control::after,
html.userpatch-maia.userpatch-detail-page .userpatch-series-language-badge::after {
  position: absolute;
  z-index: 1;
  inset: 0;
  border-radius: inherit;
  box-shadow:
    inset 0.5px 0.5px var(--maia-foreground),
    inset 0.5px -0.5px var(--maia-foreground),
    inset -0.5px 0.5px var(--maia-foreground),
    inset -0.5px -0.5px var(--maia-foreground);
  opacity: var(--maia-control-border-opacity, 0.2);
  content: "";
  pointer-events: none;
}

html.userpatch-maia header.sticky > .header > .container {
  position: relative;
  z-index: 3;
  display: flex;
  inline-size: fit-content !important;
  max-inline-size: 100%;
  block-size: 3rem;
  min-block-size: 3rem;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  isolation: isolate;
  margin: 0;
  padding: 0 !important;
}

html.userpatch-maia header.sticky > .header > .container > .flex {
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  margin: 0 !important;
  padding: 0 !important;
  gap: 0 !important;
}

html.userpatch-maia header.sticky > .header > .container > .flex:last-child {
  margin-inline-end: 0 !important;
  padding-inline-end: 0 !important;
}

html.userpatch-maia header.sticky > .header > .container > .flex:last-child > :not(#search-toggle) {
  display: none !important;
}

html.userpatch-maia .navbar-brand img {
  display: block;
  max-block-size: 2.25rem;
  inline-size: auto;
}

html.userpatch-maia .navbar-brand .userpatch-header-wordmark {
  display: block;
  inline-size: 6.375rem;
  block-size: auto;
  max-block-size: 2.25rem;
  object-fit: contain;
  color: var(--maia-foreground) !important;
  filter: none !important;
  opacity: 1 !important;
  transition: none !important;
}

html.userpatch-maia header.sticky .navbar-brand:hover img,
html.userpatch-maia header.sticky .navbar-brand:active img,
html.userpatch-maia header.sticky .navbar-brand:focus-visible img {
  filter: none !important;
  opacity: 1 !important;
}

html.userpatch-maia header.sticky .navbar-brand,
html.userpatch-maia header.sticky #search-toggle {
  position: relative;
  z-index: 1;
  display: inline-flex;
  block-size: 3rem;
  min-block-size: 3rem;
  align-items: center;
  justify-content: center;
  border: 0 !important;
  border-radius: 0.875rem !important;
  background: transparent !important;
  color: var(--maia-foreground) !important;
  transition:
    transform 140ms var(--ease-out),
    color 140ms var(--ease-out);
}

html.userpatch-maia header.sticky .navbar-brand {
  min-inline-size: 3rem;
  padding-inline: 0.375rem;
}

html.userpatch-maia header.sticky #menu-toggle,
html.userpatch-maia header.sticky #search-toggle {
  inline-size: 3rem;
  min-inline-size: 3rem;
  block-size: 3rem;
  min-block-size: 3rem;
  margin: 0 !important;
  padding: 0 !important;
  cursor: pointer;
}

html.userpatch-maia header.sticky #menu-toggle {
  position: relative;
  z-index: 1;
  border: 0 !important;
  border-radius: 0.875rem !important;
  background: transparent !important;
  color: var(--maia-foreground) !important;
}

html.userpatch-maia header.sticky .search-container,
html.userpatch-maia header.sticky #theme-toggle {
  display: none !important;
}

html.userpatch-maia header.sticky .nav-list > .nav-item {
  position: relative;
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
}

html.userpatch-maia header.sticky .nav-list > .nav-item.dropdown:hover,
html.userpatch-maia header.sticky .nav-list > .nav-item.dropdown:focus-within {
  z-index: 20;
}

html.userpatch-maia .nav-list {
  position: relative;
  display: flex;
  inline-size: max-content;
  align-items: center;
  flex-wrap: nowrap;
  gap: 0.1875rem;
  list-style: none;
  overflow: visible;
  border: 0 !important;
  background: transparent !important;
  padding: 0 !important;
  isolation: isolate;
}

html.userpatch-maia header.sticky .nav-list > li:has(> .nav-link[href="/"]) {
  display: none !important;
}

html.userpatch-maia .nav-link {
  color: var(--maia-foreground) !important;
}

html.userpatch-maia .breadcrumb,
html.userpatch-maia .breadcrumb a {
  color: var(--maia-muted-foreground) !important;
}

html.userpatch-maia footer {
  display: none !important;
}

html.userpatch-maia header.sticky .nav-link {
  position: relative;
  z-index: 1;
  display: inline-flex;
  min-block-size: 3rem;
  block-size: auto !important;
  align-items: center;
  justify-content: center;
  gap: 0.375rem;
  padding: 0.625rem 1.125rem !important;
  border: 0 !important;
  border-radius: 0.875rem !important;
  background: transparent !important;
  color: var(--maia-foreground) !important;
  font-size: 1rem !important;
  font-weight: 500 !important;
  line-height: 1.25;
  text-decoration: none !important;
  transition:
    transform 140ms var(--ease-out),
    color 140ms var(--ease-out);
}

html.userpatch-maia header.sticky .nav-link .dropdown-indicator {
  flex: 0 0 1rem;
  inline-size: 1rem !important;
  block-size: 1rem !important;
  margin-inline-start: 0 !important;
  margin-inline-end: -0.25rem !important;
}

html.userpatch-maia header.sticky .nav-link:hover,
html.userpatch-maia header.sticky .nav-link[aria-expanded="true"],
html.userpatch-maia .breadcrumb a:hover {
  background: transparent !important;
  color: var(--maia-foreground) !important;
}

html.userpatch-maia header.sticky .nav-link:focus-visible,
html.userpatch-maia header.sticky #menu-toggle:focus-visible,
html.userpatch-maia header.sticky #search-toggle:focus-visible {
  outline: 2px solid var(--maia-ring) !important;
  outline-offset: -2px;
}

html.userpatch-maia .userpatch-nav-indicator {
  position: absolute;
  z-index: 0;
  inset: 0;
  display: block;
  inline-size: 6.25rem;
  block-size: 2.75rem;
  border-radius: var(--userpatch-nav-radius-x, 0.875rem) /
    var(--userpatch-nav-radius-y, 0.875rem);
  background: var(--maia-selection-bg, color-mix(in oklch, var(--maia-foreground) 9%, transparent));
  box-shadow: var(--maia-selection-shadow, inset 0 1px 2px color-mix(in oklch, var(--maia-foreground) 12%, transparent));
  opacity: 0;
  pointer-events: none;
  transform: translate3d(
      var(--userpatch-nav-x, 0px),
      var(--userpatch-nav-y, 0px),
      0
    )
    scale(var(--userpatch-nav-scale-x, 1), var(--userpatch-nav-scale-y, 1));
  transform-origin: left top;
  transition: opacity 160ms var(--ease-out);
}

html.userpatch-maia .userpatch-nav-indicator[data-ready="true"] {
  opacity: 1;
}

html.userpatch-maia .userpatch-nav-indicator[data-animate="true"] {
  transition:
    transform 240ms cubic-bezier(0.77, 0, 0.175, 1),
    opacity 160ms var(--ease-out);
}

html.userpatch-maia .main-nav {
  background: transparent !important;
  backdrop-filter: none !important;
  transition: none !important;
}

@media (min-width: 46.01rem) {
  html.userpatch-maia header.sticky #main-nav {
    margin-inline-start: 0 !important;
  }

  html.userpatch-maia header.sticky #main-nav .nav-list > .nav-item:nth-child(2) > .nav-link {
    padding-inline-start: 0.75rem !important;
    padding-inline-end: 0.75rem !important;
  }
}

html.userpatch-maia .main-nav.open {
  background: var(--maia-card) !important;
  box-shadow: none !important;
  backdrop-filter: none !important;
}

html.userpatch-maia .dropdown-menu {
  position: absolute;
  z-index: 50 !important;
  padding: 0.25rem !important;
  border: 0 !important;
  border-radius: var(--maia-radius-2xl) !important;
  background: var(--maia-popover) !important;
  color: var(--maia-popover-foreground) !important;
  box-shadow:
    0 25px 50px -12px rgb(0 0 0 / 0.25),
    0 0 0 1px color-mix(in oklch, var(--maia-foreground) 10%, transparent) !important;
  backdrop-filter: none !important;
}

/* The site's mobile dropdown removes its fill and only blurs the page behind it. */
html.userpatch-maia header.sticky #main-nav .dropdown-menu,
html.userpatch-maia header.sticky #main-nav .dropdown-menu.open {
  position: absolute;
  z-index: 50 !important;
  background-color: var(--maia-popover) !important;
  background-image: none !important;
  color: var(--maia-popover-foreground) !important;
  opacity: 1 !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
}

html.userpatch-maia .dropdown-item {
  display: flex;
  min-block-size: 2.25rem;
  align-items: center;
  padding: 0.5rem 0.75rem !important;
  border-radius: var(--maia-radius-xl) !important;
  color: var(--maia-popover-foreground) !important;
  font-size: 1rem;
  font-weight: 400;
}

html.userpatch-maia .dropdown-item:focus-visible {
  background: var(--maia-muted) !important;
  color: var(--maia-foreground) !important;
}

@media (hover: hover) and (pointer: fine) {
  html.userpatch-maia .dropdown-item:hover {
    background: var(--maia-muted) !important;
    color: var(--maia-foreground) !important;
  }
}

html.userpatch-maia .dropdown-item:active {
  background: var(--maia-accent) !important;
  color: var(--maia-foreground) !important;
}

html.userpatch-maia a:focus-visible,
html.userpatch-maia button:focus-visible,
html.userpatch-maia summary:focus-visible,
html.userpatch-maia [role="button"]:focus-visible {
  outline: 1px solid var(--maia-ring) !important;
  outline-offset: 0;
  box-shadow: 0 0 0 3px color-mix(in oklch, var(--maia-ring) 50%, transparent) !important;
}

html.userpatch-maia button,
html.userpatch-maia input,
html.userpatch-maia select,
html.userpatch-maia textarea {
  font-family: inherit;
}

html.userpatch-maia .page-title {
  margin-block: 0 0.25rem !important;
  color: var(--maia-foreground) !important;
  font-size: clamp(2.25rem, 4vw, 3.5rem) !important;
  font-weight: 650 !important;
  letter-spacing: -0.045em !important;
  line-height: 1.05 !important;
  text-wrap: balance;
}

html.userpatch-maia .movie-tagline {
  margin-block: 0.5rem 1rem !important;
  color: var(--maia-muted-foreground) !important;
  font-size: 1rem !important;
  font-weight: 500 !important;
}

html.userpatch-maia .content-main > .mb-2 {
  margin-block-end: 1.5rem !important;
}

html.userpatch-maia .content-main > .mb-2 > .mt-2 {
  display: flex;
  max-inline-size: 68rem;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem !important;
  margin-block-start: 1rem !important;
}

html.userpatch-maia .content-main > .mb-2 > .mt-2 .badge,
html.userpatch-maia .content-main > .mb-2 > .mt-2 .badge-outline,
html.userpatch-maia .content-main > .mb-2 > .mt-2 .badge.badge-outline,
html.userpatch-maia .content-main > .mb-2 > .mt-2 .badge.badge-outline a {
  color: var(--maia-foreground) !important;
  background: color-mix(in oklch, var(--maia-input) 30%, transparent) !important;
  border: 1px solid var(--maia-border) !important;
  border-radius: var(--maia-radius-4xl) !important;
  box-shadow: none !important;
  text-shadow: none !important;
  font-size: 1rem !important;
  font-weight: 400 !important;
  line-height: 1.25;
}

html.userpatch-maia .content-main > .mb-2 > .mt-2 .badge {
  min-block-size: 1.25rem !important;
  padding: 0.125rem 0.5rem !important;
  border-radius: var(--maia-radius-4xl) !important;
}

html.userpatch-maia .imdb-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.125rem 0.5rem !important;
  border: 1px solid var(--maia-border) !important;
  border-radius: var(--maia-radius-4xl) !important;
  background: color-mix(in oklch, var(--maia-input) 30%, transparent) !important;
  color: var(--maia-foreground) !important;
  font-size: 1rem !important;
  font-weight: 400 !important;
  line-height: 1.25 !important;
}

html.userpatch-maia .imdb-badge .imdb-logo {
  padding: 0 !important;
  border-radius: 0;
  background: transparent !important;
  color: inherit !important;
  font-size: 1rem !important;
  font-weight: 400 !important;
  line-height: 1.25 !important;
}

html.userpatch-maia .imdb-badge .imdb-score {
  padding: 0 !important;
  color: var(--maia-foreground) !important;
  font-size: 1rem !important;
  font-weight: 400 !important;
  line-height: 1.25 !important;
}

html.userpatch-maia .content-main > .mb-2 > p.mt-2 {
  margin-block-start: 0.75rem !important;
  color: var(--maia-muted-foreground) !important;
  font-size: 1rem !important;
  font-weight: 500 !important;
}

html.userpatch-maia .content-section > p,
html.userpatch-maia .detail-description {
  max-inline-size: 72ch;
  color: var(--maia-muted-foreground) !important;
  font-size: 1rem !important;
  line-height: 1.7 !important;
}

html.userpatch-maia .metadata-list {
  box-sizing: border-box;
  display: grid;
  gap: 0;
  overflow: hidden;
  margin-block-start: 1.25rem !important;
  padding: 1.5rem !important;
  border: 0 !important;
  border-radius: var(--maia-radius-2xl) !important;
  background: var(--maia-card) !important;
  color: var(--maia-card-foreground) !important;
  box-shadow: 0 0 0 1px color-mix(in oklch, var(--maia-foreground) 10%, transparent) !important;
}

html.userpatch-maia .detail-info-box {
  padding: 1.5rem !important;
  border: 0 !important;
  border-radius: var(--maia-radius-2xl) !important;
  background: var(--maia-card) !important;
  color: var(--maia-card-foreground) !important;
  box-shadow: 0 0 0 1px color-mix(in oklch, var(--maia-foreground) 10%, transparent) !important;
}

html.userpatch-maia .metadata-item {
  display: grid !important;
  grid-template-columns: minmax(7rem, 9rem) minmax(0, 1fr) !important;
  align-items: start;
  gap: 0.5rem 1.25rem !important;
  margin: 0 !important;
  padding: 0.625rem 0 !important;
  border: 0 !important;
  border-bottom: 1px solid var(--maia-border) !important;
  background: transparent !important;
}

html.userpatch-maia .metadata-item:last-child {
  border-bottom: 0 !important;
}

html.userpatch-maia .metadata-label {
  color: var(--maia-muted-foreground) !important;
  font-size: 1rem !important;
  font-weight: 600 !important;
  letter-spacing: 0.035em;
  text-transform: uppercase;
}

html.userpatch-maia .metadata-value {
  color: var(--maia-foreground) !important;
  font-size: 1rem !important;
  line-height: 1.55;
}

html.userpatch-maia .metadata-token,
html.userpatch-maia .metadata-item[data-meta-kind] .metadata-token {
  display: inline-flex;
  min-block-size: 1.25rem;
  align-items: center;
  padding: 0.125rem 0.5rem !important;
  border: 1px solid var(--maia-border) !important;
  border-radius: var(--maia-radius-4xl) !important;
  background: color-mix(in oklch, var(--maia-input) 30%, transparent) !important;
  color: var(--maia-foreground) !important;
  font-size: 1rem !important;
  font-weight: 400 !important;
  line-height: 1.2;
}

html.userpatch-maia .section-title {
  margin-block: 1.75rem 1rem !important;
  padding-block-end: 0.75rem;
  border-bottom: 1px solid var(--maia-border);
  color: var(--maia-foreground) !important;
  font-size: 1.25rem !important;
  font-weight: 600 !important;
  letter-spacing: -0.02em !important;
}

html.userpatch-maia .section-title::before {
  display: none !important;
}

html.userpatch-maia #play-btn,
html.userpatch-maia #trailer-btn,
html.userpatch-maia .btn,
html.userpatch-maia button.btn,
html.userpatch-maia .search-submit,
html.userpatch-maia .up-download-link {
  display: inline-flex;
  min-block-size: 2.25rem;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem !important;
  border: 1px solid var(--maia-border) !important;
  border-radius: var(--maia-radius-4xl) !important;
  background: var(--maia-primary) !important;
  color: var(--maia-primary-foreground) !important;
  box-shadow: none !important;
  text-shadow: none !important;
  font-size: 1rem !important;
  font-weight: 500 !important;
  line-height: 1.25;
  text-decoration: none;
  transition:
    transform 140ms var(--ease-out),
    background-color 150ms ease,
    color 150ms ease,
    border-color 150ms ease;
}

@media (hover: hover) and (pointer: fine) {
  html.userpatch-maia #play-btn:hover,
  html.userpatch-maia #trailer-btn:hover,
  html.userpatch-maia .btn:hover,
  html.userpatch-maia button.btn:hover,
  html.userpatch-maia .search-submit:hover,
  html.userpatch-maia .up-download-link:hover {
    border-color: var(--maia-ring) !important;
    background: var(--maia-accent) !important;
    color: var(--maia-accent-foreground) !important;
  }
}

html.userpatch-maia #play-btn:active,
html.userpatch-maia #trailer-btn:active,
html.userpatch-maia .btn:active,
html.userpatch-maia button.btn:active,
html.userpatch-maia .search-submit:active,
html.userpatch-maia .up-download-link:active {
  transform: scale(0.97);
  background: var(--maia-accent) !important;
}

html.userpatch-maia #play-btn svg,
html.userpatch-maia #trailer-btn svg {
  inline-size: 1rem;
  block-size: 1rem;
  fill: currentColor !important;
  stroke: currentColor !important;
}

html.userpatch-maia .search-toggle,
html.userpatch-maia .theme-toggle,
html.userpatch-maia .menu-toggle {
  display: inline-flex;
  inline-size: 2.25rem;
  block-size: 2.25rem;
  align-items: center;
  justify-content: center;
  padding: 0 !important;
  border: 1px solid transparent !important;
  border-radius: var(--maia-radius-4xl) !important;
  background: transparent !important;
  color: var(--maia-foreground) !important;
  transition:
    transform 140ms var(--ease-out),
    background-color 140ms ease,
    border-color 140ms ease;
}

@media (hover: hover) and (pointer: fine) {
  html.userpatch-maia .search-toggle:hover,
  html.userpatch-maia .theme-toggle:hover,
  html.userpatch-maia .menu-toggle:hover {
    border-color: var(--maia-border) !important;
    background: var(--maia-muted) !important;
  }
}

html.userpatch-maia .search-toggle:active,
html.userpatch-maia .theme-toggle:active,
html.userpatch-maia .menu-toggle:active {
  transform: scale(0.96);
  background: var(--maia-muted) !important;
}

html.userpatch-maia #close-mobile-menu,
html.userpatch-maia #close-search {
  display: inline-flex;
  inline-size: 2.25rem;
  block-size: 2.25rem;
  align-items: center;
  justify-content: center;
  padding: 0 !important;
  border: 1px solid var(--maia-border) !important;
  border-radius: var(--maia-radius-4xl) !important;
  background: var(--maia-card) !important;
  color: var(--maia-foreground) !important;
  box-shadow: none !important;
  transition:
    transform 140ms var(--ease-out),
    background-color 140ms ease,
    border-color 140ms ease;
}

@media (hover: hover) and (pointer: fine) {
  html.userpatch-maia #close-mobile-menu:hover,
  html.userpatch-maia #close-search:hover {
    background: var(--maia-muted) !important;
  }
}

html.userpatch-maia #close-mobile-menu:active,
html.userpatch-maia #close-search:active {
  transform: scale(0.96);
  background: var(--maia-muted) !important;
}

html.userpatch-maia #search-overlay {
  display: none !important;
}

html.userpatch-maia dialog.userpatch-search-dialog[open] {
  position: fixed;
  inset-block-start: 50%;
  inset-inline-start: 50%;
  display: flex;
  inline-size: min(45rem, calc(100vw - 2rem));
  max-inline-size: none;
  max-block-size: calc(100dvh - 2rem);
  margin: 0;
  padding: 0;
  overflow: visible;
  transform: translate(-50%, -50%) scale(1);
  opacity: 1;
  border: 0;
  background: transparent;
  color: var(--maia-foreground);
  transition:
    transform 160ms var(--ease-out),
    opacity 160ms var(--ease-out);
}

@starting-style {
  html.userpatch-maia dialog.userpatch-search-dialog[open] {
    transform: translate(-50%, -50%) scale(0.96);
    opacity: 0;
  }
}

html.userpatch-maia dialog.userpatch-search-dialog::backdrop {
  overflow: hidden;
  background: rgb(0 0 0 / 80%);
  backdrop-filter: blur(2px);
  overscroll-behavior-x: auto;
  overscroll-behavior-y: contain;
  -webkit-backdrop-filter: blur(2px);
  transition: opacity 160ms var(--ease-out);
}

html.userpatch-maia dialog.userpatch-search-dialog:modal {
  overscroll-behavior-x: auto;
  overscroll-behavior-y: contain;
}

html.userpatch-maia dialog.userpatch-search-dialog .search-form {
  display: flex !important;
  flex: 1 1 auto;
  position: static !important;
  inline-size: 100%;
  max-inline-size: none;
  min-inline-size: 0;
  margin: 0 !important;
  padding: 0 !important;
  border: 0 !important;
  border-radius: 0 !important;
  background: transparent !important;
  box-shadow: none !important;
  animation: none !important;
}

html.userpatch-maia dialog.userpatch-search-dialog .search-input-container {
  display: flex !important;
  box-sizing: border-box;
  inline-size: 100%;
  min-inline-size: 0;
  block-size: 3.5rem;
  min-block-size: 3.5rem;
  align-items: center;
  gap: 0;
  margin: 0 !important;
  padding: 0 0.25rem 0 0;
  border: 1px solid color-mix(in oklch, var(--maia-foreground) 24%, transparent) !important;
  border-radius: 20px !important;
  background: var(--maia-control-surface, rgb(38 38 40 / 60%)) !important;
  box-shadow: none !important;
  backdrop-filter: saturate(2.2) blur(16px);
  transition: border-color 140ms ease-out;
  -webkit-backdrop-filter: saturate(2.2) blur(16px);
}

html.userpatch-maia dialog.userpatch-search-dialog .search-input-container:has(
  .search-input-overlay:focus-visible
) {
  border-color: transparent !important;
  outline: 2px solid var(--maia-ring);
  outline-offset: 0;
}

html.userpatch-maia .userpatch-input-group-addon {
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  padding-inline-start: 1rem;
}

html.userpatch-maia dialog.userpatch-search-dialog .search-icon-overlay {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: static !important;
  transform: none !important;
  flex: 0 0 1.25rem;
  inline-size: 1.25rem !important;
  block-size: 1.25rem !important;
  color: var(--maia-muted-foreground) !important;
  pointer-events: none;
}

html.userpatch-maia dialog.userpatch-search-dialog .search-input-overlay {
  appearance: none;
  -webkit-appearance: none;
  flex: 1 1 auto;
  inline-size: auto !important;
  min-inline-size: 0;
  box-sizing: border-box;
  align-self: stretch;
  margin: 0 !important;
  block-size: auto;
  min-block-size: 0;
  padding: 0 0.75rem !important;
  border: 0 !important;
  border-radius: 0 !important;
  background: transparent !important;
  color: var(--maia-foreground) !important;
  font-family: inherit !important;
  font-size: 1.125rem !important;
  font-weight: 400 !important;
  line-height: 1.4 !important;
  box-shadow: none !important;
  outline: 0 !important;
}

html.userpatch-maia[data-detail-theme] dialog.userpatch-search-dialog .search-input-overlay {
  font-size: 1.125rem !important;
}

html.userpatch-maia dialog.userpatch-search-dialog .search-input-overlay::placeholder {
  color: var(--maia-muted-foreground) !important;
  font-size: inherit;
  opacity: 1;
}

html.userpatch-maia dialog.userpatch-search-dialog .search-input-overlay::-webkit-search-cancel-button {
  display: none;
}

html.userpatch-maia dialog.userpatch-search-dialog .search-submit[hidden] {
  display: none !important;
}

html.userpatch-maia #series-tabs {
  display: inline-flex;
  max-inline-size: 100%;
  flex-wrap: wrap;
  gap: 0;
  padding: 3px;
  border: 0 !important;
  border-radius: var(--maia-radius-4xl) !important;
  background: var(--maia-muted) !important;
}

html.userpatch-maia #series-tabs .series-tab {
  display: inline-flex;
  min-block-size: 2.25rem;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.45rem 0.875rem !important;
  border: 1px solid transparent !important;
  border-radius: var(--maia-radius-xl) !important;
  background: transparent !important;
  color: var(--maia-muted-foreground) !important;
  font-size: 1rem !important;
  font-weight: 500 !important;
  line-height: 1.25;
  cursor: pointer;
  transition: background-color 150ms ease, color 150ms ease,
    box-shadow 150ms ease;
}

html.userpatch-maia #series-tabs .series-tab.active {
  border-color: var(--maia-border) !important;
  background: var(--maia-background) !important;
  color: var(--maia-foreground) !important;
  box-shadow: none;
}

html.userpatch-maia #series-tabs .series-tab.active,
html.userpatch-maia[data-detail-theme] #series-tabs .series-tab.active {
  border-color: var(--maia-input) !important;
  background: color-mix(in oklch, var(--maia-input) 30%, transparent) !important;
}

html.userpatch-maia #series-tabs .series-tab svg {
  flex: 0 0 1rem;
  inline-size: 1rem !important;
  block-size: 1rem !important;
  color: currentColor !important;
  fill: currentColor !important;
  stroke: currentColor !important;
}

html.userpatch-maia #series-tabs .series-tab[data-tab="episodes"] .responsive-icon,
html.userpatch-maia #series-tabs .series-tab[data-tab="episodes"] .responsive-icon * {
  fill: none !important;
  stroke: currentColor !important;
}

html.userpatch-maia #series-tabs .series-tab svg * {
  fill: currentColor !important;
  stroke: currentColor !important;
}

html.userpatch-maia .series-tab-content > .section-title {
  margin-block-start: 0 !important;
}

html.userpatch-maia .series-season-groups,
html.userpatch-maia .download-groups {
  display: grid;
  gap: 1rem !important;
  border: 0 !important;
}

html.userpatch-maia .series-season-group {
  overflow: hidden;
  border: 1px solid var(--maia-border) !important;
  border-radius: var(--maia-radius-2xl) !important;
  background: var(--maia-card) !important;
  box-shadow: none !important;
}

html.userpatch-maia .series-season-toggle {
  display: grid;
  inline-size: 100%;
  min-block-size: 3.25rem;
  grid-template-columns: minmax(0, 1fr) auto 1.25rem;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem !important;
  border: 0 !important;
  border-radius: 0 !important;
  background: transparent !important;
  color: var(--maia-foreground) !important;
  text-align: start;
  cursor: pointer;
}

@media (hover: hover) and (pointer: fine) {
  html.userpatch-maia .series-season-toggle:hover {
    background: var(--maia-muted) !important;
  }
}

html.userpatch-maia .series-season-toggle:active {
  background: var(--maia-muted) !important;
}

html.userpatch-maia .series-season-toggle strong {
  font-size: 1rem;
  font-weight: 600;
}

html.userpatch-maia .series-season-toggle > span {
  display: inline-flex;
  min-block-size: 1.25rem;
  align-items: center;
  padding: 0.125rem 0.5rem;
  border: 1px solid var(--maia-border) !important;
  border-radius: var(--maia-radius-4xl);
  background: var(--maia-muted) !important;
  color: var(--maia-muted-foreground) !important;
  font-size: 1rem;
  font-weight: 500;
}

html.userpatch-maia .series-season-toggle .chevron-icon {
  inline-size: 1rem !important;
  block-size: 1rem !important;
  justify-self: end;
  padding: 0 !important;
  border: 0 !important;
  border-radius: 0 !important;
  background: transparent !important;
  color: var(--maia-muted-foreground) !important;
  fill: none !important;
  box-shadow: none !important;
}

html.userpatch-maia .series-season-toggle .chevron-icon path {
  fill: none !important;
  stroke: currentColor !important;
}

html.userpatch-maia .series-season-toggle[aria-expanded="true"] .chevron-icon {
  transform: rotate(180deg);
}

html.userpatch-maia .series-season-content {
  padding: 0 1rem 1rem !important;
  border-top: 0 !important;
  background: transparent !important;
}

html.userpatch-maia details.download-group {
  display: block !important;
  overflow: visible;
  border: 0 !important;
  border-bottom: 0 !important;
  border-radius: 0 !important;
  background: transparent !important;
  box-shadow: none !important;
}

html.userpatch-maia .download-group-title {
  display: flex !important;
  min-block-size: 3rem;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 0 !important;
  border: 0 !important;
  border-radius: 0 !important;
  background: transparent !important;
  color: var(--maia-foreground) !important;
  font-size: 1rem !important;
  font-weight: 500 !important;
  list-style: none;
  cursor: pointer;
  box-shadow: none !important;
}

html.userpatch-maia summary.download-group-title::-webkit-details-marker {
  display: none;
}

html.userpatch-maia summary.download-group-title::marker {
  content: "";
}

@media (hover: hover) and (pointer: fine) {
  html.userpatch-maia .download-group-title:hover {
    background: var(--maia-muted) !important;
  }
}

html.userpatch-maia .download-group-title:active {
  background: var(--maia-muted) !important;
}

html.userpatch-maia .download-group-title strong {
  display: flex;
  min-inline-size: 0;
  flex: 1 1 auto;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
}

html.userpatch-maia .download-group-title > span:last-of-type {
  display: inline-flex;
  min-block-size: 1.25rem;
  flex: 0 0 auto;
  align-items: center;
  padding: 0.125rem 0.5rem;
  border: 1px solid var(--maia-border) !important;
  border-radius: var(--maia-radius-4xl);
  background: var(--maia-muted) !important;
  color: var(--maia-muted-foreground) !important;
  font-size: 1rem;
  font-weight: 400;
  white-space: nowrap;
}

html.userpatch-maia .format-label,
html.userpatch-maia .format-source,
html.userpatch-maia .badge,
html.userpatch-maia .badge-outline,
html.userpatch-maia .badge-psa,
html.userpatch-maia .badge-size {
  border: 1px solid var(--maia-border) !important;
  border-radius: var(--maia-radius-4xl) !important;
  background: color-mix(in oklch, var(--maia-input) 30%, transparent) !important;
  color: var(--maia-foreground) !important;
  box-shadow: none !important;
  text-shadow: none !important;
  font-weight: 400 !important;
}

html.userpatch-maia .format-label,
html.userpatch-maia .format-source {
  display: inline-flex;
  min-block-size: 1.25rem;
  align-items: center;
  padding: 0.125rem 0.5rem;
  font-size: 1rem;
  line-height: 1.2;
}

html.userpatch-maia .up-format-chevron {
  inline-size: 1rem;
  block-size: 1rem;
  flex: 0 0 auto;
  color: var(--maia-muted-foreground) !important;
  fill: none !important;
  transition: transform 150ms var(--ease-out);
}

html.userpatch-maia .up-format-chevron path {
  fill: none !important;
  stroke: currentColor !important;
}

html.userpatch-maia details.download-group[open] > .download-group-title .up-format-chevron {
  transform: rotate(180deg);
}

html.userpatch-maia .up-table-wrapper {
  max-inline-size: 100%;
  overflow: auto;
  border-block-start: 1px solid var(--maia-border);
  background: transparent !important;
  scrollbar-gutter: stable;
  scrollbar-color: color-mix(in oklch, var(--maia-foreground) 35%, transparent)
    transparent;
}

html.userpatch-maia .up-table-wrapper:focus-visible {
  outline: 3px solid color-mix(in oklch, var(--maia-ring) 50%, transparent);
  outline-offset: -3px;
}

html.userpatch-maia .up-download-table {
  inline-size: 100%;
  min-inline-size: 42rem;
  border-collapse: collapse;
  background: transparent !important;
  color: var(--maia-foreground) !important;
  font-size: 1rem;
  text-align: start;
}

html.userpatch-maia .up-download-table caption {
  position: absolute;
  inline-size: 1px;
  block-size: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}

html.userpatch-maia .up-download-table thead {
  background: transparent !important;
}

html.userpatch-maia .up-download-table th,
html.userpatch-maia .up-download-table td {
  padding: 0.75rem 0.875rem;
  border-bottom: 1px solid var(--maia-border);
  text-align: start;
  vertical-align: middle;
}

html.userpatch-maia .up-download-table thead th {
  block-size: 3rem;
  color: var(--maia-muted-foreground) !important;
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: normal;
  text-transform: none;
  white-space: nowrap;
}

html.userpatch-maia .up-download-table tbody tr:last-child > * {
  border-bottom: 0;
}

@media (hover: hover) and (pointer: fine) {
  html.userpatch-maia .up-download-table tbody tr:hover {
    background: color-mix(in oklch, var(--maia-muted) 50%, transparent) !important;
  }
}

html.userpatch-maia .up-download-table tbody th {
  inline-size: 1%;
  white-space: nowrap;
  font-weight: 500;
}

html.userpatch-maia .up-release-id {
  display: inline-flex;
  min-block-size: 1.25rem;
  align-items: center;
  padding: 0.125rem 0.5rem;
  border: 1px solid var(--maia-border);
  border-radius: var(--maia-radius-4xl);
  background: color-mix(in oklch, var(--maia-input) 30%, transparent);
  color: var(--maia-foreground);
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 1rem;
  font-variant-numeric: tabular-nums;
}

html.userpatch-maia .up-release-title {
  display: block;
  min-inline-size: 0;
  font-weight: 500;
  overflow-wrap: anywhere;
}

html.userpatch-maia .up-file-name {
  display: block;
  max-inline-size: 60ch;
  margin-block-start: 0.35rem;
  color: var(--maia-muted-foreground) !important;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 1rem;
  line-height: 1.5;
  overflow-wrap: anywhere;
  white-space: normal;
}

html.userpatch-maia .up-detail-tokens,
html.userpatch-maia .up-download-links {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.375rem;
}

html.userpatch-maia .up-detail-token {
  display: inline-flex;
  min-block-size: 1.25rem;
  align-items: center;
  padding: 0.125rem 0.5rem;
  border: 1px solid var(--maia-border);
  border-radius: var(--maia-radius-4xl);
  background: color-mix(in oklch, var(--maia-input) 30%, transparent);
  color: var(--maia-foreground);
  font-size: 1rem;
  line-height: 1.25;
  overflow-wrap: anywhere;
}

html.userpatch-maia .up-download-links {
  min-inline-size: 0;
}

html.userpatch-maia .up-download-link {
  min-block-size: 2rem;
  padding: 0.35rem 0.65rem !important;
  font-size: 1rem !important;
  white-space: nowrap;
}

html.userpatch-maia .up-source-record {
  display: none !important;
}

html.userpatch-maia .download-item,
html.userpatch-maia .episode-item,
html.userpatch-maia .episode-download-item {
  border: 0 !important;
  border-radius: 0 !important;
  background: transparent !important;
  box-shadow: none !important;
}

html.userpatch-maia .download-header,
html.userpatch-maia .episode-header {
  border: 0 !important;
  border-bottom: 1px solid var(--maia-border) !important;
  border-radius: 0 !important;
  background: transparent !important;
  color: var(--maia-foreground) !important;
  box-shadow: none !important;
}

@media (hover: hover) and (pointer: fine) {
  html.userpatch-maia .download-header:hover,
  html.userpatch-maia .episode-header:hover {
    background: var(--maia-muted) !important;
  }
}

html.userpatch-maia .download-header:active,
html.userpatch-maia .episode-header:active {
  background: var(--maia-muted) !important;
}

html.userpatch-maia .download-header .flex-1,
html.userpatch-maia .download-title-text,
html.userpatch-maia .episode-info,
html.userpatch-maia .episode-title,
html.userpatch-maia .download-title-text,
html.userpatch-maia .episode-number {
  color: var(--maia-foreground) !important;
}

html.userpatch-maia .download-item > div[id^="content-"],
html.userpatch-maia .episode-content,
html.userpatch-maia .series-season-content {
  background: transparent !important;
}

html.userpatch-maia .episode-file-title,
html.userpatch-maia .file-title {
  border-color: var(--maia-border) !important;
  background: transparent !important;
  color: var(--maia-muted-foreground) !important;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  overflow-wrap: anywhere;
}

html.userpatch-maia main h1:not(.page-title),
html.userpatch-maia main h2:not(.page-title) {
  color: var(--maia-foreground) !important;
  font-family: inherit !important;
  font-weight: 600 !important;
  letter-spacing: -0.025em;
  line-height: 1.25;
}

html.userpatch-maia .latest-releases {
  margin-block: 1.5rem 0 !important;
  padding: 0 !important;
}

html.userpatch-maia .latest-releases-header {
  display: none !important;
}

html.userpatch-maia .latest-releases-title {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  color: var(--maia-foreground) !important;
  font-size: 1.25rem !important;
  font-weight: 600 !important;
  letter-spacing: -0.02em;
  line-height: 1.3;
}

html.userpatch-maia .latest-releases-title svg {
  inline-size: 1.25rem;
  block-size: 1.25rem;
  color: var(--maia-muted-foreground) !important;
  fill: currentColor !important;
}

html.userpatch-maia .card-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
  grid-auto-rows: 1fr;
  align-items: stretch;
  column-gap: 1rem !important;
  row-gap: 2rem !important;
  padding: 0 !important;
}

html.userpatch-maia .movie-card {
  display: flex;
  min-inline-size: 0;
  flex-direction: column;
  align-items: stretch;
  overflow: visible;
  gap: 0;
  border: 0 !important;
  border-radius: 0 !important;
  background: transparent !important;
  color: var(--maia-foreground) !important;
  box-shadow: none !important;
  text-decoration: none !important;
  transition: none !important;
}

html.userpatch-maia .movie-card-image {
  position: relative;
  display: block;
  inline-size: 100%;
  aspect-ratio: 2 / 3;
  overflow: hidden;
  border: 1px solid var(--maia-poster-border) !important;
  border-radius: 1rem !important;
  background: var(--maia-muted) !important;
  box-shadow: var(--maia-card-depth-shadow) !important;
  transition: none !important;
}

html.userpatch-maia .movie-card-image.userpatch-ongoing-poster {
  border: 2px solid transparent !important;
  background:
    linear-gradient(var(--maia-muted), var(--maia-muted)) padding-box,
    linear-gradient(
        135deg in oklch,
        var(--maia-ongoing-orange) 0%,
        var(--maia-ongoing-gold) 50%,
        var(--maia-ongoing-deep-orange) 100%
      )
      border-box !important;
}

html.userpatch-maia .movie-card.userpatch-ongoing-series {
  position: relative;
  isolation: isolate;
}

html.userpatch-maia .movie-card.userpatch-ongoing-series::before {
  position: absolute;
  z-index: -1;
  inset-block-start: 0;
  inset-inline: 0;
  aspect-ratio: 2 / 3;
  border-radius: 1rem;
  background: linear-gradient(
    135deg in oklch,
    var(--maia-ongoing-orange),
    var(--maia-ongoing-gold) 52%,
    var(--maia-ongoing-deep-orange)
  );
  opacity: var(--maia-ongoing-glow-opacity, 0.22);
  filter: blur(var(--maia-ongoing-glow-blur, 16px));
  transform: scale(1.04);
  pointer-events: none;
  content: "";
}

@media (min-width: 40rem) {
  html.userpatch-maia .movie-card.userpatch-ongoing-series::before {
    border-radius: 1.5rem;
  }
}

html.userpatch-maia .movie-card:focus-visible .movie-card-image {
  border-color: color-mix(in oklch, var(--maia-foreground) 25%, transparent) !important;
}

html.userpatch-maia .movie-card:focus-visible {
  outline: none !important;
}

html.userpatch-maia .movie-card:focus-visible .movie-card-image {
  box-shadow: 0 0 0 2px var(--maia-background), 0 0 0 4px var(--maia-ring) !important;
}

html.userpatch-maia .movie-card:focus-visible .movie-card-image.userpatch-ongoing-poster {
  border-color: transparent !important;
}

html.userpatch-maia .movie-card-image > img {
  position: absolute;
  inset: 0;
  display: block;
  inline-size: 100%;
  block-size: 100%;
  object-fit: cover;
  transform: none !important;
  transition: none !important;
}

html.userpatch-maia .quality-badges,
html.userpatch-maia .movie-card-overlay {
  display: none !important;
  transition: none !important;
}

html.userpatch-maia .movie-card-content {
  display: flex;
  min-block-size: 3rem;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 0.25rem;
  align-items: center;
  padding: 0.75rem 0.25rem 0 !important;
  background: transparent !important;
  color: var(--maia-card-foreground) !important;
}

html.userpatch-maia .movie-card-title {
  display: -webkit-box;
  overflow: hidden;
  margin: 0 !important;
  color: var(--maia-foreground) !important;
  font-size: 1rem !important;
  font-weight: 400 !important;
  line-height: 1.4 !important;
  text-align: center !important;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

html.userpatch-maia .movie-card-meta {
  padding-block-start: 0.125rem !important;
  color: var(--maia-muted-foreground) !important;
  font-size: 1rem !important;
  line-height: 1.4 !important;
  text-align: center;
}

html.userpatch-maia .pagination-container {
  display: flex;
  justify-content: center;
  margin-block: 2rem 1rem !important;
}

html.userpatch-maia .pagination {
  display: flex;
  align-items: center;
  gap: 0.375rem !important;
  border: 0 !important;
  background: transparent !important;
}

html.userpatch-maia .pagination-item,
html.userpatch-maia .page-item,
html.userpatch-maia .page-link {
  display: inline-flex;
  inline-size: 2.5rem;
  min-inline-size: 2.5rem;
  block-size: 2.5rem;
  min-block-size: 2.5rem;
  align-items: center;
  justify-content: center;
  padding: 0 !important;
  border: 1px solid transparent !important;
  border-radius: var(--maia-radius-xl) !important;
  background: transparent !important;
  color: var(--maia-foreground) !important;
  font-size: 1rem !important;
  font-weight: 500 !important;
  text-decoration: none !important;
  transition:
    transform 140ms var(--ease-out),
    background-color 140ms ease,
    border-color 140ms ease;
}

@media (hover: hover) and (pointer: fine) {
  html.userpatch-maia .pagination-item:hover,
  html.userpatch-maia .page-link:hover {
    background: var(--maia-muted) !important;
  }
}

html.userpatch-maia .pagination-item:active,
html.userpatch-maia .page-link:active {
  transform: scale(0.96);
  background: var(--maia-muted) !important;
}

html.userpatch-maia .pagination-item.active,
html.userpatch-maia .page-item.active .page-link {
  border-color: var(--maia-border) !important;
  background: color-mix(in oklch, var(--maia-input) 30%, transparent) !important;
  color: var(--maia-foreground) !important;
}

html.userpatch-maia #back-to-top {
  display: inline-flex;
  inline-size: 2.25rem;
  block-size: 2.25rem;
  align-items: center;
  justify-content: center;
  padding: 0 !important;
  border: 1px solid var(--maia-border) !important;
  border-radius: var(--maia-radius-4xl) !important;
  background: var(--maia-primary) !important;
  color: var(--maia-primary-foreground) !important;
  box-shadow: none !important;
}

@media (max-width: 58rem) {
  html.userpatch-maia .content-grid.container {
    grid-template-columns: minmax(12rem, 16rem) minmax(0, 1fr);
  }
}

@media (max-width: 46rem) {
  html.userpatch-maia .page-container {
    padding: 1rem !important;
  }

  html.userpatch-maia header.sticky > .header {
    max-inline-size: calc(100% - 1rem);
  }

  html.userpatch-maia header.sticky > .header > .container {
    max-inline-size: 100%;
    gap: 0.125rem;
  }

  html.userpatch-maia .userpatch-nav-indicator {
    display: none !important;
  }

  html.userpatch-maia .main-nav.open {
    border-right: 1px solid var(--maia-border) !important;
  }

  html.userpatch-maia .main-nav.open .nav-list {
    display: flex;
    inline-size: 100% !important;
    flex-direction: column;
    align-items: stretch;
  }

  html.userpatch-maia .main-nav.open .nav-link {
    justify-content: space-between;
    padding-inline: 0.75rem !important;
  }

  html.userpatch-maia .card-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
    column-gap: 0.75rem !important;
    row-gap: 1.5rem !important;
  }

  html.userpatch-maia .content-grid.container {
    grid-template-columns: minmax(0, 1fr);
  }

  html.userpatch-maia .poster-container {
    inline-size: min(65vw, 17rem);
    max-inline-size: 17rem;
  }

  html.userpatch-maia .detail-info-box {
    padding: 1rem !important;
  }

  html.userpatch-maia .metadata-item {
    grid-template-columns: minmax(0, 1fr) !important;
    gap: 0.125rem !important;
  }

  html.userpatch-maia #series-tabs {
    inline-size: 100%;
  }

  html.userpatch-maia #series-tabs .series-tab {
    flex: 1 1 auto;
  }

  html.userpatch-maia .series-season-content {
    padding-block-end: 0.75rem !important;
    padding-inline: 0.75rem !important;
  }

  html.userpatch-maia .download-group-title {
    gap: 0.5rem;
  }

  html.userpatch-maia .up-download-table {
    min-inline-size: 39rem;
  }
}

@media (min-width: 40rem) {
  html.userpatch-maia .card-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
  }

  html.userpatch-maia .movie-card-image {
    border-radius: 1.5rem !important;
  }
}

@media (min-width: 48rem) {
  html.userpatch-maia .card-grid {
    grid-template-columns: repeat(5, minmax(0, 1fr)) !important;
  }
}

@media (min-width: 64rem) {
  html.userpatch-maia .card-grid {
    grid-template-columns: repeat(6, minmax(0, 1fr)) !important;
  }
}

html.userpatch-maia body {
  background: var(--maia-background) !important;
  color: var(--maia-foreground) !important;
}

/* The source loads important theme gradients after the redesign. */
html.userpatch-maia[data-userpatch-theme] #swup > main {
  background: var(--maia-background) !important;
  background-image: none !important;
  color: var(--maia-foreground) !important;
}

html.userpatch-maia[data-detail-theme] .content-main .info-box.mt-8.detail-info-box {
  display: none !important;
}

html.userpatch-maia[data-detail-theme] .content-main :is(
  .episode-file-title,
  .file-title,
  .up-release-id
) {
  font-family: "Inter Variable", ui-sans-serif, system-ui, sans-serif !important;
  font-size: 1rem !important;
  font-weight: 400 !important;
}

html.userpatch-maia[data-detail-theme] body :is(
  .badge,
  .badge-outline,
  .badge-psa,
  .badge-size,
  .format-label,
  .format-source,
  .metadata-token,
  .imdb-badge,
  .imdb-logo,
  .imdb-score,
  .up-release-id
) {
  font-weight: 400 !important;
}

html.userpatch-maia[data-detail-theme] body .content-main > div:first-child > .mt-2 .badge.badge-outline,
html.userpatch-maia[data-detail-theme] body .content-main > div:first-child > .mt-2 .badge.badge-outline > a {
  font-size: 1rem !important;
  font-weight: 400 !important;
}

html.userpatch-maia[data-detail-theme] body .content-main > div:first-child > .mt-2 .badge.badge-outline {
  display: inline-flex !important;
  min-block-size: 1.25rem !important;
  align-items: center;
  padding: 0.125rem 0.5rem !important;
  border: 1px solid var(--maia-border) !important;
  border-radius: var(--maia-radius-4xl) !important;
  background: color-mix(in oklch, var(--maia-input) 30%, transparent) !important;
  color: var(--maia-foreground) !important;
  box-shadow: none !important;
  text-shadow: none !important;
  line-height: 1.25 !important;
}

html.userpatch-maia[data-detail-theme] body .content-main > div:first-child > .mt-2 .badge.badge-outline > a {
  padding: 0 !important;
  border: 0 !important;
  border-radius: inherit;
  background: transparent !important;
  color: inherit !important;
  font-family: inherit !important;
  line-height: inherit !important;
}

html.userpatch-maia[data-detail-theme] .poster-container {
  border: 1px solid color-mix(in oklch, var(--maia-foreground) 10%, transparent) !important;
  background: transparent !important;
  box-shadow: none !important;
}

html.userpatch-maia[data-detail-theme] .detail-info-box {
  border: 0 !important;
  border-radius: var(--maia-radius-2xl) !important;
  background: var(--maia-card) !important;
  color: var(--maia-card-foreground) !important;
  box-shadow: 0 0 0 1px color-mix(in oklch, var(--maia-foreground) 10%, transparent) !important;
}

html.userpatch-maia[data-detail-theme] .content-grid .content-main .detail-info-box :where(p, li, span, div, ol, ul, a) {
  color: var(--maia-muted-foreground) !important;
}

html.userpatch-maia[data-detail-theme] .content-grid .content-main .detail-info-box :where(h1, h2, h3, h4, h5, strong, b) {
  color: var(--maia-foreground) !important;
}

html.userpatch-maia[data-detail-theme] #series-tabs .series-tab.active {
  border-color: var(--maia-border) !important;
  background: var(--maia-background) !important;
  color: var(--maia-foreground) !important;
  box-shadow: none !important;
}

html.userpatch-maia[data-detail-theme] #series-tabs .series-tab.active,
html.userpatch-maia[data-detail-theme] #series-tabs .series-tab.active {
  border-color: var(--maia-input) !important;
  background: color-mix(in oklch, var(--maia-input) 30%, transparent) !important;
}

html.userpatch-maia[data-detail-theme] #series-tabs .series-tab svg,
html.userpatch-maia[data-detail-theme] #series-tabs .series-tab svg * {
  color: currentColor !important;
  fill: currentColor !important;
  stroke: currentColor !important;
}

html.userpatch-maia[data-detail-theme] #complete-pack .series-season-group,
html.userpatch-maia[data-detail-theme] #episodes .series-season-group {
  overflow: hidden;
  border: 1px solid var(--maia-border) !important;
  border-radius: var(--maia-radius-2xl) !important;
  background: var(--maia-card) !important;
  box-shadow: none !important;
}

html.userpatch-maia[data-detail-theme] #complete-pack .series-season-toggle,
html.userpatch-maia[data-detail-theme] #episodes .series-season-toggle {
  border: 0 !important;
  border-radius: 0 !important;
  background: transparent !important;
  color: var(--maia-foreground) !important;
  box-shadow: none !important;
}

@media (hover: hover) and (pointer: fine) {
  html.userpatch-maia[data-detail-theme] #complete-pack .series-season-toggle:hover,
  html.userpatch-maia[data-detail-theme] #episodes .series-season-toggle:hover {
    background: var(--maia-muted) !important;
  }
}

html.userpatch-maia[data-detail-theme] #complete-pack .series-season-content,
html.userpatch-maia[data-detail-theme] #episodes .series-season-content {
  border: 0 !important;
  background: transparent !important;
}

html.userpatch-maia[data-detail-theme] #complete-pack details.download-group,
html.userpatch-maia[data-detail-theme] #episodes details.download-group {
  border: 0 !important;
  border-bottom: 1px solid var(--maia-border) !important;
  border-radius: 0 !important;
  background: transparent !important;
  box-shadow: none !important;
}

html.userpatch-maia[data-detail-theme] #complete-pack details.download-group:last-child,
html.userpatch-maia[data-detail-theme] #episodes details.download-group:last-child {
  border-bottom: 0 !important;
}

html.userpatch-maia[data-detail-theme] #complete-pack .download-group-title,
html.userpatch-maia[data-detail-theme] #episodes .download-group-title {
  border: 0 !important;
  border-radius: 0 !important;
  background: transparent !important;
  color: var(--maia-foreground) !important;
  box-shadow: none !important;
}

@media (hover: hover) and (pointer: fine) {
  html.userpatch-maia[data-detail-theme] #complete-pack .download-group-title:hover,
  html.userpatch-maia[data-detail-theme] #episodes .download-group-title:hover {
    background: var(--maia-muted) !important;
  }
}

/* Recolor the site's high-specificity legacy accent rules with Maia tokens. */
html.userpatch-maia[data-detail-theme] .content-grid .content-main :where(.movie-tagline, .episode-number, .title-source-badge.is-ott, .episode-file-title, .file-title) {
  color: var(--maia-muted-foreground) !important;
  font-style: normal !important;
  text-shadow: none !important;
}

html.userpatch-maia[data-detail-theme] .content-grid .content-main .section-title {
  color: var(--maia-foreground) !important;
}

html.userpatch-maia[data-detail-theme] .content-grid .content-main .section-title::before {
  background: transparent !important;
}

html.userpatch-maia[data-detail-theme] .content-grid .content-main .poster-container {
  border-color: color-mix(in oklch, var(--maia-foreground) 10%, transparent) !important;
  box-shadow: none !important;
}

html.userpatch-maia[data-detail-theme] header.sticky .nav-link:hover {
  border-color: transparent !important;
  background: transparent !important;
  color: var(--maia-foreground) !important;
}

@media (hover: hover) and (pointer: fine) {
  html.userpatch-maia[data-detail-theme] .content-grid .content-main .badge-outline:hover {
    border-color: var(--maia-border) !important;
    background: color-mix(in oklch, var(--maia-muted) 50%, transparent) !important;
    color: var(--maia-foreground) !important;
  }

  html.userpatch-maia[data-detail-theme] .content-grid .content-main .download-header:hover,
  html.userpatch-maia[data-detail-theme] .content-grid .content-main .episode-header:hover {
    border-color: var(--maia-border) !important;
    background-color: color-mix(in oklch, var(--maia-muted) 50%, transparent) !important;
    color: var(--maia-foreground) !important;
  }

  html.userpatch-maia[data-detail-theme] .content-grid .content-main .series-season-toggle:hover .chevron-icon {
    border-color: var(--maia-border) !important;
    background: color-mix(in oklch, var(--maia-muted) 50%, transparent) !important;
    color: var(--maia-muted-foreground) !important;
  }
}

html.userpatch-maia[data-detail-theme] .content-grid .content-main .metadata-item[data-meta-kind] .metadata-token {
  border-color: var(--maia-border) !important;
  background: color-mix(in oklch, var(--maia-input) 30%, transparent) !important;
  color: var(--maia-foreground) !important;
}

html.userpatch-maia[data-detail-theme] .content-grid .content-main .download-header code .badge,
html.userpatch-maia[data-detail-theme] .content-grid .content-main .episode-file-info .badge-size,
html.userpatch-maia[data-detail-theme] .content-grid .content-main .episode-header .episode-meta .badge {
  border: 1px solid var(--maia-border) !important;
  background: color-mix(in oklch, var(--maia-input) 30%, transparent) !important;
  color: var(--maia-foreground) !important;
}

html.userpatch-maia[data-detail-theme] .content-grid .content-main .format-label,
html.userpatch-maia[data-detail-theme] .content-grid .content-main .format-source,
html.userpatch-maia[data-detail-theme] .content-grid .content-main .format-codec,
html.userpatch-maia[data-detail-theme] .content-grid .content-main .title-source-badge.is-source {
  border: 1px solid var(--maia-border) !important;
  border-radius: var(--maia-radius-4xl) !important;
  background: color-mix(in oklch, var(--maia-input) 30%, transparent) !important;
  color: var(--maia-foreground) !important;
  box-shadow: none !important;
  text-shadow: none !important;
}

html.userpatch-maia[data-detail-theme] .content-grid .content-main .download-group-title {
  border: 0 !important;
  border-bottom: 1px solid var(--maia-border) !important;
  border-radius: 0 !important;
  background: transparent !important;
  color: var(--maia-foreground) !important;
  box-shadow: none !important;
}

html.userpatch-maia[data-detail-theme] .content-grid .content-main .download-group > .download-item,
html.userpatch-maia[data-detail-theme] .content-grid .content-main .download-item .download-item {
  border: 0 !important;
  border-radius: 0 !important;
  background: transparent !important;
  box-shadow: none !important;
}

html.userpatch-maia[data-detail-theme] .content-grid .content-main .download-item > .download-header,
html.userpatch-maia[data-detail-theme] .content-grid .content-main .episode-item > .episode-header {
  border: 0 !important;
  border-bottom: 1px solid var(--maia-border) !important;
  border-radius: 0 !important;
  background: transparent !important;
  color: var(--maia-foreground) !important;
  box-shadow: none !important;
}

html.userpatch-maia[data-detail-theme] .content-grid .content-main .download-item > div[id^="content-"],
html.userpatch-maia[data-detail-theme] .content-grid .content-main .episode-content {
  border: 0 !important;
  background: transparent !important;
}

html.userpatch-maia[data-detail-theme] .content-grid .content-main .download-item .btn,
html.userpatch-maia[data-detail-theme] .content-grid .content-main .episode-links .btn,
html.userpatch-maia[data-detail-theme] .content-grid .content-main #play-btn,
html.userpatch-maia[data-detail-theme] .content-grid .content-main #trailer-btn {
  border: 1px solid transparent !important;
  border-radius: var(--maia-radius-4xl) !important;
  background: var(--maia-primary) !important;
  color: var(--maia-primary-foreground) !important;
  box-shadow: none !important;
  font-family: inherit !important;
  font-weight: 500 !important;
}

@media (hover: hover) and (pointer: fine) {
  html.userpatch-maia[data-detail-theme] .content-grid .content-main .download-item .btn:hover,
  html.userpatch-maia[data-detail-theme] .content-grid .content-main .episode-links .btn:hover,
  html.userpatch-maia[data-detail-theme] .content-grid .content-main #play-btn:hover,
  html.userpatch-maia[data-detail-theme] .content-grid .content-main #trailer-btn:hover {
    background: color-mix(in oklch, var(--maia-primary), var(--maia-foreground) 20%) !important;
    color: var(--maia-primary-foreground) !important;
  }
}

html.userpatch-maia[data-detail-theme] .content-grid .content-main .download-item .btn:active,
html.userpatch-maia[data-detail-theme] .content-grid .content-main .episode-links .btn:active,
html.userpatch-maia[data-detail-theme] .content-grid .content-main #play-btn:active,
html.userpatch-maia[data-detail-theme] .content-grid .content-main #trailer-btn:active {
  transform: scale(0.97);
  background: color-mix(in oklch, var(--maia-primary), var(--maia-foreground) 10%) !important;
}

html.userpatch-maia[data-detail-theme] {
  accent-color: var(--maia-primary);
}

@media (prefers-reduced-motion: reduce) {
  html.userpatch-maia #main-nav,
  html.userpatch-maia .nav-link,
  html.userpatch-maia .btn,
  html.userpatch-maia #play-btn,
  html.userpatch-maia #trailer-btn,
  html.userpatch-maia #series-tabs .series-tab,
  html.userpatch-maia .up-format-chevron,
  html.userpatch-maia .userpatch-nav-indicator,
  html.userpatch-maia .userpatch-quality-indicator,
  html.userpatch-maia .userpatch-quality-tab,
  html.userpatch-maia .userpatch-quality-filter,
  html.userpatch-maia .userpatch-provider-tooltip,
  html.userpatch-maia .userpatch-provider-link,
  html.userpatch-maia .userpatch-season-trigger,
  html.userpatch-maia .userpatch-season-scroll-control,
  html.userpatch-maia .userpatch-season-popup,
  html.userpatch-maia .userpatch-season-option,
  html.userpatch-maia .userpatch-mobile-nav-item,
  html.userpatch-maia .userpatch-mobile-menu,
  html.userpatch-maia dialog.userpatch-search-dialog,
  html.userpatch-maia .pagination-item,
  html.userpatch-maia .page-link,
  html.userpatch-maia .search-toggle,
  html.userpatch-maia .theme-toggle,
  html.userpatch-maia .menu-toggle,
  html.userpatch-maia #close-mobile-menu,
  html.userpatch-maia #close-search,
  html.userpatch-maia #back-to-top {
    transform: none !important;
    transition:
      opacity 120ms ease,
      background-color 120ms ease,
      color 120ms ease !important;
  }

  html.userpatch-maia #search-overlay .search-form {
    animation: none !important;
  }
}

html.userpatch-maia svg[data-userpatch-lucide-icon] {
  fill: none !important;
  stroke: currentColor !important;
  flex: none;
}

html.userpatch-maia:has(#swup .content-grid .content-main .page-title) header.sticky,
html.userpatch-maia.userpatch-detail-page header.sticky {
  display: none !important;
}

html.userpatch-maia .userpatch-mobile-nav {
  display: none !important;
}

html.userpatch-maia .userpatch-mobile-menu:popover-open {
  position: fixed;
  inset-block: 0;
  inset-inline-start: 0;
  display: flex;
  inline-size: min(${CONFIG.mobileMenuWidth}, calc(100dvw - 2rem));
  block-size: 100dvh;
  max-block-size: 100dvh;
  max-inline-size: none;
  flex-direction: column;
  gap: 0;
  box-sizing: border-box;
  margin: 0 auto 0 0;
  padding: max(0.75rem, env(safe-area-inset-top, 0px)) 0.75rem
    max(0.75rem, env(safe-area-inset-bottom, 0px));
  overflow: hidden;
  overscroll-behavior-x: auto;
  overscroll-behavior-y: contain;
  border: 1px solid var(--maia-border);
  border-inline-start: 0;
  border-radius: 0 var(--maia-radius-2xl) var(--maia-radius-2xl) 0;
  background: var(--maia-card);
  color: var(--maia-foreground);
  box-shadow: 0 24px 64px rgb(0 0 0 / 0.45);
  transform: translateX(0);
  transition: transform 220ms var(--ease-drawer);
}

@starting-style {
  html.userpatch-maia .userpatch-mobile-menu:popover-open {
    transform: translateX(-100%);
  }
}

html.userpatch-maia .userpatch-mobile-menu:popover-open::backdrop {
  background: rgb(0 0 0 / 80%);
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
  transition: opacity 220ms var(--ease-out);
}

html.userpatch-maia .userpatch-mobile-menu-header {
  display: flex;
  min-block-size: 3.5rem;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0 0.5rem 0.75rem;
  border-bottom: 1px solid var(--maia-border);
}

html.userpatch-maia .userpatch-mobile-menu-title {
  margin: 0;
  color: var(--maia-foreground);
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.25;
}

html.userpatch-maia .userpatch-mobile-menu-close {
  display: inline-flex;
  inline-size: 2.5rem;
  block-size: 2.5rem;
  flex: none;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: 1px solid var(--maia-border);
  border-radius: var(--maia-radius-xl);
  background: var(--maia-muted);
  color: var(--maia-foreground);
  cursor: pointer;
}

html.userpatch-maia .userpatch-mobile-menu-close svg,
html.userpatch-maia .userpatch-mobile-menu-summary svg {
  inline-size: 1.25rem;
  block-size: 1.25rem;
}

html.userpatch-maia .userpatch-mobile-menu-nav {
  min-block-size: 0;
  flex: 1 1 auto;
  overflow-x: hidden;
  overflow-y: auto;
  overscroll-behavior-x: auto;
  overscroll-behavior-y: contain;
  padding-block: 0.75rem;
  scrollbar-width: none;
}

html.userpatch-maia .userpatch-mobile-menu-nav::-webkit-scrollbar {
  display: none;
}

html.userpatch-maia .userpatch-mobile-menu-list,
html.userpatch-maia .userpatch-mobile-menu-sublist {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

html.userpatch-maia .userpatch-mobile-menu-item {
  min-inline-size: 0;
  margin: 0;
  padding: 0;
}

html.userpatch-maia .userpatch-mobile-menu-link,
html.userpatch-maia .userpatch-mobile-menu-summary {
  display: flex;
  inline-size: 100%;
  min-block-size: 3rem;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  box-sizing: border-box;
  padding: 0.75rem 0.875rem;
  border: 0;
  border-radius: var(--maia-radius-xl);
  background: transparent;
  color: var(--maia-foreground);
  font: inherit;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.25;
  text-align: start;
  text-decoration: none;
  cursor: pointer;
  list-style: none;
}

html.userpatch-maia .userpatch-mobile-menu-summary::-webkit-details-marker {
  display: none;
}

html.userpatch-maia .userpatch-mobile-menu-link:focus-visible,
html.userpatch-maia .userpatch-mobile-menu-summary:focus-visible,
html.userpatch-maia .userpatch-mobile-menu-close:focus-visible {
  background: var(--maia-selection-bg, color-mix(in oklch, var(--maia-foreground) 9%, transparent));
  color: var(--maia-foreground);
}

@media (hover: hover) and (pointer: fine) {
  html.userpatch-maia .userpatch-mobile-menu-link:hover,
  html.userpatch-maia .userpatch-mobile-menu-summary:hover {
    background: var(--maia-selection-bg, color-mix(in oklch, var(--maia-foreground) 9%, transparent));
    color: var(--maia-foreground);
  }
}

html.userpatch-maia .userpatch-mobile-menu-link:active,
html.userpatch-maia .userpatch-mobile-menu-summary:active,
html.userpatch-maia .userpatch-mobile-menu-close:active {
  background: color-mix(in oklch, var(--maia-foreground) 14%, transparent);
}

html.userpatch-maia .userpatch-mobile-menu-link:focus-visible,
html.userpatch-maia .userpatch-mobile-menu-summary:focus-visible,
html.userpatch-maia .userpatch-mobile-menu-close:focus-visible {
  outline: 2px solid var(--maia-ring);
  outline-offset: -2px;
}

html.userpatch-maia .userpatch-mobile-menu-summary svg {
  flex: none;
  transition: transform 140ms ease-out;
}

html.userpatch-maia .userpatch-mobile-menu-group[open]
  .userpatch-mobile-menu-summary svg {
  transform: rotate(180deg);
}

html.userpatch-maia .userpatch-mobile-menu-sublist {
  gap: 0.125rem;
  padding: 0.125rem 0.25rem 0.5rem 0.75rem;
}

html.userpatch-maia .userpatch-mobile-menu-sublist .userpatch-mobile-menu-link {
  min-block-size: 2.5rem;
  padding-inline: 0.75rem;
  color: var(--maia-muted-foreground);
  font-size: 0.9375rem;
  font-weight: 400;
}

html.userpatch-maia:has(#swup .content-grid .content-main .page-title) #back-to-top,
html.userpatch-maia.userpatch-detail-page #back-to-top {
  display: none !important;
}

html.userpatch-maia.userpatch-detail-page,
html.userpatch-maia.userpatch-detail-page body {
  block-size: 100%;
  overflow: hidden;
}

html.userpatch-maia.userpatch-detail-page body > .flex.min-h-screen {
  block-size: 100dvh;
  min-block-size: 0;
  overflow: hidden;
}

html.userpatch-maia.userpatch-detail-page #swup {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  block-size: 100%;
  min-block-size: 0;
  overflow: hidden;
}

html.userpatch-maia.userpatch-detail-page #swup > main {
  display: flex;
  flex: 1 1 auto;
  min-block-size: 0;
  overflow: hidden;
}

html.userpatch-maia.userpatch-detail-page #swup > footer {
  display: none !important;
}

html.userpatch-maia.userpatch-detail-page .page-container {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  inline-size: 100%;
  max-inline-size: 88rem !important;
  min-block-size: 0;
  margin: 0 auto;
  box-sizing: border-box;
  padding-block: 0 !important;
  padding-inline: var(--maia-gutter) !important;
}

html.userpatch-maia.userpatch-detail-page .content-grid.container {
  display: grid;
  flex: 1 1 auto;
  grid-template-columns: minmax(17rem, min(21rem, 30vw)) minmax(0, 1fr);
  align-items: stretch;
  gap: var(--maia-gutter);
  column-gap: 2rem;
  inline-size: 100%;
  max-inline-size: none;
  min-block-size: 0;
  margin: 0;
  padding: 0;
}

html.userpatch-maia.userpatch-detail-page .content-sidebar {
  display: flex;
  min-inline-size: 0;
  min-block-size: 0;
  align-items: flex-start;
  justify-content: flex-start;
}

html.userpatch-maia.userpatch-detail-page .userpatch-poster-panel {
  position: sticky;
  inset-block-start: 1rem;
  display: flex;
  inline-size: min(100%, 24rem);
  max-block-size: calc(100dvh - 2rem);
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  box-sizing: border-box;
  margin-inline: auto;
  padding: 0.875rem;
  overflow: auto;
  border: 1px solid var(--maia-border);
  border-radius: var(--maia-radius-4xl);
  background: var(--maia-card);
  box-shadow: var(--maia-card-depth-shadow);
}

html.userpatch-maia.userpatch-detail-page .userpatch-detail-breadcrumb {
  display: flex;
  inline-size: 100%;
  align-items: center;
  justify-content: flex-start;
  gap: 0.375rem;
  margin: 0;
  padding: 0 0.125rem;
  color: var(--maia-muted-foreground);
  font-size: 0.8125rem !important;
}

html.userpatch-maia.userpatch-detail-page .userpatch-detail-breadcrumb a {
  min-block-size: 2rem;
  color: inherit !important;
  text-decoration: none;
}

html.userpatch-maia.userpatch-detail-page .userpatch-detail-brand {
  display: flex;
  inline-size: min(100%, 18rem);
  min-block-size: 2.75rem;
  align-items: center;
  justify-content: center;
  flex: none;
}

html.userpatch-maia.userpatch-detail-page .userpatch-detail-brand img {
  display: block;
  inline-size: 100%;
  max-block-size: 3.5rem;
  object-fit: contain;
  filter: none !important;
}

html.userpatch-maia.userpatch-detail-page .userpatch-poster-panel .poster-container {
  inline-size: min(100%, min(21rem, max(9rem, calc(66.667dvh - 7.333rem))));
  block-size: auto;
  max-inline-size: 100%;
  aspect-ratio: 2 / 3;
  margin: 0;
  border: 1px solid var(--maia-border) !important;
  border-radius: var(--maia-radius-2xl) !important;
  background: var(--maia-background) !important;
  box-shadow: 0 12px 32px rgb(0 0 0 / 0.3) !important;
}

html.userpatch-maia.userpatch-detail-page .userpatch-poster-panel .poster-image,
html.userpatch-maia.userpatch-detail-page .userpatch-poster-panel .poster-image img {
  inline-size: 100%;
  block-size: 100%;
}

html.userpatch-maia.userpatch-detail-page .content-main {
  block-size: 100%;
  box-sizing: border-box;
  min-inline-size: 0;
  min-block-size: 0;
  padding: 0 !important;
  overflow-x: hidden;
  overflow-y: auto;
  overscroll-behavior-x: auto;
  overscroll-behavior-y: contain;
  scrollbar-gutter: stable;
}

html.userpatch-maia.userpatch-detail-page .content-main > :first-child {
  margin-block-start: 0;
}

@media (max-width: 46rem) {
  html.userpatch-maia:not(.userpatch-detail-page) header.sticky {
    position: sticky;
    inset-block-start: 1rem;
    block-size: auto;
    min-block-size: 0;
    margin-block: 1rem 1.5rem;
    padding: 0;
    overflow: visible;
  }

  html.userpatch-maia:not(.userpatch-detail-page) header.sticky > .header {
    inline-size: calc(100% - 2rem);
    max-inline-size: calc(100% - 2rem);
    margin-inline: auto;
  }

  html.userpatch-maia:not(.userpatch-detail-page) header.sticky > .header > .container {
    inline-size: 100% !important;
    max-inline-size: 100%;
    justify-content: space-between;
    gap: 0.25rem;
  }

  html.userpatch-maia:not(.userpatch-detail-page) header.sticky .navbar-brand {
    min-inline-size: 3rem;
    padding-inline: 0.25rem;
  }

  html.userpatch-maia:not(.userpatch-detail-page) header.sticky #menu-toggle,
  html.userpatch-maia:not(.userpatch-detail-page) header.sticky #search-toggle {
    display: inline-flex;
    flex: none;
  }

  html.userpatch-maia.userpatch-detail-page {
    block-size: auto;
    min-block-size: 100%;
    overflow: auto;
  }

  html.userpatch-maia.userpatch-detail-page body {
    block-size: auto;
    min-block-size: 100%;
    overflow: visible;
  }

  html.userpatch-maia.userpatch-detail-page body > .flex.min-h-screen {
    block-size: auto;
    min-block-size: 100dvh;
    overflow: visible;
  }

  html.userpatch-maia.userpatch-detail-page #swup {
    block-size: auto;
    min-block-size: 0;
    overflow: visible;
  }

  html.userpatch-maia.userpatch-detail-page #swup > main {
    display: block;
    overflow: visible;
  }

  html.userpatch-maia.userpatch-detail-page .page-container {
    min-block-size: 100dvh;
    padding: var(--maia-gutter) !important;
  }

  html.userpatch-maia.userpatch-detail-page .content-grid.container {
    flex: none;
    grid-template-columns: minmax(0, 1fr);
    gap: 1.25rem;
    min-block-size: auto;
  }

  html.userpatch-maia.userpatch-detail-page .content-sidebar {
    min-block-size: 0;
    align-items: stretch;
  }

  html.userpatch-maia.userpatch-detail-page .userpatch-poster-panel {
    position: static;
    inline-size: min(100%, 28rem);
    max-block-size: none;
    margin-inline: auto;
    overflow: visible;
  }

  html.userpatch-maia.userpatch-detail-page .userpatch-poster-panel .poster-container {
    inline-size: min(65vw, 17rem);
    block-size: auto;
    max-inline-size: 100%;
    aspect-ratio: 2 / 3;
  }

  html.userpatch-maia.userpatch-detail-page .content-main {
    block-size: auto;
    min-block-size: 0;
    padding: 0 !important;
    overflow: visible;
    scrollbar-gutter: auto;
  }
}

html.userpatch-maia.userpatch-detail-page .content-sidebar {
  position: sticky;
  inset-block-start: 1rem;
  align-self: stretch;
  block-size: calc(100dvh - 2rem);
  align-items: flex-start;
  justify-content: flex-start;
  overflow: visible;
}

html.userpatch-maia.userpatch-detail-page .userpatch-detail-stack {
  display: flex;
  inline-size: min(100%, 21rem, 42dvh);
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-inline: 0;
  padding: 0;
  border: 0;
  border-radius: 0;
  background: transparent;
  box-shadow: none;
}

html.userpatch-maia.userpatch-detail-page .userpatch-detail-brand {
  inline-size: min(100%, 16rem);
  min-block-size: 0;
  margin: 0;
}

html.userpatch-maia.userpatch-detail-page .userpatch-detail-brand img {
  inline-size: 100%;
  max-block-size: 4rem;
}

html.userpatch-maia.userpatch-detail-page .content-sidebar .poster-container {
  display: block;
  inline-size: 100%;
  max-inline-size: 100%;
  margin: 0;
  padding: 0 !important;
  overflow: hidden;
  aspect-ratio: 2 / 3;
  border: 1px solid var(--maia-poster-border) !important;
  border-radius: 1rem !important;
  background: var(--maia-muted) !important;
  box-shadow: var(--maia-card-depth-shadow) !important;
}

html.userpatch-maia.userpatch-detail-page .content-sidebar .poster-image,
html.userpatch-maia.userpatch-detail-page .content-sidebar .poster-image img {
  inline-size: 100%;
  block-size: 100%;
}

html.userpatch-maia.userpatch-detail-page .content-sidebar .poster-image img {
  display: block;
  object-fit: cover;
}

html.userpatch-maia.userpatch-detail-page
  .content-sidebar
  .poster-container.userpatch-ongoing-poster {
  border: 2px solid transparent !important;
  background:
    linear-gradient(var(--maia-muted), var(--maia-muted)) padding-box,
    linear-gradient(
        135deg in oklch,
        var(--maia-ongoing-orange) 0%,
        var(--maia-ongoing-gold) 50%,
        var(--maia-ongoing-deep-orange) 100%
      )
      border-box !important;
  box-shadow:
    var(--maia-card-depth-shadow),
    var(--maia-ongoing-shadow,
      0 0 18px color-mix(in oklch, var(--maia-ongoing-orange) 24%, transparent),
      0 0 34px color-mix(in oklch, var(--maia-ongoing-gold) 15%, transparent)) !important;
}

html.userpatch-maia.userpatch-detail-page .userpatch-detail-title {
  max-inline-size: 100%;
  margin-block-start: 0;
  color: var(--maia-foreground) !important;
  font-family: var(--detail-font-display, inherit) !important;
  font-size: 1.25rem !important;
  font-weight: 500 !important;
  letter-spacing: -0.02em;
  line-height: 1.25;
  text-align: center;
  overflow-wrap: anywhere;
}

html.userpatch-maia.userpatch-detail-page .userpatch-imdb-score {
  display: inline-flex;
  min-block-size: 1.5rem;
  align-items: center;
  gap: 0.375rem;
  color: var(--maia-foreground);
  font-size: 1rem;
  line-height: 1;
}

html.userpatch-maia.userpatch-detail-page .userpatch-imdb-score img {
  display: block;
  inline-size: auto;
  block-size: 1rem;
  object-fit: contain;
}

html.userpatch-maia.userpatch-detail-page .userpatch-imdb-rating {
  font-size: 1rem;
  font-weight: 500;
}

html.userpatch-maia.userpatch-detail-page .userpatch-poster-badges {
  display: flex;
  max-inline-size: 100%;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-block-start: 0.125rem;
}

html.userpatch-maia.userpatch-detail-page .userpatch-poster-badges[hidden] {
  display: none !important;
}

html.userpatch-maia.userpatch-detail-page .userpatch-media-badge {
  display: inline-flex;
  min-inline-size: 2rem;
  min-block-size: 1.375rem;
  align-items: center;
  justify-content: center;
  padding: 0.125rem 0.25rem;
  border: 1px solid var(--maia-border);
  border-radius: var(--maia-radius-2xl);
  background: color-mix(in oklch, var(--maia-input) 30%, transparent);
}

html.userpatch-maia.userpatch-detail-page .userpatch-media-badge img {
  display: block;
  inline-size: auto;
  max-inline-size: none;
  block-size: 1rem;
  object-fit: contain;
  filter: invert(1) grayscale(1);
}

html.userpatch-maia.userpatch-detail-page .userpatch-release-toolbar {
  display: grid;
  grid-template-columns: minmax(12rem, 1fr) auto;
  align-items: center;
  gap: 0.75rem 1rem;
  margin-block: 0 1rem;
}

html.userpatch-maia.userpatch-detail-page .userpatch-release-search {
  display: flex;
  min-inline-size: 0;
  min-block-size: 2.75rem;
  align-items: center;
  gap: 0.625rem;
  padding-inline: 0.875rem;
  border: 1px solid var(--maia-border);
  border-radius: var(--maia-radius-2xl);
  background: var(--maia-card);
  color: var(--maia-muted-foreground);
}

html.userpatch-maia.userpatch-detail-page .userpatch-release-search svg {
  inline-size: 1.125rem;
  block-size: 1.125rem;
  flex: none;
}

html.userpatch-maia.userpatch-detail-page .userpatch-release-search-input {
  inline-size: 100%;
  min-inline-size: 0;
  border: 0 !important;
  outline: 0;
  background: transparent !important;
  color: var(--maia-foreground) !important;
  font: inherit;
  font-size: 1rem !important;
  box-shadow: none !important;
}

html.userpatch-maia.userpatch-detail-page .userpatch-release-search-input::placeholder {
  color: var(--maia-muted-foreground);
  opacity: 1;
}

html.userpatch-maia.userpatch-detail-page .userpatch-quality-filters {
  display: inline-flex;
  min-block-size: 2.75rem;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem;
  border: 1px solid var(--maia-border);
  border-radius: var(--maia-radius-2xl);
  background: var(--maia-card);
}

html.userpatch-maia.userpatch-detail-page .userpatch-quality-filter {
  display: inline-flex;
  min-inline-size: 2.75rem;
  min-block-size: 2.125rem;
  align-items: center;
  justify-content: center;
  padding: 0 0.625rem;
  border: 0;
  border-radius: var(--maia-radius-xl);
  background: transparent;
  color: var(--maia-muted-foreground);
  font: inherit;
  font-size: 0.8125rem;
  font-weight: 500;
  cursor: pointer;
  transition:
    transform 140ms var(--ease-out),
    background-color 140ms ease,
    color 140ms ease;
}

html.userpatch-maia.userpatch-detail-page .userpatch-quality-filter[aria-pressed="true"] {
  background: var(--maia-secondary);
  color: var(--maia-foreground);
}

@media (hover: hover) and (pointer: fine) {
  html.userpatch-maia.userpatch-detail-page .userpatch-quality-filter:hover {
    background: var(--maia-secondary);
    color: var(--maia-foreground);
  }
}

html.userpatch-maia.userpatch-detail-page .userpatch-quality-filter:active {
  transform: scale(0.96);
}

html.userpatch-maia.userpatch-detail-page .userpatch-quality-filter:focus-visible {
  outline: 2px solid var(--maia-ring);
  outline-offset: 2px;
}

html.userpatch-maia.userpatch-detail-page .userpatch-quality-filter img {
  display: block;
  inline-size: 1.625rem;
  block-size: 0.9375rem;
  filter: brightness(0) invert(1);
}

html.userpatch-maia.userpatch-detail-page .userpatch-release-status {
  grid-column: 1 / -1;
  margin: 0;
  color: var(--maia-muted-foreground);
  font-size: 0.8125rem;
}

html.userpatch-maia.userpatch-detail-page .userpatch-movie-releases .space-y-4 {
  display: flex;
  flex-direction: column;
  gap: 0;
}

html.userpatch-maia.userpatch-detail-page .userpatch-movie-releases .space-y-4 > :not([hidden]) ~ :not([hidden]) {
  margin-top: 0 !important;
}

html.userpatch-maia.userpatch-detail-page .userpatch-movie-releases .download-group {
  margin: 0;
  padding: 0;
  border-block-end: 1px solid var(--maia-border);
}

html.userpatch-maia.userpatch-detail-page .userpatch-movie-releases .download-group-title {
  min-block-size: 3rem;
  margin: 0;
  padding: 0.75rem 0 !important;
  border-block-end: 1px solid var(--maia-border) !important;
  font-size: 0.9375rem !important;
}

html.userpatch-maia.userpatch-detail-page .userpatch-movie-releases .download-group-title:hover {
  background: transparent !important;
}

html.userpatch-maia.userpatch-detail-page .userpatch-movie-releases .download-item {
  min-inline-size: 0;
  margin: 0 !important;
  padding: 0;
}

html.userpatch-maia.userpatch-detail-page .userpatch-movie-releases .download-header {
  min-block-size: 5.25rem;
  gap: 1rem;
  padding: 0.875rem 0 !important;
  cursor: pointer;
}

html.userpatch-maia.userpatch-detail-page .userpatch-movie-releases .download-header:hover {
  background: color-mix(in oklch, var(--maia-muted) 42%, transparent) !important;
}

html.userpatch-maia.userpatch-detail-page .userpatch-movie-releases .download-title-text {
  font-size: 0.9375rem;
  font-weight: 500;
  line-height: 1.4;
}

html.userpatch-maia.userpatch-detail-page .userpatch-movie-releases .download-item.userpatch-filter-hidden,
html.userpatch-maia.userpatch-detail-page .userpatch-movie-releases .download-group.userpatch-filter-hidden {
  display: none !important;
}

@media (max-width: 46rem) {
  html.userpatch-maia.userpatch-detail-page .content-sidebar {
    position: static;
    block-size: auto;
  }

  html.userpatch-maia.userpatch-detail-page .userpatch-detail-stack {
    inline-size: min(100%, 28rem);
    margin-inline: auto;
  }

  html.userpatch-maia.userpatch-detail-page .content-sidebar .poster-container {
    inline-size: min(65vw, 17rem);
  }

  html.userpatch-maia.userpatch-detail-page .userpatch-release-toolbar {
    grid-template-columns: minmax(0, 1fr);
  }

  html.userpatch-maia.userpatch-detail-page .userpatch-quality-filters {
    justify-self: start;
  }
}

@media (min-width: 40rem) {
  html.userpatch-maia.userpatch-detail-page .content-sidebar .poster-container {
    border-radius: 1.5rem !important;
  }
}

html.userpatch-maia.userpatch-detail-page .userpatch-media-badge {
  display: inline-flex;
  min-inline-size: 0;
  min-block-size: 0;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: 0;
  border-radius: 0;
  background: transparent;
  box-shadow: none;
}

html.userpatch-maia.userpatch-detail-page .userpatch-media-badge img {
  inline-size: auto;
  max-inline-size: none;
  block-size: 1rem;
}

html.userpatch-maia.userpatch-detail-page .userpatch-release-toolbar {
  display: contents;
}

html.userpatch-maia.userpatch-detail-page .userpatch-quality-tabs {
  position: sticky;
  inset-block-start: 0;
  z-index: 5;
  isolation: isolate;
  display: flex;
  inline-size: fit-content;
  max-inline-size: 100%;
  align-items: center;
  gap: 2px;
  overflow: visible;
  margin-block: 0 0.75rem;
  margin-inline-start: auto;
  padding: 0.25rem;
  border: 0;
  border-radius: 1rem;
  background: transparent;
  box-shadow: none;
  scrollbar-width: none;
}

html.userpatch-maia.userpatch-detail-page .userpatch-quality-tabs[hidden] {
  display: none !important;
}

html.userpatch-maia.userpatch-detail-page .userpatch-series-selects > .userpatch-quality-tabs {
  position: relative;
  inset-block-start: auto;
  margin: 0;
  flex: 0 0 auto;
}

html.userpatch-maia.userpatch-detail-page .userpatch-quality-tabs::-webkit-scrollbar {
  display: none;
}

html.userpatch-maia.userpatch-detail-page .userpatch-quality-indicator {
  position: absolute;
  z-index: 0;
  inset-block-start: 0;
  inset-inline-start: 0;
  display: block;
  inline-size: 100px;
  block-size: 36px;
  border-radius:
    var(--userpatch-quality-radius-x, 12px) /
    var(--userpatch-quality-radius-y, 12px);
  background: var(--maia-selection-bg, rgb(255 255 255 / 0.15));
  box-shadow: var(--maia-selection-shadow, inset 0 1px 2px rgb(255 255 255 / 0.12));
  opacity: 0;
  pointer-events: none;
  transform: translate3d(
      var(--userpatch-quality-x, 0px),
      var(--userpatch-quality-y, 0px),
      0
    )
    scale(
      var(--userpatch-quality-scale-x, 1),
      var(--userpatch-quality-scale-y, 1)
    );
  transform-origin: left top;
}

html.userpatch-maia.userpatch-detail-page .userpatch-quality-indicator[data-ready="true"] {
  opacity: 1;
}

html.userpatch-maia.userpatch-detail-page .userpatch-quality-indicator[data-animate="true"] {
  transition: transform 240ms cubic-bezier(0.77, 0, 0.175, 1);
}

html.userpatch-maia.userpatch-detail-page .userpatch-quality-tab {
  position: relative;
  z-index: 1;
  display: flex;
  min-block-size: 40px;
  flex: none;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 8px 14px;
  border: 0;
  border-radius: 12px;
  background: transparent !important;
  color: var(--maia-muted-foreground);
  font: inherit;
  font-weight: 500;
  line-height: 1;
  cursor: pointer;
  transition:
    transform 140ms var(--ease-out),
    color 140ms var(--ease-out);
}

html.userpatch-maia.userpatch-detail-page .userpatch-quality-tab[data-tab-content="label"] {
  min-inline-size: 48px;
  font-size: 0.875rem !important;
}

html.userpatch-maia.userpatch-detail-page body .userpatch-quality-tabs .userpatch-quality-tab,
html.userpatch-maia.userpatch-detail-page body .userpatch-quality-tabs .userpatch-quality-tab[data-tab-content="label"] {
  font-size: 0.875rem !important;
}

html.userpatch-maia.userpatch-detail-page .userpatch-quality-tab[aria-pressed="true"] {
  color: var(--maia-foreground);
}

@media (hover: hover) and (pointer: fine) {
  html.userpatch-maia.userpatch-detail-page .userpatch-quality-tab:hover:not(:disabled) {
    color: var(--maia-foreground);
  }
}

html.userpatch-maia.userpatch-detail-page .userpatch-quality-tab:active:not(:disabled) {
  transform: scale(0.96);
}

html.userpatch-maia.userpatch-detail-page .userpatch-quality-tabs,
html.userpatch-maia.userpatch-detail-page .userpatch-quality-filters,
html.userpatch-maia.userpatch-detail-page #series-tabs {
  touch-action: auto;
}

html.userpatch-maia.userpatch-detail-page .userpatch-quality-tab:focus-visible {
  outline: 2px solid var(--maia-ring);
  outline-offset: -2px;
}

html.userpatch-maia.userpatch-detail-page .userpatch-quality-tab:disabled {
  color: var(--maia-muted-foreground);
  cursor: not-allowed;
}

html.userpatch-maia.userpatch-detail-page .userpatch-quality-tab img {
  display: block;
  inline-size: auto;
  block-size: 1.125rem;
  filter: invert(1);
}

html.userpatch-maia.userpatch-detail-page .userpatch-quality-tab:disabled img {
  filter: invert(1) grayscale(1) opacity(0.45);
}

html.userpatch-maia.userpatch-detail-page .userpatch-release-search,
html.userpatch-maia.userpatch-detail-page .userpatch-release-status,
html.userpatch-maia.userpatch-detail-page .userpatch-movie-releases .download-group-title {
  display: none !important;
}

html.userpatch-maia.userpatch-detail-page .userpatch-movie-releases .space-y-4 {
  display: flex;
  flex-direction: column;
  gap: 0;
  border-block-start: 1px solid
    color-mix(in oklch, var(--maia-foreground) 16%, transparent) !important;
  border-block-end: 0 !important;
}

html.userpatch-maia.userpatch-detail-page .userpatch-movie-releases .space-y-4 > :not([hidden]) ~ :not([hidden]) {
  margin-block-start: 0 !important;
}

html.userpatch-maia.userpatch-detail-page .userpatch-movie-releases .download-group {
  display: contents;
}

html.userpatch-maia.userpatch-detail-page .userpatch-movie-releases .download-item {
  min-inline-size: 0;
  min-block-size: 96px;
  margin: 0 !important;
  padding: 0 !important;
  border: 0 !important;
  border-radius: 0 !important;
  background: transparent !important;
  box-shadow: none !important;
}

html.userpatch-maia.userpatch-detail-page .userpatch-release-item {
  display: block;
}

html.userpatch-maia.userpatch-detail-page .userpatch-release-row {
  display: flex;
  inline-size: 100%;
  min-block-size: 96px;
  align-items: center;
  gap: 12px;
  box-sizing: border-box;
  padding: 24px 16px;
  border-block-end: 1px solid
    color-mix(in oklch, var(--maia-foreground) 16%, transparent);
  color: var(--maia-foreground);
  transition: background 160ms var(--ease-out);
}

html.userpatch-maia .userpatch-release-row[data-userpatch-opened="true"],
html.userpatch-maia .userpatch-release-item[data-userpatch-opened="true"] .userpatch-release-row,
html.userpatch-maia.userpatch-detail-page .userpatch-release-row[data-userpatch-opened="true"],
html.userpatch-maia.userpatch-detail-page .userpatch-release-item[data-userpatch-opened="true"] .userpatch-release-row {
  background: color-mix(in oklch, var(--maia-opened-blue) 30%, transparent) !important;
}

@media (hover: hover) and (pointer: fine) {
  html.userpatch-maia .userpatch-release-row[data-userpatch-opened="true"]:hover,
  html.userpatch-maia .userpatch-release-item[data-userpatch-opened="true"]:hover .userpatch-release-row,
  html.userpatch-maia.userpatch-detail-page .userpatch-release-row[data-userpatch-opened="true"]:hover,
  html.userpatch-maia.userpatch-detail-page .userpatch-release-item[data-userpatch-opened="true"]:hover .userpatch-release-row {
    background: color-mix(in oklch, var(--maia-opened-blue) 38%, transparent) !important;
  }
}

html.userpatch-maia.userpatch-detail-page .userpatch-release-copy {
  display: flex;
  min-inline-size: 0;
  flex: 1;
  flex-direction: column;
  gap: 4px;
}

html.userpatch-maia .userpatch-release-file-title,
html.userpatch-maia .userpatch-release-file-text,
html.userpatch-maia.userpatch-detail-page .userpatch-release-file-title,
html.userpatch-maia.userpatch-detail-page .userpatch-release-file-text,
html.userpatch-maia[data-detail-theme] .userpatch-release-file-title,
html.userpatch-maia[data-detail-theme] .userpatch-release-file-text {
  color: var(--maia-foreground);
  font-size: 0.875rem !important;
  font-weight: 400;
  line-height: ${CONFIG.filenameLineHeight};
  overflow-wrap: anywhere;
}

@media (min-width: 761px) {
  html.userpatch-maia .userpatch-release-file-title,
  html.userpatch-maia .userpatch-release-file-text,
  html.userpatch-maia.userpatch-detail-page .userpatch-release-file-title,
  html.userpatch-maia.userpatch-detail-page .userpatch-release-file-text,
  html.userpatch-maia[data-detail-theme] .userpatch-release-file-title,
  html.userpatch-maia[data-detail-theme] .userpatch-release-file-text {
    font-size: 1.125rem !important;
  }
}

html.userpatch-maia.userpatch-detail-page .userpatch-release-file-text {
  overflow-wrap: break-word;
  word-break: normal;
}

html.userpatch-maia.userpatch-detail-page .userpatch-release-file-title[data-clamped] {
  max-block-size: var(--userpatch-filename-max-block-size);
  overflow: clip;
}

html.userpatch-maia.userpatch-detail-page .userpatch-release-file-title[data-expanded] {
  max-block-size: none;
  overflow: visible;
}

html.userpatch-maia.userpatch-detail-page[data-detail-theme] .userpatch-filename-toggle {
  display: inline;
  margin-inline-start: 0.25rem;
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--maia-muted-foreground);
  font: inherit;
  font-size: inherit !important;
  font-weight: 500;
  line-height: inherit;
  text-decoration: underline;
  text-underline-offset: 2px;
  cursor: pointer;
}

html.userpatch-maia.userpatch-detail-page .userpatch-filename-toggle[hidden] {
  display: none !important;
}

html.userpatch-maia.userpatch-detail-page .userpatch-filename-toggle:focus-visible {
  border-radius: 2px;
  outline: 2px solid var(--maia-ring);
  outline-offset: 2px;
}

html.userpatch-maia.userpatch-detail-page .content-main .userpatch-release-row .userpatch-release-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  color: var(--maia-muted-foreground);
  font-size: 0.875rem !important;
  font-weight: 400;
  line-height: 1.4;
  overflow-wrap: anywhere;
}

html.userpatch-maia.userpatch-detail-page .userpatch-release-meta .userpatch-release-size {
  font-size: inherit !important;
}

html.userpatch-maia.userpatch-detail-page .content-main .userpatch-release-row .userpatch-release-meta .userpatch-series-language-badge {
  align-self: center;
}

html.userpatch-maia.userpatch-detail-page body .content-main .userpatch-release-meta {
  font-size: 0.875rem !important;
}

html.userpatch-maia.userpatch-detail-page .userpatch-release-actions {
  position: relative;
  z-index: 1;
  display: flex;
  flex: none;
  align-items: center;
  gap: 12px;
}

html.userpatch-maia.userpatch-detail-page .userpatch-provider-link {
  position: relative;
  display: inline-flex;
  inline-size: 40px;
  block-size: 40px;
  align-items: center;
  justify-content: center;
  padding: 0 !important;
  border: 0 !important;
  border-radius: 0 !important;
  outline-offset: 3px;
  background: transparent !important;
  color: inherit;
  box-shadow: none !important;
  text-decoration: none;
  transition:
    transform 140ms var(--ease-out),
    opacity 140ms var(--ease-out);
}

@media (hover: hover) and (pointer: fine) {
  html.userpatch-maia.userpatch-detail-page .userpatch-provider-link:hover {
    background: transparent !important;
    opacity: 0.78;
  }
}

html.userpatch-maia.userpatch-detail-page .userpatch-provider-link:active {
  transform: scale(0.95);
  opacity: 0.6;
}

html.userpatch-maia.userpatch-detail-page .userpatch-provider-link:focus-visible {
  outline: 2px solid var(--maia-ring);
}

html.userpatch-maia.userpatch-detail-page .userpatch-provider-link img {
  display: block;
  inline-size: 36px;
  block-size: 36px;
  object-fit: contain;
}

html.userpatch-maia.userpatch-detail-page body .userpatch-provider-tooltip {
  position: fixed;
  z-index: 2147483647;
  display: inline-flex;
  width: max-content;
  max-width: 20rem;
  align-items: center;
  padding: 0.375rem 0.75rem;
  border-radius: 1rem;
  background: var(--maia-foreground);
  color: var(--maia-background);
  font-size: 0.75rem !important;
  font-weight: 400;
  line-height: 1.25;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transform: translate(-50%, 2px) scale(0.95);
  transform-origin: center bottom;
  pointer-events: none;
  transition:
    opacity 120ms var(--ease-out),
    transform 120ms var(--ease-out),
    visibility 120ms var(--ease-out);
}

html.userpatch-maia.userpatch-detail-page body .userpatch-provider-tooltip[hidden] {
  display: none !important;
}

html.userpatch-maia.userpatch-detail-page body .userpatch-provider-tooltip[role="tooltip"] {
  font-size: 0.75rem !important;
}

html.userpatch-maia.userpatch-detail-page body .userpatch-provider-tooltip[data-state="open"] {
  opacity: 1;
  visibility: visible;
  transform: translate(-50%, 0) scale(1);
}

html.userpatch-maia.userpatch-detail-page body .userpatch-provider-tooltip::after {
  position: absolute;
  z-index: 0;
  inline-size: 0.625rem;
  block-size: 0.625rem;
  background: inherit;
  content: "";
  transform: translateX(-50%) rotate(45deg);
}

html.userpatch-maia.userpatch-detail-page body .userpatch-provider-tooltip[data-side="top"]::after {
  inset-block-start: calc(100% - 0.3125rem);
  inset-inline-start: 50%;
}

html.userpatch-maia.userpatch-detail-page body .userpatch-provider-tooltip[data-side="bottom"] {
  transform-origin: center top;
}

html.userpatch-maia.userpatch-detail-page body .userpatch-provider-tooltip[data-side="bottom"]::after {
  inset-block-end: calc(100% - 0.3125rem);
  inset-inline-start: 50%;
}

html.userpatch-maia.userpatch-detail-page .userpatch-release-item.userpatch-filter-hidden {
  display: none !important;
}

@media (max-width: 46rem) {
  html.userpatch-maia.userpatch-detail-page .userpatch-release-row {
    align-items: center;
    padding: 16px 8px;
  }

  html.userpatch-maia.userpatch-detail-page .userpatch-release-actions {
    gap: 8px;
  }

  html.userpatch-maia.userpatch-detail-page .userpatch-provider-link {
    inline-size: 34px;
    block-size: 34px;
  }

  html.userpatch-maia.userpatch-detail-page .userpatch-provider-link img {
    inline-size: 30px;
    block-size: 30px;
  }
}

html.userpatch-maia header.sticky > .header {
  /* 6px inset keeps the container's 14px radius concentric with this 20px pill */
  padding: 0.375rem !important;
  border-radius: 1.25rem !important;
}

html.userpatch-maia header.sticky > .header > .container {
  block-size: 100%;
  min-block-size: 100%;
  border-radius: inherit;
}

html.userpatch-maia.userpatch-detail-page .content-main.userpatch-release-main {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto auto;
  /* Match the poster top after the sidebar inset and brand-to-poster gap. */
  grid-template-rows: 4rem 2rem auto;
  align-content: start;
  gap: 0;
  padding-block-start: 0 !important;
}

html.userpatch-maia.userpatch-detail-page .userpatch-release-toolbar {
  display: contents;
}

/* Keep the movie filter centered on the logo in the 1rem-offset sidebar. */
html.userpatch-maia.userpatch-detail-page .userpatch-release-main:not(.userpatch-series-main) > .userpatch-release-toolbar > .userpatch-quality-tabs {
  grid-row: 1;
  grid-column: 1 / -1;
  align-self: center;
  justify-self: end;
  inset-block-start: 1.5rem;
  margin: 0;
}

html.userpatch-maia.userpatch-detail-page .userpatch-release-main > .userpatch-movie-releases {
  grid-row: 3;
  grid-column: 1 / -1;
  min-inline-size: 0;
  margin: 0;
}

html.userpatch-maia.userpatch-detail-page .content-main.userpatch-series-main {
  grid-template-columns: minmax(0, 1fr) auto;
}

html.userpatch-maia.userpatch-detail-page .userpatch-series-main > .userpatch-series-toolbar > #series-tabs {
  grid-row: 1;
  grid-column: 1;
  align-self: center;
  justify-self: start;
  margin: 0;
}

html.userpatch-maia.userpatch-detail-page .userpatch-series-selects {
  display: flex;
  flex-wrap: wrap;
  grid-row: 1;
  grid-column: 2;
  align-self: center;
  justify-self: end;
  gap: 0.5rem;
  inline-size: max-content;
  min-inline-size: 0;
  max-inline-size: 100%;
}

html.userpatch-maia.userpatch-detail-page .userpatch-series-selects[data-mode="complete-pack"] {
  inline-size: auto;
  max-inline-size: 100%;
}

html.userpatch-maia.userpatch-detail-page .userpatch-season-control {
  position: relative;
  z-index: 10;
  display: flex;
  align-self: center;
  flex: 0 1 var(--userpatch-select-width, max-content);
  inline-size: var(--userpatch-select-width, max-content);
  min-inline-size: 0;
  max-inline-size: 100%;
  padding: 0.25rem;
  border: 0;
  border-radius: 1rem;
  background: transparent;
  isolation: isolate;
}

html.userpatch-maia.userpatch-detail-page .userpatch-season-control[hidden] {
  display: none !important;
}

html.userpatch-maia.userpatch-detail-page .userpatch-season-trigger {
  display: flex;
  inline-size: 100%;
  box-sizing: border-box;
  min-inline-size: 0;
  block-size: 2.125rem;
  align-items: center;
  justify-content: space-between;
  gap: 0.375rem;
  padding: 0.375rem 0.75rem;
  border: 1px solid transparent;
  border-radius: 0.75rem;
  background: var(--maia-selection-bg, rgb(255 255 255 / 0.15));
  box-shadow: var(--maia-selection-shadow, inset 0 1px 2px rgb(255 255 255 / 0.12));
  color: var(--maia-foreground);
  font: inherit;
  font-size: 0.875rem !important;
  font-weight: 400;
  line-height: 1.25;
  text-align: start;
  white-space: nowrap;
  cursor: pointer;
  transition:
    transform 140ms var(--ease-out),
    border-color 140ms ease,
    background-color 140ms ease;
}

@media (hover: hover) and (pointer: fine) {
  html.userpatch-maia.userpatch-detail-page .userpatch-season-trigger:hover:not(:disabled) {
    background: var(--maia-select-hover-bg, rgb(255 255 255 / 0.2));
  }
}

html.userpatch-maia.userpatch-detail-page .userpatch-season-trigger:active:not(:disabled) {
  transform: scale(0.98);
  background: var(--maia-select-hover-bg, rgb(255 255 255 / 0.25));
}

html.userpatch-maia.userpatch-detail-page .userpatch-season-trigger:focus-visible {
  border-color: var(--maia-ring);
  outline: none;
  box-shadow: 0 0 0 3px color-mix(in oklch, var(--maia-ring) 50%, transparent);
}

html.userpatch-maia.userpatch-detail-page .userpatch-season-trigger:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

html.userpatch-maia.userpatch-detail-page .userpatch-season-value {
  min-inline-size: 0;
  flex: 1 1 auto;
  overflow: hidden;
  text-overflow: ellipsis;
}

html.userpatch-maia.userpatch-detail-page .userpatch-version-marker {
  display: inline-flex;
  inline-size: fit-content;
  flex: none;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  color: var(--maia-muted-foreground);
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1;
  white-space: nowrap;
}

html.userpatch-maia.userpatch-detail-page .userpatch-version-marker[data-version="1"] {
  color: #60a5fa;
}

html.userpatch-maia.userpatch-detail-page .userpatch-version-marker[data-version="2"] {
  color: #a78bfa;
}

html.userpatch-maia.userpatch-detail-page .userpatch-season-version-marker[hidden] {
  display: none !important;
}

html.userpatch-maia.userpatch-detail-page .userpatch-series-quality-group {
  display: flex;
  flex: 0 1 auto;
  flex-direction: column;
  gap: 0.25rem;
  inline-size: auto;
  min-inline-size: 0;
  max-inline-size: 100%;
}

html.userpatch-maia.userpatch-detail-page .userpatch-series-quality-group[hidden] {
  display: none !important;
}

html.userpatch-maia.userpatch-detail-page .userpatch-series-quality-group > .userpatch-series-quality-control {
  flex: initial;
  inline-size: 100%;
  max-inline-size: 100%;
}

html.userpatch-maia.userpatch-detail-page .userpatch-series-language-badge {
  position: relative;
  display: inline-flex;
  inline-size: fit-content;
  max-inline-size: 100%;
  min-inline-size: 0;
  align-self: flex-start;
  align-items: center;
  isolation: isolate;
  gap: 0.375rem;
  min-block-size: 1.25rem;
  padding: 0.125rem 0.5rem;
  border: 1px solid color-mix(in oklch, var(--maia-foreground) 10%, transparent);
  border-radius: var(--maia-radius-4xl);
  background: transparent;
  color: var(--maia-foreground);
  box-shadow: none;
  text-shadow: none;
  font-size: 0.875rem !important;
  font-weight: 400;
  line-height: 1.25;
  overflow-wrap: anywhere;
}

html.userpatch-maia.userpatch-detail-page .userpatch-series-language-text {
  max-inline-size: 100%;
  min-inline-size: 0;
  overflow-wrap: anywhere;
  text-box: trim-both cap alphabetic;
}

html.userpatch-maia.userpatch-detail-page body
  .userpatch-series-selects
  .userpatch-series-quality-group
  :is(.userpatch-series-language-badge, .userpatch-series-language-text) {
  font-size: 0.875rem !important;
}

@media (min-width: ${CONFIG.mobileLayoutBreakpointRem + 0.01}rem) {
  html.userpatch-maia.userpatch-detail-page .userpatch-series-quality-group {
    flex: 0 1 auto;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
    inline-size: auto;
  }

  html.userpatch-maia.userpatch-detail-page
    .userpatch-series-quality-group
    > .userpatch-series-quality-control {
    flex: 0 1 auto;
    inline-size: auto;
  }

  html.userpatch-maia.userpatch-detail-page .userpatch-series-language-badge {
    align-self: center;
    flex: 0 1 auto;
  }
}

html.userpatch-maia.userpatch-detail-page .userpatch-series-language-icon {
  inline-size: 1rem;
  block-size: 1rem;
  flex: none;
}

html.userpatch-maia.userpatch-detail-page .userpatch-series-language-badge[hidden] {
  display: none !important;
}

html.userpatch-maia.userpatch-detail-page .userpatch-season-positioner {
  position: fixed;
  z-index: 2147483601;
  inline-size: max-content;
  pointer-events: none;
  isolation: isolate;
}

html.userpatch-maia.userpatch-detail-page .userpatch-season-positioner[hidden] {
  display: none !important;
}

html.userpatch-maia.userpatch-detail-page .userpatch-season-popup {
  display: flex;
  inline-size: var(--userpatch-anchor-width, 100%);
  min-inline-size: min(max(var(--userpatch-anchor-width, 0px), 9rem), calc(100vw - 1rem));
  max-inline-size: calc(100vw - 1rem);
  max-block-size: var(--userpatch-popup-height, 22rem);
  flex-direction: column;
  box-sizing: border-box;
  pointer-events: auto;
  border: 1px solid
    color-mix(in oklch, var(--maia-foreground) 8%, transparent);
  border-radius: 1rem;
  background: var(--maia-popover);
  color: var(--maia-popover-foreground);
  box-shadow: 0 16px 40px rgb(0 0 0 / 0.28);
  overflow: hidden;
  opacity: 1;
  transform: scale(1);
  transform-origin: top left;
  transition:
    opacity 140ms var(--ease-out),
    transform 140ms var(--ease-out);
}

html.userpatch-maia.userpatch-detail-page .userpatch-season-popup[data-side="top"] {
  transform-origin: bottom left;
}

@starting-style {
  html.userpatch-maia.userpatch-detail-page .userpatch-season-popup {
    opacity: 0;
    transform: scale(0.96);
  }
}

html.userpatch-maia.userpatch-detail-page .userpatch-season-menu {
  position: relative;
  display: block;
  inline-size: 100%;
  min-inline-size: 0;
  min-block-size: 0;
  max-block-size: var(--userpatch-menu-height, 22rem);
  flex: 0 1 auto;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;
  overscroll-behavior-x: auto;
  overscroll-behavior-y: contain;
  padding: 0.25rem;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
}

html.userpatch-maia.userpatch-detail-page .userpatch-season-menu::-webkit-scrollbar {
  display: none;
}

html.userpatch-maia.userpatch-detail-page .userpatch-season-scroll-control {
  display: flex;
  min-block-size: 1.5rem;
  flex: 0 0 1.5rem;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
  border: 0;
  background: transparent;
  color: var(--maia-muted-foreground);
  cursor: pointer;
  pointer-events: auto;
  transition:
    transform 140ms var(--ease-out),
    color 140ms ease;
}

html.userpatch-maia.userpatch-detail-page .userpatch-season-scroll-control[hidden] {
  display: none !important;
}

@media (hover: hover) and (pointer: fine) {
  html.userpatch-maia.userpatch-detail-page .userpatch-season-scroll-control:hover {
    color: var(--maia-foreground);
  }
}

html.userpatch-maia.userpatch-detail-page .userpatch-season-scroll-control:active {
  transform: scale(0.95);
  color: var(--maia-foreground);
}

html.userpatch-maia.userpatch-detail-page .userpatch-season-scroll-control svg {
  inline-size: 1rem;
  block-size: 1rem;
}

html.userpatch-maia.userpatch-detail-page .userpatch-season-option {
  position: relative;
  display: flex;
  inline-size: 100%;
  min-block-size: 2.25rem;
  block-size: auto;
  box-sizing: border-box;
  align-items: center;
  gap: 0.625rem;
  padding: 0.5rem 2.25rem 0.5rem 0.75rem;
  border-radius: 0.75rem;
  color: var(--maia-popover-foreground);
  font-size: 0.875rem;
  line-height: 1.35;
  text-align: start;
  white-space: normal;
  overflow-wrap: anywhere;
  cursor: default;
  user-select: none;
  outline: none;
  transition:
    background-color 140ms var(--ease-out),
    color 140ms var(--ease-out);
}

@media (hover: hover) and (pointer: fine) {
  html.userpatch-maia.userpatch-detail-page .userpatch-season-option:hover {
    background: var(--maia-accent);
    color: var(--maia-accent-foreground);
  }
}

html.userpatch-maia.userpatch-detail-page .userpatch-season-option:focus-visible,
html.userpatch-maia.userpatch-detail-page .userpatch-season-option[data-highlighted] {
  outline: none;
  background: var(--maia-accent);
  color: var(--maia-accent-foreground);
}

html.userpatch-maia.userpatch-detail-page .userpatch-season-option-label {
  min-inline-size: 0;
  flex: 1 1 auto;
  white-space: normal;
  overflow-wrap: anywhere;
  word-break: normal;
  line-height: 1.35;
}

html.userpatch-maia.userpatch-detail-page .userpatch-season-option-check {
  position: absolute;
  inset-inline-end: 0.5rem;
  inset-block-start: 50%;
  transform: translateY(-50%);
  inline-size: 1rem;
  block-size: 1rem;
  opacity: 0;
  transition: opacity 120ms var(--ease-out);
  pointer-events: none;
}

html.userpatch-maia.userpatch-detail-page .userpatch-season-option[aria-selected="true"] .userpatch-season-option-check {
  opacity: 1;
}

html.userpatch-maia.userpatch-detail-page .userpatch-season-chevron {
  display: block;
  flex: none;
  inline-size: 1rem;
  block-size: 1rem;
  color: var(--maia-muted-foreground);
  pointer-events: none;
}

html.userpatch-maia.userpatch-detail-page .userpatch-series-main > .userpatch-series-releases {
  grid-row: 3;
  grid-column: 1 / -1;
    min-inline-size: 0;
    margin: 0;
}

/* Keep the show filters together and align the release list with the poster. */
html.userpatch-maia.userpatch-detail-page .content-main.userpatch-series-main {
  grid-template-columns: minmax(0, 1fr);
  grid-template-rows: max-content 2rem auto;
}

html.userpatch-maia.userpatch-detail-page .userpatch-series-main > .userpatch-series-toolbar {
  position: relative;
  z-index: 20;
  inset-block-start: 0;
  display: flex;
  grid-row: 1;
  grid-column: 1 / -1;
  min-inline-size: 0;
  min-block-size: 3rem;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.5rem 1rem;
  padding-block: 0;
  background: transparent;
}

html.userpatch-maia.userpatch-detail-page .userpatch-series-main > .userpatch-series-toolbar > #series-tabs {
  position: relative;
  grid-row: auto;
  grid-column: auto;
  align-self: center;
  justify-self: auto;
  flex: 0 0 auto;
  margin: 0;
}

html.userpatch-maia.userpatch-detail-page .userpatch-series-main > .userpatch-series-toolbar > .userpatch-series-selects {
  grid-row: auto;
  grid-column: auto;
  align-self: center;
  justify-self: auto;
  display: flex;
  min-inline-size: 0;
  max-inline-size: 100%;
  flex: 1 1 22rem;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 0.5rem;
  margin-inline-start: 0;
}

@media (min-width: ${CONFIG.mobileLayoutBreakpointRem + 0.01}rem) {
  html.userpatch-maia.userpatch-detail-page .userpatch-series-main > .userpatch-series-toolbar > #series-tabs {
    inset-block-start: 1.5rem;
  }

  html.userpatch-maia.userpatch-detail-page .userpatch-series-main > .userpatch-series-toolbar > .userpatch-series-selects {
    position: relative;
    inset-block-start: 1.5rem;
    flex: 1 1 auto;
    flex-wrap: nowrap;
    inline-size: auto;
  }

  html.userpatch-maia.userpatch-detail-page .userpatch-series-selects > .userpatch-season-control {
    align-self: flex-start;
  }

  html.userpatch-maia.userpatch-detail-page .userpatch-series-quality-group {
    flex-wrap: wrap;
  }

  html.userpatch-maia.userpatch-detail-page .userpatch-series-selects > .userpatch-quality-tabs {
    margin-inline-start: auto;
    align-self: center;
  }
}

html.userpatch-maia.userpatch-detail-page .userpatch-series-selects[data-mode="complete-pack"] {
  inline-size: auto;
}

html.userpatch-maia.userpatch-detail-page .userpatch-season-control {
  inline-size: auto;
}

html.userpatch-maia.userpatch-detail-page .userpatch-season-trigger {
  block-size: 2.5rem;
}

html.userpatch-maia.userpatch-detail-page .userpatch-series-main > .userpatch-series-releases {
  grid-row: 3;
}

html.userpatch-maia .movie-card:hover,
html.userpatch-maia .movie-card:active {
  transform: none !important;
  filter: none !important;
  box-shadow: none !important;
}

html.userpatch-maia .movie-card:hover .movie-card-image,
html.userpatch-maia .movie-card:active .movie-card-image {
  transform: none !important;
  filter: none !important;
  border-color: var(--maia-poster-border) !important;
  box-shadow: var(--maia-card-depth-shadow) !important;
}

html.userpatch-maia .movie-card:hover .movie-card-image.userpatch-ongoing-poster,
html.userpatch-maia .movie-card:active .movie-card-image.userpatch-ongoing-poster {
  border-color: transparent !important;
}

html.userpatch-maia .movie-card:hover *,
html.userpatch-maia .movie-card:active * {
  transform: none !important;
  filter: none !important;
  transition: none !important;
}

html.userpatch-maia.userpatch-detail-page .userpatch-series-source {
  display: none !important;
}

html.userpatch-maia.userpatch-detail-page #series-tabs.userpatch-quality-tabs {
  position: relative;
  display: inline-flex;
  inline-size: fit-content;
  min-block-size: 0;
  gap: 2px;
  overflow: visible;
  padding: 0.25rem;
  border: 0 !important;
  border-radius: 1rem !important;
  background: transparent !important;
  box-shadow: none;
  isolation: isolate;
}

html.userpatch-maia.userpatch-detail-page #series-tabs .series-tab.userpatch-quality-tab {
  position: relative;
  z-index: 1;
  display: inline-flex;
  min-block-size: 40px;
  flex: none;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 8px 14px !important;
  border: 0 !important;
  border-radius: 12px !important;
  background: transparent !important;
  box-shadow: none !important;
  color: var(--maia-muted-foreground) !important;
  font-size: 0.875rem !important;
  font-weight: 500 !important;
  line-height: 1;
  transition:
    transform 140ms var(--ease-out),
    color 140ms var(--ease-out);
  cursor: pointer;
}

html.userpatch-maia.userpatch-detail-page #series-tabs .series-tab.userpatch-quality-tab.active {
  border-color: transparent !important;
  background: transparent !important;
  box-shadow: none !important;
  color: var(--maia-foreground) !important;
}

html.userpatch-maia.userpatch-detail-page #series-tabs .series-tab.userpatch-quality-tab:disabled {
  color: var(--maia-muted-foreground) !important;
  cursor: not-allowed;
  opacity: 0.45;
}

html.userpatch-maia.userpatch-detail-page #series-tabs .series-tab.userpatch-quality-tab svg {
  inline-size: 1rem !important;
  block-size: 1rem !important;
  fill: none !important;
  stroke: currentColor !important;
}

html.userpatch-maia.userpatch-detail-page #series-tabs .series-tab.userpatch-quality-tab svg * {
  fill: none !important;
  stroke: currentColor !important;
}

html.userpatch-maia.userpatch-detail-page .userpatch-mobile-nav {
  display: none !important;
}

@media (max-width: ${CONFIG.mobileLayoutBreakpointRem}rem) {
  html.userpatch-maia header.sticky {
    display: none !important;
  }

  html.userpatch-maia .userpatch-mobile-nav {
    position: fixed;
    z-index: 2147483600;
    inset-inline: 0;
    inset-block-end: calc(20px + env(safe-area-inset-bottom, 0px));
    display: flex !important;
    inline-size: min(${CONFIG.mobileNavigationWidth}, calc(100vw - 48px));
    min-block-size: 72px;
    block-size: 72px;
    align-items: center;
    gap: 4px;
    box-sizing: border-box;
    margin-inline: auto;
    padding: 5px;
    border: 1px solid color-mix(in oklch, var(--maia-foreground) 10%, transparent);
    border-radius: 20px;
    background: color-mix(in oklch, var(--maia-card) 98%, transparent);
    box-shadow: 0 8px 30px rgb(0 0 0 / 0.38);
    backdrop-filter: saturate(1.8) blur(20px);
    -webkit-backdrop-filter: saturate(1.8) blur(20px);
  }

  html.userpatch-maia.userpatch-detail-page .userpatch-mobile-nav {
    display: none !important;
  }

  html.userpatch-maia .userpatch-mobile-nav-item {
    display: flex;
    min-inline-size: 0;
    min-block-size: 62px;
    flex: 1 1 0;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2px;
    padding: 4px 2px;
    border: 0;
    border-radius: 16px;
    background: transparent;
    color: var(--maia-muted-foreground);
    font: inherit;
    font-size: 0.75rem;
    line-height: 1.25;
    text-decoration: none;
    white-space: nowrap;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    transition:
      transform 140ms var(--ease-out),
      background-color 140ms ease,
      color 140ms ease;
  }

  html.userpatch-maia .userpatch-mobile-nav-item:focus-visible {
    background: color-mix(in oklch, var(--maia-foreground) 10%, transparent);
    color: var(--maia-foreground);
  }

  @media (hover: hover) and (pointer: fine) {
    html.userpatch-maia .userpatch-mobile-nav-item:hover {
      background: color-mix(in oklch, var(--maia-foreground) 10%, transparent);
      color: var(--maia-foreground);
    }
  }

  html.userpatch-maia .userpatch-mobile-nav-item:active {
    transform: scale(0.95);
    background: color-mix(in oklch, var(--maia-foreground) 12%, transparent);
  }

  html.userpatch-maia .userpatch-mobile-nav-item[aria-current="page"] {
    background: var(--maia-selection-bg, color-mix(in oklch, var(--maia-foreground) 9%, transparent));
    box-shadow: inset 0 1px 2px
      color-mix(in oklch, var(--maia-foreground) 12%, transparent);
    color: var(--maia-foreground);
  }

  html.userpatch-maia .userpatch-mobile-nav-item:focus-visible {
    outline: 2px solid var(--maia-ring);
    outline-offset: -2px;
  }

  html.userpatch-maia .userpatch-mobile-nav-icon {
    display: inline-flex;
    inline-size: 1.5rem;
    block-size: 1.5rem;
    flex: none;
    align-items: center;
    justify-content: center;
  }

  html.userpatch-maia .userpatch-mobile-nav-icon svg,
  html.userpatch-maia .userpatch-mobile-nav-icon img {
    display: block;
    inline-size: 1.5rem;
    block-size: 1.5rem;
    object-fit: contain;
  }

  html.userpatch-maia .userpatch-mobile-nav-icon-brand {
    inline-size: 2rem;
    block-size: 2rem;
  }

  html.userpatch-maia .userpatch-mobile-nav-brand-logo {
    inline-size: 2rem !important;
    block-size: 2rem !important;
  }

  html.userpatch-maia .userpatch-mobile-nav-icon svg {
    fill: none !important;
    stroke: currentColor !important;
    stroke-width: 2;
  }

  html.userpatch-maia .page-container {
    padding-block-end: calc(128px + env(safe-area-inset-bottom, 0px)) !important;
  }

  html.userpatch-maia .pagination-container {
    margin-block: 2rem calc(112px + env(safe-area-inset-bottom, 0px)) !important;
  }

  html.userpatch-maia :not(.pagination-container) > .pagination {
    margin-block-end: calc(112px + env(safe-area-inset-bottom, 0px)) !important;
  }

  html.userpatch-maia:not(.userpatch-detail-page)
    .container:not(:has(.pagination-container, .pagination))
    > .card-grid:last-child {
    margin-block-end: calc(112px + env(safe-area-inset-bottom, 0px)) !important;
  }

  html.userpatch-maia.userpatch-detail-page,
  html.userpatch-maia.userpatch-detail-page body {
    block-size: auto;
    min-block-size: 100%;
    overflow: visible;
  }

  html.userpatch-maia.userpatch-detail-page body > .flex.min-h-screen {
    block-size: auto;
    min-block-size: 100dvh;
    overflow: visible;
  }

  html.userpatch-maia.userpatch-detail-page #swup {
    block-size: auto;
    min-block-size: 0;
    overflow: visible;
  }

  html.userpatch-maia.userpatch-detail-page #swup > main {
    display: block;
    overflow: visible;
  }

  html.userpatch-maia.userpatch-detail-page .page-container {
    min-block-size: 100dvh;
    padding: 1rem 1rem calc(128px + env(safe-area-inset-bottom, 0px)) !important;
  }

  html.userpatch-maia.userpatch-detail-page .content-grid.container {
    flex: none;
    grid-template-columns: minmax(0, 1fr);
    gap: ${CONFIG.mobileDetailSectionGapRem}rem;
    min-block-size: auto;
  }

  html.userpatch-maia.userpatch-detail-page .content-sidebar {
    position: static;
    block-size: auto;
    min-block-size: 0;
    align-items: stretch;
  }

  html.userpatch-maia.userpatch-detail-page .userpatch-detail-stack {
    inline-size: min(100%, 28rem);
    margin-inline: auto;
  }

  html.userpatch-maia.userpatch-detail-page .content-sidebar .poster-container {
    position: static !important;
    inset-block-start: auto !important;
    inline-size: min(65vw, 17rem);
  }

  html.userpatch-maia.userpatch-detail-page .content-main {
    block-size: auto;
    min-block-size: 0;
    padding: 0 !important;
    overflow: visible;
    scrollbar-gutter: auto;
  }

  html.userpatch-maia.userpatch-detail-page .content-main.userpatch-release-main {
    grid-template-columns: minmax(0, 1fr) auto;
    grid-template-rows: 3rem 3rem 1rem auto;
  }

  html.userpatch-maia.userpatch-detail-page .content-main.userpatch-series-main {
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: auto 1rem auto;
  }

  html.userpatch-maia.userpatch-detail-page .content-main.userpatch-release-main:not(.userpatch-series-main) {
    display: block;
    grid-template-columns: none;
    grid-template-rows: none;
  }

  html.userpatch-maia.userpatch-detail-page .userpatch-movie-releases {
    grid-row: auto;
    grid-column: auto;
    block-size: auto;
    max-block-size: none;
    margin: 0;
    overflow: visible;
  }

  html.userpatch-maia.userpatch-detail-page .userpatch-release-main:not(.userpatch-series-main) > .userpatch-release-toolbar > .userpatch-quality-tabs {
    position: static;
  }

  html.userpatch-maia.userpatch-detail-page .content-main.userpatch-series-main {
    display: block;
    grid-template-columns: none;
    grid-template-rows: none;
  }

  html.userpatch-maia.userpatch-detail-page .userpatch-series-main > .userpatch-series-toolbar {
    display: contents;
    position: static;
    inset-block-start: auto;
    z-index: auto;
    min-block-size: 0;
  }

  html.userpatch-maia.userpatch-detail-page .userpatch-series-main > .userpatch-series-toolbar > #series-tabs {
    position: relative;
    inset-block-start: auto;
    display: flex;
    inline-size: fit-content;
    max-inline-size: 100%;
    justify-content: center;
    margin-inline: auto;
    margin-block-end: 0.75rem;
  }

  html.userpatch-maia.userpatch-detail-page .userpatch-series-main > .userpatch-series-toolbar > .userpatch-series-selects {
    position: sticky;
    inset-block-start: calc(${CONFIG.mobileQualityStickyTopPx}px + env(safe-area-inset-top, 0px));
    z-index: 20;
    inline-size: 100%;
    flex: initial;
    align-items: flex-start;
    flex-direction: column;
    justify-content: flex-start;
    margin-inline: 0;
    margin-block-end: 0.75rem;
  }

  html.userpatch-maia.userpatch-detail-page .userpatch-series-selects > :is(.userpatch-season-control, .userpatch-series-quality-group, .userpatch-quality-tabs) {
    align-self: flex-start;
    flex: 0 0 auto;
  }

  html.userpatch-maia.userpatch-detail-page .userpatch-series-selects > .userpatch-quality-tabs {
    margin: 0;
  }

  html.userpatch-maia.userpatch-detail-page .userpatch-series-selects > .userpatch-series-quality-group {
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    inline-size: 100%;
    gap: 0.5rem;
  }

  html.userpatch-maia.userpatch-detail-page .userpatch-series-quality-group > .userpatch-series-quality-control {
    flex: 0 0 auto;
    inline-size: auto;
    max-inline-size: 100%;
  }

  html.userpatch-maia.userpatch-detail-page .userpatch-series-quality-group > .userpatch-series-language-badge {
    align-self: center;
    flex: 0 1 max-content;
    inline-size: max-content;
    max-inline-size: 100%;
    white-space: normal;
  }

  html.userpatch-maia.userpatch-detail-page .userpatch-season-trigger {
    block-size: auto;
    min-block-size: 2.5rem;
  }

  html.userpatch-maia.userpatch-detail-page .userpatch-season-value {
    overflow: visible;
    text-overflow: clip;
    white-space: normal;
    overflow-wrap: anywhere;
  }

  html.userpatch-maia.userpatch-detail-page .userpatch-series-main > .userpatch-series-releases {
    grid-row: auto;
    grid-column: auto;
  }

  html.userpatch-maia.userpatch-detail-page .userpatch-movie-releases > .userpatch-quality-tabs {
    position: sticky;
    inset-block-start: calc(${CONFIG.mobileQualityStickyTopPx}px + env(safe-area-inset-top, 0px));
    z-index: 20;
    inline-size: fit-content;
    margin-block: 0 ${CONFIG.mobileQualityVerticalGapRem}rem;
    margin-inline: auto;
    /* The shared tab pseudo-elements already draw the glass and outline. */
    border: 0;
    border-radius: 1rem;
    background: transparent;
    box-shadow: none;
  }

  @media (max-width: ${CONFIG.mobileCompactQualityBreakpointRem}rem) {
    html.userpatch-maia.userpatch-detail-page .userpatch-movie-releases > .userpatch-quality-tabs .userpatch-quality-tab {
      padding-inline: ${CONFIG.mobileCompactQualityTabPaddingInlinePx}px;
    }
  }

  html.userpatch-maia.userpatch-detail-page .userpatch-movie-releases[data-mobile-quality-scroll-space]::after {
    display: block;
    block-size: var(--userpatch-mobile-quality-scroll-space, 0px);
    content: "";
  }

  html.userpatch-maia.userpatch-detail-page .content-sidebar {
    position: static;
    inset-block-start: auto;
    block-size: auto;
    align-self: stretch;
  }

  html.userpatch-maia dialog.userpatch-search-dialog[open] {
    inset-block-start: calc(${CONFIG.mobileSearchDialogInsetPx}px + env(safe-area-inset-top, 0px));
    max-block-size: calc(100dvh - ${CONFIG.mobileSearchDialogInsetPx}px - 1rem - env(safe-area-inset-top, 0px));
    transform: translateX(-50%);
  }
}

@media (max-width: 22.5rem) {
  html.userpatch-maia.userpatch-detail-page .content-main.userpatch-series-main {
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: auto 1rem auto;
  }

  html.userpatch-maia.userpatch-detail-page .userpatch-series-main > .userpatch-series-releases {
    grid-row: auto;
  }
}

#userpatch-page-loader {
  position: fixed;
  inset: 0;
  z-index: 2147483640;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--maia-background, #090a0f);
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
  transition: opacity 250ms ease, visibility 250ms ease;
}

#userpatch-page-loader.userpatch-page-loader-hidden {
  opacity: 0 !important;
  visibility: hidden !important;
  pointer-events: none !important;
}

.userpatch-page-spinner {
  inline-size: 2.75rem;
  block-size: 2.75rem;
  box-sizing: border-box;
  border-radius: 9999px;
  border: 3px solid rgba(255, 255, 255, 0.12);
  border-top-color: var(--maia-foreground, #ffffff);
  animation: userpatch-page-spin 0.75s linear infinite;
}

@keyframes userpatch-page-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  #userpatch-page-loader {
    transition: none !important;
  }
  .userpatch-page-spinner {
    animation-duration: 1.5s !important;
  }
}

${PROGRESSIVE_IMAGE_CSS}
html.userpatch-maia.userpatch-detail-page .userpatch-release-toolbar > .userpatch-detail-tabs {
  /* Confine the absolute glass backdrop even when mobile filters are static. */
  position: relative !important;
  isolation: isolate;
  grid-row: 1;
  grid-column: 1 !important;
  justify-self: start !important;
  align-self: center;
  margin: 0;
}
html.userpatch-maia.userpatch-detail-page .userpatch-release-toolbar > .userpatch-quality-tabs:not(.userpatch-detail-tabs) {
  grid-column: 2 / -1 !important;
}
html.userpatch-maia.userpatch-detail-page .userpatch-detail-info,
html.userpatch-maia.userpatch-detail-page .userpatch-detail-screenshots {
  grid-row: 3;
  grid-column: 1 / -1 !important;
  line-height: 1.6;
}
html.userpatch-maia.userpatch-detail-page .userpatch-detail-info[hidden],
html.userpatch-maia.userpatch-detail-page .userpatch-release-main > [hidden],
html.userpatch-maia.userpatch-detail-page .userpatch-release-toolbar > [hidden] {
  display: none !important;
}
@media (max-width: 48rem) {
  html.userpatch-maia.userpatch-detail-page .userpatch-release-toolbar > .userpatch-detail-tabs {
    grid-column: 1 / -1 !important;
    justify-self: center !important;
  }
  html.userpatch-maia.userpatch-detail-page .userpatch-release-toolbar > .userpatch-quality-tabs:not(.userpatch-detail-tabs) {
    grid-column: 1 / -1 !important;
    grid-row: 2;
    justify-self: center !important;
    inset-block-start: auto;
  }
  html.userpatch-maia.userpatch-detail-page .content-main.userpatch-release-main {
    grid-template-rows: auto auto auto;
    row-gap: 0.75rem;
  }
}

/* Reserve the header inset in layout so every series control shares a baseline,
   including the Info/Links group and rows that wrap at narrower widths. */
@media (min-width: ${CONFIG.mobileLayoutBreakpointRem + 0.01}rem) {
  html.userpatch-maia.userpatch-detail-page .content-main.userpatch-series-main {
    grid-template-rows: max-content 0.5rem auto;
  }
  html.userpatch-maia.userpatch-detail-page .userpatch-series-main > .userpatch-series-toolbar {
    position: sticky;
    inset-block-start: 0;
    padding-block-start: 1.5rem;
    align-items: center;
  }
  html.userpatch-maia.userpatch-detail-page .userpatch-series-main > .userpatch-series-toolbar > :is(.userpatch-detail-tabs, #series-tabs, .userpatch-series-selects) {
    position: relative;
    inset-block-start: auto;
    align-self: center;
  }
}
@media (max-width: ${CONFIG.mobileLayoutBreakpointRem}rem) {
  /* Series filters need the release main as their sticky containing block.
     Keep their toolbar boxless; the movie toolbar can stack with flex. */
  html.userpatch-maia.userpatch-detail-page .userpatch-release-main:not(.userpatch-series-main) > .userpatch-release-toolbar {
    display: flex;
    position: static;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    min-block-size: 0;
    padding: 0;
    margin-block-end: ${CONFIG.mobileDetailSectionGapRem}rem;
  }
  html.userpatch-maia.userpatch-detail-page .userpatch-release-toolbar > .userpatch-detail-tabs {
    inset-block-start: auto !important;
    flex: none;
    margin: 0 auto;
  }
  html.userpatch-maia.userpatch-detail-page .userpatch-series-main > .userpatch-series-toolbar > .userpatch-detail-tabs {
    display: flex;
    inline-size: fit-content;
    margin: 0 auto 0.75rem;
  }
}

html.userpatch-maia.userpatch-detail-page .userpatch-series-main > .userpatch-series-toolbar > .userpatch-detail-tabs {
  position: relative;
  inset-block-start: auto;
}

${TRAILER_CSS}
${POSTER_FRAME_CSS}
${DETAIL_INFO_CSS}
${systemThemeCss(true)}
`
