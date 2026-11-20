import { copyToClipboard, showCopiedFeedback } from "../hubcloud/clipboard.js"
import {
  BUTTON_GROUP_CLASS,
  BUTTON_MAIN_CLASS,
  COPY_BUTTON_CLASS,
} from "../hubcloud/config.js"
import {
  createLucideIcon as createHubCloudIcon,
  createSpinnerIcon,
} from "../hubcloud/icons.js"
import {
  BUTTON_GROUP_CSS,
  KUMO_PRIMARY_BUTTON_TOKENS,
  KUMO_MUTED_BUTTON_TOKENS,
  KUMO_BUTTON_PAINT,
} from "../shared/button-group.js"
import {
  fetchReleaseMirrors,
  renderFetchedMirrors,
  resolvePlayableMirror,
  resolveProviderShare,
} from "../shared/fetch-mirrors.js"
import { markReleaseOpened, saveOpenedRelease } from "../shared/storage.js"
import { CONFIG } from "./config.js"
import { createLucideIcon } from "./icons.js"

const copyResolvedShare = async (url) => {
  try {
    if (typeof GM_setClipboard === "function") {
      await GM_setClipboard(url.href, "text")
      return true
    }
  } catch {}
  return copyToClipboard(url.href)
}

let menuId = 0

const createAction = (label, icon) => {
  const button = document.createElement("button")
  button.type = "button"
  button.append(
    icon === "copy" ? createHubCloudIcon(icon) : createLucideIcon(icon)
  )
  button.setAttribute("aria-label", label)
  return button
}

export const addFetchLinks = (row, actions) => {
  if (!actions) {
    return
  }
  const providers = new Map(
    [
      ...actions.querySelectorAll(
        'a[aria-label="HubCloud"], a[aria-label="HubDrive"]'
      ),
    ].map((anchor) => [anchor.getAttribute("aria-label"), anchor])
  )
  const sources = [...providers]
  if (!sources.length || typeof GM_xmlhttpRequest !== "function") {
    return
  }

  const group = document.createElement("div")
  group.className = `${BUTTON_GROUP_CLASS} userpatch-fetch-group`
  group.setAttribute("role", "group")
  group.setAttribute("aria-label", "Release links")

  const show = createAction("Show links", "chevron-down")
  show.className = BUTTON_MAIN_CLASS
  const showLabel = document.createElement("span")
  showLabel.className = "userpatch-btn-label"
  let hasMirrors = false
  const renderShowState = (loading = false) => {
    const label = hasMirrors ? "Refresh" : "Show links"
    group.classList.toggle("userpatch-fetch-loaded", hasMirrors)
    show.disabled = loading
    if (loading) {
      show.setAttribute("aria-busy", "true")
    } else {
      show.removeAttribute("aria-busy")
    }
    show.setAttribute("aria-label", loading ? "Fetching links" : label)
    showLabel.textContent = label
    const readyIcon = hasMirrors
      ? createHubCloudIcon("refresh-cw")
      : createHubCloudIcon("sparkles")
    show.replaceChildren(loading ? createSpinnerIcon() : readyIcon, showLabel)
  }
  renderShowState()
  const more = createAction("More link options", "chevron-down")
  more.className = COPY_BUTTON_CLASS
  const menu = document.createElement("div")
  menu.id = `userpatch-fetch-menu-${++menuId}`
  menu.className = "userpatch-season-popup userpatch-fetch-menu"
  menu.setAttribute("popover", "auto")
  more.setAttribute("popovertarget", menu.id)
  more.setAttribute("aria-controls", menu.id)
  menu.addEventListener("beforetoggle", ({ newState }) => {
    more.setAttribute("aria-expanded", String(newState === "open"))
    if (newState === "open") {
      const rect = more.getBoundingClientRect()
      menu.style.insetInlineEnd = `${Math.max(8, innerWidth - rect.right)}px`
      if (innerHeight - rect.bottom >= 104) {
        menu.style.insetBlockStart = `${rect.bottom + 4}px`
        menu.style.insetBlockEnd = "auto"
      } else {
        menu.style.insetBlockStart = "auto"
        menu.style.insetBlockEnd = `${innerHeight - rect.top + 4}px`
      }
    }
  })

  const results = document.createElement("div")
  results.className = "userpatch-fetch-results"
  const status = document.createElement("div")
  status.setAttribute("role", "status")
  const output = document.createElement("div")
  output.className = "userpatch-fetch-output"
  results.append(status, output)

  for (const [provider, anchor] of sources) {
    const label = `Copy ${provider}`
    const button = createAction(label, "copy")
    button.classList.add("userpatch-season-option")
    button.append(label)
    button.addEventListener("click", async () => {
      button.disabled = true
      button.setAttribute("aria-busy", "true")
      status.textContent = ""
      try {
        const share = await resolveProviderShare(anchor.href, provider)
        if (!share) {
          status.textContent = `Could not resolve the ${provider} share link.`
          return
        }
        if (await copyResolvedShare(share)) {
          showCopiedFeedback(button, {
            label,
            text: label,
            copiedLabel: `${provider} copied`,
            copiedText: "Copied",
            showTitle: false,
          })
        } else {
          status.textContent = "Could not copy the link."
        }
      } finally {
        button.disabled = false
        button.removeAttribute("aria-busy")
      }
    })
    menu.append(button)
    anchor.classList.add("userpatch-fetch-original")
  }

  const recordOpened = (url) => {
    const item = row.closest(".userpatch-release-item")
    markReleaseOpened(row, item)
    saveOpenedRelease(item?.dataset.userpatchFilename, url)
  }

  show.addEventListener("click", async () => {
    recordOpened()
    renderShowState(true)
    status.textContent = ""
    try {
      const { mirrors, requiresBrowser } = await fetchReleaseMirrors(providers)
      if (!results.isConnected) {
        return
      }
      if (!mirrors.length) {
        status.textContent = requiresBrowser
          ? "Provider verification is required."
          : "No mirrors found."
        return
      }

      const resolved = await Promise.all(mirrors.map(resolvePlayableMirror))
      if (!results.isConnected) {
        return
      }
      hasMirrors = renderFetchedMirrors(output, resolved, recordOpened)
    } finally {
      renderShowState()
    }
  })

  group.append(show, more)
  actions.append(group, menu)
  row.append(results)
}

