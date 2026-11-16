import { BUTTON_GROUP_CLASS, HEADER_ID } from "./config.js"
import { TRIGGER_ID, isWatchOnlineButton } from "./mirror-rows.js"

export const removeStrayTextNodes = (root = document.body) => {
  const targetRoot = root || document.body
  if (!targetRoot) {
    return
  }

  const cleanNode = (node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.nodeValue || node.textContent || ""
      const clean = text.replaceAll(/[\s\u200B\uFEFF\u00A0]/g, "")
      if (!clean || /^[.\-_,;:·•]+$/.test(clean)) {
        node.remove()
      }
    }
  }

  for (const node of Array.from(targetRoot.childNodes)) {
    cleanNode(node)
  }

  const header = document.getElementById(HEADER_ID)
  if (header) {
    let next = header.nextSibling
    while (next) {
      const current = next
      next = next.nextSibling
      if (current.nodeType === Node.TEXT_NODE) {
        cleanNode(current)
      } else if (
        current.nodeType === Node.ELEMENT_NODE &&
        (current.tagName === "SCRIPT" ||
          current.tagName === "STYLE" ||
          current.tagName === "NOSCRIPT")
      ) {
        continue
      } else {
        break
      }
    }
  }

  const containers = targetRoot.querySelectorAll(
    ".container, #section2, .main, center"
  )
  for (const container of containers) {
    for (const node of Array.from(container.childNodes)) {
      cleanNode(node)
    }
  }
}

export const removeClutter = () => {
  removeStrayTextNodes()

  for (const btn of document.querySelectorAll('a[href*="hbplay"], #tgbtn')) {
    if (isWatchOnlineButton(btn)) {
      btn.remove()
    }
  }

  for (const p of document.querySelectorAll("p")) {
    const text = (p.textContent || "").toLowerCase()
    if (
      text.includes("resume not supported") ||
      text.includes("stable internet") ||
      text.includes("10gbps so use only")
    ) {
      p.remove()
    }
  }

  const noticeElements = document.querySelectorAll(
    'div[style*="#fff3cd"], div[style*="255, 243, 205"], div[style*="#ffc107"], [data-slot="alert"]'
  )
  for (const el of noticeElements) {
    let prev = el.previousSibling
    while (prev) {
      const next = prev.previousSibling
      if (
        (prev.nodeType === Node.TEXT_NODE && !prev.textContent.trim()) ||
        (prev.nodeType === Node.ELEMENT_NODE &&
          (!prev.textContent.trim() ||
            prev.tagName === "BR" ||
            prev.tagName === "HR"))
      ) {
        prev.remove()
      }
      prev = next
    }
    el.remove()
  }

  const tabClutter = document.querySelectorAll(
    ".tab-content, .nav-tabs, #link, #div1"
  )
  for (const el of tabClutter) {
    el.remove()
  }

  const shareUrl = document.getElementById("ilink")?.value?.trim()
  const shareButton = document.getElementById("userpatch-share-btn")
  if (shareUrl && shareButton) {
    shareButton.dataset.userpatchShareUrl = shareUrl
  }

  for (const group of document.querySelectorAll(".input-group, #ilink")) {
    const parent = group.closest(".input-group, .mb-3") || group
    parent.remove()
  }

  for (const el of document.querySelectorAll(".text-success, p.h3, h3, .h3")) {
    if (
      (el.textContent || "").toLowerCase().includes("download link generated")
    ) {
      el.remove()
    }
  }

  for (const el of document.querySelectorAll(
    ".container, #section2, .main, .card"
  )) {
    el.style.removeProperty("margin-left")
    el.style.removeProperty("margin-right")
  }

  for (const ad of document.querySelectorAll(
    '.ad-container, .ad-containerx, [class*="ad-container" i], [id*="ad-container" i], ins.adsbygoogle, iframe[src*="ad"]'
  )) {
    ad.remove()
  }

  for (const br of document.querySelectorAll(
    ".container br, #section2 br, .card-body br, center br"
  )) {
    br.remove()
  }

  for (const center of document.querySelectorAll("center")) {
    if (
      !center.textContent.trim() &&
      !center.querySelector("img, svg, iframe, video, audio")
    ) {
      center.remove()
    }
  }

  for (const hr of document.querySelectorAll(
    "hr:not(.userpatch-pack-divider)"
  )) {
    hr.remove()
  }

  const oldHeaders = document.querySelectorAll(
    `header:not(#${HEADER_ID}), .header:not(#${HEADER_ID}), .site-header, .site-footer, footer, #masthead, aside, .sidebar, #sidebar, .footer`
  )
  for (const node of oldHeaders) {
    node.remove()
  }

  const alerts = document.querySelectorAll(".alert")
  for (const alert of alerts) {
    const text = alert.textContent.toLowerCase()
    if (
      text.includes("experience the magic of hubcloud") ||
      text.includes("how to download from hubcloud") ||
      text.includes("always use updated chrome browser") ||
      text.includes("if you're getting any error please report at") ||
      text.includes("telegram group") ||
      alert.classList.contains("alert-warning") ||
      alert.classList.contains("alert-info") ||
      alert.classList.contains("alert-primary")
    ) {
      alert.remove()
    }
  }

  // Match app controls themselves; ancestor text also contains their labels.
  for (const el of document.querySelectorAll(
    '#android_launch, [id*="android_launch" i], [class*="android_launch" i], [id*="msc" i], [class*="msc" i], h1, h2, h3, h4, h5, h6, p, div, span, b, strong, center, label, a, button, section'
  )) {
    if (
      el.id?.toLowerCase().includes("android_launch") ||
      el.getAttribute("href")?.toLowerCase().includes("android_launch") ||
      ((el.matches("a, button") || el.childElementCount === 0) &&
        (el.textContent || "").toLowerCase().includes("android app"))
    ) {
      el.remove()
      continue
    }
    const text = (el.textContent || "").trim()
    if (/^msc[\s:.-]*$/i.test(text) || /^misc[\s:.-]*$/i.test(text)) {
      el.remove()
    }
  }

  if (document.body) {
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      null
    )
    const textNodesToRemove = []
    let currentTextNode = walker.nextNode()
    while (currentTextNode) {
      const val = (currentTextNode.nodeValue || "").trim()
      if (/^msc[\s:.-]*$/i.test(val) || /^misc[\s:.-]*$/i.test(val)) {
        textNodesToRemove.push(currentTextNode)
      }
      currentTextNode = walker.nextNode()
    }
    for (const tn of textNodesToRemove) {
      const parent = tn.parentNode
      tn.remove()
      if (parent && !parent.textContent.trim()) {
        parent.remove()
      }
    }
  }

  const endContainers = document.querySelectorAll(
    ".container, #section2, .main, .card, body"
  )
  for (const container of endContainers) {
    let last = container.lastChild
    while (last) {
      const prev = last.previousSibling
      if (last.nodeType === Node.TEXT_NODE && !last.textContent.trim()) {
        last.remove()
      } else if (
        last.nodeType === Node.ELEMENT_NODE &&
        (last.tagName === "BR" ||
          last.tagName === "HR" ||
          ((!last.textContent.trim() || last.style.display === "none") &&
            !last.querySelector(
              `.${BUTTON_GROUP_CLASS}, #${TRIGGER_ID}, #download, #button1, .userpatch-file-info`
            )))
      ) {
        last.remove()
      } else {
        break
      }
      last = prev
    }
  }
}
