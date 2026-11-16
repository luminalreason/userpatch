export const normalizeText = (value) =>
  (value || "").replaceAll(/\s+/g, " ").trim()
