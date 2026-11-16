// Interface:
// Exports: initPageLoop, stopWaiting, runPageProcessing, schedulePageProcessing, watchCurrentPage
// Options: initPageLoop receives the site's context once — processPage (the site's processCurrentPage), attributeFilter list, characterData flag, and discoveryTimeoutMs from CONFIG.
// Invariants: the observer/timer lets live here; stopWaiting resets all of them.
// Error modes: runPageProcessing catches processPage failures and force-dismisses the loader.

import { isCloudflareChallenge } from "./cloudflare.js"
import { dismissPageLoader } from "./page-loader.js"

let pageLoop = null

export const initPageLoop = (context) => {
  pageLoop = context
}

let pageObserver = null

let waitTimer = 0

let pageProcessingTimer = 0

export const stopWaiting = () => {
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

export const runPageProcessing = () => {
  // Ignore our own DOM changes while allowing late site content to be retried.
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

export const schedulePageProcessing = () => {
  if (pageProcessingTimer) {
    return
  }
  pageProcessingTimer = window.setTimeout(() => {
    pageProcessingTimer = 0
    runPageProcessing()
  }, 0)
}

export const watchCurrentPage = () => {
  stopWaiting()
  pageObserver = new MutationObserver(schedulePageProcessing)
  waitTimer = window.setTimeout(() => {
    runPageProcessing()
    stopWaiting()
    dismissPageLoader()
  }, pageLoop.discoveryTimeoutMs)
  runPageProcessing()
}
