// ==UserScript==
// @name         HubFamily Redesign
// @namespace    https://github.com/luminalreason/userpatch
// @version      0.3.1
// @description  A unified, responsive redesign for the Hub family, with consistent system-themed layouts, movie and series details, screenshot viewing, quality filters, and clearer download, share, and copy controls.
// @author       luminalreason
// @match        *://*/*
// @run-at       document-start
// @inject-into  content
// @grant        none
// @noframes
// ==/UserScript==

// Generated from src/ — do not edit by hand.
;(function installLoadingCover(force = false, timeoutMs = 8000) {
  const root = document.documentElement
  if (!root) {
    // Some injection paths run before the parser creates <html>. Retry in the
    // mutation microtask instead of waiting for the much later body event.
    let timeout = 0
    const pending = new MutationObserver(() => {
      if (document.documentElement) {
        pending.disconnect()
        window.clearTimeout(timeout)
        installLoadingCover(force, timeoutMs)
      }
    })
    pending.observe(document, { childList: true })
    timeout = window.setTimeout(() => pending.disconnect(), timeoutMs)
    window.addEventListener(
      "pagehide",
      () => {
        pending.disconnect()
        window.clearTimeout(timeout)
      },
      { once: true }
    )
    return null
  }
  const isChallenge = () =>
    /just a moment|attention required|checking your browser/i.test(
      document.title
    ) ||
    location.pathname.startsWith("/cdn-cgi/") ||
    Boolean(
      document.querySelector(
        "#challenge-form, #challenge-running, #cf-challenge-running, .cf-turnstile"
      )
    )
  if (isChallenge()) {
    return null
  }
  if (
    !force &&
    (!/(^|\.)(4khdhub|hdhub4u|hblinks|hubcloud|hubcdn)\./i.test(
      location.hostname
    ) ||
      /\.(mkv|mp4|avi|mov|webm|zip|rar|7z|iso|mp3|flac)$/i.test(
        location.pathname
      ))
  ) {
    return null
  }
  const existing = document.getElementById("userpatch-page-loader")
  if (existing) {
    return existing
  }
  let style = document.getElementById("userpatch-page-loader-style")
  if (!style) {
    style = document.createElement("style")
    style.id = "userpatch-page-loader-style"
    style.textContent = `
      html[data-userpatch-loading] { background: #0a0a0a !important; color-scheme: light dark !important; }
      /* Visibility alone can be overridden by the source's visible children.
         Opacity suppresses the entire body, including its white background. */
      html[data-userpatch-loading] > body {
        visibility: hidden !important;
        opacity: 0 !important;
        pointer-events: none !important;
      }
      #userpatch-page-loader {
        all: initial !important; position: fixed !important; inset: 0 !important;
        z-index: 2147483647 !important; display: grid !important;
        place-items: center !important; visibility: visible !important;
        background: #0a0a0a !important; color: #fafafa !important;
      }
      #userpatch-page-loader progress, progress.userpatch-loading-spinner {
        appearance: none !important; display: block !important;
        inline-size: 2rem !important; block-size: 2rem !important;
        box-sizing: border-box !important; margin: auto !important;
        border: 2px solid #444 !important; border-block-start-color: #fafafa !important;
        border-radius: 50% !important; background: transparent !important;
        animation: userpatch-loader-spin 1s linear infinite !important;
      }
      #userpatch-page-loader progress::-webkit-progress-bar,
      progress.userpatch-loading-spinner::-webkit-progress-bar { display: none; }
      #userpatch-page-loader progress::-moz-progress-bar,
      progress.userpatch-loading-spinner::-moz-progress-bar { background: transparent; }
      @keyframes userpatch-loader-spin { to { transform: rotate(360deg); } }
      @media (prefers-color-scheme: light) {
        html[data-userpatch-loading] { background: #ffffff !important; }
        #userpatch-page-loader { background: #ffffff !important; color: #0a0a0a !important; }
        #userpatch-page-loader progress, progress.userpatch-loading-spinner {
          border-color: #ddd !important;
          border-block-start-color: #0a0a0a !important;
        }
      }
      @media (prefers-reduced-motion: reduce) {
        #userpatch-page-loader progress, progress.userpatch-loading-spinner { animation-duration: 6s !important; }
      }
    `
    root.append(style)
  }
  const cover = document.createElement("div")
  cover.id = "userpatch-page-loader"
  cover.setAttribute("aria-busy", "true")
  const spinner = document.createElement("progress")
  spinner.setAttribute("aria-label", "Loading page")
  cover.append(spinner)
  root.dataset.userpatchLoading = ""
  root.append(cover)
  let timer = 0
  const cleanup = () => {
    delete root.dataset.userpatchLoading
    cover.remove()
    observer.disconnect()
    window.clearTimeout(timer)
  }
  const observer = new MutationObserver(() => {
    if (!Object.hasOwn(root.dataset, "userpatchLoading") || isChallenge()) {
      cleanup()
      return
    }
    // Some themes rebuild body/head during startup. Keep the cover and its
    // stylesheet outside those containers until the redesign explicitly reveals.
    if (!style.isConnected) {
      root.append(style)
    }
    if (!cover.isConnected) {
      root.append(cover)
    }
  })
  observer.observe(document, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["data-userpatch-loading"],
  })
  timer = window.setTimeout(cleanup, timeoutMs)
  window.addEventListener(
    "pagehide",
    () => {
      // Do not uncover a partially parsed outgoing document during navigation.
      observer.disconnect()
      window.clearTimeout(timer)
    },
    { once: true }
  )
  window.addEventListener("pageshow", (event) => {
    if (event.persisted) {
      cleanup()
    }
  })
  return cover
})()
if (new RegExp("^.*://4khdhub\\.one/.*$").test(location.href)) {
  // Generated from src/ — do not edit by hand.
  ;(function installLoadingCover(force = false, timeoutMs = 8000) {
    const root = document.documentElement
    if (!root) {
      // Some injection paths run before the parser creates <html>. Retry in the
      // mutation microtask instead of waiting for the much later body event.
      let timeout = 0
      const pending = new MutationObserver(() => {
        if (document.documentElement) {
          pending.disconnect()
          window.clearTimeout(timeout)
          installLoadingCover(force, timeoutMs)
        }
      })
      pending.observe(document, { childList: true })
      timeout = window.setTimeout(() => pending.disconnect(), timeoutMs)
      window.addEventListener(
        "pagehide",
        () => {
          pending.disconnect()
          window.clearTimeout(timeout)
        },
        { once: true }
      )
      return null
    }
    const isChallenge = () =>
      /just a moment|attention required|checking your browser/i.test(
        document.title
      ) ||
      location.pathname.startsWith("/cdn-cgi/") ||
      Boolean(
        document.querySelector(
          "#challenge-form, #challenge-running, #cf-challenge-running, .cf-turnstile"
        )
      )
    if (isChallenge()) {
      return null
    }
    if (
      !force &&
      (!/(^|\.)(4khdhub|hdhub4u|hblinks|hubcloud|hubcdn)\./i.test(
        location.hostname
      ) ||
        /\.(mkv|mp4|avi|mov|webm|zip|rar|7z|iso|mp3|flac)$/i.test(
          location.pathname
        ))
    ) {
      return null
    }
    const existing = document.getElementById("userpatch-page-loader")
    if (existing) {
      return existing
    }
    let style = document.getElementById("userpatch-page-loader-style")
    if (!style) {
      style = document.createElement("style")
      style.id = "userpatch-page-loader-style"
      style.textContent = `
      html[data-userpatch-loading] { background: #0a0a0a !important; color-scheme: light dark !important; }
      /* Visibility alone can be overridden by the source's visible children.
         Opacity suppresses the entire body, including its white background. */
      html[data-userpatch-loading] > body {
        visibility: hidden !important;
        opacity: 0 !important;
        pointer-events: none !important;
      }
      #userpatch-page-loader {
        all: initial !important; position: fixed !important; inset: 0 !important;
        z-index: 2147483647 !important; display: grid !important;
        place-items: center !important; visibility: visible !important;
        background: #0a0a0a !important; color: #fafafa !important;
      }
      #userpatch-page-loader progress, progress.userpatch-loading-spinner {
        appearance: none !important; display: block !important;
        inline-size: 2rem !important; block-size: 2rem !important;
        box-sizing: border-box !important; margin: auto !important;
        border: 2px solid #444 !important; border-block-start-color: #fafafa !important;
        border-radius: 50% !important; background: transparent !important;
        animation: userpatch-loader-spin 1s linear infinite !important;
      }
      #userpatch-page-loader progress::-webkit-progress-bar,
      progress.userpatch-loading-spinner::-webkit-progress-bar { display: none; }
      #userpatch-page-loader progress::-moz-progress-bar,
      progress.userpatch-loading-spinner::-moz-progress-bar { background: transparent; }
      @keyframes userpatch-loader-spin { to { transform: rotate(360deg); } }
      @media (prefers-color-scheme: light) {
        html[data-userpatch-loading] { background: #ffffff !important; }
        #userpatch-page-loader { background: #ffffff !important; color: #0a0a0a !important; }
        #userpatch-page-loader progress, progress.userpatch-loading-spinner {
          border-color: #ddd !important;
          border-block-start-color: #0a0a0a !important;
        }
      }
      @media (prefers-reduced-motion: reduce) {
        #userpatch-page-loader progress, progress.userpatch-loading-spinner { animation-duration: 6s !important; }
      }
    `
      root.append(style)
    }
    const cover = document.createElement("div")
    cover.id = "userpatch-page-loader"
    cover.setAttribute("aria-busy", "true")
    const spinner = document.createElement("progress")
    spinner.setAttribute("aria-label", "Loading page")
    cover.append(spinner)
    root.dataset.userpatchLoading = ""
    root.append(cover)
    let timer = 0
    const cleanup = () => {
      delete root.dataset.userpatchLoading
      cover.remove()
      observer.disconnect()
      window.clearTimeout(timer)
    }
    const observer = new MutationObserver(() => {
      if (!Object.hasOwn(root.dataset, "userpatchLoading") || isChallenge()) {
        cleanup()
        return
      }
      // Some themes rebuild body/head during startup. Keep the cover and its
      // stylesheet outside those containers until the redesign explicitly reveals.
      if (!style.isConnected) {
        root.append(style)
      }
      if (!cover.isConnected) {
        root.append(cover)
      }
    })
    observer.observe(document, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["data-userpatch-loading"],
    })
    timer = window.setTimeout(cleanup, timeoutMs)
    window.addEventListener(
      "pagehide",
      () => {
        // Do not uncover a partially parsed outgoing document during navigation.
        observer.disconnect()
        window.clearTimeout(timer)
      },
      { once: true }
    )
    window.addEventListener("pageshow", (event) => {
      if (event.persisted) {
        cleanup()
      }
    })
    return cover
  })()

  ;("use strict")

  ;(function () {
    // src/shared/cloudflare.js
    const isCloudflareChallenge = () => {
      try {
        return (
          /just a moment|attention required|checking your browser/i.test(
            document.title || ""
          ) ||
          Boolean(
            document.querySelector(
              "#challenge-running, #cf-challenge-running, #challenge-form, .cf-turnstile, [name='cf-turnstile-response'], script[src*='/cdn-cgi/challenge-platform/']"
            )
          )
        )
      } catch {
        return true
      }
    }

    // src/shared/loading-cover.mjs
    function installLoadingCover(force = false, timeoutMs = 8e3) {
      const root = document.documentElement
      if (!root) {
        let timeout = 0
        const pending = new MutationObserver(() => {
          if (document.documentElement) {
            pending.disconnect()
            window.clearTimeout(timeout)
            installLoadingCover(force, timeoutMs)
          }
        })
        pending.observe(document, { childList: true })
        timeout = window.setTimeout(() => pending.disconnect(), timeoutMs)
        window.addEventListener(
          "pagehide",
          () => {
            pending.disconnect()
            window.clearTimeout(timeout)
          },
          { once: true }
        )
        return null
      }
      const isChallenge = () =>
        /just a moment|attention required|checking your browser/i.test(
          document.title
        ) ||
        location.pathname.startsWith("/cdn-cgi/") ||
        Boolean(
          document.querySelector(
            "#challenge-form, #challenge-running, #cf-challenge-running, .cf-turnstile"
          )
        )
      if (isChallenge()) {
        return null
      }
      if (
        !force &&
        (!/(^|\.)(4khdhub|hdhub4u|hblinks|hubcloud|hubcdn)\./i.test(
          location.hostname
        ) ||
          /\.(mkv|mp4|avi|mov|webm|zip|rar|7z|iso|mp3|flac)$/i.test(
            location.pathname
          ))
      ) {
        return null
      }
      const existing = document.getElementById("userpatch-page-loader")
      if (existing) {
        return existing
      }
      let style = document.getElementById("userpatch-page-loader-style")
      if (!style) {
        style = document.createElement("style")
        style.id = "userpatch-page-loader-style"
        style.textContent = `
      html[data-userpatch-loading] { background: #0a0a0a !important; color-scheme: light dark !important; }
      /* Visibility alone can be overridden by the source's visible children.
         Opacity suppresses the entire body, including its white background. */
      html[data-userpatch-loading] > body {
        visibility: hidden !important;
        opacity: 0 !important;
        pointer-events: none !important;
      }
      #userpatch-page-loader {
        all: initial !important; position: fixed !important; inset: 0 !important;
        z-index: 2147483647 !important; display: grid !important;
        place-items: center !important; visibility: visible !important;
        background: #0a0a0a !important; color: #fafafa !important;
      }
      #userpatch-page-loader progress, progress.userpatch-loading-spinner {
        appearance: none !important; display: block !important;
        inline-size: 2rem !important; block-size: 2rem !important;
        box-sizing: border-box !important; margin: auto !important;
        border: 2px solid #444 !important; border-block-start-color: #fafafa !important;
        border-radius: 50% !important; background: transparent !important;
        animation: userpatch-loader-spin 1s linear infinite !important;
      }
      #userpatch-page-loader progress::-webkit-progress-bar,
      progress.userpatch-loading-spinner::-webkit-progress-bar { display: none; }
      #userpatch-page-loader progress::-moz-progress-bar,
      progress.userpatch-loading-spinner::-moz-progress-bar { background: transparent; }
      @keyframes userpatch-loader-spin { to { transform: rotate(360deg); } }
      @media (prefers-color-scheme: light) {
        html[data-userpatch-loading] { background: #ffffff !important; }
        #userpatch-page-loader { background: #ffffff !important; color: #0a0a0a !important; }
        #userpatch-page-loader progress, progress.userpatch-loading-spinner {
          border-color: #ddd !important;
          border-block-start-color: #0a0a0a !important;
        }
      }
      @media (prefers-reduced-motion: reduce) {
        #userpatch-page-loader progress, progress.userpatch-loading-spinner { animation-duration: 6s !important; }
      }
    `
        root.append(style)
      }
      const cover = document.createElement("div")
      cover.id = "userpatch-page-loader"
      cover.setAttribute("aria-busy", "true")
      const spinner = document.createElement("progress")
      spinner.setAttribute("aria-label", "Loading page")
      cover.append(spinner)
      root.dataset.userpatchLoading = ""
      root.append(cover)
      let timer = 0
      const cleanup = () => {
        delete root.dataset.userpatchLoading
        cover.remove()
        observer.disconnect()
        window.clearTimeout(timer)
      }
      const observer = new MutationObserver(() => {
        if (!Object.hasOwn(root.dataset, "userpatchLoading") || isChallenge()) {
          cleanup()
          return
        }
        if (!style.isConnected) {
          root.append(style)
        }
        if (!cover.isConnected) {
          root.append(cover)
        }
      })
      observer.observe(document, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["data-userpatch-loading"],
      })
      timer = window.setTimeout(cleanup, timeoutMs)
      window.addEventListener(
        "pagehide",
        () => {
          observer.disconnect()
          window.clearTimeout(timer)
        },
        { once: true }
      )
      window.addEventListener("pageshow", (event) => {
        if (event.persisted) {
          cleanup()
        }
      })
      return cover
    }

    // src/shared/page-loader.js
    const PAGE_LOADER_ID = "userpatch-page-loader"
    const PAGE_LOADER_HIDDEN_CLASS = "userpatch-page-loader-hidden"
    const PAGE_SPINNER_CLASS = "userpatch-page-spinner"
    let revealPending = false
    const showRedesignLoader = (hostPattern) => {
      if (hostPattern.test(location.hostname)) {
        installLoadingCover()
      }
    }
    const showInitialPageLoader = (guard, _buildSpinner, timeoutMs) => {
      if (guard()) {
        installLoadingCover(true, timeoutMs)
      }
    }
    const dismissPageLoader = (immediate = false) => {
      if (immediate) {
        delete document.documentElement?.dataset.userpatchLoading
        document.getElementById(PAGE_LOADER_ID)?.remove()
        revealPending = false
        return
      }
      if (revealPending || !document.getElementById("userpatch-page-loader")) {
        return
      }
      revealPending = true
      const reveal = () =>
        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => dismissPageLoader(true))
        })
      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", reveal, { once: true })
      } else {
        reveal()
      }
    }

    // src/shared/bootstrap.js
    let pageLoop = null
    const initPageLoop = (context) => {
      pageLoop = context
    }
    let pageObserver = null
    let waitTimer = 0
    let pageProcessingTimer = 0
    const stopWaiting = () => {
      if (pageObserver) {
        pageObserver.disconnect()
        pageObserver = null
      }
      if (waitTimer) {
        window.clearTimeout(waitTimer)
        waitTimer = 0
      }
      if (pageProcessingTimer) {
        window.clearTimeout(pageProcessingTimer)
        pageProcessingTimer = 0
      }
    }
    const runPageProcessing = () => {
      pageObserver?.disconnect()
      try {
        if (pageLoop.processPage()) {
          dismissPageLoader()
        }
        if (isCloudflareChallenge()) {
          stopWaiting()
        }
      } catch {
        dismissPageLoader(true)
      } finally {
        pageObserver?.observe(document, {
          attributes: true,
          attributeFilter: pageLoop.attributeFilter,
          characterData: pageLoop.characterData,
          childList: true,
          subtree: true,
        })
      }
    }
    const schedulePageProcessing = () => {
      if (pageProcessingTimer) {
        return
      }
      pageProcessingTimer = window.setTimeout(() => {
        pageProcessingTimer = 0
        runPageProcessing()
      }, 0)
    }
    const watchCurrentPage = () => {
      stopWaiting()
      pageObserver = new MutationObserver(schedulePageProcessing)
      waitTimer = window.setTimeout(() => {
        runPageProcessing()
        stopWaiting()
        dismissPageLoader()
      }, pageLoop.discoveryTimeoutMs)
      runPageProcessing()
    }

    // src/shared/progressive-images.js
    const preparedImages = new WeakSet()
    const pendingImages = new Map()
    let imageObserver = null
    const getSmallImageUrl = (source) => {
      try {
        const url = new URL(source, location.href)
        if (
          url.hostname === "image.tmdb.org" &&
          /^\/t\/p\/(w\d+|original)\//.test(url.pathname)
        ) {
          url.pathname = url.pathname.replace(/^\/t\/p\/[^/]+\//, "/t/p/w92/")
          return url.href
        }
      } catch {}
      return source
    }
    const setupProgressiveImage = (img, highResUrl) => {
      if (!(img instanceof HTMLImageElement) || preparedImages.has(img)) {
        return
      }
      preparedImages.add(img)
      img.classList.add("userpatch-progressive-image")
      img.draggable = false
      img.decoding = "async"
      const original = img.src
      const full = highResUrl || original
      const finish = () => img.classList.add("userpatch-image-loaded")
      if (img.complete && img.naturalWidth && full === original) {
        finish()
        return
      }
      const start = () => {
        const small =
          highResUrl || img.srcset ? original : getSmallImageUrl(original)
        let upgrading = false
        const upgrade = () => {
          if (upgrading) {
            return
          }
          upgrading = true
          img.removeEventListener("load", upgrade)
          img.removeEventListener("error", upgrade)
          const high = new Image()
          high.decoding = "async"
          high.fetchPriority = img.fetchPriority
          high.addEventListener(
            "load",
            async () => {
              try {
                await high.decode()
              } catch {}
              if (img.isConnected) {
                img.src = full
                finish()
              }
            },
            { once: true }
          )
          high.addEventListener("error", finish, { once: true })
          high.src = full
        }
        if (small !== full) {
          img.addEventListener("load", upgrade, { once: true })
          img.addEventListener("error", upgrade, { once: true })
          img.src = small
          if (img.complete && img.naturalWidth) {
            img.removeEventListener("load", upgrade)
            img.removeEventListener("error", upgrade)
            upgrade()
          }
        } else if (img.complete && img.naturalWidth) {
          finish()
        } else {
          img.addEventListener("load", finish, { once: true })
          img.addEventListener("error", finish, { once: true })
        }
      }
      if (img.loading === "lazy" && "IntersectionObserver" in window) {
        imageObserver ||= new IntersectionObserver(
          (entries) => {
            for (const entry of entries) {
              if (entry.isIntersecting) {
                imageObserver.unobserve(entry.target)
                pendingImages.get(entry.target)?.()
                pendingImages.delete(entry.target)
              }
            }
          },
          { rootMargin: "200px" }
        )
        pendingImages.set(img, start)
        imageObserver.observe(img)
      } else {
        start()
      }
    }
    const PROGRESSIVE_IMAGE_CSS = `
html.userpatch-maia img.userpatch-progressive-image {
  filter: blur(10px) !important;
  opacity: 0.85;
  transition: filter 280ms ease, opacity 280ms ease !important;
}
html.userpatch-maia img.userpatch-progressive-image.userpatch-image-loaded {
  filter: none !important;
  opacity: 1 !important;
}
@media (prefers-reduced-motion: reduce) {
  html.userpatch-maia img.userpatch-progressive-image { transition: none !important; }
}
`
    window.addEventListener("pagehide", () => imageObserver?.disconnect())
    window.addEventListener("pageshow", (event) => {
      if (event.persisted) {
        for (const image of pendingImages.keys()) {
          if (image.isConnected) {
            imageObserver?.observe(image)
          } else {
            pendingImages.delete(image)
          }
        }
      }
    })

    // src/shared/storage.js
    const storageGet = (key) => {
      try {
        return window.localStorage.getItem(key)
      } catch {
        return null
      }
    }
    const storageSet = (key, value) => {
      try {
        if (value === null || value === undefined) {
          window.localStorage.removeItem(key)
        } else {
          window.localStorage.setItem(key, String(value))
        }
      } catch {}
    }
    let openedReleasesKey = ""
    const initStorage = (context) => {
      openedReleasesKey = context.openedReleasesKey
    }
    const getOpenedReleases = () => {
      try {
        const raw = storageGet(openedReleasesKey)
        if (!raw) {
          return new Set()
        }
        const parsed = JSON.parse(raw)
        return new Set(Array.isArray(parsed) ? parsed : [])
      } catch {
        return new Set()
      }
    }
    const saveOpenedRelease = (...identifiers) => {
      const valid = identifiers.filter(
        (id) => Boolean(id) && typeof id === "string"
      )
      if (!valid.length) {
        return
      }
      const items = getOpenedReleases()
      for (const identifier of valid) {
        items.delete(identifier)
        items.add(identifier)
      }
      storageSet(openedReleasesKey, JSON.stringify([...items].slice(-1e3)))
    }
    const markReleaseOpened = (row, item) => {
      if (row) {
        row.dataset.userpatchOpened = "true"
      }
      if (item) {
        item.dataset.userpatchOpened = "true"
      }
    }
    const isReleaseOpened = (identifier, linksRoot, openedReleases) => {
      if (identifier && openedReleases.has(identifier)) {
        return true
      }
      if (linksRoot) {
        for (const anchor of linksRoot.querySelectorAll("a[href]")) {
          if (openedReleases.has(anchor.href)) {
            return true
          }
        }
      }
      return false
    }

    // src/shared/system-theme.js
    let preference = null
    const updateSystemTheme = () => {
      const root = document.documentElement
      if (!root || !Object.hasOwn(root.dataset, "userpatchTheme")) {
        return
      }
      const theme = preference.matches ? "dark" : "light"
      if (root.dataset.userpatchTheme !== theme) {
        root.dataset.userpatchTheme = theme
      }
      if (Object.hasOwn(root.dataset, "detailTheme")) {
        root.classList.toggle("dark", theme === "dark")
        root.classList.toggle("light", theme === "light")
        root.dataset.detailTheme = theme
      }
      for (const meta of document.querySelectorAll(
        'meta[id^="userpatch-"][name="theme-color"]'
      )) {
        meta.content = theme === "dark" ? "#0a0a0a" : "#ffffff"
      }
    }
    const ensureSystemTheme = () => {
      if (!preference) {
        preference = window.matchMedia("(prefers-color-scheme: dark)")
        preference.addEventListener("change", updateSystemTheme)
        window.addEventListener("pagehide", () => {
          preference.removeEventListener("change", updateSystemTheme)
        })
        window.addEventListener("pageshow", (event) => {
          if (event.persisted) {
            preference.addEventListener("change", updateSystemTheme)
            updateSystemTheme()
          }
        })
      }
      const theme = preference.matches ? "dark" : "light"
      document.documentElement.dataset.userpatchTheme = theme
      updateSystemTheme()
      return theme
    }
    const systemThemeCss = (legacyHsl = false) => {
      const light = {
        background: "1 0 0",
        foreground: "0.145 0 0",
        card: "1 0 0",
        "card-foreground": "0.145 0 0",
        popover: "1 0 0",
        "popover-foreground": "0.145 0 0",
        primary: "0.205 0 0",
        "primary-foreground": "0.985 0 0",
        secondary: "0.97 0 0",
        "secondary-foreground": "0.205 0 0",
        muted: "0.97 0 0",
        "muted-foreground": "0.556 0 0",
        accent: "0.97 0 0",
        "accent-foreground": "0.205 0 0",
        destructive: "0.577 0.245 27.325",
        border: "0.922 0 0",
        input: "0.922 0 0",
        ring: "0.708 0 0",
      }
      const hsl = {
        background: "0 0% 100%",
        foreground: "0 0% 3.94%",
        card: "0 0% 100%",
        "card-foreground": "0 0% 3.94%",
        popover: "0 0% 100%",
        "popover-foreground": "0 0% 3.94%",
        primary: "0 0% 9%",
        "primary-foreground": "0 0% 98%",
        secondary: "0 0% 96%",
        "secondary-foreground": "0 0% 9%",
        muted: "0 0% 96%",
        "muted-foreground": "0 0% 45%",
        accent: "0 0% 96%",
        "accent-foreground": "0 0% 9%",
        destructive: "0 72% 51%",
        border: "0 0% 90%",
        input: "0 0% 90%",
        ring: "0 0% 64%",
      }
      const tokens = Object.entries(light)
        .map(
          ([name, value]) =>
            `--maia-${name}: oklch(${value}) !important; --${name}: ${legacyHsl ? hsl[name] : `oklch(${value})`} !important;`
        )
        .join("\n")
      return `
    html.userpatch-maia, html[data-userpatch-theme] {
      color-scheme: light dark !important;
    }
    @media (prefers-color-scheme: light) {
      html.userpatch-maia, html[data-userpatch-theme] {
        ${tokens}
        --maia-control-surface: oklch(0.98 0 0 / 90%);
        --maia-control-border-opacity: 0.14;
        --maia-ongoing-orange: #c65a00;
        --maia-ongoing-gold: #d97706;
        --maia-ongoing-deep-orange: #b45309;
        --maia-ongoing-glow-opacity: 0.32;
        --maia-ongoing-glow-blur: 12px;
        --maia-ongoing-shadow: 0 0 12px rgb(198 90 0 / 0.28),
          0 0 24px rgb(180 83 9 / 0.18);
        --maia-hdhub-running-border: linear-gradient(135deg in oklch,
          #c2410c, #d63d32 52%, #b91c1c);
        --maia-hdhub-running-shadow: 0 0 12px rgb(194 65 12 / 0.28),
          0 0 24px rgb(185 28 28 / 0.18);
        --maia-selection-bg: linear-gradient(180deg in oklch,
          oklch(0.90 0 0), oklch(0.84 0 0));
        --maia-select-hover-bg: linear-gradient(180deg in oklch,
          oklch(0.87 0 0), oklch(0.81 0 0));
        --maia-selection-shadow: inset 0 1px 0 rgb(255 255 255 / 0.9),
          inset 0 0 0 1px rgb(0 0 0 / 0.12), 0 1px 2px rgb(0 0 0 / 0.06);
        --maia-glass-shadow: 0 1px 2px rgb(0 0 0 / 0.04),
          0 2px 6px rgb(0 0 0 / 0.02);
        --maia-card-depth-shadow: inset 0 1px 0 rgb(255 255 255 / 0.8),
          0 1px 3px rgb(0 0 0 / 0.08), 0 3px 8px rgb(0 0 0 / 0.04);
      }
      html.userpatch-maia .userpatch-media-badge img,
      html.userpatch-maia .userpatch-quality-tab img,
      html.userpatch-maia .userpatch-quality-filter img {
        filter: none !important;
      }
      html.userpatch-maia .userpatch-quality-tab:disabled img {
        filter: opacity(0.45) !important;
      }
    }
  `
    }

    // src/shared/styles.js
    let maiaStyles = null
    const initMaiaStyles = (context) => {
      maiaStyles = context
    }
    const MAIA_CLASS = "userpatch-maia"
    const FONT_STYLESHEET_URL =
      "https://cdn.jsdelivr.net/npm/@fontsource-variable/inter@5.3.0/index.css"
    const ensureStyles = () => {
      try {
        if (isCloudflareChallenge() || !maiaStyles.siteSignature()) {
          return false
        }
        const styleTarget = document.head || document.documentElement
        if (!styleTarget) {
          return false
        }
        if (maiaStyles.preInject) {
          maiaStyles.preInject()
        }
        const theme = ensureSystemTheme()
        if (!document.getElementById(maiaStyles.fontStyleId)) {
          const fontStylesheet = document.createElement("link")
          fontStylesheet.id = maiaStyles.fontStyleId
          fontStylesheet.rel = "stylesheet"
          fontStylesheet.href = FONT_STYLESHEET_URL
          fontStylesheet.crossOrigin = "anonymous"
          styleTarget.append(fontStylesheet)
        }
        if (document.head) {
          const ensureManagedMeta = (id, name, content) => {
            let meta = document.getElementById(id)
            if (!meta) {
              meta = document.querySelector(`meta[name="${name}"]`)
              if (meta) {
                meta.dataset.originalId = meta.id
                meta.id = id
                meta.dataset.originalContent = meta.content || ""
              } else {
                meta = document.createElement("meta")
                meta.id = id
                meta.name = name
                document.head.append(meta)
              }
            }
            meta.content = content
          }
          ensureManagedMeta(
            maiaStyles.colorSchemeMetaId,
            "color-scheme",
            "light dark"
          )
          ensureManagedMeta(
            maiaStyles.themeColorMetaId,
            "theme-color",
            theme === "dark" ? maiaStyles.themeColor : "#ffffff"
          )
          const viewportMeta = document.querySelector('meta[name="viewport"]')
          if (viewportMeta) {
            const current = viewportMeta.content || ""
            const tokens = current
              .split(",")
              .map((t) => t.trim())
              .filter(Boolean)
            const missing = [
              "viewport-fit=cover",
              "interactive-widget=resizes-content",
            ].filter((token) => !tokens.includes(token))
            if (missing.length) {
              if (viewportMeta.dataset.originalContent === undefined) {
                viewportMeta.dataset.originalContent = current
              }
              viewportMeta.content = [...tokens, ...missing].join(", ")
            }
          }
        }
        const existingStyle = document.getElementById(maiaStyles.styleId)
        if (existingStyle) {
          if (existingStyle.textContent !== maiaStyles.css) {
            existingStyle.textContent = maiaStyles.css
          }
          document.documentElement.classList.add(MAIA_CLASS)
          return true
        }
        const style = document.createElement("style")
        style.id = maiaStyles.styleId
        style.textContent = maiaStyles.css
        styleTarget.append(style)
        document.documentElement.classList.add(MAIA_CLASS)
        return true
      } catch {
        return false
      }
    }

    // src/4khdhub/config.js
    const CONFIG = Object.freeze({
      themeColor: "#0a0a0a",
      seriesSelectPopupMaxHeightPx: 352,
      seriesSelectViewportInsetPx: 8,
      seriesSelectSideOffsetPx: 4,
      seriesSelectScrollControlHeightPx: 24,
      filenameClampLines: 2,
      mobileFilenameClampLines: 3,
      filenameLineHeight: 1.45,
      filenameMeasureBatchSize: 4,
      filenameMeasureRootMargin: "240px 0px",
      pageDiscoveryTimeoutMs: 4e3,
      pageLoaderTimeoutMs: 4e3,
      mobileLayoutBreakpointRem: 52,
      mobileQualityStickyTopPx: 8,
      mobileQualityScrollBehavior: "smooth",
      mobileCompactQualityBreakpointRem: 17,
      mobileCompactQualityTabPaddingInlinePx: 8,
      mobileDetailSectionGapRem: 0.75,
      mobileQualityVerticalGapRem: 0.75,
      mobileSearchDialogInsetPx: 12,
      mobileMenuWidth: "280px",
      mobileMenuPopoverId: "userpatch-mobile-menu",
      mobileNavigationWidth: "260px",
      ongoingPosterSessionKey: "userpatch-4khdhub-ongoing-poster-path",
      storageKeys: Object.freeze({
        detailTab: "userpatch-4khdhub-detail-tab",
        movieQualityTab: "userpatch-4khdhub-quality-tab",
        seriesArchiveQualityTab: "userpatch-4khdhub-series-archive-quality-tab",
        seriesTab: "userpatch-4khdhub-series-tab",
        seriesQuality: "userpatch-4khdhub-series-quality",
        seriesSeasonPrefix: "userpatch-4khdhub-season:",
        openedReleases: "userpatch-4khdhub-opened-releases",
      }),
      mobileNavigationItems: Object.freeze([
        Object.freeze(["/", "Home", "house"]),
        Object.freeze(["menu", "Menu", "menu"]),
        Object.freeze(["search", "Search", "search"]),
      ]),
    })
    const STYLE_ID = "userpatch-4khdhub-maia-style"
    const FONT_STYLE_ID = "userpatch-4khdhub-inter-font"
    const COLOR_SCHEME_META_ID = "userpatch-4khdhub-color-scheme"
    const THEME_COLOR_META_ID = "userpatch-4khdhub-theme-color"
    const NAV_INDICATOR_CLASS = "userpatch-nav-indicator"

    // src/shared/detail-info.js
    const createDetailInfoList = (entries) => {
      const list = document.createElement("dl")
      list.className = "userpatch-info-list"
      list.id = "userpatch-detail-info-list"
      const seen = new Set()
      for (const [label, rawValue] of entries) {
        const value = (rawValue || "").trim().replaceAll(/\s+/g, " ")
        if (!value || seen.has(label)) {
          continue
        }
        seen.add(label)
        const term = document.createElement("dt")
        term.textContent = `${label}:`
        const description = document.createElement("dd")
        description.textContent = value
        list.append(term, description)
      }
      return list
    }
    const DETAIL_INFO_CSS = `
html.userpatch-maia.userpatch-detail-page body .userpatch-detail-info {
  container: detail-info / inline-size;
  margin: 0 !important;
  padding: 0 !important;
  border: 0 !important;
  background: transparent !important;
  box-shadow: none !important;
}

html.userpatch-maia.userpatch-detail-page body .userpatch-detail-info #userpatch-detail-info-list {
  display: grid;
  grid-template-columns: max-content minmax(0, 1fr);
  align-items: baseline;
  gap: 0.65rem 0.5rem;
  margin: 0;
  padding: 0;
  font-family: "Inter Variable", ui-sans-serif, system-ui, sans-serif !important;
  font-style: normal !important;
  font-size: 14px !important;
  line-height: 1.45;
  text-align: start;
}
html.userpatch-maia.userpatch-detail-page body .userpatch-detail-info #userpatch-detail-info-list > dt {
  margin: 0;
  padding: 0;
  font-family: inherit !important;
  font-style: normal !important;
  font-size: inherit !important;
  line-height: inherit !important;
  font-weight: 400 !important;
  color: var(--maia-foreground) !important;
  -webkit-text-fill-color: currentColor !important;
}
html.userpatch-maia.userpatch-detail-page body .userpatch-detail-info #userpatch-detail-info-list > dd {
  min-inline-size: 0;
  margin: 0;
  padding: 0;
  font-family: inherit !important;
  font-style: normal !important;
  font-size: inherit !important;
  line-height: inherit !important;
  font-weight: 400 !important;
  color: var(--maia-muted-foreground) !important;
  -webkit-text-fill-color: currentColor !important;
  overflow-wrap: anywhere;
}
/* The site's late label formatter inserts styled spans into our terms.
   Keep their text consistent with the term even after that formatter runs. */
html.userpatch-maia.userpatch-detail-page body .userpatch-detail-info #userpatch-detail-info-list > :is(dt, dd) :where(*) {
  color: inherit !important;
  -webkit-text-fill-color: currentColor !important;
  font-family: inherit !important;
  font-size: inherit !important;
  font-style: inherit !important;
  font-weight: inherit !important;
  line-height: inherit !important;
}
@media (min-width: 761px) {
  html.userpatch-maia.userpatch-detail-page body .userpatch-detail-info #userpatch-detail-info-list {
    font-size: 18px !important;
  }
}
@container detail-info (max-width: 36rem) {
  html.userpatch-maia.userpatch-detail-page body .userpatch-detail-info #userpatch-detail-info-list {
    grid-template-columns: minmax(0, 1fr);
    row-gap: 0.25rem;
  }
  html.userpatch-maia.userpatch-detail-page body .userpatch-detail-info #userpatch-detail-info-list > dd:not(:last-child) {
    margin-block-end: 0.875rem;
  }
}
html.userpatch-maia .userpatch-mode-tab svg,
html.userpatch-maia.userpatch-detail-page .userpatch-detail-tabs .userpatch-quality-tab svg {
  width: 1rem !important;
  height: 1rem !important;
  inline-size: 1rem !important;
  block-size: 1rem !important;
  flex: 0 0 1rem !important;
}
`

    // src/shared/trailer.js
    const findTrailerUrl = (root) => {
      const candidate =
        root.querySelector("[data-trailer-url]")?.dataset.trailerUrl
      const links = Array.from(root.querySelectorAll("a[href]"))
        .filter((link) => /trailer/i.test(link.textContent))
        .map((link) => link.href)
      const frames = Array.from(root.querySelectorAll("iframe[src]")).map(
        (frame) => frame.getAttribute("src")
      )
      for (const source of [candidate, ...links, ...frames]) {
        try {
          const url = new URL(source, location.href)
          let id = ""
          if (
            /^(www\.)?(youtube\.com|youtube-nocookie\.com)$/.test(url.hostname)
          ) {
            id =
              url.searchParams.get("v") ||
              url.pathname.match(/^\/(?:embed|shorts)\/([^/]+)/)?.[1] ||
              ""
          } else if (url.hostname === "youtu.be") {
            id = url.pathname.slice(1)
          }
          if (/^[\w-]{11}$/.test(id)) {
            return `https://www.youtube-nocookie.com/embed/${id}`
          }
          if (/^(?:player\.)?vimeo\.com$/.test(url.hostname)) {
            const video = url.pathname.match(/^\/(?:video\/)?(\d+)\/?$/)?.[1]
            if (video) {
              return `https://player.vimeo.com/video/${video}`
            }
          }
        } catch {}
      }
      return null
    }
    const createTrailer = (url) => {
      if (!url) {
        return null
      }
      const section = document.createElement("div")
      section.className = "userpatch-trailer"
      const frame = document.createElement("div")
      frame.className = "userpatch-trailer-frame"
      const player = document.createElement("iframe")
      player.src = url
      player.title = "Trailer"
      player.loading = "lazy"
      player.allow = "encrypted-media; fullscreen; picture-in-picture"
      player.allowFullscreen = true
      player.referrerPolicy = "strict-origin-when-cross-origin"
      frame.append(player)
      section.append(frame)
      return section
    }
    const TRAILER_CSS = `
html.userpatch-maia .userpatch-detail-info .userpatch-trailer {
  display: block;
  inline-size: 100%;
  margin: 1.5rem 0 0 !important;
  padding: 0 !important;
  border: 0 !important;
  border-radius: 0 !important;
  background: transparent !important;
  box-shadow: none !important;
}
@media (min-width: 52.01rem) {
  html.userpatch-maia .userpatch-detail-info .userpatch-trailer {
    max-inline-size: 640px;
  }
}
html.userpatch-maia .userpatch-trailer-frame {
  aspect-ratio: 16 / 9;
  inline-size: 100%;
  overflow: clip;
  border: 0 !important;
  box-shadow: none !important;
  border-radius: 1rem;
  background: var(--maia-card);
}
html.userpatch-maia .userpatch-trailer-frame > iframe {
  display: block !important;
  position: static !important;
  inline-size: 100% !important;
  block-size: 100% !important;
  margin: 0 !important;
  padding: 0 !important;
  border: 0 !important;
}
`

    // src/4khdhub/css.js
    const MAIA_CSS = `
html.userpatch-maia {
  --background: 0 0% 3.94%;
  --foreground: 0 0% 98.03%;
  --card: 0 0% 9.05%;
  --card-foreground: 0 0% 98.03%;
  --popover: 0 0% 9.05%;
  --popover-foreground: 0 0% 98.03%;
  --primary: 0 0% 89.82%;
  --primary-foreground: 0 0% 9.05%;
  --secondary: 0 0% 14.94%;
  --secondary-foreground: 0 0% 98.03%;
  --muted: 0 0% 14.94%;
  --muted-foreground: 0 0% 63.02%;
  --accent: 0 0% 14.94%;
  --accent-foreground: 0 0% 98.03%;
  --destructive: 358.7 100% 69.6%;
  --border: 0 0% 100% / 10%;
  --input: 0 0% 100% / 15%;
  --ring: 0 0% 45.15%;
  --sidebar: 0 0% 9.05%;
  --sidebar-foreground: 0 0% 98.03%;
  --sidebar-primary: 225.3 84.1% 49%;
  --sidebar-primary-foreground: 0 0% 98.03%;
  --sidebar-accent: 0 0% 14.94%;
  --sidebar-accent-foreground: 0 0% 98.03%;
  --sidebar-border: 0 0% 100% / 10%;
  --sidebar-ring: 0 0% 45.15%;
  --maia-background: oklch(0.145 0 0);
  --maia-gutter: clamp(0.75rem, 1.5vw, 1rem);
  --maia-foreground: oklch(0.985 0 0);
  --maia-card: oklch(0.205 0 0);
  --maia-card-foreground: oklch(0.985 0 0);
  --maia-popover: oklch(0.205 0 0);
  --maia-popover-foreground: oklch(0.985 0 0);
  --maia-primary: oklch(0.922 0 0);
  --maia-primary-foreground: oklch(0.205 0 0);
  --maia-secondary: oklch(0.269 0 0);
  --maia-secondary-foreground: oklch(0.985 0 0);
  --maia-muted: oklch(0.269 0 0);
  --maia-muted-foreground: oklch(0.708 0 0);
  --maia-accent: oklch(0.269 0 0);
  --maia-accent-foreground: oklch(0.985 0 0);
  --maia-destructive: oklch(0.704 0.191 22.216);
  --maia-border: oklch(1 0 0 / 10%);
  --maia-input: oklch(1 0 0 / 15%);
  --maia-ring: oklch(0.556 0 0);
  --maia-ongoing-orange: #ff931e;
  --maia-ongoing-gold: #ffd27a;
  --maia-ongoing-deep-orange: #f97316;
  --maia-opened-blue: oklch(0.58 0.2 250);
  --ease-out: cubic-bezier(0.23, 1, 0.32, 1);
  --ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);
  --ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);
  --maia-radius: 0.625rem;
  --maia-card-depth-shadow: inset 0 1px 2px rgb(255 255 255 / 0.09),
    0 2px 4px rgb(0 0 0 / 0.5), 0 4px 8px rgb(0 0 0 / 0.3);
  --maia-radius-xl: calc(var(--maia-radius) * 1.4);
  --maia-radius-2xl: calc(var(--maia-radius) * 1.8);
  --maia-radius-4xl: calc(var(--maia-radius) * 2.6);
  --detail-bg: var(--maia-background);
  --detail-bg-2: var(--maia-muted);
  --detail-panel: var(--maia-card);
  --detail-panel-2: var(--maia-muted);
  --detail-panel-hover: var(--maia-accent);
  --detail-border: var(--maia-border);
  --detail-border-strong: var(--maia-border);
  --detail-text: var(--maia-foreground);
  --detail-soft: var(--maia-muted-foreground);
  --detail-muted: var(--maia-muted-foreground);
  --detail-accent: var(--maia-primary);
  --detail-accent-soft: var(--maia-secondary);
  --detail-green: var(--maia-secondary-foreground);
  --detail-teal: var(--maia-secondary-foreground);
  --detail-blue: var(--maia-secondary-foreground);
  --detail-file-blue: var(--maia-border);
  color-scheme: dark;
}

html.userpatch-maia {
  -webkit-tap-highlight-color: transparent;
  -webkit-text-size-adjust: 100%;
}

html.userpatch-maia button,
html.userpatch-maia [role="button"],
html.userpatch-maia .btn,
html.userpatch-maia .nav-link,
html.userpatch-maia .search-toggle,
html.userpatch-maia .theme-toggle,
html.userpatch-maia .menu-toggle,
html.userpatch-maia .userpatch-mobile-nav-item,
html.userpatch-maia .userpatch-quality-tab,
html.userpatch-maia .userpatch-quality-filter,
html.userpatch-maia .userpatch-season-trigger,
html.userpatch-maia .userpatch-season-item,
html.userpatch-maia .userpatch-season-scroll-control,
html.userpatch-maia .userpatch-provider-link,
html.userpatch-maia .userpatch-mobile-menu-link,
html.userpatch-maia .userpatch-mobile-menu-summary,
html.userpatch-maia .userpatch-mobile-menu-close {
  touch-action: manipulation;
  user-select: none;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
}

@media (pointer: coarse) {
  html.userpatch-maia input,
  html.userpatch-maia textarea,
  html.userpatch-maia select {
    font-size: 16px !important;
  }
}

html.userpatch-maia,
html.userpatch-maia body {
  color: var(--maia-foreground) !important;
  font-size: 1rem !important;
  line-height: 1.5;
  overscroll-behavior-x: auto;
  overscroll-behavior-y: none;
  font-family: "Inter Variable", ui-sans-serif, system-ui, -apple-system,
    BlinkMacSystemFont, "Segoe UI", sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

html.userpatch-maia,
html.userpatch-maia body,
html.userpatch-maia :where(*) {
  scrollbar-width: none !important;
  -ms-overflow-style: none !important;
}

html.userpatch-maia::-webkit-scrollbar,
html.userpatch-maia body::-webkit-scrollbar,
html.userpatch-maia :where(*)::-webkit-scrollbar {
  display: none !important;
  inline-size: 0 !important;
  block-size: 0 !important;
}

/* The site loads smaller utility classes after this userscript stylesheet. */
html.userpatch-maia[data-detail-theme] body :not(
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  svg,
  .userpatch-mobile-nav-item,
  .userpatch-release-file-title,
  .userpatch-release-file-text
) {
  font-size: 1rem !important;
}

html.userpatch-maia body :where(.text-xs, .text-sm, .small, small) {
  font-size: 1rem !important;
}

html.userpatch-maia #swup,
html.userpatch-maia main {
  color: var(--maia-foreground) !important;
}

html.userpatch-maia,
html.userpatch-maia body,
html.userpatch-maia #swup,
html.userpatch-maia main {
  transition: none !important;
}

html.userpatch-maia body,
html.userpatch-maia main {
  background: var(--maia-background) !important;
}

html.userpatch-maia #swup,
html.userpatch-maia .page-container,
html.userpatch-maia .content-grid,
html.userpatch-maia .content-sidebar,
html.userpatch-maia .content-main,
html.userpatch-maia .content-section,
html.userpatch-maia .series-tab-content {
  background: transparent !important;
  background-image: none !important;
  box-shadow: none !important;
  color: var(--maia-foreground) !important;
}

html.userpatch-maia .page-container {
  inline-size: 100%;
  max-inline-size: 88rem !important;
  margin-inline: auto;
  padding: var(--maia-gutter) !important;
  padding-block-end: clamp(4rem, 8vw, 6rem) !important;
}

html.userpatch-maia .container {
  inline-size: 100%;
  max-inline-size: 88rem !important;
  margin-inline: auto;
  padding-inline: var(--maia-gutter) !important;
}

html.userpatch-maia .content-grid.container {
  inline-size: 100%;
  max-inline-size: none !important;
  grid-template-columns: minmax(14rem, 22rem) minmax(0, 1fr);
  align-items: start;
  gap: clamp(1.5rem, 3vw, 3rem);
  padding-inline: 0 !important;
}

html.userpatch-maia .content-sidebar {
  display: block;
  inline-size: auto;
  min-inline-size: 0;
}

html.userpatch-maia .poster-container {
  inline-size: min(100%, 22rem);
  max-inline-size: 22rem;
  margin-inline: auto;
  padding: 0 !important;
  overflow: hidden;
  border: 1px solid var(--maia-border) !important;
  border-radius: var(--maia-radius) !important;
  background: transparent !important;
  box-shadow: none !important;
}

html.userpatch-maia .poster-image {
  overflow: hidden;
  border-radius: inherit;
}

html.userpatch-maia .poster-image img {
  display: block;
  inline-size: 100%;
  block-size: auto;
  aspect-ratio: 2 / 3;
  object-fit: cover;
}

html.userpatch-maia .content-main {
  min-inline-size: 0;
  padding-inline-start: 0 !important;
}

html.userpatch-maia header.sticky {
  inset-block-start: 3rem;
  border: 0 !important;
  background: transparent !important;
  box-shadow: none !important;
  transition: none !important;
  margin-block: 2.5rem;
  padding-block: 0;
}

html.userpatch-maia header.sticky > .header {
  position: relative;
  display: flex;
  inline-size: fit-content;
  max-inline-size: calc(100% - 1.5rem);
  block-size: 3.75rem !important;
  min-block-size: 3.75rem !important;
  box-sizing: border-box;
  align-items: center;
  isolation: isolate;
  margin-inline: auto;
  overflow: visible;
  border: 0 !important;
  border-radius: 1.25rem !important;
  background: transparent !important;
  box-shadow: none !important;
  backdrop-filter: none !important;
  padding: 0.375rem;
}

html.userpatch-maia header.sticky > .header::before,
html.userpatch-maia.userpatch-detail-page .userpatch-quality-tabs::before,
html.userpatch-maia.userpatch-detail-page .userpatch-season-control::before,
html.userpatch-maia.userpatch-detail-page .userpatch-series-language-badge::before {
  position: absolute;
  z-index: -1;
  inset: 0;
  border-radius: inherit;
  background: color-mix(in oklch, var(--maia-background) 82%, transparent);
  box-shadow: var(--maia-glass-shadow, 0 10px 40px rgb(0 0 0 / 0.2));
  backdrop-filter: saturate(2.2) blur(16px);
  -webkit-backdrop-filter: saturate(2.2) blur(16px);
  content: "";
  pointer-events: none;
}

html.userpatch-maia header.sticky > .header::before,
html.userpatch-maia[data-detail-theme] header.sticky > .header::before,
html.userpatch-maia.userpatch-detail-page .userpatch-quality-tabs::before,
html.userpatch-maia.userpatch-detail-page[data-detail-theme] .userpatch-quality-tabs::before,
html.userpatch-maia.userpatch-detail-page .userpatch-season-control::before,
html.userpatch-maia.userpatch-detail-page[data-detail-theme] .userpatch-season-control::before,
html.userpatch-maia.userpatch-detail-page .userpatch-series-language-badge::before,
html.userpatch-maia.userpatch-detail-page[data-detail-theme] .userpatch-series-language-badge::before {
  background: var(--maia-control-surface, color-mix(in oklch, var(--maia-card) 60%, transparent));
}

html.userpatch-maia header.sticky > .header::after,
html.userpatch-maia.userpatch-detail-page .userpatch-quality-tabs::after,
html.userpatch-maia.userpatch-detail-page .userpatch-season-control::after,
html.userpatch-maia.userpatch-detail-page .userpatch-series-language-badge::after {
  position: absolute;
  z-index: 1;
  inset: 0;
  border-radius: inherit;
  box-shadow:
    inset 0.5px 0.5px var(--maia-foreground),
    inset 0.5px -0.5px var(--maia-foreground),
    inset -0.5px 0.5px var(--maia-foreground),
    inset -0.5px -0.5px var(--maia-foreground);
  opacity: var(--maia-control-border-opacity, 0.2);
  content: "";
  pointer-events: none;
}

html.userpatch-maia header.sticky > .header > .container {
  position: relative;
  z-index: 3;
  display: flex;
  inline-size: fit-content !important;
  max-inline-size: 100%;
  block-size: 3rem;
  min-block-size: 3rem;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  isolation: isolate;
  margin: 0;
  padding: 0 !important;
}

html.userpatch-maia header.sticky > .header > .container > .flex {
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  margin: 0 !important;
  padding: 0 !important;
  gap: 0 !important;
}

html.userpatch-maia header.sticky > .header > .container > .flex:last-child {
  margin-inline-end: 0 !important;
  padding-inline-end: 0 !important;
}

html.userpatch-maia header.sticky > .header > .container > .flex:last-child > :not(#search-toggle) {
  display: none !important;
}

html.userpatch-maia .navbar-brand img {
  display: block;
  max-block-size: 2.25rem;
  inline-size: auto;
}

html.userpatch-maia .navbar-brand .userpatch-header-wordmark {
  display: block;
  inline-size: 6.375rem;
  block-size: auto;
  max-block-size: 2.25rem;
  object-fit: contain;
  color: var(--maia-foreground) !important;
  filter: none !important;
  opacity: 1 !important;
  transition: none !important;
}

html.userpatch-maia header.sticky .navbar-brand:hover img,
html.userpatch-maia header.sticky .navbar-brand:active img,
html.userpatch-maia header.sticky .navbar-brand:focus-visible img {
  filter: none !important;
  opacity: 1 !important;
}

html.userpatch-maia header.sticky .navbar-brand,
html.userpatch-maia header.sticky #search-toggle {
  position: relative;
  z-index: 1;
  display: inline-flex;
  block-size: 3rem;
  min-block-size: 3rem;
  align-items: center;
  justify-content: center;
  border: 0 !important;
  border-radius: 0.875rem !important;
  background: transparent !important;
  color: var(--maia-foreground) !important;
  transition:
    transform 140ms var(--ease-out),
    color 140ms var(--ease-out);
}

html.userpatch-maia header.sticky .navbar-brand {
  min-inline-size: 3rem;
  padding-inline: 0.375rem;
}

html.userpatch-maia header.sticky #menu-toggle,
html.userpatch-maia header.sticky #search-toggle {
  inline-size: 3rem;
  min-inline-size: 3rem;
  block-size: 3rem;
  min-block-size: 3rem;
  margin: 0 !important;
  padding: 0 !important;
  cursor: pointer;
}

html.userpatch-maia header.sticky #menu-toggle {
  position: relative;
  z-index: 1;
  border: 0 !important;
  border-radius: 0.875rem !important;
  background: transparent !important;
  color: var(--maia-foreground) !important;
}

html.userpatch-maia header.sticky .search-container,
html.userpatch-maia header.sticky #theme-toggle {
  display: none !important;
}

html.userpatch-maia header.sticky .nav-list > .nav-item {
  position: relative;
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
}

html.userpatch-maia header.sticky .nav-list > .nav-item.dropdown:hover,
html.userpatch-maia header.sticky .nav-list > .nav-item.dropdown:focus-within {
  z-index: 20;
}

html.userpatch-maia .nav-list {
  position: relative;
  display: flex;
  inline-size: max-content;
  align-items: center;
  flex-wrap: nowrap;
  gap: 0.1875rem;
  list-style: none;
  overflow: visible;
  border: 0 !important;
  background: transparent !important;
  padding: 0 !important;
  isolation: isolate;
}

html.userpatch-maia header.sticky .nav-list > li:has(> .nav-link[href="/"]) {
  display: none !important;
}

html.userpatch-maia .nav-link {
  color: var(--maia-foreground) !important;
}

html.userpatch-maia .breadcrumb,
html.userpatch-maia .breadcrumb a {
  color: var(--maia-muted-foreground) !important;
}

html.userpatch-maia footer {
  display: none !important;
}

html.userpatch-maia header.sticky .nav-link {
  position: relative;
  z-index: 1;
  display: inline-flex;
  min-block-size: 3rem;
  block-size: auto !important;
  align-items: center;
  justify-content: center;
  gap: 0.375rem;
  padding: 0.625rem 1.125rem !important;
  border: 0 !important;
  border-radius: 0.875rem !important;
  background: transparent !important;
  color: var(--maia-foreground) !important;
  font-size: 1rem !important;
  font-weight: 500 !important;
  line-height: 1.25;
  text-decoration: none !important;
  transition:
    transform 140ms var(--ease-out),
    color 140ms var(--ease-out);
}

html.userpatch-maia header.sticky .nav-link .dropdown-indicator {
  flex: 0 0 1rem;
  inline-size: 1rem !important;
  block-size: 1rem !important;
  margin-inline-start: 0 !important;
  margin-inline-end: -0.25rem !important;
}

html.userpatch-maia header.sticky .nav-link:hover,
html.userpatch-maia header.sticky .nav-link[aria-expanded="true"],
html.userpatch-maia .breadcrumb a:hover {
  background: transparent !important;
  color: var(--maia-foreground) !important;
}

html.userpatch-maia header.sticky .nav-link:focus-visible,
html.userpatch-maia header.sticky #menu-toggle:focus-visible,
html.userpatch-maia header.sticky #search-toggle:focus-visible {
  outline: 2px solid var(--maia-ring) !important;
  outline-offset: -2px;
}

html.userpatch-maia .userpatch-nav-indicator {
  position: absolute;
  z-index: 0;
  inset: 0;
  display: block;
  inline-size: 6.25rem;
  block-size: 2.75rem;
  border-radius: var(--userpatch-nav-radius-x, 0.875rem) /
    var(--userpatch-nav-radius-y, 0.875rem);
  background: var(--maia-selection-bg, color-mix(in oklch, var(--maia-foreground) 9%, transparent));
  box-shadow: var(--maia-selection-shadow, inset 0 1px 2px color-mix(in oklch, var(--maia-foreground) 12%, transparent));
  opacity: 0;
  pointer-events: none;
  transform: translate3d(
      var(--userpatch-nav-x, 0px),
      var(--userpatch-nav-y, 0px),
      0
    )
    scale(var(--userpatch-nav-scale-x, 1), var(--userpatch-nav-scale-y, 1));
  transform-origin: left top;
  transition: opacity 160ms var(--ease-out);
}

html.userpatch-maia .userpatch-nav-indicator[data-ready="true"] {
  opacity: 1;
}

html.userpatch-maia .userpatch-nav-indicator[data-animate="true"] {
  transition:
    transform 240ms cubic-bezier(0.77, 0, 0.175, 1),
    opacity 160ms var(--ease-out);
}

html.userpatch-maia .main-nav {
  background: transparent !important;
  backdrop-filter: none !important;
  transition: none !important;
}

@media (min-width: 46.01rem) {
  html.userpatch-maia header.sticky #main-nav {
    margin-inline-start: 0 !important;
  }

  html.userpatch-maia header.sticky #main-nav .nav-list > .nav-item:nth-child(2) > .nav-link {
    padding-inline-start: 0.75rem !important;
    padding-inline-end: 0.75rem !important;
  }
}

html.userpatch-maia .main-nav.open {
  background: var(--maia-card) !important;
  box-shadow: none !important;
  backdrop-filter: none !important;
}

html.userpatch-maia .dropdown-menu {
  position: absolute;
  z-index: 50 !important;
  padding: 0.25rem !important;
  border: 0 !important;
  border-radius: var(--maia-radius-2xl) !important;
  background: var(--maia-popover) !important;
  color: var(--maia-popover-foreground) !important;
  box-shadow:
    0 25px 50px -12px rgb(0 0 0 / 0.25),
    0 0 0 1px color-mix(in oklch, var(--maia-foreground) 10%, transparent) !important;
  backdrop-filter: none !important;
}

/* The site's mobile dropdown removes its fill and only blurs the page behind it. */
html.userpatch-maia header.sticky #main-nav .dropdown-menu,
html.userpatch-maia header.sticky #main-nav .dropdown-menu.open {
  position: absolute;
  z-index: 50 !important;
  background-color: var(--maia-popover) !important;
  background-image: none !important;
  color: var(--maia-popover-foreground) !important;
  opacity: 1 !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
}

html.userpatch-maia .dropdown-item {
  display: flex;
  min-block-size: 2.25rem;
  align-items: center;
  padding: 0.5rem 0.75rem !important;
  border-radius: var(--maia-radius-xl) !important;
  color: var(--maia-popover-foreground) !important;
  font-size: 1rem;
  font-weight: 400;
}

html.userpatch-maia .dropdown-item:focus-visible {
  background: var(--maia-muted) !important;
  color: var(--maia-foreground) !important;
}

@media (hover: hover) and (pointer: fine) {
  html.userpatch-maia .dropdown-item:hover {
    background: var(--maia-muted) !important;
    color: var(--maia-foreground) !important;
  }
}

html.userpatch-maia .dropdown-item:active {
  background: var(--maia-accent) !important;
  color: var(--maia-foreground) !important;
}

html.userpatch-maia a:focus-visible,
html.userpatch-maia button:focus-visible,
html.userpatch-maia summary:focus-visible,
html.userpatch-maia [role="button"]:focus-visible {
  outline: 1px solid var(--maia-ring) !important;
  outline-offset: 0;
  box-shadow: 0 0 0 3px color-mix(in oklch, var(--maia-ring) 50%, transparent) !important;
}

html.userpatch-maia button,
html.userpatch-maia input,
html.userpatch-maia select,
html.userpatch-maia textarea {
  font-family: inherit;
}

html.userpatch-maia .page-title {
  margin-block: 0 0.25rem !important;
  color: var(--maia-foreground) !important;
  font-size: clamp(2.25rem, 4vw, 3.5rem) !important;
  font-weight: 650 !important;
  letter-spacing: -0.045em !important;
  line-height: 1.05 !important;
  text-wrap: balance;
}

html.userpatch-maia .movie-tagline {
  margin-block: 0.5rem 1rem !important;
  color: var(--maia-muted-foreground) !important;
  font-size: 1rem !important;
  font-weight: 500 !important;
}

html.userpatch-maia .content-main > .mb-2 {
  margin-block-end: 1.5rem !important;
}

html.userpatch-maia .content-main > .mb-2 > .mt-2 {
  display: flex;
  max-inline-size: 68rem;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem !important;
  margin-block-start: 1rem !important;
}

html.userpatch-maia .content-main > .mb-2 > .mt-2 .badge,
html.userpatch-maia .content-main > .mb-2 > .mt-2 .badge-outline,
html.userpatch-maia .content-main > .mb-2 > .mt-2 .badge.badge-outline,
html.userpatch-maia .content-main > .mb-2 > .mt-2 .badge.badge-outline a {
  color: var(--maia-foreground) !important;
  background: color-mix(in oklch, var(--maia-input) 30%, transparent) !important;
  border: 1px solid var(--maia-border) !important;
  border-radius: var(--maia-radius-4xl) !important;
  box-shadow: none !important;
  text-shadow: none !important;
  font-size: 1rem !important;
  font-weight: 400 !important;
  line-height: 1.25;
}

html.userpatch-maia .content-main > .mb-2 > .mt-2 .badge {
  min-block-size: 1.25rem !important;
  padding: 0.125rem 0.5rem !important;
  border-radius: var(--maia-radius-4xl) !important;
}

html.userpatch-maia .imdb-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.125rem 0.5rem !important;
  border: 1px solid var(--maia-border) !important;
  border-radius: var(--maia-radius-4xl) !important;
  background: color-mix(in oklch, var(--maia-input) 30%, transparent) !important;
  color: var(--maia-foreground) !important;
  font-size: 1rem !important;
  font-weight: 400 !important;
  line-height: 1.25 !important;
}

html.userpatch-maia .imdb-badge .imdb-logo {
  padding: 0 !important;
  border-radius: 0;
  background: transparent !important;
  color: inherit !important;
  font-size: 1rem !important;
  font-weight: 400 !important;
  line-height: 1.25 !important;
}

html.userpatch-maia .imdb-badge .imdb-score {
  padding: 0 !important;
  color: var(--maia-foreground) !important;
  font-size: 1rem !important;
  font-weight: 400 !important;
  line-height: 1.25 !important;
}

html.userpatch-maia .content-main > .mb-2 > p.mt-2 {
  margin-block-start: 0.75rem !important;
  color: var(--maia-muted-foreground) !important;
  font-size: 1rem !important;
  font-weight: 500 !important;
}

html.userpatch-maia .content-section > p,
html.userpatch-maia .detail-description {
  max-inline-size: 72ch;
  color: var(--maia-muted-foreground) !important;
  font-size: 1rem !important;
  line-height: 1.7 !important;
}

html.userpatch-maia .metadata-list {
  box-sizing: border-box;
  display: grid;
  gap: 0;
  overflow: hidden;
  margin-block-start: 1.25rem !important;
  padding: 1.5rem !important;
  border: 0 !important;
  border-radius: var(--maia-radius-2xl) !important;
  background: var(--maia-card) !important;
  color: var(--maia-card-foreground) !important;
  box-shadow: 0 0 0 1px color-mix(in oklch, var(--maia-foreground) 10%, transparent) !important;
}

html.userpatch-maia .detail-info-box {
  padding: 1.5rem !important;
  border: 0 !important;
  border-radius: var(--maia-radius-2xl) !important;
  background: var(--maia-card) !important;
  color: var(--maia-card-foreground) !important;
  box-shadow: 0 0 0 1px color-mix(in oklch, var(--maia-foreground) 10%, transparent) !important;
}

html.userpatch-maia .metadata-item {
  display: grid !important;
  grid-template-columns: minmax(7rem, 9rem) minmax(0, 1fr) !important;
  align-items: start;
  gap: 0.5rem 1.25rem !important;
  margin: 0 !important;
  padding: 0.625rem 0 !important;
  border: 0 !important;
  border-bottom: 1px solid var(--maia-border) !important;
  background: transparent !important;
}

html.userpatch-maia .metadata-item:last-child {
  border-bottom: 0 !important;
}

html.userpatch-maia .metadata-label {
  color: var(--maia-muted-foreground) !important;
  font-size: 1rem !important;
  font-weight: 600 !important;
  letter-spacing: 0.035em;
  text-transform: uppercase;
}

html.userpatch-maia .metadata-value {
  color: var(--maia-foreground) !important;
  font-size: 1rem !important;
  line-height: 1.55;
}

html.userpatch-maia .metadata-token,
html.userpatch-maia .metadata-item[data-meta-kind] .metadata-token {
  display: inline-flex;
  min-block-size: 1.25rem;
  align-items: center;
  padding: 0.125rem 0.5rem !important;
  border: 1px solid var(--maia-border) !important;
  border-radius: var(--maia-radius-4xl) !important;
  background: color-mix(in oklch, var(--maia-input) 30%, transparent) !important;
  color: var(--maia-foreground) !important;
  font-size: 1rem !important;
  font-weight: 400 !important;
  line-height: 1.2;
}

html.userpatch-maia .section-title {
  margin-block: 1.75rem 1rem !important;
  padding-block-end: 0.75rem;
  border-bottom: 1px solid var(--maia-border);
  color: var(--maia-foreground) !important;
  font-size: 1.25rem !important;
  font-weight: 600 !important;
  letter-spacing: -0.02em !important;
}

html.userpatch-maia .section-title::before {
  display: none !important;
}

html.userpatch-maia #play-btn,
html.userpatch-maia #trailer-btn,
html.userpatch-maia .btn,
html.userpatch-maia button.btn,
html.userpatch-maia .search-submit,
html.userpatch-maia .up-download-link {
  display: inline-flex;
  min-block-size: 2.25rem;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem !important;
  border: 1px solid var(--maia-border) !important;
  border-radius: var(--maia-radius-4xl) !important;
  background: var(--maia-primary) !important;
  color: var(--maia-primary-foreground) !important;
  box-shadow: none !important;
  text-shadow: none !important;
  font-size: 1rem !important;
  font-weight: 500 !important;
  line-height: 1.25;
  text-decoration: none;
  transition:
    transform 140ms var(--ease-out),
    background-color 150ms ease,
    color 150ms ease,
    border-color 150ms ease;
}

@media (hover: hover) and (pointer: fine) {
  html.userpatch-maia #play-btn:hover,
  html.userpatch-maia #trailer-btn:hover,
  html.userpatch-maia .btn:hover,
  html.userpatch-maia button.btn:hover,
  html.userpatch-maia .search-submit:hover,
  html.userpatch-maia .up-download-link:hover {
    border-color: var(--maia-ring) !important;
    background: var(--maia-accent) !important;
    color: var(--maia-accent-foreground) !important;
  }
}

html.userpatch-maia #play-btn:active,
html.userpatch-maia #trailer-btn:active,
html.userpatch-maia .btn:active,
html.userpatch-maia button.btn:active,
html.userpatch-maia .search-submit:active,
html.userpatch-maia .up-download-link:active {
  transform: scale(0.97);
  background: var(--maia-accent) !important;
}

html.userpatch-maia #play-btn svg,
html.userpatch-maia #trailer-btn svg {
  inline-size: 1rem;
  block-size: 1rem;
  fill: currentColor !important;
  stroke: currentColor !important;
}

html.userpatch-maia .search-toggle,
html.userpatch-maia .theme-toggle,
html.userpatch-maia .menu-toggle {
  display: inline-flex;
  inline-size: 2.25rem;
  block-size: 2.25rem;
  align-items: center;
  justify-content: center;
  padding: 0 !important;
  border: 1px solid transparent !important;
  border-radius: var(--maia-radius-4xl) !important;
  background: transparent !important;
  color: var(--maia-foreground) !important;
  transition:
    transform 140ms var(--ease-out),
    background-color 140ms ease,
    border-color 140ms ease;
}

@media (hover: hover) and (pointer: fine) {
  html.userpatch-maia .search-toggle:hover,
  html.userpatch-maia .theme-toggle:hover,
  html.userpatch-maia .menu-toggle:hover {
    border-color: var(--maia-border) !important;
    background: var(--maia-muted) !important;
  }
}

html.userpatch-maia .search-toggle:active,
html.userpatch-maia .theme-toggle:active,
html.userpatch-maia .menu-toggle:active {
  transform: scale(0.96);
  background: var(--maia-muted) !important;
}

html.userpatch-maia #close-mobile-menu,
html.userpatch-maia #close-search {
  display: inline-flex;
  inline-size: 2.25rem;
  block-size: 2.25rem;
  align-items: center;
  justify-content: center;
  padding: 0 !important;
  border: 1px solid var(--maia-border) !important;
  border-radius: var(--maia-radius-4xl) !important;
  background: var(--maia-card) !important;
  color: var(--maia-foreground) !important;
  box-shadow: none !important;
  transition:
    transform 140ms var(--ease-out),
    background-color 140ms ease,
    border-color 140ms ease;
}

@media (hover: hover) and (pointer: fine) {
  html.userpatch-maia #close-mobile-menu:hover,
  html.userpatch-maia #close-search:hover {
    background: var(--maia-muted) !important;
  }
}

html.userpatch-maia #close-mobile-menu:active,
html.userpatch-maia #close-search:active {
  transform: scale(0.96);
  background: var(--maia-muted) !important;
}

html.userpatch-maia #search-overlay {
  display: none !important;
}

html.userpatch-maia dialog.userpatch-search-dialog[open] {
  position: fixed;
  inset-block-start: 50%;
  inset-inline-start: 50%;
  display: flex;
  inline-size: min(45rem, calc(100vw - 2rem));
  max-inline-size: none;
  max-block-size: calc(100dvh - 2rem);
  margin: 0;
  padding: 0;
  overflow: visible;
  transform: translate(-50%, -50%) scale(1);
  opacity: 1;
  border: 0;
  background: transparent;
  color: var(--maia-foreground);
  transition:
    transform 160ms var(--ease-out),
    opacity 160ms var(--ease-out);
}

@starting-style {
  html.userpatch-maia dialog.userpatch-search-dialog[open] {
    transform: translate(-50%, -50%) scale(0.96);
    opacity: 0;
  }
}

html.userpatch-maia dialog.userpatch-search-dialog::backdrop {
  overflow: hidden;
  background: rgb(0 0 0 / 80%);
  backdrop-filter: blur(2px);
  overscroll-behavior-x: auto;
  overscroll-behavior-y: contain;
  -webkit-backdrop-filter: blur(2px);
  transition: opacity 160ms var(--ease-out);
}

html.userpatch-maia dialog.userpatch-search-dialog:modal {
  overscroll-behavior-x: auto;
  overscroll-behavior-y: contain;
}

html.userpatch-maia dialog.userpatch-search-dialog .search-form {
  display: flex !important;
  flex: 1 1 auto;
  position: static !important;
  inline-size: 100%;
  max-inline-size: none;
  min-inline-size: 0;
  margin: 0 !important;
  padding: 0 !important;
  border: 0 !important;
  border-radius: 0 !important;
  background: transparent !important;
  box-shadow: none !important;
  animation: none !important;
}

html.userpatch-maia dialog.userpatch-search-dialog .search-input-container {
  display: flex !important;
  box-sizing: border-box;
  inline-size: 100%;
  min-inline-size: 0;
  block-size: 3.5rem;
  min-block-size: 3.5rem;
  align-items: center;
  gap: 0;
  margin: 0 !important;
  padding: 0 0.25rem 0 0;
  border: 1px solid rgb(255 255 255 / 20%) !important;
  border-radius: 20px !important;
  background: rgb(38 38 40 / 60%) !important;
  box-shadow: none !important;
  backdrop-filter: saturate(2.2) blur(16px);
  transition: border-color 140ms ease-out;
  -webkit-backdrop-filter: saturate(2.2) blur(16px);
}

html.userpatch-maia dialog.userpatch-search-dialog .search-input-container:has(
  .search-input-overlay:focus-visible
) {
  border-color: transparent !important;
  outline: 2px solid var(--maia-ring);
  outline-offset: 0;
}

html.userpatch-maia .userpatch-input-group-addon {
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  padding-inline-start: 1rem;
}

html.userpatch-maia dialog.userpatch-search-dialog .search-icon-overlay {
  position: static !important;
  flex: 0 0 1.25rem;
  inline-size: 1.25rem !important;
  block-size: 1.25rem !important;
  transform: none !important;
  color: #a1a1aa !important;
  pointer-events: none;
}

html.userpatch-maia dialog.userpatch-search-dialog .search-input-overlay {
  appearance: none;
  -webkit-appearance: none;
  flex: 1 1 auto;
  inline-size: auto !important;
  min-inline-size: 0;
  block-size: 100%;
  min-block-size: 0;
  padding: 0 0.75rem !important;
  border: 0 !important;
  border-radius: 0 !important;
  background: transparent !important;
  color: var(--maia-foreground) !important;
  font-family: inherit !important;
  font-size: 1.125rem !important;
  font-weight: 400 !important;
  line-height: 1.4 !important;
  box-shadow: none !important;
  outline: 0 !important;
}

html.userpatch-maia[data-detail-theme] dialog.userpatch-search-dialog .search-input-overlay {
  font-size: 1.125rem !important;
}

html.userpatch-maia dialog.userpatch-search-dialog .search-input-overlay::placeholder {
  color: #a1a1aa !important;
  font-size: inherit;
  opacity: 1;
}

html.userpatch-maia dialog.userpatch-search-dialog .search-input-overlay::-webkit-search-cancel-button {
  display: none;
}

html.userpatch-maia dialog.userpatch-search-dialog .search-submit[hidden] {
  display: none !important;
}

html.userpatch-maia #series-tabs {
  display: inline-flex;
  max-inline-size: 100%;
  flex-wrap: wrap;
  gap: 0;
  padding: 3px;
  border: 0 !important;
  border-radius: var(--maia-radius-4xl) !important;
  background: var(--maia-muted) !important;
}

html.userpatch-maia #series-tabs .series-tab {
  display: inline-flex;
  min-block-size: 2.25rem;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.45rem 0.875rem !important;
  border: 1px solid transparent !important;
  border-radius: var(--maia-radius-xl) !important;
  background: transparent !important;
  color: var(--maia-muted-foreground) !important;
  font-size: 1rem !important;
  font-weight: 500 !important;
  line-height: 1.25;
  cursor: pointer;
  transition: background-color 150ms ease, color 150ms ease,
    box-shadow 150ms ease;
}

html.userpatch-maia #series-tabs .series-tab.active {
  border-color: var(--maia-border) !important;
  background: var(--maia-background) !important;
  color: var(--maia-foreground) !important;
  box-shadow: none;
}

html.userpatch-maia #series-tabs .series-tab.active,
html.userpatch-maia[data-detail-theme] #series-tabs .series-tab.active {
  border-color: var(--maia-input) !important;
  background: color-mix(in oklch, var(--maia-input) 30%, transparent) !important;
}

html.userpatch-maia #series-tabs .series-tab svg {
  flex: 0 0 1rem;
  inline-size: 1rem !important;
  block-size: 1rem !important;
  color: currentColor !important;
  fill: currentColor !important;
  stroke: currentColor !important;
}

html.userpatch-maia #series-tabs .series-tab[data-tab="episodes"] .responsive-icon,
html.userpatch-maia #series-tabs .series-tab[data-tab="episodes"] .responsive-icon * {
  fill: none !important;
  stroke: currentColor !important;
}

html.userpatch-maia #series-tabs .series-tab svg * {
  fill: currentColor !important;
  stroke: currentColor !important;
}

html.userpatch-maia .series-tab-content > .section-title {
  margin-block-start: 0 !important;
}

html.userpatch-maia .series-season-groups,
html.userpatch-maia .download-groups {
  display: grid;
  gap: 1rem !important;
  border: 0 !important;
}

html.userpatch-maia .series-season-group {
  overflow: hidden;
  border: 1px solid var(--maia-border) !important;
  border-radius: var(--maia-radius-2xl) !important;
  background: var(--maia-card) !important;
  box-shadow: none !important;
}

html.userpatch-maia .series-season-toggle {
  display: grid;
  inline-size: 100%;
  min-block-size: 3.25rem;
  grid-template-columns: minmax(0, 1fr) auto 1.25rem;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem !important;
  border: 0 !important;
  border-radius: 0 !important;
  background: transparent !important;
  color: var(--maia-foreground) !important;
  text-align: start;
  cursor: pointer;
}

@media (hover: hover) and (pointer: fine) {
  html.userpatch-maia .series-season-toggle:hover {
    background: var(--maia-muted) !important;
  }
}

html.userpatch-maia .series-season-toggle:active {
  background: var(--maia-muted) !important;
}

html.userpatch-maia .series-season-toggle strong {
  font-size: 1rem;
  font-weight: 600;
}

html.userpatch-maia .series-season-toggle > span {
  display: inline-flex;
  min-block-size: 1.25rem;
  align-items: center;
  padding: 0.125rem 0.5rem;
  border: 1px solid var(--maia-border) !important;
  border-radius: var(--maia-radius-4xl);
  background: var(--maia-muted) !important;
  color: var(--maia-muted-foreground) !important;
  font-size: 1rem;
  font-weight: 500;
}

html.userpatch-maia .series-season-toggle .chevron-icon {
  inline-size: 1rem !important;
  block-size: 1rem !important;
  justify-self: end;
  padding: 0 !important;
  border: 0 !important;
  border-radius: 0 !important;
  background: transparent !important;
  color: var(--maia-muted-foreground) !important;
  fill: none !important;
  box-shadow: none !important;
}

html.userpatch-maia .series-season-toggle .chevron-icon path {
  fill: none !important;
  stroke: currentColor !important;
}

html.userpatch-maia .series-season-toggle[aria-expanded="true"] .chevron-icon {
  transform: rotate(180deg);
}

html.userpatch-maia .series-season-content {
  padding: 0 1rem 1rem !important;
  border-top: 0 !important;
  background: transparent !important;
}

html.userpatch-maia details.download-group {
  display: block !important;
  overflow: visible;
  border: 0 !important;
  border-bottom: 0 !important;
  border-radius: 0 !important;
  background: transparent !important;
  box-shadow: none !important;
}

html.userpatch-maia .download-group-title {
  display: flex !important;
  min-block-size: 3rem;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 0 !important;
  border: 0 !important;
  border-radius: 0 !important;
  background: transparent !important;
  color: var(--maia-foreground) !important;
  font-size: 1rem !important;
  font-weight: 500 !important;
  list-style: none;
  cursor: pointer;
  box-shadow: none !important;
}

html.userpatch-maia summary.download-group-title::-webkit-details-marker {
  display: none;
}

html.userpatch-maia summary.download-group-title::marker {
  content: "";
}

@media (hover: hover) and (pointer: fine) {
  html.userpatch-maia .download-group-title:hover {
    background: var(--maia-muted) !important;
  }
}

html.userpatch-maia .download-group-title:active {
  background: var(--maia-muted) !important;
}

html.userpatch-maia .download-group-title strong {
  display: flex;
  min-inline-size: 0;
  flex: 1 1 auto;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
}

html.userpatch-maia .download-group-title > span:last-of-type {
  display: inline-flex;
  min-block-size: 1.25rem;
  flex: 0 0 auto;
  align-items: center;
  padding: 0.125rem 0.5rem;
  border: 1px solid var(--maia-border) !important;
  border-radius: var(--maia-radius-4xl);
  background: var(--maia-muted) !important;
  color: var(--maia-muted-foreground) !important;
  font-size: 1rem;
  font-weight: 400;
  white-space: nowrap;
}

html.userpatch-maia .format-label,
html.userpatch-maia .format-source,
html.userpatch-maia .badge,
html.userpatch-maia .badge-outline,
html.userpatch-maia .badge-psa,
html.userpatch-maia .badge-size {
  border: 1px solid var(--maia-border) !important;
  border-radius: var(--maia-radius-4xl) !important;
  background: color-mix(in oklch, var(--maia-input) 30%, transparent) !important;
  color: var(--maia-foreground) !important;
  box-shadow: none !important;
  text-shadow: none !important;
  font-weight: 400 !important;
}

html.userpatch-maia .format-label,
html.userpatch-maia .format-source {
  display: inline-flex;
  min-block-size: 1.25rem;
  align-items: center;
  padding: 0.125rem 0.5rem;
  font-size: 1rem;
  line-height: 1.2;
}

html.userpatch-maia .up-format-chevron {
  inline-size: 1rem;
  block-size: 1rem;
  flex: 0 0 auto;
  color: var(--maia-muted-foreground) !important;
  fill: none !important;
  transition: transform 150ms var(--ease-out);
}

html.userpatch-maia .up-format-chevron path {
  fill: none !important;
  stroke: currentColor !important;
}

html.userpatch-maia details.download-group[open] > .download-group-title .up-format-chevron {
  transform: rotate(180deg);
}

html.userpatch-maia .up-table-wrapper {
  max-inline-size: 100%;
  overflow: auto;
  border-block-start: 1px solid var(--maia-border);
  background: transparent !important;
  scrollbar-gutter: stable;
  scrollbar-color: color-mix(in oklch, var(--maia-foreground) 35%, transparent)
    transparent;
}

html.userpatch-maia .up-table-wrapper:focus-visible {
  outline: 3px solid color-mix(in oklch, var(--maia-ring) 50%, transparent);
  outline-offset: -3px;
}

html.userpatch-maia .up-download-table {
  inline-size: 100%;
  min-inline-size: 42rem;
  border-collapse: collapse;
  background: transparent !important;
  color: var(--maia-foreground) !important;
  font-size: 1rem;
  text-align: start;
}

html.userpatch-maia .up-download-table caption {
  position: absolute;
  inline-size: 1px;
  block-size: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}

html.userpatch-maia .up-download-table thead {
  background: transparent !important;
}

html.userpatch-maia .up-download-table th,
html.userpatch-maia .up-download-table td {
  padding: 0.75rem 0.875rem;
  border-bottom: 1px solid var(--maia-border);
  text-align: start;
  vertical-align: middle;
}

html.userpatch-maia .up-download-table thead th {
  block-size: 3rem;
  color: var(--maia-muted-foreground) !important;
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: normal;
  text-transform: none;
  white-space: nowrap;
}

html.userpatch-maia .up-download-table tbody tr:last-child > * {
  border-bottom: 0;
}

@media (hover: hover) and (pointer: fine) {
  html.userpatch-maia .up-download-table tbody tr:hover {
    background: color-mix(in oklch, var(--maia-muted) 50%, transparent) !important;
  }
}

html.userpatch-maia .up-download-table tbody th {
  inline-size: 1%;
  white-space: nowrap;
  font-weight: 500;
}

html.userpatch-maia .up-release-id {
  display: inline-flex;
  min-block-size: 1.25rem;
  align-items: center;
  padding: 0.125rem 0.5rem;
  border: 1px solid var(--maia-border);
  border-radius: var(--maia-radius-4xl);
  background: color-mix(in oklch, var(--maia-input) 30%, transparent);
  color: var(--maia-foreground);
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 1rem;
  font-variant-numeric: tabular-nums;
}

html.userpatch-maia .up-release-title {
  display: block;
  min-inline-size: 0;
  font-weight: 500;
  overflow-wrap: anywhere;
}

html.userpatch-maia .up-file-name {
  display: block;
  max-inline-size: 60ch;
  margin-block-start: 0.35rem;
  color: var(--maia-muted-foreground) !important;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 1rem;
  line-height: 1.5;
  overflow-wrap: anywhere;
  white-space: normal;
}

html.userpatch-maia .up-detail-tokens,
html.userpatch-maia .up-download-links {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.375rem;
}

html.userpatch-maia .up-detail-token {
  display: inline-flex;
  min-block-size: 1.25rem;
  align-items: center;
  padding: 0.125rem 0.5rem;
  border: 1px solid var(--maia-border);
  border-radius: var(--maia-radius-4xl);
  background: color-mix(in oklch, var(--maia-input) 30%, transparent);
  color: var(--maia-foreground);
  font-size: 1rem;
  line-height: 1.25;
  overflow-wrap: anywhere;
}

html.userpatch-maia .up-download-links {
  min-inline-size: 0;
}

html.userpatch-maia .up-download-link {
  min-block-size: 2rem;
  padding: 0.35rem 0.65rem !important;
  font-size: 1rem !important;
  white-space: nowrap;
}

html.userpatch-maia .up-source-record {
  display: none !important;
}

html.userpatch-maia .download-item,
html.userpatch-maia .episode-item,
html.userpatch-maia .episode-download-item {
  border: 0 !important;
  border-radius: 0 !important;
  background: transparent !important;
  box-shadow: none !important;
}

html.userpatch-maia .download-header,
html.userpatch-maia .episode-header {
  border: 0 !important;
  border-bottom: 1px solid var(--maia-border) !important;
  border-radius: 0 !important;
  background: transparent !important;
  color: var(--maia-foreground) !important;
  box-shadow: none !important;
}

@media (hover: hover) and (pointer: fine) {
  html.userpatch-maia .download-header:hover,
  html.userpatch-maia .episode-header:hover {
    background: var(--maia-muted) !important;
  }
}

html.userpatch-maia .download-header:active,
html.userpatch-maia .episode-header:active {
  background: var(--maia-muted) !important;
}

html.userpatch-maia .download-header .flex-1,
html.userpatch-maia .download-title-text,
html.userpatch-maia .episode-info,
html.userpatch-maia .episode-title,
html.userpatch-maia .download-title-text,
html.userpatch-maia .episode-number {
  color: var(--maia-foreground) !important;
}

html.userpatch-maia .download-item > div[id^="content-"],
html.userpatch-maia .episode-content,
html.userpatch-maia .series-season-content {
  background: transparent !important;
}

html.userpatch-maia .episode-file-title,
html.userpatch-maia .file-title {
  border-color: var(--maia-border) !important;
  background: transparent !important;
  color: var(--maia-muted-foreground) !important;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  overflow-wrap: anywhere;
}

html.userpatch-maia main h1:not(.page-title),
html.userpatch-maia main h2:not(.page-title) {
  color: var(--maia-foreground) !important;
  font-family: inherit !important;
  font-weight: 600 !important;
  letter-spacing: -0.025em;
  line-height: 1.25;
}

html.userpatch-maia .latest-releases {
  margin-block: 1.5rem 0 !important;
  padding: 0 !important;
}

html.userpatch-maia .latest-releases-header {
  display: none !important;
}

html.userpatch-maia .latest-releases-title {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  color: var(--maia-foreground) !important;
  font-size: 1.25rem !important;
  font-weight: 600 !important;
  letter-spacing: -0.02em;
  line-height: 1.3;
}

html.userpatch-maia .latest-releases-title svg {
  inline-size: 1.25rem;
  block-size: 1.25rem;
  color: var(--maia-muted-foreground) !important;
  fill: currentColor !important;
}

html.userpatch-maia .card-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
  grid-auto-rows: 1fr;
  align-items: stretch;
  column-gap: 1rem !important;
  row-gap: 2rem !important;
  padding: 0 !important;
}

html.userpatch-maia .movie-card {
  display: flex;
  min-inline-size: 0;
  flex-direction: column;
  align-items: stretch;
  overflow: visible;
  gap: 0;
  border: 0 !important;
  border-radius: 0 !important;
  background: transparent !important;
  color: var(--maia-foreground) !important;
  box-shadow: none !important;
  text-decoration: none !important;
  transition: none !important;
}

html.userpatch-maia .movie-card-image {
  position: relative;
  display: block;
  inline-size: 100%;
  aspect-ratio: 2 / 3;
  overflow: hidden;
  border: 1px solid color-mix(in oklch, var(--maia-foreground) 15%, transparent) !important;
  border-radius: 1rem !important;
  background: var(--maia-muted) !important;
  box-shadow: var(--maia-card-depth-shadow) !important;
  transition: none !important;
}

html.userpatch-maia .movie-card-image.userpatch-ongoing-poster {
  border: 2px solid transparent !important;
  background:
    linear-gradient(var(--maia-muted), var(--maia-muted)) padding-box,
    linear-gradient(
        135deg in oklch,
        var(--maia-ongoing-orange) 0%,
        var(--maia-ongoing-gold) 50%,
        var(--maia-ongoing-deep-orange) 100%
      )
      border-box !important;
}

html.userpatch-maia .movie-card.userpatch-ongoing-series {
  position: relative;
  isolation: isolate;
}

html.userpatch-maia .movie-card.userpatch-ongoing-series::before {
  position: absolute;
  z-index: -1;
  inset-block-start: 0;
  inset-inline: 0;
  aspect-ratio: 2 / 3;
  border-radius: 1rem;
  background: linear-gradient(
    135deg in oklch,
    var(--maia-ongoing-orange),
    var(--maia-ongoing-gold) 52%,
    var(--maia-ongoing-deep-orange)
  );
  opacity: var(--maia-ongoing-glow-opacity, 0.22);
  filter: blur(var(--maia-ongoing-glow-blur, 16px));
  transform: scale(1.04);
  pointer-events: none;
  content: "";
}

@media (min-width: 40rem) {
  html.userpatch-maia .movie-card.userpatch-ongoing-series::before {
    border-radius: 1.5rem;
  }
}

html.userpatch-maia .movie-card:focus-visible .movie-card-image {
  border-color: color-mix(in oklch, var(--maia-foreground) 25%, transparent) !important;
}

html.userpatch-maia .movie-card:focus-visible {
  outline: none !important;
}

html.userpatch-maia .movie-card:focus-visible .movie-card-image {
  box-shadow: 0 0 0 2px var(--maia-background), 0 0 0 4px var(--maia-ring) !important;
}

html.userpatch-maia .movie-card:focus-visible .movie-card-image.userpatch-ongoing-poster {
  border-color: transparent !important;
}

html.userpatch-maia .movie-card-image > img {
  position: absolute;
  inset: 0;
  display: block;
  inline-size: 100%;
  block-size: 100%;
  object-fit: cover;
  transform: none !important;
  transition: none !important;
}

html.userpatch-maia .quality-badges,
html.userpatch-maia .movie-card-overlay {
  display: none !important;
  transition: none !important;
}

html.userpatch-maia .movie-card-content {
  display: flex;
  min-block-size: 3rem;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 0.25rem;
  align-items: center;
  padding: 0.75rem 0.25rem 0 !important;
  background: transparent !important;
  color: var(--maia-card-foreground) !important;
}

html.userpatch-maia .movie-card-title {
  display: -webkit-box;
  overflow: hidden;
  margin: 0 !important;
  color: var(--maia-foreground) !important;
  font-size: 1rem !important;
  font-weight: 400 !important;
  line-height: 1.4 !important;
  text-align: center !important;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

html.userpatch-maia .movie-card-meta {
  padding-block-start: 0.125rem !important;
  color: var(--maia-muted-foreground) !important;
  font-size: 1rem !important;
  line-height: 1.4 !important;
  text-align: center;
}

html.userpatch-maia .pagination-container {
  display: flex;
  justify-content: center;
  margin-block: 2rem 1rem !important;
}

html.userpatch-maia .pagination {
  display: flex;
  align-items: center;
  gap: 0.375rem !important;
  border: 0 !important;
  background: transparent !important;
}

html.userpatch-maia .pagination-item,
html.userpatch-maia .page-item,
html.userpatch-maia .page-link {
  display: inline-flex;
  inline-size: 2.5rem;
  min-inline-size: 2.5rem;
  block-size: 2.5rem;
  min-block-size: 2.5rem;
  align-items: center;
  justify-content: center;
  padding: 0 !important;
  border: 1px solid transparent !important;
  border-radius: var(--maia-radius-xl) !important;
  background: transparent !important;
  color: var(--maia-foreground) !important;
  font-size: 1rem !important;
  font-weight: 500 !important;
  text-decoration: none !important;
  transition:
    transform 140ms var(--ease-out),
    background-color 140ms ease,
    border-color 140ms ease;
}

@media (hover: hover) and (pointer: fine) {
  html.userpatch-maia .pagination-item:hover,
  html.userpatch-maia .page-link:hover {
    background: var(--maia-muted) !important;
  }
}

html.userpatch-maia .pagination-item:active,
html.userpatch-maia .page-link:active {
  transform: scale(0.96);
  background: var(--maia-muted) !important;
}

html.userpatch-maia .pagination-item.active,
html.userpatch-maia .page-item.active .page-link {
  border-color: var(--maia-border) !important;
  background: color-mix(in oklch, var(--maia-input) 30%, transparent) !important;
  color: var(--maia-foreground) !important;
}

html.userpatch-maia #back-to-top {
  display: inline-flex;
  inline-size: 2.25rem;
  block-size: 2.25rem;
  align-items: center;
  justify-content: center;
  padding: 0 !important;
  border: 1px solid var(--maia-border) !important;
  border-radius: var(--maia-radius-4xl) !important;
  background: var(--maia-primary) !important;
  color: var(--maia-primary-foreground) !important;
  box-shadow: none !important;
}

@media (max-width: 58rem) {
  html.userpatch-maia .content-grid.container {
    grid-template-columns: minmax(12rem, 16rem) minmax(0, 1fr);
  }
}

@media (max-width: 46rem) {
  html.userpatch-maia .page-container {
    padding: 1rem !important;
  }

  html.userpatch-maia header.sticky > .header {
    max-inline-size: calc(100% - 1rem);
  }

  html.userpatch-maia header.sticky > .header > .container {
    max-inline-size: 100%;
    gap: 0.125rem;
  }

  html.userpatch-maia .userpatch-nav-indicator {
    display: none !important;
  }

  html.userpatch-maia .main-nav.open {
    border-right: 1px solid var(--maia-border) !important;
  }

  html.userpatch-maia .main-nav.open .nav-list {
    display: flex;
    inline-size: 100% !important;
    flex-direction: column;
    align-items: stretch;
  }

  html.userpatch-maia .main-nav.open .nav-link {
    justify-content: space-between;
    padding-inline: 0.75rem !important;
  }

  html.userpatch-maia .card-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
    column-gap: 0.75rem !important;
    row-gap: 1.5rem !important;
  }

  html.userpatch-maia .content-grid.container {
    grid-template-columns: minmax(0, 1fr);
  }

  html.userpatch-maia .poster-container {
    inline-size: min(65vw, 17rem);
    max-inline-size: 17rem;
  }

  html.userpatch-maia .detail-info-box {
    padding: 1rem !important;
  }

  html.userpatch-maia .metadata-item {
    grid-template-columns: minmax(0, 1fr) !important;
    gap: 0.125rem !important;
  }

  html.userpatch-maia #series-tabs {
    inline-size: 100%;
  }

  html.userpatch-maia #series-tabs .series-tab {
    flex: 1 1 auto;
  }

  html.userpatch-maia .series-season-content {
    padding-block-end: 0.75rem !important;
    padding-inline: 0.75rem !important;
  }

  html.userpatch-maia .download-group-title {
    gap: 0.5rem;
  }

  html.userpatch-maia .up-download-table {
    min-inline-size: 39rem;
  }
}

@media (min-width: 40rem) {
  html.userpatch-maia .card-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
  }

  html.userpatch-maia .movie-card-image {
    border-radius: 1.5rem !important;
  }
}

@media (min-width: 48rem) {
  html.userpatch-maia .card-grid {
    grid-template-columns: repeat(5, minmax(0, 1fr)) !important;
  }
}

@media (min-width: 64rem) {
  html.userpatch-maia .card-grid {
    grid-template-columns: repeat(6, minmax(0, 1fr)) !important;
  }
}

html.userpatch-maia body {
  background: var(--maia-background) !important;
  color: var(--maia-foreground) !important;
}

/* The source loads important theme gradients after the redesign. */
html.userpatch-maia[data-userpatch-theme] #swup > main {
  background: var(--maia-background) !important;
  background-image: none !important;
  color: var(--maia-foreground) !important;
}

html.userpatch-maia[data-detail-theme] .content-main .info-box.mt-8.detail-info-box {
  display: none !important;
}

html.userpatch-maia[data-detail-theme] .content-main :is(
  .episode-file-title,
  .file-title,
  .up-release-id
) {
  font-family: "Inter Variable", ui-sans-serif, system-ui, sans-serif !important;
  font-size: 1rem !important;
  font-weight: 400 !important;
}

html.userpatch-maia[data-detail-theme] body :is(
  .badge,
  .badge-outline,
  .badge-psa,
  .badge-size,
  .format-label,
  .format-source,
  .metadata-token,
  .imdb-badge,
  .imdb-logo,
  .imdb-score,
  .up-release-id
) {
  font-weight: 400 !important;
}

html.userpatch-maia[data-detail-theme] body .content-main > div:first-child > .mt-2 .badge.badge-outline,
html.userpatch-maia[data-detail-theme] body .content-main > div:first-child > .mt-2 .badge.badge-outline > a {
  font-size: 1rem !important;
  font-weight: 400 !important;
}

html.userpatch-maia[data-detail-theme] body .content-main > div:first-child > .mt-2 .badge.badge-outline {
  display: inline-flex !important;
  min-block-size: 1.25rem !important;
  align-items: center;
  padding: 0.125rem 0.5rem !important;
  border: 1px solid var(--maia-border) !important;
  border-radius: var(--maia-radius-4xl) !important;
  background: color-mix(in oklch, var(--maia-input) 30%, transparent) !important;
  color: var(--maia-foreground) !important;
  box-shadow: none !important;
  text-shadow: none !important;
  line-height: 1.25 !important;
}

html.userpatch-maia[data-detail-theme] body .content-main > div:first-child > .mt-2 .badge.badge-outline > a {
  padding: 0 !important;
  border: 0 !important;
  border-radius: inherit;
  background: transparent !important;
  color: inherit !important;
  font-family: inherit !important;
  line-height: inherit !important;
}

html.userpatch-maia[data-detail-theme] .poster-container {
  border: 1px solid color-mix(in oklch, var(--maia-foreground) 10%, transparent) !important;
  background: transparent !important;
  box-shadow: none !important;
}

html.userpatch-maia[data-detail-theme] .detail-info-box {
  border: 0 !important;
  border-radius: var(--maia-radius-2xl) !important;
  background: var(--maia-card) !important;
  color: var(--maia-card-foreground) !important;
  box-shadow: 0 0 0 1px color-mix(in oklch, var(--maia-foreground) 10%, transparent) !important;
}

html.userpatch-maia[data-detail-theme] .content-grid .content-main .detail-info-box :where(p, li, span, div, ol, ul, a) {
  color: var(--maia-muted-foreground) !important;
}

html.userpatch-maia[data-detail-theme] .content-grid .content-main .detail-info-box :where(h1, h2, h3, h4, h5, strong, b) {
  color: var(--maia-foreground) !important;
}

html.userpatch-maia[data-detail-theme] #series-tabs .series-tab.active {
  border-color: var(--maia-border) !important;
  background: var(--maia-background) !important;
  color: var(--maia-foreground) !important;
  box-shadow: none !important;
}

html.userpatch-maia[data-detail-theme] #series-tabs .series-tab.active,
html.userpatch-maia[data-detail-theme] #series-tabs .series-tab.active {
  border-color: var(--maia-input) !important;
  background: color-mix(in oklch, var(--maia-input) 30%, transparent) !important;
}

html.userpatch-maia[data-detail-theme] #series-tabs .series-tab svg,
html.userpatch-maia[data-detail-theme] #series-tabs .series-tab svg * {
  color: currentColor !important;
  fill: currentColor !important;
  stroke: currentColor !important;
}

html.userpatch-maia[data-detail-theme] #complete-pack .series-season-group,
html.userpatch-maia[data-detail-theme] #episodes .series-season-group {
  overflow: hidden;
  border: 1px solid var(--maia-border) !important;
  border-radius: var(--maia-radius-2xl) !important;
  background: var(--maia-card) !important;
  box-shadow: none !important;
}

html.userpatch-maia[data-detail-theme] #complete-pack .series-season-toggle,
html.userpatch-maia[data-detail-theme] #episodes .series-season-toggle {
  border: 0 !important;
  border-radius: 0 !important;
  background: transparent !important;
  color: var(--maia-foreground) !important;
  box-shadow: none !important;
}

@media (hover: hover) and (pointer: fine) {
  html.userpatch-maia[data-detail-theme] #complete-pack .series-season-toggle:hover,
  html.userpatch-maia[data-detail-theme] #episodes .series-season-toggle:hover {
    background: var(--maia-muted) !important;
  }
}

html.userpatch-maia[data-detail-theme] #complete-pack .series-season-content,
html.userpatch-maia[data-detail-theme] #episodes .series-season-content {
  border: 0 !important;
  background: transparent !important;
}

html.userpatch-maia[data-detail-theme] #complete-pack details.download-group,
html.userpatch-maia[data-detail-theme] #episodes details.download-group {
  border: 0 !important;
  border-bottom: 1px solid var(--maia-border) !important;
  border-radius: 0 !important;
  background: transparent !important;
  box-shadow: none !important;
}

html.userpatch-maia[data-detail-theme] #complete-pack details.download-group:last-child,
html.userpatch-maia[data-detail-theme] #episodes details.download-group:last-child {
  border-bottom: 0 !important;
}

html.userpatch-maia[data-detail-theme] #complete-pack .download-group-title,
html.userpatch-maia[data-detail-theme] #episodes .download-group-title {
  border: 0 !important;
  border-radius: 0 !important;
  background: transparent !important;
  color: var(--maia-foreground) !important;
  box-shadow: none !important;
}

@media (hover: hover) and (pointer: fine) {
  html.userpatch-maia[data-detail-theme] #complete-pack .download-group-title:hover,
  html.userpatch-maia[data-detail-theme] #episodes .download-group-title:hover {
    background: var(--maia-muted) !important;
  }
}

/* Recolor the site's high-specificity legacy accent rules with Maia tokens. */
html.userpatch-maia[data-detail-theme] .content-grid .content-main :where(.movie-tagline, .episode-number, .title-source-badge.is-ott, .episode-file-title, .file-title) {
  color: var(--maia-muted-foreground) !important;
  font-style: normal !important;
  text-shadow: none !important;
}

html.userpatch-maia[data-detail-theme] .content-grid .content-main .section-title {
  color: var(--maia-foreground) !important;
}

html.userpatch-maia[data-detail-theme] .content-grid .content-main .section-title::before {
  background: transparent !important;
}

html.userpatch-maia[data-detail-theme] .content-grid .content-main .poster-container {
  border-color: color-mix(in oklch, var(--maia-foreground) 10%, transparent) !important;
  box-shadow: none !important;
}

html.userpatch-maia[data-detail-theme] header.sticky .nav-link:hover {
  border-color: transparent !important;
  background: transparent !important;
  color: var(--maia-foreground) !important;
}

@media (hover: hover) and (pointer: fine) {
  html.userpatch-maia[data-detail-theme] .content-grid .content-main .badge-outline:hover {
    border-color: var(--maia-border) !important;
    background: color-mix(in oklch, var(--maia-muted) 50%, transparent) !important;
    color: var(--maia-foreground) !important;
  }

  html.userpatch-maia[data-detail-theme] .content-grid .content-main .download-header:hover,
  html.userpatch-maia[data-detail-theme] .content-grid .content-main .episode-header:hover {
    border-color: var(--maia-border) !important;
    background-color: color-mix(in oklch, var(--maia-muted) 50%, transparent) !important;
    color: var(--maia-foreground) !important;
  }

  html.userpatch-maia[data-detail-theme] .content-grid .content-main .series-season-toggle:hover .chevron-icon {
    border-color: var(--maia-border) !important;
    background: color-mix(in oklch, var(--maia-muted) 50%, transparent) !important;
    color: var(--maia-muted-foreground) !important;
  }
}

html.userpatch-maia[data-detail-theme] .content-grid .content-main .metadata-item[data-meta-kind] .metadata-token {
  border-color: var(--maia-border) !important;
  background: color-mix(in oklch, var(--maia-input) 30%, transparent) !important;
  color: var(--maia-foreground) !important;
}

html.userpatch-maia[data-detail-theme] .content-grid .content-main .download-header code .badge,
html.userpatch-maia[data-detail-theme] .content-grid .content-main .episode-file-info .badge-size,
html.userpatch-maia[data-detail-theme] .content-grid .content-main .episode-header .episode-meta .badge {
  border: 1px solid var(--maia-border) !important;
  background: color-mix(in oklch, var(--maia-input) 30%, transparent) !important;
  color: var(--maia-foreground) !important;
}

html.userpatch-maia[data-detail-theme] .content-grid .content-main .format-label,
html.userpatch-maia[data-detail-theme] .content-grid .content-main .format-source,
html.userpatch-maia[data-detail-theme] .content-grid .content-main .format-codec,
html.userpatch-maia[data-detail-theme] .content-grid .content-main .title-source-badge.is-source {
  border: 1px solid var(--maia-border) !important;
  border-radius: var(--maia-radius-4xl) !important;
  background: color-mix(in oklch, var(--maia-input) 30%, transparent) !important;
  color: var(--maia-foreground) !important;
  box-shadow: none !important;
  text-shadow: none !important;
}

html.userpatch-maia[data-detail-theme] .content-grid .content-main .download-group-title {
  border: 0 !important;
  border-bottom: 1px solid var(--maia-border) !important;
  border-radius: 0 !important;
  background: transparent !important;
  color: var(--maia-foreground) !important;
  box-shadow: none !important;
}

html.userpatch-maia[data-detail-theme] .content-grid .content-main .download-group > .download-item,
html.userpatch-maia[data-detail-theme] .content-grid .content-main .download-item .download-item {
  border: 0 !important;
  border-radius: 0 !important;
  background: transparent !important;
  box-shadow: none !important;
}

html.userpatch-maia[data-detail-theme] .content-grid .content-main .download-item > .download-header,
html.userpatch-maia[data-detail-theme] .content-grid .content-main .episode-item > .episode-header {
  border: 0 !important;
  border-bottom: 1px solid var(--maia-border) !important;
  border-radius: 0 !important;
  background: transparent !important;
  color: var(--maia-foreground) !important;
  box-shadow: none !important;
}

html.userpatch-maia[data-detail-theme] .content-grid .content-main .download-item > div[id^="content-"],
html.userpatch-maia[data-detail-theme] .content-grid .content-main .episode-content {
  border: 0 !important;
  background: transparent !important;
}

html.userpatch-maia[data-detail-theme] .content-grid .content-main .download-item .btn,
html.userpatch-maia[data-detail-theme] .content-grid .content-main .episode-links .btn,
html.userpatch-maia[data-detail-theme] .content-grid .content-main #play-btn,
html.userpatch-maia[data-detail-theme] .content-grid .content-main #trailer-btn {
  border: 1px solid transparent !important;
  border-radius: var(--maia-radius-4xl) !important;
  background: var(--maia-primary) !important;
  color: var(--maia-primary-foreground) !important;
  box-shadow: none !important;
  font-family: inherit !important;
  font-weight: 500 !important;
}

@media (hover: hover) and (pointer: fine) {
  html.userpatch-maia[data-detail-theme] .content-grid .content-main .download-item .btn:hover,
  html.userpatch-maia[data-detail-theme] .content-grid .content-main .episode-links .btn:hover,
  html.userpatch-maia[data-detail-theme] .content-grid .content-main #play-btn:hover,
  html.userpatch-maia[data-detail-theme] .content-grid .content-main #trailer-btn:hover {
    background: color-mix(in oklch, var(--maia-primary), var(--maia-foreground) 20%) !important;
    color: var(--maia-primary-foreground) !important;
  }
}

html.userpatch-maia[data-detail-theme] .content-grid .content-main .download-item .btn:active,
html.userpatch-maia[data-detail-theme] .content-grid .content-main .episode-links .btn:active,
html.userpatch-maia[data-detail-theme] .content-grid .content-main #play-btn:active,
html.userpatch-maia[data-detail-theme] .content-grid .content-main #trailer-btn:active {
  transform: scale(0.97);
  background: color-mix(in oklch, var(--maia-primary), var(--maia-foreground) 10%) !important;
}

html.userpatch-maia[data-detail-theme] {
  accent-color: var(--maia-primary);
}

@media (prefers-reduced-motion: reduce) {
  html.userpatch-maia #main-nav,
  html.userpatch-maia .nav-link,
  html.userpatch-maia .btn,
  html.userpatch-maia #play-btn,
  html.userpatch-maia #trailer-btn,
  html.userpatch-maia #series-tabs .series-tab,
  html.userpatch-maia .up-format-chevron,
  html.userpatch-maia .userpatch-nav-indicator,
  html.userpatch-maia .userpatch-quality-indicator,
  html.userpatch-maia .userpatch-quality-tab,
  html.userpatch-maia .userpatch-quality-filter,
  html.userpatch-maia .userpatch-provider-tooltip,
  html.userpatch-maia .userpatch-provider-link,
  html.userpatch-maia .userpatch-season-trigger,
  html.userpatch-maia .userpatch-season-scroll-control,
  html.userpatch-maia .userpatch-season-popup,
  html.userpatch-maia .userpatch-season-option,
  html.userpatch-maia .userpatch-mobile-nav-item,
  html.userpatch-maia .userpatch-mobile-menu,
  html.userpatch-maia dialog.userpatch-search-dialog,
  html.userpatch-maia .pagination-item,
  html.userpatch-maia .page-link,
  html.userpatch-maia .search-toggle,
  html.userpatch-maia .theme-toggle,
  html.userpatch-maia .menu-toggle,
  html.userpatch-maia #close-mobile-menu,
  html.userpatch-maia #close-search,
  html.userpatch-maia #back-to-top {
    transform: none !important;
    transition:
      opacity 120ms ease,
      background-color 120ms ease,
      color 120ms ease !important;
  }

  html.userpatch-maia #search-overlay .search-form {
    animation: none !important;
  }
}

html.userpatch-maia svg[data-userpatch-lucide-icon] {
  fill: none !important;
  stroke: currentColor !important;
  flex: none;
}

html.userpatch-maia:has(#swup .content-grid .content-main .page-title) header.sticky,
html.userpatch-maia.userpatch-detail-page header.sticky {
  display: none !important;
}

html.userpatch-maia .userpatch-mobile-nav {
  display: none !important;
}

html.userpatch-maia .userpatch-mobile-menu:popover-open {
  position: fixed;
  inset-block: 0;
  inset-inline-start: 0;
  display: flex;
  inline-size: min(${CONFIG.mobileMenuWidth}, calc(100dvw - 2rem));
  block-size: 100dvh;
  max-block-size: 100dvh;
  max-inline-size: none;
  flex-direction: column;
  gap: 0;
  box-sizing: border-box;
  margin: 0 auto 0 0;
  padding: max(0.75rem, env(safe-area-inset-top, 0px)) 0.75rem
    max(0.75rem, env(safe-area-inset-bottom, 0px));
  overflow: hidden;
  overscroll-behavior-x: auto;
  overscroll-behavior-y: contain;
  border: 1px solid var(--maia-border);
  border-inline-start: 0;
  border-radius: 0 var(--maia-radius-2xl) var(--maia-radius-2xl) 0;
  background: var(--maia-card);
  color: var(--maia-foreground);
  box-shadow: 0 24px 64px rgb(0 0 0 / 0.45);
  transform: translateX(0);
  transition: transform 220ms var(--ease-drawer);
}

@starting-style {
  html.userpatch-maia .userpatch-mobile-menu:popover-open {
    transform: translateX(-100%);
  }
}

html.userpatch-maia .userpatch-mobile-menu:popover-open::backdrop {
  background: rgb(0 0 0 / 80%);
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
  transition: opacity 220ms var(--ease-out);
}

html.userpatch-maia .userpatch-mobile-menu-header {
  display: flex;
  min-block-size: 3.5rem;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0 0.5rem 0.75rem;
  border-bottom: 1px solid var(--maia-border);
}

html.userpatch-maia .userpatch-mobile-menu-title {
  margin: 0;
  color: var(--maia-foreground);
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.25;
}

html.userpatch-maia .userpatch-mobile-menu-close {
  display: inline-flex;
  inline-size: 2.5rem;
  block-size: 2.5rem;
  flex: none;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: 1px solid var(--maia-border);
  border-radius: var(--maia-radius-xl);
  background: var(--maia-muted);
  color: var(--maia-foreground);
  cursor: pointer;
}

html.userpatch-maia .userpatch-mobile-menu-close svg,
html.userpatch-maia .userpatch-mobile-menu-summary svg {
  inline-size: 1.25rem;
  block-size: 1.25rem;
}

html.userpatch-maia .userpatch-mobile-menu-nav {
  min-block-size: 0;
  flex: 1 1 auto;
  overflow-x: hidden;
  overflow-y: auto;
  overscroll-behavior-x: auto;
  overscroll-behavior-y: contain;
  padding-block: 0.75rem;
  scrollbar-width: none;
}

html.userpatch-maia .userpatch-mobile-menu-nav::-webkit-scrollbar {
  display: none;
}

html.userpatch-maia .userpatch-mobile-menu-list,
html.userpatch-maia .userpatch-mobile-menu-sublist {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

html.userpatch-maia .userpatch-mobile-menu-item {
  min-inline-size: 0;
  margin: 0;
  padding: 0;
}

html.userpatch-maia .userpatch-mobile-menu-link,
html.userpatch-maia .userpatch-mobile-menu-summary {
  display: flex;
  inline-size: 100%;
  min-block-size: 3rem;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  box-sizing: border-box;
  padding: 0.75rem 0.875rem;
  border: 0;
  border-radius: var(--maia-radius-xl);
  background: transparent;
  color: var(--maia-foreground);
  font: inherit;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.25;
  text-align: start;
  text-decoration: none;
  cursor: pointer;
  list-style: none;
}

html.userpatch-maia .userpatch-mobile-menu-summary::-webkit-details-marker {
  display: none;
}

html.userpatch-maia .userpatch-mobile-menu-link:focus-visible,
html.userpatch-maia .userpatch-mobile-menu-summary:focus-visible,
html.userpatch-maia .userpatch-mobile-menu-close:focus-visible {
  background: var(--maia-selection-bg, color-mix(in oklch, var(--maia-foreground) 9%, transparent));
  color: var(--maia-foreground);
}

@media (hover: hover) and (pointer: fine) {
  html.userpatch-maia .userpatch-mobile-menu-link:hover,
  html.userpatch-maia .userpatch-mobile-menu-summary:hover {
    background: var(--maia-selection-bg, color-mix(in oklch, var(--maia-foreground) 9%, transparent));
    color: var(--maia-foreground);
  }
}

html.userpatch-maia .userpatch-mobile-menu-link:active,
html.userpatch-maia .userpatch-mobile-menu-summary:active,
html.userpatch-maia .userpatch-mobile-menu-close:active {
  background: color-mix(in oklch, var(--maia-foreground) 14%, transparent);
}

html.userpatch-maia .userpatch-mobile-menu-link:focus-visible,
html.userpatch-maia .userpatch-mobile-menu-summary:focus-visible,
html.userpatch-maia .userpatch-mobile-menu-close:focus-visible {
  outline: 2px solid var(--maia-ring);
  outline-offset: -2px;
}

html.userpatch-maia .userpatch-mobile-menu-summary svg {
  flex: none;
  transition: transform 140ms ease-out;
}

html.userpatch-maia .userpatch-mobile-menu-group[open]
  .userpatch-mobile-menu-summary svg {
  transform: rotate(180deg);
}

html.userpatch-maia .userpatch-mobile-menu-sublist {
  gap: 0.125rem;
  padding: 0.125rem 0.25rem 0.5rem 0.75rem;
}

html.userpatch-maia .userpatch-mobile-menu-sublist .userpatch-mobile-menu-link {
  min-block-size: 2.5rem;
  padding-inline: 0.75rem;
  color: var(--maia-muted-foreground);
  font-size: 0.9375rem;
  font-weight: 400;
}

html.userpatch-maia:has(#swup .content-grid .content-main .page-title) #back-to-top,
html.userpatch-maia.userpatch-detail-page #back-to-top {
  display: none !important;
}

html.userpatch-maia.userpatch-detail-page,
html.userpatch-maia.userpatch-detail-page body {
  block-size: 100%;
  overflow: hidden;
}

html.userpatch-maia.userpatch-detail-page body > .flex.min-h-screen {
  block-size: 100dvh;
  min-block-size: 0;
  overflow: hidden;
}

html.userpatch-maia.userpatch-detail-page #swup {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  block-size: 100%;
  min-block-size: 0;
  overflow: hidden;
}

html.userpatch-maia.userpatch-detail-page #swup > main {
  display: flex;
  flex: 1 1 auto;
  min-block-size: 0;
  overflow: hidden;
}

html.userpatch-maia.userpatch-detail-page #swup > footer {
  display: none !important;
}

html.userpatch-maia.userpatch-detail-page .page-container {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  inline-size: 100%;
  max-inline-size: 88rem !important;
  min-block-size: 0;
  margin: 0 auto;
  box-sizing: border-box;
  padding-block: 0 !important;
  padding-inline: var(--maia-gutter) !important;
}

html.userpatch-maia.userpatch-detail-page .content-grid.container {
  display: grid;
  flex: 1 1 auto;
  grid-template-columns: minmax(17rem, min(21rem, 30vw)) minmax(0, 1fr);
  align-items: stretch;
  gap: var(--maia-gutter);
  column-gap: 2rem;
  inline-size: 100%;
  max-inline-size: none;
  min-block-size: 0;
  margin: 0;
  padding: 0;
}

html.userpatch-maia.userpatch-detail-page .content-sidebar {
  display: flex;
  min-inline-size: 0;
  min-block-size: 0;
  align-items: flex-start;
  justify-content: flex-start;
}

html.userpatch-maia.userpatch-detail-page .userpatch-poster-panel {
  position: sticky;
  inset-block-start: 1rem;
  display: flex;
  inline-size: min(100%, 24rem);
  max-block-size: calc(100dvh - 2rem);
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  box-sizing: border-box;
  margin-inline: auto;
  padding: 0.875rem;
  overflow: auto;
  border: 1px solid var(--maia-border);
  border-radius: var(--maia-radius-4xl);
  background: var(--maia-card);
  box-shadow: var(--maia-card-depth-shadow);
}

html.userpatch-maia.userpatch-detail-page .userpatch-detail-breadcrumb {
  display: flex;
  inline-size: 100%;
  align-items: center;
  justify-content: flex-start;
  gap: 0.375rem;
  margin: 0;
  padding: 0 0.125rem;
  color: var(--maia-muted-foreground);
  font-size: 0.8125rem !important;
}

html.userpatch-maia.userpatch-detail-page .userpatch-detail-breadcrumb a {
  min-block-size: 2rem;
  color: inherit !important;
  text-decoration: none;
}

html.userpatch-maia.userpatch-detail-page .userpatch-detail-brand {
  display: flex;
  inline-size: min(100%, 18rem);
  min-block-size: 2.75rem;
  align-items: center;
  justify-content: center;
  flex: none;
}

html.userpatch-maia.userpatch-detail-page .userpatch-detail-brand img {
  display: block;
  inline-size: 100%;
  max-block-size: 3.5rem;
  object-fit: contain;
  filter: none !important;
}

html.userpatch-maia.userpatch-detail-page .userpatch-poster-panel .poster-container {
  inline-size: min(100%, min(21rem, max(9rem, calc(66.667dvh - 7.333rem))));
  block-size: auto;
  max-inline-size: 100%;
  aspect-ratio: 2 / 3;
  margin: 0;
  border: 1px solid var(--maia-border) !important;
  border-radius: var(--maia-radius-2xl) !important;
  background: var(--maia-background) !important;
  box-shadow: 0 12px 32px rgb(0 0 0 / 0.3) !important;
}

html.userpatch-maia.userpatch-detail-page .userpatch-poster-panel .poster-image,
html.userpatch-maia.userpatch-detail-page .userpatch-poster-panel .poster-image img {
  inline-size: 100%;
  block-size: 100%;
}

html.userpatch-maia.userpatch-detail-page .content-main {
  block-size: 100%;
  box-sizing: border-box;
  min-inline-size: 0;
  min-block-size: 0;
  padding: 0 !important;
  overflow-x: hidden;
  overflow-y: auto;
  overscroll-behavior-x: auto;
  overscroll-behavior-y: contain;
  scrollbar-gutter: stable;
}

html.userpatch-maia.userpatch-detail-page .content-main > :first-child {
  margin-block-start: 0;
}

@media (max-width: 46rem) {
  html.userpatch-maia:not(.userpatch-detail-page) header.sticky {
    position: sticky;
    inset-block-start: 1rem;
    block-size: auto;
    min-block-size: 0;
    margin-block: 1rem 1.5rem;
    padding: 0;
    overflow: visible;
  }

  html.userpatch-maia:not(.userpatch-detail-page) header.sticky > .header {
    inline-size: calc(100% - 2rem);
    max-inline-size: calc(100% - 2rem);
    margin-inline: auto;
  }

  html.userpatch-maia:not(.userpatch-detail-page) header.sticky > .header > .container {
    inline-size: 100% !important;
    max-inline-size: 100%;
    justify-content: space-between;
    gap: 0.25rem;
  }

  html.userpatch-maia:not(.userpatch-detail-page) header.sticky .navbar-brand {
    min-inline-size: 3rem;
    padding-inline: 0.25rem;
  }

  html.userpatch-maia:not(.userpatch-detail-page) header.sticky #menu-toggle,
  html.userpatch-maia:not(.userpatch-detail-page) header.sticky #search-toggle {
    display: inline-flex;
    flex: none;
  }

  html.userpatch-maia.userpatch-detail-page {
    block-size: auto;
    min-block-size: 100%;
    overflow: auto;
  }

  html.userpatch-maia.userpatch-detail-page body {
    block-size: auto;
    min-block-size: 100%;
    overflow: visible;
  }

  html.userpatch-maia.userpatch-detail-page body > .flex.min-h-screen {
    block-size: auto;
    min-block-size: 100dvh;
    overflow: visible;
  }

  html.userpatch-maia.userpatch-detail-page #swup {
    block-size: auto;
    min-block-size: 0;
    overflow: visible;
  }

  html.userpatch-maia.userpatch-detail-page #swup > main {
    display: block;
    overflow: visible;
  }

  html.userpatch-maia.userpatch-detail-page .page-container {
    min-block-size: 100dvh;
    padding: var(--maia-gutter) !important;
  }

  html.userpatch-maia.userpatch-detail-page .content-grid.container {
    flex: none;
    grid-template-columns: minmax(0, 1fr);
    gap: 1.25rem;
    min-block-size: auto;
  }

  html.userpatch-maia.userpatch-detail-page .content-sidebar {
    min-block-size: 0;
    align-items: stretch;
  }

  html.userpatch-maia.userpatch-detail-page .userpatch-poster-panel {
    position: static;
    inline-size: min(100%, 28rem);
    max-block-size: none;
    margin-inline: auto;
    overflow: visible;
  }

  html.userpatch-maia.userpatch-detail-page .userpatch-poster-panel .poster-container {
    inline-size: min(65vw, 17rem);
    block-size: auto;
    max-inline-size: 100%;
    aspect-ratio: 2 / 3;
  }

  html.userpatch-maia.userpatch-detail-page .content-main {
    block-size: auto;
    min-block-size: 0;
    padding: 0 !important;
    overflow: visible;
    scrollbar-gutter: auto;
  }
}

html.userpatch-maia.userpatch-detail-page .content-sidebar {
  position: sticky;
  inset-block-start: 1rem;
  align-self: stretch;
  block-size: calc(100dvh - 2rem);
  align-items: flex-start;
  justify-content: flex-start;
  overflow: visible;
}

html.userpatch-maia.userpatch-detail-page .userpatch-detail-stack {
  display: flex;
  inline-size: min(100%, 21rem, 42dvh);
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-inline: 0;
  padding: 0;
  border: 0;
  border-radius: 0;
  background: transparent;
  box-shadow: none;
}

html.userpatch-maia.userpatch-detail-page .userpatch-detail-brand {
  inline-size: min(100%, 16rem);
  min-block-size: 0;
  margin: 0;
}

html.userpatch-maia.userpatch-detail-page .userpatch-detail-brand img {
  inline-size: 100%;
  max-block-size: 4rem;
}

html.userpatch-maia.userpatch-detail-page .content-sidebar .poster-container {
  display: block;
  inline-size: 100%;
  max-inline-size: 100%;
  margin: 0;
  padding: 0 !important;
  overflow: hidden;
  aspect-ratio: 2 / 3;
  border: 1px solid color-mix(in oklch, var(--maia-foreground) 15%, transparent) !important;
  border-radius: 1rem !important;
  background: var(--maia-muted) !important;
  box-shadow: var(--maia-card-depth-shadow) !important;
}

html.userpatch-maia.userpatch-detail-page .content-sidebar .poster-image,
html.userpatch-maia.userpatch-detail-page .content-sidebar .poster-image img {
  inline-size: 100%;
  block-size: 100%;
}

html.userpatch-maia.userpatch-detail-page .content-sidebar .poster-image img {
  display: block;
  object-fit: cover;
}

html.userpatch-maia.userpatch-detail-page
  .content-sidebar
  .poster-container.userpatch-ongoing-poster {
  border: 2px solid transparent !important;
  background:
    linear-gradient(var(--maia-muted), var(--maia-muted)) padding-box,
    linear-gradient(
        135deg in oklch,
        var(--maia-ongoing-orange) 0%,
        var(--maia-ongoing-gold) 50%,
        var(--maia-ongoing-deep-orange) 100%
      )
      border-box !important;
  box-shadow:
    var(--maia-card-depth-shadow),
    var(--maia-ongoing-shadow,
      0 0 18px color-mix(in oklch, var(--maia-ongoing-orange) 24%, transparent),
      0 0 34px color-mix(in oklch, var(--maia-ongoing-gold) 15%, transparent)) !important;
}

html.userpatch-maia.userpatch-detail-page .userpatch-detail-title {
  max-inline-size: 100%;
  margin-block-start: 0;
  color: var(--maia-foreground) !important;
  font-family: var(--detail-font-display, inherit) !important;
  font-size: 1.25rem !important;
  font-weight: 500 !important;
  letter-spacing: -0.02em;
  line-height: 1.25;
  text-align: center;
  overflow-wrap: anywhere;
}

html.userpatch-maia.userpatch-detail-page .userpatch-imdb-score {
  display: inline-flex;
  min-block-size: 1.5rem;
  align-items: center;
  gap: 0.375rem;
  color: var(--maia-foreground);
  font-size: 1rem;
  line-height: 1;
}

html.userpatch-maia.userpatch-detail-page .userpatch-imdb-score img {
  display: block;
  inline-size: auto;
  block-size: 1rem;
  object-fit: contain;
}

html.userpatch-maia.userpatch-detail-page .userpatch-imdb-rating {
  font-size: 1rem;
  font-weight: 500;
}

html.userpatch-maia.userpatch-detail-page .userpatch-poster-badges {
  display: flex;
  max-inline-size: 100%;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-block-start: 0.125rem;
}

html.userpatch-maia.userpatch-detail-page .userpatch-poster-badges[hidden] {
  display: none !important;
}

html.userpatch-maia.userpatch-detail-page .userpatch-media-badge {
  display: inline-flex;
  min-inline-size: 2rem;
  min-block-size: 1.375rem;
  align-items: center;
  justify-content: center;
  padding: 0.125rem 0.25rem;
  border: 1px solid var(--maia-border);
  border-radius: var(--maia-radius-2xl);
  background: color-mix(in oklch, var(--maia-input) 30%, transparent);
}

html.userpatch-maia.userpatch-detail-page .userpatch-media-badge img {
  display: block;
  inline-size: auto;
  max-inline-size: none;
  block-size: 1rem;
  object-fit: contain;
  filter: invert(1) grayscale(1);
}

html.userpatch-maia.userpatch-detail-page .userpatch-release-toolbar {
  display: grid;
  grid-template-columns: minmax(12rem, 1fr) auto;
  align-items: center;
  gap: 0.75rem 1rem;
  margin-block: 0 1rem;
}

html.userpatch-maia.userpatch-detail-page .userpatch-release-search {
  display: flex;
  min-inline-size: 0;
  min-block-size: 2.75rem;
  align-items: center;
  gap: 0.625rem;
  padding-inline: 0.875rem;
  border: 1px solid var(--maia-border);
  border-radius: var(--maia-radius-2xl);
  background: var(--maia-card);
  color: var(--maia-muted-foreground);
}

html.userpatch-maia.userpatch-detail-page .userpatch-release-search svg {
  inline-size: 1.125rem;
  block-size: 1.125rem;
  flex: none;
}

html.userpatch-maia.userpatch-detail-page .userpatch-release-search-input {
  inline-size: 100%;
  min-inline-size: 0;
  border: 0 !important;
  outline: 0;
  background: transparent !important;
  color: var(--maia-foreground) !important;
  font: inherit;
  font-size: 1rem !important;
  box-shadow: none !important;
}

html.userpatch-maia.userpatch-detail-page .userpatch-release-search-input::placeholder {
  color: var(--maia-muted-foreground);
  opacity: 1;
}

html.userpatch-maia.userpatch-detail-page .userpatch-quality-filters {
  display: inline-flex;
  min-block-size: 2.75rem;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem;
  border: 1px solid var(--maia-border);
  border-radius: var(--maia-radius-2xl);
  background: var(--maia-card);
}

html.userpatch-maia.userpatch-detail-page .userpatch-quality-filter {
  display: inline-flex;
  min-inline-size: 2.75rem;
  min-block-size: 2.125rem;
  align-items: center;
  justify-content: center;
  padding: 0 0.625rem;
  border: 0;
  border-radius: var(--maia-radius-xl);
  background: transparent;
  color: var(--maia-muted-foreground);
  font: inherit;
  font-size: 0.8125rem;
  font-weight: 500;
  cursor: pointer;
  transition:
    transform 140ms var(--ease-out),
    background-color 140ms ease,
    color 140ms ease;
}

html.userpatch-maia.userpatch-detail-page .userpatch-quality-filter[aria-pressed="true"] {
  background: var(--maia-secondary);
  color: var(--maia-foreground);
}

@media (hover: hover) and (pointer: fine) {
  html.userpatch-maia.userpatch-detail-page .userpatch-quality-filter:hover {
    background: var(--maia-secondary);
    color: var(--maia-foreground);
  }
}

html.userpatch-maia.userpatch-detail-page .userpatch-quality-filter:active {
  transform: scale(0.96);
}

html.userpatch-maia.userpatch-detail-page .userpatch-quality-filter:focus-visible {
  outline: 2px solid var(--maia-ring);
  outline-offset: 2px;
}

html.userpatch-maia.userpatch-detail-page .userpatch-quality-filter img {
  display: block;
  inline-size: 1.625rem;
  block-size: 0.9375rem;
  filter: brightness(0) invert(1);
}

html.userpatch-maia.userpatch-detail-page .userpatch-release-status {
  grid-column: 1 / -1;
  margin: 0;
  color: var(--maia-muted-foreground);
  font-size: 0.8125rem;
}

html.userpatch-maia.userpatch-detail-page .userpatch-movie-releases .space-y-4 {
  display: flex;
  flex-direction: column;
  gap: 0;
}

html.userpatch-maia.userpatch-detail-page .userpatch-movie-releases .space-y-4 > :not([hidden]) ~ :not([hidden]) {
  margin-top: 0 !important;
}

html.userpatch-maia.userpatch-detail-page .userpatch-movie-releases .download-group {
  margin: 0;
  padding: 0;
  border-block-end: 1px solid var(--maia-border);
}

html.userpatch-maia.userpatch-detail-page .userpatch-movie-releases .download-group-title {
  min-block-size: 3rem;
  margin: 0;
  padding: 0.75rem 0 !important;
  border-block-end: 1px solid var(--maia-border) !important;
  font-size: 0.9375rem !important;
}

html.userpatch-maia.userpatch-detail-page .userpatch-movie-releases .download-group-title:hover {
  background: transparent !important;
}

html.userpatch-maia.userpatch-detail-page .userpatch-movie-releases .download-item {
  min-inline-size: 0;
  margin: 0 !important;
  padding: 0;
}

html.userpatch-maia.userpatch-detail-page .userpatch-movie-releases .download-header {
  min-block-size: 5.25rem;
  gap: 1rem;
  padding: 0.875rem 0 !important;
  cursor: pointer;
}

html.userpatch-maia.userpatch-detail-page .userpatch-movie-releases .download-header:hover {
  background: color-mix(in oklch, var(--maia-muted) 42%, transparent) !important;
}

html.userpatch-maia.userpatch-detail-page .userpatch-movie-releases .download-title-text {
  font-size: 0.9375rem;
  font-weight: 500;
  line-height: 1.4;
}

html.userpatch-maia.userpatch-detail-page .userpatch-movie-releases .download-item.userpatch-filter-hidden,
html.userpatch-maia.userpatch-detail-page .userpatch-movie-releases .download-group.userpatch-filter-hidden {
  display: none !important;
}

@media (max-width: 46rem) {
  html.userpatch-maia.userpatch-detail-page .content-sidebar {
    position: static;
    block-size: auto;
  }

  html.userpatch-maia.userpatch-detail-page .userpatch-detail-stack {
    inline-size: min(100%, 28rem);
    margin-inline: auto;
  }

  html.userpatch-maia.userpatch-detail-page .content-sidebar .poster-container {
    inline-size: min(65vw, 17rem);
  }

  html.userpatch-maia.userpatch-detail-page .userpatch-release-toolbar {
    grid-template-columns: minmax(0, 1fr);
  }

  html.userpatch-maia.userpatch-detail-page .userpatch-quality-filters {
    justify-self: start;
  }
}

@media (min-width: 40rem) {
  html.userpatch-maia.userpatch-detail-page .content-sidebar .poster-container {
    border-radius: 1.5rem !important;
  }
}

html.userpatch-maia.userpatch-detail-page .userpatch-media-badge {
  display: inline-flex;
  min-inline-size: 0;
  min-block-size: 0;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: 0;
  border-radius: 0;
  background: transparent;
  box-shadow: none;
}

html.userpatch-maia.userpatch-detail-page .userpatch-media-badge img {
  inline-size: auto;
  max-inline-size: none;
  block-size: 1rem;
}

html.userpatch-maia.userpatch-detail-page .userpatch-release-toolbar {
  display: contents;
}

html.userpatch-maia.userpatch-detail-page .userpatch-quality-tabs {
  position: sticky;
  inset-block-start: 0;
  z-index: 5;
  isolation: isolate;
  display: flex;
  inline-size: fit-content;
  max-inline-size: 100%;
  align-items: center;
  gap: 2px;
  overflow: visible;
  margin-block: 0 0.75rem;
  margin-inline-start: auto;
  padding: 0.25rem;
  border: 0;
  border-radius: 1rem;
  background: transparent;
  box-shadow: none;
  scrollbar-width: none;
}

html.userpatch-maia.userpatch-detail-page .userpatch-quality-tabs[hidden] {
  display: none !important;
}

html.userpatch-maia.userpatch-detail-page .userpatch-series-selects > .userpatch-quality-tabs {
  position: relative;
  inset-block-start: auto;
  margin: 0;
  flex: 0 0 auto;
}

html.userpatch-maia.userpatch-detail-page .userpatch-quality-tabs::-webkit-scrollbar {
  display: none;
}

html.userpatch-maia.userpatch-detail-page .userpatch-quality-indicator {
  position: absolute;
  z-index: 0;
  inset-block-start: 0;
  inset-inline-start: 0;
  display: block;
  inline-size: 100px;
  block-size: 36px;
  border-radius:
    var(--userpatch-quality-radius-x, 12px) /
    var(--userpatch-quality-radius-y, 12px);
  background: var(--maia-selection-bg, rgb(255 255 255 / 0.15));
  box-shadow: var(--maia-selection-shadow, inset 0 1px 2px rgb(255 255 255 / 0.12));
  opacity: 0;
  pointer-events: none;
  transform: translate3d(
      var(--userpatch-quality-x, 0px),
      var(--userpatch-quality-y, 0px),
      0
    )
    scale(
      var(--userpatch-quality-scale-x, 1),
      var(--userpatch-quality-scale-y, 1)
    );
  transform-origin: left top;
}

html.userpatch-maia.userpatch-detail-page .userpatch-quality-indicator[data-ready="true"] {
  opacity: 1;
}

html.userpatch-maia.userpatch-detail-page .userpatch-quality-indicator[data-animate="true"] {
  transition: transform 240ms cubic-bezier(0.77, 0, 0.175, 1);
}

html.userpatch-maia.userpatch-detail-page .userpatch-quality-tab {
  position: relative;
  z-index: 1;
  display: flex;
  min-block-size: 40px;
  flex: none;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 8px 14px;
  border: 0;
  border-radius: 12px;
  background: transparent !important;
  color: var(--maia-muted-foreground);
  font: inherit;
  font-weight: 500;
  line-height: 1;
  cursor: pointer;
  transition:
    transform 140ms var(--ease-out),
    color 140ms var(--ease-out);
}

html.userpatch-maia.userpatch-detail-page .userpatch-quality-tab[data-tab-content="label"] {
  min-inline-size: 48px;
  font-size: 0.875rem !important;
}

html.userpatch-maia.userpatch-detail-page body .userpatch-quality-tabs .userpatch-quality-tab,
html.userpatch-maia.userpatch-detail-page body .userpatch-quality-tabs .userpatch-quality-tab[data-tab-content="label"] {
  font-size: 0.875rem !important;
}

html.userpatch-maia.userpatch-detail-page .userpatch-quality-tab[aria-pressed="true"] {
  color: var(--maia-foreground);
}

@media (hover: hover) and (pointer: fine) {
  html.userpatch-maia.userpatch-detail-page .userpatch-quality-tab:hover:not(:disabled) {
    color: var(--maia-foreground);
  }
}

html.userpatch-maia.userpatch-detail-page .userpatch-quality-tab:active:not(:disabled) {
  transform: scale(0.96);
}

html.userpatch-maia.userpatch-detail-page .userpatch-quality-tabs,
html.userpatch-maia.userpatch-detail-page .userpatch-quality-filters,
html.userpatch-maia.userpatch-detail-page #series-tabs {
  touch-action: auto;
}

html.userpatch-maia.userpatch-detail-page .userpatch-quality-tab:focus-visible {
  outline: 2px solid var(--maia-ring);
  outline-offset: -2px;
}

html.userpatch-maia.userpatch-detail-page .userpatch-quality-tab:disabled {
  color: var(--maia-muted-foreground);
  cursor: not-allowed;
}

html.userpatch-maia.userpatch-detail-page .userpatch-quality-tab img {
  display: block;
  inline-size: auto;
  block-size: 1.125rem;
  filter: invert(1);
}

html.userpatch-maia.userpatch-detail-page .userpatch-quality-tab:disabled img {
  filter: invert(1) grayscale(1) opacity(0.45);
}

html.userpatch-maia.userpatch-detail-page .userpatch-release-search,
html.userpatch-maia.userpatch-detail-page .userpatch-release-status,
html.userpatch-maia.userpatch-detail-page .userpatch-movie-releases .download-group-title {
  display: none !important;
}

html.userpatch-maia.userpatch-detail-page .userpatch-movie-releases .space-y-4 {
  display: flex;
  flex-direction: column;
  gap: 0;
  border-block-start: 1px solid
    color-mix(in oklch, var(--maia-foreground) 16%, transparent) !important;
  border-block-end: 0 !important;
}

html.userpatch-maia.userpatch-detail-page .userpatch-movie-releases .space-y-4 > :not([hidden]) ~ :not([hidden]) {
  margin-block-start: 0 !important;
}

html.userpatch-maia.userpatch-detail-page .userpatch-movie-releases .download-group {
  display: contents;
}

html.userpatch-maia.userpatch-detail-page .userpatch-movie-releases .download-item {
  min-inline-size: 0;
  min-block-size: 96px;
  margin: 0 !important;
  padding: 0 !important;
  border: 0 !important;
  border-radius: 0 !important;
  background: transparent !important;
  box-shadow: none !important;
}

html.userpatch-maia.userpatch-detail-page .userpatch-release-item {
  display: block;
}

html.userpatch-maia.userpatch-detail-page .userpatch-release-row {
  display: flex;
  inline-size: 100%;
  min-block-size: 96px;
  align-items: center;
  gap: 12px;
  box-sizing: border-box;
  padding: 24px 16px;
  border-block-end: 1px solid
    color-mix(in oklch, var(--maia-foreground) 16%, transparent);
  color: var(--maia-foreground);
  transition: background 160ms var(--ease-out);
}

html.userpatch-maia .userpatch-release-row[data-userpatch-opened="true"],
html.userpatch-maia .userpatch-release-item[data-userpatch-opened="true"] .userpatch-release-row,
html.userpatch-maia.userpatch-detail-page .userpatch-release-row[data-userpatch-opened="true"],
html.userpatch-maia.userpatch-detail-page .userpatch-release-item[data-userpatch-opened="true"] .userpatch-release-row {
  background: color-mix(in oklch, var(--maia-opened-blue) 30%, transparent) !important;
}

@media (hover: hover) and (pointer: fine) {
  html.userpatch-maia .userpatch-release-row[data-userpatch-opened="true"]:hover,
  html.userpatch-maia .userpatch-release-item[data-userpatch-opened="true"]:hover .userpatch-release-row,
  html.userpatch-maia.userpatch-detail-page .userpatch-release-row[data-userpatch-opened="true"]:hover,
  html.userpatch-maia.userpatch-detail-page .userpatch-release-item[data-userpatch-opened="true"]:hover .userpatch-release-row {
    background: color-mix(in oklch, var(--maia-opened-blue) 38%, transparent) !important;
  }
}

html.userpatch-maia.userpatch-detail-page .userpatch-release-copy {
  display: flex;
  min-inline-size: 0;
  flex: 1;
  flex-direction: column;
  gap: 4px;
}

html.userpatch-maia .userpatch-release-file-title,
html.userpatch-maia .userpatch-release-file-text,
html.userpatch-maia.userpatch-detail-page .userpatch-release-file-title,
html.userpatch-maia.userpatch-detail-page .userpatch-release-file-text,
html.userpatch-maia[data-detail-theme] .userpatch-release-file-title,
html.userpatch-maia[data-detail-theme] .userpatch-release-file-text {
  color: var(--maia-foreground);
  font-size: 0.875rem !important;
  font-weight: 400;
  line-height: ${CONFIG.filenameLineHeight};
  overflow-wrap: anywhere;
}

@media (min-width: 761px) {
  html.userpatch-maia .userpatch-release-file-title,
  html.userpatch-maia .userpatch-release-file-text,
  html.userpatch-maia.userpatch-detail-page .userpatch-release-file-title,
  html.userpatch-maia.userpatch-detail-page .userpatch-release-file-text,
  html.userpatch-maia[data-detail-theme] .userpatch-release-file-title,
  html.userpatch-maia[data-detail-theme] .userpatch-release-file-text {
    font-size: 1.125rem !important;
  }
}

html.userpatch-maia.userpatch-detail-page .userpatch-release-file-text {
  overflow-wrap: break-word;
  word-break: normal;
}

html.userpatch-maia.userpatch-detail-page .userpatch-release-file-title[data-clamped] {
  max-block-size: var(--userpatch-filename-max-block-size);
  overflow: clip;
}

html.userpatch-maia.userpatch-detail-page .userpatch-release-file-title[data-expanded] {
  max-block-size: none;
  overflow: visible;
}

html.userpatch-maia.userpatch-detail-page[data-detail-theme] .userpatch-filename-toggle {
  display: inline;
  margin-inline-start: 0.25rem;
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--maia-muted-foreground);
  font: inherit;
  font-size: inherit !important;
  font-weight: 500;
  line-height: inherit;
  text-decoration: underline;
  text-underline-offset: 2px;
  cursor: pointer;
}

html.userpatch-maia.userpatch-detail-page .userpatch-filename-toggle[hidden] {
  display: none !important;
}

html.userpatch-maia.userpatch-detail-page .userpatch-filename-toggle:focus-visible {
  border-radius: 2px;
  outline: 2px solid var(--maia-ring);
  outline-offset: 2px;
}

html.userpatch-maia.userpatch-detail-page .content-main .userpatch-release-row .userpatch-release-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  color: var(--maia-muted-foreground);
  font-size: 0.875rem !important;
  font-weight: 400;
  line-height: 1.4;
  overflow-wrap: anywhere;
}

html.userpatch-maia.userpatch-detail-page .userpatch-release-meta .userpatch-release-size {
  font-size: inherit !important;
}

html.userpatch-maia.userpatch-detail-page .content-main .userpatch-release-row .userpatch-release-meta .userpatch-series-language-badge {
  align-self: center;
}

html.userpatch-maia.userpatch-detail-page body .content-main .userpatch-release-meta {
  font-size: 0.875rem !important;
}

html.userpatch-maia.userpatch-detail-page .userpatch-release-actions {
  position: relative;
  z-index: 1;
  display: flex;
  flex: none;
  align-items: center;
  gap: 12px;
}

html.userpatch-maia.userpatch-detail-page .userpatch-provider-link {
  position: relative;
  display: inline-flex;
  inline-size: 40px;
  block-size: 40px;
  align-items: center;
  justify-content: center;
  padding: 0 !important;
  border: 0 !important;
  border-radius: 0 !important;
  outline-offset: 3px;
  background: transparent !important;
  color: inherit;
  box-shadow: none !important;
  text-decoration: none;
  transition:
    transform 140ms var(--ease-out),
    opacity 140ms var(--ease-out);
}

@media (hover: hover) and (pointer: fine) {
  html.userpatch-maia.userpatch-detail-page .userpatch-provider-link:hover {
    background: transparent !important;
    opacity: 0.78;
  }
}

html.userpatch-maia.userpatch-detail-page .userpatch-provider-link:active {
  transform: scale(0.95);
  opacity: 0.6;
}

html.userpatch-maia.userpatch-detail-page .userpatch-provider-link:focus-visible {
  outline: 2px solid var(--maia-ring);
}

html.userpatch-maia.userpatch-detail-page .userpatch-provider-link img {
  display: block;
  inline-size: 36px;
  block-size: 36px;
  object-fit: contain;
}

html.userpatch-maia.userpatch-detail-page body .userpatch-provider-tooltip {
  position: fixed;
  z-index: 2147483647;
  display: inline-flex;
  width: max-content;
  max-width: 20rem;
  align-items: center;
  padding: 0.375rem 0.75rem;
  border-radius: 1rem;
  background: var(--maia-foreground);
  color: var(--maia-background);
  font-size: 0.75rem !important;
  font-weight: 400;
  line-height: 1.25;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transform: translate(-50%, 2px) scale(0.95);
  transform-origin: center bottom;
  pointer-events: none;
  transition:
    opacity 120ms var(--ease-out),
    transform 120ms var(--ease-out),
    visibility 120ms var(--ease-out);
}

html.userpatch-maia.userpatch-detail-page body .userpatch-provider-tooltip[hidden] {
  display: none !important;
}

html.userpatch-maia.userpatch-detail-page body .userpatch-provider-tooltip[role="tooltip"] {
  font-size: 0.75rem !important;
}

html.userpatch-maia.userpatch-detail-page body .userpatch-provider-tooltip[data-state="open"] {
  opacity: 1;
  visibility: visible;
  transform: translate(-50%, 0) scale(1);
}

html.userpatch-maia.userpatch-detail-page body .userpatch-provider-tooltip::after {
  position: absolute;
  z-index: 0;
  inline-size: 0.625rem;
  block-size: 0.625rem;
  background: inherit;
  content: "";
  transform: translateX(-50%) rotate(45deg);
}

html.userpatch-maia.userpatch-detail-page body .userpatch-provider-tooltip[data-side="top"]::after {
  inset-block-start: calc(100% - 0.3125rem);
  inset-inline-start: 50%;
}

html.userpatch-maia.userpatch-detail-page body .userpatch-provider-tooltip[data-side="bottom"] {
  transform-origin: center top;
}

html.userpatch-maia.userpatch-detail-page body .userpatch-provider-tooltip[data-side="bottom"]::after {
  inset-block-end: calc(100% - 0.3125rem);
  inset-inline-start: 50%;
}

html.userpatch-maia.userpatch-detail-page .userpatch-release-item.userpatch-filter-hidden {
  display: none !important;
}

@media (max-width: 46rem) {
  html.userpatch-maia.userpatch-detail-page .userpatch-release-row {
    align-items: center;
    padding: 16px 8px;
  }

  html.userpatch-maia.userpatch-detail-page .userpatch-release-actions {
    gap: 8px;
  }

  html.userpatch-maia.userpatch-detail-page .userpatch-provider-link {
    inline-size: 34px;
    block-size: 34px;
  }

  html.userpatch-maia.userpatch-detail-page .userpatch-provider-link img {
    inline-size: 30px;
    block-size: 30px;
  }
}

html.userpatch-maia header.sticky > .header {
  /* 6px inset keeps the container's 14px radius concentric with this 20px pill */
  padding: 0.375rem !important;
  border-radius: 1.25rem !important;
}

html.userpatch-maia header.sticky > .header > .container {
  block-size: 100%;
  min-block-size: 100%;
  border-radius: inherit;
}

html.userpatch-maia.userpatch-detail-page .content-main.userpatch-release-main {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto auto;
  /* Match the poster top after the sidebar inset and brand-to-poster gap. */
  grid-template-rows: 4rem 2rem auto;
  align-content: start;
  gap: 0;
  padding-block-start: 0 !important;
}

html.userpatch-maia.userpatch-detail-page .userpatch-release-toolbar {
  display: contents;
}

/* Keep the movie filter centered on the logo in the 1rem-offset sidebar. */
html.userpatch-maia.userpatch-detail-page .userpatch-release-main:not(.userpatch-series-main) > .userpatch-release-toolbar > .userpatch-quality-tabs {
  grid-row: 1;
  grid-column: 1 / -1;
  align-self: center;
  justify-self: end;
  inset-block-start: 1.5rem;
  margin: 0;
}

html.userpatch-maia.userpatch-detail-page .userpatch-release-main > .userpatch-movie-releases {
  grid-row: 3;
  grid-column: 1 / -1;
  min-inline-size: 0;
  margin: 0;
}

html.userpatch-maia.userpatch-detail-page .content-main.userpatch-series-main {
  grid-template-columns: minmax(0, 1fr) auto;
}

html.userpatch-maia.userpatch-detail-page .userpatch-series-main > .userpatch-series-toolbar > #series-tabs {
  grid-row: 1;
  grid-column: 1;
  align-self: center;
  justify-self: start;
  margin: 0;
}

html.userpatch-maia.userpatch-detail-page .userpatch-series-selects {
  display: flex;
  flex-wrap: wrap;
  grid-row: 1;
  grid-column: 2;
  align-self: center;
  justify-self: end;
  gap: 0.5rem;
  inline-size: max-content;
  min-inline-size: 0;
  max-inline-size: 100%;
}

html.userpatch-maia.userpatch-detail-page .userpatch-series-selects[data-mode="complete-pack"] {
  inline-size: auto;
  max-inline-size: 100%;
}

html.userpatch-maia.userpatch-detail-page .userpatch-season-control {
  position: relative;
  z-index: 10;
  display: flex;
  align-self: center;
  flex: 0 1 var(--userpatch-select-width, max-content);
  inline-size: var(--userpatch-select-width, max-content);
  min-inline-size: 0;
  max-inline-size: 100%;
  padding: 0.25rem;
  border: 0;
  border-radius: 1rem;
  background: transparent;
  isolation: isolate;
}

html.userpatch-maia.userpatch-detail-page .userpatch-season-control[hidden] {
  display: none !important;
}

html.userpatch-maia.userpatch-detail-page .userpatch-season-trigger {
  display: flex;
  inline-size: 100%;
  box-sizing: border-box;
  min-inline-size: 0;
  block-size: 2.125rem;
  align-items: center;
  justify-content: space-between;
  gap: 0.375rem;
  padding: 0.375rem 0.75rem;
  border: 1px solid transparent;
  border-radius: 0.75rem;
  background: var(--maia-selection-bg, rgb(255 255 255 / 0.15));
  box-shadow: var(--maia-selection-shadow, inset 0 1px 2px rgb(255 255 255 / 0.12));
  color: var(--maia-foreground);
  font: inherit;
  font-size: 0.875rem !important;
  font-weight: 400;
  line-height: 1.25;
  text-align: start;
  white-space: nowrap;
  cursor: pointer;
  transition:
    transform 140ms var(--ease-out),
    border-color 140ms ease,
    background-color 140ms ease;
}

@media (hover: hover) and (pointer: fine) {
  html.userpatch-maia.userpatch-detail-page .userpatch-season-trigger:hover:not(:disabled) {
    background: var(--maia-select-hover-bg, rgb(255 255 255 / 0.2));
  }
}

html.userpatch-maia.userpatch-detail-page .userpatch-season-trigger:active:not(:disabled) {
  transform: scale(0.98);
  background: var(--maia-select-hover-bg, rgb(255 255 255 / 0.25));
}

html.userpatch-maia.userpatch-detail-page .userpatch-season-trigger:focus-visible {
  border-color: var(--maia-ring);
  outline: none;
  box-shadow: 0 0 0 3px color-mix(in oklch, var(--maia-ring) 50%, transparent);
}

html.userpatch-maia.userpatch-detail-page .userpatch-season-trigger:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

html.userpatch-maia.userpatch-detail-page .userpatch-season-value {
  min-inline-size: 0;
  flex: 1 1 auto;
  overflow: hidden;
  text-overflow: ellipsis;
}

html.userpatch-maia.userpatch-detail-page .userpatch-version-marker {
  display: inline-flex;
  inline-size: fit-content;
  flex: none;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  color: var(--maia-muted-foreground);
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1;
  white-space: nowrap;
}

html.userpatch-maia.userpatch-detail-page .userpatch-version-marker[data-version="1"] {
  color: #60a5fa;
}

html.userpatch-maia.userpatch-detail-page .userpatch-version-marker[data-version="2"] {
  color: #a78bfa;
}

html.userpatch-maia.userpatch-detail-page .userpatch-season-version-marker[hidden] {
  display: none !important;
}

html.userpatch-maia.userpatch-detail-page .userpatch-series-quality-group {
  display: flex;
  flex: 0 1 auto;
  flex-direction: column;
  gap: 0.25rem;
  inline-size: auto;
  min-inline-size: 0;
  max-inline-size: 100%;
}

html.userpatch-maia.userpatch-detail-page .userpatch-series-quality-group[hidden] {
  display: none !important;
}

html.userpatch-maia.userpatch-detail-page .userpatch-series-quality-group > .userpatch-series-quality-control {
  flex: initial;
  inline-size: 100%;
  max-inline-size: 100%;
}

html.userpatch-maia.userpatch-detail-page .userpatch-series-language-badge {
  position: relative;
  display: inline-flex;
  inline-size: fit-content;
  max-inline-size: 100%;
  min-inline-size: 0;
  align-self: flex-start;
  align-items: center;
  isolation: isolate;
  gap: 0.375rem;
  min-block-size: 1.25rem;
  padding: 0.125rem 0.5rem;
  border: 1px solid color-mix(in oklch, var(--maia-foreground) 10%, transparent);
  border-radius: var(--maia-radius-4xl);
  background: transparent;
  color: var(--maia-foreground);
  box-shadow: none;
  text-shadow: none;
  font-size: 0.875rem !important;
  font-weight: 400;
  line-height: 1.25;
  overflow-wrap: anywhere;
}

html.userpatch-maia.userpatch-detail-page .userpatch-series-language-text {
  max-inline-size: 100%;
  min-inline-size: 0;
  overflow-wrap: anywhere;
  text-box: trim-both cap alphabetic;
}

html.userpatch-maia.userpatch-detail-page body
  .userpatch-series-selects
  .userpatch-series-quality-group
  :is(.userpatch-series-language-badge, .userpatch-series-language-text) {
  font-size: 0.875rem !important;
}

@media (min-width: ${CONFIG.mobileLayoutBreakpointRem + 0.01}rem) {
  html.userpatch-maia.userpatch-detail-page .userpatch-series-quality-group {
    flex: 0 1 auto;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
    inline-size: auto;
  }

  html.userpatch-maia.userpatch-detail-page
    .userpatch-series-quality-group
    > .userpatch-series-quality-control {
    flex: 0 1 auto;
    inline-size: auto;
  }

  html.userpatch-maia.userpatch-detail-page .userpatch-series-language-badge {
    align-self: center;
    flex: 0 1 auto;
  }
}

html.userpatch-maia.userpatch-detail-page .userpatch-series-language-icon {
  inline-size: 1rem;
  block-size: 1rem;
  flex: none;
}

html.userpatch-maia.userpatch-detail-page .userpatch-series-language-badge[hidden] {
  display: none !important;
}

html.userpatch-maia.userpatch-detail-page .userpatch-season-positioner {
  position: fixed;
  z-index: 2147483601;
  inline-size: max-content;
  pointer-events: none;
  isolation: isolate;
}

html.userpatch-maia.userpatch-detail-page .userpatch-season-positioner[hidden] {
  display: none !important;
}

html.userpatch-maia.userpatch-detail-page .userpatch-season-popup {
  display: flex;
  inline-size: var(--userpatch-anchor-width, 100%);
  min-inline-size: min(max(var(--userpatch-anchor-width, 0px), 9rem), calc(100vw - 1rem));
  max-inline-size: calc(100vw - 1rem);
  max-block-size: var(--userpatch-popup-height, 22rem);
  flex-direction: column;
  box-sizing: border-box;
  pointer-events: auto;
  border: 1px solid
    color-mix(in oklch, var(--maia-foreground) 8%, transparent);
  border-radius: 1rem;
  background: var(--maia-popover);
  color: var(--maia-popover-foreground);
  box-shadow: 0 16px 40px rgb(0 0 0 / 0.28);
  overflow: hidden;
  opacity: 1;
  transform: scale(1);
  transform-origin: top left;
  transition:
    opacity 140ms var(--ease-out),
    transform 140ms var(--ease-out);
}

html.userpatch-maia.userpatch-detail-page .userpatch-season-popup[data-side="top"] {
  transform-origin: bottom left;
}

@starting-style {
  html.userpatch-maia.userpatch-detail-page .userpatch-season-popup {
    opacity: 0;
    transform: scale(0.96);
  }
}

html.userpatch-maia.userpatch-detail-page .userpatch-season-menu {
  position: relative;
  display: block;
  inline-size: 100%;
  min-inline-size: 0;
  min-block-size: 0;
  max-block-size: var(--userpatch-menu-height, 22rem);
  flex: 0 1 auto;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;
  overscroll-behavior-x: auto;
  overscroll-behavior-y: contain;
  padding: 0.25rem;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
}

html.userpatch-maia.userpatch-detail-page .userpatch-season-menu::-webkit-scrollbar {
  display: none;
}

html.userpatch-maia.userpatch-detail-page .userpatch-season-scroll-control {
  display: flex;
  min-block-size: 1.5rem;
  flex: 0 0 1.5rem;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
  border: 0;
  background: transparent;
  color: var(--maia-muted-foreground);
  cursor: pointer;
  pointer-events: auto;
  transition:
    transform 140ms var(--ease-out),
    color 140ms ease;
}

html.userpatch-maia.userpatch-detail-page .userpatch-season-scroll-control[hidden] {
  display: none !important;
}

@media (hover: hover) and (pointer: fine) {
  html.userpatch-maia.userpatch-detail-page .userpatch-season-scroll-control:hover {
    color: var(--maia-foreground);
  }
}

html.userpatch-maia.userpatch-detail-page .userpatch-season-scroll-control:active {
  transform: scale(0.95);
  color: var(--maia-foreground);
}

html.userpatch-maia.userpatch-detail-page .userpatch-season-scroll-control svg {
  inline-size: 1rem;
  block-size: 1rem;
}

html.userpatch-maia.userpatch-detail-page .userpatch-season-option {
  position: relative;
  display: flex;
  inline-size: 100%;
  min-block-size: 2.25rem;
  block-size: auto;
  box-sizing: border-box;
  align-items: center;
  gap: 0.625rem;
  padding: 0.5rem 2.25rem 0.5rem 0.75rem;
  border-radius: 0.75rem;
  color: var(--maia-popover-foreground);
  font-size: 0.875rem;
  line-height: 1.35;
  text-align: start;
  white-space: normal;
  overflow-wrap: anywhere;
  cursor: default;
  user-select: none;
  outline: none;
  transition:
    background-color 140ms var(--ease-out),
    color 140ms var(--ease-out);
}

@media (hover: hover) and (pointer: fine) {
  html.userpatch-maia.userpatch-detail-page .userpatch-season-option:hover {
    background: var(--maia-accent);
    color: var(--maia-accent-foreground);
  }
}

html.userpatch-maia.userpatch-detail-page .userpatch-season-option:focus-visible,
html.userpatch-maia.userpatch-detail-page .userpatch-season-option[data-highlighted] {
  outline: none;
  background: var(--maia-accent);
  color: var(--maia-accent-foreground);
}

html.userpatch-maia.userpatch-detail-page .userpatch-season-option-label {
  min-inline-size: 0;
  flex: 1 1 auto;
  white-space: normal;
  overflow-wrap: anywhere;
  word-break: normal;
  line-height: 1.35;
}

html.userpatch-maia.userpatch-detail-page .userpatch-season-option-check {
  position: absolute;
  inset-inline-end: 0.5rem;
  inset-block-start: 50%;
  transform: translateY(-50%);
  inline-size: 1rem;
  block-size: 1rem;
  opacity: 0;
  transition: opacity 120ms var(--ease-out);
  pointer-events: none;
}

html.userpatch-maia.userpatch-detail-page .userpatch-season-option[aria-selected="true"] .userpatch-season-option-check {
  opacity: 1;
}

html.userpatch-maia.userpatch-detail-page .userpatch-season-chevron {
  display: block;
  flex: none;
  inline-size: 1rem;
  block-size: 1rem;
  color: var(--maia-muted-foreground);
  pointer-events: none;
}

html.userpatch-maia.userpatch-detail-page .userpatch-series-main > .userpatch-series-releases {
  grid-row: 3;
  grid-column: 1 / -1;
    min-inline-size: 0;
    margin: 0;
}

/* Keep the show filters together and align the release list with the poster. */
html.userpatch-maia.userpatch-detail-page .content-main.userpatch-series-main {
  grid-template-columns: minmax(0, 1fr);
  grid-template-rows: max-content 2rem auto;
}

html.userpatch-maia.userpatch-detail-page .userpatch-series-main > .userpatch-series-toolbar {
  position: relative;
  z-index: 20;
  inset-block-start: 0;
  display: flex;
  grid-row: 1;
  grid-column: 1 / -1;
  min-inline-size: 0;
  min-block-size: 3rem;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.5rem 1rem;
  padding-block: 0;
  background: transparent;
}

html.userpatch-maia.userpatch-detail-page .userpatch-series-main > .userpatch-series-toolbar > #series-tabs {
  position: relative;
  grid-row: auto;
  grid-column: auto;
  align-self: center;
  justify-self: auto;
  flex: 0 0 auto;
  margin: 0;
}

html.userpatch-maia.userpatch-detail-page .userpatch-series-main > .userpatch-series-toolbar > .userpatch-series-selects {
  grid-row: auto;
  grid-column: auto;
  align-self: center;
  justify-self: auto;
  display: flex;
  min-inline-size: 0;
  max-inline-size: 100%;
  flex: 1 1 22rem;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 0.5rem;
  margin-inline-start: 0;
}

@media (min-width: ${CONFIG.mobileLayoutBreakpointRem + 0.01}rem) {
  html.userpatch-maia.userpatch-detail-page .userpatch-series-main > .userpatch-series-toolbar > #series-tabs {
    inset-block-start: 1.5rem;
  }

  html.userpatch-maia.userpatch-detail-page .userpatch-series-main > .userpatch-series-toolbar > .userpatch-series-selects {
    position: relative;
    inset-block-start: 1.5rem;
    flex: 1 1 auto;
    flex-wrap: nowrap;
    inline-size: auto;
  }

  html.userpatch-maia.userpatch-detail-page .userpatch-series-selects > .userpatch-season-control {
    align-self: flex-start;
  }

  html.userpatch-maia.userpatch-detail-page .userpatch-series-quality-group {
    flex-wrap: wrap;
  }

  html.userpatch-maia.userpatch-detail-page .userpatch-series-selects > .userpatch-quality-tabs {
    margin-inline-start: auto;
    align-self: center;
  }
}

html.userpatch-maia.userpatch-detail-page .userpatch-series-selects[data-mode="complete-pack"] {
  inline-size: auto;
}

html.userpatch-maia.userpatch-detail-page .userpatch-season-control {
  inline-size: auto;
}

html.userpatch-maia.userpatch-detail-page .userpatch-season-trigger {
  block-size: 2.5rem;
}

html.userpatch-maia.userpatch-detail-page .userpatch-series-main > .userpatch-series-releases {
  grid-row: 3;
}

html.userpatch-maia .movie-card:hover,
html.userpatch-maia .movie-card:active {
  transform: none !important;
  filter: none !important;
  box-shadow: none !important;
}

html.userpatch-maia .movie-card:hover .movie-card-image,
html.userpatch-maia .movie-card:active .movie-card-image {
  transform: none !important;
  filter: none !important;
  border-color: color-mix(in oklch, var(--maia-foreground) 15%, transparent) !important;
  box-shadow: var(--maia-card-depth-shadow) !important;
}

html.userpatch-maia .movie-card:hover .movie-card-image.userpatch-ongoing-poster,
html.userpatch-maia .movie-card:active .movie-card-image.userpatch-ongoing-poster {
  border-color: transparent !important;
}

html.userpatch-maia .movie-card:hover *,
html.userpatch-maia .movie-card:active * {
  transform: none !important;
  filter: none !important;
  transition: none !important;
}

html.userpatch-maia.userpatch-detail-page .userpatch-series-source {
  display: none !important;
}

html.userpatch-maia.userpatch-detail-page #series-tabs.userpatch-quality-tabs {
  position: relative;
  display: inline-flex;
  inline-size: fit-content;
  min-block-size: 0;
  gap: 2px;
  overflow: visible;
  padding: 0.25rem;
  border: 0 !important;
  border-radius: 1rem !important;
  background: transparent !important;
  box-shadow: none;
  isolation: isolate;
}

html.userpatch-maia.userpatch-detail-page #series-tabs .series-tab.userpatch-quality-tab {
  position: relative;
  z-index: 1;
  display: inline-flex;
  min-block-size: 40px;
  flex: none;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 8px 14px !important;
  border: 0 !important;
  border-radius: 12px !important;
  background: transparent !important;
  box-shadow: none !important;
  color: var(--maia-muted-foreground) !important;
  font-size: 0.875rem !important;
  font-weight: 500 !important;
  line-height: 1;
  transition:
    transform 140ms var(--ease-out),
    color 140ms var(--ease-out);
  cursor: pointer;
}

html.userpatch-maia.userpatch-detail-page #series-tabs .series-tab.userpatch-quality-tab.active {
  border-color: transparent !important;
  background: transparent !important;
  box-shadow: none !important;
  color: var(--maia-foreground) !important;
}

html.userpatch-maia.userpatch-detail-page #series-tabs .series-tab.userpatch-quality-tab:disabled {
  color: var(--maia-muted-foreground) !important;
  cursor: not-allowed;
  opacity: 0.45;
}

html.userpatch-maia.userpatch-detail-page #series-tabs .series-tab.userpatch-quality-tab svg {
  inline-size: 1rem !important;
  block-size: 1rem !important;
  fill: none !important;
  stroke: currentColor !important;
}

html.userpatch-maia.userpatch-detail-page #series-tabs .series-tab.userpatch-quality-tab svg * {
  fill: none !important;
  stroke: currentColor !important;
}

html.userpatch-maia.userpatch-detail-page .userpatch-mobile-nav {
  display: none !important;
}

@media (max-width: ${CONFIG.mobileLayoutBreakpointRem}rem) {
  html.userpatch-maia header.sticky {
    display: none !important;
  }

  html.userpatch-maia .userpatch-mobile-nav {
    position: fixed;
    z-index: 2147483600;
    inset-inline: 0;
    inset-block-end: calc(20px + env(safe-area-inset-bottom, 0px));
    display: flex !important;
    inline-size: min(${CONFIG.mobileNavigationWidth}, calc(100vw - 48px));
    min-block-size: 72px;
    block-size: 72px;
    align-items: center;
    gap: 4px;
    box-sizing: border-box;
    margin-inline: auto;
    padding: 5px;
    border: 1px solid color-mix(in oklch, var(--maia-foreground) 10%, transparent);
    border-radius: 20px;
    background: color-mix(in oklch, var(--maia-card) 98%, transparent);
    box-shadow: 0 8px 30px rgb(0 0 0 / 0.38);
    backdrop-filter: saturate(1.8) blur(20px);
    -webkit-backdrop-filter: saturate(1.8) blur(20px);
  }

  html.userpatch-maia.userpatch-detail-page .userpatch-mobile-nav {
    display: none !important;
  }

  html.userpatch-maia .userpatch-mobile-nav-item {
    display: flex;
    min-inline-size: 0;
    min-block-size: 62px;
    flex: 1 1 0;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2px;
    padding: 4px 2px;
    border: 0;
    border-radius: 16px;
    background: transparent;
    color: var(--maia-muted-foreground);
    font: inherit;
    font-size: 0.75rem;
    line-height: 1.25;
    text-decoration: none;
    white-space: nowrap;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    transition:
      transform 140ms var(--ease-out),
      background-color 140ms ease,
      color 140ms ease;
  }

  html.userpatch-maia .userpatch-mobile-nav-item:focus-visible {
    background: color-mix(in oklch, var(--maia-foreground) 10%, transparent);
    color: var(--maia-foreground);
  }

  @media (hover: hover) and (pointer: fine) {
    html.userpatch-maia .userpatch-mobile-nav-item:hover {
      background: color-mix(in oklch, var(--maia-foreground) 10%, transparent);
      color: var(--maia-foreground);
    }
  }

  html.userpatch-maia .userpatch-mobile-nav-item:active {
    transform: scale(0.95);
    background: color-mix(in oklch, var(--maia-foreground) 12%, transparent);
  }

  html.userpatch-maia .userpatch-mobile-nav-item[aria-current="page"] {
    background: var(--maia-selection-bg, color-mix(in oklch, var(--maia-foreground) 9%, transparent));
    box-shadow: inset 0 1px 2px
      color-mix(in oklch, var(--maia-foreground) 12%, transparent);
    color: var(--maia-foreground);
  }

  html.userpatch-maia .userpatch-mobile-nav-item:focus-visible {
    outline: 2px solid var(--maia-ring);
    outline-offset: -2px;
  }

  html.userpatch-maia .userpatch-mobile-nav-icon {
    display: inline-flex;
    inline-size: 1.5rem;
    block-size: 1.5rem;
    flex: none;
    align-items: center;
    justify-content: center;
  }

  html.userpatch-maia .userpatch-mobile-nav-icon svg,
  html.userpatch-maia .userpatch-mobile-nav-icon img {
    display: block;
    inline-size: 1.5rem;
    block-size: 1.5rem;
    object-fit: contain;
  }

  html.userpatch-maia .userpatch-mobile-nav-icon-brand {
    inline-size: 2rem;
    block-size: 2rem;
  }

  html.userpatch-maia .userpatch-mobile-nav-brand-logo {
    inline-size: 2rem !important;
    block-size: 2rem !important;
  }

  html.userpatch-maia .userpatch-mobile-nav-icon svg {
    fill: none !important;
    stroke: currentColor !important;
    stroke-width: 2;
  }

  html.userpatch-maia .page-container {
    padding-block-end: calc(128px + env(safe-area-inset-bottom, 0px)) !important;
  }

  html.userpatch-maia .pagination-container {
    margin-block: 2rem calc(112px + env(safe-area-inset-bottom, 0px)) !important;
  }

  html.userpatch-maia :not(.pagination-container) > .pagination {
    margin-block-end: calc(112px + env(safe-area-inset-bottom, 0px)) !important;
  }

  html.userpatch-maia:not(.userpatch-detail-page)
    .container:not(:has(.pagination-container, .pagination))
    > .card-grid:last-child {
    margin-block-end: calc(112px + env(safe-area-inset-bottom, 0px)) !important;
  }

  html.userpatch-maia.userpatch-detail-page,
  html.userpatch-maia.userpatch-detail-page body {
    block-size: auto;
    min-block-size: 100%;
    overflow: visible;
  }

  html.userpatch-maia.userpatch-detail-page body > .flex.min-h-screen {
    block-size: auto;
    min-block-size: 100dvh;
    overflow: visible;
  }

  html.userpatch-maia.userpatch-detail-page #swup {
    block-size: auto;
    min-block-size: 0;
    overflow: visible;
  }

  html.userpatch-maia.userpatch-detail-page #swup > main {
    display: block;
    overflow: visible;
  }

  html.userpatch-maia.userpatch-detail-page .page-container {
    min-block-size: 100dvh;
    padding: 1rem 1rem calc(128px + env(safe-area-inset-bottom, 0px)) !important;
  }

  html.userpatch-maia.userpatch-detail-page .content-grid.container {
    flex: none;
    grid-template-columns: minmax(0, 1fr);
    gap: ${CONFIG.mobileDetailSectionGapRem}rem;
    min-block-size: auto;
  }

  html.userpatch-maia.userpatch-detail-page .content-sidebar {
    position: static;
    block-size: auto;
    min-block-size: 0;
    align-items: stretch;
  }

  html.userpatch-maia.userpatch-detail-page .userpatch-detail-stack {
    inline-size: min(100%, 28rem);
    margin-inline: auto;
  }

  html.userpatch-maia.userpatch-detail-page .content-sidebar .poster-container {
    position: static !important;
    inset-block-start: auto !important;
    inline-size: min(65vw, 17rem);
  }

  html.userpatch-maia.userpatch-detail-page .content-main {
    block-size: auto;
    min-block-size: 0;
    padding: 0 !important;
    overflow: visible;
    scrollbar-gutter: auto;
  }

  html.userpatch-maia.userpatch-detail-page .content-main.userpatch-release-main {
    grid-template-columns: minmax(0, 1fr) auto;
    grid-template-rows: 3rem 3rem 1rem auto;
  }

  html.userpatch-maia.userpatch-detail-page .content-main.userpatch-series-main {
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: auto 1rem auto;
  }

  html.userpatch-maia.userpatch-detail-page .content-main.userpatch-release-main:not(.userpatch-series-main) {
    display: block;
    grid-template-columns: none;
    grid-template-rows: none;
  }

  html.userpatch-maia.userpatch-detail-page .userpatch-movie-releases {
    grid-row: auto;
    grid-column: auto;
    block-size: auto;
    max-block-size: none;
    margin: 0;
    overflow: visible;
  }

  html.userpatch-maia.userpatch-detail-page .userpatch-release-main:not(.userpatch-series-main) > .userpatch-release-toolbar > .userpatch-quality-tabs {
    position: static;
  }

  html.userpatch-maia.userpatch-detail-page .content-main.userpatch-series-main {
    display: block;
    grid-template-columns: none;
    grid-template-rows: none;
  }

  html.userpatch-maia.userpatch-detail-page .userpatch-series-main > .userpatch-series-toolbar {
    display: contents;
    position: static;
    inset-block-start: auto;
    z-index: auto;
    min-block-size: 0;
  }

  html.userpatch-maia.userpatch-detail-page .userpatch-series-main > .userpatch-series-toolbar > #series-tabs {
    position: relative;
    inset-block-start: auto;
    display: flex;
    inline-size: fit-content;
    max-inline-size: 100%;
    justify-content: center;
    margin-inline: auto;
    margin-block-end: 0.75rem;
  }

  html.userpatch-maia.userpatch-detail-page .userpatch-series-main > .userpatch-series-toolbar > .userpatch-series-selects {
    position: sticky;
    inset-block-start: calc(${CONFIG.mobileQualityStickyTopPx}px + env(safe-area-inset-top, 0px));
    z-index: 20;
    inline-size: 100%;
    flex: initial;
    align-items: flex-start;
    flex-direction: column;
    justify-content: flex-start;
    margin-inline: 0;
    margin-block-end: 0.75rem;
  }

  html.userpatch-maia.userpatch-detail-page .userpatch-series-selects > :is(.userpatch-season-control, .userpatch-series-quality-group, .userpatch-quality-tabs) {
    align-self: flex-start;
    flex: 0 0 auto;
  }

  html.userpatch-maia.userpatch-detail-page .userpatch-series-selects > .userpatch-quality-tabs {
    margin: 0;
  }

  html.userpatch-maia.userpatch-detail-page .userpatch-series-selects > .userpatch-series-quality-group {
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    inline-size: 100%;
    gap: 0.5rem;
  }

  html.userpatch-maia.userpatch-detail-page .userpatch-series-quality-group > .userpatch-series-quality-control {
    flex: 0 0 auto;
    inline-size: auto;
    max-inline-size: 100%;
  }

  html.userpatch-maia.userpatch-detail-page .userpatch-series-quality-group > .userpatch-series-language-badge {
    align-self: center;
    flex: 0 1 max-content;
    inline-size: max-content;
    max-inline-size: 100%;
    white-space: normal;
  }

  html.userpatch-maia.userpatch-detail-page .userpatch-season-trigger {
    block-size: auto;
    min-block-size: 2.5rem;
  }

  html.userpatch-maia.userpatch-detail-page .userpatch-season-value {
    overflow: visible;
    text-overflow: clip;
    white-space: normal;
    overflow-wrap: anywhere;
  }

  html.userpatch-maia.userpatch-detail-page .userpatch-series-main > .userpatch-series-releases {
    grid-row: auto;
    grid-column: auto;
  }

  html.userpatch-maia.userpatch-detail-page .userpatch-movie-releases > .userpatch-quality-tabs {
    position: sticky;
    inset-block-start: calc(${CONFIG.mobileQualityStickyTopPx}px + env(safe-area-inset-top, 0px));
    z-index: 20;
    inline-size: fit-content;
    margin-block: 0 ${CONFIG.mobileQualityVerticalGapRem}rem;
    margin-inline: auto;
    /* The shared tab pseudo-elements already draw the glass and outline. */
    border: 0;
    border-radius: 1rem;
    background: transparent;
    box-shadow: none;
  }

  @media (max-width: ${CONFIG.mobileCompactQualityBreakpointRem}rem) {
    html.userpatch-maia.userpatch-detail-page .userpatch-movie-releases > .userpatch-quality-tabs .userpatch-quality-tab {
      padding-inline: ${CONFIG.mobileCompactQualityTabPaddingInlinePx}px;
    }
  }

  html.userpatch-maia.userpatch-detail-page .userpatch-movie-releases[data-mobile-quality-scroll-space]::after {
    display: block;
    block-size: var(--userpatch-mobile-quality-scroll-space, 0px);
    content: "";
  }

  html.userpatch-maia.userpatch-detail-page .content-sidebar {
    position: static;
    inset-block-start: auto;
    block-size: auto;
    align-self: stretch;
  }

  html.userpatch-maia dialog.userpatch-search-dialog[open] {
    inset-block-start: calc(${CONFIG.mobileSearchDialogInsetPx}px + env(safe-area-inset-top, 0px));
    max-block-size: calc(100dvh - ${CONFIG.mobileSearchDialogInsetPx}px - 1rem - env(safe-area-inset-top, 0px));
    transform: translateX(-50%);
  }
}

@media (max-width: 22.5rem) {
  html.userpatch-maia.userpatch-detail-page .content-main.userpatch-series-main {
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: auto 1rem auto;
  }

  html.userpatch-maia.userpatch-detail-page .userpatch-series-main > .userpatch-series-releases {
    grid-row: auto;
  }
}

#userpatch-page-loader {
  position: fixed;
  inset: 0;
  z-index: 2147483640;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--maia-background, #090a0f);
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
  transition: opacity 250ms ease, visibility 250ms ease;
}

#userpatch-page-loader.userpatch-page-loader-hidden {
  opacity: 0 !important;
  visibility: hidden !important;
  pointer-events: none !important;
}

.userpatch-page-spinner {
  inline-size: 2.75rem;
  block-size: 2.75rem;
  box-sizing: border-box;
  border-radius: 9999px;
  border: 3px solid rgba(255, 255, 255, 0.12);
  border-top-color: var(--maia-foreground, #ffffff);
  animation: userpatch-page-spin 0.75s linear infinite;
}

@keyframes userpatch-page-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  #userpatch-page-loader {
    transition: none !important;
  }
  .userpatch-page-spinner {
    animation-duration: 1.5s !important;
  }
}

${PROGRESSIVE_IMAGE_CSS}
html.userpatch-maia.userpatch-detail-page .userpatch-release-toolbar > .userpatch-detail-tabs {
  /* Confine the absolute glass backdrop even when mobile filters are static. */
  position: relative !important;
  isolation: isolate;
  grid-row: 1;
  grid-column: 1 !important;
  justify-self: start !important;
  align-self: center;
  margin: 0;
}
html.userpatch-maia.userpatch-detail-page .userpatch-release-toolbar > .userpatch-quality-tabs:not(.userpatch-detail-tabs) {
  grid-column: 2 / -1 !important;
}
html.userpatch-maia.userpatch-detail-page .userpatch-detail-info,
html.userpatch-maia.userpatch-detail-page .userpatch-detail-screenshots {
  grid-row: 3;
  grid-column: 1 / -1 !important;
  line-height: 1.6;
}
html.userpatch-maia.userpatch-detail-page .userpatch-detail-info[hidden],
html.userpatch-maia.userpatch-detail-page .userpatch-release-main > [hidden],
html.userpatch-maia.userpatch-detail-page .userpatch-release-toolbar > [hidden] {
  display: none !important;
}
@media (max-width: 48rem) {
  html.userpatch-maia.userpatch-detail-page .userpatch-release-toolbar > .userpatch-detail-tabs {
    grid-column: 1 / -1 !important;
    justify-self: center !important;
  }
  html.userpatch-maia.userpatch-detail-page .userpatch-release-toolbar > .userpatch-quality-tabs:not(.userpatch-detail-tabs) {
    grid-column: 1 / -1 !important;
    grid-row: 2;
    justify-self: center !important;
    inset-block-start: auto;
  }
  html.userpatch-maia.userpatch-detail-page .content-main.userpatch-release-main {
    grid-template-rows: auto auto auto;
    row-gap: 0.75rem;
  }
}

/* Reserve the header inset in layout so every series control shares a baseline,
   including the Info/Links group and rows that wrap at narrower widths. */
@media (min-width: ${CONFIG.mobileLayoutBreakpointRem + 0.01}rem) {
  html.userpatch-maia.userpatch-detail-page .content-main.userpatch-series-main {
    grid-template-rows: max-content 0.5rem auto;
  }
  html.userpatch-maia.userpatch-detail-page .userpatch-series-main > .userpatch-series-toolbar {
    position: sticky;
    inset-block-start: 0;
    padding-block-start: 1.5rem;
    align-items: center;
  }
  html.userpatch-maia.userpatch-detail-page .userpatch-series-main > .userpatch-series-toolbar > :is(.userpatch-detail-tabs, #series-tabs, .userpatch-series-selects) {
    position: relative;
    inset-block-start: auto;
    align-self: center;
  }
}
@media (max-width: ${CONFIG.mobileLayoutBreakpointRem}rem) {
  /* Series filters need the release main as their sticky containing block.
     Keep their toolbar boxless; the movie toolbar can stack with flex. */
  html.userpatch-maia.userpatch-detail-page .userpatch-release-main:not(.userpatch-series-main) > .userpatch-release-toolbar {
    display: flex;
    position: static;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    min-block-size: 0;
    padding: 0;
    margin-block-end: ${CONFIG.mobileDetailSectionGapRem}rem;
  }
  html.userpatch-maia.userpatch-detail-page .userpatch-release-toolbar > .userpatch-detail-tabs {
    inset-block-start: auto !important;
    flex: none;
    margin: 0 auto;
  }
  html.userpatch-maia.userpatch-detail-page .userpatch-series-main > .userpatch-series-toolbar > .userpatch-detail-tabs {
    display: flex;
    inline-size: fit-content;
    margin: 0 auto 0.75rem;
  }
}

html.userpatch-maia.userpatch-detail-page .userpatch-series-main > .userpatch-series-toolbar > .userpatch-detail-tabs {
  position: relative;
  inset-block-start: auto;
}

${TRAILER_CSS}
${DETAIL_INFO_CSS}
${systemThemeCss(true)}
`

    // src/shared/badges.js
    const USERPATCH_BADGE_DATA = Object.freeze({
      "4k": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNiIgaGVpZ2h0PSIxNSIgdmlld0JveD0iMCAwIDI2IDE1Ij48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTIuNzM3IDBoMjAuNTI4QTIuNzMgMi43MyAwIDAgMSAyNiAyLjcyN3Y5LjU0NUEyLjczIDIuNzMgMCAwIDEgMjMuMjY1IDE1SDIuNzM3QTIuNzMgMi43MyAwIDAgMSAwIDEyLjI3MlYyLjcyN0EyLjczIDIuNzMgMCAwIDEgMi43MzcgMG03LjA3OCAxMS42SDExLjV2LTEuNWgxLjFWOC42ODFoLTEuMXYtNS41M0g5YTU2IDU2IDAgMCAwLTMuMzkgNS40NDJWMTAuMWg0LjIwNXpNNy4xNjIgOC42ODZBNDAgNDAgMCAwIDEgOS44MTUgNC40aC4wMzV2NC4zMzNINy4xNjJ6bTguMjczIDIuOTE0VjkuMDJsLjc5MS0uOTQ5IDIuNTA3IDMuNTI5aDIuMTE0TDE3LjUgNi45bDMuMTMtMy43NDloLTEuOTY4bC0zLjE3NCAzLjg1NGgtLjA1M1YzLjE1MWgtMS43NjlWMTEuNnoiLz48L3N2Zz4=",
      hd: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNiIgaGVpZ2h0PSIxNSIgdmlld0JveD0iMCAwIDI2IDE1Ij48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTIuNzM3IDBoMjAuNTI4QTIuNzMgMi43MyAwIDAgMSAyNiAyLjcyN3Y5LjU0NUEyLjczIDIuNzMgMCAwIDEgMjMuMjY1IDE1SDIuNzM3QTIuNzMgMi43MyAwIDAgMSAwIDEyLjI3MlYyLjcyN0EyLjczIDIuNzMgMCAwIDEgMi43MzcgME0xMi41IDExLjc3OFYzLjMyNmgtMS43NzJ2My40MzNINi45MjFWMy4zMjZINS4xNTJ2OC40NTJoMS43NjlWOC4yMTdoMy44MDd2My41NjF6bTEuNDA5LTguNDUydjguNDUyaDMuMjU3YzIuNTM2IDAgNC4wMy0xLjU3NiA0LjAzLTQuMjU4UzE5LjcgMy4zMjYgMTcuMTYzIDMuMzI2aC0zLjI1N3ptMS43NjkgMS40NThoMS4yNzdjMS41NTggMCAyLjQzNy45NzIgMi40MzcgMi43NDEgMCAxLjgyNy0uODU1IDIuNzg4LTIuNDM3IDIuNzg4aC0xLjI4VjQuNzg1eiIvPjwvc3ZnPg==",
      sd: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNiIgaGVpZ2h0PSIxNSIgdmlld0JveD0iMCAwIDI2IDE1Ij48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTIuNzM3IDBoMjAuNTI4QTIuNzMgMi43MyAwIDAgMSAyNiAyLjcyN3Y5LjU0NUEyLjczIDIuNzMgMCAwIDEgMjMuMjY1IDE1SDIuNzM3QTIuNzMgMi43MyAwIDAgMSAwIDEyLjI3MlYyLjcyN0EyLjczIDIuNzMgMCAwIDEgMi43MzcgME01LjMgOS4zNzNDNS4zNTQgMTEuMDA1IDYuNjY2IDEyIDguNzI4IDEyYzIuMTMgMCAzLjQ3NS0xLjA2NyAzLjQ3NS0yLjc1NCAwLTEuMzI2LS43NDktMi4wNzMtMi40NjYtMi40NDZsLTEuMDQtLjIyN2MtLjk4NS0uMjI5LTEuNDAxLS41My0xLjQwMS0xLjA2Ni4wNDYtLjM0Ni4yMy0uNjU4LjUxLS44Ni4yOC0uMjA0LjYzMS0uMjguOTY5LS4yMTJhMS40IDEuNCAwIDAgMSAxLjU5MiAxLjE4MWgxLjY4MUMxMi4wMTggNC4wNDIgMTAuNzY1IDMgOC43NjggMyA2Ljg1NyAzIDUuNDkyIDQuMDYgNS40OTIgNS42NjNjMCAxLjI3Mi43NzggMi4wODUgMi4zNTggMi40MjhsMS4xMTUuMjQ3YzEuMDM0LjIzNCAxLjQ0NC41NDggMS40NDQgMS4xMTUgMCAuNjM5LS42NTQgMS4xMDMtMS42MSAxLjEwMy0uOC4xMi0xLjU2Mi0uMzktMS43Ny0xLjE4M0g1LjMwNHptOC02LjIyM3Y4LjY5MmgzLjMwM2MyLjU3MiAwIDQuMDg3LTEuNjIyIDQuMDg3LTQuMzggMC0yLjc2LTEuNTA4LTQuMzEyLTQuMDgzLTQuMzEyem0xLjc5OCAxLjUwMWgxLjI5NWMxLjU4IDAgMi40NzIgMSAyLjQ3MiAyLjgyIDAgMS44OC0uODY3IDIuODY4LTIuNDcyIDIuODY4aC0xLjI5NXoiLz48L3N2Zz4=",
      imax: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0ODkuMjIiIGhlaWdodD0iOTQuNzI3Ij48dGl0bGU+SU1BWCBsb2dvIChibGFjayk8L3RpdGxlPjxnIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3R5bGU9ImZpbGw6IzAwMCIgdHJhbnNmb3JtPSJzY2FsZSguNSkiPjxwYXRoIGQ9Im0yNzcuMDEgMTg5LjI5IDY2LjgzLTEzNi40NTRoMTAuODdsLS4wMSAxMzYuNjE0aDUzLjM2Vi41NzNoLTk2LjEyTDI1NC45OCAxMTMuNTEgMTk3LjQ4LjcyM2wtOTUuNjkuMjk4LS4xNCAxODguNDI5aDUzLjI1bC4wNy0xMzYuNjE0aDEwLjY4bDY2LjggMTM2LjQ1NHpNMCAxODkuNDRoNTkuNzU5Vi41NzNIMHpNNTE0LjU2LjU3M2wtOTUuOTk0IDE4OC44OGg2My44NDRsMTYuNzAzLTMyLjEyM2gxMTkuMjlsMTYuMjczIDMyLjEyM2g2My45OThMNjAyLjYyOC41NzN6bTQ3LjA4OSA0Mi45MzVoLTUuODc2bC0zNi4zMzkgNzEuNTMzaDc4LjE0OXpNNzc5Ljk5IDE4OS40NWw2MC4xNS02OC4yNSA1OS40OCA2OC4yNWg3OC44MUw4ODkuNTUgODkuMTMzIDk2My45OC41NzNoLTcyLjg1bC01MS40OSA2MS4zNjVMNzg5LjYzLjU3M2gtNzQuMTdsNzQuODYgODguNjQ1LTg5LjM5IDEwMC4yMzJ6Ii8+PC9nPjwvc3ZnPg==",
      "hdr10-plus":
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1NCIgaGVpZ2h0PSIxNSIgdmlld0JveD0iMCAwIDU0IDE1Ij48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Ik01MS4yNzMgMEEyLjcyNyAyLjcyNyAwIDAgMSA1NCAyLjcyN3Y5LjU0NkEyLjcyNyAyLjcyNyAwIDAgMSA1MS4yNzMgMTVIMi43MjdBMi43MjcgMi43MjcgMCAwIDEgMCAxMi4yNzNWMi43MjdBMi43MjcgMi43MjcgMCAwIDEgMi43MjcgMHptLTEyLjU0IDMuMThjLTIuMTEzIDAtMy4zOTYgMS42NzQtMy4zOTYgNC4zNjF2LjAxMmwuMDA0LjI0OWMuMDc3IDIuNTQxIDEuMzQ1IDQuMTE4IDMuMzkzIDQuMTE4IDIuMTE0IDAgMy4zOTctMS42OCAzLjM5Ny00LjM2N1Y3LjU0bC0uMDA0LS4yNDljLS4wNzctMi41NC0xLjM0NS00LjExMi0zLjM5My00LjExMlptLTMxLjgzOC4xNDZINS4xNXY4LjQ0OGgxLjc0NXYtMy41NmgzLjc1NXYzLjU2aDEuNzQ0VjMuMzI2SDEwLjY1djMuNDNINi44OTV6bTEwLjAzNCAwaC0zLjE4M3Y4LjQ0OGgzLjE4M2MyLjUwMSAwIDMuOTc0LTEuNTc1IDMuOTc0LTQuMjU2di0uMDEyYzAtMi42NzUtMS40NzgtNC4xOC0zLjk3NC00LjE4bTguNTEgMGgtMy40NDR2OC40NDhoMS43NDVWOC43MTJoMS4zOThsMS41NTQgMy4wNjJoMS45NzZMMjYuOTEgOC40NDljLjkyNS0uMzcgMS41MDgtMS4yOTQgMS41MDgtMi40MDZWNi4wM2MwLTEuNjk4LTEuMTA5LTIuNzA1LTIuOTgtMi43MDVabTcuODA0IDBIMzEuNTFsLTIuMTU1IDEuNTE3VjYuNDFsMi4xMjYtMS40NjNoLjAzNXY2LjgyNmgxLjcyN3ptMTMuNTMgMS4zMWgtMS40NzR2Mi4yNTNoLTIuMzk3djEuNDkzaDIuMzk3djIuMjQ4aDEuNDczVjguMzgyaDIuNDAzVjYuODg5aC0yLjQwM1Y0LjYzNVptLTguMDQtLjA0YzEuMDQgMCAxLjYzNiAxLjA5IDEuNjM2IDIuOTQ1di4wMTJsLS4wMDMuMjI4Yy0uMDQ4IDEuNzE3LS42MzYgMi43MjItMS42MzIgMi43MjItMS4wNCAwLTEuNjM1LTEuMDk0LTEuNjM1LTIuOTVWNy41NGwuMDAzLS4yMjhjLjA0Ny0xLjcxNi42MzUtMi43MTYgMS42MzItMi43MTZabS0yMi4wMTIuMTg4YzEuNTMgMCAyLjQwMy45NjYgMi40MDMgMi43Mjh2LjAxMmMwIDEuODI2LS44NDMgMi43ODYtMi40MDMgMi43ODZoLTEuMjNWNC43ODR6bTguNTA0LS4wNzZjLjg2IDAgMS40MS41MTUgMS40MSAxLjMyM3YuMDEyYzAgLjgzLS41MiAxLjMyOC0xLjM4NyAxLjMyOEgyMy43NFY0LjcwOHoiLz48L3N2Zz4=",
      hdr: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNCIgaGVpZ2h0PSIxNSIgdmlld0JveD0iMCAwIDM0IDE1Ij48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTIuNzIgMGgyOC41NTdBMi43MjQgMi43MjQgMCAwIDEgMzQgMi43Mjd2OS41NDVBMi43MjQgMi43MjQgMCAwIDEgMzEuMjc3IDE1SDIuNzJBMi43MjMgMi43MjMgMCAwIDEgMCAxMi4yNzJWMi43MjdBMi43MjMgMi43MjMgMCAwIDEgMi43MiAwbTkuNjcyIDExLjZWMy4xNTFoLTEuNzY5djMuNDMzSDYuODE2VjMuMTUxSDUuMDQ3VjExLjZoMS43NjlWOC4wNDJoMy44MDdWMTEuNnpNMTMuOCAzLjE1MVYxMS42aDMuMjU3YzIuNTM2IDAgNC4wMy0xLjU3NiA0LjAzLTQuMjU4cy0xLjQ5NC00LjE5NC00LjAzLTQuMTk0SDEzLjh6bTEuNzcgMS40NTloMS4yNzdjMS41NTggMCAyLjQzNy45NzIgMi40MzcgMi43NDEgMCAxLjgyNy0uODU1IDIuNzg4LTIuNDM3IDIuNzg4SDE1LjU3ek0yNCA0LjUzNGgxLjUzYTEuMyAxLjMgMCAwIDEgMS40MjkgMS4zNDcgMS4yNjggMS4yNjggMCAwIDEtMS40MTIgMS4zNDdIMjR6bTAgMy45NzdoMS40NDdsMS41NzEgMy4wODloMkwyNy4yNCA4LjI0N2EyLjQ4IDIuNDggMCAwIDAgMS41MzUtMi40YzAtMS42NjktMS4xMTMtMi42OTQtMy4wNTctMi42OTRoLTMuNDkxVjExLjZIMjR6Ii8+PC9zdmc+",
      "dolby-vision":
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MiIgaGVpZ2h0PSIyMiIgdmlld0JveD0iMCAwIDUyIDIyIj48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Im05LjcyIDE0Ljg3IDEuOTI3IDUuNDU0aC4wNGwxLjk0Ni01LjQ1M2gxLjM0NGwtMi44MDYgNy4wODRoLTEuMDc3bC0yLjc2Ny03LjA4NHptNy44MzkgMHY3LjA4NWgtMS4yNDV2LTcuMDg0em05LjM2OSAwdjcuMDg1aC0xLjI0NXYtNy4wODR6bTUuMjI3IDBxLjc4IDAgMS40MzguMjQ4LjY1OC4yNDcgMS4xMzguNzA1dC43NDggMS4xMS4yNjggMS40NnEwIC43OTItLjI2OCAxLjQ0NGEzLjMgMy4zIDAgMCAxLS43NDggMS4xMjNxLS40OC40NzEtMS4xMzguNzMzYTMuOSAzLjkgMCAwIDEtMS40MzguMjYycS0uNzczIDAtMS40MjUtLjI2MmEzLjM1IDMuMzUgMCAwIDEtMS4xMjgtLjczMyAzLjQgMy40IDAgMCAxLS43NDMtMS4xMjMgMy44IDMuOCAwIDAgMS0uMjY4LTEuNDQzcTAtLjgxLjI2OC0xLjQ2Mi4yNjctLjY1MS43NDMtMS4xMDkuNDc0LS40NTggMS4xMjgtLjcwNS42NTItLjI0NyAxLjQyNS0uMjQ3em02Ljk4NSAwIDMuMjUgNS4zMDRoLjAydi01LjMwM2gxLjI0NXY3LjA4NGgtMS41OGwtMy4zMi01LjQ3M2gtLjAydjUuNDczaC0xLjI0NnYtNy4wODR6bS0xNy4yOC4wMDJxLjUwNiAwIDEuMDI2LjE4LjQxNi4xNDUuNzQ2LjQwNWwuMTU5LjEzNy0uNzY5Ljg1NGExLjQ0IDEuNDQgMCAwIDAtLjUzLS40MTMgMS41NyAxLjU3IDAgMCAwLTEuMS0uMTE0IDEuMyAxLjMgMCAwIDAtLjM3Ni4xNjIuOS45IDAgMCAwLS4yNzYuMjg0LjguOCAwIDAgMC0uMTA4LjQyMy43Ni43NiAwIDAgMCAuMzUxLjY2NHEuMTY0LjExNC4zOTkuMi4yMzQuMDg1LjUxNS4xNy4zMi4xMDUuNjYxLjIzOC4zNDMuMTMzLjYyOC4zNTFjLjI4NS4yMTguMzQ3LjMzLjQ2OS41NXEuMTgzLjMzMy4xODMuODI2IDAgLjU0MS0uMTk3Ljk0NWExLjk0IDEuOTQgMCAwIDEtLjUyNS42NyAyLjIgMi4yIDAgMCAxLS43NjkuMzk4IDMuMiAzLjIgMCAwIDEtLjkyOC4xMzMgMy40IDMuNCAwIDAgMS0xLjI2NS0uMjQyIDIuNSAyLjUgMCAwIDEtLjg3NS0uNTY1bC0uMTM4LS4xNTIuODQ0LS43OTdxLjI0My4zNDIuNjUyLjU0LjQwNy4yLjgwMS4yLjIwNiAwIC40MjItLjA1MmExLjEgMS4xIDAgMCAwIC4zODktLjE3NiAxIDEgMCAwIDAgLjI4MS0uMzA4LjkuOSAwIDAgMCAuMTA4LS40Ni43Ni43NiAwIDAgMC0uMTIyLS40NDIgMS4xIDEuMSAwIDAgMC0uMzI4LS4zMDRxLS4yMDctLjEyOC0uNDg4LS4yMjNsLS41OS0uMnEtLjMtLjA5My0uNi0uMjI3LS4zLS4xMzMtLjU0LS4zNTFhMS43IDEuNyAwIDAgMS0uMzg4LS41MzdxLS4xNS0uMzE4LS4xNS0uNzkyIDAtLjUxMy4yMS0uODgzLjIxMi0uMzcuNTU0LS42MTIuMzQyLS4yNDMuNzc4LS4zNjEuNDM1LS4xMi44ODYtLjExOW0xMC4zMDQgMS4xNXEtLjQ5OCAwLS45LjE4My0uNDAyLjE4NC0uNjkyLjUwNGEyLjMgMi4zIDAgMCAwLS40NDcuNzUxIDIuNyAyLjcgMCAwIDAtLjE1OS45MzRxMCAuNTIzLjE1OS45NTcuMTU4LjQzNS40NTIuNzU2LjI5NC4zMi42OTYuNWMuNDAyLjE4LjU2Ni4xNzguODkxLjE3OHEuNDg5IDAgLjg5NS0uMTc5Yy40MDYtLjE3OS41MDUtLjI4NS43MDEtLjQ5OXEuMjk0LS4zMjEuNDUzLS43NTYuMTU4LS40MzUuMTU4LS45NTdhMi43IDIuNyAwIDAgMC0uMTU4LS45MzQgMi4zIDIuMyAwIDAgMC0uNDQ4LS43NSAyLjEgMi4xIDAgMCAwLS42OTctLjUwNSAyLjIgMi4yIDAgMCAwLS45MDQtLjE4M000Ni4zMjUgMy4xNWwxLjk5MyA0LjUzNiAxLjk5My00LjUzNmgxLjY3MWwtMy45NjIgOC45NjZhMS45NzUgMS45NzUgMCAwIDEtMi40NyAxLjA3NWwtLjE0Mi0uMDU4LS41My0uMjRoLS4wMDNsLjE5LS40MzEuNDI4LS45NzMuMjE5LjFhLjgxLjgxIDAgMCAwIDEuMDI1LS4zMmwuMDUyLS4xLjAwNC0uMDEuNjEzLTEuNDAyLjAyLS4wNDQuMDU3LS4xMjUtMi44MjktNi40Mzh6TTM5LjIxLjAwMnYzLjc4NGEzLjQ1IDMuNDUgMCAwIDEgMi0uNjM4YzEuOTI4IDAgMy40OTYgMS41ODggMy40OTYgMy41NDFzLTEuNTY4IDMuNTQtMy40OTYgMy41NGEzLjQ1IDMuNDUgMCAwIDEtMi0uNjM4di42NGgtMS41MzJWLjAwMnptLTIuODE4IDB2MTAuMjNoLTEuNTNWLjAwMnptLTYuMDE2IDMuMTQ2YzEuOTI4IDAgMy40OTYgMS41ODggMy40OTYgMy41NCAwIDEuOTUzLTEuNTY4IDMuNTQxLTMuNDk2IDMuNTQxLTEuOTI5IDAtMy40OTctMS41ODgtMy40OTctMy41NCAwLTEuOTUzIDEuNTY4LTMuNTQxIDMuNDk3LTMuNTQxTTIxLjA1NyAwYzIuNzgyIDAgNS4wNDYgMi4yOTIgNS4wNDYgNS4xMXMtMi4yNjQgNS4xMS01LjA0NiA1LjExaC0zLjY0NVYwem0tNi43IDB2MTAuMjJoLTEuNDljLTIuNzggMC01LjA0NS0yLjI5NS01LjA0NS01LjExIDAtMi43NDMgMi4xNTEtNC45OTIgNC44MzMtNS4xMDVMMTIuODY4IDB6TTEuNDg4IDBjMi43OCAwIDUuMDQ2IDIuMjk1IDUuMDQ2IDUuMTEgMCAyLjc0My0yLjE1MiA0Ljk5MS00LjgzMyA1LjEwNWwtLjIxMy4wMDRoLTEuNDlWMHptMzkuNzIgNC41NDFjLS45MjYgMC0xLjcxOS42MS0xLjk5OSAxLjQ2MWEyLjE1IDIuMTUgMCAwIDAgMCAxLjM0NiAyLjExIDIuMTEgMCAwIDAgMiAxLjQ2M2MxLjE1NyAwIDIuMTA4LS45NSAyLjEwOC0yLjEzNSAwLTEuMTcyLS45NTEtMi4xMzUtMi4xMDgtMi4xMzV6bS0xMC44MzMgMGMtMS4xNTcgMC0yLjEwOS45NS0yLjEwOSAyLjEzNCAwIDEuMTcyLjkzOSAyLjEzNSAyLjEwOSAyLjEzNSAxLjE1NyAwIDIuMTA4LS45NSAyLjEwOC0yLjEzNSAwLTEuMTcxLS45NTEtMi4xMzUtMi4xMDgtMi4xMzV6bS05LjMyLTIuOTkyaC0yLjExNFY4LjY3aDIuMTE1YzEuOTM3IDAgMy41MTYtMS41OTkgMy41MTYtMy41NnMtMS41OC0zLjU2LTMuNTE2LTMuNTZ6Ii8+PC9zdmc+",
      av1: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNzggMTU1Ij48ZGVmcz48bWFzayBpZD0ibSI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0id2hpdGUiLz48cGF0aCBmaWxsPSJibGFjayIgZD0ibTIwOC42IDUyLjUtOC40IDguMy04LjktOS40IDE5LjUtMTloMTMuNnY0OC4yaC0xNS44eiIvPjwvbWFzaz48L2RlZnM+PGcgbWFzaz0idXJsKCNtKSI+PHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBkPSJNMjc4IDExMi43IDIxMy4yIDBsLTY0LjcgMTEyLjd6IiBvcGFjaXR5PSIuNiIvPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0ibTI3OCAxMTIuNy0yNC4zLTI4LjItMTYuMiAyOC4yek0xNzIuOCA4NC41bC0yNC4zIDI4LjJIMTg5eiIgb3BhY2l0eT0iLjMiLz48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Im0yMTMuMiAxNTUgNDAuNS03MC41aC04MC45ek0zNS42IDgyLjJoMTguMmwtOS4xLTI4LjN6bTI0LjUgMjAuMkgyOS40bC0zLjEgMTAuNEgwbDI5LjUtODAuNEg2MGwyOS41IDgwLjRINjMuMnpNNzMuNiAzMi40aDI3LjVsMTcuMiA1NC4xIDE3LjMtNTQuMWgyNy41bC0yOS41IDgwLjRoLTMwLjV6Ii8+PC9nPjwvc3ZnPg==",
      "dolby-atmos":
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MiIgaGVpZ2h0PSIyMiIgdmlld0JveD0iMCAwIDUyIDIyIj48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Im0xMi4xMTQgMTQuODcgMy4wMTQgNy4wODVoLTEuNDIzbC0uNjUzLTEuNjJIMTAuMDJsLS42MzIgMS42Mkg3Ljk5M2wzLjA0NC03LjA4NHptOC4zODYgMHYxLjEwMWgtMi4xNDR2NS45ODRIMTcuMTF2LTUuOTg0aC0yLjE0NHYtMS4xem0zLjUgMCAxLjgxOCA1LjAzNGguMDNsMS43OTgtNS4wMzNoMS45NTZ2Ny4wODRoLTEuMjM1di01LjY5M2gtLjAybC0yLjEyNCA1LjY5M2gtLjg3bC0yLjA5NC01LjY5M2gtLjAydjUuNjkzaC0xLjE4NnYtNy4wODR6bTEwLjY1MiAwcS43OCAwIDEuNDM4LjI0OC42NTguMjQ3IDEuMTM4LjcwNXQuNzQ4IDEuMTFxLjI2Ny42NTEuMjY4IDEuNDYgMCAuNzkyLS4yNjggMS40NDRhMy4zIDMuMyAwIDAgMS0uNzQ4IDEuMTIzcS0uNDguNDcxLTEuMTM4LjczM2EzLjkgMy45IDAgMCAxLTEuNDM4LjI2MnEtLjc3MiAwLTEuNDI1LS4yNjJhMy4zNSAzLjM1IDAgMCAxLTEuMTI4LS43MzMgMy40IDMuNCAwIDAgMS0uNzQzLTEuMTIzIDMuOCAzLjggMCAwIDEtLjI2OC0xLjQ0M3EwLS44MS4yNjgtMS40NjJhMy4yIDMuMiAwIDAgMSAuNzQzLTEuMTEgMy4zIDMuMyAwIDAgMSAxLjEyOC0uNzA0IDQgNCAwIDAgMSAxLjQyNS0uMjQ3em03LjM1OS4wMTJxLjUwNiAwIDEuMDI2LjE4dC45MDUuNTQxbC0uNzY5Ljg1NGExLjQ0IDEuNDQgMCAwIDAtLjUzLS40MTIgMS41NyAxLjU3IDAgMCAwLTEuMTAxLS4xMTQgMS4zIDEuMyAwIDAgMC0uMzc1LjE2MS45LjkgMCAwIDAtLjI3Ny4yODUuOC44IDAgMCAwLS4xMDcuNDIyLjc2Ljc2IDAgMCAwIC4wOTMuMzkuOS45IDAgMCAwIC4yNTguMjc1cS4xNjUuMTEzLjM5OC4yLjIzNS4wODQuNTE2LjE3LjMxOS4xMDUuNjYuMjM3LjM0My4xMzMuNjMuMzUyLjI4NS4yMTguNDY4LjU1dC4xODMuODI2cTAgLjU0MS0uMTk3Ljk0NGExLjk0IDEuOTQgMCAwIDEtLjUyNS42NyAyLjMgMi4zIDAgMCAxLS43NjkuMzk5IDMuMiAzLjIgMCAwIDEtLjkyOC4xMzIgMy40IDMuNCAwIDAgMS0xLjI2NS0uMjQycS0uNjE5LS4yNDEtMS4wMTMtLjcxN2wuODQ0LS43OTdhMS43IDEuNyAwIDAgMCAuNjUxLjU0MXEuNDA4LjIuODAyLjIuMjA2IDAgLjQyMi0uMDUzLjIxNS0uMDUxLjM4OS0uMTc1YTEgMSAwIDAgMCAuMjgtLjMwOS45LjkgMCAwIDAgLjEwOS0uNDYuNzYuNzYgMCAwIDAtLjEyMi0uNDQyIDEuMSAxLjEgMCAwIDAtLjMyOC0uMzAzcS0uMjA2LS4xMjktLjQ4OC0uMjIzbC0uNTktLjJxLS4zLS4wOTQtLjYtLjIyOC0uMy0uMTMyLS41NC0uMzVhMS43IDEuNyAwIDAgMS0uMzg4LS41MzdxLS4xNS0uMzE4LS4xNS0uNzkzIDAtLjUxMy4yMS0uODgzLjIxMi0uMzY5LjU1NC0uNjEyLjM0Mi0uMjQyLjc3OC0uMzYuNDM1LS4xMi44ODYtLjEyem0tNy4zNSAxLjE0YTIuMDggMi4wOCAwIDAgMC0xLjU5Mi42ODcgMi4zIDIuMyAwIDAgMC0uNDQ3Ljc1MSAyLjcgMi43IDAgMCAwLS4xNTkuOTM0cTAgLjUyMi4xNTkuOTU3LjE1OC40MzUuNDUyLjc1Ni4yOTQuMzIuNjk2LjVjLjQwMi4xOC41NjYuMTc4Ljg5MS4xNzhxLjQ4OSAwIC44OTYtLjE3OWEyLjEgMi4xIDAgMCAwIC43LS40OTlxLjI5NC0uMzIxLjQ1My0uNzU2LjE1OC0uNDM1LjE1OC0uOTU3YTIuNyAyLjcgMCAwIDAtLjE1OC0uOTM0IDIuMyAyLjMgMCAwIDAtLjQ0OC0uNzUgMi4xIDIuMSAwIDAgMC0uNjk2LS41MDUgMi4yIDIuMiAwIDAgMC0uOTA1LS4xODNtLTIzLjEyLjM1LTEuMDk3IDIuODgyaDIuMTc0ek00Ni4zMjUgMy4xNWwxLjk5MyA0LjUzNyAxLjk5My00LjUzN2gxLjY3MWwtMy45NjIgOC45NjZhMS45NzMgMS45NzMgMCAwIDEtMi42MTIgMS4wMTdsLS41My0uMjRoLS4wMDNsLjE5LS40MzIuNDI3LS45NzIuMjIuMWEuODEzLjgxMyAwIDAgMCAxLjA3Ny0uNDJsLjAwNC0uMDEuNjEzLTEuNDAyLjAyLS4wNDQuMDU2LS4xMjUtMi44MjgtNi40Mzh6TTM2LjM5Mi4wMDJ2MTAuMjNoLTEuNTNWLjAwMnptMi44MTggMHYzLjc4NGEzLjQ1IDMuNDUgMCAwIDEgMi0uNjM4YzEuOTI4IDAgMy40OTYgMS41ODggMy40OTYgMy41NHMtMS41NjggMy41NDItMy40OTYgMy41NDJhMy40NSAzLjQ1IDAgMCAxLTItLjYzOXYuNjRoLTEuNTMyVi4wMDJ6bS04LjgzNCAzLjE0NmMxLjkyOCAwIDMuNDk2IDEuNTg4IDMuNDk2IDMuNTRzLTEuNTY4IDMuNTQxLTMuNDk2IDMuNTQxYy0xLjkyOSAwLTMuNDk3LTEuNTg4LTMuNDk3LTMuNTRzMS41NjgtMy41NDEgMy40OTctMy41NDFNMS40ODkgMGMyLjc4IDAgNS4wNDUgMi4yOTUgNS4wNDUgNS4xMXMtMi4yNjYgNS4xMS01LjA0NSA1LjExSDBWMHptMTIuODY3IDB2MTAuMjJoLTEuNDg4Yy0yLjc4IDAtNS4wNDYtMi4yOTUtNS4wNDYtNS4xMVMxMC4wODggMCAxMi44NjggMHptNi43IDBjMi43ODMgMCA1LjA0NyAyLjI5MiA1LjA0NyA1LjExcy0yLjI2NCA1LjExLTUuMDQ2IDUuMTFoLTMuNjQ1VjB6bTkuMzIgNC41NGMtMS4xNTcgMC0yLjEwOS45NS0yLjEwOSAyLjEzNSAwIDEuMTcyLjkzOSAyLjEzNSAyLjEwOSAyLjEzNSAxLjE1NyAwIDIuMTA4LS45NSAyLjEwOC0yLjEzNSAwLTEuMTcxLS45NTEtMi4xMzUtMi4xMDgtMi4xMzVtMTAuODM0IDBjLS45MjcgMC0xLjcyLjYxLTIgMS40NjJhMi4xNSAyLjE1IDAgMCAwIDAgMS4zNDYgMi4xMSAyLjExIDAgMCAwIDIgMS40NjNjMS4xNTcgMCAyLjEwOC0uOTUgMi4xMDgtMi4xMzUgMC0xLjE3Mi0uOTUxLTIuMTM1LTIuMTA4LTIuMTM1ek0yMS4wNTcgMS41NWgtMi4xMTV2Ny4xMmgyLjExNWMxLjkzNyAwIDMuNTE2LTEuNTk5IDMuNTE2LTMuNTZzLTEuNTgtMy41Ni0zLjUxNi0zLjU2Ii8+PC9zdmc+",
      "dolby-audio":
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MiIgaGVpZ2h0PSIyMiIgdmlld0JveD0iMCAwIDUyIDIyIj48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Im00Ni4zMjUgMy4xNSAxLjk5MyA0LjUzNiAxLjk5My00LjUzNmgxLjY3MWwtMy45NjIgOC45NjZhMS45NzUgMS45NzUgMCAwIDEtMi40NyAxLjA3NWwtLjE0Mi0uMDU4LS41My0uMjRoLS4wMDNsLjE5LS40MzEuNDI4LS45NzMuMjE5LjFhLjgxLjgxIDAgMCAwIDEuMDI1LS4zMmwuMDUyLS4xLjAwNC0uMDEuNjEzLTEuNDAyLjAyLS4wNDQuMDU3LS4xMjUtMi44MjktNi40Mzh6TTM5LjIxLjAwMnYzLjc4NGEzLjQ1IDMuNDUgMCAwIDEgMi0uNjM4YzEuOTI4IDAgMy40OTYgMS41ODggMy40OTYgMy41NDFzLTEuNTY4IDMuNTQtMy40OTYgMy41NGEzLjQ1IDMuNDUgMCAwIDEtMi0uNjM4di42NGgtMS41MzJWLjAwMnptLTIuODE4IDB2MTAuMjNoLTEuNTNWLjAwMnptLTYuMDE2IDMuMTQ2YzEuOTI4IDAgMy40OTYgMS41ODggMy40OTYgMy41NCAwIDEuOTUzLTEuNTY4IDMuNTQxLTMuNDk2IDMuNTQxLTEuOTI5IDAtMy40OTctMS41ODgtMy40OTctMy41NCAwLTEuOTUzIDEuNTY4LTMuNTQxIDMuNDk3LTMuNTQxTTIxLjA1NyAwYzIuNzgyIDAgNS4wNDYgMi4yOTIgNS4wNDYgNS4xMXMtMi4yNjQgNS4xMS01LjA0NiA1LjExaC0zLjY0NVYwem0tNi43IDB2MTAuMjJoLTEuNDljLTIuNzggMC01LjA0NS0yLjI5NS01LjA0NS01LjExIDAtMi43NDMgMi4xNTEtNC45OTIgNC44MzMtNS4xMDVMMTIuODY4IDB6TTEuNDg4IDBjMi43OCAwIDUuMDQ2IDIuMjk1IDUuMDQ2IDUuMTEgMCAyLjc0My0yLjE1MiA0Ljk5MS00LjgzMyA1LjEwNWwtLjIxMy4wMDRoLTEuNDlWMHptMzkuNzIgNC41NDFjLS45MjYgMC0xLjcxOS42MS0xLjk5OSAxLjQ2MWEyLjE1IDIuMTUgMCAwIDAgMCAxLjM0NiAyLjExIDIuMTEgMCAwIDAgMiAxLjQ2M2MxLjE1NyAwIDIuMTA4LS45NSAyLjEwOC0yLjEzNSAwLTEuMTcyLS45NTEtMi4xMzUtMi4xMDgtMi4xMzV6bS0xMC44MzMgMGMtMS4xNTcgMC0yLjEwOS45NS0yLjEwOSAyLjEzNCAwIDEuMTcyLjkzOSAyLjEzNSAyLjEwOSAyLjEzNSAxLjE1NyAwIDIuMTA4LS45NSAyLjEwOC0yLjEzNSAwLTEuMTcxLS45NTEtMi4xMzUtMi4xMDgtMi4xMzV6bS05LjMyLTIuOTkyaC0yLjExNFY4LjY3aDIuMTE1YzEuOTM3IDAgMy41MTYtMS41OTkgMy41MTYtMy41NnMtMS41OC0zLjU2LTMuNTE2LTMuNTZ6Ii8+PHRleHQgeD0iOS43MiIgeT0iMjAuNDgiIGZpbGw9ImN1cnJlbnRDb2xvciIgZm9udC1mYW1pbHk9IidBdmVuaXJOZXh0LURlbWlCb2xkJywgJ0F2ZW5pck5leHRMVFByby1NZWRpdW0nLCAnQXZlbmlyIE5leHQnLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjkuNSIgZm9udC13ZWlnaHQ9IjYwMCIgbGV0dGVyLXNwYWNpbmc9Ii43IiB0cmFuc2Zvcm09InNjYWxlKDEgMS4wNSkiPkFVRElPPC90ZXh0Pjwvc3ZnPg==",
      "dts-x":
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjQwLjkgMzcgMTM5IDQwLjgiPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+LnN0MHtmaWxsOm5vbmU7fQoJLnN0MXtmaWxsOmN1cnJlbnRDb2xvcjt9PC9zdHlsZT48cGF0aCBkPSJtMTI4LjkgNjQuNS00LjUtNC41Yy0uNi0uNi0uOS0xLjQtLjktMi4zIDAtMS44IDEuNC0zLjIgMy4yLTMuMmgyLjJjLjcgMCAxLjMtLjYgMS4zLTEuM3YtMi40aC0xOC40Yy0zLjEgMC01LjYgMi41LTUuNiA1LjYgMCAxLjYuNiAzIDEuNiA0bDQuNSA0LjVjLjYuNi45IDEuNC45IDIuMyAwIDEuOC0xLjQgMy4yLTMuMiAzLjJoLTYuOWMtMi43IDAtNC45LTIuMi00LjktNC45VjU0LjZoNC4yYy43IDAgMS4zLS42IDEuMy0xLjN2LTIuNGgtNS41di0xMmwtMTQuNCA2LjN2NS43aC03VjM3SDY2Yy0yLjEgMC0zLjcgMS43LTMuNyAzLjd2MTBoLTcuN2MtOCAwLTEzLjcgNC40LTEzLjcgMTEuNyAwIDYuNSA2LjYgMTEuNiAxMy43IDExLjZoMTcuMmMyLjcgMCA0LjktMi4yIDQuOS00LjlWNTQuNWg3VjY0YzAgNS40IDMuMyAxMCA5LjkgMTBoMzEuMmMzLjEgMCA1LjYtMi41IDUuNi01LjYuMS0xLjUtLjUtMi45LTEuNS0zLjltLTY2LjYgNS4xYzAgLjQtLjQuOC0uOC44SDYxYy01IDAtNi45LTMuNS02LjktNy45LjEtNC42IDItNy45IDYuOS03LjloMS4zek0xNTUuNSA1NS4ybC00LjUtNC40aC0xMi40bDEwLjYgMTAuN3pNMTc5LjkgNDcuMUgxNjhsLTMwLjcgMzAuN2gxMS45bDguMi04LjIgNC40IDQuNWgxMi41bC0xMC43LTEwLjd6IiBjbGFzcz0ic3QxIi8+PC9zdmc+",
      dts: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHJvbGU9ImltZyIgdmlld0JveD0iMCA3IDI0IDEwIj48dGl0bGU+RFRTPC90aXRsZT48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Im0yMy41NTYgMTQuMzQ2LTEuMTk0LTEuMTczYS44NDEuODQxIDAgMCAxIC42MDQtMS40NDVoLjU5YS4zNDYuMzQ2IDAgMCAwIC4zNDktLjM0M3YtLjYzNkgxOC45N2ExLjQ5IDEuNDkgMCAwIDAtMS41MDcgMS40Nzd2LjAwM2MwIC4zOTYuMTYuNzc1LjQ0NCAxLjA1bDEuMjAxIDEuMThhLjg0MS44NDEgMCAwIDEtLjYwNCAxLjQ0NmgtMS44NDlhMS4zMDYgMS4zMDYgMCAwIDEtMS4zMTctMS4yOTR2LTIuODc2aDEuMTM1YS4zNDYuMzQ2IDAgMCAwIC4zNS0uMzQzdi0uNjM2aC0xLjQ4NVY3LjU4N2wtMy44NjYgMS42NnYxLjQ5NGgtMS44N1Y3LjEyM2gtMi44N2EuOTg2Ljk4NiAwIDAgMC0uOTk3Ljk4djIuNjM4SDMuNjdDMS41MTQgMTAuNzQxIDAgMTEuODkzIDAgMTMuODFjMCAxLjcxIDEuNzc2IDMuMDY4IDMuNjc2IDMuMDY4aDQuNjE1YTEuMzA2IDEuMzA2IDAgMCAwIDEuMzE4LTEuMjk0di0zLjg1NWgxLjg2M3YyLjUwM2MwIDEuNDIzLjg3NCAyLjY0NiAyLjY1IDIuNjQ2aDguMzcxQTEuNDkgMS40OSAwIDAgMCAyNCAxNS40di0uMDAzYTEuNDQgMS40NCAwIDAgMC0uNDQ0LTEuMDUxTTUuNzI5IDE1LjY4M2EuMjE3LjIxNyAwIDAgMS0uMjE5LjIxNGgtLjEzYy0xLjM0IDAtMS44MzUtLjkwOC0xLjg1LTIuMDg4LjAxNS0xLjIxNi41MjUtMi4wODggMS44NS0yLjA4OGguMzQ5eiIvPjwvc3ZnPg==",
    })
    const POSTER_BADGE_LABELS = Object.freeze({
      "4k": "4K",
      hd: "HD",
      sd: "SD",
      imax: "IMAX",
      "hdr10-plus": "HDR10+",
      hdr: "HDR",
      "dolby-vision": "Dolby Vision",
      av1: "AV1",
      "dolby-atmos": "Dolby Atmos",
      "dolby-audio": "Dolby Audio",
      "dts-x": "DTS:X",
      dts: "DTS",
    })
    const POSTER_BADGE_ASPECT_RATIOS = Object.freeze({
      "4k": "26 / 15",
      hd: "26 / 15",
      sd: "26 / 15",
      imax: "489.22 / 94.727",
      "hdr10-plus": "54 / 15",
      hdr: "34 / 15",
      "dolby-vision": "52 / 22",
      av1: "278 / 155",
      "dolby-atmos": "52 / 22",
      "dolby-audio": "52 / 22",
      "dts-x": "139 / 40.8",
      dts: "24 / 10",
    })
    const IMDB_PRIMARY_LOGO_DATA_URI =
      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjEzMCAxMjIgNjYzIDI1NiI+PHBhdGggZmlsbD0iI2Y1YzUxOCIgZD0iTTE5NyAxMjIuN3YyNTUuNGgtNjYuMlYxMjIuN3ptMTQxLjQgMC0xNS4zIDExOS40LTkuNC02NC45Yy0yLjgtMjAuOC01LjQtMzktOC01NC41aC04NS45djI1NS40aDU4LjFsLjMtMTY4LjYgMjQuNCAxNjguNkgzNDRsMjMuMy0xNzIuM3YxNzIuM2g1OC4xVjEyMi43aC04Ni43Wm0xMDkuMyAyNTUuNFYxMjIuN2g0OS40YzMyLjEgMCA1MC42IDEuNSA2MS45IDQuNXMxOS45IDcuOCAyNS43IDE0LjVjNiA2LjcgOS43IDE0LjIgMTEuMSAyMi40IDEuNCA4LjMgMi40IDI0LjUgMi40IDQ4Ljd2ODkuNmMwIDIyLjktMS4yIDM4LjMtMy41IDQ1LjktMi4xIDcuNy01LjkgMTMuNy0xMS4zIDE4LjEtNS4zIDQuNS0xMiA3LjQtMTkuOCA5LjItNy45IDEuNy0xOS44IDIuNi0zNS43IDIuNmgtODAuNFptNjYuMi0yMTEuN1YzMzRjOS41IDAgMTUuNC0xLjkgMTcuNi01LjdzMy40LTE0LjIgMy40LTMxLjN2LTk4LjljMC0xMS41LS40LTE4LjktMS4xLTIyLjJzLTIuNS01LjctNS4xLTcuMmMtMi42LTEuNi03LjYtMi4zLTE0LjctMi4zWm0xNzAuOC00My43djgzLjFjNS4zLTYuMSAxMS4zLTEwLjYgMTcuNy0xMy42IDYuNi0zLjEgMTYuMy00LjYgMjMuOS00LjZzMTYuNCAxLjQgMjIuOSA0LjFjNi40IDIuNyAxMS4zIDYuNiAxNC43IDExLjUgMy4zIDUgNS40IDkuOCA2LjEgMTQuNXMxIDE0LjcgMSAzMC4ydjcxLjdjMCAxNS4yLTEgMjYuNi0zLjEgMzQuMi0yIDcuNC02LjggMTQtMTQuNSAxOS40LTcuNiA1LjYtMTYuNyA4LjMtMjcuMSA4LjNzLTE3LjItMS42LTIzLjgtNC44Yy02LjYtMy40LTEyLjUtOC4yLTE3LjgtMTQuN2wtNC4yIDE2LjJoLTU5LjdWMTIyLjd6bTIyLjQgMTI4YzAtMTAuOC0uNy0xNy44LTIuMS0yMS4yLTEuNC0zLjItNi44LTUtMTAuOS01cy02LjQgMS41LTcuNyA0LjNjLTEuMSAzLTEuNyAxMC4yLTEuNyAyMS44djY3LjVjMCAxMS4zLjcgMTguNCAyIDIxLjUgMS40IDMuMiA0IDQuNyA3LjkgNC43czkuNC0xLjYgMTAuNy00LjhjMS4yLTMuMiAxLjktMTEuMSAxLjktMjMuNHYtNjUuNVoiLz48L3N2Zz4="

    // src/shared/4khdhub-icon.js
    const SITE_ICON_SVG = String.raw`<svg xmlns="http://www.w3.org/2000/svg" viewBox="17.94 17.564 152.818 156.906" width="192" height="192">
  <defs>
    <style>
      :root {
        color: #000000;
        --brand-text: #000000;
        --play-icon: #ff931e;
      }
      .play-icon {
        stroke: var(--play-icon, #ff931e);
      }
      .brand-text {
        fill: var(--brand-text, currentColor);
      }
      @media (prefers-color-scheme: dark) {
        :root {
          color: #ffffff;
          --brand-text: #ffffff;
        }
        .brand-text {
          fill: var(--brand-text, #ffffff) !important;
        }
      }
      .dark .brand-text,
      [data-theme="dark"] .brand-text,
      [data-detail-theme="dark"] .brand-text {
        fill: #ffffff !important;
      }
      .light .brand-text,
      [data-theme="light"] .brand-text,
      [data-detail-theme="light"] .brand-text {
        fill: #000000 !important;
      }
    </style>
  </defs>
  <path id="play-triangle" class="play-icon" d="M 45.5 23.5 L 164.5 96 L 45.5 168.5 Z" fill="none" stroke="#ff931e" stroke-width="11" stroke-linejoin="round" stroke-linecap="round"/>
  <g id="brand-4k" class="brand-text" fill="currentColor">
    <path d="M 52.84 59.98 C 52.82 60 52.85 60.06 52.9 60.13 C 52.95 60.19 53.01 60.3 53.03 60.38 C 53.05 60.47 53.18 60.57 53.43 60.7 C 53.64 60.81 53.85 60.93 53.9 60.98 C 53.95 61.03 54.12 61.13 54.27 61.19 C 54.42 61.25 54.62 61.37 54.71 61.44 C 54.8 61.52 54.97 61.61 55.08 61.66 C 55.19 61.7 55.38 61.81 55.49 61.89 C 55.6 61.97 55.8 62.09 55.93 62.15 C 56.06 62.21 56.21 62.3 56.26 62.34 C 56.31 62.39 56.51 62.5 56.71 62.6 C 56.91 62.69 57.09 62.8 57.11 62.83 C 57.13 62.87 57.32 62.98 57.52 63.06 C 57.72 63.15 57.91 63.26 57.93 63.29 C 57.95 63.33 58.12 63.42 58.31 63.51 C 58.49 63.59 58.69 63.7 58.76 63.76 C 58.82 63.82 58.98 63.91 59.11 63.97 C 59.24 64.02 59.43 64.13 59.53 64.2 C 59.64 64.28 59.85 64.4 60 64.46 C 60.15 64.52 60.33 64.63 60.4 64.69 C 60.46 64.75 60.66 64.87 60.85 64.94 C 61.03 65.02 61.21 65.13 61.25 65.18 C 61.29 65.23 61.48 65.34 61.67 65.43 C 61.86 65.52 62.05 65.62 62.08 65.66 C 62.12 65.71 62.26 65.79 62.4 65.85 C 62.54 65.91 62.74 66.03 62.85 66.11 C 62.96 66.19 63.14 66.29 63.25 66.33 C 63.36 66.37 63.52 66.46 63.6 66.54 C 63.68 66.61 63.89 66.74 64.07 66.82 C 64.25 66.9 64.42 67 64.45 67.04 C 64.47 67.08 64.66 67.19 64.86 67.27 C 65.06 67.36 65.25 67.46 65.27 67.5 C 65.29 67.54 65.48 67.64 65.67 67.73 C 66 67.88 66.05 67.92 66.14 68.17 L 66.25 68.45 L 66.1 68.6 C 66.02 68.69 65.91 68.85 65.86 68.95 C 65.81 69.06 65.74 69.14 65.71 69.14 C 65.66 69.14 65.53 69.32 65.08 70.02 C 64.98 70.18 64.82 70.4 64.72 70.52 C 64.61 70.63 64.53 70.75 64.53 70.78 C 64.53 70.81 64.44 70.93 64.34 71.05 C 64.23 71.17 64.09 71.35 64.03 71.45 C 63.85 71.74 63.58 72.1 63.34 72.39 C 63.22 72.54 63.12 72.68 63.12 72.71 C 63.12 72.73 63.03 72.86 62.93 72.99 C 62.82 73.12 62.67 73.34 62.57 73.48 C 62.36 73.82 62.15 74.11 61.97 74.32 C 61.89 74.41 61.75 74.61 61.65 74.76 C 61.39 75.16 61.21 75.41 61.01 75.67 C 60.79 75.96 60.59 76.23 60.38 76.57 C 60.29 76.71 60.13 76.92 60.03 77.04 C 59.92 77.16 59.84 77.29 59.84 77.32 C 59.84 77.35 59.75 77.47 59.65 77.58 C 59.54 77.7 59.39 77.9 59.29 78.04 C 59.08 78.38 58.89 78.66 58.66 78.94 C 58.44 79.23 58.24 79.5 58.03 79.84 C 57.94 79.98 57.78 80.19 57.68 80.3 C 57.57 80.42 57.49 80.53 57.49 80.56 C 57.49 80.58 57.4 80.71 57.3 80.82 C 57.19 80.94 57.03 81.16 56.94 81.31 C 56.73 81.65 56.55 81.93 56.32 82.22 C 56.09 82.52 55.8 82.91 55.62 83.19 C 55.36 83.58 55.12 83.9 54.95 84.11 C 54.86 84.23 54.72 84.41 54.66 84.51 C 54.47 84.81 54.09 85.37 53.93 85.58 C 53.5 86.14 53.38 86.3 53.22 86.54 C 52.97 86.93 52.79 87.18 52.58 87.45 C 52.37 87.71 52.19 87.98 51.94 88.36 C 51.85 88.51 51.7 88.7 51.62 88.8 C 51.47 88.97 51.28 89.23 51.08 89.53 C 50.55 90.31 50.44 90.47 50.24 90.73 C 49.89 91.18 49.55 91.67 49.45 91.86 C 49.4 91.97 49.33 92.05 49.3 92.05 C 49.27 92.05 49.18 92.15 49.11 92.27 C 49.04 92.39 48.91 92.57 48.83 92.67 C 48.75 92.77 48.61 92.97 48.51 93.11 C 48.3 93.45 48.11 93.73 47.88 94.01 C 47.6 94.37 47.33 94.74 47.21 94.95 C 47.15 95.05 47 95.24 46.91 95.35 C 46.8 95.47 46.72 95.59 46.72 95.62 C 46.72 95.66 46.63 95.78 46.53 95.9 C 46.42 96.02 46.27 96.24 46.18 96.39 C 46.1 96.54 45.97 96.71 45.9 96.77 C 45.83 96.83 45.78 96.91 45.78 96.95 C 45.78 96.99 45.7 97.11 45.6 97.22 C 45.41 97.44 45.22 97.69 44.97 98.08 C 44.88 98.22 44.71 98.46 44.59 98.6 C 44.47 98.75 44.37 98.89 44.37 98.92 C 44.37 98.95 44.27 99.09 44.15 99.23 C 44.03 99.37 43.88 99.56 43.82 99.66 C 43.62 99.98 43.31 100.42 43.17 100.56 C 43.09 100.64 43 100.77 42.96 100.85 C 42.92 100.93 42.82 101.07 42.74 101.17 C 42.6 101.35 42.35 101.7 42.02 102.21 C 41.91 102.37 41.81 102.49 41.78 102.49 C 41.76 102.49 41.69 102.58 41.63 102.68 C 41.51 102.91 41.13 103.45 40.83 103.82 C 40.71 103.97 40.61 104.11 40.61 104.14 C 40.61 104.16 40.52 104.29 40.42 104.42 C 40.31 104.55 40.16 104.77 40.06 104.91 C 39.85 105.25 39.64 105.54 39.46 105.75 C 39.38 105.84 39.24 106.04 39.14 106.19 C 38.88 106.59 38.7 106.84 38.5 107.1 C 38.29 107.36 38.11 107.62 37.86 108.01 C 37.77 108.16 37.6 108.38 37.5 108.51 C 37.4 108.64 37.24 108.86 37.13 108.98 C 37.02 109.11 36.87 109.34 36.78 109.48 C 36.57 109.81 36.38 110.1 36.15 110.38 C 35.69 110.98 35.56 111.16 35.41 111.42 C 35.32 111.58 35.23 111.7 35.2 111.7 C 35.18 111.7 35.09 111.8 35.02 111.92 C 34.95 112.04 34.81 112.24 34.71 112.35 C 34.53 112.56 34.32 112.88 34.05 113.32 C 33.99 113.43 33.86 113.6 33.78 113.68 C 33.7 113.77 33.57 113.94 33.5 114.06 C 33.42 114.18 33.34 114.28 33.31 114.28 C 33.28 114.28 33.2 114.39 33.13 114.53 C 33.06 114.67 32.91 114.88 32.81 115 C 32.7 115.12 32.61 115.24 32.61 115.27 C 32.61 115.31 32.51 115.45 32.39 115.59 C 32.16 115.86 32.03 116.05 31.75 116.5 C 31.66 116.64 31.5 116.85 31.4 116.97 C 31.29 117.09 31.21 117.22 31.21 117.25 C 31.21 117.29 31.15 117.36 31.09 117.42 C 31.02 117.48 30.88 117.67 30.77 117.83 C 30.66 117.99 30.52 118.19 30.44 118.28 C 30.25 118.48 29.88 118.96 29.74 119.18 C 29.68 119.27 29.49 119.53 29.34 119.74 C 29.18 119.95 29 120.2 28.94 120.29 C 28.89 120.38 28.76 120.56 28.66 120.67 C 28.55 120.79 28.34 121.03 28.17 121.22 C 28.01 121.4 27.87 121.58 27.87 121.6 C 27.87 121.62 27.8 121.72 27.72 121.82 C 27.64 121.91 27.53 122.07 27.48 122.17 C 27.43 122.26 27.29 122.46 27.18 122.59 C 27.06 122.72 26.87 122.97 26.75 123.12 C 26.63 123.27 26.46 123.5 26.37 123.61 C 26.28 123.72 26.14 123.91 26.07 124.02 C 25.99 124.13 25.85 124.32 25.75 124.44 C 25.65 124.56 25.47 124.78 25.36 124.93 C 25.25 125.08 25.06 125.3 24.94 125.42 C 24.82 125.54 24.69 125.71 24.64 125.81 C 24.59 125.91 24.51 126.03 24.45 126.07 C 24.4 126.12 24.3 126.26 24.23 126.39 C 24.17 126.52 24.04 126.71 23.94 126.81 C 23.69 127.07 23.35 127.48 23.17 127.75 C 23.09 127.88 22.89 128.13 22.75 128.31 C 22.6 128.49 22.44 128.71 22.38 128.81 C 22.33 128.9 22.2 129.06 22.12 129.16 C 22.03 129.25 21.89 129.44 21.81 129.56 C 21.73 129.68 21.65 129.78 21.62 129.78 C 21.6 129.78 21.49 129.9 21.39 130.06 C 21.04 130.58 20.77 130.95 20.64 131.07 C 20.56 131.13 20.46 131.27 20.42 131.36 C 20.37 131.45 20.28 131.56 20.21 131.59 C 20.15 131.63 20.03 131.77 19.97 131.9 C 19.84 132.15 19.64 132.42 19.25 132.85 C 19.13 132.98 19.03 133.14 19.03 133.18 C 19.03 133.23 19.08 133.31 19.14 133.36 C 19.23 133.45 19.77 133.46 24.66 133.47 C 29.03 133.49 30.12 133.51 30.28 133.57 C 30.43 133.63 30.54 133.63 30.84 133.58 C 31.1 133.53 36.23 133.52 48.69 133.52 L 66.17 133.52 L 66.27 133.68 C 66.37 133.83 66.38 134.27 66.39 141.33 C 66.4 145.45 66.38 148.9 66.35 149.01 C 66.31 149.16 66.24 149.23 66 149.34 C 65.84 149.42 65.65 149.53 65.59 149.59 C 65.53 149.64 65.36 149.74 65.21 149.8 C 65.06 149.86 64.92 149.95 64.89 149.99 C 64.87 150.03 64.69 150.14 64.5 150.22 C 64.31 150.31 64.09 150.44 64.02 150.51 C 63.96 150.57 63.77 150.68 63.6 150.75 C 63.44 150.82 63.25 150.93 63.19 150.98 C 63.13 151.04 62.97 151.13 62.84 151.19 C 62.71 151.24 62.53 151.34 62.43 151.42 C 62.34 151.49 62.12 151.62 61.95 151.7 C 61.79 151.79 61.63 151.89 61.6 151.92 C 61.58 151.96 61.41 152.05 61.23 152.13 C 61.05 152.21 60.85 152.32 60.78 152.38 C 60.72 152.44 60.56 152.53 60.43 152.59 C 60.3 152.64 60.12 152.74 60.02 152.82 C 59.93 152.89 59.71 153.02 59.54 153.1 C 59.38 153.19 59.22 153.29 59.19 153.32 C 59.17 153.36 59 153.45 58.82 153.53 C 58.64 153.61 58.44 153.72 58.37 153.78 C 58.31 153.84 58.11 153.96 57.92 154.03 C 57.74 154.11 57.56 154.22 57.52 154.28 C 57.48 154.33 57.31 154.44 57.16 154.52 C 57.01 154.6 56.88 154.69 56.88 154.73 C 56.88 154.76 56.97 154.83 57.09 154.88 C 57.27 154.95 59.35 154.96 72.52 154.96 C 83.94 154.96 87.81 154.94 88.01 154.89 C 88.16 154.85 88.28 154.78 88.3 154.75 C 88.31 154.7 88.21 154.62 88.04 154.55 C 87.89 154.49 87.69 154.37 87.61 154.29 C 87.53 154.21 87.33 154.1 87.17 154.03 C 87.01 153.96 86.82 153.85 86.76 153.8 C 86.7 153.74 86.52 153.64 86.37 153.58 C 86.22 153.52 86.08 153.43 86.05 153.39 C 86.03 153.35 85.85 153.24 85.66 153.16 C 85.47 153.07 85.25 152.94 85.18 152.87 C 85.12 152.81 84.93 152.7 84.76 152.63 C 84.6 152.56 84.41 152.45 84.35 152.4 C 84.29 152.34 84.11 152.24 83.96 152.18 C 83.81 152.12 83.67 152.03 83.64 151.99 C 83.62 151.95 83.44 151.84 83.25 151.76 C 83.06 151.67 82.84 151.54 82.77 151.47 C 82.71 151.41 82.52 151.3 82.35 151.23 C 82.19 151.16 82 151.05 81.94 151 C 81.88 150.94 81.72 150.85 81.59 150.79 C 81.46 150.74 81.28 150.64 81.18 150.56 C 81.09 150.49 80.87 150.36 80.7 150.28 C 80.54 150.19 80.38 150.09 80.36 150.06 C 80.34 150.02 80.15 149.92 79.96 149.83 C 79.77 149.74 79.51 149.6 79.4 149.51 C 79.29 149.43 79.13 149.32 79.05 149.27 C 78.74 149.05 78.75 149.36 78.75 141.42 C 78.75 133.26 78.73 133.79 79.13 133.62 C 79.3 133.55 80.11 133.54 84.07 133.54 C 88.46 133.54 88.82 133.53 89.01 133.43 L 89.22 133.33 L 89.24 128.78 C 89.25 124.6 89.25 124.22 89.16 124.15 C 89.08 124.08 88.19 124.06 84.04 124.04 C 80.11 124.02 78.99 123.99 78.89 123.93 L 78.76 123.85 L 78.75 101.94 C 78.73 80.48 78.73 80.02 78.62 79.9 C 78.46 79.72 78.3 79.75 78.19 79.96 C 78.14 80.07 77.99 80.26 77.87 80.41 C 77.75 80.55 77.65 80.69 77.65 80.72 C 77.65 80.75 77.57 80.86 77.48 80.97 C 77.39 81.08 77.27 81.26 77.21 81.37 C 77.15 81.48 77.02 81.67 76.91 81.8 C 76.8 81.92 76.71 82.05 76.71 82.08 C 76.71 82.11 76.62 82.24 76.52 82.36 C 76.41 82.48 76.26 82.7 76.17 82.85 C 76.09 83 75.96 83.17 75.89 83.23 C 75.82 83.29 75.77 83.38 75.77 83.42 C 75.77 83.46 75.69 83.57 75.61 83.66 C 75.52 83.75 75.38 83.95 75.29 84.09 C 75.2 84.24 75.09 84.39 75.04 84.44 C 74.99 84.48 74.88 84.64 74.79 84.8 C 74.71 84.96 74.61 85.09 74.59 85.09 C 74.57 85.09 74.47 85.21 74.37 85.37 C 74.16 85.69 73.98 85.96 73.74 86.29 C 73.65 86.41 73.52 86.6 73.46 86.71 C 73.4 86.81 73.25 87 73.16 87.11 C 73.05 87.23 72.97 87.34 72.97 87.37 C 72.97 87.39 72.85 87.57 72.71 87.76 C 72.56 87.95 72.45 88.14 72.45 88.16 C 72.45 88.19 72.37 88.31 72.27 88.42 C 71.94 88.81 71.7 89.16 71.54 89.43 C 71.46 89.59 71.37 89.71 71.34 89.71 C 71.31 89.71 71.21 89.83 71.11 89.99 C 71.01 90.15 70.88 90.34 70.82 90.42 C 70.76 90.5 70.64 90.67 70.55 90.8 C 70.26 91.24 70.11 91.44 69.93 91.68 C 69.71 91.97 69.51 92.24 69.3 92.58 C 69.21 92.72 69.05 92.94 68.95 93.07 C 68.84 93.2 68.76 93.33 68.76 93.35 C 68.76 93.38 68.66 93.52 68.54 93.66 C 68.42 93.8 68.27 93.99 68.22 94.09 C 68.05 94.37 67.72 94.84 67.6 94.96 C 67.54 95.02 67.45 95.16 67.39 95.26 C 67.34 95.36 67.21 95.55 67.1 95.68 C 66.99 95.81 66.86 96 66.8 96.08 C 66.75 96.17 66.64 96.34 66.55 96.45 L 66.4 96.65 L 66.4 110.26 C 66.4 123.37 66.39 123.88 66.29 123.96 C 66.19 124.05 65.17 124.06 52.79 124.06 C 43.78 124.06 39.33 124.04 39.19 124 C 39.07 123.96 38.96 123.91 38.94 123.88 C 38.92 123.85 38.97 123.75 39.05 123.65 C 39.13 123.55 39.2 123.45 39.2 123.42 C 39.2 123.39 39.3 123.25 39.42 123.11 C 39.54 122.97 39.68 122.78 39.74 122.68 C 39.91 122.4 40.24 121.94 40.4 121.75 C 40.58 121.53 40.79 121.24 41 120.91 C 41.09 120.77 41.25 120.55 41.36 120.42 C 41.46 120.29 41.55 120.16 41.55 120.14 C 41.55 120.11 41.65 119.97 41.77 119.82 C 42.07 119.45 42.45 118.92 42.57 118.68 C 42.62 118.58 42.69 118.49 42.72 118.49 C 42.75 118.49 42.84 118.39 42.91 118.27 C 42.98 118.15 43.11 117.97 43.19 117.87 C 43.27 117.77 43.41 117.57 43.51 117.43 C 43.72 117.09 43.91 116.81 44.14 116.53 C 44.42 116.17 44.69 115.8 44.81 115.59 C 44.87 115.49 45.02 115.3 45.12 115.19 C 45.22 115.07 45.31 114.95 45.31 114.92 C 45.31 114.88 45.4 114.76 45.5 114.64 C 45.61 114.52 45.76 114.3 45.85 114.15 C 45.93 114 46.06 113.83 46.13 113.77 C 46.2 113.71 46.25 113.63 46.25 113.59 C 46.25 113.55 46.33 113.43 46.43 113.32 C 46.62 113.1 46.81 112.85 47.06 112.46 C 47.15 112.32 47.32 112.08 47.45 111.94 C 47.57 111.79 47.67 111.65 47.67 111.62 C 47.67 111.59 47.76 111.47 47.86 111.35 C 47.96 111.23 48.1 111.05 48.16 110.95 C 48.34 110.66 48.61 110.29 48.81 110.05 C 48.91 109.93 49.03 109.77 49.07 109.69 C 49.11 109.61 49.21 109.46 49.29 109.37 C 49.43 109.19 49.68 108.84 50.01 108.33 C 50.12 108.18 50.22 108.05 50.25 108.05 C 50.27 108.05 50.34 107.96 50.4 107.86 C 50.52 107.63 50.9 107.1 51.2 106.73 C 51.32 106.58 51.42 106.44 51.42 106.41 C 51.42 106.39 51.51 106.26 51.61 106.13 C 51.71 106 51.87 105.78 51.96 105.64 C 52.17 105.3 52.38 105.01 52.56 104.8 C 52.64 104.7 52.78 104.51 52.88 104.36 C 53.14 103.96 53.32 103.71 53.52 103.45 C 53.73 103.19 53.91 102.93 54.16 102.54 C 54.32 102.3 54.44 102.14 54.87 101.58 C 55.03 101.37 55.42 100.82 55.6 100.51 C 55.66 100.41 55.79 100.23 55.88 100.12 C 56.2 99.73 56.44 99.39 56.6 99.11 C 56.69 98.96 56.78 98.83 56.81 98.83 C 56.83 98.83 56.92 98.73 56.99 98.61 C 57.06 98.49 57.2 98.3 57.3 98.18 C 57.4 98.06 57.53 97.89 57.59 97.8 C 57.88 97.33 58.11 96.98 58.23 96.84 C 58.31 96.76 58.43 96.59 58.5 96.46 C 58.58 96.34 58.66 96.24 58.69 96.24 C 58.72 96.24 58.8 96.13 58.87 95.99 C 58.94 95.86 59.09 95.64 59.19 95.52 C 59.3 95.4 59.39 95.28 59.39 95.25 C 59.39 95.21 59.49 95.07 59.61 94.93 C 59.83 94.66 59.97 94.47 60.25 94.02 C 60.34 93.88 60.5 93.67 60.61 93.55 C 60.71 93.43 60.8 93.31 60.8 93.29 C 60.8 93.27 60.89 93.15 60.99 93.03 C 61.09 92.91 61.25 92.7 61.34 92.56 C 61.55 92.22 61.74 91.94 61.97 91.66 C 62.17 91.4 62.35 91.15 62.61 90.75 C 62.71 90.6 62.85 90.4 62.93 90.31 C 63.12 90.09 63.32 89.81 63.53 89.47 C 63.62 89.33 63.78 89.11 63.89 88.98 C 63.99 88.85 64.08 88.72 64.08 88.7 C 64.08 88.67 64.18 88.53 64.3 88.38 C 64.54 88.09 64.81 87.72 64.99 87.44 C 65.05 87.34 65.2 87.15 65.3 87.04 C 65.4 86.92 65.49 86.8 65.49 86.77 C 65.49 86.73 65.58 86.61 65.68 86.49 C 65.79 86.37 65.95 86.15 66.04 86 C 66.24 85.67 66.44 85.37 66.63 85.15 C 66.81 84.94 67.15 84.46 67.29 84.22 C 67.34 84.13 67.49 83.93 67.61 83.79 C 67.73 83.65 67.83 83.51 67.83 83.48 C 67.83 83.45 67.93 83.31 68.05 83.17 C 68.17 83.03 68.31 82.84 68.37 82.74 C 68.52 82.5 68.86 82.01 69.03 81.81 C 69.22 81.59 69.42 81.29 69.62 80.96 C 69.71 80.81 69.87 80.6 69.98 80.47 C 70.09 80.35 70.17 80.23 70.17 80.19 C 70.17 80.16 70.26 80.04 70.36 79.92 C 70.46 79.8 70.6 79.62 70.66 79.52 C 70.84 79.23 71.11 78.87 71.35 78.58 C 71.47 78.43 71.57 78.29 71.57 78.26 C 71.57 78.24 71.66 78.11 71.76 77.98 C 71.86 77.85 72.02 77.63 72.11 77.49 C 72.32 77.15 72.53 76.86 72.71 76.65 C 72.79 76.55 72.93 76.36 73.03 76.21 C 73.29 75.81 73.47 75.56 73.67 75.3 C 73.89 75.01 74.09 74.74 74.3 74.4 C 74.39 74.26 74.55 74.05 74.66 73.93 C 74.76 73.81 74.85 73.68 74.85 73.65 C 74.85 73.62 74.94 73.5 75.04 73.39 C 75.14 73.27 75.3 73.07 75.39 72.93 C 75.6 72.59 75.79 72.31 76.02 72.03 C 76.24 71.74 76.44 71.47 76.65 71.13 C 76.74 70.99 76.9 70.78 77.01 70.67 C 77.11 70.55 77.2 70.44 77.2 70.41 C 77.2 70.39 77.28 70.27 77.39 70.16 C 77.55 69.97 77.78 69.65 78.06 69.17 C 78.12 69.08 78.25 68.91 78.35 68.79 C 78.45 68.67 78.59 68.48 78.66 68.36 C 78.73 68.24 78.81 68.14 78.84 68.14 C 78.86 68.14 78.96 68.02 79.05 67.86 C 79.21 67.59 79.45 67.25 79.77 66.86 C 79.86 66.75 79.99 66.57 80.05 66.47 C 80.35 65.98 80.72 65.46 80.84 65.36 C 80.91 65.3 80.96 65.23 80.96 65.19 C 80.96 65.16 81.05 65.04 81.15 64.91 C 81.25 64.79 81.41 64.58 81.5 64.44 C 81.71 64.1 81.9 63.82 82.13 63.54 C 82.33 63.28 82.51 63.03 82.77 62.63 C 82.87 62.48 83.01 62.28 83.09 62.19 C 83.28 61.97 83.48 61.69 83.69 61.35 C 83.78 61.21 83.94 60.99 84.05 60.86 C 84.15 60.73 84.24 60.6 84.24 60.56 C 84.26 60.35 84.22 60.07 84.16 60.04 C 84.08 59.99 52.91 59.98 52.86 60.03 L 52.84 59.98 Z M 90.12 34.13 C 90.03 34.19 89.91 34.3 89.86 34.36 C 89.78 34.46 89.77 40.42 89.77 81.05 L 89.77 127.62 L 89.99 127.82 L 90.2 128.03 L 95.66 128.03 C 99.94 128.03 101.14 128.01 101.21 127.96 C 101.26 127.92 101.34 127.81 101.41 127.73 C 101.5 127.59 101.51 124.15 101.51 81.08 C 101.51 46.76 101.49 34.54 101.44 34.44 C 101.4 34.37 101.31 34.24 101.24 34.16 L 101.12 34.03 L 95.7 34.03 C 90.56 34.03 90.27 34.04 90.11 34.14 L 90.12 34.13 Z M 143.87 34.12 C 143.68 34.19 143.46 34.38 143.01 34.86 C 142.67 35.21 142.2 35.72 141.95 35.99 C 141.7 36.25 141.26 36.72 140.97 37.02 C 140.68 37.33 140.26 37.78 140.02 38.02 C 139.79 38.26 139.36 38.72 139.07 39.04 C 138.78 39.35 138.37 39.8 138.15 40.04 C 137.93 40.27 137.43 40.81 137.05 41.23 C 136.67 41.65 136.29 42.06 136.2 42.15 C 136.11 42.24 135.73 42.65 135.34 43.07 C 134.95 43.49 134.53 43.94 134.39 44.08 C 134.26 44.22 133.82 44.69 133.41 45.12 C 133.01 45.55 132.6 45.99 132.5 46.1 C 132.4 46.2 131.92 46.72 131.44 47.26 C 130.95 47.8 130.48 48.31 130.39 48.4 C 130.3 48.49 130 48.82 129.71 49.13 C 129.42 49.44 128.98 49.91 128.73 50.18 C 128.48 50.44 128.04 50.91 127.75 51.21 C 127.46 51.52 127.03 51.98 126.79 52.24 C 126.55 52.5 126.23 52.83 126.09 52.99 C 125.85 53.24 125.22 53.93 124.15 55.09 C 123.45 55.86 122.35 57.03 122.1 57.3 C 121.97 57.44 121.54 57.89 121.15 58.31 C 120.76 58.73 120.34 59.18 120.2 59.31 C 119.84 59.68 118.76 60.85 117.97 61.73 C 117.18 62.6 117 62.8 116.66 63.16 C 116.53 63.3 116.1 63.75 115.71 64.17 C 115.32 64.59 114.8 65.14 114.55 65.41 C 114.3 65.68 113.87 66.13 113.6 66.42 C 113.33 66.71 113 67.06 112.87 67.2 C 112.74 67.34 112.35 67.76 112.01 68.12 C 111.67 68.49 111.21 69 110.97 69.25 C 110.74 69.51 110.32 69.95 110.05 70.25 C 109.78 70.54 109.35 71 109.1 71.27 C 108.45 71.96 107.8 72.67 107.69 72.84 C 107.63 72.92 107.53 73.05 107.46 73.13 C 107.28 73.31 106.83 73.89 106.68 74.13 C 106.62 74.23 106.51 74.37 106.45 74.44 C 106.39 74.51 106.28 74.73 106.22 74.92 C 106.16 75.11 106.04 75.35 105.95 75.45 C 105.86 75.55 105.77 75.77 105.73 75.98 C 105.69 76.18 105.58 76.58 105.48 76.89 C 105.31 77.39 105.28 77.54 105.24 78.69 C 105.17 80.26 105.25 82.07 105.42 82.7 C 105.69 83.68 105.82 84.06 106.02 84.43 C 106.14 84.64 106.23 84.86 106.23 84.9 C 106.23 84.95 106.32 85.08 106.42 85.2 C 106.61 85.42 106.71 85.55 107.08 86.07 C 107.36 86.46 108.1 87.31 108.89 88.14 C 109.18 88.45 109.46 88.75 110.11 89.48 C 110.38 89.78 110.72 90.15 110.85 90.3 C 110.99 90.45 111.38 90.88 111.71 91.25 C 112.04 91.62 112.38 92 112.46 92.08 C 112.55 92.17 112.83 92.47 113.08 92.75 C 113.33 93.03 113.65 93.37 113.78 93.51 C 113.91 93.65 114.24 94.01 114.51 94.31 C 114.78 94.61 115.1 94.95 115.21 95.07 C 115.33 95.19 115.56 95.46 115.74 95.65 C 116.58 96.6 117.21 97.31 117.35 97.45 C 117.44 97.54 117.73 97.85 118 98.15 C 118.27 98.45 118.59 98.8 118.7 98.91 C 118.82 99.03 119.13 99.37 119.4 99.67 C 119.86 100.18 119.97 100.31 120.54 100.91 C 120.66 101.04 120.95 101.36 121.18 101.63 C 121.63 102.15 121.84 102.39 122.19 102.76 C 122.31 102.88 122.62 103.22 122.89 103.52 C 123.16 103.82 123.49 104.17 123.62 104.32 C 123.75 104.46 124.07 104.8 124.32 105.08 C 124.57 105.37 124.86 105.68 124.97 105.78 C 125.07 105.88 125.42 106.26 125.73 106.61 C 126.04 106.96 126.41 107.38 126.55 107.53 C 126.68 107.68 127.02 108.05 127.29 108.35 C 127.56 108.65 127.88 109 127.99 109.13 C 128.11 109.25 128.42 109.59 128.69 109.89 C 128.96 110.19 129.29 110.54 129.42 110.69 C 129.55 110.83 129.75 111.04 129.85 111.15 C 129.95 111.26 130.65 112.04 131.4 112.88 C 132.15 113.72 132.83 114.48 132.92 114.57 C 133.01 114.66 133.3 114.97 133.57 115.27 C 133.84 115.56 134.14 115.89 134.24 115.99 C 134.34 116.09 135.16 116.99 136.04 117.98 C 136.93 118.97 137.74 119.87 137.84 119.97 C 137.94 120.08 138.23 120.39 138.48 120.67 C 138.73 120.95 139.02 121.26 139.13 121.37 C 139.23 121.47 139.93 122.24 140.68 123.09 C 142.05 124.63 142.22 124.81 142.67 125.29 C 142.8 125.43 143.13 125.79 143.4 126.09 C 143.67 126.38 143.99 126.73 144.1 126.85 C 144.22 126.98 144.47 127.25 144.66 127.46 C 144.89 127.73 145.08 127.87 145.27 127.94 C 145.5 128.02 146.6 128.03 154.11 128.03 L 162.68 128.03 L 162.64 127.75 C 162.6 127.52 162.54 127.41 162.24 127.1 C 161.88 126.72 161.58 126.4 160.17 124.89 C 159.77 124.46 159.23 123.89 158.98 123.64 C 158.73 123.38 158.19 122.81 157.79 122.39 C 157.39 121.96 156.85 121.4 156.6 121.14 C 155.98 120.5 155.32 119.79 154.37 118.78 C 152.02 116.26 151.17 115.35 150.67 114.84 C 150.42 114.58 149.88 114.01 149.48 113.59 C 149.08 113.16 148.54 112.6 148.29 112.34 C 148.04 112.08 147.49 111.5 147.07 111.06 C 146.65 110.61 146.23 110.16 146.12 110.05 C 146.02 109.95 145.45 109.34 144.87 108.7 C 144.28 108.06 143.59 107.33 143.34 107.07 C 143.09 106.81 142.55 106.24 142.15 105.81 C 141.75 105.38 141.21 104.82 140.96 104.56 C 140.71 104.3 140.17 103.74 139.77 103.31 C 139.37 102.88 138.85 102.33 138.61 102.08 C 138.38 101.84 138.06 101.51 137.91 101.34 C 136.6 99.92 135.41 98.65 135.04 98.26 C 134.79 98 134.25 97.43 133.85 97 C 133.45 96.57 132.91 96.01 132.66 95.75 C 132.41 95.49 131.87 94.92 131.47 94.5 C 131.07 94.07 130.53 93.51 130.28 93.25 C 130.03 92.99 129.23 92.14 128.51 91.35 C 127.79 90.57 126.99 89.71 126.74 89.45 C 126.49 89.19 125.95 88.62 125.55 88.2 C 125.15 87.77 124.61 87.21 124.36 86.95 C 124.11 86.69 123.57 86.13 123.17 85.7 C 122.77 85.27 122.25 84.72 122.01 84.48 C 121.78 84.24 121.4 83.85 121.18 83.61 C 120.5 82.87 118.83 81.07 118.37 80.59 C 118.13 80.34 117.94 80.11 117.94 80.07 C 117.96 79.8 118.2 79.49 119.03 78.62 C 119.55 78.08 120.3 77.32 120.68 76.92 C 121.07 76.52 121.82 75.74 122.36 75.18 C 122.9 74.62 123.55 73.95 123.8 73.69 C 124.05 73.43 124.73 72.72 125.3 72.12 C 126.46 70.9 127.42 69.89 127.69 69.61 C 127.79 69.51 128.31 68.96 128.85 68.4 C 129.39 67.83 130.15 67.05 130.53 66.65 C 130.92 66.25 131.67 65.47 132.21 64.91 C 132.75 64.35 133.51 63.56 133.89 63.17 C 134.28 62.77 135.03 61.98 135.57 61.41 C 136.11 60.85 136.6 60.33 136.68 60.26 C 136.75 60.19 137.35 59.55 138.03 58.85 C 138.7 58.14 139.32 57.49 139.4 57.41 C 139.49 57.32 139.99 56.79 140.53 56.23 C 141.07 55.66 141.83 54.87 142.21 54.47 C 142.6 54.07 143.37 53.28 143.92 52.7 C 144.48 52.13 145.25 51.33 145.63 50.93 C 146.02 50.53 146.77 49.74 147.31 49.17 C 147.85 48.61 148.36 48.08 148.44 47.99 C 148.57 47.86 149.87 46.49 151.44 44.84 C 151.66 44.61 152.05 44.21 152.3 43.95 C 152.55 43.69 153.2 43.01 153.74 42.46 C 154.28 41.9 155.04 41.11 155.42 40.71 C 155.81 40.31 156.58 39.52 157.13 38.94 C 157.69 38.37 158.44 37.58 158.81 37.2 C 160.49 35.48 161.26 34.64 161.3 34.51 C 161.32 34.44 161.34 34.31 161.34 34.21 L 161.35 34.04 L 152.74 34.05 C 145.33 34.05 144.09 34.07 143.88 34.14 L 143.87 34.12 Z"/>
  </g>
</svg>`
    const FAVICON_DATA_URI = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(SITE_ICON_SVG)}`
    const SITE_ICON_DATA_URI = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(SITE_ICON_SVG)}`

    // src/4khdhub/branding.js
    const HEADER_WORDMARK_SVG = String.raw`<svg xmlns="http://www.w3.org/2000/svg" viewBox="24.217 18.249 1051.265 347.029" width="1100" height="388">
  <defs>
    <style>
      :root {
        color: #000000;
        --brand-text: #000000;
        --ornament-color: #ff931e;
      }
      .brand-text {
        fill: var(--brand-text, currentColor);
      }
      .decorations {
        fill: var(--ornament-color, #ff931e);
      }
      @media (prefers-color-scheme: dark) {
        :root {
          color: #ffffff;
          --brand-text: #ffffff;
        }
        .brand-text {
          fill: var(--brand-text, #ffffff) !important;
        }
      }
      .dark .brand-text,
      [data-theme="dark"] .brand-text,
      [data-detail-theme="dark"] .brand-text {
        fill: #ffffff !important;
      }
      .light .brand-text,
      [data-theme="light"] .brand-text,
      [data-detail-theme="light"] .brand-text {
        fill: #000000 !important;
      }
    </style>
  </defs>
  <g id="decorations" class="decorations" fill="#ff931e" transform="translate(0,388) scale(0.0125,-0.0125)">
    <path d="M4947 29385 c-169 -18 -327 -38 -351 -44 -25 -6 -112 -24 -196 -41 -83 -16 -163 -36 -178 -44 -15 -8 -65 -21 -112 -31 -47 -9 -108 -27 -136 -41 -29 -13 -80 -34 -115 -45 -35 -12 -80 -29 -100 -39 -19 -10 -62 -28 -94 -39 -32 -11 -75 -32 -95 -46 -20 -14 -43 -25 -51 -25 -7 0 -36 -14 -64 -30 -27 -16 -80 -45 -117 -64 -38 -20 -68 -40 -68 -45 0 -4 -18 -16 -40 -26 -22 -10 -47 -27 -57 -37 -10 -11 -31 -27 -48 -35 -34 -18 -129 -90 -186 -143 -21 -19 -47 -42 -56 -51 -10 -9 -25 -23 -33 -32 -8 -9 -46 -47 -85 -86 -38 -38 -88 -90 -110 -116 -22 -25 -51 -58 -64 -72 -13 -14 -38 -49 -56 -78 -18 -28 -39 -56 -47 -63 -8 -6 -23 -30 -33 -52 -10 -22 -22 -40 -27 -40 -5 0 -23 -30 -41 -67 -17 -38 -41 -83 -53 -101 -13 -18 -31 -54 -40 -80 -10 -26 -26 -59 -36 -74 -10 -15 -27 -62 -38 -105 -11 -43 -29 -98 -39 -123 -11 -25 -29 -93 -41 -150 -11 -58 -28 -134 -37 -170 -14 -52 -17 -112 -18 -300 0 -203 3 -249 22 -335 12 -55 29 -140 38 -189 9 -49 25 -110 35 -135 11 -25 29 -81 40 -124 11 -43 28 -90 38 -105 10 -15 29 -53 41 -84 13 -32 29 -62 36 -68 7 -6 24 -36 38 -68 15 -32 38 -69 52 -82 14 -13 25 -29 25 -36 0 -6 13 -25 28 -42 15 -16 40 -45 54 -63 67 -87 255 -260 297 -274 10 -3 22 -12 25 -20 3 -8 32 -28 64 -44 32 -16 72 -45 89 -64 30 -35 31 -38 37 -169 3 -73 8 -380 11 -683 3 -302 10 -694 15 -870 9 -318 20 -980 41 -2460 16 -1140 21 -1309 46 -1370 22 -54 70 -95 134 -114 20 -6 88 -11 151 -11 108 0 118 2 177 31 75 37 89 62 101 172 31 287 38 675 80 4302 12 1050 -12 939 203 948 147 6 350 43 425 78 26 12 70 32 99 44 65 28 175 109 235 173 25 26 65 88 89 137 41 86 43 94 44 181 0 89 -1 94 -44 175 -65 125 -181 224 -298 254 -72 19 -261 20 -330 2 -92 -24 -210 -121 -281 -230 -50 -79 -64 -226 -30 -317 11 -29 53 -95 82 -128 20 -22 20 -23 0 -41 -10 -10 -40 -21 -65 -24 -40 -5 -50 -3 -79 22 -34 28 -34 28 -21 167 9 102 9 171 2 259 -6 66 -11 250 -11 408 0 260 2 299 22 390 26 124 28 295 4 407 -16 74 -16 75 6 91 61 46 219 25 308 -41 19 -14 62 -47 96 -72 34 -25 70 -51 82 -57 11 -6 33 -23 49 -38 16 -16 42 -36 58 -45 17 -10 70 -49 119 -88 49 -38 94 -70 101 -70 6 0 22 -11 34 -24 13 -13 46 -34 74 -46 29 -12 80 -35 113 -51 34 -16 67 -29 74 -29 6 0 46 -12 88 -27 77 -28 77 -28 351 -25 213 2 283 6 315 18 22 8 65 24 94 34 94 34 225 101 282 144 102 76 200 190 248 286 9 20 34 57 56 83 l38 47 1637 0 c1072 0 1651 -4 1680 -11 24 -5 59 -22 78 -37 56 -45 137 -113 163 -136 14 -12 43 -35 65 -51 48 -35 120 -95 155 -129 14 -14 36 -31 50 -38 14 -7 36 -23 50 -36 41 -38 173 -132 185 -132 6 0 22 -12 36 -26 13 -14 38 -33 54 -41 17 -9 45 -29 64 -45 19 -17 54 -38 77 -49 24 -10 44 -23 44 -28 0 -5 21 -19 48 -32 26 -12 66 -35 89 -51 23 -15 61 -38 85 -49 24 -11 79 -40 123 -65 44 -24 105 -55 135 -70 30 -14 90 -43 133 -65 43 -21 85 -39 93 -39 8 0 40 -13 72 -29 31 -15 75 -34 97 -41 22 -7 63 -23 91 -36 28 -13 85 -32 127 -43 42 -10 96 -28 120 -40 24 -12 86 -30 138 -41 52 -12 121 -29 154 -40 33 -10 98 -26 145 -35 47 -9 121 -24 165 -35 44 -10 163 -28 265 -40 102 -11 232 -30 290 -40 155 -30 326 -39 705 -40 361 0 579 11 685 36 36 8 180 28 320 44 140 16 269 34 285 39 17 6 94 22 173 36 79 14 162 32 185 39 23 8 93 24 155 36 62 11 137 31 165 44 29 13 84 29 122 36 39 7 98 23 132 37 34 13 101 37 150 53 213 70 270 91 305 110 21 12 61 28 90 36 29 9 78 29 108 44 30 15 105 51 165 79 61 29 126 60 145 71 19 10 67 34 106 53 39 19 74 40 78 46 4 6 23 18 43 26 19 8 51 28 71 44 21 15 55 37 77 49 22 11 49 29 59 41 11 12 25 21 31 21 34 0 242 166 414 330 46 44 87 80 92 80 4 0 15 13 24 28 9 15 30 35 46 44 16 10 34 28 40 41 6 13 35 36 66 52 48 24 72 29 187 36 163 10 249 26 280 50 13 11 36 42 50 71 25 51 26 56 26 259 0 150 4 217 14 246 19 54 180 227 311 333 31 25 70 57 88 71 17 15 57 39 87 54 30 16 64 36 75 45 11 9 47 24 80 34 33 9 83 28 110 41 63 30 147 42 163 23 16 -20 -18 -90 -51 -105 -16 -8 -51 -10 -94 -7 -94 8 -142 -9 -159 -56 -27 -75 -11 -148 42 -184 11 -8 48 -23 84 -34 36 -11 90 -32 120 -46 75 -35 125 -35 144 2 23 44 87 99 146 126 80 35 126 87 143 161 13 59 14 60 53 65 76 11 143 -48 169 -150 33 -127 -3 -247 -88 -293 -38 -20 -56 -22 -182 -22 -77 1 -166 5 -198 11 -58 11 -58 11 -72 -17 -10 -19 -33 -34 -77 -51 -63 -25 -63 -25 -102 -5 -47 23 -285 41 -461 35 -146 -5 -179 -21 -220 -103 -28 -59 -29 -64 -29 -215 -1 -146 1 -158 25 -210 14 -30 35 -63 45 -72 33 -29 102 -38 299 -38 198 0 297 10 347 36 26 14 37 13 108 -1 74 -15 84 -15 140 1 43 12 72 14 102 9 75 -15 170 -10 207 9 32 17 34 17 85 -6 51 -23 51 -23 526 -20 487 3 1108 15 1630 32 465 15 1028 29 1635 40 710 13 1220 28 1355 40 145 13 432 27 845 40 842 26 980 36 1097 80 30 11 63 29 73 40 17 19 17 21 -1 41 -43 48 -156 81 -319 93 -133 10 -527 25 -940 36 -214 5 -462 14 -550 20 -157 10 -413 19 -1160 40 -997 28 -1449 42 -1655 50 -124 5 -664 14 -1200 20 -539 5 -1002 15 -1035 20 -33 5 -61 10 -62 10 -10 0 2 36 33 100 41 86 54 182 36 266 -18 83 -117 232 -242 364 -44 47 -66 62 -110 75 -77 23 -280 38 -445 32 -119 -3 -156 -9 -250 -36 -60 -17 -132 -42 -160 -55 -27 -13 -70 -32 -95 -41 -25 -9 -54 -25 -65 -35 -11 -10 -35 -25 -54 -35 -18 -9 -61 -37 -95 -61 -148 -109 -246 -199 -441 -407 -81 -87 -93 -96 -126 -97 -20 0 -41 6 -47 13 -5 6 -17 47 -26 89 -32 157 -116 291 -249 397 -209 166 -460 208 -764 128 -76 -20 -181 -88 -272 -177 -111 -109 -169 -224 -196 -392 -4 -29 -13 -42 -37 -54 -28 -14 -348 -15 -3637 -4 -1983 6 -3620 13 -3638 16 -36 5 -106 57 -237 176 -93 85 -233 202 -268 224 -21 13 -38 29 -38 34 0 5 -18 19 -40 30 -23 12 -43 27 -46 35 -3 8 -28 28 -55 45 -27 16 -49 33 -49 38 0 4 -25 23 -55 41 -30 18 -60 40 -66 48 -7 8 -30 23 -51 34 -21 11 -47 28 -58 39 -11 11 -38 29 -62 41 -24 12 -59 35 -78 50 -19 16 -40 29 -46 29 -6 0 -28 13 -48 29 -20 16 -61 40 -91 52 -30 12 -55 27 -55 31 0 5 -35 25 -77 45 -43 19 -85 41 -93 48 -8 8 -39 23 -68 34 -29 12 -65 30 -80 41 -15 11 -54 29 -87 41 -32 11 -71 29 -85 39 -14 10 -55 28 -90 40 -36 12 -92 34 -125 50 -33 15 -82 33 -108 39 -27 7 -59 18 -70 26 -12 7 -64 25 -115 39 -52 14 -113 34 -137 46 -23 11 -89 30 -146 41 -57 11 -129 29 -159 39 -48 18 -160 40 -420 85 -41 7 -174 23 -295 34 -121 12 -256 26 -299 31 -155 19 -459 10 -789 -25z m963 -369 c63 -8 151 -24 195 -35 44 -11 152 -27 239 -36 112 -12 184 -25 245 -45 47 -15 125 -35 173 -44 47 -9 106 -23 130 -32 24 -9 86 -29 138 -45 162 -48 300 -97 333 -118 18 -11 64 -29 102 -42 39 -12 82 -30 97 -41 15 -10 53 -28 85 -39 32 -10 70 -28 85 -39 15 -11 51 -29 80 -41 29 -11 60 -27 68 -34 8 -7 43 -26 76 -43 34 -16 77 -41 96 -56 19 -14 39 -26 44 -26 5 0 41 -20 79 -45 39 -25 76 -45 83 -45 7 0 20 -9 30 -21 9 -11 35 -30 57 -41 22 -12 58 -35 80 -53 22 -18 54 -40 71 -48 17 -9 34 -23 37 -31 3 -8 21 -23 39 -32 18 -9 49 -31 70 -48 20 -17 68 -56 108 -86 64 -50 120 -123 102 -134 -4 -2 -566 -7 -1250 -11 l-1243 -7 -40 44 c-22 23 -46 58 -54 76 -43 99 -335 393 -445 448 -15 8 -34 21 -41 30 -7 9 -38 29 -68 44 -31 16 -69 38 -86 49 -16 12 -52 28 -79 37 -27 9 -63 25 -80 35 -17 9 -60 26 -96 37 -36 11 -86 30 -112 41 -25 12 -104 30 -175 41 -70 11 -150 27 -177 35 -127 39 -535 45 -686 10 -79 -18 -193 -39 -323 -60 -54 -8 -112 -22 -130 -32 -18 -9 -80 -28 -139 -43 -59 -15 -114 -35 -123 -44 -18 -18 -115 -23 -115 -6 0 6 11 10 24 10 26 0 76 35 76 54 0 7 23 23 52 37 29 13 64 33 78 45 14 11 47 28 73 38 26 10 60 28 75 40 15 12 45 28 67 35 22 7 61 24 88 37 26 13 76 32 112 43 35 11 86 29 112 40 26 11 96 31 156 45 59 14 121 33 138 42 17 9 111 26 213 39 99 13 217 32 261 43 44 11 132 25 195 31 63 7 129 13 145 15 67 9 548 -4 655 -18z m-1001 -707 c102 -12 204 -28 226 -36 22 -8 85 -28 140 -45 55 -16 114 -38 130 -48 17 -10 55 -28 85 -40 30 -12 66 -32 80 -45 14 -13 41 -30 60 -39 19 -9 55 -32 80 -51 95 -73 152 -121 168 -139 10 -11 29 -32 45 -47 36 -36 63 -99 47 -109 -7 -4 -425 -10 -929 -14 -504 -3 -1123 -9 -1376 -13 -460 -8 -460 -8 -510 -34 -63 -33 -90 -80 -105 -179 -16 -103 -37 -158 -70 -175 -43 -22 -184 -169 -224 -234 -50 -82 -69 -174 -64 -311 7 -169 52 -243 247 -405 94 -79 96 -86 96 -462 0 -389 4 -379 -113 -264 -45 45 -93 98 -106 120 -14 22 -30 42 -36 46 -6 4 -24 34 -41 68 -17 34 -37 69 -45 77 -7 9 -23 45 -34 82 -11 36 -29 77 -41 91 -19 25 -72 242 -101 417 -14 85 -4 264 20 365 11 44 27 116 37 160 9 44 32 107 50 140 18 33 38 78 45 100 7 22 20 49 30 60 9 11 29 45 45 75 15 30 38 68 51 83 13 16 24 33 24 38 0 8 123 152 165 194 43 44 187 165 194 165 6 0 25 13 43 29 18 15 60 42 94 59 33 17 66 37 73 46 8 9 20 16 28 16 14 0 109 45 131 63 7 5 41 20 77 32 35 13 84 32 108 44 24 11 50 21 59 21 9 0 76 18 149 40 251 75 626 98 968 59z m12761 -153 c85 -26 230 -106 246 -137 8 -16 23 -33 34 -39 32 -17 23 -28 -27 -36 -27 -3 -60 -13 -74 -21 -39 -23 -79 -94 -86 -153 -10 -86 -5 -85 -363 -85 -389 0 -375 -6 -340 151 12 54 65 133 121 182 44 39 158 98 254 133 61 21 173 24 235 5z m64 -1211 c13 -19 11 -23 -39 -70 -30 -27 -77 -68 -105 -90 -28 -22 -68 -54 -88 -71 -20 -17 -55 -41 -77 -54 -22 -13 -55 -36 -73 -52 -18 -15 -39 -28 -47 -28 -7 0 -27 -12 -44 -26 -17 -14 -57 -39 -90 -54 -33 -16 -62 -34 -66 -39 -3 -6 -38 -26 -78 -45 -40 -19 -83 -41 -97 -49 -14 -9 -50 -25 -80 -37 -30 -12 -62 -28 -70 -36 -9 -7 -43 -22 -77 -32 -34 -11 -74 -29 -90 -40 -16 -11 -55 -28 -88 -37 -33 -10 -78 -26 -100 -37 -55 -28 -242 -94 -350 -124 -49 -14 -109 -34 -132 -44 -23 -10 -91 -28 -150 -40 -59 -12 -128 -30 -153 -41 -56 -25 -101 -35 -240 -54 -60 -9 -128 -22 -150 -30 -58 -20 -246 -52 -385 -65 -66 -7 -142 -16 -169 -21 -88 -16 -276 -23 -276 -10 0 6 14 14 31 18 17 3 40 18 51 34 11 15 41 35 65 44 25 10 59 30 77 45 17 15 41 31 54 34 12 4 42 24 66 44 24 20 73 62 109 92 63 52 157 155 211 230 47 65 118 215 153 320 30 89 36 123 40 227 4 93 9 126 21 135 20 17 506 24 1604 23 805 0 817 0 832 -20z m-12364 -9 c33 -10 35 -14 38 -57 3 -40 0 -47 -23 -59 -15 -8 -43 -39 -63 -69 -31 -47 -36 -61 -34 -107 2 -49 0 -53 -25 -61 -71 -25 -240 56 -354 169 -61 60 -109 135 -109 168 0 9 46 26 90 33 48 8 445 -6 480 -17z m705 0 c34 -15 34 -15 17 -58 -28 -70 -160 -195 -261 -246 -89 -45 -143 -59 -187 -48 -27 7 -27 7 10 40 20 19 36 39 36 46 0 7 18 39 39 71 22 32 47 78 56 101 21 55 33 71 70 91 39 21 172 23 220 3z m8518 5 c21 -5 41 -11 43 -14 2 -2 -7 -17 -22 -33 -14 -16 -41 -56 -58 -89 -31 -59 -33 -60 -83 -68 -66 -11 -132 -66 -173 -146 -17 -31 -45 -73 -62 -94 -31 -37 -33 -43 -33 -115 1 -122 24 -181 101 -258 36 -36 64 -70 62 -76 -2 -5 -36 -22 -76 -38 -40 -15 -78 -33 -85 -38 -7 -6 -59 -20 -117 -32 -58 -12 -132 -32 -166 -45 -112 -42 -216 -50 -684 -49 -467 0 -554 6 -695 49 -44 14 -141 36 -215 49 -74 13 -173 38 -220 55 -47 17 -92 34 -100 37 -12 4 -12 7 3 16 20 11 111 43 241 84 43 14 95 36 115 49 20 13 52 28 71 34 20 6 66 30 102 54 37 23 80 50 95 59 130 80 263 171 263 179 0 5 15 16 33 25 17 9 46 31 63 48 18 17 60 54 94 81 34 28 118 99 186 158 123 108 123 108 176 105 53 -3 53 -3 83 -89 41 -118 52 -133 175 -254 58 -57 96 -85 108 -80 7 3 25 5 38 5 29 0 32 16 4 23 -11 3 -25 18 -32 34 -6 15 -24 42 -39 58 -33 36 -81 198 -77 258 3 37 6 41 43 53 48 14 778 19 838 5z m366 -6 c31 -16 41 -39 41 -102 0 -83 -60 -294 -94 -333 -13 -14 -35 -46 -49 -71 -29 -51 -187 -214 -234 -241 -24 -14 -33 -15 -53 -5 -28 14 -37 45 -38 122 -1 50 -1 50 84 110 132 93 188 155 225 250 38 99 36 166 -6 221 -30 39 -30 39 5 53 37 14 87 13 119 -4z m-3946 -7 c15 -11 16 -20 8 -58 -5 -25 -18 -71 -30 -102 -15 -41 -21 -81 -21 -141 0 -51 -5 -88 -12 -95 -16 -16 -45 -15 -51 3 -4 8 -25 24 -48 36 -23 11 -64 39 -91 60 -28 21 -54 39 -59 39 -5 0 -26 16 -46 35 -20 19 -41 35 -46 35 -17 0 -197 166 -197 182 0 11 63 15 326 16 187 2 255 -1 267 -10z m934 -38 c40 -25 77 -55 82 -67 7 -15 19 -23 36 -23 33 0 34 -32 1 -54 -14 -8 -31 -28 -38 -43 -13 -28 -116 -88 -195 -114 -56 -18 -90 -54 -103 -108 -10 -45 -15 -50 -63 -74 -103 -49 -167 -63 -216 -46 -85 30 -173 113 -207 195 -21 51 -18 199 5 249 26 56 88 112 136 124 22 6 141 9 265 8 l225 -2 72 -45z m993 40 c19 -10 19 -11 2 -29 -9 -10 -28 -31 -42 -47 -14 -16 -54 -51 -89 -79 -35 -27 -80 -65 -101 -82 -21 -18 -42 -33 -48 -33 -6 0 -23 -13 -39 -29 -34 -33 -94 -66 -141 -74 -28 -6 -40 0 -93 42 -33 27 -80 54 -104 61 -25 7 -50 19 -57 27 -6 8 -30 27 -52 43 -55 38 -83 91 -68 126 7 13 12 34 12 44 0 13 10 22 33 29 45 13 763 14 787 1z m-9930 -332 c0 -16 -3 -19 -11 -11 -6 6 -8 16 -5 22 11 17 16 13 16 -11z M3259 19331 c-92 -48 -94 -58 -92 -316 2 -121 7 -326 13 -455 5 -129 15 -347 20 -485 6 -137 15 -297 20 -355 13 -146 27 -380 40 -680 28 -650 54 -871 112 -953 19 -26 25 -29 65 -24 51 6 67 22 87 92 32 108 71 494 86 855 5 135 15 353 20 485 6 132 17 319 25 415 22 263 24 317 40 805 10 285 12 468 6 498 -10 56 -45 97 -106 127 -34 17 -62 20 -162 20 -113 0 -123 -2 -174 -29z M84492 15298 c-59 -96 -95 -410 -122 -1053 -6 -137 -15 -308 -20 -380 -21 -286 -65 -1507 -59 -1637 3 -68 8 -92 25 -115 31 -41 76 -64 139 -70 55 -6 55 -6 55 -44 0 -38 -1 -39 -38 -39 -51 0 -135 -26 -155 -47 -8 -10 -25 -43 -37 -73 -37 -97 -49 -542 -80 -3020 -25 -1922 -30 -2236 -40 -2269 -5 -19 -15 -38 -22 -43 -7 -4 -66 -8 -130 -8 -147 0 -254 -14 -343 -45 -38 -13 -95 -31 -126 -39 -30 -9 -73 -27 -94 -42 -21 -14 -49 -30 -61 -34 -12 -5 -35 -20 -50 -34 -130 -114 -142 -129 -185 -213 -44 -87 -44 -87 -44 -203 0 -115 0 -115 45 -203 31 -62 55 -94 78 -108 17 -12 32 -25 32 -30 0 -11 52 -37 153 -78 71 -28 89 -31 187 -31 101 0 114 2 198 36 116 46 193 115 249 223 37 72 38 78 38 175 0 95 -2 105 -34 166 -52 99 -54 103 -80 132 -14 15 -23 30 -20 32 5 5 94 10 142 8 35 -2 40 -6 56 -44 17 -40 18 -85 17 -608 -1 -524 -2 -571 -20 -645 -24 -97 -27 -241 -7 -342 10 -50 11 -82 5 -105 -10 -33 -10 -33 -115 -33 -101 0 -106 1 -155 33 -28 17 -55 32 -61 32 -5 0 -18 10 -29 21 -10 12 -41 37 -69 55 -27 19 -70 50 -95 69 -25 19 -62 47 -83 62 -21 16 -57 44 -81 63 -70 56 -174 130 -183 130 -5 0 -33 16 -63 35 -30 20 -80 43 -110 52 -30 8 -59 19 -65 23 -19 15 -120 40 -250 61 -165 27 -290 22 -460 -19 -217 -53 -295 -86 -439 -189 -77 -56 -196 -193 -233 -269 -23 -47 -49 -84 -72 -102 -36 -27 -36 -27 -1676 -24 -902 2 -1653 6 -1669 9 -49 9 -101 37 -139 73 -71 69 -181 160 -281 235 -37 28 -84 65 -104 83 -20 17 -39 32 -43 32 -4 0 -29 18 -54 40 -25 22 -50 40 -54 40 -4 0 -16 8 -27 17 -35 33 -93 73 -103 73 -5 0 -26 16 -47 35 -20 19 -43 35 -50 35 -7 0 -28 13 -46 29 -18 15 -53 38 -78 51 -25 12 -54 31 -65 41 -11 10 -45 29 -75 43 -30 13 -70 36 -89 50 -19 14 -40 26 -46 26 -6 0 -36 15 -67 34 -31 18 -71 38 -88 45 -18 6 -53 24 -79 39 -25 16 -71 37 -101 47 -30 10 -66 25 -79 34 -24 16 -128 56 -288 112 -45 15 -100 37 -122 49 -23 11 -76 28 -119 36 -42 9 -104 27 -137 41 -32 14 -113 36 -180 49 -66 12 -136 28 -155 34 -19 6 -102 22 -185 36 -82 14 -182 31 -221 39 -39 8 -158 19 -265 25 -107 5 -250 14 -319 20 -161 12 -621 13 -770 0 -63 -5 -205 -14 -315 -20 -110 -6 -225 -15 -255 -20 -30 -5 -125 -21 -210 -34 -85 -14 -186 -32 -225 -41 -38 -8 -132 -27 -209 -40 -76 -14 -159 -34 -183 -45 -25 -11 -95 -29 -157 -41 -61 -12 -127 -30 -147 -40 -20 -10 -78 -30 -130 -44 -52 -14 -116 -34 -144 -45 -27 -10 -81 -28 -120 -40 -38 -12 -80 -28 -91 -35 -12 -8 -50 -21 -85 -30 -35 -9 -86 -29 -114 -44 -27 -16 -68 -34 -90 -41 -22 -7 -65 -25 -95 -41 -30 -15 -80 -39 -110 -53 -30 -14 -62 -30 -70 -35 -8 -5 -42 -22 -75 -36 -33 -14 -69 -34 -80 -44 -11 -10 -32 -21 -46 -24 -14 -4 -41 -18 -60 -31 -19 -14 -52 -35 -74 -47 -22 -12 -53 -31 -70 -44 -16 -12 -46 -30 -65 -40 -19 -9 -47 -29 -62 -43 -15 -14 -43 -35 -62 -46 -94 -57 -325 -254 -416 -353 -8 -9 -25 -26 -38 -37 -12 -12 -56 -53 -96 -92 -84 -81 -75 -79 -291 -90 -153 -7 -182 -15 -238 -64 -60 -53 -67 -88 -67 -339 0 -194 0 -199 -25 -235 -69 -102 -338 -357 -421 -399 -17 -9 -36 -23 -44 -31 -14 -18 -94 -56 -116 -56 -8 0 -24 -10 -36 -22 -28 -28 -160 -68 -224 -68 -47 0 -52 2 -58 25 -14 57 63 103 140 84 38 -10 48 -8 89 12 66 33 85 61 85 123 0 62 -15 86 -76 120 -69 38 -286 92 -320 79 -8 -3 -22 -20 -32 -38 -17 -34 -90 -88 -173 -130 -58 -30 -69 -44 -84 -108 -10 -45 -16 -55 -52 -74 -40 -23 -40 -23 -89 1 -42 20 -54 33 -82 87 -56 111 -39 235 42 307 69 60 87 65 225 60 69 -3 139 -11 154 -17 39 -15 97 1 162 43 68 45 98 51 133 27 45 -33 106 -41 332 -41 189 0 220 3 255 19 49 23 83 54 96 89 19 50 29 222 19 316 -13 114 -32 154 -88 185 -59 32 -136 39 -352 32 -170 -6 -189 -8 -240 -32 -54 -25 -56 -25 -130 -11 -61 11 -90 12 -157 2 -65 -9 -94 -9 -133 0 -56 13 -120 7 -164 -15 -25 -13 -36 -13 -116 11 -88 25 -88 25 -762 15 -370 -6 -968 -15 -1328 -21 -865 -13 -1170 -23 -1860 -60 -102 -5 -430 -14 -730 -20 -1004 -19 -1374 -30 -1535 -45 -88 -8 -236 -21 -330 -30 -249 -23 -389 -53 -460 -101 -53 -35 -56 -39 -39 -51 34 -25 141 -52 246 -62 157 -16 635 -40 1008 -51 531 -15 932 -30 1250 -46 162 -8 570 -19 905 -24 1407 -23 1825 -33 2595 -65 212 -8 473 -19 581 -23 160 -6 200 -11 222 -25 27 -17 27 -17 -4 -77 -63 -124 -58 -236 15 -385 31 -64 63 -110 110 -159 36 -39 66 -73 66 -77 0 -5 25 -24 55 -45 70 -46 143 -56 415 -57 158 0 214 4 295 20 111 23 246 70 303 105 20 13 57 32 82 44 25 12 63 35 85 52 22 17 59 46 83 64 139 107 257 217 424 395 86 92 86 92 119 70 35 -24 39 -31 63 -139 20 -90 84 -194 174 -285 87 -87 151 -131 252 -174 107 -45 180 -60 300 -61 132 -1 209 13 326 62 152 63 259 155 346 298 45 74 58 114 73 224 7 56 43 104 83 112 26 6 989 -4 2222 -23 338 -6 1596 -15 2795 -21 1199 -6 2203 -13 2231 -16 42 -4 58 -12 97 -49 26 -24 73 -65 105 -92 93 -77 235 -201 262 -227 14 -13 36 -29 50 -36 14 -8 37 -25 51 -39 42 -42 196 -160 258 -198 20 -12 47 -32 61 -43 32 -27 142 -99 189 -124 20 -10 38 -22 39 -27 2 -6 32 -24 65 -41 34 -17 73 -40 87 -50 14 -11 52 -33 85 -49 33 -16 96 -49 140 -74 44 -25 94 -51 110 -57 17 -7 66 -31 110 -54 44 -22 94 -44 110 -48 17 -4 55 -20 85 -36 31 -15 83 -36 115 -46 33 -9 69 -23 80 -30 11 -7 54 -22 95 -34 41 -12 102 -35 135 -51 33 -15 98 -35 144 -44 46 -8 89 -19 95 -24 20 -15 109 -40 211 -60 55 -10 143 -28 195 -39 52 -12 151 -31 220 -42 69 -12 161 -28 205 -36 199 -34 1214 -27 1355 10 30 8 127 26 214 41 88 15 176 33 197 40 20 8 76 21 124 30 48 9 112 27 143 41 31 14 93 35 136 45 44 11 95 29 115 41 19 12 63 32 98 44 36 12 75 29 88 38 12 8 49 24 81 35 31 12 67 29 78 39 12 10 42 26 68 36 26 9 63 30 83 46 20 16 46 32 58 36 12 3 40 21 62 39 22 18 54 39 70 48 17 8 39 25 50 37 11 12 33 29 50 37 16 8 41 26 55 39 14 13 70 64 125 113 55 48 124 115 153 147 29 33 69 76 88 96 18 20 34 43 34 51 0 8 11 22 25 31 13 9 32 31 41 49 9 17 30 47 46 66 17 19 38 53 48 76 10 24 24 46 30 50 6 4 21 28 31 54 11 25 32 64 47 85 27 39 60 120 109 266 14 41 36 101 49 132 53 124 79 367 71 670 -6 247 -30 459 -59 532 -11 28 -35 92 -53 141 -71 194 -91 242 -111 270 -12 17 -33 53 -48 80 -15 28 -37 65 -49 83 -110 166 -372 428 -462 462 -16 6 -34 19 -41 29 -7 10 -27 24 -45 31 -46 20 -71 83 -75 195 -2 50 -9 387 -15 750 -5 363 -14 908 -19 1210 -5 303 -14 863 -20 1245 -6 382 -19 1019 -31 1415 -21 767 -24 798 -72 844 -28 25 -104 51 -154 51 -29 0 -33 3 -33 28 0 40 10 48 65 56 92 14 138 57 155 147 17 87 -17 1120 -45 1379 -8 74 -19 225 -25 335 -34 676 -75 1201 -101 1298 -21 79 -38 106 -78 117 -53 15 -57 13 -79 -22z m589 -9540 c39 -40 83 -91 97 -113 14 -22 36 -51 48 -65 12 -14 27 -42 33 -62 7 -20 25 -55 42 -77 16 -23 29 -46 29 -53 0 -7 16 -49 35 -93 24 -55 43 -124 60 -220 14 -77 32 -165 40 -195 17 -63 20 -188 5 -240 -5 -19 -23 -105 -39 -190 -21 -112 -39 -177 -65 -233 -20 -43 -36 -84 -36 -91 0 -8 -8 -20 -17 -27 -9 -8 -32 -45 -50 -84 -35 -72 -50 -96 -131 -203 -40 -53 -75 -94 -137 -161 -41 -43 -206 -171 -252 -194 -16 -9 -36 -23 -43 -32 -8 -9 -44 -32 -81 -51 -37 -18 -70 -38 -73 -43 -4 -5 -23 -15 -44 -22 -20 -6 -66 -26 -102 -44 -36 -17 -86 -37 -113 -43 -26 -7 -73 -24 -105 -38 -31 -14 -106 -34 -166 -45 -60 -11 -135 -29 -167 -39 -180 -61 -694 -63 -876 -4 -43 14 -120 34 -170 44 -51 11 -114 30 -140 44 -27 13 -68 30 -93 37 -25 7 -52 18 -60 25 -8 6 -47 28 -86 47 -38 19 -76 43 -84 52 -7 9 -27 23 -44 32 -58 30 -285 241 -286 266 0 4 9 16 20 27 15 15 34 20 78 20 31 0 293 5 582 11 289 5 878 16 1310 22 757 13 787 14 831 34 60 27 83 66 110 184 24 109 42 139 113 193 104 80 190 204 220 318 39 150 28 280 -32 387 -40 72 -135 178 -199 222 -79 55 -81 61 -84 420 -4 327 -2 349 37 349 7 0 46 -33 85 -72z m-11541 -98 c25 -13 25 -13 0 -23 -91 -37 -222 -109 -269 -149 -18 -16 -37 -28 -43 -28 -5 0 -27 -17 -49 -37 -22 -21 -58 -54 -81 -73 -66 -57 -125 -120 -189 -202 -40 -52 -116 -200 -133 -259 -8 -30 -25 -81 -36 -113 -14 -39 -23 -95 -27 -165 -10 -183 23 -168 -364 -175 -474 -8 -2106 -12 -2114 -5 -7 8 52 99 65 99 4 0 25 17 47 38 22 20 70 60 107 87 37 28 84 64 104 80 21 17 50 37 66 44 17 7 46 25 65 40 20 15 55 35 79 46 24 10 49 26 55 35 7 9 40 29 74 45 34 15 70 36 79 46 9 11 23 19 30 19 7 0 47 18 89 39 42 22 98 47 125 56 27 9 59 24 72 34 13 10 50 26 83 35 33 10 79 29 103 43 24 13 76 34 115 44 40 11 87 29 105 40 18 10 72 30 120 44 48 13 119 36 157 50 39 13 77 25 87 25 9 0 58 14 110 31 51 17 143 39 203 50 61 10 135 28 166 39 69 25 128 36 289 56 69 8 159 24 200 34 41 10 125 24 185 29 61 6 124 13 140 15 54 7 160 -1 185 -14z m1565 -113 c39 -9 161 -28 271 -42 111 -14 221 -32 245 -41 24 -8 96 -26 159 -40 63 -14 115 -26 115 -27 0 -1 13 -19 28 -39 28 -37 28 -37 0 -44 -83 -18 -180 -47 -198 -58 -11 -7 -50 -23 -87 -35 -37 -12 -78 -31 -91 -41 -13 -10 -48 -30 -78 -45 -62 -29 -151 -83 -193 -117 -17 -13 -42 -28 -56 -34 -15 -7 -42 -25 -61 -41 -19 -16 -50 -40 -69 -53 -19 -13 -46 -34 -60 -46 -24 -21 -92 -78 -169 -141 -33 -27 -102 -90 -166 -151 -42 -40 -93 -68 -139 -76 -55 -10 -111 29 -120 85 -12 78 -51 141 -139 232 -89 91 -118 105 -152 71 -14 -15 -13 -19 12 -50 63 -76 77 -99 103 -167 47 -123 47 -121 -7 -159 -48 -33 -48 -33 -423 -36 -390 -3 -408 -1 -433 39 -25 39 51 144 111 155 84 14 157 78 187 163 10 29 38 65 91 116 l77 74 -31 29 c-16 15 -38 46 -47 68 -9 21 -34 72 -57 112 -32 56 -50 76 -80 90 -20 9 -36 20 -35 23 1 4 24 23 50 44 34 25 80 45 150 66 55 17 109 35 119 40 10 6 96 21 191 35 94 13 206 31 247 39 117 22 129 23 405 20 191 -2 279 -7 330 -18z m-1675 -359 c6 -24 15 -57 20 -75 10 -40 -28 -108 -70 -126 -46 -19 -185 -151 -209 -199 -13 -24 -32 -59 -43 -78 -17 -30 -19 -47 -14 -126 4 -71 2 -95 -10 -112 -19 -28 -26 -28 -75 4 -41 26 -41 26 -37 127 5 92 9 111 48 202 23 55 56 115 71 133 16 18 29 39 29 46 0 20 169 185 212 207 21 11 38 24 38 29 0 6 7 10 15 10 8 0 19 -17 25 -42z m3136 -161 c17 -7 53 -32 81 -57 82 -73 132 -225 103 -316 -37 -120 -51 -142 -103 -163 -45 -19 -70 -21 -280 -21 -210 0 -235 2 -291 22 -34 11 -75 34 -91 50 -17 15 -38 28 -46 28 -8 0 -23 6 -33 13 -16 12 -16 15 3 60 11 26 25 47 31 47 6 0 29 17 53 38 27 25 59 43 91 51 97 24 143 62 186 153 33 72 38 75 155 101 38 9 110 5 141 -6z m578 -212 c33 -25 65 -45 73 -45 7 0 23 -12 36 -26 12 -14 35 -33 51 -41 26 -13 69 -47 176 -134 19 -15 44 -35 55 -43 18 -13 18 -15 -15 -35 -33 -20 -49 -21 -276 -21 -237 0 -241 0 -262 23 -21 22 -21 22 5 107 21 71 24 98 19 167 -5 88 -4 91 49 92 21 0 49 -14 89 -44z m-1570 -6 c31 -34 66 -53 176 -94 101 -38 122 -66 118 -150 -3 -48 -5 -51 -48 -75 -45 -25 -45 -25 -388 -25 -344 0 -344 0 -364 25 -20 24 -20 24 9 47 57 46 95 79 133 116 22 20 43 37 47 37 5 0 31 18 58 41 27 22 63 48 80 56 16 9 42 26 56 38 36 29 89 23 123 -16z m7291 -22 c33 -11 69 -27 80 -36 11 -10 33 -25 49 -35 71 -45 176 -164 176 -201 0 -8 -19 -29 -42 -46 -43 -31 -43 -31 -248 -25 -221 7 -271 16 -295 53 -14 21 -14 26 1 54 9 17 33 48 54 68 33 32 60 88 60 128 0 6 12 25 26 42 29 34 31 34 139 -2z m-544 4 c23 -18 23 -18 -4 -50 -15 -18 -27 -36 -27 -41 0 -5 -11 -22 -26 -39 -14 -16 -35 -54 -47 -84 -32 -77 -78 -114 -147 -118 -99 -5 -126 -1 -153 27 -26 25 -26 25 3 70 58 93 194 201 293 235 67 23 80 23 108 0z m-11427 -1071 c15 -5 32 -24 41 -46 14 -35 14 -39 -16 -113 -53 -132 -82 -170 -196 -249 -72 -51 -241 -72 -408 -52 -111 13 -171 38 -226 93 -19 18 -41 36 -49 39 -23 7 3 34 48 49 77 25 124 80 137 160 9 61 47 117 82 122 59 9 563 7 587 -3z m10706 -40 c35 -6 53 -18 83 -52 21 -23 45 -56 54 -73 9 -16 31 -47 49 -68 19 -20 34 -41 34 -45 0 -13 172 -183 229 -227 29 -22 69 -54 89 -71 20 -17 53 -39 72 -49 19 -10 42 -23 50 -30 23 -20 220 -120 264 -135 22 -7 54 -21 71 -31 18 -11 74 -28 125 -39 51 -12 104 -27 119 -35 38 -19 173 -43 316 -55 309 -26 765 0 899 51 28 10 97 28 155 40 58 11 130 32 159 45 29 14 77 30 108 36 47 9 58 9 72 -5 14 -15 13 -18 -21 -32 -20 -8 -41 -15 -46 -15 -6 0 -18 -11 -26 -24 -9 -13 -36 -31 -61 -41 -25 -9 -57 -27 -72 -40 -15 -12 -56 -35 -92 -50 -36 -15 -72 -33 -80 -40 -8 -7 -46 -23 -85 -35 -38 -12 -85 -31 -103 -41 -18 -10 -70 -28 -115 -40 -45 -11 -102 -29 -127 -40 -25 -11 -103 -31 -175 -43 -71 -13 -148 -31 -169 -40 -65 -27 -207 -46 -466 -61 -295 -18 -475 -19 -760 -5 -268 13 -452 35 -544 65 -39 12 -123 30 -186 39 -63 10 -164 32 -225 51 -60 18 -137 40 -170 49 -86 21 -239 73 -315 106 -36 15 -90 36 -120 45 -30 10 -66 26 -79 36 -13 11 -53 28 -88 39 -36 11 -77 28 -91 39 -15 10 -54 28 -87 40 -33 13 -67 28 -75 36 -17 14 -104 55 -118 55 -5 0 -15 7 -23 16 -7 9 -43 31 -80 50 -37 18 -70 38 -74 44 -4 6 -29 22 -56 36 -28 14 -71 40 -97 58 -26 19 -57 37 -69 40 -13 4 -23 11 -23 16 0 5 -21 22 -47 37 -27 15 -73 47 -103 70 -30 23 -74 57 -98 75 -144 111 -250 199 -251 210 -4 28 66 30 1008 37 1407 11 1412 11 1461 1z"/>
  </g>
  <g id="brand-text" class="brand-text" fill="currentColor" transform="translate(0,388) scale(0.0125,-0.0125)">
    <path d="M41059 25207 c-73 -12 -107 -29 -225 -111 -31 -22 -44 -82 -44 -208 0 -100 -4 -129 -30 -212 -16 -53 -34 -135 -41 -184 -6 -48 -24 -125 -39 -172 -15 -47 -33 -125 -40 -175 -6 -49 -24 -128 -40 -175 -16 -47 -36 -117 -44 -156 -8 -40 -24 -91 -36 -113 -11 -23 -30 -82 -40 -131 -10 -49 -29 -108 -41 -132 -12 -24 -30 -76 -41 -117 -10 -40 -27 -89 -39 -108 -12 -18 -29 -67 -40 -109 -10 -41 -29 -94 -43 -117 -13 -23 -29 -69 -36 -102 -6 -33 -24 -85 -39 -115 -16 -30 -36 -88 -45 -129 -9 -41 -25 -88 -36 -106 -11 -18 -29 -70 -41 -116 -11 -46 -29 -97 -39 -114 -10 -16 -26 -61 -36 -100 -9 -38 -27 -88 -40 -111 -13 -23 -32 -73 -43 -112 -11 -39 -30 -90 -44 -114 -14 -24 -30 -68 -37 -98 -7 -30 -25 -78 -41 -105 -15 -28 -33 -73 -39 -100 -6 -28 -24 -75 -39 -105 -16 -30 -34 -80 -41 -110 -6 -30 -24 -80 -40 -110 -15 -30 -34 -85 -43 -122 -9 -37 -26 -83 -38 -102 -11 -20 -29 -70 -40 -112 -10 -42 -28 -92 -40 -111 -12 -18 -30 -68 -40 -110 -10 -42 -28 -91 -40 -110 -12 -18 -29 -67 -40 -109 -10 -41 -29 -94 -43 -117 -13 -23 -29 -69 -36 -102 -7 -33 -22 -78 -35 -101 -13 -23 -34 -77 -45 -120 -12 -43 -30 -92 -40 -109 -10 -17 -28 -66 -40 -110 -12 -44 -31 -95 -42 -113 -11 -18 -29 -67 -39 -109 -10 -42 -29 -91 -40 -110 -12 -19 -30 -66 -40 -105 -10 -40 -27 -84 -38 -98 -10 -15 -29 -60 -41 -101 -12 -41 -31 -87 -42 -102 -11 -16 -27 -54 -35 -85 -8 -31 -27 -79 -43 -107 -16 -27 -34 -72 -41 -100 -6 -27 -24 -73 -40 -101 -16 -28 -34 -75 -40 -105 -6 -30 -24 -76 -39 -104 -15 -27 -35 -80 -44 -117 -9 -37 -25 -83 -37 -102 -11 -20 -29 -70 -40 -111 -10 -42 -29 -95 -43 -118 -13 -23 -29 -69 -36 -102 -6 -33 -22 -76 -34 -95 -25 -38 -41 -83 -51 -144 -5 -29 -2 -43 11 -57 9 -10 24 -19 33 -19 30 0 82 40 95 73 7 17 16 71 19 120 3 48 12 98 19 111 7 13 40 59 72 102 36 47 68 104 82 142 12 34 29 71 38 81 9 9 25 46 37 82 11 35 27 71 36 80 8 10 27 50 42 90 15 41 38 90 52 110 13 20 32 50 42 65 9 16 28 44 41 62 22 29 24 39 19 112 -4 50 -1 96 7 124 14 52 35 75 51 59 16 -16 58 -172 59 -214 0 -68 -39 -230 -69 -283 -16 -28 -37 -76 -46 -106 -10 -30 -28 -68 -41 -85 -12 -16 -30 -58 -39 -93 -8 -35 -25 -80 -36 -101 -11 -22 -28 -81 -39 -133 -10 -51 -28 -115 -40 -142 -12 -26 -28 -89 -36 -140 -10 -64 -25 -111 -49 -158 -19 -37 -35 -73 -35 -81 0 -7 -16 -45 -35 -84 -20 -41 -35 -86 -35 -107 0 -38 -12 -71 -48 -129 -13 -21 -32 -78 -42 -127 -10 -49 -28 -107 -39 -129 -12 -22 -30 -80 -41 -128 -12 -48 -29 -97 -39 -108 -10 -11 -26 -33 -34 -50 -21 -41 -114 -119 -159 -134 -21 -7 -46 -10 -57 -6 -10 3 -25 19 -31 36 -10 24 -11 59 -2 167 10 115 16 146 41 197 15 33 36 83 45 112 10 28 24 57 32 64 9 7 26 34 39 59 13 25 31 52 40 60 23 19 41 59 49 107 5 36 3 45 -16 63 -17 16 -30 19 -53 14 -63 -14 -74 -22 -85 -66 -21 -80 -33 -113 -51 -139 -10 -14 -27 -59 -38 -99 -12 -40 -30 -83 -42 -96 -20 -21 -40 -88 -105 -339 -24 -93 -29 -104 -75 -148 -26 -27 -63 -52 -81 -58 -18 -5 -69 -9 -113 -9 -125 -1 -263 -17 -366 -43 -52 -14 -148 -30 -214 -37 -66 -6 -154 -22 -195 -35 -103 -32 -108 -33 -271 -50 -79 -9 -169 -22 -199 -30 -80 -20 -167 -32 -325 -45 -103 -9 -162 -19 -225 -40 -47 -15 -128 -33 -180 -40 -52 -7 -133 -25 -180 -40 -47 -15 -139 -35 -205 -43 -66 -9 -149 -25 -185 -37 -69 -22 -243 -49 -322 -50 -37 0 -50 5 -62 22 -22 31 -20 87 4 150 24 63 25 92 5 148 -8 23 -15 63 -15 87 0 43 4 49 67 111 61 59 93 107 137 198 9 18 23 80 31 140 9 59 23 124 31 144 9 19 23 70 33 112 12 49 28 89 45 110 34 41 85 116 126 186 18 28 36 52 41 52 5 0 21 23 35 52 15 29 39 68 54 88 15 19 31 46 35 60 4 14 18 43 31 66 12 22 31 71 40 108 9 37 28 83 41 103 13 19 32 57 42 83 17 46 35 71 124 176 20 25 37 50 37 56 0 6 15 40 34 77 18 36 39 91 46 121 7 30 23 74 35 97 13 23 31 66 40 95 16 48 51 98 118 168 13 14 33 43 45 65 11 22 34 57 51 79 17 21 31 44 31 51 0 15 94 161 127 196 14 15 30 52 39 88 7 34 23 79 33 100 11 20 29 75 40 120 11 45 30 95 40 110 11 15 29 59 39 97 11 38 29 92 40 121 17 42 19 58 11 89 -6 20 -19 49 -28 63 -96 143 -93 136 -81 183 6 23 17 60 25 80 16 40 11 89 -11 125 -8 12 -23 47 -34 77 -12 30 -28 60 -36 67 -9 7 -25 31 -36 53 -11 23 -35 58 -52 78 -17 20 -51 62 -76 94 -25 31 -58 71 -75 89 -16 17 -79 84 -139 149 -77 83 -123 124 -160 142 -28 15 -62 37 -76 49 -14 13 -49 30 -78 39 -30 8 -68 25 -87 36 -18 11 -67 29 -109 39 -42 11 -92 29 -112 40 -19 12 -65 29 -102 38 -37 9 -92 29 -122 44 -30 15 -86 35 -123 43 -37 9 -81 23 -97 31 -16 8 -70 22 -122 31 -68 12 -137 15 -259 12 l-165 -3 -55 -34 c-29 -19 -75 -55 -101 -80 -36 -34 -52 -59 -64 -100 -9 -31 -24 -72 -35 -93 -12 -23 -23 -77 -29 -140 -24 -230 -32 -284 -51 -328 -11 -25 -29 -90 -40 -144 -11 -54 -29 -116 -40 -137 -10 -21 -28 -77 -39 -124 -11 -47 -31 -107 -44 -133 -13 -26 -29 -74 -36 -107 -6 -33 -25 -89 -41 -125 -15 -36 -35 -95 -44 -133 -8 -37 -26 -89 -39 -115 -13 -26 -30 -77 -37 -112 -6 -36 -23 -87 -36 -113 -13 -27 -32 -86 -42 -130 -10 -45 -28 -101 -39 -124 -12 -23 -31 -81 -42 -128 -11 -47 -29 -103 -40 -125 -11 -22 -29 -78 -40 -126 -12 -48 -30 -102 -40 -120 -11 -17 -27 -64 -36 -105 -9 -41 -27 -95 -40 -120 -12 -25 -32 -84 -44 -130 -12 -46 -30 -99 -41 -118 -11 -18 -28 -71 -39 -116 -11 -46 -29 -101 -40 -123 -12 -22 -30 -84 -41 -137 -10 -54 -28 -118 -40 -144 -11 -25 -29 -89 -39 -143 -10 -53 -28 -114 -39 -136 -11 -21 -29 -84 -40 -140 -11 -56 -32 -128 -45 -161 -14 -33 -31 -92 -37 -133 -6 -40 -22 -98 -36 -128 -13 -30 -33 -98 -43 -152 -10 -53 -30 -118 -43 -145 -14 -26 -30 -75 -37 -108 -6 -33 -23 -80 -36 -104 -13 -24 -33 -75 -45 -115 -12 -39 -31 -89 -44 -111 -13 -22 -28 -65 -35 -95 -7 -30 -25 -80 -40 -110 -15 -30 -33 -82 -40 -115 -7 -33 -24 -82 -38 -110 -14 -27 -33 -82 -43 -122 -10 -40 -28 -91 -39 -113 -12 -23 -30 -86 -40 -140 -10 -54 -28 -116 -39 -138 -11 -21 -29 -84 -40 -138 -11 -54 -30 -121 -42 -149 -12 -27 -30 -87 -40 -132 -10 -45 -27 -100 -39 -123 -12 -23 -30 -81 -40 -130 -10 -49 -29 -108 -41 -132 -12 -24 -30 -80 -40 -125 -10 -45 -27 -100 -39 -123 -12 -23 -30 -81 -40 -130 -10 -49 -28 -107 -40 -130 -12 -23 -30 -86 -40 -140 -10 -54 -28 -117 -40 -139 -11 -23 -28 -76 -36 -119 -9 -42 -29 -106 -44 -142 -15 -36 -33 -92 -40 -125 -6 -33 -24 -100 -40 -150 -15 -49 -35 -145 -44 -212 -8 -69 -22 -133 -31 -146 -19 -30 -42 -137 -51 -245 -4 -54 -13 -90 -24 -105 -19 -24 -45 -101 -55 -162 -3 -22 -18 -65 -33 -95 -24 -50 -27 -67 -28 -175 -2 -176 -1 -172 -34 -207 -16 -17 -30 -31 -30 -32 0 -1 -7 -37 -16 -81 -20 -103 -21 -274 -2 -286 20 -13 26 -11 39 12 17 32 60 243 70 344 25 238 38 319 59 345 45 56 52 72 67 157 8 48 21 98 29 110 18 28 40 127 49 218 4 39 17 92 30 120 13 28 31 91 40 140 9 50 29 119 45 155 15 36 35 100 44 142 8 43 25 96 36 119 12 22 30 80 40 128 11 48 29 108 40 134 12 26 30 99 40 162 11 64 29 133 40 155 11 22 29 83 40 135 11 52 26 105 34 118 8 12 26 42 39 67 14 28 31 46 44 48 17 2 27 -8 48 -50 14 -29 33 -65 41 -80 8 -15 17 -55 20 -90 6 -62 -1 -102 -41 -248 -9 -30 -17 -111 -19 -180 -4 -124 -20 -195 -50 -230 -8 -8 -24 -49 -36 -90 -12 -41 -31 -92 -41 -112 -11 -21 -26 -70 -34 -110 -8 -40 -28 -98 -44 -129 -16 -31 -35 -76 -41 -100 -6 -24 -24 -69 -40 -99 -19 -37 -30 -78 -35 -125 -14 -150 -28 -234 -55 -345 -15 -63 -31 -137 -35 -165 -3 -27 -18 -75 -31 -105 -14 -30 -34 -93 -45 -140 -11 -47 -26 -94 -34 -106 -18 -28 -34 -117 -43 -249 -5 -61 -15 -122 -23 -136 -8 -15 -24 -44 -35 -65 -19 -35 -36 -100 -80 -314 -7 -36 -16 -101 -19 -145 -13 -161 -27 -239 -51 -287 -31 -61 -43 -156 -43 -334 -1 -102 -6 -164 -21 -234 -11 -52 -25 -120 -30 -150 -6 -30 -10 -191 -10 -357 0 -166 -3 -309 -6 -317 -10 -25 -41 -38 -63 -27 -36 20 -51 93 -51 245 0 78 -7 191 -15 251 -19 142 -19 355 -1 416 20 64 36 230 45 461 7 183 9 200 30 228 12 18 28 62 36 103 25 132 27 216 11 355 -9 74 -16 154 -16 178 0 24 -4 44 -9 44 -6 0 -12 -3 -14 -7 -7 -12 -35 -231 -47 -373 -6 -69 -17 -150 -25 -180 -27 -108 -36 -188 -45 -422 -8 -201 -12 -243 -29 -280 -34 -75 -44 -223 -38 -557 3 -168 10 -340 17 -381 14 -99 38 -283 51 -395 6 -49 18 -104 27 -122 67 -125 83 -152 92 -158 16 -10 46 -75 59 -128 8 -33 8 -53 1 -67 -6 -11 -15 -43 -20 -72 -13 -66 2 -147 34 -186 13 -15 33 -47 46 -72 12 -25 36 -60 51 -78 16 -18 29 -37 29 -41 0 -5 15 -27 33 -49 17 -22 44 -62 60 -88 30 -54 63 -103 99 -148 13 -16 34 -48 48 -72 46 -76 84 -125 165 -208 44 -46 104 -108 133 -139 30 -32 73 -66 100 -77 25 -12 54 -27 62 -35 9 -8 45 -24 80 -36 35 -11 75 -29 88 -39 30 -24 72 -38 150 -48 60 -8 64 -8 83 16 15 19 18 34 13 61 -3 20 -14 48 -23 62 -45 73 -71 107 -93 121 -29 19 -85 155 -98 237 -12 75 -32 305 -31 359 1 63 20 94 73 119 26 12 53 33 60 45 9 15 13 62 13 138 1 63 6 178 13 255 6 77 17 210 22 295 6 85 20 216 31 290 11 74 26 228 34 342 12 183 18 217 44 295 17 48 35 122 41 163 6 47 21 96 39 131 16 30 36 84 45 118 9 35 25 75 36 90 10 15 28 59 38 97 11 38 31 92 45 119 15 28 33 90 41 142 9 50 25 116 37 145 12 29 29 104 39 166 10 62 28 132 39 155 11 23 27 61 35 84 8 23 30 64 49 91 23 33 36 67 41 101 4 29 20 86 35 129 16 42 34 115 40 162 7 46 24 113 37 150 14 36 34 111 44 166 10 56 28 124 40 150 12 27 30 92 40 146 10 53 28 115 40 138 12 23 30 86 40 140 10 54 28 117 39 139 12 22 30 79 41 126 11 47 29 104 41 126 11 22 28 77 38 122 10 45 28 101 39 124 12 23 31 81 42 129 12 48 29 102 40 118 10 17 26 62 36 99 9 38 27 84 40 103 13 19 31 57 40 85 9 28 27 63 40 78 29 35 51 92 59 156 4 28 22 82 41 121 24 50 50 84 87 116 29 25 66 52 83 61 17 9 50 32 73 51 23 19 51 38 64 42 12 3 36 17 52 29 17 13 63 32 102 44 39 12 90 32 114 45 24 13 75 31 113 40 38 9 87 26 110 38 22 12 79 29 124 39 46 10 98 27 116 38 18 11 70 29 117 40 46 11 106 30 133 42 27 12 104 30 171 40 67 10 145 27 172 38 27 11 103 29 168 41 66 11 139 30 163 40 24 11 83 27 130 36 48 8 112 27 142 40 30 14 92 34 138 45 46 10 100 28 122 39 22 11 78 29 126 40 48 12 102 30 120 40 17 11 65 28 105 38 41 11 97 30 124 44 28 14 77 31 110 37 33 7 94 24 135 38 83 29 200 37 221 16 10 -10 7 -31 -14 -100 -15 -48 -34 -135 -42 -193 -8 -59 -26 -133 -41 -170 -22 -52 -27 -82 -28 -152 -1 -69 2 -91 16 -104 15 -15 17 -15 31 12 8 16 20 65 26 109 7 50 18 87 30 100 28 30 38 54 55 127 8 36 24 83 35 104 11 22 28 75 37 119 17 84 48 142 94 175 31 22 111 54 157 63 23 5 37 2 49 -10 13 -13 15 -29 11 -72 -3 -31 -14 -83 -26 -116 -12 -33 -28 -100 -36 -149 -8 -52 -27 -114 -44 -150 -16 -33 -35 -81 -41 -106 -6 -25 -24 -65 -40 -90 -15 -25 -35 -68 -44 -97 -10 -28 -25 -62 -35 -75 -35 -45 -46 -99 -46 -234 l0 -131 37 -41 c48 -53 64 -104 49 -159 -6 -22 -17 -45 -24 -51 -7 -6 -37 -19 -67 -29 l-55 -18 -3 -53 c-3 -50 -1 -55 32 -84 36 -32 47 -70 24 -84 -6 -4 -40 -8 -75 -9 -46 -1 -71 -7 -91 -22 -42 -31 -56 -68 -46 -122 13 -62 -7 -148 -53 -231 -36 -63 -37 -67 -37 -177 -1 -95 2 -115 17 -130 16 -16 20 -16 44 -3 16 9 32 31 41 58 12 36 22 47 63 68 41 20 54 34 70 72 11 26 28 55 37 65 9 10 28 42 42 70 19 39 37 58 72 79 l48 27 17 -26 c14 -22 19 -54 21 -158 2 -73 -1 -172 -7 -222 -7 -68 -16 -99 -35 -127 -13 -20 -32 -59 -41 -85 -9 -27 -24 -56 -35 -66 -11 -10 -24 -34 -31 -54 -6 -20 -26 -65 -44 -101 -18 -36 -38 -92 -45 -125 -7 -32 -25 -91 -40 -130 -16 -38 -31 -97 -35 -130 -10 -87 -24 -135 -50 -175 -12 -19 -28 -60 -35 -90 -7 -30 -17 -61 -23 -67 -12 -16 -51 -17 -78 -3 -17 10 -18 13 -5 33 8 12 20 49 26 82 7 33 25 84 41 114 25 47 29 65 29 136 0 73 -4 90 -30 140 -16 31 -30 68 -30 82 0 43 28 82 78 107 27 14 53 30 59 38 6 7 16 31 22 53 9 31 9 50 -1 85 -11 36 -21 49 -50 63 -20 10 -62 22 -94 27 -54 9 -60 8 -80 -13 -12 -12 -35 -53 -52 -92 -22 -53 -33 -98 -41 -185 -14 -138 -24 -186 -56 -265 -13 -33 -30 -108 -39 -167 -9 -58 -22 -126 -30 -150 -23 -66 -35 -127 -47 -234 -6 -54 -23 -137 -39 -184 -15 -47 -33 -128 -40 -180 -7 -52 -25 -133 -40 -180 -18 -52 -33 -129 -40 -200 -6 -63 -20 -151 -32 -195 -34 -131 -37 -151 -53 -360 -9 -124 -22 -225 -34 -265 -25 -85 -28 -101 -46 -255 -8 -71 -24 -164 -36 -205 -21 -77 -21 -80 -48 -690 -6 -124 -15 -250 -20 -280 -5 -30 -12 -95 -15 -145 -4 -49 -13 -173 -21 -275 -8 -102 -19 -246 -25 -320 -5 -74 -10 -273 -10 -441 0 -304 0 -306 -27 -390 l-27 -84 0 -345 c-1 -261 2 -356 12 -389 21 -69 72 -172 90 -178 8 -4 21 2 29 13 11 15 13 52 11 164 -2 127 0 150 17 185 18 37 23 40 65 43 31 2 55 -4 78 -18 27 -17 32 -25 32 -59 0 -21 -7 -56 -16 -77 -13 -31 -15 -57 -10 -121 4 -45 18 -115 32 -154 34 -98 45 -234 46 -599 l2 -305 33 -72 34 -71 -19 -44 c-11 -23 -23 -62 -27 -84 -5 -35 -1 -52 24 -103 17 -34 38 -96 46 -138 8 -42 22 -87 31 -101 21 -33 44 -117 43 -162 0 -44 -20 -102 -36 -107 -15 -5 -63 88 -63 122 0 14 -11 52 -24 84 -14 32 -30 79 -37 105 -6 25 -24 62 -39 81 -17 22 -35 66 -49 121 -12 48 -28 99 -36 115 -8 15 -19 61 -25 101 -5 40 -14 111 -20 158 -7 47 -21 105 -32 130 -13 30 -24 90 -33 180 -12 127 -28 190 -46 190 -5 0 -18 -18 -29 -41 -20 -38 -20 -47 -10 -157 13 -144 26 -220 46 -268 8 -20 22 -109 30 -198 8 -88 21 -192 29 -231 22 -109 63 -244 96 -310 19 -41 32 -87 39 -145 7 -56 21 -106 39 -145 16 -33 34 -78 40 -101 6 -22 21 -49 32 -60 12 -10 35 -47 51 -81 27 -56 34 -63 76 -77 25 -9 60 -16 77 -16 17 0 39 -6 48 -12 9 -7 23 -32 31 -55 9 -25 37 -65 68 -96 38 -39 65 -57 96 -64 40 -10 43 -9 63 15 18 23 20 35 14 87 -4 33 -16 85 -27 115 -11 30 -33 114 -48 186 -15 72 -35 144 -43 160 -16 32 -31 107 -43 214 -3 36 -17 102 -30 148 -14 46 -29 118 -34 160 -27 206 -33 235 -51 267 -26 43 -49 128 -49 179 0 40 34 126 51 126 4 0 20 17 34 37 38 56 34 105 -15 189 -36 61 -40 76 -40 134 0 36 9 97 20 135 11 39 25 90 31 115 5 25 25 70 44 102 30 47 35 65 35 115 0 70 21 157 50 206 12 20 32 76 45 124 45 170 61 203 137 283 38 41 74 85 78 97 5 12 14 88 20 169 11 143 20 209 40 283 15 57 30 202 39 382 8 155 11 172 39 235 31 68 56 181 86 379 17 115 22 182 36 425 6 96 17 204 25 240 7 36 27 132 44 213 17 81 40 166 51 187 11 22 28 75 36 118 9 42 27 99 41 125 13 27 33 83 43 126 11 43 31 102 44 132 14 30 30 83 36 119 6 36 24 94 40 130 16 36 34 94 40 130 6 36 26 97 43 135 l32 70 1 185 c0 196 2 205 55 271 11 14 34 66 51 115 29 88 38 144 57 377 8 99 15 129 44 195 19 42 40 95 47 117 7 22 20 54 30 70 19 32 34 100 45 200 4 33 20 101 35 150 16 50 34 113 40 140 6 28 24 77 40 110 16 33 31 80 35 105 3 25 2 76 -4 113 -8 54 -7 77 5 112 10 27 28 54 50 70 19 14 46 49 60 77 22 44 24 52 11 66 -8 10 -20 27 -26 40 -10 19 -10 28 3 47 8 13 32 29 53 35 21 7 43 17 50 22 7 5 17 26 24 45 11 35 10 36 -31 72 l-43 37 16 74 c16 82 64 171 119 225 69 67 96 101 118 145 13 24 33 60 45 80 13 19 25 54 28 78 4 31 1 48 -13 64 -17 21 -18 22 -63 4 -40 -15 -48 -24 -75 -80 -28 -58 -33 -64 -76 -76 -54 -15 -64 -9 -98 51 -12 22 -25 39 -29 39 -5 0 -13 9 -19 21 -8 14 -8 24 -1 33 22 27 179 94 254 110 43 9 86 20 97 26 11 6 31 26 46 46 25 32 26 39 17 79 -12 53 -8 59 66 81 47 14 53 19 80 72 16 32 30 74 32 94 3 32 -3 42 -54 93 -32 31 -62 68 -68 82 -11 30 3 82 33 126 11 16 27 54 35 85 8 31 27 80 43 107 16 28 33 79 40 115 13 80 80 221 132 277 21 24 38 47 38 52 0 5 11 23 25 39 15 18 33 61 44 105 10 41 21 79 25 85 16 26 107 32 458 32 431 -1 577 -10 645 -40 26 -12 91 -30 145 -40 53 -10 116 -28 140 -38 54 -25 230 -72 268 -72 15 0 47 7 71 16 62 22 123 11 174 -32 133 -111 201 -178 249 -244 14 -19 32 -44 40 -55 8 -11 22 -65 31 -120 9 -55 25 -129 35 -165 11 -36 26 -114 35 -174 12 -83 22 -122 44 -160 16 -28 35 -71 41 -96 7 -24 18 -53 25 -63 17 -24 76 -67 92 -67 19 0 102 120 114 165 6 22 23 74 39 115 23 58 31 103 39 198 11 140 2 254 -29 354 -11 35 -26 110 -34 167 -11 83 -19 108 -38 130 -14 14 -74 80 -133 146 -60 66 -121 131 -135 145 -14 14 -63 67 -110 118 -92 100 -201 210 -435 438 -137 133 -208 193 -299 249 -18 11 -48 33 -67 48 -42 35 -124 91 -164 113 -16 9 -45 29 -62 45 -18 15 -52 33 -75 39 -24 5 -68 23 -98 39 -30 15 -80 34 -110 41 -30 7 -77 25 -105 40 -50 28 -132 50 -184 50 -16 0 -34 7 -42 16 -7 9 -29 22 -50 30 -20 8 -42 26 -50 40 -12 24 -11 28 24 62 71 69 107 129 124 205 9 40 28 97 44 127 15 30 33 75 39 100 6 25 23 65 37 90 13 25 33 78 43 118 10 41 30 91 44 112 14 21 28 50 32 64 3 14 16 35 28 45 49 45 94 81 100 81 16 0 101 -73 118 -100 19 -32 48 -39 68 -15 7 8 26 43 43 77 19 40 32 84 35 119 3 46 1 60 -14 73 -11 9 -38 33 -62 53 -61 51 -73 79 -61 133 6 25 18 58 29 75 10 16 26 50 36 75 9 25 27 56 40 70 13 14 31 43 41 65 10 22 28 56 39 75 12 19 29 68 39 107 9 40 30 92 45 115 15 24 35 71 44 106 9 35 27 83 41 107 18 31 28 64 32 114 6 77 -7 125 -39 142 -12 6 -18 19 -16 32 4 31 56 46 164 46 83 1 94 3 139 32 27 17 55 39 62 48 7 9 15 35 19 59 3 23 17 59 30 78 14 20 36 57 49 84 14 27 29 51 35 55 15 10 117 225 125 265 4 19 18 54 31 77 13 23 31 72 39 110 9 37 29 97 45 133 17 37 34 100 40 144 9 58 22 99 55 163 24 47 55 92 67 101 39 26 89 76 102 102 7 14 19 47 25 74 12 49 77 173 112 211 9 11 29 45 43 75 14 30 35 71 46 90 10 19 26 70 34 112 8 43 26 97 39 120 14 24 30 66 36 93 7 28 25 73 41 100 15 28 34 70 40 95 6 25 24 68 40 95 16 28 33 70 40 95 6 25 23 65 38 90 14 25 47 123 73 218 33 120 56 186 76 214 15 22 37 55 49 74 11 19 30 44 41 56 12 13 33 48 47 78 14 30 35 69 47 87 12 19 27 70 35 123 10 59 29 123 55 183 22 50 49 101 60 112 10 12 28 47 38 78 11 32 29 70 41 84 11 14 28 51 37 82 9 31 25 74 37 96 19 37 21 55 20 220 0 147 -3 186 -17 211 -9 17 -25 66 -37 107 -11 42 -29 91 -40 109 -11 18 -29 63 -40 99 -11 37 -26 72 -34 78 -8 7 -26 37 -41 69 -15 31 -40 71 -56 90 -16 18 -29 37 -29 42 0 5 -18 30 -40 55 -22 25 -40 50 -40 56 0 5 -15 26 -34 46 -18 21 -40 52 -49 68 -28 53 -195 208 -260 242 -18 8 -47 29 -65 44 -18 16 -39 29 -46 29 -7 0 -31 12 -52 27 -21 15 -70 40 -109 55 -38 16 -76 35 -85 43 -8 7 -42 21 -75 30 -33 10 -82 30 -110 45 -27 16 -72 34 -100 41 -27 6 -68 22 -91 35 -22 12 -78 32 -125 44 -46 12 -98 30 -116 41 -70 43 -291 67 -424 46z m-2023 -7140 c25 -22 26 -25 14 -63 -7 -21 -19 -49 -26 -61 -16 -26 -51 -30 -78 -10 -18 13 -18 16 -1 68 17 53 40 89 56 89 4 0 20 -10 35 -23z m225 -309 c7 -13 10 -47 7 -87 -4 -47 -14 -83 -37 -127 -17 -34 -31 -66 -31 -72 0 -6 -13 -26 -29 -44 -47 -55 -54 -78 -56 -176 -1 -91 -1 -93 -36 -130 -36 -37 -93 -147 -124 -235 -20 -57 -47 -76 -142 -102 l-66 -18 -19 23 c-10 12 -18 31 -18 41 0 28 24 80 50 109 12 14 31 43 42 65 12 22 31 54 43 70 12 17 28 47 34 67 7 20 21 48 32 61 10 14 32 54 47 89 16 34 36 69 45 76 9 8 23 36 32 63 9 27 27 62 40 78 13 15 33 53 45 83 11 31 34 70 50 87 17 17 30 36 30 41 0 15 31 60 41 60 4 0 14 -10 20 -22z m-558 -430 c10 -8 17 -30 19 -56 1 -32 -3 -48 -20 -64 l-22 -22 -26 24 c-20 20 -24 31 -20 54 7 33 32 76 44 76 5 0 16 -6 25 -12z m-5597 -285 c16 -24 19 -45 17 -150 -2 -137 -11 -165 -80 -262 -30 -42 -48 -58 -82 -69 -44 -15 -45 -14 -67 11 -22 26 -22 28 -7 74 9 27 25 59 35 72 10 13 26 49 34 80 9 31 29 76 44 101 15 25 31 56 35 70 10 41 37 100 45 100 4 0 16 -12 26 -27z m6411 -229 c-3 -48 -12 -75 -31 -102 -14 -21 -33 -59 -42 -84 -8 -26 -21 -51 -27 -56 -7 -4 -32 -16 -57 -25 -44 -17 -45 -17 -62 4 -26 31 -22 64 10 101 16 18 41 54 56 81 16 26 34 50 41 55 7 4 20 23 30 42 10 19 24 43 32 52 12 14 20 15 36 7 17 -10 19 -18 14 -75z m560 -354 c7 -25 44 -46 109 -60 48 -11 74 -25 74 -41 0 -5 -14 -16 -31 -25 -25 -12 -46 -14 -95 -9 -105 11 -166 31 -196 65 -16 17 -28 37 -28 45 0 26 42 45 103 45 51 0 60 -3 64 -20z m-7223 -202 c8 -18 17 -71 20 -118 5 -63 3 -100 -9 -144 -9 -33 -20 -65 -26 -72 -5 -6 -20 -55 -34 -108 -13 -53 -32 -112 -43 -131 -11 -18 -30 -69 -42 -112 -11 -43 -29 -90 -40 -105 -11 -14 -29 -60 -40 -102 -11 -41 -29 -90 -40 -108 -11 -18 -29 -63 -40 -99 -28 -92 -66 -124 -155 -130 -49 -4 -50 -3 -53 25 -2 16 6 59 17 95 11 36 25 102 31 146 6 44 27 131 47 193 28 91 43 121 72 151 20 20 49 46 65 58 27 19 30 25 37 114 9 117 26 234 40 276 5 17 17 37 25 44 9 7 24 30 35 51 12 24 34 45 60 58 22 12 42 27 46 35 3 8 7 15 10 15 2 0 10 -15 17 -32z m7379 -46 c39 -17 97 -72 97 -91 0 -4 -8 -15 -18 -24 -13 -12 -38 -16 -102 -16 -74 0 -250 -21 -316 -37 -15 -4 -27 2 -44 23 -18 23 -21 36 -16 77 3 27 13 57 22 67 19 22 83 28 231 23 73 -2 115 -8 146 -22z m-1378 -1050 c0 -26 -13 -60 -40 -108 -22 -38 -47 -69 -55 -69 -8 0 -21 13 -29 30 -27 56 -10 157 29 175 36 18 76 26 85 18 5 -5 10 -26 10 -46z m-630 -213 c67 -19 69 -25 24 -79 -28 -33 -57 -55 -94 -70 -51 -21 -55 -25 -80 -88 -15 -37 -33 -77 -41 -89 -8 -13 -17 -43 -21 -68 -4 -33 -1 -51 11 -70 15 -22 23 -25 76 -25 32 0 70 -4 85 -10 25 -10 25 -10 9 -42 -14 -28 -15 -38 -3 -86 l13 -55 -30 -23 c-16 -13 -34 -24 -41 -24 -15 0 -104 -113 -131 -165 -11 -22 -46 -61 -77 -85 -32 -25 -66 -53 -76 -64 -11 -12 -20 -41 -24 -85 -4 -36 -17 -111 -30 -166 -13 -55 -29 -128 -36 -162 -7 -36 -25 -84 -43 -112 -17 -27 -38 -62 -47 -78 -9 -16 -36 -43 -62 -59 -41 -28 -51 -30 -92 -24 -59 9 -78 26 -43 39 20 7 31 24 46 70 12 34 30 73 41 87 12 15 30 59 42 98 11 39 29 80 39 91 10 11 28 51 39 90 14 45 33 81 53 102 44 45 43 90 -4 184 -20 41 -39 90 -41 109 -9 64 21 120 116 221 20 22 37 45 37 51 0 6 15 41 34 77 18 36 39 93 46 126 7 33 23 86 36 117 16 39 24 78 25 120 0 35 6 79 13 98 9 26 22 38 47 47 43 15 132 16 184 2z m-5771 -1695 c3 -9 6 -21 6 -29 0 -7 -22 -46 -49 -87 -33 -51 -57 -77 -74 -82 -16 -4 -29 -17 -36 -37 -6 -18 -16 -29 -23 -26 -19 6 -10 88 11 112 10 11 24 43 30 70 7 28 19 60 27 73 11 17 24 22 58 22 31 0 46 -5 50 -16z m5446 -445 c6 -11 10 -29 8 -41 -5 -33 -28 -42 -76 -29 -23 7 -42 15 -41 19 0 8 80 70 91 71 4 1 12 -8 18 -20z m-5849 -899 c28 -15 24 -47 -8 -64 -16 -8 -39 -26 -52 -40 -41 -44 -57 -33 -75 51 -6 28 -4 34 21 47 33 18 86 20 114 6z m-50 -249 l23 -19 -27 -36 c-16 -20 -32 -36 -37 -36 -14 0 -40 42 -40 65 0 25 18 45 41 45 9 0 27 -8 40 -19z m5129 -620 c38 -77 45 -117 26 -163 -9 -20 -23 -79 -32 -130 -8 -51 -23 -109 -32 -128 -21 -43 -78 -76 -100 -57 -8 6 -23 31 -33 55 -10 24 -30 58 -45 77 -17 22 -28 54 -33 92 -11 81 13 166 69 238 23 30 43 55 44 55 0 0 19 6 41 14 21 8 45 11 53 9 7 -3 26 -31 42 -62z m-5293 -203 c17 -18 40 -41 52 -50 25 -21 26 -31 6 -48 -19 -16 -130 -16 -169 -1 -27 11 -28 14 -24 62 3 28 12 55 19 60 8 5 30 9 50 9 28 0 43 -7 66 -32z m5456 -245 c43 -34 59 -63 45 -86 -6 -12 -22 -17 -58 -17 -40 0 -51 4 -61 21 -10 19 -5 81 7 101 9 15 31 8 67 -19z m-376 -176 c32 -35 42 -55 48 -94 7 -53 -5 -115 -33 -168 -18 -35 -17 -80 3 -149 8 -27 15 -70 15 -95 0 -35 -6 -53 -26 -76 -14 -16 -43 -68 -65 -115 -36 -75 -42 -97 -50 -195 -5 -60 -13 -168 -17 -239 -7 -122 -6 -131 13 -148 17 -16 29 -18 76 -13 53 6 57 5 74 -21 15 -23 17 -40 11 -103 -4 -54 -11 -81 -24 -94 -11 -10 -42 -22 -73 -26 -30 -4 -64 -13 -76 -19 -48 -26 -53 -55 -53 -284 0 -117 -5 -253 -11 -303 -6 -49 -27 -137 -46 -195 -28 -83 -35 -122 -36 -185 0 -62 4 -91 21 -129 22 -48 22 -48 2 -73 -42 -53 -35 -136 15 -175 14 -11 25 -28 25 -38 0 -10 -12 -28 -27 -40 -16 -12 -45 -42 -65 -68 -31 -39 -38 -55 -38 -93 0 -30 10 -68 27 -105 22 -48 28 -77 31 -157 l4 -99 -37 -38 c-36 -37 -38 -41 -32 -85 4 -26 16 -60 27 -75 12 -16 30 -66 41 -110 18 -71 19 -86 8 -113 -16 -39 -132 -158 -176 -181 -31 -16 -34 -15 -53 4 -11 11 -22 31 -26 44 -3 14 0 92 6 173 7 81 16 299 20 483 5 206 14 383 24 460 9 69 18 226 20 350 4 194 7 235 26 295 12 39 25 88 30 110 7 33 5 44 -13 70 -19 26 -22 43 -21 125 1 73 7 113 27 175 25 76 38 172 52 370 4 50 17 145 30 212 27 135 45 325 45 477 1 153 16 285 35 306 14 15 67 145 92 222 2 9 -2 50 -11 92 l-16 76 30 47 c34 53 66 76 90 63 9 -5 35 -29 57 -53z m244 -612 c15 -10 -45 -164 -71 -180 -5 -3 -18 -1 -29 5 -13 6 -22 25 -26 54 -5 33 -2 55 14 91 l21 48 42 -7 c22 -4 44 -9 49 -11z m414 -285 c0 -30 -4 -64 -9 -75 -7 -19 -8 -19 -27 4 -13 16 -19 39 -19 71 0 48 9 61 40 57 11 -2 15 -16 15 -57z m-160 -435 c0 -17 -7 -20 -39 -20 -22 0 -41 5 -43 11 -4 11 44 33 67 30 8 -1 15 -10 15 -21z m-6220 -304 c4 -15 1 -37 -10 -62 -10 -21 -22 -39 -27 -39 -15 0 -39 70 -32 93 3 12 13 33 21 45 14 23 15 23 28 5 7 -10 16 -29 20 -42z m6079 -462 c30 -35 34 -84 11 -128 -20 -40 -46 -47 -68 -20 -12 16 -16 32 -12 58 10 62 27 121 35 121 5 0 20 -14 34 -31z M63699 25205 c-58 -10 -87 -21 -121 -47 -25 -18 -59 -40 -76 -50 -17 -9 -39 -31 -48 -50 -14 -27 -18 -61 -19 -178 -2 -127 -5 -155 -29 -225 -14 -44 -35 -135 -46 -202 -11 -67 -29 -145 -40 -174 -12 -29 -28 -98 -36 -153 -19 -127 -22 -141 -46 -194 -10 -24 -28 -83 -38 -132 -10 -49 -28 -107 -40 -130 -12 -23 -30 -82 -40 -132 -11 -49 -29 -105 -40 -123 -11 -18 -29 -67 -39 -109 -11 -42 -29 -92 -40 -112 -12 -19 -29 -65 -38 -102 -9 -37 -28 -92 -43 -122 -15 -30 -33 -80 -39 -110 -7 -30 -25 -82 -41 -115 -15 -33 -34 -87 -40 -120 -7 -33 -25 -85 -40 -115 -15 -30 -33 -82 -40 -115 -7 -33 -24 -82 -38 -110 -14 -27 -33 -83 -43 -123 -10 -41 -28 -86 -39 -102 -11 -15 -27 -57 -36 -91 -9 -35 -29 -89 -45 -119 -15 -30 -33 -77 -40 -105 -6 -27 -24 -72 -39 -100 -15 -27 -33 -75 -40 -105 -7 -30 -23 -73 -36 -96 -13 -23 -33 -77 -44 -120 -12 -43 -30 -93 -41 -110 -10 -17 -28 -65 -38 -107 -10 -42 -28 -92 -40 -110 -12 -19 -30 -68 -40 -110 -10 -42 -28 -92 -40 -110 -12 -19 -29 -68 -39 -108 -11 -41 -31 -96 -45 -124 -15 -27 -32 -75 -38 -105 -6 -30 -24 -80 -39 -110 -16 -30 -34 -80 -40 -110 -7 -30 -25 -80 -40 -110 -16 -30 -34 -80 -40 -110 -7 -30 -25 -80 -41 -110 -16 -30 -33 -80 -40 -110 -6 -30 -24 -80 -40 -110 -15 -30 -33 -80 -40 -110 -6 -30 -22 -73 -35 -96 -13 -23 -32 -73 -43 -112 -11 -39 -31 -90 -44 -114 -14 -24 -33 -70 -42 -103 -9 -33 -25 -71 -35 -85 -10 -14 -28 -58 -40 -99 -12 -41 -31 -86 -41 -101 -11 -14 -27 -53 -35 -86 -9 -32 -28 -81 -44 -109 -15 -27 -33 -75 -40 -105 -7 -30 -25 -80 -41 -110 -16 -30 -33 -80 -40 -110 -6 -30 -22 -74 -35 -97 -14 -24 -34 -79 -45 -124 -11 -45 -29 -93 -39 -108 -11 -14 -28 -61 -39 -103 -10 -43 -29 -94 -42 -114 -12 -20 -28 -62 -35 -92 -12 -50 -11 -58 3 -74 20 -22 42 -23 88 -1 29 14 38 26 50 67 8 27 15 75 15 105 0 73 13 117 45 148 14 14 25 29 25 34 0 4 18 29 40 54 22 25 43 58 46 73 5 25 21 60 122 272 22 47 46 101 52 121 6 20 22 51 35 69 14 19 25 39 25 46 0 7 15 32 34 57 19 24 39 53 44 64 6 11 11 60 11 109 -1 105 8 159 27 175 21 18 33 2 68 -89 18 -48 29 -95 29 -127 0 -66 -47 -237 -83 -300 -15 -27 -35 -73 -44 -102 -10 -28 -26 -63 -37 -77 -11 -14 -31 -63 -44 -108 -13 -46 -31 -98 -40 -115 -9 -18 -25 -76 -36 -129 -10 -53 -28 -117 -39 -142 -11 -25 -27 -84 -35 -131 -19 -108 -23 -119 -50 -156 -13 -16 -31 -59 -41 -95 -9 -36 -26 -76 -35 -89 -10 -12 -21 -39 -25 -60 -9 -56 -35 -133 -55 -167 -11 -18 -28 -73 -39 -122 -10 -50 -28 -109 -40 -132 -11 -22 -28 -73 -37 -113 -10 -45 -27 -88 -47 -116 -52 -75 -127 -139 -185 -162 l-55 -20 -18 23 c-14 18 -18 42 -18 113 0 117 15 209 44 265 13 25 29 68 36 97 8 29 26 67 42 85 15 18 28 38 28 45 0 6 21 39 47 73 39 52 47 72 51 115 4 48 2 55 -21 70 -22 14 -32 15 -60 6 -19 -7 -41 -19 -50 -29 -8 -9 -25 -51 -37 -92 -12 -41 -32 -93 -45 -115 -13 -22 -28 -64 -35 -93 -7 -29 -23 -66 -36 -81 -21 -26 -29 -49 -68 -206 -8 -33 -26 -98 -41 -145 -23 -76 -31 -90 -77 -132 -28 -25 -65 -49 -81 -52 -16 -3 -64 -6 -106 -6 -121 -1 -260 -17 -362 -43 -52 -14 -146 -30 -210 -36 -64 -7 -141 -19 -170 -28 -30 -8 -75 -21 -102 -28 -26 -8 -114 -21 -195 -30 -81 -9 -183 -24 -227 -35 -76 -18 -183 -31 -360 -45 -44 -4 -111 -18 -150 -31 -38 -13 -127 -33 -196 -44 -70 -11 -150 -29 -179 -40 -29 -12 -117 -30 -194 -41 -78 -10 -168 -28 -201 -40 -62 -21 -237 -48 -316 -49 -62 0 -84 24 -80 87 1 25 11 63 22 84 23 45 25 114 5 155 -8 16 -18 52 -21 80 -7 49 -6 52 25 74 18 13 51 43 74 68 37 41 57 69 100 143 8 14 22 68 30 120 9 52 27 128 40 169 13 41 27 102 31 134 6 46 15 67 39 95 18 20 45 56 60 81 36 59 69 108 99 145 13 17 32 46 42 65 9 19 26 44 36 56 33 36 117 210 129 267 6 30 24 75 39 99 16 23 36 67 46 96 9 29 23 56 31 59 7 3 27 27 44 54 16 27 34 49 39 49 17 0 102 173 122 250 11 41 29 89 39 106 11 17 28 58 39 92 17 57 31 78 116 177 33 38 80 109 125 190 50 89 90 152 127 196 17 22 34 54 38 71 4 18 20 62 35 98 15 36 33 92 40 125 7 33 25 83 40 110 15 28 33 75 40 105 7 30 24 77 38 103 37 72 33 122 -15 196 -21 33 -48 77 -61 97 l-22 36 25 79 c20 64 23 87 16 124 -5 25 -15 53 -23 63 -8 9 -29 46 -47 82 -36 75 -61 113 -113 176 -21 25 -38 49 -38 53 0 5 -10 19 -22 32 -13 14 -36 40 -52 59 -15 19 -85 95 -154 168 -88 93 -142 142 -177 159 -27 14 -63 36 -78 49 -15 13 -47 28 -69 35 -23 6 -66 24 -95 39 -29 16 -79 34 -111 40 -31 7 -82 25 -112 40 -30 15 -80 33 -110 40 -30 7 -80 25 -110 41 -30 15 -84 35 -120 43 -36 8 -83 22 -105 32 -22 9 -74 22 -115 30 -84 15 -355 18 -412 5 -51 -12 -148 -78 -192 -129 -19 -24 -40 -62 -46 -85 -6 -23 -19 -64 -30 -92 -24 -62 -37 -125 -45 -235 -10 -140 -24 -219 -46 -262 -11 -22 -29 -84 -39 -138 -10 -54 -28 -117 -39 -139 -12 -22 -30 -79 -41 -127 -12 -48 -29 -102 -40 -119 -11 -17 -29 -71 -40 -120 -11 -49 -29 -103 -40 -120 -11 -17 -29 -71 -40 -120 -11 -49 -29 -103 -40 -120 -11 -17 -28 -71 -40 -119 -11 -48 -29 -104 -40 -126 -11 -22 -29 -78 -40 -125 -11 -47 -29 -103 -40 -125 -11 -22 -29 -78 -40 -125 -11 -47 -29 -103 -40 -125 -11 -22 -29 -77 -40 -123 -10 -47 -28 -100 -39 -118 -11 -19 -29 -72 -41 -118 -12 -46 -32 -105 -44 -130 -13 -25 -31 -80 -40 -121 -9 -41 -25 -88 -36 -105 -11 -16 -27 -64 -36 -105 -9 -41 -27 -98 -40 -125 -22 -50 -30 -79 -54 -198 -6 -32 -22 -82 -35 -110 -13 -29 -29 -86 -35 -127 -7 -41 -25 -107 -41 -145 -15 -39 -33 -100 -38 -135 -13 -77 -22 -109 -49 -170 -11 -25 -26 -79 -32 -120 -7 -41 -25 -107 -41 -145 -15 -39 -33 -102 -39 -140 -6 -39 -22 -92 -35 -118 -14 -27 -34 -84 -45 -128 -11 -44 -31 -98 -44 -122 -14 -23 -30 -64 -37 -92 -6 -27 -23 -70 -37 -94 -13 -24 -33 -78 -43 -119 -11 -41 -28 -89 -38 -106 -11 -17 -29 -69 -41 -115 -12 -47 -32 -103 -45 -125 -13 -23 -29 -68 -35 -101 -7 -33 -25 -89 -40 -125 -15 -36 -33 -99 -40 -140 -7 -41 -24 -102 -37 -135 -14 -33 -34 -103 -44 -155 -11 -52 -28 -112 -39 -133 -11 -21 -29 -78 -39 -126 -11 -49 -29 -108 -41 -131 -12 -23 -30 -83 -41 -133 -11 -50 -29 -106 -40 -123 -11 -18 -28 -73 -39 -122 -10 -50 -28 -109 -40 -132 -12 -23 -30 -82 -41 -132 -11 -49 -29 -108 -40 -130 -11 -22 -29 -84 -39 -138 -10 -54 -28 -116 -39 -138 -11 -22 -29 -81 -40 -132 -11 -50 -30 -107 -41 -126 -12 -18 -30 -77 -41 -131 -11 -53 -30 -132 -44 -174 -13 -43 -31 -132 -39 -199 -9 -67 -20 -128 -26 -136 -20 -24 -39 -102 -50 -212 -9 -85 -17 -114 -36 -143 -15 -22 -32 -72 -43 -126 -10 -49 -29 -109 -41 -132 -18 -36 -23 -70 -30 -191 -8 -139 -15 -174 -45 -210 -7 -8 -18 -37 -25 -65 -14 -59 -25 -242 -16 -278 3 -14 13 -27 21 -31 20 -7 39 35 55 124 6 36 22 97 34 135 19 57 25 101 30 237 4 92 12 181 18 198 5 17 19 35 30 41 25 13 43 57 58 139 6 35 21 81 32 103 11 23 25 86 35 156 9 75 23 133 38 166 13 28 33 100 43 160 11 63 29 125 41 146 12 20 30 77 41 127 10 50 28 109 40 132 12 23 30 82 41 132 11 49 29 107 39 129 11 21 29 93 41 160 11 67 29 140 41 162 11 22 28 81 38 131 10 51 31 116 45 146 15 30 32 66 38 79 7 13 20 29 30 35 20 12 29 4 82 -81 29 -47 30 -51 30 -173 0 -105 -4 -137 -24 -200 -17 -53 -25 -103 -27 -172 -3 -125 -19 -200 -54 -263 -16 -27 -36 -79 -45 -114 -9 -36 -25 -81 -35 -100 -10 -20 -26 -70 -35 -111 -10 -41 -29 -95 -42 -118 -14 -24 -33 -73 -43 -108 -10 -36 -28 -80 -39 -98 -21 -33 -26 -61 -51 -294 -6 -57 -20 -131 -31 -165 -11 -34 -29 -105 -39 -159 -10 -53 -30 -118 -43 -145 -13 -26 -27 -66 -31 -88 -4 -22 -20 -83 -36 -135 -19 -59 -35 -144 -44 -225 -7 -71 -19 -141 -25 -155 -6 -14 -22 -39 -35 -57 -16 -22 -26 -57 -35 -120 -7 -48 -21 -122 -31 -163 -17 -70 -30 -161 -45 -335 -5 -48 -16 -90 -38 -135 l-31 -65 -8 -225 c-6 -193 -11 -242 -34 -345 -27 -116 -28 -129 -28 -426 -1 -332 -3 -343 -55 -337 -47 5 -55 41 -62 283 -4 121 -10 279 -14 350 -5 96 -3 172 10 290 9 88 20 262 23 387 7 213 8 228 29 250 26 28 38 74 52 193 16 129 14 204 -9 340 -11 66 -20 124 -20 130 0 6 -3 6 -9 0 -12 -12 -27 -109 -36 -220 -17 -222 -27 -314 -40 -360 -26 -91 -35 -178 -45 -418 -9 -205 -14 -247 -33 -300 -21 -59 -22 -76 -22 -397 0 -277 3 -348 17 -410 9 -41 19 -129 23 -195 8 -167 30 -318 50 -357 10 -18 27 -51 38 -73 11 -22 33 -54 47 -71 15 -17 39 -66 55 -107 l28 -77 -23 -52 c-18 -42 -21 -65 -18 -113 3 -34 13 -74 22 -90 38 -68 133 -214 171 -265 45 -60 93 -133 116 -175 12 -22 37 -57 55 -78 19 -20 34 -43 34 -50 0 -7 18 -34 40 -61 22 -26 40 -52 40 -57 0 -8 96 -111 228 -245 34 -35 68 -64 75 -64 7 0 35 -14 63 -31 27 -18 72 -40 99 -49 28 -10 77 -32 110 -49 34 -17 88 -34 124 -39 56 -8 66 -7 82 9 21 21 24 57 10 104 -10 35 -86 141 -106 149 -37 14 -94 198 -115 369 -14 118 -17 263 -6 295 5 15 27 31 62 47 44 20 58 31 70 62 12 28 14 54 10 104 -4 37 -2 124 3 195 6 71 15 199 21 284 6 85 19 211 30 280 22 152 27 205 40 433 9 153 15 191 39 265 16 48 34 123 41 167 7 48 25 111 46 156 19 42 34 86 34 97 0 11 15 49 33 84 19 35 40 88 47 118 7 30 25 78 40 105 16 28 34 80 40 120 6 39 24 108 40 155 16 47 34 121 40 166 12 93 16 106 63 233 20 51 45 103 56 115 24 25 36 56 56 142 8 35 22 78 30 93 8 16 24 82 35 147 12 65 30 138 41 163 10 24 28 92 38 152 11 59 29 129 41 156 12 26 30 93 41 147 11 54 29 117 40 138 11 22 29 84 39 138 10 54 28 117 40 140 12 23 30 83 41 133 11 50 29 106 40 123 11 18 28 72 38 121 11 49 30 110 44 135 14 26 30 77 36 114 7 37 25 92 40 123 16 31 34 82 40 113 7 31 23 73 36 92 13 19 31 60 41 90 9 30 29 69 44 86 15 18 35 60 45 94 53 189 86 271 118 287 12 7 38 26 58 43 19 17 55 43 80 59 24 15 58 37 76 50 81 56 127 79 194 98 40 11 84 28 99 39 14 10 64 28 110 40 46 12 102 31 124 42 23 12 79 29 124 39 46 10 98 27 116 38 18 11 72 29 120 41 48 11 105 29 126 40 23 12 95 29 169 40 70 10 151 28 180 39 28 12 102 30 165 41 63 11 135 29 160 40 26 11 86 27 134 35 48 9 112 28 142 41 30 14 92 34 138 45 46 10 100 28 122 39 22 11 78 29 126 40 48 12 102 30 120 40 17 11 65 28 105 38 41 11 94 29 119 42 25 13 92 35 150 50 58 15 130 35 160 44 71 20 134 21 154 0 18 -17 16 -31 -19 -144 -13 -41 -31 -126 -40 -189 -9 -63 -25 -131 -36 -152 -23 -45 -40 -155 -32 -207 6 -37 19 -62 33 -62 13 0 31 61 40 139 6 57 13 78 29 90 22 18 36 50 52 119 5 25 23 75 38 111 16 36 35 98 41 138 10 54 23 86 49 125 39 56 83 85 179 114 44 13 56 13 69 3 13 -11 15 -29 10 -99 -3 -51 -13 -105 -25 -135 -11 -28 -27 -90 -37 -139 -9 -49 -29 -114 -45 -145 -15 -31 -33 -77 -40 -101 -6 -25 -22 -61 -35 -80 -14 -19 -34 -62 -45 -95 -11 -33 -28 -71 -38 -85 -33 -46 -42 -91 -42 -221 l0 -128 33 -33 c18 -18 41 -52 51 -75 18 -41 18 -44 0 -95 -18 -51 -22 -54 -73 -70 -29 -10 -59 -23 -67 -29 -8 -6 -14 -29 -14 -50 0 -30 7 -45 35 -73 43 -43 47 -82 10 -96 -14 -5 -32 -7 -40 -4 -31 12 -86 -7 -120 -42 -37 -37 -43 -67 -24 -121 8 -26 6 -45 -16 -109 -14 -44 -37 -97 -49 -119 -31 -54 -37 -81 -37 -181 0 -91 9 -114 45 -114 34 0 61 25 74 68 10 31 20 43 52 57 42 19 66 53 129 180 35 73 114 144 140 128 9 -6 22 -32 30 -59 11 -40 12 -83 4 -241 -11 -191 -11 -193 -41 -239 -17 -25 -36 -63 -43 -83 -6 -20 -22 -51 -36 -69 -13 -17 -33 -57 -43 -88 -11 -31 -29 -70 -39 -88 -11 -18 -29 -70 -40 -117 -11 -46 -29 -105 -40 -130 -11 -25 -27 -89 -36 -142 -18 -113 -22 -125 -46 -152 -10 -11 -25 -47 -33 -79 -23 -87 -43 -103 -85 -68 l-21 17 20 80 c11 44 29 92 41 108 41 56 51 229 16 293 -54 99 -51 88 -31 130 14 28 34 47 72 68 44 23 57 37 73 74 18 41 19 52 8 89 -6 23 -20 50 -31 59 -31 29 -90 47 -143 46 -39 -1 -53 -7 -65 -24 -30 -44 -71 -175 -80 -260 -15 -131 -37 -233 -64 -302 -14 -34 -30 -102 -36 -151 -13 -105 -23 -153 -45 -214 -8 -25 -23 -101 -31 -170 -9 -69 -29 -164 -44 -211 -15 -47 -33 -128 -40 -180 -7 -52 -25 -133 -40 -180 -18 -55 -32 -129 -40 -210 -7 -69 -25 -177 -41 -240 -21 -84 -32 -158 -39 -275 -12 -199 -17 -232 -41 -309 -20 -61 -28 -112 -50 -300 -6 -54 -18 -120 -26 -145 -9 -27 -18 -111 -23 -201 -9 -171 -24 -464 -40 -755 -6 -104 -17 -242 -25 -305 -32 -246 -37 -340 -44 -765 -7 -418 -9 -443 -29 -500 -16 -42 -25 -102 -33 -210 -14 -189 -6 -481 14 -550 9 -27 24 -77 34 -111 19 -63 47 -114 63 -114 5 0 16 13 25 29 11 23 14 62 12 179 -2 139 0 152 19 179 17 22 30 29 65 31 30 2 54 -4 77 -18 27 -17 32 -26 32 -58 0 -22 -7 -54 -16 -72 -13 -25 -16 -52 -12 -125 4 -72 10 -102 27 -130 12 -20 26 -67 32 -103 6 -37 12 -239 14 -450 l3 -383 27 -41 c44 -67 47 -89 19 -168 -13 -38 -24 -76 -24 -84 0 -8 11 -36 25 -63 14 -26 32 -81 40 -122 9 -41 24 -88 34 -105 18 -29 34 -89 45 -166 5 -38 -21 -121 -41 -127 -18 -6 -44 53 -54 126 -5 36 -20 86 -33 111 -13 25 -30 65 -36 90 -7 24 -25 63 -41 85 -18 26 -34 67 -44 115 -8 41 -25 97 -36 124 -13 29 -26 99 -35 175 -17 153 -29 212 -50 253 -9 16 -20 76 -25 132 -11 112 -23 158 -45 176 -11 10 -17 6 -31 -26 -10 -23 -16 -61 -15 -94 3 -89 22 -211 43 -273 11 -34 27 -135 39 -247 14 -139 30 -232 60 -351 22 -88 49 -173 59 -188 22 -31 37 -83 46 -166 4 -33 19 -89 35 -125 15 -36 33 -84 39 -107 7 -23 23 -56 37 -73 14 -16 38 -54 52 -82 33 -64 75 -91 152 -98 l55 -5 21 -53 c11 -28 33 -64 47 -80 15 -15 35 -37 44 -49 10 -13 40 -29 66 -37 46 -14 50 -13 69 6 19 19 20 29 15 104 -4 55 -15 105 -32 149 -15 36 -35 111 -45 168 -10 56 -28 127 -40 157 -12 30 -28 104 -36 165 -17 132 -20 146 -50 255 -13 47 -28 135 -34 195 -8 92 -15 120 -41 170 -22 41 -33 79 -37 122 -2 34 -2 72 2 86 3 13 27 50 52 81 57 69 73 127 45 166 -10 14 -31 52 -46 84 -23 49 -27 66 -22 119 7 93 52 284 73 313 44 60 54 89 54 154 0 75 14 134 41 172 11 14 28 63 40 108 11 44 28 100 39 123 11 23 24 61 30 84 8 33 28 61 85 117 82 84 73 53 95 296 5 64 17 141 25 172 25 99 34 178 44 389 9 197 11 210 39 275 17 38 38 107 47 153 9 46 23 100 30 120 16 45 32 214 45 476 10 193 22 292 40 340 5 12 18 82 30 156 13 78 32 157 46 188 14 30 33 95 44 144 11 49 29 103 40 121 10 18 26 64 35 102 9 38 29 98 45 134 16 36 34 94 40 130 6 36 24 94 40 130 16 36 34 94 40 130 6 36 25 96 42 133 38 89 55 216 42 318 -12 98 -2 164 30 198 31 32 101 199 110 261 3 25 10 116 15 202 9 140 13 164 39 225 16 37 35 86 42 108 7 22 25 65 41 95 20 39 32 86 43 165 8 61 24 135 35 166 10 31 27 92 36 135 10 44 32 106 49 139 30 58 31 65 32 190 0 72 4 144 8 162 4 19 23 45 49 66 23 19 53 55 66 80 l24 44 -26 35 c-15 19 -27 42 -27 51 0 20 43 54 81 62 28 6 48 31 63 81 5 17 -2 26 -35 49 l-42 27 6 58 c9 86 70 198 159 292 92 96 150 195 156 264 3 38 0 54 -13 67 -9 9 -22 17 -29 17 -31 0 -83 -49 -112 -105 -29 -57 -33 -60 -75 -66 -36 -5 -48 -3 -66 14 -13 11 -23 25 -23 31 0 7 -14 28 -31 49 -17 20 -28 41 -25 46 4 5 41 28 84 51 50 27 108 49 166 61 49 11 97 24 106 29 29 16 82 81 76 95 -3 8 -8 29 -11 47 -6 34 -6 34 53 60 47 20 67 35 88 69 16 24 31 64 34 89 5 44 5 46 -57 108 -35 35 -66 75 -69 89 -5 18 3 45 29 97 20 39 39 87 42 106 4 19 20 58 35 85 15 28 34 82 43 120 19 86 86 235 130 286 81 97 89 111 108 185 11 43 25 84 32 92 32 39 64 42 449 42 437 -1 582 -9 651 -40 26 -11 92 -29 146 -40 55 -10 120 -28 144 -39 69 -32 244 -74 280 -68 18 3 50 11 72 18 51 15 110 5 139 -24 11 -13 35 -31 51 -42 41 -26 172 -152 201 -195 14 -19 35 -49 48 -67 14 -20 27 -59 35 -105 6 -41 21 -103 32 -138 11 -35 26 -120 34 -188 12 -102 20 -133 44 -175 16 -29 36 -77 45 -108 8 -30 25 -64 36 -74 11 -10 34 -39 50 -66 29 -45 30 -49 17 -76 -8 -15 -22 -53 -31 -84 -8 -31 -25 -67 -35 -81 -11 -14 -30 -61 -42 -104 -12 -44 -31 -99 -44 -124 -12 -25 -28 -74 -34 -110 -7 -35 -24 -86 -37 -112 -13 -26 -33 -85 -43 -131 -11 -46 -31 -105 -45 -133 -14 -27 -32 -91 -41 -142 -9 -52 -25 -116 -35 -143 -11 -28 -29 -105 -40 -172 -11 -67 -31 -153 -44 -192 -17 -47 -32 -130 -46 -255 -12 -102 -25 -203 -30 -225 -15 -67 -29 -201 -40 -380 -5 -93 -18 -228 -27 -299 -15 -114 -15 -153 -5 -336 7 -114 17 -351 22 -526 6 -176 13 -338 16 -361 3 -23 16 -58 30 -78 13 -20 38 -65 55 -98 34 -70 91 -177 134 -252 16 -27 52 -72 81 -100 230 -221 298 -281 341 -298 25 -10 57 -27 71 -38 14 -10 50 -27 81 -35 31 -9 75 -29 99 -45 24 -15 58 -31 75 -34 18 -4 60 -20 94 -36 62 -30 64 -31 348 -59 60 -6 146 -20 190 -31 44 -10 107 -19 140 -19 33 0 105 9 160 19 55 11 145 25 200 31 116 13 163 24 225 53 25 11 85 29 134 39 50 10 104 27 121 37 17 10 61 28 98 40 36 12 77 31 91 42 14 11 51 29 83 40 32 10 71 29 86 40 16 11 53 29 84 40 30 10 76 32 101 49 25 16 50 30 55 30 5 0 30 15 56 34 25 18 62 41 81 51 19 10 50 31 68 46 18 16 39 29 47 29 7 0 34 16 59 35 25 19 62 43 84 54 21 11 44 27 52 36 8 9 31 25 53 36 21 11 53 34 71 50 17 16 74 65 126 109 52 44 111 94 130 110 19 17 68 56 108 88 111 86 221 199 527 537 60 66 119 131 132 144 13 13 23 27 23 32 0 4 17 28 38 53 20 25 57 75 82 111 25 36 62 86 83 111 20 25 37 49 37 54 0 5 17 29 38 54 20 24 49 64 65 88 38 60 72 109 97 138 12 14 35 52 51 85 17 33 48 93 70 133 21 39 57 105 78 145 22 39 55 104 74 142 19 39 41 76 49 83 8 6 27 41 43 77 15 36 31 65 35 65 4 0 13 -14 20 -31 17 -40 7 -291 -20 -494 -20 -152 -31 -347 -50 -840 -6 -158 -16 -298 -25 -337 -23 -107 -33 -184 -45 -338 -6 -80 -15 -179 -20 -220 -5 -41 -10 -165 -11 -275 -2 -187 0 -207 25 -309 15 -60 38 -130 50 -155 13 -25 29 -70 36 -100 18 -77 41 -96 131 -110 41 -7 112 -23 159 -36 103 -29 288 -45 388 -34 41 4 102 17 135 28 34 10 87 25 117 32 60 13 110 35 110 48 0 4 21 22 48 39 120 81 164 119 192 169 15 29 36 60 45 70 10 9 24 33 32 52 8 19 27 50 43 70 16 20 36 63 46 96 9 33 25 76 35 96 10 20 27 81 38 135 11 54 31 128 44 164 20 51 29 106 41 250 9 102 25 259 36 350 19 160 27 283 50 740 6 118 20 343 32 500 17 217 22 369 21 635 0 394 -16 824 -38 1025 -8 74 -19 214 -25 310 -12 219 -17 267 -40 410 -21 128 -26 178 -40 397 -7 100 -19 187 -35 250 -14 54 -34 173 -45 265 -11 92 -31 209 -44 260 -13 51 -29 152 -36 223 -7 72 -22 171 -35 220 -28 111 -32 135 -45 259 -7 69 -18 117 -36 155 -14 31 -34 96 -45 146 -10 49 -27 105 -37 125 -11 19 -27 58 -36 86 -12 38 -31 64 -68 98 -47 42 -55 46 -102 45 -100 -1 -168 -45 -342 -217 -74 -74 -134 -138 -134 -142 0 -5 -17 -29 -37 -54 -59 -70 -155 -201 -190 -260 -10 -15 -28 -42 -40 -60 -12 -17 -36 -57 -53 -88 -17 -32 -34 -58 -39 -58 -4 0 -21 -24 -36 -52 -16 -29 -41 -71 -57 -92 -15 -21 -28 -44 -28 -50 0 -7 -16 -36 -35 -66 -20 -30 -40 -71 -45 -90 -5 -19 -21 -51 -34 -71 -14 -20 -34 -60 -45 -89 -11 -29 -31 -69 -44 -89 -14 -20 -30 -54 -37 -76 -7 -22 -25 -58 -40 -80 -15 -22 -34 -60 -42 -85 -8 -25 -27 -62 -42 -84 -14 -21 -30 -55 -36 -75 -5 -20 -23 -56 -40 -81 -17 -25 -35 -61 -40 -81 -6 -20 -21 -53 -35 -74 -14 -20 -35 -60 -45 -87 -10 -28 -30 -67 -43 -87 -14 -20 -30 -54 -37 -76 -7 -22 -25 -58 -40 -80 -15 -22 -33 -58 -40 -80 -7 -22 -23 -56 -37 -76 -13 -20 -33 -59 -43 -87 -11 -27 -33 -72 -50 -98 -16 -26 -30 -55 -30 -64 0 -9 -14 -38 -31 -65 -17 -27 -42 -73 -55 -102 -13 -30 -32 -65 -43 -79 -11 -14 -25 -42 -32 -62 -6 -20 -22 -51 -35 -69 -13 -17 -33 -56 -44 -87 -12 -31 -26 -59 -32 -62 -6 -4 -23 -35 -39 -69 -16 -35 -39 -80 -53 -100 -14 -20 -30 -53 -37 -73 -6 -20 -22 -51 -35 -69 -13 -17 -33 -55 -45 -85 -11 -29 -29 -62 -39 -73 -10 -11 -27 -43 -38 -71 -10 -29 -31 -67 -44 -85 -14 -19 -31 -52 -38 -74 -7 -22 -24 -55 -38 -74 -13 -18 -33 -56 -44 -84 -11 -28 -30 -63 -43 -79 -13 -15 -31 -50 -40 -77 -9 -27 -23 -55 -31 -62 -9 -7 -24 -30 -35 -51 -11 -22 -35 -59 -54 -84 -19 -25 -35 -52 -35 -59 0 -8 -13 -29 -29 -47 -15 -18 -36 -48 -45 -66 -10 -19 -33 -54 -52 -79 -19 -24 -34 -51 -34 -58 0 -8 -13 -29 -29 -47 -15 -18 -36 -48 -46 -67 -16 -32 -70 -104 -135 -181 -60 -71 -193 -226 -233 -273 -52 -60 -123 -129 -146 -142 -10 -5 -34 -23 -52 -38 -19 -15 -56 -46 -82 -67 -27 -22 -51 -40 -55 -40 -4 0 -32 -20 -62 -45 -30 -25 -60 -45 -67 -45 -6 0 -42 -16 -80 -36 -59 -32 -86 -39 -203 -55 -110 -15 -152 -16 -230 -8 -149 15 -202 28 -247 60 -23 16 -45 29 -49 29 -13 0 -124 113 -124 125 0 7 -14 32 -30 57 -35 53 -43 95 -60 315 -12 153 -11 184 21 556 6 72 17 133 29 160 10 23 28 90 39 149 11 59 29 128 40 153 11 26 29 94 40 151 11 58 31 133 45 167 13 34 30 98 36 141 7 44 24 111 40 150 15 39 33 103 40 141 6 39 24 92 40 120 15 28 33 75 39 105 7 30 24 80 40 110 16 30 34 80 41 110 7 30 23 73 36 96 13 23 32 74 43 115 11 41 31 95 44 119 14 25 30 70 37 100 7 30 25 78 40 105 15 28 33 75 40 105 7 30 25 80 41 110 15 30 33 75 39 100 7 25 24 68 40 95 16 28 34 70 40 95 6 25 24 68 40 95 16 28 34 70 40 95 6 25 24 68 40 95 16 28 34 70 40 95 6 25 24 68 40 95 16 28 34 70 40 95 6 25 24 68 40 95 16 28 34 70 40 95 6 25 24 68 40 95 16 28 33 68 39 91 6 22 24 60 40 85 16 24 34 64 41 89 6 25 22 61 35 80 14 19 33 61 44 93 11 32 30 71 41 87 11 16 30 55 41 87 11 32 30 74 44 93 13 19 29 55 35 80 6 25 22 61 35 80 14 19 33 61 44 93 11 32 29 69 40 83 11 14 29 54 41 89 12 35 30 75 41 89 11 14 29 53 40 87 11 34 31 76 44 93 13 17 28 51 35 76 6 25 22 61 35 80 14 19 33 61 44 91 10 31 30 74 44 95 14 22 30 58 36 80 6 23 22 58 36 78 13 20 34 63 44 97 11 33 29 71 40 85 11 14 27 49 37 77 9 29 29 73 46 98 16 26 33 72 38 103 10 64 -2 296 -19 338 -5 15 -18 36 -28 46 -10 11 -30 35 -45 54 -31 41 -60 49 -181 49 -87 0 -176 -21 -197 -46 -7 -8 -38 -22 -68 -31 -49 -15 -67 -28 -151 -114 -95 -96 -262 -274 -396 -420 -37 -41 -78 -84 -89 -96 -52 -52 -182 -197 -190 -212 -5 -9 -23 -31 -40 -48 -41 -41 -129 -145 -231 -274 -27 -34 -87 -106 -132 -159 -45 -53 -94 -109 -108 -126 -44 -53 -122 -160 -139 -193 -9 -18 -21 -32 -25 -32 -5 0 -19 -17 -32 -37 -12 -21 -33 -50 -47 -65 -14 -15 -35 -43 -46 -61 -30 -49 -76 -113 -112 -155 -17 -21 -41 -54 -53 -74 -12 -21 -27 -38 -32 -38 -5 0 -20 -22 -33 -48 -13 -27 -32 -54 -41 -62 -9 -7 -26 -32 -37 -54 -11 -23 -32 -54 -46 -71 -14 -16 -33 -48 -42 -70 -10 -22 -28 -51 -40 -65 -12 -14 -33 -46 -46 -72 -13 -26 -28 -49 -34 -53 -6 -4 -22 -30 -37 -58 -14 -29 -39 -67 -54 -85 -16 -18 -29 -38 -29 -44 0 -5 -15 -31 -34 -57 -19 -25 -41 -64 -50 -86 -9 -22 -25 -49 -36 -60 -10 -11 -28 -45 -40 -75 -12 -30 -30 -64 -40 -75 -10 -11 -28 -45 -40 -75 -12 -30 -30 -64 -40 -75 -10 -11 -28 -45 -40 -75 -12 -30 -30 -64 -41 -76 -11 -11 -30 -47 -42 -79 -41 -107 -64 -80 -78 94 -5 65 -22 170 -39 236 -17 66 -30 129 -30 140 0 58 -24 101 -103 185 -45 47 -134 142 -197 210 -165 178 -689 700 -739 735 -24 17 -67 46 -96 65 -29 19 -66 45 -82 58 -37 30 -85 63 -156 106 -31 20 -67 45 -79 56 -12 11 -40 25 -63 30 -22 6 -67 24 -100 40 -33 16 -82 34 -110 41 -27 6 -72 24 -100 39 -50 28 -132 50 -185 50 -16 0 -36 8 -46 17 -9 10 -34 25 -55 35 -25 11 -40 25 -45 42 -5 20 2 32 33 64 80 80 101 114 112 177 6 33 24 85 39 115 16 30 34 78 41 105 7 28 25 73 40 100 16 28 36 81 45 119 9 38 25 81 35 95 10 14 28 52 40 83 14 35 33 63 49 73 15 10 36 28 48 42 l21 25 50 -26 c32 -16 58 -38 72 -61 11 -19 28 -38 36 -42 22 -8 60 30 90 91 19 38 25 66 25 114 l0 64 -71 69 c-68 65 -71 70 -66 105 3 20 17 57 30 83 13 25 30 63 36 83 7 20 26 54 42 75 17 21 37 54 45 73 8 19 23 44 33 55 10 11 26 55 35 97 10 42 28 93 41 112 13 20 33 64 44 100 11 35 32 88 47 117 23 44 29 69 32 144 4 84 2 93 -22 128 -14 21 -26 42 -26 46 0 5 18 16 40 25 26 10 71 16 128 16 80 0 92 3 134 29 44 28 78 73 78 103 0 8 10 32 21 53 12 22 30 58 41 80 11 22 29 49 39 61 29 31 115 205 134 270 9 32 27 77 40 99 13 22 28 67 35 100 6 33 25 87 40 120 17 34 35 99 44 150 10 62 25 112 50 160 20 39 36 75 36 82 0 6 15 22 33 34 71 49 108 93 124 149 19 67 77 185 110 224 13 16 37 56 54 90 16 34 36 73 44 87 8 14 21 58 30 98 8 39 26 94 40 121 14 27 30 72 36 100 6 27 21 65 35 85 13 19 31 61 40 93 9 31 29 80 44 107 16 28 33 70 40 95 6 25 23 64 36 87 23 40 104 273 104 299 0 45 26 119 53 153 36 44 106 153 182 283 8 15 22 63 31 105 20 105 81 270 114 313 15 19 33 53 39 75 7 22 24 56 38 76 13 20 32 64 42 97 11 34 29 76 42 94 23 32 24 39 23 228 0 183 -2 198 -23 239 -13 25 -32 76 -43 114 -10 39 -29 88 -42 111 -13 23 -31 66 -40 97 -9 31 -23 62 -32 70 -8 7 -28 38 -44 69 -16 31 -36 62 -45 70 -9 7 -23 27 -32 44 -8 17 -27 43 -41 58 -14 15 -35 43 -46 61 -59 96 -158 216 -211 257 -83 63 -115 86 -146 105 -121 74 -159 97 -199 116 -25 12 -81 39 -125 60 -44 22 -88 39 -97 39 -9 0 -46 16 -82 35 -36 19 -87 40 -113 46 -27 6 -66 22 -89 35 -22 12 -78 32 -125 44 -46 12 -98 30 -116 41 -72 45 -301 68 -434 44z m-2008 -7144 l23 -19 -25 -58 c-22 -52 -28 -59 -56 -62 -43 -4 -55 20 -41 79 19 77 53 97 99 60z m216 -315 c14 -30 15 -44 4 -108 -6 -40 -20 -84 -30 -98 -10 -14 -27 -46 -39 -72 -11 -26 -35 -65 -52 -87 -28 -34 -32 -46 -30 -93 5 -115 2 -126 -40 -170 -22 -23 -40 -47 -40 -54 0 -7 -13 -36 -28 -65 -16 -30 -37 -78 -47 -107 -11 -29 -26 -59 -35 -66 -16 -15 -145 -56 -174 -56 -10 0 -23 15 -32 35 -13 32 -13 39 2 68 9 17 28 45 41 61 13 15 30 44 38 63 8 19 26 48 39 64 13 16 30 45 36 66 7 21 24 53 38 72 13 18 34 56 44 85 11 28 28 60 38 71 10 11 32 49 50 85 66 135 106 209 121 227 9 10 20 29 24 43 10 34 33 70 45 70 6 0 18 -15 27 -34z m-539 -471 c2 -33 -2 -45 -23 -65 l-27 -25 -23 27 c-19 23 -22 33 -15 57 13 47 19 52 53 49 30 -3 32 -6 35 -43z m-5601 -395 c-3 -69 -11 -141 -18 -160 -6 -19 -24 -48 -39 -65 -14 -16 -34 -42 -42 -56 -14 -22 -72 -49 -106 -49 -7 0 -19 11 -28 25 -13 21 -14 30 -3 62 6 21 20 49 31 62 10 13 26 49 34 80 9 31 29 76 44 101 16 25 34 65 40 90 6 25 19 56 27 69 l16 25 25 -29 c24 -29 25 -32 19 -155z m6443 41 c0 -6 -4 -13 -10 -16 -5 -3 -10 1 -10 9 0 9 5 16 10 16 6 0 10 -4 10 -9z m-45 -60 c9 -30 -14 -134 -39 -170 -14 -20 -32 -54 -41 -77 -16 -41 -32 -53 -92 -73 -29 -9 -35 -7 -53 16 -11 14 -20 32 -20 39 0 7 18 34 40 59 22 25 40 50 40 55 0 4 18 30 40 56 22 27 40 54 40 60 0 6 9 23 20 37 13 17 26 23 40 20 10 -3 22 -13 25 -22z m562 -401 c7 -25 44 -46 109 -60 46 -11 74 -25 74 -39 0 -4 -14 -15 -31 -25 -25 -15 -42 -17 -93 -12 -76 9 -142 25 -178 43 -15 7 -35 28 -44 45 -16 31 -16 32 6 50 16 13 39 18 87 18 57 0 66 -3 70 -20z m-7220 -216 c6 -21 12 -80 12 -129 1 -92 -15 -175 -43 -230 -9 -16 -23 -64 -32 -105 -9 -41 -29 -97 -44 -125 -15 -27 -33 -75 -40 -105 -7 -30 -25 -77 -40 -105 -15 -27 -33 -75 -40 -105 -7 -30 -25 -77 -40 -105 -15 -27 -35 -76 -44 -108 -15 -53 -21 -60 -59 -77 -51 -24 -100 -25 -121 -4 -19 18 -19 24 -6 59 6 15 19 83 30 150 11 68 28 146 39 172 10 26 24 75 31 108 10 49 20 67 54 100 22 22 54 49 70 60 29 20 29 24 37 138 13 191 23 231 87 330 31 49 112 128 127 123 5 -1 15 -20 22 -42z m7378 -33 c23 -10 55 -35 71 -56 l28 -37 -25 -19 c-19 -15 -42 -19 -109 -19 -75 0 -189 -14 -302 -35 -32 -6 -38 -4 -54 20 -21 32 -22 91 -2 133 12 25 20 28 83 33 115 11 262 1 310 -20z m-1386 -1020 c9 -32 9 -48 -2 -79 -16 -46 -85 -134 -101 -129 -19 6 -38 79 -31 122 7 46 29 85 49 85 8 0 24 9 37 20 13 10 27 19 30 20 3 0 11 -18 18 -39z m-623 -242 c25 -7 48 -18 51 -25 3 -7 -10 -32 -29 -54 -21 -27 -55 -52 -94 -70 -61 -28 -62 -28 -84 -97 -13 -37 -31 -85 -41 -105 -11 -21 -19 -50 -19 -66 0 -49 18 -61 100 -68 41 -4 80 -11 87 -16 9 -8 9 -19 -4 -49 -14 -35 -14 -43 0 -77 10 -26 12 -43 6 -55 -6 -9 -29 -28 -53 -42 -44 -26 -120 -115 -155 -182 -11 -21 -40 -54 -66 -73 -111 -84 -101 -69 -108 -177 -8 -120 -73 -375 -109 -425 -13 -18 -30 -46 -38 -61 -8 -16 -38 -44 -67 -63 -50 -34 -54 -35 -95 -24 -24 7 -47 14 -51 17 -4 2 3 13 16 23 13 10 29 36 35 57 6 21 23 54 37 73 14 19 34 64 45 101 11 37 29 78 41 93 11 14 29 56 39 93 11 36 31 78 44 92 13 14 29 44 35 66 8 30 7 53 -3 92 -8 29 -24 69 -36 88 -15 24 -23 54 -24 88 -1 46 4 60 43 117 24 36 59 81 77 101 17 20 35 47 39 60 4 13 16 34 26 47 10 13 25 58 35 100 9 42 28 97 41 122 20 34 26 63 29 120 6 145 19 174 79 183 60 8 127 7 171 -4z m-5776 -1690 c16 -29 4 -73 -33 -118 -18 -22 -40 -51 -49 -65 -10 -14 -30 -26 -45 -28 -19 -2 -29 -10 -33 -27 -3 -14 -12 -27 -19 -29 -11 -4 -13 4 -8 37 3 24 12 50 21 59 8 10 20 39 26 66 16 72 35 101 72 113 49 16 56 15 68 -8z m5448 -465 c15 -31 0 -64 -28 -64 -24 0 -70 20 -70 31 0 10 62 59 76 59 6 0 16 -12 22 -26z m-5842 -895 c19 -21 19 -21 -10 -43 -15 -11 -43 -36 -61 -53 -19 -18 -36 -33 -40 -33 -10 0 -35 67 -35 94 0 33 35 56 86 56 29 0 46 -6 60 -21z m-66 -234 c17 -9 30 -19 30 -23 -1 -7 -67 -82 -74 -82 -1 0 -11 18 -21 40 -17 39 -17 41 0 60 10 11 22 20 27 20 5 0 22 -7 38 -15z m5135 -616 c49 -68 54 -116 22 -205 -13 -38 -30 -103 -36 -143 -16 -102 -28 -123 -74 -134 -20 -5 -44 -7 -51 -4 -8 3 -24 31 -35 63 -12 31 -33 70 -46 86 -29 34 -40 84 -31 144 6 48 44 130 83 183 27 35 97 73 119 64 8 -3 29 -27 49 -54z m-5273 -228 l59 -60 -22 -22 c-18 -18 -29 -21 -75 -16 -29 3 -66 12 -81 19 -25 12 -28 18 -25 53 2 22 9 46 15 53 11 14 43 30 60 31 5 1 36 -26 69 -58z m5436 -222 c39 -13 60 -59 43 -95 -10 -22 -15 -25 -44 -18 -64 14 -77 22 -77 51 0 46 11 73 30 73 9 0 31 -5 48 -11z m-408 -144 c35 -18 64 -65 79 -128 10 -44 9 -58 -14 -133 l-26 -85 16 -105 c9 -58 14 -115 11 -128 -3 -12 -19 -40 -35 -60 -17 -21 -40 -63 -51 -94 -12 -31 -25 -62 -30 -67 -15 -18 -29 -137 -40 -324 -9 -160 -8 -177 8 -194 14 -16 26 -18 73 -13 47 6 58 4 73 -13 16 -17 18 -33 14 -107 -4 -76 -8 -89 -27 -106 -14 -11 -39 -18 -63 -18 -21 0 -52 -7 -68 -15 -53 -27 -60 -63 -60 -300 0 -169 -4 -237 -20 -330 -12 -64 -33 -151 -48 -193 -36 -103 -37 -197 -3 -270 l24 -51 -26 -39 c-19 -26 -27 -51 -27 -80 0 -34 6 -48 35 -76 19 -20 35 -40 35 -46 0 -6 -19 -30 -42 -54 -71 -73 -88 -101 -88 -144 0 -22 9 -59 19 -83 20 -45 41 -169 41 -240 0 -31 -8 -47 -35 -78 -42 -46 -45 -78 -12 -141 13 -25 34 -85 46 -134 l22 -88 -25 -43 c-14 -23 -37 -50 -51 -59 -14 -9 -36 -34 -50 -55 -20 -32 -32 -40 -66 -46 -38 -7 -45 -4 -62 16 -18 22 -19 35 -14 164 4 77 13 183 22 235 11 72 13 140 9 285 -5 148 -2 221 11 330 10 81 20 264 24 435 6 246 11 303 25 340 10 25 24 61 31 80 20 50 18 80 -6 106 -25 27 -42 103 -33 154 3 19 16 67 30 107 23 70 31 127 54 377 6 66 20 160 31 208 23 104 36 262 47 548 8 203 8 206 40 271 18 36 32 69 32 74 0 5 14 39 32 77 l32 69 -13 87 c-11 80 -10 90 8 125 27 53 40 67 63 67 10 0 32 -7 48 -15z m282 -680 c-2 -23 -18 -63 -39 -98 -20 -32 -41 -61 -46 -64 -6 -3 -19 4 -29 17 -34 42 -17 163 26 180 11 5 37 8 56 7 34 -2 35 -3 32 -42z m406 -197 c7 -7 12 -29 12 -51 0 -49 -19 -127 -32 -127 -16 0 -38 68 -38 118 0 47 12 72 35 72 6 0 16 -5 23 -12z m-158 -512 c-15 -19 -34 -20 -63 -5 -21 12 -21 12 8 35 29 23 30 23 49 4 16 -16 17 -22 6 -34z m-6231 -278 c13 -23 13 -31 -3 -72 -10 -25 -21 -46 -26 -46 -11 0 -30 56 -30 87 0 32 18 65 33 60 7 -2 18 -15 26 -29z m6134 -497 c13 -13 -26 -98 -56 -121 -27 -22 -29 -22 -43 -4 -10 14 -13 33 -9 67 3 26 10 59 15 72 9 24 10 24 47 9 21 -9 42 -19 46 -23z M60590 14200 c0 -5 5 -10 10 -10 6 0 10 5 10 10 0 6 -4 10 -10 10 -5 0 -10 -4 -10 -10z M10807 22684 c-3 -3 2 -14 11 -25 9 -11 19 -29 22 -42 4 -15 26 -32 69 -54 35 -18 71 -39 80 -47 9 -8 38 -25 63 -36 26 -11 60 -31 75 -43 15 -13 44 -29 63 -37 19 -7 51 -25 70 -39 19 -14 53 -34 75 -44 22 -10 47 -25 56 -33 8 -8 43 -27 76 -44 34 -16 64 -34 68 -40 4 -7 36 -25 70 -40 34 -15 66 -34 70 -40 4 -7 33 -23 64 -37 31 -14 65 -33 76 -43 11 -11 38 -26 60 -36 22 -9 54 -27 72 -40 18 -13 54 -34 80 -45 26 -11 57 -29 68 -39 11 -11 45 -30 76 -43 30 -14 61 -32 68 -41 7 -9 40 -28 72 -42 32 -15 64 -33 70 -40 6 -8 31 -23 55 -33 24 -11 58 -31 76 -44 18 -13 49 -30 68 -37 19 -7 46 -23 60 -36 14 -12 50 -34 81 -47 31 -14 60 -30 64 -37 4 -6 36 -25 70 -40 34 -15 66 -33 70 -40 4 -7 35 -24 69 -40 57 -25 64 -32 80 -75 l18 -47 -25 -26 c-13 -15 -32 -42 -41 -59 -9 -18 -21 -33 -25 -33 -9 0 -30 -31 -107 -150 -17 -27 -45 -65 -62 -85 -18 -19 -32 -40 -32 -45 0 -5 -15 -26 -32 -46 -18 -20 -42 -52 -53 -69 -30 -49 -76 -111 -117 -161 -21 -25 -38 -49 -38 -54 0 -4 -15 -26 -32 -48 -18 -22 -45 -59 -61 -83 -36 -58 -71 -107 -103 -144 -14 -16 -38 -50 -55 -75 -45 -68 -75 -111 -109 -155 -38 -49 -71 -96 -107 -154 -16 -24 -43 -60 -60 -81 -18 -21 -33 -42 -33 -47 0 -5 -15 -25 -32 -45 -18 -20 -45 -55 -61 -79 -36 -58 -69 -105 -107 -154 -38 -49 -71 -96 -107 -154 -16 -24 -43 -59 -60 -79 -18 -20 -33 -40 -33 -44 0 -4 -15 -25 -33 -45 -18 -21 -46 -58 -61 -83 -35 -58 -67 -105 -106 -155 -40 -51 -88 -117 -120 -165 -45 -67 -85 -121 -115 -157 -16 -20 -39 -51 -50 -68 -32 -52 -97 -147 -125 -182 -74 -95 -94 -122 -121 -163 -43 -66 -74 -110 -109 -155 -35 -45 -66 -90 -109 -155 -16 -25 -41 -58 -55 -75 -25 -29 -58 -74 -92 -125 -90 -133 -109 -161 -144 -205 -59 -77 -118 -160 -134 -192 -9 -18 -21 -33 -25 -33 -5 0 -20 -17 -32 -37 -12 -21 -34 -52 -48 -69 -14 -17 -38 -51 -54 -75 -36 -58 -69 -105 -107 -154 -47 -61 -93 -124 -115 -160 -11 -17 -35 -49 -52 -69 -18 -20 -33 -41 -33 -46 0 -6 -15 -27 -33 -47 -18 -21 -45 -58 -59 -83 -14 -25 -35 -54 -47 -64 -12 -11 -21 -24 -21 -31 0 -7 -14 -27 -30 -46 -33 -37 -65 -80 -107 -147 -16 -24 -45 -64 -65 -88 -21 -25 -38 -49 -38 -54 0 -5 -17 -29 -37 -53 -21 -24 -46 -57 -56 -73 -34 -55 -87 -129 -111 -154 -13 -14 -29 -36 -36 -50 -7 -14 -24 -38 -37 -55 -24 -30 -66 -90 -123 -177 -18 -27 -36 -48 -41 -48 -4 0 -16 -15 -25 -32 -20 -40 -85 -131 -136 -194 -21 -25 -38 -49 -38 -54 0 -4 -15 -26 -32 -48 -18 -22 -45 -59 -61 -83 -36 -58 -71 -107 -103 -144 -14 -16 -38 -50 -55 -75 -45 -68 -75 -111 -109 -155 -35 -45 -66 -89 -109 -155 -16 -25 -44 -63 -61 -85 -17 -22 -45 -59 -63 -81 -18 -23 -44 -61 -60 -85 -36 -57 -69 -105 -107 -154 -79 -103 -101 -133 -126 -177 -15 -27 -31 -48 -35 -48 -4 0 -18 -17 -30 -37 -12 -21 -36 -54 -53 -74 -30 -35 -67 -91 -112 -165 -11 -19 -32 -47 -46 -62 -14 -15 -35 -44 -47 -64 -13 -21 -27 -38 -32 -38 -5 0 -18 -19 -30 -42 -12 -24 -37 -60 -55 -81 -19 -20 -34 -41 -34 -46 0 -6 -17 -30 -37 -55 -39 -46 -62 -78 -110 -155 -16 -24 -43 -60 -60 -81 -18 -21 -33 -42 -33 -47 0 -6 -10 -18 -21 -29 -12 -10 -36 -42 -54 -70 -18 -28 -43 -62 -56 -76 -32 -34 -96 -116 -120 -153 -10 -16 -42 -59 -69 -95 -28 -36 -58 -78 -68 -94 -9 -16 -31 -46 -48 -65 -18 -20 -55 -62 -83 -94 -28 -31 -51 -61 -51 -65 0 -4 -12 -20 -26 -37 -14 -16 -33 -43 -41 -60 -9 -16 -32 -49 -52 -72 -20 -23 -53 -64 -74 -90 -20 -26 -50 -64 -65 -83 -16 -19 -39 -51 -52 -70 -13 -19 -37 -52 -54 -72 -17 -20 -47 -58 -66 -84 -19 -26 -51 -63 -71 -83 -20 -20 -43 -50 -52 -67 -9 -17 -23 -37 -32 -44 -9 -8 -26 -32 -37 -54 -11 -23 -33 -54 -50 -71 -42 -44 -100 -114 -131 -160 -14 -22 -47 -65 -72 -95 -25 -30 -53 -68 -63 -85 -9 -16 -30 -43 -45 -59 -16 -16 -40 -47 -53 -68 -13 -21 -28 -38 -33 -38 -4 0 -22 -21 -40 -47 -59 -89 -106 -152 -128 -173 -13 -11 -30 -34 -38 -50 -8 -16 -24 -34 -35 -40 -11 -6 -30 -30 -41 -53 -22 -43 -56 -88 -122 -162 -20 -23 -37 -49 -37 -57 0 -8 8 -22 18 -31 16 -15 108 -17 942 -19 745 -3 931 -6 958 -17 25 -10 45 -11 95 -2 45 8 920 11 3045 11 l2982 0 17 -27 c17 -26 18 -101 21 -1306 1 -703 -1 -1292 -6 -1310 -6 -25 -18 -37 -59 -57 -28 -14 -60 -33 -70 -42 -10 -9 -39 -26 -64 -36 -26 -11 -50 -26 -54 -32 -4 -7 -34 -25 -67 -40 -33 -16 -70 -38 -82 -49 -11 -11 -43 -29 -71 -41 -27 -12 -59 -30 -70 -40 -11 -11 -38 -26 -60 -36 -22 -9 -53 -26 -70 -39 -16 -12 -53 -34 -82 -48 -28 -15 -55 -32 -59 -38 -3 -6 -32 -22 -63 -36 -31 -14 -65 -33 -76 -43 -11 -11 -38 -26 -60 -36 -22 -9 -53 -26 -70 -39 -16 -12 -53 -34 -82 -48 -28 -15 -55 -32 -59 -38 -3 -6 -32 -22 -63 -36 -31 -14 -65 -33 -76 -43 -11 -11 -45 -30 -76 -43 -30 -14 -61 -32 -69 -42 -7 -9 -35 -28 -62 -41 -26 -13 -48 -29 -48 -35 0 -5 16 -17 35 -25 30 -12 385 -14 2632 -13 1949 0 2609 4 2642 12 25 7 46 18 49 24 2 8 -16 22 -45 34 -26 11 -59 31 -73 44 -14 13 -47 33 -75 45 -27 12 -59 30 -70 40 -11 10 -41 28 -66 38 -26 11 -50 26 -54 32 -4 7 -34 25 -67 40 -33 16 -70 38 -82 49 -11 11 -43 29 -71 41 -27 12 -59 30 -70 40 -11 10 -41 28 -66 38 -26 11 -50 26 -54 32 -4 7 -34 25 -67 40 -33 16 -70 38 -82 49 -11 11 -43 29 -71 41 -27 12 -59 30 -70 40 -11 11 -38 26 -60 36 -22 9 -53 26 -70 39 -16 12 -53 34 -82 48 -28 15 -55 32 -58 38 -4 6 -35 24 -69 40 -33 16 -77 40 -96 54 -19 13 -46 32 -59 41 -53 38 -51 -15 -51 1339 0 1393 -4 1302 65 1331 29 12 167 14 842 14 749 0 811 1 843 18 l35 17 3 776 c2 713 1 778 -14 790 -14 12 -166 15 -873 19 -671 4 -861 8 -878 18 l-23 13 -2 3738 c-3 3661 -3 3739 -22 3760 -27 30 -54 26 -74 -10 -9 -18 -34 -52 -54 -76 -21 -24 -38 -48 -38 -53 0 -5 -13 -24 -29 -42 -15 -18 -36 -49 -46 -68 -10 -19 -33 -52 -51 -73 -19 -20 -34 -42 -34 -47 0 -5 -15 -27 -33 -47 -18 -21 -45 -58 -59 -83 -14 -25 -35 -54 -47 -64 -12 -11 -21 -25 -21 -32 0 -7 -13 -25 -28 -41 -15 -15 -40 -49 -54 -74 -15 -25 -34 -51 -43 -59 -8 -7 -27 -34 -42 -61 -14 -27 -30 -49 -34 -49 -4 0 -21 -21 -38 -47 -35 -54 -67 -100 -108 -157 -15 -21 -37 -53 -48 -71 -11 -17 -35 -49 -52 -69 -18 -20 -33 -40 -33 -44 0 -4 -20 -34 -45 -67 -25 -33 -45 -64 -45 -69 0 -5 -14 -25 -31 -45 -56 -67 -98 -126 -124 -173 -14 -27 -29 -48 -34 -48 -5 0 -23 -21 -40 -47 -17 -27 -39 -59 -49 -73 -11 -14 -31 -43 -46 -65 -50 -75 -75 -110 -106 -150 -38 -49 -71 -96 -107 -154 -16 -24 -43 -61 -60 -83 -18 -22 -33 -44 -33 -48 0 -5 -17 -29 -37 -53 -21 -24 -46 -57 -55 -73 -29 -48 -85 -128 -106 -149 -11 -11 -26 -34 -35 -51 -9 -17 -31 -49 -49 -71 -18 -22 -41 -54 -51 -69 -9 -16 -28 -44 -42 -63 l-25 -34 0 -2322 c0 -2237 -1 -2323 -18 -2338 -17 -16 -191 -17 -2303 -17 -1538 0 -2296 3 -2321 10 -21 6 -40 15 -43 21 -4 5 5 23 19 40 14 17 26 34 26 39 0 5 17 29 38 53 20 24 45 57 55 73 29 47 85 127 112 159 31 38 67 87 102 144 16 24 43 61 61 83 17 22 32 44 32 48 0 5 17 29 38 54 51 63 116 154 136 194 9 17 21 32 25 32 5 0 20 17 32 38 12 20 34 51 48 68 14 17 38 51 54 75 36 58 69 105 107 154 47 61 93 124 115 160 11 17 35 49 53 69 17 20 32 41 32 46 0 6 15 27 33 47 18 21 45 58 59 83 14 25 35 54 47 64 12 11 21 24 21 31 0 7 14 27 30 46 33 37 65 80 107 147 16 24 45 64 66 88 20 25 37 49 37 54 0 5 15 26 33 46 17 20 41 52 52 69 31 49 77 113 111 153 17 21 37 48 44 62 7 14 24 39 37 55 24 30 66 90 123 178 18 26 36 47 41 47 4 0 16 15 25 33 20 39 85 130 137 193 20 25 37 49 37 54 0 4 15 26 33 48 17 22 44 59 60 83 36 58 71 107 103 144 14 17 38 50 55 75 45 68 75 111 109 155 35 45 66 89 109 155 27 41 47 68 121 163 28 35 93 129 125 182 11 17 33 47 48 66 55 67 96 125 123 172 15 26 31 47 35 47 4 0 18 17 30 38 12 20 36 53 53 73 17 20 39 49 49 65 49 81 89 140 110 163 13 14 34 43 46 64 13 20 27 37 32 37 5 0 18 19 30 43 12 23 37 59 55 80 19 20 34 41 34 46 0 6 17 30 38 55 38 46 61 78 109 155 16 24 43 60 61 81 17 21 32 41 32 45 0 4 15 24 33 45 17 21 44 57 60 81 36 58 69 105 107 154 34 44 64 87 109 155 17 25 41 59 55 75 32 37 67 86 103 144 16 24 43 61 61 83 17 22 32 44 32 48 0 5 17 29 38 54 41 50 87 112 117 161 11 17 35 49 53 69 17 20 32 41 32 46 0 6 15 27 33 47 18 21 46 58 61 83 34 57 69 107 101 145 30 35 88 118 113 159 9 16 34 49 55 73 20 24 37 48 37 53 0 5 17 29 38 53 20 24 45 57 54 73 25 41 83 124 113 159 32 38 67 88 101 145 15 25 43 62 61 83 18 20 33 41 33 47 0 5 15 26 33 46 17 20 41 52 52 69 30 49 76 111 118 161 20 25 37 49 37 54 0 4 15 26 33 48 17 22 44 59 60 83 36 58 71 107 103 144 14 17 38 50 55 75 45 68 75 111 109 155 38 49 71 96 107 154 16 24 43 60 61 81 17 21 32 42 32 47 0 5 15 25 33 45 17 20 44 55 60 79 36 58 69 105 107 154 38 49 71 96 107 154 16 24 43 59 61 79 17 20 32 40 32 44 0 4 14 24 32 43 28 33 66 87 115 169 10 16 32 45 49 65 17 20 41 53 53 74 12 20 26 37 30 37 4 0 20 21 35 48 27 46 68 104 123 171 15 19 37 49 48 66 52 83 115 172 134 189 12 11 21 23 21 29 0 5 15 26 33 47 17 21 44 57 60 81 36 58 69 105 107 154 34 44 64 87 109 155 17 25 41 59 55 75 32 37 67 86 103 144 16 24 43 61 61 83 17 22 32 45 33 51 3 36 -4 83 -14 89 -14 9 -5331 11 -5340 2z M18087 22272 c-15 -10 -34 -27 -42 -38 -13 -17 -14 -991 -15 -7633 l0 -7614 36 -33 35 -34 893 0 c699 0 896 3 908 12 8 7 22 24 32 38 15 23 16 586 16 7628 0 5612 -3 7609 -11 7625 -6 12 -21 32 -32 45 l-20 22 -886 0 c-841 0 -887 -1 -914 -18z M26874 22274 c-31 -11 -67 -42 -140 -121 -55 -58 -133 -141 -174 -184 -41 -43 -113 -119 -160 -169 -47 -50 -116 -124 -155 -164 -38 -40 -108 -115 -155 -167 -47 -51 -115 -125 -151 -164 -36 -38 -117 -126 -180 -195 -62 -69 -125 -136 -139 -150 -14 -14 -77 -82 -140 -150 -63 -68 -133 -143 -155 -165 -22 -23 -94 -99 -160 -170 -66 -71 -133 -143 -149 -160 -17 -16 -95 -102 -174 -190 -80 -88 -157 -172 -171 -186 -14 -15 -64 -68 -111 -119 -47 -51 -119 -128 -160 -171 -41 -43 -113 -120 -160 -169 -47 -50 -118 -126 -157 -168 -40 -42 -92 -97 -115 -123 -39 -41 -143 -154 -318 -344 -115 -126 -294 -318 -335 -361 -22 -23 -92 -97 -155 -165 -63 -68 -133 -142 -155 -164 -59 -61 -236 -252 -365 -395 -129 -142 -159 -175 -215 -234 -22 -23 -92 -97 -155 -165 -63 -68 -149 -159 -190 -202 -41 -44 -111 -118 -155 -165 -44 -48 -98 -105 -120 -128 -22 -23 -85 -91 -140 -151 -55 -60 -131 -144 -170 -185 -38 -42 -106 -115 -150 -163 -44 -48 -114 -122 -155 -166 -107 -112 -212 -229 -230 -256 -9 -13 -26 -34 -38 -47 -29 -30 -103 -125 -127 -163 -10 -17 -27 -39 -37 -50 -10 -12 -27 -47 -38 -79 -10 -31 -30 -71 -44 -87 -14 -17 -29 -53 -36 -86 -6 -32 -25 -98 -41 -148 -28 -82 -32 -107 -40 -294 -12 -256 1 -553 29 -656 44 -160 66 -222 98 -283 19 -35 34 -70 34 -77 0 -8 14 -30 31 -49 31 -36 47 -57 108 -143 46 -64 166 -202 296 -339 48 -50 93 -100 200 -219 44 -49 99 -109 121 -134 23 -25 86 -95 140 -156 54 -60 109 -122 123 -136 14 -15 60 -64 101 -110 41 -46 93 -102 115 -125 22 -23 76 -81 120 -130 44 -49 96 -105 115 -125 19 -20 58 -63 86 -95 137 -156 240 -271 263 -295 14 -14 62 -65 106 -114 44 -49 96 -106 115 -125 19 -20 71 -76 115 -125 75 -83 94 -104 186 -202 20 -21 67 -74 104 -118 73 -85 108 -124 165 -184 19 -20 71 -76 115 -125 44 -49 98 -107 120 -130 22 -23 74 -79 115 -125 41 -47 89 -98 106 -115 17 -17 73 -78 124 -136 51 -58 111 -126 134 -151 22 -25 77 -85 121 -134 44 -49 96 -106 115 -127 19 -20 71 -76 115 -124 44 -49 98 -107 120 -131 22 -23 54 -57 71 -75 17 -18 131 -145 254 -283 122 -137 234 -262 249 -276 14 -15 62 -66 106 -115 44 -48 94 -101 110 -118 17 -17 150 -164 295 -326 145 -162 278 -309 295 -326 16 -18 64 -69 105 -114 41 -45 89 -96 106 -114 17 -17 131 -143 254 -281 224 -251 252 -282 325 -359 22 -23 76 -81 120 -130 44 -48 96 -104 115 -124 19 -21 60 -65 91 -99 38 -44 69 -67 99 -78 37 -13 218 -15 1445 -15 l1402 0 -7 46 c-6 38 -17 56 -66 107 -59 62 -108 114 -339 361 -66 70 -154 163 -195 205 -41 43 -129 135 -195 205 -66 70 -154 162 -195 205 -101 105 -209 220 -365 386 -385 412 -524 560 -605 644 -41 43 -129 135 -195 205 -66 70 -154 162 -195 205 -41 43 -131 137 -200 210 -69 73 -138 147 -155 165 -16 17 -109 116 -205 220 -96 104 -209 224 -250 266 -41 43 -129 136 -195 206 -66 70 -154 162 -195 205 -41 42 -129 134 -195 204 -66 71 -151 161 -190 201 -38 40 -90 94 -115 121 -215 232 -408 439 -470 503 -41 43 -129 136 -195 206 -66 70 -154 162 -195 204 -41 43 -129 135 -195 205 -66 70 -154 162 -195 205 -41 42 -172 182 -290 310 -118 128 -249 268 -290 311 -41 42 -129 135 -195 205 -66 70 -154 162 -195 204 -41 42 -129 134 -195 205 -66 70 -151 160 -190 199 -38 39 -99 103 -135 142 -111 121 -384 415 -459 494 -39 41 -71 79 -70 85 3 44 42 95 179 237 85 88 207 213 270 278 63 65 187 193 275 285 88 91 194 201 235 244 41 42 152 158 245 256 190 200 346 364 391 411 16 16 101 106 189 198 88 93 212 221 275 286 63 65 187 193 275 284 88 92 212 220 275 285 63 65 187 194 275 287 88 92 169 177 181 188 11 12 110 116 220 231 110 116 211 222 224 236 14 14 97 101 185 193 88 93 212 222 275 287 63 65 189 195 280 289 91 94 217 224 280 289 63 65 187 194 275 287 88 92 171 179 185 193 21 22 234 246 490 515 36 38 99 103 140 146 41 43 147 153 235 244 88 92 212 221 275 286 63 65 189 195 280 290 91 94 215 222 275 285 274 282 400 419 407 439 3 11 6 33 7 49 l1 27 -1407 -1 c-1212 0 -1414 -3 -1449 -15z M46130 20969 c-237 -12 -331 -24 -379 -48 -23 -12 -84 -30 -136 -41 -52 -11 -113 -29 -135 -40 -22 -11 -83 -29 -135 -40 -52 -11 -113 -29 -135 -40 -22 -11 -73 -28 -113 -37 -39 -8 -92 -28 -117 -44 -25 -16 -66 -35 -90 -44 -25 -9 -54 -24 -65 -35 -11 -10 -42 -27 -70 -38 -27 -10 -67 -30 -88 -45 -21 -14 -55 -31 -75 -38 -20 -6 -51 -22 -68 -34 -16 -13 -47 -30 -68 -39 -21 -9 -53 -28 -71 -43 -18 -16 -65 -53 -106 -83 -75 -57 -154 -131 -199 -187 -14 -17 -55 -69 -92 -114 -38 -45 -68 -88 -68 -94 0 -7 -14 -29 -30 -50 -17 -21 -40 -59 -51 -84 -11 -25 -31 -62 -44 -81 -13 -19 -29 -57 -35 -85 -6 -27 -24 -72 -39 -100 -16 -27 -36 -83 -44 -122 -9 -40 -25 -90 -36 -112 -28 -54 -44 -170 -38 -268 4 -64 10 -92 30 -126 14 -24 35 -80 46 -125 12 -45 32 -102 45 -127 14 -25 30 -71 36 -103 19 -88 33 -109 80 -117 42 -7 60 1 142 69 21 17 60 49 88 71 28 22 65 53 82 68 17 16 49 40 70 53 21 13 38 29 38 34 0 5 13 16 29 25 16 8 50 32 74 52 25 21 68 56 97 78 28 22 73 58 99 80 27 22 73 60 103 84 29 24 80 57 113 72 59 29 63 29 240 29 99 0 245 -5 325 -10 80 -6 249 -17 375 -25 440 -28 554 -38 655 -61 36 -8 139 -26 230 -39 91 -13 192 -33 225 -45 33 -11 116 -29 185 -40 69 -10 146 -28 172 -40 26 -11 88 -29 139 -40 50 -11 106 -29 124 -40 18 -11 71 -29 117 -39 45 -10 101 -27 124 -39 22 -11 75 -29 117 -40 41 -11 89 -29 106 -41 17 -12 54 -29 83 -37 29 -9 76 -29 103 -44 28 -16 70 -33 95 -40 25 -6 65 -24 90 -40 25 -16 63 -33 85 -39 22 -6 65 -26 95 -46 30 -19 59 -35 66 -35 6 0 30 -14 53 -31 24 -17 63 -39 88 -50 25 -11 58 -30 74 -43 16 -14 45 -30 66 -37 21 -6 52 -23 68 -36 17 -14 55 -40 85 -59 30 -18 68 -42 84 -51 16 -10 49 -35 73 -55 24 -21 48 -38 52 -38 4 0 23 -15 43 -32 20 -18 55 -45 79 -61 73 -46 110 -75 197 -155 46 -42 120 -111 164 -152 140 -129 183 -172 272 -275 47 -55 101 -116 119 -137 100 -113 197 -238 197 -255 0 -7 15 -30 34 -50 18 -21 37 -48 40 -61 4 -12 23 -42 41 -66 19 -25 41 -59 50 -78 10 -18 27 -44 40 -58 12 -14 30 -46 40 -72 9 -26 26 -55 36 -64 11 -10 27 -43 36 -73 8 -31 28 -74 44 -96 15 -22 32 -58 38 -81 6 -22 24 -60 40 -85 16 -24 37 -72 45 -106 9 -35 27 -83 40 -107 13 -25 29 -75 35 -112 7 -37 23 -89 37 -116 14 -27 36 -100 49 -161 14 -62 31 -134 40 -162 9 -27 22 -108 31 -180 8 -71 23 -175 33 -230 14 -73 21 -173 26 -375 7 -254 6 -283 -13 -385 -21 -109 -35 -230 -47 -416 -4 -63 -15 -120 -31 -165 -14 -38 -34 -119 -44 -180 -11 -61 -28 -132 -40 -159 -11 -26 -28 -89 -36 -139 -11 -62 -26 -110 -49 -151 -18 -33 -35 -72 -39 -86 -3 -14 -17 -43 -32 -65 -15 -21 -35 -61 -44 -89 -9 -27 -31 -72 -49 -99 -17 -28 -31 -55 -31 -61 0 -7 -10 -20 -21 -31 -12 -10 -39 -41 -60 -69 -22 -27 -57 -72 -79 -100 -22 -27 -54 -68 -70 -90 -80 -105 -205 -235 -420 -435 -68 -63 -140 -131 -161 -150 -56 -53 -119 -104 -164 -132 -22 -14 -46 -33 -54 -42 -7 -9 -31 -26 -52 -38 -22 -12 -39 -25 -39 -30 0 -4 -24 -23 -52 -43 -98 -66 -153 -106 -178 -130 -14 -12 -39 -30 -55 -38 -17 -8 -39 -25 -49 -36 -11 -12 -40 -31 -65 -42 -25 -11 -55 -28 -66 -38 -11 -10 -40 -29 -65 -41 -25 -12 -54 -31 -65 -41 -11 -10 -41 -27 -66 -38 -26 -12 -52 -28 -60 -37 -7 -8 -36 -27 -63 -41 -28 -14 -64 -36 -81 -48 -16 -13 -52 -32 -80 -44 -27 -12 -56 -28 -65 -36 -9 -8 -41 -23 -71 -34 -30 -10 -71 -30 -93 -45 -21 -14 -56 -30 -76 -36 -20 -6 -55 -22 -76 -36 -22 -15 -61 -35 -89 -44 -27 -9 -67 -28 -87 -42 -20 -14 -67 -33 -105 -42 -37 -10 -82 -26 -99 -36 -16 -11 -70 -29 -119 -40 -49 -11 -103 -29 -120 -40 -17 -11 -70 -28 -118 -40 -48 -11 -103 -26 -122 -34 -43 -18 -145 -33 -315 -46 -74 -5 -151 -12 -170 -15 -19 -3 -204 1 -410 9 -319 12 -387 18 -455 36 -44 11 -122 30 -174 41 -55 12 -121 35 -158 55 -36 19 -72 34 -82 34 -15 0 -61 34 -61 45 0 2 5 39 11 82 6 43 22 102 35 131 14 29 33 93 44 142 10 49 28 107 40 130 12 23 30 81 40 130 10 49 28 107 40 130 12 23 30 81 40 130 10 49 28 107 40 130 12 23 30 81 40 130 10 49 28 107 40 129 11 23 29 83 40 134 10 51 30 115 43 142 14 28 30 82 37 120 7 39 25 99 40 135 15 36 35 100 44 142 8 43 25 96 36 119 12 22 30 80 40 129 10 49 28 107 40 130 12 23 30 81 40 130 10 49 28 107 40 130 12 23 30 82 41 133 10 50 28 109 40 130 11 22 29 81 39 132 10 51 28 110 39 132 12 21 30 80 40 130 11 51 29 110 41 133 12 23 30 81 40 130 10 49 28 107 40 130 12 23 30 81 40 130 10 49 28 107 40 130 12 23 30 81 40 130 10 49 28 107 40 129 11 23 29 84 40 136 11 52 29 114 41 137 11 22 29 83 40 135 10 51 28 112 40 135 11 22 29 83 40 135 10 51 28 111 39 133 11 22 29 83 40 135 11 52 29 114 41 137 11 22 29 83 40 135 10 51 28 112 40 135 11 22 29 83 40 135 10 51 28 111 39 133 11 22 29 83 40 135 11 52 28 112 39 134 11 21 29 90 41 153 11 63 29 135 40 160 10 24 26 87 35 139 9 52 29 132 45 179 16 47 36 128 44 180 9 52 24 122 35 156 10 33 24 96 30 140 7 43 16 110 22 147 5 37 20 105 33 150 13 45 29 131 36 191 6 61 13 114 16 118 3 4 -7 20 -22 34 l-26 27 -167 -7 c-267 -10 -386 -24 -481 -56 -47 -16 -101 -32 -120 -36 -19 -3 -59 -19 -88 -35 -29 -15 -77 -33 -107 -39 -29 -6 -69 -22 -87 -35 -18 -14 -51 -33 -73 -44 -22 -10 -49 -28 -60 -41 -11 -12 -41 -33 -66 -45 -25 -13 -51 -31 -59 -40 -7 -9 -32 -26 -54 -37 -44 -23 -58 -34 -194 -169 -153 -150 -312 -321 -338 -361 -13 -20 -28 -39 -34 -43 -6 -3 -21 -27 -34 -53 -13 -26 -38 -62 -55 -81 -17 -19 -31 -40 -31 -47 0 -7 -13 -25 -29 -41 -15 -16 -36 -44 -46 -63 -10 -19 -29 -48 -42 -64 -13 -16 -33 -47 -45 -70 -11 -22 -28 -50 -38 -61 -10 -11 -27 -43 -38 -71 -10 -29 -31 -67 -44 -85 -14 -19 -31 -52 -38 -74 -7 -22 -24 -55 -38 -74 -13 -18 -34 -56 -44 -85 -11 -28 -28 -60 -38 -71 -10 -11 -28 -45 -39 -76 -12 -30 -32 -70 -45 -88 -14 -18 -30 -56 -36 -84 -7 -29 -23 -68 -35 -88 -13 -20 -31 -63 -40 -95 -10 -33 -30 -81 -45 -109 -16 -27 -35 -76 -43 -107 -8 -31 -24 -70 -35 -85 -11 -16 -28 -55 -37 -88 -10 -33 -30 -82 -45 -110 -15 -27 -34 -77 -41 -110 -7 -33 -25 -85 -40 -115 -14 -30 -32 -82 -39 -115 -6 -33 -25 -89 -41 -125 -15 -36 -35 -96 -44 -134 -9 -38 -24 -84 -35 -101 -11 -17 -29 -71 -40 -120 -11 -49 -30 -103 -41 -121 -11 -18 -28 -73 -39 -122 -11 -49 -30 -112 -44 -138 -13 -27 -29 -80 -36 -119 -7 -38 -25 -99 -40 -135 -16 -36 -34 -94 -40 -130 -6 -36 -24 -94 -40 -130 -16 -36 -34 -94 -40 -130 -6 -36 -24 -94 -40 -130 -16 -36 -34 -94 -40 -130 -6 -36 -22 -90 -36 -119 -14 -30 -33 -94 -44 -142 -10 -48 -28 -108 -40 -134 -11 -25 -30 -86 -40 -135 -10 -49 -28 -106 -38 -127 -11 -21 -29 -82 -40 -135 -12 -53 -30 -117 -42 -143 -12 -25 -30 -86 -40 -135 -10 -49 -28 -106 -38 -127 -20 -39 -36 -101 -48 -183 -3 -25 -16 -72 -29 -105 -30 -79 -32 -85 -50 -187 -8 -48 -20 -98 -26 -112 -11 -22 -62 -56 -86 -56 -5 0 -20 12 -34 26 -13 14 -40 34 -60 44 -19 10 -41 26 -49 35 -8 9 -32 26 -54 37 -23 11 -58 36 -79 54 -20 19 -42 34 -47 34 -6 0 -30 18 -53 41 -64 61 -104 98 -196 180 -78 69 -149 147 -231 254 -19 26 -52 65 -72 89 -21 24 -38 47 -38 52 0 5 -16 34 -36 64 -20 30 -45 79 -55 107 -10 29 -29 68 -42 85 -13 18 -32 54 -41 80 -10 26 -22 50 -27 54 -18 11 -98 -60 -161 -142 -21 -27 -53 -69 -73 -94 -19 -25 -43 -58 -53 -74 -9 -16 -28 -40 -41 -55 -12 -14 -32 -44 -43 -66 -12 -22 -34 -56 -49 -75 -16 -19 -29 -40 -29 -47 0 -7 -13 -28 -30 -46 -16 -19 -38 -55 -50 -81 -11 -26 -30 -61 -44 -79 -13 -18 -31 -55 -40 -83 -9 -29 -25 -59 -36 -69 -11 -10 -27 -40 -36 -69 -9 -28 -27 -68 -40 -88 -13 -20 -33 -72 -44 -114 -12 -42 -32 -95 -45 -118 -13 -23 -31 -81 -40 -131 -10 -49 -25 -110 -35 -135 -9 -25 -23 -76 -30 -115 -16 -89 -27 -452 -18 -570 16 -204 30 -299 48 -336 11 -20 28 -78 39 -129 11 -50 29 -106 40 -123 11 -18 27 -61 36 -97 9 -36 28 -81 41 -101 14 -20 34 -61 45 -90 12 -30 27 -61 34 -69 8 -8 28 -44 45 -80 36 -75 88 -162 123 -205 13 -16 31 -44 40 -61 9 -17 23 -37 32 -44 9 -8 26 -32 37 -54 26 -53 93 -129 328 -375 103 -108 282 -300 367 -394 83 -91 95 -128 64 -198 -10 -24 -26 -99 -35 -166 -9 -67 -23 -141 -32 -165 -22 -62 -31 -107 -50 -253 -17 -136 -15 -294 6 -424 14 -80 80 -206 147 -277 43 -45 77 -68 203 -135 19 -11 44 -19 56 -19 12 0 61 -11 109 -25 110 -32 229 -45 426 -45 153 0 157 1 195 27 21 14 58 34 80 44 23 11 47 26 55 35 7 8 39 29 70 45 32 16 60 33 64 39 4 6 32 23 64 39 31 16 63 37 70 45 8 9 34 25 58 36 25 11 61 33 79 50 19 16 40 30 47 30 17 0 145 97 242 183 94 83 158 149 238 247 51 61 65 72 110 84 29 8 124 17 212 20 600 22 757 33 905 66 47 10 148 26 225 35 78 10 179 29 230 45 50 15 118 31 151 35 109 12 173 26 219 46 26 12 89 29 141 40 52 10 111 27 133 38 21 11 84 29 139 40 56 11 119 29 140 40 21 11 75 29 120 40 45 12 97 31 116 42 20 11 70 29 112 40 42 10 92 28 111 40 18 12 68 30 109 40 42 10 88 27 102 37 15 11 52 27 82 37 30 9 78 30 105 45 28 16 74 35 103 44 29 8 64 24 79 36 14 11 56 29 93 40 37 11 79 29 93 40 15 12 51 29 82 40 30 10 70 30 87 43 18 14 44 28 58 32 14 4 54 24 90 45 36 21 77 41 92 44 14 3 40 17 56 31 17 14 50 32 74 41 23 8 59 26 78 39 19 13 56 33 81 44 26 12 52 28 60 37 7 8 40 29 73 46 34 17 74 41 89 54 16 13 34 24 41 24 7 0 32 14 56 31 24 18 62 40 85 50 23 10 48 26 56 35 7 8 33 27 58 40 52 29 128 79 186 124 55 42 120 88 192 133 15 9 55 37 88 62 33 25 78 57 100 71 22 15 56 41 76 58 20 17 60 49 88 71 29 22 74 58 100 80 27 22 74 60 106 85 130 102 197 160 330 285 42 39 114 106 162 150 129 120 200 192 558 571 22 23 57 64 77 91 108 140 140 181 168 213 17 19 50 60 75 90 24 30 57 71 73 90 16 19 39 53 50 76 11 22 28 46 37 54 9 8 25 31 36 52 11 22 35 59 54 83 18 25 37 55 41 67 3 13 22 40 40 61 19 20 34 42 34 48 0 6 16 33 35 59 20 27 40 63 47 82 6 18 22 48 35 66 13 18 31 54 40 80 9 26 26 61 39 79 13 17 33 56 44 86 12 31 30 67 41 81 11 14 28 50 39 80 10 30 30 74 43 98 14 24 30 68 37 98 7 30 24 80 40 110 15 30 33 80 40 110 7 30 23 74 37 98 14 24 33 87 44 140 11 53 28 118 39 145 12 26 29 96 40 155 11 60 29 129 40 155 11 25 29 95 40 155 11 61 28 130 39 154 22 52 27 78 46 264 8 78 24 177 35 220 25 96 46 282 65 589 8 127 19 289 25 360 14 195 12 310 -9 462 -11 76 -25 215 -30 308 -6 94 -13 205 -16 247 -3 42 -18 119 -34 171 -16 52 -35 138 -41 193 -7 54 -23 133 -36 176 -13 42 -31 118 -40 170 -10 54 -28 116 -44 148 -15 30 -33 82 -40 115 -7 33 -23 82 -37 108 -13 27 -33 85 -44 130 -11 45 -27 93 -36 106 -8 13 -26 54 -38 92 -13 38 -33 81 -44 95 -11 14 -30 51 -41 81 -11 31 -29 67 -40 80 -11 14 -29 50 -40 80 -11 31 -29 67 -40 80 -11 14 -28 48 -39 76 -10 29 -34 75 -52 103 -19 28 -42 64 -52 80 -24 41 -61 94 -90 129 -13 17 -33 48 -45 70 -11 22 -30 49 -42 60 -12 11 -30 36 -40 56 -10 19 -26 41 -35 49 -9 8 -26 32 -37 54 -21 42 -46 72 -174 211 -41 44 -106 116 -146 160 -86 95 -256 265 -319 318 -24 20 -62 53 -84 72 -37 33 -160 137 -269 228 -25 21 -66 50 -91 64 -25 13 -45 29 -45 34 0 5 -24 21 -52 35 -29 15 -69 40 -88 55 -19 16 -40 29 -47 29 -7 0 -27 13 -45 29 -18 15 -53 39 -78 51 -25 12 -60 36 -78 51 -18 16 -39 29 -47 29 -8 0 -29 13 -48 29 -18 16 -57 39 -86 50 -30 11 -70 31 -90 44 -20 14 -54 30 -76 37 -22 7 -55 23 -73 37 -17 13 -57 33 -87 43 -31 11 -67 28 -81 39 -14 11 -49 29 -78 40 -29 11 -70 31 -90 45 -20 14 -61 30 -91 36 -30 6 -78 24 -107 39 -29 16 -80 34 -113 41 -33 7 -84 25 -113 41 -29 15 -78 33 -110 39 -31 7 -82 25 -112 40 -30 15 -93 35 -139 45 -46 9 -111 27 -145 40 -33 12 -99 28 -146 34 -47 7 -123 25 -170 41 -47 16 -120 33 -164 39 -43 6 -119 22 -170 35 -50 13 -143 29 -206 35 -63 6 -162 16 -220 22 -57 6 -141 19 -185 30 -96 23 -281 35 -805 49 -423 11 -679 11 -930 -1z M41211 18881 c-11 -27 -21 -53 -21 -56 0 -4 -11 -20 -24 -36 -13 -15 -34 -57 -46 -93 -12 -36 -30 -77 -42 -91 -11 -14 -28 -52 -38 -85 -10 -32 -29 -73 -43 -92 -16 -21 -29 -56 -35 -92 -8 -53 -7 -60 13 -84 21 -25 25 -26 50 -12 35 19 83 85 96 135 6 22 23 63 39 90 15 28 35 83 43 122 9 40 26 93 37 117 11 25 25 67 30 93 8 37 8 59 -2 88 -7 21 -18 40 -24 42 -6 2 -21 -19 -33 -46z M63867 18899 c-9 -13 -23 -44 -31 -67 -9 -24 -24 -55 -35 -68 -11 -14 -29 -54 -41 -89 -12 -35 -30 -76 -42 -90 -11 -14 -28 -53 -38 -85 -10 -33 -29 -73 -43 -90 -34 -39 -45 -121 -23 -155 9 -14 22 -25 30 -25 7 0 31 13 53 29 31 23 45 42 58 83 10 29 30 76 46 104 16 29 34 78 40 110 6 33 22 83 36 113 29 62 49 157 40 192 -3 13 -12 33 -20 43 -14 19 -15 19 -30 -5z M77129 17396 c-2 -2 -191 -9 -419 -15 -681 -19 -924 -34 -1069 -67 -36 -8 -141 -24 -235 -34 -94 -11 -202 -29 -241 -40 -38 -10 -122 -28 -186 -39 -64 -12 -137 -30 -163 -42 -26 -11 -94 -29 -150 -39 -55 -10 -128 -29 -161 -43 -33 -13 -85 -30 -115 -37 -30 -7 -83 -28 -118 -47 -35 -18 -74 -33 -87 -33 -13 0 -49 -14 -81 -31 -33 -17 -90 -40 -128 -51 -38 -10 -82 -28 -96 -38 -15 -11 -50 -29 -76 -41 -27 -11 -58 -29 -69 -39 -11 -10 -42 -28 -70 -40 -27 -12 -59 -30 -70 -40 -11 -10 -42 -28 -70 -40 -27 -12 -59 -30 -70 -40 -11 -10 -40 -27 -65 -38 -56 -24 -70 -35 -355 -277 -103 -87 -123 -103 -161 -132 -54 -42 -294 -315 -318 -361 -10 -20 -26 -46 -36 -57 -10 -11 -30 -45 -44 -75 -15 -30 -34 -67 -43 -81 -16 -25 -15 -27 9 -60 14 -19 27 -41 30 -49 3 -8 29 -46 57 -84 28 -38 51 -72 51 -76 0 -4 23 -18 52 -30 28 -12 69 -34 90 -48 38 -24 42 -25 156 -19 64 4 135 11 157 17 22 5 110 21 195 35 95 16 176 35 208 50 29 14 88 31 130 40 42 8 97 20 121 27 39 10 45 9 57 -7 8 -10 14 -32 14 -47 0 -30 -22 -81 -46 -109 -8 -8 -23 -42 -34 -74 -11 -33 -29 -68 -40 -80 -11 -12 -29 -47 -39 -78 -11 -31 -31 -72 -44 -89 -14 -18 -30 -51 -37 -73 -7 -22 -25 -60 -40 -85 -15 -25 -36 -70 -45 -100 -10 -30 -26 -66 -37 -79 -10 -13 -26 -49 -34 -80 -9 -31 -29 -78 -44 -106 -16 -27 -34 -70 -40 -95 -6 -25 -24 -67 -40 -95 -16 -27 -33 -70 -40 -95 -6 -25 -24 -65 -40 -90 -15 -25 -33 -67 -39 -95 -7 -27 -23 -70 -37 -94 -13 -24 -33 -79 -44 -122 -11 -43 -30 -94 -41 -113 -11 -20 -29 -70 -40 -112 -10 -42 -28 -91 -39 -109 -11 -18 -28 -66 -38 -106 -11 -41 -30 -96 -44 -124 -14 -27 -32 -91 -41 -141 -10 -50 -26 -112 -37 -137 -11 -25 -29 -95 -40 -155 -11 -60 -29 -131 -41 -157 -12 -27 -30 -103 -40 -170 -10 -66 -27 -146 -38 -177 -11 -31 -24 -91 -31 -134 -25 -174 -32 -210 -50 -261 -10 -29 -23 -86 -29 -126 -6 -39 -18 -119 -26 -177 -9 -58 -22 -130 -30 -160 -8 -30 -22 -129 -30 -220 -9 -91 -25 -212 -36 -270 -32 -160 -36 -184 -49 -330 -6 -74 -20 -189 -30 -255 -23 -146 -36 -349 -51 -810 -16 -466 -15 -504 4 -541 22 -43 88 -99 133 -114 22 -7 44 -17 50 -22 18 -13 153 -37 256 -44 98 -7 379 10 438 26 86 24 202 50 282 64 84 16 92 15 240 -9 84 -14 186 -36 226 -50 61 -22 102 -28 250 -36 97 -5 299 -18 447 -29 384 -28 407 -29 740 -40 328 -11 527 -4 820 31 263 31 417 56 474 79 29 11 108 29 177 40 69 11 151 31 182 44 31 13 77 29 102 36 25 6 68 24 95 40 28 15 76 35 109 45 32 9 70 25 85 36 14 10 56 28 93 38 38 11 80 29 96 39 15 11 52 31 82 45 30 13 61 32 69 41 8 10 33 27 55 38 23 12 57 34 76 49 19 16 40 29 46 29 7 0 30 15 52 33 22 17 62 45 88 60 116 66 161 106 458 404 182 183 224 229 261 288 50 79 86 133 115 170 42 53 73 99 110 161 17 28 39 59 49 68 11 10 29 43 42 74 12 31 31 68 41 81 10 13 27 53 38 88 11 36 29 76 39 89 11 14 27 49 37 77 9 29 29 75 44 102 15 28 33 68 40 90 7 22 25 63 40 90 17 29 35 86 44 137 9 47 25 107 36 131 11 25 29 95 40 155 11 61 29 131 40 157 11 26 29 95 40 153 10 59 26 139 34 177 23 106 36 229 36 330 0 119 -17 269 -35 325 -8 25 -24 93 -35 150 -12 65 -28 116 -41 133 -11 16 -29 53 -39 83 -10 29 -30 69 -43 86 -14 18 -28 43 -32 56 -3 12 -23 43 -43 67 -20 24 -62 76 -92 115 -30 39 -84 95 -119 123 -36 29 -85 69 -110 90 -25 20 -64 46 -86 57 -22 10 -55 30 -74 44 -19 14 -50 31 -70 37 -20 6 -52 22 -71 35 -19 12 -57 28 -85 35 -27 7 -66 16 -85 21 -57 13 -61 19 -54 72 5 36 13 51 33 64 14 9 44 32 67 52 23 19 67 55 99 80 90 69 155 132 226 216 35 42 85 102 112 133 26 31 57 67 68 81 12 14 28 40 36 59 8 18 30 56 49 83 19 28 34 56 34 62 0 6 15 35 34 65 23 35 38 75 46 118 6 37 23 94 37 127 21 52 27 86 35 221 14 224 5 439 -22 540 -11 44 -30 122 -41 174 -11 55 -31 115 -48 145 -16 28 -36 75 -45 104 -8 29 -24 65 -34 80 -11 15 -30 51 -42 80 -13 29 -30 58 -40 65 -9 7 -29 31 -43 54 -14 23 -31 44 -37 48 -6 4 -23 25 -37 48 -45 72 -104 135 -217 230 -59 51 -118 99 -130 107 -11 8 -38 29 -59 47 -20 18 -43 33 -51 33 -8 0 -36 16 -64 35 -28 19 -62 37 -77 41 -14 4 -47 21 -73 39 -26 17 -65 38 -87 45 -22 7 -63 23 -91 36 -28 13 -92 33 -142 44 -50 10 -112 28 -137 40 -61 28 -118 37 -321 50 -95 6 -198 15 -230 20 -60 10 -147 13 -155 6z m-129 -1487 c77 -9 157 -25 325 -65 33 -8 71 -24 85 -35 14 -11 39 -27 55 -37 17 -9 51 -39 76 -66 41 -43 49 -58 64 -130 10 -45 20 -104 22 -133 3 -29 -2 -119 -11 -200 -15 -135 -20 -155 -55 -228 -22 -44 -42 -89 -45 -100 -3 -11 -27 -41 -53 -67 -116 -115 -219 -208 -229 -208 -7 0 -34 -15 -60 -33 -27 -18 -65 -39 -84 -47 -19 -7 -47 -24 -62 -36 -15 -12 -49 -29 -75 -39 -26 -9 -73 -29 -103 -44 -30 -16 -80 -34 -110 -41 -30 -7 -77 -25 -105 -40 -32 -18 -83 -34 -140 -44 -50 -8 -111 -24 -136 -35 -24 -11 -97 -29 -161 -40 -64 -12 -137 -30 -163 -41 -26 -11 -98 -29 -161 -40 -63 -11 -136 -29 -163 -39 -47 -19 -130 -33 -276 -46 -38 -4 -126 -19 -195 -35 -138 -32 -313 -52 -345 -40 -12 4 -27 15 -34 24 -11 13 -10 24 2 63 8 26 20 71 27 98 6 28 20 64 30 80 10 17 28 68 40 115 12 47 30 99 40 115 10 17 26 62 36 100 9 39 29 93 44 120 15 28 35 75 44 106 8 31 24 67 35 80 11 14 27 52 36 84 9 33 30 80 45 105 15 25 36 72 45 105 9 32 25 70 36 84 11 13 27 49 35 80 9 31 29 79 44 106 15 28 35 75 44 105 19 63 83 179 106 191 47 24 211 63 339 80 81 10 170 26 197 34 44 13 198 30 354 38 145 8 485 6 560 -4z m-650 -3303 c91 -8 215 -18 275 -21 175 -10 415 -43 478 -64 33 -12 111 -28 175 -37 90 -12 128 -22 167 -44 28 -15 70 -34 95 -40 25 -6 54 -20 65 -30 11 -10 43 -32 70 -48 52 -32 131 -115 157 -167 27 -52 41 -137 35 -221 -7 -101 -39 -249 -66 -302 -12 -23 -28 -74 -36 -114 -11 -49 -27 -89 -50 -123 -19 -28 -35 -56 -35 -62 0 -7 -13 -28 -30 -46 -16 -19 -39 -56 -50 -82 -11 -26 -33 -63 -48 -82 -55 -69 -308 -315 -344 -334 -20 -10 -40 -24 -44 -30 -3 -6 -30 -22 -58 -34 -29 -13 -58 -31 -66 -40 -8 -9 -39 -28 -70 -42 -30 -13 -71 -35 -90 -48 -19 -13 -63 -30 -98 -39 -35 -9 -82 -27 -105 -40 -23 -13 -75 -31 -115 -40 -40 -10 -93 -26 -117 -37 -25 -11 -104 -28 -177 -39 -73 -11 -156 -26 -183 -34 -71 -22 -240 -35 -525 -43 -224 -6 -247 -5 -263 11 -9 10 -17 22 -17 27 0 6 14 18 31 27 18 9 52 32 77 51 25 18 61 40 81 48 20 8 45 23 56 34 12 10 47 28 78 38 31 11 72 31 89 44 18 14 57 32 85 42 29 9 56 21 59 27 4 6 39 25 79 43 40 19 76 38 80 44 3 7 33 25 65 41 32 16 62 35 66 41 3 6 30 21 58 34 28 12 59 32 69 42 10 11 37 29 60 39 23 10 60 34 83 54 133 115 144 130 171 223 l24 82 -25 21 c-21 19 -42 23 -152 29 -130 8 -311 2 -488 -16 -141 -14 -471 -84 -510 -108 -18 -11 -72 -29 -120 -41 -48 -11 -105 -29 -127 -40 -22 -12 -74 -29 -116 -40 -41 -10 -85 -28 -97 -39 -12 -12 -44 -28 -72 -37 -27 -9 -63 -27 -81 -40 -17 -13 -54 -33 -83 -44 -29 -11 -66 -31 -83 -44 -18 -13 -55 -31 -83 -40 -28 -9 -62 -28 -74 -41 -13 -14 -29 -25 -36 -25 -7 0 -28 -13 -46 -29 -18 -15 -58 -44 -88 -63 -30 -20 -64 -45 -74 -57 -11 -11 -24 -21 -30 -21 -5 0 -27 -16 -47 -36 -33 -32 -39 -35 -59 -24 -22 12 -23 16 -17 104 4 63 13 112 32 161 14 39 35 123 46 187 11 65 28 138 39 163 11 25 29 99 39 164 11 65 30 142 41 171 11 29 30 105 40 170 11 65 29 137 39 161 11 24 29 99 40 165 11 67 30 146 42 175 11 30 27 92 36 138 8 47 19 93 24 103 11 21 53 33 174 48 50 6 131 22 180 35 95 25 251 40 520 50 88 4 252 15 365 25 259 22 402 24 610 6z M37055 13826 c-12 -18 -15 -43 -13 -97 2 -61 6 -74 20 -77 20 -4 34 25 49 102 7 39 6 54 -6 73 -9 13 -20 23 -25 23 -5 0 -17 -11 -25 -24z M59695 13820 c-10 -19 -15 -57 -15 -115 0 -78 2 -85 20 -85 10 0 24 8 29 19 6 10 16 50 22 89 10 62 10 74 -5 97 -9 14 -21 25 -26 25 -5 0 -16 -13 -25 -30z M36997 13643 c-31 -54 -39 -202 -14 -249 l16 -29 16 40 c11 25 19 80 23 143 5 98 4 102 -16 102 -11 0 -23 -3 -25 -7z M59628 13588 c-17 -32 -23 -189 -9 -217 7 -11 16 -21 20 -21 17 0 31 63 38 162 6 95 5 98 -15 98 -12 0 -27 -10 -34 -22z M59457 12957 c-8 -12 -20 -49 -27 -82 -7 -32 -22 -77 -33 -99 -26 -48 -36 -159 -17 -181 7 -8 16 -15 21 -15 5 0 19 21 32 48 13 26 33 61 46 78 27 37 40 90 41 162 0 51 -21 112 -39 112 -5 0 -15 -10 -24 -23z M36818 12953 c-9 -10 -21 -38 -28 -63 -6 -25 -18 -55 -26 -67 -23 -37 -46 -141 -39 -176 8 -34 22 -57 35 -57 5 0 21 26 36 58 16 31 36 69 47 83 11 16 22 57 28 103 7 58 7 83 -3 103 -7 15 -18 28 -24 30 -6 2 -18 -4 -26 -14z M36661 12169 c-6 -18 -11 -65 -11 -105 0 -60 3 -74 15 -74 31 0 54 117 35 174 -6 20 -15 36 -20 36 -4 0 -13 -14 -19 -31z M59301 12154 c-6 -14 -14 -66 -18 -114 -5 -79 -8 -89 -26 -92 -34 -5 -50 -69 -54 -228 -5 -147 4 -206 30 -198 20 7 37 114 44 275 6 144 7 152 27 155 14 2 24 15 32 43 23 74 14 185 -15 185 -4 0 -13 -12 -20 -26z M36592 11963 c-20 -38 -32 -129 -32 -247 0 -99 3 -126 15 -136 10 -8 19 -10 25 -4 17 17 41 212 38 307 -3 77 -6 92 -20 95 -9 2 -21 -5 -26 -15z M36517 11533 c-3 -10 -9 -37 -12 -61 -8 -48 2 -132 14 -132 13 0 31 75 31 132 0 36 -5 60 -14 67 -11 10 -15 8 -19 -6z M59156 11436 c-4 -22 -3 -43 2 -48 13 -13 19 11 12 52 l-6 35 -8 -39z M36416 11087 c-22 -33 -44 -129 -56 -246 -13 -130 -13 -171 0 -171 6 0 15 11 20 25 5 13 23 31 39 40 42 21 55 73 55 221 1 88 -3 125 -13 137 -7 10 -17 17 -22 17 -5 0 -15 -10 -23 -23z M59063 11098 c-19 -24 -33 -84 -42 -175 -10 -108 -1 -181 25 -200 10 -7 22 -13 26 -13 19 0 40 79 48 181 8 112 2 178 -20 204 -15 18 -24 19 -37 3z M58905 9905 c-6 -55 3 -171 13 -160 3 3 9 31 13 63 9 60 2 152 -11 152 -4 0 -11 -25 -15 -55z M36270 9894 c0 -34 4 -53 10 -49 6 3 10 28 10 56 0 27 -4 49 -10 49 -5 0 -10 -25 -10 -56z M36196 9662 c-8 -13 -36 -197 -36 -238 0 -18 8 -38 20 -49 19 -17 21 -17 40 0 16 15 20 31 20 89 0 120 -24 229 -44 198z M58831 9585 c-6 -22 -15 -71 -20 -110 -8 -57 -7 -74 5 -92 8 -13 18 -23 23 -23 4 0 16 9 26 20 15 16 17 33 13 102 -3 48 -11 96 -20 113 l-16 30 -11 -40z M58816 9120 c-12 -31 -16 -77 -16 -203 0 -89 -4 -179 -9 -199 -9 -39 -2 -48 38 -48 15 0 19 12 24 68 4 37 9 130 13 208 5 100 3 151 -5 177 -7 20 -16 37 -21 37 -4 0 -15 -18 -24 -40z M36177 9105 c-13 -28 -17 -65 -17 -174 0 -130 -1 -139 -21 -153 -16 -10 -23 -27 -26 -65 -3 -28 -1 -53 4 -56 17 -11 53 23 53 50 0 15 7 34 15 43 9 10 19 54 25 111 16 152 12 279 -9 279 -4 0 -15 -16 -24 -35z M36036 7493 c-10 -11 -7 -343 4 -343 11 0 17 37 24 145 3 44 12 103 19 132 l14 52 -28 10 c-15 5 -30 7 -33 4z M58714 7475 c-8 -20 3 -63 23 -95 16 -23 17 -23 24 -5 4 11 8 41 8 68 1 44 -1 47 -24 47 -14 0 -28 -7 -31 -15z M36027 6615 c-6 -15 6 -101 15 -111 3 -2 11 16 18 42 9 31 10 52 3 62 -14 22 -30 25 -36 7z M58680 6594 c0 -8 5 -12 10 -9 6 4 8 11 5 16 -9 14 -15 11 -15 -7z M58750 6445 c0 -3 2 -5 5 -5 3 0 5 2 5 5 0 3 -2 5 -5 5 -3 0 -5 -2 -5 -5z" style="fill-rule: nonzero;"/>
  </g>
</svg>`
    const HEADER_WORDMARK_DATA_URI = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(HEADER_WORDMARK_SVG)}`
    const applySiteBranding = () => {
      try {
        const siteLogo = document.querySelector(
          "header.sticky .navbar-brand img"
        )
        if (siteLogo) {
          siteLogo.classList.add("userpatch-header-wordmark")
          siteLogo.alt = "4KHDHub"
          siteLogo.removeAttribute("srcset")
          if (siteLogo.getAttribute("src") !== HEADER_WORDMARK_DATA_URI) {
            siteLogo.setAttribute("src", HEADER_WORDMARK_DATA_URI)
          }
        }
        for (const iconLink of document.querySelectorAll('link[rel~="icon"]')) {
          if (iconLink.getAttribute("href") !== FAVICON_DATA_URI) {
            iconLink.type = "image/svg+xml"
            iconLink.removeAttribute("sizes")
            iconLink.setAttribute("href", FAVICON_DATA_URI)
          }
        }
        document
          .querySelectorAll('link[rel="preload"][as="image"][href*="4KHDHUB"]')
          .forEach((link) => link.remove())
      } catch {
        return false
      }
    }

    // src/shared/quality.js
    const QUALITY_LABELS = Object.freeze({
      all: "All",
      "4k": "4K (2160p)",
      hd: "HD (1080p)",
      sd: "SD (720p or 480p)",
    })
    const RELEASE_QUALITY_PATTERNS = [
      ["4k", /(?:^|[^A-Z0-9])(?:2160P|DS4K|RM4K|4K)(?=$|[^A-Z0-9])/i],
      ["hd", /(?:^|[^A-Z0-9])1080P(?=$|[^A-Z0-9])/i],
      ["sd", /(?:^|[^A-Z0-9])(?:720P|480P)(?=$|[^A-Z0-9])/i],
    ]
    const getReleaseQuality = (value) => {
      return (
        RELEASE_QUALITY_PATTERNS.find(([, pattern]) =>
          pattern.test(value)
        )?.[0] || "unknown"
      )
    }

    // src/shared/quality-tabs.js
    const QUALITY_TAB_KEYS = ["all", "4k", "hd", "sd"]
    const setupIndicatorHover = (container, position, onFocus) => {
      const getButton = (target) => {
        const button =
          target instanceof Element ? target.closest("button") : null
        return button && container.contains(button) && !button.disabled
          ? button
          : null
      }
      const onPointerOver = (event) => {
        if (
          (event.pointerType === "mouse" || event.pointerType === "pen") &&
          window.matchMedia("(hover: hover) and (pointer: fine)").matches
        ) {
          const button = getButton(event.target)
          if (button) {
            position(button)
          }
        }
      }
      const restore = () => position()
      const onFocusIn = (event) => {
        const button = getButton(event.target)
        if (button) {
          onFocus?.(button)
          position(button)
        }
      }
      const onFocusOut = (event) => {
        if (
          !(event.relatedTarget instanceof Node) ||
          !container.contains(event.relatedTarget)
        ) {
          restore()
        }
      }
      container.addEventListener("pointerover", onPointerOver)
      container.addEventListener("pointerleave", restore)
      container.addEventListener("focusin", onFocusIn)
      container.addEventListener("focusout", onFocusOut)
      return () => {
        container.removeEventListener("pointerover", onPointerOver)
        container.removeEventListener("pointerleave", restore)
        container.removeEventListener("focusin", onFocusIn)
        container.removeEventListener("focusout", onFocusOut)
      }
    }
    const positionSelectionIndicator = (indicator, container, target, kind) => {
      if (!target || !container.contains(target)) {
        indicator.dataset.ready = "false"
        return
      }
      const containerRect = container.getBoundingClientRect()
      const targetRect = target.getBoundingClientRect()
      if (
        !indicator.offsetWidth ||
        !indicator.offsetHeight ||
        !targetRect.width ||
        !targetRect.height
      ) {
        return
      }
      const scaleX = targetRect.width / indicator.offsetWidth
      const scaleY = targetRect.height / indicator.offsetHeight
      const radius =
        Number.parseFloat(getComputedStyle(target).borderTopLeftRadius) || 12
      const prefix = `--userpatch-${kind}`
      indicator.style.setProperty(
        `${prefix}-x`,
        `${targetRect.left - containerRect.left - container.clientLeft}px`
      )
      indicator.style.setProperty(
        `${prefix}-y`,
        `${targetRect.top - containerRect.top - container.clientTop}px`
      )
      indicator.style.setProperty(`${prefix}-scale-x`, String(scaleX))
      indicator.style.setProperty(`${prefix}-scale-y`, String(scaleY))
      indicator.style.setProperty(`${prefix}-radius-x`, `${radius / scaleX}px`)
      indicator.style.setProperty(`${prefix}-radius-y`, `${radius / scaleY}px`)
      if (indicator.dataset.ready === "true") {
        indicator.dataset.animate = "true"
      }
      indicator.dataset.ready = "true"
    }
    const createQualityTabs = ({ storageKey, onQualityChange }) => {
      const element = document.createElement("div")
      element.className = "userpatch-quality-tabs"
      element.setAttribute("role", "group")
      element.setAttribute("aria-label", "Filter releases by quality")
      const indicator = document.createElement("span")
      indicator.className = "userpatch-quality-indicator"
      indicator.setAttribute("aria-hidden", "true")
      indicator.dataset.ready = "false"
      element.append(indicator)
      const buttons = new Map()
      for (const quality of QUALITY_TAB_KEYS) {
        const button = document.createElement("button")
        button.type = "button"
        button.className = "userpatch-quality-tab"
        button.dataset.quality = quality
        button.dataset.tabContent = quality === "all" ? "label" : "icon"
        button.setAttribute(
          "aria-pressed",
          quality === "all" ? "true" : "false"
        )
        const label = QUALITY_LABELS[quality]
        button.setAttribute("aria-label", label)
        button.title = label
        if (quality === "all") {
          button.textContent = "All"
        } else {
          const icon = document.createElement("img")
          icon.src = USERPATCH_BADGE_DATA[quality]
          icon.alt = ""
          icon.width = 26
          icon.height = 15
          icon.decoding = "async"
          button.append(icon)
        }
        element.append(button)
        buttons.set(quality, button)
      }
      const savedQuality = storageGet(storageKey)
      let activeQuality =
        savedQuality && QUALITY_TAB_KEYS.includes(savedQuality)
          ? savedQuality
          : "all"
      const positionIndicator = (target) => {
        if (!element.hidden) {
          positionSelectionIndicator(
            indicator,
            element,
            target || buttons.get(activeQuality) || buttons.get("all"),
            "quality"
          )
        }
      }
      const positionActiveIndicator = () => {
        positionIndicator()
      }
      const getEventButton = (target) => {
        if (!(target instanceof Element)) {
          return null
        }
        const button = target.closest(".userpatch-quality-tab")
        return button instanceof HTMLElement && element.contains(button)
          ? button
          : null
      }
      const onClick = (event) => {
        const button = getEventButton(event.target)
        if (!button || button.disabled) {
          return
        }
        const newQuality = button.dataset.quality || "all"
        activeQuality = newQuality
        storageSet(storageKey, newQuality)
        for (const [q, btn] of buttons) {
          btn.setAttribute(
            "aria-pressed",
            q === activeQuality ? "true" : "false"
          )
        }
        positionIndicator()
        onQualityChange?.(activeQuality)
      }
      element.addEventListener("click", onClick)
      const cleanupIndicatorHover = setupIndicatorHover(
        element,
        positionIndicator
      )
      element.addEventListener("scroll", positionActiveIndicator, {
        passive: true,
      })
      const resizeObserver =
        typeof ResizeObserver === "undefined"
          ? null
          : new ResizeObserver(positionActiveIndicator)
      resizeObserver?.observe(element)
      for (const button of buttons.values()) {
        resizeObserver?.observe(button)
      }
      if (!resizeObserver) {
        window.addEventListener("resize", positionActiveIndicator)
      }
      const refreshButtons = (availableQualities) => {
        const availableSet =
          availableQualities instanceof Set
            ? availableQualities
            : new Set(availableQualities)
        const saved = storageGet(storageKey)
        if (saved && QUALITY_TAB_KEYS.includes(saved)) {
          if (saved === "all" || availableSet.has(saved)) {
            activeQuality = saved
          } else if (!availableSet.has(activeQuality)) {
            activeQuality = "all"
          }
        } else if (
          activeQuality !== "all" &&
          !availableSet.has(activeQuality)
        ) {
          activeQuality = "all"
        }
        for (const [quality, button] of buttons) {
          const unavailable = quality !== "all" && !availableSet.has(quality)
          button.disabled = unavailable
          if (unavailable) {
            button.dataset.status = "unavailable"
          } else {
            delete button.dataset.status
          }
          button.setAttribute(
            "aria-pressed",
            quality === activeQuality ? "true" : "false"
          )
        }
        positionIndicator()
        return activeQuality
      }
      const cleanup = () => {
        element.removeEventListener("click", onClick)
        cleanupIndicatorHover()
        element.removeEventListener("scroll", positionActiveIndicator)
        if (resizeObserver) {
          resizeObserver.disconnect()
        } else {
          window.removeEventListener("resize", positionActiveIndicator)
        }
      }
      return {
        element,
        getActiveQuality: () => activeQuality,
        positionIndicator,
        refreshButtons,
        cleanup,
      }
    }

    // src/shared/icons.js
    const LUCIDE_ICON_TEMPLATES = new Map()
    const createLucideIcon$1 = (name, shapes, decorate) => {
      const cached = LUCIDE_ICON_TEMPLATES.get(name)
      if (cached) {
        return cached.cloneNode(true)
      }
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
      svg.setAttribute("width", "24")
      svg.setAttribute("height", "24")
      svg.setAttribute("viewBox", "0 0 24 24")
      svg.setAttribute("fill", "none")
      svg.setAttribute("stroke", "currentColor")
      svg.setAttribute("stroke-width", "2")
      svg.setAttribute("stroke-linecap", "round")
      svg.setAttribute("stroke-linejoin", "round")
      svg.setAttribute("aria-hidden", "true")
      svg.setAttribute("focusable", "false")
      if (decorate) {
        decorate(svg, name)
      }
      for (const [tagName, attributes] of shapes[name] || []) {
        const shape = document.createElementNS(
          "http://www.w3.org/2000/svg",
          tagName
        )
        for (const [attribute, value] of Object.entries(attributes)) {
          shape.setAttribute(attribute, value)
        }
        svg.append(shape)
      }
      LUCIDE_ICON_TEMPLATES.set(name, svg)
      return svg.cloneNode(true)
    }

    // src/4khdhub/icons.js
    const LUCIDE_ICON_SHAPES = {
      "external-link": [
        ["path", { d: "M15 3h6v6" }],
        ["path", { d: "M10 14 21 3" }],
        [
          "path",
          { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" },
        ],
      ],
      film: [
        [
          "rect",
          {
            width: "18",
            height: "18",
            x: "3",
            y: "3",
            rx: "2",
          },
        ],
        ["path", { d: "M7 3v18" }],
        ["path", { d: "M3 7.5h4" }],
        ["path", { d: "M3 12h18" }],
        ["path", { d: "M3 16.5h4" }],
        ["path", { d: "M17 3v18" }],
        ["path", { d: "M17 7.5h4" }],
        ["path", { d: "M17 16.5h4" }],
      ],
      "arrow-left": [
        ["path", { d: "m12 19-7-7 7-7" }],
        ["path", { d: "M19 12H5" }],
      ],
      "arrow-right": [
        ["path", { d: "M5 12h14" }],
        ["path", { d: "m12 5 7 7-7 7" }],
      ],
      "arrow-up": [
        ["path", { d: "m5 12 7-7 7 7" }],
        ["path", { d: "M12 19V5" }],
      ],
      "audio-lines": [
        ["path", { d: "M2 10v3" }],
        ["path", { d: "M6 6v11" }],
        ["path", { d: "M10 3v18" }],
        ["path", { d: "M14 8v7" }],
        ["path", { d: "M18 5v13" }],
        ["path", { d: "M22 10v3" }],
      ],
      "chevron-down": [["path", { d: "m6 9 6 6 6-6" }]],
      "chevron-up": [["path", { d: "m18 15-6-6-6 6" }]],
      check: [["path", { d: "m20 6-11 11-5-5" }]],
      clapperboard: [
        ["path", { d: "m12.296 3.464 3.02 3.956" }],
        [
          "path",
          {
            d: "M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.3z",
          },
        ],
        ["path", { d: "M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" }],
        ["path", { d: "m6.18 5.276 3.1 3.899" }],
      ],
      "file-archive": [
        [
          "path",
          {
            d: "M13.659 22H18a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v11.5",
          },
        ],
        ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5" }],
        ["path", { d: "M8 12v-1" }],
        ["path", { d: "M8 18v-2" }],
        ["path", { d: "M8 7V6" }],
        [
          "circle",
          {
            cx: "8",
            cy: "20",
            r: "2",
          },
        ],
      ],
      "file-play": [
        [
          "path",
          {
            d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
          },
        ],
        ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5" }],
        [
          "path",
          {
            d: "M15.033 13.44a.647.647 0 0 1 0 1.12l-4.065 2.352a.645.645 0 0 1-.968-.56v-4.704a.645.645 0 0 1 .967-.56z",
          },
        ],
      ],
      download: [
        ["path", { d: "M12 15V3" }],
        ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }],
        ["path", { d: "m7 10 5 5 5-5" }],
      ],
      house: [
        ["path", { d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" }],
        [
          "path",
          {
            d: "M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
          },
        ],
      ],
      info: [
        [
          "circle",
          {
            cx: "12",
            cy: "12",
            r: "10",
          },
        ],
        ["path", { d: "M12 16v-4" }],
        ["path", { d: "M12 8h.01" }],
      ],
      menu: [
        ["path", { d: "M4 5h16" }],
        ["path", { d: "M4 12h16" }],
        ["path", { d: "M4 19h16" }],
      ],
      moon: [
        [
          "path",
          {
            d: "M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401",
          },
        ],
      ],
      play: [
        [
          "path",
          {
            d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",
          },
        ],
      ],
      search: [
        ["path", { d: "m21 21-4.34-4.34" }],
        [
          "circle",
          {
            cx: "11",
            cy: "11",
            r: "8",
          },
        ],
      ],
      tv: [
        ["path", { d: "m17 2-5 5-5-5" }],
        [
          "rect",
          {
            width: "20",
            height: "15",
            x: "2",
            y: "7",
            rx: "2",
          },
        ],
      ],
      x: [
        ["path", { d: "M18 6 6 18" }],
        ["path", { d: "m6 6 12 12" }],
      ],
    }
    const LUCIDE_ICON_RULES = [
      ["#menu-toggle svg", "menu"],
      ["#search-toggle svg, .search-icon, .search-icon-overlay", "search"],
      ["#theme-toggle .theme-icon", "moon"],
      [
        "#close-mobile-menu svg, #close-search svg, #close-trailer svg, #search-overlay .close-button svg",
        "x",
      ],
      [".nav-link.dropdown-toggle svg, .dropdown-indicator", "chevron-down"],
      [".breadcrumb svg", "arrow-left"],
      ["#play-btn svg, #trailer-btn svg", "play"],
      [
        ".download-header .chevron-icon, .series-season-toggle .chevron-icon",
        "chevron-down",
      ],
      [
        ".download-item a.btn .responsive-icon, .episode-links a.btn .responsive-icon",
        "download",
      ],
      ['#series-tabs .series-tab[data-tab="episodes"] svg', "clapperboard"],
      [".content-main .info-box > div:first-child > svg", "info"],
      [".pagination-next svg, a[rel='next'] svg", "arrow-right"],
      [
        ".pagination-prev svg, .pagination-previous svg, a[rel='prev'] svg",
        "arrow-left",
      ],
      ["#back-to-top svg", "arrow-up"],
    ]
    const applyLucideIcon = (svg, name) => {
      if (svg.dataset.userpatchLucideIcon === name) {
        return
      }
      const replacement = createLucideIcon(name)
      svg.replaceChildren(...replacement.childNodes)
      for (const attribute of [
        "width",
        "height",
        "viewBox",
        "fill",
        "stroke",
        "stroke-width",
        "stroke-linecap",
        "stroke-linejoin",
        "aria-hidden",
        "focusable",
      ]) {
        svg.setAttribute(attribute, replacement.getAttribute(attribute))
      }
      svg.dataset.userpatchLucideIcon = name
    }
    const normalizeLucideIcons = (root = document) => {
      const isSeriesDetail = Boolean(
        root.querySelector("#series-tabs") &&
        root.querySelector("#complete-pack, #episodes")
      )
      for (const [selector, name] of LUCIDE_ICON_RULES) {
        if (isSeriesDetail && selector.includes(".download-item a.btn")) {
          continue
        }
        for (const svg of root.querySelectorAll(selector)) {
          applyLucideIcon(svg, name)
        }
      }
    }
    const createLucideIcon = (name) =>
      createLucideIcon$1(name, LUCIDE_ICON_SHAPES)

    // src/4khdhub/detail-tabs.js
    const captureDetailInfo = (main, titleContainer) => {
      if (main.querySelector(":scope > .userpatch-detail-info")) {
        return
      }
      const pane = document.createElement("section")
      pane.className = "userpatch-detail-info"
      pane.hidden = true
      const entries = [
        [
          "Tagline",
          titleContainer?.querySelector(".movie-tagline")?.textContent,
        ],
        ["Description", main.querySelector(".detail-description")?.textContent],
      ]
      for (const item of main.querySelectorAll(
        ".metadata-list .metadata-item"
      )) {
        const label = item
          .querySelector(".metadata-label")
          ?.textContent.trim()
          .replace(/:$/, "")
        const value = item.querySelector(".metadata-value")
        if (!label || !value) {
          continue
        }
        const tokens = Array.from(value.querySelectorAll(".metadata-token"))
        const text = tokens.length
          ? tokens.map((token) => token.textContent.trim()).join(", ")
          : value.textContent
        entries.push([
          label,
          label.toLowerCase() === "audios"
            ? text.replaceAll(/\s*\|\s*/g, " | ")
            : text,
        ])
      }
      pane.append(createDetailInfoList(entries))
      const trailer = createTrailer(findTrailerUrl(main))
      if (trailer) {
        pane.append(trailer)
      }
      main.append(pane)
      const screenshots = document.createElement("section")
      screenshots.className = "userpatch-detail-screenshots"
      screenshots.hidden = true
      for (const section of main.querySelectorAll(".content-section")) {
        const heading = section.querySelector(".section-title")
        if (
          !/screenshots?/i.test(heading?.textContent || "") ||
          !section.querySelector("img") ||
          section.querySelector(".download-item, #series-tabs")
        ) {
          continue
        }
        screenshots.append(section)
      }
      if (screenshots.children.length) {
        main.append(screenshots)
      }
    }
    const ensureDetailTabs = (siteRoot) => {
      const main = siteRoot.querySelector(
        ".content-main.userpatch-release-main"
      )
      const toolbar = main?.querySelector(":scope > .userpatch-release-toolbar")
      const info = main?.querySelector(":scope > .userpatch-detail-info")
      if (
        !toolbar ||
        !info ||
        toolbar.querySelector(".userpatch-detail-tabs")
      ) {
        return
      }
      const screenshots = main.querySelector(
        ":scope > .userpatch-detail-screenshots"
      )
      const group = document.createElement("div")
      group.className = "userpatch-quality-tabs userpatch-detail-tabs"
      group.setAttribute("role", "group")
      group.setAttribute("aria-label", "Switch detail sections")
      const indicator = document.createElement("span")
      indicator.className = "userpatch-quality-indicator"
      indicator.setAttribute("aria-hidden", "true")
      group.append(indicator)
      const buttons = new Map()
      const positionIndicator = (target) => {
        const selected = [...buttons.values()].find(
          (button) => button.getAttribute("aria-pressed") === "true"
        )
        positionSelectionIndicator(
          indicator,
          group,
          target || selected,
          "quality"
        )
      }
      const releasePanels = Array.from(main.children).filter(
        (node) =>
          node !== info &&
          node !== toolbar &&
          (node.classList.contains("userpatch-movie-releases") ||
            node.querySelector("#complete-pack, #episodes") ||
            node.id === "complete-pack" ||
            node.id === "episodes")
      )
      const select = (value) => {
        info.hidden = value !== "info"
        if (screenshots) {
          screenshots.hidden = value !== "screenshot"
        }
        for (const panel of releasePanels) {
          panel.hidden = value !== "links"
        }
        for (const control of toolbar.children) {
          if (control !== group) {
            control.hidden = value !== "links"
          }
        }
        for (const filter of main.querySelectorAll(
          ":scope > .userpatch-movie-releases > .userpatch-quality-tabs"
        )) {
          filter.hidden = value !== "links"
        }
        for (const [key, button] of buttons) {
          button.setAttribute("aria-pressed", String(key === value))
        }
        positionIndicator(buttons.get(value))
      }
      for (const [value, label] of [
        ["info", "Info"],
        ...(screenshots ? [["screenshot", "Screenshot"]] : []),
        ["links", "Links"],
      ]) {
        const button = document.createElement("button")
        button.type = "button"
        button.className = "userpatch-quality-tab"
        button.dataset.tabContent = "label"
        const text = document.createElement("span")
        text.textContent = label
        const icons = {
          info: "info",
          screenshot: "film",
          links: "download",
        }
        button.append(text, createLucideIcon(icons[value]))
        button.addEventListener("click", () => {
          storageSet(CONFIG.storageKeys.detailTab, value)
          select(value)
        })
        buttons.set(value, button)
        group.append(button)
      }
      toolbar.prepend(group)
      setupIndicatorHover(group, positionIndicator)
      const savedTab = storageGet(CONFIG.storageKeys.detailTab)
      select(buttons.has(savedTab) ? savedTab : "info")
      document.fonts?.ready.then(() => {
        if (group.isConnected) {
          const active = [...buttons.values()].find(
            (button) => button.getAttribute("aria-pressed") === "true"
          )
          positionSelectionIndicator(indicator, group, active, "quality")
        }
      })
    }

    // src/4khdhub/poster-badges.js
    const getFilenameBadgeNames = (siteRoot) => {
      const filenames = Array.from(siteRoot.querySelectorAll(".download-item"))
        .map((item) => {
          const filename =
            item.dataset.userpatchFilename ||
            item.querySelector(".file-title")?.textContent?.trim()
          const title = item
            .querySelector(".download-title-text")
            ?.textContent?.trim()
          const groupTitle = item
            .closest(".download-group")
            ?.querySelector(".download-group-title")
            ?.textContent?.trim()
          return filename || title || groupTitle || ""
        })
        .filter(Boolean)
      const allNames = filenames.join(" ").toUpperCase()
      const hasToken = (token) =>
        new RegExp(`(?:^|[^A-Z0-9])${token}(?=$|[^A-Z0-9])`).test(allNames)
      const hasAnyToken = (tokens) => tokens.some(hasToken)
      const badges = []
      for (const [badge, pattern] of RELEASE_QUALITY_PATTERNS) {
        if (pattern.test(allNames)) {
          badges.push(badge)
        }
      }
      if (hasToken("IMAX")) {
        badges.push("imax")
      }
      if (hasAnyToken(["HDR10P", "HDR10PLUS", "HDRP10\\+", "HDR10\\+"])) {
        badges.push("hdr10-plus")
      } else if (hasAnyToken(["HDR", "HDR10"])) {
        badges.push("hdr")
      }
      if (hasToken("AV1")) {
        badges.push("av1")
      }
      const hasDolbyVision = hasAnyToken(["DV", "DOVI"])
      const hasAtmos = hasToken("ATMOS")
      const hasDtsX = /(?:^|[^A-Z0-9])DTS(?:[:._ -]*X)(?=$|[^A-Z0-9])/.test(
        allNames
      )
      const hasDts = hasToken("DTS") || hasDtsX
      const hasDolby =
        hasAnyToken(["DOLBY", "AC3", "EAC3"]) ||
        /(?:^|[^A-Z0-9])DDP?(?=$|[^A-Z0-9])/.test(allNames) ||
        /(?:^|[^A-Z0-9])DDP[0-9]/.test(allNames)
      if (hasDolbyVision) {
        badges.push("dolby-vision")
      }
      if (hasAtmos) {
        badges.push("dolby-atmos")
      } else if (hasDolby && !hasDts) {
        badges.push("dolby-audio")
      }
      if (hasDtsX) {
        badges.push("dts-x")
      } else if (hasDts) {
        badges.push("dts")
      }
      return badges
    }
    const updatePosterBadges = (siteRoot) => {
      const stack = siteRoot.querySelector(".userpatch-detail-stack")
      if (!stack) {
        return
      }
      let badgeList = stack.querySelector(":scope > .userpatch-poster-badges")
      if (!badgeList) {
        badgeList = document.createElement("div")
        badgeList.className = "userpatch-poster-badges"
        badgeList.setAttribute("role", "list")
        badgeList.setAttribute("aria-label", "Release format badges")
        stack.append(badgeList)
      }
      const badges = getFilenameBadgeNames(siteRoot)
      badgeList.replaceChildren(
        ...badges.map((name) => {
          const item = document.createElement("span")
          item.className = "userpatch-media-badge"
          item.setAttribute("role", "listitem")
          item.title = POSTER_BADGE_LABELS[name]
          const image = document.createElement("img")
          image.src = USERPATCH_BADGE_DATA[name]
          image.alt = POSTER_BADGE_LABELS[name]
          image.width = 52
          image.height = 22
          image.decoding = "async"
          image.style.aspectRatio = POSTER_BADGE_ASPECT_RATIOS[name]
          item.append(image)
          return item
        })
      )
      badgeList.hidden = badges.length === 0
      const imdbScore = stack.querySelector(":scope > .userpatch-imdb-score")
      if (imdbScore) {
        imdbScore.before(badgeList)
      } else {
        stack.append(badgeList)
      }
    }

    // src/4khdhub/detail-layout.js
    const removeRelatedMoviesSection = (siteRoot) => {
      for (const heading of siteRoot.querySelectorAll(".section-title")) {
        if (heading.textContent.trim().toLowerCase() !== "you may also like") {
          continue
        }
        const section = heading.closest(".mt-12")
        if (section?.querySelector(".card-grid-small")) {
          section.remove()
        }
      }
    }
    const applyDetailPageLayout = (siteRoot) => {
      try {
        const grid = siteRoot.querySelector(".content-grid")
        const sidebar = grid?.querySelector(":scope > .content-sidebar")
        const poster = sidebar?.querySelector(".poster-container")
        const main = grid?.querySelector(":scope > .content-main")
        const title =
          main?.querySelector(".page-title") ||
          sidebar?.querySelector(".userpatch-detail-title")
        if (!grid || !sidebar || !main || !poster || !title) {
          return false
        }
        for (const breadcrumb of siteRoot.querySelectorAll(".breadcrumb")) {
          breadcrumb.remove()
        }
        const titleContainer = title.parentElement
        captureDetailInfo(main, titleContainer)
        const score = titleContainer
          ?.querySelector(".imdb-badge .imdb-score")
          ?.textContent?.trim()
        const legacyPanel = sidebar.querySelector(
          ":scope > .userpatch-poster-panel"
        )
        if (legacyPanel) {
          const oldBrand = legacyPanel.querySelector(
            ":scope > .userpatch-detail-brand"
          )
          if (oldBrand) {
            sidebar.prepend(oldBrand)
          }
          const oldPoster = legacyPanel.querySelector(".poster-container")
          if (oldPoster && oldPoster !== poster) {
            sidebar.append(oldPoster)
          }
          legacyPanel.remove()
        }
        let stack = sidebar.querySelector(":scope > .userpatch-detail-stack")
        if (!stack) {
          stack = document.createElement("div")
          stack.className = "userpatch-detail-stack"
          sidebar.prepend(stack)
        }
        let brand =
          stack.querySelector(":scope > .userpatch-detail-brand") ||
          sidebar.querySelector(":scope > .userpatch-detail-brand")
        if (!brand) {
          brand = document.createElement("a")
          brand.className = "userpatch-detail-brand"
          brand.href = "/"
          brand.dataset.noSwup = ""
          brand.setAttribute("aria-label", "4KHDHub home")
          const image = document.createElement("img")
          image.src = HEADER_WORDMARK_DATA_URI
          image.alt = "4KHDHub"
          image.width = 1100
          image.height = 388
          image.decoding = "async"
          brand.append(image)
        }
        stack.prepend(brand)
        stack.append(poster)
        title.classList.remove("page-title")
        title.classList.add("userpatch-detail-title")
        stack.append(title)
        let scoreLine = stack.querySelector(":scope > .userpatch-imdb-score")
        if (score) {
          if (!scoreLine) {
            scoreLine = document.createElement("div")
            scoreLine.className = "userpatch-imdb-score"
            scoreLine.setAttribute("aria-label", `IMDb rating ${score}`)
            const image = document.createElement("img")
            image.src = IMDB_PRIMARY_LOGO_DATA_URI
            image.alt = "IMDb"
            image.width = 44
            image.height = 17
            image.decoding = "async"
            const rating = document.createElement("span")
            rating.className = "userpatch-imdb-rating"
            scoreLine.append(image, rating)
          }
          scoreLine.querySelector(".userpatch-imdb-rating").textContent = score
        }
        if (scoreLine) {
          title.after(scoreLine)
        }
        if (
          titleContainer &&
          titleContainer !== main &&
          main.contains(titleContainer) &&
          !titleContainer.querySelector(".download-item, #series-tabs")
        ) {
          titleContainer.remove()
        }
        for (const section of main.querySelectorAll(".content-section")) {
          if (
            !section.querySelector(".download-item, #series-tabs") &&
            section.querySelector(
              "#play-btn, #trailer-btn, .detail-description, .metadata-list"
            )
          ) {
            section.remove()
          }
        }
        for (const heading of main.querySelectorAll(".section-title")) {
          if (heading.textContent.trim().toLowerCase() === "download links") {
            heading.remove()
          }
        }
        removeRelatedMoviesSection(siteRoot)
        updatePosterBadges(siteRoot)
        return true
      } catch {
        return false
      }
    }

    // src/shared/dom.js
    const normalizePathname = (path) => {
      try {
        return new URL(path, location.href).pathname.replace(/\/+$/, "") || "/"
      } catch {
        return ""
      }
    }

    // src/shared/provider-tooltip.js
    const setupProviderTooltip = (root) => {
      const tooltip = document.createElement("div")
      tooltip.id = "userpatch-provider-tooltip"
      tooltip.className = "userpatch-provider-tooltip"
      tooltip.setAttribute("role", "tooltip")
      tooltip.setAttribute("aria-hidden", "true")
      tooltip.hidden = true
      document.body.append(tooltip)
      let hoveredTrigger = null
      let focusedTrigger = null
      let activeTrigger = null
      let openFrame = 0
      let closeTimer = 0
      const getTrigger = (target) => {
        if (!(target instanceof Element)) {
          return null
        }
        const trigger = target.closest(
          ".userpatch-provider-link, .userpatch-hblinks-action"
        )
        return trigger instanceof HTMLElement && root.contains(trigger)
          ? trigger
          : null
      }
      const positionTooltip = () => {
        if (!activeTrigger?.isConnected) {
          return
        }
        const triggerRect = activeTrigger.getBoundingClientRect()
        const tooltipRect = tooltip.getBoundingClientRect()
        if (
          triggerRect.bottom < 0 ||
          triggerRect.top > window.innerHeight ||
          triggerRect.right < 0 ||
          triggerRect.left > window.innerWidth
        ) {
          closeTooltip()
          return
        }
        const offset = 8
        const side =
          triggerRect.top >= tooltipRect.height + offset ? "top" : "bottom"
        const halfWidth = tooltipRect.width / 2
        const center = triggerRect.left + triggerRect.width / 2
        const left = Math.min(
          Math.max(center, halfWidth + 4),
          window.innerWidth - halfWidth - 4
        )
        const top =
          side === "top"
            ? triggerRect.top - tooltipRect.height - offset
            : triggerRect.bottom + offset
        tooltip.dataset.side = side
        tooltip.style.left = `${left}px`
        tooltip.style.top = `${Math.max(4, top)}px`
      }
      const closeTooltip = () => {
        if (!activeTrigger) {
          return
        }
        activeTrigger.removeAttribute("aria-describedby")
        activeTrigger = null
        tooltip.dataset.state = "closed"
        tooltip.setAttribute("aria-hidden", "true")
        window.clearTimeout(closeTimer)
        closeTimer = window.setTimeout(() => {
          if (!activeTrigger) {
            tooltip.hidden = true
          }
        }, 140)
      }
      const syncTooltip = () => {
        const nextTrigger = hoveredTrigger || focusedTrigger
        if (!nextTrigger) {
          closeTooltip()
          return
        }
        window.clearTimeout(closeTimer)
        if (activeTrigger !== nextTrigger) {
          activeTrigger?.removeAttribute("aria-describedby")
          activeTrigger = nextTrigger
          tooltip.textContent = nextTrigger.dataset.tooltip || ""
          nextTrigger.setAttribute("aria-describedby", tooltip.id)
        }
        tooltip.hidden = false
        tooltip.setAttribute("aria-hidden", "false")
        positionTooltip()
        window.cancelAnimationFrame(openFrame)
        openFrame = window.requestAnimationFrame(() => {
          if (activeTrigger === nextTrigger) {
            tooltip.dataset.state = "open"
          }
        })
      }
      const onPointerOver = (event) => {
        if (
          (event.pointerType !== "mouse" && event.pointerType !== "pen") ||
          !window.matchMedia("(hover: hover) and (pointer: fine)").matches
        ) {
          return
        }
        const trigger = getTrigger(event.target)
        if (!trigger || trigger.contains(event.relatedTarget)) {
          return
        }
        hoveredTrigger = trigger
        syncTooltip()
      }
      const onPointerOut = (event) => {
        const trigger = getTrigger(event.target)
        if (
          !trigger ||
          trigger !== hoveredTrigger ||
          trigger.contains(event.relatedTarget)
        ) {
          return
        }
        hoveredTrigger = null
        syncTooltip()
      }
      const onFocusIn = (event) => {
        focusedTrigger = getTrigger(event.target)
        if (focusedTrigger) {
          syncTooltip()
        }
      }
      const onFocusOut = (event) => {
        const trigger = getTrigger(event.target)
        if (
          trigger &&
          trigger === focusedTrigger &&
          !trigger.contains(event.relatedTarget)
        ) {
          focusedTrigger = null
          syncTooltip()
        }
      }
      const onProviderClick = (event) => {
        if (event.type === "auxclick" && event.button !== 1) {
          return
        }
        const trigger = getTrigger(event.target)
        if (!trigger) {
          return
        }
        const item = trigger.closest(".userpatch-release-item")
        const row =
          trigger.closest(".userpatch-release-row") ||
          item?.querySelector(".userpatch-release-row")
        markReleaseOpened(row, item)
        const filename = item?.dataset.userpatchFilename
        const href = trigger instanceof HTMLAnchorElement ? trigger.href : ""
        saveOpenedRelease(filename, href)
      }
      root.addEventListener("click", onProviderClick, true)
      root.addEventListener("auxclick", onProviderClick, true)
      root.addEventListener("pointerover", onPointerOver)
      root.addEventListener("pointerout", onPointerOut)
      root.addEventListener("focusin", onFocusIn)
      root.addEventListener("focusout", onFocusOut)
      window.addEventListener("resize", positionTooltip)
      document.addEventListener("scroll", positionTooltip, true)
      return () => {
        root.removeEventListener("click", onProviderClick, true)
        root.removeEventListener("auxclick", onProviderClick, true)
        root.removeEventListener("pointerover", onPointerOver)
        root.removeEventListener("pointerout", onPointerOut)
        root.removeEventListener("focusin", onFocusIn)
        root.removeEventListener("focusout", onFocusOut)
        window.removeEventListener("resize", positionTooltip)
        document.removeEventListener("scroll", positionTooltip, true)
        window.cancelAnimationFrame(openFrame)
        window.clearTimeout(closeTimer)
        activeTrigger?.removeAttribute("aria-describedby")
        tooltip.remove()
      }
    }

    // src/4khdhub/dom.js
    const normalizeText = (value) =>
      (value || "").replaceAll(/\s+/g, " ").trim()

    // src/4khdhub/filename.js
    const filenameResizeHandlers = new Map()
    const pendingFilenameMeasurements = new Map()
    let releaseFilenameCleanups = []
    let filenameIntersectionObserver = null
    let filenameResizeObserver = null
    let filenameMeasurementFrame = 0
    let filenameFallbackResizeBound = false
    const scheduleFilenameMeasurement = (element, update) => {
      pendingFilenameMeasurements.set(element, update)
      if (filenameMeasurementFrame) {
        return
      }
      const flush = () => {
        filenameMeasurementFrame = 0
        let processed = 0
        for (const [target, callback] of pendingFilenameMeasurements) {
          pendingFilenameMeasurements.delete(target)
          if (target.isConnected) {
            callback()
          }
          processed += 1
          if (processed >= CONFIG.filenameMeasureBatchSize) {
            break
          }
        }
        if (pendingFilenameMeasurements.size) {
          filenameMeasurementFrame = window.requestAnimationFrame(flush)
        }
      }
      filenameMeasurementFrame = window.requestAnimationFrame(flush)
    }
    const ensureFilenameResizeObserver = () => {
      if (filenameResizeObserver || typeof ResizeObserver === "undefined") {
        return
      }
      filenameResizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const update = filenameResizeHandlers.get(entry.target)
          if (update) {
            scheduleFilenameMeasurement(entry.target, update)
          }
        }
      })
    }
    const onFilenameWindowResize = () => {
      for (const [element, update] of filenameResizeHandlers) {
        scheduleFilenameMeasurement(element, update)
      }
    }
    const observeFilenameSize = (element) => {
      const update = filenameResizeHandlers.get(element)
      if (!update) {
        return
      }
      if (filenameResizeObserver) {
        filenameResizeObserver.observe(element)
      } else if (!filenameFallbackResizeBound) {
        window.addEventListener("resize", onFilenameWindowResize)
        filenameFallbackResizeBound = true
      }
      scheduleFilenameMeasurement(element, update)
    }
    const observeFilenameResize = (element, update) => {
      filenameResizeHandlers.set(element, update)
      ensureFilenameResizeObserver()
      if (typeof IntersectionObserver === "undefined") {
        observeFilenameSize(element)
      } else {
        filenameIntersectionObserver ||= new IntersectionObserver(
          (entries) => {
            for (const entry of entries) {
              if (!entry.isIntersecting) {
                continue
              }
              filenameIntersectionObserver.unobserve(entry.target)
              observeFilenameSize(entry.target)
            }
          },
          { rootMargin: CONFIG.filenameMeasureRootMargin }
        )
        filenameIntersectionObserver.observe(element)
      }
      return () => {
        filenameIntersectionObserver?.unobserve(element)
        filenameResizeObserver?.unobserve(element)
        filenameResizeHandlers.delete(element)
        pendingFilenameMeasurements.delete(element)
        if (!filenameResizeHandlers.size) {
          filenameIntersectionObserver?.disconnect()
          filenameIntersectionObserver = null
          filenameResizeObserver?.disconnect()
          filenameResizeObserver = null
          window.cancelAnimationFrame(filenameMeasurementFrame)
          filenameMeasurementFrame = 0
          window.removeEventListener("resize", onFilenameWindowResize)
          filenameFallbackResizeBound = false
        }
      }
    }
    const setupExpandableFilename = (container, value) => {
      const text = document.createElement("span")
      text.className = "userpatch-release-file-text"
      text.textContent = value
      const toggle = document.createElement("button")
      toggle.type = "button"
      toggle.className = "userpatch-filename-toggle"
      toggle.setAttribute("aria-expanded", "false")
      toggle.textContent = "See more"
      toggle.hidden = true
      let isExpanded = false
      let measuredWidth = 0
      let measuredLineHeight = 0
      let measuredClampLines = 0
      const mobileClampBreakpoint = window.matchMedia(
        `(max-width: ${CONFIG.mobileLayoutBreakpointRem}rem)`
      )
      const filenameFontSizeBreakpoint = window.matchMedia("(min-width: 761px)")
      const updateOverflowState = () => {
        if (
          isExpanded ||
          !container.isConnected ||
          !text.getClientRects().length
        ) {
          return
        }
        const style = getComputedStyle(container)
        const width = container.getBoundingClientRect().width
        const fontSize = Number.parseFloat(style.fontSize) || 14
        const lineHeight =
          Number.parseFloat(style.lineHeight) ||
          fontSize * CONFIG.filenameLineHeight
        const clampLines = mobileClampBreakpoint.matches
          ? CONFIG.mobileFilenameClampLines
          : CONFIG.filenameClampLines
        if (
          width <= 0 ||
          (Math.abs(width - measuredWidth) < 0.5 &&
            Math.abs(lineHeight - measuredLineHeight) < 0.5 &&
            clampLines === measuredClampLines)
        ) {
          return
        }
        measuredWidth = width
        measuredLineHeight = lineHeight
        measuredClampLines = clampLines
        toggle.hidden = true
        delete container.dataset.clamped
        text.textContent = value
        const maxHeight = lineHeight * clampLines
        container.style.setProperty(
          "--userpatch-filename-max-block-size",
          `${maxHeight}px`
        )
        if (container.scrollHeight <= maxHeight + 0.5) {
          return
        }
        container.dataset.clamped = "true"
        toggle.hidden = false
        toggle.textContent = "See more"
        const characters = Array.from(value)
        const clampBottom = container.getBoundingClientRect().top + maxHeight
        const toggleFits = () => {
          const toggleRect = toggle.getBoundingClientRect()
          return (
            toggle.getClientRects().length > 0 &&
            toggleRect.bottom <= clampBottom + 0.5
          )
        }
        let low = 0
        let high = characters.length
        while (low < high) {
          const middle = Math.ceil((low + high) / 2)
          text.textContent = `${characters.slice(0, middle).join("")}…`
          if (toggleFits()) {
            low = middle
          } else {
            high = middle - 1
          }
        }
        text.textContent = `${characters.slice(0, low).join("")}…`
        if (!toggleFits() && low > 0) {
          let fittingLength = 0
          let fittingLimit = low - 1
          while (fittingLength < fittingLimit) {
            const middle = Math.ceil((fittingLength + fittingLimit) / 2)
            text.textContent = `${characters.slice(0, middle).join("")}…`
            if (toggleFits()) {
              fittingLength = middle
            } else {
              fittingLimit = middle - 1
            }
          }
          low = fittingLength
          text.textContent = `${characters.slice(0, low).join("")}…`
        }
      }
      const onToggle = (event) => {
        event.stopPropagation()
        isExpanded = !isExpanded
        container.toggleAttribute("data-expanded", isExpanded)
        toggle.textContent = isExpanded ? "See less" : "See more"
        toggle.setAttribute("aria-expanded", String(isExpanded))
        if (isExpanded) {
          delete container.dataset.clamped
          text.textContent = value
        } else {
          measuredWidth = 0
          updateOverflowState()
        }
      }
      const onClampBreakpointChange = () => {
        measuredWidth = 0
        measuredLineHeight = 0
        measuredClampLines = 0
        updateOverflowState()
      }
      toggle.addEventListener("click", onToggle)
      mobileClampBreakpoint.addEventListener("change", onClampBreakpointChange)
      filenameFontSizeBreakpoint.addEventListener(
        "change",
        onClampBreakpointChange
      )
      container.replaceChildren(text, toggle)
      const cleanupResize = observeFilenameResize(
        container,
        updateOverflowState
      )
      document.fonts?.ready.then(() => {
        if (container.isConnected && !isExpanded) {
          measuredWidth = 0
          updateOverflowState()
        }
      })
      return () => {
        cleanupResize()
        mobileClampBreakpoint.removeEventListener(
          "change",
          onClampBreakpointChange
        )
        filenameFontSizeBreakpoint.removeEventListener(
          "change",
          onClampBreakpointChange
        )
        toggle.removeEventListener("click", onToggle)
      }
    }
    const clearReleaseFilenameMeasurements = () => {
      for (const cleanup of releaseFilenameCleanups) {
        cleanup()
      }
      releaseFilenameCleanups = []
    }
    const pruneReleaseFilenameCleanups = (filenameCleanups) => {
      releaseFilenameCleanups = releaseFilenameCleanups.filter(
        (cleanup) => !filenameCleanups.includes(cleanup)
      )
    }

    // src/shared/provider-logos.js
    const makeSvgDataUri = (svg) =>
      `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
    const HUBCLOUD_LOGO_SVG = String.raw`<svg xmlns="http://www.w3.org/2000/svg" viewBox="-0.043 0.659 177.311 122.029" width="177" height="123">
  <defs>
    <linearGradient id="grad-left" gradientUnits="userSpaceOnUse" x1="31.00" y1="47.00" x2="11.00" y2="117.00">
      <stop offset="0" stop-color="#00aaef"/>
      <stop offset="1" stop-color="#0084e9"/>
    </linearGradient>
    <linearGradient id="grad-cyan" gradientUnits="userSpaceOnUse" x1="82.00" y1="-6.00" x2="59.60" y2="101.00">
      <stop offset="0" stop-color="#00f1f2"/>
      <stop offset="1" stop-color="#00a5ec"/>
    </linearGradient>
    <linearGradient id="grad-mid" gradientUnits="userSpaceOnUse" x1="138.00" y1="0.00" x2="65.30" y2="103.00">
      <stop offset="0" stop-color="#00d5f2"/>
      <stop offset="1" stop-color="#0064e3"/>
    </linearGradient>
    <linearGradient id="grad-white" gradientUnits="userSpaceOnUse" x1="123.00" y1="51.00" x2="123.00" y2="121.00" gradientTransform="matrix(1, 0, 0, 1.001083, 0, -0.055333)">
      <stop offset="0" stop-color="#fcfafb"/>
      <stop offset="1" stop-color="#f7f7f7"/>
    </linearGradient>
    <path id="left-blue-path" d="M 39.20 44.60 A 38.99 38.99 0 0 0 33.22 122.10 L 71.00 122.10 L 71.00 44.60 Z"/>
    <path id="cyan-dome-path" d="M 128.40 27.85 C 118.50 11.20, 100.50 0.93, 82.50 1.05 C 53.60 0.02, 28.14 26.14, 27.57 54.50 C 26.56 70.83, 36.41 86.79, 51.31 93.50 C 58.00 96.40, 66.00 98.00, 78.00 98.60 L 113.00 69.00 Z"/>
    <path id="mid-blue-path" d="M 131.80 27.73 L 128.40 27.85 C 99.62 27.66, 73.17 48.02, 63.30 74.50 C 57.02 89.28, 56.34 107.24, 64.40 122.10 L 145.00 122.10 L 169.17 98.00 A 45.07 45.07 0 0 0 131.80 27.73 Z"/>
    <path id="white-cloud-path" d="M 96.00 122.05 C 83.84 120.65, 73.97 109.64, 73.33 96.30 A 24.98 24.98 0 0 1 96.06 71.41 A 28.49 28.49 0 0 1 150.56 71.19 A 25.30 25.30 0 0 1 168.43 102.55 A 28.55 28.55 0 0 1 143.00 122.05 Z"/>
    <clipPath id="blue-silhouette">
      <path d="M 39.20 44.60 A 38.99 38.99 0 0 0 33.22 122.10 L 71.00 122.10 L 71.00 44.60 Z"/>
      <path d="M 128.40 27.85 C 118.50 11.20, 100.50 0.93, 82.50 1.05 C 53.60 0.02, 28.14 26.14, 27.57 54.50 C 26.56 70.83, 36.41 86.79, 51.31 93.50 C 58.00 96.40, 66.00 98.00, 78.00 98.60 L 113.00 69.00 Z"/>
      <path d="M 131.80 27.73 L 128.40 27.85 C 99.62 27.66, 73.17 48.02, 63.30 74.50 C 57.02 89.28, 56.34 107.24, 64.40 122.10 L 145.00 122.10 L 169.17 98.00 A 45.07 45.07 0 0 0 131.80 27.73 Z"/>
    </clipPath>
    <filter id="white-shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="1.1" result="blur"/>
      <feOffset in="blur" dx="-0.6" dy="-0.2" result="offsetBlur"/>
      <feFlood flood-color="#001950" flood-opacity="0.42" result="shadowColor"/>
      <feComposite in="shadowColor" in2="offsetBlur" operator="in"/>
    </filter>
  </defs>
  <path d="M 39.20 44.60 A 38.99 38.99 0 0 0 33.22 122.10 L 71.00 122.10 L 71.00 44.60 Z" fill="url(#grad-left)"/>
  <path d="M 128.40 27.85 C 118.50 11.20, 100.50 0.93, 82.50 1.05 C 53.60 0.02, 28.14 26.14, 27.57 54.50 C 26.56 70.83, 36.41 86.79, 51.31 93.50 C 58.00 96.40, 66.00 98.00, 78.00 98.60 L 113.00 69.00 Z" fill="url(#grad-cyan)"/>
  <path d="M 131.80 27.73 L 128.40 27.85 C 99.62 27.66, 73.17 48.02, 63.30 74.50 C 57.02 89.28, 56.34 107.24, 64.40 122.10 L 145.00 122.10 L 169.17 98.00 A 45.07 45.07 0 0 0 131.80 27.73 Z" fill="url(#grad-mid)"/>
  <path d="M 58.52 95.50 C 64.00 97.40, 70.00 98.20, 79.00 98.80 L 90.00 122.10 L 64.40 122.10 C 59.92 113.83, 58.14 104.61, 58.52 95.50 Z" fill="#005fd8"/>
  <g clip-path="url(#blue-silhouette)">
    <path d="M 96.00 122.05 C 83.84 120.65, 73.97 109.64, 73.33 96.30 A 24.98 24.98 0 0 1 96.06 71.41 A 28.49 28.49 0 0 1 150.56 71.19 A 25.30 25.30 0 0 1 168.43 102.55 A 28.55 28.55 0 0 1 143.00 122.05 Z" fill="#000000" filter="url(#white-shadow)"/>
  </g>
  <path d="M 96 122.127 C 83.84 120.725 73.97 109.703 73.33 96.349 C 73.324 83.406 83.184 72.598 96.06 71.432 C 102.375 50.406 129.058 44.108 144.089 60.096 C 147.064 63.259 149.277 67.061 150.56 71.212 C 164.237 74.834 172.289 88.98 168.43 102.606 C 164.745 113.711 156.691 121.445 145.022 122.127 L 96 122.127 Z" fill="url(#grad-white)" style=""/>
</svg>`
    const HUBCLOUD_LOGO_DATA_URI = makeSvgDataUri(HUBCLOUD_LOGO_SVG)
    const HUBDRIVE_LOGO_SVG = String.raw`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 249 249" width="249" height="249">
  <defs>
    <linearGradient id="bg-blue" gradientUnits="userSpaceOnUse" x1="35.36" y1="35.07" x2="165.36" y2="165.07">
      <stop offset="0" stop-color="#5492f0"/>
      <stop offset="1" stop-color="#468aef"/>
    </linearGradient>
    <linearGradient id="long-shadow" gradientUnits="userSpaceOnUse" x1="116.86" y1="162.07" x2="156.86" y2="231.37">
      <stop offset="0" stop-color="#001450" stop-opacity="0.068"/>
      <stop offset="1" stop-color="#001450" stop-opacity="0"/>
    </linearGradient>
    <clipPath id="circle-clip">
      <circle cx="124.50" cy="124.50" r="123.88"/>
    </clipPath>
  </defs>
  <circle cx="124.50" cy="124.50" r="123.88" fill="url(#bg-blue)"/>
  <g clip-path="url(#circle-clip)">
    <path d="M 310.50 227.06 L 160.50 77.06 A 50.95 50.95 0 0 1 175.12 107.56 A 33.99 33.99 0 1 1 175.18 175.54 L 79.38 175.54 A 39.62 39.62 0 0 1 51.36 163.94 L 201.36 313.94 Z" fill="url(#long-shadow)"/>
  </g>
  <path d="M 175.18 175.54 L 79.38 175.54 A 39.62 39.62 0 0 1 76.32 96.42 A 50.95 50.95 0 0 1 175.12 107.56 A 33.99 33.99 0 1 1 175.18 175.54 Z M 108.39 97.26 H 141.59 V 125.44 H 158.42 L 125.09 158.69 L 91.83 125.44 H 108.39 Z" fill="#ffffff" fill-rule="evenodd"/>
</svg>`
    const HUBDRIVE_LOGO_DATA_URI = makeSvgDataUri(HUBDRIVE_LOGO_SVG)
    const HUBCDN_LOGO_SVG = String.raw`<svg width="216" height="260" viewBox="0 0 216 260" xmlns="http://www.w3.org/2000/svg"><title>undraw_handcrafts_heart</title><g fill="none"><path d="M94.612 259.442c-52.87-27.61-89.83-83.546-94.497-143.008-2.677-34.116 42-57.722 73.18-43.618s45.416 52.377 42.057 86.433c-3.36 34.055-20.522 64.984-20.74 100.193" fill="#b9fff4"/><path d="m180.8 59.136-.002-.002.022.057.002.002z" fill="#000"/><path d="M210.18 49.32c-9.959-27.16-41.17-31.961-64.158-17.966a102 102 0 0 0-10.83 7.159C126.986 22.216 114.311 6.342 96.626.665c-18.734-3.47-38.053 7.13-50.715 20.369C34.808 33.217 29.554 49.242 23.814 64.39c-7.425 19.42-5.637 40.524-.681 60.308 5.518 24.51 19.25 46.018 34.14 65.883 17.341 23.568 36.811 45.456 55.79 67.695-16.404-27.606-34.051-54.514-48.789-83.074-9.574-18.305-15.647-32.086-19.093-55.445a155 155 0 0 1-1.548-21.374c.179-8.247.613-8.191.746-9.59 2.97-15.129 15.054-38.773 20.212-45.34a39 39 0 0 1 4.92-4.745 27 27 0 0 1 3.381-2.086c4.253-2.02 2.698-2 12.054-4.589h.004c.699-.03 1.345-.032 1.868-.023.23.134.461.265.686.407 8.802 8.28 6.196 6.106 10.328 11.3l1.05 1.484a87.4 87.4 0 0 1 6.546 11.272c1.768 2.63 7.162 26.82 29.194 21.615a28.8 28.8 0 0 0 10.114-5.904 574 574 0 0 0 7.158-5.542c2.509-1.853 7.729-5.67 9.68-6.699a48 48 0 0 1 5.05-2.73 40 40 0 0 1 6.261-1.897c.41-.025.818-.085 1.228-.079.167.002.332.031.498.037.793.196 1.903.478 3.011.821.21.12.422.236.627.365a34 34 0 0 1 1.71 1.71q.766 1.148 1.387 2.381c1.5 4.087 2.738 8.265 3.704 12.51 3.598 14.583 2.86 25.085.322 37.42-10.04 46.747-36.895 82.132-64.628 125.968a621 621 0 0 1-9.546 13.878c10.995-10.373 21.466-21.286 31.577-32.52 21.612-23.877 43.757-47.96 57.517-77.437 7.013-14.537 13.001-29.855 14.723-46.011a112.4 112.4 0 0 0-4.835-45.038" fill="#6366f1"/></g></svg>`
    const HUBCDN_LOGO_DATA_URI = makeSvgDataUri(HUBCDN_LOGO_SVG)

    // src/4khdhub/provider-links.js
    const RELEASE_PROVIDER_ORDER = Object.freeze([
      "HubCloud",
      "HubDrive",
      "Other",
    ])
    const createReleaseActions = (sourceContainer) => {
      const actions = document.createElement("div")
      actions.className = "userpatch-release-actions"
      const providers = new Map()
      for (const sourceLink of sourceContainer.querySelectorAll("a[href]")) {
        const sourceLabel = sourceLink.textContent.toLowerCase()
        let provider = ""
        if (sourceLabel.includes("hubcloud")) {
          provider = "HubCloud"
        } else if (sourceLabel.includes("hubdrive")) {
          provider = "HubDrive"
        }
        if (!provider && /^download\s+other$/i.test(sourceLabel.trim())) {
          provider = "Other"
        }
        if (!provider) {
          return null
        }
        let url
        try {
          url = new URL(sourceLink.href, location.href)
        } catch {
          return null
        }
        if (url.protocol !== "http:" && url.protocol !== "https:") {
          return null
        }
        const existingLink = providers.get(provider)
        if (existingLink) {
          if (existingLink.href !== url.href) {
            return null
          }
          continue
        }
        const anchor = document.createElement("a")
        anchor.className = "userpatch-provider-link"
        anchor.href = url.href
        anchor.target = "_blank"
        anchor.rel = "noopener noreferrer"
        anchor.dataset.tooltip = provider
        anchor.setAttribute("aria-label", provider)
        if (provider === "Other") {
          anchor.append(createLucideIcon("external-link"))
          providers.set(provider, anchor)
          continue
        }
        const logo = document.createElement("img")
        logo.src =
          provider === "HubCloud"
            ? HUBCLOUD_LOGO_DATA_URI
            : HUBDRIVE_LOGO_DATA_URI
        logo.alt = ""
        logo.width = 36
        logo.height = 36
        logo.decoding = "async"
        anchor.append(logo)
        providers.set(provider, anchor)
      }
      for (const provider of RELEASE_PROVIDER_ORDER) {
        const anchor = providers.get(provider)
        if (anchor) {
          actions.append(anchor)
        }
      }
      return actions.childElementCount ? actions : null
    }

    // src/4khdhub/download-lists.js
    let movieReleaseListCleanup = null
    let seriesReleaseCleanup = null
    let releaseProviderTooltipCleanup = null
    const isReleaseSize = (value) =>
      /^\d+(?:[.,]\d+)?\s*(?:B|KB|MB|GB|TB|PB|KIB|MIB|GIB|TIB|PIB)$/i.test(
        value
      )
    const setupResponsiveReleaseFilter = (
      toolbar,
      section,
      filters,
      refresh
    ) => {
      const breakpoint = window.matchMedia(
        `(max-width: ${CONFIG.mobileLayoutBreakpointRem}rem)`
      )
      const positionFilter = () => {
        if (breakpoint.matches) {
          const list = section.querySelector(".userpatch-release-list")
          section.insertBefore(filters, list || null)
        } else {
          toolbar.append(filters)
        }
        refresh?.()
      }
      positionFilter()
      breakpoint.addEventListener("change", positionFilter)
      return () => {
        breakpoint.removeEventListener("change", positionFilter)
        toolbar.append(filters)
      }
    }
    const clearMobileQualityScrollSpace = (section) => {
      delete section.dataset.mobileQualityScrollSpace
      section.style.removeProperty("--userpatch-mobile-quality-scroll-space")
    }
    const scrollListBelowStickyFilter = (filter, list, section) => {
      if (
        !window.matchMedia(
          `(max-width: ${CONFIG.mobileLayoutBreakpointRem}rem)`
        ).matches
      ) {
        return
      }
      const filterStyle = getComputedStyle(filter)
      const filterRect = filter.getBoundingClientRect()
      const listRect = list.getBoundingClientRect()
      const stickyTop =
        Number.parseFloat(filterStyle.insetBlockStart) ||
        CONFIG.mobileQualityStickyTopPx
      const marginAfter = Number.parseFloat(filterStyle.marginBlockEnd) || 0
      const targetTop =
        window.scrollY +
        listRect.top -
        filterRect.height -
        marginAfter -
        stickyTop
      const scrollingElement =
        document.scrollingElement || document.documentElement
      const maxScroll = Math.max(
        0,
        scrollingElement.scrollHeight - window.innerHeight
      )
      const extraScrollSpace = Math.ceil(targetTop - maxScroll)
      if (extraScrollSpace > 0) {
        section.style.setProperty(
          "--userpatch-mobile-quality-scroll-space",
          `${extraScrollSpace}px`
        )
        section.dataset.mobileQualityScrollSpace = "true"
      }
      const behavior = window.matchMedia("(prefers-reduced-motion: reduce)")
        .matches
        ? "auto"
        : CONFIG.mobileQualityScrollBehavior
      window.scrollTo({
        top: Math.max(0, targetTop),
        behavior,
      })
    }
    const setupMovieReleaseList = (siteRoot) => {
      try {
        const main = siteRoot.querySelector(".content-grid .content-main")
        const section = Array.from(
          main?.querySelectorAll(".content-section") || []
        ).find(
          (candidate) =>
            candidate.classList.contains("userpatch-movie-releases") ||
            candidate.querySelector(
              ".download-group, .space-y-4 > .download-item"
            )
        )
        const list = section?.querySelector(".space-y-4")
        if (!section || !list) {
          return false
        }
        const sourceItems = Array.from(list.querySelectorAll(".download-item"))
        if (!sourceItems.length) {
          return false
        }
        const releases = new Map()
        for (const item of sourceItems) {
          if (item.dataset.userpatchReleaseReady === "true") {
            continue
          }
          const header = item.querySelector(":scope > .download-header")
          const content = item.querySelector(":scope > div[id^='content-']")
          const filename = normalizeText(
            content?.querySelector(".file-title")?.textContent
          )
          const actions = content && createReleaseActions(content)
          if (!header || !filename || !actions) {
            return false
          }
          releases.set(item, {
            header,
            filename,
            actions,
          })
        }
        main.classList.add("userpatch-release-main")
        main.classList.remove("userpatch-series-main")
        section.classList.add("userpatch-movie-releases")
        list.classList.add("userpatch-release-list")
        for (const group of list.querySelectorAll(".download-group")) {
          for (const item of group.querySelectorAll(".download-item")) {
            list.append(item)
          }
          group.remove()
        }
        const openedReleases = getOpenedReleases()
        for (const [item, { header, filename, actions }] of releases) {
          const size = Array.from(header.querySelectorAll("code .badge"))
            .map((badge) => badge.textContent.trim().replaceAll(/\s+/g, " "))
            .find(isReleaseSize)
          const copy = document.createElement("div")
          copy.className = "userpatch-release-copy"
          const title = document.createElement("div")
          title.className = "userpatch-release-file-title"
          const details = document.createElement("div")
          details.className = "userpatch-release-meta"
          if (size) {
            details.textContent = size
            copy.append(title, details)
          } else {
            copy.append(title)
          }
          const row = document.createElement("div")
          row.className = "userpatch-release-row"
          row.append(copy, actions)
          item.replaceChildren(row)
          item.classList.add("userpatch-release-item")
          if (isReleaseOpened(filename, actions, openedReleases)) {
            markReleaseOpened(row, item)
          }
          item.dataset.userpatchFilename = filename
          item.dataset.userpatchQuality = getReleaseQuality(filename)
          const cleanupFilenameMeasurement = setupExpandableFilename(
            title,
            filename
          )
          releaseFilenameCleanups.push(cleanupFilenameMeasurement)
          item.dataset.userpatchReleaseReady = "true"
        }
        let toolbar =
          main.querySelector(":scope > .userpatch-release-toolbar") ||
          section.querySelector(":scope > .userpatch-release-toolbar")
        if (!toolbar?.userpatchRefresh) {
          movieReleaseListCleanup?.()
          movieReleaseListCleanup = null
          toolbar?.remove()
          toolbar = document.createElement("div")
          toolbar.className = "userpatch-release-toolbar"
          const qualityTabs = createQualityTabs({
            storageKey: CONFIG.storageKeys.movieQualityTab,
            onQualityChange: (quality) => {
              toolbar.dataset.activeQuality = quality
              clearMobileQualityScrollSpace(section)
              refresh()
              scrollListBelowStickyFilter(qualityTabs.element, list, section)
            },
          })
          const filters = qualityTabs.element
          toolbar.append(filters)
          toolbar.userpatchFilters = filters
          main.insertBefore(toolbar, section)
          const refresh = () => {
            const items = Array.from(list.querySelectorAll(".download-item"))
            const available = new Set(
              items.map((item) => item.dataset.userpatchQuality)
            )
            const activeQuality = qualityTabs.refreshButtons(available)
            toolbar.dataset.activeQuality = activeQuality
            for (const item of items) {
              const quality = item.dataset.userpatchQuality || "unknown"
              item.classList.toggle(
                "userpatch-filter-hidden",
                activeQuality !== "all" && quality !== activeQuality
              )
            }
          }
          toolbar.dataset.activeQuality = qualityTabs.getActiveQuality()
          toolbar.userpatchRefresh = refresh
          toolbar.userpatchPositionIndicator = qualityTabs.positionIndicator
          toolbar.userpatchCleanup = () => {
            delete toolbar.userpatchRefresh
            qualityTabs.cleanup()
          }
          movieReleaseListCleanup = toolbar.userpatchCleanup
        }
        const movieFilters =
          toolbar.userpatchFilters ||
          toolbar.querySelector(".userpatch-quality-tabs") ||
          section.querySelector(".userpatch-quality-tabs")
        if (movieFilters && !toolbar.userpatchResponsiveCleanup) {
          const cleanupResponsiveFilter = setupResponsiveReleaseFilter(
            toolbar,
            section,
            movieFilters,
            toolbar.userpatchPositionIndicator
          )
          toolbar.userpatchResponsiveCleanup = cleanupResponsiveFilter
          const cleanupControls = toolbar.userpatchCleanup
          toolbar.userpatchCleanup = () => {
            cleanupResponsiveFilter()
            cleanupControls?.()
          }
          movieReleaseListCleanup = toolbar.userpatchCleanup
        }
        if (!releaseProviderTooltipCleanup) {
          releaseProviderTooltipCleanup = setupProviderTooltip(siteRoot)
        }
        toolbar.userpatchRefresh?.()
        updatePosterBadges(siteRoot)
        return true
      } catch {
        return false
      }
    }
    const setupSeriesReleaseList = (siteRoot) => {
      try {
        const main = siteRoot.querySelector(".content-grid .content-main")
        const tabs = main?.querySelector("#series-tabs")
        const panels = {
          "complete-pack": main?.querySelector("#complete-pack"),
          episodes: main?.querySelector("#episodes"),
        }
        if (!main || !tabs || (!panels["complete-pack"] && !panels.episodes)) {
          return false
        }
        const existingToolbar = main.querySelector(
          ":scope > .userpatch-series-toolbar"
        )
        const sourceMarkup = Object.values(panels)
          .map((panel) => panel?.innerHTML || "")
          .join("\0")
        if (
          existingToolbar?.userpatchRefresh &&
          existingToolbar.userpatchSourceMarkup === sourceMarkup
        ) {
          existingToolbar.userpatchRefresh?.()
          return true
        }
        if (existingToolbar) {
          cleanupReleaseLists()
        }
        const sourceSection =
          tabs.closest(".content-section") ||
          panels["complete-pack"]?.closest(".content-section") ||
          panels.episodes?.closest(".content-section")
        const listSection = document.createElement("section")
        listSection.className =
          "content-section userpatch-movie-releases userpatch-series-releases"
        const list = document.createElement("div")
        list.className = "space-y-4 userpatch-release-list"
        listSection.append(list)
        const filenameCleanups = []
        const modeEntries = new Map()
        const showTitle = normalizeText(
          siteRoot.querySelector(".userpatch-detail-title, .page-title")
            ?.textContent || ""
        )
        const getEpisodeGroupLabel = (value) => {
          let label = normalizeText(value)
          const remainder = label.slice(showTitle.length)
          if (
            showTitle &&
            label.slice(0, showTitle.length).toLowerCase() ===
              showTitle.toLowerCase() &&
            /^[\s([{]/.test(remainder)
          ) {
            label = remainder
          }
          return normalizeText(label.replaceAll(/[()[\]]/g, " "))
        }
        const getSeasonCode = (label) => {
          const season = label.match(/season\s*(\d+)/i)?.[1]
          const part = label.match(/part\s*(\d+)/i)?.[1]
          if (!season) {
            return ""
          }
          return `S${season.padStart(2, "0")}${part ? `P${part.padStart(2, "0")}` : ""}`
        }
        const getQualityGroupLabel = (label, seasonLabel) => {
          const normalized = getEpisodeGroupLabel(label) || seasonLabel
          const seasonCode = getSeasonCode(seasonLabel)
          const codePattern = seasonCode
            ? new RegExp(`^${seasonCode}\\s*`, "i")
            : /^S\d{1,2}(?:P\d{1,2})?\s*/i
          return (
            normalizeText(normalized.replace(codePattern, "")) || normalized
          )
        }
        const getArchiveLanguages = (file) => {
          const badgeElements = Array.from(
            file.querySelectorAll(
              ".download-header code .badge, .download-header .badge"
            )
          )
          for (const badge of badgeElements) {
            const style = badge.getAttribute("style") || ""
            if (
              style.includes("#0d9488") ||
              style.includes("13, 148, 136") ||
              badge.classList.contains("badge-teal")
            ) {
              const text = normalizeText(badge.textContent)
              if (text) {
                return text
              }
            }
          }
          for (const badge of badgeElements) {
            const text = normalizeText(badge.textContent)
            if (!text) {
              continue
            }
            const isSize = isReleaseSize(text)
            const isFormat =
              /^(?:WEB-?DL|WEBRip|BluRay|BRRip|HDRip|HDTC|DVDRip|CAMRip|HDTV|REMUX)$/i.test(
                text
              )
            const isResolution =
              /^(?:2160p|1080p|720p|480p|4k|hdr|dovi|sdr|hevc|h\.?26[45]|x26[45])$/i.test(
                text
              )
            const isEpisode = /^Episodes?\s+\d+\b/i.test(text)
            const isSite = /^4khdhub(?:\.com)?$/i.test(text)
            if (
              !isSize &&
              !isFormat &&
              !isResolution &&
              !isEpisode &&
              !isSite
            ) {
              return text
            }
          }
          return ""
        }
        const getSeasonSortParts = (label) => {
          const code = getSeasonCode(label)
          const match =
            code.match(/^S(\d{1,2})(?:P(\d{1,2}))?$/i) ||
            normalizeText(label).match(/\bS(\d{1,2})(?:P(\d{1,2}))?\b/i)
          return match ? [Number(match[1]), Number(match[2] || 0)] : null
        }
        const getEpisodeSortParts = (file, seasonLabel) => {
          const filename = normalizeText(
            file.querySelector(".episode-file-title")?.textContent || ""
          )
          const fullCode = filename.match(
            /(?:^|[^a-z0-9])S(\d{1,2})(?:P(\d{1,2}))?E(\d{1,3})(?=$|[^a-z0-9])/i
          )
          if (fullCode) {
            return [
              Number(fullCode[1]),
              Number(fullCode[2] || 0),
              Number(fullCode[3]),
            ]
          }
          const episodeCode = filename.match(
            /(?:^|[^a-z0-9])(?:episode|ep|e)\s*0*(\d{1,3})(?=$|[^a-z0-9])/i
          )
          if (!episodeCode) {
            return null
          }
          return [
            ...(getSeasonSortParts(seasonLabel) || [0, 0]),
            Number(episodeCode[1]),
          ]
        }
        const sortEpisodeFiles = (files, seasonLabel) =>
          files
            .map((file, index) => ({
              file,
              index,
              parts: getEpisodeSortParts(file, seasonLabel),
            }))
            .toSorted((left, right) => {
              if (!left.parts) {
                return right.parts ? 1 : left.index - right.index
              }
              if (!right.parts) {
                return -1
              }
              for (let index = 0; index < left.parts.length; index += 1) {
                const difference = left.parts[index] - right.parts[index]
                if (difference) {
                  return difference
                }
              }
              return left.index - right.index
            })
            .map(({ file }) => file)
        const getEpisodeEntries = (
          episodeGroups,
          mode,
          seasonIndex,
          seasonLabel
        ) =>
          episodeGroups.flatMap((episodeGroup, groupIndex) => {
            const rawLabel = normalizeText(
              episodeGroup.querySelector(".episode-title .download-title-text")
                ?.textContent ||
                episodeGroup.querySelector(".episode-title")?.textContent ||
                ""
            )
            const label = getQualityGroupLabel(rawLabel, seasonLabel)
            const languages =
              Array.from(
                episodeGroup.querySelectorAll(
                  ".episode-header .episode-meta .badge"
                )
              )
                .map((badge) => normalizeText(badge.textContent))
                .find((value) => value && !/^Episodes?\s+\d+\b/i.test(value)) ||
              ""
            const files = sortEpisodeFiles(
              Array.from(
                episodeGroup.querySelectorAll(".episode-download-item")
              ),
              seasonLabel
            )
            if (!files.length) {
              return []
            }
            return [
              {
                key: `${mode}-${seasonIndex}-${groupIndex}`,
                label,
                languages,
                seasonKey: `${mode}-season-${seasonIndex}`,
                seasonLabel,
                files,
              },
            ]
          })
        for (const [mode, panel] of Object.entries(panels)) {
          const seasons = Array.from(
            panel?.querySelectorAll(".series-season-group") || []
          )
          const entries = []
          if (mode === "complete-pack" && !seasons.length) {
            const directFiles = Array.from(
              panel?.querySelectorAll(".download-item") || []
            )
            if (directFiles.length) {
              const seasonMap = new Map()
              for (const file of directFiles) {
                const epNum =
                  file.querySelector(".episode-number")?.textContent?.trim() ||
                  ""
                const titleText =
                  file.querySelector(".file-title, .download-header")
                    ?.textContent || ""
                const match =
                  `${epNum} ${titleText}`.match(/\bS(\d{1,2})\b/i) ||
                  `${epNum} ${titleText}`.match(/\bSeason\s*(\d{1,2})\b/i)
                const seasonNum = match ? Number(match[1]) : 1
                const seasonLabel = `Season ${seasonNum}`
                if (!seasonMap.has(seasonLabel)) {
                  seasonMap.set(seasonLabel, [])
                }
                seasonMap.get(seasonLabel).push(file)
              }
              let seasonIndex = 0
              for (const [seasonLabel, files] of seasonMap) {
                const seasonKey = `${mode}-season-${seasonIndex}`
                entries.push({
                  key: `${mode}-${seasonIndex}`,
                  label: seasonLabel,
                  languages: "",
                  mode,
                  seasonKey,
                  seasonLabel,
                  files,
                })
                seasonIndex += 1
              }
            }
          }
          if (mode === "episodes" && !seasons.length) {
            const directEpisodeGroups = Array.from(
              panel?.querySelectorAll(".episode-item") || []
            )
            if (directEpisodeGroups.length) {
              const episodeSeasonMap = new Map()
              for (const episodeGroup of directEpisodeGroups) {
                const epNum =
                  episodeGroup
                    .querySelector(".episode-number")
                    ?.textContent?.trim() || ""
                const rawTitle =
                  episodeGroup.querySelector(".episode-title")?.textContent ||
                  ""
                const match =
                  `${epNum} ${rawTitle}`.match(/\bS(\d{1,2})\b/i) ||
                  `${epNum} ${rawTitle}`.match(/\bSeason\s*(\d{1,2})\b/i)
                const seasonNum = match ? Number(match[1]) : 1
                const seasonLabel = `Season ${seasonNum}`
                if (!episodeSeasonMap.has(seasonLabel)) {
                  episodeSeasonMap.set(seasonLabel, [])
                }
                episodeSeasonMap.get(seasonLabel).push(episodeGroup)
              }
              let seasonIndex = 0
              for (const [seasonLabel, episodeGroups] of episodeSeasonMap) {
                const seasonKey = `${mode}-season-${seasonIndex}`
                const episodeEntries = getEpisodeEntries(
                  episodeGroups,
                  mode,
                  seasonIndex,
                  seasonLabel
                )
                episodeEntries.forEach(
                  ({ key, label, languages = "", files }) => {
                    if (files.length) {
                      entries.push({
                        key,
                        label,
                        languages,
                        mode,
                        seasonKey,
                        seasonLabel,
                        files,
                      })
                    }
                  }
                )
                seasonIndex += 1
              }
            } else {
              const directFiles = sortEpisodeFiles(
                Array.from(
                  panel?.querySelectorAll(".episode-download-item") || []
                ),
                "Season 1"
              )
              if (directFiles.length) {
                entries.push({
                  key: `${mode}-0-0`,
                  label: "All Episodes",
                  languages: "",
                  mode,
                  seasonKey: `${mode}-season-0`,
                  seasonLabel: "Season 1",
                  files: directFiles,
                })
              }
            }
          }
          seasons.forEach((season, seasonIndex) => {
            const seasonLabel =
              season
                .querySelector(".series-season-toggle strong")
                ?.textContent?.trim() || `Season ${seasonIndex + 1}`
            const seasonKey = `${mode}-season-${seasonIndex}`
            let groups = []
            if (mode === "complete-pack") {
              const files = Array.from(
                season.querySelectorAll(".download-item")
              )
              if (files.length) {
                groups.push({
                  key: `${mode}-${seasonIndex}`,
                  label: seasonLabel,
                  seasonKey,
                  seasonLabel,
                  files,
                })
              }
            } else {
              const episodeGroups = Array.from(
                season.querySelectorAll(".episode-item")
              )
              if (episodeGroups.length) {
                const episodeEntries = getEpisodeEntries(
                  episodeGroups,
                  mode,
                  seasonIndex,
                  seasonLabel
                )
                groups = episodeEntries
              } else {
                const files = sortEpisodeFiles(
                  Array.from(season.querySelectorAll(".episode-download-item")),
                  seasonLabel
                )
                if (files.length) {
                  groups.push({
                    key: `${mode}-${seasonIndex}`,
                    label: seasonLabel,
                    seasonKey,
                    seasonLabel,
                    files,
                  })
                }
              }
            }
            groups.forEach(({ key, label, languages = "", files }) => {
              if (files.length) {
                entries.push({
                  key,
                  label,
                  languages,
                  mode,
                  seasonKey,
                  seasonLabel,
                  files,
                })
              }
            })
          })
          modeEntries.set(mode, entries)
        }
        const episodeEntries = modeEntries.get("episodes") || []
        const episodeLabelCounts = new Map()
        for (const entry of episodeEntries) {
          const labelKey = `${entry.seasonKey}\u0000${entry.label}`
          episodeLabelCounts.set(
            labelKey,
            (episodeLabelCounts.get(labelKey) || 0) + 1
          )
        }
        const episodeLabelVersions = new Map()
        for (const entry of episodeEntries) {
          const labelKey = `${entry.seasonKey}\u0000${entry.label}`
          if (episodeLabelCounts.get(labelKey) < 2) {
            continue
          }
          const version = (episodeLabelVersions.get(labelKey) || 0) + 1
          episodeLabelVersions.set(labelKey, version)
          entry.version = version
        }
        if (![...modeEntries.values()].some((entries) => entries.length)) {
          return false
        }
        if (
          panels.episodes?.querySelector(
            ".series-season-group, .episode-item, .episode-download-item"
          ) &&
          !modeEntries.get("episodes")?.length
        ) {
          return false
        }
        if (
          panels["complete-pack"]?.querySelector(
            ".series-season-group, .download-item"
          ) &&
          !modeEntries.get("complete-pack")?.length
        ) {
          return false
        }
        for (const entries of modeEntries.values()) {
          for (const entry of entries) {
            for (const file of entry.files) {
              const title = file.querySelector(
                entry.mode === "complete-pack"
                  ? ".file-title"
                  : ".episode-file-title"
              )
              if (
                !normalizeText(title?.textContent) ||
                !createReleaseActions(file)
              ) {
                return false
              }
            }
          }
        }
        for (const [mode, panel] of Object.entries(panels)) {
          const parsedFiles = new Set(
            (modeEntries.get(mode) || []).flatMap((entry) => entry.files)
          )
          const selector =
            mode === "complete-pack"
              ? ".download-item"
              : ".episode-download-item"
          if (
            Array.from(panel?.querySelectorAll(selector) || []).some(
              (file) => !parsedFiles.has(file)
            )
          ) {
            return false
          }
        }
        const modeButtons = Array.from(
          tabs.querySelectorAll(".series-tab[data-tab]")
        )
        if (
          !modeButtons.some(
            (button) => modeEntries.get(button.dataset.tab)?.length
          )
        ) {
          return false
        }
        const toolbar = document.createElement("div")
        toolbar.className = "userpatch-release-toolbar userpatch-series-toolbar"
        toolbar.userpatchSourceMarkup = sourceMarkup
        const tabsParent = tabs.parentNode
        const tabsNextSibling = tabs.nextSibling
        tabs.classList.add("userpatch-quality-tabs")
        tabs.setAttribute("role", "group")
        tabs.setAttribute("aria-label", "Choose complete packs or episodes")
        tabs.querySelector(".userpatch-quality-indicator")?.remove()
        const modeIndicator = document.createElement("span")
        modeIndicator.className = "userpatch-quality-indicator"
        modeIndicator.setAttribute("aria-hidden", "true")
        modeIndicator.dataset.ready = "false"
        tabs.prepend(modeIndicator)
        for (const button of modeButtons) {
          button.classList.add("userpatch-quality-tab")
          button.dataset.tabContent = "label"
          button.setAttribute(
            "aria-pressed",
            button.classList.contains("active") ? "true" : "false"
          )
          const labelText =
            button.dataset.tab === "complete-pack" ? "Archive" : "Episodes"
          const label = document.createElement("span")
          label.className = "userpatch-series-tab-label"
          label.textContent = labelText
          const iconName =
            button.dataset.tab === "complete-pack"
              ? "file-archive"
              : "file-play"
          const icon = createLucideIcon(iconName)
          icon.classList.add(
            "lucide",
            `lucide-${iconName}`,
            "userpatch-series-mode-icon"
          )
          icon.dataset.userpatchLucideIcon = iconName
          button.replaceChildren(label, icon)
          button.setAttribute("aria-label", labelText)
          button.title = labelText
        }
        const createSeriesSelect = (id, label) => {
          const control = document.createElement("div")
          control.className = "userpatch-season-control"
          const trigger = document.createElement("button")
          trigger.type = "button"
          trigger.className = "userpatch-season-trigger"
          trigger.setAttribute("role", "combobox")
          trigger.setAttribute("aria-haspopup", "listbox")
          trigger.setAttribute("aria-expanded", "false")
          trigger.setAttribute("aria-controls", `${id}-options`)
          trigger.setAttribute("aria-label", label)
          const value = document.createElement("span")
          value.className = "userpatch-season-value"
          const versionMarker = document.createElement("span")
          versionMarker.className =
            "userpatch-version-marker userpatch-season-version-marker"
          versionMarker.hidden = true
          const chevron = createLucideIcon("chevron-down")
          chevron.classList.add("userpatch-season-chevron")
          chevron.setAttribute("aria-hidden", "true")
          const positioner = document.createElement("div")
          positioner.className = "userpatch-season-positioner"
          positioner.hidden = true
          const popup = document.createElement("div")
          popup.className = "userpatch-season-popup"
          const createScrollControl = (direction) => {
            const button = document.createElement("button")
            button.type = "button"
            button.className = `userpatch-season-scroll-control userpatch-season-scroll-${direction}`
            button.tabIndex = -1
            button.setAttribute("aria-hidden", "true")
            const icon = createLucideIcon(
              direction === "up" ? "chevron-up" : "chevron-down"
            )
            icon.setAttribute("aria-hidden", "true")
            button.append(icon)
            return button
          }
          const scrollUp = createScrollControl("up")
          const menu = document.createElement("div")
          menu.id = `${id}-options`
          menu.className = "userpatch-season-menu"
          menu.setAttribute("role", "listbox")
          menu.setAttribute("aria-label", label)
          const scrollDown = createScrollControl("down")
          trigger.append(value, versionMarker, chevron)
          control.append(trigger)
          popup.append(scrollUp, menu, scrollDown)
          positioner.append(popup)
          return {
            control,
            trigger,
            value,
            versionMarker,
            positioner,
            popup,
            menu,
            scrollUp,
            scrollDown,
          }
        }
        const seasonSelect = createSeriesSelect(
          "userpatch-series-season",
          "Select season"
        )
        const qualitySelect = createSeriesSelect(
          "userpatch-series-quality",
          "Select release quality"
        )
        qualitySelect.control.classList.add("userpatch-series-quality-control")
        const qualityGroup = document.createElement("div")
        qualityGroup.className = "userpatch-series-quality-group"
        const languageBadge = document.createElement("span")
        languageBadge.id = "userpatch-series-language-summary"
        languageBadge.className = "userpatch-series-language-badge"
        languageBadge.setAttribute(
          "aria-label",
          "Languages for selected release"
        )
        languageBadge.hidden = true
        const languageText = document.createElement("span")
        languageText.className = "userpatch-series-language-text"
        const languageIcon = createLucideIcon("audio-lines")
        languageIcon.classList.add("userpatch-series-language-icon")
        languageIcon.dataset.userpatchLucideIcon = "audio-lines"
        languageBadge.append(languageIcon, languageText)
        qualitySelect.trigger.setAttribute("aria-describedby", languageBadge.id)
        qualityGroup.append(qualitySelect.control, languageBadge)
        const archiveQualityTabs = createQualityTabs({
          storageKey: CONFIG.storageKeys.seriesArchiveQualityTab,
          onQualityChange: () => {
            clearMobileQualityScrollSpace(listSection)
            filterArchiveReleases()
            scrollListBelowStickyFilter(selectors, list, listSection)
          },
        })
        archiveQualityTabs.element.classList.add(
          "userpatch-archive-quality-tabs"
        )
        archiveQualityTabs.element.hidden = true
        const selectors = document.createElement("div")
        selectors.className = "userpatch-series-selects"
        selectors.append(
          seasonSelect.control,
          archiveQualityTabs.element,
          qualityGroup
        )
        toolbar.append(tabs, selectors)
        main.classList.add("userpatch-release-main", "userpatch-series-main")
        sourceSection?.classList.add("userpatch-series-source")
        main.insertBefore(toolbar, sourceSection || null)
        main.insertBefore(listSection, sourceSection || null)
        document.body.append(seasonSelect.positioner, qualitySelect.positioner)
        const savedMode = storageGet(CONFIG.storageKeys.seriesTab)
        let activeMode =
          savedMode && modeEntries.get(savedMode)?.length
            ? savedMode
            : tabs.querySelector(".series-tab.active[data-tab]")?.dataset.tab ||
              "complete-pack"
        if (!modeEntries.get(activeMode)?.length) {
          activeMode =
            modeButtons.find(
              (button) => modeEntries.get(button.dataset.tab)?.length
            )?.dataset.tab || ""
        }
        for (const button of modeButtons) {
          const hasEntries = Boolean(
            modeEntries.get(button.dataset.tab)?.length
          )
          const isActive = button.dataset.tab === activeMode
          button.disabled = !hasEntries
          button.setAttribute("aria-disabled", String(!hasEntries))
          button.classList.toggle("active", isActive)
          button.setAttribute("aria-pressed", isActive ? "true" : "false")
        }
        let selectedSeasonKey = ""
        let selectedEntryKey = ""
        let currentEntries = []
        let currentSeasons = []
        let currentQualityEntries = []
        let renderedEntryKey = null
        let typeaheadBuffer = ""
        let typeaheadTimer = 0
        const clearRenderedEntry = () => {
          for (const cleanup of filenameCleanups) {
            cleanup()
          }
          pruneReleaseFilenameCleanups(filenameCleanups)
          filenameCleanups.length = 0
        }
        const filterArchiveReleases = () => {
          if (activeMode !== "complete-pack") {
            return
          }
          const items = Array.from(list.querySelectorAll(".download-item"))
          const available = new Set(
            items.map((item) => item.dataset.userpatchQuality)
          )
          const effectiveQuality = archiveQualityTabs.refreshButtons(available)
          for (const item of items) {
            const quality = item.dataset.userpatchQuality || "unknown"
            item.classList.toggle(
              "userpatch-filter-hidden",
              effectiveQuality !== "all" && quality !== effectiveQuality
            )
          }
        }
        const renderSelectedEntry = () => {
          const entry = currentEntries.find(
            (item) => item.key === selectedEntryKey
          )
          const nextKey = entry?.key || ""
          if (renderedEntryKey === nextKey) {
            filterArchiveReleases()
            return
          }
          clearRenderedEntry()
          renderedEntryKey = nextKey
          if (!entry) {
            list.replaceChildren()
            return
          }
          const openedReleases = getOpenedReleases()
          const rowFragment = document.createDocumentFragment()
          const filenameRows = []
          for (const file of entry.files) {
            const filename = normalizeText(
              file.querySelector(
                entry.mode === "complete-pack"
                  ? ".file-title"
                  : ".episode-file-title"
              )?.textContent || ""
            )
            if (!filename) {
              continue
            }
            const sizeCandidates = Array.from(
              file.querySelectorAll(
                entry.mode === "complete-pack"
                  ? ".download-header code .badge, .download-header .badge-size"
                  : ".episode-file-info .badge-size"
              )
            ).map((badge) => normalizeText(badge.textContent))
            const size = sizeCandidates.find(isReleaseSize)
            const languages =
              entry.mode === "complete-pack" ? getArchiveLanguages(file) : ""
            const row = document.createElement("div")
            row.className = "download-item userpatch-release-item"
            row.dataset.userpatchFilename = filename
            row.dataset.userpatchQuality = getReleaseQuality(filename)
            row.dataset.userpatchMode = entry.mode
            row.dataset.userpatchEntry = entry.key
            const rowLayout = document.createElement("div")
            rowLayout.className = "userpatch-release-row"
            if (isReleaseOpened(filename, file, openedReleases)) {
              markReleaseOpened(rowLayout, row)
            }
            const copy = document.createElement("div")
            copy.className = "userpatch-release-copy"
            const title = document.createElement("div")
            title.className = "userpatch-release-file-title"
            const meta = document.createElement("div")
            meta.className = "userpatch-release-meta"
            if (size) {
              const sizeSpan = document.createElement("span")
              sizeSpan.className = "userpatch-release-size"
              sizeSpan.textContent = size
              meta.append(sizeSpan)
            }
            if (languages) {
              const archiveLanguageBadge = document.createElement("span")
              archiveLanguageBadge.className =
                "userpatch-series-language-badge userpatch-release-language-badge"
              archiveLanguageBadge.setAttribute(
                "aria-label",
                `Audio: ${languages}`
              )
              const archiveLanguageIcon = createLucideIcon("audio-lines")
              archiveLanguageIcon.classList.add(
                "userpatch-series-language-icon"
              )
              archiveLanguageIcon.dataset.userpatchLucideIcon = "audio-lines"
              const archiveLanguageText = document.createElement("span")
              archiveLanguageText.className = "userpatch-series-language-text"
              archiveLanguageText.textContent = languages
              archiveLanguageBadge.append(
                archiveLanguageIcon,
                archiveLanguageText
              )
              meta.append(archiveLanguageBadge)
            }
            if (size || languages) {
              copy.append(title, meta)
            } else {
              copy.append(title)
            }
            const actions = createReleaseActions(file)
            rowLayout.append(copy, actions)
            row.append(rowLayout)
            rowFragment.append(row)
            filenameRows.push({
              title,
              filename,
            })
          }
          list.replaceChildren(rowFragment)
          filterArchiveReleases()
          for (const { title, filename } of filenameRows) {
            const cleanupFilename = setupExpandableFilename(title, filename)
            releaseFilenameCleanups.push(cleanupFilename)
            filenameCleanups.push(cleanupFilename)
          }
        }
        const positionModeIndicator = (target) =>
          positionSelectionIndicator(
            modeIndicator,
            tabs,
            target || tabs.querySelector(".series-tab.active"),
            "quality"
          )
        const getCurrentSeasons = () => {
          const seasonsByKey = new Map()
          for (const entry of currentEntries) {
            const key = entry.seasonKey || entry.key
            let season = seasonsByKey.get(key)
            if (!season) {
              season = {
                key,
                label: entry.seasonLabel || entry.label,
                entries: [],
              }
              seasonsByKey.set(key, season)
            }
            season.entries.push(entry)
          }
          return [...seasonsByKey.values()]
            .map((season, index) => ({
              season,
              index,
              parts: getSeasonSortParts(season.label),
            }))
            .toSorted((left, right) => {
              if (!left.parts) {
                return right.parts ? 1 : left.index - right.index
              }
              if (!right.parts) {
                return -1
              }
              return (
                left.parts[0] - right.parts[0] ||
                left.parts[1] - right.parts[1] ||
                left.index - right.index
              )
            })
            .map(({ season }) => season)
        }
        const getSelectItems = (select) =>
          select === seasonSelect ? currentSeasons : currentQualityEntries
        const getSelectOptions = (select) =>
          Array.from(select.menu.querySelectorAll('[role="option"]'))
        const updateSelectSelection = (select, items, selectedKey) => {
          const selected = items.find((item) => item.key === selectedKey)
          if (select === qualitySelect) {
            languageText.textContent = selected?.languages || ""
            languageBadge.hidden =
              activeMode !== "episodes" || !selected?.languages
          }
          if (!selected) {
            select.value.textContent = ""
            select.versionMarker.hidden = true
            select.trigger.disabled = true
            select.trigger.removeAttribute("title")
            select.trigger.removeAttribute("aria-valuetext")
            return
          }
          select.trigger.disabled = false
          select.value.textContent = selected.label
          select.versionMarker.hidden = !selected.version
          select.versionMarker.textContent = selected.version
            ? `v${selected.version}`
            : ""
          if (selected.version) {
            select.versionMarker.dataset.version = String(selected.version)
          } else {
            delete select.versionMarker.dataset.version
          }
          const accessibleValue = `${selected.label}${selected.version ? ` v${selected.version}` : ""}`
          select.trigger.removeAttribute("title")
          select.trigger.setAttribute("aria-valuetext", accessibleValue)
          for (const option of getSelectOptions(select)) {
            option.setAttribute(
              "aria-selected",
              String(option.dataset.selectKey === selectedKey)
            )
          }
        }
        const renderSelectOptions = (select, items, selectedKey) => {
          select.menu.replaceChildren(
            ...items.map((item) => {
              const option = document.createElement("div")
              option.className = "userpatch-season-option"
              option.setAttribute("role", "option")
              option.tabIndex = -1
              option.dataset.selectKey = item.key
              const label = document.createElement("span")
              label.className = "userpatch-season-option-label"
              label.textContent = item.label
              option.append(label)
              if (item.version) {
                const marker = document.createElement("span")
                marker.className = "userpatch-version-marker"
                marker.textContent = `v${item.version}`
                marker.dataset.version = String(item.version)
                option.append(marker)
              }
              const check = createLucideIcon("check")
              check.classList.add("userpatch-season-option-check")
              option.append(check)
              return option
            })
          )
          updateSelectSelection(select, items, selectedKey)
        }
        const setHighlightedOption = (select, option, shouldFocus = true) => {
          if (!option) {
            return
          }
          for (const item of getSelectOptions(select)) {
            item.toggleAttribute("data-highlighted", item === option)
          }
          if (shouldFocus) {
            option.focus()
            option.scrollIntoView({
              block: "nearest",
              inline: "nearest",
            })
          }
        }
        const updateSelectScrollControls = (select) => {
          const menu = select.menu
          const hasOverflow = menu.scrollHeight > menu.clientHeight + 1
          select.scrollUp.hidden = !hasOverflow || menu.scrollTop <= 1
          select.scrollDown.hidden =
            !hasOverflow ||
            menu.scrollTop + menu.clientHeight >= menu.scrollHeight - 1
        }
        const positionSelectMenu = (select) => {
          if (select.positioner.hidden) {
            return
          }
          const rect = select.trigger.getBoundingClientRect()
          const viewportInset = CONFIG.seriesSelectViewportInsetPx
          const sideOffset = CONFIG.seriesSelectSideOffsetPx
          const maxAvailableWidth = window.innerWidth - viewportInset * 2
          const popupWidth = Math.min(
            Math.max(rect.width, 144),
            maxAvailableWidth
          )
          select.positioner.style.setProperty(
            "--userpatch-anchor-width",
            `${popupWidth}px`
          )
          select.popup.style.setProperty(
            "--userpatch-anchor-width",
            `${popupWidth}px`
          )
          const preferredHeight = Math.min(
            CONFIG.seriesSelectPopupMaxHeightPx,
            window.innerHeight - viewportInset * 2
          )
          const roomBelow =
            window.innerHeight - rect.bottom - viewportInset - sideOffset
          const roomAbove = rect.top - viewportInset - sideOffset
          const popupStyle = getComputedStyle(select.popup)
          const popupChromeHeight =
            Number.parseFloat(popupStyle.paddingBlockStart) +
            Number.parseFloat(popupStyle.paddingBlockEnd) +
            Number.parseFloat(popupStyle.borderBlockStartWidth) +
            Number.parseFloat(popupStyle.borderBlockEndWidth)
          const naturalHeight = select.menu.scrollHeight + popupChromeHeight
          const desiredHeight = Math.min(naturalHeight, preferredHeight)
          const side =
            roomBelow >= desiredHeight || roomBelow >= roomAbove
              ? "bottom"
              : "top"
          const availableHeight = Math.max(
            1,
            Math.min(preferredHeight, side === "bottom" ? roomBelow : roomAbove)
          )
          const needsScroll = naturalHeight > availableHeight
          const scrollControlsHeight = needsScroll
            ? CONFIG.seriesSelectScrollControlHeightPx * 2
            : 0
          const menuHeight = Math.max(
            1,
            availableHeight - popupChromeHeight - scrollControlsHeight
          )
          const left = Math.min(
            Math.max(viewportInset, rect.left),
            window.innerWidth - viewportInset - popupWidth
          )
          select.positioner.dataset.side = side
          select.positioner.style.left = `${left}px`
          select.popup.style.setProperty(
            "--userpatch-popup-height",
            `${availableHeight}px`
          )
          select.menu.style.setProperty(
            "--userpatch-menu-height",
            `${menuHeight}px`
          )
          select.popup.dataset.side = side
          select.scrollUp.hidden = !needsScroll
          select.scrollDown.hidden = !needsScroll
          updateSelectScrollControls(select)
          const popupHeight = select.popup.getBoundingClientRect().height
          const top =
            side === "bottom"
              ? rect.bottom + sideOffset
              : rect.top - sideOffset - popupHeight
          select.positioner.style.top = `${top}px`
        }
        const scheduleSelectMenuPosition = (select) => {
          requestAnimationFrame(() => {
            if (toolbar.isConnected) {
              positionSelectMenu(select)
            }
          })
        }
        const openSelectMenu = (select) => {
          if (select.positioner.hidden) {
            select.positioner.hidden = false
            select.trigger.setAttribute("aria-expanded", "true")
            positionSelectMenu(select)
          }
          const options = getSelectOptions(select)
          const selectedKey =
            select === seasonSelect ? selectedSeasonKey : selectedEntryKey
          const selected = options.find(
            (option) => option.dataset.selectKey === selectedKey
          )
          setHighlightedOption(select, selected || options[0])
          scheduleSelectMenuPosition(select)
        }
        const closeSelectMenu = (select, restoreFocus = false) => {
          if (select.positioner.hidden) {
            return
          }
          select.positioner.hidden = true
          select.trigger.setAttribute("aria-expanded", "false")
          for (const option of getSelectOptions(select)) {
            delete option.dataset.highlighted
          }
          if (restoreFocus) {
            select.trigger.focus()
          }
        }
        const closeSelectMenus = (restoreFocus = false) => {
          closeSelectMenu(seasonSelect, restoreFocus)
          closeSelectMenu(qualitySelect, restoreFocus)
        }
        const updateCurrentSeason = () => {
          selectors.dataset.mode = activeMode
          const isArchive = activeMode === "complete-pack"
          archiveQualityTabs.element.hidden = !isArchive
          qualitySelect.control.hidden = isArchive
          qualityGroup.hidden = isArchive
          if (isArchive) {
            archiveQualityTabs.positionIndicator()
          }
          const season = currentSeasons.find(
            (item) => item.key === selectedSeasonKey
          )
          currentQualityEntries =
            activeMode === "episodes" ? season?.entries || [] : []
          if (
            !currentQualityEntries.some(
              (entry) => entry.key === selectedEntryKey
            )
          ) {
            const savedQuality = storageGet(CONFIG.storageKeys.seriesQuality)
            const matchedEntry = savedQuality
              ? currentQualityEntries.find(
                  (entry) => entry.label === savedQuality
                ) ||
                currentQualityEntries.find((entry) =>
                  entry.label.toLowerCase().includes(savedQuality.toLowerCase())
                )
              : null
            selectedEntryKey =
              matchedEntry?.key || currentQualityEntries[0]?.key || ""
          }
          if (activeMode === "complete-pack") {
            selectedEntryKey = season?.entries[0]?.key || ""
          }
          renderSelectOptions(seasonSelect, currentSeasons, selectedSeasonKey)
          renderSelectOptions(
            qualitySelect,
            currentQualityEntries,
            selectedEntryKey
          )
        }
        const chooseSelectOption = (select, key, restoreFocus = true) => {
          const items = getSelectItems(select)
          if (!items.some((item) => item.key === key)) {
            return
          }
          clearMobileQualityScrollSpace(listSection)
          if (select === seasonSelect) {
            selectedSeasonKey = key
            const chosenSeason = currentSeasons.find((item) => item.key === key)
            if (chosenSeason?.label) {
              storageSet(
                CONFIG.storageKeys.seriesSeasonPrefix +
                  normalizePathname(location.pathname),
                chosenSeason.label
              )
            }
            selectedEntryKey = ""
            updateCurrentSeason()
          } else {
            selectedEntryKey = key
            const chosenEntry = currentQualityEntries.find(
              (item) => item.key === key
            )
            if (chosenEntry?.label) {
              storageSet(CONFIG.storageKeys.seriesQuality, chosenEntry.label)
            }
            updateSelectSelection(qualitySelect, currentQualityEntries, key)
          }
          closeSelectMenu(select, restoreFocus)
          refresh()
          if (select === qualitySelect) {
            scrollListBelowStickyFilter(selectors, list, listSection)
          }
        }
        const populateEntries = () => {
          currentEntries = modeEntries.get(activeMode) || []
          currentSeasons = getCurrentSeasons()
          const savedSeason = storageGet(
            CONFIG.storageKeys.seriesSeasonPrefix +
              normalizePathname(location.pathname)
          )
          const matchedSeason = savedSeason
            ? currentSeasons.find((season) => season.label === savedSeason)
            : null
          if (
            !currentSeasons.some((season) => season.key === selectedSeasonKey)
          ) {
            selectedSeasonKey =
              matchedSeason?.key || currentSeasons[0]?.key || ""
          }
          updateCurrentSeason()
        }
        const refresh = () => {
          renderSelectedEntry()
          positionModeIndicator()
          if (activeMode === "complete-pack") {
            archiveQualityTabs.positionIndicator()
          }
        }
        const onModeClick = (event) => {
          if (!(event.target instanceof Element)) {
            return
          }
          const button = event.target.closest(".series-tab[data-tab]")
          if (!button || !tabs.contains(button) || button.disabled) {
            return
          }
          closeSelectMenus()
          window.requestAnimationFrame(() => {
            if (!toolbar.isConnected) {
              return
            }
            activeMode = button.dataset.tab
            storageSet(CONFIG.storageKeys.seriesTab, activeMode)
            selectedSeasonKey = ""
            for (const modeButton of modeButtons) {
              const isActive = modeButton === button
              modeButton.classList.toggle("active", isActive)
              modeButton.setAttribute(
                "aria-pressed",
                isActive ? "true" : "false"
              )
            }
            populateEntries()
            refresh()
            if (activeMode === "complete-pack") {
              archiveQualityTabs.positionIndicator()
            }
          })
        }
        const modeButtonFromEvent = (event) => {
          if (!(event.target instanceof Element)) {
            return null
          }
          const button = event.target.closest(".series-tab")
          return button && tabs.contains(button) ? button : null
        }
        const onPointerOver = (event) => {
          if (
            (event.pointerType !== "mouse" && event.pointerType !== "pen") ||
            !window.matchMedia("(hover: hover) and (pointer: fine)").matches
          ) {
            return
          }
          const modeButton = modeButtonFromEvent(event)
          if (modeButton && !modeButton.disabled) {
            positionModeIndicator(modeButton)
          }
        }
        const onPointerLeave = () => {
          positionModeIndicator()
        }
        const onFocusIn = (event) => {
          const modeButton = modeButtonFromEvent(event)
          if (modeButton && !modeButton.disabled) {
            positionModeIndicator(modeButton)
          }
        }
        const onFocusOut = (event) => {
          if (
            !(event.relatedTarget instanceof Node) ||
            !event.currentTarget.contains(event.relatedTarget)
          ) {
            positionModeIndicator()
          }
        }
        const getSelectFromTarget = (target) => {
          if (!(target instanceof Element)) {
            return null
          }
          if (
            seasonSelect.control.contains(target) ||
            seasonSelect.positioner.contains(target)
          ) {
            return seasonSelect
          }
          if (
            qualitySelect.control.contains(target) ||
            qualitySelect.positioner.contains(target)
          ) {
            return qualitySelect
          }
          return null
        }
        const isWithinSeriesSelect = (target) =>
          [seasonSelect, qualitySelect].some(
            (select) =>
              select.control.contains(target) ||
              select.positioner.contains(target)
          )
        const toggleSelectMenu = (select) => {
          if (select.trigger.disabled) {
            return
          }
          if (select.positioner.hidden) {
            closeSelectMenu(
              select === seasonSelect ? qualitySelect : seasonSelect
            )
            openSelectMenu(select)
          } else {
            closeSelectMenu(select)
          }
        }
        const onSeasonTriggerClick = () => toggleSelectMenu(seasonSelect)
        const onQualityTriggerClick = () => toggleSelectMenu(qualitySelect)
        const onSelectKeyDown = (event) => {
          const select = getSelectFromTarget(event.target)
          if (!select) {
            return
          }
          const options = getSelectOptions(select)
          const activeIndex = options.indexOf(document.activeElement)
          if (event.key === "Escape" && !select.positioner.hidden) {
            event.preventDefault()
            closeSelectMenu(select, true)
            return
          }
          if (event.key === "Tab" && !select.positioner.hidden) {
            closeSelectMenu(select)
            return
          }
          if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault()
            const direction = event.key === "ArrowDown" ? 1 : -1
            if (select.positioner.hidden) {
              openSelectMenu(select)
            } else {
              const nextIndex =
                activeIndex < 0
                  ? 0
                  : (activeIndex + direction + options.length) % options.length
              setHighlightedOption(select, options[nextIndex])
            }
            return
          }
          if (event.key === "Home" || event.key === "End") {
            event.preventDefault()
            if (select.positioner.hidden) {
              openSelectMenu(select)
            }
            setHighlightedOption(
              select,
              event.key === "Home" ? options[0] : options.at(-1)
            )
            return
          }
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault()
            if (select.positioner.hidden) {
              openSelectMenu(select)
            } else if (activeIndex >= 0) {
              chooseSelectOption(select, options[activeIndex].dataset.selectKey)
            }
            return
          }
          if (
            event.key.length === 1 &&
            !event.ctrlKey &&
            !event.metaKey &&
            !event.altKey
          ) {
            typeaheadBuffer += event.key.toLocaleLowerCase()
            window.clearTimeout(typeaheadTimer)
            typeaheadTimer = window.setTimeout(() => {
              typeaheadBuffer = ""
            }, 700)
            const start = Math.max(activeIndex, -1) + 1
            const ordered = options.slice(start).concat(options.slice(0, start))
            const match = ordered.find((option) =>
              option
                .querySelector(".userpatch-season-option-label")
                ?.textContent?.toLocaleLowerCase()
                .startsWith(typeaheadBuffer)
            )
            if (match) {
              if (select.positioner.hidden) {
                openSelectMenu(select)
              }
              setHighlightedOption(select, match)
            }
          }
        }
        const onSelectMenuPointerMove = (event) => {
          if (
            (event.pointerType !== "mouse" && event.pointerType !== "pen") ||
            !window.matchMedia("(hover: hover) and (pointer: fine)").matches
          ) {
            return
          }
          if (!(event.target instanceof Element)) {
            return
          }
          const option = event.target.closest(
            '[role="option"][data-select-key]'
          )
          const select = getSelectFromTarget(event.target)
          if (!option || !select?.menu.contains(option)) {
            return
          }
          setHighlightedOption(select, option, false)
        }
        const onSelectMenuClick = (event) => {
          if (!(event.target instanceof Element)) {
            return
          }
          const option = event.target.closest(
            '[role="option"][data-select-key]'
          )
          const select = getSelectFromTarget(event.target)
          if (!option || !select?.menu.contains(option)) {
            return
          }
          chooseSelectOption(
            select,
            option.dataset.selectKey,
            event.detail === 0
          )
        }
        const scrollSelectMenu = (select, direction) => {
          select.menu.scrollBy({
            top: direction * Math.max(80, select.menu.clientHeight * 0.75),
            behavior: "smooth",
          })
        }
        const onSeasonMenuScroll = () => {
          updateSelectScrollControls(seasonSelect)
          scheduleSelectMenuPosition(seasonSelect)
        }
        const onQualityMenuScroll = () => {
          updateSelectScrollControls(qualitySelect)
          scheduleSelectMenuPosition(qualitySelect)
        }
        const onSeasonScrollUp = () => scrollSelectMenu(seasonSelect, -1)
        const onSeasonScrollDown = () => scrollSelectMenu(seasonSelect, 1)
        const onQualityScrollUp = () => scrollSelectMenu(qualitySelect, -1)
        const onQualityScrollDown = () => scrollSelectMenu(qualitySelect, 1)
        const onSelectOutsidePointerDown = (event) => {
          if (!isWithinSeriesSelect(event.target)) {
            closeSelectMenus()
          }
        }
        const onSelectFocusOut = (event) => {
          if (
            !(event.relatedTarget instanceof Node) ||
            !isWithinSeriesSelect(event.relatedTarget)
          ) {
            closeSelectMenus()
          }
        }
        const onWindowResize = () => {
          positionModeIndicator()
          if (activeMode === "complete-pack") {
            archiveQualityTabs.positionIndicator()
          }
          positionSelectMenu(seasonSelect)
          positionSelectMenu(qualitySelect)
        }
        window.addEventListener("click", onModeClick, true)
        tabs.addEventListener("pointerover", onPointerOver)
        tabs.addEventListener("pointerleave", onPointerLeave)
        tabs.addEventListener("focusin", onFocusIn)
        tabs.addEventListener("focusout", onFocusOut)
        seasonSelect.trigger.addEventListener("click", onSeasonTriggerClick)
        qualitySelect.trigger.addEventListener("click", onQualityTriggerClick)
        document.addEventListener("keydown", onSelectKeyDown)
        document.addEventListener("focusout", onSelectFocusOut, true)
        seasonSelect.menu.addEventListener("click", onSelectMenuClick)
        qualitySelect.menu.addEventListener("click", onSelectMenuClick)
        seasonSelect.menu.addEventListener(
          "pointermove",
          onSelectMenuPointerMove
        )
        qualitySelect.menu.addEventListener(
          "pointermove",
          onSelectMenuPointerMove
        )
        seasonSelect.menu.addEventListener("scroll", onSeasonMenuScroll)
        qualitySelect.menu.addEventListener("scroll", onQualityMenuScroll)
        seasonSelect.scrollUp.addEventListener("click", onSeasonScrollUp)
        seasonSelect.scrollDown.addEventListener("click", onSeasonScrollDown)
        qualitySelect.scrollUp.addEventListener("click", onQualityScrollUp)
        qualitySelect.scrollDown.addEventListener("click", onQualityScrollDown)
        document.addEventListener(
          "pointerdown",
          onSelectOutsidePointerDown,
          true
        )
        window.addEventListener("resize", onWindowResize)
        document.addEventListener("scroll", onWindowResize, true)
        const resizeObserver =
          typeof ResizeObserver === "undefined"
            ? null
            : new ResizeObserver(onWindowResize)
        resizeObserver?.observe(tabs)
        for (const button of modeButtons) {
          if (button instanceof HTMLElement) {
            resizeObserver?.observe(button)
          }
        }
        toolbar.userpatchRefresh = refresh
        seriesReleaseCleanup = () => {
          archiveQualityTabs.cleanup()
          closeSelectMenus()
          window.removeEventListener("click", onModeClick, true)
          tabs.removeEventListener("pointerover", onPointerOver)
          tabs.removeEventListener("pointerleave", onPointerLeave)
          tabs.removeEventListener("focusin", onFocusIn)
          tabs.removeEventListener("focusout", onFocusOut)
          seasonSelect.trigger.removeEventListener(
            "click",
            onSeasonTriggerClick
          )
          qualitySelect.trigger.removeEventListener(
            "click",
            onQualityTriggerClick
          )
          document.removeEventListener("keydown", onSelectKeyDown)
          document.removeEventListener("focusout", onSelectFocusOut, true)
          seasonSelect.menu.removeEventListener("click", onSelectMenuClick)
          qualitySelect.menu.removeEventListener("click", onSelectMenuClick)
          seasonSelect.menu.removeEventListener(
            "pointermove",
            onSelectMenuPointerMove
          )
          qualitySelect.menu.removeEventListener(
            "pointermove",
            onSelectMenuPointerMove
          )
          seasonSelect.menu.removeEventListener("scroll", onSeasonMenuScroll)
          qualitySelect.menu.removeEventListener("scroll", onQualityMenuScroll)
          seasonSelect.scrollUp.removeEventListener("click", onSeasonScrollUp)
          seasonSelect.scrollDown.removeEventListener(
            "click",
            onSeasonScrollDown
          )
          qualitySelect.scrollUp.removeEventListener("click", onQualityScrollUp)
          qualitySelect.scrollDown.removeEventListener(
            "click",
            onQualityScrollDown
          )
          document.removeEventListener(
            "pointerdown",
            onSelectOutsidePointerDown,
            true
          )
          window.removeEventListener("resize", onWindowResize)
          document.removeEventListener("scroll", onWindowResize, true)
          window.clearTimeout(typeaheadTimer)
          resizeObserver?.disconnect()
          clearRenderedEntry()
          seasonSelect.positioner.remove()
          qualitySelect.positioner.remove()
          tabsParent?.insertBefore(
            tabs,
            tabsNextSibling?.parentNode === tabsParent ? tabsNextSibling : null
          )
          modeIndicator.remove()
          toolbar.remove()
          listSection.remove()
          sourceSection?.classList.remove("userpatch-series-source")
          main.classList.remove(
            "userpatch-release-main",
            "userpatch-series-main"
          )
          seriesReleaseCleanup = null
        }
        populateEntries()
        refresh()
        if (!releaseProviderTooltipCleanup) {
          releaseProviderTooltipCleanup = setupProviderTooltip(siteRoot)
        }
        updatePosterBadges(siteRoot)
        return true
      } catch {
        seriesReleaseCleanup?.()
        return false
      }
    }
    const cleanupReleaseLists = () => {
      movieReleaseListCleanup?.()
      movieReleaseListCleanup = null
      seriesReleaseCleanup?.()
      seriesReleaseCleanup = null
      releaseProviderTooltipCleanup?.()
      releaseProviderTooltipCleanup = null
      clearReleaseFilenameMeasurements()
    }

    // src/4khdhub/header-nav.js
    const NAV_CONTAINER_SELECTOR = "header.sticky > .header > .container"
    const NAV_ITEM_SELECTOR =
      ".navbar-brand, #main-nav .nav-list > .nav-item > .nav-link, #menu-toggle, #search-toggle"
    let headerNavigationCleanup = null
    let headerNavigationContainer = null
    let refreshHeaderNavigation = () => {}
    let headerSearchCleanup = null
    let headerSearchForm = null
    let headerSearchToggle = null
    const openHeaderSearch = () => {
      const dialog = document.getElementById("userpatch-search-dialog")
      if (
        typeof HTMLDialogElement === "undefined" ||
        !(dialog instanceof HTMLDialogElement) ||
        typeof dialog.showModal !== "function" ||
        !dialog.isConnected
      ) {
        return false
      }
      if (!dialog.open) {
        dialog.showModal()
      }
      headerSearchToggle?.setAttribute("aria-expanded", "true")
      return true
    }
    const setupHeaderSearch = () => {
      try {
        const overlay = document.querySelector("#search-overlay")
        const form =
          overlay?.querySelector(".search-form") ||
          document.querySelector(
            ".search-form.userpatch-search-form, .search-form.userpatch-header-search"
          )
        const inputGroup = form?.querySelector(".search-input-container")
        const input = inputGroup?.querySelector('input[type="search"]')
        const icon = inputGroup?.querySelector(".search-icon-overlay")
        const submit = form?.querySelector(".search-submit")
        const toggle = document.querySelector("#search-toggle")
        const existingDialog = document.querySelector(
          "dialog#userpatch-search-dialog"
        )
        if (
          !overlay ||
          !form ||
          !inputGroup ||
          !input ||
          !submit ||
          !toggle ||
          typeof HTMLDialogElement === "undefined"
        ) {
          return false
        }
        if (
          form === headerSearchForm &&
          form.parentElement === existingDialog &&
          toggle === headerSearchToggle
        ) {
          return true
        }
        headerSearchCleanup?.()
        document.querySelector("dialog#userpatch-search-dialog")?.remove()
        const formParent = form.parentNode
        const formNextSibling = form.nextSibling
        inputGroup.dataset.slot = "input-group"
        inputGroup.setAttribute("role", "group")
        inputGroup.classList.add("userpatch-search-input-group")
        input.dataset.slot = "input-group-control"
        input.id = "userpatch-site-search"
        input.removeAttribute("aria-label")
        input.setAttribute("placeholder", "Search movies and TV shows")
        input.setAttribute("autocomplete", "off")
        input.setAttribute("autocapitalize", "none")
        input.setAttribute("autocorrect", "off")
        input.setAttribute("spellcheck", "false")
        input.setAttribute("enterkeyhint", "search")
        input.maxLength = 200
        input.autofocus = true
        let searchLabel = form.querySelector(":scope > .userpatch-search-label")
        if (!searchLabel) {
          searchLabel = document.createElement("label")
          searchLabel.className = "sr-only userpatch-search-label"
          searchLabel.htmlFor = input.id
          searchLabel.textContent = "Search movies and TV shows"
          form.insertBefore(searchLabel, inputGroup)
        }
        form.setAttribute("role", "search")
        form.classList.remove("userpatch-header-search")
        form.classList.add("userpatch-search-form")
        if (icon) {
          const existingAddon = icon.closest('[data-slot="input-group-addon"]')
          if (existingAddon?.parentElement === inputGroup) {
            existingAddon.classList.add("userpatch-input-group-addon")
            existingAddon.dataset.align = "inline-start"
          } else if (icon.parentElement === inputGroup) {
            const addon = document.createElement("span")
            addon.className = "userpatch-input-group-addon"
            addon.dataset.slot = "input-group-addon"
            addon.dataset.align = "inline-start"
            addon.setAttribute("role", "group")
            addon.setAttribute("aria-hidden", "true")
            inputGroup.insertBefore(addon, icon)
            addon.append(icon)
          }
        }
        submit.type = "submit"
        submit.dataset.slot = "button"
        submit.setAttribute("aria-label", "Search")
        submit.hidden = true
        submit.setAttribute("aria-hidden", "true")
        inputGroup.querySelector(":scope > .userpatch-search-clear")?.remove()
        if (inputGroup.contains(submit)) {
          inputGroup.after(submit)
        }
        const dialog = document.createElement("dialog")
        dialog.id = "userpatch-search-dialog"
        dialog.className = "userpatch-search-dialog"
        dialog.setAttribute("aria-label", "Search movies and TV shows")
        dialog.setAttribute("closedby", "any")
        dialog.append(form)
        document.body.append(dialog)
        overlay.classList.add("hidden")
        overlay.setAttribute("aria-hidden", "true")
        overlay.removeAttribute("aria-modal")
        overlay.removeAttribute("aria-labelledby")
        overlay.removeAttribute("role")
        toggle.setAttribute("aria-controls", dialog.id)
        toggle.setAttribute("aria-expanded", "false")
        toggle.setAttribute("aria-haspopup", "dialog")
        let pointerStartedOutside = false
        const isOutsideDialog = (event) => {
          const rect = dialog.getBoundingClientRect()
          return (
            event.clientX < rect.left ||
            event.clientX > rect.right ||
            event.clientY < rect.top ||
            event.clientY > rect.bottom
          )
        }
        const onToggle = (event) => {
          event.preventDefault()
          event.stopImmediatePropagation()
          openHeaderSearch()
        }
        const onDialogClose = () => {
          toggle.setAttribute("aria-expanded", "false")
        }
        const onPointerDown = (event) => {
          pointerStartedOutside = isOutsideDialog(event)
        }
        const onPointerUp = (event) => {
          const shouldDismiss =
            pointerStartedOutside && isOutsideDialog(event) && dialog.open
          pointerStartedOutside = false
          if (shouldDismiss) {
            dialog.close()
          }
        }
        toggle.addEventListener("click", onToggle, true)
        dialog.addEventListener("close", onDialogClose)
        const needsLightDismissFallback = !(
          "closedBy" in HTMLDialogElement.prototype
        )
        if (needsLightDismissFallback) {
          dialog.addEventListener("pointerdown", onPointerDown)
          dialog.addEventListener("pointerup", onPointerUp)
        }
        headerSearchForm = form
        headerSearchToggle = toggle
        headerSearchCleanup = () => {
          toggle.removeEventListener("click", onToggle, true)
          dialog.removeEventListener("close", onDialogClose)
          if (needsLightDismissFallback) {
            dialog.removeEventListener("pointerdown", onPointerDown)
            dialog.removeEventListener("pointerup", onPointerUp)
          }
          if (dialog.open) {
            dialog.close()
          }
          toggle.setAttribute("aria-expanded", "false")
          formParent?.insertBefore(
            form,
            formNextSibling?.parentNode === formParent ? formNextSibling : null
          )
          dialog.remove()
          if (headerSearchForm === form) {
            headerSearchForm = null
            headerSearchToggle = null
            headerSearchCleanup = null
          }
        }
        return true
      } catch {
        return false
      }
    }
    const setupHeaderNavigation = () => {
      try {
        if (isCloudflareChallenge()) {
          headerNavigationCleanup?.()
          return false
        }
        if (!ensureStyles()) {
          return false
        }
        applySiteBranding()
        setupHeaderSearch()
        normalizeLucideIcons(document)
        const container = document.querySelector(NAV_CONTAINER_SELECTOR)
        if (!container) {
          return false
        }
        if (container === headerNavigationContainer) {
          refreshHeaderNavigation()
          return true
        }
        headerNavigationCleanup?.()
        const indicator = document.createElement("span")
        indicator.className = NAV_INDICATOR_CLASS
        indicator.setAttribute("aria-hidden", "true")
        container.prepend(indicator)
        const canShowIndicator = () =>
          window.matchMedia("(min-width: 46.01rem)").matches
        const navItems = () =>
          Array.from(container.querySelectorAll(NAV_ITEM_SELECTOR)).filter(
            (item) =>
              item instanceof HTMLElement && item.getClientRects().length > 0
          )
        const matchesCurrentPage = (href) => {
          if (!href || href === "#") {
            return false
          }
          try {
            const url = new URL(href, location.href)
            if (url.origin !== location.origin) {
              return false
            }
            const targetPath = normalizePathname(url.pathname).toLowerCase()
            const currentPath = normalizePathname(
              location.pathname
            ).toLowerCase()
            return (
              targetPath === currentPath ||
              (targetPath !== "/" && currentPath.startsWith(`${targetPath}/`))
            )
          } catch {
            return false
          }
        }
        const getActiveItem = () => {
          const directItem = navItems().find(
            (item) =>
              item instanceof HTMLAnchorElement &&
              matchesCurrentPage(item.getAttribute("href"))
          )
          if (directItem) {
            return directItem
          }
          for (const dropdown of container.querySelectorAll(
            "#main-nav .nav-item.dropdown"
          )) {
            const childMatches = Array.from(
              dropdown.querySelectorAll(".dropdown-menu a[href]")
            ).some((link) => matchesCurrentPage(link.getAttribute("href")))
            if (childMatches) {
              return dropdown.querySelector(":scope > .nav-link")
            }
          }
          return null
        }
        const positionIndicator = (target) => {
          if (!target || !container.contains(target) || !canShowIndicator()) {
            indicator.dataset.ready = "false"
            return
          }
          positionSelectionIndicator(indicator, container, target, "nav")
        }
        const positionActiveIndicator = () => {
          for (const item of navItems()) {
            item.classList.remove("userpatch-nav-active")
          }
          const activeItem = getActiveItem()
          if (activeItem) {
            activeItem.classList.add("userpatch-nav-active")
          }
          positionIndicator(activeItem)
        }
        const getEventItem = (target) => {
          if (!(target instanceof Element)) {
            return null
          }
          const item = target.closest(NAV_ITEM_SELECTOR)
          return item instanceof HTMLElement && container.contains(item)
            ? item
            : null
        }
        const onPointerOver = (event) => {
          if (
            (event.pointerType !== "mouse" && event.pointerType !== "pen") ||
            !window.matchMedia("(hover: hover) and (pointer: fine)").matches
          ) {
            return
          }
          const item = getEventItem(event.target)
          if (item) {
            positionIndicator(item)
          }
        }
        const onFocusIn = (event) => {
          let item = getEventItem(event.target)
          if (!item && event.target instanceof Element) {
            item = event.target
              .closest("#main-nav .nav-item.dropdown")
              ?.querySelector(":scope > .nav-link")
          }
          if (item instanceof HTMLElement) {
            positionIndicator(item)
          }
        }
        const onFocusOut = (event) => {
          if (
            !(event.relatedTarget instanceof Node) ||
            !container.contains(event.relatedTarget)
          ) {
            positionActiveIndicator()
          }
        }
        const resizeObserver =
          typeof ResizeObserver === "undefined"
            ? null
            : new ResizeObserver(positionActiveIndicator)
        container.addEventListener("pointerover", onPointerOver)
        container.addEventListener("pointerleave", positionActiveIndicator)
        container.addEventListener("focusin", onFocusIn)
        container.addEventListener("focusout", onFocusOut)
        if (resizeObserver) {
          resizeObserver.observe(container)
          for (const item of navItems()) {
            resizeObserver.observe(item)
          }
        } else {
          window.addEventListener("resize", positionActiveIndicator)
        }
        headerNavigationContainer = container
        refreshHeaderNavigation = positionActiveIndicator
        headerNavigationCleanup = () => {
          container.removeEventListener("pointerover", onPointerOver)
          container.removeEventListener("pointerleave", positionActiveIndicator)
          container.removeEventListener("focusin", onFocusIn)
          container.removeEventListener("focusout", onFocusOut)
          resizeObserver?.disconnect()
          if (!resizeObserver) {
            window.removeEventListener("resize", positionActiveIndicator)
          }
          for (const item of container.querySelectorAll(
            ".userpatch-nav-active"
          )) {
            item.classList.remove("userpatch-nav-active")
          }
          indicator.remove()
          if (headerNavigationContainer === container) {
            headerNavigationContainer = null
            refreshHeaderNavigation = () => {}
            headerNavigationCleanup = null
          }
        }
        positionActiveIndicator()
        return true
      } catch {
        headerNavigationCleanup?.()
        return false
      }
    }

    // src/4khdhub/mobile-nav.js
    let mobileNavigationCleanup = null
    let mobileMenuPopover = null
    let mobileMenuTrigger = null
    const createMobileMenuPopover = () => {
      if (!("popover" in HTMLElement.prototype)) {
        return null
      }
      const sourceList = document.querySelector("#main-nav .nav-list")
      if (!sourceList) {
        return null
      }
      const sourceMarkup = sourceList.innerHTML
      if (
        mobileMenuPopover?.isConnected &&
        mobileMenuPopover.dataset.sourceMarkup === sourceMarkup
      ) {
        return mobileMenuPopover
      }
      mobileMenuTrigger = null
      if (mobileMenuPopover?.matches(":popover-open")) {
        mobileMenuPopover.hidePopover()
      }
      mobileMenuPopover?.remove()
      const popover = document.createElement("div")
      popover.className = "userpatch-mobile-menu"
      popover.id = CONFIG.mobileMenuPopoverId
      popover.setAttribute("popover", "auto")
      popover.dataset.sourceMarkup = sourceMarkup
      const header = document.createElement("header")
      header.className = "userpatch-mobile-menu-header"
      const title = document.createElement("h2")
      title.className = "userpatch-mobile-menu-title"
      title.id = "userpatch-mobile-menu-title"
      title.textContent = "Menu"
      const closeButton = document.createElement("button")
      closeButton.type = "button"
      closeButton.className = "userpatch-mobile-menu-close"
      closeButton.setAttribute("aria-label", "Close menu")
      closeButton.setAttribute("popovertarget", CONFIG.mobileMenuPopoverId)
      closeButton.setAttribute("popovertargetaction", "hide")
      closeButton.append(createLucideIcon("x"))
      header.append(title, closeButton)
      const menuNavigation = document.createElement("nav")
      menuNavigation.className = "userpatch-mobile-menu-nav"
      menuNavigation.setAttribute("aria-label", "Site navigation")
      const list = document.createElement("ul")
      list.className = "userpatch-mobile-menu-list"
      const createMenuLink = (sourceLink) => {
        const href = sourceLink.getAttribute("href")
        const label = normalizeText(sourceLink.textContent)
        if (!href || href === "#" || !label) {
          return null
        }
        const link = document.createElement("a")
        link.className = "userpatch-mobile-menu-link"
        link.href = href
        link.textContent = label
        if (Object.hasOwn(sourceLink.dataset, "noSwup")) {
          link.dataset.noSwup = ""
        }
        return link
      }
      let groupIndex = 0
      for (const sourceItem of sourceList.children) {
        const sourceLink = sourceItem.querySelector(":scope > .nav-link")
        if (!(sourceLink instanceof HTMLAnchorElement)) {
          continue
        }
        const item = document.createElement("li")
        item.className = "userpatch-mobile-menu-item"
        const sourceLinks = sourceItem.querySelectorAll(
          ":scope > .dropdown-menu a[href]"
        )
        if (sourceLinks.length) {
          const group = document.createElement("details")
          group.className = "userpatch-mobile-menu-group"
          const summary = document.createElement("summary")
          summary.className = "userpatch-mobile-menu-summary"
          const label = document.createElement("span")
          label.textContent = normalizeText(sourceLink.textContent)
          const submenuId = `userpatch-mobile-menu-sublist-${groupIndex}`
          const chevron = createLucideIcon("chevron-down")
          chevron.setAttribute("aria-hidden", "true")
          summary.setAttribute("aria-controls", submenuId)
          summary.append(label, chevron)
          const submenu = document.createElement("ul")
          submenu.className = "userpatch-mobile-menu-sublist"
          submenu.id = submenuId
          for (const sourceSubLink of sourceLinks) {
            const link = createMenuLink(sourceSubLink)
            if (!link) {
              continue
            }
            const subItem = document.createElement("li")
            subItem.className = "userpatch-mobile-menu-item"
            subItem.append(link)
            submenu.append(subItem)
          }
          group.append(summary, submenu)
          item.append(group)
          groupIndex += 1
        } else {
          const link = createMenuLink(sourceLink)
          if (!link) {
            continue
          }
          item.append(link)
        }
        list.append(item)
      }
      menuNavigation.append(list)
      popover.append(header, menuNavigation)
      popover.addEventListener("click", (event) => {
        if (
          event.target instanceof Element &&
          event.target.closest("a[href]")
        ) {
          popover.hidePopover()
        }
      })
      popover.addEventListener("toggle", (event) => {
        if (event.newState === "open") {
          popover
            .querySelector("a[href], summary")
            ?.focus({ preventScroll: true })
          return
        }
        const trigger = mobileMenuTrigger
        mobileMenuTrigger = null
        trigger?.focus({ preventScroll: true })
      })
      document.body.append(popover)
      mobileMenuPopover = popover
      return popover
    }
    const removeMobileNavigation = () => {
      mobileNavigationCleanup?.()
      mobileNavigationCleanup = null
      mobileMenuTrigger = null
      if (mobileMenuPopover?.matches(":popover-open")) {
        mobileMenuPopover.hidePopover()
      }
      mobileMenuPopover?.remove()
      mobileMenuPopover = null
      document
        .querySelectorAll(".userpatch-mobile-nav")
        .forEach((navigation) => navigation.remove())
    }
    const setupMobileNavigation = () => {
      if (!document.body) {
        return false
      }
      let navigation = document.querySelector(".userpatch-mobile-nav")
      if (!navigation) {
        navigation = document.createElement("nav")
        navigation.className = "userpatch-mobile-nav"
        navigation.setAttribute("aria-label", "Mobile navigation")
        for (const [
          destination,
          label,
          iconName,
        ] of CONFIG.mobileNavigationItems) {
          const isAction = destination === "menu" || destination === "search"
          const item = document.createElement(isAction ? "button" : "a")
          item.className = "userpatch-mobile-nav-item"
          item.setAttribute("aria-label", label)
          if (isAction) {
            item.type = "button"
            item.dataset.action = destination
            if (destination === "menu") {
              item.setAttribute("popovertarget", CONFIG.mobileMenuPopoverId)
              item.setAttribute("aria-controls", CONFIG.mobileMenuPopoverId)
            }
          } else {
            item.href = destination
            item.dataset.noSwup = ""
          }
          const icon = document.createElement("span")
          icon.className = "userpatch-mobile-nav-icon"
          icon.setAttribute("aria-hidden", "true")
          if (label === "Home") {
            icon.classList.add("userpatch-mobile-nav-icon-brand")
            const image = document.createElement("img")
            image.className = "userpatch-mobile-nav-brand-logo"
            image.src = SITE_ICON_DATA_URI
            image.alt = ""
            image.width = 20
            image.height = 20
            image.decoding = "async"
            icon.append(image)
          } else {
            icon.append(createLucideIcon(iconName))
          }
          const text = document.createElement("span")
          text.textContent = label
          item.append(icon, text)
          navigation.append(item)
        }
        document.body.append(navigation)
      }
      createMobileMenuPopover()
      const currentPath = normalizePathname(location.pathname)
      for (const link of navigation.querySelectorAll("a[href]")) {
        const targetPath = normalizePathname(link.href)
        if (targetPath === currentPath) {
          link.setAttribute("aria-current", "page")
        } else {
          link.removeAttribute("aria-current")
        }
      }
      if (!mobileNavigationCleanup) {
        const onAction = (event) => {
          if (!(event.target instanceof Element)) {
            return
          }
          const trigger = event.target.closest("[data-action]")
          const action = trigger?.dataset.action
          if (action === "menu") {
            if (!mobileMenuPopover?.isConnected) {
              mobileMenuPopover = createMobileMenuPopover()
            }
            if (!mobileMenuPopover || !trigger) {
              document.querySelector("#menu-toggle")?.click()
              return
            }
            mobileMenuTrigger = trigger
            return
          }
          if (action === "search") {
            if (openHeaderSearch()) {
              return
            }
            document.querySelector("#search-toggle")?.click()
          }
        }
        navigation.addEventListener("click", onAction)
        mobileNavigationCleanup = () =>
          navigation.removeEventListener("click", onAction)
      }
      return true
    }

    // src/4khdhub/ongoing-cards.js
    let ongoingCardNavigationCleanup = null
    const hasOngoingSeasonProgress = (metadata) => {
      const match = normalizeText(metadata).match(
        /\bS(\d{1,2})(?:\s*[-–—]\s*S(\d{1,2}))?\s+EP(\d{1,3})\b/i
      )
      return Boolean(
        match &&
        (!match[2] || Number(match[2]) > Number(match[1])) &&
        Number(match[3]) > 0
      )
    }
    const setupOngoingCardNavigationTracking = () => {
      if (ongoingCardNavigationCleanup) {
        return
      }
      const onCardClick = (event) => {
        if (!(event.target instanceof Element)) {
          return
        }
        const card = event.target.closest("a.movie-card[href]")
        if (!(card instanceof HTMLAnchorElement)) {
          return
        }
        try {
          const target = new URL(card.href, location.href)
          if (target.origin !== location.origin) {
            return
          }
          if (
            hasOngoingSeasonProgress(
              card.querySelector(".movie-card-meta")?.textContent
            )
          ) {
            sessionStorage.setItem(
              CONFIG.ongoingPosterSessionKey,
              normalizePathname(target.pathname)
            )
          } else {
            sessionStorage.removeItem(CONFIG.ongoingPosterSessionKey)
          }
        } catch {
          return
        }
      }
      document.addEventListener("click", onCardClick, true)
      ongoingCardNavigationCleanup = () =>
        document.removeEventListener("click", onCardClick, true)
    }
    const markOngoingSeriesPosters = (siteRoot) => {
      for (const card of siteRoot.querySelectorAll(".movie-card")) {
        const poster = card.querySelector(".movie-card-image")
        if (!poster) {
          continue
        }
        const isOngoing = hasOngoingSeasonProgress(
          card.querySelector(".movie-card-meta")?.textContent
        )
        poster.classList.toggle("userpatch-ongoing-poster", isOngoing)
        card.classList.toggle("userpatch-ongoing-series", isOngoing)
      }
    }
    const markOngoingDetailPoster = (siteRoot) => {
      const poster = siteRoot.querySelector(
        ".content-sidebar .poster-container"
      )
      if (!poster) {
        return
      }
      let storedPath = ""
      try {
        storedPath =
          sessionStorage.getItem(CONFIG.ongoingPosterSessionKey) || ""
      } catch {
        storedPath = ""
      }
      const isOngoing =
        storedPath !== "" &&
        normalizePathname(location.pathname) === normalizePathname(storedPath)
      poster.classList.toggle("userpatch-ongoing-poster", isOngoing)
    }
    const clearOngoingCardNavigationCleanup = () => {
      ongoingCardNavigationCleanup = null
    }

    // src/shared/managed-meta.js
    const restoreManagedMeta = (metaIds) => {
      for (const id of metaIds) {
        const meta = document.getElementById(id)
        if (meta) {
          if (meta.dataset.originalContent !== undefined) {
            meta.content = meta.dataset.originalContent
            if (meta.dataset.originalId) {
              meta.id = meta.dataset.originalId
            } else {
              meta.removeAttribute("id")
            }
            delete meta.dataset.originalId
            delete meta.dataset.originalContent
          } else {
            meta.remove()
          }
        }
      }
      const modifiedViewportMeta = document.querySelector(
        'meta[name="viewport"][data-original-content]'
      )
      if (modifiedViewportMeta) {
        modifiedViewportMeta.content =
          modifiedViewportMeta.dataset.originalContent || ""
        delete modifiedViewportMeta.dataset.originalContent
      }
    }

    // src/4khdhub/style-lifecycle.js
    let originalTheme = null
    const followSystemTheme = () => {
      const root = document.documentElement
      originalTheme ||= {
        light: root.classList.contains("light"),
        dark: root.classList.contains("dark"),
        detailTheme: root.dataset.detailTheme,
      }
      const theme = ensureSystemTheme()
      root.classList.toggle("light", theme === "light")
      root.classList.toggle("dark", theme === "dark")
      root.dataset.detailTheme = theme
    }
    const removeStyles = () => {
      try {
        dismissPageLoader(true)
        headerNavigationCleanup?.()
        headerSearchCleanup?.()
        cleanupReleaseLists()
        ongoingCardNavigationCleanup?.()
        clearOngoingCardNavigationCleanup()
        removeMobileNavigation()
        restoreManagedMeta([COLOR_SCHEME_META_ID, THEME_COLOR_META_ID])
        document.getElementById(STYLE_ID)?.remove()
        document.getElementById(FONT_STYLE_ID)?.remove()
        document.documentElement?.classList.remove(
          MAIA_CLASS,
          "userpatch-detail-page"
        )
        delete document.documentElement.dataset.userpatchTheme
        if (originalTheme) {
          const root = document.documentElement
          root.classList.toggle("light", originalTheme.light)
          root.classList.toggle("dark", originalTheme.dark)
          if (originalTheme.detailTheme === undefined) {
            delete root.dataset.detailTheme
          } else {
            root.dataset.detailTheme = originalTheme.detailTheme
          }
          originalTheme = null
        }
      } catch {
        return
      }
    }

    // src/4khdhub/main.js
    let releaseContentRoot = null
    showRedesignLoader(/(^|\.)4khdhub\./i)
    const processCurrentPage = () => {
      if (isCloudflareChallenge()) {
        dismissPageLoader(true)
        removeStyles()
        return true
      }
      if (!ensureStyles()) {
        if (document.documentElement?.classList.contains("userpatch-maia")) {
          removeStyles()
        }
        return false
      }
      const siteRoot = document.querySelector("#swup")
      if (!siteRoot) {
        return false
      }
      const contentRoot =
        siteRoot.querySelector(".content-grid .content-main") || siteRoot
      if (contentRoot !== releaseContentRoot) {
        cleanupReleaseLists()
        releaseContentRoot = contentRoot
      }
      markOngoingSeriesPosters(siteRoot)
      setupOngoingCardNavigationTracking()
      for (const heading of siteRoot.querySelectorAll(
        ".latest-releases-header"
      )) {
        heading.remove()
      }
      const isDetailPage = Boolean(
        siteRoot.querySelector(
          ".content-grid .content-main .page-title, .content-grid .content-sidebar .userpatch-detail-title"
        )
      )
      document.documentElement.classList.toggle(
        "userpatch-detail-page",
        isDetailPage
      )
      setupHeaderNavigation()
      setupMobileNavigation()
      if (isDetailPage) {
        applyDetailPageLayout(siteRoot)
        markOngoingDetailPoster(siteRoot)
      }
      let posterIndex = 0
      for (const image of siteRoot.querySelectorAll(
        ".poster-container img, .movie-card-image img"
      )) {
        if (posterIndex === 0) {
          image.fetchPriority = "high"
          image.loading = "eager"
        } else if (!image.hasAttribute("loading")) {
          image.loading = "lazy"
        }
        posterIndex += 1
        setupProgressiveImage(image)
      }
      normalizeLucideIcons(siteRoot)
      if (!isDetailPage) {
        return true
      }
      const hasSeriesPanel = Boolean(
        siteRoot.querySelector("#complete-pack, #episodes")
      )
      if (!hasSeriesPanel) {
        const ready = setupMovieReleaseList(siteRoot)
        if (ready) {
          ensureDetailTabs(siteRoot)
        }
        return ready
      }
      const ready = setupSeriesReleaseList(siteRoot)
      if (ready) {
        ensureDetailTabs(siteRoot)
      }
      return ready
    }
    initStorage({ openedReleasesKey: CONFIG.storageKeys.openedReleases })
    initPageLoop({
      processPage: processCurrentPage,
      attributeFilter: [
        "data-format-header-ready",
        "data-global-detail-ready",
        "href",
        "src",
        "srcset",
      ],
      characterData: true,
      discoveryTimeoutMs: CONFIG.pageDiscoveryTimeoutMs,
    })
    initMaiaStyles({
      styleId: STYLE_ID,
      fontStyleId: FONT_STYLE_ID,
      colorSchemeMetaId: COLOR_SCHEME_META_ID,
      themeColorMetaId: THEME_COLOR_META_ID,
      themeColor: CONFIG.themeColor,
      css: MAIA_CSS,
      siteSignature: () =>
        document.body &&
        document.querySelector("#swup") &&
        document.querySelector(
          `${"header.sticky > .header > .container"} .navbar-brand`
        ) &&
        document.querySelector("#main-nav .nav-list"),
      preInject: followSystemTheme,
    })
    if (document.readyState === "loading") {
      if (ensureStyles()) {
        showInitialPageLoader(
          () => document.body,
          () => {
            const spinner = document.createElement("div")
            spinner.className = PAGE_SPINNER_CLASS
            return spinner
          },
          CONFIG.pageLoaderTimeoutMs
        )
      }
      document.addEventListener("DOMContentLoaded", watchCurrentPage, {
        once: true,
      })
    }
    document.addEventListener(
      "dragstart",
      (event) => {
        if (
          event.target instanceof Element &&
          event.target.closest("li.thumb, figure, img, a")
        ) {
          event.preventDefault()
        }
      },
      true
    )
    watchCurrentPage()
    document.addEventListener("site:page", watchCurrentPage)
    window.addEventListener("pagehide", () => {
      stopWaiting()
    })
    window.addEventListener("pageshow", (event) => {
      if (event.persisted) {
        watchCurrentPage()
      }
    })
  })()
}
if (new RegExp("^.*://.*/.*$").test(location.href)) {
  // Generated from src/ — do not edit by hand.
  ;(function installLoadingCover(force = false, timeoutMs = 8000) {
    const root = document.documentElement
    if (!root) {
      // Some injection paths run before the parser creates <html>. Retry in the
      // mutation microtask instead of waiting for the much later body event.
      let timeout = 0
      const pending = new MutationObserver(() => {
        if (document.documentElement) {
          pending.disconnect()
          window.clearTimeout(timeout)
          installLoadingCover(force, timeoutMs)
        }
      })
      pending.observe(document, { childList: true })
      timeout = window.setTimeout(() => pending.disconnect(), timeoutMs)
      window.addEventListener(
        "pagehide",
        () => {
          pending.disconnect()
          window.clearTimeout(timeout)
        },
        { once: true }
      )
      return null
    }
    const isChallenge = () =>
      /just a moment|attention required|checking your browser/i.test(
        document.title
      ) ||
      location.pathname.startsWith("/cdn-cgi/") ||
      Boolean(
        document.querySelector(
          "#challenge-form, #challenge-running, #cf-challenge-running, .cf-turnstile"
        )
      )
    if (isChallenge()) {
      return null
    }
    if (
      !force &&
      (!/(^|\.)(4khdhub|hdhub4u|hblinks|hubcloud|hubcdn)\./i.test(
        location.hostname
      ) ||
        /\.(mkv|mp4|avi|mov|webm|zip|rar|7z|iso|mp3|flac)$/i.test(
          location.pathname
        ))
    ) {
      return null
    }
    const existing = document.getElementById("userpatch-page-loader")
    if (existing) {
      return existing
    }
    let style = document.getElementById("userpatch-page-loader-style")
    if (!style) {
      style = document.createElement("style")
      style.id = "userpatch-page-loader-style"
      style.textContent = `
      html[data-userpatch-loading] { background: #0a0a0a !important; color-scheme: light dark !important; }
      /* Visibility alone can be overridden by the source's visible children.
         Opacity suppresses the entire body, including its white background. */
      html[data-userpatch-loading] > body {
        visibility: hidden !important;
        opacity: 0 !important;
        pointer-events: none !important;
      }
      #userpatch-page-loader {
        all: initial !important; position: fixed !important; inset: 0 !important;
        z-index: 2147483647 !important; display: grid !important;
        place-items: center !important; visibility: visible !important;
        background: #0a0a0a !important; color: #fafafa !important;
      }
      #userpatch-page-loader progress, progress.userpatch-loading-spinner {
        appearance: none !important; display: block !important;
        inline-size: 2rem !important; block-size: 2rem !important;
        box-sizing: border-box !important; margin: auto !important;
        border: 2px solid #444 !important; border-block-start-color: #fafafa !important;
        border-radius: 50% !important; background: transparent !important;
        animation: userpatch-loader-spin 1s linear infinite !important;
      }
      #userpatch-page-loader progress::-webkit-progress-bar,
      progress.userpatch-loading-spinner::-webkit-progress-bar { display: none; }
      #userpatch-page-loader progress::-moz-progress-bar,
      progress.userpatch-loading-spinner::-moz-progress-bar { background: transparent; }
      @keyframes userpatch-loader-spin { to { transform: rotate(360deg); } }
      @media (prefers-color-scheme: light) {
        html[data-userpatch-loading] { background: #ffffff !important; }
        #userpatch-page-loader { background: #ffffff !important; color: #0a0a0a !important; }
        #userpatch-page-loader progress, progress.userpatch-loading-spinner {
          border-color: #ddd !important;
          border-block-start-color: #0a0a0a !important;
        }
      }
      @media (prefers-reduced-motion: reduce) {
        #userpatch-page-loader progress, progress.userpatch-loading-spinner { animation-duration: 6s !important; }
      }
    `
      root.append(style)
    }
    const cover = document.createElement("div")
    cover.id = "userpatch-page-loader"
    cover.setAttribute("aria-busy", "true")
    const spinner = document.createElement("progress")
    spinner.setAttribute("aria-label", "Loading page")
    cover.append(spinner)
    root.dataset.userpatchLoading = ""
    root.append(cover)
    let timer = 0
    const cleanup = () => {
      delete root.dataset.userpatchLoading
      cover.remove()
      observer.disconnect()
      window.clearTimeout(timer)
    }
    const observer = new MutationObserver(() => {
      if (!Object.hasOwn(root.dataset, "userpatchLoading") || isChallenge()) {
        cleanup()
        return
      }
      // Some themes rebuild body/head during startup. Keep the cover and its
      // stylesheet outside those containers until the redesign explicitly reveals.
      if (!style.isConnected) {
        root.append(style)
      }
      if (!cover.isConnected) {
        root.append(cover)
      }
    })
    observer.observe(document, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["data-userpatch-loading"],
    })
    timer = window.setTimeout(cleanup, timeoutMs)
    window.addEventListener(
      "pagehide",
      () => {
        // Do not uncover a partially parsed outgoing document during navigation.
        observer.disconnect()
        window.clearTimeout(timer)
      },
      { once: true }
    )
    window.addEventListener("pageshow", (event) => {
      if (event.persisted) {
        cleanup()
      }
    })
    return cover
  })()

  ;("use strict")

  ;(function () {
    // src/hubcdn/detect.js
    const isHubCdnGeneratedPage = () =>
      Boolean(
        document.querySelector("#download_container .loading") &&
        /hubcdn/i.test(
          document.querySelector("main > header")?.textContent || ""
        )
      )

    // src/hubcloud/generated-page.js
    const isHubCloudGeneratedPage = () =>
      Boolean(
        document.querySelector("main #loadingState.state") &&
        /hubcloud/i.test(
          document.querySelector("header .logo-text")?.textContent || ""
        )
      )

    // src/hubcloud/config.js
    const CONFIG = Object.freeze({
      themeColor: "#121212",
      brandName: "HubCloud",
      filenameLineHeight: 1.45,
      logoWidth: 38,
      logoHeight: 38,
      googleFontUrl:
        "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap",
    })
    const STYLE_ID = "userpatch-hubcloud-redesign-style"
    const GOOGLE_FONT_STYLE_ID = "userpatch-hubcloud-google-font"
    const COLOR_SCHEME_META_ID = "userpatch-hubcloud-color-scheme"
    const THEME_COLOR_META_ID = "userpatch-hubcloud-theme-color"
    const HEADER_ID = "userpatch-hubcloud-header"
    const GUIDE_ROW_ID = "userpatch-guide-row"
    const BUTTON_GROUP_CLASS = "userpatch-btn-group"
    const BUTTON_MAIN_CLASS = "userpatch-btn-main"
    const COPY_BUTTON_CLASS = "userpatch-copy-btn"
    const DIRECT_DOWNLOAD_BUTTON_CLASS = "userpatch-direct-download-btn"

    // src/shared/icons.js
    const LUCIDE_ICON_TEMPLATES = new Map()
    const createLucideIcon$1 = (name, shapes, decorate) => {
      const cached = LUCIDE_ICON_TEMPLATES.get(name)
      if (cached) {
        return cached.cloneNode(true)
      }
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
      svg.setAttribute("width", "24")
      svg.setAttribute("height", "24")
      svg.setAttribute("viewBox", "0 0 24 24")
      svg.setAttribute("fill", "none")
      svg.setAttribute("stroke", "currentColor")
      svg.setAttribute("stroke-width", "2")
      svg.setAttribute("stroke-linecap", "round")
      svg.setAttribute("stroke-linejoin", "round")
      svg.setAttribute("aria-hidden", "true")
      svg.setAttribute("focusable", "false")
      if (decorate) {
        decorate(svg, name)
      }
      for (const [tagName, attributes] of shapes[name] || []) {
        const shape = document.createElementNS(
          "http://www.w3.org/2000/svg",
          tagName
        )
        for (const [attribute, value] of Object.entries(attributes)) {
          shape.setAttribute(attribute, value)
        }
        svg.append(shape)
      }
      LUCIDE_ICON_TEMPLATES.set(name, svg)
      return svg.cloneNode(true)
    }

    // src/shared/provider-logos.js
    const makeSvgDataUri = (svg) =>
      `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
    const HUBCLOUD_LOGO_SVG = String.raw`<svg xmlns="http://www.w3.org/2000/svg" viewBox="-0.043 0.659 177.311 122.029" width="177" height="123">
  <defs>
    <linearGradient id="grad-left" gradientUnits="userSpaceOnUse" x1="31.00" y1="47.00" x2="11.00" y2="117.00">
      <stop offset="0" stop-color="#00aaef"/>
      <stop offset="1" stop-color="#0084e9"/>
    </linearGradient>
    <linearGradient id="grad-cyan" gradientUnits="userSpaceOnUse" x1="82.00" y1="-6.00" x2="59.60" y2="101.00">
      <stop offset="0" stop-color="#00f1f2"/>
      <stop offset="1" stop-color="#00a5ec"/>
    </linearGradient>
    <linearGradient id="grad-mid" gradientUnits="userSpaceOnUse" x1="138.00" y1="0.00" x2="65.30" y2="103.00">
      <stop offset="0" stop-color="#00d5f2"/>
      <stop offset="1" stop-color="#0064e3"/>
    </linearGradient>
    <linearGradient id="grad-white" gradientUnits="userSpaceOnUse" x1="123.00" y1="51.00" x2="123.00" y2="121.00" gradientTransform="matrix(1, 0, 0, 1.001083, 0, -0.055333)">
      <stop offset="0" stop-color="#fcfafb"/>
      <stop offset="1" stop-color="#f7f7f7"/>
    </linearGradient>
    <path id="left-blue-path" d="M 39.20 44.60 A 38.99 38.99 0 0 0 33.22 122.10 L 71.00 122.10 L 71.00 44.60 Z"/>
    <path id="cyan-dome-path" d="M 128.40 27.85 C 118.50 11.20, 100.50 0.93, 82.50 1.05 C 53.60 0.02, 28.14 26.14, 27.57 54.50 C 26.56 70.83, 36.41 86.79, 51.31 93.50 C 58.00 96.40, 66.00 98.00, 78.00 98.60 L 113.00 69.00 Z"/>
    <path id="mid-blue-path" d="M 131.80 27.73 L 128.40 27.85 C 99.62 27.66, 73.17 48.02, 63.30 74.50 C 57.02 89.28, 56.34 107.24, 64.40 122.10 L 145.00 122.10 L 169.17 98.00 A 45.07 45.07 0 0 0 131.80 27.73 Z"/>
    <path id="white-cloud-path" d="M 96.00 122.05 C 83.84 120.65, 73.97 109.64, 73.33 96.30 A 24.98 24.98 0 0 1 96.06 71.41 A 28.49 28.49 0 0 1 150.56 71.19 A 25.30 25.30 0 0 1 168.43 102.55 A 28.55 28.55 0 0 1 143.00 122.05 Z"/>
    <clipPath id="blue-silhouette">
      <path d="M 39.20 44.60 A 38.99 38.99 0 0 0 33.22 122.10 L 71.00 122.10 L 71.00 44.60 Z"/>
      <path d="M 128.40 27.85 C 118.50 11.20, 100.50 0.93, 82.50 1.05 C 53.60 0.02, 28.14 26.14, 27.57 54.50 C 26.56 70.83, 36.41 86.79, 51.31 93.50 C 58.00 96.40, 66.00 98.00, 78.00 98.60 L 113.00 69.00 Z"/>
      <path d="M 131.80 27.73 L 128.40 27.85 C 99.62 27.66, 73.17 48.02, 63.30 74.50 C 57.02 89.28, 56.34 107.24, 64.40 122.10 L 145.00 122.10 L 169.17 98.00 A 45.07 45.07 0 0 0 131.80 27.73 Z"/>
    </clipPath>
    <filter id="white-shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="1.1" result="blur"/>
      <feOffset in="blur" dx="-0.6" dy="-0.2" result="offsetBlur"/>
      <feFlood flood-color="#001950" flood-opacity="0.42" result="shadowColor"/>
      <feComposite in="shadowColor" in2="offsetBlur" operator="in"/>
    </filter>
  </defs>
  <path d="M 39.20 44.60 A 38.99 38.99 0 0 0 33.22 122.10 L 71.00 122.10 L 71.00 44.60 Z" fill="url(#grad-left)"/>
  <path d="M 128.40 27.85 C 118.50 11.20, 100.50 0.93, 82.50 1.05 C 53.60 0.02, 28.14 26.14, 27.57 54.50 C 26.56 70.83, 36.41 86.79, 51.31 93.50 C 58.00 96.40, 66.00 98.00, 78.00 98.60 L 113.00 69.00 Z" fill="url(#grad-cyan)"/>
  <path d="M 131.80 27.73 L 128.40 27.85 C 99.62 27.66, 73.17 48.02, 63.30 74.50 C 57.02 89.28, 56.34 107.24, 64.40 122.10 L 145.00 122.10 L 169.17 98.00 A 45.07 45.07 0 0 0 131.80 27.73 Z" fill="url(#grad-mid)"/>
  <path d="M 58.52 95.50 C 64.00 97.40, 70.00 98.20, 79.00 98.80 L 90.00 122.10 L 64.40 122.10 C 59.92 113.83, 58.14 104.61, 58.52 95.50 Z" fill="#005fd8"/>
  <g clip-path="url(#blue-silhouette)">
    <path d="M 96.00 122.05 C 83.84 120.65, 73.97 109.64, 73.33 96.30 A 24.98 24.98 0 0 1 96.06 71.41 A 28.49 28.49 0 0 1 150.56 71.19 A 25.30 25.30 0 0 1 168.43 102.55 A 28.55 28.55 0 0 1 143.00 122.05 Z" fill="#000000" filter="url(#white-shadow)"/>
  </g>
  <path d="M 96 122.127 C 83.84 120.725 73.97 109.703 73.33 96.349 C 73.324 83.406 83.184 72.598 96.06 71.432 C 102.375 50.406 129.058 44.108 144.089 60.096 C 147.064 63.259 149.277 67.061 150.56 71.212 C 164.237 74.834 172.289 88.98 168.43 102.606 C 164.745 113.711 156.691 121.445 145.022 122.127 L 96 122.127 Z" fill="url(#grad-white)" style=""/>
</svg>`
    const HUBCLOUD_LOGO_DATA_URI = makeSvgDataUri(HUBCLOUD_LOGO_SVG)
    const HUBDRIVE_LOGO_SVG = String.raw`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 249 249" width="249" height="249">
  <defs>
    <linearGradient id="bg-blue" gradientUnits="userSpaceOnUse" x1="35.36" y1="35.07" x2="165.36" y2="165.07">
      <stop offset="0" stop-color="#5492f0"/>
      <stop offset="1" stop-color="#468aef"/>
    </linearGradient>
    <linearGradient id="long-shadow" gradientUnits="userSpaceOnUse" x1="116.86" y1="162.07" x2="156.86" y2="231.37">
      <stop offset="0" stop-color="#001450" stop-opacity="0.068"/>
      <stop offset="1" stop-color="#001450" stop-opacity="0"/>
    </linearGradient>
    <clipPath id="circle-clip">
      <circle cx="124.50" cy="124.50" r="123.88"/>
    </clipPath>
  </defs>
  <circle cx="124.50" cy="124.50" r="123.88" fill="url(#bg-blue)"/>
  <g clip-path="url(#circle-clip)">
    <path d="M 310.50 227.06 L 160.50 77.06 A 50.95 50.95 0 0 1 175.12 107.56 A 33.99 33.99 0 1 1 175.18 175.54 L 79.38 175.54 A 39.62 39.62 0 0 1 51.36 163.94 L 201.36 313.94 Z" fill="url(#long-shadow)"/>
  </g>
  <path d="M 175.18 175.54 L 79.38 175.54 A 39.62 39.62 0 0 1 76.32 96.42 A 50.95 50.95 0 0 1 175.12 107.56 A 33.99 33.99 0 1 1 175.18 175.54 Z M 108.39 97.26 H 141.59 V 125.44 H 158.42 L 125.09 158.69 L 91.83 125.44 H 108.39 Z" fill="#ffffff" fill-rule="evenodd"/>
</svg>`
    const HUBDRIVE_LOGO_DATA_URI = makeSvgDataUri(HUBDRIVE_LOGO_SVG)
    const HUBCDN_LOGO_SVG = String.raw`<svg width="216" height="260" viewBox="0 0 216 260" xmlns="http://www.w3.org/2000/svg"><title>undraw_handcrafts_heart</title><g fill="none"><path d="M94.612 259.442c-52.87-27.61-89.83-83.546-94.497-143.008-2.677-34.116 42-57.722 73.18-43.618s45.416 52.377 42.057 86.433c-3.36 34.055-20.522 64.984-20.74 100.193" fill="#b9fff4"/><path d="m180.8 59.136-.002-.002.022.057.002.002z" fill="#000"/><path d="M210.18 49.32c-9.959-27.16-41.17-31.961-64.158-17.966a102 102 0 0 0-10.83 7.159C126.986 22.216 114.311 6.342 96.626.665c-18.734-3.47-38.053 7.13-50.715 20.369C34.808 33.217 29.554 49.242 23.814 64.39c-7.425 19.42-5.637 40.524-.681 60.308 5.518 24.51 19.25 46.018 34.14 65.883 17.341 23.568 36.811 45.456 55.79 67.695-16.404-27.606-34.051-54.514-48.789-83.074-9.574-18.305-15.647-32.086-19.093-55.445a155 155 0 0 1-1.548-21.374c.179-8.247.613-8.191.746-9.59 2.97-15.129 15.054-38.773 20.212-45.34a39 39 0 0 1 4.92-4.745 27 27 0 0 1 3.381-2.086c4.253-2.02 2.698-2 12.054-4.589h.004c.699-.03 1.345-.032 1.868-.023.23.134.461.265.686.407 8.802 8.28 6.196 6.106 10.328 11.3l1.05 1.484a87.4 87.4 0 0 1 6.546 11.272c1.768 2.63 7.162 26.82 29.194 21.615a28.8 28.8 0 0 0 10.114-5.904 574 574 0 0 0 7.158-5.542c2.509-1.853 7.729-5.67 9.68-6.699a48 48 0 0 1 5.05-2.73 40 40 0 0 1 6.261-1.897c.41-.025.818-.085 1.228-.079.167.002.332.031.498.037.793.196 1.903.478 3.011.821.21.12.422.236.627.365a34 34 0 0 1 1.71 1.71q.766 1.148 1.387 2.381c1.5 4.087 2.738 8.265 3.704 12.51 3.598 14.583 2.86 25.085.322 37.42-10.04 46.747-36.895 82.132-64.628 125.968a621 621 0 0 1-9.546 13.878c10.995-10.373 21.466-21.286 31.577-32.52 21.612-23.877 43.757-47.96 57.517-77.437 7.013-14.537 13.001-29.855 14.723-46.011a112.4 112.4 0 0 0-4.835-45.038" fill="#6366f1"/></g></svg>`
    const HUBCDN_LOGO_DATA_URI = makeSvgDataUri(HUBCDN_LOGO_SVG)

    // src/hubcloud/icons.js
    const LUCIDE_ICON_SHAPES = Object.freeze({
      copy: Object.freeze([
        [
          "rect",
          {
            width: "14",
            height: "14",
            x: "8",
            y: "8",
            rx: "2",
            ry: "2",
          },
        ],
        [
          "path",
          { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" },
        ],
      ]),
      check: Object.freeze([["path", { d: "m20 6-11 11-5-5" }]]),
      download: Object.freeze([
        ["path", { d: "M12 15V3" }],
        ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }],
        ["path", { d: "m7 10 5 5 5-5" }],
      ]),
      "file-video": Object.freeze([
        [
          "path",
          { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" },
        ],
        ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4" }],
        ["path", { d: "m10 11 5 3-5 3v-6Z" }],
      ]),
      "hard-drive": Object.freeze([
        ["path", { d: "M10 16h.01" }],
        [
          "path",
          {
            d: "M2.212 11.577a2 2 0 0 0-.212.896V18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5.527a2 2 0 0 0-.212-.896L18.55 5.11A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z",
          },
        ],
        ["path", { d: "M21.946 12.013H2.054" }],
        ["path", { d: "M6 16h.01" }],
      ]),
      rss: Object.freeze([
        ["path", { d: "M4 11a9 9 0 0 1 9 9" }],
        ["path", { d: "M4 4a16 16 0 0 1 16 16" }],
        [
          "circle",
          {
            cx: "5",
            cy: "19",
            r: "1",
          },
        ],
      ]),
      info: Object.freeze([
        [
          "circle",
          {
            cx: "12",
            cy: "12",
            r: "10",
          },
        ],
        ["path", { d: "M12 16v-4" }],
        ["path", { d: "M12 8h.01" }],
      ]),
      "loader-2": Object.freeze([
        ["path", { d: "M21 12a9 9 0 1 1-6.219-8.56" }],
      ]),
      smartphone: Object.freeze([
        [
          "rect",
          {
            width: "14",
            height: "20",
            x: "5",
            y: "2",
            rx: "2",
            ry: "2",
          },
        ],
        ["path", { d: "M12 18h.01" }],
      ]),
      sparkles: Object.freeze([
        [
          "path",
          {
            d: "M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",
          },
        ],
        ["path", { d: "M20 2v4" }],
        ["path", { d: "M22 4h-4" }],
        [
          "circle",
          {
            cx: "4",
            cy: "20",
            r: "2",
          },
        ],
      ]),
      "external-link": Object.freeze([
        ["path", { d: "M15 3h6v6" }],
        ["path", { d: "M10 14 21 3" }],
        [
          "path",
          { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" },
        ],
      ]),
      "arrow-down-to-line": Object.freeze([
        ["path", { d: "M12 17V3" }],
        ["path", { d: "m6 11 6 6 6-6" }],
        ["path", { d: "M19 21H5" }],
      ]),
      x: Object.freeze([
        ["path", { d: "M18 6 6 18" }],
        ["path", { d: "m6 6 12 12" }],
      ]),
      "share-2": Object.freeze([
        [
          "circle",
          {
            cx: "18",
            cy: "5",
            r: "3",
          },
        ],
        [
          "circle",
          {
            cx: "6",
            cy: "12",
            r: "3",
          },
        ],
        [
          "circle",
          {
            cx: "18",
            cy: "19",
            r: "3",
          },
        ],
        [
          "line",
          {
            x1: "8.59",
            x2: "15.42",
            y1: "13.51",
            y2: "17.49",
          },
        ],
        [
          "line",
          {
            x1: "15.41",
            x2: "8.59",
            y1: "6.51",
            y2: "10.49",
          },
        ],
      ]),
    })
    const createSpinnerIcon = () => {
      const spinner = createLucideIcon("loader-2")
      spinner.classList.add("userpatch-spinner")
      return spinner
    }
    let telegramIconTemplate = null
    const createTelegramIcon = () => {
      if (telegramIconTemplate) {
        return telegramIconTemplate.cloneNode(true)
      }
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
      svg.setAttribute("viewBox", "0 0 256 256")
      svg.setAttribute("width", "24")
      svg.setAttribute("height", "24")
      svg.setAttribute("preserveAspectRatio", "xMidYMid")
      svg.setAttribute("aria-hidden", "true")
      svg.setAttribute("focusable", "false")
      svg.setAttribute("class", "preview-icon userpatch-telegram-icon")
      svg.dataset.userpatchLucideIcon = "telegram"
      const defs = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "defs"
      )
      const linearGradient = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "linearGradient"
      )
      linearGradient.setAttribute("id", "telegram__a")
      linearGradient.setAttribute("x1", "50%")
      linearGradient.setAttribute("x2", "50%")
      linearGradient.setAttribute("y1", "0%")
      linearGradient.setAttribute("y2", "100%")
      const stop1 = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "stop"
      )
      stop1.setAttribute("offset", "0%")
      stop1.setAttribute("stop-color", "#2AABEE")
      const stop2 = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "stop"
      )
      stop2.setAttribute("offset", "100%")
      stop2.setAttribute("stop-color", "#229ED9")
      linearGradient.append(stop1, stop2)
      defs.append(linearGradient)
      const circlePath = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      )
      circlePath.setAttribute("fill", "url(#telegram__a)")
      circlePath.setAttribute(
        "d",
        "M128 0C94.06 0 61.48 13.494 37.5 37.49A128.038 128.038 0 0 0 0 128c0 33.934 13.5 66.514 37.5 90.51C61.48 242.506 94.06 256 128 256s66.52-13.494 90.5-37.49c24-23.996 37.5-56.576 37.5-90.51 0-33.934-13.5-66.514-37.5-90.51C194.52 13.494 161.94 0 128 0Z"
      )
      const planePath = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      )
      planePath.setAttribute("fill", "#FFF")
      planePath.setAttribute(
        "d",
        "M57.94 126.648c37.32-16.256 62.2-26.974 74.64-32.152 35.56-14.786 42.94-17.354 47.76-17.441 1.06-.017 3.42.245 4.96 1.49 1.28 1.05 1.64 2.47 1.82 3.467.16.996.38 3.266.2 5.038-1.92 20.24-10.26 69.356-14.5 92.026-1.78 9.592-5.32 12.808-8.74 13.122-7.44.684-13.08-4.912-20.28-9.63-11.26-7.386-17.62-11.982-28.56-19.188-12.64-8.328-4.44-12.906 2.76-20.386 1.88-1.958 34.64-31.748 35.26-34.45.08-.338.16-1.598-.6-2.262-.74-.666-1.84-.438-2.64-.258-1.14.256-19.12 12.152-54 35.686-5.1 3.508-9.72 5.218-13.88 5.128-4.56-.098-13.36-2.584-19.9-4.708-8-2.606-14.38-3.984-13.82-8.41.28-2.304 3.46-4.662 9.52-7.072Z"
      )
      svg.append(defs, circlePath, planePath)
      telegramIconTemplate = svg
      return telegramIconTemplate.cloneNode(true)
    }
    const normalizeLucideIcons = (root = document) => {
      for (const icon of root.querySelectorAll(
        "i.fa-file-download, i.fa-download"
      )) {
        icon.replaceWith(createLucideIcon("download"))
      }
      for (const icon of root.querySelectorAll("i.fa-copy, i.fa-clone")) {
        icon.replaceWith(createLucideIcon("copy"))
      }
      for (const icon of root.querySelectorAll("i.fa-video")) {
        icon.replaceWith(createLucideIcon("file-video"))
      }
      for (const icon of root.querySelectorAll("i.fa-android")) {
        icon.replaceWith(createLucideIcon("smartphone"))
      }
      for (const icon of root.querySelectorAll("i.fa-telegram")) {
        icon.replaceWith(createTelegramIcon())
      }
    }
    const createLucideIcon = (name) =>
      createLucideIcon$1(name, LUCIDE_ICON_SHAPES, (svg, iconName) => {
        svg.setAttribute("class", `lucide lucide-${iconName} preview-icon`)
        svg.dataset.userpatchLucideIcon = iconName
      })

    // src/hubcloud/clipboard.js
    const copyToClipboard = async (text) => {
      try {
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(text)
          return true
        }
      } catch {}
      const textarea = document.createElement("textarea")
      try {
        textarea.value = text
        textarea.style.position = "fixed"
        textarea.style.opacity = "0"
        document.body?.append(textarea)
        textarea.select()
        return document.execCommand("copy")
      } catch {
        return false
      } finally {
        textarea.remove()
      }
    }
    const copyFeedbackTimers = new WeakMap()
    const showCopiedFeedback = (
      button,
      { label, copiedLabel, icon = "copy", text = "", copiedText = "" }
    ) => {
      const render = (copied) => {
        const currentLabel = copied ? copiedLabel : label
        button.replaceChildren(createLucideIcon(copied ? "check" : icon))
        const currentText = copied ? copiedText : text
        if (currentText) {
          const span = document.createElement("span")
          span.textContent = currentText
          button.append(span)
        }
        button.setAttribute("aria-label", currentLabel)
        button.title = currentLabel
        button.classList.toggle("userpatch-copied", copied)
      }
      window.clearTimeout(copyFeedbackTimers.get(button))
      render(true)
      copyFeedbackTimers.set(
        button,
        window.setTimeout(() => {
          render(false)
          copyFeedbackTimers.delete(button)
        }, 1500)
      )
    }

    // src/hubcloud/mirror-rows.js
    const isWatchOnlineButton = (button) => {
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
    const cleanMirrorLabel = (text) => {
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
      if (lower.includes("pixel")) {
        return "PixelDrain"
      }
      if (lower.includes("telegram")) {
        return "Get File in Telegram"
      }
      if (/\bt3\b/i.test(clean)) {
        return "T3 Server"
      }
      if (
        lower.includes("fsl") &&
        (lower.includes("v2") || lower.includes("2"))
      ) {
        return "FSL Server v2"
      }
      if (lower.includes("fsl")) {
        return "FSL Server"
      }
      return clean
    }
    const getButtonVariant = (button) => {
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
      return "default"
    }
    const RESUMABLE_THEME = Object.freeze({
      bg: "#0051c3",
      color: "#ffffff",
    })
    const MIRROR_THEMES = Object.freeze({
      fsl: RESUMABLE_THEME,
      t3: RESUMABLE_THEME,
      "10gbps": Object.freeze({
        bg: "#c2410c",
        color: "#ffffff",
      }),
      gofile: Object.freeze({
        bg: "#7c3aed",
        color: "#ffffff",
      }),
      pixeldrain: Object.freeze({
        bg: "#047857",
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
    const DIALOG_ID = "userpatch-mirror-guide-dialog"
    const TRIGGER_ID = "userpatch-mirror-guide-trigger"
    const orderDownloadButtons = () => {
      const groups = Array.from(
        document.querySelectorAll(`.${BUTTON_GROUP_CLASS}`)
      )
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
            "10gbps": 20,
            gofile: 25,
            pixeldrain: 30,
            telegram: 50,
          }[variant] || 40
        )
      }
      const parent = groups[0].parentElement
      if (!parent) {
        return
      }
      const sorted = groups.toSorted((a, b) => getPriority(a) - getPriority(b))
      const guideRow = document.getElementById(GUIDE_ROW_ID)
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
    const wrapDownloadButtons = (
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
          button.classList.contains("userpatch-copy-btn") ||
          button.classList.contains("userpatch-direct-download-btn") ||
          button.classList.contains("userpatch-mirror-guide-trigger") ||
          button.classList.contains("userpatch-share-btn") ||
          button.classList.contains("userpatch-pack-copy-btn") ||
          button.classList.contains("userpatch-dialog-close-btn") ||
          button.classList.contains("userpatch-dialog-btn") ||
          button.closest(
            `[data-slot="button-group"], .${"userpatch-btn-group"}, .input-group`
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
        const variant = getButtonVariant(button)
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
        const cleanLabel = cleanMirrorLabel(button.textContent || "")
        button.textContent = ""
        const mirrorIcon =
          variant === "telegram"
            ? createTelegramIcon()
            : createLucideIcon(
                ["10gbps", "pixeldrain", "buzz"].includes(variant)
                  ? "external-link"
                  : "arrow-down-to-line"
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
      }
      orderDownloadButtons()
      if (guide) {
        ensureMirrorGuide()
      }
    }

    // src/hubcloud/mirror-guide.js
    let supportsDisplayTransition
    const canTransitionDisplay = () => {
      if (supportsDisplayTransition !== undefined) {
        return supportsDisplayTransition
      }
      if (
        !document.body ||
        !window.CSS?.supports?.("transition-behavior", "allow-discrete")
      ) {
        return false
      }
      const probe = document.createElement("div")
      probe.style.cssText =
        "position: fixed; visibility: hidden; transition: display 1s allow-discrete !important; display: block;"
      document.body.append(probe)
      try {
        const displayBefore = getComputedStyle(probe).display
        probe.style.display = "none"
        const displayDuringTransition = getComputedStyle(probe).display
        supportsDisplayTransition =
          displayBefore === "block" && displayDuringTransition === "block"
      } catch {
        supportsDisplayTransition = false
      } finally {
        probe.remove()
      }
      return supportsDisplayTransition
    }
    const supportsDiscreteDialogExit = () => {
      return window.CSS?.supports?.("overlay", "auto") && canTransitionDisplay()
    }
    const isDialogBackdropClick = (event, dialog) => {
      if (event.target !== dialog) {
        return false
      }
      const bounds = dialog.getBoundingClientRect()
      return (
        event.clientX < bounds.left ||
        event.clientX > bounds.right ||
        event.clientY < bounds.top ||
        event.clientY > bounds.bottom
      )
    }
    const openMirrorGuideDialog = () => {
      const dialog = document.getElementById(DIALOG_ID)
      if (dialog instanceof HTMLDialogElement) {
        if (dialog.open) {
          delete dialog.dataset.closing
          return
        }
        try {
          dialog.showModal()
        } catch {
          return
        }
      }
    }
    const closeMirrorGuideDialog = () => {
      const dialog = document.getElementById(DIALOG_ID)
      if (
        !(dialog instanceof HTMLDialogElement) ||
        !dialog.open ||
        dialog.dataset.closing !== undefined
      ) {
        return
      }
      if (supportsDiscreteDialogExit()) {
        dialog.close()
        return
      }
      dialog.dataset.closing = "true"
      let animations = []
      try {
        animations = dialog.getAnimations({ subtree: true })
      } catch {
        dialog.close()
        return
      }
      let timeoutId = 0
      const finishClose = () => {
        window.clearTimeout(timeoutId)
        if (dialog.open && dialog.dataset.closing !== undefined) {
          dialog.close()
        }
      }
      if (animations.length === 0) {
        finishClose()
        return
      }
      timeoutId = window.setTimeout(finishClose, 1e3)
      Promise.allSettled(
        animations.map((animation) => animation.finished)
      ).then(finishClose)
    }
    const ensureMirrorGuide = ({ hubCdn = false } = {}) => {
      if (
        !("HTMLDialogElement" in window) ||
        typeof window.HTMLDialogElement.prototype.showModal !== "function"
      ) {
        return
      }
      const allGroups = Array.from(
        document.querySelectorAll(`.${BUTTON_GROUP_CLASS}`)
      ).filter(
        (grp) =>
          !grp.closest(".loading, .d-none") &&
          grp.querySelector(`.${"userpatch-btn-main"}`)
      )
      const existingRow = document.getElementById(GUIDE_ROW_ID)
      if (allGroups.length === 0) {
        if (existingRow) {
          existingRow.remove()
        }
        return
      }
      const firstGroup = allGroups[0]
      let guideRow = existingRow
      if (!guideRow) {
        guideRow = document.createElement("div")
        guideRow.id = GUIDE_ROW_ID
        guideRow.className = "userpatch-guide-row"
      }
      let trigger = document.getElementById(TRIGGER_ID)
      if (!trigger) {
        trigger = document.createElement("button")
        trigger.id = TRIGGER_ID
        trigger.type = "button"
        trigger.className = "userpatch-mirror-guide-trigger"
        trigger.dataset.slot = "button"
        trigger.dataset.variant = "ghost"
        trigger.dataset.size = "icon"
        trigger.setAttribute("aria-haspopup", "dialog")
        trigger.setAttribute("aria-controls", DIALOG_ID)
        trigger.setAttribute("aria-label", "Server and mirror guide")
        trigger.setAttribute("title", "Server and mirror guide")
        const infoIcon = createLucideIcon("info")
        trigger.append(infoIcon)
        trigger.addEventListener("click", (event) => {
          event.preventDefault()
          openMirrorGuideDialog()
        })
      }
      if (trigger.parentElement !== guideRow) {
        guideRow.append(trigger)
      }
      if (guideRow.nextElementSibling !== firstGroup) {
        firstGroup.before(guideRow)
      }
      if (!document.getElementById("userpatch-mirror-guide-dialog")) {
        const dialog = document.createElement("dialog")
        dialog.id = DIALOG_ID
        dialog.className = "userpatch-dialog"
        dialog.dataset.slot = "dialog-content"
        dialog.setAttribute("closedby", "any")
        dialog.setAttribute("aria-labelledby", "userpatch-dialog-title")
        dialog.setAttribute("aria-describedby", "userpatch-dialog-description")
        const header = document.createElement("div")
        header.className = "userpatch-dialog-header"
        const title = document.createElement("h2")
        title.id = "userpatch-dialog-title"
        title.className = "userpatch-dialog-title"
        title.tabIndex = -1
        title.autofocus = true
        title.textContent = "Server & Mirror Guide"
        const desc = document.createElement("p")
        desc.id = "userpatch-dialog-description"
        desc.className = "userpatch-dialog-description"
        desc.textContent = hubCdn
          ? "Speed and resume support for each download server."
          : "Speed, resume support, and bandwidth limits for each download mirror."
        const closeBtn = document.createElement("button")
        closeBtn.type = "button"
        closeBtn.className = "userpatch-dialog-close-btn"
        closeBtn.setAttribute("aria-label", "Close dialog")
        closeBtn.append(createLucideIcon("x"))
        closeBtn.addEventListener("click", closeMirrorGuideDialog)
        header.append(title, desc, closeBtn)
        const body = document.createElement("ul")
        body.className = "userpatch-dialog-body"
        const guides = [
          {
            badge: hubCdn ? "Cloudflare" : "FSL / FSL v2 / T3",
            variant: "fsl",
            icon: "arrow-down-to-line",
            heading: "Supports Resume",
            text: "Interrupted downloads can resume without restarting from the beginning.",
          },
          {
            badge: "10Gbps Server",
            variant: "10gbps",
            icon: "external-link",
            heading: "No Resume Support",
            text: "Opens a high-speed download page. Interrupted downloads cannot resume and must restart from the beginning.",
          },
          {
            badge: "PixelDrain",
            variant: "pixeldrain",
            icon: "external-link",
            heading: "6 GB Daily Bandwidth Limit for Free and Guest Users",
            text: "High-speed mirror, but download traffic is capped at 6 GB per day per IP address for free and guest users.",
          },
        ]
        for (const item of guides) {
          if (hubCdn && item.variant === "pixeldrain") {
            continue
          }
          const row = document.createElement("li")
          row.className = "userpatch-guide-item"
          const badge = document.createElement("div")
          const theme = MIRROR_THEMES[item.variant] || MIRROR_THEMES.default
          badge.className = "userpatch-guide-button"
          badge.style.setProperty("--userpatch-btn-bg", theme.bg)
          badge.style.setProperty("--userpatch-btn-color", theme.color)
          const badgeIcon =
            item.icon === "telegram"
              ? createTelegramIcon()
              : createLucideIcon(item.icon)
          const badgeText = document.createElement("span")
          badgeText.textContent = item.badge
          badge.append(badgeIcon, badgeText)
          const heading = document.createElement("h3")
          heading.className = "userpatch-guide-heading"
          heading.textContent = item.heading
          const text = document.createElement("p")
          text.className = "userpatch-guide-text"
          text.textContent = item.text
          row.append(badge, heading, text)
          body.append(row)
        }
        dialog.append(header, body)
        if (!("closedBy" in window.HTMLDialogElement.prototype)) {
          let pressedOutside = false
          dialog.addEventListener("pointerdown", (event) => {
            pressedOutside = isDialogBackdropClick(event, dialog)
          })
          dialog.addEventListener("pointerup", (event) => {
            if (pressedOutside && isDialogBackdropClick(event, dialog)) {
              closeMirrorGuideDialog()
            }
            pressedOutside = false
          })
          dialog.addEventListener("pointercancel", () => {
            pressedOutside = false
          })
        }
        dialog.addEventListener("cancel", (event) => {
          if (supportsDiscreteDialogExit()) {
            return
          }
          event.preventDefault()
          closeMirrorGuideDialog()
        })
        dialog.addEventListener("close", () => {
          delete dialog.dataset.closing
        })
        document.body?.append(dialog)
      }
    }

    // src/shared/generated-page.js
    const getGeneratedPage = () => {
      if (isHubCloudGeneratedPage()) {
        return "HubCloud"
      }
      if (isHubCdnGeneratedPage()) {
        return "HubCDN"
      }
      return null
    }
    const isDownloadHref = (value) => {
      try {
        const url = new URL(value)
        return /^https?:$/.test(url.protocol) && url.href !== location.href
      } catch {
        return false
      }
    }
    const getGeneratedMirrorDetails = (href) => {
      try {
        const host = new URL(href).hostname.toLowerCase()
        if (host === "video-downloads.googleusercontent.com") {
          return {
            label: "10Gbps Server",
            variant: "10gbps",
          }
        }
        if (/(^|\.)(workers\.dev|r2\.dev)$/.test(host)) {
          return {
            label: "Cloudflare Server",
            variant: "fsl",
          }
        }
      } catch {}
      return {
        label: "Download here",
        variant: "default",
      }
    }
    const normalizeGeneratedPage = () => {
      const root = document.documentElement
      root.classList.add("userpatch-generated-page")
      const container =
        document.querySelector("#download_container") ||
        document.querySelector("body > main")
      if (!container) {
        return false
      }
      let status = container.querySelector(".userpatch-generated-status")
      if (!status) {
        status = document.createElement("div")
        status.className = "userpatch-generated-status"
        const spinner = document.createElement("progress")
        spinner.className = "userpatch-loading-spinner"
        spinner.setAttribute("aria-label", "Preparing download link")
        status.append(spinner)
        container.prepend(status)
      }
      const button = container.querySelector("a#vd, a#downloadBtn")
      const parameter = new URLSearchParams(location.search).get("link")
      if (button && isDownloadHref(parameter)) {
        button.href = parameter
      }
      const ready = Boolean(
        button && isDownloadHref(button.getAttribute("href"))
      )
      root.dataset.userpatchGeneratedReady = String(ready)
      status.hidden = ready
      if (!ready) {
        return false
      }
      if (!button.classList.contains("userpatch-btn-main")) {
        button.replaceChildren(document.createTextNode("Download here"))
        button.className = "btn"
        wrapDownloadButtons(container, {
          preserveIds: true,
          guide: false,
        })
      }
      const { label, variant } = getGeneratedMirrorDetails(button.href)
      const labelElement = button.querySelector(".userpatch-btn-label")
      if (labelElement && labelElement.textContent !== label) {
        labelElement.textContent = label
      }
      const group = button.closest(".userpatch-btn-group")
      if (group && group.dataset.mirrorType !== variant) {
        const theme = MIRROR_THEMES[variant]
        group.classList.replace(
          `userpatch-group-${group.dataset.mirrorType}`,
          `userpatch-group-${variant}`
        )
        button.classList.replace(
          `userpatch-mirror-${button.dataset.mirrorType}`,
          `userpatch-mirror-${variant}`
        )
        group.dataset.mirrorType = variant
        button.dataset.mirrorType = variant
        group.style.setProperty("--userpatch-btn-bg", theme.bg)
        group.style.setProperty("--userpatch-btn-color", theme.color)
      }
      ensureMirrorGuide({ hubCdn: getGeneratedPage() === "HubCDN" })
      return true
    }
    const GENERATED_PAGE_CSS = `
html.userpatch-generated-page body {
  display: block !important;
  min-block-size: 100dvh !important;
  background: var(--background) !important;
  color: var(--foreground) !important;
}
html.userpatch-generated-page body > main {
  display: block !important;
  min-block-size: 0 !important;
  width: 100% !important;
  max-width: 42rem !important;
  inline-size: 100% !important;
  max-inline-size: 42rem !important;
  box-sizing: border-box !important;
  margin: 0 auto !important;
  padding: 1rem calc(clamp(0.75rem, 3vw, 1.25rem) + 0.25rem) !important;
}
html.userpatch-generated-page #download_container,
html.userpatch-generated-page #download_container .container.main {
  display: block !important;
  min-block-size: 0 !important;
  width: 100% !important;
  max-width: 100% !important;
  inline-size: 100% !important;
  max-inline-size: 100% !important;
  margin: 0 !important;
  padding: 0 !important;
}
html.userpatch-generated-page :is(.state, .vd) {
  /* A ready link can precede the source's hidden-class removal. Its absolute
     positioning otherwise sizes the button against the wider padding box. */
  position: static !important;
  width: 100% !important;
  inline-size: 100% !important;
  box-sizing: border-box !important;
  margin: 0 !important;
  padding: 0 !important;
  text-align: start !important;
  background: transparent !important;
  box-shadow: none !important;
  border: 0 !important;
  max-inline-size: 100% !important;
}
html.userpatch-generated-page :is(.state .title, .vd h2, #loadingState, .loading, .badge, .wave, footer, .vd > section, .state > center, br, .ads-core-ads) {
  display: none !important;
}
html.userpatch-generated-page[data-userpatch-generated-ready="false"] :is(.vd, #successState) {
  display: none !important;
}
html.userpatch-generated-page[data-userpatch-generated-ready="true"] :is(.vd, #successState) {
  display: block !important;
  /* The source's hidden state also uses opacity/visibility for its fake wait. */
  opacity: 1 !important;
  visibility: visible !important;
  transform: none !important;
  animation: none !important;
  transition: none !important;
  pointer-events: auto !important;
}
html.userpatch-generated-page .userpatch-generated-status:not([hidden]) {
  display: grid !important;
  place-items: center;
  min-block-size: 7rem;
}
html.userpatch-generated-page .userpatch-generated-status[hidden] {
  display: none !important;
}
/* Generator templates animate every circle as a preloader. Keep our icon
   geometry static without changing their actual loading indicator. */
html.userpatch-generated-page svg[data-userpatch-lucide-icon] circle {
  animation: none !important;
  transform: none !important;
  stroke-dasharray: none !important;
  stroke-dashoffset: 0 !important;
  stroke-width: inherit !important;
  will-change: auto !important;
}
html.userpatch-generated-page .userpatch-btn-group {
  margin-block: 0 !important;
}
html.userpatch-generated-page :is(.note, .note-text) {
  display: none !important;
}
`

    // src/shared/loading-cover.mjs
    function installLoadingCover(force = false, timeoutMs = 8e3) {
      const root = document.documentElement
      if (!root) {
        let timeout = 0
        const pending = new MutationObserver(() => {
          if (document.documentElement) {
            pending.disconnect()
            window.clearTimeout(timeout)
            installLoadingCover(force, timeoutMs)
          }
        })
        pending.observe(document, { childList: true })
        timeout = window.setTimeout(() => pending.disconnect(), timeoutMs)
        window.addEventListener(
          "pagehide",
          () => {
            pending.disconnect()
            window.clearTimeout(timeout)
          },
          { once: true }
        )
        return null
      }
      const isChallenge = () =>
        /just a moment|attention required|checking your browser/i.test(
          document.title
        ) ||
        location.pathname.startsWith("/cdn-cgi/") ||
        Boolean(
          document.querySelector(
            "#challenge-form, #challenge-running, #cf-challenge-running, .cf-turnstile"
          )
        )
      if (isChallenge()) {
        return null
      }
      if (
        !force &&
        (!/(^|\.)(4khdhub|hdhub4u|hblinks|hubcloud|hubcdn)\./i.test(
          location.hostname
        ) ||
          /\.(mkv|mp4|avi|mov|webm|zip|rar|7z|iso|mp3|flac)$/i.test(
            location.pathname
          ))
      ) {
        return null
      }
      const existing = document.getElementById("userpatch-page-loader")
      if (existing) {
        return existing
      }
      let style = document.getElementById("userpatch-page-loader-style")
      if (!style) {
        style = document.createElement("style")
        style.id = "userpatch-page-loader-style"
        style.textContent = `
      html[data-userpatch-loading] { background: #0a0a0a !important; color-scheme: light dark !important; }
      /* Visibility alone can be overridden by the source's visible children.
         Opacity suppresses the entire body, including its white background. */
      html[data-userpatch-loading] > body {
        visibility: hidden !important;
        opacity: 0 !important;
        pointer-events: none !important;
      }
      #userpatch-page-loader {
        all: initial !important; position: fixed !important; inset: 0 !important;
        z-index: 2147483647 !important; display: grid !important;
        place-items: center !important; visibility: visible !important;
        background: #0a0a0a !important; color: #fafafa !important;
      }
      #userpatch-page-loader progress, progress.userpatch-loading-spinner {
        appearance: none !important; display: block !important;
        inline-size: 2rem !important; block-size: 2rem !important;
        box-sizing: border-box !important; margin: auto !important;
        border: 2px solid #444 !important; border-block-start-color: #fafafa !important;
        border-radius: 50% !important; background: transparent !important;
        animation: userpatch-loader-spin 1s linear infinite !important;
      }
      #userpatch-page-loader progress::-webkit-progress-bar,
      progress.userpatch-loading-spinner::-webkit-progress-bar { display: none; }
      #userpatch-page-loader progress::-moz-progress-bar,
      progress.userpatch-loading-spinner::-moz-progress-bar { background: transparent; }
      @keyframes userpatch-loader-spin { to { transform: rotate(360deg); } }
      @media (prefers-color-scheme: light) {
        html[data-userpatch-loading] { background: #ffffff !important; }
        #userpatch-page-loader { background: #ffffff !important; color: #0a0a0a !important; }
        #userpatch-page-loader progress, progress.userpatch-loading-spinner {
          border-color: #ddd !important;
          border-block-start-color: #0a0a0a !important;
        }
      }
      @media (prefers-reduced-motion: reduce) {
        #userpatch-page-loader progress, progress.userpatch-loading-spinner { animation-duration: 6s !important; }
      }
    `
        root.append(style)
      }
      const cover = document.createElement("div")
      cover.id = "userpatch-page-loader"
      cover.setAttribute("aria-busy", "true")
      const spinner = document.createElement("progress")
      spinner.setAttribute("aria-label", "Loading page")
      cover.append(spinner)
      root.dataset.userpatchLoading = ""
      root.append(cover)
      let timer = 0
      const cleanup = () => {
        delete root.dataset.userpatchLoading
        cover.remove()
        observer.disconnect()
        window.clearTimeout(timer)
      }
      const observer = new MutationObserver(() => {
        if (!Object.hasOwn(root.dataset, "userpatchLoading") || isChallenge()) {
          cleanup()
          return
        }
        if (!style.isConnected) {
          root.append(style)
        }
        if (!cover.isConnected) {
          root.append(cover)
        }
      })
      observer.observe(document, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["data-userpatch-loading"],
      })
      timer = window.setTimeout(cleanup, timeoutMs)
      window.addEventListener(
        "pagehide",
        () => {
          observer.disconnect()
          window.clearTimeout(timer)
        },
        { once: true }
      )
      window.addEventListener("pageshow", (event) => {
        if (event.persisted) {
          cleanup()
        }
      })
      return cover
    }

    // src/shared/page-loader.js
    const PAGE_LOADER_ID = "userpatch-page-loader"
    const PAGE_LOADER_HIDDEN_CLASS = "userpatch-page-loader-hidden"
    const PAGE_SPINNER_CLASS = "userpatch-page-spinner"
    let revealPending = false
    const showRedesignLoader = (hostPattern) => {
      if (hostPattern.test(location.hostname)) {
        installLoadingCover()
      }
    }
    const showInitialPageLoader = (guard, _buildSpinner, timeoutMs) => {
      if (guard()) {
        installLoadingCover(true, timeoutMs)
      }
    }
    const dismissPageLoader = (immediate = false) => {
      if (immediate) {
        delete document.documentElement?.dataset.userpatchLoading
        document.getElementById(PAGE_LOADER_ID)?.remove()
        revealPending = false
        return
      }
      if (revealPending || !document.getElementById("userpatch-page-loader")) {
        return
      }
      revealPending = true
      const reveal = () =>
        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => dismissPageLoader(true))
        })
      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", reveal, { once: true })
      } else {
        reveal()
      }
    }

    // src/hubcloud/share.js
    const createShareButton = (id = "userpatch-share-btn") => {
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
            await navigator.share({ url: shareUrl })
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

    // src/hubcloud/file-details.js
    const FILENAME_DELIMITER_PATTERN = /([._/-]+)/
    const createFilenameFragment = (name = "") => {
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
    const applyFilenameBreaks = (element) => {
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
    const normalizeFileDetails = (root = document) => {
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
      const fallbackButton1 = Array.from(
        root.querySelectorAll("#button1")
      ).find(
        (button) =>
          !button.closest(".nav-tabs, .tab-content") &&
          !isCopyLinkControl(button)
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

    // src/hubcloud/pack-page.js
    const isHubCloudPackPage = (root = document) => {
      const header = root.querySelector(".pack-header")
      return Boolean(
        header?.querySelector(".pack-name, #packName") &&
        header.querySelector(".pack-meta #totalSize") &&
        root.querySelector(".file-list, #fileList")
      )
    }
    const normalizePackPage = (root = document) => {
      const packHeader = root.querySelector(".pack-header")
      const packMeta = packHeader?.querySelector(".pack-meta")
      const packNameEl = packHeader?.querySelector(".pack-name, #packName")
      const totalSizeEl = root.querySelector("#totalSize")
      const fileList = root.querySelector(".file-list, #fileList")
      if (packHeader) {
        delete packHeader.dataset.slot
      }
      for (const divider of root.querySelectorAll(
        "hr.userpatch-pack-divider"
      )) {
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
              videoUrl = /^https?:$/.test(parsedUrl.protocol)
                ? parsedUrl.href
                : ""
            } catch {
              videoUrl = ""
            }
          }
          if (videoUrl) {
            item.dataset.userpatchVideoUrl = videoUrl
          } else {
            delete item.dataset.userpatchVideoUrl
          }
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

    // src/hubcloud/detect.js
    const isCloudflareChallenge = () => {
      try {
        return (
          location.pathname.startsWith("/cdn-cgi/challenge-platform/") ||
          /^(Just a moment|Attention Required|Checking your browser)/i.test(
            document.title || ""
          ) ||
          Boolean(
            document.querySelector(
              "#challenge-form, #challenge-running, #cf-challenge-running"
            )
          )
        )
      } catch {
        return true
      }
    }
    const isDirectFileLink = (url) => {
      try {
        const parsed = new URL(url)
        const host = parsed.hostname.toLowerCase()
        if (
          /(^|\.)r2\.dev$/.test(host) ||
          /(^|\.)cloudflarestorage\.com$/.test(host)
        ) {
          return true
        }
        return /\.(mkv|mp4|avi|mov|webm|ts|m2ts|zip|rar|7z|iso|mp3|flac)(\?|#|$)/i.test(
          parsed.pathname
        )
      } catch {
        return false
      }
    }
    const isHubCloudDownloadUrl = (value) => {
      try {
        const url = new URL(value, location.href)
        return (
          /^https?:$/.test(url.protocol) &&
          url.pathname === "/hubcloud.php" &&
          /^(hubcloud|hubvid)$/.test(url.searchParams.get("host")) &&
          /^[a-z0-9_]+$/i.test(url.searchParams.get("id") || "") &&
          Boolean(url.searchParams.get("token")?.trim())
        )
      } catch {
        return false
      }
    }
    const isDownloadPage = (() => {
      try {
        const url = new URL(
          performance.getEntriesByType("navigation")[0]?.name || location.href
        )
        return url.origin === location.origin && isHubCloudDownloadUrl(url.href)
      } catch {
        return false
      }
    })()
    const hasHubCloudDomSignatures = (root = document) => {
      if (getGeneratedPage() || isHubCloudPackPage(root)) {
        return true
      }
      const card = root.querySelector("#section2 .card, .main > .card")
      const hasFileDetails = Boolean(
        card?.querySelector(".card-header") &&
        card.querySelector(".list-group-item")
      )
      return Boolean(
        hasFileDetails &&
        (isDownloadPage || getGeneratedDirectDownloadButton(root))
      )
    }

    // src/hubcloud/action-buttons.js
    const normalizeActionButtons = (root = document) => {
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
            /generate\s+(direct\s+)?download\s+link/i.test(
              node.textContent || ""
            )
          ) {
            node.textContent = "Show links"
          } else if (
            node.nodeType === Node.ELEMENT_NODE &&
            node.tagName !== "svg" &&
            /generate\s+(direct\s+)?download\s+link/i.test(
              node.textContent || ""
            )
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
    const isCopyLinkControl = (button) => {
      const label = (button?.textContent || "").trim().toLowerCase()
      const handler = button?.getAttribute("onclick") || ""
      return (
        /\bcopy(?:\s+share)?\s+link\b/.test(label) ||
        /copy_link\s*\(/i.test(handler)
      )
    }
    const getGeneratedDirectDownloadButton = (root) => {
      for (const link of root.querySelectorAll("a[href]")) {
        if (link.classList.contains("userpatch-direct-download-btn")) {
          return link
        }
        const label = (link.textContent || "").replaceAll(/\s+/g, " ").trim()
        if (!/generate\s+(direct\s+)?download\s+link/i.test(label)) {
          continue
        }
        if (isHubCloudDownloadUrl(link.href)) {
          return link
        }
      }
      return null
    }
    const moveDownloadAction = (button, container) => {
      const oldVd = button.closest(".vd")
      const oldCenter = button.closest("center")
      container.append(button)
      if (
        oldCenter &&
        oldCenter !== container &&
        !oldCenter.textContent.trim()
      ) {
        oldCenter.remove()
      }
      if (oldVd && oldVd !== container && !oldVd.textContent.trim()) {
        oldVd.remove()
      }
    }

    // src/hubcloud/clutter.js
    const removeStrayTextNodes = (root = document.body) => {
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
    const removeClutter = () => {
      removeStrayTextNodes()
      for (const btn of document.querySelectorAll(
        'a[href*="hbplay"], #tgbtn'
      )) {
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
      for (const el of document.querySelectorAll(
        ".text-success, p.h3, h3, .h3"
      )) {
        if (
          (el.textContent || "")
            .toLowerCase()
            .includes("download link generated")
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
                  `.${"userpatch-btn-group"}, #${"userpatch-mirror-guide-trigger"}, #download, #button1, .userpatch-file-info`
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

    // src/shared/system-theme.js
    let preference = null
    const updateSystemTheme = () => {
      const root = document.documentElement
      if (!root || !Object.hasOwn(root.dataset, "userpatchTheme")) {
        return
      }
      const theme = preference.matches ? "dark" : "light"
      if (root.dataset.userpatchTheme !== theme) {
        root.dataset.userpatchTheme = theme
      }
      if (Object.hasOwn(root.dataset, "detailTheme")) {
        root.classList.toggle("dark", theme === "dark")
        root.classList.toggle("light", theme === "light")
        root.dataset.detailTheme = theme
      }
      for (const meta of document.querySelectorAll(
        'meta[id^="userpatch-"][name="theme-color"]'
      )) {
        meta.content = theme === "dark" ? "#0a0a0a" : "#ffffff"
      }
    }
    const ensureSystemTheme = () => {
      if (!preference) {
        preference = window.matchMedia("(prefers-color-scheme: dark)")
        preference.addEventListener("change", updateSystemTheme)
        window.addEventListener("pagehide", () => {
          preference.removeEventListener("change", updateSystemTheme)
        })
        window.addEventListener("pageshow", (event) => {
          if (event.persisted) {
            preference.addEventListener("change", updateSystemTheme)
            updateSystemTheme()
          }
        })
      }
      const theme = preference.matches ? "dark" : "light"
      document.documentElement.dataset.userpatchTheme = theme
      updateSystemTheme()
      return theme
    }
    const systemThemeCss = (legacyHsl = false) => {
      const light = {
        background: "1 0 0",
        foreground: "0.145 0 0",
        card: "1 0 0",
        "card-foreground": "0.145 0 0",
        popover: "1 0 0",
        "popover-foreground": "0.145 0 0",
        primary: "0.205 0 0",
        "primary-foreground": "0.985 0 0",
        secondary: "0.97 0 0",
        "secondary-foreground": "0.205 0 0",
        muted: "0.97 0 0",
        "muted-foreground": "0.556 0 0",
        accent: "0.97 0 0",
        "accent-foreground": "0.205 0 0",
        destructive: "0.577 0.245 27.325",
        border: "0.922 0 0",
        input: "0.922 0 0",
        ring: "0.708 0 0",
      }
      const hsl = {
        background: "0 0% 100%",
        foreground: "0 0% 3.94%",
        card: "0 0% 100%",
        "card-foreground": "0 0% 3.94%",
        popover: "0 0% 100%",
        "popover-foreground": "0 0% 3.94%",
        primary: "0 0% 9%",
        "primary-foreground": "0 0% 98%",
        secondary: "0 0% 96%",
        "secondary-foreground": "0 0% 9%",
        muted: "0 0% 96%",
        "muted-foreground": "0 0% 45%",
        accent: "0 0% 96%",
        "accent-foreground": "0 0% 9%",
        destructive: "0 72% 51%",
        border: "0 0% 90%",
        input: "0 0% 90%",
        ring: "0 0% 64%",
      }
      const tokens = Object.entries(light)
        .map(
          ([name, value]) =>
            `--maia-${name}: oklch(${value}) !important; --${name}: ${legacyHsl ? hsl[name] : `oklch(${value})`} !important;`
        )
        .join("\n")
      return `
    html.userpatch-maia, html[data-userpatch-theme] {
      color-scheme: light dark !important;
    }
    @media (prefers-color-scheme: light) {
      html.userpatch-maia, html[data-userpatch-theme] {
        ${tokens}
        --maia-control-surface: oklch(0.98 0 0 / 90%);
        --maia-control-border-opacity: 0.14;
        --maia-ongoing-orange: #c65a00;
        --maia-ongoing-gold: #d97706;
        --maia-ongoing-deep-orange: #b45309;
        --maia-ongoing-glow-opacity: 0.32;
        --maia-ongoing-glow-blur: 12px;
        --maia-ongoing-shadow: 0 0 12px rgb(198 90 0 / 0.28),
          0 0 24px rgb(180 83 9 / 0.18);
        --maia-hdhub-running-border: linear-gradient(135deg in oklch,
          #c2410c, #d63d32 52%, #b91c1c);
        --maia-hdhub-running-shadow: 0 0 12px rgb(194 65 12 / 0.28),
          0 0 24px rgb(185 28 28 / 0.18);
        --maia-selection-bg: linear-gradient(180deg in oklch,
          oklch(0.90 0 0), oklch(0.84 0 0));
        --maia-select-hover-bg: linear-gradient(180deg in oklch,
          oklch(0.87 0 0), oklch(0.81 0 0));
        --maia-selection-shadow: inset 0 1px 0 rgb(255 255 255 / 0.9),
          inset 0 0 0 1px rgb(0 0 0 / 0.12), 0 1px 2px rgb(0 0 0 / 0.06);
        --maia-glass-shadow: 0 1px 2px rgb(0 0 0 / 0.04),
          0 2px 6px rgb(0 0 0 / 0.02);
        --maia-card-depth-shadow: inset 0 1px 0 rgb(255 255 255 / 0.8),
          0 1px 3px rgb(0 0 0 / 0.08), 0 3px 8px rgb(0 0 0 / 0.04);
      }
      html.userpatch-maia .userpatch-media-badge img,
      html.userpatch-maia .userpatch-quality-tab img,
      html.userpatch-maia .userpatch-quality-filter img {
        filter: none !important;
      }
      html.userpatch-maia .userpatch-quality-tab:disabled img {
        filter: opacity(0.45) !important;
      }
    }
  `
    }

    // src/hubcloud/css.js
    const REDESIGN_CSS = `
:root {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.205 0 0);
  --card-foreground: oklch(0.985 0 0);
  --primary: oklch(0.922 0 0);
  --primary-foreground: oklch(0.205 0 0);
  --secondary: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --border: oklch(1 0 0 / 10%);

  --radius: 0.625rem;
  --radius-sm: calc(var(--radius) * 0.6);
  --radius-md: calc(var(--radius) * 0.8);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) * 1.4);
  --radius-4xl: calc(var(--radius) * 2.6);
  --ease-out: cubic-bezier(0.23, 1, 0.32, 1);
  --font-sans: "Inter", "Inter Variable", ui-sans-serif, system-ui, -apple-system,
    BlinkMacSystemFont, "Segoe UI", sans-serif;
  color-scheme: dark;
}

*,
*::before,
*::after {
  box-sizing: border-box !important;
}

html,
body,
button,
input,
select,
textarea,
h1,
h2,
h3,
h4,
h5,
h6,
p,
a,
span,
div,
label,
li,
ul,
center,
[data-slot="button"],
[data-slot="button-group"],
.btn,
.card,
.container,
.userpatch-file-info,
.userpatch-file-title,
.userpatch-meta-item,
.userpatch-btn-main,
.userpatch-copy-btn,
.userpatch-share-btn,
.userpatch-mirror-guide-trigger,
.userpatch-dialog,
.userpatch-dialog-title,
.userpatch-dialog-description,
.userpatch-guide-heading,
.userpatch-guide-text,
.userpatch-guide-badge {
  font-family: var(--font-sans) !important;
}

html {
  -webkit-tap-highlight-color: transparent;
  -webkit-text-size-adjust: 100%;
}

html,
body {
  background-color: var(--background) !important;
  color: var(--foreground) !important;
  overscroll-behavior-x: auto;
  overscroll-behavior-y: none;
  font-family: var(--font-sans) !important;
  min-height: 100vh !important;
  min-height: 100svh !important;
  margin: 0 !important;
  padding: 0 !important;
  box-sizing: border-box !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  font-size: 1rem !important;
}

button,
[role="button"],
.btn,
.nav-link {
  touch-action: manipulation;
  user-select: none;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
}

@media (pointer: coarse) {
  input,
  textarea,
  select {
    font-size: 16px !important;
  }
}

body > center > .header,
header:not(#${HEADER_ID}),
.header:not(#${HEADER_ID}),
nav:not(.nav-tabs):not([role="tablist"]),
.navbar:not(.nav-tabs),
.site-header,
.site-footer,
.footer,
footer,
aside,
.sidebar,
#sidebar,
#masthead,
.alert-warning,
.alert-info,
.alert-primary,
hr {
  display: none !important;
}

#${HEADER_ID} {
  width: 100% !important;
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  padding: 1.25rem 1rem 0.5rem 1rem !important;
  background: transparent !important;
  background-color: transparent !important;
  border: none !important;
  border-bottom: none !important;
  box-shadow: none !important;
  box-sizing: border-box !important;
}

.userpatch-brand-container {
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 0.75rem !important;
  text-decoration: none !important;
  color: var(--foreground) !important;
  font-family: var(--font-sans) !important;
}

.userpatch-brand-logo {
  width: 38px !important;
  height: 38px !important;
  border-radius: var(--radius-sm) !important;
  object-fit: contain !important;
  display: block !important;
}

.userpatch-brand-name {
  font-family: "Inter", "Inter Variable", var(--font-sans) !important;
  font-size: 1.35rem !important;
  font-weight: 700 !important;
  letter-spacing: -0.025em !important;
  color: var(--foreground) !important;
  line-height: 1 !important;
}

center {
  inline-size: 100% !important;
  margin: 0 !important;
  padding: 0 !important;
  text-align: left !important;
}

.container,
.container.main,
.container-fluid,
.container-fluid.main,
.main:not(#section2) {
  width: 100% !important;
  max-width: 42rem !important;
  margin-left: auto !important;
  margin-right: auto !important;
  margin-inline: auto !important;
  padding-left: clamp(0.75rem, 3vw, 1.25rem) !important;
  padding-right: clamp(0.75rem, 3vw, 1.25rem) !important;
  padding-inline: clamp(0.75rem, 3vw, 1.25rem) !important;
  padding-block: 0.25rem 0.5rem !important;
  box-sizing: border-box !important;
}

@media (min-width: 640px) {
  .container,
  .container.main,
  .container-fluid,
  .container-fluid.main,
  .main:not(#section2) {
    padding-left: 1.25rem !important;
    padding-right: 1.25rem !important;
    padding-inline: 1.25rem !important;
  }
}

.container .container,
.container #section2,
.container .row,
.container .col-md-12,
.container center,
.container .card,
.container .card-body,
#section2 .card,
#section2 .card-body,
#section2 center {
  width: 100% !important;
  max-width: 100% !important;
  padding: 0 !important;
  padding-left: 0 !important;
  padding-right: 0 !important;
  padding-inline: 0 !important;
  margin: 0 !important;
  margin-left: 0 !important;
  margin-right: 0 !important;
  margin-inline: 0 !important;
  box-sizing: border-box !important;
  text-align: left !important;
}

h2 {
  font-size: 1rem !important;
  font-weight: normal !important;
  margin: 0 !important;
}

[data-slot="alert"],
div[style*="#fff3cd"],
div[style*="255, 243, 205"],
div[style*="#ffc107"],
.tab-content,
.nav-tabs,
#link,
#div1,
a[href*="hbplay"],
p[style*="font-size: 12px"],
.loading,
.input-group,
.input-group.mb-3,
#ilink,
.text-success.h3,
p.h3.text-success,
p[class*="text-success"],
#android_launch,
button#android_launch,
a#android_launch,
[id*="android_launch" i],
[class*="android_launch" i],
#msc,
.msc,
#misc,
.misc,
[id*="msc" i],
[class*="msc" i] {
  display: none !important;
  visibility: hidden !important;
  height: 0 !important;
  width: 0 !important;
  opacity: 0 !important;
  pointer-events: none !important;
}

.vd,
.vd.d-none {
  display: flex !important;
  flex-direction: column !important;
  justify-content: center !important;
  align-items: center !important;
  width: 100% !important;
  max-width: 100% !important;
  margin: 0 !important;
  box-sizing: border-box !important;
  padding: 0 !important;
}

.card:not(#section2 .card):not(.userpatch-file-info) {
  background-color: var(--card) !important;
  color: var(--card-foreground) !important;
  border: 1px solid var(--border) !important;
  border-radius: var(--radius-xl) !important;
  box-shadow: 0 0 0 1px color-mix(in oklch, var(--foreground) 10%, transparent), 0 4px 12px -2px rgba(0, 0, 0, 0.4) !important;
  overflow: hidden !important;
  margin-bottom: 1.5rem !important;
}

#section2,
#section2.main {
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
  padding: 0 !important;
  margin-top: 0 !important;
  display: flex !important;
  flex-direction: column !important;
  align-items: flex-start !important;
  text-align: left !important;
  width: 100% !important;
}

.card:not(#section2 .card) .card-body {
  width: 100% !important;
  box-sizing: border-box !important;
}

#section2 .card,
.userpatch-file-info {
  background: transparent !important;
  background-color: transparent !important;
  border: none !important;
  box-shadow: none !important;
  border-radius: 0 !important;
  min-height: 44px !important;
  padding: 0.5rem 0.25rem 0 0.25rem !important;
  margin: 0.25rem 0 0 0 !important;
  width: 100% !important;
  max-width: 100% !important;
  box-sizing: border-box !important;
  display: flex !important;
  flex-direction: column !important;
  align-items: stretch !important;
  text-align: left !important;
  gap: 0.5rem !important;
}

.userpatch-file-info .userpatch-file-title,
.userpatch-file-info .userpatch-file-meta,
.userpatch-file-info .userpatch-meta-item,
.userpatch-file-info .userpatch-share-btn {
  align-self: flex-start !important;
  text-align: left !important;
}

.userpatch-file-info #download,
.userpatch-file-info #button1,
.userpatch-file-info .${DIRECT_DOWNLOAD_BUTTON_CLASS},
.userpatch-file-info .vd,
.userpatch-file-info center,
#download,
#button1 {
  align-self: stretch !important;
  width: 100% !important;
  max-width: 100% !important;
  box-sizing: border-box !important;
}

#section2 .card-header,
#section2 .card-header.bg-primary,
.userpatch-file-title {
  background: transparent !important;
  background-color: transparent !important;
  border: none !important;
  border-bottom: none !important;
  color: var(--foreground) !important;
  font-size: 16px !important;
  font-weight: 400 !important;
  line-height: ${CONFIG.filenameLineHeight} !important;
  overflow-wrap: break-word !important;
  word-break: normal !important;
  text-wrap: pretty !important;
  text-align: left !important;
  padding: 0 !important;
  margin: 0 !important;
  width: 100% !important;
  max-width: 100% !important;
}

@media (min-width: 761px) {
  #section2 .card-header,
  #section2 .card-header.bg-primary,
  .userpatch-file-title {
    font-size: 18px !important;
  }
}

.userpatch-file-meta {
  display: flex !important;
  flex-direction: column !important;
  align-items: flex-start !important;
  justify-content: flex-start !important;
  gap: 0.5rem !important;
  margin: 0.25rem 0 0 0 !important;
  width: 100% !important;
}

.userpatch-meta-item,
.userpatch-meta-item span,
.userpatch-meta-item i,
.userpatch-meta-item #size,
#section2 .list-group-item,
#section2 .list-group-item i,
#section2 .list-group-item #size {
  display: inline-flex !important;
  align-items: center !important;
  justify-content: flex-start !important;
  text-align: left !important;
  gap: 0.5rem !important;
  color: var(--muted-foreground) !important;
  font-size: 16px !important;
  font-weight: 400 !important;
  line-height: 1.4 !important;
}

@media (min-width: 761px) {
  .userpatch-meta-item,
  .userpatch-meta-item span,
  .userpatch-meta-item i,
  .userpatch-meta-item #size,
  #section2 .list-group-item,
  #section2 .list-group-item i,
  #section2 .list-group-item #size {
    font-size: 18px !important;
  }
}

.userpatch-meta-item svg {
  width: 1.25rem !important;
  height: 1.25rem !important;
  color: var(--muted-foreground) !important;
  stroke: currentColor !important;
  fill: none !important;
  flex-shrink: 0 !important;
}

.userpatch-meta-item span,
.userpatch-meta-item i,
.userpatch-meta-item #size {
  color: var(--foreground) !important;
  font-style: normal !important;
  font-weight: 400 !important;
  font-variant-numeric: tabular-nums !important;
}

.userpatch-share-btn {
  position: relative !important;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: flex-start !important;
  gap: 0.5rem !important;
  background: transparent !important;
  background-color: transparent !important;
  color: var(--muted-foreground) !important;
  border: none !important;
  box-shadow: none !important;
  border-radius: var(--radius-md, 0.5rem) !important;
  min-height: unset !important;
  padding: 0 !important;
  font-size: 16px !important;
  font-weight: 400 !important;
  line-height: 1.4 !important;
  cursor: pointer !important;
  align-self: flex-start !important;
  margin: 0 !important;
  touch-action: manipulation !important;
  -webkit-tap-highlight-color: transparent !important;
  user-select: none !important;
  transition:
    color 120ms ease,
    background-color 120ms ease,
    transform 100ms var(--ease-out) !important;
}

.userpatch-share-btn::before {
  content: "" !important;
  position: absolute !important;
  top: 50% !important;
  left: 50% !important;
  transform: translate(-50%, -50%) !important;
  min-width: 44px !important;
  min-height: 44px !important;
  width: 100% !important;
  height: 100% !important;
  pointer-events: auto !important;
}

@media (min-width: 761px) {
  .userpatch-share-btn {
    font-size: 18px !important;
  }
}

.userpatch-share-btn span {
  color: var(--foreground) !important;
  font-weight: 400 !important;
  line-height: 1.4 !important;
  transition: color 120ms ease !important;
}

@media (hover: hover) and (pointer: fine) {
  .userpatch-share-btn:hover,
  .userpatch-share-btn:hover span {
    color: var(--foreground) !important;
  }
}

.userpatch-share-btn svg {
  width: 1.25rem !important;
  height: 1.25rem !important;
  color: var(--muted-foreground) !important;
  flex-shrink: 0 !important;
  display: inline-block !important;
}

.userpatch-share-btn.userpatch-copied,
.userpatch-share-btn.userpatch-copied span {
  background: transparent !important;
  color: var(--foreground) !important;
  border: none !important;
}

.userpatch-share-btn.userpatch-copied svg {
  color: var(--foreground) !important;
}

#section2 .card-body {
  padding: 0 !important;
  width: 100% !important;
}

#section2 .list-group {
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
  display: flex !important;
  flex-direction: column !important;
  align-items: flex-start !important;
  gap: 0.45rem !important;
}

#section2 .list-group-item {
  background: transparent !important;
  border: none !important;
  color: var(--muted-foreground) !important;
  padding: 0 !important;
  font-size: 16px !important;
  display: inline-flex !important;
  justify-content: flex-start !important;
  gap: 0.5rem !important;
}

#section2 .list-group-item:nth-child(2) {
  display: none !important;
}

.card:not(#section2 .card) .card-header,
.card:not(#section2 .card) .card-header.bg-primary {
  background: transparent !important;
  background-color: transparent !important;
  color: var(--foreground) !important;
  border-bottom: 1px solid var(--border) !important;
  font-size: 1rem !important;
  font-weight: 600 !important;
  line-height: 1.5 !important;
  padding: 1.25rem 1.5rem !important;
  overflow-wrap: break-word !important;
  word-break: normal !important;
  text-wrap: pretty !important;
  margin-bottom: 0 !important;
}

.card:not(#section2 .card) .card-body {
  padding: 1.25rem 1.5rem !important;
}

.card:not(#section2 .card) .list-group {
  border-radius: var(--radius-md, 0.5rem) !important;
  overflow: hidden !important;
  border: 1px solid var(--border) !important;
  margin-bottom: 0 !important;
}

.card:not(#section2 .card) .list-group-item {
  background-color: var(--card) !important;
  color: var(--muted-foreground) !important;
  border: none !important;
  border-bottom: 1px solid var(--border) !important;
  padding: 0.85rem 1.15rem !important;
  font-size: 0.925rem !important;
  font-weight: 500 !important;
}

.card:not(#section2 .card) .list-group-item:last-child {
  border-bottom: none !important;
}

.card:not(#section2 .card) .list-group-item i {
  color: var(--foreground) !important;
  font-style: normal !important;
  font-weight: 600 !important;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace !important;
  font-size: 0.875rem !important;
}

#download,
a#download,
button#download,
.btn-primary#download,
#button1,
a#button1,
button#button1,
.btn-success#button1,
.${DIRECT_DOWNLOAD_BUTTON_CLASS} {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 0.625rem !important;
  background-color: #0051c3 !important;
  color: #ffffff !important;
  border: 1px solid rgba(255, 255, 255, 0.14) !important;
  border-radius: var(--radius-lg, 0.625rem) !important;
  min-height: 56px !important;
  padding: 0.875rem 1.25rem !important;
  font-size: 16px !important;
  font-weight: 500 !important;
  line-height: 1.25rem !important;
  letter-spacing: -0.01em !important;
  text-decoration: none !important;
  width: 100% !important;
  max-width: 100% !important;
  margin: 0.75rem 0 !important;
  box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.22), 0 1px 2px 0 rgba(0, 0, 0, 0.24) !important;
  box-sizing: border-box !important;
  cursor: pointer !important;
  transition: transform 100ms ease, filter 100ms ease !important;
}

#section2 #download,
.userpatch-file-info #download,
#section2 .${DIRECT_DOWNLOAD_BUTTON_CLASS},
.userpatch-file-info .${DIRECT_DOWNLOAD_BUTTON_CLASS} {
  margin-bottom: 0 !important;
}

@media (min-width: 761px) {
  #download,
  a#download,
  button#download,
  .btn-primary#download,
  #button1,
  a#button1,
  button#button1,
  .btn-success#button1,
  .${DIRECT_DOWNLOAD_BUTTON_CLASS} {
    font-size: 18px !important;
  }
}

@media (hover: hover) and (pointer: fine) {
  #download:hover,
  #button1:hover,
  .${DIRECT_DOWNLOAD_BUTTON_CLASS}:hover {
    filter: brightness(1.06) !important;
    box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.25), 0 2px 4px 0 rgba(0, 0, 0, 0.28) !important;
  }
}

#download:active,
#button1:active,
.${DIRECT_DOWNLOAD_BUTTON_CLASS}:active,
.userpatch-btn-main:active {
  transform: none !important;
}

#download[data-userpatch-loading="true"],
#button1[data-userpatch-loading="true"],
.${DIRECT_DOWNLOAD_BUTTON_CLASS}[data-userpatch-loading="true"] {
  background: #0051c3 !important;
  color: #ffffff !important;
  opacity: 0.8 !important;
  pointer-events: none !important;
  cursor: wait !important;
}

@keyframes userpatch-spin {
  to {
    transform: rotate(360deg);
  }
}

.userpatch-spinner {
  animation: userpatch-spin 1s linear infinite !important;
}

[data-slot="button-group"],
.${BUTTON_GROUP_CLASS} {
  display: flex !important;
  align-items: stretch !important;
  max-width: 100% !important;
  width: 100% !important;
  margin: 0.75rem 0 !important;
  min-height: 56px !important;
  border-radius: var(--radius-lg, 0.625rem) !important;
  border: 1px solid rgba(255, 255, 255, 0.14) !important;
  box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.22), 0 1px 2px 0 rgba(0, 0, 0, 0.24) !important;
  overflow: hidden !important;
  box-sizing: border-box !important;
  position: relative !important;
  background-color: var(--userpatch-btn-bg, var(--secondary)) !important;
  color: var(--userpatch-btn-color, var(--foreground)) !important;
  transition: filter 100ms ease !important;
}

#${GUIDE_ROW_ID} + [data-slot="button-group"],
.${GUIDE_ROW_ID} + [data-slot="button-group"],
#${GUIDE_ROW_ID} + .${BUTTON_GROUP_CLASS},
.${GUIDE_ROW_ID} + .${BUTTON_GROUP_CLASS} {
  margin-top: 0 !important;
}

@media (hover: hover) and (pointer: fine) {
  [data-slot="button-group"]:hover,
  .${BUTTON_GROUP_CLASS}:hover {
    filter: brightness(1.06) !important;
    box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.25), 0 2px 4px 0 rgba(0, 0, 0, 0.28) !important;
  }
}

[data-slot="button-group"] > a:active,
.${BUTTON_GROUP_CLASS} > a:active,
[data-slot="button-group"] > button:active,
.${BUTTON_GROUP_CLASS} > button:active {
  transform: none !important;
  background-color: transparent !important;
}

[data-slot="button-group"] > *,
.${BUTTON_GROUP_CLASS} > *,
[data-slot="button-group"] > a,
.${BUTTON_GROUP_CLASS} > a,
[data-slot="button-group"] > button,
.${BUTTON_GROUP_CLASS} > button,
[data-slot="button-group"] a#fsl,
[data-slot="button-group"] a#fsl2,
[data-slot="button-group"] a#s3,
[data-slot="button-group"] a#tgbtn,
[data-slot="button-group"] a[id],
.${BUTTON_GROUP_CLASS} a#fsl,
.${BUTTON_GROUP_CLASS} a#fsl2,
.${BUTTON_GROUP_CLASS} a#s3,
.${BUTTON_GROUP_CLASS} a#tgbtn,
.${BUTTON_GROUP_CLASS} a[id] {
  background: transparent !important;
  background-color: transparent !important;
  background-image: none !important;
  border: none !important;
  border-width: 0 !important;
  border-left: none !important;
  border-right: none !important;
  border-top: none !important;
  border-bottom: none !important;
  border-radius: 0 !important;
  box-shadow: none !important;
  outline: none !important;
  color: inherit !important;
  box-sizing: border-box !important;
  /* Source templates add lift/zoom to .btn:hover. Keep grouped actions still. */
  transform: none !important;
  translate: none !important;
  scale: none !important;
  rotate: none !important;
  transition: none !important;
}

[data-slot="button-group"] > *:focus-visible,
.${BUTTON_GROUP_CLASS} > *:focus-visible {
  position: relative !important;
  z-index: 10 !important;
  outline: 2px solid currentColor !important;
  outline-offset: -4px !important;
}

#download:focus-visible,
#button1:focus-visible,
.${DIRECT_DOWNLOAD_BUTTON_CLASS}:focus-visible,
.userpatch-share-btn:focus-visible,
.userpatch-pack-copy-btn:focus-visible,
.userpatch-mirror-guide-trigger:focus-visible,
.userpatch-dialog-close-btn:focus-visible,
.userpatch-pack-open-link:focus-visible {
  outline: 2px solid currentColor !important;
  outline-offset: 2px !important;
}

@media (forced-colors: active) {
  #download:focus-visible,
  #button1:focus-visible,
  .${DIRECT_DOWNLOAD_BUTTON_CLASS}:focus-visible,
  [data-slot="button-group"] > *:focus-visible,
  .${BUTTON_GROUP_CLASS} > *:focus-visible,
  .userpatch-share-btn:focus-visible,
  .userpatch-pack-copy-btn:focus-visible,
  .userpatch-mirror-guide-trigger:focus-visible,
  .userpatch-dialog-close-btn:focus-visible,
  .userpatch-pack-open-link:focus-visible {
    outline-color: Highlight !important;
  }
}

[data-slot="button-group"] > a[data-slot="button"],
.${BUTTON_GROUP_CLASS} > a.btn.${BUTTON_MAIN_CLASS} {
  flex: 1 1 auto !important;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: flex-start !important;
  text-align: left !important;
  gap: 0.625rem !important;
  width: 100% !important;
  max-width: none !important;
  margin: 0 !important;
  min-height: 56px !important;
  padding: 0.875rem 1.25rem !important;
  font-size: 16px !important;
  font-weight: 500 !important;
  line-height: 1.25rem !important;
  letter-spacing: -0.01em !important;
  text-decoration: none !important;
  cursor: pointer !important;
}

@media (min-width: 761px) {
  [data-slot="button-group"] > a[data-slot="button"],
  .${BUTTON_GROUP_CLASS} > a.btn.${BUTTON_MAIN_CLASS} {
    font-size: 18px !important;
  }
}

.userpatch-btn-label {
  display: inline-block !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  white-space: nowrap !important;
  font-weight: 500 !important;
}

[data-slot="button-group"] > button[data-slot="button"],
.${BUTTON_GROUP_CLASS} > button.${COPY_BUTTON_CLASS} {
  flex: 0 0 56px !important;
  width: 56px !important;
  min-height: 56px !important;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  padding: 0 !important;
  margin: 0 !important;
  cursor: pointer !important;
  background: transparent !important;
  background-color: transparent !important;
  border: none !important;
  box-shadow: none !important;
  transition: transform 100ms var(--ease-out) !important;
}

@media (hover: hover) and (pointer: fine) {
  [data-slot="button-group"] > button[data-slot="button"]:hover,
  .${BUTTON_GROUP_CLASS} > button.${COPY_BUTTON_CLASS}:hover {
    background-color: transparent !important;
  }
}

.${BUTTON_GROUP_CLASS} > button.${COPY_BUTTON_CLASS}.userpatch-copied {
  color: inherit !important;
  background: transparent !important;
  background-color: transparent !important;
}

svg[data-userpatch-lucide-icon],
svg.preview-icon,
[data-slot="button-group"] svg,
.${BUTTON_GROUP_CLASS} svg,
#download svg,
#button1 svg,
a.btn svg,
.userpatch-meta-item svg,
.pack-meta-item svg,
.userpatch-share-btn svg,
.userpatch-pack-copy-btn svg,
.userpatch-mirror-guide-trigger svg {
  width: 1.25rem !important;
  height: 1.25rem !important;
  stroke: currentColor !important;
  fill: none !important;
  stroke-width: 2 !important;
  vertical-align: middle !important;
  flex-shrink: 0 !important;
  display: inline-block !important;
}

a.btn.btn-danger,
a.btn.btn-primary,
a.btn.btn-secondary,
a.btn.btn-info,
a.btn.btn-warning,
a.btn.btn-dark,
a.btn.btn-success {
  background-image: none !important;
}


a.btn.btn-lg:not(.${BUTTON_MAIN_CLASS}):not(.${DIRECT_DOWNLOAD_BUTTON_CLASS}):not(#download):not(#button1):not(.${COPY_BUTTON_CLASS}):not(.userpatch-share-btn):not(.userpatch-pack-copy-btn):not(.userpatch-mirror-guide-trigger):not(.input-group *),
a.btn:not(.${BUTTON_MAIN_CLASS}):not(.${DIRECT_DOWNLOAD_BUTTON_CLASS}):not(#download):not(#button1):not(.nav-link):not(.${COPY_BUTTON_CLASS}):not(.userpatch-share-btn):not(.userpatch-pack-copy-btn):not(.userpatch-mirror-guide-trigger):not(.input-group *),
button.btn:not(.${COPY_BUTTON_CLASS}):not(.${DIRECT_DOWNLOAD_BUTTON_CLASS}):not(#download):not(#button1):not(.userpatch-share-btn):not(.userpatch-pack-copy-btn):not(.userpatch-mirror-guide-trigger):not(.input-group *) {
  display: flex !important;
  align-items: center !important;
  justify-content: flex-start !important;
  text-align: left !important;
  gap: 0.625rem !important;
  max-width: 100% !important;
  width: 100% !important;
  margin: 1.125rem 0 !important;
  min-height: 56px !important;
  padding: 0.875rem 1.25rem !important;
  font-size: 16px !important;
  font-weight: 500 !important;
  line-height: 1.25rem !important;
  letter-spacing: -0.01em !important;
  text-decoration: none !important;
  border-radius: var(--radius-lg, 0.625rem) !important;
  background-color: var(--secondary) !important;
  color: var(--foreground) !important;
  border: 1px solid rgba(255, 255, 255, 0.14) !important;
  box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.22), 0 1px 2px 0 rgba(0, 0, 0, 0.24) !important;
  box-sizing: border-box !important;
  transition: transform 100ms ease, filter 100ms ease !important;
}

@media (min-width: 761px) {
  a.btn.btn-lg:not(.${BUTTON_MAIN_CLASS}):not(.${DIRECT_DOWNLOAD_BUTTON_CLASS}):not(#download):not(#button1):not(.${COPY_BUTTON_CLASS}):not(.userpatch-share-btn):not(.userpatch-pack-copy-btn):not(.userpatch-mirror-guide-trigger):not(.input-group *),
  a.btn:not(.${BUTTON_MAIN_CLASS}):not(.${DIRECT_DOWNLOAD_BUTTON_CLASS}):not(#download):not(#button1):not(.nav-link):not(.${COPY_BUTTON_CLASS}):not(.userpatch-share-btn):not(.userpatch-pack-copy-btn):not(.userpatch-mirror-guide-trigger):not(.input-group *),
  button.btn:not(.${COPY_BUTTON_CLASS}):not(.${DIRECT_DOWNLOAD_BUTTON_CLASS}):not(#download):not(#button1):not(.userpatch-share-btn):not(.userpatch-pack-copy-btn):not(.userpatch-mirror-guide-trigger):not(.input-group *) {
    font-size: 18px !important;
  }
}

.pack-header,
.file-list {
  max-width: 44rem !important;
  margin-left: auto !important;
  margin-right: auto !important;
  width: 100% !important;
  box-sizing: border-box !important;
}

.pack-header {
  background: transparent !important;
  background-color: transparent !important;
  border: none !important;
  box-shadow: none !important;
  border-radius: 0 !important;
  padding: 0 1rem !important;
  padding-inline: 1rem !important;
  margin: 0.25rem auto 0.5rem auto !important;
  width: 100% !important;
  max-width: 44rem !important;
  box-sizing: border-box !important;
  display: flex !important;
  flex-direction: column !important;
  align-items: flex-start !important;
  text-align: left !important;
}

.pack-name {
  font-family: var(--font-sans) !important;
  font-size: 16px !important;
  font-weight: 400 !important;
  line-height: ${CONFIG.filenameLineHeight} !important;
  color: var(--foreground) !important;
  margin: 0 0 0.5rem 0 !important;
  overflow-wrap: break-word !important;
  word-break: normal !important;
  text-wrap: pretty !important;
  text-align: left !important;
}

@media (min-width: 761px) {
  .pack-name {
    font-size: 18px !important;
  }
}

.pack-meta {
  display: flex !important;
  flex-direction: column !important;
  align-items: flex-start !important;
  justify-content: flex-start !important;
  gap: 0.5rem !important;
  margin: 0 !important;
  width: 100% !important;
}

.pack-meta-item,
.pack-meta-item span,
.pack-meta-item #totalSize {
  display: inline-flex !important;
  align-items: center !important;
  justify-content: flex-start !important;
  text-align: left !important;
  gap: 0.5rem !important;
  color: var(--muted-foreground) !important;
  font-size: 16px !important;
  font-weight: 400 !important;
  line-height: 1.4 !important;
}

.pack-meta-item {
  margin: 0 !important;
  padding: 0 !important;
}

@media (min-width: 761px) {
  .pack-meta-item,
  .pack-meta-item span,
  .pack-meta-item #totalSize {
    font-size: 18px !important;
  }
}

.pack-meta-item svg {
  width: 1.25rem !important;
  height: 1.25rem !important;
  color: var(--muted-foreground) !important;
  stroke: currentColor !important;
  fill: none !important;
  flex-shrink: 0 !important;
}

.pack-meta-item span,
.pack-meta-item #totalSize {
  color: var(--foreground) !important;
  font-style: normal !important;
  font-weight: 400 !important;
  font-variant-numeric: tabular-nums !important;
}

.pack-meta-item:has(#fileCount),
#fileCount {
  display: none !important;
}

.file-list {
  background: transparent !important;
  background-color: transparent !important;
  border: none !important;
  box-shadow: none !important;
  border-radius: 0 !important;
  padding: 0 !important;
  width: 100% !important;
  max-width: 44rem !important;
  margin-left: auto !important;
  margin-right: auto !important;
  box-sizing: border-box !important;
  display: flex !important;
  flex-direction: column !important;
}

.file-icon {
  display: none !important;
}

.file-item {
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
  padding: 0.85rem 0 !important;
  padding-inline: 1rem !important;
  border: none !important;
  border-bottom: 1px solid var(--border) !important;
  background: transparent !important;
  background-color: transparent !important;
  position: relative !important;
  cursor: default !important;
  width: 100% !important;
  box-sizing: border-box !important;
  text-decoration: none !important;
  transition: background-color 100ms ease !important;
}

.file-item:last-child {
  border-bottom: none !important;
}

@media (hover: hover) and (pointer: fine) {
  .file-item:hover {
    background-color: color-mix(in oklch, var(--foreground) 3%, transparent) !important;
  }
}

.file-info {
  flex: 1 1 auto !important;
  min-width: 0 !important;
  text-align: left !important;
  pointer-events: none !important;
}

.userpatch-pack-open-link {
  position: absolute !important;
  inset: 0 !important;
  z-index: 0 !important;
  display: block !important;
  color: inherit !important;
  text-decoration: none !important;
  border-radius: var(--radius-sm) !important;
  transition: background-color 100ms ease !important;
}

.userpatch-pack-open-link:active {
  background-color: color-mix(in oklch, var(--foreground) 5%, transparent) !important;
}

.userpatch-sr-only {
  position: absolute !important;
  width: 1px !important;
  height: 1px !important;
  padding: 0 !important;
  margin: -1px !important;
  overflow: hidden !important;
  clip: rect(0, 0, 0, 0) !important;
  clip-path: inset(50%) !important;
  white-space: nowrap !important;
  border: 0 !important;
}

.file-title {
  font-family: var(--font-sans) !important;
  font-size: 16px !important;
  font-weight: 400 !important;
  color: var(--foreground) !important;
  line-height: ${CONFIG.filenameLineHeight} !important;
  overflow-wrap: break-word !important;
  word-break: normal !important;
  text-wrap: pretty !important;
}

@media (min-width: 761px) {
  .file-title {
    font-size: 18px !important;
  }
}

.file-title code {
  font-family: var(--font-sans) !important;
  font-size: inherit !important;
  font-weight: 400 !important;
  background: transparent !important;
  color: inherit !important;
  border: none !important;
  padding: 0 !important;
}

.file-size {
  font-family: var(--font-sans) !important;
  font-size: 14px !important;
  color: var(--muted-foreground) !important;
  font-weight: 400 !important;
  line-height: 1.4 !important;
  margin-top: 0.25rem !important;
  font-variant-numeric: tabular-nums !important;
}

@media (min-width: 761px) {
  .file-size {
    font-size: 16px !important;
  }
}

.userpatch-pack-copy-btn {
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  position: relative !important;
  z-index: 1 !important;
  width: 2.75rem !important;
  height: 2.75rem !important;
  min-width: 2.75rem !important;
  padding: 0 !important;
  border-radius: var(--radius-md, 0.5rem) !important;
  background: transparent !important;
  background-color: transparent !important;
  border: none !important;
  box-shadow: none !important;
  color: var(--muted-foreground) !important;
  cursor: pointer !important;
  margin-left: 1rem !important;
  flex-shrink: 0 !important;
  touch-action: manipulation !important;
  -webkit-tap-highlight-color: transparent !important;
  user-select: none !important;
  transition:
    color 120ms ease,
    background-color 120ms ease,
    transform 100ms var(--ease-out) !important;
}

@media (hover: hover) and (pointer: fine) {
  .userpatch-pack-copy-btn:hover {
    background-color: transparent !important;
    color: var(--foreground) !important;
  }
}

.userpatch-pack-copy-btn.userpatch-copied {
  color: var(--foreground) !important;
  background-color: transparent !important;
}

.userpatch-pack-copy-btn svg {
  width: 1.15rem !important;
  height: 1.15rem !important;
  color: currentColor !important;
  stroke: currentColor !important;
  fill: none !important;
}

.file-link {
  display: none !important;
}

.empty-state {
  color: var(--muted-foreground) !important;
  font-size: 0.875rem !important;
  padding: 3rem 1.5rem !important;
  text-align: center !important;
}

.${GUIDE_ROW_ID},
#${GUIDE_ROW_ID} {
  display: flex !important;
  justify-content: flex-end !important;
  align-items: center !important;
  width: 100% !important;
  margin: 0.5rem 0 !important;
  padding: 0 !important;
  box-sizing: border-box !important;
}

.userpatch-mirror-guide-trigger {
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  width: 2rem !important;
  height: 2rem !important;
  min-height: unset !important;
  padding: 0 !important;
  background: transparent !important;
  background-color: transparent !important;
  color: var(--muted-foreground) !important;
  border: none !important;
  box-shadow: none !important;
  border-radius: 9999px !important;
  margin: 0 !important;
  cursor: pointer !important;
  position: relative !important;
  transition:
    color 120ms ease,
    background-color 120ms ease,
    transform 100ms var(--ease-out) !important;
}

.userpatch-mirror-guide-trigger::before {
  content: "" !important;
  position: absolute !important;
  top: 50% !important;
  left: 50% !important;
  transform: translate(-50%, -50%) !important;
  min-width: 44px !important;
  min-height: 44px !important;
  pointer-events: auto !important;
}

@media (hover: hover) and (pointer: fine) {
  .userpatch-mirror-guide-trigger:hover {
    color: var(--foreground) !important;
    background-color: var(--secondary) !important;
  }
}

.userpatch-mirror-guide-trigger svg {
  width: 1.125rem !important;
  height: 1.125rem !important;
}

.userpatch-dialog-title:focus {
  outline: none !important;
}

.userpatch-dialog {
  background-color: var(--card) !important;
  color: var(--card-foreground) !important;
  border: 1px solid var(--border) !important;
  border-radius: var(--radius-4xl, 1.625rem) !important;
  box-shadow: 0 0 0 1px color-mix(in oklch, var(--foreground) 8%, transparent), 0 20px 25px -5px rgba(0, 0, 0, 0.6), 0 8px 10px -6px rgba(0, 0, 0, 0.5) !important;
  margin: auto !important;
  max-width: 28rem !important;
  width: calc(100% - 2rem) !important;
  max-height: 90vh !important;
  max-height: 90dvh !important;
  overflow-y: auto !important;
  overscroll-behavior-x: auto !important;
  overscroll-behavior-y: contain !important;
  padding: 1.5rem !important;
  box-sizing: border-box !important;
  opacity: 0 !important;
  transform: scale(0.96) !important;
  transition:
    opacity 200ms var(--ease-out),
    transform 200ms var(--ease-out),
    display 200ms var(--ease-out),
    overlay 200ms var(--ease-out) !important;
  transition-behavior: allow-discrete !important;
}

.userpatch-dialog:modal {
  overscroll-behavior-x: auto !important;
  overscroll-behavior-y: contain !important;
}

.userpatch-dialog[open] {
  opacity: 1 !important;
  transform: scale(1) !important;
  transition-duration: 250ms !important;
}

.userpatch-dialog[data-closing] {
  opacity: 0 !important;
  transform: scale(0.96) !important;
  transition-duration: 200ms !important;
}

.userpatch-dialog[open][data-closing]::backdrop {
  opacity: 0 !important;
  transition-duration: 200ms !important;
}

.userpatch-dialog::backdrop {
  background-color: rgba(0, 0, 0, 0.75) !important;
  backdrop-filter: blur(4px) !important;
  overflow: hidden !important;
  opacity: 0 !important;
  overscroll-behavior-x: auto !important;
  overscroll-behavior-y: contain !important;
  transition:
    opacity 200ms var(--ease-out),
    display 200ms var(--ease-out),
    overlay 200ms var(--ease-out) !important;
  transition-behavior: allow-discrete !important;
}

.userpatch-dialog[open]::backdrop {
  opacity: 1 !important;
  transition-duration: 250ms !important;
}

@starting-style {
  .userpatch-dialog[open] {
    opacity: 0 !important;
    transform: scale(0.96) !important;
  }

  .userpatch-dialog[open]::backdrop {
    opacity: 0 !important;
  }
}

.userpatch-dialog-header {
  position: relative !important;
  margin-bottom: 1.25rem !important;
  padding-right: 2.75rem !important;
  text-align: left !important;
  display: flex !important;
  flex-direction: column !important;
  gap: 0.375rem !important;
}

.userpatch-dialog-title,
.userpatch-guide-heading {
  text-wrap: balance !important;
}

.userpatch-dialog-title {
  font-size: 1.125rem !important;
  font-weight: 600 !important;
  color: var(--foreground) !important;
  margin: 0 !important;
  line-height: 1.3 !important;
}

.userpatch-dialog-description {
  font-size: 0.875rem !important;
  color: var(--muted-foreground) !important;
  margin: 0 !important;
  line-height: 1.45 !important;
  text-wrap: pretty !important;
}

.userpatch-dialog-close-btn {
  position: absolute !important;
  top: 0 !important;
  right: 0 !important;
  background: transparent !important;
  border: none !important;
  color: var(--muted-foreground) !important;
  border-radius: 9999px !important;
  width: 2rem !important;
  height: 2rem !important;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  cursor: pointer !important;
  transition:
    color 140ms ease,
    background-color 140ms ease,
    transform 100ms var(--ease-out) !important;
}

.userpatch-dialog-close-btn::before {
  content: "" !important;
  position: absolute !important;
  top: 50% !important;
  left: 50% !important;
  transform: translate(-50%, -50%) !important;
  min-width: 44px !important;
  min-height: 44px !important;
  pointer-events: auto !important;
}

@media (hover: hover) and (pointer: fine) {
  .userpatch-dialog-close-btn:hover {
    color: var(--foreground) !important;
    background-color: var(--secondary) !important;
  }
}

.userpatch-share-btn:active {
  transform: none !important;
  background-color: transparent !important;
}

.userpatch-pack-copy-btn:active,
.userpatch-mirror-guide-trigger:active,
.userpatch-dialog-close-btn:active {
  transform: none !important;
  background-color: var(--secondary) !important;
}

.userpatch-dialog-close-btn svg {
  width: 1rem !important;
  height: 1rem !important;
}

.userpatch-dialog-body {
  display: flex !important;
  flex-direction: column !important;
  gap: 0 !important;
  text-align: left !important;
  list-style: none !important;
  margin: 0 !important;
  padding: 0 !important;
}

.userpatch-guide-item {
  display: flex !important;
  flex-direction: column !important;
  align-items: flex-start !important;
  text-align: left !important;
  gap: 0.35rem !important;
  padding: 0.95rem 0 !important;
  background: transparent !important;
  background-color: transparent !important;
  border: none !important;
  border-bottom: 1px solid var(--border) !important;
  border-radius: 0 !important;
  box-shadow: none !important;
}

.userpatch-guide-item:last-child {
  border-bottom: none !important;
}

.userpatch-guide-button {
  align-self: flex-start !important;
  display: inline-flex !important;
  align-items: center !important;
  gap: 0.375rem !important;
  min-height: unset !important;
  height: auto !important;
  padding: 0.25rem 0.625rem !important;
  border: 1px solid rgba(255, 255, 255, 0.14) !important;
  border-radius: var(--radius-md, 0.5rem) !important;
  background-color: var(--userpatch-btn-bg, var(--secondary)) !important;
  color: var(--userpatch-btn-color, var(--foreground)) !important;
  box-shadow:
    inset 0 1px 0 0 rgba(255, 255, 255, 0.18),
    0 1px 2px 0 rgba(0, 0, 0, 0.16) !important;
  box-sizing: border-box !important;
  font-size: 0.8125rem !important;
  font-weight: 500 !important;
  line-height: 1.25rem !important;
  letter-spacing: -0.01em !important;
}

.userpatch-guide-button svg {
  width: 0.875rem !important;
  height: 0.875rem !important;
}

@media (min-width: 761px) {
  .userpatch-guide-button {
    font-size: 0.875rem !important;
  }
}

.userpatch-guide-heading {
  font-size: 0.9375rem !important;
  font-weight: 600 !important;
  color: var(--foreground) !important;
  margin: 0 !important;
  line-height: 1.3 !important;
}

.userpatch-guide-text {
  font-size: 0.825rem !important;
  color: var(--muted-foreground) !important;
  line-height: 1.4 !important;
  margin: 0 !important;
  text-wrap: pretty !important;
}

@media (prefers-reduced-motion: reduce) {
  .userpatch-dialog,
  .userpatch-dialog[open],
  .userpatch-dialog[data-closing],
  .userpatch-dialog::backdrop,
  .userpatch-dialog[open]::backdrop,
  .userpatch-dialog[open][data-closing]::backdrop {
    transition-duration: 120ms !important;
  }

  .userpatch-dialog,
  .userpatch-dialog[open],
  .userpatch-dialog[data-closing] {
    transform: none !important;
  }

  #download:active,
  #button1:active,
  .${DIRECT_DOWNLOAD_BUTTON_CLASS}:active,
  .userpatch-btn-main:active,
  .userpatch-share-btn:active,
  .userpatch-pack-copy-btn:active,
  .userpatch-mirror-guide-trigger:active,
  .userpatch-dialog-close-btn:active,
  [data-slot="button-group"] > a:active,
  .${BUTTON_GROUP_CLASS} > a:active,
  [data-slot="button-group"] > button:active,
  .${BUTTON_GROUP_CLASS} > button:active {
    transform: none !important;
  }
}

.swal-modal {
  background-color: var(--card) !important;
  border: 1px solid var(--border) !important;
  border-radius: var(--radius-xl) !important;
  color: var(--foreground) !important;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5) !important;
}

.swal-title {
  color: var(--foreground) !important;
  font-family: inherit !important;
  font-weight: 600 !important;
}

.swal-text {
  color: var(--muted-foreground) !important;
  font-family: inherit !important;
}

.swal-button {
  border-radius: var(--radius-md, 0.5rem) !important;
  background-color: var(--primary) !important;
  color: var(--primary-foreground) !important;
  font-weight: 500 !important;
  border: none !important;
}

@media (forced-colors: active) {
  .${BUTTON_GROUP_CLASS}[data-mirror-type],
  [data-slot="button-group"][data-mirror-type] {
    background-color: ButtonFace !important;
    color: ButtonText !important;
    border-color: ButtonText !important;
    box-shadow: none !important;
  }

  #download,
  #button1,
  .${DIRECT_DOWNLOAD_BUTTON_CLASS} {
    background-color: ButtonFace !important;
    color: ButtonText !important;
    border: 1px solid ButtonText !important;
    box-shadow: none !important;
  }

  .userpatch-dialog {
    background-color: Canvas !important;
    color: CanvasText !important;
    border-color: CanvasText !important;
    box-shadow: none !important;
  }

  .userpatch-dialog::backdrop {
    background-color: CanvasText !important;
    backdrop-filter: none !important;
  }

  .userpatch-share-btn,
  .userpatch-pack-copy-btn,
  .userpatch-mirror-guide-trigger,
  .userpatch-dialog-close-btn {
    color: ButtonText !important;
  }

  .userpatch-pack-open-link {
    color: LinkText !important;
  }
}

${GENERATED_PAGE_CSS}
${systemThemeCss()}
`

    // src/hubcloud/site-header.js
    const ensureThemeMetadata = () => {
      const theme = ensureSystemTheme()
      let colorSchemeMeta = document.getElementById(COLOR_SCHEME_META_ID)
      if (!colorSchemeMeta) {
        colorSchemeMeta = document.createElement("meta")
        colorSchemeMeta.id = COLOR_SCHEME_META_ID
        colorSchemeMeta.name = "color-scheme"
        document.head?.append(colorSchemeMeta)
      }
      colorSchemeMeta.content = "light dark"
      let themeColorMeta = document.getElementById(THEME_COLOR_META_ID)
      if (!themeColorMeta) {
        themeColorMeta = document.createElement("meta")
        themeColorMeta.id = THEME_COLOR_META_ID
        themeColorMeta.name = "theme-color"
        document.head?.append(themeColorMeta)
      }
      themeColorMeta.content = theme === "dark" ? CONFIG.themeColor : "#ffffff"
    }
    const ensureFavicon = () => {
      try {
        const logoUri =
          getGeneratedPage() === "HubCDN"
            ? HUBCDN_LOGO_DATA_URI
            : HUBCLOUD_LOGO_DATA_URI
        const head = document.head || document.documentElement
        if (!head) {
          return
        }
        const existingIcons = document.querySelectorAll(
          "link[rel~='icon' i], link[rel='shortcut icon' i], link[rel='apple-touch-icon' i]"
        )
        let hasValidIcon = false
        for (const el of existingIcons) {
          if (el.getAttribute("href") === logoUri) {
            hasValidIcon = true
          } else {
            el.remove()
          }
        }
        if (!hasValidIcon) {
          const link = document.createElement("link")
          link.rel = "icon"
          link.type = "image/svg+xml"
          link.href = logoUri
          head.append(link)
          const shortcut = document.createElement("link")
          shortcut.rel = "shortcut icon"
          shortcut.type = "image/png"
          shortcut.href = logoUri
          head.append(shortcut)
        }
      } catch {}
    }
    const ensureStyles = () => {
      try {
        if (!document.body || isCloudflareChallenge()) {
          return false
        }
        const styleTarget = document.head || document.documentElement
        if (!styleTarget) {
          return false
        }
        if (!document.getElementById("userpatch-hubcloud-google-font")) {
          const googleFont = document.createElement("link")
          googleFont.id = GOOGLE_FONT_STYLE_ID
          googleFont.rel = "stylesheet"
          googleFont.href = CONFIG.googleFontUrl
          styleTarget.append(googleFont)
        }
        ensureThemeMetadata()
        ensureFavicon()
        const existingStyle = document.getElementById(STYLE_ID)
        if (existingStyle) {
          return true
        }
        const style = document.createElement("style")
        style.id = STYLE_ID
        style.textContent = REDESIGN_CSS
        styleTarget.append(style)
        return true
      } catch {
        return false
      }
    }
    const ensureHeader = () => {
      if (!document.body) {
        return
      }
      const provider = getGeneratedPage() || CONFIG.brandName
      const logoUri =
        provider === "HubCDN" ? HUBCDN_LOGO_DATA_URI : HUBCLOUD_LOGO_DATA_URI
      const existing = document.getElementById(HEADER_ID)
      if (existing) {
        const logo = existing.querySelector("img")
        const name = existing.querySelector(".userpatch-brand-name")
        if (logo && logo.src !== logoUri) {
          logo.src = logoUri
        }
        if (name && name.textContent !== provider) {
          name.textContent = provider
        }
        return
      }
      const header = document.createElement("header")
      header.id = HEADER_ID
      header.className = "userpatch-hubcloud-header"
      const brand = document.createElement("div")
      brand.className = "userpatch-brand-container"
      const logo = document.createElement("img")
      logo.className = "userpatch-brand-logo"
      logo.src = logoUri
      logo.alt = ""
      logo.width = CONFIG.logoWidth
      logo.height = CONFIG.logoHeight
      const name = document.createElement("span")
      name.className = "userpatch-brand-name"
      name.textContent = provider
      brand.append(logo, name)
      header.append(brand)
      document.body.prepend(header)
    }

    // src/hubcloud/main.js
    ;(() => {
      const processPage = () => {
        if (!ensureStyles()) {
          return
        }
        ensureHeader()
        const generatedProvider = getGeneratedPage()
        if (generatedProvider) {
          return normalizeGeneratedPage()
        }
        if (isHubCloudPackPage()) {
          normalizePackPage()
          return true
        }
        normalizeFileDetails()
        normalizeActionButtons()
        normalizeLucideIcons()
        wrapDownloadButtons()
        removeClutter()
        return true
      }
      if (isDirectFileLink(location.href)) {
        return
      }
      showRedesignLoader(/(^|\.)(hubcloud|hubcdn)\./i)
      let active = false
      let detectionTimeout = 0
      const observer = new MutationObserver(() => processMutations())
      const processMutations = () => {
        if (isCloudflareChallenge()) {
          dismissPageLoader(true)
          return
        }
        if (!document.body) {
          return
        }
        if (isDirectFileLink(location.href)) {
          observer.disconnect()
          window.clearTimeout(detectionTimeout)
          return
        }
        if (!active) {
          if (!hasHubCloudDomSignatures()) {
            return
          }
          showInitialPageLoader(() => document.documentElement)
          active = true
          window.clearTimeout(detectionTimeout)
        }
        try {
          const ready = processPage()
          if (ready) {
            dismissPageLoader()
          }
        } catch {
          dismissPageLoader(true)
        } finally {
          observer.takeRecords()
        }
      }
      const observePage = () => {
        observer.observe(document.documentElement, {
          childList: true,
          subtree: true,
          attributes: true,
          attributeFilter: ["href", "onclick", "class", "id"],
        })
        if (!active) {
          window.clearTimeout(detectionTimeout)
          detectionTimeout = window.setTimeout(() => observer.disconnect(), 3e4)
        }
        processMutations()
      }
      observePage()
      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", processMutations, {
          once: true,
        })
      }
      window.addEventListener("pagehide", () => {
        observer.disconnect()
        window.clearTimeout(detectionTimeout)
      })
      window.addEventListener("pageshow", (event) => {
        if (event.persisted) {
          observePage()
        }
      })
    })()
  })()
}
if (new RegExp("^.*://.*/.*$").test(location.href)) {
  // Generated from src/ — do not edit by hand.
  ;(function installLoadingCover(force = false, timeoutMs = 8000) {
    const root = document.documentElement
    if (!root) {
      // Some injection paths run before the parser creates <html>. Retry in the
      // mutation microtask instead of waiting for the much later body event.
      let timeout = 0
      const pending = new MutationObserver(() => {
        if (document.documentElement) {
          pending.disconnect()
          window.clearTimeout(timeout)
          installLoadingCover(force, timeoutMs)
        }
      })
      pending.observe(document, { childList: true })
      timeout = window.setTimeout(() => pending.disconnect(), timeoutMs)
      window.addEventListener(
        "pagehide",
        () => {
          pending.disconnect()
          window.clearTimeout(timeout)
        },
        { once: true }
      )
      return null
    }
    const isChallenge = () =>
      /just a moment|attention required|checking your browser/i.test(
        document.title
      ) ||
      location.pathname.startsWith("/cdn-cgi/") ||
      Boolean(
        document.querySelector(
          "#challenge-form, #challenge-running, #cf-challenge-running, .cf-turnstile"
        )
      )
    if (isChallenge()) {
      return null
    }
    if (
      !force &&
      (!/(^|\.)(4khdhub|hdhub4u|hblinks|hubcloud|hubcdn)\./i.test(
        location.hostname
      ) ||
        /\.(mkv|mp4|avi|mov|webm|zip|rar|7z|iso|mp3|flac)$/i.test(
          location.pathname
        ))
    ) {
      return null
    }
    const existing = document.getElementById("userpatch-page-loader")
    if (existing) {
      return existing
    }
    let style = document.getElementById("userpatch-page-loader-style")
    if (!style) {
      style = document.createElement("style")
      style.id = "userpatch-page-loader-style"
      style.textContent = `
      html[data-userpatch-loading] { background: #0a0a0a !important; color-scheme: light dark !important; }
      /* Visibility alone can be overridden by the source's visible children.
         Opacity suppresses the entire body, including its white background. */
      html[data-userpatch-loading] > body {
        visibility: hidden !important;
        opacity: 0 !important;
        pointer-events: none !important;
      }
      #userpatch-page-loader {
        all: initial !important; position: fixed !important; inset: 0 !important;
        z-index: 2147483647 !important; display: grid !important;
        place-items: center !important; visibility: visible !important;
        background: #0a0a0a !important; color: #fafafa !important;
      }
      #userpatch-page-loader progress, progress.userpatch-loading-spinner {
        appearance: none !important; display: block !important;
        inline-size: 2rem !important; block-size: 2rem !important;
        box-sizing: border-box !important; margin: auto !important;
        border: 2px solid #444 !important; border-block-start-color: #fafafa !important;
        border-radius: 50% !important; background: transparent !important;
        animation: userpatch-loader-spin 1s linear infinite !important;
      }
      #userpatch-page-loader progress::-webkit-progress-bar,
      progress.userpatch-loading-spinner::-webkit-progress-bar { display: none; }
      #userpatch-page-loader progress::-moz-progress-bar,
      progress.userpatch-loading-spinner::-moz-progress-bar { background: transparent; }
      @keyframes userpatch-loader-spin { to { transform: rotate(360deg); } }
      @media (prefers-color-scheme: light) {
        html[data-userpatch-loading] { background: #ffffff !important; }
        #userpatch-page-loader { background: #ffffff !important; color: #0a0a0a !important; }
        #userpatch-page-loader progress, progress.userpatch-loading-spinner {
          border-color: #ddd !important;
          border-block-start-color: #0a0a0a !important;
        }
      }
      @media (prefers-reduced-motion: reduce) {
        #userpatch-page-loader progress, progress.userpatch-loading-spinner { animation-duration: 6s !important; }
      }
    `
      root.append(style)
    }
    const cover = document.createElement("div")
    cover.id = "userpatch-page-loader"
    cover.setAttribute("aria-busy", "true")
    const spinner = document.createElement("progress")
    spinner.setAttribute("aria-label", "Loading page")
    cover.append(spinner)
    root.dataset.userpatchLoading = ""
    root.append(cover)
    let timer = 0
    const cleanup = () => {
      delete root.dataset.userpatchLoading
      cover.remove()
      observer.disconnect()
      window.clearTimeout(timer)
    }
    const observer = new MutationObserver(() => {
      if (!Object.hasOwn(root.dataset, "userpatchLoading") || isChallenge()) {
        cleanup()
        return
      }
      // Some themes rebuild body/head during startup. Keep the cover and its
      // stylesheet outside those containers until the redesign explicitly reveals.
      if (!style.isConnected) {
        root.append(style)
      }
      if (!cover.isConnected) {
        root.append(cover)
      }
    })
    observer.observe(document, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["data-userpatch-loading"],
    })
    timer = window.setTimeout(cleanup, timeoutMs)
    window.addEventListener(
      "pagehide",
      () => {
        // Do not uncover a partially parsed outgoing document during navigation.
        observer.disconnect()
        window.clearTimeout(timer)
      },
      { once: true }
    )
    window.addEventListener("pageshow", (event) => {
      if (event.persisted) {
        cleanup()
      }
    })
    return cover
  })()

  ;("use strict")

  ;(function () {
    // src/hdhub4u/dom.js
    const normalizeText = (value) =>
      (value || "")
        .replaceAll(/[\uE000-\uF8FF]/gu, " ")
        .replaceAll(/\s+/g, " ")
        .trim()

    // src/shared/4khdhub-icon.js
    const SITE_ICON_SVG$1 = String.raw`<svg xmlns="http://www.w3.org/2000/svg" viewBox="17.94 17.564 152.818 156.906" width="192" height="192">
  <defs>
    <style>
      :root {
        color: #000000;
        --brand-text: #000000;
        --play-icon: #ff931e;
      }
      .play-icon {
        stroke: var(--play-icon, #ff931e);
      }
      .brand-text {
        fill: var(--brand-text, currentColor);
      }
      @media (prefers-color-scheme: dark) {
        :root {
          color: #ffffff;
          --brand-text: #ffffff;
        }
        .brand-text {
          fill: var(--brand-text, #ffffff) !important;
        }
      }
      .dark .brand-text,
      [data-theme="dark"] .brand-text,
      [data-detail-theme="dark"] .brand-text {
        fill: #ffffff !important;
      }
      .light .brand-text,
      [data-theme="light"] .brand-text,
      [data-detail-theme="light"] .brand-text {
        fill: #000000 !important;
      }
    </style>
  </defs>
  <path id="play-triangle" class="play-icon" d="M 45.5 23.5 L 164.5 96 L 45.5 168.5 Z" fill="none" stroke="#ff931e" stroke-width="11" stroke-linejoin="round" stroke-linecap="round"/>
  <g id="brand-4k" class="brand-text" fill="currentColor">
    <path d="M 52.84 59.98 C 52.82 60 52.85 60.06 52.9 60.13 C 52.95 60.19 53.01 60.3 53.03 60.38 C 53.05 60.47 53.18 60.57 53.43 60.7 C 53.64 60.81 53.85 60.93 53.9 60.98 C 53.95 61.03 54.12 61.13 54.27 61.19 C 54.42 61.25 54.62 61.37 54.71 61.44 C 54.8 61.52 54.97 61.61 55.08 61.66 C 55.19 61.7 55.38 61.81 55.49 61.89 C 55.6 61.97 55.8 62.09 55.93 62.15 C 56.06 62.21 56.21 62.3 56.26 62.34 C 56.31 62.39 56.51 62.5 56.71 62.6 C 56.91 62.69 57.09 62.8 57.11 62.83 C 57.13 62.87 57.32 62.98 57.52 63.06 C 57.72 63.15 57.91 63.26 57.93 63.29 C 57.95 63.33 58.12 63.42 58.31 63.51 C 58.49 63.59 58.69 63.7 58.76 63.76 C 58.82 63.82 58.98 63.91 59.11 63.97 C 59.24 64.02 59.43 64.13 59.53 64.2 C 59.64 64.28 59.85 64.4 60 64.46 C 60.15 64.52 60.33 64.63 60.4 64.69 C 60.46 64.75 60.66 64.87 60.85 64.94 C 61.03 65.02 61.21 65.13 61.25 65.18 C 61.29 65.23 61.48 65.34 61.67 65.43 C 61.86 65.52 62.05 65.62 62.08 65.66 C 62.12 65.71 62.26 65.79 62.4 65.85 C 62.54 65.91 62.74 66.03 62.85 66.11 C 62.96 66.19 63.14 66.29 63.25 66.33 C 63.36 66.37 63.52 66.46 63.6 66.54 C 63.68 66.61 63.89 66.74 64.07 66.82 C 64.25 66.9 64.42 67 64.45 67.04 C 64.47 67.08 64.66 67.19 64.86 67.27 C 65.06 67.36 65.25 67.46 65.27 67.5 C 65.29 67.54 65.48 67.64 65.67 67.73 C 66 67.88 66.05 67.92 66.14 68.17 L 66.25 68.45 L 66.1 68.6 C 66.02 68.69 65.91 68.85 65.86 68.95 C 65.81 69.06 65.74 69.14 65.71 69.14 C 65.66 69.14 65.53 69.32 65.08 70.02 C 64.98 70.18 64.82 70.4 64.72 70.52 C 64.61 70.63 64.53 70.75 64.53 70.78 C 64.53 70.81 64.44 70.93 64.34 71.05 C 64.23 71.17 64.09 71.35 64.03 71.45 C 63.85 71.74 63.58 72.1 63.34 72.39 C 63.22 72.54 63.12 72.68 63.12 72.71 C 63.12 72.73 63.03 72.86 62.93 72.99 C 62.82 73.12 62.67 73.34 62.57 73.48 C 62.36 73.82 62.15 74.11 61.97 74.32 C 61.89 74.41 61.75 74.61 61.65 74.76 C 61.39 75.16 61.21 75.41 61.01 75.67 C 60.79 75.96 60.59 76.23 60.38 76.57 C 60.29 76.71 60.13 76.92 60.03 77.04 C 59.92 77.16 59.84 77.29 59.84 77.32 C 59.84 77.35 59.75 77.47 59.65 77.58 C 59.54 77.7 59.39 77.9 59.29 78.04 C 59.08 78.38 58.89 78.66 58.66 78.94 C 58.44 79.23 58.24 79.5 58.03 79.84 C 57.94 79.98 57.78 80.19 57.68 80.3 C 57.57 80.42 57.49 80.53 57.49 80.56 C 57.49 80.58 57.4 80.71 57.3 80.82 C 57.19 80.94 57.03 81.16 56.94 81.31 C 56.73 81.65 56.55 81.93 56.32 82.22 C 56.09 82.52 55.8 82.91 55.62 83.19 C 55.36 83.58 55.12 83.9 54.95 84.11 C 54.86 84.23 54.72 84.41 54.66 84.51 C 54.47 84.81 54.09 85.37 53.93 85.58 C 53.5 86.14 53.38 86.3 53.22 86.54 C 52.97 86.93 52.79 87.18 52.58 87.45 C 52.37 87.71 52.19 87.98 51.94 88.36 C 51.85 88.51 51.7 88.7 51.62 88.8 C 51.47 88.97 51.28 89.23 51.08 89.53 C 50.55 90.31 50.44 90.47 50.24 90.73 C 49.89 91.18 49.55 91.67 49.45 91.86 C 49.4 91.97 49.33 92.05 49.3 92.05 C 49.27 92.05 49.18 92.15 49.11 92.27 C 49.04 92.39 48.91 92.57 48.83 92.67 C 48.75 92.77 48.61 92.97 48.51 93.11 C 48.3 93.45 48.11 93.73 47.88 94.01 C 47.6 94.37 47.33 94.74 47.21 94.95 C 47.15 95.05 47 95.24 46.91 95.35 C 46.8 95.47 46.72 95.59 46.72 95.62 C 46.72 95.66 46.63 95.78 46.53 95.9 C 46.42 96.02 46.27 96.24 46.18 96.39 C 46.1 96.54 45.97 96.71 45.9 96.77 C 45.83 96.83 45.78 96.91 45.78 96.95 C 45.78 96.99 45.7 97.11 45.6 97.22 C 45.41 97.44 45.22 97.69 44.97 98.08 C 44.88 98.22 44.71 98.46 44.59 98.6 C 44.47 98.75 44.37 98.89 44.37 98.92 C 44.37 98.95 44.27 99.09 44.15 99.23 C 44.03 99.37 43.88 99.56 43.82 99.66 C 43.62 99.98 43.31 100.42 43.17 100.56 C 43.09 100.64 43 100.77 42.96 100.85 C 42.92 100.93 42.82 101.07 42.74 101.17 C 42.6 101.35 42.35 101.7 42.02 102.21 C 41.91 102.37 41.81 102.49 41.78 102.49 C 41.76 102.49 41.69 102.58 41.63 102.68 C 41.51 102.91 41.13 103.45 40.83 103.82 C 40.71 103.97 40.61 104.11 40.61 104.14 C 40.61 104.16 40.52 104.29 40.42 104.42 C 40.31 104.55 40.16 104.77 40.06 104.91 C 39.85 105.25 39.64 105.54 39.46 105.75 C 39.38 105.84 39.24 106.04 39.14 106.19 C 38.88 106.59 38.7 106.84 38.5 107.1 C 38.29 107.36 38.11 107.62 37.86 108.01 C 37.77 108.16 37.6 108.38 37.5 108.51 C 37.4 108.64 37.24 108.86 37.13 108.98 C 37.02 109.11 36.87 109.34 36.78 109.48 C 36.57 109.81 36.38 110.1 36.15 110.38 C 35.69 110.98 35.56 111.16 35.41 111.42 C 35.32 111.58 35.23 111.7 35.2 111.7 C 35.18 111.7 35.09 111.8 35.02 111.92 C 34.95 112.04 34.81 112.24 34.71 112.35 C 34.53 112.56 34.32 112.88 34.05 113.32 C 33.99 113.43 33.86 113.6 33.78 113.68 C 33.7 113.77 33.57 113.94 33.5 114.06 C 33.42 114.18 33.34 114.28 33.31 114.28 C 33.28 114.28 33.2 114.39 33.13 114.53 C 33.06 114.67 32.91 114.88 32.81 115 C 32.7 115.12 32.61 115.24 32.61 115.27 C 32.61 115.31 32.51 115.45 32.39 115.59 C 32.16 115.86 32.03 116.05 31.75 116.5 C 31.66 116.64 31.5 116.85 31.4 116.97 C 31.29 117.09 31.21 117.22 31.21 117.25 C 31.21 117.29 31.15 117.36 31.09 117.42 C 31.02 117.48 30.88 117.67 30.77 117.83 C 30.66 117.99 30.52 118.19 30.44 118.28 C 30.25 118.48 29.88 118.96 29.74 119.18 C 29.68 119.27 29.49 119.53 29.34 119.74 C 29.18 119.95 29 120.2 28.94 120.29 C 28.89 120.38 28.76 120.56 28.66 120.67 C 28.55 120.79 28.34 121.03 28.17 121.22 C 28.01 121.4 27.87 121.58 27.87 121.6 C 27.87 121.62 27.8 121.72 27.72 121.82 C 27.64 121.91 27.53 122.07 27.48 122.17 C 27.43 122.26 27.29 122.46 27.18 122.59 C 27.06 122.72 26.87 122.97 26.75 123.12 C 26.63 123.27 26.46 123.5 26.37 123.61 C 26.28 123.72 26.14 123.91 26.07 124.02 C 25.99 124.13 25.85 124.32 25.75 124.44 C 25.65 124.56 25.47 124.78 25.36 124.93 C 25.25 125.08 25.06 125.3 24.94 125.42 C 24.82 125.54 24.69 125.71 24.64 125.81 C 24.59 125.91 24.51 126.03 24.45 126.07 C 24.4 126.12 24.3 126.26 24.23 126.39 C 24.17 126.52 24.04 126.71 23.94 126.81 C 23.69 127.07 23.35 127.48 23.17 127.75 C 23.09 127.88 22.89 128.13 22.75 128.31 C 22.6 128.49 22.44 128.71 22.38 128.81 C 22.33 128.9 22.2 129.06 22.12 129.16 C 22.03 129.25 21.89 129.44 21.81 129.56 C 21.73 129.68 21.65 129.78 21.62 129.78 C 21.6 129.78 21.49 129.9 21.39 130.06 C 21.04 130.58 20.77 130.95 20.64 131.07 C 20.56 131.13 20.46 131.27 20.42 131.36 C 20.37 131.45 20.28 131.56 20.21 131.59 C 20.15 131.63 20.03 131.77 19.97 131.9 C 19.84 132.15 19.64 132.42 19.25 132.85 C 19.13 132.98 19.03 133.14 19.03 133.18 C 19.03 133.23 19.08 133.31 19.14 133.36 C 19.23 133.45 19.77 133.46 24.66 133.47 C 29.03 133.49 30.12 133.51 30.28 133.57 C 30.43 133.63 30.54 133.63 30.84 133.58 C 31.1 133.53 36.23 133.52 48.69 133.52 L 66.17 133.52 L 66.27 133.68 C 66.37 133.83 66.38 134.27 66.39 141.33 C 66.4 145.45 66.38 148.9 66.35 149.01 C 66.31 149.16 66.24 149.23 66 149.34 C 65.84 149.42 65.65 149.53 65.59 149.59 C 65.53 149.64 65.36 149.74 65.21 149.8 C 65.06 149.86 64.92 149.95 64.89 149.99 C 64.87 150.03 64.69 150.14 64.5 150.22 C 64.31 150.31 64.09 150.44 64.02 150.51 C 63.96 150.57 63.77 150.68 63.6 150.75 C 63.44 150.82 63.25 150.93 63.19 150.98 C 63.13 151.04 62.97 151.13 62.84 151.19 C 62.71 151.24 62.53 151.34 62.43 151.42 C 62.34 151.49 62.12 151.62 61.95 151.7 C 61.79 151.79 61.63 151.89 61.6 151.92 C 61.58 151.96 61.41 152.05 61.23 152.13 C 61.05 152.21 60.85 152.32 60.78 152.38 C 60.72 152.44 60.56 152.53 60.43 152.59 C 60.3 152.64 60.12 152.74 60.02 152.82 C 59.93 152.89 59.71 153.02 59.54 153.1 C 59.38 153.19 59.22 153.29 59.19 153.32 C 59.17 153.36 59 153.45 58.82 153.53 C 58.64 153.61 58.44 153.72 58.37 153.78 C 58.31 153.84 58.11 153.96 57.92 154.03 C 57.74 154.11 57.56 154.22 57.52 154.28 C 57.48 154.33 57.31 154.44 57.16 154.52 C 57.01 154.6 56.88 154.69 56.88 154.73 C 56.88 154.76 56.97 154.83 57.09 154.88 C 57.27 154.95 59.35 154.96 72.52 154.96 C 83.94 154.96 87.81 154.94 88.01 154.89 C 88.16 154.85 88.28 154.78 88.3 154.75 C 88.31 154.7 88.21 154.62 88.04 154.55 C 87.89 154.49 87.69 154.37 87.61 154.29 C 87.53 154.21 87.33 154.1 87.17 154.03 C 87.01 153.96 86.82 153.85 86.76 153.8 C 86.7 153.74 86.52 153.64 86.37 153.58 C 86.22 153.52 86.08 153.43 86.05 153.39 C 86.03 153.35 85.85 153.24 85.66 153.16 C 85.47 153.07 85.25 152.94 85.18 152.87 C 85.12 152.81 84.93 152.7 84.76 152.63 C 84.6 152.56 84.41 152.45 84.35 152.4 C 84.29 152.34 84.11 152.24 83.96 152.18 C 83.81 152.12 83.67 152.03 83.64 151.99 C 83.62 151.95 83.44 151.84 83.25 151.76 C 83.06 151.67 82.84 151.54 82.77 151.47 C 82.71 151.41 82.52 151.3 82.35 151.23 C 82.19 151.16 82 151.05 81.94 151 C 81.88 150.94 81.72 150.85 81.59 150.79 C 81.46 150.74 81.28 150.64 81.18 150.56 C 81.09 150.49 80.87 150.36 80.7 150.28 C 80.54 150.19 80.38 150.09 80.36 150.06 C 80.34 150.02 80.15 149.92 79.96 149.83 C 79.77 149.74 79.51 149.6 79.4 149.51 C 79.29 149.43 79.13 149.32 79.05 149.27 C 78.74 149.05 78.75 149.36 78.75 141.42 C 78.75 133.26 78.73 133.79 79.13 133.62 C 79.3 133.55 80.11 133.54 84.07 133.54 C 88.46 133.54 88.82 133.53 89.01 133.43 L 89.22 133.33 L 89.24 128.78 C 89.25 124.6 89.25 124.22 89.16 124.15 C 89.08 124.08 88.19 124.06 84.04 124.04 C 80.11 124.02 78.99 123.99 78.89 123.93 L 78.76 123.85 L 78.75 101.94 C 78.73 80.48 78.73 80.02 78.62 79.9 C 78.46 79.72 78.3 79.75 78.19 79.96 C 78.14 80.07 77.99 80.26 77.87 80.41 C 77.75 80.55 77.65 80.69 77.65 80.72 C 77.65 80.75 77.57 80.86 77.48 80.97 C 77.39 81.08 77.27 81.26 77.21 81.37 C 77.15 81.48 77.02 81.67 76.91 81.8 C 76.8 81.92 76.71 82.05 76.71 82.08 C 76.71 82.11 76.62 82.24 76.52 82.36 C 76.41 82.48 76.26 82.7 76.17 82.85 C 76.09 83 75.96 83.17 75.89 83.23 C 75.82 83.29 75.77 83.38 75.77 83.42 C 75.77 83.46 75.69 83.57 75.61 83.66 C 75.52 83.75 75.38 83.95 75.29 84.09 C 75.2 84.24 75.09 84.39 75.04 84.44 C 74.99 84.48 74.88 84.64 74.79 84.8 C 74.71 84.96 74.61 85.09 74.59 85.09 C 74.57 85.09 74.47 85.21 74.37 85.37 C 74.16 85.69 73.98 85.96 73.74 86.29 C 73.65 86.41 73.52 86.6 73.46 86.71 C 73.4 86.81 73.25 87 73.16 87.11 C 73.05 87.23 72.97 87.34 72.97 87.37 C 72.97 87.39 72.85 87.57 72.71 87.76 C 72.56 87.95 72.45 88.14 72.45 88.16 C 72.45 88.19 72.37 88.31 72.27 88.42 C 71.94 88.81 71.7 89.16 71.54 89.43 C 71.46 89.59 71.37 89.71 71.34 89.71 C 71.31 89.71 71.21 89.83 71.11 89.99 C 71.01 90.15 70.88 90.34 70.82 90.42 C 70.76 90.5 70.64 90.67 70.55 90.8 C 70.26 91.24 70.11 91.44 69.93 91.68 C 69.71 91.97 69.51 92.24 69.3 92.58 C 69.21 92.72 69.05 92.94 68.95 93.07 C 68.84 93.2 68.76 93.33 68.76 93.35 C 68.76 93.38 68.66 93.52 68.54 93.66 C 68.42 93.8 68.27 93.99 68.22 94.09 C 68.05 94.37 67.72 94.84 67.6 94.96 C 67.54 95.02 67.45 95.16 67.39 95.26 C 67.34 95.36 67.21 95.55 67.1 95.68 C 66.99 95.81 66.86 96 66.8 96.08 C 66.75 96.17 66.64 96.34 66.55 96.45 L 66.4 96.65 L 66.4 110.26 C 66.4 123.37 66.39 123.88 66.29 123.96 C 66.19 124.05 65.17 124.06 52.79 124.06 C 43.78 124.06 39.33 124.04 39.19 124 C 39.07 123.96 38.96 123.91 38.94 123.88 C 38.92 123.85 38.97 123.75 39.05 123.65 C 39.13 123.55 39.2 123.45 39.2 123.42 C 39.2 123.39 39.3 123.25 39.42 123.11 C 39.54 122.97 39.68 122.78 39.74 122.68 C 39.91 122.4 40.24 121.94 40.4 121.75 C 40.58 121.53 40.79 121.24 41 120.91 C 41.09 120.77 41.25 120.55 41.36 120.42 C 41.46 120.29 41.55 120.16 41.55 120.14 C 41.55 120.11 41.65 119.97 41.77 119.82 C 42.07 119.45 42.45 118.92 42.57 118.68 C 42.62 118.58 42.69 118.49 42.72 118.49 C 42.75 118.49 42.84 118.39 42.91 118.27 C 42.98 118.15 43.11 117.97 43.19 117.87 C 43.27 117.77 43.41 117.57 43.51 117.43 C 43.72 117.09 43.91 116.81 44.14 116.53 C 44.42 116.17 44.69 115.8 44.81 115.59 C 44.87 115.49 45.02 115.3 45.12 115.19 C 45.22 115.07 45.31 114.95 45.31 114.92 C 45.31 114.88 45.4 114.76 45.5 114.64 C 45.61 114.52 45.76 114.3 45.85 114.15 C 45.93 114 46.06 113.83 46.13 113.77 C 46.2 113.71 46.25 113.63 46.25 113.59 C 46.25 113.55 46.33 113.43 46.43 113.32 C 46.62 113.1 46.81 112.85 47.06 112.46 C 47.15 112.32 47.32 112.08 47.45 111.94 C 47.57 111.79 47.67 111.65 47.67 111.62 C 47.67 111.59 47.76 111.47 47.86 111.35 C 47.96 111.23 48.1 111.05 48.16 110.95 C 48.34 110.66 48.61 110.29 48.81 110.05 C 48.91 109.93 49.03 109.77 49.07 109.69 C 49.11 109.61 49.21 109.46 49.29 109.37 C 49.43 109.19 49.68 108.84 50.01 108.33 C 50.12 108.18 50.22 108.05 50.25 108.05 C 50.27 108.05 50.34 107.96 50.4 107.86 C 50.52 107.63 50.9 107.1 51.2 106.73 C 51.32 106.58 51.42 106.44 51.42 106.41 C 51.42 106.39 51.51 106.26 51.61 106.13 C 51.71 106 51.87 105.78 51.96 105.64 C 52.17 105.3 52.38 105.01 52.56 104.8 C 52.64 104.7 52.78 104.51 52.88 104.36 C 53.14 103.96 53.32 103.71 53.52 103.45 C 53.73 103.19 53.91 102.93 54.16 102.54 C 54.32 102.3 54.44 102.14 54.87 101.58 C 55.03 101.37 55.42 100.82 55.6 100.51 C 55.66 100.41 55.79 100.23 55.88 100.12 C 56.2 99.73 56.44 99.39 56.6 99.11 C 56.69 98.96 56.78 98.83 56.81 98.83 C 56.83 98.83 56.92 98.73 56.99 98.61 C 57.06 98.49 57.2 98.3 57.3 98.18 C 57.4 98.06 57.53 97.89 57.59 97.8 C 57.88 97.33 58.11 96.98 58.23 96.84 C 58.31 96.76 58.43 96.59 58.5 96.46 C 58.58 96.34 58.66 96.24 58.69 96.24 C 58.72 96.24 58.8 96.13 58.87 95.99 C 58.94 95.86 59.09 95.64 59.19 95.52 C 59.3 95.4 59.39 95.28 59.39 95.25 C 59.39 95.21 59.49 95.07 59.61 94.93 C 59.83 94.66 59.97 94.47 60.25 94.02 C 60.34 93.88 60.5 93.67 60.61 93.55 C 60.71 93.43 60.8 93.31 60.8 93.29 C 60.8 93.27 60.89 93.15 60.99 93.03 C 61.09 92.91 61.25 92.7 61.34 92.56 C 61.55 92.22 61.74 91.94 61.97 91.66 C 62.17 91.4 62.35 91.15 62.61 90.75 C 62.71 90.6 62.85 90.4 62.93 90.31 C 63.12 90.09 63.32 89.81 63.53 89.47 C 63.62 89.33 63.78 89.11 63.89 88.98 C 63.99 88.85 64.08 88.72 64.08 88.7 C 64.08 88.67 64.18 88.53 64.3 88.38 C 64.54 88.09 64.81 87.72 64.99 87.44 C 65.05 87.34 65.2 87.15 65.3 87.04 C 65.4 86.92 65.49 86.8 65.49 86.77 C 65.49 86.73 65.58 86.61 65.68 86.49 C 65.79 86.37 65.95 86.15 66.04 86 C 66.24 85.67 66.44 85.37 66.63 85.15 C 66.81 84.94 67.15 84.46 67.29 84.22 C 67.34 84.13 67.49 83.93 67.61 83.79 C 67.73 83.65 67.83 83.51 67.83 83.48 C 67.83 83.45 67.93 83.31 68.05 83.17 C 68.17 83.03 68.31 82.84 68.37 82.74 C 68.52 82.5 68.86 82.01 69.03 81.81 C 69.22 81.59 69.42 81.29 69.62 80.96 C 69.71 80.81 69.87 80.6 69.98 80.47 C 70.09 80.35 70.17 80.23 70.17 80.19 C 70.17 80.16 70.26 80.04 70.36 79.92 C 70.46 79.8 70.6 79.62 70.66 79.52 C 70.84 79.23 71.11 78.87 71.35 78.58 C 71.47 78.43 71.57 78.29 71.57 78.26 C 71.57 78.24 71.66 78.11 71.76 77.98 C 71.86 77.85 72.02 77.63 72.11 77.49 C 72.32 77.15 72.53 76.86 72.71 76.65 C 72.79 76.55 72.93 76.36 73.03 76.21 C 73.29 75.81 73.47 75.56 73.67 75.3 C 73.89 75.01 74.09 74.74 74.3 74.4 C 74.39 74.26 74.55 74.05 74.66 73.93 C 74.76 73.81 74.85 73.68 74.85 73.65 C 74.85 73.62 74.94 73.5 75.04 73.39 C 75.14 73.27 75.3 73.07 75.39 72.93 C 75.6 72.59 75.79 72.31 76.02 72.03 C 76.24 71.74 76.44 71.47 76.65 71.13 C 76.74 70.99 76.9 70.78 77.01 70.67 C 77.11 70.55 77.2 70.44 77.2 70.41 C 77.2 70.39 77.28 70.27 77.39 70.16 C 77.55 69.97 77.78 69.65 78.06 69.17 C 78.12 69.08 78.25 68.91 78.35 68.79 C 78.45 68.67 78.59 68.48 78.66 68.36 C 78.73 68.24 78.81 68.14 78.84 68.14 C 78.86 68.14 78.96 68.02 79.05 67.86 C 79.21 67.59 79.45 67.25 79.77 66.86 C 79.86 66.75 79.99 66.57 80.05 66.47 C 80.35 65.98 80.72 65.46 80.84 65.36 C 80.91 65.3 80.96 65.23 80.96 65.19 C 80.96 65.16 81.05 65.04 81.15 64.91 C 81.25 64.79 81.41 64.58 81.5 64.44 C 81.71 64.1 81.9 63.82 82.13 63.54 C 82.33 63.28 82.51 63.03 82.77 62.63 C 82.87 62.48 83.01 62.28 83.09 62.19 C 83.28 61.97 83.48 61.69 83.69 61.35 C 83.78 61.21 83.94 60.99 84.05 60.86 C 84.15 60.73 84.24 60.6 84.24 60.56 C 84.26 60.35 84.22 60.07 84.16 60.04 C 84.08 59.99 52.91 59.98 52.86 60.03 L 52.84 59.98 Z M 90.12 34.13 C 90.03 34.19 89.91 34.3 89.86 34.36 C 89.78 34.46 89.77 40.42 89.77 81.05 L 89.77 127.62 L 89.99 127.82 L 90.2 128.03 L 95.66 128.03 C 99.94 128.03 101.14 128.01 101.21 127.96 C 101.26 127.92 101.34 127.81 101.41 127.73 C 101.5 127.59 101.51 124.15 101.51 81.08 C 101.51 46.76 101.49 34.54 101.44 34.44 C 101.4 34.37 101.31 34.24 101.24 34.16 L 101.12 34.03 L 95.7 34.03 C 90.56 34.03 90.27 34.04 90.11 34.14 L 90.12 34.13 Z M 143.87 34.12 C 143.68 34.19 143.46 34.38 143.01 34.86 C 142.67 35.21 142.2 35.72 141.95 35.99 C 141.7 36.25 141.26 36.72 140.97 37.02 C 140.68 37.33 140.26 37.78 140.02 38.02 C 139.79 38.26 139.36 38.72 139.07 39.04 C 138.78 39.35 138.37 39.8 138.15 40.04 C 137.93 40.27 137.43 40.81 137.05 41.23 C 136.67 41.65 136.29 42.06 136.2 42.15 C 136.11 42.24 135.73 42.65 135.34 43.07 C 134.95 43.49 134.53 43.94 134.39 44.08 C 134.26 44.22 133.82 44.69 133.41 45.12 C 133.01 45.55 132.6 45.99 132.5 46.1 C 132.4 46.2 131.92 46.72 131.44 47.26 C 130.95 47.8 130.48 48.31 130.39 48.4 C 130.3 48.49 130 48.82 129.71 49.13 C 129.42 49.44 128.98 49.91 128.73 50.18 C 128.48 50.44 128.04 50.91 127.75 51.21 C 127.46 51.52 127.03 51.98 126.79 52.24 C 126.55 52.5 126.23 52.83 126.09 52.99 C 125.85 53.24 125.22 53.93 124.15 55.09 C 123.45 55.86 122.35 57.03 122.1 57.3 C 121.97 57.44 121.54 57.89 121.15 58.31 C 120.76 58.73 120.34 59.18 120.2 59.31 C 119.84 59.68 118.76 60.85 117.97 61.73 C 117.18 62.6 117 62.8 116.66 63.16 C 116.53 63.3 116.1 63.75 115.71 64.17 C 115.32 64.59 114.8 65.14 114.55 65.41 C 114.3 65.68 113.87 66.13 113.6 66.42 C 113.33 66.71 113 67.06 112.87 67.2 C 112.74 67.34 112.35 67.76 112.01 68.12 C 111.67 68.49 111.21 69 110.97 69.25 C 110.74 69.51 110.32 69.95 110.05 70.25 C 109.78 70.54 109.35 71 109.1 71.27 C 108.45 71.96 107.8 72.67 107.69 72.84 C 107.63 72.92 107.53 73.05 107.46 73.13 C 107.28 73.31 106.83 73.89 106.68 74.13 C 106.62 74.23 106.51 74.37 106.45 74.44 C 106.39 74.51 106.28 74.73 106.22 74.92 C 106.16 75.11 106.04 75.35 105.95 75.45 C 105.86 75.55 105.77 75.77 105.73 75.98 C 105.69 76.18 105.58 76.58 105.48 76.89 C 105.31 77.39 105.28 77.54 105.24 78.69 C 105.17 80.26 105.25 82.07 105.42 82.7 C 105.69 83.68 105.82 84.06 106.02 84.43 C 106.14 84.64 106.23 84.86 106.23 84.9 C 106.23 84.95 106.32 85.08 106.42 85.2 C 106.61 85.42 106.71 85.55 107.08 86.07 C 107.36 86.46 108.1 87.31 108.89 88.14 C 109.18 88.45 109.46 88.75 110.11 89.48 C 110.38 89.78 110.72 90.15 110.85 90.3 C 110.99 90.45 111.38 90.88 111.71 91.25 C 112.04 91.62 112.38 92 112.46 92.08 C 112.55 92.17 112.83 92.47 113.08 92.75 C 113.33 93.03 113.65 93.37 113.78 93.51 C 113.91 93.65 114.24 94.01 114.51 94.31 C 114.78 94.61 115.1 94.95 115.21 95.07 C 115.33 95.19 115.56 95.46 115.74 95.65 C 116.58 96.6 117.21 97.31 117.35 97.45 C 117.44 97.54 117.73 97.85 118 98.15 C 118.27 98.45 118.59 98.8 118.7 98.91 C 118.82 99.03 119.13 99.37 119.4 99.67 C 119.86 100.18 119.97 100.31 120.54 100.91 C 120.66 101.04 120.95 101.36 121.18 101.63 C 121.63 102.15 121.84 102.39 122.19 102.76 C 122.31 102.88 122.62 103.22 122.89 103.52 C 123.16 103.82 123.49 104.17 123.62 104.32 C 123.75 104.46 124.07 104.8 124.32 105.08 C 124.57 105.37 124.86 105.68 124.97 105.78 C 125.07 105.88 125.42 106.26 125.73 106.61 C 126.04 106.96 126.41 107.38 126.55 107.53 C 126.68 107.68 127.02 108.05 127.29 108.35 C 127.56 108.65 127.88 109 127.99 109.13 C 128.11 109.25 128.42 109.59 128.69 109.89 C 128.96 110.19 129.29 110.54 129.42 110.69 C 129.55 110.83 129.75 111.04 129.85 111.15 C 129.95 111.26 130.65 112.04 131.4 112.88 C 132.15 113.72 132.83 114.48 132.92 114.57 C 133.01 114.66 133.3 114.97 133.57 115.27 C 133.84 115.56 134.14 115.89 134.24 115.99 C 134.34 116.09 135.16 116.99 136.04 117.98 C 136.93 118.97 137.74 119.87 137.84 119.97 C 137.94 120.08 138.23 120.39 138.48 120.67 C 138.73 120.95 139.02 121.26 139.13 121.37 C 139.23 121.47 139.93 122.24 140.68 123.09 C 142.05 124.63 142.22 124.81 142.67 125.29 C 142.8 125.43 143.13 125.79 143.4 126.09 C 143.67 126.38 143.99 126.73 144.1 126.85 C 144.22 126.98 144.47 127.25 144.66 127.46 C 144.89 127.73 145.08 127.87 145.27 127.94 C 145.5 128.02 146.6 128.03 154.11 128.03 L 162.68 128.03 L 162.64 127.75 C 162.6 127.52 162.54 127.41 162.24 127.1 C 161.88 126.72 161.58 126.4 160.17 124.89 C 159.77 124.46 159.23 123.89 158.98 123.64 C 158.73 123.38 158.19 122.81 157.79 122.39 C 157.39 121.96 156.85 121.4 156.6 121.14 C 155.98 120.5 155.32 119.79 154.37 118.78 C 152.02 116.26 151.17 115.35 150.67 114.84 C 150.42 114.58 149.88 114.01 149.48 113.59 C 149.08 113.16 148.54 112.6 148.29 112.34 C 148.04 112.08 147.49 111.5 147.07 111.06 C 146.65 110.61 146.23 110.16 146.12 110.05 C 146.02 109.95 145.45 109.34 144.87 108.7 C 144.28 108.06 143.59 107.33 143.34 107.07 C 143.09 106.81 142.55 106.24 142.15 105.81 C 141.75 105.38 141.21 104.82 140.96 104.56 C 140.71 104.3 140.17 103.74 139.77 103.31 C 139.37 102.88 138.85 102.33 138.61 102.08 C 138.38 101.84 138.06 101.51 137.91 101.34 C 136.6 99.92 135.41 98.65 135.04 98.26 C 134.79 98 134.25 97.43 133.85 97 C 133.45 96.57 132.91 96.01 132.66 95.75 C 132.41 95.49 131.87 94.92 131.47 94.5 C 131.07 94.07 130.53 93.51 130.28 93.25 C 130.03 92.99 129.23 92.14 128.51 91.35 C 127.79 90.57 126.99 89.71 126.74 89.45 C 126.49 89.19 125.95 88.62 125.55 88.2 C 125.15 87.77 124.61 87.21 124.36 86.95 C 124.11 86.69 123.57 86.13 123.17 85.7 C 122.77 85.27 122.25 84.72 122.01 84.48 C 121.78 84.24 121.4 83.85 121.18 83.61 C 120.5 82.87 118.83 81.07 118.37 80.59 C 118.13 80.34 117.94 80.11 117.94 80.07 C 117.96 79.8 118.2 79.49 119.03 78.62 C 119.55 78.08 120.3 77.32 120.68 76.92 C 121.07 76.52 121.82 75.74 122.36 75.18 C 122.9 74.62 123.55 73.95 123.8 73.69 C 124.05 73.43 124.73 72.72 125.3 72.12 C 126.46 70.9 127.42 69.89 127.69 69.61 C 127.79 69.51 128.31 68.96 128.85 68.4 C 129.39 67.83 130.15 67.05 130.53 66.65 C 130.92 66.25 131.67 65.47 132.21 64.91 C 132.75 64.35 133.51 63.56 133.89 63.17 C 134.28 62.77 135.03 61.98 135.57 61.41 C 136.11 60.85 136.6 60.33 136.68 60.26 C 136.75 60.19 137.35 59.55 138.03 58.85 C 138.7 58.14 139.32 57.49 139.4 57.41 C 139.49 57.32 139.99 56.79 140.53 56.23 C 141.07 55.66 141.83 54.87 142.21 54.47 C 142.6 54.07 143.37 53.28 143.92 52.7 C 144.48 52.13 145.25 51.33 145.63 50.93 C 146.02 50.53 146.77 49.74 147.31 49.17 C 147.85 48.61 148.36 48.08 148.44 47.99 C 148.57 47.86 149.87 46.49 151.44 44.84 C 151.66 44.61 152.05 44.21 152.3 43.95 C 152.55 43.69 153.2 43.01 153.74 42.46 C 154.28 41.9 155.04 41.11 155.42 40.71 C 155.81 40.31 156.58 39.52 157.13 38.94 C 157.69 38.37 158.44 37.58 158.81 37.2 C 160.49 35.48 161.26 34.64 161.3 34.51 C 161.32 34.44 161.34 34.31 161.34 34.21 L 161.35 34.04 L 152.74 34.05 C 145.33 34.05 144.09 34.07 143.88 34.14 L 143.87 34.12 Z"/>
  </g>
</svg>`
    const FAVICON_DATA_URI = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(SITE_ICON_SVG$1)}`
    const SITE_ICON_DATA_URI$1 = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(SITE_ICON_SVG$1)}`

    // src/shared/badges.js
    const USERPATCH_BADGE_DATA = Object.freeze({
      "4k": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNiIgaGVpZ2h0PSIxNSIgdmlld0JveD0iMCAwIDI2IDE1Ij48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTIuNzM3IDBoMjAuNTI4QTIuNzMgMi43MyAwIDAgMSAyNiAyLjcyN3Y5LjU0NUEyLjczIDIuNzMgMCAwIDEgMjMuMjY1IDE1SDIuNzM3QTIuNzMgMi43MyAwIDAgMSAwIDEyLjI3MlYyLjcyN0EyLjczIDIuNzMgMCAwIDEgMi43MzcgMG03LjA3OCAxMS42SDExLjV2LTEuNWgxLjFWOC42ODFoLTEuMXYtNS41M0g5YTU2IDU2IDAgMCAwLTMuMzkgNS40NDJWMTAuMWg0LjIwNXpNNy4xNjIgOC42ODZBNDAgNDAgMCAwIDEgOS44MTUgNC40aC4wMzV2NC4zMzNINy4xNjJ6bTguMjczIDIuOTE0VjkuMDJsLjc5MS0uOTQ5IDIuNTA3IDMuNTI5aDIuMTE0TDE3LjUgNi45bDMuMTMtMy43NDloLTEuOTY4bC0zLjE3NCAzLjg1NGgtLjA1M1YzLjE1MWgtMS43NjlWMTEuNnoiLz48L3N2Zz4=",
      hd: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNiIgaGVpZ2h0PSIxNSIgdmlld0JveD0iMCAwIDI2IDE1Ij48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTIuNzM3IDBoMjAuNTI4QTIuNzMgMi43MyAwIDAgMSAyNiAyLjcyN3Y5LjU0NUEyLjczIDIuNzMgMCAwIDEgMjMuMjY1IDE1SDIuNzM3QTIuNzMgMi43MyAwIDAgMSAwIDEyLjI3MlYyLjcyN0EyLjczIDIuNzMgMCAwIDEgMi43MzcgME0xMi41IDExLjc3OFYzLjMyNmgtMS43NzJ2My40MzNINi45MjFWMy4zMjZINS4xNTJ2OC40NTJoMS43NjlWOC4yMTdoMy44MDd2My41NjF6bTEuNDA5LTguNDUydjguNDUyaDMuMjU3YzIuNTM2IDAgNC4wMy0xLjU3NiA0LjAzLTQuMjU4UzE5LjcgMy4zMjYgMTcuMTYzIDMuMzI2aC0zLjI1N3ptMS43NjkgMS40NThoMS4yNzdjMS41NTggMCAyLjQzNy45NzIgMi40MzcgMi43NDEgMCAxLjgyNy0uODU1IDIuNzg4LTIuNDM3IDIuNzg4aC0xLjI4VjQuNzg1eiIvPjwvc3ZnPg==",
      sd: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNiIgaGVpZ2h0PSIxNSIgdmlld0JveD0iMCAwIDI2IDE1Ij48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTIuNzM3IDBoMjAuNTI4QTIuNzMgMi43MyAwIDAgMSAyNiAyLjcyN3Y5LjU0NUEyLjczIDIuNzMgMCAwIDEgMjMuMjY1IDE1SDIuNzM3QTIuNzMgMi43MyAwIDAgMSAwIDEyLjI3MlYyLjcyN0EyLjczIDIuNzMgMCAwIDEgMi43MzcgME01LjMgOS4zNzNDNS4zNTQgMTEuMDA1IDYuNjY2IDEyIDguNzI4IDEyYzIuMTMgMCAzLjQ3NS0xLjA2NyAzLjQ3NS0yLjc1NCAwLTEuMzI2LS43NDktMi4wNzMtMi40NjYtMi40NDZsLTEuMDQtLjIyN2MtLjk4NS0uMjI5LTEuNDAxLS41My0xLjQwMS0xLjA2Ni4wNDYtLjM0Ni4yMy0uNjU4LjUxLS44Ni4yOC0uMjA0LjYzMS0uMjguOTY5LS4yMTJhMS40IDEuNCAwIDAgMSAxLjU5MiAxLjE4MWgxLjY4MUMxMi4wMTggNC4wNDIgMTAuNzY1IDMgOC43NjggMyA2Ljg1NyAzIDUuNDkyIDQuMDYgNS40OTIgNS42NjNjMCAxLjI3Mi43NzggMi4wODUgMi4zNTggMi40MjhsMS4xMTUuMjQ3YzEuMDM0LjIzNCAxLjQ0NC41NDggMS40NDQgMS4xMTUgMCAuNjM5LS42NTQgMS4xMDMtMS42MSAxLjEwMy0uOC4xMi0xLjU2Mi0uMzktMS43Ny0xLjE4M0g1LjMwNHptOC02LjIyM3Y4LjY5MmgzLjMwM2MyLjU3MiAwIDQuMDg3LTEuNjIyIDQuMDg3LTQuMzggMC0yLjc2LTEuNTA4LTQuMzEyLTQuMDgzLTQuMzEyem0xLjc5OCAxLjUwMWgxLjI5NWMxLjU4IDAgMi40NzIgMSAyLjQ3MiAyLjgyIDAgMS44OC0uODY3IDIuODY4LTIuNDcyIDIuODY4aC0xLjI5NXoiLz48L3N2Zz4=",
      imax: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0ODkuMjIiIGhlaWdodD0iOTQuNzI3Ij48dGl0bGU+SU1BWCBsb2dvIChibGFjayk8L3RpdGxlPjxnIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3R5bGU9ImZpbGw6IzAwMCIgdHJhbnNmb3JtPSJzY2FsZSguNSkiPjxwYXRoIGQ9Im0yNzcuMDEgMTg5LjI5IDY2LjgzLTEzNi40NTRoMTAuODdsLS4wMSAxMzYuNjE0aDUzLjM2Vi41NzNoLTk2LjEyTDI1NC45OCAxMTMuNTEgMTk3LjQ4LjcyM2wtOTUuNjkuMjk4LS4xNCAxODguNDI5aDUzLjI1bC4wNy0xMzYuNjE0aDEwLjY4bDY2LjggMTM2LjQ1NHpNMCAxODkuNDRoNTkuNzU5Vi41NzNIMHpNNTE0LjU2LjU3M2wtOTUuOTk0IDE4OC44OGg2My44NDRsMTYuNzAzLTMyLjEyM2gxMTkuMjlsMTYuMjczIDMyLjEyM2g2My45OThMNjAyLjYyOC41NzN6bTQ3LjA4OSA0Mi45MzVoLTUuODc2bC0zNi4zMzkgNzEuNTMzaDc4LjE0OXpNNzc5Ljk5IDE4OS40NWw2MC4xNS02OC4yNSA1OS40OCA2OC4yNWg3OC44MUw4ODkuNTUgODkuMTMzIDk2My45OC41NzNoLTcyLjg1bC01MS40OSA2MS4zNjVMNzg5LjYzLjU3M2gtNzQuMTdsNzQuODYgODguNjQ1LTg5LjM5IDEwMC4yMzJ6Ii8+PC9nPjwvc3ZnPg==",
      "hdr10-plus":
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1NCIgaGVpZ2h0PSIxNSIgdmlld0JveD0iMCAwIDU0IDE1Ij48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Ik01MS4yNzMgMEEyLjcyNyAyLjcyNyAwIDAgMSA1NCAyLjcyN3Y5LjU0NkEyLjcyNyAyLjcyNyAwIDAgMSA1MS4yNzMgMTVIMi43MjdBMi43MjcgMi43MjcgMCAwIDEgMCAxMi4yNzNWMi43MjdBMi43MjcgMi43MjcgMCAwIDEgMi43MjcgMHptLTEyLjU0IDMuMThjLTIuMTEzIDAtMy4zOTYgMS42NzQtMy4zOTYgNC4zNjF2LjAxMmwuMDA0LjI0OWMuMDc3IDIuNTQxIDEuMzQ1IDQuMTE4IDMuMzkzIDQuMTE4IDIuMTE0IDAgMy4zOTctMS42OCAzLjM5Ny00LjM2N1Y3LjU0bC0uMDA0LS4yNDljLS4wNzctMi41NC0xLjM0NS00LjExMi0zLjM5My00LjExMlptLTMxLjgzOC4xNDZINS4xNXY4LjQ0OGgxLjc0NXYtMy41NmgzLjc1NXYzLjU2aDEuNzQ0VjMuMzI2SDEwLjY1djMuNDNINi44OTV6bTEwLjAzNCAwaC0zLjE4M3Y4LjQ0OGgzLjE4M2MyLjUwMSAwIDMuOTc0LTEuNTc1IDMuOTc0LTQuMjU2di0uMDEyYzAtMi42NzUtMS40NzgtNC4xOC0zLjk3NC00LjE4bTguNTEgMGgtMy40NDR2OC40NDhoMS43NDVWOC43MTJoMS4zOThsMS41NTQgMy4wNjJoMS45NzZMMjYuOTEgOC40NDljLjkyNS0uMzcgMS41MDgtMS4yOTQgMS41MDgtMi40MDZWNi4wM2MwLTEuNjk4LTEuMTA5LTIuNzA1LTIuOTgtMi43MDVabTcuODA0IDBIMzEuNTFsLTIuMTU1IDEuNTE3VjYuNDFsMi4xMjYtMS40NjNoLjAzNXY2LjgyNmgxLjcyN3ptMTMuNTMgMS4zMWgtMS40NzR2Mi4yNTNoLTIuMzk3djEuNDkzaDIuMzk3djIuMjQ4aDEuNDczVjguMzgyaDIuNDAzVjYuODg5aC0yLjQwM1Y0LjYzNVptLTguMDQtLjA0YzEuMDQgMCAxLjYzNiAxLjA5IDEuNjM2IDIuOTQ1di4wMTJsLS4wMDMuMjI4Yy0uMDQ4IDEuNzE3LS42MzYgMi43MjItMS42MzIgMi43MjItMS4wNCAwLTEuNjM1LTEuMDk0LTEuNjM1LTIuOTVWNy41NGwuMDAzLS4yMjhjLjA0Ny0xLjcxNi42MzUtMi43MTYgMS42MzItMi43MTZabS0yMi4wMTIuMTg4YzEuNTMgMCAyLjQwMy45NjYgMi40MDMgMi43Mjh2LjAxMmMwIDEuODI2LS44NDMgMi43ODYtMi40MDMgMi43ODZoLTEuMjNWNC43ODR6bTguNTA0LS4wNzZjLjg2IDAgMS40MS41MTUgMS40MSAxLjMyM3YuMDEyYzAgLjgzLS41MiAxLjMyOC0xLjM4NyAxLjMyOEgyMy43NFY0LjcwOHoiLz48L3N2Zz4=",
      hdr: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNCIgaGVpZ2h0PSIxNSIgdmlld0JveD0iMCAwIDM0IDE1Ij48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTIuNzIgMGgyOC41NTdBMi43MjQgMi43MjQgMCAwIDEgMzQgMi43Mjd2OS41NDVBMi43MjQgMi43MjQgMCAwIDEgMzEuMjc3IDE1SDIuNzJBMi43MjMgMi43MjMgMCAwIDEgMCAxMi4yNzJWMi43MjdBMi43MjMgMi43MjMgMCAwIDEgMi43MiAwbTkuNjcyIDExLjZWMy4xNTFoLTEuNzY5djMuNDMzSDYuODE2VjMuMTUxSDUuMDQ3VjExLjZoMS43NjlWOC4wNDJoMy44MDdWMTEuNnpNMTMuOCAzLjE1MVYxMS42aDMuMjU3YzIuNTM2IDAgNC4wMy0xLjU3NiA0LjAzLTQuMjU4cy0xLjQ5NC00LjE5NC00LjAzLTQuMTk0SDEzLjh6bTEuNzcgMS40NTloMS4yNzdjMS41NTggMCAyLjQzNy45NzIgMi40MzcgMi43NDEgMCAxLjgyNy0uODU1IDIuNzg4LTIuNDM3IDIuNzg4SDE1LjU3ek0yNCA0LjUzNGgxLjUzYTEuMyAxLjMgMCAwIDEgMS40MjkgMS4zNDcgMS4yNjggMS4yNjggMCAwIDEtMS40MTIgMS4zNDdIMjR6bTAgMy45NzdoMS40NDdsMS41NzEgMy4wODloMkwyNy4yNCA4LjI0N2EyLjQ4IDIuNDggMCAwIDAgMS41MzUtMi40YzAtMS42NjktMS4xMTMtMi42OTQtMy4wNTctMi42OTRoLTMuNDkxVjExLjZIMjR6Ii8+PC9zdmc+",
      "dolby-vision":
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MiIgaGVpZ2h0PSIyMiIgdmlld0JveD0iMCAwIDUyIDIyIj48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Im05LjcyIDE0Ljg3IDEuOTI3IDUuNDU0aC4wNGwxLjk0Ni01LjQ1M2gxLjM0NGwtMi44MDYgNy4wODRoLTEuMDc3bC0yLjc2Ny03LjA4NHptNy44MzkgMHY3LjA4NWgtMS4yNDV2LTcuMDg0em05LjM2OSAwdjcuMDg1aC0xLjI0NXYtNy4wODR6bTUuMjI3IDBxLjc4IDAgMS40MzguMjQ4LjY1OC4yNDcgMS4xMzguNzA1dC43NDggMS4xMS4yNjggMS40NnEwIC43OTItLjI2OCAxLjQ0NGEzLjMgMy4zIDAgMCAxLS43NDggMS4xMjNxLS40OC40NzEtMS4xMzguNzMzYTMuOSAzLjkgMCAwIDEtMS40MzguMjYycS0uNzczIDAtMS40MjUtLjI2MmEzLjM1IDMuMzUgMCAwIDEtMS4xMjgtLjczMyAzLjQgMy40IDAgMCAxLS43NDMtMS4xMjMgMy44IDMuOCAwIDAgMS0uMjY4LTEuNDQzcTAtLjgxLjI2OC0xLjQ2Mi4yNjctLjY1MS43NDMtMS4xMDkuNDc0LS40NTggMS4xMjgtLjcwNS42NTItLjI0NyAxLjQyNS0uMjQ3em02Ljk4NSAwIDMuMjUgNS4zMDRoLjAydi01LjMwM2gxLjI0NXY3LjA4NGgtMS41OGwtMy4zMi01LjQ3M2gtLjAydjUuNDczaC0xLjI0NnYtNy4wODR6bS0xNy4yOC4wMDJxLjUwNiAwIDEuMDI2LjE4LjQxNi4xNDUuNzQ2LjQwNWwuMTU5LjEzNy0uNzY5Ljg1NGExLjQ0IDEuNDQgMCAwIDAtLjUzLS40MTMgMS41NyAxLjU3IDAgMCAwLTEuMS0uMTE0IDEuMyAxLjMgMCAwIDAtLjM3Ni4xNjIuOS45IDAgMCAwLS4yNzYuMjg0LjguOCAwIDAgMC0uMTA4LjQyMy43Ni43NiAwIDAgMCAuMzUxLjY2NHEuMTY0LjExNC4zOTkuMi4yMzQuMDg1LjUxNS4xNy4zMi4xMDUuNjYxLjIzOC4zNDMuMTMzLjYyOC4zNTFjLjI4NS4yMTguMzQ3LjMzLjQ2OS41NXEuMTgzLjMzMy4xODMuODI2IDAgLjU0MS0uMTk3Ljk0NWExLjk0IDEuOTQgMCAwIDEtLjUyNS42NyAyLjIgMi4yIDAgMCAxLS43NjkuMzk4IDMuMiAzLjIgMCAwIDEtLjkyOC4xMzMgMy40IDMuNCAwIDAgMS0xLjI2NS0uMjQyIDIuNSAyLjUgMCAwIDEtLjg3NS0uNTY1bC0uMTM4LS4xNTIuODQ0LS43OTdxLjI0My4zNDIuNjUyLjU0LjQwNy4yLjgwMS4yLjIwNiAwIC40MjItLjA1MmExLjEgMS4xIDAgMCAwIC4zODktLjE3NiAxIDEgMCAwIDAgLjI4MS0uMzA4LjkuOSAwIDAgMCAuMTA4LS40Ni43Ni43NiAwIDAgMC0uMTIyLS40NDIgMS4xIDEuMSAwIDAgMC0uMzI4LS4zMDRxLS4yMDctLjEyOC0uNDg4LS4yMjNsLS41OS0uMnEtLjMtLjA5My0uNi0uMjI3LS4zLS4xMzMtLjU0LS4zNTFhMS43IDEuNyAwIDAgMS0uMzg4LS41MzdxLS4xNS0uMzE4LS4xNS0uNzkyIDAtLjUxMy4yMS0uODgzLjIxMi0uMzcuNTU0LS42MTIuMzQyLS4yNDMuNzc4LS4zNjEuNDM1LS4xMi44ODYtLjExOW0xMC4zMDQgMS4xNXEtLjQ5OCAwLS45LjE4My0uNDAyLjE4NC0uNjkyLjUwNGEyLjMgMi4zIDAgMCAwLS40NDcuNzUxIDIuNyAyLjcgMCAwIDAtLjE1OS45MzRxMCAuNTIzLjE1OS45NTcuMTU4LjQzNS40NTIuNzU2LjI5NC4zMi42OTYuNWMuNDAyLjE4LjU2Ni4xNzguODkxLjE3OHEuNDg5IDAgLjg5NS0uMTc5Yy40MDYtLjE3OS41MDUtLjI4NS43MDEtLjQ5OXEuMjk0LS4zMjEuNDUzLS43NTYuMTU4LS40MzUuMTU4LS45NTdhMi43IDIuNyAwIDAgMC0uMTU4LS45MzQgMi4zIDIuMyAwIDAgMC0uNDQ4LS43NSAyLjEgMi4xIDAgMCAwLS42OTctLjUwNSAyLjIgMi4yIDAgMCAwLS45MDQtLjE4M000Ni4zMjUgMy4xNWwxLjk5MyA0LjUzNiAxLjk5My00LjUzNmgxLjY3MWwtMy45NjIgOC45NjZhMS45NzUgMS45NzUgMCAwIDEtMi40NyAxLjA3NWwtLjE0Mi0uMDU4LS41My0uMjRoLS4wMDNsLjE5LS40MzEuNDI4LS45NzMuMjE5LjFhLjgxLjgxIDAgMCAwIDEuMDI1LS4zMmwuMDUyLS4xLjAwNC0uMDEuNjEzLTEuNDAyLjAyLS4wNDQuMDU3LS4xMjUtMi44MjktNi40Mzh6TTM5LjIxLjAwMnYzLjc4NGEzLjQ1IDMuNDUgMCAwIDEgMi0uNjM4YzEuOTI4IDAgMy40OTYgMS41ODggMy40OTYgMy41NDFzLTEuNTY4IDMuNTQtMy40OTYgMy41NGEzLjQ1IDMuNDUgMCAwIDEtMi0uNjM4di42NGgtMS41MzJWLjAwMnptLTIuODE4IDB2MTAuMjNoLTEuNTNWLjAwMnptLTYuMDE2IDMuMTQ2YzEuOTI4IDAgMy40OTYgMS41ODggMy40OTYgMy41NCAwIDEuOTUzLTEuNTY4IDMuNTQxLTMuNDk2IDMuNTQxLTEuOTI5IDAtMy40OTctMS41ODgtMy40OTctMy41NCAwLTEuOTUzIDEuNTY4LTMuNTQxIDMuNDk3LTMuNTQxTTIxLjA1NyAwYzIuNzgyIDAgNS4wNDYgMi4yOTIgNS4wNDYgNS4xMXMtMi4yNjQgNS4xMS01LjA0NiA1LjExaC0zLjY0NVYwem0tNi43IDB2MTAuMjJoLTEuNDljLTIuNzggMC01LjA0NS0yLjI5NS01LjA0NS01LjExIDAtMi43NDMgMi4xNTEtNC45OTIgNC44MzMtNS4xMDVMMTIuODY4IDB6TTEuNDg4IDBjMi43OCAwIDUuMDQ2IDIuMjk1IDUuMDQ2IDUuMTEgMCAyLjc0My0yLjE1MiA0Ljk5MS00LjgzMyA1LjEwNWwtLjIxMy4wMDRoLTEuNDlWMHptMzkuNzIgNC41NDFjLS45MjYgMC0xLjcxOS42MS0xLjk5OSAxLjQ2MWEyLjE1IDIuMTUgMCAwIDAgMCAxLjM0NiAyLjExIDIuMTEgMCAwIDAgMiAxLjQ2M2MxLjE1NyAwIDIuMTA4LS45NSAyLjEwOC0yLjEzNSAwLTEuMTcyLS45NTEtMi4xMzUtMi4xMDgtMi4xMzV6bS0xMC44MzMgMGMtMS4xNTcgMC0yLjEwOS45NS0yLjEwOSAyLjEzNCAwIDEuMTcyLjkzOSAyLjEzNSAyLjEwOSAyLjEzNSAxLjE1NyAwIDIuMTA4LS45NSAyLjEwOC0yLjEzNSAwLTEuMTcxLS45NTEtMi4xMzUtMi4xMDgtMi4xMzV6bS05LjMyLTIuOTkyaC0yLjExNFY4LjY3aDIuMTE1YzEuOTM3IDAgMy41MTYtMS41OTkgMy41MTYtMy41NnMtMS41OC0zLjU2LTMuNTE2LTMuNTZ6Ii8+PC9zdmc+",
      av1: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNzggMTU1Ij48ZGVmcz48bWFzayBpZD0ibSI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0id2hpdGUiLz48cGF0aCBmaWxsPSJibGFjayIgZD0ibTIwOC42IDUyLjUtOC40IDguMy04LjktOS40IDE5LjUtMTloMTMuNnY0OC4yaC0xNS44eiIvPjwvbWFzaz48L2RlZnM+PGcgbWFzaz0idXJsKCNtKSI+PHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBkPSJNMjc4IDExMi43IDIxMy4yIDBsLTY0LjcgMTEyLjd6IiBvcGFjaXR5PSIuNiIvPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0ibTI3OCAxMTIuNy0yNC4zLTI4LjItMTYuMiAyOC4yek0xNzIuOCA4NC41bC0yNC4zIDI4LjJIMTg5eiIgb3BhY2l0eT0iLjMiLz48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Im0yMTMuMiAxNTUgNDAuNS03MC41aC04MC45ek0zNS42IDgyLjJoMTguMmwtOS4xLTI4LjN6bTI0LjUgMjAuMkgyOS40bC0zLjEgMTAuNEgwbDI5LjUtODAuNEg2MGwyOS41IDgwLjRINjMuMnpNNzMuNiAzMi40aDI3LjVsMTcuMiA1NC4xIDE3LjMtNTQuMWgyNy41bC0yOS41IDgwLjRoLTMwLjV6Ii8+PC9nPjwvc3ZnPg==",
      "dolby-atmos":
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MiIgaGVpZ2h0PSIyMiIgdmlld0JveD0iMCAwIDUyIDIyIj48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Im0xMi4xMTQgMTQuODcgMy4wMTQgNy4wODVoLTEuNDIzbC0uNjUzLTEuNjJIMTAuMDJsLS42MzIgMS42Mkg3Ljk5M2wzLjA0NC03LjA4NHptOC4zODYgMHYxLjEwMWgtMi4xNDR2NS45ODRIMTcuMTF2LTUuOTg0aC0yLjE0NHYtMS4xem0zLjUgMCAxLjgxOCA1LjAzNGguMDNsMS43OTgtNS4wMzNoMS45NTZ2Ny4wODRoLTEuMjM1di01LjY5M2gtLjAybC0yLjEyNCA1LjY5M2gtLjg3bC0yLjA5NC01LjY5M2gtLjAydjUuNjkzaC0xLjE4NnYtNy4wODR6bTEwLjY1MiAwcS43OCAwIDEuNDM4LjI0OC42NTguMjQ3IDEuMTM4LjcwNXQuNzQ4IDEuMTFxLjI2Ny42NTEuMjY4IDEuNDYgMCAuNzkyLS4yNjggMS40NDRhMy4zIDMuMyAwIDAgMS0uNzQ4IDEuMTIzcS0uNDguNDcxLTEuMTM4LjczM2EzLjkgMy45IDAgMCAxLTEuNDM4LjI2MnEtLjc3MiAwLTEuNDI1LS4yNjJhMy4zNSAzLjM1IDAgMCAxLTEuMTI4LS43MzMgMy40IDMuNCAwIDAgMS0uNzQzLTEuMTIzIDMuOCAzLjggMCAwIDEtLjI2OC0xLjQ0M3EwLS44MS4yNjgtMS40NjJhMy4yIDMuMiAwIDAgMSAuNzQzLTEuMTEgMy4zIDMuMyAwIDAgMSAxLjEyOC0uNzA0IDQgNCAwIDAgMSAxLjQyNS0uMjQ3em03LjM1OS4wMTJxLjUwNiAwIDEuMDI2LjE4dC45MDUuNTQxbC0uNzY5Ljg1NGExLjQ0IDEuNDQgMCAwIDAtLjUzLS40MTIgMS41NyAxLjU3IDAgMCAwLTEuMTAxLS4xMTQgMS4zIDEuMyAwIDAgMC0uMzc1LjE2MS45LjkgMCAwIDAtLjI3Ny4yODUuOC44IDAgMCAwLS4xMDcuNDIyLjc2Ljc2IDAgMCAwIC4wOTMuMzkuOS45IDAgMCAwIC4yNTguMjc1cS4xNjUuMTEzLjM5OC4yLjIzNS4wODQuNTE2LjE3LjMxOS4xMDUuNjYuMjM3LjM0My4xMzMuNjMuMzUyLjI4NS4yMTguNDY4LjU1dC4xODMuODI2cTAgLjU0MS0uMTk3Ljk0NGExLjk0IDEuOTQgMCAwIDEtLjUyNS42NyAyLjMgMi4zIDAgMCAxLS43NjkuMzk5IDMuMiAzLjIgMCAwIDEtLjkyOC4xMzIgMy40IDMuNCAwIDAgMS0xLjI2NS0uMjQycS0uNjE5LS4yNDEtMS4wMTMtLjcxN2wuODQ0LS43OTdhMS43IDEuNyAwIDAgMCAuNjUxLjU0MXEuNDA4LjIuODAyLjIuMjA2IDAgLjQyMi0uMDUzLjIxNS0uMDUxLjM4OS0uMTc1YTEgMSAwIDAgMCAuMjgtLjMwOS45LjkgMCAwIDAgLjEwOS0uNDYuNzYuNzYgMCAwIDAtLjEyMi0uNDQyIDEuMSAxLjEgMCAwIDAtLjMyOC0uMzAzcS0uMjA2LS4xMjktLjQ4OC0uMjIzbC0uNTktLjJxLS4zLS4wOTQtLjYtLjIyOC0uMy0uMTMyLS41NC0uMzVhMS43IDEuNyAwIDAgMS0uMzg4LS41MzdxLS4xNS0uMzE4LS4xNS0uNzkzIDAtLjUxMy4yMS0uODgzLjIxMi0uMzY5LjU1NC0uNjEyLjM0Mi0uMjQyLjc3OC0uMzYuNDM1LS4xMi44ODYtLjEyem0tNy4zNSAxLjE0YTIuMDggMi4wOCAwIDAgMC0xLjU5Mi42ODcgMi4zIDIuMyAwIDAgMC0uNDQ3Ljc1MSAyLjcgMi43IDAgMCAwLS4xNTkuOTM0cTAgLjUyMi4xNTkuOTU3LjE1OC40MzUuNDUyLjc1Ni4yOTQuMzIuNjk2LjVjLjQwMi4xOC41NjYuMTc4Ljg5MS4xNzhxLjQ4OSAwIC44OTYtLjE3OWEyLjEgMi4xIDAgMCAwIC43LS40OTlxLjI5NC0uMzIxLjQ1My0uNzU2LjE1OC0uNDM1LjE1OC0uOTU3YTIuNyAyLjcgMCAwIDAtLjE1OC0uOTM0IDIuMyAyLjMgMCAwIDAtLjQ0OC0uNzUgMi4xIDIuMSAwIDAgMC0uNjk2LS41MDUgMi4yIDIuMiAwIDAgMC0uOTA1LS4xODNtLTIzLjEyLjM1LTEuMDk3IDIuODgyaDIuMTc0ek00Ni4zMjUgMy4xNWwxLjk5MyA0LjUzNyAxLjk5My00LjUzN2gxLjY3MWwtMy45NjIgOC45NjZhMS45NzMgMS45NzMgMCAwIDEtMi42MTIgMS4wMTdsLS41My0uMjRoLS4wMDNsLjE5LS40MzIuNDI3LS45NzIuMjIuMWEuODEzLjgxMyAwIDAgMCAxLjA3Ny0uNDJsLjAwNC0uMDEuNjEzLTEuNDAyLjAyLS4wNDQuMDU2LS4xMjUtMi44MjgtNi40Mzh6TTM2LjM5Mi4wMDJ2MTAuMjNoLTEuNTNWLjAwMnptMi44MTggMHYzLjc4NGEzLjQ1IDMuNDUgMCAwIDEgMi0uNjM4YzEuOTI4IDAgMy40OTYgMS41ODggMy40OTYgMy41NHMtMS41NjggMy41NDItMy40OTYgMy41NDJhMy40NSAzLjQ1IDAgMCAxLTItLjYzOXYuNjRoLTEuNTMyVi4wMDJ6bS04LjgzNCAzLjE0NmMxLjkyOCAwIDMuNDk2IDEuNTg4IDMuNDk2IDMuNTRzLTEuNTY4IDMuNTQxLTMuNDk2IDMuNTQxYy0xLjkyOSAwLTMuNDk3LTEuNTg4LTMuNDk3LTMuNTRzMS41NjgtMy41NDEgMy40OTctMy41NDFNMS40ODkgMGMyLjc4IDAgNS4wNDUgMi4yOTUgNS4wNDUgNS4xMXMtMi4yNjYgNS4xMS01LjA0NSA1LjExSDBWMHptMTIuODY3IDB2MTAuMjJoLTEuNDg4Yy0yLjc4IDAtNS4wNDYtMi4yOTUtNS4wNDYtNS4xMVMxMC4wODggMCAxMi44NjggMHptNi43IDBjMi43ODMgMCA1LjA0NyAyLjI5MiA1LjA0NyA1LjExcy0yLjI2NCA1LjExLTUuMDQ2IDUuMTFoLTMuNjQ1VjB6bTkuMzIgNC41NGMtMS4xNTcgMC0yLjEwOS45NS0yLjEwOSAyLjEzNSAwIDEuMTcyLjkzOSAyLjEzNSAyLjEwOSAyLjEzNSAxLjE1NyAwIDIuMTA4LS45NSAyLjEwOC0yLjEzNSAwLTEuMTcxLS45NTEtMi4xMzUtMi4xMDgtMi4xMzVtMTAuODM0IDBjLS45MjcgMC0xLjcyLjYxLTIgMS40NjJhMi4xNSAyLjE1IDAgMCAwIDAgMS4zNDYgMi4xMSAyLjExIDAgMCAwIDIgMS40NjNjMS4xNTcgMCAyLjEwOC0uOTUgMi4xMDgtMi4xMzUgMC0xLjE3Mi0uOTUxLTIuMTM1LTIuMTA4LTIuMTM1ek0yMS4wNTcgMS41NWgtMi4xMTV2Ny4xMmgyLjExNWMxLjkzNyAwIDMuNTE2LTEuNTk5IDMuNTE2LTMuNTZzLTEuNTgtMy41Ni0zLjUxNi0zLjU2Ii8+PC9zdmc+",
      "dolby-audio":
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MiIgaGVpZ2h0PSIyMiIgdmlld0JveD0iMCAwIDUyIDIyIj48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Im00Ni4zMjUgMy4xNSAxLjk5MyA0LjUzNiAxLjk5My00LjUzNmgxLjY3MWwtMy45NjIgOC45NjZhMS45NzUgMS45NzUgMCAwIDEtMi40NyAxLjA3NWwtLjE0Mi0uMDU4LS41My0uMjRoLS4wMDNsLjE5LS40MzEuNDI4LS45NzMuMjE5LjFhLjgxLjgxIDAgMCAwIDEuMDI1LS4zMmwuMDUyLS4xLjAwNC0uMDEuNjEzLTEuNDAyLjAyLS4wNDQuMDU3LS4xMjUtMi44MjktNi40Mzh6TTM5LjIxLjAwMnYzLjc4NGEzLjQ1IDMuNDUgMCAwIDEgMi0uNjM4YzEuOTI4IDAgMy40OTYgMS41ODggMy40OTYgMy41NDFzLTEuNTY4IDMuNTQtMy40OTYgMy41NGEzLjQ1IDMuNDUgMCAwIDEtMi0uNjM4di42NGgtMS41MzJWLjAwMnptLTIuODE4IDB2MTAuMjNoLTEuNTNWLjAwMnptLTYuMDE2IDMuMTQ2YzEuOTI4IDAgMy40OTYgMS41ODggMy40OTYgMy41NCAwIDEuOTUzLTEuNTY4IDMuNTQxLTMuNDk2IDMuNTQxLTEuOTI5IDAtMy40OTctMS41ODgtMy40OTctMy41NCAwLTEuOTUzIDEuNTY4LTMuNTQxIDMuNDk3LTMuNTQxTTIxLjA1NyAwYzIuNzgyIDAgNS4wNDYgMi4yOTIgNS4wNDYgNS4xMXMtMi4yNjQgNS4xMS01LjA0NiA1LjExaC0zLjY0NVYwem0tNi43IDB2MTAuMjJoLTEuNDljLTIuNzggMC01LjA0NS0yLjI5NS01LjA0NS01LjExIDAtMi43NDMgMi4xNTEtNC45OTIgNC44MzMtNS4xMDVMMTIuODY4IDB6TTEuNDg4IDBjMi43OCAwIDUuMDQ2IDIuMjk1IDUuMDQ2IDUuMTEgMCAyLjc0My0yLjE1MiA0Ljk5MS00LjgzMyA1LjEwNWwtLjIxMy4wMDRoLTEuNDlWMHptMzkuNzIgNC41NDFjLS45MjYgMC0xLjcxOS42MS0xLjk5OSAxLjQ2MWEyLjE1IDIuMTUgMCAwIDAgMCAxLjM0NiAyLjExIDIuMTEgMCAwIDAgMiAxLjQ2M2MxLjE1NyAwIDIuMTA4LS45NSAyLjEwOC0yLjEzNSAwLTEuMTcyLS45NTEtMi4xMzUtMi4xMDgtMi4xMzV6bS0xMC44MzMgMGMtMS4xNTcgMC0yLjEwOS45NS0yLjEwOSAyLjEzNCAwIDEuMTcyLjkzOSAyLjEzNSAyLjEwOSAyLjEzNSAxLjE1NyAwIDIuMTA4LS45NSAyLjEwOC0yLjEzNSAwLTEuMTcxLS45NTEtMi4xMzUtMi4xMDgtMi4xMzV6bS05LjMyLTIuOTkyaC0yLjExNFY4LjY3aDIuMTE1YzEuOTM3IDAgMy41MTYtMS41OTkgMy41MTYtMy41NnMtMS41OC0zLjU2LTMuNTE2LTMuNTZ6Ii8+PHRleHQgeD0iOS43MiIgeT0iMjAuNDgiIGZpbGw9ImN1cnJlbnRDb2xvciIgZm9udC1mYW1pbHk9IidBdmVuaXJOZXh0LURlbWlCb2xkJywgJ0F2ZW5pck5leHRMVFByby1NZWRpdW0nLCAnQXZlbmlyIE5leHQnLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjkuNSIgZm9udC13ZWlnaHQ9IjYwMCIgbGV0dGVyLXNwYWNpbmc9Ii43IiB0cmFuc2Zvcm09InNjYWxlKDEgMS4wNSkiPkFVRElPPC90ZXh0Pjwvc3ZnPg==",
      "dts-x":
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjQwLjkgMzcgMTM5IDQwLjgiPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+LnN0MHtmaWxsOm5vbmU7fQoJLnN0MXtmaWxsOmN1cnJlbnRDb2xvcjt9PC9zdHlsZT48cGF0aCBkPSJtMTI4LjkgNjQuNS00LjUtNC41Yy0uNi0uNi0uOS0xLjQtLjktMi4zIDAtMS44IDEuNC0zLjIgMy4yLTMuMmgyLjJjLjcgMCAxLjMtLjYgMS4zLTEuM3YtMi40aC0xOC40Yy0zLjEgMC01LjYgMi41LTUuNiA1LjYgMCAxLjYuNiAzIDEuNiA0bDQuNSA0LjVjLjYuNi45IDEuNC45IDIuMyAwIDEuOC0xLjQgMy4yLTMuMiAzLjJoLTYuOWMtMi43IDAtNC45LTIuMi00LjktNC45VjU0LjZoNC4yYy43IDAgMS4zLS42IDEuMy0xLjN2LTIuNGgtNS41di0xMmwtMTQuNCA2LjN2NS43aC03VjM3SDY2Yy0yLjEgMC0zLjcgMS43LTMuNyAzLjd2MTBoLTcuN2MtOCAwLTEzLjcgNC40LTEzLjcgMTEuNyAwIDYuNSA2LjYgMTEuNiAxMy43IDExLjZoMTcuMmMyLjcgMCA0LjktMi4yIDQuOS00LjlWNTQuNWg3VjY0YzAgNS40IDMuMyAxMCA5LjkgMTBoMzEuMmMzLjEgMCA1LjYtMi41IDUuNi01LjYuMS0xLjUtLjUtMi45LTEuNS0zLjltLTY2LjYgNS4xYzAgLjQtLjQuOC0uOC44SDYxYy01IDAtNi45LTMuNS02LjktNy45LjEtNC42IDItNy45IDYuOS03LjloMS4zek0xNTUuNSA1NS4ybC00LjUtNC40aC0xMi40bDEwLjYgMTAuN3pNMTc5LjkgNDcuMUgxNjhsLTMwLjcgMzAuN2gxMS45bDguMi04LjIgNC40IDQuNWgxMi41bC0xMC43LTEwLjd6IiBjbGFzcz0ic3QxIi8+PC9zdmc+",
      dts: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHJvbGU9ImltZyIgdmlld0JveD0iMCA3IDI0IDEwIj48dGl0bGU+RFRTPC90aXRsZT48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Im0yMy41NTYgMTQuMzQ2LTEuMTk0LTEuMTczYS44NDEuODQxIDAgMCAxIC42MDQtMS40NDVoLjU5YS4zNDYuMzQ2IDAgMCAwIC4zNDktLjM0M3YtLjYzNkgxOC45N2ExLjQ5IDEuNDkgMCAwIDAtMS41MDcgMS40Nzd2LjAwM2MwIC4zOTYuMTYuNzc1LjQ0NCAxLjA1bDEuMjAxIDEuMThhLjg0MS44NDEgMCAwIDEtLjYwNCAxLjQ0NmgtMS44NDlhMS4zMDYgMS4zMDYgMCAwIDEtMS4zMTctMS4yOTR2LTIuODc2aDEuMTM1YS4zNDYuMzQ2IDAgMCAwIC4zNS0uMzQzdi0uNjM2aC0xLjQ4NVY3LjU4N2wtMy44NjYgMS42NnYxLjQ5NGgtMS44N1Y3LjEyM2gtMi44N2EuOTg2Ljk4NiAwIDAgMC0uOTk3Ljk4djIuNjM4SDMuNjdDMS41MTQgMTAuNzQxIDAgMTEuODkzIDAgMTMuODFjMCAxLjcxIDEuNzc2IDMuMDY4IDMuNjc2IDMuMDY4aDQuNjE1YTEuMzA2IDEuMzA2IDAgMCAwIDEuMzE4LTEuMjk0di0zLjg1NWgxLjg2M3YyLjUwM2MwIDEuNDIzLjg3NCAyLjY0NiAyLjY1IDIuNjQ2aDguMzcxQTEuNDkgMS40OSAwIDAgMCAyNCAxNS40di0uMDAzYTEuNDQgMS40NCAwIDAgMC0uNDQ0LTEuMDUxTTUuNzI5IDE1LjY4M2EuMjE3LjIxNyAwIDAgMS0uMjE5LjIxNGgtLjEzYy0xLjM0IDAtMS44MzUtLjkwOC0xLjg1LTIuMDg4LjAxNS0xLjIxNi41MjUtMi4wODggMS44NS0yLjA4OGguMzQ5eiIvPjwvc3ZnPg==",
    })
    const POSTER_BADGE_LABELS = Object.freeze({
      "4k": "4K",
      hd: "HD",
      sd: "SD",
      imax: "IMAX",
      "hdr10-plus": "HDR10+",
      hdr: "HDR",
      "dolby-vision": "Dolby Vision",
      av1: "AV1",
      "dolby-atmos": "Dolby Atmos",
      "dolby-audio": "Dolby Audio",
      "dts-x": "DTS:X",
      dts: "DTS",
    })
    const POSTER_BADGE_ASPECT_RATIOS = Object.freeze({
      "4k": "26 / 15",
      hd: "26 / 15",
      sd: "26 / 15",
      imax: "489.22 / 94.727",
      "hdr10-plus": "54 / 15",
      hdr: "34 / 15",
      "dolby-vision": "52 / 22",
      av1: "278 / 155",
      "dolby-atmos": "52 / 22",
      "dolby-audio": "52 / 22",
      "dts-x": "139 / 40.8",
      dts: "24 / 10",
    })
    const IMDB_PRIMARY_LOGO_DATA_URI =
      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjEzMCAxMjIgNjYzIDI1NiI+PHBhdGggZmlsbD0iI2Y1YzUxOCIgZD0iTTE5NyAxMjIuN3YyNTUuNGgtNjYuMlYxMjIuN3ptMTQxLjQgMC0xNS4zIDExOS40LTkuNC02NC45Yy0yLjgtMjAuOC01LjQtMzktOC01NC41aC04NS45djI1NS40aDU4LjFsLjMtMTY4LjYgMjQuNCAxNjguNkgzNDRsMjMuMy0xNzIuM3YxNzIuM2g1OC4xVjEyMi43aC04Ni43Wm0xMDkuMyAyNTUuNFYxMjIuN2g0OS40YzMyLjEgMCA1MC42IDEuNSA2MS45IDQuNXMxOS45IDcuOCAyNS43IDE0LjVjNiA2LjcgOS43IDE0LjIgMTEuMSAyMi40IDEuNCA4LjMgMi40IDI0LjUgMi40IDQ4Ljd2ODkuNmMwIDIyLjktMS4yIDM4LjMtMy41IDQ1LjktMi4xIDcuNy01LjkgMTMuNy0xMS4zIDE4LjEtNS4zIDQuNS0xMiA3LjQtMTkuOCA5LjItNy45IDEuNy0xOS44IDIuNi0zNS43IDIuNmgtODAuNFptNjYuMi0yMTEuN1YzMzRjOS41IDAgMTUuNC0xLjkgMTcuNi01LjdzMy40LTE0LjIgMy40LTMxLjN2LTk4LjljMC0xMS41LS40LTE4LjktMS4xLTIyLjJzLTIuNS01LjctNS4xLTcuMmMtMi42LTEuNi03LjYtMi4zLTE0LjctMi4zWm0xNzAuOC00My43djgzLjFjNS4zLTYuMSAxMS4zLTEwLjYgMTcuNy0xMy42IDYuNi0zLjEgMTYuMy00LjYgMjMuOS00LjZzMTYuNCAxLjQgMjIuOSA0LjFjNi40IDIuNyAxMS4zIDYuNiAxNC43IDExLjUgMy4zIDUgNS40IDkuOCA2LjEgMTQuNXMxIDE0LjcgMSAzMC4ydjcxLjdjMCAxNS4yLTEgMjYuNi0zLjEgMzQuMi0yIDcuNC02LjggMTQtMTQuNSAxOS40LTcuNiA1LjYtMTYuNyA4LjMtMjcuMSA4LjNzLTE3LjItMS42LTIzLjgtNC44Yy02LjYtMy40LTEyLjUtOC4yLTE3LjgtMTQuN2wtNC4yIDE2LjJoLTU5LjdWMTIyLjd6bTIyLjQgMTI4YzAtMTAuOC0uNy0xNy44LTIuMS0yMS4yLTEuNC0zLjItNi44LTUtMTAuOS01cy02LjQgMS41LTcuNyA0LjNjLTEuMSAzLTEuNyAxMC4yLTEuNyAyMS44djY3LjVjMCAxMS4zLjcgMTguNCAyIDIxLjUgMS40IDMuMiA0IDQuNyA3LjkgNC43czkuNC0xLjYgMTAuNy00LjhjMS4yLTMuMiAxLjktMTEuMSAxLjktMjMuNHYtNjUuNVoiLz48L3N2Zz4="

    // src/shared/quality.js
    const QUALITY_LABELS = Object.freeze({
      all: "All",
      "4k": "4K (2160p)",
      hd: "HD (1080p)",
      sd: "SD (720p or 480p)",
    })
    const RELEASE_QUALITY_PATTERNS = [
      ["4k", /(?:^|[^A-Z0-9])(?:2160P|DS4K|RM4K|4K)(?=$|[^A-Z0-9])/i],
      ["hd", /(?:^|[^A-Z0-9])1080P(?=$|[^A-Z0-9])/i],
      ["sd", /(?:^|[^A-Z0-9])(?:720P|480P)(?=$|[^A-Z0-9])/i],
    ]
    const getReleaseQuality = (value) => {
      return (
        RELEASE_QUALITY_PATTERNS.find(([, pattern]) =>
          pattern.test(value)
        )?.[0] || "unknown"
      )
    }

    // src/shared/storage.js
    const storageGet = (key) => {
      try {
        return window.localStorage.getItem(key)
      } catch {
        return null
      }
    }
    const storageSet = (key, value) => {
      try {
        if (value === null || value === undefined) {
          window.localStorage.removeItem(key)
        } else {
          window.localStorage.setItem(key, String(value))
        }
      } catch {}
    }
    let openedReleasesKey = ""
    const initStorage = (context) => {
      openedReleasesKey = context.openedReleasesKey
    }
    const getOpenedReleases = () => {
      try {
        const raw = storageGet(openedReleasesKey)
        if (!raw) {
          return new Set()
        }
        const parsed = JSON.parse(raw)
        return new Set(Array.isArray(parsed) ? parsed : [])
      } catch {
        return new Set()
      }
    }
    const saveOpenedRelease = (...identifiers) => {
      const valid = identifiers.filter(
        (id) => Boolean(id) && typeof id === "string"
      )
      if (!valid.length) {
        return
      }
      const items = getOpenedReleases()
      for (const identifier of valid) {
        items.delete(identifier)
        items.add(identifier)
      }
      storageSet(openedReleasesKey, JSON.stringify([...items].slice(-1e3)))
    }
    const markReleaseOpened = (row, item) => {
      if (row) {
        row.dataset.userpatchOpened = "true"
      }
      if (item) {
        item.dataset.userpatchOpened = "true"
      }
    }
    const isReleaseOpened = (identifier, linksRoot, openedReleases) => {
      if (identifier && openedReleases.has(identifier)) {
        return true
      }
      if (linksRoot) {
        for (const anchor of linksRoot.querySelectorAll("a[href]")) {
          if (openedReleases.has(anchor.href)) {
            return true
          }
        }
      }
      return false
    }

    // src/shared/icons.js
    const LUCIDE_ICON_TEMPLATES = new Map()
    const createLucideIcon$1 = (name, shapes, decorate) => {
      const cached = LUCIDE_ICON_TEMPLATES.get(name)
      if (cached) {
        return cached.cloneNode(true)
      }
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
      svg.setAttribute("width", "24")
      svg.setAttribute("height", "24")
      svg.setAttribute("viewBox", "0 0 24 24")
      svg.setAttribute("fill", "none")
      svg.setAttribute("stroke", "currentColor")
      svg.setAttribute("stroke-width", "2")
      svg.setAttribute("stroke-linecap", "round")
      svg.setAttribute("stroke-linejoin", "round")
      svg.setAttribute("aria-hidden", "true")
      svg.setAttribute("focusable", "false")
      if (decorate) {
        decorate(svg, name)
      }
      for (const [tagName, attributes] of shapes[name] || []) {
        const shape = document.createElementNS(
          "http://www.w3.org/2000/svg",
          tagName
        )
        for (const [attribute, value] of Object.entries(attributes)) {
          shape.setAttribute(attribute, value)
        }
        svg.append(shape)
      }
      LUCIDE_ICON_TEMPLATES.set(name, svg)
      return svg.cloneNode(true)
    }

    // src/hdhub4u/icons.js
    const LUCIDE_ICON_SHAPES = {
      info: [
        [
          "circle",
          {
            cx: "12",
            cy: "12",
            r: "10",
          },
        ],
        ["path", { d: "M12 16v-4" }],
        ["path", { d: "M12 8h.01" }],
      ],
      "arrow-left": [
        ["path", { d: "m12 19-7-7 7-7" }],
        ["path", { d: "M19 12H5" }],
      ],
      "arrow-right": [
        ["path", { d: "M5 12h14" }],
        ["path", { d: "m12 5 7 7-7 7" }],
      ],
      "audio-lines": [
        ["path", { d: "M2 10v3" }],
        ["path", { d: "M6 6v11" }],
        ["path", { d: "M10 3v18" }],
        ["path", { d: "M14 8v7" }],
        ["path", { d: "M18 5v13" }],
        ["path", { d: "M22 10v3" }],
      ],
      "chevron-down": [["path", { d: "m6 9 6 6 6-6" }]],
      "external-link": [
        ["path", { d: "M15 3h6v6" }],
        ["path", { d: "M10 14 21 3" }],
        [
          "path",
          { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" },
        ],
      ],
      film: [
        [
          "rect",
          {
            width: "18",
            height: "18",
            x: "3",
            y: "3",
            rx: "2",
          },
        ],
        ["path", { d: "M7 3v18" }],
        ["path", { d: "M3 7.5h4" }],
        ["path", { d: "M3 12h18" }],
        ["path", { d: "M3 16.5h4" }],
        ["path", { d: "M17 3v18" }],
        ["path", { d: "M17 7.5h4" }],
        ["path", { d: "M17 16.5h4" }],
      ],
      "file-archive": [
        [
          "path",
          {
            d: "M13.659 22H18a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v11.5",
          },
        ],
        ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5" }],
        ["path", { d: "M8 12v-1" }],
        ["path", { d: "M8 18v-2" }],
        ["path", { d: "M8 7V6" }],
        [
          "circle",
          {
            cx: "8",
            cy: "20",
            r: "2",
          },
        ],
      ],
      "file-play": [
        [
          "path",
          {
            d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
          },
        ],
        ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5" }],
        [
          "path",
          {
            d: "M15.033 13.44a.647.647 0 0 1 0 1.12l-4.065 2.352a.645.645 0 0 1-.968-.56v-4.704a.645.645 0 0 1 .967-.56z",
          },
        ],
      ],
      download: [
        ["path", { d: "M12 15V3" }],
        ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }],
        ["path", { d: "m7 10 5 5 5-5" }],
      ],
      "loader-2": [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56" }]],
      menu: [
        ["path", { d: "M4 5h16" }],
        ["path", { d: "M4 12h16" }],
        ["path", { d: "M4 19h16" }],
      ],
      play: [
        [
          "path",
          {
            d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",
          },
        ],
      ],
      search: [
        ["path", { d: "m21 21-4.34-4.34" }],
        [
          "circle",
          {
            cx: "11",
            cy: "11",
            r: "8",
          },
        ],
      ],
      x: [
        ["path", { d: "M18 6 6 18" }],
        ["path", { d: "m6 6 12 12" }],
      ],
      zap: [
        [
          "path",
          {
            d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
          },
        ],
      ],
    }
    const createLucideIcon = (name) =>
      createLucideIcon$1(name, LUCIDE_ICON_SHAPES, (svg, iconName) => {
        svg.dataset.userpatchLucideIcon = iconName
      })

    // src/hdhub4u/download-rows.js
    const getDetailBadgeNames = (data) => {
      const pool = [
        data.title,
        data.metaRows.map(([, value]) => value).join(" "),
        ...data.releases.map((row) => `${row.title} ${row.size || ""}`),
        ...data.episodes.flatMap((episode) =>
          episode.groups.map(
            (group) =>
              `${group.quality} ${group.links.map((link) => link.tooltip).join(" ")}`
          )
        ),
      ]
        .join(" ")
        .toUpperCase()
      const hasToken = (token) =>
        new RegExp(`(?:^|[^A-Z0-9])${token}(?=$|[^A-Z0-9])`).test(pool)
      const hasAnyToken = (tokens) => tokens.some(hasToken)
      const badges = []
      for (const [badge, pattern] of RELEASE_QUALITY_PATTERNS) {
        if (pattern.test(pool)) {
          badges.push(badge)
        }
      }
      if (hasToken("IMAX")) {
        badges.push("imax")
      }
      if (hasAnyToken(["HDR10P", "HDR10PLUS", "HDRP10\\+", "HDR10\\+"])) {
        badges.push("hdr10-plus")
      } else if (hasAnyToken(["HDR", "HDR10"])) {
        badges.push("hdr")
      }
      if (hasToken("AV1")) {
        badges.push("av1")
      }
      const hasDolbyVision = hasAnyToken(["DV", "DOVI"])
      const hasAtmos = hasToken("ATMOS")
      const hasDtsX = /(?:^|[^A-Z0-9])DTS(?:[:._ -]*X)(?=$|[^A-Z0-9])/.test(
        pool
      )
      const hasDts = hasToken("DTS") || hasDtsX
      const hasDolby =
        hasAnyToken(["DOLBY", "AC3", "EAC3"]) ||
        /(?:^|[^A-Z0-9])DDP?(?=$|[^A-Z0-9])/.test(pool) ||
        /(?:^|[^A-Z0-9])DD[0-9]/.test(pool)
      if (hasDolbyVision) {
        badges.push("dolby-vision")
      }
      if (hasAtmos) {
        badges.push("dolby-atmos")
      } else if (hasDolby && !hasDts) {
        badges.push("dolby-audio")
      }
      if (hasDtsX) {
        badges.push("dts-x")
      } else if (hasDts) {
        badges.push("dts")
      }
      return badges
    }
    const buildPosterBadges = (badges) => {
      const list = document.createElement("div")
      list.className = "userpatch-poster-badges"
      list.setAttribute("role", "list")
      list.setAttribute("aria-label", "Release format badges")
      for (const name of badges) {
        const item = document.createElement("span")
        item.className = "userpatch-media-badge"
        item.setAttribute("role", "listitem")
        item.title = POSTER_BADGE_LABELS[name]
        const image = document.createElement("img")
        image.src = USERPATCH_BADGE_DATA[name]
        image.alt = POSTER_BADGE_LABELS[name]
        image.width = 52
        image.height = 22
        image.decoding = "async"
        image.style.aspectRatio = POSTER_BADGE_ASPECT_RATIOS[name]
        item.append(image)
        list.append(item)
      }
      return list
    }
    const buildReleaseRow = (row, openedReleases) => {
      const item = document.createElement("a")
      item.className = "userpatch-release-item"
      item.href = row.href
      item.target = "_blank"
      item.rel = "noopener noreferrer nofollow"
      item.dataset.userpatchFilename = row.title
      item.dataset.userpatchQuality = row.external
        ? "unknown"
        : getReleaseQuality(`${row.title} ${row.size || ""}`)
      const rowLayout = document.createElement("div")
      rowLayout.className = "userpatch-release-row"
      if (isReleaseOpened(row.href, null, openedReleases)) {
        markReleaseOpened(rowLayout, item)
      }
      const copy = document.createElement("div")
      copy.className = "userpatch-release-copy"
      const title = document.createElement("div")
      title.className = "userpatch-release-file-title"
      title.textContent = row.external ? "More formats on 4KHDHub" : row.title
      copy.append(title)
      const meta = document.createElement("div")
      meta.className = "userpatch-release-meta"
      if (!row.external && row.size) {
        const size = document.createElement("span")
        size.textContent = row.size
        meta.append(size)
      }
      if (!row.external && row.audio) {
        const audioBadge = document.createElement("span")
        audioBadge.className = "userpatch-series-language-badge"
        audioBadge.setAttribute("aria-label", `Audio: ${row.audio}`)
        const audioIcon = createLucideIcon("audio-lines")
        audioIcon.classList.add("userpatch-series-language-icon")
        const audioText = document.createElement("span")
        audioText.className = "userpatch-series-language-text"
        audioText.textContent = row.audio
        audioBadge.append(audioIcon, audioText)
        meta.append(audioBadge)
      }
      if (meta.childElementCount) {
        copy.append(meta)
      }
      const action = document.createElement("span")
      action.className = "userpatch-release-action"
      action.setAttribute("aria-hidden", "true")
      if (row.external || row.provider) {
        const image = document.createElement("img")
        image.src = row.external ? SITE_ICON_DATA_URI$1 : row.provider.logo
        image.alt = ""
        image.width = 36
        image.height = 36
        image.decoding = "async"
        action.append(image)
      } else {
        let actionIcon = "download"
        if (row.isWatch) {
          actionIcon = "play"
        }
        action.append(createLucideIcon(actionIcon))
      }
      rowLayout.append(copy, action)
      item.append(rowLayout)
      return item
    }
    const buildEpisodeRow = (episode, group, openedReleases) => {
      const item = document.createElement("div")
      item.className = "userpatch-release-item"
      const label = `Episode ${episode.number}`
      item.dataset.userpatchFilename = `${label} ${group.quality}`.trim()
      item.dataset.userpatchQuality = getReleaseQuality(
        `${group.quality} ${label}`
      )
      const rowLayout = document.createElement("div")
      rowLayout.className = "userpatch-release-row"
      const opened =
        openedReleases.has(item.dataset.userpatchFilename) ||
        group.links.some((link) => openedReleases.has(link.href))
      if (opened) {
        markReleaseOpened(rowLayout, item)
      }
      const copy = document.createElement("div")
      copy.className = "userpatch-release-copy"
      const title = document.createElement("div")
      title.className = "userpatch-release-file-title"
      title.textContent = label
      copy.append(title)
      const meta = document.createElement("div")
      meta.className = "userpatch-release-meta"
      if (group.quality) {
        const quality = document.createElement("span")
        quality.textContent = group.quality.toUpperCase()
        meta.append(quality)
      }
      if (group.size) {
        const size = document.createElement("span")
        size.textContent = group.size
        meta.append(size)
      }
      if (meta.childElementCount) {
        copy.append(meta)
      }
      const actions = document.createElement("div")
      actions.className = "userpatch-release-actions"
      for (const link of group.links) {
        const anchor = document.createElement("a")
        anchor.className = "userpatch-provider-link"
        anchor.href = link.href
        anchor.target = "_blank"
        anchor.rel = "noopener noreferrer nofollow"
        anchor.dataset.tooltip = link.tooltip
        anchor.setAttribute("aria-label", link.tooltip)
        if (link.provider) {
          const image = document.createElement("img")
          image.src = link.provider.logo
          image.alt = ""
          image.width = 36
          image.height = 36
          image.decoding = "async"
          anchor.append(image)
        } else {
          anchor.append(createLucideIcon(link.icon))
        }
        if (isReleaseOpened(link.href, null, openedReleases)) {
          markReleaseOpened(null, anchor)
        }
        actions.append(anchor)
      }
      rowLayout.append(copy, actions)
      item.append(rowLayout)
      return item
    }
    let detailTooltipCleanup = null
    const clearDetailTooltipCleanup = () => {
      detailTooltipCleanup?.()
      detailTooltipCleanup = null
    }
    const setDetailTooltipCleanup = (cleanup) => {
      clearDetailTooltipCleanup()
      detailTooltipCleanup = cleanup
    }

    // src/shared/provider-logos.js
    const makeSvgDataUri$1 = (svg) =>
      `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
    const HUBCLOUD_LOGO_SVG = String.raw`<svg xmlns="http://www.w3.org/2000/svg" viewBox="-0.043 0.659 177.311 122.029" width="177" height="123">
  <defs>
    <linearGradient id="grad-left" gradientUnits="userSpaceOnUse" x1="31.00" y1="47.00" x2="11.00" y2="117.00">
      <stop offset="0" stop-color="#00aaef"/>
      <stop offset="1" stop-color="#0084e9"/>
    </linearGradient>
    <linearGradient id="grad-cyan" gradientUnits="userSpaceOnUse" x1="82.00" y1="-6.00" x2="59.60" y2="101.00">
      <stop offset="0" stop-color="#00f1f2"/>
      <stop offset="1" stop-color="#00a5ec"/>
    </linearGradient>
    <linearGradient id="grad-mid" gradientUnits="userSpaceOnUse" x1="138.00" y1="0.00" x2="65.30" y2="103.00">
      <stop offset="0" stop-color="#00d5f2"/>
      <stop offset="1" stop-color="#0064e3"/>
    </linearGradient>
    <linearGradient id="grad-white" gradientUnits="userSpaceOnUse" x1="123.00" y1="51.00" x2="123.00" y2="121.00" gradientTransform="matrix(1, 0, 0, 1.001083, 0, -0.055333)">
      <stop offset="0" stop-color="#fcfafb"/>
      <stop offset="1" stop-color="#f7f7f7"/>
    </linearGradient>
    <path id="left-blue-path" d="M 39.20 44.60 A 38.99 38.99 0 0 0 33.22 122.10 L 71.00 122.10 L 71.00 44.60 Z"/>
    <path id="cyan-dome-path" d="M 128.40 27.85 C 118.50 11.20, 100.50 0.93, 82.50 1.05 C 53.60 0.02, 28.14 26.14, 27.57 54.50 C 26.56 70.83, 36.41 86.79, 51.31 93.50 C 58.00 96.40, 66.00 98.00, 78.00 98.60 L 113.00 69.00 Z"/>
    <path id="mid-blue-path" d="M 131.80 27.73 L 128.40 27.85 C 99.62 27.66, 73.17 48.02, 63.30 74.50 C 57.02 89.28, 56.34 107.24, 64.40 122.10 L 145.00 122.10 L 169.17 98.00 A 45.07 45.07 0 0 0 131.80 27.73 Z"/>
    <path id="white-cloud-path" d="M 96.00 122.05 C 83.84 120.65, 73.97 109.64, 73.33 96.30 A 24.98 24.98 0 0 1 96.06 71.41 A 28.49 28.49 0 0 1 150.56 71.19 A 25.30 25.30 0 0 1 168.43 102.55 A 28.55 28.55 0 0 1 143.00 122.05 Z"/>
    <clipPath id="blue-silhouette">
      <path d="M 39.20 44.60 A 38.99 38.99 0 0 0 33.22 122.10 L 71.00 122.10 L 71.00 44.60 Z"/>
      <path d="M 128.40 27.85 C 118.50 11.20, 100.50 0.93, 82.50 1.05 C 53.60 0.02, 28.14 26.14, 27.57 54.50 C 26.56 70.83, 36.41 86.79, 51.31 93.50 C 58.00 96.40, 66.00 98.00, 78.00 98.60 L 113.00 69.00 Z"/>
      <path d="M 131.80 27.73 L 128.40 27.85 C 99.62 27.66, 73.17 48.02, 63.30 74.50 C 57.02 89.28, 56.34 107.24, 64.40 122.10 L 145.00 122.10 L 169.17 98.00 A 45.07 45.07 0 0 0 131.80 27.73 Z"/>
    </clipPath>
    <filter id="white-shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="1.1" result="blur"/>
      <feOffset in="blur" dx="-0.6" dy="-0.2" result="offsetBlur"/>
      <feFlood flood-color="#001950" flood-opacity="0.42" result="shadowColor"/>
      <feComposite in="shadowColor" in2="offsetBlur" operator="in"/>
    </filter>
  </defs>
  <path d="M 39.20 44.60 A 38.99 38.99 0 0 0 33.22 122.10 L 71.00 122.10 L 71.00 44.60 Z" fill="url(#grad-left)"/>
  <path d="M 128.40 27.85 C 118.50 11.20, 100.50 0.93, 82.50 1.05 C 53.60 0.02, 28.14 26.14, 27.57 54.50 C 26.56 70.83, 36.41 86.79, 51.31 93.50 C 58.00 96.40, 66.00 98.00, 78.00 98.60 L 113.00 69.00 Z" fill="url(#grad-cyan)"/>
  <path d="M 131.80 27.73 L 128.40 27.85 C 99.62 27.66, 73.17 48.02, 63.30 74.50 C 57.02 89.28, 56.34 107.24, 64.40 122.10 L 145.00 122.10 L 169.17 98.00 A 45.07 45.07 0 0 0 131.80 27.73 Z" fill="url(#grad-mid)"/>
  <path d="M 58.52 95.50 C 64.00 97.40, 70.00 98.20, 79.00 98.80 L 90.00 122.10 L 64.40 122.10 C 59.92 113.83, 58.14 104.61, 58.52 95.50 Z" fill="#005fd8"/>
  <g clip-path="url(#blue-silhouette)">
    <path d="M 96.00 122.05 C 83.84 120.65, 73.97 109.64, 73.33 96.30 A 24.98 24.98 0 0 1 96.06 71.41 A 28.49 28.49 0 0 1 150.56 71.19 A 25.30 25.30 0 0 1 168.43 102.55 A 28.55 28.55 0 0 1 143.00 122.05 Z" fill="#000000" filter="url(#white-shadow)"/>
  </g>
  <path d="M 96 122.127 C 83.84 120.725 73.97 109.703 73.33 96.349 C 73.324 83.406 83.184 72.598 96.06 71.432 C 102.375 50.406 129.058 44.108 144.089 60.096 C 147.064 63.259 149.277 67.061 150.56 71.212 C 164.237 74.834 172.289 88.98 168.43 102.606 C 164.745 113.711 156.691 121.445 145.022 122.127 L 96 122.127 Z" fill="url(#grad-white)" style=""/>
</svg>`
    const HUBCLOUD_LOGO_DATA_URI = makeSvgDataUri$1(HUBCLOUD_LOGO_SVG)
    const HUBDRIVE_LOGO_SVG = String.raw`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 249 249" width="249" height="249">
  <defs>
    <linearGradient id="bg-blue" gradientUnits="userSpaceOnUse" x1="35.36" y1="35.07" x2="165.36" y2="165.07">
      <stop offset="0" stop-color="#5492f0"/>
      <stop offset="1" stop-color="#468aef"/>
    </linearGradient>
    <linearGradient id="long-shadow" gradientUnits="userSpaceOnUse" x1="116.86" y1="162.07" x2="156.86" y2="231.37">
      <stop offset="0" stop-color="#001450" stop-opacity="0.068"/>
      <stop offset="1" stop-color="#001450" stop-opacity="0"/>
    </linearGradient>
    <clipPath id="circle-clip">
      <circle cx="124.50" cy="124.50" r="123.88"/>
    </clipPath>
  </defs>
  <circle cx="124.50" cy="124.50" r="123.88" fill="url(#bg-blue)"/>
  <g clip-path="url(#circle-clip)">
    <path d="M 310.50 227.06 L 160.50 77.06 A 50.95 50.95 0 0 1 175.12 107.56 A 33.99 33.99 0 1 1 175.18 175.54 L 79.38 175.54 A 39.62 39.62 0 0 1 51.36 163.94 L 201.36 313.94 Z" fill="url(#long-shadow)"/>
  </g>
  <path d="M 175.18 175.54 L 79.38 175.54 A 39.62 39.62 0 0 1 76.32 96.42 A 50.95 50.95 0 0 1 175.12 107.56 A 33.99 33.99 0 1 1 175.18 175.54 Z M 108.39 97.26 H 141.59 V 125.44 H 158.42 L 125.09 158.69 L 91.83 125.44 H 108.39 Z" fill="#ffffff" fill-rule="evenodd"/>
</svg>`
    const HUBDRIVE_LOGO_DATA_URI = makeSvgDataUri$1(HUBDRIVE_LOGO_SVG)
    const HUBCDN_LOGO_SVG = String.raw`<svg width="216" height="260" viewBox="0 0 216 260" xmlns="http://www.w3.org/2000/svg"><title>undraw_handcrafts_heart</title><g fill="none"><path d="M94.612 259.442c-52.87-27.61-89.83-83.546-94.497-143.008-2.677-34.116 42-57.722 73.18-43.618s45.416 52.377 42.057 86.433c-3.36 34.055-20.522 64.984-20.74 100.193" fill="#b9fff4"/><path d="m180.8 59.136-.002-.002.022.057.002.002z" fill="#000"/><path d="M210.18 49.32c-9.959-27.16-41.17-31.961-64.158-17.966a102 102 0 0 0-10.83 7.159C126.986 22.216 114.311 6.342 96.626.665c-18.734-3.47-38.053 7.13-50.715 20.369C34.808 33.217 29.554 49.242 23.814 64.39c-7.425 19.42-5.637 40.524-.681 60.308 5.518 24.51 19.25 46.018 34.14 65.883 17.341 23.568 36.811 45.456 55.79 67.695-16.404-27.606-34.051-54.514-48.789-83.074-9.574-18.305-15.647-32.086-19.093-55.445a155 155 0 0 1-1.548-21.374c.179-8.247.613-8.191.746-9.59 2.97-15.129 15.054-38.773 20.212-45.34a39 39 0 0 1 4.92-4.745 27 27 0 0 1 3.381-2.086c4.253-2.02 2.698-2 12.054-4.589h.004c.699-.03 1.345-.032 1.868-.023.23.134.461.265.686.407 8.802 8.28 6.196 6.106 10.328 11.3l1.05 1.484a87.4 87.4 0 0 1 6.546 11.272c1.768 2.63 7.162 26.82 29.194 21.615a28.8 28.8 0 0 0 10.114-5.904 574 574 0 0 0 7.158-5.542c2.509-1.853 7.729-5.67 9.68-6.699a48 48 0 0 1 5.05-2.73 40 40 0 0 1 6.261-1.897c.41-.025.818-.085 1.228-.079.167.002.332.031.498.037.793.196 1.903.478 3.011.821.21.12.422.236.627.365a34 34 0 0 1 1.71 1.71q.766 1.148 1.387 2.381c1.5 4.087 2.738 8.265 3.704 12.51 3.598 14.583 2.86 25.085.322 37.42-10.04 46.747-36.895 82.132-64.628 125.968a621 621 0 0 1-9.546 13.878c10.995-10.373 21.466-21.286 31.577-32.52 21.612-23.877 43.757-47.96 57.517-77.437 7.013-14.537 13.001-29.855 14.723-46.011a112.4 112.4 0 0 0-4.835-45.038" fill="#6366f1"/></g></svg>`
    const HUBCDN_LOGO_DATA_URI = makeSvgDataUri$1(HUBCDN_LOGO_SVG)

    // src/hdhub4u/provider-marks.js
    const HUB_PROVIDERS = Object.freeze([
      Object.freeze({
        name: "HubCloud",
        slug: "hubcloud",
        logo: HUBCLOUD_LOGO_DATA_URI,
      }),
      Object.freeze({
        name: "HubDrive",
        slug: "hubdrive",
        logo: HUBDRIVE_LOGO_DATA_URI,
      }),
      Object.freeze({
        name: "HubCDN",
        slug: "hubcdn",
        logo: HUBCDN_LOGO_DATA_URI,
      }),
    ])
    /**
     * Resolves a download link to its provider entry. Host prefixes win because
     * the domains rotate TLDs constantly (hubcloud.pw, hubcloud.mov, ...); when
     * the host is masked by a redirect service, a provider name in the link
     * text is still identifiable. Returns null for anything else.
     */
    const getHubProvider = (href, text = "") => {
      let host = ""
      try {
        host = new URL(href, location.href).hostname.toLowerCase()
      } catch {}
      for (const provider of HUB_PROVIDERS) {
        if (new RegExp(`(?:^|\\.)${provider.slug}\\.`).test(host)) {
          return provider
        }
      }
      const label = text.toLowerCase()
      for (const provider of HUB_PROVIDERS) {
        if (label.includes(provider.slug)) {
          return provider
        }
      }
      return null
    }

    // src/shared/provider-tooltip.js
    const setupProviderTooltip = (root) => {
      const tooltip = document.createElement("div")
      tooltip.id = "userpatch-provider-tooltip"
      tooltip.className = "userpatch-provider-tooltip"
      tooltip.setAttribute("role", "tooltip")
      tooltip.setAttribute("aria-hidden", "true")
      tooltip.hidden = true
      document.body.append(tooltip)
      let hoveredTrigger = null
      let focusedTrigger = null
      let activeTrigger = null
      let openFrame = 0
      let closeTimer = 0
      const getTrigger = (target) => {
        if (!(target instanceof Element)) {
          return null
        }
        const trigger = target.closest(
          ".userpatch-provider-link, .userpatch-hblinks-action"
        )
        return trigger instanceof HTMLElement && root.contains(trigger)
          ? trigger
          : null
      }
      const positionTooltip = () => {
        if (!activeTrigger?.isConnected) {
          return
        }
        const triggerRect = activeTrigger.getBoundingClientRect()
        const tooltipRect = tooltip.getBoundingClientRect()
        if (
          triggerRect.bottom < 0 ||
          triggerRect.top > window.innerHeight ||
          triggerRect.right < 0 ||
          triggerRect.left > window.innerWidth
        ) {
          closeTooltip()
          return
        }
        const offset = 8
        const side =
          triggerRect.top >= tooltipRect.height + offset ? "top" : "bottom"
        const halfWidth = tooltipRect.width / 2
        const center = triggerRect.left + triggerRect.width / 2
        const left = Math.min(
          Math.max(center, halfWidth + 4),
          window.innerWidth - halfWidth - 4
        )
        const top =
          side === "top"
            ? triggerRect.top - tooltipRect.height - offset
            : triggerRect.bottom + offset
        tooltip.dataset.side = side
        tooltip.style.left = `${left}px`
        tooltip.style.top = `${Math.max(4, top)}px`
      }
      const closeTooltip = () => {
        if (!activeTrigger) {
          return
        }
        activeTrigger.removeAttribute("aria-describedby")
        activeTrigger = null
        tooltip.dataset.state = "closed"
        tooltip.setAttribute("aria-hidden", "true")
        window.clearTimeout(closeTimer)
        closeTimer = window.setTimeout(() => {
          if (!activeTrigger) {
            tooltip.hidden = true
          }
        }, 140)
      }
      const syncTooltip = () => {
        const nextTrigger = hoveredTrigger || focusedTrigger
        if (!nextTrigger) {
          closeTooltip()
          return
        }
        window.clearTimeout(closeTimer)
        if (activeTrigger !== nextTrigger) {
          activeTrigger?.removeAttribute("aria-describedby")
          activeTrigger = nextTrigger
          tooltip.textContent = nextTrigger.dataset.tooltip || ""
          nextTrigger.setAttribute("aria-describedby", tooltip.id)
        }
        tooltip.hidden = false
        tooltip.setAttribute("aria-hidden", "false")
        positionTooltip()
        window.cancelAnimationFrame(openFrame)
        openFrame = window.requestAnimationFrame(() => {
          if (activeTrigger === nextTrigger) {
            tooltip.dataset.state = "open"
          }
        })
      }
      const onPointerOver = (event) => {
        if (
          (event.pointerType !== "mouse" && event.pointerType !== "pen") ||
          !window.matchMedia("(hover: hover) and (pointer: fine)").matches
        ) {
          return
        }
        const trigger = getTrigger(event.target)
        if (!trigger || trigger.contains(event.relatedTarget)) {
          return
        }
        hoveredTrigger = trigger
        syncTooltip()
      }
      const onPointerOut = (event) => {
        const trigger = getTrigger(event.target)
        if (
          !trigger ||
          trigger !== hoveredTrigger ||
          trigger.contains(event.relatedTarget)
        ) {
          return
        }
        hoveredTrigger = null
        syncTooltip()
      }
      const onFocusIn = (event) => {
        focusedTrigger = getTrigger(event.target)
        if (focusedTrigger) {
          syncTooltip()
        }
      }
      const onFocusOut = (event) => {
        const trigger = getTrigger(event.target)
        if (
          trigger &&
          trigger === focusedTrigger &&
          !trigger.contains(event.relatedTarget)
        ) {
          focusedTrigger = null
          syncTooltip()
        }
      }
      const onProviderClick = (event) => {
        if (event.type === "auxclick" && event.button !== 1) {
          return
        }
        const trigger = getTrigger(event.target)
        if (!trigger) {
          return
        }
        const item = trigger.closest(".userpatch-release-item")
        const row =
          trigger.closest(".userpatch-release-row") ||
          item?.querySelector(".userpatch-release-row")
        markReleaseOpened(row, item)
        const filename = item?.dataset.userpatchFilename
        const href = trigger instanceof HTMLAnchorElement ? trigger.href : ""
        saveOpenedRelease(filename, href)
      }
      root.addEventListener("click", onProviderClick, true)
      root.addEventListener("auxclick", onProviderClick, true)
      root.addEventListener("pointerover", onPointerOver)
      root.addEventListener("pointerout", onPointerOut)
      root.addEventListener("focusin", onFocusIn)
      root.addEventListener("focusout", onFocusOut)
      window.addEventListener("resize", positionTooltip)
      document.addEventListener("scroll", positionTooltip, true)
      return () => {
        root.removeEventListener("click", onProviderClick, true)
        root.removeEventListener("auxclick", onProviderClick, true)
        root.removeEventListener("pointerover", onPointerOver)
        root.removeEventListener("pointerout", onPointerOut)
        root.removeEventListener("focusin", onFocusIn)
        root.removeEventListener("focusout", onFocusOut)
        window.removeEventListener("resize", positionTooltip)
        document.removeEventListener("scroll", positionTooltip, true)
        window.cancelAnimationFrame(openFrame)
        window.clearTimeout(closeTimer)
        activeTrigger?.removeAttribute("aria-describedby")
        tooltip.remove()
      }
    }

    // src/hblinks/branding.js
    const LOGO_SVG = `<svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg"><g filter="url(#a)" clip-path="url(#c)"><rect x=".5" y=".358" width="44" height="44" rx="9.5" fill="#e67401"/><rect x="1.417" y="1.275" width="42.167" height="42.167" rx="8.583" stroke="url(#d)" stroke-width="1.833"/><path fill-rule="evenodd" clip-rule="evenodd" d="M17.244 22.054c-1.502-1.34-3.59-1.824-5.94-1.824v-5.872c3.003 0 6.8.596 9.847 3.313a12.3 12.3 0 0 1 2.141 2.506v-5.819c3.002 0 6.8.596 9.846 3.313C36.246 20.441 38 24.895 38 31.352h-5.871c0-5.438-1.457-8.014-2.898-9.298-1.494-1.333-3.57-1.82-5.905-1.824 1.738 2.709 2.686 6.374 2.686 11.122h-5.87c0-5.438-1.458-8.014-2.898-9.298m-5.848 1.723-.093-.059-.094.059c-.152.095-.422.264-.536.345a9.5 9.5 0 0 0-1.074.884C8.827 25.746 8 26.828 8 28.087c0 1.805 1.479 3.268 3.303 3.268s3.302-1.463 3.302-3.268c0-1.26-.827-2.34-1.598-3.081a9.5 9.5 0 0 0-1.074-.884c-.115-.081-.385-.25-.537-.345" fill="#fff"/></g><rect x=".431" y=".29" width="44.138" height="44.138" rx="9.569" stroke="#000" stroke-opacity=".6" stroke-width=".138"/><defs><linearGradient id="d" x1="22.5" y1=".358" x2="22.5" y2="44.358" gradientUnits="userSpaceOnUse"><stop stop-color="#f4820f"/><stop offset="1" stop-color="#d86600"/></linearGradient><clipPath id="c"><rect x=".5" y=".358" width="44" height="44" rx="9.5" fill="#fff"/></clipPath><filter id="a" x=".5" y="-17.517" width="44" height="61.875" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset dy="-17.875"/><feGaussianBlur stdDeviation="30"/><feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/><feColorMatrix values="0 0 0 0 0.901961 0 0 0 0 0.454902 0 0 0 0 0.00392157 0 0 0 0.2 0"/><feBlend in2="shape" result="effect1_innerShadow_467_3292"/></filter></defs></svg>`
    const LOGO_URI = `data:image/svg+xml,${encodeURIComponent(LOGO_SVG)}`
    const ensureHblinksBranding = () => {
      const brand = document.querySelector("#masthead .site-branding a")
      if (!brand || brand.querySelector(".userpatch-hblinks-logo")) {
        return
      }
      const logo = document.createElement("img")
      logo.className = "userpatch-hblinks-logo"
      logo.src = LOGO_URI
      logo.alt = ""
      logo.width = 38
      logo.height = 38
      brand.replaceChildren(logo, document.createTextNode("HUBLinks"))
    }

    // src/hblinks/page.js
    const isHblinksHost = () =>
      location.hostname.toLowerCase().replace(/^www\./, "") === "hblinks.lol"
    const isHblinksArchiveRoute = () =>
      isHblinksHost() && /^\/archives\/\d+\/?$/.test(location.pathname)
    const getHblinksEntryContent = () =>
      document.querySelector("main#main.site-main article.post .entry-content")
    const HUB_FAMILY_HOST_PATTERN = /(?:^|\.)hub[a-z]+\./
    const isHubFamilyAnchor = (anchor) => {
      try {
        return HUB_FAMILY_HOST_PATTERN.test(
          new URL(anchor.href).hostname.toLowerCase()
        )
      } catch {
        return false
      }
    }
    const collectHblinksRows = (content) =>
      Array.from(content.querySelectorAll("h2, h3, h4, h5, h6, p")).filter(
        (element) => {
          if (!/^H[2-6]$/.test(element.tagName) && element.tagName !== "P") {
            return false
          }
          const anchors = Array.from(
            element.querySelectorAll(":scope > a[href]")
          )
          if (!anchors.length) {
            return false
          }
          return (
            /\b(?:480p|720p|1080p|2160p|4k)\b/i.test(
              element.textContent || ""
            ) ||
            (anchors.every(isHubFamilyAnchor) &&
              (element.tagName !== "P" ||
                anchors.every((anchor) => anchor.querySelector("img"))))
          )
        }
      )
    const countRowLinks = (rows) =>
      rows.reduce(
        (count, row) => count + row.querySelectorAll(":scope > a[href]").length,
        0
      )
    const isEnoughHblinksRows = (rows) =>
      rows.length >= 2 && countRowLinks(rows) >= 3
    const isHblinksArchivePage = () => {
      if (
        !isHblinksArchiveRoute() ||
        !document.body?.classList.contains("single-post") ||
        !document.querySelector("#masthead.site-header")
      ) {
        return false
      }
      const content = getHblinksEntryContent()
      if (content?.dataset.userpatchHblinksReady === "true") {
        return true
      }
      if (!content) {
        return false
      }
      return isEnoughHblinksRows(collectHblinksRows(content))
    }
    const ensureHblinksPage = () => {
      const content = getHblinksEntryContent()
      if (!content) {
        return false
      }
      ensureHblinksBranding()
      if (content.dataset.userpatchHblinksReady === "true") {
        return true
      }
      const rows = collectHblinksRows(content)
      if (!isEnoughHblinksRows(rows)) {
        return false
      }
      const titleText = normalizeText(
        document.title
          .replace(/\s*[–—-]\s*HUBLinks\s*$/i, "")
          .replaceAll(/[._]+/g, " ")
      )
      const episodeMatch = titleText.match(/\bS(\d{1,2})E(\d{1,2})\b/i)
      const displayTitle =
        normalizeText(titleText.replace(/\bS\d{1,2}E\d{1,2}\b/i, "")) ||
        "Download options"
      const pageHeader = document.createElement("header")
      pageHeader.className = "userpatch-hblinks-titlebar"
      const title = document.createElement("h1")
      title.className = "userpatch-hblinks-title"
      title.textContent = displayTitle
      pageHeader.append(title)
      if (episodeMatch) {
        const episode = document.createElement("p")
        episode.className = "userpatch-hblinks-episode"
        const seasonLabel = document.createElement("span")
        seasonLabel.textContent = `Season ${Number(episodeMatch[1])}`
        const episodeLabel = document.createElement("span")
        episodeLabel.textContent = `Episode ${Number(episodeMatch[2])}`
        episode.append(seasonLabel, episodeLabel)
        pageHeader.append(episode)
      }
      const note = Array.from(content.children).find(
        (element) =>
          element.tagName === "P" &&
          /^note\b/i.test(normalizeText(element.textContent))
      )
      note?.remove()
      const options = document.createElement("div")
      options.className = "userpatch-hblinks-options"
      content.append(options)
      const getProviderLabel = (anchor) => {
        let hostname = ""
        try {
          hostname = new URL(anchor.href).hostname.toLowerCase()
        } catch {}
        if (hostname.endsWith("hubdrive.blog")) {
          return "Drive"
        }
        if (hostname.endsWith("hubcdn.club")) {
          return "Instant"
        }
        if (hostname.endsWith("hubcloud.pw")) {
          return "Direct"
        }
        return "Open link"
      }
      for (const row of rows) {
        const anchors = Array.from(row.querySelectorAll(":scope > a[href]"))
        const firstAnchor = anchors[0]
        let leadingText = ""
        for (const child of row.childNodes) {
          if (
            child === firstAnchor ||
            (child instanceof Element && child.contains(firstAnchor))
          ) {
            break
          }
          leadingText += child.textContent || ""
        }
        const heading = normalizeText(leadingText).replace(/[\s|–—:-]+$/, "")
        const isStandaloneLink = !heading
        const optionTitle = document.createElement("span")
        optionTitle.className = "userpatch-hblinks-option-title"
        optionTitle.textContent =
          heading ||
          normalizeText(firstAnchor.textContent) ||
          getHubProvider(firstAnchor.href, "")?.name ||
          getProviderLabel(firstAnchor)
        const actions = document.createElement("span")
        actions.className = "userpatch-hblinks-actions"
        const providerOrder = (anchor) => {
          const provider = getHubProvider(anchor.href, anchor.textContent)
          const index = HUB_PROVIDERS.indexOf(provider)
          return index < 0 ? HUB_PROVIDERS.length : index
        }
        anchors.sort((a, b) => providerOrder(a) - providerOrder(b))
        for (const anchor of anchors) {
          anchor.classList.add("userpatch-hblinks-action")
          const hubProvider = getHubProvider(anchor.href, anchor.textContent)
          if (hubProvider) {
            const image = document.createElement("img")
            image.src = hubProvider.logo
            image.alt = ""
            image.width = 36
            image.height = 36
            image.decoding = "async"
            anchor.replaceChildren(image)
            anchor.dataset.tooltip = hubProvider.name
            anchor.setAttribute("aria-label", hubProvider.name)
          } else if (isStandaloneLink) {
            anchor.textContent = getProviderLabel(anchor)
          }
          if (anchor.target === "_blank") {
            anchor.relList.add("noopener", "noreferrer")
          }
          actions.append(anchor)
        }
        row.classList.add("userpatch-hblinks-option-row")
        row.replaceChildren(optionTitle, actions)
        options.append(row)
      }
      for (const wrapper of content.querySelectorAll(":scope > div")) {
        if (
          !wrapper.querySelector("a, img") &&
          !normalizeText(wrapper.textContent)
        ) {
          wrapper.remove()
        }
      }
      content.prepend(pageHeader)
      for (const separator of content.querySelectorAll(":scope > hr")) {
        separator.remove()
      }
      content.dataset.userpatchHblinksReady = "true"
      setDetailTooltipCleanup(setupProviderTooltip(content))
      return true
    }

    // src/shared/cloudflare.js
    const isCloudflareChallenge = () => {
      try {
        return (
          /just a moment|attention required|checking your browser/i.test(
            document.title || ""
          ) ||
          Boolean(
            document.querySelector(
              "#challenge-running, #cf-challenge-running, #challenge-form, .cf-turnstile, [name='cf-turnstile-response'], script[src*='/cdn-cgi/challenge-platform/']"
            )
          )
        )
      } catch {
        return true
      }
    }

    // src/shared/loading-cover.mjs
    function installLoadingCover(force = false, timeoutMs = 8e3) {
      const root = document.documentElement
      if (!root) {
        let timeout = 0
        const pending = new MutationObserver(() => {
          if (document.documentElement) {
            pending.disconnect()
            window.clearTimeout(timeout)
            installLoadingCover(force, timeoutMs)
          }
        })
        pending.observe(document, { childList: true })
        timeout = window.setTimeout(() => pending.disconnect(), timeoutMs)
        window.addEventListener(
          "pagehide",
          () => {
            pending.disconnect()
            window.clearTimeout(timeout)
          },
          { once: true }
        )
        return null
      }
      const isChallenge = () =>
        /just a moment|attention required|checking your browser/i.test(
          document.title
        ) ||
        location.pathname.startsWith("/cdn-cgi/") ||
        Boolean(
          document.querySelector(
            "#challenge-form, #challenge-running, #cf-challenge-running, .cf-turnstile"
          )
        )
      if (isChallenge()) {
        return null
      }
      if (
        !force &&
        (!/(^|\.)(4khdhub|hdhub4u|hblinks|hubcloud|hubcdn)\./i.test(
          location.hostname
        ) ||
          /\.(mkv|mp4|avi|mov|webm|zip|rar|7z|iso|mp3|flac)$/i.test(
            location.pathname
          ))
      ) {
        return null
      }
      const existing = document.getElementById("userpatch-page-loader")
      if (existing) {
        return existing
      }
      let style = document.getElementById("userpatch-page-loader-style")
      if (!style) {
        style = document.createElement("style")
        style.id = "userpatch-page-loader-style"
        style.textContent = `
      html[data-userpatch-loading] { background: #0a0a0a !important; color-scheme: light dark !important; }
      /* Visibility alone can be overridden by the source's visible children.
         Opacity suppresses the entire body, including its white background. */
      html[data-userpatch-loading] > body {
        visibility: hidden !important;
        opacity: 0 !important;
        pointer-events: none !important;
      }
      #userpatch-page-loader {
        all: initial !important; position: fixed !important; inset: 0 !important;
        z-index: 2147483647 !important; display: grid !important;
        place-items: center !important; visibility: visible !important;
        background: #0a0a0a !important; color: #fafafa !important;
      }
      #userpatch-page-loader progress, progress.userpatch-loading-spinner {
        appearance: none !important; display: block !important;
        inline-size: 2rem !important; block-size: 2rem !important;
        box-sizing: border-box !important; margin: auto !important;
        border: 2px solid #444 !important; border-block-start-color: #fafafa !important;
        border-radius: 50% !important; background: transparent !important;
        animation: userpatch-loader-spin 1s linear infinite !important;
      }
      #userpatch-page-loader progress::-webkit-progress-bar,
      progress.userpatch-loading-spinner::-webkit-progress-bar { display: none; }
      #userpatch-page-loader progress::-moz-progress-bar,
      progress.userpatch-loading-spinner::-moz-progress-bar { background: transparent; }
      @keyframes userpatch-loader-spin { to { transform: rotate(360deg); } }
      @media (prefers-color-scheme: light) {
        html[data-userpatch-loading] { background: #ffffff !important; }
        #userpatch-page-loader { background: #ffffff !important; color: #0a0a0a !important; }
        #userpatch-page-loader progress, progress.userpatch-loading-spinner {
          border-color: #ddd !important;
          border-block-start-color: #0a0a0a !important;
        }
      }
      @media (prefers-reduced-motion: reduce) {
        #userpatch-page-loader progress, progress.userpatch-loading-spinner { animation-duration: 6s !important; }
      }
    `
        root.append(style)
      }
      const cover = document.createElement("div")
      cover.id = "userpatch-page-loader"
      cover.setAttribute("aria-busy", "true")
      const spinner = document.createElement("progress")
      spinner.setAttribute("aria-label", "Loading page")
      cover.append(spinner)
      root.dataset.userpatchLoading = ""
      root.append(cover)
      let timer = 0
      const cleanup = () => {
        delete root.dataset.userpatchLoading
        cover.remove()
        observer.disconnect()
        window.clearTimeout(timer)
      }
      const observer = new MutationObserver(() => {
        if (!Object.hasOwn(root.dataset, "userpatchLoading") || isChallenge()) {
          cleanup()
          return
        }
        if (!style.isConnected) {
          root.append(style)
        }
        if (!cover.isConnected) {
          root.append(cover)
        }
      })
      observer.observe(document, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["data-userpatch-loading"],
      })
      timer = window.setTimeout(cleanup, timeoutMs)
      window.addEventListener(
        "pagehide",
        () => {
          observer.disconnect()
          window.clearTimeout(timer)
        },
        { once: true }
      )
      window.addEventListener("pageshow", (event) => {
        if (event.persisted) {
          cleanup()
        }
      })
      return cover
    }

    // src/shared/page-loader.js
    const PAGE_LOADER_ID = "userpatch-page-loader"
    const PAGE_LOADER_HIDDEN_CLASS = "userpatch-page-loader-hidden"
    const PAGE_SPINNER_CLASS = "userpatch-page-spinner"
    let revealPending = false
    const showRedesignLoader = (hostPattern) => {
      if (hostPattern.test(location.hostname)) {
        installLoadingCover()
      }
    }
    const showInitialPageLoader = (guard, _buildSpinner, timeoutMs) => {
      if (guard()) {
        installLoadingCover(true, timeoutMs)
      }
    }
    const dismissPageLoader = (immediate = false) => {
      if (immediate) {
        delete document.documentElement?.dataset.userpatchLoading
        document.getElementById(PAGE_LOADER_ID)?.remove()
        revealPending = false
        return
      }
      if (revealPending || !document.getElementById("userpatch-page-loader")) {
        return
      }
      revealPending = true
      const reveal = () =>
        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => dismissPageLoader(true))
        })
      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", reveal, { once: true })
      } else {
        reveal()
      }
    }

    // src/shared/bootstrap.js
    let pageLoop = null
    const initPageLoop = (context) => {
      pageLoop = context
    }
    let pageObserver = null
    let waitTimer = 0
    let pageProcessingTimer = 0
    const stopWaiting = () => {
      if (pageObserver) {
        pageObserver.disconnect()
        pageObserver = null
      }
      if (waitTimer) {
        window.clearTimeout(waitTimer)
        waitTimer = 0
      }
      if (pageProcessingTimer) {
        window.clearTimeout(pageProcessingTimer)
        pageProcessingTimer = 0
      }
    }
    const runPageProcessing = () => {
      pageObserver?.disconnect()
      try {
        if (pageLoop.processPage()) {
          dismissPageLoader()
        }
        if (isCloudflareChallenge()) {
          stopWaiting()
        }
      } catch {
        dismissPageLoader(true)
      } finally {
        pageObserver?.observe(document, {
          attributes: true,
          attributeFilter: pageLoop.attributeFilter,
          characterData: pageLoop.characterData,
          childList: true,
          subtree: true,
        })
      }
    }
    const schedulePageProcessing = () => {
      if (pageProcessingTimer) {
        return
      }
      pageProcessingTimer = window.setTimeout(() => {
        pageProcessingTimer = 0
        runPageProcessing()
      }, 0)
    }
    const watchCurrentPage = () => {
      stopWaiting()
      pageObserver = new MutationObserver(schedulePageProcessing)
      waitTimer = window.setTimeout(() => {
        runPageProcessing()
        stopWaiting()
        dismissPageLoader()
      }, pageLoop.discoveryTimeoutMs)
      runPageProcessing()
    }

    // src/shared/site-discovery.js
    const discoverSite = (signature, start) => {
      let timeout = 0
      const observer = new MutationObserver(check)
      function check() {
        if (!signature()) {
          return
        }
        observer.disconnect()
        window.clearTimeout(timeout)
        start()
      }
      observer.observe(document, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["class"],
      })
      timeout = window.setTimeout(() => observer.disconnect(), 3e4)
      check()
      window.addEventListener(
        "pagehide",
        () => {
          observer.disconnect()
          window.clearTimeout(timeout)
        },
        { once: true }
      )
    }

    // src/shared/system-theme.js
    let preference = null
    const updateSystemTheme = () => {
      const root = document.documentElement
      if (!root || !Object.hasOwn(root.dataset, "userpatchTheme")) {
        return
      }
      const theme = preference.matches ? "dark" : "light"
      if (root.dataset.userpatchTheme !== theme) {
        root.dataset.userpatchTheme = theme
      }
      if (Object.hasOwn(root.dataset, "detailTheme")) {
        root.classList.toggle("dark", theme === "dark")
        root.classList.toggle("light", theme === "light")
        root.dataset.detailTheme = theme
      }
      for (const meta of document.querySelectorAll(
        'meta[id^="userpatch-"][name="theme-color"]'
      )) {
        meta.content = theme === "dark" ? "#0a0a0a" : "#ffffff"
      }
    }
    const ensureSystemTheme = () => {
      if (!preference) {
        preference = window.matchMedia("(prefers-color-scheme: dark)")
        preference.addEventListener("change", updateSystemTheme)
        window.addEventListener("pagehide", () => {
          preference.removeEventListener("change", updateSystemTheme)
        })
        window.addEventListener("pageshow", (event) => {
          if (event.persisted) {
            preference.addEventListener("change", updateSystemTheme)
            updateSystemTheme()
          }
        })
      }
      const theme = preference.matches ? "dark" : "light"
      document.documentElement.dataset.userpatchTheme = theme
      updateSystemTheme()
      return theme
    }
    const systemThemeCss = (legacyHsl = false) => {
      const light = {
        background: "1 0 0",
        foreground: "0.145 0 0",
        card: "1 0 0",
        "card-foreground": "0.145 0 0",
        popover: "1 0 0",
        "popover-foreground": "0.145 0 0",
        primary: "0.205 0 0",
        "primary-foreground": "0.985 0 0",
        secondary: "0.97 0 0",
        "secondary-foreground": "0.205 0 0",
        muted: "0.97 0 0",
        "muted-foreground": "0.556 0 0",
        accent: "0.97 0 0",
        "accent-foreground": "0.205 0 0",
        destructive: "0.577 0.245 27.325",
        border: "0.922 0 0",
        input: "0.922 0 0",
        ring: "0.708 0 0",
      }
      const hsl = {
        background: "0 0% 100%",
        foreground: "0 0% 3.94%",
        card: "0 0% 100%",
        "card-foreground": "0 0% 3.94%",
        popover: "0 0% 100%",
        "popover-foreground": "0 0% 3.94%",
        primary: "0 0% 9%",
        "primary-foreground": "0 0% 98%",
        secondary: "0 0% 96%",
        "secondary-foreground": "0 0% 9%",
        muted: "0 0% 96%",
        "muted-foreground": "0 0% 45%",
        accent: "0 0% 96%",
        "accent-foreground": "0 0% 9%",
        destructive: "0 72% 51%",
        border: "0 0% 90%",
        input: "0 0% 90%",
        ring: "0 0% 64%",
      }
      const tokens = Object.entries(light)
        .map(
          ([name, value]) =>
            `--maia-${name}: oklch(${value}) !important; --${name}: ${legacyHsl ? hsl[name] : `oklch(${value})`} !important;`
        )
        .join("\n")
      return `
    html.userpatch-maia, html[data-userpatch-theme] {
      color-scheme: light dark !important;
    }
    @media (prefers-color-scheme: light) {
      html.userpatch-maia, html[data-userpatch-theme] {
        ${tokens}
        --maia-control-surface: oklch(0.98 0 0 / 90%);
        --maia-control-border-opacity: 0.14;
        --maia-ongoing-orange: #c65a00;
        --maia-ongoing-gold: #d97706;
        --maia-ongoing-deep-orange: #b45309;
        --maia-ongoing-glow-opacity: 0.32;
        --maia-ongoing-glow-blur: 12px;
        --maia-ongoing-shadow: 0 0 12px rgb(198 90 0 / 0.28),
          0 0 24px rgb(180 83 9 / 0.18);
        --maia-hdhub-running-border: linear-gradient(135deg in oklch,
          #c2410c, #d63d32 52%, #b91c1c);
        --maia-hdhub-running-shadow: 0 0 12px rgb(194 65 12 / 0.28),
          0 0 24px rgb(185 28 28 / 0.18);
        --maia-selection-bg: linear-gradient(180deg in oklch,
          oklch(0.90 0 0), oklch(0.84 0 0));
        --maia-select-hover-bg: linear-gradient(180deg in oklch,
          oklch(0.87 0 0), oklch(0.81 0 0));
        --maia-selection-shadow: inset 0 1px 0 rgb(255 255 255 / 0.9),
          inset 0 0 0 1px rgb(0 0 0 / 0.12), 0 1px 2px rgb(0 0 0 / 0.06);
        --maia-glass-shadow: 0 1px 2px rgb(0 0 0 / 0.04),
          0 2px 6px rgb(0 0 0 / 0.02);
        --maia-card-depth-shadow: inset 0 1px 0 rgb(255 255 255 / 0.8),
          0 1px 3px rgb(0 0 0 / 0.08), 0 3px 8px rgb(0 0 0 / 0.04);
      }
      html.userpatch-maia .userpatch-media-badge img,
      html.userpatch-maia .userpatch-quality-tab img,
      html.userpatch-maia .userpatch-quality-filter img {
        filter: none !important;
      }
      html.userpatch-maia .userpatch-quality-tab:disabled img {
        filter: opacity(0.45) !important;
      }
    }
  `
    }

    // src/shared/styles.js
    let maiaStyles = null
    const initMaiaStyles = (context) => {
      maiaStyles = context
    }
    const MAIA_CLASS = "userpatch-maia"
    const FONT_STYLESHEET_URL =
      "https://cdn.jsdelivr.net/npm/@fontsource-variable/inter@5.3.0/index.css"
    const ensureStyles = () => {
      try {
        if (isCloudflareChallenge() || !maiaStyles.siteSignature()) {
          return false
        }
        const styleTarget = document.head || document.documentElement
        if (!styleTarget) {
          return false
        }
        if (maiaStyles.preInject) {
          maiaStyles.preInject()
        }
        const theme = ensureSystemTheme()
        if (!document.getElementById(maiaStyles.fontStyleId)) {
          const fontStylesheet = document.createElement("link")
          fontStylesheet.id = maiaStyles.fontStyleId
          fontStylesheet.rel = "stylesheet"
          fontStylesheet.href = FONT_STYLESHEET_URL
          fontStylesheet.crossOrigin = "anonymous"
          styleTarget.append(fontStylesheet)
        }
        if (document.head) {
          const ensureManagedMeta = (id, name, content) => {
            let meta = document.getElementById(id)
            if (!meta) {
              meta = document.querySelector(`meta[name="${name}"]`)
              if (meta) {
                meta.dataset.originalId = meta.id
                meta.id = id
                meta.dataset.originalContent = meta.content || ""
              } else {
                meta = document.createElement("meta")
                meta.id = id
                meta.name = name
                document.head.append(meta)
              }
            }
            meta.content = content
          }
          ensureManagedMeta(
            maiaStyles.colorSchemeMetaId,
            "color-scheme",
            "light dark"
          )
          ensureManagedMeta(
            maiaStyles.themeColorMetaId,
            "theme-color",
            theme === "dark" ? maiaStyles.themeColor : "#ffffff"
          )
          const viewportMeta = document.querySelector('meta[name="viewport"]')
          if (viewportMeta) {
            const current = viewportMeta.content || ""
            const tokens = current
              .split(",")
              .map((t) => t.trim())
              .filter(Boolean)
            const missing = [
              "viewport-fit=cover",
              "interactive-widget=resizes-content",
            ].filter((token) => !tokens.includes(token))
            if (missing.length) {
              if (viewportMeta.dataset.originalContent === undefined) {
                viewportMeta.dataset.originalContent = current
              }
              viewportMeta.content = [...tokens, ...missing].join(", ")
            }
          }
        }
        const existingStyle = document.getElementById(maiaStyles.styleId)
        if (existingStyle) {
          if (existingStyle.textContent !== maiaStyles.css) {
            existingStyle.textContent = maiaStyles.css
          }
          document.documentElement.classList.add(MAIA_CLASS)
          return true
        }
        const style = document.createElement("style")
        style.id = maiaStyles.styleId
        style.textContent = maiaStyles.css
        styleTarget.append(style)
        document.documentElement.classList.add(MAIA_CLASS)
        return true
      } catch {
        return false
      }
    }

    // src/hdhub4u/branding.js
    const makeSvgDataUri = (svg) =>
      `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
    const HEADER_WORDMARK_SVG = String.raw`<svg xmlns="http://www.w3.org/2000/svg" viewBox="10.435 7.939 224.971 68.462" width="260" height="82">
  <style>
    @media (prefers-color-scheme: light) {
      g[filter="url(#bevel-white)"] { fill: #202020; }
    }
  </style>
  <defs>
    <filter id="outer-shadow" filterUnits="userSpaceOnUse" x="-10" y="-10" width="280" height="102">
      <feMorphology in="SourceAlpha" operator="dilate" radius="1.35" result="haloMask"/>
      <feGaussianBlur in="SourceAlpha" stdDeviation="2.9" result="blur"/>
      <feOffset in="blur" dx="0" dy="1.3" result="offsetBlur"/>
      <feFlood flood-color="#000000" flood-opacity="0.28" result="shadowColor"/>
      <feComposite in="shadowColor" in2="offsetBlur" operator="in" result="softShadow"/>
      <feComposite in="softShadow" in2="haloMask" operator="out" result="maskedShadow"/>
      <feMerge>
        <feMergeNode in="maskedShadow"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    <filter id="bevel-red" filterUnits="userSpaceOnUse" x="-5" y="-5" width="270" height="92">
      <feOffset in="SourceAlpha" dx="-1.1" dy="1.1" result="offHL"/>
      <feComposite in="SourceAlpha" in2="offHL" operator="out" result="edgeHL"/>
      <feGaussianBlur in="edgeHL" stdDeviation="0.3" result="blurHL"/>
      <feComposite in="blurHL" in2="SourceAlpha" operator="in" result="clipHL"/>
      <feFlood flood-color="#ff857a" flood-opacity="0.9" result="colHL"/>
      <feComposite in="colHL" in2="clipHL" operator="in" result="highlight"/>
      <feOffset in="SourceAlpha" dx="1.1" dy="-1.1" result="offSH"/>
      <feComposite in="SourceAlpha" in2="offSH" operator="out" result="edgeSH"/>
      <feGaussianBlur in="edgeSH" stdDeviation="0.3" result="blurSH"/>
      <feComposite in="blurSH" in2="SourceAlpha" operator="in" result="clipSH"/>
      <feFlood flood-color="#7a0000" flood-opacity="0.72" result="colSH"/>
      <feComposite in="colSH" in2="clipSH" operator="in" result="bevelShadow"/>
      <feOffset in="SourceAlpha" dx="-0.65" dy="0.65" result="offRim"/>
      <feFlood flood-color="#261212" flood-opacity="0.58" result="colRim"/>
      <feComposite in="colRim" in2="offRim" operator="in" result="darkRim"/>
      <feMerge>
        <feMergeNode in="darkRim"/>
        <feMergeNode in="SourceGraphic"/>
        <feMergeNode in="bevelShadow"/>
        <feMergeNode in="highlight"/>
      </feMerge>
    </filter>
    <filter id="bevel-white" filterUnits="userSpaceOnUse" x="-5" y="-5" width="270" height="92">
      <feOffset in="SourceAlpha" dx="-1.1" dy="1.1" result="offHL"/>
      <feComposite in="SourceAlpha" in2="offHL" operator="out" result="edgeHL"/>
      <feGaussianBlur in="edgeHL" stdDeviation="0.3" result="blurHL"/>
      <feComposite in="blurHL" in2="SourceAlpha" operator="in" result="clipHL"/>
      <feFlood flood-color="#ffffff" flood-opacity="0.98" result="colHL"/>
      <feComposite in="colHL" in2="clipHL" operator="in" result="highlight"/>
      <feOffset in="SourceAlpha" dx="1.1" dy="-1.1" result="offSH"/>
      <feComposite in="SourceAlpha" in2="offSH" operator="out" result="edgeSH"/>
      <feGaussianBlur in="edgeSH" stdDeviation="0.3" result="blurSH"/>
      <feComposite in="blurSH" in2="SourceAlpha" operator="in" result="clipSH"/>
      <feFlood flood-color="#969696" flood-opacity="0.72" result="colSH"/>
      <feComposite in="colSH" in2="clipSH" operator="in" result="bevelShadow"/>
      <feOffset in="SourceAlpha" dx="-0.65" dy="0.65" result="offRim"/>
      <feFlood flood-color="#2b2525" flood-opacity="0.55" result="colRim"/>
      <feComposite in="colRim" in2="offRim" operator="in" result="darkRim"/>
      <feMerge>
        <feMergeNode in="darkRim"/>
        <feMergeNode in="SourceGraphic"/>
        <feMergeNode in="bevelShadow"/>
        <feMergeNode in="highlight"/>
      </feMerge>
    </filter>
    <filter id="bevel-orange" filterUnits="userSpaceOnUse" x="-5" y="-5" width="270" height="92">
      <feOffset in="SourceAlpha" dx="-0.95" dy="0.95" result="offHL"/>
      <feComposite in="SourceAlpha" in2="offHL" operator="out" result="edgeHL"/>
      <feGaussianBlur in="edgeHL" stdDeviation="0.22" result="blurHL"/>
      <feComposite in="blurHL" in2="SourceAlpha" operator="in" result="clipHL"/>
      <feFlood flood-color="#ffd200" flood-opacity="0.95" result="colHL"/>
      <feComposite in="colHL" in2="clipHL" operator="in" result="highlight"/>
      <feOffset in="SourceAlpha" dx="0.95" dy="-0.95" result="offSH"/>
      <feComposite in="SourceAlpha" in2="offSH" operator="out" result="edgeSH"/>
      <feGaussianBlur in="edgeSH" stdDeviation="0.22" result="blurSH"/>
      <feComposite in="blurSH" in2="SourceAlpha" operator="in" result="clipSH"/>
      <feFlood flood-color="#9e2a00" flood-opacity="0.78" result="colSH"/>
      <feComposite in="colSH" in2="clipSH" operator="in" result="bevelShadow"/>
      <feMerge>
        <feMergeNode in="SourceGraphic"/>
        <feMergeNode in="bevelShadow"/>
        <feMergeNode in="highlight"/>
      </feMerge>
    </filter>
  </defs>
  <g filter="url(#outer-shadow)">
    <path filter="url(#bevel-orange)" fill="#ff7800" d="M 12.0 11.1 C 12.0 10.1 12.7 9.5 13.6 9.5 H 50.8 C 51.8 9.5 52.4 10.1 52.4 11.05 C 52.4 12.0 51.8 12.6 50.8 12.6 H 15.1 V 36.8 C 15.1 37.8 14.5 38.4 13.55 38.4 C 12.6 38.4 12.0 37.8 12.0 36.8 Z"/>
    <g filter="url(#bevel-red)" fill="#d7201e" fill-rule="evenodd">
      <path d="M 24.4 20.8 H 33.4 V 33.8 H 45.0 V 24.3 L 41.5 20.8 H 50.8 V 65.4 L 45.0 67.4 V 39.8 H 33.4 V 65.4 L 27.8 67.4 V 24.3 Z"/>
      <path d="M 52.0 20.8 H 69.5 C 76.2 20.8 83.6 29.0 83.6 42.5 C 83.6 52.5 80.2 57.2 74.0 60.2 L 55.3 67.4 V 24.3 Z M 61.0 26.2 V 58.2 C 70.2 55.4 78.2 51.5 78.2 42.0 C 78.2 31.8 73.6 26.2 67.2 26.2 Z"/>
      <path d="M 188.9 20.8 H 190.2 V 53.6 H 192.8 Q 193.9 53.2 194.6 50.9 H 195.4 V 58.6 C 195.2 59.8 194.9 61.2 194.9 62.4 C 194.9 63.5 193.6 63.5 193.6 62.4 C 193.6 61.2 193.3 59.6 192.6 58.8 H 190.0 V 64.2 C 190.9 65.8 192.2 66.8 193.6 67.6 H 180.2 C 181.8 66.8 183.2 65.7 184.0 64.2 V 58.8 H 182.3 C 181.6 59.6 181.5 61.2 181.5 62.4 C 181.5 63.5 180.3 63.5 180.3 62.4 C 180.3 61.2 180.1 59.6 179.4 58.8 H 178.3 C 177.9 60.9 176.3 60.9 175.9 58.8 H 175.0 C 174.4 59.6 174.3 62.2 174.3 64.4 C 174.3 65.6 173.1 65.6 173.1 64.4 C 173.1 62.2 173.0 59.6 172.4 58.8 H 171.9 C 171.5 61.0 170.1 61.0 169.7 58.8 H 168.3 Z M 184.0 40.4 L 182.3 43.6 V 50.7 C 182.3 51.8 181.1 51.8 181.1 50.7 V 45.8 L 177.2 53.6 H 184.0 Z"/>
      <path d="M 198.2 29.2 H 206.8 V 48.6 L 217.8 44.8 V 29.2 H 224.2 V 54.3 L 217.8 56.6 V 51.4 L 201.2 56.6 V 33.0 Z"/>
    </g>
    <g filter="url(#bevel-white)" fill="#e0e0e0" fill-rule="evenodd">
      <path d="M 82.6 20.8 H 91.6 V 33.8 H 103.2 V 24.3 L 99.7 20.8 H 109.0 V 65.4 L 103.2 67.4 V 39.8 H 91.6 V 65.4 L 86.0 67.4 V 24.3 Z"/>
      <path d="M 110.2 29.2 H 118.8 V 48.6 L 129.8 44.8 V 29.2 H 136.2 V 54.3 L 129.8 56.6 V 51.4 L 113.2 56.6 V 33.0 Z"/>
      <path d="M 136.8 20.6 H 156.0 C 161.2 20.6 163.0 24.4 163.0 29.2 C 163.0 32.5 161.6 34.0 160.4 34.8 C 163.8 36.2 166.3 40.2 166.3 46.5 C 166.3 54.0 163.4 57.8 157.8 60.4 L 140.2 67.4 V 24.3 Z M 147.2 26.2 V 33.8 H 152.8 C 155.8 33.8 157.5 32.0 157.5 29.6 C 157.5 27.2 155.8 26.2 152.8 26.2 Z M 147.2 39.8 V 58.2 C 154.2 55.4 161.6 52.2 161.6 46.2 C 161.6 41.4 158.6 39.8 153.8 39.8 Z"/>
    </g>
    <path filter="url(#bevel-orange)" fill="#ff7800" d="M 232.2 47.2 C 233.15 47.2 233.75 47.8 233.75 48.75 V 73.2 C 233.75 74.2 233.1 74.8 232.15 74.8 H 198.6 C 197.6 74.8 197.0 74.2 197.0 73.25 C 197.0 72.3 197.6 71.7 198.6 71.7 H 230.65 V 48.75 C 230.65 47.8 231.25 47.2 232.2 47.2 Z"/>
  </g>
</svg>`
    const SITE_ICON_SVG = String.raw`<svg xmlns="http://www.w3.org/2000/svg" viewBox="3.442 15.457 185.245 159.194" width="192" height="192">
  <defs>
    <filter id="outer-shadow" filterUnits="userSpaceOnUse" x="-16" y="-16" width="224" height="224">
      <feMorphology in="SourceAlpha" operator="dilate" radius="2.0" result="haloMask"/>
      <feGaussianBlur in="SourceAlpha" stdDeviation="4.8" result="blur"/>
      <feOffset in="blur" dx="0" dy="2.2" result="offsetBlur"/>
      <feFlood flood-color="#000000" flood-opacity="0.28" result="shadowColor"/>
      <feComposite in="shadowColor" in2="offsetBlur" operator="in" result="softShadow"/>
      <feComposite in="softShadow" in2="haloMask" operator="out" result="maskedShadow"/>
      <feMerge>
        <feMergeNode in="maskedShadow"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    <filter id="bevel-red" filterUnits="userSpaceOnUse" x="-10" y="-10" width="212" height="212">
      <feOffset in="SourceAlpha" dx="-2.4" dy="2.4" result="offHL"/>
      <feComposite in="SourceAlpha" in2="offHL" operator="out" result="edgeHL"/>
      <feGaussianBlur in="edgeHL" stdDeviation="0.65" result="blurHL"/>
      <feComposite in="blurHL" in2="SourceAlpha" operator="in" result="clipHL"/>
      <feFlood flood-color="#ff857a" flood-opacity="0.9" result="colHL"/>
      <feComposite in="colHL" in2="clipHL" operator="in" result="highlight"/>
      <feOffset in="SourceAlpha" dx="2.4" dy="-2.4" result="offSH"/>
      <feComposite in="SourceAlpha" in2="offSH" operator="out" result="edgeSH"/>
      <feGaussianBlur in="edgeSH" stdDeviation="0.65" result="blurSH"/>
      <feComposite in="blurSH" in2="SourceAlpha" operator="in" result="clipSH"/>
      <feFlood flood-color="#7a0000" flood-opacity="0.72" result="colSH"/>
      <feComposite in="colSH" in2="clipSH" operator="in" result="bevelShadow"/>
      <feOffset in="SourceAlpha" dx="-1.3" dy="1.3" result="offRim"/>
      <feFlood flood-color="#261212" flood-opacity="0.58" result="colRim"/>
      <feComposite in="colRim" in2="offRim" operator="in" result="darkRim"/>
      <feMerge>
        <feMergeNode in="darkRim"/>
        <feMergeNode in="SourceGraphic"/>
        <feMergeNode in="bevelShadow"/>
        <feMergeNode in="highlight"/>
      </feMerge>
    </filter>
    <filter id="bevel-orange" filterUnits="userSpaceOnUse" x="-10" y="-10" width="212" height="212">
      <feOffset in="SourceAlpha" dx="-2.0" dy="2.0" result="offHL"/>
      <feComposite in="SourceAlpha" in2="offHL" operator="out" result="edgeHL"/>
      <feGaussianBlur in="edgeHL" stdDeviation="0.45" result="blurHL"/>
      <feComposite in="blurHL" in2="SourceAlpha" operator="in" result="clipHL"/>
      <feFlood flood-color="#ffd200" flood-opacity="0.95" result="colHL"/>
      <feComposite in="colHL" in2="clipHL" operator="in" result="highlight"/>
      <feOffset in="SourceAlpha" dx="2.0" dy="-2.0" result="offSH"/>
      <feComposite in="SourceAlpha" in2="offSH" operator="out" result="edgeSH"/>
      <feGaussianBlur in="edgeSH" stdDeviation="0.45" result="blurSH"/>
      <feComposite in="blurSH" in2="SourceAlpha" operator="in" result="clipSH"/>
      <feFlood flood-color="#9e2a00" flood-opacity="0.78" result="colSH"/>
      <feComposite in="colSH" in2="clipSH" operator="in" result="bevelShadow"/>
      <feMerge>
        <feMergeNode in="SourceGraphic"/>
        <feMergeNode in="bevelShadow"/>
        <feMergeNode in="highlight"/>
      </feMerge>
    </filter>
  </defs>
  <g filter="url(#outer-shadow)">
    <path filter="url(#bevel-orange)" fill="#ff7800" d="M 6.0 21.4 C 6.0 19.3 7.4 18.0 9.4 18.0 H 78.6 C 80.7 18.0 82.0 19.3 82.0 21.3 C 82.0 23.3 80.7 24.6 78.6 24.6 H 12.6 V 86.6 C 12.6 88.7 11.3 90.0 9.3 90.0 C 7.3 90.0 6.0 88.7 6.0 86.6 Z"/>
    <g filter="url(#bevel-red)" fill="#d7201e" fill-rule="evenodd">
      <path transform="translate(-31.5, -10.0) scale(2.25, 2.4)" d="M 24.4 20.8 H 33.4 V 33.8 H 45.0 V 24.3 L 41.5 20.8 H 50.8 V 65.4 L 45.0 67.4 V 39.8 H 33.4 V 65.4 L 27.8 67.4 V 24.3 Z"/>
      <path transform="translate(-21.0, -10.0) scale(2.25, 2.4)" d="M 52.0 20.8 H 69.5 C 76.2 20.8 83.6 29.0 83.6 42.5 C 83.6 52.5 80.2 57.2 74.0 60.2 L 55.3 67.4 V 24.3 Z M 61.0 26.2 V 58.2 C 70.2 55.4 78.2 51.5 78.2 42.0 C 78.2 31.8 73.6 26.2 67.2 26.2 Z"/>
    </g>
    <path filter="url(#bevel-orange)" fill="#ff7800" d="M 182.7 98.0 C 184.7 98.0 186.0 99.3 186.0 101.4 V 168.6 C 186.0 170.7 184.6 172.0 182.6 172.0 H 113.4 C 111.3 172.0 110.0 170.7 110.0 168.7 C 110.0 166.7 111.3 165.4 113.4 165.4 H 179.4 V 101.4 C 179.4 99.3 180.7 98.0 182.7 98.0 Z"/>
  </g>
</svg>`
    const HEADER_WORDMARK_DATA_URI = makeSvgDataUri(HEADER_WORDMARK_SVG)
    const SITE_ICON_DATA_URI = makeSvgDataUri(SITE_ICON_SVG)
    const applySiteBranding = () => {
      try {
        for (const iconLink of document.querySelectorAll('link[rel~="icon"]')) {
          if (iconLink.getAttribute("href") !== SITE_ICON_DATA_URI) {
            iconLink.type = "image/svg+xml"
            iconLink.removeAttribute("sizes")
            iconLink.setAttribute("href", SITE_ICON_DATA_URI)
          }
        }
      } catch {
        return false
      }
      return true
    }

    // src/hdhub4u/config.js
    const CONFIG = Object.freeze({
      themeColor: "#0a0a0a",
      pageDiscoveryTimeoutMs: 4e3,
      pageLoaderTimeoutMs: 4e3,
      mobileLayoutBreakpointRem: 52,
      searchPagePath: "/search.html",
      mobileMenuWidth: "280px",
      mobileMenuPopoverId: "userpatch-mobile-menu",
      mobileNavigationWidth: "260px",
      storageKeys: Object.freeze({
        detailTab: "userpatch-hdhub4u-detail-tab",
        movieQualityTab: "userpatch-hdhub4u-quality-tab",
        seriesTab: "userpatch-hdhub4u-series-tab",
        openedReleases: "userpatch-hdhub4u-opened-releases",
      }),
      mobileNavigationItems: Object.freeze([
        Object.freeze(["/", "Home"]),
        Object.freeze(["menu", "Menu"]),
        Object.freeze(["search", "Search"]),
      ]),
    })
    const STYLE_ID = "userpatch-hdhub4u-maia-style"
    const FONT_STYLE_ID = "userpatch-hdhub4u-inter-font"
    const COLOR_SCHEME_META_ID = "userpatch-hdhub4u-color-scheme"
    const THEME_COLOR_META_ID = "userpatch-hdhub4u-theme-color"
    const DETAIL_PAGE_CLASS = "userpatch-detail-page"
    const HBLINKS_PAGE_CLASS = "userpatch-hblinks-page"
    const LISTING_READY_CLASS = "userpatch-listing-ready"
    const KEEP_CLASS = "userpatch-keep"

    // src/hblinks/css.js
    const HBLINKS_CSS = `
/* HUBLinks archive pages share the same dark surfaces, spacing, and type. */
html.userpatch-maia.userpatch-hblinks-page,
html.userpatch-maia.userpatch-hblinks-page body {
  min-block-size: 100%;
  margin: 0 !important;
  background: var(--maia-background) !important;
}

html.userpatch-maia.userpatch-hblinks-page body {
  min-block-size: 100dvh;
}

html.userpatch-maia.userpatch-hblinks-page #page {
  inline-size: 100%;
  max-inline-size: 100%;
  min-block-size: 100dvh;
  margin: 0;
  background: transparent;
}

/* The brand sits centered above the title, and the
   zeroed margins keep it from collapsing a gap through #page at the top. */
html.userpatch-maia.userpatch-hblinks-page #masthead.site-header {
  position: static;
  z-index: auto;
  inline-size: 100% !important;
  max-inline-size: 42rem !important;
  margin: 0 auto;
  padding: 1.25rem 1rem 0.5rem !important;
  border: 0;
  background: transparent;
}

html.userpatch-maia.userpatch-hblinks-page #masthead #header-top {
  display: flex;
  inline-size: 100% !important;
  min-block-size: 0;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin: 0 !important;
  padding: 0;
  border: 0;
  border-radius: 0;
  background: transparent;
  box-shadow: none;
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
}

html.userpatch-maia.userpatch-hblinks-page #masthead #header-middle {
  display: none !important;
}

html.userpatch-maia.userpatch-hblinks-page #masthead .site-branding,
html.userpatch-maia.userpatch-hblinks-page #masthead .site-branding a {
  margin: 0;
  /* Brand sizing matches the HubCloud redesign header. */
  color: var(--maia-foreground) !important;
  font-size: 1.35rem !important;
  font-weight: 700 !important;
  letter-spacing: -0.025em;
  text-decoration: none;
}

html.userpatch-maia.userpatch-hblinks-page #masthead .site-branding :is(p, h1, h2) {
  margin: 0;
  text-align: center;
}

html.userpatch-maia.userpatch-hblinks-page #masthead :is(.site-description, .social-top) {
  display: none !important;
}

html.userpatch-maia.userpatch-hblinks-page #masthead .menu-toggle-container {
  display: none !important;
}

html.userpatch-maia.userpatch-hblinks-page #content {
  display: block !important;
  inline-size: 100% !important;
  max-inline-size: 42rem !important;
  margin-inline: auto;
  padding-inline: calc(clamp(0.75rem, 3vw, 1.25rem) + 0.25rem) !important;
}

html.userpatch-maia.userpatch-hblinks-page #primary.content-area {
  inline-size: 100% !important;
  max-inline-size: 42rem !important;
  min-inline-size: 0;
  flex: 1 1 auto;
  margin-inline: auto;
}

html.userpatch-maia.userpatch-hblinks-page main.site-main {
  inline-size: 100% !important;
  max-inline-size: 42rem !important;
  margin: 0 auto !important;
  padding: 0;
}

html.userpatch-maia.userpatch-hblinks-page main.site-main > article.post {
  overflow: visible;
  inline-size: 100%;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 0;
  background: transparent;
  color: var(--maia-foreground);
  box-shadow: none;
}

html.userpatch-maia.userpatch-hblinks-page .entry-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 0 !important;
  padding: 0;
  border: 0 !important;
  background: transparent !important;
  color: var(--maia-foreground);
}

html.userpatch-maia.userpatch-hblinks-page .userpatch-hblinks-titlebar {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  margin: 0;
  text-align: start;
}

html.userpatch-maia.userpatch-hblinks-page .userpatch-hblinks-title {
  margin: 0;
  color: var(--maia-foreground) !important;
  font-size: 1.125rem !important;
  font-weight: 400 !important;
  font-family: inherit !important;
  letter-spacing: -0.025em;
  line-height: 1.45;
  overflow-wrap: anywhere;
}

html.userpatch-maia.userpatch-hblinks-page .userpatch-hblinks-episode {
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
  margin: 0;
}

html.userpatch-maia.userpatch-hblinks-page .userpatch-hblinks-episode span {
  display: inline-flex;
  min-block-size: 1.75rem;
  align-items: center;
  padding-inline: 0.625rem;
  border: 1px solid var(--maia-border);
  border-radius: 9999px;
  background: var(--maia-muted);
  color: var(--maia-muted-foreground);
  font-size: 0.8125rem !important;
  line-height: 1;
}

html.userpatch-maia.userpatch-hblinks-page .userpatch-hblinks-options {
  inline-size: 100%;
  min-inline-size: 0;
  box-sizing: border-box;
  margin: 0 !important;
  padding: 0 !important;
  border-block-start: 1px solid var(--maia-border);
}

html.userpatch-maia.userpatch-hblinks-page .userpatch-hblinks-option-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: 0.75rem 1rem;
  margin: 0 !important;
  padding: 16px 0 !important;
  min-block-size: 4rem;
  min-inline-size: 0;
  border: 0 !important;
  border-block-end: 1px solid var(--maia-border) !important;
  background: transparent !important;
  color: var(--maia-foreground) !important;
  font-size: 1rem !important;
  font-weight: 500 !important;
  /* The theme's display font stylizes digits ("480p" becomes glyph soup);
     the list reads like 4KHDHub's rows, so it uses the clean sans stack. */
  font-family: "Inter Variable", ui-sans-serif, system-ui, -apple-system,
    BlinkMacSystemFont, "Segoe UI", sans-serif !important;
  line-height: 1.4;
  text-align: start !important;
}

html.userpatch-maia.userpatch-hblinks-page .userpatch-hblinks-option-title {
  min-inline-size: 0;
  overflow-wrap: anywhere;
  font-family: ui-sans-serif, system-ui, sans-serif !important;
}

html.userpatch-maia.userpatch-hblinks-page .userpatch-hblinks-actions {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: flex-end;
  gap: 0.75rem;
}

/* Flat icon actions like the 4KHDHub release rows: no pill chrome, the
   provider mark is the button. */
html.userpatch-maia.userpatch-hblinks-page a.userpatch-hblinks-action {
  display: inline-flex;
  min-inline-size: 2.75rem;
  min-block-size: 2.75rem;
  align-items: center;
  justify-content: center;
  padding: 0 !important;
  border: 0 !important;
  border-radius: 0 !important;
  background: transparent !important;
  color: var(--maia-foreground) !important;
  font-size: 0.875rem !important;
  font-weight: 500;
  line-height: 1;
  text-decoration: none !important;
  overflow: visible !important;
  transition:
    opacity 140ms ease,
    transform 140ms var(--ease-out);
}

@media (hover: hover) and (pointer: fine) {
  html.userpatch-maia.userpatch-hblinks-page a.userpatch-hblinks-action:hover {
    opacity: 0.78;
  }
}

html.userpatch-maia.userpatch-hblinks-page a.userpatch-hblinks-action:active {
  transform: scale(0.95);
}

html.userpatch-maia.userpatch-hblinks-page a.userpatch-hblinks-action img {
  display: block !important;
  margin: 0 !important;
  inline-size: 36px !important;
  block-size: 36px !important;
  object-fit: contain;
}

@media (max-width: 40rem) {
  html.userpatch-maia.userpatch-hblinks-page #content {
    padding-inline: calc(clamp(0.75rem, 3vw, 1.25rem) + 0.25rem) !important;
  }

}

html.userpatch-maia.userpatch-hblinks-page #content {
  margin-block: 0 !important;
  box-sizing: border-box;
  padding-block: 1rem 0.5rem !important;
}
html.userpatch-maia.userpatch-hblinks-page :is(#secondary, #colophon, .entry-header, .entry-footer, .post-navigation, #comments) {
  display: none !important;
}
html.userpatch-maia.userpatch-hblinks-page #masthead .site-branding a {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.65rem;
  font-family: "Inter Variable", ui-sans-serif, system-ui, sans-serif !important;
  line-height: 38px;
}
html.userpatch-maia.userpatch-hblinks-page #masthead .userpatch-hblinks-logo {
  display: block;
  inline-size: 38px;
  block-size: 38px;
  flex: none;
  margin: 0;
}
html.userpatch-maia.userpatch-hblinks-page #page > br {
  display: none !important;
}
`

    // src/shared/detail-info.js
    const createDetailInfoList = (entries) => {
      const list = document.createElement("dl")
      list.className = "userpatch-info-list"
      list.id = "userpatch-detail-info-list"
      const seen = new Set()
      for (const [label, rawValue] of entries) {
        const value = (rawValue || "").trim().replaceAll(/\s+/g, " ")
        if (!value || seen.has(label)) {
          continue
        }
        seen.add(label)
        const term = document.createElement("dt")
        term.textContent = `${label}:`
        const description = document.createElement("dd")
        description.textContent = value
        list.append(term, description)
      }
      return list
    }
    const DETAIL_INFO_CSS = `
html.userpatch-maia.userpatch-detail-page body .userpatch-detail-info {
  container: detail-info / inline-size;
  margin: 0 !important;
  padding: 0 !important;
  border: 0 !important;
  background: transparent !important;
  box-shadow: none !important;
}

html.userpatch-maia.userpatch-detail-page body .userpatch-detail-info #userpatch-detail-info-list {
  display: grid;
  grid-template-columns: max-content minmax(0, 1fr);
  align-items: baseline;
  gap: 0.65rem 0.5rem;
  margin: 0;
  padding: 0;
  font-family: "Inter Variable", ui-sans-serif, system-ui, sans-serif !important;
  font-style: normal !important;
  font-size: 14px !important;
  line-height: 1.45;
  text-align: start;
}
html.userpatch-maia.userpatch-detail-page body .userpatch-detail-info #userpatch-detail-info-list > dt {
  margin: 0;
  padding: 0;
  font-family: inherit !important;
  font-style: normal !important;
  font-size: inherit !important;
  line-height: inherit !important;
  font-weight: 400 !important;
  color: var(--maia-foreground) !important;
  -webkit-text-fill-color: currentColor !important;
}
html.userpatch-maia.userpatch-detail-page body .userpatch-detail-info #userpatch-detail-info-list > dd {
  min-inline-size: 0;
  margin: 0;
  padding: 0;
  font-family: inherit !important;
  font-style: normal !important;
  font-size: inherit !important;
  line-height: inherit !important;
  font-weight: 400 !important;
  color: var(--maia-muted-foreground) !important;
  -webkit-text-fill-color: currentColor !important;
  overflow-wrap: anywhere;
}
/* The site's late label formatter inserts styled spans into our terms.
   Keep their text consistent with the term even after that formatter runs. */
html.userpatch-maia.userpatch-detail-page body .userpatch-detail-info #userpatch-detail-info-list > :is(dt, dd) :where(*) {
  color: inherit !important;
  -webkit-text-fill-color: currentColor !important;
  font-family: inherit !important;
  font-size: inherit !important;
  font-style: inherit !important;
  font-weight: inherit !important;
  line-height: inherit !important;
}
@media (min-width: 761px) {
  html.userpatch-maia.userpatch-detail-page body .userpatch-detail-info #userpatch-detail-info-list {
    font-size: 18px !important;
  }
}
@container detail-info (max-width: 36rem) {
  html.userpatch-maia.userpatch-detail-page body .userpatch-detail-info #userpatch-detail-info-list {
    grid-template-columns: minmax(0, 1fr);
    row-gap: 0.25rem;
  }
  html.userpatch-maia.userpatch-detail-page body .userpatch-detail-info #userpatch-detail-info-list > dd:not(:last-child) {
    margin-block-end: 0.875rem;
  }
}
html.userpatch-maia .userpatch-mode-tab svg,
html.userpatch-maia.userpatch-detail-page .userpatch-detail-tabs .userpatch-quality-tab svg {
  width: 1rem !important;
  height: 1rem !important;
  inline-size: 1rem !important;
  block-size: 1rem !important;
  flex: 0 0 1rem !important;
}
`

    // src/shared/progressive-images.js
    const preparedImages = new WeakSet()
    const pendingImages = new Map()
    let imageObserver = null
    const getSmallImageUrl = (source) => {
      try {
        const url = new URL(source, location.href)
        if (
          url.hostname === "image.tmdb.org" &&
          /^\/t\/p\/(w\d+|original)\//.test(url.pathname)
        ) {
          url.pathname = url.pathname.replace(/^\/t\/p\/[^/]+\//, "/t/p/w92/")
          return url.href
        }
      } catch {}
      return source
    }
    const setupProgressiveImage = (img, highResUrl) => {
      if (!(img instanceof HTMLImageElement) || preparedImages.has(img)) {
        return
      }
      preparedImages.add(img)
      img.classList.add("userpatch-progressive-image")
      img.draggable = false
      img.decoding = "async"
      const original = img.src
      const full = highResUrl || original
      const finish = () => img.classList.add("userpatch-image-loaded")
      if (img.complete && img.naturalWidth && full === original) {
        finish()
        return
      }
      const start = () => {
        const small =
          highResUrl || img.srcset ? original : getSmallImageUrl(original)
        let upgrading = false
        const upgrade = () => {
          if (upgrading) {
            return
          }
          upgrading = true
          img.removeEventListener("load", upgrade)
          img.removeEventListener("error", upgrade)
          const high = new Image()
          high.decoding = "async"
          high.fetchPriority = img.fetchPriority
          high.addEventListener(
            "load",
            async () => {
              try {
                await high.decode()
              } catch {}
              if (img.isConnected) {
                img.src = full
                finish()
              }
            },
            { once: true }
          )
          high.addEventListener("error", finish, { once: true })
          high.src = full
        }
        if (small !== full) {
          img.addEventListener("load", upgrade, { once: true })
          img.addEventListener("error", upgrade, { once: true })
          img.src = small
          if (img.complete && img.naturalWidth) {
            img.removeEventListener("load", upgrade)
            img.removeEventListener("error", upgrade)
            upgrade()
          }
        } else if (img.complete && img.naturalWidth) {
          finish()
        } else {
          img.addEventListener("load", finish, { once: true })
          img.addEventListener("error", finish, { once: true })
        }
      }
      if (img.loading === "lazy" && "IntersectionObserver" in window) {
        imageObserver ||= new IntersectionObserver(
          (entries) => {
            for (const entry of entries) {
              if (entry.isIntersecting) {
                imageObserver.unobserve(entry.target)
                pendingImages.get(entry.target)?.()
                pendingImages.delete(entry.target)
              }
            }
          },
          { rootMargin: "200px" }
        )
        pendingImages.set(img, start)
        imageObserver.observe(img)
      } else {
        start()
      }
    }
    const PROGRESSIVE_IMAGE_CSS = `
html.userpatch-maia img.userpatch-progressive-image {
  filter: blur(10px) !important;
  opacity: 0.85;
  transition: filter 280ms ease, opacity 280ms ease !important;
}
html.userpatch-maia img.userpatch-progressive-image.userpatch-image-loaded {
  filter: none !important;
  opacity: 1 !important;
}
@media (prefers-reduced-motion: reduce) {
  html.userpatch-maia img.userpatch-progressive-image { transition: none !important; }
}
`
    window.addEventListener("pagehide", () => imageObserver?.disconnect())
    window.addEventListener("pageshow", (event) => {
      if (event.persisted) {
        for (const image of pendingImages.keys()) {
          if (image.isConnected) {
            imageObserver?.observe(image)
          } else {
            pendingImages.delete(image)
          }
        }
      }
    })

    // src/shared/trailer.js
    const findTrailerUrl = (root) => {
      const candidate =
        root.querySelector("[data-trailer-url]")?.dataset.trailerUrl
      const links = Array.from(root.querySelectorAll("a[href]"))
        .filter((link) => /trailer/i.test(link.textContent))
        .map((link) => link.href)
      const frames = Array.from(root.querySelectorAll("iframe[src]")).map(
        (frame) => frame.getAttribute("src")
      )
      for (const source of [candidate, ...links, ...frames]) {
        try {
          const url = new URL(source, location.href)
          let id = ""
          if (
            /^(www\.)?(youtube\.com|youtube-nocookie\.com)$/.test(url.hostname)
          ) {
            id =
              url.searchParams.get("v") ||
              url.pathname.match(/^\/(?:embed|shorts)\/([^/]+)/)?.[1] ||
              ""
          } else if (url.hostname === "youtu.be") {
            id = url.pathname.slice(1)
          }
          if (/^[\w-]{11}$/.test(id)) {
            return `https://www.youtube-nocookie.com/embed/${id}`
          }
          if (/^(?:player\.)?vimeo\.com$/.test(url.hostname)) {
            const video = url.pathname.match(/^\/(?:video\/)?(\d+)\/?$/)?.[1]
            if (video) {
              return `https://player.vimeo.com/video/${video}`
            }
          }
        } catch {}
      }
      return null
    }
    const createTrailer = (url) => {
      if (!url) {
        return null
      }
      const section = document.createElement("div")
      section.className = "userpatch-trailer"
      const frame = document.createElement("div")
      frame.className = "userpatch-trailer-frame"
      const player = document.createElement("iframe")
      player.src = url
      player.title = "Trailer"
      player.loading = "lazy"
      player.allow = "encrypted-media; fullscreen; picture-in-picture"
      player.allowFullscreen = true
      player.referrerPolicy = "strict-origin-when-cross-origin"
      frame.append(player)
      section.append(frame)
      return section
    }
    const TRAILER_CSS = `
html.userpatch-maia .userpatch-detail-info .userpatch-trailer {
  display: block;
  inline-size: 100%;
  margin: 1.5rem 0 0 !important;
  padding: 0 !important;
  border: 0 !important;
  border-radius: 0 !important;
  background: transparent !important;
  box-shadow: none !important;
}
@media (min-width: 52.01rem) {
  html.userpatch-maia .userpatch-detail-info .userpatch-trailer {
    max-inline-size: 640px;
  }
}
html.userpatch-maia .userpatch-trailer-frame {
  aspect-ratio: 16 / 9;
  inline-size: 100%;
  overflow: clip;
  border: 0 !important;
  box-shadow: none !important;
  border-radius: 1rem;
  background: var(--maia-card);
}
html.userpatch-maia .userpatch-trailer-frame > iframe {
  display: block !important;
  position: static !important;
  inline-size: 100% !important;
  block-size: 100% !important;
  margin: 0 !important;
  padding: 0 !important;
  border: 0 !important;
}
`

    // src/hdhub4u/images.js
    const recoveredPosters = new WeakSet()
    const setupPosterRecovery = (image) => {
      if (recoveredPosters.has(image)) {
        return
      }
      recoveredPosters.add(image)
      let retried = false
      const parent = image.parentElement
      const showFallback = () => {
        if (!parent || parent.querySelector(".userpatch-poster-fallback")) {
          return
        }
        const fallback = document.createElement("span")
        fallback.className = "userpatch-poster-fallback"
        fallback.textContent = "Poster unavailable"
        parent.classList.add("userpatch-poster-missing")
        parent.append(fallback)
      }
      const failed = () => {
        if (!retried) {
          retried = true
          try {
            const url = new URL(image.currentSrc || image.src)
            if (
              url.hostname === "myimg.bid" &&
              url.pathname.startsWith("/images/")
            ) {
              url.hostname = "myimg.click"
              image.removeAttribute("srcset")
              image.src = url.href
              return
            }
          } catch {}
        }
        showFallback()
      }
      image.addEventListener("error", failed)
      image.addEventListener("load", () => {
        parent?.classList.remove("userpatch-poster-missing")
        parent?.querySelector(".userpatch-poster-fallback")?.remove()
      })
      if (image.complete && !image.naturalWidth) {
        failed()
      }
    }
    const POSTER_RECOVERY_CSS = `
html.userpatch-maia li.thumb .userpatch-poster-missing {
  position: relative;
}
html.userpatch-maia li.thumb .userpatch-poster-missing > img {
  visibility: hidden !important;
}
html.userpatch-maia li.thumb .userpatch-poster-fallback {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  padding: 1rem;
  text-align: center;
  background: var(--maia-card);
  color: var(--maia-muted-foreground);
  font: 400 0.875rem/1.45 "Inter Variable", ui-sans-serif, system-ui, sans-serif;
}
`

    // src/hdhub4u/landing.js
    const isLandingPage = () =>
      Boolean(
        document.querySelector("#xwrapper .mwh-logox a.new-tab img") &&
        document.querySelector("#action-button a.new-tab") &&
        document.querySelector("#stx")
      ) || Boolean(document.getElementById("userpatch-landing"))
    const ensureLandingPage = () => {
      document.documentElement.classList.add("userpatch-landing-page")
      if (!document.getElementById("userpatch-landing")) {
        const action = document.querySelector("#action-button a.new-tab")
        const brand = document.querySelector(".mwh-logox a.new-tab")
        const status = document.getElementById("stx")
        if (!action || !brand || !status) {
          return false
        }
        const root = document.createElement("main")
        root.id = "userpatch-landing"
        const image = document.createElement("img")
        image.src = HEADER_WORDMARK_DATA_URI
        image.alt = "HDHub4u"
        image.width = 180
        image.height = 55
        brand.replaceChildren(image)
        brand.classList.add("userpatch-landing-brand")
        for (const control of [brand, action]) {
          control.setAttribute("role", "button")
          control.tabIndex = 0
          control.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault()
              control.click()
            }
          })
        }
        const label = document.createElement("span")
        label.textContent = "View Full Site"
        action.replaceChildren(createLucideIcon("external-link"), label)
        action.classList.add("userpatch-landing-action")
        const header = document.createElement("header")
        header.append(brand)
        const footer = document.createElement("footer")
        const copyright = document.querySelector(".copyright")
        if (copyright) {
          footer.append(copyright)
        }
        root.append(header, action, status, footer)
        document.body.append(root)
      }
      const footer = document.querySelector("#userpatch-landing footer")
      const copyright = document.querySelector("#xwrapper .copyright")
      if (footer && copyright) {
        footer.append(copyright)
      }
      watchRefreshNotice()
      return true
    }
    let refreshObserver = null
    let lifecycleBound = false
    const normalizeRefreshNotice = () => {
      for (const notice of document.querySelectorAll("body > div")) {
        if (
          notice.textContent.trim() ===
            "New version available! Click to refresh" &&
          (notice.style.position === "fixed" ||
            notice.classList.contains("userpatch-landing-refresh"))
        ) {
          notice.classList.add("userpatch-landing-refresh")
          notice.setAttribute("role", "button")
          notice.tabIndex = 0
          if (!notice.dataset.userpatchKeyboard) {
            notice.dataset.userpatchKeyboard = "true"
            notice.addEventListener("keydown", (event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault()
                notice.click()
              }
            })
          }
        }
      }
    }
    const watchRefreshNotice = () => {
      normalizeRefreshNotice()
      if (refreshObserver) {
        return
      }
      refreshObserver = new MutationObserver(normalizeRefreshNotice)
      refreshObserver.observe(document.body, { childList: true })
      if (!lifecycleBound) {
        lifecycleBound = true
        window.addEventListener("pagehide", () => {
          refreshObserver?.disconnect()
          refreshObserver = null
        })
        window.addEventListener("pageshow", (event) => {
          if (event.persisted) {
            watchRefreshNotice()
          }
        })
      }
    }
    const LANDING_CSS = `
html.userpatch-landing-page body {
  display: block !important;
  min-block-size: 100dvh !important;
  margin: 0 !important;
  background: var(--maia-background) !important;
}
html.userpatch-landing-page #xwrapper { display: none !important; }
html.userpatch-landing-page #userpatch-landing {
  display: flex;
  flex-direction: column;
  inline-size: 100%;
  max-inline-size: 42rem;
  min-block-size: 100dvh;
  box-sizing: border-box;
  margin-inline: auto;
  padding: 1.25rem 1.5rem;
  gap: 1rem;
  font-family: "Inter Variable", ui-sans-serif, system-ui, sans-serif !important;
}
html.userpatch-landing-page #userpatch-landing > header {
  min-block-size: 46px;
}
html.userpatch-landing-page .userpatch-landing-brand {
  display: flex;
  justify-content: center;
  margin: 0;
}
html.userpatch-landing-page .userpatch-landing-brand img {
  display: block;
  inline-size: 180px;
  block-size: 38px;
  object-fit: contain;
}
html.userpatch-landing-page #userpatch-landing .userpatch-landing-action {
  display: flex !important;
  align-items: center;
  justify-content: center;
  gap: 0.65rem;
  min-block-size: 56px;
  padding: 0.75rem 1rem !important;
  border: 1px solid rgb(255 255 255 / 14%) !important;
  border-radius: 0.625rem !important;
  background: #0051c3 !important;
  color: #fff !important;
  box-shadow: inset 0 1px 0 rgb(255 255 255 / 22%), 0 1px 2px rgb(0 0 0 / 24%) !important;
  font: 400 18px/1.45 "Inter Variable", ui-sans-serif, system-ui, sans-serif !important;
  text-decoration: none !important;
  transform: none !important;
  cursor: pointer;
}
html.userpatch-landing-page #userpatch-landing .userpatch-landing-action > span {
  font: inherit !important;
}
html.userpatch-landing-page .userpatch-landing-action svg {
  inline-size: 20px; block-size: 20px; flex: none;
}
html.userpatch-landing-page #userpatch-landing footer {
  margin-block-start: auto !important;
  padding-block-start: 1rem;
  text-align: center !important;
}
html.userpatch-landing-page #userpatch-landing .copyright {
  margin: 0 !important;
  text-align: center !important;
  color: var(--maia-muted-foreground) !important;
}
html.userpatch-landing-page #stx { display: none !important; }
html.userpatch-landing-page #stx { text-align: center; }
html.userpatch-landing-page #stx h5 { margin: 0 !important; }
html.userpatch-landing-page .userpatch-landing-refresh {
  position: static !important;
  max-inline-size: 39rem;
  box-sizing: border-box;
  margin: 1rem auto !important;
  padding: 0.75rem 1rem !important;
  border: 1px solid var(--maia-border);
  border-radius: 0.625rem;
  background: var(--maia-secondary) !important;
  color: var(--maia-foreground) !important;
  text-align: center;
}
html.userpatch-landing-page :is(.userpatch-landing-action, .userpatch-landing-refresh):focus-visible {
  outline: 2px solid currentColor !important;
  outline-offset: 3px;
}
@media (hover: hover) and (pointer: fine) {
  html.userpatch-landing-page .userpatch-landing-action:hover {
    filter: brightness(1.06);
  }
}
`

    // src/hdhub4u/screenshot-viewer.js
    let viewer = null
    const resetScreenshotViewer = () => {
      if (viewer?.open) {
        viewer.close()
      }
      viewer?.remove()
      viewer = null
    }
    const openScreenshotViewer = (source, alt, fallback) => {
      if (!viewer) {
        viewer = document.createElement("dialog")
        viewer.className = "userpatch-screenshot-viewer"
        viewer.setAttribute("aria-label", "Screenshot viewer")
        const close = document.createElement("button")
        close.type = "button"
        close.autofocus = true
        close.setAttribute("aria-label", "Close fullscreen screenshot")
        const image = document.createElement("img")
        image.decoding = "async"
        image.addEventListener("error", () => {
          const fallbackUrl = image.dataset.fallback
          if (fallbackUrl && image.src !== fallbackUrl) {
            image.src = fallbackUrl
          }
        })
        close.append(image)
        close.addEventListener("click", () => viewer.close())
        viewer.append(close)
        document.body.append(viewer)
      }
      const image = viewer.querySelector("img")
      image.alt = alt || "Screenshot"
      image.dataset.fallback = fallback || ""
      image.src = source
      viewer.showModal()
    }
    const SCREENSHOT_VIEWER_CSS = `
html.userpatch-maia dialog.userpatch-screenshot-viewer {
  position: fixed; inset: 0; inline-size: 100%; block-size: 100dvh;
  max-inline-size: none; max-block-size: none; margin: 0; padding: 0;
  border: 0; background: #0a0a0a; color: #fafafa;
}
html.userpatch-maia dialog.userpatch-screenshot-viewer:modal { overscroll-behavior: contain; }
html.userpatch-maia dialog.userpatch-screenshot-viewer::backdrop {
  background: #0a0a0a; overflow: hidden; overscroll-behavior: contain;
}
html.userpatch-maia dialog.userpatch-screenshot-viewer button {
  display: grid; place-items: center; inline-size: 100%; block-size: 100%;
  max-inline-size: none; margin: 0; padding: 0; border: 0; border-radius: 0;
  background: transparent; cursor: zoom-out;
}
html.userpatch-maia dialog.userpatch-screenshot-viewer button:focus-visible {
  outline: 2px solid #fafafa; outline-offset: -4px;
}
html.userpatch-maia dialog.userpatch-screenshot-viewer img {
  display: block; inline-size: 100%; block-size: 100%;
  max-inline-size: 100% !important; max-block-size: 100dvh !important;
  margin: 0; object-fit: contain;
}
html.userpatch-maia .userpatch-screenshot { cursor: zoom-in; }
`

    // src/hdhub4u/css.js
    const MAIA_CSS = `
${HBLINKS_CSS}
html.userpatch-maia {
  --maia-background: oklch(0.145 0 0);
  --maia-gutter: clamp(0.75rem, 1.5vw, 1rem);
  background: var(--maia-background) !important;
  --maia-foreground: oklch(0.985 0 0);
  --maia-card: oklch(0.205 0 0);
  --maia-card-foreground: oklch(0.985 0 0);
  --maia-popover: oklch(0.205 0 0);
  --maia-popover-foreground: oklch(0.985 0 0);
  --maia-primary: oklch(0.922 0 0);
  --maia-primary-foreground: oklch(0.205 0 0);
  --maia-secondary: oklch(0.269 0 0);
  --maia-secondary-foreground: oklch(0.985 0 0);
  --maia-muted: oklch(0.269 0 0);
  --maia-muted-foreground: oklch(0.708 0 0);
  --maia-accent: oklch(0.269 0 0);
  --maia-accent-foreground: oklch(0.985 0 0);
  --maia-border: oklch(1 0 0 / 10%);
  --maia-input: oklch(1 0 0 / 15%);
  --maia-ring: oklch(0.556 0 0);
  --maia-opened-blue: oklch(0.58 0.2 250);
  --ease-out: cubic-bezier(0.23, 1, 0.32, 1);
  --ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);
  --maia-radius: 0.625rem;
  --maia-card-depth-shadow: inset 0 1px 2px rgb(255 255 255 / 0.09),
    0 2px 4px rgb(0 0 0 / 0.5), 0 4px 8px rgb(0 0 0 / 0.3);
  --maia-radius-xl: calc(var(--maia-radius) * 1.4);
  --maia-radius-2xl: calc(var(--maia-radius) * 1.8);
  --maia-radius-4xl: calc(var(--maia-radius) * 2.6);
}

/* Base */

html.userpatch-maia {
  -webkit-tap-highlight-color: transparent;
  -webkit-text-size-adjust: 100%;
  color-scheme: dark;
}

html.userpatch-maia button,
html.userpatch-maia [role="button"],
html.userpatch-maia .userpatch-nav-link,
html.userpatch-maia .userpatch-header-action,
html.userpatch-maia .userpatch-mobile-nav-item,
html.userpatch-maia .userpatch-quality-tab,
html.userpatch-maia .userpatch-mode-tab,
html.userpatch-maia .userpatch-provider-link,
html.userpatch-maia .userpatch-mobile-menu-link,
html.userpatch-maia .userpatch-mobile-menu-summary,
html.userpatch-maia .userpatch-mobile-menu-close {
  touch-action: manipulation;
  user-select: none;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
}

@media (pointer: coarse) {
  html.userpatch-maia input,
  html.userpatch-maia textarea,
  html.userpatch-maia select {
    font-size: 16px !important;
  }
}

html.userpatch-maia,
html.userpatch-maia body {
  color: var(--maia-foreground) !important;
  font-size: 1rem !important;
  line-height: 1.5;
  overscroll-behavior-x: auto;
  overscroll-behavior-y: none;
  font-family: "Inter Variable", ui-sans-serif, system-ui, -apple-system,
    BlinkMacSystemFont, "Segoe UI", sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

html.userpatch-maia,
html.userpatch-maia body,
html.userpatch-maia :where(*) {
  scrollbar-width: none !important;
  -ms-overflow-style: none !important;
}

html.userpatch-maia::-webkit-scrollbar,
html.userpatch-maia body::-webkit-scrollbar,
html.userpatch-maia :where(*)::-webkit-scrollbar {
  display: none !important;
  inline-size: 0 !important;
  block-size: 0 !important;
}

html.userpatch-maia body {
  background: var(--maia-background) !important;
  color: var(--maia-foreground) !important;
}

/* The site clamps html/body overflow (overflow-x:hidden plus an
   overflow:hidden rule), which turns the body into a clipped scroll box and
   stops position:sticky from ever engaging. clip on the horizontal axis
   keeps the cutoff without creating a scroll box, and the vertical axis is
   returned to visible so the viewport scrolls normally again. */
html.userpatch-maia,
html.userpatch-maia body {
  overflow-x: clip !important;
  overflow-y: visible !important;
}

/* Normalize the theme's scattered 14px/15px/17px sizes to the interface's
   single reading size, exactly like the sibling redesign does. Rules that
   need a different size are prefixed with html.userpatch-maia, so they
   out-rank this zero-specificity sweep. */
html.userpatch-maia body :where(
    p,
    span,
    div,
    a,
    li,
    td,
    th,
    strong,
    b,
    em,
    i,
    u,
    label,
    figcaption,
    blockquote,
    dd,
    dt
  ) {
  font-size: 1rem !important;
}

html.userpatch-maia body :where(.text-xs, .text-sm, .small, small) {
  font-size: 1rem !important;
}

html.userpatch-maia body,
html.userpatch-maia main#main-content {
  transition: none !important;
}

html.userpatch-maia a:focus-visible,
html.userpatch-maia button:focus-visible,
html.userpatch-maia summary:focus-visible,
html.userpatch-maia [role="button"]:focus-visible {
  outline: 1px solid var(--maia-ring) !important;
  outline-offset: 0;
  box-shadow: 0 0 0 3px color-mix(in oklch, var(--maia-ring) 50%, transparent) !important;
}

html.userpatch-maia button,
html.userpatch-maia input,
html.userpatch-maia select,
html.userpatch-maia textarea {
  font-family: inherit;
}

html.userpatch-maia svg[data-userpatch-lucide-icon] {
  fill: none !important;
  stroke: currentColor !important;
  flex: none;
}

/* Legacy chrome that the redesign replaces or silences */

html.userpatch-maia header.primary-header,
html.userpatch-maia footer.primay-footer,
html.userpatch-maia ins,
html.userpatch-maia body > br,
html.userpatch-maia .hd-dns-notice,
html.userpatch-maia section.sitewide-notice,
html.userpatch-maia .home-categories,
html.userpatch-maia .code-block,
html.userpatch-maia #wpd-editor-source-code-wrapper {
  display: none !important;
}

/* Header pill */

html.userpatch-maia .userpatch-header {
  position: sticky;
  inset-block-start: 3rem;
  z-index: 100;
  display: flex;
  justify-content: safe center;
  margin-block: 2.5rem;
  padding: 0;
  pointer-events: none;
}

html.userpatch-maia .userpatch-header-inner {
  position: relative;
  display: flex;
  inline-size: fit-content;
  max-inline-size: calc(100% - 1.5rem);
  block-size: 3.75rem;
  min-block-size: 3.75rem;
  box-sizing: border-box;
  align-items: center;
  isolation: isolate;
  overflow: visible;
  margin-inline: auto;
  border-radius: 1.25rem;
  /* 6px inset keeps the 14px brand radius concentric with the 20px pill */
  padding: 0.375rem;
  pointer-events: auto;
}

html.userpatch-maia .userpatch-header-inner::before {
  position: absolute;
  z-index: -1;
  inset: 0;
  border-radius: inherit;
  background: var(--maia-control-surface, color-mix(in oklch, var(--maia-card) 60%, transparent));
  box-shadow: var(--maia-glass-shadow, 0 10px 40px rgb(0 0 0 / 0.2));
  backdrop-filter: saturate(2.2) blur(16px);
  -webkit-backdrop-filter: saturate(2.2) blur(16px);
  content: "";
  pointer-events: none;
}

html.userpatch-maia .userpatch-header-inner::after {
  position: absolute;
  z-index: 1;
  inset: 0;
  border-radius: inherit;
  box-shadow:
    inset 0.5px 0.5px var(--maia-foreground),
    inset 0.5px -0.5px var(--maia-foreground),
    inset -0.5px 0.5px var(--maia-foreground),
    inset -0.5px -0.5px var(--maia-foreground);
  opacity: var(--maia-control-border-opacity, 0.2);
  content: "";
  pointer-events: none;
}

html.userpatch-maia .userpatch-header-container {
  position: relative;
  z-index: 3;
  display: flex;
  inline-size: fit-content;
  max-inline-size: 100%;
  block-size: 100%;
  min-block-size: 100%;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  isolation: isolate;
  margin: 0;
  padding: 0;
  border-radius: inherit;
}

html.userpatch-maia .userpatch-brand {
  position: relative;
  z-index: 1;
  display: inline-flex;
  box-sizing: border-box !important;
  min-inline-size: 3rem;
  block-size: 3rem !important;
  min-block-size: 3rem;
  align-items: center;
  justify-content: center;
  padding-inline: 0.375rem;
  border-radius: 0.875rem;
  text-decoration: none;
  transition: transform 140ms var(--ease-out);
}

html.userpatch-maia .userpatch-brand img {
  display: block;
  inline-size: 6.375rem;
  max-inline-size: none;
  max-block-size: 2.25rem;
  object-fit: contain;
}

html.userpatch-maia .userpatch-nav-list {
  position: relative;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  gap: 0.1875rem;
  margin: 0;
  padding: 0;
  list-style: none;
  overflow: visible;
  min-inline-size: 0;
  isolation: isolate;
}

html.userpatch-maia .userpatch-brand,
html.userpatch-maia .userpatch-header-action {
  flex: none;
}

/* Measured against the real nav width: full padding needs ~84rem, compact
   padding fits down to ~68rem, and below that the drawer takes over. */
@media (max-width: 68rem) {
  html.userpatch-maia .userpatch-nav {
    display: none !important;
  }
}

html.userpatch-maia .userpatch-nav-item {
  position: relative;
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
}

html.userpatch-maia .userpatch-nav-item.dropdown.open,
html.userpatch-maia .userpatch-nav-item.dropdown:hover,
html.userpatch-maia .userpatch-nav-item.dropdown:focus-within {
  z-index: 100;
}

html.userpatch-maia .userpatch-nav-item.dropdown::after {
  position: absolute;
  inset-block-start: calc(100% - 0.125rem);
  inset-inline: 0;
  z-index: 2;
  block-size: 0.75rem;
  content: "";
}

/* Fallback for links the redesign does not rebuild (raw mirror-homepage
   cards): give their keyboard focus the same ring the styled cards use. */
html.userpatch-maia main a:focus-visible {
  outline: none !important;
  box-shadow:
    0 0 0 2px var(--maia-background),
    0 0 0 4px var(--maia-ring) !important;
}

html.userpatch-maia .userpatch-nav-link {
  position: relative;
  z-index: 1;
  display: inline-flex;
  box-sizing: border-box !important;
  margin: 0;
  block-size: auto !important;
  min-block-size: 3rem;
  align-items: center;
  justify-content: center;
  gap: 0.375rem;
  padding: 0.625rem 1.125rem !important;
  border: 0 !important;
  border-radius: 0.875rem !important;
  background: transparent !important;
  color: var(--maia-foreground) !important;
  font: inherit;
  font-size: 1rem !important;
  font-weight: 500 !important;
  line-height: 1.25 !important;
  text-decoration: none !important;
  white-space: nowrap !important;
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  transition:
    transform 140ms var(--ease-out),
    background-color 140ms ease,
    color 140ms var(--ease-out);
}

@media (hover: hover) and (pointer: fine) {
  html.userpatch-maia .userpatch-header-action:hover {
    background: color-mix(in oklch, var(--maia-foreground) 9%, transparent) !important;
    color: var(--maia-foreground) !important;
  }
}

/* The shared header indicator supplies this hover fill where it is visible. */
@media (min-width: 46.01rem) and (hover: hover) and (pointer: fine) {
  html.userpatch-maia .userpatch-header-action:hover {
    background: transparent !important;
  }
}

html.userpatch-maia .userpatch-nav-link svg {
  inline-size: 1rem;
  block-size: 1rem;
  color: var(--maia-muted-foreground);
}

@media (min-width: 68.01rem) and (max-width: 84rem) {
  html.userpatch-maia .userpatch-nav-link {
    padding: 0.625rem 0.625rem !important;
    font-size: 0.875rem !important;
  }

  html.userpatch-maia .userpatch-brand {
    padding-inline: 0.25rem;
  }
}

html.userpatch-maia .userpatch-nav-indicator {
  position: absolute;
  z-index: 0;
  inset-block-start: 0;
  inset-inline-start: 0;
  display: block;
  inline-size: 6.25rem;
  block-size: 2.75rem;
  border-radius:
    var(--userpatch-nav-radius-x, 0.875rem) /
    var(--userpatch-nav-radius-y, 0.875rem);
  background: var(--maia-selection-bg, color-mix(in oklch, var(--maia-foreground) 9%, transparent));
  box-shadow: var(--maia-selection-shadow, inset 0 1px 2px color-mix(in oklch, var(--maia-foreground) 12%, transparent));
  opacity: 0;
  pointer-events: none;
  transform: translate3d(
      var(--userpatch-nav-x, 0px),
      var(--userpatch-nav-y, 0px),
      0
    )
    scale(
      var(--userpatch-nav-scale-x, 1),
      var(--userpatch-nav-scale-y, 1)
    );
  transform-origin: left top;
  transition: opacity 160ms var(--ease-out);
}

html.userpatch-maia .userpatch-nav-indicator[data-ready="true"] {
  opacity: 1;
}

html.userpatch-maia .userpatch-nav-indicator[data-animate="true"] {
  transition:
    transform 240ms cubic-bezier(0.77, 0, 0.175, 1),
    opacity 160ms var(--ease-out);
}

html.userpatch-maia .userpatch-dropdown-menu {
  position: absolute;
  /* 1px below the trigger, matching 4K-HDHub's flush dropdowns. */
  inset-block-start: calc(100% + 1px);
  inset-inline-start: 0;
  z-index: 1000;
  min-inline-size: 12rem;
  /* Keep long menus scrollable without letting them run below the viewport. */
  max-block-size: min(24rem, calc(100dvh - 7rem));
  overflow-y: auto;
  margin: 0;
  padding: 0.375rem;
  border-radius: var(--maia-radius-2xl);
  background: var(--maia-popover);
  color: var(--maia-popover-foreground);
  box-shadow:
    0 25px 50px -12px rgb(0 0 0 / 0.5),
    0 0 0 1px color-mix(in oklch, var(--maia-foreground) 10%, transparent);
  list-style: none;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transform: translateY(4px);
  transition:
    opacity 140ms var(--ease-out),
    transform 140ms var(--ease-out),
    visibility 140ms var(--ease-out);
}

html.userpatch-maia .userpatch-nav-item.dropdown.open > .userpatch-dropdown-menu,
html.userpatch-maia .userpatch-nav-item.dropdown:hover > .userpatch-dropdown-menu,
html.userpatch-maia .userpatch-nav-item.dropdown:focus-within > .userpatch-dropdown-menu {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
  transform: translateY(0);
}

html.userpatch-maia .userpatch-dropdown-item {
  display: flex;
  min-block-size: 2.25rem;
  align-items: center;
  padding: 0.5rem 0.75rem;
  border-radius: var(--maia-radius-xl);
  color: var(--maia-popover-foreground);
  font-size: 1rem;
  font-weight: 400;
  text-decoration: none;
  white-space: nowrap;
}

html.userpatch-maia .userpatch-dropdown-item:focus-visible {
  background: var(--maia-muted);
  color: var(--maia-foreground);
}

@media (hover: hover) and (pointer: fine) {
  html.userpatch-maia .userpatch-dropdown-item:hover {
    background: var(--maia-muted);
    color: var(--maia-foreground);
  }
}

html.userpatch-maia .userpatch-dropdown-item:active {
  background: var(--maia-accent);
  color: var(--maia-foreground);
}

html.userpatch-maia .userpatch-header-action {
  position: relative;
  z-index: 1;
  display: inline-flex;
  inline-size: 3rem;
  min-inline-size: 3rem;
  block-size: 3rem;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
  border: 0 !important;
  border-radius: 0.875rem !important;
  background: transparent !important;
  color: var(--maia-foreground) !important;
  cursor: pointer;
  transition:
    transform 140ms var(--ease-out),
    color 140ms var(--ease-out);
}

html.userpatch-maia .userpatch-menu-toggle {
  display: none;
}

@media (max-width: 68rem) {
  html.userpatch-maia .userpatch-menu-toggle {
    display: inline-flex;
  }
}

html.userpatch-maia .userpatch-header-action svg {
  inline-size: 1.25rem;
  block-size: 1.25rem;
}

html.userpatch-maia .userpatch-header-action:active {
  transform: scale(0.96);
}

html.userpatch-maia .userpatch-header-action:focus-visible {
  outline: 2px solid var(--maia-ring);
  outline-offset: -2px;
}

@media (max-width: 46rem) {
  html.userpatch-maia .userpatch-header {
    inset-block-start: 1rem;
    block-size: auto;
    min-block-size: 0;
    margin-block: 1rem 1.5rem;
    padding: 0;
    overflow: visible;
  }

  html.userpatch-maia .userpatch-header-inner {
    inline-size: calc(100% - 2rem);
    max-inline-size: calc(100% - 2rem);
    margin-inline: auto;
  }

  html.userpatch-maia .userpatch-header-container {
    inline-size: 100% !important;
    max-inline-size: 100%;
    justify-content: space-between;
    gap: 0.25rem;
  }

  html.userpatch-maia .userpatch-nav-indicator {
    display: none !important;
  }

  html.userpatch-maia .userpatch-brand {
    margin-inline-end: auto;
    padding-inline: 0.25rem;
  }
}

/* Search dialog */

html.userpatch-maia dialog.userpatch-search-dialog[open] {
  position: fixed;
  inset-block-start: 50%;
  inset-inline-start: 50%;
  display: flex;
  inline-size: min(45rem, calc(100dvw - 2rem));
  max-inline-size: none;
  max-block-size: calc(100dvh - 2rem);
  margin: 0;
  padding: 0;
  overflow: visible;
  transform: translate(-50%, -50%) scale(1);
  opacity: 1;
  border: 0;
  background: transparent;
  color: var(--maia-foreground);
  transition:
    transform 160ms var(--ease-out),
    opacity 160ms var(--ease-out);
}

@starting-style {
  html.userpatch-maia dialog.userpatch-search-dialog[open] {
    transform: translate(-50%, -50%) scale(0.96);
    opacity: 0;
  }
}

html.userpatch-maia dialog.userpatch-search-dialog::backdrop {
  overflow: hidden;
  background: rgb(0 0 0 / 80%);
  backdrop-filter: blur(2px);
  overscroll-behavior-x: auto;
  overscroll-behavior-y: contain;
  -webkit-backdrop-filter: blur(2px);
  transition: opacity 160ms var(--ease-out);
}

html.userpatch-maia dialog.userpatch-search-dialog:modal {
  overscroll-behavior-x: auto;
  overscroll-behavior-y: contain;
}

html.userpatch-maia dialog.userpatch-search-dialog .search-form {
  display: flex;
  flex: 1 1 auto;
  inline-size: 100%;
  min-inline-size: 0;
  margin: 0;
  padding: 0;
}

html.userpatch-maia dialog.userpatch-search-dialog .search-input-container {
  display: flex;
  box-sizing: border-box;
  inline-size: 100%;
  min-inline-size: 0;
  block-size: 3.5rem;
  min-block-size: 3.5rem;
  align-items: center;
  gap: 0;
  padding: 0 0.25rem 0 0;
  border: 1px solid rgb(255 255 255 / 20%);
  border-radius: 20px;
  background: rgb(38 38 40 / 60%);
  backdrop-filter: saturate(2.2) blur(16px);
  -webkit-backdrop-filter: saturate(2.2) blur(16px);
  transition: border-color 140ms ease-out;
}

html.userpatch-maia dialog.userpatch-search-dialog .search-input-container:has(
  .search-input-overlay:focus-visible
) {
  border-color: transparent;
  outline: 2px solid var(--maia-ring);
  outline-offset: 0;
}

@media (hover: hover) and (pointer: fine) {
  html.userpatch-maia dialog.userpatch-search-dialog .search-input-container:hover:not(:focus-within) {
    border-color: color-mix(in oklch, var(--maia-foreground) 38%, transparent);
  }
}

html.userpatch-maia .userpatch-input-group-addon {
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  padding-inline-start: 1rem;
}

html.userpatch-maia dialog.userpatch-search-dialog .search-icon-overlay {
  flex: 0 0 1.25rem;
  inline-size: 1.25rem;
  block-size: 1.25rem;
  color: #a1a1aa;
  pointer-events: none;
}

html.userpatch-maia dialog.userpatch-search-dialog .search-input-overlay {
  appearance: none;
  -webkit-appearance: none;
  flex: 1 1 auto;
  inline-size: auto;
  min-inline-size: 0;
  block-size: 100%;
  min-block-size: 0;
  padding: 0 0.75rem;
  border: 0;
  border-radius: 0;
  background: transparent;
  color: var(--maia-foreground);
  font-family: inherit;
  font-size: 1.125rem;
  font-weight: 400;
  line-height: 1.4;
  box-shadow: none;
  outline: 0;
}

html.userpatch-maia dialog.userpatch-search-dialog .search-input-overlay::placeholder {
  color: #a1a1aa;
  font-size: inherit;
  opacity: 1;
}

html.userpatch-maia dialog.userpatch-search-dialog .search-input-overlay::-webkit-search-cancel-button {
  display: none;
}

html.userpatch-maia dialog.userpatch-search-dialog .search-submit[hidden] {
  display: none !important;
}

@media (max-width: ${CONFIG.mobileLayoutBreakpointRem}rem) {
  html.userpatch-maia dialog.userpatch-search-dialog[open] {
    inset-block-start: calc(12px + env(safe-area-inset-top, 0px));
    max-block-size: calc(100dvh - 12px - 1rem - env(safe-area-inset-top, 0px));
    transform: translateX(-50%);
  }
}

/* Mobile bottom navigation and menu drawer */

html.userpatch-maia .userpatch-mobile-nav {
  display: none !important;
}

@media (max-width: ${CONFIG.mobileLayoutBreakpointRem}rem) {
  html.userpatch-maia:not(.userpatch-detail-page) .userpatch-mobile-nav {
    position: fixed;
    z-index: 2147483600;
    inset-inline: 0;
    inset-block-end: calc(20px + env(safe-area-inset-bottom, 0px));
    display: flex !important;
    inline-size: min(${CONFIG.mobileNavigationWidth}, calc(100vw - 48px));
    min-block-size: 72px;
    block-size: 72px;
    align-items: center;
    gap: 4px;
    box-sizing: border-box;
    margin-inline: auto;
    padding: 5px;
    border: 1px solid color-mix(in oklch, var(--maia-foreground) 10%, transparent);
    border-radius: 20px;
    background: color-mix(in oklch, var(--maia-card) 98%, transparent);
    box-shadow: 0 8px 30px rgb(0 0 0 / 0.38);
    backdrop-filter: saturate(1.8) blur(20px);
    -webkit-backdrop-filter: saturate(1.8) blur(20px);
  }
}

@media (max-width: ${CONFIG.mobileLayoutBreakpointRem}rem) {
  html.userpatch-maia:not(.userpatch-detail-page) .userpatch-header {
    display: none !important;
  }
}

html.userpatch-maia .userpatch-mobile-nav-item {
  display: flex;
  min-inline-size: 0;
  min-block-size: 62px;
  flex: 1 1 0;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  margin-block: 0 !important;
  margin-inline: 0 !important;
  padding: 4px 2px;
  border: 0;
  border-radius: 16px;
  background: transparent;
  color: var(--maia-muted-foreground);
  font: inherit;
  font-size: 0.75rem;
  line-height: 1.25;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition:
    transform 140ms var(--ease-out),
    background-color 140ms ease,
    color 140ms ease;
}

html.userpatch-maia .userpatch-mobile-nav-item:focus-visible {
  background: color-mix(in oklch, var(--maia-foreground) 10%, transparent);
  color: var(--maia-foreground);
  outline: 2px solid var(--maia-ring);
  outline-offset: -2px;
}

@media (hover: hover) and (pointer: fine) {
  html.userpatch-maia .userpatch-mobile-nav-item:hover {
    background: color-mix(in oklch, var(--maia-foreground) 10%, transparent);
    color: var(--maia-foreground);
  }
}

html.userpatch-maia .userpatch-mobile-nav-item:active {
  transform: scale(0.95);
  background: color-mix(in oklch, var(--maia-foreground) 12%, transparent);
}

html.userpatch-maia .userpatch-mobile-nav-item[aria-current="page"] {
  background: var(--maia-selection-bg, color-mix(in oklch, var(--maia-foreground) 9%, transparent));
  box-shadow: inset 0 1px 2px
    color-mix(in oklch, var(--maia-foreground) 12%, transparent);
  color: var(--maia-foreground);
}

html.userpatch-maia .userpatch-mobile-nav-icon {
  display: inline-flex;
  inline-size: 2rem;
  block-size: 2rem;
  flex: none;
  align-items: center;
  justify-content: center;
}

html.userpatch-maia .userpatch-mobile-nav-icon svg,
html.userpatch-maia .userpatch-mobile-nav-icon img {
  display: block;
  inline-size: 1.5rem;
  block-size: 1.5rem;
  object-fit: contain;
}

html.userpatch-maia .userpatch-mobile-nav-icon-brand {
  inline-size: 2rem;
  block-size: 2rem;
}

html.userpatch-maia .userpatch-mobile-nav-brand-logo {
  inline-size: 2rem !important;
  block-size: 2rem !important;
}

html.userpatch-maia .userpatch-mobile-menu:popover-open {
  position: fixed;
  inset-block: 0;
  inset-inline-start: 0;
  display: flex;
  inline-size: min(${CONFIG.mobileMenuWidth}, calc(100dvw - 2rem));
  block-size: 100dvh;
  max-block-size: 100dvh;
  max-inline-size: none;
  flex-direction: column;
  gap: 0;
  box-sizing: border-box;
  margin: 0 auto 0 0;
  padding: max(0.75rem, env(safe-area-inset-top, 0px)) 0.75rem
    max(0.75rem, env(safe-area-inset-bottom, 0px));
  overflow: hidden;
  overscroll-behavior-x: auto;
  overscroll-behavior-y: contain;
  border: 1px solid var(--maia-border);
  border-inline-start: 0;
  border-radius: 0 var(--maia-radius-2xl) var(--maia-radius-2xl) 0;
  background: var(--maia-card);
  color: var(--maia-foreground);
  box-shadow: 0 24px 64px rgb(0 0 0 / 0.45);
  transform: translateX(0);
  transition: transform 220ms var(--ease-drawer);
}

@starting-style {
  html.userpatch-maia .userpatch-mobile-menu:popover-open {
    transform: translateX(-100%);
  }
}

html.userpatch-maia .userpatch-mobile-menu:popover-open::backdrop {
  background: rgb(0 0 0 / 80%);
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
  transition: opacity 220ms var(--ease-out);
}

html.userpatch-maia .userpatch-mobile-menu-header {
  display: flex;
  min-block-size: 3.5rem;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0 0.5rem 0.75rem;
  border-bottom: 1px solid var(--maia-border);
}

html.userpatch-maia .userpatch-mobile-menu-title {
  margin: 0;
  color: var(--maia-foreground);
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.25;
}

html.userpatch-maia .userpatch-mobile-menu-close {
  display: inline-flex;
  inline-size: 2.5rem;
  block-size: 2.5rem;
  flex: none;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
  border: 1px solid var(--maia-border);
  border-radius: var(--maia-radius-xl);
  background: var(--maia-muted);
  color: var(--maia-foreground);
  cursor: pointer;
}

html.userpatch-maia .userpatch-mobile-menu-close svg,
html.userpatch-maia .userpatch-mobile-menu-summary svg {
  inline-size: 1.25rem;
  block-size: 1.25rem;
}

html.userpatch-maia .userpatch-mobile-menu-nav {
  min-block-size: 0;
  flex: 1 1 auto;
  overflow-x: hidden;
  overflow-y: auto;
  overscroll-behavior-x: auto;
  overscroll-behavior-y: contain;
  padding-block: 0.75rem;
}

html.userpatch-maia .userpatch-mobile-menu-list,
html.userpatch-maia .userpatch-mobile-menu-sublist {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

html.userpatch-maia .userpatch-mobile-menu-item {
  min-inline-size: 0;
  margin: 0;
  padding: 0;
}

html.userpatch-maia .userpatch-mobile-menu-link,
html.userpatch-maia .userpatch-mobile-menu-summary {
  display: flex;
  inline-size: 100%;
  min-block-size: 3rem;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  box-sizing: border-box;
  padding: 0.75rem 0.875rem;
  border: 0;
  border-radius: var(--maia-radius-xl);
  background: transparent;
  color: var(--maia-foreground);
  font: inherit;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.25;
  text-align: start;
  text-decoration: none;
  cursor: pointer;
  list-style: none;
}

html.userpatch-maia .userpatch-mobile-menu-summary::-webkit-details-marker {
  display: none;
}

html.userpatch-maia .userpatch-mobile-menu-link:focus-visible,
html.userpatch-maia .userpatch-mobile-menu-summary:focus-visible,
html.userpatch-maia .userpatch-mobile-menu-close:focus-visible {
  background: var(--maia-selection-bg, color-mix(in oklch, var(--maia-foreground) 9%, transparent));
  color: var(--maia-foreground);
  outline: 2px solid var(--maia-ring);
  outline-offset: -2px;
}

@media (hover: hover) and (pointer: fine) {
  html.userpatch-maia .userpatch-mobile-menu-link:hover,
  html.userpatch-maia .userpatch-mobile-menu-summary:hover {
    background: var(--maia-selection-bg, color-mix(in oklch, var(--maia-foreground) 9%, transparent));
    color: var(--maia-foreground);
  }
}

html.userpatch-maia .userpatch-mobile-menu-link:active,
html.userpatch-maia .userpatch-mobile-menu-summary:active,
html.userpatch-maia .userpatch-mobile-menu-close:active {
  background: color-mix(in oklch, var(--maia-foreground) 14%, transparent);
}

html.userpatch-maia .userpatch-mobile-menu-summary svg {
  flex: none;
  transition: transform 140ms ease-out;
}

html.userpatch-maia .userpatch-mobile-menu-group[open]
  .userpatch-mobile-menu-summary svg {
  transform: rotate(180deg);
}

html.userpatch-maia .userpatch-mobile-menu-sublist {
  gap: 0.125rem;
  padding: 0.125rem 0.25rem 0.5rem 0.75rem;
}

html.userpatch-maia .userpatch-mobile-menu-sublist .userpatch-mobile-menu-link {
  min-block-size: 2.5rem;
  padding-inline: 0.75rem;
  color: var(--maia-muted-foreground);
  font-size: 0.9375rem;
  font-weight: 400;
}

/* Listing pages (home, categories, search landings, pagination) */

html.userpatch-maia main#main-content.userpatch-listing-ready {
  display: block;
  inline-size: 100%;
  max-inline-size: 88rem;
  margin-inline: auto;
  padding: 0 var(--maia-gutter) clamp(2rem, 5vw, 4rem);
  padding-block-start: 1.5rem;
}

html.userpatch-maia main#main-content.userpatch-listing-ready > :not(.userpatch-keep) {
  display: none !important;
}

html.userpatch-maia main#main-content.userpatch-listing-ready > .userpatch-keep {
  float: none !important;
  inline-size: 100% !important;
  max-inline-size: none !important;
  box-sizing: border-box;
  margin: 0 !important;
  padding: 0 !important;
  background: transparent !important;
  box-shadow: none !important;
}

html.userpatch-maia main#main-content.userpatch-listing-ready h2.category-name {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  margin-block: 0.25rem 1rem !important;
  padding: 0 !important;
  border-radius: 0 !important;
  background: transparent !important;
  box-shadow: none !important;
  color: var(--maia-foreground) !important;
  font-size: 1.25rem !important;
  font-weight: 600 !important;
  letter-spacing: -0.02em;
  line-height: 1.3;
  height: auto !important;
  white-space: normal;
  overflow: visible;
  text-overflow: clip;
}

html.userpatch-maia main#main-content.userpatch-listing-ready h2.category-name i.material-icons {
  display: none !important;
}

html.userpatch-maia main#main-content.userpatch-listing-ready h2.category-name .material-text {
  color: var(--maia-foreground) !important;
  font-size: inherit !important;
}

html.userpatch-maia main#main-content.userpatch-listing-ready ul.recent-movies {
  display: grid !important;
  grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
  align-items: stretch;
  column-gap: 1rem !important;
  row-gap: 2rem !important;
  margin: 0 !important;
  padding: 0 !important;
  list-style: none !important;
}

@media (min-width: 40rem) {
  html.userpatch-maia main#main-content.userpatch-listing-ready ul.recent-movies {
    grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
  }
}

@media (min-width: 48rem) {
  html.userpatch-maia main#main-content.userpatch-listing-ready ul.recent-movies {
    grid-template-columns: repeat(5, minmax(0, 1fr)) !important;
  }
}

@media (min-width: 64rem) {
  html.userpatch-maia main#main-content.userpatch-listing-ready ul.recent-movies {
    grid-template-columns: repeat(6, minmax(0, 1fr)) !important;
  }
}

html.userpatch-maia main#main-content.userpatch-listing-ready ul.recent-movies li.thumb {
  position: static !important;
  float: none !important;
  inline-size: auto !important;
  /* The mirror theme forces min-width: 208px !important on these cards;
     without this reset the cards overflow their grid tracks and overlap. */
  min-inline-size: 0 !important;
  margin: 0 !important;
  padding: 0 !important;
  background: transparent !important;
  border: 0 !important;
  box-shadow: none !important;
  list-style: none !important;
}

html.userpatch-maia h2.category-name,
html.userpatch-maia .category-name,
html.userpatch-maia .page-title,
html.userpatch-maia .widget-title,
html.userpatch-maia .left-wrapper > h2,
html.userpatch-maia .home-wrapper > h2,
html.userpatch-maia .home-categories,
html.userpatch-maia .userpatch-detail-chips,
html.userpatch-maia .userpatch-metadata-card,
html.userpatch-maia .kp-header,
html.userpatch-maia .page-meta {
  display: none !important;
}

html.userpatch-maia main#main-content.userpatch-listing-ready li.thumb figure,
html.userpatch-maia .thumbnail-wrapper figure,
html.userpatch-maia figure {
  margin: 0 !important;
  padding: 0 !important;
  border: 0 !important;
  box-shadow: none !important;
  outline: none !important;
  background: transparent !important;
  border-radius: 0 !important;
  overflow: visible !important;
  }

html.userpatch-maia main#main-content.userpatch-listing-ready li.thumb figure > a {
  position: relative;
  display: block;
  aspect-ratio: 2 / 3;
  overflow: hidden;
  border: 1px solid color-mix(in oklch, var(--maia-foreground) 15%, transparent) !important;
  border-radius: 1rem !important;
  background: var(--maia-muted);
  box-shadow: var(--maia-card-depth-shadow);
  transition: box-shadow 140ms ease;
  text-decoration: none !important;
  user-select: none !important;
  -webkit-user-select: none !important;
  -webkit-user-drag: none !important;
  outline: none !important;
}

/* Keep the poster border steady against the source theme's hover styling. */
html.userpatch-maia main#main-content.userpatch-listing-ready li.thumb figure > a:hover {
  border-color: color-mix(in oklch, var(--maia-foreground) 15%, transparent) !important;
}

html.userpatch-maia main#main-content.userpatch-listing-ready li.thumb figure > a:focus,
html.userpatch-maia main#main-content.userpatch-listing-ready li.thumb figure > a:active {
  outline: none !important;
  box-shadow: var(--maia-card-depth-shadow) !important;
}

/* The focus ring lives on the card (not the poster link) so it wraps the
   poster and its title together, matching 4K-HDHub's listing cards. */
html.userpatch-maia main#main-content.userpatch-listing-ready li.thumb:focus-within {
  border-radius: 1rem !important;
  box-shadow:
    0 0 0 2px var(--maia-background),
    0 0 0 4px var(--maia-ring) !important;
}

html.userpatch-maia main#main-content.userpatch-listing-ready li.thumb figure > a:focus-visible {
  outline: none !important;
  box-shadow: none !important;
}

html.userpatch-maia main#main-content.userpatch-listing-ready li.thumb,
html.userpatch-maia main#main-content.userpatch-listing-ready li.thumb *,
html.userpatch-maia li.thumb figure a:focus,
html.userpatch-maia li.thumb figure a:active {
  outline: none !important;
  -webkit-user-drag: none !important;
  user-drag: none !important;
}

html.userpatch-maia main#main-content.userpatch-listing-ready li.thumb figure > a > img {
  position: absolute;
  inset: 0;
  display: block;
  inline-size: 100%;
  block-size: 100% !important;
  max-inline-size: none;
  object-fit: cover;
  user-select: none !important;
  -webkit-user-select: none !important;
  -webkit-user-drag: none !important;
  pointer-events: none !important;
  transition: none !important;
}

/* The theme scales card images to 1.2 on hover; the redesign keeps posters
   still, so kill every transform the theme can apply. */
html.userpatch-maia main#main-content.userpatch-listing-ready li.thumb img,
html.userpatch-maia main#main-content.userpatch-listing-ready li.thumb:hover img,
html.userpatch-maia main#main-content.userpatch-listing-ready li.thumb figure:hover img,
html.userpatch-maia main#main-content.userpatch-listing-ready li.thumb figure a:hover img {
  transform: none !important;
}

html.userpatch-maia main#main-content.userpatch-listing-ready li.thumb .thumb-hover,
html.userpatch-maia main#main-content.userpatch-listing-ready li.thumb .sr-only {
  display: none !important;
}

html.userpatch-maia li.thumb figcaption,
html.userpatch-maia .thumbnail-wrapper figcaption {
  position: static !important;
  top: auto !important;
  bottom: auto !important;
  inset: auto !important;
  height: auto !important;
  min-height: 0 !important;
  max-height: none !important;
  padding: 0.75rem 0.25rem 0 !important;
  background: transparent !important;
  border: 0 !important;
  border-radius: 0 !important;
  box-shadow: none !important;
}

html.userpatch-maia li.thumb figcaption a,
html.userpatch-maia .thumbnail-wrapper figcaption a {
  color: inherit !important;
  text-decoration: none !important;
}

html.userpatch-maia li.thumb figcaption p,
html.userpatch-maia .thumbnail-wrapper figcaption p {
  display: -webkit-box !important;
  overflow: hidden !important;
  margin: 0 !important;
  padding: 0 !important;
  border: 0 !important;
  background: transparent !important;
  box-shadow: none !important;
  color: var(--maia-foreground) !important;
  font-size: 1rem !important;
  font-weight: 400 !important;
  line-height: 1.4 !important;
  height: auto !important;
  text-align: center !important;
  text-overflow: ellipsis !important;
  -webkit-box-orient: vertical !important;
  -webkit-line-clamp: 2 !important;
  line-clamp: 2 !important;
}

@media (min-width: 40rem) {
  html.userpatch-maia main#main-content.userpatch-listing-ready li.thumb figure > a {
    border-radius: 1.5rem !important;
  }
}

html.userpatch-maia main#main-content.userpatch-listing-ready .pagination-wrapper {
  display: flex !important;
  justify-content: center;
  inline-size: 100%;
  min-inline-size: 0;
  container: pagination / inline-size;
  margin-block: 2rem 1rem !important;
}

html.userpatch-maia main#main-content.userpatch-listing-ready .pagination-wrap,
html.userpatch-maia main#main-content.userpatch-listing-ready ul.pagination {
  display: flex;
  align-items: center;
  gap: 0.375rem !important;
  margin: 0 !important;
  padding: 0 !important;
  border: 0 !important;
  background: transparent !important;
  box-shadow: none !important;
}

html.userpatch-maia .pagination-wrapper .material-left,
html.userpatch-maia .pagination-wrapper .material-icons,
html.userpatch-maia .page-numbers .material-left,
html.userpatch-maia .page-numbers .material-icons,
html.userpatch-maia ul.pagination .material-left,
html.userpatch-maia ul.pagination .material-icons {
  display: none !important;
}

html.userpatch-maia main#main-content.userpatch-listing-ready ul.pagination > li {
  display: flex;
  float: none !important;
  margin: 0 !important;
  padding: 0 !important;
}

html.userpatch-maia main#main-content.userpatch-listing-ready .page-numbers {
  display: inline-flex;
  inline-size: 2.5rem;
  min-inline-size: 2.5rem;
  block-size: 2.5rem;
  min-block-size: 2.5rem;
  align-items: center;
  justify-content: center;
  padding: 0 !important;
  border: 1px solid transparent !important;
  border-radius: var(--maia-radius-xl) !important;
  background: transparent !important;
  box-shadow: none !important;
  color: var(--maia-foreground) !important;
  font-size: 1rem !important;
  font-weight: 500 !important;
  text-decoration: none !important;
  transition:
    transform 140ms var(--ease-out),
    background-color 140ms ease,
    border-color 140ms ease;
}

html.userpatch-maia .pagination-wrapper .page-numbers.next,
html.userpatch-maia .pagination-wrapper .page-numbers.prev,
html.userpatch-maia main#main-content.userpatch-listing-ready .page-numbers.next,
html.userpatch-maia main#main-content.userpatch-listing-ready .page-numbers.prev,
html.userpatch-maia .page-numbers.next,
html.userpatch-maia .page-numbers.prev {
  inline-size: 2.5rem !important;
  min-inline-size: 2.5rem !important;
  max-inline-size: 2.5rem !important;
  block-size: 2.5rem !important;
  min-block-size: 2.5rem !important;
  padding: 0 !important;
  font-size: 0 !important;
  line-height: 0 !important;
  color: transparent !important;
  overflow: hidden !important;
  position: relative !important;
}

html.userpatch-maia main#main-content.userpatch-listing-ready .page-numbers svg,
html.userpatch-maia .pagination-wrapper .page-numbers svg,
html.userpatch-maia .page-numbers.next svg,
html.userpatch-maia .page-numbers.prev svg {
  display: block !important;
  inline-size: 1rem !important;
  block-size: 1rem !important;
  color: var(--maia-foreground) !important;
  margin: auto !important;
}

@media (hover: hover) and (pointer: fine) {
  html.userpatch-maia main#main-content.userpatch-listing-ready .page-numbers:hover {
    background: var(--maia-muted) !important;
  }
}

html.userpatch-maia main#main-content.userpatch-listing-ready .page-numbers:active {
  transform: scale(0.96);
  background: var(--maia-muted) !important;
}

html.userpatch-maia main#main-content.userpatch-listing-ready .page-numbers.current {
  border-color: var(--maia-border) !important;
  background: color-mix(in oklch, var(--maia-input) 30%, transparent) !important;
}

html.userpatch-maia main#main-content.userpatch-listing-ready .page-numbers.dots {
  inline-size: 1.5rem;
  min-inline-size: 1.5rem;
  color: var(--maia-muted-foreground);
  pointer-events: none;
}

@container pagination (max-width: 36rem) {
  html.userpatch-maia main#main-content.userpatch-listing-ready ul.pagination {
    gap: 0.25rem !important;
  }
  html.userpatch-maia main#main-content.userpatch-listing-ready ul.pagination > .userpatch-pagination-neighbor {
    display: none !important;
  }
}

@media (max-width: ${CONFIG.mobileLayoutBreakpointRem}rem) {
  html.userpatch-maia main#main-content.userpatch-listing-ready {
    padding-block-start: 1rem !important;
    padding-block-end: calc(120px + env(safe-area-inset-bottom, 0px)) !important;
  }

  html.userpatch-maia main#main-content.userpatch-listing-ready .pagination-wrapper {
    margin-block-end: calc(112px + env(safe-area-inset-bottom, 0px)) !important;
  }

  html.userpatch-maia main#main-content.userpatch-listing-ready ul.recent-movies {
    column-gap: 0.75rem !important;
    row-gap: 1.5rem !important;
  }
}

/* Detail pages */

html.userpatch-maia.userpatch-detail-page main#main-content,
html.userpatch-maia.userpatch-detail-page .userpatch-header,
html.userpatch-maia.userpatch-detail-page .userpatch-mobile-nav {
  display: none !important;
}

@media (min-width: ${CONFIG.mobileLayoutBreakpointRem + 0.01}rem) {
  html.userpatch-maia.userpatch-detail-page,
  html.userpatch-maia.userpatch-detail-page body {
    block-size: 100%;
    overflow: hidden;
  }
}

html.userpatch-maia .userpatch-detail-root {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  align-items: start;
  gap: var(--maia-gutter);
  inline-size: 100%;
  max-inline-size: 88rem;
  box-sizing: border-box;
  margin-inline: auto;
  padding: 1rem var(--maia-gutter) clamp(2rem, 5vw, 4rem);
}

@media (min-width: ${CONFIG.mobileLayoutBreakpointRem + 0.01}rem) {
  html.userpatch-maia .userpatch-detail-root {
    grid-template-columns: minmax(17rem, min(21rem, 30vw)) minmax(0, 1fr);
    align-items: stretch;
    column-gap: 2rem;
    block-size: 100dvh;
    padding-block: 0;
  }
}

/* Keep the poster stack and its viewport-aware sizing in step with 4KHDHub. */
html.userpatch-maia .userpatch-poster-panel {
  display: flex;
  inline-size: min(100%, 21rem, 42dvh);
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  box-sizing: border-box;
  margin-inline: 0;
  padding: 0;
  border: 0;
  border-radius: 0;
  background: transparent;
  box-shadow: none;
}

@media (min-width: ${CONFIG.mobileLayoutBreakpointRem + 0.01}rem) {
  html.userpatch-maia .userpatch-poster-panel {
    position: sticky;
    inset-block-start: 1rem;
    align-self: start;
    inline-size: min(100%, 21rem, 42dvh);
    max-block-size: calc(100dvh - 2rem);
    /* Keep the scrollport beyond the glow without moving or shrinking the
       poster. Overflow must stay scrollable for shorter desktop windows. */
    box-sizing: content-box;
    padding-inline: 1.5rem;
    margin-inline: -1.5rem;
    overflow: auto;
    overscroll-behavior-x: auto;
  overscroll-behavior-y: contain;
  }

  /* Overflow scrolls inside the panel; children must never flex-shrink. */
  html.userpatch-maia .userpatch-poster-panel > * {
    flex: none;
  }
}

html.userpatch-maia .userpatch-detail-brand {
  display: flex;
  inline-size: min(100%, 18rem);
  block-size: 4rem;
  min-block-size: 4rem;
  flex: none;
  align-items: center;
  justify-content: center;
}

html.userpatch-maia .userpatch-detail-brand img {
  display: block;
  inline-size: 100%;
  block-size: 4rem;
  max-block-size: 4rem;
  object-fit: contain;
}

html.userpatch-maia .userpatch-poster-frame {
  inline-size: min(100%, min(21rem, max(9rem, calc(66.667dvh - 7.333rem))));
  aspect-ratio: 2 / 3;
  overflow: hidden;
  border: 1px solid color-mix(in oklch, var(--maia-foreground) 15%, transparent);
  border-radius: 1rem;
  background: var(--maia-muted);
  box-shadow: var(--maia-card-depth-shadow);
}

html.userpatch-maia .userpatch-poster-frame[hidden] {
  display: none !important;
}

html.userpatch-maia .userpatch-poster-frame img {
  display: block;
  inline-size: 100%;
  block-size: 100%;
  object-fit: cover;
}

@media (min-width: 40rem) {
  html.userpatch-maia .userpatch-poster-frame {
    border-radius: 1.5rem;
  }
}

@media (max-width: ${CONFIG.mobileLayoutBreakpointRem}rem) {
  html.userpatch-maia .userpatch-poster-panel {
    inline-size: min(100%, 28rem);
    margin-inline: auto;
  }

  html.userpatch-maia .userpatch-poster-frame {
    inline-size: min(65vw, 17rem);
  }
}

html.userpatch-maia .userpatch-detail-title {
  max-inline-size: 100%;
  margin: 0;
  color: var(--maia-foreground) !important;
  font-size: 1.25rem !important;
  font-weight: 500 !important;
  letter-spacing: -0.02em;
  line-height: 1.25;
  text-align: center;
  overflow-wrap: anywhere;
}

html.userpatch-maia .userpatch-detail-date {
  margin: 0;
  color: var(--maia-muted-foreground);
  font-size: 0.8125rem !important;
}

html.userpatch-maia .userpatch-imdb-score {
  display: inline-flex;
  min-block-size: 1.5rem;
  align-items: center;
  gap: 0.375rem;
  color: var(--maia-foreground);
  font-size: 1rem;
  line-height: 1;
}

html.userpatch-maia .userpatch-imdb-score a {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  color: inherit;
  text-decoration: none;
}

html.userpatch-maia .userpatch-imdb-score img {
  display: block;
  inline-size: auto;
  block-size: 1rem;
  object-fit: contain;
}

html.userpatch-maia .userpatch-imdb-rating {
  font-size: 1rem;
  font-weight: 500;
}

html.userpatch-maia .userpatch-poster-badges {
  display: flex;
  max-inline-size: 100%;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-block-start: 0.125rem;
}

html.userpatch-maia .userpatch-poster-badges[hidden] {
  display: none !important;
}

html.userpatch-maia .userpatch-media-badge {
  display: inline-flex;
  min-inline-size: 0;
  min-block-size: 0;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: 0;
  border-radius: 0;
  background: transparent;
  box-shadow: none;
}

html.userpatch-maia .userpatch-media-badge img {
  display: block;
  inline-size: auto;
  max-inline-size: none;
  block-size: 1rem;
  object-fit: contain;
  filter: invert(1) grayscale(1);
}


html.userpatch-maia .userpatch-detail-main {
  display: flex;
  flex-direction: column;
  min-inline-size: 0;
  min-block-size: 0;
  gap: 1rem;
}

@media (min-width: ${CONFIG.mobileLayoutBreakpointRem + 0.01}rem) {
  html.userpatch-maia .userpatch-detail-main {
    block-size: 100%;
    box-sizing: border-box;
    /* Reserves the tab-bar band at the top of the scroll column, the way
       4KHDHub's grid rows do, so the list never rides up against it. */
    padding-block-start: 1rem;
    overflow-x: hidden;
    overflow-y: auto;
    overscroll-behavior-x: auto;
  overscroll-behavior-y: contain;
    scrollbar-gutter: auto;
  }
  html.userpatch-maia .userpatch-detail-main:has(.userpatch-screens:not([hidden])),
  html.userpatch-maia .userpatch-detail-main:has(.userpatch-detail-info:not([hidden]) .userpatch-trailer) {
    padding-block-end: calc(8rem + env(safe-area-inset-bottom, 0px));
  }
}

html.userpatch-maia .userpatch-detail-toolbar {
  position: sticky;
  /* The scroll column reserves a gutter band for this bar (see
     .userpatch-detail-main), so it rests level with 4KHDHub's tab bar and
     pins there when the list scrolls under it. */
  inset-block-start: 0;
  z-index: 5;
  display: flex;
  max-inline-size: 100%;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem 1rem;
  margin-block-end: 0;
  box-sizing: border-box;
  min-block-size: 4rem;
  flex: none;
  padding: 0;
  scrollbar-width: none;
}

html.userpatch-maia .userpatch-detail-toolbar > .userpatch-quality-tabs {
  margin-inline-start: auto;
}

@media (max-width: ${CONFIG.mobileLayoutBreakpointRem}rem) {
  html.userpatch-maia .userpatch-detail-root:has(.userpatch-detail-info:not([hidden]) .userpatch-trailer),
  html.userpatch-maia .userpatch-detail-root:has(.userpatch-screens:not([hidden])) {
    padding-block-end: calc(8rem + env(safe-area-inset-bottom, 0px));
  }
  html.userpatch-maia .userpatch-detail-root,
  html.userpatch-maia .userpatch-detail-main {
    gap: 0.75rem !important;
  }
  html.userpatch-maia .userpatch-detail-toolbar {
    inset-block-start: calc(12px + env(safe-area-inset-top, 0px));
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.75rem !important;
    min-block-size: 0 !important;
    margin: 0 !important;
    padding: 0 !important;
  }
  html.userpatch-maia .userpatch-detail-toolbar > .userpatch-quality-tabs {
    margin-inline: auto;
  }
}

html.userpatch-maia .userpatch-detail-info[hidden] { display: none !important; }

html.userpatch-maia .userpatch-detail-toolbar > :only-child {
  margin-inline-start: auto;
}

html.userpatch-maia .userpatch-mode-tabs,
html.userpatch-maia .userpatch-quality-tabs {
  position: relative;
  display: inline-flex;
  inline-size: fit-content;
  max-inline-size: 100%;
  align-items: center;
  gap: 2px;
  overflow: hidden !important;
  padding: 0.25rem;
  border-radius: 1rem;
  isolation: isolate;
  box-sizing: border-box;
}

/* Scroll the whole glass group so its indicator and border stay aligned. */
html.userpatch-maia .userpatch-mode-scroll {
  flex: 0 1 auto;
  min-inline-size: 0;
  inline-size: fit-content;
  max-inline-size: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  border-radius: 1rem;
  scrollbar-width: none;
}
html.userpatch-maia .userpatch-mode-scroll::-webkit-scrollbar {
  display: none;
}
html.userpatch-maia .userpatch-mode-scroll > .userpatch-mode-tabs {
  inline-size: max-content;
  max-inline-size: none;
  margin: 0;
}
@media (max-width: ${CONFIG.mobileLayoutBreakpointRem}rem) {
  html.userpatch-maia .userpatch-mode-scroll {
    inline-size: calc(100% + 2 * var(--maia-gutter));
    max-inline-size: none;
    margin-inline: calc(-1 * var(--maia-gutter));
    border-radius: 0;
  }
  html.userpatch-maia .userpatch-mode-scroll > .userpatch-mode-tabs {
    display: flex;
    margin-inline: auto;
  }
}

html.userpatch-maia .userpatch-mode-tabs::before,
html.userpatch-maia .userpatch-quality-tabs::before {
  position: absolute;
  z-index: -1;
  inset: 0;
  border-radius: inherit;
  background: var(--maia-control-surface, color-mix(in oklch, var(--maia-card) 60%, transparent));
  box-shadow: var(--maia-glass-shadow, 0 10px 40px rgb(0 0 0 / 0.2));
  backdrop-filter: saturate(2.2) blur(16px);
  -webkit-backdrop-filter: saturate(2.2) blur(16px);
  content: "";
  pointer-events: none;
}

html.userpatch-maia .userpatch-mode-tabs::after,
html.userpatch-maia .userpatch-quality-tabs::after {
  position: absolute;
  z-index: 1;
  inset: 0;
  border-radius: inherit;
  box-shadow:
    inset 0.5px 0.5px var(--maia-foreground),
    inset 0.5px -0.5px var(--maia-foreground),
    inset -0.5px 0.5px var(--maia-foreground),
    inset -0.5px -0.5px var(--maia-foreground);
  opacity: var(--maia-control-border-opacity, 0.2);
  content: "";
  pointer-events: none;
}

html.userpatch-maia .userpatch-mode-tab,
html.userpatch-maia .userpatch-quality-tab {
  position: relative;
  z-index: 2;
  display: inline-flex;
  margin: 0;
  block-size: 2.25rem !important;
  min-block-size: 2.25rem !important;
  max-block-size: 2.25rem !important;
  box-sizing: border-box !important;
  flex: none;
  align-items: center;
  justify-content: center;
  gap: 0.375rem;
  padding: 0 0.875rem !important;
  border: 0 !important;
  border-radius: 0.75rem !important;
  background: transparent !important;
  color: var(--maia-muted-foreground) !important;
  font: inherit;
  font-size: 0.875rem !important;
  font-weight: 500 !important;
  line-height: 1 !important;
  white-space: nowrap !important;
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  transition:
    transform 140ms var(--ease-out),
    color 140ms var(--ease-out);
}

html.userpatch-maia .userpatch-mode-tab[aria-pressed="true"],
html.userpatch-maia .userpatch-quality-tab[aria-pressed="true"] {
  border-color: transparent !important;
  background: transparent !important;
  color: var(--maia-foreground) !important;
}

html.userpatch-maia .userpatch-mode-tab svg {
  flex: 0 0 1rem;
  inline-size: 1rem;
  block-size: 1rem;
  color: currentColor;
  fill: none;
}

html.userpatch-maia .userpatch-mode-indicator,
html.userpatch-maia .userpatch-quality-indicator {
  position: absolute;
  z-index: 0;
  inset-block-start: 0;
  inset-inline-start: 0;
  display: block;
  inline-size: 100px;
  block-size: 36px;
  border-radius:
    var(--userpatch-quality-radius-x, var(--userpatch-mode-radius-x, 0.75rem)) /
    var(--userpatch-quality-radius-y, var(--userpatch-mode-radius-y, 0.75rem));
  opacity: 0;
  pointer-events: none;
  transform-origin: left top;
  transition: opacity 160ms var(--ease-out);
}

html.userpatch-maia .userpatch-mode-indicator {
  background: var(--maia-selection-bg, color-mix(in oklch, var(--maia-foreground) 9%, transparent));
  box-shadow: var(--maia-selection-shadow, inset 0 1px 2px color-mix(in oklch, var(--maia-foreground) 12%, transparent));
  transform: translate3d(
      var(--userpatch-mode-x, 0px),
      var(--userpatch-mode-y, 0px),
      0
    )
    scale(
      var(--userpatch-mode-scale-x, 1),
      var(--userpatch-mode-scale-y, 1)
    );
}

html.userpatch-maia .userpatch-quality-indicator {
  background: var(--maia-selection-bg, rgb(255 255 255 / 0.15));
  box-shadow: var(--maia-selection-shadow, inset 0 1px 2px rgb(255 255 255 / 0.12));
  transform: translate3d(
      var(--userpatch-quality-x, 0px),
      var(--userpatch-quality-y, 0px),
      0
    )
    scale(
      var(--userpatch-quality-scale-x, 1),
      var(--userpatch-quality-scale-y, 1)
    );
}

html.userpatch-maia .userpatch-mode-tabs .userpatch-mode-indicator[data-ready="true"],
html.userpatch-maia .userpatch-mode-tabs .userpatch-quality-indicator[data-ready="true"],
html.userpatch-maia .userpatch-quality-tabs .userpatch-quality-indicator[data-ready="true"] {
  opacity: 1;
}

html.userpatch-maia .userpatch-mode-tabs .userpatch-mode-indicator[data-animate="true"],
html.userpatch-maia .userpatch-mode-tabs .userpatch-quality-indicator[data-animate="true"],
html.userpatch-maia .userpatch-quality-tabs .userpatch-quality-indicator[data-animate="true"] {
  transition:
    transform 240ms cubic-bezier(0.77, 0, 0.175, 1),
    opacity 160ms var(--ease-out);
}

html.userpatch-maia .userpatch-quality-tabs[hidden] {
  display: none !important;
}

html.userpatch-maia .userpatch-quality-tab[data-tab-content="label"] {
  min-inline-size: 3rem;
}

@media (hover: hover) and (pointer: fine) {
  html.userpatch-maia .userpatch-mode-tab:hover:not(:disabled),
  html.userpatch-maia .userpatch-quality-tab:hover:not(:disabled) {
    color: var(--maia-foreground);
  }
}

html.userpatch-maia .userpatch-mode-tab:active:not(:disabled),
html.userpatch-maia .userpatch-quality-tab:active:not(:disabled) {
  transform: scale(0.96);
}

html.userpatch-maia .userpatch-mode-tab:focus-visible,
html.userpatch-maia .userpatch-quality-tab:focus-visible {
  outline: 2px solid var(--maia-ring);
  outline-offset: -2px;
}

html.userpatch-maia .userpatch-quality-tab:disabled {
  color: var(--maia-muted-foreground);
  cursor: not-allowed;
}

html.userpatch-maia .userpatch-quality-tab {
  font-weight: 600 !important;
  letter-spacing: 0.02em;
}

html.userpatch-maia .userpatch-quality-tab img {
  display: block;
  inline-size: auto;
  block-size: 1.125rem;
  filter: invert(1);
}

html.userpatch-maia .userpatch-quality-tab:disabled img {
  filter: invert(1) grayscale(1) opacity(0.45);
}

/* Release rows */

html.userpatch-maia .userpatch-release-list {
  display: flex;
  flex-direction: column;
  border-block-start: 1px solid color-mix(in oklch, var(--maia-foreground) 16%, transparent);
}

html.userpatch-maia .userpatch-release-item {
  display: block;
  min-inline-size: 0;
  color: var(--maia-foreground);
  text-decoration: none;
}

html.userpatch-maia a.userpatch-release-item {
  cursor: pointer;
}

html.userpatch-maia .userpatch-release-row {
  display: flex;
  inline-size: 100%;
  min-block-size: 4rem;
  align-items: center;
  gap: 12px;
  box-sizing: border-box;
  padding: 16px;
  border-block-end: 1px solid color-mix(in oklch, var(--maia-foreground) 16%, transparent);
  color: var(--maia-foreground);
  transition: background 160ms var(--ease-out);
}

@media (hover: hover) and (pointer: fine) {
  html.userpatch-maia .userpatch-release-row:hover {
    background: color-mix(in oklch, var(--maia-muted) 42%, transparent);
  }
}

html.userpatch-maia .userpatch-release-row[data-userpatch-opened="true"],
html.userpatch-maia .userpatch-release-item[data-userpatch-opened="true"] .userpatch-release-row {
  background: color-mix(in oklch, var(--maia-opened-blue) 30%, transparent) !important;
}

@media (hover: hover) and (pointer: fine) {
  html.userpatch-maia .userpatch-release-row[data-userpatch-opened="true"]:hover,
  html.userpatch-maia .userpatch-release-item[data-userpatch-opened="true"]:hover .userpatch-release-row {
    background: color-mix(in oklch, var(--maia-opened-blue) 38%, transparent) !important;
  }
}

html.userpatch-maia .userpatch-release-copy {
  display: flex;
  min-inline-size: 0;
  flex: 1;
  flex-direction: column;
  gap: 4px;
}

html.userpatch-maia .userpatch-release-file-title {
  color: var(--maia-foreground);
  font-size: 14px !important;
  font-weight: 400;
  line-height: 1.45;
  overflow-wrap: anywhere;
}

@media (min-width: 761px) {
  html.userpatch-maia .userpatch-release-file-title {
    font-size: 18px !important;
  }
}

html.userpatch-maia .userpatch-release-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  color: var(--maia-muted-foreground);
  font-size: 0.875rem !important;
  font-weight: 400;
  line-height: 1.4;
  overflow-wrap: anywhere;
}

/* The 1rem sweep inflates the plain size spans past the 14px filename on
   small screens; keep them secondary below the desktop breakpoint. */
@media (max-width: 760px) {
  html.userpatch-maia
    .userpatch-release-meta
    > span:not(.userpatch-series-language-badge) {
    font-size: 0.75rem !important;
  }
}

html.userpatch-maia .userpatch-series-language-badge {
  display: inline-flex;
  min-inline-size: 0;
  align-items: center;
  isolation: isolate;
  gap: 0.375rem;
  min-block-size: 1.25rem;
  padding: 0.125rem 0.5rem;
  border: 1px solid color-mix(in oklch, var(--maia-foreground) 10%, transparent);
  border-radius: var(--maia-radius-4xl);
  background: transparent;
  color: var(--maia-foreground);
  font-size: 0.875rem !important;
  font-weight: 400;
  line-height: 1.25;
}

html.userpatch-maia .userpatch-series-language-text {
  max-inline-size: 100%;
  min-inline-size: 0;
  overflow-wrap: anywhere;
}

html.userpatch-maia .userpatch-series-language-icon {
  inline-size: 1rem;
  block-size: 1rem;
  flex: none;
}

html.userpatch-maia .userpatch-release-actions {
  position: relative;
  z-index: 1;
  display: flex;
  flex: none;
  align-items: center;
  gap: 12px;
}

html.userpatch-maia .userpatch-release-action {
  display: inline-flex;
  inline-size: 40px;
  block-size: 40px;
  align-items: center;
  justify-content: center;
  color: var(--maia-foreground);
}

html.userpatch-maia .userpatch-release-action svg {
  inline-size: 20px;
  block-size: 20px;
}

html.userpatch-maia .userpatch-release-action img {
  inline-size: 36px;
  block-size: 36px;
  object-fit: contain;
}

html.userpatch-maia .userpatch-provider-link {
  position: relative;
  display: inline-flex;
  inline-size: 40px;
  block-size: 40px;
  align-items: center;
  justify-content: center;
  padding: 0 !important;
  border: 0 !important;
  border-radius: 0 !important;
  outline-offset: 3px;
  background: transparent !important;
  color: inherit;
  box-shadow: none !important;
  text-decoration: none;
  transition:
    transform 140ms var(--ease-out),
    opacity 140ms var(--ease-out);
}

@media (hover: hover) and (pointer: fine) {
  html.userpatch-maia .userpatch-provider-link:hover {
    background: transparent !important;
    opacity: 0.78;
  }
}

html.userpatch-maia .userpatch-provider-link:active {
  transform: scale(0.95);
  opacity: 0.6;
}

html.userpatch-maia .userpatch-provider-link:focus-visible {
  outline: 2px solid var(--maia-ring);
}

html.userpatch-maia .userpatch-provider-link svg {
  inline-size: 20px;
  block-size: 20px;
}

html.userpatch-maia .userpatch-provider-link img {
  inline-size: 36px;
  block-size: 36px;
  object-fit: contain;
}

html.userpatch-maia body .userpatch-provider-tooltip {
  position: fixed;
  z-index: 2147483647;
  display: inline-flex;
  width: max-content;
  max-width: 20rem;
  align-items: center;
  padding: 0.375rem 0.75rem;
  border-radius: 1rem;
  background: var(--maia-foreground);
  color: var(--maia-background);
  font-size: 0.75rem !important;
  font-weight: 400;
  line-height: 1.25;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transform: translate(-50%, 2px) scale(0.95);
  transform-origin: center bottom;
  pointer-events: none;
  transition:
    opacity 120ms var(--ease-out),
    transform 120ms var(--ease-out),
    visibility 120ms var(--ease-out);
}

html.userpatch-maia body .userpatch-provider-tooltip[hidden] {
  display: none !important;
}

html.userpatch-maia body .userpatch-provider-tooltip[data-state="open"] {
  opacity: 1;
  visibility: visible;
  transform: translate(-50%, 0) scale(1);
}

html.userpatch-maia body .userpatch-provider-tooltip::after {
  position: absolute;
  z-index: 0;
  inline-size: 0.625rem;
  block-size: 0.625rem;
  background: inherit;
  content: "";
  transform: translateX(-50%) rotate(45deg);
}

html.userpatch-maia body .userpatch-provider-tooltip[data-side="top"]::after {
  inset-block-start: calc(100% - 0.3125rem);
  inset-inline-start: 50%;
}

html.userpatch-maia body .userpatch-provider-tooltip[data-side="bottom"] {
  transform-origin: center top;
}

html.userpatch-maia body .userpatch-provider-tooltip[data-side="bottom"]::after {
  inset-block-end: calc(100% - 0.3125rem);
  inset-inline-start: 50%;
}

html.userpatch-maia .userpatch-release-item.userpatch-filter-hidden {
  display: none !important;
}

html.userpatch-maia .userpatch-screens[hidden],
html.userpatch-maia .userpatch-release-list[hidden],
html.userpatch-maia .userpatch-mode-tabs[hidden] {
  display: none !important;
}

html.userpatch-maia .userpatch-detail-empty {
  padding: 1.5rem 0.25rem;
  color: var(--maia-muted-foreground);
  font-size: 0.9375rem;
  text-align: center;
}

/* Detail sections */

html.userpatch-maia .userpatch-detail-section {
  margin-block: 1.75rem 0;
}

html.userpatch-maia .userpatch-section-title {
  margin-block: 0 1rem;
  padding-block-end: 0.75rem;
  border-bottom: 1px solid var(--maia-border);
  color: var(--maia-foreground) !important;
  font-size: 1.25rem !important;
  font-weight: 600 !important;
  letter-spacing: -0.02em;
  line-height: 1.3;
}

/* One screenshot per row, full width — a vertical stack, not a grid. */
html.userpatch-maia .userpatch-screens {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-block: 0;
  margin-inline: 0;
}

html.userpatch-maia .userpatch-screenshot {
  position: relative;
  display: block;
  aspect-ratio: 16 / 9;
  min-block-size: 14rem;
  overflow: hidden;
  border: 0 !important;
  border-radius: 1rem;
  background: var(--maia-muted);
  text-decoration: none !important;
  transition: none !important;
}

html.userpatch-maia .userpatch-screenshot:hover {
  border-color: transparent !important;
  transform: none !important;
}

html.userpatch-maia .userpatch-screenshot img {
  display: block;
  inline-size: 100%;
  block-size: 100%;
  object-fit: cover;
}

html.userpatch-maia .userpatch-trailer {
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border: 1px solid var(--maia-border);
  border-radius: var(--maia-radius-2xl);
  background: var(--maia-muted);
}

html.userpatch-maia .userpatch-trailer iframe {
  position: absolute;
  inset: 0;
  inline-size: 100%;
  block-size: 100%;
  border: 0;
}

html.userpatch-maia .userpatch-story {
  max-inline-size: 72ch;
  margin: 0;
  color: var(--maia-muted-foreground) !important;
  font-size: 1rem !important;
  line-height: 1.7 !important;
}

@media (max-width: ${CONFIG.mobileLayoutBreakpointRem}rem) {
  html.userpatch-maia .userpatch-release-row {
    padding: 16px 8px;
  }

  html.userpatch-maia .userpatch-release-actions {
    gap: 8px;
  }

  html.userpatch-maia .userpatch-provider-link,
  html.userpatch-maia .userpatch-release-action {
    inline-size: 34px;
    block-size: 34px;
  }

  html.userpatch-maia .userpatch-mode-tabs {
    inline-size: fit-content;
    max-inline-size: 100%;
    margin-inline: auto;
  }

  html.userpatch-maia .userpatch-mode-tab,
  html.userpatch-maia .userpatch-quality-tab {
    flex: none;
    block-size: 2.5rem !important;
    min-block-size: 2.5rem !important;
    max-block-size: 2.5rem !important;
  }

}

@media (prefers-reduced-motion: reduce) {
  html.userpatch-maia .userpatch-nav-link,
  html.userpatch-maia .userpatch-header-action,
  html.userpatch-maia .userpatch-brand,
  html.userpatch-maia .userpatch-nav-indicator,
  html.userpatch-maia .userpatch-quality-tab,
  html.userpatch-maia .userpatch-mode-tab,
  html.userpatch-maia .userpatch-provider-link,
  html.userpatch-maia .userpatch-provider-tooltip,
  html.userpatch-maia .userpatch-mobile-nav-item,
  html.userpatch-maia .userpatch-mobile-menu,
  html.userpatch-maia dialog.userpatch-search-dialog,
  html.userpatch-maia .page-numbers,
  html.userpatch-maia .userpatch-release-row {
    transform: none !important;
    transition:
      opacity 120ms ease,
      background-color 120ms ease,
      color 120ms ease !important;
  }
}

#userpatch-page-loader {
  position: fixed;
  inset: 0;
  z-index: 2147483640;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--maia-background, #0a0a0a);
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
  transition: opacity 250ms ease, visibility 250ms ease;
}

#userpatch-page-loader.userpatch-page-loader-hidden {
  opacity: 0 !important;
  visibility: hidden !important;
  pointer-events: none !important;
}

.userpatch-page-spinner {
  inline-size: 2.75rem;
  block-size: 2.75rem;
  color: var(--maia-foreground, #ffffff);
  animation: userpatch-page-spin 0.8s linear infinite;
}

@keyframes userpatch-page-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  #userpatch-page-loader {
    transition: none !important;
  }
  .userpatch-page-spinner {
    animation-duration: 1.5s !important;
  }
}

${PROGRESSIVE_IMAGE_CSS}

${SCREENSHOT_VIEWER_CSS}
${POSTER_RECOVERY_CSS}
${LANDING_CSS}
${TRAILER_CSS}
${DETAIL_INFO_CSS}

html.userpatch-maia .userpatch-series-progress {
  display: block;
  margin-block-start: 0.25rem;
  color: var(--maia-muted-foreground);
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.4;
  text-align: center;
}
html.userpatch-maia .userpatch-poster-panel > .userpatch-series-progress {
  margin-block-start: -0.5rem;
}
html.userpatch-maia main#main-content.userpatch-listing-ready li.thumb figure > a.userpatch-ongoing-poster,
html.userpatch-maia .userpatch-poster-frame.userpatch-ongoing-poster {
  border: 2px solid transparent !important;
  background:
    linear-gradient(var(--maia-muted), var(--maia-muted)) padding-box,
    var(--maia-hdhub-running-border, linear-gradient(135deg, #ff931e, #ff4938 52%, #dc2626)) border-box !important;
  box-shadow: var(--maia-hdhub-running-shadow,
    0 0 16px rgb(255 147 30 / 0.16),
    0 0 28px rgb(220 38 38 / 0.14)) !important;
}
${systemThemeCss()}
`

    // src/shared/quality-tabs.js
    const QUALITY_TAB_KEYS = ["all", "4k", "hd", "sd"]
    const setupIndicatorHover = (container, position, onFocus) => {
      const getButton = (target) => {
        const button =
          target instanceof Element ? target.closest("button") : null
        return button && container.contains(button) && !button.disabled
          ? button
          : null
      }
      const onPointerOver = (event) => {
        if (
          (event.pointerType === "mouse" || event.pointerType === "pen") &&
          window.matchMedia("(hover: hover) and (pointer: fine)").matches
        ) {
          const button = getButton(event.target)
          if (button) {
            position(button)
          }
        }
      }
      const restore = () => position()
      const onFocusIn = (event) => {
        const button = getButton(event.target)
        if (button) {
          onFocus?.(button)
          position(button)
        }
      }
      const onFocusOut = (event) => {
        if (
          !(event.relatedTarget instanceof Node) ||
          !container.contains(event.relatedTarget)
        ) {
          restore()
        }
      }
      container.addEventListener("pointerover", onPointerOver)
      container.addEventListener("pointerleave", restore)
      container.addEventListener("focusin", onFocusIn)
      container.addEventListener("focusout", onFocusOut)
      return () => {
        container.removeEventListener("pointerover", onPointerOver)
        container.removeEventListener("pointerleave", restore)
        container.removeEventListener("focusin", onFocusIn)
        container.removeEventListener("focusout", onFocusOut)
      }
    }
    const positionSelectionIndicator = (indicator, container, target, kind) => {
      if (!target || !container.contains(target)) {
        indicator.dataset.ready = "false"
        return
      }
      const containerRect = container.getBoundingClientRect()
      const targetRect = target.getBoundingClientRect()
      if (
        !indicator.offsetWidth ||
        !indicator.offsetHeight ||
        !targetRect.width ||
        !targetRect.height
      ) {
        return
      }
      const scaleX = targetRect.width / indicator.offsetWidth
      const scaleY = targetRect.height / indicator.offsetHeight
      const radius =
        Number.parseFloat(getComputedStyle(target).borderTopLeftRadius) || 12
      const prefix = `--userpatch-${kind}`
      indicator.style.setProperty(
        `${prefix}-x`,
        `${targetRect.left - containerRect.left - container.clientLeft}px`
      )
      indicator.style.setProperty(
        `${prefix}-y`,
        `${targetRect.top - containerRect.top - container.clientTop}px`
      )
      indicator.style.setProperty(`${prefix}-scale-x`, String(scaleX))
      indicator.style.setProperty(`${prefix}-scale-y`, String(scaleY))
      indicator.style.setProperty(`${prefix}-radius-x`, `${radius / scaleX}px`)
      indicator.style.setProperty(`${prefix}-radius-y`, `${radius / scaleY}px`)
      if (indicator.dataset.ready === "true") {
        indicator.dataset.animate = "true"
      }
      indicator.dataset.ready = "true"
    }
    const createQualityTabs = ({ storageKey, onQualityChange }) => {
      const element = document.createElement("div")
      element.className = "userpatch-quality-tabs"
      element.setAttribute("role", "group")
      element.setAttribute("aria-label", "Filter releases by quality")
      const indicator = document.createElement("span")
      indicator.className = "userpatch-quality-indicator"
      indicator.setAttribute("aria-hidden", "true")
      indicator.dataset.ready = "false"
      element.append(indicator)
      const buttons = new Map()
      for (const quality of QUALITY_TAB_KEYS) {
        const button = document.createElement("button")
        button.type = "button"
        button.className = "userpatch-quality-tab"
        button.dataset.quality = quality
        button.dataset.tabContent = quality === "all" ? "label" : "icon"
        button.setAttribute(
          "aria-pressed",
          quality === "all" ? "true" : "false"
        )
        const label = QUALITY_LABELS[quality]
        button.setAttribute("aria-label", label)
        button.title = label
        if (quality === "all") {
          button.textContent = "All"
        } else {
          const icon = document.createElement("img")
          icon.src = USERPATCH_BADGE_DATA[quality]
          icon.alt = ""
          icon.width = 26
          icon.height = 15
          icon.decoding = "async"
          button.append(icon)
        }
        element.append(button)
        buttons.set(quality, button)
      }
      const savedQuality = storageGet(storageKey)
      let activeQuality =
        savedQuality && QUALITY_TAB_KEYS.includes(savedQuality)
          ? savedQuality
          : "all"
      const positionIndicator = (target) => {
        if (!element.hidden) {
          positionSelectionIndicator(
            indicator,
            element,
            target || buttons.get(activeQuality) || buttons.get("all"),
            "quality"
          )
        }
      }
      const positionActiveIndicator = () => {
        positionIndicator()
      }
      const getEventButton = (target) => {
        if (!(target instanceof Element)) {
          return null
        }
        const button = target.closest(".userpatch-quality-tab")
        return button instanceof HTMLElement && element.contains(button)
          ? button
          : null
      }
      const onClick = (event) => {
        const button = getEventButton(event.target)
        if (!button || button.disabled) {
          return
        }
        const newQuality = button.dataset.quality || "all"
        activeQuality = newQuality
        storageSet(storageKey, newQuality)
        for (const [q, btn] of buttons) {
          btn.setAttribute(
            "aria-pressed",
            q === activeQuality ? "true" : "false"
          )
        }
        positionIndicator()
        onQualityChange?.(activeQuality)
      }
      element.addEventListener("click", onClick)
      const cleanupIndicatorHover = setupIndicatorHover(
        element,
        positionIndicator
      )
      element.addEventListener("scroll", positionActiveIndicator, {
        passive: true,
      })
      const resizeObserver =
        typeof ResizeObserver === "undefined"
          ? null
          : new ResizeObserver(positionActiveIndicator)
      resizeObserver?.observe(element)
      for (const button of buttons.values()) {
        resizeObserver?.observe(button)
      }
      if (!resizeObserver) {
        window.addEventListener("resize", positionActiveIndicator)
      }
      const refreshButtons = (availableQualities) => {
        const availableSet =
          availableQualities instanceof Set
            ? availableQualities
            : new Set(availableQualities)
        const saved = storageGet(storageKey)
        if (saved && QUALITY_TAB_KEYS.includes(saved)) {
          if (saved === "all" || availableSet.has(saved)) {
            activeQuality = saved
          } else if (!availableSet.has(activeQuality)) {
            activeQuality = "all"
          }
        } else if (
          activeQuality !== "all" &&
          !availableSet.has(activeQuality)
        ) {
          activeQuality = "all"
        }
        for (const [quality, button] of buttons) {
          const unavailable = quality !== "all" && !availableSet.has(quality)
          button.disabled = unavailable
          if (unavailable) {
            button.dataset.status = "unavailable"
          } else {
            delete button.dataset.status
          }
          button.setAttribute(
            "aria-pressed",
            quality === activeQuality ? "true" : "false"
          )
        }
        positionIndicator()
        return activeQuality
      }
      const cleanup = () => {
        element.removeEventListener("click", onClick)
        cleanupIndicatorHover()
        element.removeEventListener("scroll", positionActiveIndicator)
        if (resizeObserver) {
          resizeObserver.disconnect()
        } else {
          window.removeEventListener("resize", positionActiveIndicator)
        }
      }
      return {
        element,
        getActiveQuality: () => activeQuality,
        positionIndicator,
        refreshButtons,
        cleanup,
      }
    }

    // src/hdhub4u/download-parsing.js
    const extractSize = (text) => {
      const match = text.match(/(\d[\d.,]*)\s*(GB|MB)\b/i)
      return match ? `${match[1]}${match[2].toUpperCase()}` : ""
    }
    const cleanRowTitle = (text, size) => {
      let out = size ? text.replace(size, " ") : text
      out = out.replaceAll(/\[([^[\]]*)\]/g, (_match, inner) => {
        const cleaned = normalizeText(inner.replaceAll(/[-–—|]/g, " "))
        return cleaned ? ` ${cleaned} ` : " "
      })
      out = out.replaceAll(/\p{Extended_Pictographic}/gu, " ")
      out = out.replaceAll(/\s*[-–—|]\s*$/g, "")
      return normalizeText(out)
    }
    const RELEASE_PROVIDERS = Object.freeze({
      drive: {
        label: "Drive",
        icon: "download",
      },
      instant: {
        label: "Instant",
        icon: "zap",
      },
      watch: {
        label: "Watch online",
        icon: "play",
      },
      download: {
        label: "Download",
        icon: "download",
      },
    })
    const classifyHost = (href) => {
      try {
        const host = new URL(href, location.href).hostname.toLowerCase()
        if (/(?:^|\.)hubdrive\./.test(host)) {
          return "drive"
        }
        if (/(?:^|\.)hubcdn\./.test(host)) {
          return "instant"
        }
        if (/(?:^|\.)(?:playdrive|hdstream4u)\./.test(host)) {
          return "watch"
        }
        return ""
      } catch {
        return ""
      }
    }
    const isReleaseAnchor = (anchor) => {
      try {
        if (!/^https?:/i.test(anchor.getAttribute("href") || "")) {
          return false
        }
        const url = new URL(anchor.href, location.href)
        if (url.origin === location.origin) {
          return false
        }
        const text = normalizeText(anchor.textContent)
        return (
          /(?:hubdrive|hubcdn|playdrive|hdstream4u|greenmotors|4khdhub)\./.test(
            url.hostname.toLowerCase()
          ) ||
          /download|watch|trailer|(?:^|[^a-z0-9])(?:2160p|1080p|720p|480p|4k)(?=$|[^a-z0-9])|[\d.]+\s*(?:gb|mb)\b/i.test(
            text
          )
        )
      } catch {
        return false
      }
    }
    const parseReleaseAnchor = (anchor) => {
      const text = normalizeText(anchor.textContent)
      const href = anchor.href
      const size = extractSize(text)
      const title = cleanRowTitle(text, size) || text
      const isWatch =
        /watch|player/i.test(text) || classifyHost(href) === "watch"
      const external = /4khdhub\.one/i.test(href)
      const hubProvider = getHubProvider(href, text)
      return {
        title,
        href,
        size,
        isWatch,
        external,
        audio: "",
        provider: hubProvider,
      }
    }
    const classifyEpisodeLink = (anchor) => {
      const text = normalizeText(anchor.textContent)
      const lower = text.toLowerCase()
      let kind = classifyHost(anchor.href)
      if (!kind) {
        if (/watch/.test(lower)) {
          kind = "watch"
        } else {
          kind = "download"
        }
      }
      let host = ""
      try {
        host = new URL(anchor.href, location.href).hostname
      } catch {}
      const provider = RELEASE_PROVIDERS[kind] || RELEASE_PROVIDERS.download
      const hubProvider = getHubProvider(anchor.href, text)
      return {
        href: anchor.href,
        kind,
        icon: provider.icon,
        provider: hubProvider,
        tooltip: hubProvider
          ? hubProvider.name
          : `${provider.label}${host ? ` · ${host}` : ""}`,
      }
    }

    // src/hdhub4u/titles.js
    const parseDisplayTitle = (source) => {
      const original = normalizeText(source)
      const season = original.match(
        /\(Seasons?\s+(\d{1,2})(?:\s*[-–&]\s*(?:Season\s*)?(\d{1,2}))?\)/i
      )
      const year = original.match(/\((?:19|20)\d{2}\)/)
      const boundary =
        season?.index ?? (year ? year.index + year[0].length : null)
      const title =
        boundary === null
          ? original
          : original.slice(0, boundary).trim() || original
      const metadata = season
        ? original.slice(season.index + season[0].length)
        : ""
      const complete =
        /\b(?:all\s+episodes|complete(?:d)?(?:\s+season)?|season\s+finale)\b/i.test(
          metadata
        )
      const episode = metadata.match(
        /\bEP(?:ISODES?)?\s*[-:]?\s*(\d{1,3})(?:\s*[-–]\s*(\d{1,3}))?\s+ADDED\b/i
      )
      const ongoing = Boolean(
        season && episode && Number(episode[2] || episode[1]) > 0 && !complete
      )
      const pad = (value) => String(Number(value)).padStart(2, "0")
      let progress = season ? `S${pad(season[1])}` : ""
      if (season?.[2]) {
        progress += `-S${pad(season[2])}`
      }
      if (ongoing) {
        progress += `-EP${pad(episode[2] || episode[1])}`
      }
      return {
        title,
        progress,
        ongoing,
      }
    }
    const createSeriesProgress = (progress) => {
      if (!progress) {
        return null
      }
      const label = document.createElement("span")
      label.className = "userpatch-series-progress"
      label.textContent = progress
      return label
    }
    const normalizeListingTitles = (root) => {
      for (const card of root.querySelectorAll("li.thumb")) {
        const caption = card.querySelector("figcaption p")
        if (!caption) {
          continue
        }
        const source = normalizeText(caption.textContent)
        if (caption.dataset.userpatchDisplayTitle === source) {
          continue
        }
        const { title, progress, ongoing } = parseDisplayTitle(source)
        caption.textContent = title
        caption.dataset.userpatchDisplayTitle = title
        card.querySelector(".userpatch-series-progress")?.remove()
        const label = createSeriesProgress(progress)
        if (label) {
          card.querySelector("figcaption").append(label)
        }
        card
          .querySelector("figure > a")
          ?.classList.toggle("userpatch-ongoing-poster", ongoing)
        const accessibleTitle = [title, progress].filter(Boolean).join(" ")
        for (const link of card.querySelectorAll("a")) {
          link.setAttribute("aria-label", accessibleTitle)
        }
        for (const image of card.querySelectorAll("img")) {
          image.alt = title
          image.title = accessibleTitle
        }
      }
    }

    // src/hdhub4u/detail.js
    const extractDetail = () => {
      try {
        const main = document.querySelector("main#main-content.content-wrapper")
        const heading = main?.querySelector("h1.page-title")
        const body = main?.querySelector("main.page-body")
        if (!main || !heading || !body) {
          return null
        }
        const title = normalizeText(
          heading.querySelector(".material-text")?.textContent ||
            heading.textContent
        ).replace(
          /\s*[|–-]\s*(?:Full\s+(?:Movie|Series|Show)\s*)?HDHub4u.*$/i,
          ""
        )
        if (!title) {
          return null
        }
        const metaBox = main.querySelector(".page-meta")
        const date = normalizeText(
          metaBox?.querySelector("span")?.textContent || ""
        )
        const categories = []
        for (const link of metaBox?.querySelectorAll("a[href]") || []) {
          const label = normalizeText(
            link.querySelector("em")?.textContent || link.textContent
          )
          const href = link.getAttribute("href")
          if (label && href) {
            categories.push({
              label,
              href,
            })
          }
        }
        let poster = ""
        for (const image of body.querySelectorAll("img")) {
          const src = image.getAttribute("src") || ""
          if (!src || image.closest("h3") || /\.th\.jpg$/i.test(src)) {
            continue
          }
          if (image.closest(".code-block") || image.closest(".kp-header")) {
            continue
          }
          poster = image.src || src
          break
        }
        const metaValues = new Map()
        for (const strong of body.querySelectorAll(".kp-header strong")) {
          const cell = strong.closest("div")
          if (!cell) {
            continue
          }
          const label = normalizeText(strong.textContent).replace(/:$/, "")
          const full = normalizeText(cell.textContent)
          const value =
            label && full.startsWith(label)
              ? normalizeText(full.slice(label.length).replace(/^:/, ""))
              : full
          if (label && value && !metaValues.has(label)) {
            metaValues.set(label, value)
          }
        }
        const ratingValue =
          metaValues.get("iMDB Rating") || metaValues.get("IMDb Rating") || ""
        const ratingMatch = ratingValue.match(/([0-9]+(?:\.[0-9]+)?)\s*\/\s*10/)
        const imdbLink = body.querySelector('.kp-header a[href*="imdb.com"]')
        const metaRows = []
        for (const key of [
          "Stars",
          "Creator",
          "Director",
          "Genre",
          "Language",
          "Quality",
        ]) {
          const value = metaValues.get(key)
          if (value) {
            metaRows.push([key, value])
          }
        }
        if (date) {
          metaRows.push(["Posted", date])
        }
        const releases = []
        const episodes = []
        const screenshots = []
        let episodeHint = false
        const headingNodes = Array.from(body.querySelectorAll("h2, h3, h4, h5"))
        for (const node of headingNodes) {
          const text = normalizeText(node.textContent)
          const lower = text.toLowerCase()
          if (/screen\s*-?\s*shots?/.test(lower)) {
            continue
          }
          if (/download\s*links/.test(lower)) {
            continue
          }
          if (/single\s*episode/.test(lower)) {
            episodeHint = true
            continue
          }
          const anchors = Array.from(node.querySelectorAll("a[href]"))
          if (
            anchors.length &&
            anchors.every((anchor) => anchor.querySelector("img"))
          ) {
            for (const anchor of anchors) {
              const image = anchor.querySelector("img")
              if (image?.src) {
                const full = image.src.replace(/\.th(\.[a-z]+)$/i, "$1")
                screenshots.push({
                  href: anchor.href,
                  src: image.src,
                  full: full === image.src ? "" : full,
                  alt: image?.alt || "",
                })
              }
            }
            continue
          }
          const episodeMatch = text.match(
            /episodes?\s*0*(\d{1,3})(?:\s*(?:[-–—&]|to|and)\s*0*(\d{1,3}))?/i
          )
          const isEpisodeRow =
            Boolean(episodeMatch) || (episodeHint && node.matches("h3, h4"))
          if (isEpisodeRow) {
            if (
              !episodeMatch &&
              (!anchors.length || !/drive|instant|watch|download/i.test(text))
            ) {
              continue
            }
            let number = ""
            if (episodeMatch) {
              number = episodeMatch[2]
                ? `${episodeMatch[1]}-${episodeMatch[2]}`
                : episodeMatch[1]
            }
            let current = episodes.at(-1)
            if (!current || (number && current.number !== number)) {
              current = {
                number: number || `${episodes.length + 1}`,
                groups: [],
              }
              episodes.push(current)
            }
            if (!anchors.length) {
              continue
            }
            const qualityToken =
              text.match(/(?:2160p|1080p|720p|480p|4k)/i)?.[0] || ""
            const size = extractSize(text)
            let group = current.groups.at(-1)
            if (!group || group.quality !== qualityToken) {
              group = {
                quality: qualityToken,
                size,
                links: [],
              }
              current.groups.push(group)
            }
            for (const anchor of anchors) {
              group.links.push(classifyEpisodeLink(anchor))
            }
            continue
          }
          if (!anchors.length) {
            continue
          }
          const releaseAnchors = anchors.filter(isReleaseAnchor)
          if (!releaseAnchors.length) {
            continue
          }
          const rows = releaseAnchors.map(parseReleaseAnchor)
          const next = node.nextElementSibling
          if (next?.matches("h5")) {
            const note = normalizeText(next.textContent)
              .replace(/^\[/, "")
              .replace(/\]$/, "")
              .trim()
            if (note && rows.length) {
              rows.at(-1).audio = note
            }
          }
          releases.push(...rows)
        }
        let storyline = ""
        for (const node of headingNodes) {
          if (!/storyline/i.test(node.textContent)) {
            continue
          }
          let cursor = node.nextElementSibling
          for (let hops = 0; cursor && hops < 6; hops += 1) {
            const desc = cursor.matches(".kno-rdesc")
              ? cursor
              : cursor.querySelector(".kno-rdesc")
            if (desc) {
              const clone = desc.cloneNode(true)
              for (const label of clone.querySelectorAll("strong, em, span")) {
                label.remove()
              }
              storyline = normalizeText(clone.textContent)
              break
            }
            cursor = cursor.nextElementSibling
          }
          break
        }
        if (storyline.length < 24 || /^n\/?a\b/i.test(storyline)) {
          storyline = ""
        }
        const isSeries =
          episodes.length > 0 || /\b(?:season|series|episode)\b/i.test(title)
        return {
          title,
          date,
          categories,
          poster,
          rating: ratingMatch
            ? {
                score: `${ratingMatch[1]}/10`,
                href: imdbLink?.href || "",
              }
            : null,
          metaRows,
          releases,
          episodes,
          isSeries,
          screenshots,
          storyline,
          trailer: findTrailerUrl(body),
        }
      } catch (error) {
        console.warn("userpatch extract failed:", error)
        return null
      }
    }
    const buildDetailPage = (data) => {
      const root = document.createElement("div")
      root.className = "userpatch-detail-root"
      const panel = document.createElement("aside")
      panel.className = "userpatch-poster-panel"
      const brand = document.createElement("a")
      brand.className = "userpatch-detail-brand"
      brand.href = "/"
      brand.setAttribute("aria-label", "HDHub4u home")
      const brandImage = document.createElement("img")
      brandImage.src = HEADER_WORDMARK_DATA_URI
      brandImage.alt = "HDHub4u"
      brandImage.decoding = "async"
      brand.append(brandImage)
      panel.append(brand)
      const frame = document.createElement("div")
      frame.className = "userpatch-poster-frame"
      const displayTitle = parseDisplayTitle(data.title)
      frame.classList.toggle("userpatch-ongoing-poster", displayTitle.ongoing)
      if (data.poster) {
        const image = document.createElement("img")
        image.src = data.poster
        image.alt = ""
        image.decoding = "async"
        image.fetchPriority = "high"
        image.loading = "eager"
        setupProgressiveImage(image)
        frame.append(image)
        panel.append(frame)
      }
      const title = document.createElement("h1")
      title.className = "userpatch-detail-title"
      title.textContent = displayTitle.title
      panel.append(title)
      const progress = createSeriesProgress(displayTitle.progress)
      if (progress) {
        panel.append(progress)
      }
      if (data.rating) {
        const score = document.createElement("div")
        score.className = "userpatch-imdb-score"
        const link = document.createElement("a")
        if (data.rating.href) {
          link.href = data.rating.href
          link.target = "_blank"
          link.rel = "noopener noreferrer"
        }
        link.setAttribute("aria-label", `IMDb rating ${data.rating.score}`)
        const logo = document.createElement("img")
        logo.src = IMDB_PRIMARY_LOGO_DATA_URI
        logo.alt = "IMDb"
        logo.decoding = "async"
        const value = document.createElement("span")
        value.className = "userpatch-imdb-rating"
        value.textContent = data.rating.score
        link.append(logo, value)
        score.append(link)
        panel.append(score)
      }
      const badges = getDetailBadgeNames(data)
      if (badges.length) {
        panel.append(buildPosterBadges(badges))
      }
      const mainColumn = document.createElement("div")
      mainColumn.className = "userpatch-detail-main"
      const toolbar = document.createElement("div")
      toolbar.className = "userpatch-detail-toolbar"
      const list = document.createElement("div")
      list.className = "userpatch-release-list"
      const emptyNote = document.createElement("p")
      emptyNote.className = "userpatch-detail-empty"
      emptyNote.hidden = true
      emptyNote.textContent = "No links match this filter"
      const qualityTabs = createQualityTabs({
        storageKey: CONFIG.storageKeys.movieQualityTab,
        onQualityChange: () => {
          applyQualityFilter()
        },
      })
      const applyQualityFilter = () => {
        const items = Array.from(
          list.querySelectorAll(".userpatch-release-item")
        )
        const available = new Set(
          items
            .map((item) => item.dataset.userpatchQuality)
            .filter((quality) => quality && quality !== "unknown")
        )
        const canFilter = available.size > 1
        qualityTabs.element.hidden = !canFilter
        const selectedQuality = qualityTabs.refreshButtons(available)
        const activeQuality = canFilter ? selectedQuality : "all"
        let visible = 0
        for (const item of items) {
          const quality = item.dataset.userpatchQuality || "unknown"
          const hidden = activeQuality !== "all" && quality !== activeQuality
          item.classList.toggle("userpatch-filter-hidden", hidden)
          if (!hidden) {
            visible += 1
          }
        }
        emptyNote.hidden = visible > 0
      }
      const hasLinksTab = !data.isSeries
      const hasArchiveTab =
        data.isSeries && data.releases.some((row) => !row.external)
      const hasEpisodesTab = data.isSeries && data.episodes.length > 0
      let activeMode = "archive"
      if (data.isSeries && !hasArchiveTab) {
        activeMode = "episodes"
      }
      if (hasArchiveTab && hasEpisodesTab) {
        const savedMode = storageGet(CONFIG.storageKeys.seriesTab)
        if (savedMode === "archive" || savedMode === "episodes") {
          activeMode = savedMode
        }
      }
      const tabDefs = [
        ["info", "Info", "info"],
        ...(data.screenshots.length
          ? [["screenshot", "Screenshot", "film"]]
          : []),
        ...(hasLinksTab ? [["links", "Links", "download"]] : []),
        ...(hasArchiveTab ? [["archive", "Archive", "file-archive"]] : []),
        ...(hasEpisodesTab
          ? [["episodes", "Single Episode", "file-play"]]
          : []),
      ]
      const savedTab = storageGet(CONFIG.storageKeys.detailTab)
      let activeTab = "info"
      if (savedTab === "links") {
        activeTab = hasLinksTab ? "links" : activeMode
      } else if (savedTab === "screenshot" && data.screenshots.length) {
        activeTab = "screenshot"
      }
      const tabs = document.createElement("div")
      tabs.className = "userpatch-mode-tabs"
      tabs.setAttribute("role", "group")
      tabs.setAttribute("aria-label", "Switch detail sections")
      const tabScroller = document.createElement("div")
      tabScroller.className = "userpatch-mode-scroll"
      tabScroller.append(tabs)
      const tabIndicator = document.createElement("span")
      tabIndicator.className = "userpatch-mode-indicator"
      tabIndicator.setAttribute("aria-hidden", "true")
      tabIndicator.dataset.ready = "false"
      tabs.append(tabIndicator)
      const tabButtons = new Map()
      for (const [tab, label, iconName] of tabDefs) {
        const button = document.createElement("button")
        button.type = "button"
        button.className = "userpatch-mode-tab"
        button.dataset.tab = tab
        button.setAttribute(
          "aria-pressed",
          tab === activeTab ? "true" : "false"
        )
        const text = document.createElement("span")
        text.textContent = label
        button.append(text, createLucideIcon(iconName))
        tabs.append(button)
        tabButtons.set(tab, button)
      }
      if (tabButtons.size < 2) {
        tabs.hidden = true
        tabScroller.hidden = true
      }
      const screenshotsPane = document.createElement("div")
      screenshotsPane.className = "userpatch-screens"
      screenshotsPane.hidden = activeTab !== "screenshot"
      for (const screenshot of data.screenshots) {
        const link = document.createElement("a")
        link.className = "userpatch-screenshot"
        link.href = screenshot.href
        link.target = "_blank"
        link.rel = "noopener noreferrer nofollow"
        const image = document.createElement("img")
        image.src = screenshot.src || screenshot.full
        image.alt = screenshot.alt || "Screenshot"
        image.loading = "lazy"
        image.fetchPriority = "low"
        image.decoding = "async"
        setupProgressiveImage(image, screenshot.full)
        image.addEventListener(
          "error",
          () => {
            if (screenshot.src && image.src !== screenshot.src) {
              image.src = screenshot.src
            }
          },
          { once: true }
        )
        link.addEventListener("click", (event) => {
          if (
            event.ctrlKey ||
            event.metaKey ||
            event.shiftKey ||
            event.altKey
          ) {
            return
          }
          event.preventDefault()
          openScreenshotViewer(
            screenshot.full || screenshot.src,
            screenshot.alt,
            screenshot.src
          )
        })
        link.setAttribute("aria-haspopup", "dialog")
        link.append(image)
        screenshotsPane.append(link)
      }
      const positionTabIndicator = (target) => {
        positionSelectionIndicator(
          tabIndicator,
          tabs,
          target || tabButtons.get(activeTab),
          "mode"
        )
      }
      const getEventButton = (target) => {
        if (!(target instanceof Element)) {
          return null
        }
        const button = target.closest(".userpatch-mode-tab")
        return button instanceof HTMLElement && tabs.contains(button)
          ? button
          : null
      }
      const renderModeRows = () => {
        const openedReleases = getOpenedReleases()
        const fragment = document.createDocumentFragment()
        if (activeMode === "episodes") {
          for (const episode of data.episodes) {
            for (const group of episode.groups) {
              if (group.links.length) {
                fragment.append(buildEpisodeRow(episode, group, openedReleases))
              }
            }
          }
          if (!hasArchiveTab) {
            for (const row of data.releases) {
              fragment.append(buildReleaseRow(row, openedReleases))
            }
          }
        } else {
          for (const row of data.releases) {
            fragment.append(buildReleaseRow(row, openedReleases))
          }
        }
        list.replaceChildren(fragment)
      }
      const revealTab = (button) => {
        if (!button || !tabScroller.isConnected) {
          return
        }
        const viewport = tabScroller.getBoundingClientRect()
        const target = button.getBoundingClientRect()
        let left = 0
        if (target.left < viewport.left) {
          left = target.left - viewport.left - 4
        } else if (target.right > viewport.right) {
          left = target.right - viewport.right + 4
        }
        if (left) {
          tabScroller.scrollBy({
            left,
            behavior: "instant",
          })
        }
      }
      const applyTab = (tab) => {
        activeTab = tab
        for (const [key, button] of tabButtons) {
          button.setAttribute("aria-pressed", key === tab ? "true" : "false")
        }
        const showLinks = tab !== "screenshot" && tab !== "info"
        infoPane.hidden = tab !== "info"
        screenshotsPane.hidden = tab !== "screenshot"
        list.hidden = !showLinks
        emptyNote.hidden = !showLinks
        qualityTabs.element.hidden = !showLinks
        if (showLinks) {
          if ((tab === "archive" || tab === "episodes") && tab !== activeMode) {
            activeMode = tab
            storageSet(CONFIG.storageKeys.seriesTab, activeMode)
            renderModeRows()
          }
          applyQualityFilter()
        }
        revealTab(tabButtons.get(tab))
        positionTabIndicator()
      }
      const onClick = (event) => {
        const button = getEventButton(event.target)
        if (!button || button.dataset.tab === activeTab) {
          return
        }
        const tab = button.dataset.tab
        storageSet(
          CONFIG.storageKeys.detailTab,
          tab === "info" || tab === "screenshot" ? tab : "links"
        )
        applyTab(tab)
      }
      const positionActiveTabIndicator = () => {
        requestAnimationFrame(() => {
          if (tabs.isConnected) {
            revealTab(tabButtons.get(activeTab))
            positionTabIndicator()
          }
        })
      }
      const tabResizeObserver =
        typeof ResizeObserver === "undefined"
          ? null
          : new ResizeObserver(positionActiveTabIndicator)
      tabResizeObserver?.observe(tabs)
      for (const button of tabButtons.values()) {
        tabResizeObserver?.observe(button)
      }
      if (!tabResizeObserver) {
        window.addEventListener("resize", positionActiveTabIndicator)
      }
      document.fonts?.ready.then(positionActiveTabIndicator)
      tabs.addEventListener("click", onClick)
      setupIndicatorHover(tabs, positionTabIndicator, revealTab)
      const infoPane = document.createElement("section")
      infoPane.className = "userpatch-detail-info"
      infoPane.hidden = true
      toolbar.append(tabScroller, qualityTabs.element)
      mainColumn.append(toolbar, infoPane, screenshotsPane, list, emptyNote)
      renderModeRows()
      applyTab(activeTab)
      const infoEntries = [
        ["Posted", data.date],
        ...data.metaRows.filter(([label]) => label !== "Posted"),
        ["Storyline", data.storyline],
      ]
      infoPane.append(createDetailInfoList(infoEntries))
      const trailer = createTrailer(data.trailer)
      if (trailer) {
        infoPane.append(trailer)
      }
      root.append(panel, mainColumn)
      document.body.append(root)
      const onReleaseClick = (event) => {
        if (event.target.closest(".userpatch-provider-link")) {
          return
        }
        const item = event.target.closest("a.userpatch-release-item")
        if (!item) {
          return
        }
        markReleaseOpened(item.querySelector(".userpatch-release-row"), item)
        saveOpenedRelease(item.dataset.userpatchFilename, item.href)
      }
      root.addEventListener("click", onReleaseClick, true)
      setDetailTooltipCleanup(setupProviderTooltip(root))
    }
    const ensureDetailPage = () => {
      if (document.querySelector(".userpatch-detail-root")) {
        return true
      }
      const data = extractDetail()
      if (!data) {
        return false
      }
      if (!data.releases.length && !data.episodes.length) {
        return false
      }
      buildDetailPage(data)
      return true
    }

    // src/shared/dom.js
    const normalizePathname = (path) => {
      try {
        return new URL(path, location.href).pathname.replace(/\/+$/, "") || "/"
      } catch {
        return ""
      }
    }

    // src/hdhub4u/search-dialog.js
    let searchDialog = null
    const openSearchDialog = () => {
      if (
        typeof HTMLDialogElement === "undefined" ||
        !(searchDialog instanceof HTMLDialogElement) ||
        typeof searchDialog.showModal !== "function" ||
        !searchDialog.isConnected
      ) {
        return false
      }
      if (!searchDialog.open) {
        searchDialog.showModal()
      }
      return true
    }
    const ensureSearchDialog = () => {
      if (!document.body || searchDialog?.isConnected) {
        return false
      }
      if (typeof HTMLDialogElement === "undefined") {
        return false
      }
      const dialog = document.createElement("dialog")
      dialog.id = "userpatch-search-dialog"
      dialog.className = "userpatch-search-dialog"
      dialog.setAttribute("aria-label", "Search movies and TV shows")
      dialog.setAttribute("closedby", "any")
      const form = document.createElement("form")
      form.className = "search-form"
      form.setAttribute("role", "search")
      form.method = "get"
      form.action = CONFIG.searchPagePath
      const inputGroup = document.createElement("div")
      inputGroup.className = "search-input-container"
      inputGroup.setAttribute("role", "group")
      const addon = document.createElement("span")
      addon.className = "userpatch-input-group-addon"
      addon.setAttribute("aria-hidden", "true")
      const icon = document.createElement("span")
      icon.className = "search-icon-overlay"
      icon.append(createLucideIcon("search"))
      addon.append(icon)
      const input = document.createElement("input")
      input.className = "search-input-overlay"
      input.type = "search"
      input.name = "q"
      input.placeholder = "Search movies and TV shows"
      input.setAttribute("aria-label", "Search movies and TV shows")
      input.setAttribute("autocomplete", "off")
      input.setAttribute("autocapitalize", "none")
      input.setAttribute("autocorrect", "off")
      input.setAttribute("spellcheck", "false")
      input.setAttribute("enterkeyhint", "search")
      input.maxLength = 200
      const submit = document.createElement("button")
      submit.type = "submit"
      submit.className = "search-submit"
      submit.hidden = true
      submit.setAttribute("aria-hidden", "true")
      inputGroup.append(addon, input, submit)
      form.append(inputGroup)
      dialog.append(form)
      document.body.append(dialog)
      searchDialog = dialog
      let pointerStartedOutside = false
      const isOutsideDialog = (event) => {
        const rect = dialog.getBoundingClientRect()
        return (
          event.clientX < rect.left ||
          event.clientX > rect.right ||
          event.clientY < rect.top ||
          event.clientY > rect.bottom
        )
      }
      const onPointerDown = (event) => {
        pointerStartedOutside = isOutsideDialog(event)
      }
      const onPointerUp = (event) => {
        const shouldDismiss =
          pointerStartedOutside && isOutsideDialog(event) && dialog.open
        pointerStartedOutside = false
        if (shouldDismiss) {
          dialog.close()
        }
      }
      if (!("closedBy" in HTMLDialogElement.prototype)) {
        dialog.addEventListener("pointerdown", onPointerDown)
        dialog.addEventListener("pointerup", onPointerUp)
      }
      return true
    }
    const resetSearchDialog = () => {
      searchDialog = null
    }

    // src/hdhub4u/header-nav.js
    const NAV_LABEL_WORD_FIXES = [
      [/\bbollywood\b/gi, "Bollywood"],
      [/\bhollywood\b/gi, "Hollywood"],
      [/\bgenres\b/gi, "Genres"],
    ]
    const normalizeNavItemLabel = (label) => {
      let text = label
      for (const [pattern, replacement] of NAV_LABEL_WORD_FIXES) {
        text = text.replace(pattern, replacement)
      }
      return text
    }
    const NAV_INDICATOR_CLASS = "userpatch-nav-indicator"
    const collectNavigation = () => {
      const items = []
      const links = document.querySelector("#category-links")
      if (links) {
        for (const item of links.children) {
          if (item.id === "mobile-search") {
            continue
          }
          const trigger = item.querySelector(":scope > a")
          const submenu = item.querySelectorAll(
            ":scope > .dropdown-menu a[href]"
          )
          if (submenu.length && trigger) {
            const label = normalizeNavItemLabel(
              normalizeText(trigger.textContent.replace("▾", ""))
            )
            const children = []
            for (const link of submenu) {
              const childLabel = normalizeNavItemLabel(
                normalizeText(link.textContent)
              )
              const href = link.getAttribute("href")
              if (childLabel && href && href !== "#") {
                children.push({
                  label: childLabel,
                  href,
                })
              }
            }
            if (label && children.length) {
              items.push({
                label,
                children,
              })
            }
            continue
          }
          if (!(trigger instanceof HTMLAnchorElement)) {
            continue
          }
          const label = normalizeNavItemLabel(
            normalizeText(
              trigger.textContent.replace("🏠", "").replace(/HDHub4u\s+/i, "")
            )
          )
          const href = trigger.getAttribute("href")
          if (label && href && href !== "#") {
            if (
              label.toLowerCase() === "home" ||
              href === "/" ||
              href === location.origin ||
              href === `${location.origin}/`
            ) {
              continue
            }
            items.push({
              label,
              href,
            })
          }
        }
      }
      const fourKButton = document.querySelector(
        ".navbar-header-custom a.custom-button[href]"
      )
      if (fourKButton) {
        const label =
          normalizeNavItemLabel(normalizeText(fourKButton.textContent)) ||
          "4K Movies"
        items.push({
          label,
          href: fourKButton.getAttribute("href"),
        })
      }
      return items
    }
    const matchesCurrentPage = (href) => {
      if (!href || href === "#") {
        return false
      }
      try {
        const url = new URL(href, location.href)
        if (url.origin !== location.origin) {
          return false
        }
        const targetPath = normalizePathname(url.pathname).toLowerCase()
        const currentPath = normalizePathname(location.pathname).toLowerCase()
        return (
          targetPath === currentPath ||
          (targetPath !== "/" && currentPath.startsWith(`${targetPath}/`))
        )
      } catch {
        return false
      }
    }
    let headerElement = null
    let headerNavContainer = null
    let headerNavIndicator = null
    let headerNavResizeObserver = null
    let refreshHeaderIndicator = () => {}
    const positionHeaderIndicator = (target) => {
      if (!headerNavIndicator || !headerNavContainer) {
        return
      }
      if (
        !target ||
        !headerNavContainer.contains(target) ||
        !window.matchMedia("(min-width: 46.01rem)").matches
      ) {
        headerNavIndicator.dataset.ready = "false"
        return
      }
      positionSelectionIndicator(
        headerNavIndicator,
        headerNavContainer,
        target,
        "nav"
      )
    }
    const positionActiveHeaderIndicator = () => {
      if (!headerNavContainer) {
        return
      }
      for (const item of headerNavContainer.querySelectorAll(
        ".userpatch-brand, .userpatch-nav-link"
      )) {
        item.classList.remove("userpatch-nav-active")
      }
      let activeItem =
        normalizePathname(location.pathname).toLowerCase() === "/"
          ? headerNavContainer.querySelector(".userpatch-brand")
          : null
      if (!activeItem) {
        for (const link of headerNavContainer.querySelectorAll(
          "a.userpatch-nav-link[href]"
        )) {
          if (matchesCurrentPage(link.getAttribute("href"))) {
            activeItem = link
            break
          }
        }
      }
      if (!activeItem) {
        for (const dropdown of headerNavContainer.querySelectorAll(
          ".userpatch-nav-item.dropdown"
        )) {
          const childMatches = [
            ...dropdown.querySelectorAll(".userpatch-dropdown-item[href]"),
          ].some((link) => matchesCurrentPage(link.getAttribute("href")))
          if (childMatches) {
            activeItem = dropdown.querySelector(":scope > .userpatch-nav-link")
            break
          }
        }
      }
      if (activeItem) {
        activeItem.classList.add("userpatch-nav-active")
      }
      positionHeaderIndicator(activeItem)
    }
    const setupHeaderIndicator = (container) => {
      headerNavContainer = container
      headerNavIndicator = document.createElement("span")
      headerNavIndicator.className = NAV_INDICATOR_CLASS
      headerNavIndicator.setAttribute("aria-hidden", "true")
      headerNavIndicator.dataset.ready = "false"
      container.prepend(headerNavIndicator)
      const getEventItem = (target) => {
        if (!(target instanceof Element)) {
          return null
        }
        return target.closest(
          ".userpatch-brand, .userpatch-nav-link, .userpatch-header-action"
        )
      }
      const onPointerOver = (event) => {
        if (
          (event.pointerType !== "mouse" && event.pointerType !== "pen") ||
          !window.matchMedia("(hover: hover) and (pointer: fine)").matches
        ) {
          return
        }
        const item = getEventItem(event.target)
        if (item) {
          positionHeaderIndicator(item)
        }
      }
      const onFocusIn = (event) => {
        const item = getEventItem(event.target)
        if (item) {
          positionHeaderIndicator(item)
        }
      }
      const onFocusOut = (event) => {
        if (
          !(event.relatedTarget instanceof Node) ||
          !container.contains(event.relatedTarget)
        ) {
          positionActiveHeaderIndicator()
        }
      }
      container.addEventListener("pointerover", onPointerOver)
      container.addEventListener("pointerleave", positionActiveHeaderIndicator)
      container.addEventListener("focusin", onFocusIn)
      container.addEventListener("focusout", onFocusOut)
      if (typeof ResizeObserver === "undefined") {
        window.addEventListener("resize", positionActiveHeaderIndicator)
      } else {
        headerNavResizeObserver = new ResizeObserver(
          positionActiveHeaderIndicator
        )
        headerNavResizeObserver.observe(container)
      }
      refreshHeaderIndicator = positionActiveHeaderIndicator
      positionActiveHeaderIndicator()
    }
    const ensureHeader = () => {
      if (!document.body) {
        return false
      }
      if (headerElement?.isConnected) {
        refreshHeaderIndicator()
        return true
      }
      const items = collectNavigation()
      const header = document.createElement("header")
      header.className = "userpatch-header"
      const inner = document.createElement("div")
      inner.className = "userpatch-header-inner"
      const container = document.createElement("div")
      container.className = "userpatch-header-container"
      const brand = document.createElement("a")
      brand.className = "userpatch-brand"
      brand.href = "/"
      brand.setAttribute("aria-label", "HDHub4u home")
      const brandImage = document.createElement("img")
      brandImage.src = HEADER_WORDMARK_DATA_URI
      brandImage.alt = "HDHub4u"
      brandImage.decoding = "async"
      brand.append(brandImage)
      container.append(brand)
      if (items.length) {
        const nav = document.createElement("nav")
        nav.className = "userpatch-nav"
        nav.setAttribute("aria-label", "Site navigation")
        const list = document.createElement("ul")
        list.className = "userpatch-nav-list"
        for (const item of items) {
          const listItem = document.createElement("li")
          listItem.className = "userpatch-nav-item"
          if (item.children) {
            listItem.classList.add("dropdown")
            const trigger = document.createElement("button")
            trigger.type = "button"
            trigger.className = "userpatch-nav-link"
            trigger.setAttribute("aria-haspopup", "true")
            trigger.setAttribute("aria-expanded", "false")
            const text = document.createElement("span")
            text.textContent = item.label
            trigger.append(text, createLucideIcon("chevron-down"))
            const submenu = document.createElement("ul")
            submenu.className = "userpatch-dropdown-menu"
            for (const child of item.children) {
              const childItem = document.createElement("li")
              const link = document.createElement("a")
              link.className = "userpatch-dropdown-item"
              link.href = child.href
              link.textContent = child.label
              childItem.append(link)
              submenu.append(childItem)
            }
            trigger.addEventListener("click", (event) => {
              event.stopPropagation()
              const willOpen = !listItem.classList.contains("open")
              for (const other of header.querySelectorAll(
                ".userpatch-nav-item.dropdown.open"
              )) {
                if (other !== listItem) {
                  other.classList.remove("open")
                  other
                    .querySelector(":scope > .userpatch-nav-link")
                    ?.setAttribute("aria-expanded", "false")
                }
              }
              listItem.classList.toggle("open", willOpen)
              trigger.setAttribute("aria-expanded", String(willOpen))
            })
            listItem.append(trigger, submenu)
          } else {
            const link = document.createElement("a")
            link.className = "userpatch-nav-link"
            link.href = item.href
            if (!item.href.startsWith("/")) {
              link.target = "_blank"
              link.rel = "noopener noreferrer"
            }
            link.textContent = item.label
            listItem.append(link)
          }
          list.append(listItem)
        }
        nav.append(list)
        container.append(nav)
      }
      const searchToggle = document.createElement("button")
      searchToggle.type = "button"
      searchToggle.className = "userpatch-header-action userpatch-search-toggle"
      searchToggle.setAttribute("aria-label", "Search")
      searchToggle.setAttribute("aria-haspopup", "dialog")
      searchToggle.append(createLucideIcon("search"))
      searchToggle.addEventListener("click", () => {
        openSearchDialog()
      })
      const menuToggle = document.createElement("button")
      menuToggle.type = "button"
      menuToggle.className = "userpatch-header-action userpatch-menu-toggle"
      menuToggle.setAttribute("aria-label", "Menu")
      menuToggle.setAttribute("popovertarget", CONFIG.mobileMenuPopoverId)
      menuToggle.append(createLucideIcon("menu"))
      container.append(menuToggle, searchToggle)
      inner.append(container)
      header.append(inner)
      document.body.prepend(header)
      headerElement = header
      setupHeaderIndicator(container)
      document.addEventListener("click", (event) => {
        if (!event.target.closest(".userpatch-nav-item.dropdown")) {
          for (const openDropdown of header.querySelectorAll(
            ".userpatch-nav-item.dropdown.open"
          )) {
            openDropdown.classList.remove("open")
            openDropdown
              .querySelector(":scope > .userpatch-nav-link")
              ?.setAttribute("aria-expanded", "false")
          }
        }
      })
      return true
    }
    const resetHeaderNavigation = () => {
      headerElement = null
      headerNavContainer = null
      headerNavIndicator = null
      refreshHeaderIndicator = () => {}
      if (headerNavResizeObserver) {
        headerNavResizeObserver.disconnect()
        headerNavResizeObserver = null
      }
    }

    // src/hdhub4u/listing.js
    const normalizePagination = (root = document) => {
      for (const list of root.querySelectorAll("ul.pagination")) {
        const wrapper = list.closest(".pagination-wrapper")
        if (wrapper) {
          wrapper.setAttribute("role", "navigation")
          wrapper.setAttribute("aria-label", "Pagination")
        }
        const pages = Array.from(list.querySelectorAll(".page-numbers")).filter(
          (element) => /^\d+$/.test(element.textContent.trim())
        )
        const first = pages[0]
        const last = pages.at(-1)
        for (const page of pages) {
          const current = page.classList.contains("current")
          page
            .closest("li")
            ?.classList.toggle(
              "userpatch-pagination-neighbor",
              page !== first && page !== last && !current
            )
          page.setAttribute("aria-label", `Page ${page.textContent.trim()}`)
          if (current) {
            page.setAttribute("aria-current", "page")
          }
        }
      }
      for (const arrow of root.querySelectorAll(
        "a.page-numbers.next, a.next, .pagination-next a, a[rel='next']"
      )) {
        if (!arrow.dataset.userpatchNormalized) {
          arrow.dataset.userpatchNormalized = "true"
          arrow.textContent = ""
          arrow.setAttribute("aria-label", "Next page")
          arrow.append(createLucideIcon("arrow-right"))
        }
      }
      for (const arrow of root.querySelectorAll(
        "a.page-numbers.prev, a.prev, .pagination-prev a, a[rel='prev']"
      )) {
        if (!arrow.dataset.userpatchNormalized) {
          arrow.dataset.userpatchNormalized = "true"
          arrow.textContent = ""
          arrow.setAttribute("aria-label", "Previous page")
          arrow.append(createLucideIcon("arrow-left"))
        }
      }
    }
    const ensureListingPage = () => {
      const main = document.querySelector("main#main-content.content-wrapper")
      if (!main) {
        return false
      }
      normalizePagination(main)
      normalizeListingTitles(main)
      if (main.classList.contains("userpatch-listing-ready")) {
        return true
      }
      const grid = main.querySelector("ul.recent-movies")
      if (!grid) {
        return false
      }
      for (const child of main.children) {
        if (child.matches("section.home-wrapper, .pagination-wrapper")) {
          child.classList.add(KEEP_CLASS)
        }
      }
      if (!main.querySelector(`.userpatch-keep ul.recent-movies`)) {
        for (const child of main.children) {
          child.classList.remove(KEEP_CLASS)
        }
        return false
      }
      for (const heading of main.querySelectorAll(
        "h2, .category-name, .page-title, .widget-title, .left-wrapper > h2, .home-wrapper > h2, .latest-releases-header"
      )) {
        heading.remove()
      }
      normalizePagination(main)
      for (const link of main.querySelectorAll(
        "li.thumb figure > a, li.thumb a"
      )) {
        link.setAttribute("draggable", "false")
      }
      let imageIndex = 0
      for (const img of main.querySelectorAll(
        "li.thumb figure > a > img, li.thumb img"
      )) {
        img.setAttribute("draggable", "false")
        if (imageIndex === 0) {
          img.fetchPriority = "high"
          img.loading = "eager"
        } else if (!img.hasAttribute("loading")) {
          img.loading = "lazy"
        }
        imageIndex += 1
        setupPosterRecovery(img)
        setupProgressiveImage(img)
      }
      for (const captionLink of main.querySelectorAll(
        "li.thumb figcaption a"
      )) {
        captionLink.tabIndex = -1
      }
      main.classList.add(LISTING_READY_CLASS)
      return true
    }

    // src/hdhub4u/mobile-nav.js
    let mobileMenuPopover = null
    const ensureMobileMenuPopover = () => {
      if (!document.body) {
        return null
      }
      if (mobileMenuPopover?.isConnected) {
        return mobileMenuPopover
      }
      if (!("popover" in HTMLElement.prototype)) {
        return null
      }
      const items = collectNavigation()
      const popover = document.createElement("div")
      popover.className = "userpatch-mobile-menu"
      popover.id = CONFIG.mobileMenuPopoverId
      popover.setAttribute("popover", "auto")
      const header = document.createElement("header")
      header.className = "userpatch-mobile-menu-header"
      const title = document.createElement("h2")
      title.className = "userpatch-mobile-menu-title"
      title.textContent = "Menu"
      const closeButton = document.createElement("button")
      closeButton.type = "button"
      closeButton.className = "userpatch-mobile-menu-close"
      closeButton.setAttribute("aria-label", "Close menu")
      closeButton.setAttribute("popovertarget", CONFIG.mobileMenuPopoverId)
      closeButton.setAttribute("popovertargetaction", "hide")
      closeButton.append(createLucideIcon("x"))
      header.append(title, closeButton)
      const nav = document.createElement("nav")
      nav.className = "userpatch-mobile-menu-nav"
      nav.setAttribute("aria-label", "Site navigation")
      const list = document.createElement("ul")
      list.className = "userpatch-mobile-menu-list"
      let groupIndex = 0
      for (const item of items) {
        const listItem = document.createElement("li")
        listItem.className = "userpatch-mobile-menu-item"
        if (item.children) {
          const group = document.createElement("details")
          group.className = "userpatch-mobile-menu-group"
          const summary = document.createElement("summary")
          summary.className = "userpatch-mobile-menu-summary"
          const label = document.createElement("span")
          label.textContent = item.label
          const submenuId = `userpatch-mobile-menu-sublist-${groupIndex}`
          summary.setAttribute("aria-controls", submenuId)
          summary.append(label, createLucideIcon("chevron-down"))
          const submenu = document.createElement("ul")
          submenu.className = "userpatch-mobile-menu-sublist"
          submenu.id = submenuId
          for (const child of item.children) {
            const childItem = document.createElement("li")
            const link = document.createElement("a")
            link.className = "userpatch-mobile-menu-link"
            link.href = child.href
            link.textContent = child.label
            childItem.append(link)
            submenu.append(childItem)
          }
          group.append(summary, submenu)
          listItem.append(group)
          groupIndex += 1
        } else {
          const link = document.createElement("a")
          link.className = "userpatch-mobile-menu-link"
          link.href = item.href
          if (!item.href.startsWith("/")) {
            link.target = "_blank"
            link.rel = "noopener noreferrer"
          }
          link.textContent = item.label
          listItem.append(link)
        }
        list.append(listItem)
      }
      nav.append(list)
      popover.append(header, nav)
      popover.addEventListener("click", (event) => {
        if (
          event.target instanceof Element &&
          event.target.closest("a[href]")
        ) {
          popover.hidePopover()
        }
      })
      document.body.append(popover)
      mobileMenuPopover = popover
      return popover
    }
    let mobileNavigationElement = null
    const ensureMobileNavigation = () => {
      if (!document.body) {
        return false
      }
      if (mobileNavigationElement?.isConnected) {
        return true
      }
      const popover = ensureMobileMenuPopover()
      if (!popover) {
        return false
      }
      const navigation = document.createElement("nav")
      navigation.className = "userpatch-mobile-nav"
      navigation.setAttribute("aria-label", "Mobile navigation")
      for (const [destination, label] of CONFIG.mobileNavigationItems) {
        const isAction = destination === "menu" || destination === "search"
        const item = document.createElement(isAction ? "button" : "a")
        item.className = "userpatch-mobile-nav-item"
        item.setAttribute("aria-label", label)
        if (isAction) {
          item.type = "button"
          if (destination === "menu") {
            item.setAttribute("popovertarget", CONFIG.mobileMenuPopoverId)
            item.setAttribute("aria-controls", CONFIG.mobileMenuPopoverId)
          } else {
            item.addEventListener("click", () => {
              if (!openSearchDialog()) {
                location.href = CONFIG.searchPagePath
              }
            })
          }
        } else {
          item.href = destination
        }
        const icon = document.createElement("span")
        icon.className = "userpatch-mobile-nav-icon"
        icon.setAttribute("aria-hidden", "true")
        if (label === "Home") {
          icon.classList.add("userpatch-mobile-nav-icon-brand")
          const image = document.createElement("img")
          image.className = "userpatch-mobile-nav-brand-logo"
          image.src = SITE_ICON_DATA_URI
          image.alt = ""
          image.width = 20
          image.height = 20
          image.decoding = "async"
          icon.append(image)
        } else {
          icon.append(
            createLucideIcon(destination === "menu" ? "menu" : "search")
          )
        }
        const text = document.createElement("span")
        text.textContent = label
        item.append(icon, text)
        navigation.append(item)
      }
      document.body.append(navigation)
      mobileNavigationElement = navigation
      const currentPath = normalizePathname(location.pathname)
      for (const link of navigation.querySelectorAll("a[href]")) {
        const targetPath = normalizePathname(link.href)
        if (targetPath === currentPath) {
          link.setAttribute("aria-current", "page")
        } else {
          link.removeAttribute("aria-current")
        }
      }
      return true
    }
    const resetMobileNavigationState = () => {
      mobileMenuPopover = null
      mobileNavigationElement = null
    }

    // src/shared/managed-meta.js
    const restoreManagedMeta = (metaIds) => {
      for (const id of metaIds) {
        const meta = document.getElementById(id)
        if (meta) {
          if (meta.dataset.originalContent !== undefined) {
            meta.content = meta.dataset.originalContent
            if (meta.dataset.originalId) {
              meta.id = meta.dataset.originalId
            } else {
              meta.removeAttribute("id")
            }
            delete meta.dataset.originalId
            delete meta.dataset.originalContent
          } else {
            meta.remove()
          }
        }
      }
      const modifiedViewportMeta = document.querySelector(
        'meta[name="viewport"][data-original-content]'
      )
      if (modifiedViewportMeta) {
        modifiedViewportMeta.content =
          modifiedViewportMeta.dataset.originalContent || ""
        delete modifiedViewportMeta.dataset.originalContent
      }
    }

    // src/hdhub4u/teardown.js
    const removeBookmarkOverlay = () => {
      try {
        for (const overlay of document.querySelectorAll(
          "[id^='bb-overlay-']"
        )) {
          overlay.remove()
        }
        const body = document.body
        if (body) {
          const classNames = (body.getAttribute("class") || "").split(/\s+/)
          for (const className of classNames) {
            if (className.startsWith("bb-")) {
              body.classList.remove(className)
            }
          }
        }
      } catch {}
    }
    const removeAppChrome = () => {
      dismissPageLoader(true)
      resetHeaderNavigation()
      resetSearchDialog()
      resetMobileNavigationState()
      clearDetailTooltipCleanup()
      resetScreenshotViewer()
      for (const node of document.querySelectorAll(
        ".userpatch-header, dialog.userpatch-search-dialog, .userpatch-mobile-nav, .userpatch-mobile-menu, .userpatch-detail-root, .userpatch-provider-tooltip"
      )) {
        node.remove()
      }
      const main = document.querySelector("main#main-content")
      if (main) {
        main.classList.remove(LISTING_READY_CLASS)
        for (const child of main.querySelectorAll(`.${KEEP_CLASS}`)) {
          child.classList.remove(KEEP_CLASS)
        }
      }
      restoreManagedMeta([COLOR_SCHEME_META_ID, THEME_COLOR_META_ID])
      document.getElementById(FONT_STYLE_ID)?.remove()
      document.getElementById(STYLE_ID)?.remove()
      document.documentElement?.classList.remove(
        MAIA_CLASS,
        DETAIL_PAGE_CLASS,
        HBLINKS_PAGE_CLASS
      )
      delete document.documentElement.dataset.userpatchTheme
    }

    // src/hdhub4u/main.js
    showRedesignLoader(/(^|\.)(hdhub4u|hblinks)\./i)
    const processCurrentPage = () => {
      if (isCloudflareChallenge()) {
        dismissPageLoader(true)
        removeAppChrome()
        return true
      }
      if (!ensureStyles()) {
        if (document.documentElement?.classList.contains("userpatch-maia")) {
          removeAppChrome()
        }
        return false
      }
      if (isLandingPage()) {
        return ensureLandingPage()
      }
      if (isHblinksArchivePage()) {
        const pageReady = ensureHblinksPage()
        document.documentElement.classList.toggle(HBLINKS_PAGE_CLASS, pageReady)
        document.documentElement.classList.remove(DETAIL_PAGE_CLASS)
        return pageReady
      }
      document.documentElement.classList.remove(HBLINKS_PAGE_CLASS)
      removeBookmarkOverlay()
      applySiteBranding()
      const isDetail = Boolean(document.body?.classList.contains("single"))
      let detailBuilt = false
      if (isDetail) {
        detailBuilt = ensureDetailPage()
      }
      document.documentElement.classList.toggle(DETAIL_PAGE_CLASS, detailBuilt)
      ensureHeader()
      ensureSearchDialog()
      ensureMobileNavigation()
      if (!isDetail) {
        const listingReady = ensureListingPage()
        normalizePagination(document)
        return listingReady
      }
      return detailBuilt
    }
    const hasSiteSignature = () =>
      isLandingPage() ||
      isHblinksArchivePage() ||
      (document.body?.classList.contains("wp-theme-9xhd") &&
        document.querySelector("main#main-content.content-wrapper"))
    discoverSite(hasSiteSignature, () => {
      initStorage({ openedReleasesKey: CONFIG.storageKeys.openedReleases })
      initPageLoop({
        processPage: processCurrentPage,
        attributeFilter: ["href", "src"],
        discoveryTimeoutMs: CONFIG.pageDiscoveryTimeoutMs,
      })
      initMaiaStyles({
        styleId: STYLE_ID,
        fontStyleId: FONT_STYLE_ID,
        colorSchemeMetaId: COLOR_SCHEME_META_ID,
        themeColorMetaId: THEME_COLOR_META_ID,
        themeColor: CONFIG.themeColor,
        css: MAIA_CSS,
        siteSignature: hasSiteSignature,
      })
      if (!isCloudflareChallenge() && !isHblinksHost()) {
        showInitialPageLoader(
          () => document.body || document.documentElement,
          () => {
            const spinner = createLucideIcon("loader-2")
            spinner.classList.add(PAGE_SPINNER_CLASS)
            return spinner
          },
          CONFIG.pageLoaderTimeoutMs
        )
      }
      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", schedulePageProcessing, {
          once: true,
        })
      }
      document.addEventListener(
        "dragstart",
        (event) => {
          if (
            event.target instanceof Element &&
            event.target.closest(
              "li.thumb, .userpatch-screenshot, figure, img, a"
            )
          ) {
            event.preventDefault()
          }
        },
        true
      )
      watchCurrentPage()
      window.addEventListener("pagehide", () => {
        stopWaiting()
      })
      window.addEventListener("pageshow", (event) => {
        if (event.persisted) {
          watchCurrentPage()
        }
      })
    })
  })()
}
