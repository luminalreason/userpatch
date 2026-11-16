const LOGO_SVG = `<svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg"><g filter="url(#a)" clip-path="url(#c)"><rect x=".5" y=".358" width="44" height="44" rx="9.5" fill="#e67401"/><rect x="1.417" y="1.275" width="42.167" height="42.167" rx="8.583" stroke="url(#d)" stroke-width="1.833"/><path fill-rule="evenodd" clip-rule="evenodd" d="M17.244 22.054c-1.502-1.34-3.59-1.824-5.94-1.824v-5.872c3.003 0 6.8.596 9.847 3.313a12.3 12.3 0 0 1 2.141 2.506v-5.819c3.002 0 6.8.596 9.846 3.313C36.246 20.441 38 24.895 38 31.352h-5.871c0-5.438-1.457-8.014-2.898-9.298-1.494-1.333-3.57-1.82-5.905-1.824 1.738 2.709 2.686 6.374 2.686 11.122h-5.87c0-5.438-1.458-8.014-2.898-9.298m-5.848 1.723-.093-.059-.094.059c-.152.095-.422.264-.536.345a9.5 9.5 0 0 0-1.074.884C8.827 25.746 8 26.828 8 28.087c0 1.805 1.479 3.268 3.303 3.268s3.302-1.463 3.302-3.268c0-1.26-.827-2.34-1.598-3.081a9.5 9.5 0 0 0-1.074-.884c-.115-.081-.385-.25-.537-.345" fill="#fff"/></g><rect x=".431" y=".29" width="44.138" height="44.138" rx="9.569" stroke="#000" stroke-opacity=".6" stroke-width=".138"/><defs><linearGradient id="d" x1="22.5" y1=".358" x2="22.5" y2="44.358" gradientUnits="userSpaceOnUse"><stop stop-color="#f4820f"/><stop offset="1" stop-color="#d86600"/></linearGradient><clipPath id="c"><rect x=".5" y=".358" width="44" height="44" rx="9.5" fill="#fff"/></clipPath><filter id="a" x=".5" y="-17.517" width="44" height="61.875" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset dy="-17.875"/><feGaussianBlur stdDeviation="30"/><feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/><feColorMatrix values="0 0 0 0 0.901961 0 0 0 0 0.454902 0 0 0 0 0.00392157 0 0 0 0.2 0"/><feBlend in2="shape" result="effect1_innerShadow_467_3292"/></filter></defs></svg>`

const LOGO_URI = `data:image/svg+xml,${encodeURIComponent(LOGO_SVG)}`

export const ensureHblinksBranding = () => {
  const brand = document.querySelector("#masthead .site-branding a")
  if (!brand || brand.querySelector(".userpatch-hblinks-logo")) {
    return
  }
  const logo = document.createElement("img")
  logo.className = "userpatch-hblinks-logo"
  logo.src = LOGO_URI
  logo.alt = ""
  logo.width = 38
  logo.height = 38
  brand.replaceChildren(logo, document.createTextNode("HUBLinks"))
}
