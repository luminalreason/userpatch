import {
  BUTTON_GROUP_CLASS,
  BUTTON_MAIN_CLASS,
  GUIDE_ROW_ID,
} from "./config.js"
import { createTelegramIcon } from "./icons.js"
import { createLucideIcon } from "./icons.js"
import { DIALOG_ID, MIRROR_THEMES, TRIGGER_ID } from "./mirror-rows.js"

export let supportsDisplayTransition

export const canTransitionDisplay = () => {
  if (supportsDisplayTransition !== undefined) {
    return supportsDisplayTransition
  }
  if (
    !document.body ||
    !window.CSS?.supports?.("transition-behavior", "allow-discrete")
  ) {
    return false
  }

  const probe = document.createElement("div")
  probe.style.cssText =
    "position: fixed; visibility: hidden; transition: display 1s allow-discrete !important; display: block;"
  document.body.append(probe)
  try {
    const displayBefore = getComputedStyle(probe).display
    probe.style.display = "none"
    const displayDuringTransition = getComputedStyle(probe).display
    supportsDisplayTransition =
      displayBefore === "block" && displayDuringTransition === "block"
  } catch {
    supportsDisplayTransition = false
  } finally {
    probe.remove()
  }
  return supportsDisplayTransition
}

export const supportsDiscreteDialogExit = () => {
  return window.CSS?.supports?.("overlay", "auto") && canTransitionDisplay()
}

export const isDialogBackdropClick = (event, dialog) => {
  if (event.target !== dialog) {
    return false
  }
  const bounds = dialog.getBoundingClientRect()
  return (
    event.clientX < bounds.left ||
    event.clientX > bounds.right ||
    event.clientY < bounds.top ||
    event.clientY > bounds.bottom
  )
}

export const openMirrorGuideDialog = () => {
  const dialog = document.getElementById(DIALOG_ID)
  if (dialog instanceof HTMLDialogElement) {
    if (dialog.open) {
      delete dialog.dataset.closing
      return
    }
    try {
      dialog.showModal()
    } catch {
      return
    }
  }
}

export const closeMirrorGuideDialog = () => {
  const dialog = document.getElementById(DIALOG_ID)
  if (
    !(dialog instanceof HTMLDialogElement) ||
    !dialog.open ||
    dialog.dataset.closing !== undefined
  ) {
    return
  }

  if (supportsDiscreteDialogExit()) {
    dialog.close()
    return
  }

  dialog.dataset.closing = "true"
  let animations = []
  try {
    animations = dialog.getAnimations({ subtree: true })
  } catch {
    dialog.close()
    return
  }

  let timeoutId = 0
  const finishClose = () => {
    window.clearTimeout(timeoutId)
    if (dialog.open && dialog.dataset.closing !== undefined) {
      dialog.close()
    }
  }

  if (animations.length === 0) {
    finishClose()
    return
  }

  timeoutId = window.setTimeout(finishClose, 1000)
  Promise.allSettled(animations.map((animation) => animation.finished)).then(
    finishClose
  )
}

