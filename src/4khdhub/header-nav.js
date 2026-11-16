import { isCloudflareChallenge } from "../shared/cloudflare.js"
import { normalizePathname } from "../shared/dom.js"
import { positionSelectionIndicator } from "../shared/quality-tabs.js"
import { ensureStyles } from "../shared/styles.js"
import { applySiteBranding } from "./branding.js"
import { NAV_INDICATOR_CLASS } from "./config.js"
import { normalizeLucideIcons } from "./icons.js"

export const NAV_CONTAINER_SELECTOR = "header.sticky > .header > .container"
export const NAV_ITEM_SELECTOR =
  ".navbar-brand, #main-nav .nav-list > .nav-item > .nav-link, #menu-toggle, #search-toggle"
export let headerNavigationCleanup = null
export let headerNavigationContainer = null
export let refreshHeaderNavigation = () => {}
export let headerSearchCleanup = null
export let headerSearchForm = null
export let headerSearchToggle = null
export const openHeaderSearch = () => {
  const dialog = document.getElementById("userpatch-search-dialog")
  if (
    typeof HTMLDialogElement === "undefined" ||
    !(dialog instanceof HTMLDialogElement) ||
    typeof dialog.showModal !== "function" ||
    !dialog.isConnected
  ) {
    return false
  }
  if (!dialog.open) {
    dialog.showModal()
  }
  headerSearchToggle?.setAttribute("aria-expanded", "true")
  return true
}

