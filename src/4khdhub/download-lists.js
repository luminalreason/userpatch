import { normalizePathname } from "../shared/dom.js"
import { setupProviderTooltip as setupReleaseProviderTooltip } from "../shared/provider-tooltip.js"
import {
  createQualityTabs,
  positionSelectionIndicator,
} from "../shared/quality-tabs.js"
import { getReleaseQuality } from "../shared/quality.js"
import { createSelectOption, createSelectTrigger } from "../shared/select.js"
import {
  getOpenedReleases,
  isReleaseOpened,
  markReleaseOpened,
  storageGet,
  storageSet,
} from "../shared/storage.js"
import { CONFIG } from "./config.js"
import { normalizeText } from "./dom.js"
import { addFetchLinks } from "./fetch-links.js"
import {
  clearReleaseFilenameMeasurements,
  pruneReleaseFilenameCleanups,
  releaseFilenameCleanups,
  setupExpandableFilename,
  simplifyEpisodeFilename,
} from "./filename.js"
import { createLucideIcon } from "./icons.js"
import { updatePosterBadges } from "./poster-badges.js"
import { createReleaseActions } from "./provider-links.js"

export let movieReleaseListCleanup = null
export let seriesReleaseCleanup = null
export let releaseProviderTooltipCleanup = null
export const isReleaseSize = (value) =>
  /^\d+(?:[.,]\d+)?\s*(?:B|KB|MB|GB|TB|PB|KIB|MIB|GIB|TIB|PIB)$/i.test(value)

export const setupResponsiveReleaseFilter = (
  toolbar,
  section,
  filters,
  refresh
) => {
  const breakpoint = window.matchMedia(
    `(max-width: ${CONFIG.mobileLayoutBreakpointRem}rem)`
  )
  const positionFilter = () => {
    if (breakpoint.matches) {
      const list = section.querySelector(".userpatch-release-list")
      section.insertBefore(filters, list || null)
    } else {
      toolbar.append(filters)
    }
    refresh?.()
  }

  positionFilter()
  breakpoint.addEventListener("change", positionFilter)
  return () => {
    breakpoint.removeEventListener("change", positionFilter)
    toolbar.append(filters)
  }
}

export const clearMobileQualityScrollSpace = (section) => {
  delete section.dataset.mobileQualityScrollSpace
  section.style.removeProperty("--userpatch-mobile-quality-scroll-space")
}

export const scrollListBelowStickyFilter = (filter, list, section) => {
  if (
    !window.matchMedia(`(max-width: ${CONFIG.mobileLayoutBreakpointRem}rem)`)
      .matches
  ) {
    return
  }

  const filterStyle = getComputedStyle(filter)
  const filterRect = filter.getBoundingClientRect()
  const listRect = list.getBoundingClientRect()
  const stickyTop =
    Number.parseFloat(filterStyle.insetBlockStart) ||
    CONFIG.mobileQualityStickyTopPx
  const marginAfter = Number.parseFloat(filterStyle.marginBlockEnd) || 0
  const targetTop =
    window.scrollY + listRect.top - filterRect.height - marginAfter - stickyTop
  const scrollingElement = document.scrollingElement || document.documentElement
  const maxScroll = Math.max(
    0,
    scrollingElement.scrollHeight - window.innerHeight
  )
  const extraScrollSpace = Math.ceil(targetTop - maxScroll)
  if (extraScrollSpace > 0) {
    section.style.setProperty(
      "--userpatch-mobile-quality-scroll-space",
      `${extraScrollSpace}px`
    )
    section.dataset.mobileQualityScrollSpace = "true"
  }
  const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "auto"
    : CONFIG.mobileQualityScrollBehavior
  window.scrollTo({ top: Math.max(0, targetTop), behavior })
}

export const setupMovieReleaseList = (siteRoot) => {
  try {
    const main = siteRoot.querySelector(".content-grid .content-main")
    const section = Array.from(
      main?.querySelectorAll(".content-section") || []
    ).find(
      (candidate) =>
        candidate.classList.contains("userpatch-movie-releases") ||
        candidate.querySelector(".download-group, .space-y-4 > .download-item")
    )
    const list = section?.querySelector(".space-y-4")
    if (!section || !list) {
      return false
    }

    // Validate every row before flattening groups or replacing the site's links.
    const sourceItems = Array.from(list.querySelectorAll(".download-item"))
    if (!sourceItems.length) {
      return false
    }
    const releases = new Map()
    for (const item of sourceItems) {
      if (item.dataset.userpatchReleaseReady === "true") {
        continue
      }
      const header = item.querySelector(":scope > .download-header")
      const content = item.querySelector(":scope > div[id^='content-']")
      const filename = normalizeText(
        content?.querySelector(".file-title")?.textContent
      )
      const actions = content && createReleaseActions(content)
      if (!header || !filename || !actions) {
        return false
      }
      releases.set(item, { header, filename, actions })
    }

    main.classList.add("userpatch-release-main")
    main.classList.remove("userpatch-series-main")
    section.classList.add("userpatch-movie-releases")
    list.classList.add("userpatch-release-list")

    for (const group of list.querySelectorAll(".download-group")) {
      for (const item of group.querySelectorAll(".download-item")) {
        list.append(item)
      }
      group.remove()
    }

    const openedReleases = getOpenedReleases()
    for (const [item, { header, filename, actions }] of releases) {
      const size = Array.from(header.querySelectorAll("code .badge"))
        .map((badge) => badge.textContent.trim().replaceAll(/\s+/g, " "))
        .find(isReleaseSize)
      const copy = document.createElement("div")
      copy.className = "userpatch-release-copy"

      const title = document.createElement("div")
      title.className = "userpatch-release-file-title"

      const details = document.createElement("div")
      details.className = "userpatch-release-meta"
      if (size) {
        details.textContent = size
        copy.append(title, details)
      } else {
        copy.append(title)
      }

      const row = document.createElement("div")
      row.className = "userpatch-release-row"
      row.append(copy, actions)
      addFetchLinks(row, actions)
      item.replaceChildren(row)
      item.classList.add("userpatch-release-item")
      if (isReleaseOpened(filename, actions, openedReleases)) {
        markReleaseOpened(row, item)
      }
      item.dataset.userpatchFilename = filename
      item.dataset.userpatchQuality = getReleaseQuality(filename)
      const cleanupFilenameMeasurement = setupExpandableFilename(
        title,
        filename
      )
      releaseFilenameCleanups.push(cleanupFilenameMeasurement)
      item.dataset.userpatchReleaseReady = "true"
    }

    let toolbar =
      main.querySelector(":scope > .userpatch-release-toolbar") ||
      section.querySelector(":scope > .userpatch-release-toolbar")
    if (!toolbar?.userpatchRefresh) {
      movieReleaseListCleanup?.()
      movieReleaseListCleanup = null
      toolbar?.remove()
      toolbar = document.createElement("div")
      toolbar.className = "userpatch-release-toolbar"

      const qualityTabs = createQualityTabs({
        storageKey: CONFIG.storageKeys.movieQualityTab,
        onQualityChange: (quality) => {
          toolbar.dataset.activeQuality = quality
          clearMobileQualityScrollSpace(section)
          refresh()
          scrollListBelowStickyFilter(qualityTabs.element, list, section)
        },
      })
      const filters = qualityTabs.element

      toolbar.append(filters)
      toolbar.userpatchFilters = filters
      main.insertBefore(toolbar, section)

      const refresh = () => {
        const items = Array.from(list.querySelectorAll(".download-item"))
        const available = new Set(
          items.map((item) => item.dataset.userpatchQuality)
        )
        const activeQuality = qualityTabs.refreshButtons(available)
        toolbar.dataset.activeQuality = activeQuality

        for (const item of items) {
          const quality = item.dataset.userpatchQuality || "unknown"
          item.classList.toggle(
            "userpatch-filter-hidden",
            activeQuality !== "all" && quality !== activeQuality
          )
        }
      }

      toolbar.dataset.activeQuality = qualityTabs.getActiveQuality()
      toolbar.userpatchRefresh = refresh
      toolbar.userpatchPositionIndicator = qualityTabs.positionIndicator
      toolbar.userpatchCleanup = () => {
        delete toolbar.userpatchRefresh
        qualityTabs.cleanup()
      }
      movieReleaseListCleanup = toolbar.userpatchCleanup
    }

    const movieFilters =
      toolbar.userpatchFilters ||
      toolbar.querySelector(".userpatch-quality-tabs") ||
      section.querySelector(".userpatch-quality-tabs")
    if (movieFilters && !toolbar.userpatchResponsiveCleanup) {
      const cleanupResponsiveFilter = setupResponsiveReleaseFilter(
        toolbar,
        section,
        movieFilters,
        toolbar.userpatchPositionIndicator
      )
      toolbar.userpatchResponsiveCleanup = cleanupResponsiveFilter
      const cleanupControls = toolbar.userpatchCleanup
      toolbar.userpatchCleanup = () => {
        cleanupResponsiveFilter()
        cleanupControls?.()
      }
      movieReleaseListCleanup = toolbar.userpatchCleanup
    }

    if (!releaseProviderTooltipCleanup) {
      releaseProviderTooltipCleanup = setupReleaseProviderTooltip(siteRoot)
    }
    toolbar.userpatchRefresh?.()
    updatePosterBadges(siteRoot)
    return true
  } catch {
    return false
  }
}