export const ensureMirrorGuide = ({ hubCdn = false } = {}) => {
  if (
    !("HTMLDialogElement" in window) ||
    typeof window.HTMLDialogElement.prototype.showModal !== "function"
  ) {
    return
  }

  const allGroups = Array.from(
    document.querySelectorAll(`.${BUTTON_GROUP_CLASS}`)
  ).filter(
    (grp) =>
      !grp.closest(".loading, .d-none") &&
      grp.querySelector(`.${BUTTON_MAIN_CLASS}`)
  )

  const existingRow = document.getElementById(GUIDE_ROW_ID)
  if (allGroups.length === 0) {
    if (existingRow) {
      existingRow.remove()
    }
    return
  }
  const firstGroup = allGroups[0]

  let guideRow = existingRow
  if (!guideRow) {
    guideRow = document.createElement("div")
    guideRow.id = GUIDE_ROW_ID
    guideRow.className = "userpatch-guide-row"
  }

  let trigger = document.getElementById(TRIGGER_ID)
  if (!trigger) {
    trigger = document.createElement("button")
    trigger.id = TRIGGER_ID
    trigger.type = "button"
    trigger.className = "userpatch-mirror-guide-trigger"
    trigger.dataset.slot = "button"
    trigger.dataset.variant = "ghost"
    trigger.dataset.size = "icon"
    trigger.setAttribute("aria-haspopup", "dialog")
    trigger.setAttribute("aria-controls", DIALOG_ID)
    trigger.setAttribute("aria-label", "Server and mirror guide")
    trigger.setAttribute("title", "Server and mirror guide")

    const infoIcon = createLucideIcon("info")
    trigger.append(infoIcon)
    trigger.addEventListener("click", (event) => {
      event.preventDefault()
      openMirrorGuideDialog()
    })
  }

  if (trigger.parentElement !== guideRow) {
    guideRow.append(trigger)
  }

  if (guideRow.nextElementSibling !== firstGroup) {
    firstGroup.before(guideRow)
  }

  if (!document.getElementById(DIALOG_ID)) {
    const dialog = document.createElement("dialog")
    dialog.id = DIALOG_ID
    dialog.className = "userpatch-dialog"
    dialog.dataset.slot = "dialog-content"
    dialog.setAttribute("closedby", "any")
    dialog.setAttribute("aria-labelledby", "userpatch-dialog-title")
    dialog.setAttribute("aria-describedby", "userpatch-dialog-description")

    const header = document.createElement("div")
    header.className = "userpatch-dialog-header"

    const title = document.createElement("h2")
    title.id = "userpatch-dialog-title"
    title.className = "userpatch-dialog-title"
    // Start reading at the heading without selecting the Close action.
    title.tabIndex = -1
    title.autofocus = true
    title.textContent = "Server & Mirror Guide"

    const desc = document.createElement("p")
    desc.id = "userpatch-dialog-description"
    desc.className = "userpatch-dialog-description"
    desc.textContent = hubCdn
      ? "Speed and resume support for each download server."
      : "Speed, resume support, and bandwidth limits for each download mirror."

    const closeBtn = document.createElement("button")
    closeBtn.type = "button"
    closeBtn.className = "userpatch-dialog-close-btn"
    closeBtn.setAttribute("aria-label", "Close dialog")
    closeBtn.append(createLucideIcon("x"))
    closeBtn.addEventListener("click", closeMirrorGuideDialog)

    header.append(title, desc, closeBtn)

    const body = document.createElement("ul")
    body.className = "userpatch-dialog-body"

    const guides = [
      {
        badge: hubCdn ? "Cloudflare" : "FSL / FSL v2 / T3",
        variant: "fsl",
        icon: "arrow-down-to-line",
        heading: "Supports Resume",
        text: "Interrupted downloads can resume without restarting from the beginning.",
      },
      {
        badge: "10Gbps Server",
        variant: "10gbps",
        icon: "external-link",
        heading: "No Resume Support",
        text: "Opens a high-speed download page. Interrupted downloads cannot resume and must restart from the beginning.",
      },
      {
        badge: "PixelDrain",
        variant: "pixeldrain",
        icon: "external-link",
        heading: "6 GB Daily Bandwidth Limit for Free and Guest Users",
        text: "High-speed mirror, but download traffic is capped at 6 GB per day per IP address for free and guest users.",
      },
    ]

    for (const item of guides) {
      if (hubCdn && item.variant === "pixeldrain") {
        continue
      }
      const row = document.createElement("li")
      row.className = "userpatch-guide-item"

      const badge = document.createElement("div")
      const theme = MIRROR_THEMES[item.variant] || MIRROR_THEMES.default
      badge.className = "userpatch-guide-button"
      badge.style.setProperty("--userpatch-btn-bg", theme.bg)
      badge.style.setProperty("--userpatch-btn-color", theme.color)
      const badgeIcon =
        item.icon === "telegram"
          ? createTelegramIcon()
          : createLucideIcon(item.icon)
      const badgeText = document.createElement("span")
      badgeText.textContent = item.badge
      badge.append(badgeIcon, badgeText)

      const heading = document.createElement("h3")
      heading.className = "userpatch-guide-heading"
      heading.textContent = item.heading

      const text = document.createElement("p")
      text.className = "userpatch-guide-text"
      text.textContent = item.text

      row.append(badge, heading, text)
      body.append(row)
    }

    if (!hubCdn) {
      const caution = document.createElement("li")
      caution.className = "userpatch-guide-item"
      const cautionTitle = document.createElement("h3")
      cautionTitle.className = "userpatch-guide-heading"
      cautionTitle.textContent = "Before downloading"
      const cautionText = document.createElement("p")
      cautionText.className = "userpatch-guide-text"
      cautionText.textContent =
        "Some servers may not support resuming downloads. Avoid pausing the download or closing your download app until it finishes."
      caution.append(cautionTitle, cautionText)
      body.append(caution)
    }

    dialog.append(header, body)

    if (!("closedBy" in window.HTMLDialogElement.prototype)) {
      let pressedOutside = false
      dialog.addEventListener("pointerdown", (event) => {
        pressedOutside = isDialogBackdropClick(event, dialog)
      })
      dialog.addEventListener("pointerup", (event) => {
        if (pressedOutside && isDialogBackdropClick(event, dialog)) {
          closeMirrorGuideDialog()
        }
        pressedOutside = false
      })
      dialog.addEventListener("pointercancel", () => {
        pressedOutside = false
      })
    }

    // Preserve the exit transition when native top-layer closing is unavailable.
    dialog.addEventListener("cancel", (event) => {
      if (supportsDiscreteDialogExit()) {
        return
      }
      event.preventDefault()
      closeMirrorGuideDialog()
    })

    dialog.addEventListener("close", () => {
      delete dialog.dataset.closing
    })

    document.body?.append(dialog)
  }
}
