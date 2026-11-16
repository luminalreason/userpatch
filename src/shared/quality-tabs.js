import { USERPATCH_BADGE_DATA } from "./badges.js"
import { QUALITY_LABELS } from "./quality.js"
import { storageGet, storageSet } from "./storage.js"

// Interface:
// Exports: positionSelectionIndicator, createQualityTabs
// Options: callers pass a storage key and change callback; indicator positioning takes its container, target, and CSS variable kind.
// Invariants: owns the --userpatch-{kind}-* CSS-var contract consumed in two CSS regions.
// Error modes: positionSelectionIndicator stands down when the anchor is missing (4K-HDHub's null guard, now shared).

const QUALITY_TAB_KEYS = ["all", "4k", "hd", "sd"]

export const setupIndicatorHover = (container, position, onFocus) => {
  const getButton = (target) => {
    const button = target instanceof Element ? target.closest("button") : null
    return button && container.contains(button) && !button.disabled
      ? button
      : null
  }
  const onPointerOver = (event) => {
    if (
      (event.pointerType === "mouse" || event.pointerType === "pen") &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ) {
      const button = getButton(event.target)
      if (button) {
        position(button)
      }
    }
  }
  const restore = () => position()
  const onFocusIn = (event) => {
    const button = getButton(event.target)
    if (button) {
      onFocus?.(button)
      position(button)
    }
  }
  const onFocusOut = (event) => {
    if (
      !(event.relatedTarget instanceof Node) ||
      !container.contains(event.relatedTarget)
    ) {
      restore()
    }
  }
  container.addEventListener("pointerover", onPointerOver)
  container.addEventListener("pointerleave", restore)
  container.addEventListener("focusin", onFocusIn)
  container.addEventListener("focusout", onFocusOut)
  return () => {
    container.removeEventListener("pointerover", onPointerOver)
    container.removeEventListener("pointerleave", restore)
    container.removeEventListener("focusin", onFocusIn)
    container.removeEventListener("focusout", onFocusOut)
  }
}

export const positionSelectionIndicator = (
  indicator,
  container,
  target,
  kind
) => {
  if (!target || !container.contains(target)) {
    indicator.dataset.ready = "false"
    return
  }
  const containerRect = container.getBoundingClientRect()
  const targetRect = target.getBoundingClientRect()
  if (
    !indicator.offsetWidth ||
    !indicator.offsetHeight ||
    !targetRect.width ||
    !targetRect.height
  ) {
    return
  }
  const scaleX = targetRect.width / indicator.offsetWidth
  const scaleY = targetRect.height / indicator.offsetHeight
  const radius =
    Number.parseFloat(getComputedStyle(target).borderTopLeftRadius) || 12
  const prefix = `--userpatch-${kind}`
  indicator.style.setProperty(
    `${prefix}-x`,
    `${targetRect.left - containerRect.left - container.clientLeft}px`
  )
  indicator.style.setProperty(
    `${prefix}-y`,
    `${targetRect.top - containerRect.top - container.clientTop}px`
  )
  indicator.style.setProperty(`${prefix}-scale-x`, String(scaleX))
  indicator.style.setProperty(`${prefix}-scale-y`, String(scaleY))
  indicator.style.setProperty(`${prefix}-radius-x`, `${radius / scaleX}px`)
  indicator.style.setProperty(`${prefix}-radius-y`, `${radius / scaleY}px`)
  if (indicator.dataset.ready === "true") {
    indicator.dataset.animate = "true"
  }
  indicator.dataset.ready = "true"
}

