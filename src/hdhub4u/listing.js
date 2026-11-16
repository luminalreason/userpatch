import { KEEP_CLASS, LISTING_READY_CLASS } from "./config.js"
import { createLucideIcon } from "./icons.js"
import { setupPosterRecovery, setupProgressiveImage } from "./images.js"

export const normalizePagination = (root = document) => {
  for (const list of root.querySelectorAll("ul.pagination")) {
    const wrapper = list.closest(".pagination-wrapper")
    if (wrapper) {
      wrapper.setAttribute("role", "navigation")
      wrapper.setAttribute("aria-label", "Pagination")
    }
    const pages = Array.from(list.querySelectorAll(".page-numbers")).filter(
      (element) => /^\d+$/.test(element.textContent.trim())
    )
    const first = pages[0]
    const last = pages.at(-1)
    for (const page of pages) {
      const current = page.classList.contains("current")
      page
        .closest("li")
        ?.classList.toggle(
          "userpatch-pagination-neighbor",
          page !== first && page !== last && !current
        )
      page.setAttribute("aria-label", `Page ${page.textContent.trim()}`)
      if (current) {
        page.setAttribute("aria-current", "page")
      }
    }
  }

  for (const arrow of root.querySelectorAll(
    "a.page-numbers.next, a.next, .pagination-next a, a[rel='next']"
  )) {
    if (!arrow.dataset.userpatchNormalized) {
      arrow.dataset.userpatchNormalized = "true"
      arrow.textContent = ""
      arrow.setAttribute("aria-label", "Next page")
      arrow.append(createLucideIcon("arrow-right"))
    }
  }
  for (const arrow of root.querySelectorAll(
    "a.page-numbers.prev, a.prev, .pagination-prev a, a[rel='prev']"
  )) {
    if (!arrow.dataset.userpatchNormalized) {
      arrow.dataset.userpatchNormalized = "true"
      arrow.textContent = ""
      arrow.setAttribute("aria-label", "Previous page")
      arrow.append(createLucideIcon("arrow-left"))
    }
  }
}

export const ensureListingPage = () => {
  const main = document.querySelector("main#main-content.content-wrapper")
  if (!main) {
    return false
  }
  normalizePagination(main)
  if (main.classList.contains(LISTING_READY_CLASS)) {
    return true
  }
  const grid = main.querySelector("ul.recent-movies")
  if (!grid) {
    return false
  }

  for (const child of main.children) {
    if (child.matches("section.home-wrapper, .pagination-wrapper")) {
      child.classList.add(KEEP_CLASS)
    }
  }
  if (!main.querySelector(`.userpatch-keep ul.recent-movies`)) {
    for (const child of main.children) {
      child.classList.remove(KEEP_CLASS)
    }
    return false
  }

  for (const heading of main.querySelectorAll(
    "h2, .category-name, .page-title, .widget-title, .left-wrapper > h2, .home-wrapper > h2, .latest-releases-header"
  )) {
    heading.remove()
  }

  normalizePagination(main)

  for (const link of main.querySelectorAll("li.thumb figure > a, li.thumb a")) {
    link.setAttribute("draggable", "false")
  }

  let imageIndex = 0
  for (const img of main.querySelectorAll(
    "li.thumb figure > a > img, li.thumb img"
  )) {
    img.setAttribute("draggable", "false")
    if (imageIndex === 0) {
      img.fetchPriority = "high"
      img.loading = "eager"
    } else if (!img.hasAttribute("loading")) {
      img.loading = "lazy"
    }
    imageIndex += 1
    setupPosterRecovery(img)
    setupProgressiveImage(img)
  }
  /* The caption repeats the poster's link; drop it from the tab order so
     keyboard users get one stop per card (the poster), like 4K-HDHub. */
  for (const captionLink of main.querySelectorAll("li.thumb figcaption a")) {
    captionLink.tabIndex = -1
  }

  main.classList.add(LISTING_READY_CLASS)
  return true
}
