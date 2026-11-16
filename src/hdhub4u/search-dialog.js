import { CONFIG } from "./config.js"
import { createLucideIcon } from "./icons.js"

export let searchDialog = null

export const openSearchDialog = () => {
  if (
    typeof HTMLDialogElement === "undefined" ||
    !(searchDialog instanceof HTMLDialogElement) ||
    typeof searchDialog.showModal !== "function" ||
    !searchDialog.isConnected
  ) {
    return false
  }
  if (!searchDialog.open) {
    searchDialog.showModal()
  }
  return true
}

export const ensureSearchDialog = () => {
  if (!document.body || searchDialog?.isConnected) {
    return false
  }
  if (typeof HTMLDialogElement === "undefined") {
    return false
  }

  const dialog = document.createElement("dialog")
  dialog.id = "userpatch-search-dialog"
  dialog.className = "userpatch-search-dialog"
  dialog.setAttribute("aria-label", "Search movies and TV shows")
  dialog.setAttribute("closedby", "any")

  const form = document.createElement("form")
  form.className = "search-form"
  form.setAttribute("role", "search")
  form.method = "get"
  form.action = CONFIG.searchPagePath

  const inputGroup = document.createElement("div")
  inputGroup.className = "search-input-container"
  inputGroup.setAttribute("role", "group")

  const addon = document.createElement("span")
  addon.className = "userpatch-input-group-addon"
  addon.setAttribute("aria-hidden", "true")
  const icon = document.createElement("span")
  icon.className = "search-icon-overlay"
  icon.append(createLucideIcon("search"))
  addon.append(icon)

  const input = document.createElement("input")
  input.className = "search-input-overlay"
  input.type = "search"
  input.name = "q"
  input.placeholder = "Search movies and TV shows"
  input.setAttribute("aria-label", "Search movies and TV shows")
  input.setAttribute("autocomplete", "off")
  input.setAttribute("autocapitalize", "none")
  input.setAttribute("autocorrect", "off")
  input.setAttribute("spellcheck", "false")
  input.setAttribute("enterkeyhint", "search")
  input.maxLength = 200

  const submit = document.createElement("button")
  submit.type = "submit"
  submit.className = "search-submit"
  submit.hidden = true
  submit.setAttribute("aria-hidden", "true")

  inputGroup.append(addon, input, submit)
  form.append(inputGroup)
  dialog.append(form)
  document.body.append(dialog)
  searchDialog = dialog

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
  if (!("closedBy" in HTMLDialogElement.prototype)) {
    dialog.addEventListener("pointerdown", onPointerDown)
    dialog.addEventListener("pointerup", onPointerUp)
  }
  return true
}

export const resetSearchDialog = () => {
  searchDialog = null
}
