import { copyToClipboard, showCopiedFeedback } from "./clipboard.js"
import {
  BUTTON_GROUP_CLASS,
  BUTTON_MAIN_CLASS,
  COPY_BUTTON_CLASS,
  DIRECT_DOWNLOAD_BUTTON_CLASS,
  GUIDE_ROW_ID,
} from "./config.js"
import { createTelegramIcon } from "./icons.js"
import { createLucideIcon } from "./icons.js"
import { ensureMirrorGuide } from "./mirror-guide.js"
import {
  getPixelDrainMirrorPath,
  resolvePixelDrainMirror,
} from "./pixeldrain.js"

export const isWatchOnlineButton = (button) => {
  if (!button) {
    return false
  }
  const text = (button.textContent || "").toLowerCase()
  const href = (button.getAttribute("href") || "").toLowerCase()
  return (
    text.includes("watch online") ||
    text.includes("play online") ||
    href.includes("hbplay.pages.dev") ||
    href.includes("hbplay.")
  )
}

export const cleanMirrorLabel = (text) => {
  const clean = text
    .replace(/^\s*download\s*:?\s*/i, "")
    .replaceAll("[", "")
    .replaceAll("]", "")
    .replaceAll(/\s+/g, " ")
    .trim()
  const lower = clean.toLowerCase()

  if (lower.includes("gofile")) {
    return "GoFile"
  }
  if (lower.includes("10gbps") || lower.includes("10 gbps")) {
    return "10Gbps Server"
  }
  if (lower === "pixeldrain bypass") {
    return "PixelDrain Bypass"
  }
  if (lower.includes("pixel")) {
    return "PixelDrain"
  }
  if (lower.includes("telegram")) {
    return "Get File in Telegram"
  }
  if (/\bt3\b/i.test(clean)) {
    return "T3 Server"
  }
  if (lower.includes("fsl") && (lower.includes("v2") || lower.includes("2"))) {
    return "FSL Server v2"
  }
  if (lower.includes("fsl")) {
    return "FSL Server"
  }
  return clean
}

export const isCloudflareMirror = (value) => {
  try {
    const url = new URL(value, location.href)
    return (
      /^https?:$/.test(url.protocol) &&
      /(?:^|\.)(?:workers\.dev|r2\.dev)$/i.test(url.hostname)
    )
  } catch {
    return false
  }
}

export const getButtonVariant = (button) => {
  const text = (button.textContent || "").toLowerCase()
  const id = (button.dataset?.originalId || button.id || "").toLowerCase()
  const href = (button.getAttribute("href") || "").toLowerCase()

  if (
    id === "tgbtn" ||
    id.includes("telegram") ||
    text.includes("telegram") ||
    href.includes("t.me/") ||
    href.includes("telegram.me/")
  ) {
    return "telegram"
  }

  if (
    id.includes("gofile") ||
    text.includes("gofile") ||
    href.includes("gofile.io") ||
    href.includes("gofile")
  ) {
    return "gofile"
  }

  // T3 is another resumable direct mirror, identified by its control/label
  // rather than the current storage hostname.
  if (id === "t3dl" || /\bt3\b/.test(text)) {
    return "t3"
  }
  if (/\bbuzz\b/.test(text) || id.includes("buzz")) {
    return "buzz"
  }

  if (
    id.startsWith("fsl") ||
    id.includes("fsl") ||
    id === "s3" ||
    text.includes("fsl") ||
    text.includes("file server") ||
    text.includes("fileserver")
  ) {
    return "fsl"
  }

  if (
    id.startsWith("pxl") ||
    id.includes("pixel") ||
    text.includes("pixeldrain") ||
    text.includes("pixel drain") ||
    href.includes("pixeldrain")
  ) {
    return "pixeldrain"
  }

  if (
    text.includes("10gbps") ||
    text.includes("10 gbps") ||
    text.includes("fast cloud")
  ) {
    return "10gbps"
  }

  return isCloudflareMirror(href) ? "cloudflare" : "default"
}

const RESUMABLE_THEME = Object.freeze({
  bg: "#0051c3",
  color: "#ffffff",
})

