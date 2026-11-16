import { normalizeText } from "./dom.js"

export const parseDisplayTitle = (source) => {
  const original = normalizeText(source)
  const season = original.match(
    /\(Seasons?\s+(\d{1,2})(?:\s*[-–&]\s*(?:Season\s*)?(\d{1,2}))?\)/i
  )
  const year = original.match(/\((?:19|20)\d{2}\)/)
  // Only strip a suffix after an explicit season or release year. Words like
  // "HD" and "English" can belong to a real title, so they are not delimiters.
  const boundary = season?.index ?? (year ? year.index + year[0].length : null)
  const title =
    boundary === null
      ? original
      : original.slice(0, boundary).trim() || original
  const metadata = season ? original.slice(season.index + season[0].length) : ""
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
  return { title, progress, ongoing }
}

export const createSeriesProgress = (progress) => {
  if (!progress) {
    return null
  }
  const label = document.createElement("span")
  label.className = "userpatch-series-progress"
  label.textContent = progress
  return label
}

export const normalizeListingTitles = (root) => {
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
