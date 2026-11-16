import { IMDB_PRIMARY_LOGO_DATA_URI } from "../shared/badges.js"
import { HEADER_WORDMARK_DATA_URI } from "./branding.js"
import { captureDetailInfo } from "./detail-tabs.js"
import { updatePosterBadges } from "./poster-badges.js"

export const removeRelatedMoviesSection = (siteRoot) => {
  for (const heading of siteRoot.querySelectorAll(".section-title")) {
    if (heading.textContent.trim().toLowerCase() !== "you may also like") {
      continue
    }

    const section = heading.closest(".mt-12")
    if (section?.querySelector(".card-grid-small")) {
      section.remove()
    }
  }
}

export const applyDetailPageLayout = (siteRoot) => {
  try {
    const grid = siteRoot.querySelector(".content-grid")
    const sidebar = grid?.querySelector(":scope > .content-sidebar")
    const poster = sidebar?.querySelector(".poster-container")
    const main = grid?.querySelector(":scope > .content-main")
    const title =
      main?.querySelector(".page-title") ||
      sidebar?.querySelector(".userpatch-detail-title")
    if (!grid || !sidebar || !main || !poster || !title) {
      return false
    }

    for (const breadcrumb of siteRoot.querySelectorAll(".breadcrumb")) {
      breadcrumb.remove()
    }

    const titleContainer = title.parentElement
    captureDetailInfo(main, titleContainer)
    const score = titleContainer
      ?.querySelector(".imdb-badge .imdb-score")
      ?.textContent?.trim()
    const legacyPanel = sidebar.querySelector(
      ":scope > .userpatch-poster-panel"
    )
    if (legacyPanel) {
      const oldBrand = legacyPanel.querySelector(
        ":scope > .userpatch-detail-brand"
      )
      if (oldBrand) {
        sidebar.prepend(oldBrand)
      }
      const oldPoster = legacyPanel.querySelector(".poster-container")
      if (oldPoster && oldPoster !== poster) {
        sidebar.append(oldPoster)
      }
      legacyPanel.remove()
    }

    let stack = sidebar.querySelector(":scope > .userpatch-detail-stack")
    if (!stack) {
      stack = document.createElement("div")
      stack.className = "userpatch-detail-stack"
      sidebar.prepend(stack)
    }

    let brand =
      stack.querySelector(":scope > .userpatch-detail-brand") ||
      sidebar.querySelector(":scope > .userpatch-detail-brand")
    if (!brand) {
      brand = document.createElement("a")
      brand.className = "userpatch-detail-brand"
      brand.href = "/"
      brand.dataset.noSwup = ""
      brand.setAttribute("aria-label", "4KHDHub home")

      const image = document.createElement("img")
      image.src = HEADER_WORDMARK_DATA_URI
      image.alt = "4KHDHub"
      image.width = 1100
      image.height = 388
      image.decoding = "async"
      brand.append(image)
    }

    stack.prepend(brand)
    stack.append(poster)
    title.classList.remove("page-title")
    title.classList.add("userpatch-detail-title")
    stack.append(title)

    let scoreLine = stack.querySelector(":scope > .userpatch-imdb-score")
    if (score) {
      if (!scoreLine) {
        scoreLine = document.createElement("div")
        scoreLine.className = "userpatch-imdb-score"
        scoreLine.setAttribute("aria-label", `IMDb rating ${score}`)

        const image = document.createElement("img")
        image.src = IMDB_PRIMARY_LOGO_DATA_URI
        image.alt = "IMDb"
        image.width = 44
        image.height = 17
        image.decoding = "async"

        const rating = document.createElement("span")
        rating.className = "userpatch-imdb-rating"
        scoreLine.append(image, rating)
      }
      scoreLine.querySelector(".userpatch-imdb-rating").textContent = score
    }
    if (scoreLine) {
      title.after(scoreLine)
    }

    if (
      titleContainer &&
      titleContainer !== main &&
      main.contains(titleContainer) &&
      !titleContainer.querySelector(".download-item, #series-tabs")
    ) {
      titleContainer.remove()
    }

    for (const section of main.querySelectorAll(".content-section")) {
      if (
        !section.querySelector(".download-item, #series-tabs") &&
        section.querySelector(
          "#play-btn, #trailer-btn, .detail-description, .metadata-list"
        )
      ) {
        section.remove()
      }
    }

    for (const heading of main.querySelectorAll(".section-title")) {
      if (heading.textContent.trim().toLowerCase() === "download links") {
        heading.remove()
      }
    }

    removeRelatedMoviesSection(siteRoot)
    updatePosterBadges(siteRoot)
    return true
  } catch {
    return false
  }
}