export const createQualityTabs = ({ storageKey, onQualityChange }) => {
  const element = document.createElement("div")
  element.className = "userpatch-quality-tabs"
  element.setAttribute("role", "group")
  element.setAttribute("aria-label", "Filter releases by quality")

  const indicator = document.createElement("span")
  indicator.className = "userpatch-quality-indicator"
  indicator.setAttribute("aria-hidden", "true")
  indicator.dataset.ready = "false"
  element.append(indicator)

  const buttons = new Map()
  for (const quality of QUALITY_TAB_KEYS) {
    const button = document.createElement("button")
    button.type = "button"
    button.className = "userpatch-quality-tab"
    button.dataset.quality = quality
    button.dataset.tabContent = quality === "all" ? "label" : "icon"
    button.setAttribute("aria-pressed", quality === "all" ? "true" : "false")
    const label = QUALITY_LABELS[quality]
    button.setAttribute("aria-label", label)
    button.title = label

    if (quality === "all") {
      button.textContent = "All"
    } else {
      const icon = document.createElement("img")
      icon.src = USERPATCH_BADGE_DATA[quality]
      icon.alt = ""
      icon.width = 26
      icon.height = 15
      icon.decoding = "async"
      button.append(icon)
    }
    element.append(button)
    buttons.set(quality, button)
  }

  const savedQuality = storageGet(storageKey)
  let activeQuality =
    savedQuality && QUALITY_TAB_KEYS.includes(savedQuality)
      ? savedQuality
      : "all"
  const positionIndicator = (target) => {
    if (!element.hidden) {
      positionSelectionIndicator(
        indicator,
        element,
        target || buttons.get(activeQuality) || buttons.get("all"),
        "quality"
      )
    }
  }

  const positionActiveIndicator = () => {
    positionIndicator()
  }

  const getEventButton = (target) => {
    if (!(target instanceof Element)) {
      return null
    }
    const button = target.closest(".userpatch-quality-tab")
    return button instanceof HTMLElement && element.contains(button)
      ? button
      : null
  }

  const onClick = (event) => {
    const button = getEventButton(event.target)
    if (!button || button.disabled) {
      return
    }
    const newQuality = button.dataset.quality || "all"
    activeQuality = newQuality
    storageSet(storageKey, newQuality)
    for (const [q, btn] of buttons) {
      btn.setAttribute("aria-pressed", q === activeQuality ? "true" : "false")
    }
    positionIndicator()
    onQualityChange?.(activeQuality)
  }

  element.addEventListener("click", onClick)
  const cleanupIndicatorHover = setupIndicatorHover(element, positionIndicator)
  element.addEventListener("scroll", positionActiveIndicator, {
    passive: true,
  })

  const resizeObserver =
    typeof ResizeObserver === "undefined"
      ? null
      : new ResizeObserver(positionActiveIndicator)
  resizeObserver?.observe(element)
  for (const button of buttons.values()) {
    resizeObserver?.observe(button)
  }
  if (!resizeObserver) {
    window.addEventListener("resize", positionActiveIndicator)
  }

  const refreshButtons = (availableQualities) => {
    const availableSet =
      availableQualities instanceof Set
        ? availableQualities
        : new Set(availableQualities)
    const saved = storageGet(storageKey)
    if (saved && QUALITY_TAB_KEYS.includes(saved)) {
      if (saved === "all" || availableSet.has(saved)) {
        activeQuality = saved
      } else if (!availableSet.has(activeQuality)) {
        activeQuality = "all"
      }
    } else if (activeQuality !== "all" && !availableSet.has(activeQuality)) {
      activeQuality = "all"
    }

    for (const [quality, button] of buttons) {
      const unavailable = quality !== "all" && !availableSet.has(quality)
      button.disabled = unavailable
      if (unavailable) {
        button.dataset.status = "unavailable"
      } else {
        delete button.dataset.status
      }
      button.setAttribute(
        "aria-pressed",
        quality === activeQuality ? "true" : "false"
      )
    }
    positionIndicator()
    return activeQuality
  }

  const cleanup = () => {
    element.removeEventListener("click", onClick)
    cleanupIndicatorHover()
    element.removeEventListener("scroll", positionActiveIndicator)
    if (resizeObserver) {
      resizeObserver.disconnect()
    } else {
      window.removeEventListener("resize", positionActiveIndicator)
    }
  }

  return {
    element,
    getActiveQuality: () => activeQuality,
    positionIndicator,
    refreshButtons,
    cleanup,
  }
}
