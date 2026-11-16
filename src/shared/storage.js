// Interface:
// Exports: initStorage, storageGet, storageSet, getOpenedReleases, saveOpenedRelease, isReleaseOpened, markReleaseOpened
// Invariants: opened-release tracking is idempotent per key; localStorage and sessionStorage are separate domains.
// Error modes: storageGet/Set swallow quota and privacy-mode failures.

export const storageGet = (key) => {
  try {
    return window.localStorage.getItem(key)
  } catch {
    return null
  }
}

export const storageSet = (key, value) => {
  try {
    if (value === null || value === undefined) {
      window.localStorage.removeItem(key)
    } else {
      window.localStorage.setItem(key, String(value))
    }
  } catch {}
}

let openedReleasesKey = ""

export const initStorage = (context) => {
  openedReleasesKey = context.openedReleasesKey
}

export const getOpenedReleases = () => {
  try {
    const raw = storageGet(openedReleasesKey)
    if (!raw) {
      return new Set()
    }
    const parsed = JSON.parse(raw)
    return new Set(Array.isArray(parsed) ? parsed : [])
  } catch {
    return new Set()
  }
}

export const saveOpenedRelease = (...identifiers) => {
  const valid = identifiers.filter(
    (id) => Boolean(id) && typeof id === "string"
  )
  if (!valid.length) {
    return
  }
  const items = getOpenedReleases()
  for (const identifier of valid) {
    items.delete(identifier)
    items.add(identifier)
  }
  storageSet(openedReleasesKey, JSON.stringify([...items].slice(-1000)))
}

export const markReleaseOpened = (row, item) => {
  if (row) {
    row.dataset.userpatchOpened = "true"
  }
  if (item) {
    item.dataset.userpatchOpened = "true"
  }
}

export const isReleaseOpened = (identifier, linksRoot, openedReleases) => {
  if (identifier && openedReleases.has(identifier)) {
    return true
  }
  if (linksRoot) {
    for (const anchor of linksRoot.querySelectorAll("a[href]")) {
      if (openedReleases.has(anchor.href)) {
        return true
      }
    }
  }
  return false
}