export const MIRROR_THEMES = Object.freeze({
  fsl: RESUMABLE_THEME,
  t3: RESUMABLE_THEME,
  cloudflare: RESUMABLE_THEME,
  "10gbps": Object.freeze({
    bg: "#c2410c",
    color: "#ffffff",
  }),
  gofile: Object.freeze({
    bg: "#7c3aed",
    color: "#ffffff",
  }),
  pixeldrain: Object.freeze({
    bg: "#065b45",
    color: "#ffffff",
  }),
  "pixeldrain-bypass": Object.freeze({
    bg: "#087557",
    color: "#ffffff",
  }),
  telegram: Object.freeze({
    bg: "#1e293b",
    color: "#ffffff",
  }),
  default: Object.freeze({
    bg: "#27272a",
    color: "#f4f4f5",
  }),
})

export const DIALOG_ID = "userpatch-mirror-guide-dialog"
export const TRIGGER_ID = "userpatch-mirror-guide-trigger"

export const orderDownloadButtons = (root = document) => {
  const groups = Array.from(root.querySelectorAll(`.${BUTTON_GROUP_CLASS}`))
  if (groups.length <= 1) {
    return
  }

  const getPriority = (group) => {
    const variant = group.dataset.mirrorType
    if (variant === "t3") {
      return 12
    }
    if (variant === "fsl") {
      const button = group.querySelector(`.${BUTTON_MAIN_CLASS}`)
      const text = (button?.textContent || "").toLowerCase()
      const id = button?.dataset.originalId || ""
      return text.includes("2") || id === "fsl2" || id === "s3" ? 11 : 10
    }
    return (
      {
        cloudflare: 13,
        "10gbps": 20,
        gofile: 25,
        pixeldrain: 30,
        "pixeldrain-bypass": 31,
        telegram: 50,
      }[variant] || 40
    )
  }

  const parent = groups[0].parentElement
  if (!parent) {
    return
  }

  const sorted = groups.toSorted((a, b) => getPriority(a) - getPriority(b))
  const guideRow = parent.querySelector(`:scope > #${GUIDE_ROW_ID}`)
  const isAlreadySorted = groups.every((group, i) => group === sorted[i])
  const isGuideRowAtStart =
    !guideRow || guideRow.nextElementSibling === sorted[0]

  if (isAlreadySorted && isGuideRowAtStart) {
    return
  }

  if (guideRow) {
    parent.append(guideRow)
  }
  for (const group of sorted) {
    parent.append(group)
  }
}

