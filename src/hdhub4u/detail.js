import { IMDB_PRIMARY_LOGO_DATA_URI } from "../shared/badges.js"
import { createDetailInfoList } from "../shared/detail-info.js"
import { setupProviderTooltip } from "../shared/provider-tooltip.js"
import {
  createQualityTabs,
  positionSelectionIndicator,
  setupIndicatorHover,
} from "../shared/quality-tabs.js"
import {
  getOpenedReleases,
  markReleaseOpened,
  saveOpenedRelease,
  storageGet,
  storageSet,
} from "../shared/storage.js"
import { createTrailer, findTrailerUrl } from "../shared/trailer.js"
import { HEADER_WORDMARK_DATA_URI } from "./branding.js"
import { CONFIG } from "./config.js"
import { normalizeText } from "./dom.js"
import {
  classifyEpisodeLink,
  extractSize,
  isReleaseAnchor,
  parseReleaseAnchor,
} from "./download-parsing.js"
import {
  buildEpisodeRow,
  buildPosterBadges,
  buildReleaseRow,
  getDetailBadgeNames,
  setDetailTooltipCleanup,
} from "./download-rows.js"
import { createLucideIcon } from "./icons.js"
import { setupProgressiveImage } from "./images.js"
import { openScreenshotViewer } from "./screenshot-viewer.js"
import { createSeriesProgress, parseDisplayTitle } from "./titles.js"

