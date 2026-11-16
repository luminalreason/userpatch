import { copyToClipboard, showCopiedFeedback } from "./clipboard.js"
import { createLucideIcon } from "./icons.js"

export const createShareButton = (id = "userpatch-share-btn") => {
  const shareBtn = document.createElement("button")
  shareBtn.id = id
  shareBtn.type = "button"
  shareBtn.className = "userpatch-share-btn"
  shareBtn.dataset.slot = "button"
  shareBtn.dataset.variant = "ghost"
  shareBtn.dataset.size = "sm"
  shareBtn.setAttribute("aria-label", "Share link")
  shareBtn.setAttribute("title", "Share link")

  const icon = createLucideIcon("share-2")
  const text = document.createElement("span")
  text.textContent = "Share Link"

  shareBtn.append(icon, text)

  shareBtn.addEventListener("click", async (event) => {
    event.preventDefault()
    const input = document.getElementById("ilink")
    const inputUrl =
      shareBtn.id === "userpatch-pack-share-btn" ? "" : input?.value?.trim()
    const shareUrl =
      shareBtn.dataset.userpatchShareUrl || inputUrl || location.href

    if (navigator.share) {
      try {
        await navigator.share({
          url: shareUrl,
        })
        return
      } catch (err) {
        if (err && err.name === "AbortError") {
          return
        }
      }
    }

    const copied = await copyToClipboard(shareUrl)
    if (copied) {
      showCopiedFeedback(shareBtn, {
        label: "Share link",
        copiedLabel: "Share link copied",
        icon: "share-2",
        text: "Share Link",
        copiedText: "Share Link Copied",
      })
    }
  })

  return shareBtn
}
