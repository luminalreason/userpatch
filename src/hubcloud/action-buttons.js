import {
  BUTTON_GROUP_CLASS,
  COPY_BUTTON_CLASS,
  DIRECT_DOWNLOAD_BUTTON_CLASS,
} from "./config.js"
import { isHubCloudDownloadUrl } from "./detect.js"
import { createSpinnerIcon } from "./icons.js"
import { createLucideIcon } from "./icons.js"

export const normalizeActionButtons = (root = document) => {
  const loading = root.querySelector(".loading")
  if (loading) {
    loading.remove()
  }
  const vd = root.querySelector(".vd")
  if (vd) {
    vd.classList.remove("d-none")
    vd.style.setProperty("display", "flex", "important")
  }

  for (const copyBtn of root.querySelectorAll(
    `#button1 .${COPY_BUTTON_CLASS}, #download .${COPY_BUTTON_CLASS}, .userpatch-btn-group > #button1 ~ .${COPY_BUTTON_CLASS}, .userpatch-btn-group > #download ~ .${COPY_BUTTON_CLASS}`
  )) {
    copyBtn.remove()
  }

  for (const group of root.querySelectorAll(
    `.${BUTTON_GROUP_CLASS}:has(#button1), .${BUTTON_GROUP_CLASS}:has(#download)`
  )) {
    const actionBtn = group.querySelector("#button1, #download")
    if (actionBtn) {
      group.before(actionBtn)
    }
    group.remove()
  }

  const actionBtns = root.querySelectorAll(
    `#download, a#download, button#download, #button1, a#button1, button#button1, .${DIRECT_DOWNLOAD_BUTTON_CLASS}`
  )
  for (const btn of actionBtns) {
    if (btn.dataset.userpatchLoading === "true") {
      continue
    }
    if (!btn.querySelector('[data-userpatch-lucide-icon="sparkles"]')) {
      const oldIcons = btn.querySelectorAll("i, svg")
      for (const icon of oldIcons) {
        icon.remove()
      }
      btn.prepend(createLucideIcon("sparkles"))
    }
    btn.dataset.slot = "button"
    for (const node of btn.childNodes) {
      if (
        node.nodeType === Node.TEXT_NODE &&
        /generate\s+(direct\s+)?download\s+link/i.test(node.textContent || "")
      ) {
        node.textContent = "Show links"
      } else if (
        node.nodeType === Node.ELEMENT_NODE &&
        node.tagName !== "svg" &&
        /generate\s+(direct\s+)?download\s+link/i.test(node.textContent || "")
      ) {
        node.textContent = "Show links"
      }
    }

    if (!btn.dataset.userpatchLoadingBound) {
      btn.dataset.userpatchLoadingBound = "true"
      btn.addEventListener("click", () => {
        btn.dataset.userpatchLoading = "true"
        btn.setAttribute("aria-busy", "true")
        btn.setAttribute("aria-disabled", "true")
        const oldIcon = btn.querySelector("[data-userpatch-lucide-icon]")
        const spinner = createSpinnerIcon()
        if (oldIcon) {
          oldIcon.replaceWith(spinner)
        } else {
          btn.prepend(spinner)
        }
      })
    }
  }
}

export const isCopyLinkControl = (button) => {
  const label = (button?.textContent || "").trim().toLowerCase()
  const handler = button?.getAttribute("onclick") || ""
  return (
    /\bcopy(?:\s+share)?\s+link\b/.test(label) ||
    /copy_link\s*\(/i.test(handler)
  )
}

export const getGeneratedDirectDownloadButton = (root) => {
  for (const link of root.querySelectorAll("a[href]")) {
    if (link.classList.contains(DIRECT_DOWNLOAD_BUTTON_CLASS)) {
      return link
    }

    const label = (link.textContent || "").replaceAll(/\s+/g, " ").trim()
    // HubCloud video and drive pages label the primary hop link as 'Generate Direct Download Link'.
    if (!/generate\s+(direct\s+)?download\s+link/i.test(label)) {
      continue
    }

    if (isHubCloudDownloadUrl(link.href)) {
      return link
    }
  }
  return null
}

export const moveDownloadAction = (button, container) => {
  const oldVd = button.closest(".vd")
  const oldCenter = button.closest("center")
  container.append(button)

  if (oldCenter && oldCenter !== container && !oldCenter.textContent.trim()) {
    oldCenter.remove()
  }
  if (oldVd && oldVd !== container && !oldVd.textContent.trim()) {
    oldVd.remove()
  }
}
