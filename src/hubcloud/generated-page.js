// The branded state template identifies this handoff on any landing domain.
// Recognize the loading half first: the success link can arrive in a later
// parser chunk, and waiting for it would expose the original loading screen.
export const isHubCloudGeneratedPage = () =>
  Boolean(
    document.querySelector("main #loadingState.state") &&
    /hubcloud/i.test(
      document.querySelector("header .logo-text")?.textContent || ""
    )
  )
