import { normalizePathname } from "../shared/dom.js"
import { SITE_ICON_DATA_URI } from "./branding.js"
import { CONFIG } from "./config.js"
import { collectNavigation } from "./header-nav.js"
import { createLucideIcon } from "./icons.js"
import { openSearchDialog } from "./search-dialog.js"

export let mobileMenuPopover = null

export const ensureMobileMenuPopover = () => {
  if (!document.body) {
    return null
  }
  if (mobileMenuPopover?.isConnected) {
    return mobileMenuPopover
  }
  if (!("popover" in HTMLElement.prototype)) {
    return null
  }

  const items = collectNavigation()
  const popover = document.createElement("div")
  popover.className = "userpatch-mobile-menu"
  popover.id = CONFIG.mobileMenuPopoverId
  popover.setAttribute("popover", "auto")

  const header = document.createElement("header")
  header.className = "userpatch-mobile-menu-header"
  const title = document.createElement("h2")
  title.className = "userpatch-mobile-menu-title"
  title.textContent = "Menu"
  const closeButton = document.createElement("button")
  closeButton.type = "button"
  closeButton.className = "userpatch-mobile-menu-close"
  closeButton.setAttribute("aria-label", "Close menu")
  closeButton.setAttribute("popovertarget", CONFIG.mobileMenuPopoverId)
  closeButton.setAttribute("popovertargetaction", "hide")
  closeButton.append(createLucideIcon("x"))
  header.append(title, closeButton)

  const nav = document.createElement("nav")
  nav.className = "userpatch-mobile-menu-nav"
  nav.setAttribute("aria-label", "Site navigation")
  const list = document.createElement("ul")
  list.className = "userpatch-mobile-menu-list"

  let groupIndex = 0
  for (const item of items) {
    const listItem = document.createElement("li")
    listItem.className = "userpatch-mobile-menu-item"
    if (item.children) {
      const group = document.createElement("details")
      group.className = "userpatch-mobile-menu-group"
      const summary = document.createElement("summary")
      summary.className = "userpatch-mobile-menu-summary"
      const label = document.createElement("span")
      label.textContent = item.label
      const submenuId = `userpatch-mobile-menu-sublist-${groupIndex}`
      summary.setAttribute("aria-controls", submenuId)
      summary.append(label, createLucideIcon("chevron-down"))
      const submenu = document.createElement("ul")
      submenu.className = "userpatch-mobile-menu-sublist"
      submenu.id = submenuId
      for (const child of item.children) {
        const childItem = document.createElement("li")
        const link = document.createElement("a")
        link.className = "userpatch-mobile-menu-link"
        link.href = child.href
        link.textContent = child.label
        childItem.append(link)
        submenu.append(childItem)
      }
      group.append(summary, submenu)
      listItem.append(group)
      groupIndex += 1
    } else {
      const link = document.createElement("a")
      link.className = "userpatch-mobile-menu-link"
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
  popover.append(header, nav)
  popover.addEventListener("click", (event) => {
    if (event.target instanceof Element && event.target.closest("a[href]")) {
      popover.hidePopover()
    }
  })
  document.body.append(popover)
  mobileMenuPopover = popover
  return popover
}

export let mobileNavigationElement = null

export const ensureMobileNavigation = () => {
  if (!document.body) {
    return false
  }
  if (mobileNavigationElement?.isConnected) {
    return true
  }

  const popover = ensureMobileMenuPopover()
  if (!popover) {
    return false
  }

  const navigation = document.createElement("nav")
  navigation.className = "userpatch-mobile-nav"
  navigation.setAttribute("aria-label", "Mobile navigation")

  for (const [destination, label] of CONFIG.mobileNavigationItems) {
    const isAction = destination === "menu" || destination === "search"
    const item = document.createElement(isAction ? "button" : "a")
    item.className = "userpatch-mobile-nav-item"
    item.setAttribute("aria-label", label)
    if (isAction) {
      item.type = "button"
      if (destination === "menu") {
        item.setAttribute("popovertarget", CONFIG.mobileMenuPopoverId)
        item.setAttribute("aria-controls", CONFIG.mobileMenuPopoverId)
      } else {
        item.addEventListener("click", () => {
          if (!openSearchDialog()) {
            location.href = CONFIG.searchPagePath
          }
        })
      }
    } else {
      item.href = destination
    }

    const icon = document.createElement("span")
    icon.className = "userpatch-mobile-nav-icon"
    icon.setAttribute("aria-hidden", "true")
    if (label === "Home") {
      icon.classList.add("userpatch-mobile-nav-icon-brand")
      const image = document.createElement("img")
      image.className = "userpatch-mobile-nav-brand-logo"
      image.src = SITE_ICON_DATA_URI
      image.alt = ""
      image.width = 20
      image.height = 20
      image.decoding = "async"
      icon.append(image)
    } else {
      icon.append(createLucideIcon(destination === "menu" ? "menu" : "search"))
    }

    const text = document.createElement("span")
    text.textContent = label
    item.append(icon, text)
    navigation.append(item)
  }

  document.body.append(navigation)
  mobileNavigationElement = navigation

  const currentPath = normalizePathname(location.pathname)
  for (const link of navigation.querySelectorAll("a[href]")) {
    const targetPath = normalizePathname(link.href)
    if (targetPath === currentPath) {
      link.setAttribute("aria-current", "page")
    } else {
      link.removeAttribute("aria-current")
    }
  }
  return true
}

export const resetMobileNavigationState = () => {
  mobileMenuPopover = null
  mobileNavigationElement = null
}
