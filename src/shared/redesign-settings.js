import { createLucideIcon } from "./icons.js"
import {
  createSelectOption,
  createSelectTrigger,
  SELECT_CSS,
} from "./select.js"
import { storageGet, storageSet } from "./storage.js"
import {
  ensureSystemTheme,
  getThemeSetting,
  themeSettingKey,
} from "./system-theme.js"

const dialogId = "userpatch-settings"
const icons = {
  x: [["path", { d: "m18 6-12 12M6 6l12 12" }]],
  "chevron-down": [["path", { d: "m6 9 6 6 6-6" }]],
  check: [["path", { d: "M20 6 9 17l-5-5" }]],

  settings: [
    [
      "path",
      {
        d: "M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",
      },
    ],
    ["circle", { cx: 12, cy: 12, r: 3 }],
  ],
}

const syncShortNames = (enabled) => {
  document.documentElement.toggleAttribute(
    "data-userpatch-short-episodes",
    enabled
  )
}

export const applyEpisodeNameSetting = (key) => {
  syncShortNames(storageGet(key) === "true")
}

export const applyFetchLinksSetting = (key) => {
  document.documentElement.toggleAttribute(
    "data-userpatch-fetch-links",
    typeof GM_xmlhttpRequest === "function" && storageGet(key) === "true"
  )
}

const createThemeSelect = () => {
  const id = "userpatch-theme-options"
  const { trigger, value } = createSelectTrigger(
    id,
    "Theme",
    createLucideIcon("chevron-down", icons)
  )
  const picker = document.createElement("div")
  picker.id = id
  picker.className = "userpatch-season-popup userpatch-theme-picker"
  picker.setAttribute("popover", "auto")
  const list = document.createElement("div")
  list.className = "userpatch-season-menu"
  list.setAttribute("role", "listbox")
  list.setAttribute("aria-label", "Theme")
  list.id = `${id}-list`
  trigger.setAttribute("aria-controls", list.id)
  trigger.setAttribute("popovertarget", id)
  const options = ["System", "Light", "Dark"].map((label) =>
    createSelectOption(
      label.toLowerCase(),
      label,
      createLucideIcon("check", icons)
    )
  )
  list.append(...options)
  picker.append(list)

  const selectTheme = (theme) => {
    for (const option of options) {
      const selected = option.dataset.selectKey === theme
      option.setAttribute("aria-selected", String(selected))
      if (selected) {
        value.textContent = option.firstElementChild.textContent
        trigger.setAttribute("aria-valuetext", value.textContent)
      }
    }
  }
  const commitTheme = (option) => {
    const theme = option.dataset.selectKey
    selectTheme(theme)
    storageSet(themeSettingKey, theme === "system" ? null : theme)
    ensureSystemTheme()
    picker.hidePopover()
    trigger.focus()
  }
  selectTheme(getThemeSetting())

  const positionPicker = () => {
    if (CSS.supports("position-area: block-end span-inline-start")) {
      return
    }
    const anchor = trigger.getBoundingClientRect()
    const width = picker.offsetWidth
    const height = picker.offsetHeight
    picker.style.left = `${Math.max(8, anchor.right - width)}px`
    picker.style.top = `${anchor.bottom + height + 12 <= innerHeight ? anchor.bottom + 4 : Math.max(8, anchor.top - height - 4)}px`
  }

  picker.addEventListener("beforetoggle", (event) => {
    trigger.setAttribute("aria-expanded", String(event.newState === "open"))
  })
  picker.addEventListener("toggle", (event) => {
    if (event.newState === "open") {
      positionPicker()
      list.querySelector('[aria-selected="true"]')?.focus()
    }
  })
  trigger.addEventListener("keydown", (event) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault()
      picker.showPopover({ source: trigger })
    }
  })
  list.addEventListener("click", (event) => {
    const option = event.target.closest('[role="option"]')
    if (option) {
      commitTheme(option)
    }
  })
  list.addEventListener("keydown", (event) => {
    const index = options.indexOf(event.target)
    switch (event.key) {
      case "Enter":
      case " ":
        commitTheme(event.target)
        break
      case "ArrowUp":
        options[Math.max(0, index - 1)].focus()
        break
      case "ArrowDown":
        options[Math.min(options.length - 1, index + 1)].focus()
        break
      case "Home":
        options[0].focus()
        break
      case "End":
        options.at(-1).focus()
        break
      case "Tab":
        picker.hidePopover()
        trigger.focus()
        return
      default: {
        if (
          event.key.length !== 1 ||
          event.ctrlKey ||
          event.metaKey ||
          event.altKey
        ) {
          return
        }
        const next = options.find((option) =>
          option.dataset.selectKey.startsWith(event.key.toLowerCase())
        )
        next?.focus()
      }
    }
    event.preventDefault()
  })
  return { trigger, picker }
}

