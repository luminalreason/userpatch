const preparedImages = new WeakSet()
const pendingImages = new Map()
let imageObserver = null

// TMDB publishes this size ladder. Other hosts keep the thumbnail supplied by
// the page; guessing arbitrary filename variants would create broken posters.
export const getSmallImageUrl = (source) => {
  try {
    const url = new URL(source, location.href)
    if (
      url.hostname === "image.tmdb.org" &&
      /^\/t\/p\/(w\d+|original)\//.test(url.pathname)
    ) {
      url.pathname = url.pathname.replace(/^\/t\/p\/[^/]+\//, "/t/p/w92/")
      return url.href
    }
  } catch {}
  return source
}

export const setupProgressiveImage = (img, highResUrl) => {
  if (!(img instanceof HTMLImageElement) || preparedImages.has(img)) {
    return
  }
  preparedImages.add(img)
  img.classList.add("userpatch-progressive-image")
  img.draggable = false
  img.decoding = "async"
  const original = img.src
  const full = highResUrl || original
  const finish = () => img.classList.add("userpatch-image-loaded")
  // Cached full images should never briefly drop back to a blurry thumbnail.
  if (img.complete && img.naturalWidth && full === original) {
    finish()
    return
  }
  const start = () => {
    const small =
      highResUrl || img.srcset ? original : getSmallImageUrl(original)
    let upgrading = false
    const upgrade = () => {
      if (upgrading) {
        return
      }
      upgrading = true
      img.removeEventListener("load", upgrade)
      img.removeEventListener("error", upgrade)
      const high = new Image()
      high.decoding = "async"
      high.fetchPriority = img.fetchPriority
      high.addEventListener(
        "load",
        async () => {
          try {
            await high.decode()
          } catch {}
          if (img.isConnected) {
            img.src = full
            finish()
          }
        },
        { once: true }
      )
      high.addEventListener("error", finish, { once: true })
      high.src = full
    }
    if (small !== full) {
      // Wait for the thumbnail before requesting the full image. If it fails,
      // still try the original rather than leaving a broken placeholder.
      img.addEventListener("load", upgrade, { once: true })
      img.addEventListener("error", upgrade, { once: true })
      img.src = small
      if (img.complete && img.naturalWidth) {
        img.removeEventListener("load", upgrade)
        img.removeEventListener("error", upgrade)
        upgrade()
      }
    } else if (img.complete && img.naturalWidth) {
      finish()
    } else {
      img.addEventListener("load", finish, { once: true })
      img.addEventListener("error", finish, { once: true })
    }
  }
  if (img.loading === "lazy" && "IntersectionObserver" in window) {
    imageObserver ||= new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            imageObserver.unobserve(entry.target)
            pendingImages.get(entry.target)?.()
            pendingImages.delete(entry.target)
          }
        }
      },
      { rootMargin: "200px" }
    )
    pendingImages.set(img, start)
    imageObserver.observe(img)
  } else {
    start()
  }
}

export const PROGRESSIVE_IMAGE_CSS = `
html.userpatch-maia img.userpatch-progressive-image {
  filter: blur(10px) !important;
  opacity: 0.85;
  transition: filter 280ms ease, opacity 280ms ease !important;
}
html.userpatch-maia img.userpatch-progressive-image.userpatch-image-loaded {
  filter: none !important;
  opacity: 1 !important;
}
@media (prefers-reduced-motion: reduce) {
  html.userpatch-maia img.userpatch-progressive-image { transition: none !important; }
}
`

window.addEventListener("pagehide", () => imageObserver?.disconnect())
window.addEventListener("pageshow", (event) => {
  if (event.persisted) {
    for (const image of pendingImages.keys()) {
      if (image.isConnected) {
        imageObserver?.observe(image)
      } else {
        pendingImages.delete(image)
      }
    }
  }
})
