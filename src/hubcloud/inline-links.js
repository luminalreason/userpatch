import {
  fetchHubCloudMirrors,
  renderFetchedMirrors,
  resolvePlayableMirror,
} from "../shared/fetch-mirrors.js"
import { DIRECT_DOWNLOAD_BUTTON_CLASS } from "./config.js"
import { isHubCloudDownloadUrl } from "./detect.js"
import { createLucideIcon, createSpinnerIcon } from "./icons.js"

export const enableInlineLinks = () => {
  if (typeof GM_xmlhttpRequest !== "function") {
    return
  }
  const candidates = document.querySelectorAll(
    `a#download[href], a#button1[href], a.${DIRECT_DOWNLOAD_BUTTON_CLASS}[href]`
  )
  for (const link of candidates) {
    if (
      link.dataset.userpatchInlineLinks ||
      !isHubCloudDownloadUrl(link.href)
    ) {
      continue
    }
    link.dataset.userpatchInlineLinks = "true"
    link.setAttribute("role", "button")
    const results = document.createElement("div")
    results.className = "userpatch-inline-links-results"
    const status = document.createElement("div")
    status.setAttribute("role", "status")
    const output = document.createElement("div")
    results.append(status, output)
    link.after(results)

    let busy = false
    const renderState = () => {
      link.replaceChildren(
        busy ? createSpinnerIcon() : createLucideIcon("sparkles"),
        "Show links"
      )
      if (busy) {
        link.setAttribute("aria-busy", "true")
        link.setAttribute("aria-disabled", "true")
      } else {
        link.removeAttribute("aria-busy")
        link.removeAttribute("aria-disabled")
      }
    }
    renderState()

    link.addEventListener(
      "click",
      async (event) => {
        event.preventDefault()
        event.stopImmediatePropagation()
        if (busy || link.hidden) {
          return
        }
        busy = true
        renderState()
        status.textContent = ""
        try {
          const { mirrors, requiresBrowser } = await fetchHubCloudMirrors(
            link.href
          )
          const resolved = await Promise.all(mirrors.map(resolvePlayableMirror))
          if (!results.isConnected) {
            return
          }
          if (resolved.length && renderFetchedMirrors(output, resolved)) {
            const restoreFocus = document.activeElement === link
            link.hidden = true
            if (restoreFocus) {
              output.querySelector("a[href]")?.focus({ preventScroll: true })
            }
          } else {
            status.textContent = requiresBrowser
              ? "Provider verification is required."
              : "No mirrors found. Try again."
          }
        } finally {
          busy = false
          renderState()
        }
      },
      true
    )
    link.addEventListener("keydown", (event) => {
      if (event.key === " ") {
        event.preventDefault()
        link.click()
      }
    })
  }
}
