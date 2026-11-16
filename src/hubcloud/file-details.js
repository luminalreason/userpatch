import {
  getGeneratedDirectDownloadButton,
  isCopyLinkControl,
  moveDownloadAction,
  normalizeActionButtons,
} from "./action-buttons.js"
import { DIRECT_DOWNLOAD_BUTTON_CLASS } from "./config.js"
import { createLucideIcon } from "./icons.js"
import { createShareButton } from "./share.js"

export const FILENAME_DELIMITER_PATTERN = /([._/-]+)/

// Break at filename separators without changing the text copied by the user.
export const createFilenameFragment = (name = "") => {
  const fragment = document.createDocumentFragment()
  const parts = name.split(FILENAME_DELIMITER_PATTERN)
  for (const part of parts) {
    if (!part) {
      continue
    }
    fragment.append(document.createTextNode(part))
    if (/^[._/-]+$/.test(part)) {
      fragment.append(document.createElement("wbr"))
    }
  }
  return fragment
}

export const applyFilenameBreaks = (element) => {
  if (!element || element.dataset.userpatchWbr === "true") {
    return
  }
  const name = element.textContent.trim()
  if (!name) {
    return
  }
  element.dataset.userpatchWbr = "true"
  element.replaceChildren(createFilenameFragment(name))
}

export const normalizeFileDetails = (root = document) => {
  const card = root.querySelector("#section2 .card, .main > .card")
  if (!card || card.dataset.userpatchNormalized === "true") {
    const fileInfo = root.querySelector(".userpatch-file-info")
    if (fileInfo) {
      applyFilenameBreaks(fileInfo.querySelector(".userpatch-file-title"))
    }
    const generatedDownloadBtn = getGeneratedDirectDownloadButton(root)
    if (
      fileInfo &&
      generatedDownloadBtn &&
      !fileInfo.contains(generatedDownloadBtn)
    ) {
      generatedDownloadBtn.classList.add(DIRECT_DOWNLOAD_BUTTON_CLASS)
      normalizeActionButtons(root)
      moveDownloadAction(generatedDownloadBtn, fileInfo)
    }
    return
  }

  const header = card.querySelector(".card-header")
  const filename = header?.textContent?.trim()
  if (!filename) {
    return
  }

  let fileSize = ""
  let shareDate = ""
  for (const item of card.querySelectorAll(".list-group-item")) {
    const text = item.textContent.toLowerCase()
    if (text.includes("size")) {
      fileSize =
        item.querySelector("i")?.textContent?.trim() ||
        item.textContent.replace(/file\s*size/i, "").trim()
    } else if (text.includes("date")) {
      shareDate =
        item.querySelector("i")?.textContent?.trim() ||
        item.textContent.replace(/share\s*date/i, "").trim()
    }
  }

  const container = document.createElement("div")
  container.className = "userpatch-file-info"
  container.dataset.userpatchNormalized = "true"

  const titleEl = document.createElement("div")
  titleEl.className = "userpatch-file-title"
  titleEl.textContent = filename
  applyFilenameBreaks(titleEl)

  const metaContainer = document.createElement("div")
  metaContainer.className = "userpatch-file-meta"

  if (fileSize) {
    const sizeItem = document.createElement("div")
    sizeItem.className = "userpatch-meta-item"
    const sizeValue = document.createElement("span")
    sizeValue.id = "size"
    sizeValue.textContent = fileSize
    sizeItem.append(createLucideIcon("hard-drive"), sizeValue)
    metaContainer.append(sizeItem)
  }

  if (shareDate) {
    const dateItem = document.createElement("div")
    dateItem.className = "userpatch-meta-item"
    const dateValue = document.createElement("span")
    dateValue.textContent = shareDate
    dateItem.append(createLucideIcon("rss"), dateValue)
    metaContainer.append(dateItem)
  }

  const shareBtn = createShareButton()
  shareBtn.classList.add("userpatch-meta-item")
  shareBtn.dataset.userpatchShareUrl =
    root.querySelector("#ilink")?.value?.trim() || ""
  metaContainer.append(shareBtn)

  container.append(titleEl, metaContainer)

  const generatedDownloadBtn = getGeneratedDirectDownloadButton(root)
  const fallbackButton1 = Array.from(root.querySelectorAll("#button1")).find(
    (button) =>
      !button.closest(".nav-tabs, .tab-content") && !isCopyLinkControl(button)
  )
  const downloadBtn =
    card.querySelector("#download") ||
    card.parentElement?.querySelector("#download") ||
    root.querySelector("#download") ||
    generatedDownloadBtn ||
    fallbackButton1
  if (downloadBtn) {
    if (downloadBtn === generatedDownloadBtn) {
      downloadBtn.classList.add(DIRECT_DOWNLOAD_BUTTON_CLASS)
    }
    normalizeActionButtons(document)
    moveDownloadAction(downloadBtn, container)
  }

  card.replaceWith(container)
}
