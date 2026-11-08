// ==UserScript==
// @name         Hub Helper
// @namespace    https://github.com/luminalreason/userpatch
// @version      0.3.3
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

  // These are fallback entry points, not authorities over working share pages.
  const HUBCLOUD_HOST = "hubcloud.pw"
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

  // Failed connections cannot run a userscript; source-link rewriting covers
  // those hosts. Loaded share pages get a DOM check before using this fallback.
  const redirectOutdatedHost = () => {
    const target = new URL(normalizeTarget(location.href))
    if (target.href === location.href || isDirectFileLink(target.href)) {
      return false
    }
    // The fragment survives HTTP redirects across origins even when storage
    // is blocked. Carry an existing anchor inside the one-attempt marker.
    const marker = `#userpatch-${target.hostname.split(".")[0]}-migrated`
    target.hash = target.hash
      ? `${marker}=${encodeURIComponent(target.hash)}`
      : marker
    console.info(
      `[hub-helper] moved ${location.hostname} -> ${target.hostname}`
    )
    location.replace(target.href)
    return true
  }

  const hubCloudDownloadId = (value) => {
    try {
      const url = new URL(value)
      const id = url.searchParams.get("id") ?? ""
      return /^https?:$/.test(url.protocol) &&
        url.pathname === "/hubcloud.php" &&
        url.searchParams.get("host") === "hubcloud" &&
        url.searchParams.get("token")?.trim() &&
        /^[a-z0-9]+$/i.test(id)
        ? id
        : null
    } catch {
      return null
    }
  }

  const snapshotDownloadPageUrl = () => {
    try {
      // The navigation entry retains the endpoint after the page masks its URL.
      const url = new URL(
        performance.getEntriesByType("navigation")[0]?.name || location.href
      )
      return url.origin === location.origin && hubCloudDownloadId(url.href)
        ? url
        : null
    } catch {
      return null
    }
  }
  const downloadPageUrl = snapshotDownloadPageUrl()
  const reloadShareId = location.hash.match(
    /^#userpatch-hubcloud=([a-z0-9]{15})$/i
  )?.[1]
  // Keep this snapshot after restoring the anchor so recovery cannot repeat.
  const hubShareMigration = location.hash.match(
    /^#userpatch-hub(?:cloud|drive)-migrated(?:=(.*))?$/
  )

  const isHubCloudShareUrl = () =>
    canonicalHostFor(new URL(location.href)) === HUBCLOUD_HOST

  const isHubShareUrl = () => !!canonicalHostFor(new URL(location.href))

  const isChallengePage = () =>
    /^(Just a moment|Attention Required)/i.test(document.title) ||
    !!document.querySelector("#challenge-form, #challenge-running")

  const isHubCloudSharePage = () => {
    const id = location.pathname.match(/^\/drive\/([a-z0-9]{15})\/?$/i)?.[1]
    // Working shares hand this same file ID to a tokenized server-selection
    // endpoint. A parked old domain has the share path but not that handoff.
    return (
      isHubCloudShareUrl() &&
      [...document.querySelectorAll("a[href]")].some(
        (link) => hubCloudDownloadId(link.href) === id
      )
    )
  }

  const isHubSharePage = () => {
    if (isHubCloudShareUrl()) {
      return isHubCloudSharePage()
    }
    // HubDrive's file page offers a HubCloud share as a server choice. That
    // handoff identifies a usable destination without pinning its current TLD.
    return (
      isHubShareUrl() &&
      [...document.querySelectorAll("a[href]")].some((link) => {
        try {
          return canonicalHostFor(new URL(link.href)) === HUBCLOUD_HOST
        } catch {
          return false
        }
      })
    )
  }

  const recoverOutdatedShareHost = () => {
    if (hubShareMigration || isChallengePage() || isHubSharePage()) {
      return
    }
    // Give late-injected share controls time to appear before treating an old
    // domain as broken. Never force the fallback over a working share page.
    setTimeout(() => {
      if (!isChallengePage() && !isHubSharePage()) {
        redirectOutdatedHost()
      }
    }, 8000)
  }

  // A share is a destination even before its controls finish loading. Stale
  // mediator storage must not send it back into the gate chain.
  const isGateDestination = () =>
    isChallengePage() || isDirectFileLink(location.href) || isHubShareUrl()

  const restoreDownloadShare = () => {
    // Restored blog URLs have lost the endpoint and may have lost tab storage.
    // Require our file marker and the site's recovery script, not a blog path.
    if (
      downloadPageUrl ||
      !reloadShareId ||
      isChallengePage() ||
      isDirectFileLink(location.href) ||
      ![...document.querySelectorAll("script:not([src])")].some(
        (script) =>
          /sessionStorage\.getItem\(\s*["']xl["']\s*\)/.test(
            script.textContent
          ) && /location\.href\s*=/.test(script.textContent)
      )
    ) {
      return false
    }
    openTarget(`https://${HUBCLOUD_HOST}/drive/${reloadShareId}`)
    console.info("[hub-helper] returned a restored tab to its share page")
    return true
  }

  const preserveDownloadShare = () => {
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
      const shareUrl = normalizeTarget(url.href)
      const current = new URL(location.href)
      const marker = `#userpatch-hubcloud=${downloadPageUrl.searchParams.get("id")}`
      let preserved = false
      // The fragment travels with a restored tab even without sessionStorage.
      // Leave existing page anchors and history state alone.
      if (!current.hash || current.hash === marker) {
        try {
          if (current.hash !== marker) {
            current.hash = marker
            history.replaceState(history.state, "", current.href)
            console.info("[hub-helper] preserved the share ID in the tab URL")
          }
          preserved = true
        } catch {
          // Keep the site's storage recovery when history edits are refused.
        }
      }
      // The site's article/error page also follows xl on ordinary reloads.
      // Only replace the slot when it belongs to this loaded endpoint.
      try {
        const saved = sessionStorage.getItem("xl")
        if (saved === shareUrl) {
          preserved = true
        } else if (saved === downloadPageUrl.href) {
          sessionStorage.setItem("xl", shareUrl)
          console.info(
            "[hub-helper] preserved the original share link for reloads"
          )
          preserved = true
        }
      } catch {
        // The URL marker still works when tab storage is blocked or missing.
      }
      return preserved
    } catch {
      // A malformed share field must leave the page alone.
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

  /** location.replace keeps skipped gates out of the Back history. */
  const runGateFlow = () => {
    if (isGateDestination() || !looksLikeGatePage()) {
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
    if (!downloadPageUrl && !reloadShareId && !gateShaped) {
      return
    }
    if (isGateDestination()) {
      return
    }
    const observer = new MutationObserver(() => {
      if (isGateDestination()) {
        observer.disconnect()
        return
      }
      if (downloadPageUrl) {
        if (preserveDownloadShare()) {
          observer.disconnect()
        }
        return
      }
      if (reloadShareId) {
        if (restoreDownloadShare()) {
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
    if (isHubShareUrl()) {
      recoverOutdatedShareHost()
      return
    }
    if (reloadShareId && !downloadPageUrl) {
      if (!restoreDownloadShare()) {
        watchForLatePagePayload()
      }
      return
    }
    rewriteOutdatedLinks()
    if (downloadPageUrl) {
      // Server-selection pages are destinations, even when storage is blocked.
      if (!preserveDownloadShare()) {
        watchForLatePagePayload()
      }
      return
    }
    if (!runGateFlow()) {
      watchForLatePagePayload()
    }
  }

  // Restore before parsing finishes so the browser can use the original anchor.
  if (isHubShareUrl() && hubShareMigration?.[1]) {
    try {
      const hash = decodeURIComponent(hubShareMigration[1])
      if (hash.startsWith("#")) {
        const target = new URL(location.href)
        target.hash = hash
        history.replaceState(history.state, "", target.href)
        console.info("[hub-helper] restored the share page anchor")
      }
    } catch {
      // A malformed marker or refused history edit must not retry migration.
    }
  }

  // Attach before DOMContentLoaded so early right-clicks and middle-clicks are
  // covered even while the rest of the page is still parsing.
  // Share pages own their links, including self-links used by Copy Link.
  // Rewriting them here would override the working domain on interaction.
  if (!isHubShareUrl()) {
    watchLinkIntent()
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true })
  } else {
    init()
  }
})()
