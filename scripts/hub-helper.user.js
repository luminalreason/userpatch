// ==UserScript==
// @name         Hub Helper
// @namespace    https://github.com/luminalreason/userpatch
// @version      0.1.0
// @description  Skips "please wait" gate pages and opens the page the countdown was hiding. Never clicks buttons, never starts downloads. Toggle it in Violentmonkey.
// @author       luminalreason
// @match        *://*/*
// @run-at       document-start
// @noframes
// ==/UserScript==
;(() => {
  "use strict"

  // Utilities

  const rot13 = (value) =>
    value.replaceAll(/[a-zA-Z]/g, (character) => {
      const code = character.charCodeAt(0) + 13
      return String.fromCharCode(
        (character <= "Z" ? 90 : 122) >= code ? code : code - 26
      )
    })

  const isHttpUrl = (value) =>
    /^https?:\/\//i.test(value) && !value.startsWith(location.href)

  const hostnameOf = (value) => {
    try {
      return new URL(value).hostname.toLowerCase()
    } catch {
      return ""
    }
  }

  /** A URL that starts a download the moment it is opened. Never opened by this script. */
  const isDirectFileLink = (url) => {
    const host = hostnameOf(url)
    if (
      /(^|\.)r2\.dev$/.test(host) ||
      /(^|\.)cloudflarestorage\.com$/.test(host) ||
      host.startsWith("pixel.")
    ) {
      return true
    }
    return /\.(mkv|mp4|avi|mov|webm|ts|m2ts|zip|rar|7z|iso|mp3|flac)(\?|#|$)/i.test(
      url
    )
  }

  // Gate decoding

  /**
   * The gate's target URL, or null. hubcdn /dl/?link=… wrappers stay
   * wrapped — the chain ends on the download page, not the file.
   */
  const decodePayload = (payload) => {
    const parsed = JSON.parse(atob(rot13(atob(atob(payload)))))
    const target = parsed.o ? atob(parsed.o) : null
    return target && isHttpUrl(target) ? target : null
  }

  /**
   * The first gate page hands the payload to the mediator via
   * localStorage["o"] — but the mediator (e.g. inventoryidea's
   * "homelander") consumes and clears it in an inline script that runs
   * at parse time. Snapshotting at document-start catches it before any
   * page script can eat it.
   */
  const snapshotGateStorage = () => {
    try {
      return localStorage.getItem("o")
    } catch {
      return null
    }
  }
  const gateStorageSnapshot = snapshotGateStorage()

  const findTargetInSnapshot = () => {
    if (!gateStorageSnapshot) {
      return null
    }
    try {
      const entry = JSON.parse(gateStorageSnapshot)
      if (entry.expiry && Date.now() > entry.expiry) {
        return null
      }
      return decodePayload(entry.value)
    } catch {
      return null
    }
  }

  const findGateTarget = (html) => {
    const payloadMatch = html.match(
      /\bs\(\s*['"]o['"]\s*,\s*['"]([A-Za-z0-9+/=]+)['"]/
    )
    if (payloadMatch) {
      try {
        const target = decodePayload(payloadMatch[1])
        if (target) {
          return target
        }
      } catch {
        // Malformed payload; try the other detectors.
      }
    }
    const reurlMatch = html.match(/(?:var\s+)?reurl\s*=\s*["']([^"']+)["']/i)
    if (reurlMatch && isHttpUrl(reurlMatch[1])) {
      return reurlMatch[1]
    }
    return findTargetInSnapshot()
  }

  const looksLikeGatePage = () => {
    if (/redirect|mediator|please wait/i.test(document.title)) {
      return true
    }
    if (location.pathname.toLowerCase().includes("homelander")) {
      return true
    }
    const bodyText = document.body?.innerText ?? ""
    return bodyText.trim().length > 0 && bodyText.trim().length < 300
  }

  // Page flows

  /** location.replace leaves no history entry, so no bounce loop and Back works. */
  const runGateFlow = () => {
    if (!looksLikeGatePage()) {
      return false
    }
    const html = document.documentElement.innerHTML
    if (
      !html.includes("s(") &&
      !html.includes("reurl") &&
      !gateStorageSnapshot
    ) {
      return false
    }
    const target = findGateTarget(html)
    if (!target) {
      return false
    }
    if (!isDirectFileLink(target)) {
      location.replace(target)
    }
    return true
  }

  // Main

  /** Some gates (greenmotors-style "?id=" pages) inject the payload only after DOMContentLoaded. */
  const watchForLateGatePayload = () => {
    const gateShaped =
      looksLikeGatePage() ||
      /[?&]id=/.test(location.search) ||
      location.pathname.toLowerCase().includes("homelander")
    if (!gateShaped) {
      return
    }
    const observer = new MutationObserver(() => {
      const target = findGateTarget(document.documentElement.innerHTML)
      if (!target) {
        return
      }
      observer.disconnect()
      if (!isDirectFileLink(target)) {
        location.replace(target)
      }
    })
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
    })
    setTimeout(() => observer.disconnect(), 8000)
  }

  const init = () => {
    runGateFlow()
    watchForLateGatePayload()
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true })
  } else {
    init()
  }
})()
