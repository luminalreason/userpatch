import { normalizePathname } from "../shared/dom.js"
import {
  bindMobileMenuButton,
  createMobileMenu,
} from "../shared/mobile-menu.js"
import { createSettingsButton } from "../shared/redesign-settings.js"
import { HEADER_WORDMARK_DATA_URI, SITE_ICON_DATA_URI } from "./branding.js"
import { CONFIG } from "./config.js"
import { collectNavigation } from "./header-nav.js"
import { createLucideIcon } from "./icons.js"
import { openSearchDialog } from "./search-dialog.js"

let mobileMenu = null

const ensureMobileMenu = () => {
  if (!document.body) {
    return null
  }
  if (mobileMenu?.isConnected) {
    return mobileMenu
  }

  const items = collectNavigation()
  const menu = createMobileMenu(
    CONFIG.mobileMenuId,
    HEADER_WORDMARK_DATA_URI,
    "HDHub4u",
    createLucideIcon("x")
  )

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
  menu.append(nav)
  document.body.append(menu)
  mobileMenu = menu
  return menu
}

export let mobileNavigationElement = null

export const ensureMobileNavigation = () => {
  if (!document.body) {
    return false
  }
  if (mobileNavigationElement?.isConnected) {
    return true
  }

  if (!ensureMobileMenu()) {
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
        bindMobileMenuButton(item, CONFIG.mobileMenuId, openMobileMenu)
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

  navigation.append(createSettingsButton(CONFIG, true))
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
  mobileMenu = null
  mobileNavigationElement = null
}

export const openMobileMenu = () => ensureMobileMenu()?.showModal()
