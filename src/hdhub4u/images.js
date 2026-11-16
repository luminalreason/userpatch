export { setupProgressiveImage } from "../shared/progressive-images.js"

const recoveredPosters = new WeakSet()

// Older listing thumbnails retain myimg.bid, while the matching post images
// now use myimg.click with the same path. Retry only this confirmed migration.
export const setupPosterRecovery = (image) => {
  if (recoveredPosters.has(image)) {
    return
  }
  recoveredPosters.add(image)
  let retried = false
  const parent = image.parentElement
  const showFallback = () => {
    if (!parent || parent.querySelector(".userpatch-poster-fallback")) {
      return
    }
    const fallback = document.createElement("span")
    fallback.className = "userpatch-poster-fallback"
    fallback.textContent = "Poster unavailable"
    parent.classList.add("userpatch-poster-missing")
    parent.append(fallback)
  }
  const failed = () => {
    if (!retried) {
      retried = true
      try {
        const url = new URL(image.currentSrc || image.src)
        if (
          url.hostname === "myimg.bid" &&
          url.pathname.startsWith("/images/")
        ) {
          url.hostname = "myimg.click"
          image.removeAttribute("srcset")
          image.src = url.href
          return
        }
      } catch {}
    }
    showFallback()
  }
  image.addEventListener("error", failed)
  image.addEventListener("load", () => {
    parent?.classList.remove("userpatch-poster-missing")
    parent?.querySelector(".userpatch-poster-fallback")?.remove()
  })
  if (image.complete && !image.naturalWidth) {
    failed()
  }
}

export const POSTER_RECOVERY_CSS = `
html.userpatch-maia li.thumb .userpatch-poster-missing {
  position: relative;
}
html.userpatch-maia li.thumb .userpatch-poster-missing > img {
  visibility: hidden !important;
}
html.userpatch-maia li.thumb .userpatch-poster-fallback {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  padding: 1rem;
  text-align: center;
  background: var(--maia-card);
  color: var(--maia-muted-foreground);
  font: 400 0.875rem/1.45 "Inter Variable", ui-sans-serif, system-ui, sans-serif;
}
`