export const wrapDownloadButtons = (
  root = document,
  { preserveIds = false, guide = true } = {}
) => {
  const buttons = root.querySelectorAll(
    `a.btn:not(.${BUTTON_MAIN_CLASS}), button.btn:not(.${BUTTON_MAIN_CLASS}), a[class*="btn-"]:not(.${BUTTON_MAIN_CLASS}), a[id^="pxl"]:not(.${BUTTON_MAIN_CLASS}), a#s3:not(.${BUTTON_MAIN_CLASS}), a#fsl:not(.${BUTTON_MAIN_CLASS}), a#fsl2:not(.${BUTTON_MAIN_CLASS}), a#tgbtn:not(.${BUTTON_MAIN_CLASS})`
  )

  for (const button of buttons) {
    const text = (button.textContent || "").toLowerCase()
    const id = (button.id || "").toLowerCase()

    if (
      id === "download" ||
      id === "button1" ||
      id.includes("generate") ||
      id.includes("copy") ||
      text.includes("generate") ||
      text.includes("copy link") ||
      text.includes("copy share link") ||
      button.classList.contains("nav-link") ||
      button.classList.contains(COPY_BUTTON_CLASS) ||
      button.classList.contains(DIRECT_DOWNLOAD_BUTTON_CLASS) ||
      button.classList.contains("userpatch-mirror-guide-trigger") ||
      button.classList.contains("userpatch-share-btn") ||
      button.classList.contains("userpatch-pack-copy-btn") ||
      button.classList.contains("userpatch-dialog-close-btn") ||
      button.classList.contains("userpatch-dialog-btn") ||
      button.closest(
        `[data-slot="button-group"], .${BUTTON_GROUP_CLASS}, .input-group`
      )
    ) {
      continue
    }

    if (
      id === "android_launch" ||
      id.includes("android") ||
      text.includes("android app")
    ) {
      button.remove()
      continue
    }

    if (isWatchOnlineButton(button)) {
      button.remove()
      continue
    }

    const href = button.getAttribute("href")
    if (!href || !/^https?:$/.test(button.protocol)) {
      continue
    }

    const bypass = button.dataset.userpatchPixelDrainBypass === "true"
    const variant = bypass ? "pixeldrain-bypass" : getButtonVariant(button)
    const theme = MIRROR_THEMES[variant] || MIRROR_THEMES.default

    button.classList.remove(
      "btn-danger",
      "btn-primary",
      "btn-secondary",
      "btn-success",
      "btn-warning",
      "btn-info",
      "btn-dark",
      "btn-light"
    )
    button.style.removeProperty("background")
    button.style.removeProperty("background-color")

    const oldIcons = button.querySelectorAll("svg, i")
    for (const icon of oldIcons) {
      icon.remove()
    }

    const cleanLabel =
      variant === "cloudflare"
        ? "Cloudflare Server"
        : cleanMirrorLabel(button.textContent || "")
    button.textContent = ""

    const externalMirror =
      ["10gbps", "pixeldrain", "buzz"].includes(variant) &&
      button.dataset.userpatchDirectMirror !== "true"
    const mirrorIcon =
      variant === "telegram"
        ? createTelegramIcon()
        : createLucideIcon(
            externalMirror ? "external-link" : "arrow-down-to-line"
          )

    const labelSpan = document.createElement("span")
    labelSpan.className = "userpatch-btn-label"
    labelSpan.textContent = cleanLabel

    button.append(mirrorIcon, labelSpan)

    button.dataset.slot = "button"
    button.dataset.mirrorType = variant
    button.className = ""
    button.classList.add(
      BUTTON_MAIN_CLASS,
      "btn",
      `userpatch-mirror-${variant}`
    )

    if (button.id && !preserveIds) {
      button.dataset.originalId = button.id
      button.removeAttribute("id")
    }

    button.style.setProperty("background", "transparent", "important")
    button.style.setProperty("background-color", "transparent", "important")
    button.style.setProperty("background-image", "none", "important")
    button.style.setProperty("border", "none", "important")
    button.style.setProperty("box-shadow", "none", "important")
    button.style.setProperty("color", "inherit", "important")

    const group = document.createElement("div")
    group.setAttribute("role", "group")
    group.dataset.slot = "button-group"
    group.dataset.orientation = "horizontal"
    group.dataset.mirrorType = variant
    group.className = `${BUTTON_GROUP_CLASS} userpatch-group-${variant}`
    group.setAttribute("aria-label", cleanLabel)
    group.style.setProperty("--userpatch-btn-bg", theme.bg)
    group.style.setProperty("--userpatch-btn-color", theme.color)

    const copyBtn = document.createElement("button")
    copyBtn.type = "button"
    copyBtn.dataset.slot = "button"
    copyBtn.dataset.variant = "secondary"
    copyBtn.dataset.size = "icon"
    copyBtn.className = COPY_BUTTON_CLASS
    copyBtn.setAttribute("aria-label", "Copy download link")
    copyBtn.setAttribute("title", "Copy download link")
    copyBtn.append(createLucideIcon("copy"))

    copyBtn.addEventListener("click", async (event) => {
      event.preventDefault()
      event.stopPropagation()
      const currentHref = button.href || button.getAttribute("href")
      if (!currentHref) {
        return
      }

      const copied = await copyToClipboard(currentHref)
      if (copied) {
        showCopiedFeedback(copyBtn, {
          label: "Copy download link",
          copiedLabel: "Download link copied",
        })
      }
    })

    button.before(group)
    group.append(button, copyBtn)

    const mirrorPath =
      !bypass &&
      variant === "pixeldrain" &&
      getPixelDrainMirrorPath(button.href)
    if (mirrorPath) {
      void resolvePixelDrainMirror(mirrorPath).then((url) => {
        if (!url || !group.isConnected) {
          return
        }
        const mirror = document.createElement("a")
        mirror.href = url
        mirror.target = "_blank"
        mirror.rel = "noopener noreferrer"
        mirror.dataset.noSwup = ""
        mirror.dataset.userpatchPixelDrainBypass = "true"
        mirror.dataset.userpatchDirectMirror = "true"
        mirror.className = "btn"
        mirror.textContent = "PixelDrain Bypass"
        const staging = document.createDocumentFragment()
        staging.append(mirror)
        wrapDownloadButtons(staging, { guide: false })
        group.after(staging)
      })
    }
  }

  orderDownloadButtons(root)
  if (guide) {
    ensureMirrorGuide()
  }
}
