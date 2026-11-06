// ==UserScript==
// @name         Hub Helper
// @namespace    https://github.com/luminalreason/userpatch
// @version      0.3.0
// @description  Skips "please wait" gate pages, updates outdated HubCloud/HubDrive links, and returns reloaded HubCloud download pages to their original share link. Never clicks buttons, never starts downloads. Toggle it in Violentmonkey.
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

  const HUBCLOUD_HOST = "hubcloud.ist"
  const HUBDRIVE_HOST = "hubdrive.bar"

  const canonicalHostFor = (url) => {
    if (url.port || url.username || url.password) {
      return null
    }
    const host = url.hostname
      .toLowerCase()
      .replace(/\.$/, "")
      .replace(/^www\./, "")
    // HubCloud uses 15-character IDs under /drive; HubDrive uses numeric IDs
    // under /file. Requiring a bare brand host and its share path leaves file
    // subdomains, login/admin pages, and lookalikes alone.
    if (
      /^hubcloud\.[a-z]+$/.test(host) &&
      /^\/drive\/[a-z0-9]{15}\/?$/i.test(url.pathname)
    ) {
      return HUBCLOUD_HOST
    }
    if (
      /^hubdrive\.[a-z]+$/.test(host) &&
      /^\/file\/\d+\/?$/.test(url.pathname)
    ) {
      return HUBDRIVE_HOST
    }
    return null
  }

  const normalizeTarget = (value) => {
    try {
      const url = new URL(value)
      if (url.protocol !== "http:" && url.protocol !== "https:") {
        return value
      }
      const canonical = canonicalHostFor(url)
      if (canonical && url.hostname !== canonical) {
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
   * An old host that still serves a page can be left before it renders. If it
   * fails to connect or redirects before a document loads, the userscript can
   * only prevent that visit by rewriting the link on its source page.
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

  const snapshotDownloadPageUrl = () => {
    try {
      // The navigation entry retains the endpoint after the page masks its URL.
      const url = new URL(
        performance.getEntriesByType("navigation")[0]?.name || location.href
      )
      const id = url.searchParams.get("id") ?? ""
      return /^https?:$/.test(url.protocol) &&
        url.origin === location.origin &&
        url.pathname === "/hubcloud.php" &&
        url.searchParams.get("host") === "hubcloud" &&
        url.searchParams.get("token")?.trim() &&
        /^[a-z0-9]+$/i.test(id)
        ? url
        : null
    } catch {
      return null
    }
  }
  const downloadPageUrl = snapshotDownloadPageUrl()

  const isChallengePage = () =>
    /^(Just a moment|Attention Required)/i.test(document.title) ||
    !!document.querySelector("#challenge-form, #challenge-running")

  const fixDownloadReloadTarget = () => {
    try {
      // Only the completed server-selection page pairs this readonly share
      // field and success message with real file links for the endpoint's ID.
      const share = document.querySelector("input#ilink[readonly]")
      if (
        !share ||
        isChallengePage() ||
        isDirectFileLink(location.href) ||
        ![...document.querySelectorAll("p")].some(
          (paragraph) =>
            paragraph.textContent.trim() === "Download Link Generated"
        )
      ) {
        return false
      }
      const url = new URL(share.value)
      if (
        !/^https?:$/.test(url.protocol) ||
        canonicalHostFor(url) !== HUBCLOUD_HOST ||
        url.pathname !== `/drive/${downloadPageUrl.searchParams.get("id")}` ||
        isDirectFileLink(url.href) ||
        ![...document.querySelectorAll("a[href]")].some((link) =>
          isDirectFileLink(link.href)
        )
      ) {
        return false
      }
      // The masked article/error page follows xl on reload. The site puts its
      // expiring endpoint there; keep the durable share link instead. Only
      // replace the slot when it still belongs to this loaded endpoint.
      const saved = sessionStorage.getItem("xl")
      const shareUrl = normalizeTarget(url.href)
      if (saved === shareUrl) {
        return true
      }
      if (saved !== downloadPageUrl.href) {
        return false
      }
      sessionStorage.setItem("xl", shareUrl)
      console.info("[hub-helper] preserved the original share link for reloads")
      return true
    } catch {
      // Storage may be blocked; the site's normal flow must still work.
      return false
    }
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
    const selector = 'a[href*="hubcloud." i], a[href*="hubdrive." i]'
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
  const watchForLatePagePayload = () => {
    const gateShaped =
      looksLikeGatePage() ||
      /[?&]id=/.test(location.search) ||
      location.pathname.toLowerCase().includes("homelander")
    if (!downloadPageUrl && !gateShaped) {
      return
    }
    const observer = new MutationObserver(() => {
      if (downloadPageUrl) {
        if (fixDownloadReloadTarget()) {
          observer.disconnect()
        }
        return
      }
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
    if (downloadPageUrl) {
      // Server-selection pages are destinations, even when storage is blocked.
      if (!fixDownloadReloadTarget()) {
        watchForLatePagePayload()
      }
      return
    }
    runGateFlow()
    watchForLatePagePayload()
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
