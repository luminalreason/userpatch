// ==UserScript==
// @name         HubCloud Redesign
// @namespace    https://github.com/luminalreason/userpatch
// @version      0.3.0
// @description  A system-themed interface with clearer download choices, link sharing, copy controls, and a guide to compare download mirrors.
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

;("use strict")

;(function () {
  // src/hubcdn/detect.js
  const isHubCdnGeneratedPage = () =>
    Boolean(
      document.querySelector("#download_container .loading") &&
      /hubcdn/i.test(document.querySelector("main > header")?.textContent || "")
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
    "loader-2": Object.freeze([["path", { d: "M21 12a9 9 0 1 1-6.219-8.56" }]]),
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
    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs")
    const linearGradient = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "linearGradient"
    )
    linearGradient.setAttribute("id", "telegram__a")
    linearGradient.setAttribute("x1", "50%")
    linearGradient.setAttribute("x2", "50%")
    linearGradient.setAttribute("y1", "0%")
    linearGradient.setAttribute("y2", "100%")
    const stop1 = document.createElementNS("http://www.w3.org/2000/svg", "stop")
    stop1.setAttribute("offset", "0%")
    stop1.setAttribute("stop-color", "#2AABEE")
    const stop2 = document.createElementNS("http://www.w3.org/2000/svg", "stop")
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
    Promise.allSettled(animations.map((animation) => animation.finished)).then(
      finishClose
    )
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
    const ready = Boolean(button && isDownloadHref(button.getAttribute("href")))
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
    if (oldCenter && oldCenter !== container && !oldCenter.textContent.trim()) {
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
    for (const el of document.querySelectorAll(
      ".text-success, p.h3, h3, .h3"
    )) {
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
