import {
  POSTER_BADGE_ASPECT_RATIOS,
  POSTER_BADGE_LABELS,
  USERPATCH_BADGE_DATA,
} from "../shared/badges.js"
import { RELEASE_QUALITY_PATTERNS } from "../shared/quality.js"
import { createLucideIcon } from "./icons.js"

export const getFilenameBadgeNames = (siteRoot) => {
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
  } else if (hasDolby) {
    badges.push("dolby-audio")
  }

  if (hasDtsX) {
    badges.push("dts-x")
  } else if (hasDts) {
    badges.push("dts")
  }

  return badges
}

export const updatePosterBadges = (siteRoot, sharedAudio) => {
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

  if (sharedAudio !== undefined) {
    const audioTerm = Array.from(
      siteRoot.querySelectorAll(".userpatch-detail-info dt")
    ).find((term) => term.textContent.trim().toLowerCase() === "audios:")
    if (audioTerm?.nextElementSibling?.matches("dd")) {
      audioTerm.hidden = Boolean(sharedAudio)
      audioTerm.nextElementSibling.hidden = audioTerm.hidden
    }
  }

  let audio = stack.querySelector(":scope > .userpatch-poster-audio")
  if (sharedAudio === undefined && audio) {
    badgeList.after(audio)
  } else if (sharedAudio) {
    if (!audio) {
      audio = document.createElement("div")
      audio.className = "userpatch-poster-audio"
    }
    const icon = createLucideIcon("audio-lines")
    icon.classList.add("userpatch-series-language-icon")
    icon.dataset.userpatchLucideIcon = "audio-lines"
    const label = document.createElement("span")
    label.className = "userpatch-series-language-text"
    label.textContent = sharedAudio
    audio.replaceChildren(icon, label)
    badgeList.after(audio)
  } else {
    audio?.remove()
  }
}