export const extractDetail = () => {
  try {
    const main = document.querySelector("main#main-content.content-wrapper")
    const heading = main?.querySelector("h1.page-title")
    const body = main?.querySelector("main.page-body")
    if (!main || !heading || !body) {
      return null
    }

    const title = normalizeText(
      heading.querySelector(".material-text")?.textContent ||
        heading.textContent
    ).replace(/\s*[|–-]\s*(?:Full\s+(?:Movie|Series|Show)\s*)?HDHub4u.*$/i, "")
    if (!title) {
      return null
    }

    const metaBox = main.querySelector(".page-meta")
    const date = normalizeText(
      metaBox?.querySelector("span")?.textContent || ""
    )
    const categories = []
    for (const link of metaBox?.querySelectorAll("a[href]") || []) {
      const label = normalizeText(
        link.querySelector("em")?.textContent || link.textContent
      )
      const href = link.getAttribute("href")
      if (label && href) {
        categories.push({ label, href })
      }
    }

    let poster = ""
    for (const image of body.querySelectorAll("img")) {
      const src = image.getAttribute("src") || ""
      if (!src || image.closest("h3") || /\.th\.jpg$/i.test(src)) {
        continue
      }
      if (image.closest(".code-block") || image.closest(".kp-header")) {
        continue
      }
      poster = image.src || src
      break
    }

    const metaValues = new Map()
    for (const strong of body.querySelectorAll(".kp-header strong")) {
      const cell = strong.closest("div")
      if (!cell) {
        continue
      }
      const label = normalizeText(strong.textContent).replace(/:$/, "")
      const full = normalizeText(cell.textContent)
      const value =
        label && full.startsWith(label)
          ? normalizeText(full.slice(label.length).replace(/^:/, ""))
          : full
      if (label && value && !metaValues.has(label)) {
        metaValues.set(label, value)
      }
    }
    const ratingValue =
      metaValues.get("iMDB Rating") || metaValues.get("IMDb Rating") || ""
    const ratingMatch = ratingValue.match(/([0-9]+(?:\.[0-9]+)?)\s*\/\s*10/)
    const imdbLink = body.querySelector('.kp-header a[href*="imdb.com"]')
    const metaRows = []
    for (const key of [
      "Stars",
      "Creator",
      "Director",
      "Genre",
      "Language",
      "Quality",
    ]) {
      const value = metaValues.get(key)
      if (value) {
        metaRows.push([key, value])
      }
    }
    if (date) {
      metaRows.push(["Posted", date])
    }

    const releases = []
    const episodes = []
    const screenshots = []
    let episodeHint = false

    const headingNodes = Array.from(body.querySelectorAll("h2, h3, h4, h5"))
    for (const node of headingNodes) {
      const text = normalizeText(node.textContent)
      const lower = text.toLowerCase()
      if (/screen\s*-?\s*shots?/.test(lower)) {
        continue
      }
      if (/download\s*links/.test(lower)) {
        continue
      }
      if (/single\s*episode/.test(lower)) {
        episodeHint = true
        continue
      }

      const anchors = Array.from(node.querySelectorAll("a[href]"))

      // Screenshot rows carry thumbnails; download rows never do. That
      // holds across every post layout, so it classifies on its own.
      if (
        anchors.length &&
        anchors.every((anchor) => anchor.querySelector("img"))
      ) {
        for (const anchor of anchors) {
          const image = anchor.querySelector("img")
          if (image?.src) {
            // Image hosts serve tiny `.th` thumbnails inline; the full
            // screenshot lives at the same path without that suffix.
            const full = image.src.replace(/\.th(\.[a-z]+)$/i, "$1")
            screenshots.push({
              href: anchor.href,
              src: image.src,
              full: full === image.src ? "" : full,
              alt: image?.alt || "",
            })
          }
        }
        continue
      }

      // Episode rows come in two shapes: the classic "EPiSODE 1" heading
      // followed by quality rows, and compact "EPiSODE 1 | WATCH" rows
      // where the number anchor itself is the download link. Posts without
      // the ": Single Episode :" marker use the compact shape, so
      // classification stays content-based rather than section-based.
      const episodeMatch = text.match(
        /episodes?\s*0*(\d{1,3})(?:\s*(?:[-–—&]|to|and)\s*0*(\d{1,3}))?/i
      )
      const isEpisodeRow =
        Boolean(episodeMatch) || (episodeHint && node.matches("h3, h4"))
      if (isEpisodeRow) {
        if (
          !episodeMatch &&
          (!anchors.length || !/drive|instant|watch|download/i.test(text))
        ) {
          continue
        }
        let number = ""
        if (episodeMatch) {
          number = episodeMatch[2]
            ? `${episodeMatch[1]}-${episodeMatch[2]}`
            : episodeMatch[1]
        }
        let current = episodes.at(-1)
        if (!current || (number && current.number !== number)) {
          current = {
            number: number || `${episodes.length + 1}`,
            groups: [],
          }
          episodes.push(current)
        }
        // Numbered headings ("EPiSODE 2") carry no links of their own; they
        // only decide which episode the quality rows below attach to.
        if (!anchors.length) {
          continue
        }
        const qualityToken =
          text.match(/(?:2160p|1080p|720p|480p|4k)/i)?.[0] || ""
        const size = extractSize(text)
        let group = current.groups.at(-1)
        if (!group || group.quality !== qualityToken) {
          group = { quality: qualityToken, size, links: [] }
          current.groups.push(group)
        }
        for (const anchor of anchors) {
          group.links.push(classifyEpisodeLink(anchor))
        }
        continue
      }

      if (!anchors.length) {
        continue
      }

      // Everything else with qualifying anchors is a release row.
      const releaseAnchors = anchors.filter(isReleaseAnchor)
      if (!releaseAnchors.length) {
        continue
      }
      const rows = releaseAnchors.map(parseReleaseAnchor)
      const next = node.nextElementSibling
      if (next?.matches("h5")) {
        const note = normalizeText(next.textContent)
          .replace(/^\[/, "")
          .replace(/\]$/, "")
          .trim()
        if (note && rows.length) {
          rows.at(-1).audio = note
        }
      }
      releases.push(...rows)
    }

    let storyline = ""
    for (const node of headingNodes) {
      if (!/storyline/i.test(node.textContent)) {
        continue
      }
      let cursor = node.nextElementSibling
      for (let hops = 0; cursor && hops < 6; hops += 1) {
        const desc = cursor.matches(".kno-rdesc")
          ? cursor
          : cursor.querySelector(".kno-rdesc")
        if (desc) {
          const clone = desc.cloneNode(true)
          for (const label of clone.querySelectorAll("strong, em, span")) {
            label.remove()
          }
          storyline = normalizeText(clone.textContent)
          break
        }
        cursor = cursor.nextElementSibling
      }
      break
    }
    if (storyline.length < 24 || /^n\/?a\b/i.test(storyline)) {
      storyline = ""
    }

    const isSeries =
      episodes.length > 0 || /\b(?:season|series|episode)\b/i.test(title)

    return {
      title,
      date,
      categories,
      poster,
      rating: ratingMatch
        ? {
            score: `${ratingMatch[1]}/10`,
            href: imdbLink?.href || "",
          }
        : null,
      metaRows,
      releases,
      episodes,
      isSeries,
      screenshots,
      storyline,
      trailer: findTrailerUrl(body),
    }
  } catch (error) {
    console.warn("userpatch extract failed:", error)
    return null
  }
}

