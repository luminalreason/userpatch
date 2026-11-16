// Broad metadata matches need a bounded discovery phase before installing
// page controls or listeners. Late markup gets the same check as parsed HTML.
export const discoverSite = (signature, start) => {
  let timeout = 0
  const observer = new MutationObserver(check)
  function check() {
    if (!signature()) {
      return
    }
    observer.disconnect()
    window.clearTimeout(timeout)
    start()
  }
  observer.observe(document, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["class"],
  })
  timeout = window.setTimeout(() => observer.disconnect(), 30000)
  check()
  window.addEventListener(
    "pagehide",
    () => {
      observer.disconnect()
      window.clearTimeout(timeout)
    },
    { once: true }
  )
}
