import { HBLINKS_CSS } from "../hblinks/css.js"
import { DETAIL_INFO_CSS } from "../shared/detail-info.js"
import { PROGRESSIVE_IMAGE_CSS } from "../shared/progressive-images.js"
import { systemThemeCss } from "../shared/system-theme.js"
import { TRAILER_CSS } from "../shared/trailer.js"
import { CONFIG } from "./config.js"
import { POSTER_RECOVERY_CSS } from "./images.js"
import { LANDING_CSS } from "./landing.js"
import { SCREENSHOT_VIEWER_CSS } from "./screenshot-viewer.js"

// Only 36 micro-blocks (~7 KB, ~5%) match across ~460 block positions.
// Keep CSS per-site: regrouping those blocks could change cascade ties.
// The measurement tool is .temp/css-blocks.mjs.
export const MAIA_CSS = `
${HBLINKS_CSS}
html.userpatch-maia {
  --maia-background: oklch(0.145 0 0);
  --maia-gutter: clamp(0.75rem, 1.5vw, 1rem);
  background: var(--maia-background) !important;
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
  --maia-border: oklch(1 0 0 / 10%);
  --maia-input: oklch(1 0 0 / 15%);
  --maia-ring: oklch(0.556 0 0);
  --maia-opened-blue: oklch(0.58 0.2 250);
  --ease-out: cubic-bezier(0.23, 1, 0.32, 1);
  --ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);
  --maia-radius: 0.625rem;
  --maia-card-depth-shadow: inset 0 1px 2px rgb(255 255 255 / 0.09),
    0 2px 4px rgb(0 0 0 / 0.5), 0 4px 8px rgb(0 0 0 / 0.3);
  --maia-radius-xl: calc(var(--maia-radius) * 1.4);
  --maia-radius-2xl: calc(var(--maia-radius) * 1.8);
  --maia-radius-4xl: calc(var(--maia-radius) * 2.6);
}

/* Base */

html.userpatch-maia {
  -webkit-tap-highlight-color: transparent;
  -webkit-text-size-adjust: 100%;
  color-scheme: dark;
}

html.userpatch-maia button,
html.userpatch-maia [role="button"],
html.userpatch-maia .userpatch-nav-link,
html.userpatch-maia .userpatch-header-action,
html.userpatch-maia .userpatch-mobile-nav-item,
html.userpatch-maia .userpatch-quality-tab,
html.userpatch-maia .userpatch-mode-tab,
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

html.userpatch-maia body {
  background: var(--maia-background) !important;
  color: var(--maia-foreground) !important;
}

/* The site clamps html/body overflow (overflow-x:hidden plus an
   overflow:hidden rule), which turns the body into a clipped scroll box and
   stops position:sticky from ever engaging. clip on the horizontal axis
   keeps the cutoff without creating a scroll box, and the vertical axis is
   returned to visible so the viewport scrolls normally again. */
html.userpatch-maia,
html.userpatch-maia body {
  overflow-x: clip !important;
  overflow-y: visible !important;
}

/* Normalize the theme's scattered 14px/15px/17px sizes to the interface's
   single reading size, exactly like the sibling redesign does. Rules that
   need a different size are prefixed with html.userpatch-maia, so they
   out-rank this zero-specificity sweep. */
html.userpatch-maia body :where(
    p,
    span,
    div,
    a,
    li,
    td,
    th,
    strong,
    b,
    em,
    i,
    u,
    label,
    figcaption,
    blockquote,
    dd,
    dt
  ) {
  font-size: 1rem !important;
}

html.userpatch-maia body :where(.text-xs, .text-sm, .small, small) {
  font-size: 1rem !important;
}

html.userpatch-maia body,
html.userpatch-maia main#main-content {
  transition: none !important;
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

html.userpatch-maia svg[data-userpatch-lucide-icon] {
  fill: none !important;
  stroke: currentColor !important;
  flex: none;
}

/* Legacy chrome that the redesign replaces or silences */

html.userpatch-maia header.primary-header,
html.userpatch-maia footer.primay-footer,
html.userpatch-maia ins,
html.userpatch-maia body > br,
html.userpatch-maia .hd-dns-notice,
html.userpatch-maia section.sitewide-notice,
html.userpatch-maia .home-categories,
html.userpatch-maia .code-block,
html.userpatch-maia #wpd-editor-source-code-wrapper {
  display: none !important;
}

/* Header pill */

html.userpatch-maia .userpatch-header {
  position: sticky;
  inset-block-start: 3rem;
  z-index: 100;
  display: flex;
  justify-content: safe center;
  margin-block: 2.5rem;
  padding: 0;
  pointer-events: none;
}

html.userpatch-maia .userpatch-header-inner {
  position: relative;
  display: flex;
  inline-size: fit-content;
  max-inline-size: calc(100% - 1.5rem);
  block-size: 3.75rem;
  min-block-size: 3.75rem;
  box-sizing: border-box;
  align-items: center;
  isolation: isolate;
  overflow: visible;
  margin-inline: auto;
  border-radius: 1.25rem;
  /* 6px inset keeps the 14px brand radius concentric with the 20px pill */
  padding: 0.375rem;
  pointer-events: auto;
}

html.userpatch-maia .userpatch-header-inner::before {
  position: absolute;
  z-index: -1;
  inset: 0;
  border-radius: inherit;
  background: var(--maia-control-surface, color-mix(in oklch, var(--maia-card) 60%, transparent));
  box-shadow: var(--maia-glass-shadow, 0 10px 40px rgb(0 0 0 / 0.2));
  backdrop-filter: saturate(2.2) blur(16px);
  -webkit-backdrop-filter: saturate(2.2) blur(16px);
  content: "";
  pointer-events: none;
}

html.userpatch-maia .userpatch-header-inner::after {
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

html.userpatch-maia .userpatch-header-container {
  position: relative;
  z-index: 3;
  display: flex;
  inline-size: fit-content;
  max-inline-size: 100%;
  block-size: 100%;
  min-block-size: 100%;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  isolation: isolate;
  margin: 0;
  padding: 0;
  border-radius: inherit;
}

html.userpatch-maia .userpatch-brand {
  position: relative;
  z-index: 1;
  display: inline-flex;
  box-sizing: border-box !important;
  min-inline-size: 3rem;
  block-size: 3rem !important;
  min-block-size: 3rem;
  align-items: center;
  justify-content: center;
  padding-inline: 0.375rem;
  border-radius: 0.875rem;
  text-decoration: none;
  transition: transform 140ms var(--ease-out);
}

html.userpatch-maia .userpatch-brand img {
  display: block;
  inline-size: 6.375rem;
  max-inline-size: none;
  max-block-size: 2.25rem;
  object-fit: contain;
}

html.userpatch-maia .userpatch-nav-list {
  position: relative;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  gap: 0.1875rem;
  margin: 0;
  padding: 0;
  list-style: none;
  overflow: visible;
  min-inline-size: 0;
  isolation: isolate;
}

html.userpatch-maia .userpatch-brand,
html.userpatch-maia .userpatch-header-action {
  flex: none;
}

/* Measured against the real nav width: full padding needs ~84rem, compact
   padding fits down to ~68rem, and below that the drawer takes over. */
@media (max-width: 68rem) {
  html.userpatch-maia .userpatch-nav {
    display: none !important;
  }
}

html.userpatch-maia .userpatch-nav-item {
  position: relative;
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
}

html.userpatch-maia .userpatch-nav-item.dropdown.open,
html.userpatch-maia .userpatch-nav-item.dropdown:hover,
html.userpatch-maia .userpatch-nav-item.dropdown:focus-within {
  z-index: 100;
}

html.userpatch-maia .userpatch-nav-item.dropdown::after {
  position: absolute;
  inset-block-start: calc(100% - 0.125rem);
  inset-inline: 0;
  z-index: 2;
  block-size: 0.75rem;
  content: "";
}

/* Fallback for links the redesign does not rebuild (raw mirror-homepage
   cards): give their keyboard focus the same ring the styled cards use. */
html.userpatch-maia main a:focus-visible {
  outline: none !important;
  box-shadow:
    0 0 0 2px var(--maia-background),
    0 0 0 4px var(--maia-ring) !important;
}

html.userpatch-maia .userpatch-nav-link {
  position: relative;
  z-index: 1;
  display: inline-flex;
  box-sizing: border-box !important;
  margin: 0;
  block-size: auto !important;
  min-block-size: 3rem;
  align-items: center;
  justify-content: center;
  gap: 0.375rem;
  padding: 0.625rem 1.125rem !important;
  border: 0 !important;
  border-radius: 0.875rem !important;
  background: transparent !important;
  color: var(--maia-foreground) !important;
  font: inherit;
  font-size: 1rem !important;
  font-weight: 500 !important;
  line-height: 1.25 !important;
  text-decoration: none !important;
  white-space: nowrap !important;
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  transition:
    transform 140ms var(--ease-out),
    background-color 140ms ease,
    color 140ms var(--ease-out);
}

@media (hover: hover) and (pointer: fine) {
  html.userpatch-maia .userpatch-header-action:hover {
    background: color-mix(in oklch, var(--maia-foreground) 9%, transparent) !important;
    color: var(--maia-foreground) !important;
  }
}

/* The shared header indicator supplies this hover fill where it is visible. */
@media (min-width: 46.01rem) and (hover: hover) and (pointer: fine) {
  html.userpatch-maia .userpatch-header-action:hover {
    background: transparent !important;
  }
}

html.userpatch-maia .userpatch-nav-link svg {
  inline-size: 1rem;
  block-size: 1rem;
  color: var(--maia-muted-foreground);
}

@media (min-width: 68.01rem) and (max-width: 84rem) {
  html.userpatch-maia .userpatch-nav-link {
    padding: 0.625rem 0.625rem !important;
    font-size: 0.875rem !important;
  }

  html.userpatch-maia .userpatch-brand {
    padding-inline: 0.25rem;
  }
}

html.userpatch-maia .userpatch-nav-indicator {
  position: absolute;
  z-index: 0;
  inset-block-start: 0;
  inset-inline-start: 0;
  display: block;
  inline-size: 6.25rem;
  block-size: 2.75rem;
  border-radius:
    var(--userpatch-nav-radius-x, 0.875rem) /
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
    scale(
      var(--userpatch-nav-scale-x, 1),
      var(--userpatch-nav-scale-y, 1)
    );
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

html.userpatch-maia .userpatch-dropdown-menu {
  position: absolute;
  /* 1px below the trigger, matching 4K-HDHub's flush dropdowns. */
  inset-block-start: calc(100% + 1px);
  inset-inline-start: 0;
  z-index: 1000;
  min-inline-size: 12rem;
  /* Keep long menus scrollable without letting them run below the viewport. */
  max-block-size: min(24rem, calc(100dvh - 7rem));
  overflow-y: auto;
  margin: 0;
  padding: 0.375rem;
  border-radius: var(--maia-radius-2xl);
  background: var(--maia-popover);
  color: var(--maia-popover-foreground);
  box-shadow:
    0 25px 50px -12px rgb(0 0 0 / 0.5),
    0 0 0 1px color-mix(in oklch, var(--maia-foreground) 10%, transparent);
  list-style: none;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transform: translateY(4px);
  transition:
    opacity 140ms var(--ease-out),
    transform 140ms var(--ease-out),
    visibility 140ms var(--ease-out);
}

html.userpatch-maia .userpatch-nav-item.dropdown.open > .userpatch-dropdown-menu,
html.userpatch-maia .userpatch-nav-item.dropdown:hover > .userpatch-dropdown-menu,
html.userpatch-maia .userpatch-nav-item.dropdown:focus-within > .userpatch-dropdown-menu {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
  transform: translateY(0);
}

html.userpatch-maia .userpatch-dropdown-item {
  display: flex;
  min-block-size: 2.25rem;
  align-items: center;
  padding: 0.5rem 0.75rem;
  border-radius: var(--maia-radius-xl);
  color: var(--maia-popover-foreground);
  font-size: 1rem;
  font-weight: 400;
  text-decoration: none;
  white-space: nowrap;
}

html.userpatch-maia .userpatch-dropdown-item:focus-visible {
  background: var(--maia-muted);
  color: var(--maia-foreground);
}

@media (hover: hover) and (pointer: fine) {
  html.userpatch-maia .userpatch-dropdown-item:hover {
    background: var(--maia-muted);
    color: var(--maia-foreground);
  }
}

html.userpatch-maia .userpatch-dropdown-item:active {
  background: var(--maia-accent);
  color: var(--maia-foreground);
}

html.userpatch-maia .userpatch-header-action {
  position: relative;
  z-index: 1;
  display: inline-flex;
  inline-size: 3rem;
  min-inline-size: 3rem;
  block-size: 3rem;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
  border: 0 !important;
  border-radius: 0.875rem !important;
  background: transparent !important;
  color: var(--maia-foreground) !important;
  cursor: pointer;
  transition:
    transform 140ms var(--ease-out),
    color 140ms var(--ease-out);
}

html.userpatch-maia .userpatch-menu-toggle {
  display: none;
}

@media (max-width: 68rem) {
  html.userpatch-maia .userpatch-menu-toggle {
    display: inline-flex;
  }
}

html.userpatch-maia .userpatch-header-action svg {
  inline-size: 1.25rem;
  block-size: 1.25rem;
}

html.userpatch-maia .userpatch-header-action:active {
  transform: scale(0.96);
}

html.userpatch-maia .userpatch-header-action:focus-visible {
  outline: 2px solid var(--maia-ring);
  outline-offset: -2px;
}

@media (max-width: 46rem) {
  html.userpatch-maia .userpatch-header {
    inset-block-start: 1rem;
    block-size: auto;
    min-block-size: 0;
    margin-block: 1rem 1.5rem;
    padding: 0;
    overflow: visible;
  }

  html.userpatch-maia .userpatch-header-inner {
    inline-size: calc(100% - 2rem);
    max-inline-size: calc(100% - 2rem);
    margin-inline: auto;
  }

  html.userpatch-maia .userpatch-header-container {
    inline-size: 100% !important;
    max-inline-size: 100%;
    justify-content: space-between;
    gap: 0.25rem;
  }

  html.userpatch-maia .userpatch-nav-indicator {
    display: none !important;
  }

  html.userpatch-maia .userpatch-brand {
    margin-inline-end: auto;
    padding-inline: 0.25rem;
  }
}

/* Search dialog */

html.userpatch-maia dialog.userpatch-search-dialog[open] {
  position: fixed;
  inset-block-start: 50%;
  inset-inline-start: 50%;
  display: flex;
  inline-size: min(45rem, calc(100dvw - 2rem));
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
  display: flex;
  flex: 1 1 auto;
  inline-size: 100%;
  min-inline-size: 0;
  margin: 0;
  padding: 0;
}

html.userpatch-maia dialog.userpatch-search-dialog .search-input-container {
  display: flex;
  box-sizing: border-box;
  inline-size: 100%;
  min-inline-size: 0;
  block-size: 3.5rem;
  min-block-size: 3.5rem;
  align-items: center;
  gap: 0;
  padding: 0 0.25rem 0 0;
  border: 1px solid rgb(255 255 255 / 20%);
  border-radius: 20px;
  background: rgb(38 38 40 / 60%);
  backdrop-filter: saturate(2.2) blur(16px);
  -webkit-backdrop-filter: saturate(2.2) blur(16px);
  transition: border-color 140ms ease-out;
}

html.userpatch-maia dialog.userpatch-search-dialog .search-input-container:has(
  .search-input-overlay:focus-visible
) {
  border-color: transparent;
  outline: 2px solid var(--maia-ring);
  outline-offset: 0;
}

@media (hover: hover) and (pointer: fine) {
  html.userpatch-maia dialog.userpatch-search-dialog .search-input-container:hover:not(:focus-within) {
    border-color: color-mix(in oklch, var(--maia-foreground) 38%, transparent);
  }
}

html.userpatch-maia .userpatch-input-group-addon {
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  padding-inline-start: 1rem;
}

html.userpatch-maia dialog.userpatch-search-dialog .search-icon-overlay {
  flex: 0 0 1.25rem;
  inline-size: 1.25rem;
  block-size: 1.25rem;
  color: #a1a1aa;
  pointer-events: none;
}

html.userpatch-maia dialog.userpatch-search-dialog .search-input-overlay {
  appearance: none;
  -webkit-appearance: none;
  flex: 1 1 auto;
  inline-size: auto;
  min-inline-size: 0;
  block-size: 100%;
  min-block-size: 0;
  padding: 0 0.75rem;
  border: 0;
  border-radius: 0;
  background: transparent;
  color: var(--maia-foreground);
  font-family: inherit;
  font-size: 1.125rem;
  font-weight: 400;
  line-height: 1.4;
  box-shadow: none;
  outline: 0;
}

html.userpatch-maia dialog.userpatch-search-dialog .search-input-overlay::placeholder {
  color: #a1a1aa;
  font-size: inherit;
  opacity: 1;
}

html.userpatch-maia dialog.userpatch-search-dialog .search-input-overlay::-webkit-search-cancel-button {
  display: none;
}

html.userpatch-maia dialog.userpatch-search-dialog .search-submit[hidden] {
  display: none !important;
}

@media (max-width: ${CONFIG.mobileLayoutBreakpointRem}rem) {
  html.userpatch-maia dialog.userpatch-search-dialog[open] {
    inset-block-start: calc(12px + env(safe-area-inset-top, 0px));
    max-block-size: calc(100dvh - 12px - 1rem - env(safe-area-inset-top, 0px));
    transform: translateX(-50%);
  }
}

/* Mobile bottom navigation and menu drawer */

html.userpatch-maia .userpatch-mobile-nav {
  display: none !important;
}

@media (max-width: ${CONFIG.mobileLayoutBreakpointRem}rem) {
  html.userpatch-maia:not(.userpatch-detail-page) .userpatch-mobile-nav {
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
}

@media (max-width: ${CONFIG.mobileLayoutBreakpointRem}rem) {
  html.userpatch-maia:not(.userpatch-detail-page) .userpatch-header {
    display: none !important;
  }
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
  margin-block: 0 !important;
  margin-inline: 0 !important;
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
  outline: 2px solid var(--maia-ring);
  outline-offset: -2px;
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

html.userpatch-maia .userpatch-mobile-nav-icon {
  display: inline-flex;
  inline-size: 2rem;
  block-size: 2rem;
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
  margin: 0;
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
  outline: 2px solid var(--maia-ring);
  outline-offset: -2px;
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

/* Listing pages (home, categories, search landings, pagination) */

html.userpatch-maia main#main-content.userpatch-listing-ready {
  display: block;
  inline-size: 100%;
  max-inline-size: 88rem;
  margin-inline: auto;
  padding: 0 var(--maia-gutter) clamp(2rem, 5vw, 4rem);
  padding-block-start: 1.5rem;
}

html.userpatch-maia main#main-content.userpatch-listing-ready > :not(.userpatch-keep) {
  display: none !important;
}

html.userpatch-maia main#main-content.userpatch-listing-ready > .userpatch-keep {
  float: none !important;
  inline-size: 100% !important;
  max-inline-size: none !important;
  box-sizing: border-box;
  margin: 0 !important;
  padding: 0 !important;
  background: transparent !important;
  box-shadow: none !important;
}

html.userpatch-maia main#main-content.userpatch-listing-ready h2.category-name {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  margin-block: 0.25rem 1rem !important;
  padding: 0 !important;
  border-radius: 0 !important;
  background: transparent !important;
  box-shadow: none !important;
  color: var(--maia-foreground) !important;
  font-size: 1.25rem !important;
  font-weight: 600 !important;
  letter-spacing: -0.02em;
  line-height: 1.3;
  height: auto !important;
  white-space: normal;
  overflow: visible;
  text-overflow: clip;
}

html.userpatch-maia main#main-content.userpatch-listing-ready h2.category-name i.material-icons {
  display: none !important;
}

html.userpatch-maia main#main-content.userpatch-listing-ready h2.category-name .material-text {
  color: var(--maia-foreground) !important;
  font-size: inherit !important;
}

html.userpatch-maia main#main-content.userpatch-listing-ready ul.recent-movies {
  display: grid !important;
  grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
  align-items: stretch;
  column-gap: 1rem !important;
  row-gap: 2rem !important;
  margin: 0 !important;
  padding: 0 !important;
  list-style: none !important;
}

@media (min-width: 40rem) {
  html.userpatch-maia main#main-content.userpatch-listing-ready ul.recent-movies {
    grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
  }
}

@media (min-width: 48rem) {
  html.userpatch-maia main#main-content.userpatch-listing-ready ul.recent-movies {
    grid-template-columns: repeat(5, minmax(0, 1fr)) !important;
  }
}

@media (min-width: 64rem) {
  html.userpatch-maia main#main-content.userpatch-listing-ready ul.recent-movies {
    grid-template-columns: repeat(6, minmax(0, 1fr)) !important;
  }
}

html.userpatch-maia main#main-content.userpatch-listing-ready ul.recent-movies li.thumb {
  position: static !important;
  float: none !important;
  inline-size: auto !important;
  /* The mirror theme forces min-width: 208px !important on these cards;
     without this reset the cards overflow their grid tracks and overlap. */
  min-inline-size: 0 !important;
  margin: 0 !important;
  padding: 0 !important;
  background: transparent !important;
  border: 0 !important;
  box-shadow: none !important;
  list-style: none !important;
}

html.userpatch-maia h2.category-name,
html.userpatch-maia .category-name,
html.userpatch-maia .page-title,
html.userpatch-maia .widget-title,
html.userpatch-maia .left-wrapper > h2,
html.userpatch-maia .home-wrapper > h2,
html.userpatch-maia .home-categories,
html.userpatch-maia .userpatch-detail-chips,
html.userpatch-maia .userpatch-metadata-card,
html.userpatch-maia .kp-header,
html.userpatch-maia .page-meta {
  display: none !important;
}

html.userpatch-maia main#main-content.userpatch-listing-ready li.thumb figure,
html.userpatch-maia .thumbnail-wrapper figure,
html.userpatch-maia figure {
  margin: 0 !important;
  padding: 0 !important;
  border: 0 !important;
  box-shadow: none !important;
  outline: none !important;
  background: transparent !important;
  border-radius: 0 !important;
  overflow: visible !important;
  }

html.userpatch-maia main#main-content.userpatch-listing-ready li.thumb figure > a {
  position: relative;
  display: block;
  aspect-ratio: 2 / 3;
  overflow: hidden;
  border: 1px solid color-mix(in oklch, var(--maia-foreground) 15%, transparent) !important;
  border-radius: 1rem !important;
  background: var(--maia-muted);
  box-shadow: var(--maia-card-depth-shadow);
  transition: box-shadow 140ms ease;
  text-decoration: none !important;
  user-select: none !important;
  -webkit-user-select: none !important;
  -webkit-user-drag: none !important;
  outline: none !important;
}

/* Keep the poster border steady against the source theme's hover styling. */
html.userpatch-maia main#main-content.userpatch-listing-ready li.thumb figure > a:hover {
  border-color: color-mix(in oklch, var(--maia-foreground) 15%, transparent) !important;
}

html.userpatch-maia main#main-content.userpatch-listing-ready li.thumb figure > a:focus,
html.userpatch-maia main#main-content.userpatch-listing-ready li.thumb figure > a:active {
  outline: none !important;
  box-shadow: var(--maia-card-depth-shadow) !important;
}

/* The focus ring lives on the card (not the poster link) so it wraps the
   poster and its title together, matching 4K-HDHub's listing cards. */
html.userpatch-maia main#main-content.userpatch-listing-ready li.thumb:focus-within {
  border-radius: 1rem !important;
  box-shadow:
    0 0 0 2px var(--maia-background),
    0 0 0 4px var(--maia-ring) !important;
}

html.userpatch-maia main#main-content.userpatch-listing-ready li.thumb figure > a:focus-visible {
  outline: none !important;
  box-shadow: none !important;
}

html.userpatch-maia main#main-content.userpatch-listing-ready li.thumb,
html.userpatch-maia main#main-content.userpatch-listing-ready li.thumb *,
html.userpatch-maia li.thumb figure a:focus,
html.userpatch-maia li.thumb figure a:active {
  outline: none !important;
  -webkit-user-drag: none !important;
  user-drag: none !important;
}

html.userpatch-maia main#main-content.userpatch-listing-ready li.thumb figure > a > img {
  position: absolute;
  inset: 0;
  display: block;
  inline-size: 100%;
  block-size: 100% !important;
  max-inline-size: none;
  object-fit: cover;
  user-select: none !important;
  -webkit-user-select: none !important;
  -webkit-user-drag: none !important;
  pointer-events: none !important;
  transition: none !important;
}

/* The theme scales card images to 1.2 on hover; the redesign keeps posters
   still, so kill every transform the theme can apply. */
html.userpatch-maia main#main-content.userpatch-listing-ready li.thumb img,
html.userpatch-maia main#main-content.userpatch-listing-ready li.thumb:hover img,
html.userpatch-maia main#main-content.userpatch-listing-ready li.thumb figure:hover img,
html.userpatch-maia main#main-content.userpatch-listing-ready li.thumb figure a:hover img {
  transform: none !important;
}

html.userpatch-maia main#main-content.userpatch-listing-ready li.thumb .thumb-hover,
html.userpatch-maia main#main-content.userpatch-listing-ready li.thumb .sr-only {
  display: none !important;
}

html.userpatch-maia li.thumb figcaption,
html.userpatch-maia .thumbnail-wrapper figcaption {
  position: static !important;
  top: auto !important;
  bottom: auto !important;
  inset: auto !important;
  height: auto !important;
  min-height: 0 !important;
  max-height: none !important;
  padding: 0.75rem 0.25rem 0 !important;
  background: transparent !important;
  border: 0 !important;
  border-radius: 0 !important;
  box-shadow: none !important;
}

html.userpatch-maia li.thumb figcaption a,
html.userpatch-maia .thumbnail-wrapper figcaption a {
  color: inherit !important;
  text-decoration: none !important;
}

html.userpatch-maia li.thumb figcaption p,
html.userpatch-maia .thumbnail-wrapper figcaption p {
  display: -webkit-box !important;
  overflow: hidden !important;
  margin: 0 !important;
  padding: 0 !important;
  border: 0 !important;
  background: transparent !important;
  box-shadow: none !important;
  color: var(--maia-foreground) !important;
  font-size: 1rem !important;
  font-weight: 400 !important;
  line-height: 1.4 !important;
  height: auto !important;
  text-align: center !important;
  text-overflow: ellipsis !important;
  -webkit-box-orient: vertical !important;
  -webkit-line-clamp: 2 !important;
  line-clamp: 2 !important;
}

@media (min-width: 40rem) {
  html.userpatch-maia main#main-content.userpatch-listing-ready li.thumb figure > a {
    border-radius: 1.5rem !important;
  }
}

html.userpatch-maia main#main-content.userpatch-listing-ready .pagination-wrapper {
  display: flex !important;
  justify-content: center;
  inline-size: 100%;
  min-inline-size: 0;
  container: pagination / inline-size;
  margin-block: 2rem 1rem !important;
}

html.userpatch-maia main#main-content.userpatch-listing-ready .pagination-wrap,
html.userpatch-maia main#main-content.userpatch-listing-ready ul.pagination {
  display: flex;
  align-items: center;
  gap: 0.375rem !important;
  margin: 0 !important;
  padding: 0 !important;
  border: 0 !important;
  background: transparent !important;
  box-shadow: none !important;
}

html.userpatch-maia .pagination-wrapper .material-left,
html.userpatch-maia .pagination-wrapper .material-icons,
html.userpatch-maia .page-numbers .material-left,
html.userpatch-maia .page-numbers .material-icons,
html.userpatch-maia ul.pagination .material-left,
html.userpatch-maia ul.pagination .material-icons {
  display: none !important;
}

html.userpatch-maia main#main-content.userpatch-listing-ready ul.pagination > li {
  display: flex;
  float: none !important;
  margin: 0 !important;
  padding: 0 !important;
}

html.userpatch-maia main#main-content.userpatch-listing-ready .page-numbers {
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
  box-shadow: none !important;
  color: var(--maia-foreground) !important;
  font-size: 1rem !important;
  font-weight: 500 !important;
  text-decoration: none !important;
  transition:
    transform 140ms var(--ease-out),
    background-color 140ms ease,
    border-color 140ms ease;
}

html.userpatch-maia .pagination-wrapper .page-numbers.next,
html.userpatch-maia .pagination-wrapper .page-numbers.prev,
html.userpatch-maia main#main-content.userpatch-listing-ready .page-numbers.next,
html.userpatch-maia main#main-content.userpatch-listing-ready .page-numbers.prev,
html.userpatch-maia .page-numbers.next,
html.userpatch-maia .page-numbers.prev {
  inline-size: 2.5rem !important;
  min-inline-size: 2.5rem !important;
  max-inline-size: 2.5rem !important;
  block-size: 2.5rem !important;
  min-block-size: 2.5rem !important;
  padding: 0 !important;
  font-size: 0 !important;
  line-height: 0 !important;
  color: transparent !important;
  overflow: hidden !important;
  position: relative !important;
}

html.userpatch-maia main#main-content.userpatch-listing-ready .page-numbers svg,
html.userpatch-maia .pagination-wrapper .page-numbers svg,
html.userpatch-maia .page-numbers.next svg,
html.userpatch-maia .page-numbers.prev svg {
  display: block !important;
  inline-size: 1rem !important;
  block-size: 1rem !important;
  color: var(--maia-foreground) !important;
  margin: auto !important;
}

@media (hover: hover) and (pointer: fine) {
  html.userpatch-maia main#main-content.userpatch-listing-ready .page-numbers:hover {
    background: var(--maia-muted) !important;
  }
}

html.userpatch-maia main#main-content.userpatch-listing-ready .page-numbers:active {
  transform: scale(0.96);
  background: var(--maia-muted) !important;
}

html.userpatch-maia main#main-content.userpatch-listing-ready .page-numbers.current {
  border-color: var(--maia-border) !important;
  background: color-mix(in oklch, var(--maia-input) 30%, transparent) !important;
}

html.userpatch-maia main#main-content.userpatch-listing-ready .page-numbers.dots {
  inline-size: 1.5rem;
  min-inline-size: 1.5rem;
  color: var(--maia-muted-foreground);
  pointer-events: none;
}

@container pagination (max-width: 36rem) {
  html.userpatch-maia main#main-content.userpatch-listing-ready ul.pagination {
    gap: 0.25rem !important;
  }
  html.userpatch-maia main#main-content.userpatch-listing-ready ul.pagination > .userpatch-pagination-neighbor {
    display: none !important;
  }
}

@media (max-width: ${CONFIG.mobileLayoutBreakpointRem}rem) {
  html.userpatch-maia main#main-content.userpatch-listing-ready {
    padding-block-start: 1rem !important;
    padding-block-end: calc(120px + env(safe-area-inset-bottom, 0px)) !important;
  }

  html.userpatch-maia main#main-content.userpatch-listing-ready .pagination-wrapper {
    margin-block-end: calc(112px + env(safe-area-inset-bottom, 0px)) !important;
  }

  html.userpatch-maia main#main-content.userpatch-listing-ready ul.recent-movies {
    column-gap: 0.75rem !important;
    row-gap: 1.5rem !important;
  }
}

/* Detail pages */

html.userpatch-maia.userpatch-detail-page main#main-content,
html.userpatch-maia.userpatch-detail-page .userpatch-header,
html.userpatch-maia.userpatch-detail-page .userpatch-mobile-nav {
  display: none !important;
}

@media (min-width: ${CONFIG.mobileLayoutBreakpointRem + 0.01}rem) {
  html.userpatch-maia.userpatch-detail-page,
  html.userpatch-maia.userpatch-detail-page body {
    block-size: 100%;
    overflow: hidden;
  }
}

html.userpatch-maia .userpatch-detail-root {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  align-items: start;
  gap: var(--maia-gutter);
  inline-size: 100%;
  max-inline-size: 88rem;
  box-sizing: border-box;
  margin-inline: auto;
  padding: 1rem var(--maia-gutter) clamp(2rem, 5vw, 4rem);
}

@media (min-width: ${CONFIG.mobileLayoutBreakpointRem + 0.01}rem) {
  html.userpatch-maia .userpatch-detail-root {
    grid-template-columns: minmax(17rem, min(21rem, 30vw)) minmax(0, 1fr);
    align-items: stretch;
    column-gap: 2rem;
    block-size: 100dvh;
    padding-block: 0;
  }
}

/* Keep the poster stack and its viewport-aware sizing in step with 4KHDHub. */
html.userpatch-maia .userpatch-poster-panel {
  display: flex;
  inline-size: min(100%, 21rem, 42dvh);
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  box-sizing: border-box;
  margin-inline: 0;
  padding: 0;
  border: 0;
  border-radius: 0;
  background: transparent;
  box-shadow: none;
}

@media (min-width: ${CONFIG.mobileLayoutBreakpointRem + 0.01}rem) {
  html.userpatch-maia .userpatch-poster-panel {
    position: sticky;
    inset-block-start: 1rem;
    align-self: start;
    inline-size: min(100%, 21rem, 42dvh);
    max-block-size: calc(100dvh - 2rem);
    /* Keep the scrollport beyond the glow without moving or shrinking the
       poster. Overflow must stay scrollable for shorter desktop windows. */
    box-sizing: content-box;
    padding-inline: 1.5rem;
    margin-inline: -1.5rem;
    overflow: auto;
    overscroll-behavior-x: auto;
  overscroll-behavior-y: contain;
  }

  /* Overflow scrolls inside the panel; children must never flex-shrink. */
  html.userpatch-maia .userpatch-poster-panel > * {
    flex: none;
  }
}

html.userpatch-maia .userpatch-detail-brand {
  display: flex;
  inline-size: min(100%, 18rem);
  block-size: 4rem;
  min-block-size: 4rem;
  flex: none;
  align-items: center;
  justify-content: center;
}

html.userpatch-maia .userpatch-detail-brand img {
  display: block;
  inline-size: 100%;
  block-size: 4rem;
  max-block-size: 4rem;
  object-fit: contain;
}

html.userpatch-maia .userpatch-poster-frame {
  inline-size: min(100%, min(21rem, max(9rem, calc(66.667dvh - 7.333rem))));
  aspect-ratio: 2 / 3;
  overflow: hidden;
  border: 1px solid color-mix(in oklch, var(--maia-foreground) 15%, transparent);
  border-radius: 1rem;
  background: var(--maia-muted);
  box-shadow: var(--maia-card-depth-shadow);
}

html.userpatch-maia .userpatch-poster-frame[hidden] {
  display: none !important;
}

html.userpatch-maia .userpatch-poster-frame img {
  display: block;
  inline-size: 100%;
  block-size: 100%;
  object-fit: cover;
}

@media (min-width: 40rem) {
  html.userpatch-maia .userpatch-poster-frame {
    border-radius: 1.5rem;
  }
}

@media (max-width: ${CONFIG.mobileLayoutBreakpointRem}rem) {
  html.userpatch-maia .userpatch-poster-panel {
    inline-size: min(100%, 28rem);
    margin-inline: auto;
  }

  html.userpatch-maia .userpatch-poster-frame {
    inline-size: min(65vw, 17rem);
  }
}

html.userpatch-maia .userpatch-detail-title {
  max-inline-size: 100%;
  margin: 0;
  color: var(--maia-foreground) !important;
  font-size: 1.25rem !important;
  font-weight: 500 !important;
  letter-spacing: -0.02em;
  line-height: 1.25;
  text-align: center;
  overflow-wrap: anywhere;
}

html.userpatch-maia .userpatch-detail-date {
  margin: 0;
  color: var(--maia-muted-foreground);
  font-size: 0.8125rem !important;
}

html.userpatch-maia .userpatch-imdb-score {
  display: inline-flex;
  min-block-size: 1.5rem;
  align-items: center;
  gap: 0.375rem;
  color: var(--maia-foreground);
  font-size: 1rem;
  line-height: 1;
}

html.userpatch-maia .userpatch-imdb-score a {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  color: inherit;
  text-decoration: none;
}

html.userpatch-maia .userpatch-imdb-score img {
  display: block;
  inline-size: auto;
  block-size: 1rem;
  object-fit: contain;
}

html.userpatch-maia .userpatch-imdb-rating {
  font-size: 1rem;
  font-weight: 500;
}

html.userpatch-maia .userpatch-poster-badges {
  display: flex;
  max-inline-size: 100%;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-block-start: 0.125rem;
}

html.userpatch-maia .userpatch-poster-badges[hidden] {
  display: none !important;
}

html.userpatch-maia .userpatch-media-badge {
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

html.userpatch-maia .userpatch-media-badge img {
  display: block;
  inline-size: auto;
  max-inline-size: none;
  block-size: 1rem;
  object-fit: contain;
  filter: invert(1) grayscale(1);
}


html.userpatch-maia .userpatch-detail-main {
  display: flex;
  flex-direction: column;
  min-inline-size: 0;
  min-block-size: 0;
  gap: 1rem;
}

@media (min-width: ${CONFIG.mobileLayoutBreakpointRem + 0.01}rem) {
  html.userpatch-maia .userpatch-detail-main {
    block-size: 100%;
    box-sizing: border-box;
    /* Reserves the tab-bar band at the top of the scroll column, the way
       4KHDHub's grid rows do, so the list never rides up against it. */
    padding-block-start: 1rem;
    overflow-x: hidden;
    overflow-y: auto;
    overscroll-behavior-x: auto;
  overscroll-behavior-y: contain;
    scrollbar-gutter: auto;
  }
  html.userpatch-maia .userpatch-detail-main:has(.userpatch-screens:not([hidden])),
  html.userpatch-maia .userpatch-detail-main:has(.userpatch-detail-info:not([hidden]) .userpatch-trailer) {
    padding-block-end: calc(8rem + env(safe-area-inset-bottom, 0px));
  }
}

html.userpatch-maia .userpatch-detail-toolbar {
  position: sticky;
  /* The scroll column reserves a gutter band for this bar (see
     .userpatch-detail-main), so it rests level with 4KHDHub's tab bar and
     pins there when the list scrolls under it. */
  inset-block-start: 0;
  z-index: 5;
  display: flex;
  max-inline-size: 100%;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem 1rem;
  margin-block-end: 0;
  box-sizing: border-box;
  min-block-size: 4rem;
  flex: none;
  padding: 0;
  scrollbar-width: none;
}

html.userpatch-maia .userpatch-detail-toolbar > .userpatch-quality-tabs {
  margin-inline-start: auto;
}

@media (max-width: ${CONFIG.mobileLayoutBreakpointRem}rem) {
  html.userpatch-maia .userpatch-detail-root:has(.userpatch-detail-info:not([hidden]) .userpatch-trailer),
  html.userpatch-maia .userpatch-detail-root:has(.userpatch-screens:not([hidden])) {
    padding-block-end: calc(8rem + env(safe-area-inset-bottom, 0px));
  }
  html.userpatch-maia .userpatch-detail-root,
  html.userpatch-maia .userpatch-detail-main {
    gap: 0.75rem !important;
  }
  html.userpatch-maia .userpatch-detail-toolbar {
    inset-block-start: calc(12px + env(safe-area-inset-top, 0px));
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.75rem !important;
    min-block-size: 0 !important;
    margin: 0 !important;
    padding: 0 !important;
  }
  html.userpatch-maia .userpatch-detail-toolbar > .userpatch-quality-tabs {
    margin-inline: auto;
  }
}

html.userpatch-maia .userpatch-detail-info[hidden] { display: none !important; }

html.userpatch-maia .userpatch-detail-toolbar > :only-child {
  margin-inline-start: auto;
}

html.userpatch-maia .userpatch-mode-tabs,
html.userpatch-maia .userpatch-quality-tabs {
  position: relative;
  display: inline-flex;
  inline-size: fit-content;
  max-inline-size: 100%;
  align-items: center;
  gap: 2px;
  overflow: hidden !important;
  padding: 0.25rem;
  border-radius: 1rem;
  isolation: isolate;
  box-sizing: border-box;
}

/* Scroll the whole glass group so its indicator and border stay aligned. */
html.userpatch-maia .userpatch-mode-scroll {
  flex: 0 1 auto;
  min-inline-size: 0;
  inline-size: fit-content;
  max-inline-size: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  border-radius: 1rem;
  scrollbar-width: none;
}
html.userpatch-maia .userpatch-mode-scroll::-webkit-scrollbar {
  display: none;
}
html.userpatch-maia .userpatch-mode-scroll > .userpatch-mode-tabs {
  inline-size: max-content;
  max-inline-size: none;
  margin: 0;
}
@media (max-width: ${CONFIG.mobileLayoutBreakpointRem}rem) {
  html.userpatch-maia .userpatch-mode-scroll {
    inline-size: calc(100% + 2 * var(--maia-gutter));
    max-inline-size: none;
    margin-inline: calc(-1 * var(--maia-gutter));
    border-radius: 0;
  }
  html.userpatch-maia .userpatch-mode-scroll > .userpatch-mode-tabs {
    display: flex;
    margin-inline: auto;
  }
}

html.userpatch-maia .userpatch-mode-tabs::before,
html.userpatch-maia .userpatch-quality-tabs::before {
  position: absolute;
  z-index: -1;
  inset: 0;
  border-radius: inherit;
  background: var(--maia-control-surface, color-mix(in oklch, var(--maia-card) 60%, transparent));
  box-shadow: var(--maia-glass-shadow, 0 10px 40px rgb(0 0 0 / 0.2));
  backdrop-filter: saturate(2.2) blur(16px);
  -webkit-backdrop-filter: saturate(2.2) blur(16px);
  content: "";
  pointer-events: none;
}

html.userpatch-maia .userpatch-mode-tabs::after,
html.userpatch-maia .userpatch-quality-tabs::after {
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

html.userpatch-maia .userpatch-mode-tab,
html.userpatch-maia .userpatch-quality-tab {
  position: relative;
  z-index: 2;
  display: inline-flex;
  margin: 0;
  block-size: 2.25rem !important;
  min-block-size: 2.25rem !important;
  max-block-size: 2.25rem !important;
  box-sizing: border-box !important;
  flex: none;
  align-items: center;
  justify-content: center;
  gap: 0.375rem;
  padding: 0 0.875rem !important;
  border: 0 !important;
  border-radius: 0.75rem !important;
  background: transparent !important;
  color: var(--maia-muted-foreground) !important;
  font: inherit;
  font-size: 0.875rem !important;
  font-weight: 500 !important;
  line-height: 1 !important;
  white-space: nowrap !important;
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  transition:
    transform 140ms var(--ease-out),
    color 140ms var(--ease-out);
}

html.userpatch-maia .userpatch-mode-tab[aria-pressed="true"],
html.userpatch-maia .userpatch-quality-tab[aria-pressed="true"] {
  border-color: transparent !important;
  background: transparent !important;
  color: var(--maia-foreground) !important;
}

html.userpatch-maia .userpatch-mode-tab svg {
  flex: 0 0 1rem;
  inline-size: 1rem;
  block-size: 1rem;
  color: currentColor;
  fill: none;
}

html.userpatch-maia .userpatch-mode-indicator,
html.userpatch-maia .userpatch-quality-indicator {
  position: absolute;
  z-index: 0;
  inset-block-start: 0;
  inset-inline-start: 0;
  display: block;
  inline-size: 100px;
  block-size: 36px;
  border-radius:
    var(--userpatch-quality-radius-x, var(--userpatch-mode-radius-x, 0.75rem)) /
    var(--userpatch-quality-radius-y, var(--userpatch-mode-radius-y, 0.75rem));
  opacity: 0;
  pointer-events: none;
  transform-origin: left top;
  transition: opacity 160ms var(--ease-out);
}

html.userpatch-maia .userpatch-mode-indicator {
  background: var(--maia-selection-bg, color-mix(in oklch, var(--maia-foreground) 9%, transparent));
  box-shadow: var(--maia-selection-shadow, inset 0 1px 2px color-mix(in oklch, var(--maia-foreground) 12%, transparent));
  transform: translate3d(
      var(--userpatch-mode-x, 0px),
      var(--userpatch-mode-y, 0px),
      0
    )
    scale(
      var(--userpatch-mode-scale-x, 1),
      var(--userpatch-mode-scale-y, 1)
    );
}

html.userpatch-maia .userpatch-quality-indicator {
  background: var(--maia-selection-bg, rgb(255 255 255 / 0.15));
  box-shadow: var(--maia-selection-shadow, inset 0 1px 2px rgb(255 255 255 / 0.12));
  transform: translate3d(
      var(--userpatch-quality-x, 0px),
      var(--userpatch-quality-y, 0px),
      0
    )
    scale(
      var(--userpatch-quality-scale-x, 1),
      var(--userpatch-quality-scale-y, 1)
    );
}

html.userpatch-maia .userpatch-mode-tabs .userpatch-mode-indicator[data-ready="true"],
html.userpatch-maia .userpatch-mode-tabs .userpatch-quality-indicator[data-ready="true"],
html.userpatch-maia .userpatch-quality-tabs .userpatch-quality-indicator[data-ready="true"] {
  opacity: 1;
}

html.userpatch-maia .userpatch-mode-tabs .userpatch-mode-indicator[data-animate="true"],
html.userpatch-maia .userpatch-mode-tabs .userpatch-quality-indicator[data-animate="true"],
html.userpatch-maia .userpatch-quality-tabs .userpatch-quality-indicator[data-animate="true"] {
  transition:
    transform 240ms cubic-bezier(0.77, 0, 0.175, 1),
    opacity 160ms var(--ease-out);
}

html.userpatch-maia .userpatch-quality-tabs[hidden] {
  display: none !important;
}

html.userpatch-maia .userpatch-quality-tab[data-tab-content="label"] {
  min-inline-size: 3rem;
}

@media (hover: hover) and (pointer: fine) {
  html.userpatch-maia .userpatch-mode-tab:hover:not(:disabled),
  html.userpatch-maia .userpatch-quality-tab:hover:not(:disabled) {
    color: var(--maia-foreground);
  }
}

html.userpatch-maia .userpatch-mode-tab:active:not(:disabled),
html.userpatch-maia .userpatch-quality-tab:active:not(:disabled) {
  transform: scale(0.96);
}

html.userpatch-maia .userpatch-mode-tab:focus-visible,
html.userpatch-maia .userpatch-quality-tab:focus-visible {
  outline: 2px solid var(--maia-ring);
  outline-offset: -2px;
}

html.userpatch-maia .userpatch-quality-tab:disabled {
  color: var(--maia-muted-foreground);
  cursor: not-allowed;
}

html.userpatch-maia .userpatch-quality-tab {
  font-weight: 600 !important;
  letter-spacing: 0.02em;
}

html.userpatch-maia .userpatch-quality-tab img {
  display: block;
  inline-size: auto;
  block-size: 1.125rem;
  filter: invert(1);
}

html.userpatch-maia .userpatch-quality-tab:disabled img {
  filter: invert(1) grayscale(1) opacity(0.45);
}

/* Release rows */

html.userpatch-maia .userpatch-release-list {
  display: flex;
  flex-direction: column;
  border-block-start: 1px solid color-mix(in oklch, var(--maia-foreground) 16%, transparent);
}

html.userpatch-maia .userpatch-release-item {
  display: block;
  min-inline-size: 0;
  color: var(--maia-foreground);
  text-decoration: none;
}

html.userpatch-maia a.userpatch-release-item {
  cursor: pointer;
}

html.userpatch-maia .userpatch-release-row {
  display: flex;
  inline-size: 100%;
  min-block-size: 4rem;
  align-items: center;
  gap: 12px;
  box-sizing: border-box;
  padding: 16px;
  border-block-end: 1px solid color-mix(in oklch, var(--maia-foreground) 16%, transparent);
  color: var(--maia-foreground);
  transition: background 160ms var(--ease-out);
}

@media (hover: hover) and (pointer: fine) {
  html.userpatch-maia .userpatch-release-row:hover {
    background: color-mix(in oklch, var(--maia-muted) 42%, transparent);
  }
}

html.userpatch-maia .userpatch-release-row[data-userpatch-opened="true"],
html.userpatch-maia .userpatch-release-item[data-userpatch-opened="true"] .userpatch-release-row {
  background: color-mix(in oklch, var(--maia-opened-blue) 30%, transparent) !important;
}

@media (hover: hover) and (pointer: fine) {
  html.userpatch-maia .userpatch-release-row[data-userpatch-opened="true"]:hover,
  html.userpatch-maia .userpatch-release-item[data-userpatch-opened="true"]:hover .userpatch-release-row {
    background: color-mix(in oklch, var(--maia-opened-blue) 38%, transparent) !important;
  }
}

html.userpatch-maia .userpatch-release-copy {
  display: flex;
  min-inline-size: 0;
  flex: 1;
  flex-direction: column;
  gap: 4px;
}

html.userpatch-maia .userpatch-release-file-title {
  color: var(--maia-foreground);
  font-size: 14px !important;
  font-weight: 400;
  line-height: 1.45;
  overflow-wrap: anywhere;
}

@media (min-width: 761px) {
  html.userpatch-maia .userpatch-release-file-title {
    font-size: 18px !important;
  }
}

html.userpatch-maia .userpatch-release-meta {
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

/* The 1rem sweep inflates the plain size spans past the 14px filename on
   small screens; keep them secondary below the desktop breakpoint. */
@media (max-width: 760px) {
  html.userpatch-maia
    .userpatch-release-meta
    > span:not(.userpatch-series-language-badge) {
    font-size: 0.75rem !important;
  }
}

html.userpatch-maia .userpatch-series-language-badge {
  display: inline-flex;
  min-inline-size: 0;
  align-items: center;
  isolation: isolate;
  gap: 0.375rem;
  min-block-size: 1.25rem;
  padding: 0.125rem 0.5rem;
  border: 1px solid color-mix(in oklch, var(--maia-foreground) 10%, transparent);
  border-radius: var(--maia-radius-4xl);
  background: transparent;
  color: var(--maia-foreground);
  font-size: 0.875rem !important;
  font-weight: 400;
  line-height: 1.25;
}

html.userpatch-maia .userpatch-series-language-text {
  max-inline-size: 100%;
  min-inline-size: 0;
  overflow-wrap: anywhere;
}

html.userpatch-maia .userpatch-series-language-icon {
  inline-size: 1rem;
  block-size: 1rem;
  flex: none;
}

html.userpatch-maia .userpatch-release-actions {
  position: relative;
  z-index: 1;
  display: flex;
  flex: none;
  align-items: center;
  gap: 12px;
}

html.userpatch-maia .userpatch-release-action {
  display: inline-flex;
  inline-size: 40px;
  block-size: 40px;
  align-items: center;
  justify-content: center;
  color: var(--maia-foreground);
}

html.userpatch-maia .userpatch-release-action svg {
  inline-size: 20px;
  block-size: 20px;
}

html.userpatch-maia .userpatch-release-action img {
  inline-size: 36px;
  block-size: 36px;
  object-fit: contain;
}

html.userpatch-maia .userpatch-provider-link {
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
  html.userpatch-maia .userpatch-provider-link:hover {
    background: transparent !important;
    opacity: 0.78;
  }
}

html.userpatch-maia .userpatch-provider-link:active {
  transform: scale(0.95);
  opacity: 0.6;
}

html.userpatch-maia .userpatch-provider-link:focus-visible {
  outline: 2px solid var(--maia-ring);
}

html.userpatch-maia .userpatch-provider-link svg {
  inline-size: 20px;
  block-size: 20px;
}

html.userpatch-maia .userpatch-provider-link img {
  inline-size: 36px;
  block-size: 36px;
  object-fit: contain;
}

html.userpatch-maia body .userpatch-provider-tooltip {
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

html.userpatch-maia body .userpatch-provider-tooltip[hidden] {
  display: none !important;
}

html.userpatch-maia body .userpatch-provider-tooltip[data-state="open"] {
  opacity: 1;
  visibility: visible;
  transform: translate(-50%, 0) scale(1);
}

html.userpatch-maia body .userpatch-provider-tooltip::after {
  position: absolute;
  z-index: 0;
  inline-size: 0.625rem;
  block-size: 0.625rem;
  background: inherit;
  content: "";
  transform: translateX(-50%) rotate(45deg);
}

html.userpatch-maia body .userpatch-provider-tooltip[data-side="top"]::after {
  inset-block-start: calc(100% - 0.3125rem);
  inset-inline-start: 50%;
}

html.userpatch-maia body .userpatch-provider-tooltip[data-side="bottom"] {
  transform-origin: center top;
}

html.userpatch-maia body .userpatch-provider-tooltip[data-side="bottom"]::after {
  inset-block-end: calc(100% - 0.3125rem);
  inset-inline-start: 50%;
}

html.userpatch-maia .userpatch-release-item.userpatch-filter-hidden {
  display: none !important;
}

html.userpatch-maia .userpatch-screens[hidden],
html.userpatch-maia .userpatch-release-list[hidden],
html.userpatch-maia .userpatch-mode-tabs[hidden] {
  display: none !important;
}

html.userpatch-maia .userpatch-detail-empty {
  padding: 1.5rem 0.25rem;
  color: var(--maia-muted-foreground);
  font-size: 0.9375rem;
  text-align: center;
}

/* Detail sections */

html.userpatch-maia .userpatch-detail-section {
  margin-block: 1.75rem 0;
}

html.userpatch-maia .userpatch-section-title {
  margin-block: 0 1rem;
  padding-block-end: 0.75rem;
  border-bottom: 1px solid var(--maia-border);
  color: var(--maia-foreground) !important;
  font-size: 1.25rem !important;
  font-weight: 600 !important;
  letter-spacing: -0.02em;
  line-height: 1.3;
}

/* One screenshot per row, full width — a vertical stack, not a grid. */
html.userpatch-maia .userpatch-screens {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-block: 0;
  margin-inline: 0;
}

html.userpatch-maia .userpatch-screenshot {
  position: relative;
  display: block;
  aspect-ratio: 16 / 9;
  min-block-size: 14rem;
  overflow: hidden;
  border: 0 !important;
  border-radius: 1rem;
  background: var(--maia-muted);
  text-decoration: none !important;
  transition: none !important;
}

html.userpatch-maia .userpatch-screenshot:hover {
  border-color: transparent !important;
  transform: none !important;
}

html.userpatch-maia .userpatch-screenshot img {
  display: block;
  inline-size: 100%;
  block-size: 100%;
  object-fit: cover;
}

html.userpatch-maia .userpatch-trailer {
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border: 1px solid var(--maia-border);
  border-radius: var(--maia-radius-2xl);
  background: var(--maia-muted);
}

html.userpatch-maia .userpatch-trailer iframe {
  position: absolute;
  inset: 0;
  inline-size: 100%;
  block-size: 100%;
  border: 0;
}

html.userpatch-maia .userpatch-story {
  max-inline-size: 72ch;
  margin: 0;
  color: var(--maia-muted-foreground) !important;
  font-size: 1rem !important;
  line-height: 1.7 !important;
}

@media (max-width: ${CONFIG.mobileLayoutBreakpointRem}rem) {
  html.userpatch-maia .userpatch-release-row {
    padding: 16px 8px;
  }

  html.userpatch-maia .userpatch-release-actions {
    gap: 8px;
  }

  html.userpatch-maia .userpatch-provider-link,
  html.userpatch-maia .userpatch-release-action {
    inline-size: 34px;
    block-size: 34px;
  }

  html.userpatch-maia .userpatch-mode-tabs {
    inline-size: fit-content;
    max-inline-size: 100%;
    margin-inline: auto;
  }

  html.userpatch-maia .userpatch-mode-tab,
  html.userpatch-maia .userpatch-quality-tab {
    flex: none;
    block-size: 2.5rem !important;
    min-block-size: 2.5rem !important;
    max-block-size: 2.5rem !important;
  }

}

@media (prefers-reduced-motion: reduce) {
  html.userpatch-maia .userpatch-nav-link,
  html.userpatch-maia .userpatch-header-action,
  html.userpatch-maia .userpatch-brand,
  html.userpatch-maia .userpatch-nav-indicator,
  html.userpatch-maia .userpatch-quality-tab,
  html.userpatch-maia .userpatch-mode-tab,
  html.userpatch-maia .userpatch-provider-link,
  html.userpatch-maia .userpatch-provider-tooltip,
  html.userpatch-maia .userpatch-mobile-nav-item,
  html.userpatch-maia .userpatch-mobile-menu,
  html.userpatch-maia dialog.userpatch-search-dialog,
  html.userpatch-maia .page-numbers,
  html.userpatch-maia .userpatch-release-row {
    transform: none !important;
    transition:
      opacity 120ms ease,
      background-color 120ms ease,
      color 120ms ease !important;
  }
}

#userpatch-page-loader {
  position: fixed;
  inset: 0;
  z-index: 2147483640;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--maia-background, #0a0a0a);
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
  color: var(--maia-foreground, #ffffff);
  animation: userpatch-page-spin 0.8s linear infinite;
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

${SCREENSHOT_VIEWER_CSS}
${POSTER_RECOVERY_CSS}
${LANDING_CSS}
${TRAILER_CSS}
${DETAIL_INFO_CSS}

html.userpatch-maia .userpatch-series-progress {
  display: block;
  margin-block-start: 0.25rem;
  color: var(--maia-muted-foreground);
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.4;
  text-align: center;
}
html.userpatch-maia .userpatch-poster-panel > .userpatch-series-progress {
  margin-block-start: -0.5rem;
}
html.userpatch-maia main#main-content.userpatch-listing-ready li.thumb figure > a.userpatch-ongoing-poster,
html.userpatch-maia .userpatch-poster-frame.userpatch-ongoing-poster {
  border: 2px solid transparent !important;
  background:
    linear-gradient(var(--maia-muted), var(--maia-muted)) padding-box,
    var(--maia-hdhub-running-border, linear-gradient(135deg, #ff931e, #ff4938 52%, #dc2626)) border-box !important;
  box-shadow: var(--maia-hdhub-running-shadow,
    0 0 16px rgb(255 147 30 / 0.16),
    0 0 28px rgb(220 38 38 / 0.14)) !important;
}
${systemThemeCss()}
`
