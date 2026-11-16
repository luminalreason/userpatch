import { normalizePathname } from "../shared/dom.js"
import { CONFIG } from "./config.js"
import { normalizeText } from "./dom.js"

export let ongoingCardNavigationCleanup = null
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

export const setupOngoingCardNavigationTracking = () => {
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

export const markOngoingSeriesPosters = (siteRoot) => {
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

export const markOngoingDetailPoster = (siteRoot) => {
  const poster = siteRoot.querySelector(".content-sidebar .poster-container")
  if (!poster) {
    return
  }

  let storedPath = ""
  try {
    storedPath = sessionStorage.getItem(CONFIG.ongoingPosterSessionKey) || ""
  } catch {
    storedPath = ""
  }

  const isOngoing =
    storedPath !== "" &&
    normalizePathname(location.pathname) === normalizePathname(storedPath)
  poster.classList.toggle("userpatch-ongoing-poster", isOngoing)
}

export const clearOngoingCardNavigationCleanup = () => {
  ongoingCardNavigationCleanup = null
}
