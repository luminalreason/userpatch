import { CONFIG } from "./config.js"

export const filenameResizeHandlers = new Map()
export const pendingFilenameMeasurements = new Map()

export let releaseFilenameCleanups = []
export let filenameIntersectionObserver = null
export let filenameResizeObserver = null
export let filenameMeasurementFrame = 0
export let filenameFallbackResizeBound = false
export const scheduleFilenameMeasurement = (element, update) => {
  pendingFilenameMeasurements.set(element, update)
  if (filenameMeasurementFrame) {
    return
  }

  const flush = () => {
    filenameMeasurementFrame = 0
    let processed = 0
    for (const [target, callback] of pendingFilenameMeasurements) {
      pendingFilenameMeasurements.delete(target)
      if (target.isConnected) {
        callback()
      }
      processed += 1
      if (processed >= CONFIG.filenameMeasureBatchSize) {
        break
      }
    }
    if (pendingFilenameMeasurements.size) {
      filenameMeasurementFrame = window.requestAnimationFrame(flush)
    }
  }

  filenameMeasurementFrame = window.requestAnimationFrame(flush)
}

export const ensureFilenameResizeObserver = () => {
  if (filenameResizeObserver || typeof ResizeObserver === "undefined") {
    return
  }

  filenameResizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      const update = filenameResizeHandlers.get(entry.target)
      if (update) {
        scheduleFilenameMeasurement(entry.target, update)
      }
    }
  })
}

export const onFilenameWindowResize = () => {
  for (const [element, update] of filenameResizeHandlers) {
    scheduleFilenameMeasurement(element, update)
  }
}

export const observeFilenameSize = (element) => {
  const update = filenameResizeHandlers.get(element)
  if (!update) {
    return
  }
  if (filenameResizeObserver) {
    filenameResizeObserver.observe(element)
  } else if (!filenameFallbackResizeBound) {
    window.addEventListener("resize", onFilenameWindowResize)
    filenameFallbackResizeBound = true
  }
  scheduleFilenameMeasurement(element, update)
}

export const observeFilenameResize = (element, update) => {
  filenameResizeHandlers.set(element, update)
  ensureFilenameResizeObserver()

  if (typeof IntersectionObserver === "undefined") {
    observeFilenameSize(element)
  } else {
    filenameIntersectionObserver ||= new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) {
            continue
          }
          filenameIntersectionObserver.unobserve(entry.target)
          observeFilenameSize(entry.target)
        }
      },
      { rootMargin: CONFIG.filenameMeasureRootMargin }
    )
    filenameIntersectionObserver.observe(element)
  }

  return () => {
    filenameIntersectionObserver?.unobserve(element)
    filenameResizeObserver?.unobserve(element)
    filenameResizeHandlers.delete(element)
    pendingFilenameMeasurements.delete(element)
    if (!filenameResizeHandlers.size) {
      filenameIntersectionObserver?.disconnect()
      filenameIntersectionObserver = null
      filenameResizeObserver?.disconnect()
      filenameResizeObserver = null
      window.cancelAnimationFrame(filenameMeasurementFrame)
      filenameMeasurementFrame = 0
      window.removeEventListener("resize", onFilenameWindowResize)
      filenameFallbackResizeBound = false
    }
  }
}

