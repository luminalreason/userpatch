import { normalizePathname } from "../shared/dom.js"
import { positionSelectionIndicator } from "../shared/quality-tabs.js"
import { HEADER_WORDMARK_DATA_URI } from "./branding.js"
import { CONFIG } from "./config.js"
import { normalizeText } from "./dom.js"
import { createLucideIcon } from "./icons.js"
import { openSearchDialog } from "./search-dialog.js"

export const NAV_LABEL_WORD_FIXES = [
  [/\bbollywood\b/gi, "Bollywood"],
  [/\bhollywood\b/gi, "Hollywood"],
  [/\bgenres\b/gi, "Genres"],
]

const normalizeNavItemLabel = (label) => {
  let text = label
  for (const [pattern, replacement] of NAV_LABEL_WORD_FIXES) {
    text = text.replace(pattern, replacement)
  }
  return text
}

const NAV_INDICATOR_CLASS = "userpatch-nav-indicator"
export const collectNavigation = () => {
  const items = []
  const links = document.querySelector("#category-links")
  if (links) {
    for (const item of links.children) {
      if (item.id === "mobile-search") {
        continue
      }
      const trigger = item.querySelector(":scope > a")
      const submenu = item.querySelectorAll(":scope > .dropdown-menu a[href]")
      if (submenu.length && trigger) {
        const label = normalizeNavItemLabel(
          normalizeText(trigger.textContent.replace("▾", ""))
        )
        const children = []
        for (const link of submenu) {
          const childLabel = normalizeNavItemLabel(
            normalizeText(link.textContent)
          )
          const href = link.getAttribute("href")
          if (childLabel && href && href !== "#") {
            children.push({ label: childLabel, href })
          }
        }
        if (label && children.length) {
          items.push({ label, children })
        }
        continue
      }
      if (!(trigger instanceof HTMLAnchorElement)) {
        continue
      }
      const label = normalizeNavItemLabel(
        normalizeText(
          trigger.textContent.replace("🏠", "").replace(/HDHub4u\s+/i, "")
        )
      )
      const href = trigger.getAttribute("href")
      if (label && href && href !== "#") {
        if (
          label.toLowerCase() === "home" ||
          href === "/" ||
          href === location.origin ||
          href === `${location.origin}/`
        ) {
          continue
        }
        items.push({ label, href })
      }
    }
  }

  const fourKButton = document.querySelector(
    ".navbar-header-custom a.custom-button[href]"
  )
  if (fourKButton) {
    const label =
      normalizeNavItemLabel(normalizeText(fourKButton.textContent)) ||
      "4K Movies"
    items.push({ label, href: fourKButton.getAttribute("href") })
  }
  return items
}

export const matchesCurrentPage = (href) => {
  if (!href || href === "#") {
    return false
  }

  try {
    const url = new URL(href, location.href)
    if (url.origin !== location.origin) {
      return false
    }

    const targetPath = normalizePathname(url.pathname).toLowerCase()
    const currentPath = normalizePathname(location.pathname).toLowerCase()
    return (
      targetPath === currentPath ||
      (targetPath !== "/" && currentPath.startsWith(`${targetPath}/`))
    )
  } catch {
    return false
  }
}

export let headerElement = null
export let headerNavContainer = null
export let headerNavIndicator = null
export let headerNavResizeObserver = null
export let refreshHeaderIndicator = () => {}

export const positionHeaderIndicator = (target) => {
  if (!headerNavIndicator || !headerNavContainer) {
    return
  }
  if (
    !target ||
    !headerNavContainer.contains(target) ||
    !window.matchMedia("(min-width: 46.01rem)").matches
  ) {
    headerNavIndicator.dataset.ready = "false"
    return
  }
  positionSelectionIndicator(
    headerNavIndicator,
    headerNavContainer,
    target,
    "nav"
  )
}

export const positionActiveHeaderIndicator = () => {
  if (!headerNavContainer) {
    return
  }
  for (const item of headerNavContainer.querySelectorAll(
    ".userpatch-brand, .userpatch-nav-link"
  )) {
    item.classList.remove("userpatch-nav-active")
  }
  let activeItem =
    normalizePathname(location.pathname).toLowerCase() === "/"
      ? headerNavContainer.querySelector(".userpatch-brand")
      : null
  if (!activeItem) {
    for (const link of headerNavContainer.querySelectorAll(
      "a.userpatch-nav-link[href]"
    )) {
      if (matchesCurrentPage(link.getAttribute("href"))) {
        activeItem = link
        break
      }
    }
  }
  if (!activeItem) {
    for (const dropdown of headerNavContainer.querySelectorAll(
      ".userpatch-nav-item.dropdown"
    )) {
      const childMatches = [
        ...dropdown.querySelectorAll(".userpatch-dropdown-item[href]"),
      ].some((link) => matchesCurrentPage(link.getAttribute("href")))
      if (childMatches) {
        activeItem = dropdown.querySelector(":scope > .userpatch-nav-link")
        break
      }
    }
  }
  if (activeItem) {
    activeItem.classList.add("userpatch-nav-active")
  }
  positionHeaderIndicator(activeItem)
}

