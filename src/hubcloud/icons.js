import { createLucideIcon as createSharedLucideIcon } from "../shared/icons.js"

export { HUBCLOUD_LOGO_DATA_URI } from "../shared/provider-logos.js"

export const LUCIDE_ICON_SHAPES = Object.freeze({
  "refresh-cw": Object.freeze([
    ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" }],
    ["path", { d: "M21 3v5h-5" }],
    ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" }],
    ["path", { d: "M8 16H3v5" }],
  ]),
  copy: Object.freeze([
    ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2" }],
    ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" }],
  ]),
  check: Object.freeze([["path", { d: "m20 6-11 11-5-5" }]]),
  download: Object.freeze([
    ["path", { d: "M12 15V3" }],
    ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }],
    ["path", { d: "m7 10 5 5 5-5" }],
  ]),
  "file-video": Object.freeze([
    [
      "path",
      {
        d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",
      },
    ],
    ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4" }],
    ["path", { d: "m10 11 5 3-5 3v-6Z" }],
  ]),
  "hard-drive": Object.freeze([
    ["path", { d: "M10 16h.01" }],
    [
      "path",
      {
        d: "M2.212 11.577a2 2 0 0 0-.212.896V18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5.527a2 2 0 0 0-.212-.896L18.55 5.11A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z",
      },
    ],
    ["path", { d: "M21.946 12.013H2.054" }],
    ["path", { d: "M6 16h.01" }],
  ]),
  rss: Object.freeze([
    ["path", { d: "M4 11a9 9 0 0 1 9 9" }],
    ["path", { d: "M4 4a16 16 0 0 1 16 16" }],
    ["circle", { cx: "5", cy: "19", r: "1" }],
  ]),
  info: Object.freeze([
    ["circle", { cx: "12", cy: "12", r: "10" }],
    ["path", { d: "M12 16v-4" }],
    ["path", { d: "M12 8h.01" }],
  ]),
  "loader-2": Object.freeze([["path", { d: "M21 12a9 9 0 1 1-6.219-8.56" }]]),
  smartphone: Object.freeze([
    ["rect", { width: "14", height: "20", x: "5", y: "2", rx: "2", ry: "2" }],
    ["path", { d: "M12 18h.01" }],
  ]),
  sparkles: Object.freeze([
    [
      "path",
      {
        d: "M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",
      },
    ],
    ["path", { d: "M20 2v4" }],
    ["path", { d: "M22 4h-4" }],
    ["circle", { cx: "4", cy: "20", r: "2" }],
  ]),
  "external-link": Object.freeze([
    ["path", { d: "M15 3h6v6" }],
    ["path", { d: "M10 14 21 3" }],
    ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" }],
  ]),
  "arrow-down-to-line": Object.freeze([
    ["path", { d: "M12 17V3" }],
    ["path", { d: "m6 11 6 6 6-6" }],
    ["path", { d: "M19 21H5" }],
  ]),
  x: Object.freeze([
    ["path", { d: "M18 6 6 18" }],
    ["path", { d: "m6 6 12 12" }],
  ]),
  "share-2": Object.freeze([
    ["circle", { cx: "18", cy: "5", r: "3" }],
    ["circle", { cx: "6", cy: "12", r: "3" }],
    ["circle", { cx: "18", cy: "19", r: "3" }],
    ["line", { x1: "8.59", x2: "15.42", y1: "13.51", y2: "17.49" }],
    ["line", { x1: "15.41", x2: "8.59", y1: "6.51", y2: "10.49" }],
  ]),
})

export const createSpinnerIcon = () => {
  const spinner = createLucideIcon("loader-2")
  spinner.classList.add("userpatch-spinner")
  return spinner
}

export let telegramIconTemplate = null