export const setupHeaderSearch = () => {
  try {
    const overlay = document.querySelector("#search-overlay")
    const form =
      overlay?.querySelector(".search-form") ||
      document.querySelector(
        ".search-form.userpatch-search-form, .search-form.userpatch-header-search"
      )
    const inputGroup = form?.querySelector(".search-input-container")
    const input = inputGroup?.querySelector('input[type="search"]')
    const icon = inputGroup?.querySelector(".search-icon-overlay")
    const submit = form?.querySelector(".search-submit")
    const toggle = document.querySelector("#search-toggle")
    const existingDialog = document.querySelector(
      "dialog#userpatch-search-dialog"
    )

    if (
      !overlay ||
      !form ||
      !inputGroup ||
      !input ||
      !submit ||
      !toggle ||
      typeof HTMLDialogElement === "undefined"
    ) {
      return false
    }

    if (
      form === headerSearchForm &&
      form.parentElement === existingDialog &&
      toggle === headerSearchToggle
    ) {
      return true
    }

    headerSearchCleanup?.()
    document.querySelector("dialog#userpatch-search-dialog")?.remove()

    const formParent = form.parentNode
    const formNextSibling = form.nextSibling

    inputGroup.dataset.slot = "input-group"
    inputGroup.setAttribute("role", "group")
    inputGroup.classList.add("userpatch-search-input-group")
    input.dataset.slot = "input-group-control"
    input.id = "userpatch-site-search"
    input.removeAttribute("aria-label")
    input.setAttribute("placeholder", "Search movies and TV shows")
    input.setAttribute("autocomplete", "off")
    input.setAttribute("autocapitalize", "none")
    input.setAttribute("autocorrect", "off")
    input.setAttribute("spellcheck", "false")
    input.setAttribute("enterkeyhint", "search")
    input.maxLength = 200
    input.autofocus = true
    let searchLabel = form.querySelector(":scope > .userpatch-search-label")
    if (!searchLabel) {
      searchLabel = document.createElement("label")
      searchLabel.className = "sr-only userpatch-search-label"
      searchLabel.htmlFor = input.id
      searchLabel.textContent = "Search movies and TV shows"
      form.insertBefore(searchLabel, inputGroup)
    }
    form.setAttribute("role", "search")
    form.classList.remove("userpatch-header-search")
    form.classList.add("userpatch-search-form")

    if (icon) {
      const existingAddon = icon.closest('[data-slot="input-group-addon"]')
      if (existingAddon?.parentElement === inputGroup) {
        existingAddon.classList.add("userpatch-input-group-addon")
        existingAddon.dataset.align = "inline-start"
      } else if (icon.parentElement === inputGroup) {
        const addon = document.createElement("span")
        addon.className = "userpatch-input-group-addon"
        addon.dataset.slot = "input-group-addon"
        addon.dataset.align = "inline-start"
        addon.setAttribute("role", "group")
        addon.setAttribute("aria-hidden", "true")
        inputGroup.insertBefore(addon, icon)
        addon.append(icon)
      }
    }

    submit.type = "submit"
    submit.dataset.slot = "button"
    submit.setAttribute("aria-label", "Search")
    submit.hidden = true
    submit.setAttribute("aria-hidden", "true")
    inputGroup.querySelector(":scope > .userpatch-search-clear")?.remove()
    if (inputGroup.contains(submit)) {
      inputGroup.after(submit)
    }

    const dialog = document.createElement("dialog")
    dialog.id = "userpatch-search-dialog"
    dialog.className = "userpatch-search-dialog"
    dialog.setAttribute("aria-label", "Search movies and TV shows")
    dialog.setAttribute("closedby", "any")
    dialog.append(form)
    document.body.append(dialog)

    overlay.classList.add("hidden")
    overlay.setAttribute("aria-hidden", "true")
    overlay.removeAttribute("aria-modal")
    overlay.removeAttribute("aria-labelledby")
    overlay.removeAttribute("role")
    toggle.setAttribute("aria-controls", dialog.id)
    toggle.setAttribute("aria-expanded", "false")
    toggle.setAttribute("aria-haspopup", "dialog")

    let pointerStartedOutside = false
    const isOutsideDialog = (event) => {
      const rect = dialog.getBoundingClientRect()
      return (
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom
      )
    }

    const onToggle = (event) => {
      event.preventDefault()
      event.stopImmediatePropagation()
      openHeaderSearch()
    }
    const onDialogClose = () => {
      toggle.setAttribute("aria-expanded", "false")
    }
    const onPointerDown = (event) => {
      pointerStartedOutside = isOutsideDialog(event)
    }
    const onPointerUp = (event) => {
      const shouldDismiss =
        pointerStartedOutside && isOutsideDialog(event) && dialog.open
      pointerStartedOutside = false
      if (shouldDismiss) {
        dialog.close()
      }
    }

    toggle.addEventListener("click", onToggle, true)
    dialog.addEventListener("close", onDialogClose)
    const needsLightDismissFallback = !(
      "closedBy" in HTMLDialogElement.prototype
    )
    if (needsLightDismissFallback) {
      dialog.addEventListener("pointerdown", onPointerDown)
      dialog.addEventListener("pointerup", onPointerUp)
    }

    headerSearchForm = form
    headerSearchToggle = toggle
    headerSearchCleanup = () => {
      toggle.removeEventListener("click", onToggle, true)
      dialog.removeEventListener("close", onDialogClose)
      if (needsLightDismissFallback) {
        dialog.removeEventListener("pointerdown", onPointerDown)
        dialog.removeEventListener("pointerup", onPointerUp)
      }
      if (dialog.open) {
        dialog.close()
      }
      toggle.setAttribute("aria-expanded", "false")
      formParent?.insertBefore(
        form,
        formNextSibling?.parentNode === formParent ? formNextSibling : null
      )
      dialog.remove()
      if (headerSearchForm === form) {
        headerSearchForm = null
        headerSearchToggle = null
        headerSearchCleanup = null
      }
    }
    return true
  } catch {
    return false
  }
}

