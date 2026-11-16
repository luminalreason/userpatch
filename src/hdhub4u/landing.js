import { HEADER_WORDMARK_DATA_URI } from "./branding.js"
import { createLucideIcon } from "./icons.js"

// The destination resolver has no WordPress markup. Its logo, action and
// status target distinguish it from ordinary articles on rotating domains.
export const isLandingPage = () =>
  Boolean(
    document.querySelector("#xwrapper .mwh-logox a.new-tab img") &&
    document.querySelector("#action-button a.new-tab") &&
    document.querySelector("#stx")
  ) || Boolean(document.getElementById("userpatch-landing"))

export const ensureLandingPage = () => {
  document.documentElement.classList.add("userpatch-landing-page")
  if (!document.getElementById("userpatch-landing")) {
    const action = document.querySelector("#action-button a.new-tab")
    const brand = document.querySelector(".mwh-logox a.new-tab")
    const status = document.getElementById("stx")
    if (!action || !brand || !status) {
      return false
    }
    const root = document.createElement("main")
    root.id = "userpatch-landing"
    const image = document.createElement("img")
    image.src = HEADER_WORDMARK_DATA_URI
    image.alt = "HDHub4u"
    image.width = 180
    image.height = 55
    brand.replaceChildren(image)
    brand.classList.add("userpatch-landing-brand")
    for (const control of [brand, action]) {
      control.setAttribute("role", "button")
      control.tabIndex = 0
      control.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault()
          control.click()
        }
      })
    }
    const label = document.createElement("span")
    label.textContent = "View Full Site"
    action.replaceChildren(createLucideIcon("external-link"), label)
    action.classList.add("userpatch-landing-action")
    // Move the original nodes so the site's destination and popup handlers
    // survive, including listeners bound later at DOMContentLoaded.
    const header = document.createElement("header")
    header.append(brand)
    const footer = document.createElement("footer")
    const copyright = document.querySelector(".copyright")
    if (copyright) {
      footer.append(copyright)
    }
    root.append(header, action, status, footer)
    document.body.append(root)
  }
  const footer = document.querySelector("#userpatch-landing footer")
  const copyright = document.querySelector("#xwrapper .copyright")
  if (footer && copyright) {
    footer.append(copyright)
  }
  watchRefreshNotice()
  return true
}

let refreshObserver = null
let lifecycleBound = false

const normalizeRefreshNotice = () => {
  for (const notice of document.querySelectorAll("body > div")) {
    if (
      notice.textContent.trim() === "New version available! Click to refresh" &&
      typeof notice.onclick === "function"
    ) {
      notice.classList.add("userpatch-landing-refresh")
      notice.setAttribute("role", "button")
      notice.tabIndex = 0
      if (!notice.dataset.userpatchKeyboard) {
        notice.dataset.userpatchKeyboard = "true"
        notice.addEventListener("keydown", (event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault()
            notice.click()
          }
        })
      }
    }
  }
}

const watchRefreshNotice = () => {
  normalizeRefreshNotice()
  if (refreshObserver) {
    return
  }
  // Service-worker updates can arrive well after the initial discovery window.
  refreshObserver = new MutationObserver(normalizeRefreshNotice)
  refreshObserver.observe(document.body, { childList: true })
  if (!lifecycleBound) {
    lifecycleBound = true
    window.addEventListener("pagehide", () => {
      refreshObserver?.disconnect()
      refreshObserver = null
    })
    window.addEventListener("pageshow", (event) => {
      if (event.persisted) {
        watchRefreshNotice()
      }
    })
  }
}

export const LANDING_CSS = `
html.userpatch-landing-page body {
  display: block !important;
  min-block-size: 100dvh !important;
  margin: 0 !important;
  background: var(--maia-background) !important;
}
html.userpatch-landing-page #xwrapper { display: none !important; }
html.userpatch-landing-page #userpatch-landing {
  display: flex;
  flex-direction: column;
  inline-size: 100%;
  max-inline-size: 42rem;
  min-block-size: 100dvh;
  box-sizing: border-box;
  margin-inline: auto;
  padding: 1.25rem 1.5rem;
  gap: 1rem;
  font-family: "Inter Variable", ui-sans-serif, system-ui, sans-serif !important;
}
html.userpatch-landing-page #userpatch-landing > header {
  min-block-size: 46px;
}
html.userpatch-landing-page .userpatch-landing-brand {
  display: flex;
  justify-content: center;
  margin: 0;
}
html.userpatch-landing-page .userpatch-landing-brand img {
  display: block;
  inline-size: 180px;
  block-size: 38px;
  object-fit: contain;
}
html.userpatch-landing-page #userpatch-landing .userpatch-landing-action {
  display: flex !important;
  align-items: center;
  justify-content: center;
  gap: 0.65rem;
  min-block-size: 56px;
  padding: 0.75rem 1rem !important;
  border: 1px solid rgb(255 255 255 / 14%) !important;
  border-radius: 0.625rem !important;
  background: #0051c3 !important;
  color: #fff !important;
  box-shadow: inset 0 1px 0 rgb(255 255 255 / 22%), 0 1px 2px rgb(0 0 0 / 24%) !important;
  font: 400 18px/1.45 "Inter Variable", ui-sans-serif, system-ui, sans-serif !important;
  text-decoration: none !important;
  transform: none !important;
  cursor: pointer;
}
html.userpatch-landing-page #userpatch-landing .userpatch-landing-action > span {
  font: inherit !important;
}
html.userpatch-landing-page .userpatch-landing-action svg {
  inline-size: 20px; block-size: 20px; flex: none;
}
html.userpatch-landing-page #userpatch-landing footer {
  margin-block-start: auto !important;
  padding-block-start: 1rem;
  text-align: center !important;
}
html.userpatch-landing-page #userpatch-landing .copyright {
  margin: 0 !important;
  text-align: center !important;
  color: var(--maia-muted-foreground) !important;
}
html.userpatch-landing-page #stx { display: none !important; }
html.userpatch-landing-page #stx { text-align: center; }
html.userpatch-landing-page #stx h5 { margin: 0 !important; }
html.userpatch-landing-page .userpatch-landing-refresh {
  position: static !important;
  max-inline-size: 39rem;
  box-sizing: border-box;
  margin: 1rem auto !important;
  padding: 0.75rem 1rem !important;
  border: 1px solid var(--maia-border);
  border-radius: 0.625rem;
  background: var(--maia-secondary) !important;
  color: var(--maia-foreground) !important;
  text-align: center;
}
html.userpatch-landing-page :is(.userpatch-landing-action, .userpatch-landing-refresh):focus-visible {
  outline: 2px solid currentColor !important;
  outline-offset: 3px;
}
@media (hover: hover) and (pointer: fine) {
  html.userpatch-landing-page .userpatch-landing-action:hover {
    filter: brightness(1.06);
  }
}
`
