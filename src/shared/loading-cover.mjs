// The build places this small function before each bundle. It cannot import
// runtime helpers: it must run before the larger redesign initializes.
export function installLoadingCover(force = false, timeoutMs = 8000) {
  const root = document.documentElement
  if (!root) {
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
      html[data-userpatch-loading] { background: #0a0a0a !important; }
      html[data-userpatch-loading] > body { visibility: hidden !important; }
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
}