export const setupHeaderNavigation = () => {
  try {
    if (isCloudflareChallenge()) {
      headerNavigationCleanup?.()
      return false
    }
    if (!ensureStyles()) {
      return false
    }

    applySiteBranding()
    setupHeaderSearch()
    normalizeLucideIcons(document)

    const container = document.querySelector(NAV_CONTAINER_SELECTOR)
    if (!container) {
      return false
    }

    if (container === headerNavigationContainer) {
      refreshHeaderNavigation()
      return true
    }

    headerNavigationCleanup?.()

    const indicator = document.createElement("span")
    indicator.className = NAV_INDICATOR_CLASS
    indicator.setAttribute("aria-hidden", "true")
    container.prepend(indicator)

    const canShowIndicator = () =>
      window.matchMedia("(min-width: 46.01rem)").matches
    const navItems = () =>
      Array.from(container.querySelectorAll(NAV_ITEM_SELECTOR)).filter(
        (item) =>
          item instanceof HTMLElement && item.getClientRects().length > 0
      )
    const matchesCurrentPage = (href) => {
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
    const getActiveItem = () => {
      const directItem = navItems().find(
        (item) =>
          item instanceof HTMLAnchorElement &&
          matchesCurrentPage(item.getAttribute("href"))
      )
      if (directItem) {
        return directItem
      }

      for (const dropdown of container.querySelectorAll(
        "#main-nav .nav-item.dropdown"
      )) {
        const childMatches = Array.from(
          dropdown.querySelectorAll(".dropdown-menu a[href]")
        ).some((link) => matchesCurrentPage(link.getAttribute("href")))
        if (childMatches) {
          return dropdown.querySelector(":scope > .nav-link")
        }
      }

      return null
    }
    const positionIndicator = (target) => {
      if (!target || !container.contains(target) || !canShowIndicator()) {
        indicator.dataset.ready = "false"
        return
      }

      positionSelectionIndicator(indicator, container, target, "nav")
    }
    const positionActiveIndicator = () => {
      for (const item of navItems()) {
        item.classList.remove("userpatch-nav-active")
      }

      const activeItem = getActiveItem()
      if (activeItem) {
        activeItem.classList.add("userpatch-nav-active")
      }
      positionIndicator(activeItem)
    }
    const getEventItem = (target) => {
      if (!(target instanceof Element)) {
        return null
      }

      const item = target.closest(NAV_ITEM_SELECTOR)
      return item instanceof HTMLElement && container.contains(item)
        ? item
        : null
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
        positionIndicator(item)
      }
    }
    const onFocusIn = (event) => {
      let item = getEventItem(event.target)
      if (!item && event.target instanceof Element) {
        item = event.target
          .closest("#main-nav .nav-item.dropdown")
          ?.querySelector(":scope > .nav-link")
      }
      if (item instanceof HTMLElement) {
        positionIndicator(item)
      }
    }
    const onFocusOut = (event) => {
      if (
        !(event.relatedTarget instanceof Node) ||
        !container.contains(event.relatedTarget)
      ) {
        positionActiveIndicator()
      }
    }
    const resizeObserver =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver(positionActiveIndicator)
    container.addEventListener("pointerover", onPointerOver)
    container.addEventListener("pointerleave", positionActiveIndicator)
    container.addEventListener("focusin", onFocusIn)
    container.addEventListener("focusout", onFocusOut)
    if (resizeObserver) {
      resizeObserver.observe(container)
      for (const item of navItems()) {
        resizeObserver.observe(item)
      }
    } else {
      window.addEventListener("resize", positionActiveIndicator)
    }

    headerNavigationContainer = container
    refreshHeaderNavigation = positionActiveIndicator
    headerNavigationCleanup = () => {
      container.removeEventListener("pointerover", onPointerOver)
      container.removeEventListener("pointerleave", positionActiveIndicator)
      container.removeEventListener("focusin", onFocusIn)
      container.removeEventListener("focusout", onFocusOut)
      resizeObserver?.disconnect()
      if (!resizeObserver) {
        window.removeEventListener("resize", positionActiveIndicator)
      }
      for (const item of container.querySelectorAll(".userpatch-nav-active")) {
        item.classList.remove("userpatch-nav-active")
      }
      indicator.remove()
      if (headerNavigationContainer === container) {
        headerNavigationContainer = null
        refreshHeaderNavigation = () => {}
        headerNavigationCleanup = null
      }
    }
    positionActiveIndicator()
    return true
  } catch {
    headerNavigationCleanup?.()
    return false
  }
}
