import { storageGet, storageSet } from "../shared/storage.js"

const proxyListUrl = "https://pixeldrain-bypass.gamedrive.org/api/proxy.json"
const cacheKey = "userpatch-pixeldrain-proxies"
const cacheLifetime = 24 * 60 * 60 * 1000
let pendingProxyList

// GameDrive uses a bare ID for files and separate ZIP routes for collections.
export const getPixelDrainMirrorPath = (href) => {
  const url = URL.parse(href)
  if (
    !url ||
    !/^https?:$/.test(url.protocol) ||
    !/^(?:www\.)?(?:pixeldrain\.(?:com|net|dev)|pixeldra\.in)$/.test(
      url.hostname
    )
  ) {
    return null
  }
  const match = url.pathname.match(/^\/(u|l|d)\/([\w-]+)\/?$/)
  if (!match) {
    return null
  }
  const [, type, id] = match
  return { u: id, l: `zip/${id}`, d: `dzip/${id}` }[type]
}

export const normalizePixelDrainProxies = (payload) => {
  const entries = Array.isArray(payload) ? payload : payload?.proxies
  const list = Array.isArray(entries) ? entries : [payload?.proxy]
  return list.flatMap((entry) => {
    if (typeof entry !== "string" || !entry.trim()) {
      return []
    }
    const value = entry.trim()
    const base = URL.parse(
      /^[a-z][\w+.-]*:\/\//i.test(value) ? value : `https://${value}`
    )
    if (
      base?.protocol !== "https:" ||
      base.username ||
      base.password ||
      base.search ||
      base.hash
    ) {
      return []
    }
    return [`${base.href.replace(/\/+$/, "")}/`]
  })
}

const getProxyList = () => {
  let cached
  try {
    cached = JSON.parse(storageGet(cacheKey))
  } catch {}
  const fallback = normalizePixelDrainProxies(cached?.proxies)
  if (fallback.length && Date.now() - cached.time < cacheLifetime) {
    return Promise.resolve(fallback)
  }
  if (typeof GM_xmlhttpRequest !== "function") {
    return Promise.resolve(fallback)
  }
  pendingProxyList ??= new Promise((resolve) => {
    try {
      GM_xmlhttpRequest({
        method: "GET",
        url: proxyListUrl,
        anonymous: true,
        responseType: "json",
        timeout: 5000,
        onload: ({ status, response }) => {
          const proxies =
            status === 200 ? normalizePixelDrainProxies(response) : []
          if (proxies.length) {
            storageSet(cacheKey, JSON.stringify({ time: Date.now(), proxies }))
          }
          resolve(proxies.length ? proxies : fallback)
        },
        onerror: () => resolve(fallback),
        ontimeout: () => resolve(fallback),
        onabort: () => resolve(fallback),
      })
    } catch {
      resolve(fallback)
    }
  }).finally(() => {
    pendingProxyList = undefined
  })
  return pendingProxyList
}

export const resolvePixelDrainMirror = async (path) => {
  const proxies = await getProxyList()
  const base = proxies[Math.floor(Math.random() * proxies.length)]
  return base ? new URL(path, base).href : null
}
