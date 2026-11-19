export const createSelectTrigger = (id, label, icon) => {
  const trigger = document.createElement("button")
  trigger.type = "button"
  trigger.className = "userpatch-season-trigger"
  trigger.setAttribute("role", "combobox")
  trigger.setAttribute("aria-haspopup", "listbox")
  trigger.setAttribute("aria-expanded", "false")
  trigger.setAttribute("aria-controls", id)
  trigger.setAttribute("aria-label", label)
  const value = document.createElement("span")
  value.className = "userpatch-season-value"
  icon.classList.add("userpatch-season-chevron")
  trigger.append(value, icon)
  return { trigger, value }
}

export const createSelectOption = (key, text, icon) => {
  const option = document.createElement("div")
  option.className = "userpatch-season-option"
  option.setAttribute("role", "option")
  option.tabIndex = -1
  option.dataset.selectKey = key
  const label = document.createElement("span")
  label.className = "userpatch-season-option-label"
  label.textContent = text
  icon.classList.add("userpatch-season-option-check")
  option.append(label, icon)
  return option
}

export const SELECT_CSS = `
html.userpatch-maia .userpatch-season-trigger {
  display: flex;
  inline-size: 100%;
  box-sizing: border-box;
  min-inline-size: 0;
  block-size: 2.125rem;
  align-items: center;
  justify-content: space-between;
  gap: 0.375rem;
  padding: calc(0.375rem + 1px) calc(0.75rem + 1px);
  border: 0;
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
  transition: background-color 140ms ease;
}

@media (hover: hover) and (pointer: fine) {
  html.userpatch-maia .userpatch-season-trigger:hover:not(:disabled) {
    background: var(--maia-select-hover-bg, rgb(255 255 255 / 0.2));
  }
}

html.userpatch-maia .userpatch-season-trigger:active:not(:disabled) {
  background: var(--maia-select-hover-bg, rgb(255 255 255 / 0.25));
}

html.userpatch-maia .userpatch-season-trigger:focus-visible {
  outline: 2px solid var(--maia-ring);
  outline-offset: -2px;
}

html.userpatch-maia .userpatch-season-trigger:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

html.userpatch-maia .userpatch-season-value {
  min-inline-size: 0;
  flex: 1 1 auto;
  overflow: hidden;
  text-overflow: ellipsis;
}

html.userpatch-maia .userpatch-season-popup {
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

html.userpatch-maia .userpatch-season-popup[data-side="top"] {
  transform-origin: bottom left;
}

@starting-style {
  html.userpatch-maia .userpatch-season-popup {
    opacity: 0;
    transform: scale(0.96);
  }
}

html.userpatch-maia .userpatch-season-menu {
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

html.userpatch-maia .userpatch-season-menu::-webkit-scrollbar {
  display: none;
}

html.userpatch-maia .userpatch-season-option {
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
  html.userpatch-maia .userpatch-season-option:hover {
    background: var(--maia-accent);
    color: var(--maia-accent-foreground);
  }
}

html.userpatch-maia .userpatch-season-option:focus-visible,
html.userpatch-maia .userpatch-season-option[data-highlighted] {
  outline: none;
  background: var(--maia-accent);
  color: var(--maia-accent-foreground);
}

html.userpatch-maia .userpatch-season-option-label {
  min-inline-size: 0;
  flex: 1 1 auto;
  white-space: normal;
  overflow-wrap: anywhere;
  word-break: normal;
  line-height: 1.35;
}

html.userpatch-maia .userpatch-season-option-check {
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

html.userpatch-maia .userpatch-season-option[aria-selected="true"] .userpatch-season-option-check {
  opacity: 1;
}

html.userpatch-maia .userpatch-season-chevron {
  display: block;
  flex: none;
  inline-size: 1rem;
  block-size: 1rem;
  color: var(--maia-muted-foreground);
  pointer-events: none;
}

`
