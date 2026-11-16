import { createLucideIcon } from "./icons.js"

export const copyToClipboard = async (text) => {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text)
      return true
    }
  } catch {}

  const textarea = document.createElement("textarea")
  try {
    textarea.value = text
    textarea.style.position = "fixed"
    textarea.style.opacity = "0"
    document.body?.append(textarea)
    textarea.select()
    return document.execCommand("copy")
  } catch {
    return false
  } finally {
    textarea.remove()
  }
}

export const copyFeedbackTimers = new WeakMap()

export const showCopiedFeedback = (
  button,
  { label, copiedLabel, icon = "copy", text = "", copiedText = "" }
) => {
  const render = (copied) => {
    const currentLabel = copied ? copiedLabel : label
    button.replaceChildren(createLucideIcon(copied ? "check" : icon))
    const currentText = copied ? copiedText : text
    if (currentText) {
      const span = document.createElement("span")
      span.textContent = currentText
      button.append(span)
    }
    button.setAttribute("aria-label", currentLabel)
    button.title = currentLabel
    button.classList.toggle("userpatch-copied", copied)
  }

  window.clearTimeout(copyFeedbackTimers.get(button))
  render(true)
  copyFeedbackTimers.set(
    button,
    window.setTimeout(() => {
      render(false)
      copyFeedbackTimers.delete(button)
    }, 1500)
  )
}