export const ensureSettings = ({
  storageKeys,
  ongoingPosterSessionKey,
  shortEpisodeNamesKey,
  fetchLinksKey,
}) => {
  const existing = document.getElementById(dialogId)
  if (existing) {
    return existing
  }

  const dialog = document.createElement("dialog")
  dialog.id = dialogId
  dialog.className = "userpatch-settings-dialog"
  dialog.setAttribute("aria-labelledby", "userpatch-settings-title")
  dialog.innerHTML = `
    <div class="userpatch-settings-header">
      <h2 id="userpatch-settings-title">Settings</h2>
      <form method="dialog">
        <button type="submit" class="userpatch-settings-close" aria-label="Close settings" autofocus></button>
      </form>
    </div>
    <div class="userpatch-settings-fields">
      <div class="userpatch-settings-row userpatch-settings-theme"><span>Theme</span></div>
    </div>
    <div class="userpatch-settings-footer">
      <button type="button" class="userpatch-settings-button userpatch-clear-cache" aria-haspopup="dialog">Clear cache</button>
    </div>
  `
  dialog
    .querySelector(".userpatch-settings-close")
    .append(createLucideIcon("x", icons))
  const { trigger, picker } = createThemeSelect()
  dialog.querySelector(".userpatch-settings-theme").append(trigger, picker)

  const addSwitch = (labelText, key, apply) => {
    const label = document.createElement("label")
    label.className = "userpatch-settings-row"
    const text = document.createElement("span")
    text.textContent = labelText
    const toggle = document.createElement("input")
    toggle.type = "checkbox"
    toggle.className = "userpatch-settings-switch"
    toggle.setAttribute("role", "switch")
    toggle.checked = storageGet(key) === "true"
    toggle.addEventListener("change", () => {
      storageSet(key, toggle.checked ? "true" : null)
      apply(key)
    })
    label.append(text, toggle)
    dialog.querySelector(".userpatch-settings-fields").append(label)
  }
  if (shortEpisodeNamesKey) {
    addSwitch(
      "Simplify single-episode filenames",
      shortEpisodeNamesKey,
      applyEpisodeNameSetting
    )
  }
  if (fetchLinksKey && typeof GM_xmlhttpRequest === "function") {
    addSwitch("Fetch links", fetchLinksKey, applyFetchLinksSetting)
  }

  const confirmation = document.createElement("dialog")
  confirmation.id = "userpatch-cache-confirmation"
  confirmation.className =
    "userpatch-settings-dialog userpatch-cache-confirmation"
  confirmation.setAttribute("role", "alertdialog")
  confirmation.setAttribute("aria-labelledby", "userpatch-cache-title")
  confirmation.setAttribute("aria-describedby", "userpatch-cache-description")
  confirmation.innerHTML = `
    <div class="userpatch-cache-header">
      <h2 id="userpatch-cache-title">Clear cache?</h2>
      <p id="userpatch-cache-description">Clears opened-link history and saved tab and filter selections on this site.</p>
    </div>
    <form method="dialog" class="userpatch-settings-footer">
      <button class="userpatch-settings-button" type="submit" autofocus>Cancel</button>
      <button class="userpatch-settings-button userpatch-settings-destructive" type="button">Clear cache</button>
    </form>
  `
  dialog
    .querySelector(".userpatch-clear-cache")
    .addEventListener("click", () => {
      confirmation.showModal()
    })
  confirmation
    .querySelector(".userpatch-settings-destructive")
    .addEventListener("click", () => {
      for (const [name, key] of Object.entries(storageKeys)) {
        if (name !== "seriesSeasonPrefix") {
          storageSet(key, null)
        }
      }
      try {
        if (storageKeys.seriesSeasonPrefix) {
          for (const key of Object.keys(localStorage)) {
            if (key.startsWith(storageKeys.seriesSeasonPrefix)) {
              localStorage.removeItem(key)
            }
          }
        }
        if (ongoingPosterSessionKey) {
          sessionStorage.removeItem(ongoingPosterSessionKey)
        }
      } catch {}
      location.reload()
    })
  document.body.append(dialog, confirmation)
  return dialog
}

