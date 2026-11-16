import { SITE_ICON_DATA_URI as FOUR_K_ICON } from "../shared/4khdhub-icon.js"
import {
  POSTER_BADGE_ASPECT_RATIOS,
  POSTER_BADGE_LABELS,
  USERPATCH_BADGE_DATA,
} from "../shared/badges.js"
import {
  RELEASE_QUALITY_PATTERNS,
  getReleaseQuality,
} from "../shared/quality.js"
import { isReleaseOpened, markReleaseOpened } from "../shared/storage.js"
import { createLucideIcon } from "./icons.js"

export const getDetailBadgeNames = (data) => {
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
  const hasDtsX = /(?:^|[^A-Z0-9])DTS(?:[:._ -]*X)(?=$|[^A-Z0-9])/.test(pool)
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

export const buildPosterBadges = (badges) => {
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

export const buildReleaseRow = (row, openedReleases) => {
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
    image.src = row.external ? FOUR_K_ICON : row.provider.logo
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

export const buildEpisodeRow = (episode, group, openedReleases) => {
  const item = document.createElement("div")
  item.className = "userpatch-release-item"
  const label = `Episode ${episode.number}`
  item.dataset.userpatchFilename = `${label} ${group.quality}`.trim()
  item.dataset.userpatchQuality = getReleaseQuality(`${group.quality} ${label}`)

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

export let detailTooltipCleanup = null

export const clearDetailTooltipCleanup = () => {
  detailTooltipCleanup?.()
  detailTooltipCleanup = null
}

export const setDetailTooltipCleanup = (cleanup) => {
  clearDetailTooltipCleanup()
  detailTooltipCleanup = cleanup
}