export const setupSeriesReleaseList = (siteRoot) => {
  try {
    const main = siteRoot.querySelector(".content-grid .content-main")
    const tabs = main?.querySelector("#series-tabs")
    const panels = {
      "complete-pack": main?.querySelector("#complete-pack"),
      episodes: main?.querySelector("#episodes"),
    }
    if (!main || !tabs || (!panels["complete-pack"] && !panels.episodes)) {
      return false
    }

    const existingToolbar = main.querySelector(
      ":scope > .userpatch-series-toolbar"
    )
    const sourceMarkup = Object.values(panels)
      .map((panel) => panel?.innerHTML || "")
      .join("\u0000")
    if (
      existingToolbar?.userpatchRefresh &&
      existingToolbar.userpatchSourceMarkup === sourceMarkup
    ) {
      existingToolbar.userpatchRefresh?.()
      return true
    }
    if (existingToolbar) {
      cleanupReleaseLists()
    }

    const sourceSection =
      tabs.closest(".content-section") ||
      panels["complete-pack"]?.closest(".content-section") ||
      panels.episodes?.closest(".content-section")
    const listSection = document.createElement("section")
    listSection.className =
      "content-section userpatch-movie-releases userpatch-series-releases"
    const list = document.createElement("div")
    list.className = "space-y-4 userpatch-release-list"
    listSection.append(list)
    const filenameCleanups = []

    const modeEntries = new Map()
    const showTitle = normalizeText(
      siteRoot.querySelector(".userpatch-detail-title, .page-title")
        ?.textContent || ""
    )
    const getEpisodeGroupLabel = (value) => {
      let label = normalizeText(value)
      const remainder = label.slice(showTitle.length)
      if (
        showTitle &&
        label.slice(0, showTitle.length).toLowerCase() ===
          showTitle.toLowerCase() &&
        /^[\s([{]/.test(remainder)
      ) {
        label = remainder
      }
      return normalizeText(label.replaceAll(/[()[\]]/g, " "))
    }
    const getSeasonCode = (label) => {
      const season = label.match(/season\s*(\d+)/i)?.[1]
      const part = label.match(/part\s*(\d+)/i)?.[1]
      if (!season) {
        return ""
      }
      return `S${season.padStart(2, "0")}${part ? `P${part.padStart(2, "0")}` : ""}`
    }
    const getQualityGroupLabel = (label, seasonLabel) => {
      const normalized = getEpisodeGroupLabel(label) || seasonLabel
      const seasonCode = getSeasonCode(seasonLabel)
      const codePattern = seasonCode
        ? new RegExp(`^${seasonCode}\\s*`, "i")
        : /^S\d{1,2}(?:P\d{1,2})?\s*/i
      return normalizeText(normalized.replace(codePattern, "")) || normalized
    }
    const getArchiveLanguages = (file) => {
      const badgeElements = Array.from(
        file.querySelectorAll(
          ".download-header code .badge, .download-header .badge"
        )
      )
      for (const badge of badgeElements) {
        const style = badge.getAttribute("style") || ""
        if (
          style.includes("#0d9488") ||
          style.includes("13, 148, 136") ||
          badge.classList.contains("badge-teal")
        ) {
          const text = normalizeText(badge.textContent)
          if (text) {
            return text
          }
        }
      }

      for (const badge of badgeElements) {
        const text = normalizeText(badge.textContent)
        if (!text) {
          continue
        }
        const isSize = isReleaseSize(text)
        const isFormat =
          /^(?:WEB-?DL|WEBRip|BluRay|BRRip|HDRip|HDTC|DVDRip|CAMRip|HDTV|REMUX)$/i.test(
            text
          )
        const isResolution =
          /^(?:2160p|1080p|720p|480p|4k|hdr|dovi|sdr|hevc|h\.?26[45]|x26[45])$/i.test(
            text
          )
        const isEpisode = /^Episodes?\s+\d+\b/i.test(text)
        const isSite = /^4khdhub(?:\.com)?$/i.test(text)
        if (!isSize && !isFormat && !isResolution && !isEpisode && !isSite) {
          return text
        }
      }

      return ""
    }
    const getSeasonSortParts = (label) => {
      const code = getSeasonCode(label)
      const match =
        code.match(/^S(\d{1,2})(?:P(\d{1,2}))?$/i) ||
        normalizeText(label).match(/\bS(\d{1,2})(?:P(\d{1,2}))?\b/i)
      return match ? [Number(match[1]), Number(match[2] || 0)] : null
    }
    const getEpisodeSortParts = (file, seasonLabel) => {
      const filename = normalizeText(
        file.querySelector(".episode-file-title")?.textContent || ""
      )
      const fullCode = filename.match(
        /(?:^|[^a-z0-9])S(\d{1,2})(?:P(\d{1,2}))?E(\d{1,3})(?=$|[^a-z0-9])/i
      )
      if (fullCode) {
        return [
          Number(fullCode[1]),
          Number(fullCode[2] || 0),
          Number(fullCode[3]),
        ]
      }
      const episodeCode = filename.match(
        /(?:^|[^a-z0-9])(?:episode|ep|e)\s*0*(\d{1,3})(?=$|[^a-z0-9])/i
      )
      if (!episodeCode) {
        return null
      }
      return [
        ...(getSeasonSortParts(seasonLabel) || [0, 0]),
        Number(episodeCode[1]),
      ]
    }
    const sortEpisodeFiles = (files, seasonLabel) =>
      files
        .map((file, index) => ({
          file,
          index,
          parts: getEpisodeSortParts(file, seasonLabel),
        }))
        .toSorted((left, right) => {
          if (!left.parts) {
            return right.parts ? 1 : left.index - right.index
          }
          if (!right.parts) {
            return -1
          }
          for (let index = 0; index < left.parts.length; index += 1) {
            const difference = left.parts[index] - right.parts[index]
            if (difference) {
              return difference
            }
          }
          return left.index - right.index
        })
        .map(({ file }) => file)

    const getEpisodeEntries = (episodeGroups, mode, seasonIndex, seasonLabel) =>
      episodeGroups.flatMap((episodeGroup, groupIndex) => {
        const rawLabel = normalizeText(
          episodeGroup.querySelector(".episode-title .download-title-text")
            ?.textContent ||
            episodeGroup.querySelector(".episode-title")?.textContent ||
            ""
        )
        const label = getQualityGroupLabel(rawLabel, seasonLabel)
        const languages =
          Array.from(
            episodeGroup.querySelectorAll(
              ".episode-header .episode-meta .badge"
            )
          )
            .map((badge) => normalizeText(badge.textContent))
            .find((value) => value && !/^Episodes?\s+\d+\b/i.test(value)) || ""
        const files = sortEpisodeFiles(
          Array.from(episodeGroup.querySelectorAll(".episode-download-item")),
          seasonLabel
        )
        if (!files.length) {
          return []
        }

        return [
          {
            key: `${mode}-${seasonIndex}-${groupIndex}`,
            label,
            languages,
            seasonKey: `${mode}-season-${seasonIndex}`,
            seasonLabel,
            files,
          },
        ]
      })

    for (const [mode, panel] of Object.entries(panels)) {
      const seasons = Array.from(
        panel?.querySelectorAll(".series-season-group") || []
      )
      const entries = []
      if (mode === "complete-pack" && !seasons.length) {
        const directFiles = Array.from(
          panel?.querySelectorAll(".download-item") || []
        )
        if (directFiles.length) {
          const seasonMap = new Map()
          for (const file of directFiles) {
            const epNum =
              file.querySelector(".episode-number")?.textContent?.trim() || ""
            const titleText =
              file.querySelector(".file-title, .download-header")
                ?.textContent || ""
            const match =
              `${epNum} ${titleText}`.match(/\bS(\d{1,2})\b/i) ||
              `${epNum} ${titleText}`.match(/\bSeason\s*(\d{1,2})\b/i)
            const seasonNum = match ? Number(match[1]) : 1
            const seasonLabel = `Season ${seasonNum}`
            if (!seasonMap.has(seasonLabel)) {
              seasonMap.set(seasonLabel, [])
            }
            seasonMap.get(seasonLabel).push(file)
          }
          let seasonIndex = 0
          for (const [seasonLabel, files] of seasonMap) {
            const seasonKey = `${mode}-season-${seasonIndex}`
            entries.push({
              key: `${mode}-${seasonIndex}`,
              label: seasonLabel,
              languages: "",
              mode,
              seasonKey,
              seasonLabel,
              files,
            })
            seasonIndex += 1
          }
        }
      }
      if (mode === "episodes" && !seasons.length) {
        const directEpisodeGroups = Array.from(
          panel?.querySelectorAll(".episode-item") || []
        )
        if (directEpisodeGroups.length) {
          const episodeSeasonMap = new Map()
          for (const episodeGroup of directEpisodeGroups) {
            const epNum =
              episodeGroup
                .querySelector(".episode-number")
                ?.textContent?.trim() || ""
            const rawTitle =
              episodeGroup.querySelector(".episode-title")?.textContent || ""
            const match =
              `${epNum} ${rawTitle}`.match(/\bS(\d{1,2})\b/i) ||
              `${epNum} ${rawTitle}`.match(/\bSeason\s*(\d{1,2})\b/i)
            const seasonNum = match ? Number(match[1]) : 1
            const seasonLabel = `Season ${seasonNum}`
            if (!episodeSeasonMap.has(seasonLabel)) {
              episodeSeasonMap.set(seasonLabel, [])
            }
            episodeSeasonMap.get(seasonLabel).push(episodeGroup)
          }

          let seasonIndex = 0
          for (const [seasonLabel, episodeGroups] of episodeSeasonMap) {
            const seasonKey = `${mode}-season-${seasonIndex}`
            const episodeEntries = getEpisodeEntries(
              episodeGroups,
              mode,
              seasonIndex,
              seasonLabel
            )
            episodeEntries.forEach(({ key, label, languages = "", files }) => {
              if (files.length) {
                entries.push({
                  key,
                  label,
                  languages,
                  mode,
                  seasonKey,
                  seasonLabel,
                  files,
                })
              }
            })
            seasonIndex += 1
          }
        } else {
          const directFiles = sortEpisodeFiles(
            Array.from(panel?.querySelectorAll(".episode-download-item") || []),
            "Season 1"
          )
          if (directFiles.length) {
            entries.push({
              key: `${mode}-0-0`,
              label: "All Episodes",
              languages: "",
              mode,
              seasonKey: `${mode}-season-0`,
              seasonLabel: "Season 1",
              files: directFiles,
            })
          }
        }
      }
      seasons.forEach((season, seasonIndex) => {
        const seasonLabel =
          season
            .querySelector(".series-season-toggle strong")
            ?.textContent?.trim() || `Season ${seasonIndex + 1}`
        const seasonKey = `${mode}-season-${seasonIndex}`
        let groups = []

        if (mode === "complete-pack") {
          const files = Array.from(season.querySelectorAll(".download-item"))
          if (files.length) {
            groups.push({
              key: `${mode}-${seasonIndex}`,
              label: seasonLabel,
              seasonKey,
              seasonLabel,
              files,
            })
          }
        } else {
          const episodeGroups = Array.from(
            season.querySelectorAll(".episode-item")
          )
          if (episodeGroups.length) {
            const episodeEntries = getEpisodeEntries(
              episodeGroups,
              mode,
              seasonIndex,
              seasonLabel
            )
            groups = episodeEntries
          } else {
            const files = sortEpisodeFiles(
              Array.from(season.querySelectorAll(".episode-download-item")),
              seasonLabel
            )
            if (files.length) {
              groups.push({
                key: `${mode}-${seasonIndex}`,
                label: seasonLabel,
                seasonKey,
                seasonLabel,
                files,
              })
            }
          }
        }

        groups.forEach(({ key, label, languages = "", files }) => {
          if (files.length) {
            entries.push({
              key,
              label,
              languages,
              mode,
              seasonKey,
              seasonLabel,
              files,
            })
          }
        })
      })
      modeEntries.set(mode, entries)
    }
    const episodeEntries = modeEntries.get("episodes") || []
    const episodeLabelCounts = new Map()
    for (const entry of episodeEntries) {
      const labelKey = `${entry.seasonKey}\u0000${entry.label}`
      episodeLabelCounts.set(
        labelKey,
        (episodeLabelCounts.get(labelKey) || 0) + 1
      )
    }
    const episodeLabelVersions = new Map()
    for (const entry of episodeEntries) {
      const labelKey = `${entry.seasonKey}\u0000${entry.label}`
      if (episodeLabelCounts.get(labelKey) < 2) {
        continue
      }
      const version = (episodeLabelVersions.get(labelKey) || 0) + 1
      episodeLabelVersions.set(labelKey, version)
      entry.version = version
    }
    if (![...modeEntries.values()].some((entries) => entries.length)) {
      return false
    }
    if (
      panels.episodes?.querySelector(
        ".series-season-group, .episode-item, .episode-download-item"
      ) &&
      !modeEntries.get("episodes")?.length
    ) {
      return false
    }
    if (
      panels["complete-pack"]?.querySelector(
        ".series-season-group, .download-item"
      ) &&
      !modeEntries.get("complete-pack")?.length
    ) {
      return false
    }

    // A changed filename or provider must leave the original panel available.
    for (const entries of modeEntries.values()) {
      for (const entry of entries) {
        for (const file of entry.files) {
          const title = file.querySelector(
            entry.mode === "complete-pack"
              ? ".file-title"
              : ".episode-file-title"
          )
          if (
            !normalizeText(title?.textContent) ||
            !createReleaseActions(file)
          ) {
            return false
          }
        }
      }
    }
    for (const [mode, panel] of Object.entries(panels)) {
      const parsedFiles = new Set(
        (modeEntries.get(mode) || []).flatMap((entry) => entry.files)
      )
      const selector =
        mode === "complete-pack" ? ".download-item" : ".episode-download-item"
      if (
        Array.from(panel?.querySelectorAll(selector) || []).some(
          (file) => !parsedFiles.has(file)
        )
      ) {
        return false
      }
    }

    const modeButtons = Array.from(
      tabs.querySelectorAll(".series-tab[data-tab]")
    )
    if (
      !modeButtons.some((button) => modeEntries.get(button.dataset.tab)?.length)
    ) {
      return false
    }

    const toolbar = document.createElement("div")
    toolbar.className = "userpatch-release-toolbar userpatch-series-toolbar"
    toolbar.userpatchSourceMarkup = sourceMarkup
    const tabsParent = tabs.parentNode
    const tabsNextSibling = tabs.nextSibling

    tabs.classList.add("userpatch-quality-tabs")
    tabs.setAttribute("role", "group")
    tabs.setAttribute("aria-label", "Choose complete packs or episodes")
    tabs.querySelector(".userpatch-quality-indicator")?.remove()
    const modeIndicator = document.createElement("span")
    modeIndicator.className = "userpatch-quality-indicator"
    modeIndicator.setAttribute("aria-hidden", "true")
    modeIndicator.dataset.ready = "false"
    tabs.prepend(modeIndicator)
    for (const button of modeButtons) {
      button.classList.add("userpatch-quality-tab")
      button.dataset.tabContent = "label"
      button.setAttribute(
        "aria-pressed",
        button.classList.contains("active") ? "true" : "false"
      )
      const labelText =
        button.dataset.tab === "complete-pack" ? "Archive" : "Episodes"
      const label = document.createElement("span")
      label.className = "userpatch-series-tab-label"
      label.textContent = labelText
      const iconName =
        button.dataset.tab === "complete-pack" ? "file-archive" : "file-play"
      const icon = createLucideIcon(iconName)
      icon.classList.add(
        "lucide",
        `lucide-${iconName}`,
        "userpatch-series-mode-icon"
      )
      icon.dataset.userpatchLucideIcon = iconName
      button.replaceChildren(label, icon)
      button.setAttribute("aria-label", labelText)
      button.title = labelText
    }

    const createSeriesSelect = (id, label) => {
      const control = document.createElement("div")
      control.className = "userpatch-season-control"
      const { trigger, value } = createSelectTrigger(
        `${id}-options`,
        label,
        createLucideIcon("chevron-down")
      )
      const versionMarker = document.createElement("span")
      versionMarker.className =
        "userpatch-version-marker userpatch-season-version-marker"
      versionMarker.hidden = true
      value.after(versionMarker)
      const positioner = document.createElement("div")
      positioner.className = "userpatch-season-positioner"
      positioner.hidden = true
      const popup = document.createElement("div")
      popup.className = "userpatch-season-popup"
      const createScrollControl = (direction) => {
        const button = document.createElement("button")
        button.type = "button"
        button.className = `userpatch-season-scroll-control userpatch-season-scroll-${direction}`
        button.tabIndex = -1
        button.setAttribute("aria-hidden", "true")
        const icon = createLucideIcon(
          direction === "up" ? "chevron-up" : "chevron-down"
        )
        icon.setAttribute("aria-hidden", "true")
        button.append(icon)
        return button
      }
      const scrollUp = createScrollControl("up")
      const menu = document.createElement("div")
      menu.id = `${id}-options`
      menu.className = "userpatch-season-menu"
      menu.setAttribute("role", "listbox")
      menu.setAttribute("aria-label", label)
      const scrollDown = createScrollControl("down")
      control.append(trigger)
      popup.append(scrollUp, menu, scrollDown)
      positioner.append(popup)
      return {
        control,
        trigger,
        value,
        versionMarker,
        positioner,
        popup,
        menu,
        scrollUp,
        scrollDown,
      }
    }
    const seasonSelect = createSeriesSelect(
      "userpatch-series-season",
      "Select season"
    )
    const qualitySelect = createSeriesSelect(
      "userpatch-series-quality",
      "Select release quality"
    )
    qualitySelect.control.classList.add("userpatch-series-quality-control")
    const qualityGroup = document.createElement("div")
    qualityGroup.className = "userpatch-series-quality-group"
    const languageBadge = document.createElement("span")
    languageBadge.id = "userpatch-series-language-summary"
    languageBadge.className = "userpatch-series-language-badge"
    languageBadge.setAttribute("aria-label", "Languages for selected release")
    languageBadge.hidden = true
    const languageText = document.createElement("span")
    languageText.className = "userpatch-series-language-text"
    const languageIcon = createLucideIcon("audio-lines")
    languageIcon.classList.add("userpatch-series-language-icon")
    languageIcon.dataset.userpatchLucideIcon = "audio-lines"
    languageBadge.append(languageIcon, languageText)
    qualitySelect.trigger.setAttribute("aria-describedby", languageBadge.id)
    qualityGroup.append(qualitySelect.control, languageBadge)
    const archiveQualityTabs = createQualityTabs({
      storageKey: CONFIG.storageKeys.seriesArchiveQualityTab,
      onQualityChange: () => {
        clearMobileQualityScrollSpace(listSection)
        filterArchiveReleases()
        scrollListBelowStickyFilter(selectors, list, listSection)
      },
    })
    archiveQualityTabs.element.classList.add("userpatch-archive-quality-tabs")
    archiveQualityTabs.element.hidden = true
    const selectors = document.createElement("div")
    selectors.className = "userpatch-series-selects"
    selectors.append(
      seasonSelect.control,
      archiveQualityTabs.element,
      qualityGroup
    )

    toolbar.append(tabs, selectors)
    main.classList.add("userpatch-release-main", "userpatch-series-main")
    sourceSection?.classList.add("userpatch-series-source")
    main.insertBefore(toolbar, sourceSection || null)
    main.insertBefore(listSection, sourceSection || null)
    document.body.append(seasonSelect.positioner, qualitySelect.positioner)
    const savedMode = storageGet(CONFIG.storageKeys.seriesTab)
    let activeMode =
      savedMode && modeEntries.get(savedMode)?.length
        ? savedMode
        : tabs.querySelector(".series-tab.active[data-tab]")?.dataset.tab ||
          "complete-pack"
    if (!modeEntries.get(activeMode)?.length) {
      activeMode =
        modeButtons.find(
          (button) => modeEntries.get(button.dataset.tab)?.length
        )?.dataset.tab || ""
    }
    for (const button of modeButtons) {
      const hasEntries = Boolean(modeEntries.get(button.dataset.tab)?.length)
      const isActive = button.dataset.tab === activeMode
      button.disabled = !hasEntries
      button.setAttribute("aria-disabled", String(!hasEntries))
      button.classList.toggle("active", isActive)
      button.setAttribute("aria-pressed", isActive ? "true" : "false")
    }
    let selectedSeasonKey = ""
    let selectedEntryKey = ""
    let currentEntries = []
    let currentSeasons = []
    let currentQualityEntries = []
    let renderedEntryKey = null
    let typeaheadBuffer = ""
    let typeaheadTimer = 0

    const clearRenderedEntry = () => {
      for (const cleanup of filenameCleanups) {
        cleanup()
      }
      pruneReleaseFilenameCleanups(filenameCleanups)
      filenameCleanups.length = 0
    }

    const filterArchiveReleases = () => {
      if (activeMode !== "complete-pack") {
        return
      }
      const items = Array.from(list.querySelectorAll(".download-item"))
      const available = new Set(
        items.map((item) => item.dataset.userpatchQuality)
      )
      const effectiveQuality = archiveQualityTabs.refreshButtons(available)
      for (const item of items) {
        const quality = item.dataset.userpatchQuality || "unknown"
        item.classList.toggle(
          "userpatch-filter-hidden",
          effectiveQuality !== "all" && quality !== effectiveQuality
        )
      }
    }

    // Build rows for the selected group only; large series pages contain hundreds of hidden files.
    const renderSelectedEntry = () => {
      const entry = currentEntries.find((item) => item.key === selectedEntryKey)
      const nextKey = entry?.key || ""
      if (renderedEntryKey === nextKey) {
        filterArchiveReleases()
        return
      }

      clearRenderedEntry()
      renderedEntryKey = nextKey
      if (!entry) {
        list.replaceChildren()
        return
      }

      const openedReleases = getOpenedReleases()
      const rowFragment = document.createDocumentFragment()
      const filenameRows = []
      for (const file of entry.files) {
        const filename = normalizeText(
          file.querySelector(
            entry.mode === "complete-pack"
              ? ".file-title"
              : ".episode-file-title"
          )?.textContent || ""
        )
        if (!filename) {
          continue
        }

        const sizeCandidates = Array.from(
          file.querySelectorAll(
            entry.mode === "complete-pack"
              ? ".download-header code .badge, .download-header .badge-size"
              : ".episode-file-info .badge-size"
          )
        ).map((badge) => normalizeText(badge.textContent))
        const size = sizeCandidates.find(isReleaseSize)
        const languages =
          entry.mode === "complete-pack" ? getArchiveLanguages(file) : ""

        const row = document.createElement("div")
        row.className = "download-item userpatch-release-item"
        row.dataset.userpatchFilename = filename
        row.dataset.userpatchQuality = getReleaseQuality(filename)
        row.dataset.userpatchMode = entry.mode
        row.dataset.userpatchEntry = entry.key

        const rowLayout = document.createElement("div")
        rowLayout.className = "userpatch-release-row"
        if (isReleaseOpened(filename, file, openedReleases)) {
          markReleaseOpened(rowLayout, row)
        }
        const copy = document.createElement("div")
        copy.className = "userpatch-release-copy"
        const title = document.createElement("div")
        title.className = "userpatch-release-file-title"
        const meta = document.createElement("div")
        meta.className = "userpatch-release-meta"
        if (size) {
          const sizeSpan = document.createElement("span")
          sizeSpan.className = "userpatch-release-size"
          sizeSpan.textContent = size
          meta.append(sizeSpan)
        }
        if (languages) {
          const archiveLanguageBadge = document.createElement("span")
          archiveLanguageBadge.className =
            "userpatch-series-language-badge userpatch-release-language-badge"
          archiveLanguageBadge.setAttribute("aria-label", `Audio: ${languages}`)
          const archiveLanguageIcon = createLucideIcon("audio-lines")
          archiveLanguageIcon.classList.add("userpatch-series-language-icon")
          archiveLanguageIcon.dataset.userpatchLucideIcon = "audio-lines"
          const archiveLanguageText = document.createElement("span")
          archiveLanguageText.className = "userpatch-series-language-text"
          archiveLanguageText.textContent = languages
          archiveLanguageBadge.append(archiveLanguageIcon, archiveLanguageText)
          meta.append(archiveLanguageBadge)
        }
        copy.append(title)
        if (entry.mode === "episodes") {
          const short = simplifyEpisodeFilename(filename)
          if (short) {
            title.classList.add("userpatch-full-episode-title")
            const shortTitle = document.createElement("div")
            shortTitle.className =
              "userpatch-release-file-title userpatch-short-episode-title"
            shortTitle.textContent = short
            shortTitle.title = filename
            copy.append(shortTitle)
          }
        }
        if (size || languages) {
          copy.append(meta)
        }

        const actions = createReleaseActions(file)
        rowLayout.append(copy)
        if (actions) {
          rowLayout.append(actions)
          addFetchLinks(rowLayout, actions)
        }
        row.append(rowLayout)
        rowFragment.append(row)
        filenameRows.push({ title, filename })
      }

      list.replaceChildren(rowFragment)
      filterArchiveReleases()
      for (const { title, filename } of filenameRows) {
        const cleanupFilename = setupExpandableFilename(title, filename)
        releaseFilenameCleanups.push(cleanupFilename)
        filenameCleanups.push(cleanupFilename)
      }
    }

    const positionModeIndicator = (target) =>
      positionSelectionIndicator(
        modeIndicator,
        tabs,
        target || tabs.querySelector(".series-tab.active"),
        "quality"
      )

    const getCurrentSeasons = () => {
      const seasonsByKey = new Map()
      for (const entry of currentEntries) {
        const key = entry.seasonKey || entry.key
        let season = seasonsByKey.get(key)
        if (!season) {
          season = {
            key,
            label: entry.seasonLabel || entry.label,
            entries: [],
          }
          seasonsByKey.set(key, season)
        }
        season.entries.push(entry)
      }
      return [...seasonsByKey.values()]
        .map((season, index) => ({
          season,
          index,
          parts: getSeasonSortParts(season.label),
        }))
        .toSorted((left, right) => {
          if (!left.parts) {
            return right.parts ? 1 : left.index - right.index
          }
          if (!right.parts) {
            return -1
          }
          return (
            left.parts[0] - right.parts[0] ||
            left.parts[1] - right.parts[1] ||
            left.index - right.index
          )
        })
        .map(({ season }) => season)
    }

    const getSelectItems = (select) =>
      select === seasonSelect ? currentSeasons : currentQualityEntries

    const getSelectOptions = (select) =>
      Array.from(select.menu.querySelectorAll('[role="option"]'))

    const updateSelectSelection = (select, items, selectedKey) => {
      const selected = items.find((item) => item.key === selectedKey)
      if (select === qualitySelect) {
        languageText.textContent = selected?.languages || ""
        languageBadge.hidden = activeMode !== "episodes" || !selected?.languages
      }
      if (!selected) {
        select.value.textContent = ""
        select.versionMarker.hidden = true
        select.trigger.disabled = true
        select.trigger.removeAttribute("title")
        select.trigger.removeAttribute("aria-valuetext")
        return
      }

      select.trigger.disabled = false
      select.value.textContent = selected.label
      select.versionMarker.hidden = !selected.version
      select.versionMarker.textContent = selected.version
        ? `v${selected.version}`
        : ""
      if (selected.version) {
        select.versionMarker.dataset.version = String(selected.version)
      } else {
        delete select.versionMarker.dataset.version
      }
      const accessibleValue = `${selected.label}${selected.version ? ` v${selected.version}` : ""}`
      select.trigger.removeAttribute("title")
      select.trigger.setAttribute("aria-valuetext", accessibleValue)
      for (const option of getSelectOptions(select)) {
        option.setAttribute(
          "aria-selected",
          String(option.dataset.selectKey === selectedKey)
        )
      }
    }

    const renderSelectOptions = (select, items, selectedKey) => {
      select.menu.replaceChildren(
        ...items.map((item) => {
          const option = createSelectOption(
            item.key,
            item.label,
            createLucideIcon("check")
          )
          if (item.version) {
            const marker = document.createElement("span")
            marker.className = "userpatch-version-marker"
            marker.textContent = `v${item.version}`
            marker.dataset.version = String(item.version)
            option.lastElementChild.before(marker)
          }
          return option
        })
      )
      updateSelectSelection(select, items, selectedKey)
    }

    const setHighlightedOption = (select, option, shouldFocus = true) => {
      if (!option) {
        return
      }
      for (const item of getSelectOptions(select)) {
        item.toggleAttribute("data-highlighted", item === option)
      }
      if (shouldFocus) {
        option.focus()
        option.scrollIntoView({ block: "nearest", inline: "nearest" })
      }
    }

    const updateSelectScrollControls = (select) => {
      const menu = select.menu
      const hasOverflow = menu.scrollHeight > menu.clientHeight + 1
      select.scrollUp.hidden = !hasOverflow || menu.scrollTop <= 1
      select.scrollDown.hidden =
        !hasOverflow ||
        menu.scrollTop + menu.clientHeight >= menu.scrollHeight - 1
    }

    const positionSelectMenu = (select) => {
      if (select.positioner.hidden) {
        return
      }
      const rect = select.trigger.getBoundingClientRect()
      const viewportInset = CONFIG.seriesSelectViewportInsetPx
      const sideOffset = CONFIG.seriesSelectSideOffsetPx
      const maxAvailableWidth = window.innerWidth - viewportInset * 2
      const popupWidth = Math.min(Math.max(rect.width, 144), maxAvailableWidth)
      select.positioner.style.setProperty(
        "--userpatch-anchor-width",
        `${popupWidth}px`
      )
      select.popup.style.setProperty(
        "--userpatch-anchor-width",
        `${popupWidth}px`
      )
      const preferredHeight = Math.min(
        CONFIG.seriesSelectPopupMaxHeightPx,
        window.innerHeight - viewportInset * 2
      )
      const roomBelow =
        window.innerHeight - rect.bottom - viewportInset - sideOffset
      const roomAbove = rect.top - viewportInset - sideOffset
      const popupStyle = getComputedStyle(select.popup)
      const popupChromeHeight =
        Number.parseFloat(popupStyle.paddingBlockStart) +
        Number.parseFloat(popupStyle.paddingBlockEnd) +
        Number.parseFloat(popupStyle.borderBlockStartWidth) +
        Number.parseFloat(popupStyle.borderBlockEndWidth)
      const naturalHeight = select.menu.scrollHeight + popupChromeHeight
      const desiredHeight = Math.min(naturalHeight, preferredHeight)
      const side =
        roomBelow >= desiredHeight || roomBelow >= roomAbove ? "bottom" : "top"
      const availableHeight = Math.max(
        1,
        Math.min(preferredHeight, side === "bottom" ? roomBelow : roomAbove)
      )
      const needsScroll = naturalHeight > availableHeight
      const scrollControlsHeight = needsScroll
        ? CONFIG.seriesSelectScrollControlHeightPx * 2
        : 0
      const menuHeight = Math.max(
        1,
        availableHeight - popupChromeHeight - scrollControlsHeight
      )
      const left = Math.min(
        Math.max(viewportInset, rect.left),
        window.innerWidth - viewportInset - popupWidth
      )
      select.positioner.dataset.side = side
      select.positioner.style.left = `${left}px`
      select.popup.style.setProperty(
        "--userpatch-popup-height",
        `${availableHeight}px`
      )
      select.menu.style.setProperty(
        "--userpatch-menu-height",
        `${menuHeight}px`
      )
      select.popup.dataset.side = side
      select.scrollUp.hidden = !needsScroll
      select.scrollDown.hidden = !needsScroll
      updateSelectScrollControls(select)
      const popupHeight = select.popup.getBoundingClientRect().height
      const top =
        side === "bottom"
          ? rect.bottom + sideOffset
          : rect.top - sideOffset - popupHeight
      select.positioner.style.top = `${top}px`
    }

    const scheduleSelectMenuPosition = (select) => {
      requestAnimationFrame(() => {
        if (toolbar.isConnected) {
          positionSelectMenu(select)
        }
      })
    }

    const openSelectMenu = (select) => {
      if (select.positioner.hidden) {
        select.positioner.hidden = false
        select.trigger.setAttribute("aria-expanded", "true")
        positionSelectMenu(select)
      }
      const options = getSelectOptions(select)
      const selectedKey =
        select === seasonSelect ? selectedSeasonKey : selectedEntryKey
      const selected = options.find(
        (option) => option.dataset.selectKey === selectedKey
      )
      setHighlightedOption(select, selected || options[0])
      scheduleSelectMenuPosition(select)
    }

    const closeSelectMenu = (select, restoreFocus = false) => {
      if (select.positioner.hidden) {
        return
      }
      select.positioner.hidden = true
      select.trigger.setAttribute("aria-expanded", "false")
      for (const option of getSelectOptions(select)) {
        delete option.dataset.highlighted
      }
      if (restoreFocus) {
        select.trigger.focus()
      }
    }

    const closeSelectMenus = (restoreFocus = false) => {
      closeSelectMenu(seasonSelect, restoreFocus)
      closeSelectMenu(qualitySelect, restoreFocus)
    }

    const updateCurrentSeason = () => {
      selectors.dataset.mode = activeMode
      const isArchive = activeMode === "complete-pack"
      archiveQualityTabs.element.hidden = !isArchive
      qualitySelect.control.hidden = isArchive
      qualityGroup.hidden = isArchive
      if (isArchive) {
        archiveQualityTabs.positionIndicator()
      }
      const season = currentSeasons.find(
        (item) => item.key === selectedSeasonKey
      )
      currentQualityEntries =
        activeMode === "episodes" ? season?.entries || [] : []
      if (
        !currentQualityEntries.some((entry) => entry.key === selectedEntryKey)
      ) {
        const savedQuality = storageGet(CONFIG.storageKeys.seriesQuality)
        const matchedEntry = savedQuality
          ? currentQualityEntries.find(
              (entry) => entry.label === savedQuality
            ) ||
            currentQualityEntries.find((entry) =>
              entry.label.toLowerCase().includes(savedQuality.toLowerCase())
            )
          : null
        selectedEntryKey =
          matchedEntry?.key || currentQualityEntries[0]?.key || ""
      }
      if (activeMode === "complete-pack") {
        selectedEntryKey = season?.entries[0]?.key || ""
      }
      renderSelectOptions(seasonSelect, currentSeasons, selectedSeasonKey)
      renderSelectOptions(
        qualitySelect,
        currentQualityEntries,
        selectedEntryKey
      )
    }

    const chooseSelectOption = (select, key, restoreFocus = true) => {
      const items = getSelectItems(select)
      if (!items.some((item) => item.key === key)) {
        return
      }
      clearMobileQualityScrollSpace(listSection)
      if (select === seasonSelect) {
        selectedSeasonKey = key
        const chosenSeason = currentSeasons.find((item) => item.key === key)
        if (chosenSeason?.label) {
          storageSet(
            CONFIG.storageKeys.seriesSeasonPrefix +
              normalizePathname(location.pathname),
            chosenSeason.label
          )
        }
        selectedEntryKey = ""
        updateCurrentSeason()
      } else {
        selectedEntryKey = key
        const chosenEntry = currentQualityEntries.find(
          (item) => item.key === key
        )
        if (chosenEntry?.label) {
          storageSet(CONFIG.storageKeys.seriesQuality, chosenEntry.label)
        }
        updateSelectSelection(qualitySelect, currentQualityEntries, key)
      }
      closeSelectMenu(select, restoreFocus)
      refresh()
      if (select === qualitySelect) {
        scrollListBelowStickyFilter(selectors, list, listSection)
      }
    }

    const populateEntries = () => {
      currentEntries = modeEntries.get(activeMode) || []
      currentSeasons = getCurrentSeasons()
      const savedSeason = storageGet(
        CONFIG.storageKeys.seriesSeasonPrefix +
          normalizePathname(location.pathname)
      )
      const matchedSeason = savedSeason
        ? currentSeasons.find((season) => season.label === savedSeason)
        : null
      if (!currentSeasons.some((season) => season.key === selectedSeasonKey)) {
        selectedSeasonKey = matchedSeason?.key || currentSeasons[0]?.key || ""
      }
      updateCurrentSeason()
    }

    const refresh = () => {
      renderSelectedEntry()
      positionModeIndicator()
      if (activeMode === "complete-pack") {
        archiveQualityTabs.positionIndicator()
      }
    }

    const onModeClick = (event) => {
      if (!(event.target instanceof Element)) {
        return
      }
      const button = event.target.closest(".series-tab[data-tab]")
      if (!button || !tabs.contains(button) || button.disabled) {
        return
      }
      closeSelectMenus()
      storageSet(CONFIG.storageKeys.seriesTab, button.dataset.tab)
      window.requestAnimationFrame(() => {
        if (!toolbar.isConnected) {
          return
        }
        activeMode = button.dataset.tab
        selectedSeasonKey = ""
        for (const modeButton of modeButtons) {
          const isActive = modeButton === button
          modeButton.classList.toggle("active", isActive)
          modeButton.setAttribute("aria-pressed", isActive ? "true" : "false")
        }
        populateEntries()
        refresh()
        if (activeMode === "complete-pack") {
          archiveQualityTabs.positionIndicator()
        }
      })
    }
    const modeButtonFromEvent = (event) => {
      if (!(event.target instanceof Element)) {
        return null
      }
      const button = event.target.closest(".series-tab")
      return button && tabs.contains(button) ? button : null
    }
    const onPointerOver = (event) => {
      if (
        (event.pointerType !== "mouse" && event.pointerType !== "pen") ||
        !window.matchMedia("(hover: hover) and (pointer: fine)").matches
      ) {
        return
      }
      const modeButton = modeButtonFromEvent(event)
      if (modeButton && !modeButton.disabled) {
        positionModeIndicator(modeButton)
      }
    }
    const onPointerLeave = () => {
      positionModeIndicator()
    }
    const onFocusIn = (event) => {
      const modeButton = modeButtonFromEvent(event)
      if (modeButton && !modeButton.disabled) {
        positionModeIndicator(modeButton)
      }
    }
    const onFocusOut = (event) => {
      if (
        !(event.relatedTarget instanceof Node) ||
        !event.currentTarget.contains(event.relatedTarget)
      ) {
        positionModeIndicator()
      }
    }
    const getSelectFromTarget = (target) => {
      if (!(target instanceof Element)) {
        return null
      }
      if (
        seasonSelect.control.contains(target) ||
        seasonSelect.positioner.contains(target)
      ) {
        return seasonSelect
      }
      if (
        qualitySelect.control.contains(target) ||
        qualitySelect.positioner.contains(target)
      ) {
        return qualitySelect
      }
      return null
    }
    const isWithinSeriesSelect = (target) =>
      [seasonSelect, qualitySelect].some(
        (select) =>
          select.control.contains(target) || select.positioner.contains(target)
      )
    const toggleSelectMenu = (select) => {
      if (select.trigger.disabled) {
        return
      }
      if (select.positioner.hidden) {
        closeSelectMenu(select === seasonSelect ? qualitySelect : seasonSelect)
        openSelectMenu(select)
      } else {
        closeSelectMenu(select)
      }
    }
    const onSeasonTriggerClick = () => toggleSelectMenu(seasonSelect)
    const onQualityTriggerClick = () => toggleSelectMenu(qualitySelect)
    const onSelectKeyDown = (event) => {
      const select = getSelectFromTarget(event.target)
      if (!select) {
        return
      }
      const options = getSelectOptions(select)
      const activeIndex = options.indexOf(document.activeElement)
      if (event.key === "Escape" && !select.positioner.hidden) {
        event.preventDefault()
        closeSelectMenu(select, true)
        return
      }
      if (event.key === "Tab" && !select.positioner.hidden) {
        closeSelectMenu(select)
        return
      }
      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault()
        const direction = event.key === "ArrowDown" ? 1 : -1
        if (select.positioner.hidden) {
          openSelectMenu(select)
        } else {
          const nextIndex =
            activeIndex < 0
              ? 0
              : (activeIndex + direction + options.length) % options.length
          setHighlightedOption(select, options[nextIndex])
        }
        return
      }
      if (event.key === "Home" || event.key === "End") {
        event.preventDefault()
        if (select.positioner.hidden) {
          openSelectMenu(select)
        }
        setHighlightedOption(
          select,
          event.key === "Home" ? options[0] : options.at(-1)
        )
        return
      }
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault()
        if (select.positioner.hidden) {
          openSelectMenu(select)
        } else if (activeIndex >= 0) {
          chooseSelectOption(select, options[activeIndex].dataset.selectKey)
        }
        return
      }
      if (
        event.key.length === 1 &&
        !event.ctrlKey &&
        !event.metaKey &&
        !event.altKey
      ) {
        typeaheadBuffer += event.key.toLocaleLowerCase()
        window.clearTimeout(typeaheadTimer)
        typeaheadTimer = window.setTimeout(() => {
          typeaheadBuffer = ""
        }, 700)
        const start = Math.max(activeIndex, -1) + 1
        const ordered = options.slice(start).concat(options.slice(0, start))
        const match = ordered.find((option) =>
          option
            .querySelector(".userpatch-season-option-label")
            ?.textContent?.toLocaleLowerCase()
            .startsWith(typeaheadBuffer)
        )
        if (match) {
          if (select.positioner.hidden) {
            openSelectMenu(select)
          }
          setHighlightedOption(select, match)
        }
      }
    }
    const onSelectMenuPointerMove = (event) => {
      if (
        (event.pointerType !== "mouse" && event.pointerType !== "pen") ||
        !window.matchMedia("(hover: hover) and (pointer: fine)").matches
      ) {
        return
      }
      if (!(event.target instanceof Element)) {
        return
      }
      const option = event.target.closest('[role="option"][data-select-key]')
      const select = getSelectFromTarget(event.target)
      if (!option || !select?.menu.contains(option)) {
        return
      }
      setHighlightedOption(select, option, false)
    }
    const onSelectMenuClick = (event) => {
      if (!(event.target instanceof Element)) {
        return
      }
      const option = event.target.closest('[role="option"][data-select-key]')
      const select = getSelectFromTarget(event.target)
      if (!option || !select?.menu.contains(option)) {
        return
      }
      chooseSelectOption(select, option.dataset.selectKey, event.detail === 0)
    }
    const scrollSelectMenu = (select, direction) => {
      select.menu.scrollBy({
        top: direction * Math.max(80, select.menu.clientHeight * 0.75),
        behavior: "smooth",
      })
    }
    const onSeasonMenuScroll = () => {
      updateSelectScrollControls(seasonSelect)
      scheduleSelectMenuPosition(seasonSelect)
    }
    const onQualityMenuScroll = () => {
      updateSelectScrollControls(qualitySelect)
      scheduleSelectMenuPosition(qualitySelect)
    }
    const onSeasonScrollUp = () => scrollSelectMenu(seasonSelect, -1)
    const onSeasonScrollDown = () => scrollSelectMenu(seasonSelect, 1)
    const onQualityScrollUp = () => scrollSelectMenu(qualitySelect, -1)
    const onQualityScrollDown = () => scrollSelectMenu(qualitySelect, 1)
    const onSelectOutsidePointerDown = (event) => {
      if (!isWithinSeriesSelect(event.target)) {
        closeSelectMenus()
      }
    }
    const onSelectFocusOut = (event) => {
      if (
        !(event.relatedTarget instanceof Node) ||
        !isWithinSeriesSelect(event.relatedTarget)
      ) {
        closeSelectMenus()
      }
    }
    const onWindowResize = () => {
      positionModeIndicator()
      if (activeMode === "complete-pack") {
        archiveQualityTabs.positionIndicator()
      }
      positionSelectMenu(seasonSelect)
      positionSelectMenu(qualitySelect)
    }

    window.addEventListener("click", onModeClick, true)
    tabs.addEventListener("pointerover", onPointerOver)
    tabs.addEventListener("pointerleave", onPointerLeave)
    tabs.addEventListener("focusin", onFocusIn)
    tabs.addEventListener("focusout", onFocusOut)
    seasonSelect.trigger.addEventListener("click", onSeasonTriggerClick)
    qualitySelect.trigger.addEventListener("click", onQualityTriggerClick)
    document.addEventListener("keydown", onSelectKeyDown)
    document.addEventListener("focusout", onSelectFocusOut, true)
    seasonSelect.menu.addEventListener("click", onSelectMenuClick)
    qualitySelect.menu.addEventListener("click", onSelectMenuClick)
    seasonSelect.menu.addEventListener("pointermove", onSelectMenuPointerMove)
    qualitySelect.menu.addEventListener("pointermove", onSelectMenuPointerMove)
    seasonSelect.menu.addEventListener("scroll", onSeasonMenuScroll)
    qualitySelect.menu.addEventListener("scroll", onQualityMenuScroll)
    seasonSelect.scrollUp.addEventListener("click", onSeasonScrollUp)
    seasonSelect.scrollDown.addEventListener("click", onSeasonScrollDown)
    qualitySelect.scrollUp.addEventListener("click", onQualityScrollUp)
    qualitySelect.scrollDown.addEventListener("click", onQualityScrollDown)
    document.addEventListener("pointerdown", onSelectOutsidePointerDown, true)
    window.addEventListener("resize", onWindowResize)
    document.addEventListener("scroll", onWindowResize, true)

    const resizeObserver =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver(onWindowResize)
    resizeObserver?.observe(tabs)
    for (const button of modeButtons) {
      if (button instanceof HTMLElement) {
        resizeObserver?.observe(button)
      }
    }

    toolbar.userpatchRefresh = refresh
    seriesReleaseCleanup = () => {
      archiveQualityTabs.cleanup()
      closeSelectMenus()
      window.removeEventListener("click", onModeClick, true)
      tabs.removeEventListener("pointerover", onPointerOver)
      tabs.removeEventListener("pointerleave", onPointerLeave)
      tabs.removeEventListener("focusin", onFocusIn)
      tabs.removeEventListener("focusout", onFocusOut)
      seasonSelect.trigger.removeEventListener("click", onSeasonTriggerClick)
      qualitySelect.trigger.removeEventListener("click", onQualityTriggerClick)
      document.removeEventListener("keydown", onSelectKeyDown)
      document.removeEventListener("focusout", onSelectFocusOut, true)
      seasonSelect.menu.removeEventListener("click", onSelectMenuClick)
      qualitySelect.menu.removeEventListener("click", onSelectMenuClick)
      seasonSelect.menu.removeEventListener(
        "pointermove",
        onSelectMenuPointerMove
      )
      qualitySelect.menu.removeEventListener(
        "pointermove",
        onSelectMenuPointerMove
      )
      seasonSelect.menu.removeEventListener("scroll", onSeasonMenuScroll)
      qualitySelect.menu.removeEventListener("scroll", onQualityMenuScroll)
      seasonSelect.scrollUp.removeEventListener("click", onSeasonScrollUp)
      seasonSelect.scrollDown.removeEventListener("click", onSeasonScrollDown)
      qualitySelect.scrollUp.removeEventListener("click", onQualityScrollUp)
      qualitySelect.scrollDown.removeEventListener("click", onQualityScrollDown)
      document.removeEventListener(
        "pointerdown",
        onSelectOutsidePointerDown,
        true
      )
      window.removeEventListener("resize", onWindowResize)
      document.removeEventListener("scroll", onWindowResize, true)
      window.clearTimeout(typeaheadTimer)
      resizeObserver?.disconnect()
      clearRenderedEntry()
      seasonSelect.positioner.remove()
      qualitySelect.positioner.remove()
      tabsParent?.insertBefore(
        tabs,
        tabsNextSibling?.parentNode === tabsParent ? tabsNextSibling : null
      )
      modeIndicator.remove()
      toolbar.remove()
      listSection.remove()
      sourceSection?.classList.remove("userpatch-series-source")
      main.classList.remove("userpatch-release-main", "userpatch-series-main")
      seriesReleaseCleanup = null
    }

    populateEntries()
    refresh()

    if (!releaseProviderTooltipCleanup) {
      releaseProviderTooltipCleanup = setupReleaseProviderTooltip(siteRoot)
    }
    updatePosterBadges(siteRoot)
    return true
  } catch {
    seriesReleaseCleanup?.()
    return false
  }
}

export const cleanupReleaseLists = () => {
  movieReleaseListCleanup?.()
  movieReleaseListCleanup = null
  seriesReleaseCleanup?.()
  seriesReleaseCleanup = null
  releaseProviderTooltipCleanup?.()
  releaseProviderTooltipCleanup = null
  clearReleaseFilenameMeasurements()
}
