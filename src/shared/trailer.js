// Only explicit trailer controls and YouTube/Vimeo embeds qualify; never
// mistake the site's full-movie player for a trailer.
export const findTrailerUrl = (root) => {
  const candidate = root.querySelector("[data-trailer-url]")?.dataset.trailerUrl
  const links = Array.from(root.querySelectorAll("a[href]"))
    .filter((link) => /trailer/i.test(link.textContent))
    .map((link) => link.href)
  const frames = Array.from(root.querySelectorAll("iframe[src]")).map((frame) =>
    frame.getAttribute("src")
  )
  for (const source of [candidate, ...links, ...frames]) {
    try {
      const url = new URL(source, location.href)
      let id = ""
      if (/^(www\.)?(youtube\.com|youtube-nocookie\.com)$/.test(url.hostname)) {
        id =
          url.searchParams.get("v") ||
          url.pathname.match(/^\/(?:embed|shorts)\/([^/]+)/)?.[1] ||
          ""
      } else if (url.hostname === "youtu.be") {
        id = url.pathname.slice(1)
      }
      if (/^[\w-]{11}$/.test(id)) {
        return `https://www.youtube-nocookie.com/embed/${id}`
      }
      if (/^(?:player\.)?vimeo\.com$/.test(url.hostname)) {
        const video = url.pathname.match(/^\/(?:video\/)?(\d+)\/?$/)?.[1]
        if (video) {
          return `https://player.vimeo.com/video/${video}`
        }
      }
    } catch {}
  }
  return null
}

export const createTrailer = (url) => {
  if (!url) {
    return null
  }
  const section = document.createElement("div")
  section.className = "userpatch-trailer"
  const frame = document.createElement("div")
  frame.className = "userpatch-trailer-frame"
  const player = document.createElement("iframe")
  player.src = url
  player.title = "Trailer"
  player.loading = "lazy"
  player.allow = "encrypted-media; fullscreen; picture-in-picture"
  player.allowFullscreen = true
  player.referrerPolicy = "strict-origin-when-cross-origin"
  frame.append(player)
  section.append(frame)
  return section
}

export const TRAILER_CSS = `
html.userpatch-maia .userpatch-detail-info .userpatch-trailer {
  display: block;
  margin: 1.5rem 0 0 !important;
  padding: 0 !important;
  border: 0 !important;
  border-radius: 0 !important;
  background: transparent !important;
  box-shadow: none !important;
}
html.userpatch-maia .userpatch-trailer-frame {
  aspect-ratio: 16 / 9;
  inline-size: 100%;
  overflow: clip;
  border: 0 !important;
  box-shadow: none !important;
  border-radius: 1rem;
  background: var(--maia-card);
}
html.userpatch-maia .userpatch-trailer-frame > iframe {
  display: block !important;
  position: static !important;
  inline-size: 100% !important;
  block-size: 100% !important;
  margin: 0 !important;
  padding: 0 !important;
  border: 0 !important;
}
`
