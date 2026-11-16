import { copyToClipboard, showCopiedFeedback } from "./clipboard.js"
import { applyFilenameBreaks } from "./file-details.js"
import { createLucideIcon } from "./icons.js"
import { createShareButton } from "./share.js"

export const isHubCloudPackPage = (root = document) => {
  const header = root.querySelector(".pack-header")
  // The named pack, size metadata, and file list identify the pack layout together.
  return Boolean(
    header?.querySelector(".pack-name, #packName") &&
    header.querySelector(".pack-meta #totalSize") &&
    root.querySelector(".file-list, #fileList")
  )
}

export const normalizePackPage = (root = document) => {
  const packHeader = root.querySelector(".pack-header")
  const packMeta = packHeader?.querySelector(".pack-meta")
  const packNameEl = packHeader?.querySelector(".pack-name, #packName")
  const totalSizeEl = root.querySelector("#totalSize")
  const fileList = root.querySelector(".file-list, #fileList")

  if (packHeader) {
    delete packHeader.dataset.slot
  }

  for (const divider of root.querySelectorAll("hr.userpatch-pack-divider")) {
    divider.remove()
  }

  applyFilenameBreaks(packNameEl)

  if (packMeta) {
    for (const item of packMeta.querySelectorAll(".pack-meta-item")) {
      if (item.querySelector("#fileCount")) {
        item.style.setProperty("display", "none", "important")
      }
    }

    if (totalSizeEl) {
      const sizeItem = totalSizeEl.closest(".pack-meta-item")
      if (sizeItem) {
        const oldSvg = sizeItem.querySelector(
          "svg:not([data-userpatch-lucide-icon])"
        )
        if (oldSvg) {
          oldSvg.replaceWith(createLucideIcon("hard-drive"))
        }
      }
    }

    let shareBtn = packMeta.querySelector("#userpatch-pack-share-btn")
    if (!shareBtn) {
      shareBtn = createShareButton("userpatch-pack-share-btn")
      shareBtn.dataset.userpatchShareUrl = ""
      packMeta.append(shareBtn)
    }
  }

  if (fileList) {
    delete fileList.dataset.slot

    const items = fileList.querySelectorAll(
      ".file-item:not([data-userpatch-normalized='true'])"
    )
    for (const item of items) {
      delete item.dataset.slot

      const fileTitleCode = item.querySelector(".file-title code")
      const fileTitleEl = item.querySelector(".file-title")
      const targetTitle = fileTitleCode || fileTitleEl
      applyFilenameBreaks(targetTitle)

      const iconContainer = item.querySelector(".file-icon")
      if (iconContainer) {
        iconContainer.remove()
      }

      let videoUrl = item.dataset.userpatchVideoUrl
      if (!videoUrl) {
        const originalLink = item.querySelector("a.file-link, a")
        const onclickAttr = item.getAttribute("onclick") || ""
        const match = onclickAttr.match(/window\.open\('([^']+)'/i)
        if (match && match[1]) {
          videoUrl = match[1]
        } else if (originalLink?.href) {
          videoUrl = originalLink.href
        }
        if (videoUrl) {
          item.dataset.userpatchVideoUrl = videoUrl
        }
      }

      if (videoUrl) {
        try {
          const parsedUrl = new URL(videoUrl, location.href)
          videoUrl = /^https?:$/.test(parsedUrl.protocol) ? parsedUrl.href : ""
        } catch {
          videoUrl = ""
        }
      }
      if (videoUrl) {
        item.dataset.userpatchVideoUrl = videoUrl
      } else {
        delete item.dataset.userpatchVideoUrl
      }

      // Keep the source link hidden; the overlay link below provides native navigation.
      const oldFileLink = item.querySelector("a.file-link")
      if (oldFileLink) {
        oldFileLink.style.setProperty("display", "none", "important")
      }

      const filename = item.querySelector(".file-title")?.textContent.trim()
      const openLabel = filename ? `Open ${filename}` : "Open video link"
      const copyLabel = filename
        ? `Copy link for ${filename}`
        : "Copy video link"
      const copiedLabel = filename
        ? `Link copied for ${filename}`
        : "Video link copied"

      let openLink = item.querySelector(".userpatch-pack-open-link")
      if (videoUrl) {
        if (!openLink) {
          openLink = document.createElement("a")
          openLink.className = "userpatch-pack-open-link"
          openLink.target = "_blank"
          openLink.rel = "noopener noreferrer"
          const accessibleName = document.createElement("span")
          accessibleName.className = "userpatch-sr-only"
          openLink.append(accessibleName)
          item.append(openLink)
        }
        let accessibleName = openLink.querySelector(".userpatch-sr-only")
        if (!accessibleName) {
          accessibleName = document.createElement("span")
          accessibleName.className = "userpatch-sr-only"
          openLink.append(accessibleName)
        }
        openLink.href = videoUrl
        openLink.target = "_blank"
        openLink.rel = "noopener noreferrer"
        openLink.setAttribute("aria-label", openLabel)
        accessibleName.textContent = openLabel
        item.removeAttribute("onclick")
      } else {
        openLink?.remove()
      }

      let copyBtn = item.querySelector(".userpatch-pack-copy-btn")
      if (!copyBtn) {
        copyBtn = document.createElement("button")
        copyBtn.type = "button"
        copyBtn.className = "userpatch-pack-copy-btn"
        copyBtn.setAttribute("aria-label", copyLabel)
        copyBtn.setAttribute("title", copyLabel)
        copyBtn.append(createLucideIcon("copy"))

        copyBtn.addEventListener("click", async (event) => {
          event.preventDefault()
          event.stopPropagation()
          const url = item.dataset.userpatchVideoUrl
          if (!url) {
            return
          }
          const success = await copyToClipboard(url)
          if (success) {
            showCopiedFeedback(copyBtn, {
              label: copyBtn.dataset.userpatchCopyLabel,
              copiedLabel: copyBtn.dataset.userpatchCopiedLabel,
            })
          }
        })

        item.append(copyBtn)
      }

      copyBtn.dataset.userpatchCopyLabel = copyLabel
      copyBtn.dataset.userpatchCopiedLabel = copiedLabel
      if (!copyBtn.classList.contains("userpatch-copied")) {
        copyBtn.setAttribute("aria-label", copyLabel)
        copyBtn.setAttribute("title", copyLabel)
      }

      if (videoUrl) {
        item.dataset.userpatchNormalized = "true"
      }
    }
  }
}
