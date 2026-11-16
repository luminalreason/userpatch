// Interface:
// Exports: normalizePathname
// Invariants: pure URL helper, safe at module-eval time.
// Error modes: returns an empty string when URL parsing fails.

export const normalizePathname = (path) => {
  try {
    return new URL(path, location.href).pathname.replace(/\/+$/, "") || "/"
  } catch {
    return ""
  }
}
