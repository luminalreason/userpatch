import { markReleaseOpened, saveOpenedRelease } from "./storage.js"

// Interface:
// Exports: setupProviderTooltip
// Options: takes the root containing provider links and delegates hover, focus, and click events.
// Invariants: callers retain the returned cleanup in their page teardown slot.
// Error modes: unknown or detached triggers are ignored; cleanup cancels pending work, removes listeners, and removes the tooltip.

export const setupProviderTooltip = (root) => {
  const tooltip = document.createElement("div")
  tooltip.id = "userpatch-provider-tooltip"
  tooltip.className = "userpatch-provider-tooltip"
  tooltip.setAttribute("role", "tooltip")
  tooltip.setAttribute("aria-hidden", "true")
  tooltip.hidden = true
  document.body.append(tooltip)

  let hoveredTrigger = null
  let focusedTrigger = null
  let activeTrigger = null
  let openFrame = 0
  let closeTimer = 0

  const getTrigger = (target) => {
    if (!(target instanceof Element)) {
      return null
    }
    const trigger = target.closest(
      ".userpatch-provider-link, .userpatch-hblinks-action"
    )
    return trigger instanceof HTMLElement && root.contains(trigger)
      ? trigger
      : null
  }

  const positionTooltip = () => {
    if (!activeTrigger?.isConnected) {
      return
    }

    const triggerRect = activeTrigger.getBoundingClientRect()
    const tooltipRect = tooltip.getBoundingClientRect()
    if (
      triggerRect.bottom < 0 ||
      triggerRect.top > window.innerHeight ||
      triggerRect.right < 0 ||
      triggerRect.left > window.innerWidth
    ) {
      closeTooltip()
      return
    }

    const offset = 8
    const side =
      triggerRect.top >= tooltipRect.height + offset ? "top" : "bottom"
    const halfWidth = tooltipRect.width / 2
    const center = triggerRect.left + triggerRect.width / 2
    const left = Math.min(
      Math.max(center, halfWidth + 4),
      window.innerWidth - halfWidth - 4
    )
    const top =
      side === "top"
        ? triggerRect.top - tooltipRect.height - offset
        : triggerRect.bottom + offset

    tooltip.dataset.side = side
    tooltip.style.left = `${left}px`
    tooltip.style.top = `${Math.max(4, top)}px`
  }

  const closeTooltip = () => {
    if (!activeTrigger) {
      return
    }

    activeTrigger.removeAttribute("aria-describedby")
    activeTrigger = null
    tooltip.dataset.state = "closed"
    tooltip.setAttribute("aria-hidden", "true")
    window.clearTimeout(closeTimer)
    closeTimer = window.setTimeout(() => {
      if (!activeTrigger) {
        tooltip.hidden = true
      }
    }, 140)
  }

  const syncTooltip = () => {
    const nextTrigger = hoveredTrigger || focusedTrigger
    if (!nextTrigger) {
      closeTooltip()
      return
    }

    window.clearTimeout(closeTimer)
    if (activeTrigger !== nextTrigger) {
      activeTrigger?.removeAttribute("aria-describedby")
      activeTrigger = nextTrigger
      tooltip.textContent = nextTrigger.dataset.tooltip || ""
      nextTrigger.setAttribute("aria-describedby", tooltip.id)
    }

    tooltip.hidden = false
    tooltip.setAttribute("aria-hidden", "false")
    positionTooltip()
    window.cancelAnimationFrame(openFrame)
    openFrame = window.requestAnimationFrame(() => {
      if (activeTrigger === nextTrigger) {
        tooltip.dataset.state = "open"
      }
    })
  }

  const onPointerOver = (event) => {
    if (
      (event.pointerType !== "mouse" && event.pointerType !== "pen") ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ) {
      return
    }
    const trigger = getTrigger(event.target)
    if (!trigger || trigger.contains(event.relatedTarget)) {
      return
    }
    hoveredTrigger = trigger
    syncTooltip()
  }

  const onPointerOut = (event) => {
    const trigger = getTrigger(event.target)
    if (
      !trigger ||
      trigger !== hoveredTrigger ||
      trigger.contains(event.relatedTarget)
    ) {
      return
    }
    hoveredTrigger = null
    syncTooltip()
  }

  const onFocusIn = (event) => {
    focusedTrigger = getTrigger(event.target)
    if (focusedTrigger) {
      syncTooltip()
    }
  }

  const onFocusOut = (event) => {
    const trigger = getTrigger(event.target)
    if (
      trigger &&
      trigger === focusedTrigger &&
      !trigger.contains(event.relatedTarget)
    ) {
      focusedTrigger = null
      syncTooltip()
    }
  }

  const onProviderClick = (event) => {
    if (event.type === "auxclick" && event.button !== 1) {
      return
    }
    const trigger = getTrigger(event.target)
    if (!trigger) {
      return
    }
    const item = trigger.closest(".userpatch-release-item")
    const row =
      trigger.closest(".userpatch-release-row") ||
      item?.querySelector(".userpatch-release-row")
    markReleaseOpened(row, item)
    const filename = item?.dataset.userpatchFilename
    const href = trigger instanceof HTMLAnchorElement ? trigger.href : ""
    saveOpenedRelease(filename, href)
  }

  root.addEventListener("click", onProviderClick, true)
  root.addEventListener("auxclick", onProviderClick, true)
  root.addEventListener("pointerover", onPointerOver)
  root.addEventListener("pointerout", onPointerOut)
  root.addEventListener("focusin", onFocusIn)
  root.addEventListener("focusout", onFocusOut)
  window.addEventListener("resize", positionTooltip)
  document.addEventListener("scroll", positionTooltip, true)

  return () => {
    root.removeEventListener("click", onProviderClick, true)
    root.removeEventListener("auxclick", onProviderClick, true)
    root.removeEventListener("pointerover", onPointerOver)
    root.removeEventListener("pointerout", onPointerOut)
    root.removeEventListener("focusin", onFocusIn)
    root.removeEventListener("focusout", onFocusOut)
    window.removeEventListener("resize", positionTooltip)
    document.removeEventListener("scroll", positionTooltip, true)
    window.cancelAnimationFrame(openFrame)
    window.clearTimeout(closeTimer)
    activeTrigger?.removeAttribute("aria-describedby")
    tooltip.remove()
  }
}
