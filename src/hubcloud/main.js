import {
  getGeneratedPage,
  normalizeGeneratedPage,
} from "../shared/generated-page.js"
import {
  dismissPageLoader,
  showInitialPageLoader,
  showRedesignLoader,
} from "../shared/page-loader.js"
import { normalizeActionButtons } from "./action-buttons.js"
import { removeClutter } from "./clutter.js"
import {
  hasHubCloudDomSignatures,
  isCloudflareChallenge,
  isDirectFileLink,
} from "./detect.js"
import { normalizeFileDetails } from "./file-details.js"
import { normalizeLucideIcons } from "./icons.js"
import { wrapDownloadButtons } from "./mirror-rows.js"
import { isHubCloudPackPage, normalizePackPage } from "./pack-page.js"
import { ensureHeader, ensureStyles } from "./site-header.js"

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
    // A changed layout must leave the source page usable.
  } finally {
    // Ignore our own edits so normalizing the DOM cannot feed the observer.
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
  // Unrelated pages only need a bounded window to recognize late markup.
  if (!active) {
    window.clearTimeout(detectionTimeout)
    detectionTimeout = window.setTimeout(() => observer.disconnect(), 30000)
  }
  processMutations()
}

observePage()
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", processMutations, {
    once: true,
  })
}
// Active pages can load mirrors after any user click; watch until navigation.
window.addEventListener("pagehide", () => {
  observer.disconnect()
  window.clearTimeout(detectionTimeout)
})
window.addEventListener("pageshow", (event) => {
  if (event.persisted) {
    observePage()
  }
})
