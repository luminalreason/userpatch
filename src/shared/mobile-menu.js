export const createMobileMenu = (id, logo, siteName, closeIcon) => {
  const menu = document.createElement("dialog")
  menu.className = "userpatch-mobile-menu"
  menu.id = id
  menu.setAttribute("aria-label", "Site menu")

  const header = document.createElement("header")
  header.className = "userpatch-mobile-menu-header"
  const brand = document.createElement("a")
  brand.className = "userpatch-mobile-menu-brand"
  brand.href = "/"
  brand.dataset.noSwup = ""
  const image = document.createElement("img")
  image.src = logo
  image.alt = siteName
  brand.append(image)

  const close = document.createElement("button")
  close.type = "button"
  close.className = "userpatch-mobile-menu-close"
  close.autofocus = true
  close.setAttribute("aria-label", "Close menu")
  close.append(closeIcon)
  close.addEventListener("click", () => menu.close())
  header.append(brand, close)
  menu.append(header)
  menu.addEventListener("click", (event) => {
    if (event.target.closest("a[href]")) {
      menu.close()
    }
  })
  return menu
}

export const bindMobileMenuButton = (button, id, openMenu) => {
  button.setAttribute("aria-haspopup", "dialog")
  button.setAttribute("aria-controls", id)
  button.addEventListener("click", openMenu)
}

export const MOBILE_MENU_CSS = `
html.userpatch-maia .userpatch-mobile-menu[open] {
  position: fixed;
  inset: 0;
  display: flex;
  inline-size: 100%;
  block-size: 100%;
  max-inline-size: none;
  max-block-size: none;
  flex-direction: column;
  box-sizing: border-box;
  margin: 0;
  padding: max(0.75rem, env(safe-area-inset-top, 0px))
    max(0.75rem, env(safe-area-inset-right, 0px))
    max(0.75rem, env(safe-area-inset-bottom, 0px))
    max(0.75rem, env(safe-area-inset-left, 0px));
  overflow: hidden;
  overscroll-behavior: contain;
  border: 0;
  background: var(--maia-background);
  color: var(--maia-foreground);
}

html.userpatch-maia .userpatch-mobile-menu-header {
  display: flex;
  min-block-size: 3.5rem;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0 0.5rem 0.75rem;
  border-bottom: 1px solid var(--maia-border);
}

html.userpatch-maia .userpatch-mobile-menu-close {
  display: inline-flex;
  inline-size: 2.5rem;
  block-size: 2.5rem;
  flex: none;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--maia-foreground);
  cursor: pointer;
}
html.userpatch-maia .userpatch-mobile-menu-close:focus-visible {
  outline: 2px solid var(--maia-ring) !important;
  outline-offset: -2px;
  box-shadow: none !important;
}
html.userpatch-maia .userpatch-mobile-menu::backdrop {
  overflow: hidden;
  overscroll-behavior: contain;
}

html.userpatch-maia .userpatch-mobile-menu-brand img {
  display: block;
  inline-size: 7rem;
  block-size: 2.5rem;
  object-fit: contain;
}

`
