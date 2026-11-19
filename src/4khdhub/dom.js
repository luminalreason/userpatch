import { normalizePathname } from "../shared/dom.js"

export const normalizeText = (value) =>
  (value || "").replaceAll(/\s+/g, " ").trim()

// Pagination at the root belongs to the home feed. Category paths keep
// their own section, including when that section has pagination.
export const getNavigationPath = (path) => {
  const pathname = normalizePathname(path).toLowerCase()
  return /^\/page\/[1-9]\d*$/.test(pathname) ? "/" : pathname
}
