export const createDetailInfoList = (entries) => {
  const list = document.createElement("dl")
  list.className = "userpatch-info-list"
  list.id = "userpatch-detail-info-list"
  const seen = new Set()
  for (const [label, rawValue] of entries) {
    const value = (rawValue || "").trim().replaceAll(/\s+/g, " ")
    if (!value || seen.has(label)) {
      continue
    }
    seen.add(label)
    const term = document.createElement("dt")
    term.textContent = `${label}:`
    const description = document.createElement("dd")
    description.textContent = value
    list.append(term, description)
  }
  return list
}

export const DETAIL_INFO_CSS = `
html.userpatch-maia.userpatch-detail-page body .userpatch-detail-info {
  container: detail-info / inline-size;
  margin: 0 !important;
  padding: 0 !important;
  border: 0 !important;
  background: transparent !important;
  box-shadow: none !important;
}

html.userpatch-maia.userpatch-detail-page body .userpatch-detail-info #userpatch-detail-info-list {
  display: grid;
  grid-template-columns: max-content minmax(0, 1fr);
  align-items: baseline;
  gap: 0.65rem 0.5rem;
  margin: 0;
  padding: 0;
  font-family: "Inter Variable", ui-sans-serif, system-ui, sans-serif !important;
  font-style: normal !important;
  font-size: 14px !important;
  line-height: 1.45;
  text-align: start;
}
html.userpatch-maia.userpatch-detail-page body .userpatch-detail-info #userpatch-detail-info-list > dt {
  margin: 0;
  padding: 0;
  font-family: inherit !important;
  font-style: normal !important;
  font-size: inherit !important;
  line-height: inherit !important;
  font-weight: 400 !important;
  color: oklch(0.985 0 0) !important;
  -webkit-text-fill-color: currentColor !important;
}
html.userpatch-maia.userpatch-detail-page body .userpatch-detail-info #userpatch-detail-info-list > dd {
  min-inline-size: 0;
  margin: 0;
  padding: 0;
  font-family: inherit !important;
  font-style: normal !important;
  font-size: inherit !important;
  line-height: inherit !important;
  font-weight: 400 !important;
  color: oklch(0.708 0 0) !important;
  -webkit-text-fill-color: currentColor !important;
  overflow-wrap: anywhere;
}
/* The site's late label formatter inserts styled spans into our terms.
   Keep their text consistent with the term even after that formatter runs. */
html.userpatch-maia.userpatch-detail-page body .userpatch-detail-info #userpatch-detail-info-list > :is(dt, dd) :where(*) {
  color: inherit !important;
  -webkit-text-fill-color: currentColor !important;
  font-family: inherit !important;
  font-size: inherit !important;
  font-style: inherit !important;
  font-weight: inherit !important;
  line-height: inherit !important;
}
@media (min-width: 761px) {
  html.userpatch-maia.userpatch-detail-page body .userpatch-detail-info #userpatch-detail-info-list {
    font-size: 18px !important;
  }
}
@container detail-info (max-width: 36rem) {
  html.userpatch-maia.userpatch-detail-page body .userpatch-detail-info #userpatch-detail-info-list {
    grid-template-columns: minmax(0, 1fr);
    row-gap: 0.25rem;
  }
  html.userpatch-maia.userpatch-detail-page body .userpatch-detail-info #userpatch-detail-info-list > dd:not(:last-child) {
    margin-block-end: 0.875rem;
  }
}
html.userpatch-maia .userpatch-mode-tab svg,
html.userpatch-maia.userpatch-detail-page .userpatch-detail-tabs .userpatch-quality-tab svg {
  width: 1rem !important;
  height: 1rem !important;
  inline-size: 1rem !important;
  block-size: 1rem !important;
  flex: 0 0 1rem !important;
}
`
