// ==UserScript==
// @name         XD Helper
// @namespace    https://github.com/luminalreason/userpatch
// @version      0.1.0
// @description  Automates XDMovies gate countdown timers, tab focus/visibility requirements, and auto-submits when Turnstile is solved.
// @author       luminalreason
// @match        *://*/*
// @run-at       document-start
// @grant        none
// @noframes
// ==/UserScript==
;(() => {
  "use strict"

  // Keep timers active when backgrounded or unfocused
  const spoofVisibilityAndFocus = () => {
    try {
      Object.defineProperty(document, "hidden", {
        get: () => false,
        configurable: true,
      })
      Object.defineProperty(document, "visibilityState", {
        get: () => "visible",
        configurable: true,
      })
      Object.defineProperty(document, "hasFocus", {
        value: () => true,
        configurable: true,
      })

      window.addEventListener(
        "visibilitychange",
        (e) => e.stopImmediatePropagation(),
        true
      )
      window.addEventListener("blur", (e) => e.stopImmediatePropagation(), true)
    } catch {
      // Non-configurable window/document
    }
  }

  spoofVisibilityAndFocus()

  const isGatePage = () => {
    const path = location.pathname
    if (/^\/(r|go)\/[a-zA-Z0-9_-]+/i.test(path)) {
      return true
    }
    if (
      /Get Your Link|Please Wait|Almost There|Your Link is Ready/i.test(
        document.title || ""
      )
    ) {
      return true
    }
    return Boolean(
      document.getElementById("generateBtn") ||
      document.getElementById("goToLinkBtn") ||
      document.getElementById("turnstileContainer")
    )
  }

  // Accelerate local UI countdown without altering socket heartbeat interval
  const accelerateTimers = () => {
    const origSetInterval = window.setInterval
    window.setInterval = function (handler, delay, ...args) {
      const fn =
        typeof handler === "function" ? handler.toString() : String(handler)
      if (
        fn.includes("localCount") ||
        (delay === 1000 && fn.includes("tick"))
      ) {
        return origSetInterval.call(window, handler, 50, ...args)
      }
      return origSetInterval.call(window, handler, delay, ...args)
    }
  }

  accelerateTimers()

  let isSubmitting = false

  const clickIfReady = (id) => {
    const el = document.getElementById(id)
    if (!el || el.disabled || el.classList.contains("hidden")) {
      return false
    }

    // Single-click buttons
    if (id !== "goToLinkBtn") {
      if (el.dataset.helperClicked) {
        return false
      }
      el.dataset.helperClicked = "true"
      el.click()
      return true
    }

    // goToLinkBtn: retry clicking whenever enabled and not in flight
    if (isSubmitting) {
      return false
    }
    isSubmitting = true
    el.click()

    // If verification fails or resets, release lock after response
    setTimeout(() => {
      isSubmitting = false
    }, 1500)
    return true
  }

  // Intercept Turnstile completion to click the link button immediately
  const hookTurnstileProperty = () => {
    let currentSuccess = window.onTurnstileSuccess

    const wrapSuccess = (orig) => {
      const hooked = function (token) {
        if (typeof orig === "function") {
          orig.call(this, token)
        }
        isSubmitting = false
        setTimeout(() => clickIfReady("goToLinkBtn"), 50)
      }
      hooked._hooked = true
      return hooked
    }

    if (typeof currentSuccess === "function" && !currentSuccess._hooked) {
      window.onTurnstileSuccess = wrapSuccess(currentSuccess)
    }

    try {
      Object.defineProperty(window, "onTurnstileSuccess", {
        configurable: true,
        enumerable: true,
        get: () => currentSuccess,
        set: (fn) => {
          currentSuccess = wrapSuccess(fn)
        },
      })
    } catch {
      // Fallback if property is sealed
    }

    // Reset lock on captcha error/expiration
    let currentError = window.onTurnstileError
    const wrapError = (orig) => {
      const hooked = function () {
        isSubmitting = false
        if (typeof orig === "function") {
          orig.call(this)
        }
      }
      hooked._hooked = true
      return hooked
    }

    if (typeof currentError === "function" && !currentError._hooked) {
      window.onTurnstileError = wrapError(currentError)
    }

    try {
      Object.defineProperty(window, "onTurnstileError", {
        configurable: true,
        enumerable: true,
        get: () => currentError,
        set: (fn) => {
          currentError = wrapError(fn)
        },
      })
    } catch {}
  }

  const automateGateFlow = () => {
    if (!isGatePage()) {
      return
    }

    hookTurnstileProperty()

    const observer = new MutationObserver(() => {
      hookTurnstileProperty()
      if (!clickIfReady("generateBtn") && !clickIfReady("continueBtn")) {
        clickIfReady("goToLinkBtn")
      }
    })

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["class", "disabled", "style"],
    })

    // Fallback polling for captcha solving and retries
    setInterval(() => {
      clickIfReady("goToLinkBtn")
    }, 400)

    clickIfReady("generateBtn")
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", automateGateFlow, {
      once: true,
    })
  } else {
    automateGateFlow()
  }
})()
