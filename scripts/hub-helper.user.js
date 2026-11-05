// ==UserScript==
// @name         Hub Helper
// @namespace    https://github.com/luminalreason/userpatch
// @version      0.2.0
// @description  Skips "please wait" gate pages and opens the page the countdown was hiding. Rewrites outdated HubCloud/HubDrive links to the current domain. Never clicks buttons, never starts downloads. Toggle it in Violentmonkey.
// @author       luminalreason
// @match        *://*/*
// @run-at       document-start
// @grant        none
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

  // Target rewriting

  // Only exact dead hosts are listed, so a stale map can leave an old link
  // unfixed but can never send a newer domain back to an older one.
  const OUTDATED_HOSTS = new Map([
    ["hubcloud.bz", "hubcloud.ist"],
    ["hubdrive.bz", "hubdrive.bar"],
  ])

  const canonicalHostFor = (hostname) => {
    const host = hostname
      .toLowerCase()
      .replace(/\.$/, "")
      .replace(/^www\./, "")
    return OUTDATED_HOSTS.get(host) ?? null
  }

  const normalizeTarget = (value) => {
    try {
      const url = new URL(value)
      if (url.protocol !== "http:" && url.protocol !== "https:") {
        return value
      }
      const canonical = canonicalHostFor(url.hostname)
      if (canonical) {
        url.hostname = canonical
        return url.href
      }
    } catch {
      // Relative or malformed URL; leave it alone.
    }
    return value
  }

  /** Normalize before the guards so a rewritten URL is still checked. */
  const openTarget = (target) => {
    const normalized = normalizeTarget(target)
    if (!isHttpUrl(normalized) || isDirectFileLink(normalized)) {
      return
    }
    if (normalized !== target) {
      console.info(
        `[hub-helper] rewrote ${hostnameOf(target)} -> ${hostnameOf(normalized)}`
      )
    }
    location.replace(normalized)
  }

  /**
   * An old host that still serves a page can be left before it renders. A host
   * that dies at TLS never creates a document, so that navigation has to be
   * fixed by the link rewrite below or a browser-level redirector.
   */
  const redirectOutdatedHost = () => {
    const target = normalizeTarget(location.href)
    if (target === location.href || isDirectFileLink(target)) {
      return false
    }
    console.info(
      `[hub-helper] moved ${location.hostname} -> ${hostnameOf(target)}`
    )
    location.replace(target)
    return true
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

  // Link rewriting

  /**
   * Rewriting hrefs covers right-click, middle-click, and keyboard open.
   * Rewriting again on interaction catches links added after the first pass
   * without keeping a MutationObserver alive on every page.
   */
  const rewriteLink = (link) => {
    if (!(link instanceof HTMLAnchorElement)) {
      return false
    }
    const href = link.href
    if (!href) {
      return false
    }
    const normalized = normalizeTarget(href)
    if (normalized === href) {
      return false
    }
    link.href = normalized
    return true
  }

  const rewriteOutdatedLinks = () => {
    const selector = [...OUTDATED_HOSTS.keys()]
      .map((host) => `a[href*="${host}" i]`)
      .join(", ")
    let count = 0
    for (const link of document.querySelectorAll(selector)) {
      if (rewriteLink(link)) {
        count += 1
      }
    }
    if (count > 0) {
      console.info(`[hub-helper] rewrote ${count} outdated link(s)`)
    }
  }

  const rewriteLinkFromEvent = (event) => {
    if (event.type === "keydown" && event.key !== "Enter") {
      return
    }
    const link = event.target.closest?.("a[href]")
    if (link && rewriteLink(link)) {
      console.info("[hub-helper] rewrote an outdated link")
    }
  }

  const watchLinkIntent = () => {
    for (const type of ["pointerdown", "contextmenu", "keydown", "click"]) {
      document.addEventListener(type, rewriteLinkFromEvent, true)
    }
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
    openTarget(target)
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
      openTarget(target)
    })
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
    })
    setTimeout(() => observer.disconnect(), 8000)
  }

  const init = () => {
    rewriteOutdatedLinks()
    runGateFlow()
    watchForLateGatePayload()
  }

  if (redirectOutdatedHost()) {
    return
  }

  // Attach before DOMContentLoaded so early right-clicks and middle-clicks are
  // covered even while the rest of the page is still parsing.
  watchLinkIntent()

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true })
  } else {
    init()
  }
})()
