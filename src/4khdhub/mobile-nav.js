import {
  bindMobileMenuButton,
  createMobileMenu,
} from "../shared/mobile-menu.js"
import { createSettingsButton } from "../shared/redesign-settings.js"
import { HEADER_WORDMARK_DATA_URI, SITE_ICON_DATA_URI } from "./branding.js"
import { CONFIG } from "./config.js"
import { getNavigationPath, normalizeText } from "./dom.js"
import { openHeaderSearch } from "./header-nav.js"
import { createLucideIcon } from "./icons.js"

export let mobileNavigationCleanup = null
let mobileMenu = null
const ensureMobileMenu = () => {
  const sourceList = document.querySelector("#main-nav .nav-list")
  if (!sourceList) {
    return null
  }

  const sourceMarkup = sourceList.innerHTML
  if (
    mobileMenu?.isConnected &&
    mobileMenu.dataset.sourceMarkup === sourceMarkup
  ) {
    return mobileMenu
  }

  mobileMenu?.remove()

  const menu = createMobileMenu(
    CONFIG.mobileMenuId,
    HEADER_WORDMARK_DATA_URI,
    "4K-HDHub",
    createLucideIcon("x")
  )
  menu.dataset.sourceMarkup = sourceMarkup

  const menuNavigation = document.createElement("nav")
  menuNavigation.className = "userpatch-mobile-menu-nav"
  menuNavigation.setAttribute("aria-label", "Site navigation")
  const list = document.createElement("ul")
  list.className = "userpatch-mobile-menu-list"

  const createMenuLink = (sourceLink) => {
    const href = sourceLink.getAttribute("href")
    const label = normalizeText(sourceLink.textContent)
    if (!href || href === "#" || !label) {
      return null
    }

    const link = document.createElement("a")
    link.className = "userpatch-mobile-menu-link"
    link.href = href
    link.textContent = label
    if (Object.hasOwn(sourceLink.dataset, "noSwup")) {
      link.dataset.noSwup = ""
    }
    return link
  }

  let groupIndex = 0
  for (const sourceItem of sourceList.children) {
    const sourceLink = sourceItem.querySelector(":scope > .nav-link")
    if (!(sourceLink instanceof HTMLAnchorElement)) {
      continue
    }

    const item = document.createElement("li")
    item.className = "userpatch-mobile-menu-item"
    const sourceLinks = sourceItem.querySelectorAll(
      ":scope > .dropdown-menu a[href]"
    )

    if (sourceLinks.length) {
      const group = document.createElement("details")
      group.className = "userpatch-mobile-menu-group"
      const summary = document.createElement("summary")
      summary.className = "userpatch-mobile-menu-summary"
      const label = document.createElement("span")
      label.textContent = normalizeText(sourceLink.textContent)
      const submenuId = `userpatch-mobile-menu-sublist-${groupIndex}`
      const chevron = createLucideIcon("chevron-down")
      chevron.setAttribute("aria-hidden", "true")
      summary.setAttribute("aria-controls", submenuId)
      summary.append(label, chevron)

      const submenu = document.createElement("ul")
      submenu.className = "userpatch-mobile-menu-sublist"
      submenu.id = submenuId
      for (const sourceSubLink of sourceLinks) {
        const link = createMenuLink(sourceSubLink)
        if (!link) {
          continue
        }
        const subItem = document.createElement("li")
        subItem.className = "userpatch-mobile-menu-item"
        subItem.append(link)
        submenu.append(subItem)
      }
      group.append(summary, submenu)
      item.append(group)
      groupIndex += 1
    } else {
      const link = createMenuLink(sourceLink)
      if (!link) {
        continue
      }
      item.append(link)
    }
    list.append(item)
  }

  menuNavigation.append(list)
  menu.append(menuNavigation)
  document.body.append(menu)
  mobileMenu = menu
  return menu
}

export const removeMobileNavigation = () => {
  mobileNavigationCleanup?.()
  mobileNavigationCleanup = null
  mobileMenu?.remove()
  mobileMenu = null
  document
    .querySelectorAll(".userpatch-mobile-nav")
    .forEach((navigation) => navigation.remove())
}

export const setupMobileNavigation = () => {
  if (!document.body) {
    return false
  }

  let navigation = document.querySelector(".userpatch-mobile-nav")
  if (!navigation) {
    navigation = document.createElement("nav")
    navigation.className = "userpatch-mobile-nav"
    navigation.setAttribute("aria-label", "Mobile navigation")

    for (const [destination, label, iconName] of CONFIG.mobileNavigationItems) {
      const isAction = destination === "menu" || destination === "search"
      const item = document.createElement(isAction ? "button" : "a")
      item.className = "userpatch-mobile-nav-item"
      item.setAttribute("aria-label", label)
      if (isAction) {
        item.type = "button"
        item.dataset.action = destination
        if (destination === "menu") {
          bindMobileMenuButton(item, CONFIG.mobileMenuId, openMobileMenu)
        }
      } else {
        item.href = destination
        item.dataset.noSwup = ""
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
        icon.append(createLucideIcon(iconName))
      }

      const text = document.createElement("span")
      text.textContent = label
      item.append(icon, text)
      navigation.append(item)
    }

    navigation.append(createSettingsButton(CONFIG, true))
    document.body.append(navigation)
  }

  ensureMobileMenu()

  const currentPath = getNavigationPath(location.pathname)
  for (const link of navigation.querySelectorAll("a[href]")) {
    const targetPath = getNavigationPath(link.href)
    if (targetPath === currentPath) {
      link.setAttribute("aria-current", "page")
    } else {
      link.removeAttribute("aria-current")
    }
  }

  if (!mobileNavigationCleanup) {
    const onAction = (event) => {
      if (!(event.target instanceof Element)) {
        return
      }
      const trigger = event.target.closest("[data-action]")
      const action = trigger?.dataset.action
      if (action === "search") {
        if (openHeaderSearch()) {
          return
        }
        document.querySelector("#search-toggle")?.click()
      }
    }
    navigation.addEventListener("click", onAction)
    mobileNavigationCleanup = () =>
      navigation.removeEventListener("click", onAction)
  }

  return true
}

export const openMobileMenu = () => ensureMobileMenu()?.showModal()
