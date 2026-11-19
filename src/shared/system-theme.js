import { storageGet } from "./storage.js"

export const themeSettingKey = "userpatch-theme-setting"

export const getThemeSetting = () => {
  const saved = storageGet(themeSettingKey)
  return saved === "light" || saved === "dark" ? saved : "system"
}

const resolveTheme = () => {
  const saved = getThemeSetting()
  if (saved !== "system") {
    return saved
  }
  return preference.matches ? "dark" : "light"
}

let preference = null

const updateSystemTheme = () => {
  const root = document.documentElement
  if (!root || !Object.hasOwn(root.dataset, "userpatchTheme")) {
    return
  }
  const theme = resolveTheme()
  if (root.dataset.userpatchTheme !== theme) {
    root.dataset.userpatchTheme = theme
  }
  if (Object.hasOwn(root.dataset, "detailTheme")) {
    root.classList.toggle("dark", theme === "dark")
    root.classList.toggle("light", theme === "light")
    root.dataset.detailTheme = theme
  }
  for (const meta of document.querySelectorAll(
    'meta[id^="userpatch-"][name="theme-color"]'
  )) {
    meta.content = theme === "dark" ? "#0a0a0a" : "#ffffff"
  }
}

export const ensureSystemTheme = () => {
  if (!preference) {
    preference = window.matchMedia("(prefers-color-scheme: dark)")
    preference.addEventListener("change", updateSystemTheme)
    window.addEventListener("pagehide", () => {
      preference.removeEventListener("change", updateSystemTheme)
    })
    window.addEventListener("pageshow", (event) => {
      if (event.persisted) {
        preference.addEventListener("change", updateSystemTheme)
        updateSystemTheme()
      }
    })
  }
  const theme = resolveTheme()
  document.documentElement.dataset.userpatchTheme = theme
  updateSystemTheme()
  return theme
}

// The light palette matches Lynvo's neutral tokens. 4K-HDHub's source CSS
// consumes HSL channel tokens; generated download pages consume full colors.
export const systemThemeCss = (legacyHsl = false) => {
  const light = {
    background: "1 0 0",
    foreground: "0.145 0 0",
    card: "1 0 0",
    "card-foreground": "0.145 0 0",
    popover: "1 0 0",
    "popover-foreground": "0.145 0 0",
    primary: "0.205 0 0",
    "primary-foreground": "0.985 0 0",
    secondary: "0.97 0 0",
    "secondary-foreground": "0.205 0 0",
    muted: "0.97 0 0",
    "muted-foreground": "0.556 0 0",
    accent: "0.97 0 0",
    "accent-foreground": "0.205 0 0",
    destructive: "0.577 0.245 27.325",
    border: "0.922 0 0",
    input: "0.922 0 0",
    ring: "0.708 0 0",
  }
  const hsl = {
    background: "0 0% 100%",
    foreground: "0 0% 3.94%",
    card: "0 0% 100%",
    "card-foreground": "0 0% 3.94%",
    popover: "0 0% 100%",
    "popover-foreground": "0 0% 3.94%",
    primary: "0 0% 9%",
    "primary-foreground": "0 0% 98%",
    secondary: "0 0% 96%",
    "secondary-foreground": "0 0% 9%",
    muted: "0 0% 96%",
    "muted-foreground": "0 0% 45%",
    accent: "0 0% 96%",
    "accent-foreground": "0 0% 9%",
    destructive: "0 72% 51%",
    border: "0 0% 90%",
    input: "0 0% 90%",
    ring: "0 0% 64%",
  }
  const tokens = Object.entries(light)
    .map(
      ([name, value]) =>
        `--maia-${name}: oklch(${value}) !important; --${name}: ${legacyHsl ? hsl[name] : `oklch(${value})`} !important;`
    )
    .join("\n")
  return `
    html.userpatch-maia, html[data-userpatch-theme] {
      color-scheme: light dark !important;
      --maia-poster-border: rgb(255 255 255 / 15%);
      --maia-card-depth-shadow: inset 0 1px 2px rgb(255 255 255 / 0.09),
        0 2px 4px rgb(0 0 0 / 0.5), 0 4px 8px rgb(0 0 0 / 0.3);
      --maia-poster-gloss: inset 0 1px 2px rgb(255 255 255 / 0.12);
    }
    html[data-userpatch-theme="dark"] { color-scheme: dark !important; }
    html[data-userpatch-theme="light"] {
        color-scheme: light !important;
        ${tokens}
        --maia-control-surface: oklch(0.98 0 0 / 90%);
        --maia-control-border-opacity: 0.14;
        --maia-ongoing-orange: #c65a00;
        --maia-ongoing-gold: #d97706;
        --maia-ongoing-deep-orange: #b45309;
        --maia-ongoing-glow-opacity: 0.32;
        --maia-ongoing-glow-blur: 12px;
        --maia-ongoing-shadow: 0 0 12px rgb(198 90 0 / 0.28),
          0 0 24px rgb(180 83 9 / 0.18);
        --maia-hdhub-running-border: linear-gradient(135deg in oklch,
          #c2410c, #d63d32 52%, #b91c1c);
        --maia-hdhub-running-shadow: 0 0 12px rgb(194 65 12 / 0.28),
          0 0 24px rgb(185 28 28 / 0.18);
        --maia-selection-bg: linear-gradient(180deg in oklch,
          oklch(0.90 0 0), oklch(0.84 0 0));
        --maia-select-hover-bg: linear-gradient(180deg in oklch,
          oklch(0.87 0 0), oklch(0.81 0 0));
        --maia-selection-shadow: inset 0 1px 0 rgb(255 255 255 / 0.9),
          inset 0 0 0 1px rgb(0 0 0 / 0.12), 0 1px 2px rgb(0 0 0 / 0.06);
        --maia-glass-shadow: 0 1px 2px rgb(0 0 0 / 0.04),
          0 2px 6px rgb(0 0 0 / 0.02);
        --maia-poster-border: rgb(0 0 0 / 15%);
        --maia-card-depth-shadow: inset 0 1px 2px rgb(255 255 255 / 0.31),
          0 2px 4px rgb(0 0 0 / 0.19), 0 4px 8px rgb(0 0 0 / 0.08);
        --maia-poster-gloss: inset 0 1px 2px rgb(255 255 255 / 0.25);
      }
      html.userpatch-maia[data-userpatch-theme="light"] .userpatch-media-badge img,
      html.userpatch-maia[data-userpatch-theme="light"] .userpatch-quality-tab img,
      html.userpatch-maia[data-userpatch-theme="light"] .userpatch-quality-filter img {
        filter: none !important;
      }
      html.userpatch-maia[data-userpatch-theme="light"] .userpatch-quality-tab:disabled img {
        filter: opacity(0.45) !important;
      }
  `
}
