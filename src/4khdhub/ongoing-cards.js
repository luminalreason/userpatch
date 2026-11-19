import { normalizePathname } from "../shared/dom.js"
import { storageGet, storageSet } from "../shared/storage.js"
import { CONFIG } from "./config.js"
import { normalizeText } from "./dom.js"

export const hasOngoingSeasonProgress = (metadata) => {
  const match = normalizeText(metadata).match(
    /\bS(\d{1,2})(?:\s*[-–—]\s*S(\d{1,2}))?\s+EP(\d{1,3})\b/i
  )
  return Boolean(
    match &&
    (!match[2] || Number(match[2]) > Number(match[1])) &&
    Number(match[3]) > 0
  )
}

const getOngoingPaths = () => {
  try {
    const paths = JSON.parse(storageGet(CONFIG.storageKeys.ongoingPosters))
    return new Set(Array.isArray(paths) ? paths : [])
  } catch {
    return new Set()
  }
}

export const markOngoingSeriesPosters = (siteRoot) => {
  const cards = siteRoot.querySelectorAll("a.movie-card[href]")
  if (!cards.length) {
    return
  }

  const ongoingPaths = getOngoingPaths()
  let changed = false
  for (const card of cards) {
    const poster = card.querySelector(".movie-card-image")
    if (!poster) {
      continue
    }

    const isOngoing = hasOngoingSeasonProgress(
      card.querySelector(".movie-card-meta")?.textContent
    )

    poster.classList.toggle("userpatch-ongoing-poster", isOngoing)
    card.classList.toggle("userpatch-ongoing-series", isOngoing)

    const target = URL.parse(card.href, location.href)
    if (target?.origin !== location.origin) {
      continue
    }
    const path = normalizePathname(target.pathname)
    if (isOngoing !== ongoingPaths.has(path)) {
      if (isOngoing) {
        ongoingPaths.add(path)
      } else {
        ongoingPaths.delete(path)
      }
      changed = true
    }
  }
  if (changed) {
    // The detail page can report E00 even while the listing shows new episodes.
    storageSet(
      CONFIG.storageKeys.ongoingPosters,
      JSON.stringify([...ongoingPaths].slice(-500))
    )
  }
}

export const markOngoingDetailPoster = (siteRoot) => {
  const poster = siteRoot.querySelector(".content-sidebar .poster-container")
  if (!poster) {
    return
  }

  poster.classList.toggle(
    "userpatch-ongoing-poster",
    getOngoingPaths().has(normalizePathname(location.pathname))
  )
}