export const buildDetailPage = (data) => {
  const root = document.createElement("div")
  root.className = "userpatch-detail-root"

  const panel = document.createElement("aside")
  panel.className = "userpatch-poster-panel"

  const brand = document.createElement("a")
  brand.className = "userpatch-detail-brand"
  brand.href = "/"
  brand.setAttribute("aria-label", "HDHub4u home")
  const brandImage = document.createElement("img")
  brandImage.src = HEADER_WORDMARK_DATA_URI
  brandImage.alt = "HDHub4u"
  brandImage.decoding = "async"
  brand.append(brandImage)
  panel.append(brand)

  const frame = document.createElement("div")
  frame.className = "userpatch-poster-frame"
  const displayTitle = parseDisplayTitle(data.title)
  frame.classList.toggle("userpatch-ongoing-poster", displayTitle.ongoing)
  if (data.poster) {
    const image = document.createElement("img")
    image.src = data.poster
    image.alt = ""
    image.decoding = "async"
    image.fetchPriority = "high"
    image.loading = "eager"
    setupProgressiveImage(image)
    frame.append(image)
    panel.append(frame)
  }

  const title = document.createElement("h1")
  title.className = "userpatch-detail-title"
  title.textContent = displayTitle.title
  panel.append(title)
  const progress = createSeriesProgress(displayTitle.progress)
  if (progress) {
    panel.append(progress)
  }

  if (data.rating) {
    const score = document.createElement("div")
    score.className = "userpatch-imdb-score"
    const link = document.createElement("a")
    if (data.rating.href) {
      link.href = data.rating.href
      link.target = "_blank"
      link.rel = "noopener noreferrer"
    }
    link.setAttribute("aria-label", `IMDb rating ${data.rating.score}`)
    const logo = document.createElement("img")
    logo.src = IMDB_PRIMARY_LOGO_DATA_URI
    logo.alt = "IMDb"
    logo.decoding = "async"
    const value = document.createElement("span")
    value.className = "userpatch-imdb-rating"
    value.textContent = data.rating.score
    link.append(logo, value)
    score.append(link)
    panel.append(score)
  }

  const badges = getDetailBadgeNames(data)
  if (badges.length) {
    panel.append(buildPosterBadges(badges))
  }

  const mainColumn = document.createElement("div")
  mainColumn.className = "userpatch-detail-main"

  const toolbar = document.createElement("div")
  toolbar.className = "userpatch-detail-toolbar"

  const list = document.createElement("div")
  list.className = "userpatch-release-list"

  const emptyNote = document.createElement("p")
  emptyNote.className = "userpatch-detail-empty"
  emptyNote.hidden = true
  emptyNote.textContent = "No links match this filter"

  const qualityTabs = createQualityTabs({
    storageKey: CONFIG.storageKeys.movieQualityTab,
    onQualityChange: () => {
      applyQualityFilter()
    },
  })

  const applyQualityFilter = () => {
    const items = Array.from(list.querySelectorAll(".userpatch-release-item"))
    const available = new Set(
      items
        .map((item) => item.dataset.userpatchQuality)
        .filter((quality) => quality && quality !== "unknown")
    )
    const canFilter = available.size > 1
    qualityTabs.element.hidden = !canFilter
    const selectedQuality = qualityTabs.refreshButtons(available)
    // A remembered filter must not hide rows when there is no usable chooser.
    const activeQuality = canFilter ? selectedQuality : "all"
    let visible = 0
    for (const item of items) {
      const quality = item.dataset.userpatchQuality || "unknown"
      const hidden = activeQuality !== "all" && quality !== activeQuality
      item.classList.toggle("userpatch-filter-hidden", hidden)
      if (!hidden) {
        visible += 1
      }
    }
    emptyNote.hidden = visible > 0
  }

  // Grouped tab bar, mirroring the sibling 4K-HDHub redesign: movies get
  // Info and screenshots share the toolbar with the release sections.
  const hasLinksTab = !data.isSeries
  const hasArchiveTab =
    data.isSeries && data.releases.some((row) => !row.external)
  const hasEpisodesTab = data.isSeries && data.episodes.length > 0
  // Movies always render their releases through the archive branch; the
  // mode only matters for shows, where both lists can exist.
  let activeMode = "archive"
  if (data.isSeries && !hasArchiveTab) {
    activeMode = "episodes"
  }
  if (hasArchiveTab && hasEpisodesTab) {
    const savedMode = storageGet(CONFIG.storageKeys.seriesTab)
    if (savedMode === "archive" || savedMode === "episodes") {
      activeMode = savedMode
    }
  }
  const tabDefs = [
    ["info", "Info", "info"],
    ...(data.screenshots.length ? [["screenshot", "Screenshot", "film"]] : []),
    ...(hasLinksTab ? [["links", "Links", "download"]] : []),
    ...(hasArchiveTab ? [["archive", "Archive", "file-archive"]] : []),
    ...(hasEpisodesTab ? [["episodes", "Single Episode", "file-play"]] : []),
  ]
  const savedTab = storageGet(CONFIG.storageKeys.detailTab)
  let activeTab = "info"
  if (savedTab === "links") {
    activeTab = hasLinksTab ? "links" : activeMode
  } else if (savedTab === "screenshot" && data.screenshots.length) {
    activeTab = "screenshot"
  }

  const tabs = document.createElement("div")
  tabs.className = "userpatch-mode-tabs"
  tabs.setAttribute("role", "group")
  tabs.setAttribute("aria-label", "Switch detail sections")
  const tabScroller = document.createElement("div")
  tabScroller.className = "userpatch-mode-scroll"
  tabScroller.append(tabs)
  const tabIndicator = document.createElement("span")
  tabIndicator.className = "userpatch-mode-indicator"
  tabIndicator.setAttribute("aria-hidden", "true")
  tabIndicator.dataset.ready = "false"
  tabs.append(tabIndicator)
  const tabButtons = new Map()
  for (const [tab, label, iconName] of tabDefs) {
    const button = document.createElement("button")
    button.type = "button"
    button.className = "userpatch-mode-tab"
    button.dataset.tab = tab
    button.setAttribute("aria-pressed", tab === activeTab ? "true" : "false")
    const text = document.createElement("span")
    text.textContent = label
    button.append(text, createLucideIcon(iconName))
    tabs.append(button)
    tabButtons.set(tab, button)
  }
  if (tabButtons.size < 2) {
    tabs.hidden = true
    tabScroller.hidden = true
  }

  const screenshotsPane = document.createElement("div")
  screenshotsPane.className = "userpatch-screens"
  screenshotsPane.hidden = activeTab !== "screenshot"
  for (const screenshot of data.screenshots) {
    const link = document.createElement("a")
    link.className = "userpatch-screenshot"
    link.href = screenshot.href
    link.target = "_blank"
    link.rel = "noopener noreferrer nofollow"
    const image = document.createElement("img")
    image.src = screenshot.src || screenshot.full
    image.alt = screenshot.alt || "Screenshot"
    image.loading = "lazy"
    image.fetchPriority = "low"
    image.decoding = "async"
    setupProgressiveImage(image, screenshot.full)
    // If the full-size URL guess fails for some host, fall back to the
    // thumbnail the site shipped.
    image.addEventListener(
      "error",
      () => {
        if (screenshot.src && image.src !== screenshot.src) {
          image.src = screenshot.src
        }
      },
      { once: true }
    )
    link.addEventListener("click", (event) => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) {
        return
      }
      event.preventDefault()
      openScreenshotViewer(
        screenshot.full || screenshot.src,
        screenshot.alt,
        screenshot.src
      )
    })
    link.setAttribute("aria-haspopup", "dialog")
    link.append(image)
    screenshotsPane.append(link)
  }

  const positionTabIndicator = (target) => {
    positionSelectionIndicator(
      tabIndicator,
      tabs,
      target || tabButtons.get(activeTab),
      "mode"
    )
  }

  const getEventButton = (target) => {
    if (!(target instanceof Element)) {
      return null
    }
    const button = target.closest(".userpatch-mode-tab")
    return button instanceof HTMLElement && tabs.contains(button)
      ? button
      : null
  }
  const renderModeRows = () => {
    const openedReleases = getOpenedReleases()
    const fragment = document.createDocumentFragment()
    if (activeMode === "episodes") {
      for (const episode of data.episodes) {
        for (const group of episode.groups) {
          if (group.links.length) {
            fragment.append(buildEpisodeRow(episode, group, openedReleases))
          }
        }
      }
      // Shows without archive packs keep their remaining rows (like the
      // 4KHDHub cross-link) visible at the end of the episode list.
      if (!hasArchiveTab) {
        for (const row of data.releases) {
          fragment.append(buildReleaseRow(row, openedReleases))
        }
      }
    } else {
      for (const row of data.releases) {
        fragment.append(buildReleaseRow(row, openedReleases))
      }
    }
    list.replaceChildren(fragment)
  }

  const revealTab = (button) => {
    if (!button || !tabScroller.isConnected) {
      return
    }
    const viewport = tabScroller.getBoundingClientRect()
    const target = button.getBoundingClientRect()
    // Scroll just this strip, leaving the page's vertical position unchanged.
    let left = 0
    if (target.left < viewport.left) {
      left = target.left - viewport.left - 4
    } else if (target.right > viewport.right) {
      left = target.right - viewport.right + 4
    }
    if (left) {
      tabScroller.scrollBy({ left, behavior: "instant" })
    }
  }

  const applyTab = (tab) => {
    activeTab = tab
    for (const [key, button] of tabButtons) {
      button.setAttribute("aria-pressed", key === tab ? "true" : "false")
    }
    const showLinks = tab !== "screenshot" && tab !== "info"
    infoPane.hidden = tab !== "info"
    screenshotsPane.hidden = tab !== "screenshot"
    list.hidden = !showLinks
    emptyNote.hidden = !showLinks
    qualityTabs.element.hidden = !showLinks
    if (showLinks) {
      if ((tab === "archive" || tab === "episodes") && tab !== activeMode) {
        activeMode = tab
        storageSet(CONFIG.storageKeys.seriesTab, activeMode)
        renderModeRows()
      }
      applyQualityFilter()
    }
    revealTab(tabButtons.get(tab))
    positionTabIndicator()
  }

  const onClick = (event) => {
    const button = getEventButton(event.target)
    if (!button || button.dataset.tab === activeTab) {
      return
    }
    const tab = button.dataset.tab
    storageSet(
      CONFIG.storageKeys.detailTab,
      tab === "info" || tab === "screenshot" ? tab : "links"
    )
    applyTab(tab)
  }
  const positionActiveTabIndicator = () => {
    requestAnimationFrame(() => {
      if (tabs.isConnected) {
        revealTab(tabButtons.get(activeTab))
        positionTabIndicator()
      }
    })
  }
  const tabResizeObserver =
    typeof ResizeObserver === "undefined"
      ? null
      : new ResizeObserver(positionActiveTabIndicator)
  tabResizeObserver?.observe(tabs)
  for (const button of tabButtons.values()) {
    tabResizeObserver?.observe(button)
  }
  if (!tabResizeObserver) {
    window.addEventListener("resize", positionActiveTabIndicator)
  }
  document.fonts?.ready.then(positionActiveTabIndicator)

  tabs.addEventListener("click", onClick)
  setupIndicatorHover(tabs, positionTabIndicator, revealTab)

  const infoPane = document.createElement("section")
  infoPane.className = "userpatch-detail-info"
  infoPane.hidden = true

  toolbar.append(tabScroller, qualityTabs.element)
  mainColumn.append(toolbar, infoPane, screenshotsPane, list, emptyNote)

  renderModeRows()
  applyTab(activeTab)

  const infoEntries = [
    ["Posted", data.date],
    ...data.metaRows.filter(([label]) => label !== "Posted"),
    ["Storyline", data.storyline],
  ]
  infoPane.append(createDetailInfoList(infoEntries))
  const trailer = createTrailer(data.trailer)
  if (trailer) {
    infoPane.append(trailer)
  }

  root.append(panel, mainColumn)
  document.body.append(root)

  const onReleaseClick = (event) => {
    if (event.target.closest(".userpatch-provider-link")) {
      return
    }
    const item = event.target.closest("a.userpatch-release-item")
    if (!item) {
      return
    }
    markReleaseOpened(item.querySelector(".userpatch-release-row"), item)
    saveOpenedRelease(item.dataset.userpatchFilename, item.href)
  }
  root.addEventListener("click", onReleaseClick, true)
  setDetailTooltipCleanup(setupProviderTooltip(root))
}

export const ensureDetailPage = () => {
  if (document.querySelector(".userpatch-detail-root")) {
    return true
  }
  const data = extractDetail()
  if (!data) {
    return false
  }
  if (!data.releases.length && !data.episodes.length) {
    return false
  }
  buildDetailPage(data)
  return true
}
