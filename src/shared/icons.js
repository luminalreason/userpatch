// Interface:
// Exports: createLucideIcon, LUCIDE_ICON_TEMPLATES
// Options: createLucideIcon takes the site's LUCIDE_ICON_SHAPES and an optional decorate(svg, name) hook that applies the per-site icon marker before the template is cached.
// Invariants: templates are cached after decoration, so clones carry the marker.
// Error modes: unknown names fall back to an empty svg shell.

export const LUCIDE_ICON_TEMPLATES = new Map()

export const createLucideIcon = (name, shapes, decorate) => {
  const cached = LUCIDE_ICON_TEMPLATES.get(name)
  if (cached) {
    return cached.cloneNode(true)
  }

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
  svg.setAttribute("width", "24")
  svg.setAttribute("height", "24")
  svg.setAttribute("viewBox", "0 0 24 24")
  svg.setAttribute("fill", "none")
  svg.setAttribute("stroke", "currentColor")
  svg.setAttribute("stroke-width", "2")
  svg.setAttribute("stroke-linecap", "round")
  svg.setAttribute("stroke-linejoin", "round")
  svg.setAttribute("aria-hidden", "true")
  svg.setAttribute("focusable", "false")

  if (decorate) {
    decorate(svg, name)
  }

  for (const [tagName, attributes] of shapes[name] || []) {
    const shape = document.createElementNS(
      "http://www.w3.org/2000/svg",
      tagName
    )
    for (const [attribute, value] of Object.entries(attributes)) {
      shape.setAttribute(attribute, value)
    }
    svg.append(shape)
  }

  LUCIDE_ICON_TEMPLATES.set(name, svg)
  return svg.cloneNode(true)
}
