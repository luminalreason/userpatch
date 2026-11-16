// Interface:
// Exports: isCloudflareChallenge
// Invariants: maia-pair variant; HubCloud keeps its own drifted variant in detect.js.
// Error modes: fail-closed (false) when the DOM cannot be read.

export const isCloudflareChallenge = () => {
  try {
    return (
      /just a moment|attention required|checking your browser/i.test(
        document.title || ""
      ) ||
      Boolean(
        document.querySelector(
          "#challenge-running, #cf-challenge-running, #challenge-form, .cf-turnstile, [name='cf-turnstile-response'], script[src*='/cdn-cgi/challenge-platform/']"
        )
      )
    )
  } catch {
    return true
  }
}