export const FETCH_LINKS_CSS = `
${BUTTON_GROUP_CSS}
html.userpatch-maia[data-userpatch-fetch-links] {
  --userpatch-fetch-label-size: 0.875rem;
  --userpatch-fetch-control-inner-size: calc(var(--userpatch-fetch-label-size) + 1.25rem);
}
@media (min-width: ${CONFIG.mobileLayoutBreakpointRem + 0.01}rem) {
  html.userpatch-maia[data-userpatch-fetch-links] {
    --userpatch-fetch-label-size: 1rem;
  }
}
html.userpatch-maia :is(.userpatch-fetch-group, .userpatch-fetch-results) {
  display: none;
}
html.userpatch-maia[data-userpatch-fetch-links] .userpatch-fetch-original {
  display: none;
}
html.userpatch-maia[data-userpatch-fetch-links] .userpatch-fetch-results {
  display: grid;
  min-inline-size: 0;
  gap: 0.375rem;
}
html.userpatch-maia .userpatch-fetch-results > :is([role="status"], .userpatch-fetch-output):empty {
  display: none;
}
html.userpatch-maia .userpatch-fetch-results:has([role="status"]:empty):has(.userpatch-fetch-output:empty) {
  display: none;
}
html.userpatch-maia .userpatch-fetch-output .userpatch-btn-group,
html.userpatch-maia[data-userpatch-fetch-links] .userpatch-fetch-group {
  ${KUMO_BUTTON_PAINT}
  display: inline-flex;
  align-items: stretch;
  max-inline-size: 100%;
  box-sizing: border-box;
}
html.userpatch-maia .userpatch-fetch-output .userpatch-btn-group {
  overflow: hidden;
}
html.userpatch-maia .userpatch-fetch-output .userpatch-btn-group > :is(button, a) {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-block-size: var(--userpatch-fetch-control-inner-size);
  gap: 0.375rem;
  padding: 0.25rem 0.75rem;
  margin: 0;
  border: 0;
  border-radius: 0;
  background: transparent;
  color: inherit !important;
  font: inherit;
  text-decoration: none;
  cursor: pointer;
}
html.userpatch-maia .userpatch-fetch-output .userpatch-btn-group > :is(button, a):hover {
  background: color-mix(in oklch, currentColor 9%, transparent) !important;
}
html.userpatch-maia[data-userpatch-fetch-links] .userpatch-fetch-group {
  ${KUMO_PRIMARY_BUTTON_TOKENS}
  isolation: isolate;
  white-space: nowrap;
}
html.userpatch-maia[data-userpatch-fetch-links] .userpatch-fetch-group > button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: none;
  gap: 0.375rem;
  min-block-size: var(--userpatch-fetch-control-inner-size);
  padding: 0.375rem 0.75rem;
  margin: 0;
  border: 0 !important;
  border-radius: 0.5rem;
  background: transparent !important;
  color: inherit !important;
  box-shadow: none !important;
  font: inherit;
  font-weight: 500;
  line-height: 1.25rem;
  cursor: pointer;
}
html.userpatch-maia[data-userpatch-fetch-links] .userpatch-fetch-group > button:first-child {
  border-start-end-radius: 0;
  border-end-end-radius: 0;
}
html.userpatch-maia[data-userpatch-fetch-links] .userpatch-fetch-group > button:last-child {
  inline-size: var(--userpatch-fetch-control-inner-size);
  padding: 0;
  border-inline-start: 1px solid color-mix(in oklch, currentColor 22%, transparent) !important;
  border-start-start-radius: 0;
  border-end-start-radius: 0;
}
html.userpatch-maia[data-userpatch-fetch-links] .userpatch-fetch-group:hover {
  --userpatch-button-tint: 22%;
}
html.userpatch-maia[data-userpatch-fetch-links] .userpatch-fetch-group.userpatch-fetch-loaded {
  ${KUMO_MUTED_BUTTON_TOKENS}
}
html.userpatch-maia[data-userpatch-fetch-links] .userpatch-fetch-group > button:focus-visible {
  z-index: 1;
  outline: 2px solid var(--maia-ring) !important;
  outline-offset: 1px;
}
html.userpatch-maia[data-userpatch-fetch-links] .userpatch-fetch-group > button:disabled {
  opacity: 0.6;
  cursor: wait;
}
html.userpatch-maia :is(.userpatch-fetch-group, .userpatch-fetch-output) svg {
  inline-size: var(--userpatch-fetch-label-size);
  block-size: var(--userpatch-fetch-label-size);
  flex: none;
}
/* The arrow path occupies less of its view box than the copy glyph. */
html.userpatch-maia .userpatch-fetch-output svg[data-userpatch-lucide-icon="arrow-down-to-line"] {
  inline-size: calc(var(--userpatch-fetch-label-size) + 0.125rem);
  block-size: calc(var(--userpatch-fetch-label-size) + 0.125rem);
}
html.userpatch-maia[data-userpatch-fetch-links] :is(.userpatch-fetch-group, .userpatch-fetch-output) .userpatch-btn-label,
html.userpatch-maia[data-userpatch-fetch-links] .userpatch-fetch-menu button > span {
  font-size: var(--userpatch-fetch-label-size) !important;
  font-weight: 500;
  line-height: 1.25;
  text-box: trim-both cap alphabetic;
}
html.userpatch-maia .userpatch-fetch-output .userpatch-copy-btn {
  inline-size: var(--userpatch-fetch-control-inner-size);
  flex: none;
}
html.userpatch-maia :is(.userpatch-fetch-group, .userpatch-fetch-output) svg {
  stroke: currentColor !important;
  fill: none !important;
}
@keyframes userpatch-fetch-spin {
  to { transform: rotate(360deg); }
}
@media (prefers-reduced-motion: no-preference) {
  html.userpatch-maia .userpatch-fetch-group .userpatch-spinner {
    animation: userpatch-fetch-spin 1s linear infinite;
  }
}
html.userpatch-maia .userpatch-fetch-output {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
}
html.userpatch-maia .userpatch-fetch-menu:not(:popover-open) {
  display: none;
}
html.userpatch-maia .userpatch-fetch-menu {
  position: fixed;
  inset: auto;
  inline-size: max-content;
  min-inline-size: 9rem;
  max-inline-size: calc(100vw - 1rem);
  margin: 0;
  padding: 0.25rem;
  border: 1px solid var(--maia-border);
  border-radius: 0.75rem;
  background: var(--maia-popover);
  color: var(--maia-popover-foreground);
  box-shadow: 0 8px 24px rgb(0 0 0 / 18%);
}
html.userpatch-maia[data-userpatch-fetch-links] .userpatch-fetch-menu button {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.5rem;
  inline-size: 100%;
  text-align: start;
  white-space: nowrap;
  min-block-size: calc(var(--userpatch-fetch-control-inner-size) + 2px);
  padding: 0.375rem 0.75rem;
  font-size: var(--userpatch-fetch-label-size) !important;
  line-height: 1.35;
  border: 0;
  border-radius: 0.5rem;
  background: transparent;
  color: inherit;
  cursor: pointer;
}
html.userpatch-maia .userpatch-fetch-menu button:hover {
  background: var(--maia-accent);
}
html.userpatch-maia .userpatch-fetch-menu svg {
  flex: none;
  inline-size: var(--userpatch-fetch-label-size);
  block-size: var(--userpatch-fetch-label-size);
}
html.userpatch-maia[data-userpatch-fetch-links] .userpatch-release-row:has(> .userpatch-fetch-results) {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  grid-template-rows: auto auto;
  column-gap: 0.75rem;
  row-gap: 0;
}
html.userpatch-maia[data-userpatch-fetch-links] .userpatch-release-row > .userpatch-release-actions:has(.userpatch-fetch-group) {
  grid-column: 2;
  grid-row: 1;
}
html.userpatch-maia[data-userpatch-fetch-links] .userpatch-release-row > .userpatch-fetch-results {
  grid-column: 1 / -1;
  grid-row: 2;
  margin-block-start: 0.5rem;
}
@media (max-width: ${CONFIG.mobileLayoutBreakpointRem}rem) {
  html.userpatch-maia[data-userpatch-fetch-links] {
    --userpatch-fetch-control-inner-size: 2.625rem;
  }
  html.userpatch-maia[data-userpatch-fetch-links] .userpatch-release-row:has(> .userpatch-fetch-results) {
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: auto;
    row-gap: 0.625rem;
  }
  html.userpatch-maia[data-userpatch-fetch-links] .userpatch-release-row > .userpatch-release-actions:has(.userpatch-fetch-group),
  html.userpatch-maia[data-userpatch-fetch-links] .userpatch-release-row > .userpatch-fetch-results {
    grid-column: 1;
    grid-row: auto;
    margin: 0;
  }
  html.userpatch-maia[data-userpatch-fetch-links] .userpatch-fetch-group,
  html.userpatch-maia[data-userpatch-fetch-links] .userpatch-fetch-group > button:first-child {
    flex: 1 1 auto;
  }
  html.userpatch-maia .userpatch-fetch-output:not(:empty) {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    align-items: stretch;
    gap: 0.625rem;
  }
  html.userpatch-maia .userpatch-fetch-output .userpatch-btn-group > a {
    flex: 1 1 auto;
    justify-content: flex-start !important;
    gap: 0.375rem;
    min-inline-size: 0;
    padding-inline: 0.75rem;
    text-align: start;
  }
  html.userpatch-maia[data-userpatch-fetch-links] .userpatch-fetch-group > button:first-child {
    justify-content: flex-start;
  }
  html.userpatch-maia .userpatch-fetch-output .userpatch-btn-group > button {
    padding-inline: 0;
  }
  html.userpatch-maia .userpatch-fetch-output .userpatch-btn-label {
    overflow-wrap: anywhere;
    white-space: normal;
  }
}
`
