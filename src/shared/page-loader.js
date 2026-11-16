import { installLoadingCover } from "./loading-cover.mjs"

export const PAGE_LOADER_ID = "userpatch-page-loader"
export const PAGE_LOADER_HIDDEN_CLASS = "userpatch-page-loader-hidden"
export const PAGE_SPINNER_CLASS = "userpatch-page-spinner"

let revealPending = false

export const showRedesignLoader = (hostPattern) => {
  if (hostPattern.test(location.hostname)) {
    installLoadingCover()
  }
}

export const showInitialPageLoader = (guard, _buildSpinner, timeoutMs) => {
  if (guard()) {
    installLoadingCover(true, timeoutMs)
  }
}

export const dismissPageLoader = (immediate = false) => {
  if (immediate) {
    delete document.documentElement?.dataset.userpatchLoading
    document.getElementById(PAGE_LOADER_ID)?.remove()
    revealPending = false
    return
  }
  if (revealPending || !document.getElementById(PAGE_LOADER_ID)) {
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
