// Recognize the loading container before its delayed result markup arrives.
// Provider branding plus this template survives handoffs to a rotated domain.
export const isHubCdnGeneratedPage = () =>
  Boolean(
    document.querySelector("#download_container .loading") &&
    /hubcdn/i.test(document.querySelector("main > header")?.textContent || "")
  )

export const getHubCdnUnavailableMessage = () => {
  if (!/(?:^|\.)hubcdn\.[a-z]+$/i.test(location.hostname)) {
    return null
  }
  return (
    Array.from(document.body?.querySelectorAll("h4") || []).find((heading) =>
      /file is deleted or unavailable/i.test(heading.textContent)
    ) || null
  )
}
