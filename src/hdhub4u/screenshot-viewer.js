let viewer = null

export const resetScreenshotViewer = () => {
  if (viewer?.open) {
    viewer.close()
  }
  viewer?.remove()
  viewer = null
}

export const openScreenshotViewer = (source, alt, fallback) => {
  if (!viewer) {
    viewer = document.createElement("dialog")
    viewer.className = "userpatch-screenshot-viewer"
    viewer.setAttribute("aria-label", "Screenshot viewer")
    // The expanded image is itself the close control: no toolbar covers it.
    const close = document.createElement("button")
    close.type = "button"
    close.autofocus = true
    close.setAttribute("aria-label", "Close fullscreen screenshot")
    const image = document.createElement("img")
    image.decoding = "async"
    image.addEventListener("error", () => {
      const fallbackUrl = image.dataset.fallback
      if (fallbackUrl && image.src !== fallbackUrl) {
        image.src = fallbackUrl
      }
    })
    close.append(image)
    close.addEventListener("click", () => viewer.close())
    viewer.append(close)
    document.body.append(viewer)
  }
  const image = viewer.querySelector("img")
  image.alt = alt || "Screenshot"
  image.dataset.fallback = fallback || ""
  image.src = source
  viewer.showModal()
}

export const SCREENSHOT_VIEWER_CSS = `
html.userpatch-maia dialog.userpatch-screenshot-viewer {
  position: fixed; inset: 0; inline-size: 100%; block-size: 100dvh;
  max-inline-size: none; max-block-size: none; margin: 0; padding: 0;
  border: 0; background: #0a0a0a; color: #fafafa;
}
html.userpatch-maia dialog.userpatch-screenshot-viewer:modal { overscroll-behavior: contain; }
html.userpatch-maia dialog.userpatch-screenshot-viewer::backdrop {
  background: #0a0a0a; overflow: hidden; overscroll-behavior: contain;
}
html.userpatch-maia dialog.userpatch-screenshot-viewer button {
  display: grid; place-items: center; inline-size: 100%; block-size: 100%;
  max-inline-size: none; margin: 0; padding: 0; border: 0; border-radius: 0;
  background: transparent; cursor: zoom-out;
}
html.userpatch-maia dialog.userpatch-screenshot-viewer button:focus-visible {
  outline: 2px solid #fafafa; outline-offset: -4px;
}
html.userpatch-maia dialog.userpatch-screenshot-viewer img {
  display: block; inline-size: 100%; block-size: 100%;
  max-inline-size: 100% !important; max-block-size: 100dvh !important;
  margin: 0; object-fit: contain;
}
html.userpatch-maia .userpatch-screenshot { cursor: zoom-in; }
`
