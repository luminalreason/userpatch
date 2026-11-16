// Interface:
// Exports: QUALITY_LABELS, RELEASE_QUALITY_PATTERNS, getReleaseQuality
// Invariants: byte-identical in the maia pair.
// Error modes: none (pure lookups).

export const QUALITY_LABELS = Object.freeze({
  all: "All",
  "4k": "4K (2160p)",
  hd: "HD (1080p)",
  sd: "SD (720p or 480p)",
})

export const RELEASE_QUALITY_PATTERNS = [
  ["4k", /(?:^|[^A-Z0-9])(?:2160P|DS4K|RM4K|4K)(?=$|[^A-Z0-9])/i],
  ["hd", /(?:^|[^A-Z0-9])1080P(?=$|[^A-Z0-9])/i],
  ["sd", /(?:^|[^A-Z0-9])(?:720P|480P)(?=$|[^A-Z0-9])/i],
]

export const getReleaseQuality = (value) => {
  return (
    RELEASE_QUALITY_PATTERNS.find(([, pattern]) => pattern.test(value))?.[0] ||
    "unknown"
  )
}