export const setupHeaderIndicator = (container) => {
  headerNavContainer = container
  headerNavIndicator = document.createElement("span")
  headerNavIndicator.className = NAV_INDICATOR_CLASS
  headerNavIndicator.setAttribute("aria-hidden", "true")
  headerNavIndicator.dataset.ready = "false"
  container.prepend(headerNavIndicator)

  const getEventItem = (target) => {
    if (!(target instanceof Element)) {
      return null
    }
    return target.closest(
      ".userpatch-brand, .userpatch-nav-link, .userpatch-header-action"
    )
  }
  const onPointerOver = (event) => {
    if (
      (event.pointerType !== "mouse" && event.pointerType !== "pen") ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ) {
      return
    }
    const item = getEventItem(event.target)
    if (item) {
      positionHeaderIndicator(item)
    }
  }
  const onFocusIn = (event) => {
    const item = getEventItem(event.target)
    if (item) {
      positionHeaderIndicator(item)
    }
  }
  const onFocusOut = (event) => {
    if (
      !(event.relatedTarget instanceof Node) ||
      !container.contains(event.relatedTarget)
    ) {
      positionActiveHeaderIndicator()
    }
  }
  container.addEventListener("pointerover", onPointerOver)
  container.addEventListener("pointerleave", positionActiveHeaderIndicator)
  container.addEventListener("focusin", onFocusIn)
  container.addEventListener("focusout", onFocusOut)
  if (typeof ResizeObserver === "undefined") {
    window.addEventListener("resize", positionActiveHeaderIndicator)
  } else {
    headerNavResizeObserver = new ResizeObserver(positionActiveHeaderIndicator)
    headerNavResizeObserver.observe(container)
  }
  refreshHeaderIndicator = positionActiveHeaderIndicator
  positionActiveHeaderIndicator()
}

export const ensureHeader = () => {
  if (!document.body) {
    return false
  }
  if (headerElement?.isConnected) {
    refreshHeaderIndicator()
    return true
  }

  const items = collectNavigation()
  const header = document.createElement("header")
  header.className = "userpatch-header"

  const inner = document.createElement("div")
  inner.className = "userpatch-header-inner"

  const container = document.createElement("div")
  container.className = "userpatch-header-container"

  const brand = document.createElement("a")
  brand.className = "userpatch-brand"
  brand.href = "/"
  brand.setAttribute("aria-label", "HDHub4u home")
  const brandImage = document.createElement("img")
  brandImage.src = HEADER_WORDMARK_DATA_URI
  brandImage.alt = "HDHub4u"
  brandImage.decoding = "async"
  brand.append(brandImage)
  container.append(brand)

  if (items.length) {
    const nav = document.createElement("nav")
    nav.className = "userpatch-nav"
    nav.setAttribute("aria-label", "Site navigation")
    const list = document.createElement("ul")
    list.className = "userpatch-nav-list"
    for (const item of items) {
      const listItem = document.createElement("li")
      listItem.className = "userpatch-nav-item"
      if (item.children) {
        listItem.classList.add("dropdown")
        const trigger = document.createElement("button")
        trigger.type = "button"
        trigger.className = "userpatch-nav-link"
        trigger.setAttribute("aria-haspopup", "true")
        trigger.setAttribute("aria-expanded", "false")
        const text = document.createElement("span")
        text.textContent = item.label
        trigger.append(text, createLucideIcon("chevron-down"))
        const submenu = document.createElement("ul")
        submenu.className = "userpatch-dropdown-menu"
        for (const child of item.children) {
          const childItem = document.createElement("li")
          const link = document.createElement("a")
          link.className = "userpatch-dropdown-item"
          link.href = child.href
          link.textContent = child.label
          childItem.append(link)
          submenu.append(childItem)
        }
        trigger.addEventListener("click", (event) => {
          event.stopPropagation()
          const willOpen = !listItem.classList.contains("open")
          for (const other of header.querySelectorAll(
            ".userpatch-nav-item.dropdown.open"
          )) {
            if (other !== listItem) {
              other.classList.remove("open")
              other
                .querySelector(":scope > .userpatch-nav-link")
                ?.setAttribute("aria-expanded", "false")
            }
          }
          listItem.classList.toggle("open", willOpen)
          trigger.setAttribute("aria-expanded", String(willOpen))
        })
        listItem.append(trigger, submenu)
      } else {
        const link = document.createElement("a")
        link.className = "userpatch-nav-link"
        link.href = item.href
        if (!item.href.startsWith("/")) {
          link.target = "_blank"
          link.rel = "noopener noreferrer"
        }
        link.textContent = item.label
        listItem.append(link)
      }
      list.append(listItem)
    }
    nav.append(list)
    container.append(nav)
  }

  const searchToggle = document.createElement("button")
  searchToggle.type = "button"
  searchToggle.className = "userpatch-header-action userpatch-search-toggle"
  searchToggle.setAttribute("aria-label", "Search")
  searchToggle.setAttribute("aria-haspopup", "dialog")
  searchToggle.append(createLucideIcon("search"))
  searchToggle.addEventListener("click", () => {
    openSearchDialog()
  })

  const menuToggle = document.createElement("button")
  menuToggle.type = "button"
  menuToggle.className = "userpatch-header-action userpatch-menu-toggle"
  menuToggle.setAttribute("aria-label", "Menu")
  menuToggle.setAttribute("popovertarget", CONFIG.mobileMenuPopoverId)
  menuToggle.append(createLucideIcon("menu"))
  container.append(menuToggle, searchToggle)

  inner.append(container)
  header.append(inner)
  document.body.prepend(header)
  headerElement = header
  setupHeaderIndicator(container)
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".userpatch-nav-item.dropdown")) {
      for (const openDropdown of header.querySelectorAll(
        ".userpatch-nav-item.dropdown.open"
      )) {
        openDropdown.classList.remove("open")
        openDropdown
          .querySelector(":scope > .userpatch-nav-link")
          ?.setAttribute("aria-expanded", "false")
      }
    }
  })
  return true
}

export const resetHeaderNavigation = () => {
  headerElement = null
  headerNavContainer = null
  headerNavIndicator = null
  refreshHeaderIndicator = () => {}
  if (headerNavResizeObserver) {
    headerNavResizeObserver.disconnect()
    headerNavResizeObserver = null
  }
}