export const createTelegramIcon = () => {
  if (telegramIconTemplate) {
    return telegramIconTemplate.cloneNode(true)
  }

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
  svg.setAttribute("viewBox", "0 0 256 256")
  svg.setAttribute("width", "24")
  svg.setAttribute("height", "24")
  svg.setAttribute("preserveAspectRatio", "xMidYMid")
  svg.setAttribute("aria-hidden", "true")
  svg.setAttribute("focusable", "false")
  svg.setAttribute("class", "preview-icon userpatch-telegram-icon")
  svg.dataset.userpatchLucideIcon = "telegram"

  const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs")
  const linearGradient = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "linearGradient"
  )
  linearGradient.setAttribute("id", "telegram__a")
  linearGradient.setAttribute("x1", "50%")
  linearGradient.setAttribute("x2", "50%")
  linearGradient.setAttribute("y1", "0%")
  linearGradient.setAttribute("y2", "100%")

  const stop1 = document.createElementNS("http://www.w3.org/2000/svg", "stop")
  stop1.setAttribute("offset", "0%")
  stop1.setAttribute("stop-color", "#2AABEE")

  const stop2 = document.createElementNS("http://www.w3.org/2000/svg", "stop")
  stop2.setAttribute("offset", "100%")
  stop2.setAttribute("stop-color", "#229ED9")

  linearGradient.append(stop1, stop2)
  defs.append(linearGradient)

  const circlePath = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path"
  )
  circlePath.setAttribute("fill", "url(#telegram__a)")
  circlePath.setAttribute(
    "d",
    "M128 0C94.06 0 61.48 13.494 37.5 37.49A128.038 128.038 0 0 0 0 128c0 33.934 13.5 66.514 37.5 90.51C61.48 242.506 94.06 256 128 256s66.52-13.494 90.5-37.49c24-23.996 37.5-56.576 37.5-90.51 0-33.934-13.5-66.514-37.5-90.51C194.52 13.494 161.94 0 128 0Z"
  )

  const planePath = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path"
  )
  planePath.setAttribute("fill", "#FFF")
  planePath.setAttribute(
    "d",
    "M57.94 126.648c37.32-16.256 62.2-26.974 74.64-32.152 35.56-14.786 42.94-17.354 47.76-17.441 1.06-.017 3.42.245 4.96 1.49 1.28 1.05 1.64 2.47 1.82 3.467.16.996.38 3.266.2 5.038-1.92 20.24-10.26 69.356-14.5 92.026-1.78 9.592-5.32 12.808-8.74 13.122-7.44.684-13.08-4.912-20.28-9.63-11.26-7.386-17.62-11.982-28.56-19.188-12.64-8.328-4.44-12.906 2.76-20.386 1.88-1.958 34.64-31.748 35.26-34.45.08-.338.16-1.598-.6-2.262-.74-.666-1.84-.438-2.64-.258-1.14.256-19.12 12.152-54 35.686-5.1 3.508-9.72 5.218-13.88 5.128-4.56-.098-13.36-2.584-19.9-4.708-8-2.606-14.38-3.984-13.82-8.41.28-2.304 3.46-4.662 9.52-7.072Z"
  )

  svg.append(defs, circlePath, planePath)
  telegramIconTemplate = svg
  return telegramIconTemplate.cloneNode(true)
}

export const normalizeLucideIcons = (root = document) => {
  for (const icon of root.querySelectorAll(
    "i.fa-file-download, i.fa-download"
  )) {
    icon.replaceWith(createLucideIcon("download"))
  }

  for (const icon of root.querySelectorAll("i.fa-copy, i.fa-clone")) {
    icon.replaceWith(createLucideIcon("copy"))
  }

  for (const icon of root.querySelectorAll("i.fa-video")) {
    icon.replaceWith(createLucideIcon("file-video"))
  }

  for (const icon of root.querySelectorAll("i.fa-android")) {
    icon.replaceWith(createLucideIcon("smartphone"))
  }

  for (const icon of root.querySelectorAll("i.fa-telegram")) {
    icon.replaceWith(createTelegramIcon())
  }
}

export const createLucideIcon = (name) =>
  createSharedLucideIcon(name, LUCIDE_ICON_SHAPES, (svg, iconName) => {
    svg.setAttribute("class", `lucide lucide-${iconName} preview-icon`)
    svg.dataset.userpatchLucideIcon = iconName
  })
