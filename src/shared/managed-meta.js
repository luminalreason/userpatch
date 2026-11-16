// Interface:
// Exports: restoreManagedMeta
// Options: takes the site's managed color-scheme and theme-color meta IDs.
// Invariants: restores adopted IDs/content and viewport content; removes created meta.
// Error modes: DOM failures propagate to the caller's existing teardown boundary.

export const restoreManagedMeta = (metaIds) => {
  for (const id of metaIds) {
    const meta = document.getElementById(id)
    if (meta) {
      if (meta.dataset.originalContent !== undefined) {
        meta.content = meta.dataset.originalContent
        if (meta.dataset.originalId) {
          meta.id = meta.dataset.originalId
        } else {
          meta.removeAttribute("id")
        }
        delete meta.dataset.originalId
        delete meta.dataset.originalContent
      } else {
        meta.remove()
      }
    }
  }
  const modifiedViewportMeta = document.querySelector(
    'meta[name="viewport"][data-original-content]'
  )
  if (modifiedViewportMeta) {
    modifiedViewportMeta.content =
      modifiedViewportMeta.dataset.originalContent || ""
    delete modifiedViewportMeta.dataset.originalContent
  }
}
