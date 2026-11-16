import { GENERATED_PAGE_CSS } from "../shared/generated-page.js"
import {
  BUTTON_GROUP_CLASS,
  BUTTON_MAIN_CLASS,
  CONFIG,
  COPY_BUTTON_CLASS,
  DIRECT_DOWNLOAD_BUTTON_CLASS,
  GUIDE_ROW_ID,
  HEADER_ID,
} from "./config.js"

export const REDESIGN_CSS = `
.dark,
:root {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.205 0 0);
  --card-foreground: oklch(0.985 0 0);
  --primary: oklch(0.922 0 0);
  --primary-foreground: oklch(0.205 0 0);
  --secondary: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --border: oklch(1 0 0 / 10%);

  --radius: 0.625rem;
  --radius-sm: calc(var(--radius) * 0.6);
  --radius-md: calc(var(--radius) * 0.8);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) * 1.4);
  --radius-4xl: calc(var(--radius) * 2.6);
  --ease-out: cubic-bezier(0.23, 1, 0.32, 1);
  --font-sans: "Inter", "Inter Variable", ui-sans-serif, system-ui, -apple-system,
    BlinkMacSystemFont, "Segoe UI", sans-serif;
  color-scheme: dark;
}

*,
*::before,
*::after {
  box-sizing: border-box !important;
}

html,
body,
button,
input,
select,
textarea,
h1,
h2,
h3,
h4,
h5,
h6,
p,
a,
span,
div,
label,
li,
ul,
center,
[data-slot="button"],
[data-slot="button-group"],
.btn,
.card,
.container,
.userpatch-file-info,
.userpatch-file-title,
.userpatch-meta-item,
.userpatch-btn-main,
.userpatch-copy-btn,
.userpatch-share-btn,
.userpatch-mirror-guide-trigger,
.userpatch-dialog,
.userpatch-dialog-title,
.userpatch-dialog-description,
.userpatch-guide-heading,
.userpatch-guide-text,
.userpatch-guide-badge {
  font-family: var(--font-sans) !important;
}

html {
  -webkit-tap-highlight-color: transparent;
  -webkit-text-size-adjust: 100%;
}

html,
body {
  background-color: var(--background) !important;
  color: var(--foreground) !important;
  overscroll-behavior-x: auto;
  overscroll-behavior-y: none;
  font-family: var(--font-sans) !important;
  min-height: 100vh !important;
  min-height: 100svh !important;
  margin: 0 !important;
  padding: 0 !important;
  box-sizing: border-box !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  font-size: 1rem !important;
}

button,
[role="button"],
.btn,
.nav-link {
  touch-action: manipulation;
  user-select: none;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
}

@media (pointer: coarse) {
  input,
  textarea,
  select {
    font-size: 16px !important;
  }
}

body > center > .header,
header:not(#${HEADER_ID}),
.header:not(#${HEADER_ID}),
nav:not(.nav-tabs):not([role="tablist"]),
.navbar:not(.nav-tabs),
.site-header,
.site-footer,
.footer,
footer,
aside,
.sidebar,
#sidebar,
#masthead,
.alert-warning,
.alert-info,
.alert-primary,
hr {
  display: none !important;
}

#${HEADER_ID} {
  width: 100% !important;
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  padding: 1.25rem 1rem 0.5rem 1rem !important;
  background: transparent !important;
  background-color: transparent !important;
  border: none !important;
  border-bottom: none !important;
  box-shadow: none !important;
  box-sizing: border-box !important;
}

.userpatch-brand-container {
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 0.75rem !important;
  text-decoration: none !important;
  color: var(--foreground) !important;
  font-family: var(--font-sans) !important;
}

.userpatch-brand-logo {
  width: 38px !important;
  height: 38px !important;
  border-radius: var(--radius-sm) !important;
  object-fit: contain !important;
  display: block !important;
}

.userpatch-brand-name {
  font-family: "Inter", "Inter Variable", var(--font-sans) !important;
  font-size: 1.35rem !important;
  font-weight: 700 !important;
  letter-spacing: -0.025em !important;
  color: var(--foreground) !important;
  line-height: 1 !important;
}

center {
  inline-size: 100% !important;
  margin: 0 !important;
  padding: 0 !important;
  text-align: left !important;
}

.container,
.container.main,
.container-fluid,
.container-fluid.main,
.main:not(#section2) {
  width: 100% !important;
  max-width: 42rem !important;
  margin-left: auto !important;
  margin-right: auto !important;
  margin-inline: auto !important;
  padding-left: clamp(0.75rem, 3vw, 1.25rem) !important;
  padding-right: clamp(0.75rem, 3vw, 1.25rem) !important;
  padding-inline: clamp(0.75rem, 3vw, 1.25rem) !important;
  padding-block: 0.25rem 0.5rem !important;
  box-sizing: border-box !important;
}

@media (min-width: 640px) {
  .container,
  .container.main,
  .container-fluid,
  .container-fluid.main,
  .main:not(#section2) {
    padding-left: 1.25rem !important;
    padding-right: 1.25rem !important;
    padding-inline: 1.25rem !important;
  }
}

.container .container,
.container #section2,
.container .row,
.container .col-md-12,
.container center,
.container .card,
.container .card-body,
#section2 .card,
#section2 .card-body,
#section2 center {
  width: 100% !important;
  max-width: 100% !important;
  padding: 0 !important;
  padding-left: 0 !important;
  padding-right: 0 !important;
  padding-inline: 0 !important;
  margin: 0 !important;
  margin-left: 0 !important;
  margin-right: 0 !important;
  margin-inline: 0 !important;
  box-sizing: border-box !important;
  text-align: left !important;
}

h2 {
  font-size: 1rem !important;
  font-weight: normal !important;
  margin: 0 !important;
}

[data-slot="alert"],
div[style*="#fff3cd"],
div[style*="255, 243, 205"],
div[style*="#ffc107"],
.tab-content,
.nav-tabs,
#link,
#div1,
a[href*="hbplay"],
p[style*="font-size: 12px"],
.loading,
.input-group,
.input-group.mb-3,
#ilink,
.text-success.h3,
p.h3.text-success,
p[class*="text-success"],
#android_launch,
button#android_launch,
a#android_launch,
[id*="android_launch" i],
[class*="android_launch" i],
#msc,
.msc,
#misc,
.misc,
[id*="msc" i],
[class*="msc" i] {
  display: none !important;
  visibility: hidden !important;
  height: 0 !important;
  width: 0 !important;
  opacity: 0 !important;
  pointer-events: none !important;
}

.vd,
.vd.d-none {
  display: flex !important;
  flex-direction: column !important;
  justify-content: center !important;
  align-items: center !important;
  width: 100% !important;
  max-width: 100% !important;
  margin: 0 !important;
  box-sizing: border-box !important;
  padding: 0 !important;
}

.card:not(#section2 .card):not(.userpatch-file-info) {
  background-color: var(--card) !important;
  color: var(--card-foreground) !important;
  border: 1px solid var(--border) !important;
  border-radius: var(--radius-xl) !important;
  box-shadow: 0 0 0 1px color-mix(in oklch, var(--foreground) 10%, transparent), 0 4px 12px -2px rgba(0, 0, 0, 0.4) !important;
  overflow: hidden !important;
  margin-bottom: 1.5rem !important;
}

#section2,
#section2.main {
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
  padding: 0 !important;
  margin-top: 0 !important;
  display: flex !important;
  flex-direction: column !important;
  align-items: flex-start !important;
  text-align: left !important;
  width: 100% !important;
}

.card:not(#section2 .card) .card-body {
  width: 100% !important;
  box-sizing: border-box !important;
}

#section2 .card,
.userpatch-file-info {
  background: transparent !important;
  background-color: transparent !important;
  border: none !important;
  box-shadow: none !important;
  border-radius: 0 !important;
  min-height: 44px !important;
  padding: 0.5rem 0.25rem 0 0.25rem !important;
  margin: 0.25rem 0 0 0 !important;
  width: 100% !important;
  max-width: 100% !important;
  box-sizing: border-box !important;
  display: flex !important;
  flex-direction: column !important;
  align-items: stretch !important;
  text-align: left !important;
  gap: 0.5rem !important;
}

.userpatch-file-info .userpatch-file-title,
.userpatch-file-info .userpatch-file-meta,
.userpatch-file-info .userpatch-meta-item,
.userpatch-file-info .userpatch-share-btn {
  align-self: flex-start !important;
  text-align: left !important;
}

.userpatch-file-info #download,
.userpatch-file-info #button1,
.userpatch-file-info .${DIRECT_DOWNLOAD_BUTTON_CLASS},
.userpatch-file-info .vd,
.userpatch-file-info center,
#download,
#button1 {
  align-self: stretch !important;
  width: 100% !important;
  max-width: 100% !important;
  box-sizing: border-box !important;
}

#section2 .card-header,
#section2 .card-header.bg-primary,
.userpatch-file-title {
  background: transparent !important;
  background-color: transparent !important;
  border: none !important;
  border-bottom: none !important;
  color: var(--foreground) !important;
  font-size: 16px !important;
  font-weight: 400 !important;
  line-height: ${CONFIG.filenameLineHeight} !important;
  overflow-wrap: break-word !important;
  word-break: normal !important;
  text-wrap: pretty !important;
  text-align: left !important;
  padding: 0 !important;
  margin: 0 !important;
  width: 100% !important;
  max-width: 100% !important;
}

@media (min-width: 761px) {
  #section2 .card-header,
  #section2 .card-header.bg-primary,
  .userpatch-file-title {
    font-size: 18px !important;
  }
}

.userpatch-file-meta {
  display: flex !important;
  flex-direction: column !important;
  align-items: flex-start !important;
  justify-content: flex-start !important;
  gap: 0.5rem !important;
  margin: 0.25rem 0 0 0 !important;
  width: 100% !important;
}

.userpatch-meta-item,
.userpatch-meta-item span,
.userpatch-meta-item i,
.userpatch-meta-item #size,
#section2 .list-group-item,
#section2 .list-group-item i,
#section2 .list-group-item #size {
  display: inline-flex !important;
  align-items: center !important;
  justify-content: flex-start !important;
  text-align: left !important;
  gap: 0.5rem !important;
  color: var(--muted-foreground) !important;
  font-size: 16px !important;
  font-weight: 400 !important;
  line-height: 1.4 !important;
}

@media (min-width: 761px) {
  .userpatch-meta-item,
  .userpatch-meta-item span,
  .userpatch-meta-item i,
  .userpatch-meta-item #size,
  #section2 .list-group-item,
  #section2 .list-group-item i,
  #section2 .list-group-item #size {
    font-size: 18px !important;
  }
}

.userpatch-meta-item svg {
  width: 1.25rem !important;
  height: 1.25rem !important;
  color: var(--muted-foreground) !important;
  stroke: currentColor !important;
  fill: none !important;
  flex-shrink: 0 !important;
}

.userpatch-meta-item span,
.userpatch-meta-item i,
.userpatch-meta-item #size {
  color: var(--foreground) !important;
  font-style: normal !important;
  font-weight: 400 !important;
  font-variant-numeric: tabular-nums !important;
}

.userpatch-share-btn {
  position: relative !important;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: flex-start !important;
  gap: 0.5rem !important;
  background: transparent !important;
  background-color: transparent !important;
  color: var(--muted-foreground) !important;
  border: none !important;
  box-shadow: none !important;
  border-radius: var(--radius-md, 0.5rem) !important;
  min-height: unset !important;
  padding: 0 !important;
  font-size: 16px !important;
  font-weight: 400 !important;
  line-height: 1.4 !important;
  cursor: pointer !important;
  align-self: flex-start !important;
  margin: 0 !important;
  touch-action: manipulation !important;
  -webkit-tap-highlight-color: transparent !important;
  user-select: none !important;
  transition:
    color 120ms ease,
    background-color 120ms ease,
    transform 100ms var(--ease-out) !important;
}

.userpatch-share-btn::before {
  content: "" !important;
  position: absolute !important;
  top: 50% !important;
  left: 50% !important;
  transform: translate(-50%, -50%) !important;
  min-width: 44px !important;
  min-height: 44px !important;
  width: 100% !important;
  height: 100% !important;
  pointer-events: auto !important;
}

@media (min-width: 761px) {
  .userpatch-share-btn {
    font-size: 18px !important;
  }
}

.userpatch-share-btn span {
  color: var(--foreground) !important;
  font-weight: 400 !important;
  line-height: 1.4 !important;
  transition: color 120ms ease !important;
}

@media (hover: hover) and (pointer: fine) {
  .userpatch-share-btn:hover,
  .userpatch-share-btn:hover span {
    color: var(--foreground) !important;
  }
}

.userpatch-share-btn svg {
  width: 1.25rem !important;
  height: 1.25rem !important;
  color: var(--muted-foreground) !important;
  flex-shrink: 0 !important;
  display: inline-block !important;
}

.userpatch-share-btn.userpatch-copied,
.userpatch-share-btn.userpatch-copied span {
  background: transparent !important;
  color: var(--foreground) !important;
  border: none !important;
}

.userpatch-share-btn.userpatch-copied svg {
  color: var(--foreground) !important;
}

#section2 .card-body {
  padding: 0 !important;
  width: 100% !important;
}

#section2 .list-group {
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
  display: flex !important;
  flex-direction: column !important;
  align-items: flex-start !important;
  gap: 0.45rem !important;
}

#section2 .list-group-item {
  background: transparent !important;
  border: none !important;
  color: var(--muted-foreground) !important;
  padding: 0 !important;
  font-size: 16px !important;
  display: inline-flex !important;
  justify-content: flex-start !important;
  gap: 0.5rem !important;
}

#section2 .list-group-item:nth-child(2) {
  display: none !important;
}

.card:not(#section2 .card) .card-header,
.card:not(#section2 .card) .card-header.bg-primary {
  background: transparent !important;
  background-color: transparent !important;
  color: var(--foreground) !important;
  border-bottom: 1px solid var(--border) !important;
  font-size: 1rem !important;
  font-weight: 600 !important;
  line-height: 1.5 !important;
  padding: 1.25rem 1.5rem !important;
  overflow-wrap: break-word !important;
  word-break: normal !important;
  text-wrap: pretty !important;
  margin-bottom: 0 !important;
}

.card:not(#section2 .card) .card-body {
  padding: 1.25rem 1.5rem !important;
}

.card:not(#section2 .card) .list-group {
  border-radius: var(--radius-md, 0.5rem) !important;
  overflow: hidden !important;
  border: 1px solid var(--border) !important;
  margin-bottom: 0 !important;
}

.card:not(#section2 .card) .list-group-item {
  background-color: var(--card) !important;
  color: var(--muted-foreground) !important;
  border: none !important;
  border-bottom: 1px solid var(--border) !important;
  padding: 0.85rem 1.15rem !important;
  font-size: 0.925rem !important;
  font-weight: 500 !important;
}

.card:not(#section2 .card) .list-group-item:last-child {
  border-bottom: none !important;
}

.card:not(#section2 .card) .list-group-item i {
  color: var(--foreground) !important;
  font-style: normal !important;
  font-weight: 600 !important;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace !important;
  font-size: 0.875rem !important;
}

#download,
a#download,
button#download,
.btn-primary#download,
#button1,
a#button1,
button#button1,
.btn-success#button1,
.${DIRECT_DOWNLOAD_BUTTON_CLASS} {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 0.625rem !important;
  background-color: #0051c3 !important;
  color: #ffffff !important;
  border: 1px solid rgba(255, 255, 255, 0.14) !important;
  border-radius: var(--radius-lg, 0.625rem) !important;
  min-height: 56px !important;
  padding: 0.875rem 1.25rem !important;
  font-size: 16px !important;
  font-weight: 500 !important;
  line-height: 1.25rem !important;
  letter-spacing: -0.01em !important;
  text-decoration: none !important;
  width: 100% !important;
  max-width: 100% !important;
  margin: 0.75rem 0 !important;
  box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.22), 0 1px 2px 0 rgba(0, 0, 0, 0.24) !important;
  box-sizing: border-box !important;
  cursor: pointer !important;
  transition: transform 100ms ease, filter 100ms ease !important;
}

#section2 #download,
.userpatch-file-info #download,
#section2 .${DIRECT_DOWNLOAD_BUTTON_CLASS},
.userpatch-file-info .${DIRECT_DOWNLOAD_BUTTON_CLASS} {
  margin-bottom: 0 !important;
}

@media (min-width: 761px) {
  #download,
  a#download,
  button#download,
  .btn-primary#download,
  #button1,
  a#button1,
  button#button1,
  .btn-success#button1,
  .${DIRECT_DOWNLOAD_BUTTON_CLASS} {
    font-size: 18px !important;
  }
}

@media (hover: hover) and (pointer: fine) {
  #download:hover,
  #button1:hover,
  .${DIRECT_DOWNLOAD_BUTTON_CLASS}:hover {
    filter: brightness(1.06) !important;
    box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.25), 0 2px 4px 0 rgba(0, 0, 0, 0.28) !important;
  }
}

#download:active,
#button1:active,
.${DIRECT_DOWNLOAD_BUTTON_CLASS}:active,
.userpatch-btn-main:active {
  transform: none !important;
}

#download[data-userpatch-loading="true"],
#button1[data-userpatch-loading="true"],
.${DIRECT_DOWNLOAD_BUTTON_CLASS}[data-userpatch-loading="true"] {
  background: #0051c3 !important;
  color: #ffffff !important;
  opacity: 0.8 !important;
  pointer-events: none !important;
  cursor: wait !important;
}

@keyframes userpatch-spin {
  to {
    transform: rotate(360deg);
  }
}

.userpatch-spinner {
  animation: userpatch-spin 1s linear infinite !important;
}

[data-slot="button-group"],
.${BUTTON_GROUP_CLASS} {
  display: flex !important;
  align-items: stretch !important;
  max-width: 100% !important;
  width: 100% !important;
  margin: 0.75rem 0 !important;
  min-height: 56px !important;
  border-radius: var(--radius-lg, 0.625rem) !important;
  border: 1px solid rgba(255, 255, 255, 0.14) !important;
  box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.22), 0 1px 2px 0 rgba(0, 0, 0, 0.24) !important;
  overflow: hidden !important;
  box-sizing: border-box !important;
  position: relative !important;
  background-color: var(--userpatch-btn-bg, #27272a) !important;
  color: var(--userpatch-btn-color, #ffffff) !important;
  transition: filter 100ms ease !important;
}

#${GUIDE_ROW_ID} + [data-slot="button-group"],
.${GUIDE_ROW_ID} + [data-slot="button-group"],
#${GUIDE_ROW_ID} + .${BUTTON_GROUP_CLASS},
.${GUIDE_ROW_ID} + .${BUTTON_GROUP_CLASS} {
  margin-top: 0 !important;
}

@media (hover: hover) and (pointer: fine) {
  [data-slot="button-group"]:hover,
  .${BUTTON_GROUP_CLASS}:hover {
    filter: brightness(1.06) !important;
    box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.25), 0 2px 4px 0 rgba(0, 0, 0, 0.28) !important;
  }
}

[data-slot="button-group"] > a:active,
.${BUTTON_GROUP_CLASS} > a:active,
[data-slot="button-group"] > button:active,
.${BUTTON_GROUP_CLASS} > button:active {
  transform: none !important;
  background-color: transparent !important;
}

[data-slot="button-group"] > *,
.${BUTTON_GROUP_CLASS} > *,
[data-slot="button-group"] > a,
.${BUTTON_GROUP_CLASS} > a,
[data-slot="button-group"] > button,
.${BUTTON_GROUP_CLASS} > button,
[data-slot="button-group"] a#fsl,
[data-slot="button-group"] a#fsl2,
[data-slot="button-group"] a#s3,
[data-slot="button-group"] a#tgbtn,
[data-slot="button-group"] a[id],
.${BUTTON_GROUP_CLASS} a#fsl,
.${BUTTON_GROUP_CLASS} a#fsl2,
.${BUTTON_GROUP_CLASS} a#s3,
.${BUTTON_GROUP_CLASS} a#tgbtn,
.${BUTTON_GROUP_CLASS} a[id] {
  background: transparent !important;
  background-color: transparent !important;
  background-image: none !important;
  border: none !important;
  border-width: 0 !important;
  border-left: none !important;
  border-right: none !important;
  border-top: none !important;
  border-bottom: none !important;
  border-radius: 0 !important;
  box-shadow: none !important;
  outline: none !important;
  color: inherit !important;
  box-sizing: border-box !important;
  /* Source templates add lift/zoom to .btn:hover. Keep grouped actions still. */
  transform: none !important;
  translate: none !important;
  scale: none !important;
  rotate: none !important;
  transition: none !important;
}

[data-slot="button-group"] > *:focus-visible,
.${BUTTON_GROUP_CLASS} > *:focus-visible {
  position: relative !important;
  z-index: 10 !important;
  outline: 2px solid currentColor !important;
  outline-offset: -4px !important;
}

#download:focus-visible,
#button1:focus-visible,
.${DIRECT_DOWNLOAD_BUTTON_CLASS}:focus-visible,
.userpatch-share-btn:focus-visible,
.userpatch-pack-copy-btn:focus-visible,
.userpatch-mirror-guide-trigger:focus-visible,
.userpatch-dialog-close-btn:focus-visible,
.userpatch-pack-open-link:focus-visible {
  outline: 2px solid currentColor !important;
  outline-offset: 2px !important;
}

@media (forced-colors: active) {
  #download:focus-visible,
  #button1:focus-visible,
  .${DIRECT_DOWNLOAD_BUTTON_CLASS}:focus-visible,
  [data-slot="button-group"] > *:focus-visible,
  .${BUTTON_GROUP_CLASS} > *:focus-visible,
  .userpatch-share-btn:focus-visible,
  .userpatch-pack-copy-btn:focus-visible,
  .userpatch-mirror-guide-trigger:focus-visible,
  .userpatch-dialog-close-btn:focus-visible,
  .userpatch-pack-open-link:focus-visible {
    outline-color: Highlight !important;
  }
}

[data-slot="button-group"] > a[data-slot="button"],
.${BUTTON_GROUP_CLASS} > a.btn.${BUTTON_MAIN_CLASS} {
  flex: 1 1 auto !important;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: flex-start !important;
  text-align: left !important;
  gap: 0.625rem !important;
  width: 100% !important;
  max-width: none !important;
  margin: 0 !important;
  min-height: 56px !important;
  padding: 0.875rem 1.25rem !important;
  font-size: 16px !important;
  font-weight: 500 !important;
  line-height: 1.25rem !important;
  letter-spacing: -0.01em !important;
  text-decoration: none !important;
  cursor: pointer !important;
}

@media (min-width: 761px) {
  [data-slot="button-group"] > a[data-slot="button"],
  .${BUTTON_GROUP_CLASS} > a.btn.${BUTTON_MAIN_CLASS} {
    font-size: 18px !important;
  }
}

.userpatch-btn-label {
  display: inline-block !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  white-space: nowrap !important;
  font-weight: 500 !important;
}

[data-slot="button-group"] > button[data-slot="button"],
.${BUTTON_GROUP_CLASS} > button.${COPY_BUTTON_CLASS} {
  flex: 0 0 56px !important;
  width: 56px !important;
  min-height: 56px !important;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  padding: 0 !important;
  margin: 0 !important;
  cursor: pointer !important;
  background: transparent !important;
  background-color: transparent !important;
  border: none !important;
  box-shadow: none !important;
  transition: transform 100ms var(--ease-out) !important;
}

@media (hover: hover) and (pointer: fine) {
  [data-slot="button-group"] > button[data-slot="button"]:hover,
  .${BUTTON_GROUP_CLASS} > button.${COPY_BUTTON_CLASS}:hover {
    background-color: transparent !important;
  }
}

.${BUTTON_GROUP_CLASS} > button.${COPY_BUTTON_CLASS}.userpatch-copied {
  color: inherit !important;
  background: transparent !important;
  background-color: transparent !important;
}

svg[data-userpatch-lucide-icon],
svg.preview-icon,
[data-slot="button-group"] svg,
.${BUTTON_GROUP_CLASS} svg,
#download svg,
#button1 svg,
a.btn svg,
.userpatch-meta-item svg,
.pack-meta-item svg,
.userpatch-share-btn svg,
.userpatch-pack-copy-btn svg,
.userpatch-mirror-guide-trigger svg {
  width: 1.25rem !important;
  height: 1.25rem !important;
  stroke: currentColor !important;
  fill: none !important;
  stroke-width: 2 !important;
  vertical-align: middle !important;
  flex-shrink: 0 !important;
  display: inline-block !important;
}

a.btn.btn-danger,
a.btn.btn-primary,
a.btn.btn-secondary,
a.btn.btn-info,
a.btn.btn-warning,
a.btn.btn-dark,
a.btn.btn-success {
  background-image: none !important;
}


a.btn.btn-lg:not(.${BUTTON_MAIN_CLASS}):not(.${DIRECT_DOWNLOAD_BUTTON_CLASS}):not(#download):not(#button1):not(.${COPY_BUTTON_CLASS}):not(.userpatch-share-btn):not(.userpatch-pack-copy-btn):not(.userpatch-mirror-guide-trigger):not(.input-group *),
a.btn:not(.${BUTTON_MAIN_CLASS}):not(.${DIRECT_DOWNLOAD_BUTTON_CLASS}):not(#download):not(#button1):not(.nav-link):not(.${COPY_BUTTON_CLASS}):not(.userpatch-share-btn):not(.userpatch-pack-copy-btn):not(.userpatch-mirror-guide-trigger):not(.input-group *),
button.btn:not(.${COPY_BUTTON_CLASS}):not(.${DIRECT_DOWNLOAD_BUTTON_CLASS}):not(#download):not(#button1):not(.userpatch-share-btn):not(.userpatch-pack-copy-btn):not(.userpatch-mirror-guide-trigger):not(.input-group *) {
  display: flex !important;
  align-items: center !important;
  justify-content: flex-start !important;
  text-align: left !important;
  gap: 0.625rem !important;
  max-width: 100% !important;
  width: 100% !important;
  margin: 1.125rem 0 !important;
  min-height: 56px !important;
  padding: 0.875rem 1.25rem !important;
  font-size: 16px !important;
  font-weight: 500 !important;
  line-height: 1.25rem !important;
  letter-spacing: -0.01em !important;
  text-decoration: none !important;
  border-radius: var(--radius-lg, 0.625rem) !important;
  background-color: #27272a !important;
  color: #f4f4f5 !important;
  border: 1px solid rgba(255, 255, 255, 0.14) !important;
  box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.22), 0 1px 2px 0 rgba(0, 0, 0, 0.24) !important;
  box-sizing: border-box !important;
  transition: transform 100ms ease, filter 100ms ease !important;
}

@media (min-width: 761px) {
  a.btn.btn-lg:not(.${BUTTON_MAIN_CLASS}):not(.${DIRECT_DOWNLOAD_BUTTON_CLASS}):not(#download):not(#button1):not(.${COPY_BUTTON_CLASS}):not(.userpatch-share-btn):not(.userpatch-pack-copy-btn):not(.userpatch-mirror-guide-trigger):not(.input-group *),
  a.btn:not(.${BUTTON_MAIN_CLASS}):not(.${DIRECT_DOWNLOAD_BUTTON_CLASS}):not(#download):not(#button1):not(.nav-link):not(.${COPY_BUTTON_CLASS}):not(.userpatch-share-btn):not(.userpatch-pack-copy-btn):not(.userpatch-mirror-guide-trigger):not(.input-group *),
  button.btn:not(.${COPY_BUTTON_CLASS}):not(.${DIRECT_DOWNLOAD_BUTTON_CLASS}):not(#download):not(#button1):not(.userpatch-share-btn):not(.userpatch-pack-copy-btn):not(.userpatch-mirror-guide-trigger):not(.input-group *) {
    font-size: 18px !important;
  }
}

.pack-header,
.file-list {
  max-width: 44rem !important;
  margin-left: auto !important;
  margin-right: auto !important;
  width: 100% !important;
  box-sizing: border-box !important;
}

.pack-header {
  background: transparent !important;
  background-color: transparent !important;
  border: none !important;
  box-shadow: none !important;
  border-radius: 0 !important;
  padding: 0 1rem !important;
  padding-inline: 1rem !important;
  margin: 0.25rem auto 0.5rem auto !important;
  width: 100% !important;
  max-width: 44rem !important;
  box-sizing: border-box !important;
  display: flex !important;
  flex-direction: column !important;
  align-items: flex-start !important;
  text-align: left !important;
}

.pack-name {
  font-family: var(--font-sans) !important;
  font-size: 16px !important;
  font-weight: 400 !important;
  line-height: ${CONFIG.filenameLineHeight} !important;
  color: var(--foreground) !important;
  margin: 0 0 0.5rem 0 !important;
  overflow-wrap: break-word !important;
  word-break: normal !important;
  text-wrap: pretty !important;
  text-align: left !important;
}

@media (min-width: 761px) {
  .pack-name {
    font-size: 18px !important;
  }
}

.pack-meta {
  display: flex !important;
  flex-direction: column !important;
  align-items: flex-start !important;
  justify-content: flex-start !important;
  gap: 0.5rem !important;
  margin: 0 !important;
  width: 100% !important;
}

.pack-meta-item,
.pack-meta-item span,
.pack-meta-item #totalSize {
  display: inline-flex !important;
  align-items: center !important;
  justify-content: flex-start !important;
  text-align: left !important;
  gap: 0.5rem !important;
  color: var(--muted-foreground) !important;
  font-size: 16px !important;
  font-weight: 400 !important;
  line-height: 1.4 !important;
}

.pack-meta-item {
  margin: 0 !important;
  padding: 0 !important;
}

@media (min-width: 761px) {
  .pack-meta-item,
  .pack-meta-item span,
  .pack-meta-item #totalSize {
    font-size: 18px !important;
  }
}

.pack-meta-item svg {
  width: 1.25rem !important;
  height: 1.25rem !important;
  color: var(--muted-foreground) !important;
  stroke: currentColor !important;
  fill: none !important;
  flex-shrink: 0 !important;
}

.pack-meta-item span,
.pack-meta-item #totalSize {
  color: var(--foreground) !important;
  font-style: normal !important;
  font-weight: 400 !important;
  font-variant-numeric: tabular-nums !important;
}

.pack-meta-item:has(#fileCount),
#fileCount {
  display: none !important;
}

.file-list {
  background: transparent !important;
  background-color: transparent !important;
  border: none !important;
  box-shadow: none !important;
  border-radius: 0 !important;
  padding: 0 !important;
  width: 100% !important;
  max-width: 44rem !important;
  margin-left: auto !important;
  margin-right: auto !important;
  box-sizing: border-box !important;
  display: flex !important;
  flex-direction: column !important;
}

.file-icon {
  display: none !important;
}

.file-item {
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
  padding: 0.85rem 0 !important;
  padding-inline: 1rem !important;
  border: none !important;
  border-bottom: 1px solid var(--border) !important;
  background: transparent !important;
  background-color: transparent !important;
  position: relative !important;
  cursor: default !important;
  width: 100% !important;
  box-sizing: border-box !important;
  text-decoration: none !important;
  transition: background-color 100ms ease !important;
}

.file-item:last-child {
  border-bottom: none !important;
}

@media (hover: hover) and (pointer: fine) {
  .file-item:hover {
    background-color: color-mix(in oklch, var(--foreground) 3%, transparent) !important;
  }
}

.file-info {
  flex: 1 1 auto !important;
  min-width: 0 !important;
  text-align: left !important;
  pointer-events: none !important;
}

.userpatch-pack-open-link {
  position: absolute !important;
  inset: 0 !important;
  z-index: 0 !important;
  display: block !important;
  color: inherit !important;
  text-decoration: none !important;
  border-radius: var(--radius-sm) !important;
  transition: background-color 100ms ease !important;
}

.userpatch-pack-open-link:active {
  background-color: color-mix(in oklch, var(--foreground) 5%, transparent) !important;
}

.userpatch-sr-only {
  position: absolute !important;
  width: 1px !important;
  height: 1px !important;
  padding: 0 !important;
  margin: -1px !important;
  overflow: hidden !important;
  clip: rect(0, 0, 0, 0) !important;
  clip-path: inset(50%) !important;
  white-space: nowrap !important;
  border: 0 !important;
}

.file-title {
  font-family: var(--font-sans) !important;
  font-size: 16px !important;
  font-weight: 400 !important;
  color: var(--foreground) !important;
  line-height: ${CONFIG.filenameLineHeight} !important;
  overflow-wrap: break-word !important;
  word-break: normal !important;
  text-wrap: pretty !important;
}

@media (min-width: 761px) {
  .file-title {
    font-size: 18px !important;
  }
}

.file-title code {
  font-family: var(--font-sans) !important;
  font-size: inherit !important;
  font-weight: 400 !important;
  background: transparent !important;
  color: inherit !important;
  border: none !important;
  padding: 0 !important;
}

.file-size {
  font-family: var(--font-sans) !important;
  font-size: 14px !important;
  color: var(--muted-foreground) !important;
  font-weight: 400 !important;
  line-height: 1.4 !important;
  margin-top: 0.25rem !important;
  font-variant-numeric: tabular-nums !important;
}

@media (min-width: 761px) {
  .file-size {
    font-size: 16px !important;
  }
}

.userpatch-pack-copy-btn {
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  position: relative !important;
  z-index: 1 !important;
  width: 2.75rem !important;
  height: 2.75rem !important;
  min-width: 2.75rem !important;
  padding: 0 !important;
  border-radius: var(--radius-md, 0.5rem) !important;
  background: transparent !important;
  background-color: transparent !important;
  border: none !important;
  box-shadow: none !important;
  color: var(--muted-foreground) !important;
  cursor: pointer !important;
  margin-left: 1rem !important;
  flex-shrink: 0 !important;
  touch-action: manipulation !important;
  -webkit-tap-highlight-color: transparent !important;
  user-select: none !important;
  transition:
    color 120ms ease,
    background-color 120ms ease,
    transform 100ms var(--ease-out) !important;
}

@media (hover: hover) and (pointer: fine) {
  .userpatch-pack-copy-btn:hover {
    background-color: transparent !important;
    color: var(--foreground) !important;
  }
}

.userpatch-pack-copy-btn.userpatch-copied {
  color: var(--foreground) !important;
  background-color: transparent !important;
}

.userpatch-pack-copy-btn svg {
  width: 1.15rem !important;
  height: 1.15rem !important;
  color: currentColor !important;
  stroke: currentColor !important;
  fill: none !important;
}

.file-link {
  display: none !important;
}

.empty-state {
  color: var(--muted-foreground) !important;
  font-size: 0.875rem !important;
  padding: 3rem 1.5rem !important;
  text-align: center !important;
}

.${GUIDE_ROW_ID},
#${GUIDE_ROW_ID} {
  display: flex !important;
  justify-content: flex-end !important;
  align-items: center !important;
  width: 100% !important;
  margin: 0.5rem 0 !important;
  padding: 0 !important;
  box-sizing: border-box !important;
}

.userpatch-mirror-guide-trigger {
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  width: 2rem !important;
  height: 2rem !important;
  min-height: unset !important;
  padding: 0 !important;
  background: transparent !important;
  background-color: transparent !important;
  color: var(--muted-foreground) !important;
  border: none !important;
  box-shadow: none !important;
  border-radius: 9999px !important;
  margin: 0 !important;
  cursor: pointer !important;
  position: relative !important;
  transition:
    color 120ms ease,
    background-color 120ms ease,
    transform 100ms var(--ease-out) !important;
}

.userpatch-mirror-guide-trigger::before {
  content: "" !important;
  position: absolute !important;
  top: 50% !important;
  left: 50% !important;
  transform: translate(-50%, -50%) !important;
  min-width: 44px !important;
  min-height: 44px !important;
  pointer-events: auto !important;
}

@media (hover: hover) and (pointer: fine) {
  .userpatch-mirror-guide-trigger:hover {
    color: var(--foreground) !important;
    background-color: var(--secondary) !important;
  }
}

.userpatch-mirror-guide-trigger svg {
  width: 1.125rem !important;
  height: 1.125rem !important;
}

.userpatch-dialog-title:focus {
  outline: none !important;
}

.userpatch-dialog {
  background-color: var(--card) !important;
  color: var(--card-foreground) !important;
  border: 1px solid var(--border) !important;
  border-radius: var(--radius-4xl, 1.625rem) !important;
  box-shadow: 0 0 0 1px color-mix(in oklch, var(--foreground) 8%, transparent), 0 20px 25px -5px rgba(0, 0, 0, 0.6), 0 8px 10px -6px rgba(0, 0, 0, 0.5) !important;
  margin: auto !important;
  max-width: 28rem !important;
  width: calc(100% - 2rem) !important;
  max-height: 90vh !important;
  max-height: 90dvh !important;
  overflow-y: auto !important;
  overscroll-behavior-x: auto !important;
  overscroll-behavior-y: contain !important;
  padding: 1.5rem !important;
  box-sizing: border-box !important;
  opacity: 0 !important;
  transform: scale(0.96) !important;
  transition:
    opacity 200ms var(--ease-out),
    transform 200ms var(--ease-out),
    display 200ms var(--ease-out),
    overlay 200ms var(--ease-out) !important;
  transition-behavior: allow-discrete !important;
}

.userpatch-dialog:modal {
  overscroll-behavior-x: auto !important;
  overscroll-behavior-y: contain !important;
}

.userpatch-dialog[open] {
  opacity: 1 !important;
  transform: scale(1) !important;
  transition-duration: 250ms !important;
}

.userpatch-dialog[data-closing] {
  opacity: 0 !important;
  transform: scale(0.96) !important;
  transition-duration: 200ms !important;
}

.userpatch-dialog[open][data-closing]::backdrop {
  opacity: 0 !important;
  transition-duration: 200ms !important;
}

.userpatch-dialog::backdrop {
  background-color: rgba(0, 0, 0, 0.75) !important;
  backdrop-filter: blur(4px) !important;
  overflow: hidden !important;
  opacity: 0 !important;
  overscroll-behavior-x: auto !important;
  overscroll-behavior-y: contain !important;
  transition:
    opacity 200ms var(--ease-out),
    display 200ms var(--ease-out),
    overlay 200ms var(--ease-out) !important;
  transition-behavior: allow-discrete !important;
}

.userpatch-dialog[open]::backdrop {
  opacity: 1 !important;
  transition-duration: 250ms !important;
}

@starting-style {
  .userpatch-dialog[open] {
    opacity: 0 !important;
    transform: scale(0.96) !important;
  }

  .userpatch-dialog[open]::backdrop {
    opacity: 0 !important;
  }
}

.userpatch-dialog-header {
  position: relative !important;
  margin-bottom: 1.25rem !important;
  padding-right: 2.75rem !important;
  text-align: left !important;
  display: flex !important;
  flex-direction: column !important;
  gap: 0.375rem !important;
}

.userpatch-dialog-title,
.userpatch-guide-heading {
  text-wrap: balance !important;
}

.userpatch-dialog-title {
  font-size: 1.125rem !important;
  font-weight: 600 !important;
  color: var(--foreground) !important;
  margin: 0 !important;
  line-height: 1.3 !important;
}

.userpatch-dialog-description {
  font-size: 0.875rem !important;
  color: var(--muted-foreground) !important;
  margin: 0 !important;
  line-height: 1.45 !important;
  text-wrap: pretty !important;
}

.userpatch-dialog-close-btn {
  position: absolute !important;
  top: 0 !important;
  right: 0 !important;
  background: transparent !important;
  border: none !important;
  color: var(--muted-foreground) !important;
  border-radius: 9999px !important;
  width: 2rem !important;
  height: 2rem !important;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  cursor: pointer !important;
  transition:
    color 140ms ease,
    background-color 140ms ease,
    transform 100ms var(--ease-out) !important;
}

.userpatch-dialog-close-btn::before {
  content: "" !important;
  position: absolute !important;
  top: 50% !important;
  left: 50% !important;
  transform: translate(-50%, -50%) !important;
  min-width: 44px !important;
  min-height: 44px !important;
  pointer-events: auto !important;
}

@media (hover: hover) and (pointer: fine) {
  .userpatch-dialog-close-btn:hover {
    color: var(--foreground) !important;
    background-color: var(--secondary) !important;
  }
}

.userpatch-share-btn:active {
  transform: none !important;
  background-color: transparent !important;
}

.userpatch-pack-copy-btn:active,
.userpatch-mirror-guide-trigger:active,
.userpatch-dialog-close-btn:active {
  transform: none !important;
  background-color: var(--secondary) !important;
}

.userpatch-dialog-close-btn svg {
  width: 1rem !important;
  height: 1rem !important;
}

.userpatch-dialog-body {
  display: flex !important;
  flex-direction: column !important;
  gap: 0 !important;
  text-align: left !important;
  list-style: none !important;
  margin: 0 !important;
  padding: 0 !important;
}

.userpatch-guide-item {
  display: flex !important;
  flex-direction: column !important;
  align-items: flex-start !important;
  text-align: left !important;
  gap: 0.35rem !important;
  padding: 0.95rem 0 !important;
  background: transparent !important;
  background-color: transparent !important;
  border: none !important;
  border-bottom: 1px solid var(--border) !important;
  border-radius: 0 !important;
  box-shadow: none !important;
}

.userpatch-guide-item:last-child {
  border-bottom: none !important;
}

.userpatch-guide-button {
  align-self: flex-start !important;
  display: inline-flex !important;
  align-items: center !important;
  gap: 0.375rem !important;
  min-height: unset !important;
  height: auto !important;
  padding: 0.25rem 0.625rem !important;
  border: 1px solid rgba(255, 255, 255, 0.14) !important;
  border-radius: var(--radius-md, 0.5rem) !important;
  background-color: var(--userpatch-btn-bg, #27272a) !important;
  color: var(--userpatch-btn-color, #f4f4f5) !important;
  box-shadow:
    inset 0 1px 0 0 rgba(255, 255, 255, 0.18),
    0 1px 2px 0 rgba(0, 0, 0, 0.16) !important;
  box-sizing: border-box !important;
  font-size: 0.8125rem !important;
  font-weight: 500 !important;
  line-height: 1.25rem !important;
  letter-spacing: -0.01em !important;
}

.userpatch-guide-button svg {
  width: 0.875rem !important;
  height: 0.875rem !important;
}

@media (min-width: 761px) {
  .userpatch-guide-button {
    font-size: 0.875rem !important;
  }
}

.userpatch-guide-heading {
  font-size: 0.9375rem !important;
  font-weight: 600 !important;
  color: var(--foreground) !important;
  margin: 0 !important;
  line-height: 1.3 !important;
}

.userpatch-guide-text {
  font-size: 0.825rem !important;
  color: var(--muted-foreground) !important;
  line-height: 1.4 !important;
  margin: 0 !important;
  text-wrap: pretty !important;
}

@media (prefers-reduced-motion: reduce) {
  .userpatch-dialog,
  .userpatch-dialog[open],
  .userpatch-dialog[data-closing],
  .userpatch-dialog::backdrop,
  .userpatch-dialog[open]::backdrop,
  .userpatch-dialog[open][data-closing]::backdrop {
    transition-duration: 120ms !important;
  }

  .userpatch-dialog,
  .userpatch-dialog[open],
  .userpatch-dialog[data-closing] {
    transform: none !important;
  }

  #download:active,
  #button1:active,
  .${DIRECT_DOWNLOAD_BUTTON_CLASS}:active,
  .userpatch-btn-main:active,
  .userpatch-share-btn:active,
  .userpatch-pack-copy-btn:active,
  .userpatch-mirror-guide-trigger:active,
  .userpatch-dialog-close-btn:active,
  [data-slot="button-group"] > a:active,
  .${BUTTON_GROUP_CLASS} > a:active,
  [data-slot="button-group"] > button:active,
  .${BUTTON_GROUP_CLASS} > button:active {
    transform: none !important;
  }
}

.swal-modal {
  background-color: var(--card) !important;
  border: 1px solid var(--border) !important;
  border-radius: var(--radius-xl) !important;
  color: var(--foreground) !important;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5) !important;
}

.swal-title {
  color: var(--foreground) !important;
  font-family: inherit !important;
  font-weight: 600 !important;
}

.swal-text {
  color: var(--muted-foreground) !important;
  font-family: inherit !important;
}

.swal-button {
  border-radius: var(--radius-md, 0.5rem) !important;
  background-color: var(--primary) !important;
  color: var(--primary-foreground) !important;
  font-weight: 500 !important;
  border: none !important;
}

@media (forced-colors: active) {
  .${BUTTON_GROUP_CLASS}[data-mirror-type],
  [data-slot="button-group"][data-mirror-type] {
    background-color: ButtonFace !important;
    color: ButtonText !important;
    border-color: ButtonText !important;
    box-shadow: none !important;
  }

  #download,
  #button1,
  .${DIRECT_DOWNLOAD_BUTTON_CLASS} {
    background-color: ButtonFace !important;
    color: ButtonText !important;
    border: 1px solid ButtonText !important;
    box-shadow: none !important;
  }

  .userpatch-dialog {
    background-color: Canvas !important;
    color: CanvasText !important;
    border-color: CanvasText !important;
    box-shadow: none !important;
  }

  .userpatch-dialog::backdrop {
    background-color: CanvasText !important;
    backdrop-filter: none !important;
  }

  .userpatch-share-btn,
  .userpatch-pack-copy-btn,
  .userpatch-mirror-guide-trigger,
  .userpatch-dialog-close-btn {
    color: ButtonText !important;
  }

  .userpatch-pack-open-link {
    color: LinkText !important;
  }
}

${GENERATED_PAGE_CSS}
`
