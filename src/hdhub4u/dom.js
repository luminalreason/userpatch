export const normalizeText = (value) =>
  (value || "")
    .replaceAll(/[\uE000-\uF8FF]/gu, " ")
    .replaceAll(/\s+/g, " ")
    .trim()