export const setupExpandableFilename = (container, value) => {
  const text = document.createElement("span")
  text.className = "userpatch-release-file-text"
  text.textContent = value

  const toggle = document.createElement("button")
  toggle.type = "button"
  toggle.className = "userpatch-filename-toggle"
  toggle.setAttribute("aria-expanded", "false")
  toggle.textContent = "See more"
  toggle.hidden = true

  let isExpanded = false
  let measuredWidth = 0
  let measuredLineHeight = 0
  let measuredClampLines = 0
  const mobileClampBreakpoint = window.matchMedia(
    `(max-width: ${CONFIG.mobileLayoutBreakpointRem}rem)`
  )
  const filenameFontSizeBreakpoint = window.matchMedia("(min-width: 761px)")

  const updateOverflowState = () => {
    if (isExpanded || !container.isConnected || !text.getClientRects().length) {
      return
    }

    const style = getComputedStyle(container)
    const width = container.getBoundingClientRect().width
    const fontSize = Number.parseFloat(style.fontSize) || 14
    const lineHeight =
      Number.parseFloat(style.lineHeight) ||
      fontSize * CONFIG.filenameLineHeight
    const clampLines = mobileClampBreakpoint.matches
      ? CONFIG.mobileFilenameClampLines
      : CONFIG.filenameClampLines
    if (
      width <= 0 ||
      (Math.abs(width - measuredWidth) < 0.5 &&
        Math.abs(lineHeight - measuredLineHeight) < 0.5 &&
        clampLines === measuredClampLines)
    ) {
      return
    }
    measuredWidth = width
    measuredLineHeight = lineHeight
    measuredClampLines = clampLines

    toggle.hidden = true
    delete container.dataset.clamped
    text.textContent = value
    const maxHeight = lineHeight * clampLines
    container.style.setProperty(
      "--userpatch-filename-max-block-size",
      `${maxHeight}px`
    )

    if (container.scrollHeight <= maxHeight + 0.5) {
      return
    }

    container.dataset.clamped = "true"
    toggle.hidden = false
    toggle.textContent = "See more"

    const characters = Array.from(value)
    const clampBottom = container.getBoundingClientRect().top + maxHeight
    const toggleFits = () => {
      const toggleRect = toggle.getBoundingClientRect()
      return (
        toggle.getClientRects().length > 0 &&
        toggleRect.bottom <= clampBottom + 0.5
      )
    }
    let low = 0
    let high = characters.length
    while (low < high) {
      const middle = Math.ceil((low + high) / 2)
      text.textContent = `${characters.slice(0, middle).join("")}…`
      if (toggleFits()) {
        low = middle
      } else {
        high = middle - 1
      }
    }
    text.textContent = `${characters.slice(0, low).join("")}…`
    if (!toggleFits() && low > 0) {
      let fittingLength = 0
      let fittingLimit = low - 1
      while (fittingLength < fittingLimit) {
        const middle = Math.ceil((fittingLength + fittingLimit) / 2)
        text.textContent = `${characters.slice(0, middle).join("")}…`
        if (toggleFits()) {
          fittingLength = middle
        } else {
          fittingLimit = middle - 1
        }
      }
      low = fittingLength
      text.textContent = `${characters.slice(0, low).join("")}…`
    }
  }

  const onToggle = (event) => {
    event.stopPropagation()
    isExpanded = !isExpanded
    container.toggleAttribute("data-expanded", isExpanded)
    toggle.textContent = isExpanded ? "See less" : "See more"
    toggle.setAttribute("aria-expanded", String(isExpanded))
    if (isExpanded) {
      delete container.dataset.clamped
      text.textContent = value
    } else {
      measuredWidth = 0
      updateOverflowState()
    }
  }

  const onClampBreakpointChange = () => {
    measuredWidth = 0
    measuredLineHeight = 0
    measuredClampLines = 0
    updateOverflowState()
  }

  toggle.addEventListener("click", onToggle)
  mobileClampBreakpoint.addEventListener("change", onClampBreakpointChange)
  filenameFontSizeBreakpoint.addEventListener("change", onClampBreakpointChange)
  container.replaceChildren(text, toggle)
  const cleanupResize = observeFilenameResize(container, updateOverflowState)
  document.fonts?.ready.then(() => {
    if (container.isConnected && !isExpanded) {
      measuredWidth = 0
      updateOverflowState()
    }
  })

  return () => {
    cleanupResize()
    mobileClampBreakpoint.removeEventListener("change", onClampBreakpointChange)
    filenameFontSizeBreakpoint.removeEventListener(
      "change",
      onClampBreakpointChange
    )
    toggle.removeEventListener("click", onToggle)
  }
}

export const clearReleaseFilenameMeasurements = () => {
  for (const cleanup of releaseFilenameCleanups) {
    cleanup()
  }
  releaseFilenameCleanups = []
}

export const pruneReleaseFilenameCleanups = (filenameCleanups) => {
  releaseFilenameCleanups = releaseFilenameCleanups.filter(
    (cleanup) => !filenameCleanups.includes(cleanup)
  )
}
