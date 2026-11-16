import { createDetailInfoList } from "../shared/detail-info.js"
import {
  positionSelectionIndicator,
  setupIndicatorHover,
} from "../shared/quality-tabs.js"
import { storageGet, storageSet } from "../shared/storage.js"
import { createTrailer, findTrailerUrl } from "../shared/trailer.js"
import { CONFIG } from "./config.js"
import { createLucideIcon } from "./icons.js"

export const captureDetailInfo = (main, titleContainer) => {
  if (main.querySelector(":scope > .userpatch-detail-info")) {
    return
  }
  const pane = document.createElement("section")
  pane.className = "userpatch-detail-info"
  pane.hidden = true
  const entries = [
    ["Tagline", titleContainer?.querySelector(".movie-tagline")?.textContent],
    ["Description", main.querySelector(".detail-description")?.textContent],
  ]
  for (const item of main.querySelectorAll(".metadata-list .metadata-item")) {
    const label = item
      .querySelector(".metadata-label")
      ?.textContent.trim()
      .replace(/:$/, "")
    const value = item.querySelector(".metadata-value")
    if (!label || !value) {
      continue
    }
    const tokens = Array.from(value.querySelectorAll(".metadata-token"))
    const text = tokens.length
      ? tokens.map((token) => token.textContent.trim()).join(", ")
      : value.textContent
    entries.push([
      label,
      label.toLowerCase() === "audios"
        ? text.replaceAll(/\s*\|\s*/g, " | ")
        : text,
    ])
  }
  pane.append(createDetailInfoList(entries))
  const trailer = createTrailer(findTrailerUrl(main))
  if (trailer) {
    pane.append(trailer)
  }
  main.append(pane)
  const screenshots = document.createElement("section")
  screenshots.className = "userpatch-detail-screenshots"
  screenshots.hidden = true
  for (const section of main.querySelectorAll(".content-section")) {
    const heading = section.querySelector(".section-title")
    if (
      !/screenshots?/i.test(heading?.textContent || "") ||
      !section.querySelector("img") ||
      section.querySelector(".download-item, #series-tabs")
    ) {
      continue
    }
    screenshots.append(section)
  }
  if (screenshots.children.length) {
    main.append(screenshots)
  }
}

export const ensureDetailTabs = (siteRoot) => {
  const main = siteRoot.querySelector(".content-main.userpatch-release-main")
  const toolbar = main?.querySelector(":scope > .userpatch-release-toolbar")
  const info = main?.querySelector(":scope > .userpatch-detail-info")
  if (!toolbar || !info || toolbar.querySelector(".userpatch-detail-tabs")) {
    return
  }
  const screenshots = main.querySelector(
    ":scope > .userpatch-detail-screenshots"
  )
  const group = document.createElement("div")
  group.className = "userpatch-quality-tabs userpatch-detail-tabs"
  group.setAttribute("role", "group")
  group.setAttribute("aria-label", "Switch detail sections")
  const indicator = document.createElement("span")
  indicator.className = "userpatch-quality-indicator"
  indicator.setAttribute("aria-hidden", "true")
  group.append(indicator)
  const buttons = new Map()
  const positionIndicator = (target) => {
    const selected = [...buttons.values()].find(
      (button) => button.getAttribute("aria-pressed") === "true"
    )
    positionSelectionIndicator(indicator, group, target || selected, "quality")
  }
  const releasePanels = Array.from(main.children).filter(
    (node) =>
      node !== info &&
      node !== toolbar &&
      (node.classList.contains("userpatch-movie-releases") ||
        node.querySelector("#complete-pack, #episodes") ||
        node.id === "complete-pack" ||
        node.id === "episodes")
  )
  const select = (value) => {
    info.hidden = value !== "info"
    if (screenshots) {
      screenshots.hidden = value !== "screenshot"
    }
    for (const panel of releasePanels) {
      panel.hidden = value !== "links"
    }
    for (const control of toolbar.children) {
      if (control !== group) {
        control.hidden = value !== "links"
      }
    }
    // Mobile moves the movie filter out of the toolbar into the list.
    for (const filter of main.querySelectorAll(
      ":scope > .userpatch-movie-releases > .userpatch-quality-tabs"
    )) {
      filter.hidden = value !== "links"
    }
    for (const [key, button] of buttons) {
      button.setAttribute("aria-pressed", String(key === value))
    }
    positionIndicator(buttons.get(value))
  }
  for (const [value, label] of [
    ["info", "Info"],
    ...(screenshots ? [["screenshot", "Screenshot"]] : []),
    ["links", "Links"],
  ]) {
    const button = document.createElement("button")
    button.type = "button"
    button.className = "userpatch-quality-tab"
    button.dataset.tabContent = "label"
    const text = document.createElement("span")
    text.textContent = label
    const icons = { info: "info", screenshot: "film", links: "download" }
    button.append(text, createLucideIcon(icons[value]))
    button.addEventListener("click", () => {
      storageSet(CONFIG.storageKeys.detailTab, value)
      select(value)
    })
    buttons.set(value, button)
    group.append(button)
  }
  toolbar.prepend(group)
  setupIndicatorHover(group, positionIndicator)
  const savedTab = storageGet(CONFIG.storageKeys.detailTab)
  select(buttons.has(savedTab) ? savedTab : "info")
  document.fonts?.ready.then(() => {
    if (group.isConnected) {
      const active = [...buttons.values()].find(
        (button) => button.getAttribute("aria-pressed") === "true"
      )
      positionSelectionIndicator(indicator, group, active, "quality")
    }
  })
}