export const createSettingsButton = (config, labelVisible = false) => {
  const button = document.createElement("button")
  button.type = "button"
  button.className = labelVisible
    ? "userpatch-mobile-nav-item"
    : "userpatch-settings-trigger"
  button.setAttribute("aria-label", "Settings")
  button.setAttribute("aria-haspopup", "dialog")
  button.setAttribute("aria-controls", dialogId)
  const icon = createLucideIcon("settings", icons)
  if (labelVisible) {
    const iconWrapper = document.createElement("span")
    iconWrapper.className = "userpatch-mobile-nav-icon"
    iconWrapper.append(icon)
    const text = document.createElement("span")
    text.textContent = "Settings"
    button.append(iconWrapper, text)
  } else {
    button.append(icon)
  }
  button.addEventListener("click", () => ensureSettings(config).showModal())
  return button
}

export const removeSettings = () => {
  document.getElementById(dialogId)?.remove()
  document.getElementById("userpatch-cache-confirmation")?.remove()
  delete document.documentElement.dataset.userpatchShortEpisodes
  delete document.documentElement.dataset.userpatchFetchLinks
}

export const SETTINGS_CSS = `
${SELECT_CSS}
html.userpatch-maia dialog.userpatch-settings-dialog {
  position: fixed;
  inset: 0;
  box-sizing: border-box;
  inline-size: min(28rem, calc(100% - 2rem));
  max-block-size: calc(100dvh - 2rem);
  margin: auto;
  padding: 1.5rem;
  overflow: auto;
  overscroll-behavior: contain;
  border: 0;
  border-radius: 1.625rem;
  background: var(--maia-popover);
  color: var(--maia-popover-foreground);
  box-shadow: 0 0 0 1px color-mix(in oklch, var(--maia-foreground) 5%, transparent);
  font-size: 0.875rem;
}
html.userpatch-maia .userpatch-settings-dialog[open] {
  display: grid;
  gap: 1.5rem;
}
html.userpatch-maia .userpatch-settings-dialog::backdrop {
  overflow: hidden;
  overscroll-behavior: contain;
  background: rgb(0 0 0 / 80%);
  backdrop-filter: blur(2px);
}
html.userpatch-maia .userpatch-settings-header,
html.userpatch-maia .userpatch-settings-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}
html.userpatch-maia .userpatch-settings-header form,
html.userpatch-maia .userpatch-settings-dialog :is(h2, p) {
  margin: 0;
}
html.userpatch-maia .userpatch-settings-header h2 {
  color: inherit;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1;
}
html.userpatch-maia .userpatch-settings-close,
html.userpatch-maia .userpatch-settings-button {
  display: inline-grid;
  place-items: center;
  flex: none;
  margin: 0;
  border: 1px solid transparent;
  border-radius: 1.625rem;
  background: transparent;
  color: inherit;
  font: inherit;
  font-weight: 500;
  cursor: pointer;
}
html.userpatch-maia .userpatch-settings-close {
  inline-size: 2rem;
  block-size: 2rem;
  margin-block: -0.25rem;
  margin-inline-end: -0.25rem;
  padding: 0;
}
html.userpatch-maia .userpatch-settings-close svg {
  inline-size: 1rem;
  block-size: 1rem;
}
html.userpatch-maia .userpatch-settings-close:hover {
  background: var(--maia-muted);
}
html.userpatch-maia .userpatch-settings-fields {
  display: grid;
  gap: 0.75rem;
}
html.userpatch-maia .userpatch-settings-row {
  min-block-size: 2.25rem;
}
html.userpatch-maia .userpatch-settings-theme .userpatch-season-trigger {
  inline-size: 9rem;
  block-size: 2.25rem;
  margin: 0;
  anchor-name: --userpatch-theme-trigger;
}
html.userpatch-maia .userpatch-theme-picker {
  position: fixed;
  inset: 0 auto auto 0;
  inline-size: 9rem;
  margin: 0;
  padding: 0;
}
html.userpatch-maia .userpatch-theme-picker:not(:popover-open) {
  display: none;
}
@supports (position-area: block-end span-inline-start) {
  html.userpatch-maia .userpatch-theme-picker {
    inset: auto;
    position-anchor: --userpatch-theme-trigger;
    position-area: block-end span-inline-start;
    position-try-fallbacks: flip-block, flip-inline, flip-block flip-inline;
    margin-block: 0.25rem;
  }
}
html.userpatch-maia .userpatch-settings-switch {
  appearance: none;
  display: inline-flex;
  align-items: center;
  flex: none;
  inline-size: 2.75rem;
  block-size: 1.5rem;
  margin: 0 0.125rem 0 0;
  padding: 0;
  border: 1px solid transparent;
  border-radius: 999px;
  background: var(--maia-input);
  cursor: pointer;
}
html.userpatch-maia .userpatch-settings-switch::before {
  inline-size: 1.25rem;
  block-size: 1.25rem;
  margin-inline: 1px;
  border-radius: 50%;
  background: light-dark(var(--maia-background), var(--maia-foreground));
  content: "";
}
html.userpatch-maia .userpatch-settings-switch:checked {
  background: var(--maia-primary);
}
html.userpatch-maia .userpatch-settings-switch:checked::before {
  margin-inline-start: auto;
  background: var(--maia-primary-foreground);
}
html.userpatch-maia .userpatch-settings-footer {
  display: flex;
  flex-direction: column-reverse;
  gap: 0.5rem;
  margin: 0;
}
html.userpatch-maia .userpatch-settings-button {
  block-size: 2.25rem;
  padding: 0 0.75rem;
  line-height: 1;
  border-color: var(--maia-border);
  background: color-mix(in oklch, var(--maia-input) 30%, transparent);
}
html.userpatch-maia .userpatch-settings-button:hover {
  background: color-mix(in oklch, var(--maia-input) 50%, transparent);
}
html.userpatch-maia .userpatch-settings-destructive {
  border-color: transparent;
  background: color-mix(in oklch, var(--maia-destructive) 15%, transparent);
  color: var(--maia-destructive);
}
html.userpatch-maia .userpatch-settings-destructive:hover {
  background: color-mix(in oklch, var(--maia-destructive) 25%, transparent);
}
html.userpatch-maia .userpatch-cache-header {
  display: grid;
  gap: 0.375rem;
  text-align: center;
}
html.userpatch-maia .userpatch-cache-header h2 {
  font-size: 1.125rem;
  font-weight: 500;
}
html.userpatch-maia .userpatch-cache-header p {
  color: var(--maia-muted-foreground);
}
@media (max-width: 39.99rem) {
  html.userpatch-maia .userpatch-cache-confirmation {
    max-inline-size: 20rem;
  }
}
@media (min-width: 40rem) {
  html.userpatch-maia .userpatch-settings-footer {
    flex-direction: row;
    justify-content: flex-end;
  }
  html.userpatch-maia .userpatch-cache-header {
    text-align: start;
  }
}
html.userpatch-maia .userpatch-settings-dialog :is(button:not(:where(.userpatch-season-trigger)), input):focus-visible {
  outline: 2px solid var(--maia-ring);
  outline-offset: 2px;
}
`
