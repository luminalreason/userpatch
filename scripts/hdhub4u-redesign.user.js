// ==UserScript==
// @name         HDHub4u + HUBLinks Redesign
// @namespace    https://github.com/luminalreason/userpatch
// @version      0.1.0
// @description  Reworks HDHub4u and HUBLinks with a shared responsive dark interface and clearer release links.
// @author       luminalreason
// @match        *://*/*
// @run-at       document-start
// @grant        none
// @noframes
// ==/UserScript==

// Generated from src/ — do not edit by hand.
;(function installLoadingCover(force = false, timeoutMs = 8000) {
  const root = document.documentElement
  if (!root) {
    return null
  }
  const isChallenge = () =>
    /just a moment|attention required|checking your browser/i.test(
      document.title
    ) ||
    location.pathname.startsWith("/cdn-cgi/") ||
    Boolean(
      document.querySelector(
        "#challenge-form, #challenge-running, #cf-challenge-running, .cf-turnstile"
      )
    )
  if (isChallenge()) {
    return null
  }
  if (
    !force &&
    (!/(^|\.)(4khdhub|hdhub4u|hblinks|hubcloud|hubcdn)\./i.test(
      location.hostname
    ) ||
      /\.(mkv|mp4|avi|mov|webm|zip|rar|7z|iso|mp3|flac)$/i.test(
        location.pathname
      ))
  ) {
    return null
  }
  const existing = document.getElementById("userpatch-page-loader")
  if (existing) {
    return existing
  }
  let style = document.getElementById("userpatch-page-loader-style")
  if (!style) {
    style = document.createElement("style")
    style.id = "userpatch-page-loader-style"
    style.textContent = `
      html[data-userpatch-loading] { background: #0a0a0a !important; }
      html[data-userpatch-loading] > body { visibility: hidden !important; }
      #userpatch-page-loader {
        all: initial !important; position: fixed !important; inset: 0 !important;
        z-index: 2147483647 !important; display: grid !important;
        place-items: center !important; visibility: visible !important;
        background: #0a0a0a !important; color: #fafafa !important;
      }
      #userpatch-page-loader progress, progress.userpatch-loading-spinner {
        appearance: none !important; display: block !important;
        inline-size: 2rem !important; block-size: 2rem !important;
        box-sizing: border-box !important; margin: auto !important;
        border: 2px solid #444 !important; border-block-start-color: #fafafa !important;
        border-radius: 50% !important; background: transparent !important;
        animation: userpatch-loader-spin 1s linear infinite !important;
      }
      #userpatch-page-loader progress::-webkit-progress-bar,
      progress.userpatch-loading-spinner::-webkit-progress-bar { display: none; }
      #userpatch-page-loader progress::-moz-progress-bar,
      progress.userpatch-loading-spinner::-moz-progress-bar { background: transparent; }
      @keyframes userpatch-loader-spin { to { transform: rotate(360deg); } }
      @media (prefers-reduced-motion: reduce) {
        #userpatch-page-loader progress, progress.userpatch-loading-spinner { animation-duration: 6s !important; }
      }
    `
    root.append(style)
  }
  const cover = document.createElement("div")
  cover.id = "userpatch-page-loader"
  cover.setAttribute("aria-busy", "true")
  const spinner = document.createElement("progress")
  spinner.setAttribute("aria-label", "Loading page")
  cover.append(spinner)
  root.dataset.userpatchLoading = ""
  root.append(cover)
  let timer = 0
  const cleanup = () => {
    delete root.dataset.userpatchLoading
    cover.remove()
    observer.disconnect()
    window.clearTimeout(timer)
  }
  const observer = new MutationObserver(() => {
    if (!Object.hasOwn(root.dataset, "userpatchLoading") || isChallenge()) {
      cleanup()
      return
    }
    // Some themes rebuild body/head during startup. Keep the cover and its
    // stylesheet outside those containers until the redesign explicitly reveals.
    if (!style.isConnected) {
      root.append(style)
    }
    if (!cover.isConnected) {
      root.append(cover)
    }
  })
  observer.observe(document, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["data-userpatch-loading"],
  })
  timer = window.setTimeout(cleanup, timeoutMs)
  window.addEventListener(
    "pagehide",
    () => {
      // Do not uncover a partially parsed outgoing document during navigation.
      observer.disconnect()
      window.clearTimeout(timer)
    },
    { once: true }
  )
  window.addEventListener("pageshow", (event) => {
    if (event.persisted) {
      cleanup()
    }
  })
  return cover
})()

;("use strict")

;(function () {
  // src/hdhub4u/dom.js
  const normalizeText = (value) =>
    (value || "")
      .replaceAll(/[\uE000-\uF8FF]/gu, " ")
      .replaceAll(/\s+/g, " ")
      .trim()

  // src/shared/badges.js
  const USERPATCH_BADGE_DATA = Object.freeze({
    "4k": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNiIgaGVpZ2h0PSIxNSIgdmlld0JveD0iMCAwIDI2IDE1Ij48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTIuNzM3IDBoMjAuNTI4QTIuNzMgMi43MyAwIDAgMSAyNiAyLjcyN3Y5LjU0NUEyLjczIDIuNzMgMCAwIDEgMjMuMjY1IDE1SDIuNzM3QTIuNzMgMi43MyAwIDAgMSAwIDEyLjI3MlYyLjcyN0EyLjczIDIuNzMgMCAwIDEgMi43MzcgMG03LjA3OCAxMS42SDExLjV2LTEuNWgxLjFWOC42ODFoLTEuMXYtNS41M0g5YTU2IDU2IDAgMCAwLTMuMzkgNS40NDJWMTAuMWg0LjIwNXpNNy4xNjIgOC42ODZBNDAgNDAgMCAwIDEgOS44MTUgNC40aC4wMzV2NC4zMzNINy4xNjJ6bTguMjczIDIuOTE0VjkuMDJsLjc5MS0uOTQ5IDIuNTA3IDMuNTI5aDIuMTE0TDE3LjUgNi45bDMuMTMtMy43NDloLTEuOTY4bC0zLjE3NCAzLjg1NGgtLjA1M1YzLjE1MWgtMS43NjlWMTEuNnoiLz48L3N2Zz4=",
    hd: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNiIgaGVpZ2h0PSIxNSIgdmlld0JveD0iMCAwIDI2IDE1Ij48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTIuNzM3IDBoMjAuNTI4QTIuNzMgMi43MyAwIDAgMSAyNiAyLjcyN3Y5LjU0NUEyLjczIDIuNzMgMCAwIDEgMjMuMjY1IDE1SDIuNzM3QTIuNzMgMi43MyAwIDAgMSAwIDEyLjI3MlYyLjcyN0EyLjczIDIuNzMgMCAwIDEgMi43MzcgME0xMi41IDExLjc3OFYzLjMyNmgtMS43NzJ2My40MzNINi45MjFWMy4zMjZINS4xNTJ2OC40NTJoMS43NjlWOC4yMTdoMy44MDd2My41NjF6bTEuNDA5LTguNDUydjguNDUyaDMuMjU3YzIuNTM2IDAgNC4wMy0xLjU3NiA0LjAzLTQuMjU4UzE5LjcgMy4zMjYgMTcuMTYzIDMuMzI2aC0zLjI1N3ptMS43NjkgMS40NThoMS4yNzdjMS41NTggMCAyLjQzNy45NzIgMi40MzcgMi43NDEgMCAxLjgyNy0uODU1IDIuNzg4LTIuNDM3IDIuNzg4aC0xLjI4VjQuNzg1eiIvPjwvc3ZnPg==",
    sd: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNiIgaGVpZ2h0PSIxNSIgdmlld0JveD0iMCAwIDI2IDE1Ij48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTIuNzM3IDBoMjAuNTI4QTIuNzMgMi43MyAwIDAgMSAyNiAyLjcyN3Y5LjU0NUEyLjczIDIuNzMgMCAwIDEgMjMuMjY1IDE1SDIuNzM3QTIuNzMgMi43MyAwIDAgMSAwIDEyLjI3MlYyLjcyN0EyLjczIDIuNzMgMCAwIDEgMi43MzcgME01LjMgOS4zNzNDNS4zNTQgMTEuMDA1IDYuNjY2IDEyIDguNzI4IDEyYzIuMTMgMCAzLjQ3NS0xLjA2NyAzLjQ3NS0yLjc1NCAwLTEuMzI2LS43NDktMi4wNzMtMi40NjYtMi40NDZsLTEuMDQtLjIyN2MtLjk4NS0uMjI5LTEuNDAxLS41My0xLjQwMS0xLjA2Ni4wNDYtLjM0Ni4yMy0uNjU4LjUxLS44Ni4yOC0uMjA0LjYzMS0uMjguOTY5LS4yMTJhMS40IDEuNCAwIDAgMSAxLjU5MiAxLjE4MWgxLjY4MUMxMi4wMTggNC4wNDIgMTAuNzY1IDMgOC43NjggMyA2Ljg1NyAzIDUuNDkyIDQuMDYgNS40OTIgNS42NjNjMCAxLjI3Mi43NzggMi4wODUgMi4zNTggMi40MjhsMS4xMTUuMjQ3YzEuMDM0LjIzNCAxLjQ0NC41NDggMS40NDQgMS4xMTUgMCAuNjM5LS42NTQgMS4xMDMtMS42MSAxLjEwMy0uOC4xMi0xLjU2Mi0uMzktMS43Ny0xLjE4M0g1LjMwNHptOC02LjIyM3Y4LjY5MmgzLjMwM2MyLjU3MiAwIDQuMDg3LTEuNjIyIDQuMDg3LTQuMzggMC0yLjc2LTEuNTA4LTQuMzEyLTQuMDgzLTQuMzEyem0xLjc5OCAxLjUwMWgxLjI5NWMxLjU4IDAgMi40NzIgMSAyLjQ3MiAyLjgyIDAgMS44OC0uODY3IDIuODY4LTIuNDcyIDIuODY4aC0xLjI5NXoiLz48L3N2Zz4=",
    imax: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0ODkuMjIiIGhlaWdodD0iOTQuNzI3Ij48dGl0bGU+SU1BWCBsb2dvIChibGFjayk8L3RpdGxlPjxnIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3R5bGU9ImZpbGw6IzAwMCIgdHJhbnNmb3JtPSJzY2FsZSguNSkiPjxwYXRoIGQ9Im0yNzcuMDEgMTg5LjI5IDY2LjgzLTEzNi40NTRoMTAuODdsLS4wMSAxMzYuNjE0aDUzLjM2Vi41NzNoLTk2LjEyTDI1NC45OCAxMTMuNTEgMTk3LjQ4LjcyM2wtOTUuNjkuMjk4LS4xNCAxODguNDI5aDUzLjI1bC4wNy0xMzYuNjE0aDEwLjY4bDY2LjggMTM2LjQ1NHpNMCAxODkuNDRoNTkuNzU5Vi41NzNIMHpNNTE0LjU2LjU3M2wtOTUuOTk0IDE4OC44OGg2My44NDRsMTYuNzAzLTMyLjEyM2gxMTkuMjlsMTYuMjczIDMyLjEyM2g2My45OThMNjAyLjYyOC41NzN6bTQ3LjA4OSA0Mi45MzVoLTUuODc2bC0zNi4zMzkgNzEuNTMzaDc4LjE0OXpNNzc5Ljk5IDE4OS40NWw2MC4xNS02OC4yNSA1OS40OCA2OC4yNWg3OC44MUw4ODkuNTUgODkuMTMzIDk2My45OC41NzNoLTcyLjg1bC01MS40OSA2MS4zNjVMNzg5LjYzLjU3M2gtNzQuMTdsNzQuODYgODguNjQ1LTg5LjM5IDEwMC4yMzJ6Ii8+PC9nPjwvc3ZnPg==",
    "hdr10-plus":
      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1NCIgaGVpZ2h0PSIxNSIgdmlld0JveD0iMCAwIDU0IDE1Ij48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Ik01MS4yNzMgMEEyLjcyNyAyLjcyNyAwIDAgMSA1NCAyLjcyN3Y5LjU0NkEyLjcyNyAyLjcyNyAwIDAgMSA1MS4yNzMgMTVIMi43MjdBMi43MjcgMi43MjcgMCAwIDEgMCAxMi4yNzNWMi43MjdBMi43MjcgMi43MjcgMCAwIDEgMi43MjcgMHptLTEyLjU0IDMuMThjLTIuMTEzIDAtMy4zOTYgMS42NzQtMy4zOTYgNC4zNjF2LjAxMmwuMDA0LjI0OWMuMDc3IDIuNTQxIDEuMzQ1IDQuMTE4IDMuMzkzIDQuMTE4IDIuMTE0IDAgMy4zOTctMS42OCAzLjM5Ny00LjM2N1Y3LjU0bC0uMDA0LS4yNDljLS4wNzctMi41NC0xLjM0NS00LjExMi0zLjM5My00LjExMlptLTMxLjgzOC4xNDZINS4xNXY4LjQ0OGgxLjc0NXYtMy41NmgzLjc1NXYzLjU2aDEuNzQ0VjMuMzI2SDEwLjY1djMuNDNINi44OTV6bTEwLjAzNCAwaC0zLjE4M3Y4LjQ0OGgzLjE4M2MyLjUwMSAwIDMuOTc0LTEuNTc1IDMuOTc0LTQuMjU2di0uMDEyYzAtMi42NzUtMS40NzgtNC4xOC0zLjk3NC00LjE4bTguNTEgMGgtMy40NDR2OC40NDhoMS43NDVWOC43MTJoMS4zOThsMS41NTQgMy4wNjJoMS45NzZMMjYuOTEgOC40NDljLjkyNS0uMzcgMS41MDgtMS4yOTQgMS41MDgtMi40MDZWNi4wM2MwLTEuNjk4LTEuMTA5LTIuNzA1LTIuOTgtMi43MDVabTcuODA0IDBIMzEuNTFsLTIuMTU1IDEuNTE3VjYuNDFsMi4xMjYtMS40NjNoLjAzNXY2LjgyNmgxLjcyN3ptMTMuNTMgMS4zMWgtMS40NzR2Mi4yNTNoLTIuMzk3djEuNDkzaDIuMzk3djIuMjQ4aDEuNDczVjguMzgyaDIuNDAzVjYuODg5aC0yLjQwM1Y0LjYzNVptLTguMDQtLjA0YzEuMDQgMCAxLjYzNiAxLjA5IDEuNjM2IDIuOTQ1di4wMTJsLS4wMDMuMjI4Yy0uMDQ4IDEuNzE3LS42MzYgMi43MjItMS42MzIgMi43MjItMS4wNCAwLTEuNjM1LTEuMDk0LTEuNjM1LTIuOTVWNy41NGwuMDAzLS4yMjhjLjA0Ny0xLjcxNi42MzUtMi43MTYgMS42MzItMi43MTZabS0yMi4wMTIuMTg4YzEuNTMgMCAyLjQwMy45NjYgMi40MDMgMi43Mjh2LjAxMmMwIDEuODI2LS44NDMgMi43ODYtMi40MDMgMi43ODZoLTEuMjNWNC43ODR6bTguNTA0LS4wNzZjLjg2IDAgMS40MS41MTUgMS40MSAxLjMyM3YuMDEyYzAgLjgzLS41MiAxLjMyOC0xLjM4NyAxLjMyOEgyMy43NFY0LjcwOHoiLz48L3N2Zz4=",
    hdr: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNCIgaGVpZ2h0PSIxNSIgdmlld0JveD0iMCAwIDM0IDE1Ij48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTIuNzIgMGgyOC41NTdBMi43MjQgMi43MjQgMCAwIDEgMzQgMi43Mjd2OS41NDVBMi43MjQgMi43MjQgMCAwIDEgMzEuMjc3IDE1SDIuNzJBMi43MjMgMi43MjMgMCAwIDEgMCAxMi4yNzJWMi43MjdBMi43MjMgMi43MjMgMCAwIDEgMi43MiAwbTkuNjcyIDExLjZWMy4xNTFoLTEuNzY5djMuNDMzSDYuODE2VjMuMTUxSDUuMDQ3VjExLjZoMS43NjlWOC4wNDJoMy44MDdWMTEuNnpNMTMuOCAzLjE1MVYxMS42aDMuMjU3YzIuNTM2IDAgNC4wMy0xLjU3NiA0LjAzLTQuMjU4cy0xLjQ5NC00LjE5NC00LjAzLTQuMTk0SDEzLjh6bTEuNzcgMS40NTloMS4yNzdjMS41NTggMCAyLjQzNy45NzIgMi40MzcgMi43NDEgMCAxLjgyNy0uODU1IDIuNzg4LTIuNDM3IDIuNzg4SDE1LjU3ek0yNCA0LjUzNGgxLjUzYTEuMyAxLjMgMCAwIDEgMS40MjkgMS4zNDcgMS4yNjggMS4yNjggMCAwIDEtMS40MTIgMS4zNDdIMjR6bTAgMy45NzdoMS40NDdsMS41NzEgMy4wODloMkwyNy4yNCA4LjI0N2EyLjQ4IDIuNDggMCAwIDAgMS41MzUtMi40YzAtMS42NjktMS4xMTMtMi42OTQtMy4wNTctMi42OTRoLTMuNDkxVjExLjZIMjR6Ii8+PC9zdmc+",
    "dolby-vision":
      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MiIgaGVpZ2h0PSIyMiIgdmlld0JveD0iMCAwIDUyIDIyIj48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Im05LjcyIDE0Ljg3IDEuOTI3IDUuNDU0aC4wNGwxLjk0Ni01LjQ1M2gxLjM0NGwtMi44MDYgNy4wODRoLTEuMDc3bC0yLjc2Ny03LjA4NHptNy44MzkgMHY3LjA4NWgtMS4yNDV2LTcuMDg0em05LjM2OSAwdjcuMDg1aC0xLjI0NXYtNy4wODR6bTUuMjI3IDBxLjc4IDAgMS40MzguMjQ4LjY1OC4yNDcgMS4xMzguNzA1dC43NDggMS4xMS4yNjggMS40NnEwIC43OTItLjI2OCAxLjQ0NGEzLjMgMy4zIDAgMCAxLS43NDggMS4xMjNxLS40OC40NzEtMS4xMzguNzMzYTMuOSAzLjkgMCAwIDEtMS40MzguMjYycS0uNzczIDAtMS40MjUtLjI2MmEzLjM1IDMuMzUgMCAwIDEtMS4xMjgtLjczMyAzLjQgMy40IDAgMCAxLS43NDMtMS4xMjMgMy44IDMuOCAwIDAgMS0uMjY4LTEuNDQzcTAtLjgxLjI2OC0xLjQ2Mi4yNjctLjY1MS43NDMtMS4xMDkuNDc0LS40NTggMS4xMjgtLjcwNS42NTItLjI0NyAxLjQyNS0uMjQ3em02Ljk4NSAwIDMuMjUgNS4zMDRoLjAydi01LjMwM2gxLjI0NXY3LjA4NGgtMS41OGwtMy4zMi01LjQ3M2gtLjAydjUuNDczaC0xLjI0NnYtNy4wODR6bS0xNy4yOC4wMDJxLjUwNiAwIDEuMDI2LjE4LjQxNi4xNDUuNzQ2LjQwNWwuMTU5LjEzNy0uNzY5Ljg1NGExLjQ0IDEuNDQgMCAwIDAtLjUzLS40MTMgMS41NyAxLjU3IDAgMCAwLTEuMS0uMTE0IDEuMyAxLjMgMCAwIDAtLjM3Ni4xNjIuOS45IDAgMCAwLS4yNzYuMjg0LjguOCAwIDAgMC0uMTA4LjQyMy43Ni43NiAwIDAgMCAuMzUxLjY2NHEuMTY0LjExNC4zOTkuMi4yMzQuMDg1LjUxNS4xNy4zMi4xMDUuNjYxLjIzOC4zNDMuMTMzLjYyOC4zNTFjLjI4NS4yMTguMzQ3LjMzLjQ2OS41NXEuMTgzLjMzMy4xODMuODI2IDAgLjU0MS0uMTk3Ljk0NWExLjk0IDEuOTQgMCAwIDEtLjUyNS42NyAyLjIgMi4yIDAgMCAxLS43NjkuMzk4IDMuMiAzLjIgMCAwIDEtLjkyOC4xMzMgMy40IDMuNCAwIDAgMS0xLjI2NS0uMjQyIDIuNSAyLjUgMCAwIDEtLjg3NS0uNTY1bC0uMTM4LS4xNTIuODQ0LS43OTdxLjI0My4zNDIuNjUyLjU0LjQwNy4yLjgwMS4yLjIwNiAwIC40MjItLjA1MmExLjEgMS4xIDAgMCAwIC4zODktLjE3NiAxIDEgMCAwIDAgLjI4MS0uMzA4LjkuOSAwIDAgMCAuMTA4LS40Ni43Ni43NiAwIDAgMC0uMTIyLS40NDIgMS4xIDEuMSAwIDAgMC0uMzI4LS4zMDRxLS4yMDctLjEyOC0uNDg4LS4yMjNsLS41OS0uMnEtLjMtLjA5My0uNi0uMjI3LS4zLS4xMzMtLjU0LS4zNTFhMS43IDEuNyAwIDAgMS0uMzg4LS41MzdxLS4xNS0uMzE4LS4xNS0uNzkyIDAtLjUxMy4yMS0uODgzLjIxMi0uMzcuNTU0LS42MTIuMzQyLS4yNDMuNzc4LS4zNjEuNDM1LS4xMi44ODYtLjExOW0xMC4zMDQgMS4xNXEtLjQ5OCAwLS45LjE4My0uNDAyLjE4NC0uNjkyLjUwNGEyLjMgMi4zIDAgMCAwLS40NDcuNzUxIDIuNyAyLjcgMCAwIDAtLjE1OS45MzRxMCAuNTIzLjE1OS45NTcuMTU4LjQzNS40NTIuNzU2LjI5NC4zMi42OTYuNWMuNDAyLjE4LjU2Ni4xNzguODkxLjE3OHEuNDg5IDAgLjg5NS0uMTc5Yy40MDYtLjE3OS41MDUtLjI4NS43MDEtLjQ5OXEuMjk0LS4zMjEuNDUzLS43NTYuMTU4LS40MzUuMTU4LS45NTdhMi43IDIuNyAwIDAgMC0uMTU4LS45MzQgMi4zIDIuMyAwIDAgMC0uNDQ4LS43NSAyLjEgMi4xIDAgMCAwLS42OTctLjUwNSAyLjIgMi4yIDAgMCAwLS45MDQtLjE4M000Ni4zMjUgMy4xNWwxLjk5MyA0LjUzNiAxLjk5My00LjUzNmgxLjY3MWwtMy45NjIgOC45NjZhMS45NzUgMS45NzUgMCAwIDEtMi40NyAxLjA3NWwtLjE0Mi0uMDU4LS41My0uMjRoLS4wMDNsLjE5LS40MzEuNDI4LS45NzMuMjE5LjFhLjgxLjgxIDAgMCAwIDEuMDI1LS4zMmwuMDUyLS4xLjAwNC0uMDEuNjEzLTEuNDAyLjAyLS4wNDQuMDU3LS4xMjUtMi44MjktNi40Mzh6TTM5LjIxLjAwMnYzLjc4NGEzLjQ1IDMuNDUgMCAwIDEgMi0uNjM4YzEuOTI4IDAgMy40OTYgMS41ODggMy40OTYgMy41NDFzLTEuNTY4IDMuNTQtMy40OTYgMy41NGEzLjQ1IDMuNDUgMCAwIDEtMi0uNjM4di42NGgtMS41MzJWLjAwMnptLTIuODE4IDB2MTAuMjNoLTEuNTNWLjAwMnptLTYuMDE2IDMuMTQ2YzEuOTI4IDAgMy40OTYgMS41ODggMy40OTYgMy41NCAwIDEuOTUzLTEuNTY4IDMuNTQxLTMuNDk2IDMuNTQxLTEuOTI5IDAtMy40OTctMS41ODgtMy40OTctMy41NCAwLTEuOTUzIDEuNTY4LTMuNTQxIDMuNDk3LTMuNTQxTTIxLjA1NyAwYzIuNzgyIDAgNS4wNDYgMi4yOTIgNS4wNDYgNS4xMXMtMi4yNjQgNS4xMS01LjA0NiA1LjExaC0zLjY0NVYwem0tNi43IDB2MTAuMjJoLTEuNDljLTIuNzggMC01LjA0NS0yLjI5NS01LjA0NS01LjExIDAtMi43NDMgMi4xNTEtNC45OTIgNC44MzMtNS4xMDVMMTIuODY4IDB6TTEuNDg4IDBjMi43OCAwIDUuMDQ2IDIuMjk1IDUuMDQ2IDUuMTEgMCAyLjc0My0yLjE1MiA0Ljk5MS00LjgzMyA1LjEwNWwtLjIxMy4wMDRoLTEuNDlWMHptMzkuNzIgNC41NDFjLS45MjYgMC0xLjcxOS42MS0xLjk5OSAxLjQ2MWEyLjE1IDIuMTUgMCAwIDAgMCAxLjM0NiAyLjExIDIuMTEgMCAwIDAgMiAxLjQ2M2MxLjE1NyAwIDIuMTA4LS45NSAyLjEwOC0yLjEzNSAwLTEuMTcyLS45NTEtMi4xMzUtMi4xMDgtMi4xMzV6bS0xMC44MzMgMGMtMS4xNTcgMC0yLjEwOS45NS0yLjEwOSAyLjEzNCAwIDEuMTcyLjkzOSAyLjEzNSAyLjEwOSAyLjEzNSAxLjE1NyAwIDIuMTA4LS45NSAyLjEwOC0yLjEzNSAwLTEuMTcxLS45NTEtMi4xMzUtMi4xMDgtMi4xMzV6bS05LjMyLTIuOTkyaC0yLjExNFY4LjY3aDIuMTE1YzEuOTM3IDAgMy41MTYtMS41OTkgMy41MTYtMy41NnMtMS41OC0zLjU2LTMuNTE2LTMuNTZ6Ii8+PC9zdmc+",
    av1: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNzggMTU1Ij48ZGVmcz48bWFzayBpZD0ibSI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0id2hpdGUiLz48cGF0aCBmaWxsPSJibGFjayIgZD0ibTIwOC42IDUyLjUtOC40IDguMy04LjktOS40IDE5LjUtMTloMTMuNnY0OC4yaC0xNS44eiIvPjwvbWFzaz48L2RlZnM+PGcgbWFzaz0idXJsKCNtKSI+PHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBkPSJNMjc4IDExMi43IDIxMy4yIDBsLTY0LjcgMTEyLjd6IiBvcGFjaXR5PSIuNiIvPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0ibTI3OCAxMTIuNy0yNC4zLTI4LjItMTYuMiAyOC4yek0xNzIuOCA4NC41bC0yNC4zIDI4LjJIMTg5eiIgb3BhY2l0eT0iLjMiLz48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Im0yMTMuMiAxNTUgNDAuNS03MC41aC04MC45ek0zNS42IDgyLjJoMTguMmwtOS4xLTI4LjN6bTI0LjUgMjAuMkgyOS40bC0zLjEgMTAuNEgwbDI5LjUtODAuNEg2MGwyOS41IDgwLjRINjMuMnpNNzMuNiAzMi40aDI3LjVsMTcuMiA1NC4xIDE3LjMtNTQuMWgyNy41bC0yOS41IDgwLjRoLTMwLjV6Ii8+PC9nPjwvc3ZnPg==",
    "dolby-atmos":
      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MiIgaGVpZ2h0PSIyMiIgdmlld0JveD0iMCAwIDUyIDIyIj48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Im0xMi4xMTQgMTQuODcgMy4wMTQgNy4wODVoLTEuNDIzbC0uNjUzLTEuNjJIMTAuMDJsLS42MzIgMS42Mkg3Ljk5M2wzLjA0NC03LjA4NHptOC4zODYgMHYxLjEwMWgtMi4xNDR2NS45ODRIMTcuMTF2LTUuOTg0aC0yLjE0NHYtMS4xem0zLjUgMCAxLjgxOCA1LjAzNGguMDNsMS43OTgtNS4wMzNoMS45NTZ2Ny4wODRoLTEuMjM1di01LjY5M2gtLjAybC0yLjEyNCA1LjY5M2gtLjg3bC0yLjA5NC01LjY5M2gtLjAydjUuNjkzaC0xLjE4NnYtNy4wODR6bTEwLjY1MiAwcS43OCAwIDEuNDM4LjI0OC42NTguMjQ3IDEuMTM4LjcwNXQuNzQ4IDEuMTFxLjI2Ny42NTEuMjY4IDEuNDYgMCAuNzkyLS4yNjggMS40NDRhMy4zIDMuMyAwIDAgMS0uNzQ4IDEuMTIzcS0uNDguNDcxLTEuMTM4LjczM2EzLjkgMy45IDAgMCAxLTEuNDM4LjI2MnEtLjc3MiAwLTEuNDI1LS4yNjJhMy4zNSAzLjM1IDAgMCAxLTEuMTI4LS43MzMgMy40IDMuNCAwIDAgMS0uNzQzLTEuMTIzIDMuOCAzLjggMCAwIDEtLjI2OC0xLjQ0M3EwLS44MS4yNjgtMS40NjJhMy4yIDMuMiAwIDAgMSAuNzQzLTEuMTEgMy4zIDMuMyAwIDAgMSAxLjEyOC0uNzA0IDQgNCAwIDAgMSAxLjQyNS0uMjQ3em03LjM1OS4wMTJxLjUwNiAwIDEuMDI2LjE4dC45MDUuNTQxbC0uNzY5Ljg1NGExLjQ0IDEuNDQgMCAwIDAtLjUzLS40MTIgMS41NyAxLjU3IDAgMCAwLTEuMTAxLS4xMTQgMS4zIDEuMyAwIDAgMC0uMzc1LjE2MS45LjkgMCAwIDAtLjI3Ny4yODUuOC44IDAgMCAwLS4xMDcuNDIyLjc2Ljc2IDAgMCAwIC4wOTMuMzkuOS45IDAgMCAwIC4yNTguMjc1cS4xNjUuMTEzLjM5OC4yLjIzNS4wODQuNTE2LjE3LjMxOS4xMDUuNjYuMjM3LjM0My4xMzMuNjMuMzUyLjI4NS4yMTguNDY4LjU1dC4xODMuODI2cTAgLjU0MS0uMTk3Ljk0NGExLjk0IDEuOTQgMCAwIDEtLjUyNS42NyAyLjMgMi4zIDAgMCAxLS43NjkuMzk5IDMuMiAzLjIgMCAwIDEtLjkyOC4xMzIgMy40IDMuNCAwIDAgMS0xLjI2NS0uMjQycS0uNjE5LS4yNDEtMS4wMTMtLjcxN2wuODQ0LS43OTdhMS43IDEuNyAwIDAgMCAuNjUxLjU0MXEuNDA4LjIuODAyLjIuMjA2IDAgLjQyMi0uMDUzLjIxNS0uMDUxLjM4OS0uMTc1YTEgMSAwIDAgMCAuMjgtLjMwOS45LjkgMCAwIDAgLjEwOS0uNDYuNzYuNzYgMCAwIDAtLjEyMi0uNDQyIDEuMSAxLjEgMCAwIDAtLjMyOC0uMzAzcS0uMjA2LS4xMjktLjQ4OC0uMjIzbC0uNTktLjJxLS4zLS4wOTQtLjYtLjIyOC0uMy0uMTMyLS41NC0uMzVhMS43IDEuNyAwIDAgMS0uMzg4LS41MzdxLS4xNS0uMzE4LS4xNS0uNzkzIDAtLjUxMy4yMS0uODgzLjIxMi0uMzY5LjU1NC0uNjEyLjM0Mi0uMjQyLjc3OC0uMzYuNDM1LS4xMi44ODYtLjEyem0tNy4zNSAxLjE0YTIuMDggMi4wOCAwIDAgMC0xLjU5Mi42ODcgMi4zIDIuMyAwIDAgMC0uNDQ3Ljc1MSAyLjcgMi43IDAgMCAwLS4xNTkuOTM0cTAgLjUyMi4xNTkuOTU3LjE1OC40MzUuNDUyLjc1Ni4yOTQuMzIuNjk2LjVjLjQwMi4xOC41NjYuMTc4Ljg5MS4xNzhxLjQ4OSAwIC44OTYtLjE3OWEyLjEgMi4xIDAgMCAwIC43LS40OTlxLjI5NC0uMzIxLjQ1My0uNzU2LjE1OC0uNDM1LjE1OC0uOTU3YTIuNyAyLjcgMCAwIDAtLjE1OC0uOTM0IDIuMyAyLjMgMCAwIDAtLjQ0OC0uNzUgMi4xIDIuMSAwIDAgMC0uNjk2LS41MDUgMi4yIDIuMiAwIDAgMC0uOTA1LS4xODNtLTIzLjEyLjM1LTEuMDk3IDIuODgyaDIuMTc0ek00Ni4zMjUgMy4xNWwxLjk5MyA0LjUzNyAxLjk5My00LjUzN2gxLjY3MWwtMy45NjIgOC45NjZhMS45NzMgMS45NzMgMCAwIDEtMi42MTIgMS4wMTdsLS41My0uMjRoLS4wMDNsLjE5LS40MzIuNDI3LS45NzIuMjIuMWEuODEzLjgxMyAwIDAgMCAxLjA3Ny0uNDJsLjAwNC0uMDEuNjEzLTEuNDAyLjAyLS4wNDQuMDU2LS4xMjUtMi44MjgtNi40Mzh6TTM2LjM5Mi4wMDJ2MTAuMjNoLTEuNTNWLjAwMnptMi44MTggMHYzLjc4NGEzLjQ1IDMuNDUgMCAwIDEgMi0uNjM4YzEuOTI4IDAgMy40OTYgMS41ODggMy40OTYgMy41NHMtMS41NjggMy41NDItMy40OTYgMy41NDJhMy40NSAzLjQ1IDAgMCAxLTItLjYzOXYuNjRoLTEuNTMyVi4wMDJ6bS04LjgzNCAzLjE0NmMxLjkyOCAwIDMuNDk2IDEuNTg4IDMuNDk2IDMuNTRzLTEuNTY4IDMuNTQxLTMuNDk2IDMuNTQxYy0xLjkyOSAwLTMuNDk3LTEuNTg4LTMuNDk3LTMuNTRzMS41NjgtMy41NDEgMy40OTctMy41NDFNMS40ODkgMGMyLjc4IDAgNS4wNDUgMi4yOTUgNS4wNDUgNS4xMXMtMi4yNjYgNS4xMS01LjA0NSA1LjExSDBWMHptMTIuODY3IDB2MTAuMjJoLTEuNDg4Yy0yLjc4IDAtNS4wNDYtMi4yOTUtNS4wNDYtNS4xMVMxMC4wODggMCAxMi44NjggMHptNi43IDBjMi43ODMgMCA1LjA0NyAyLjI5MiA1LjA0NyA1LjExcy0yLjI2NCA1LjExLTUuMDQ2IDUuMTFoLTMuNjQ1VjB6bTkuMzIgNC41NGMtMS4xNTcgMC0yLjEwOS45NS0yLjEwOSAyLjEzNSAwIDEuMTcyLjkzOSAyLjEzNSAyLjEwOSAyLjEzNSAxLjE1NyAwIDIuMTA4LS45NSAyLjEwOC0yLjEzNSAwLTEuMTcxLS45NTEtMi4xMzUtMi4xMDgtMi4xMzVtMTAuODM0IDBjLS45MjcgMC0xLjcyLjYxLTIgMS40NjJhMi4xNSAyLjE1IDAgMCAwIDAgMS4zNDYgMi4xMSAyLjExIDAgMCAwIDIgMS40NjNjMS4xNTcgMCAyLjEwOC0uOTUgMi4xMDgtMi4xMzUgMC0xLjE3Mi0uOTUxLTIuMTM1LTIuMTA4LTIuMTM1ek0yMS4wNTcgMS41NWgtMi4xMTV2Ny4xMmgyLjExNWMxLjkzNyAwIDMuNTE2LTEuNTk5IDMuNTE2LTMuNTZzLTEuNTgtMy41Ni0zLjUxNi0zLjU2Ii8+PC9zdmc+",
    "dolby-audio":
      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MiIgaGVpZ2h0PSIyMiIgdmlld0JveD0iMCAwIDUyIDIyIj48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Im00Ni4zMjUgMy4xNSAxLjk5MyA0LjUzNiAxLjk5My00LjUzNmgxLjY3MWwtMy45NjIgOC45NjZhMS45NzUgMS45NzUgMCAwIDEtMi40NyAxLjA3NWwtLjE0Mi0uMDU4LS41My0uMjRoLS4wMDNsLjE5LS40MzEuNDI4LS45NzMuMjE5LjFhLjgxLjgxIDAgMCAwIDEuMDI1LS4zMmwuMDUyLS4xLjAwNC0uMDEuNjEzLTEuNDAyLjAyLS4wNDQuMDU3LS4xMjUtMi44MjktNi40Mzh6TTM5LjIxLjAwMnYzLjc4NGEzLjQ1IDMuNDUgMCAwIDEgMi0uNjM4YzEuOTI4IDAgMy40OTYgMS41ODggMy40OTYgMy41NDFzLTEuNTY4IDMuNTQtMy40OTYgMy41NGEzLjQ1IDMuNDUgMCAwIDEtMi0uNjM4di42NGgtMS41MzJWLjAwMnptLTIuODE4IDB2MTAuMjNoLTEuNTNWLjAwMnptLTYuMDE2IDMuMTQ2YzEuOTI4IDAgMy40OTYgMS41ODggMy40OTYgMy41NCAwIDEuOTUzLTEuNTY4IDMuNTQxLTMuNDk2IDMuNTQxLTEuOTI5IDAtMy40OTctMS41ODgtMy40OTctMy41NCAwLTEuOTUzIDEuNTY4LTMuNTQxIDMuNDk3LTMuNTQxTTIxLjA1NyAwYzIuNzgyIDAgNS4wNDYgMi4yOTIgNS4wNDYgNS4xMXMtMi4yNjQgNS4xMS01LjA0NiA1LjExaC0zLjY0NVYwem0tNi43IDB2MTAuMjJoLTEuNDljLTIuNzggMC01LjA0NS0yLjI5NS01LjA0NS01LjExIDAtMi43NDMgMi4xNTEtNC45OTIgNC44MzMtNS4xMDVMMTIuODY4IDB6TTEuNDg4IDBjMi43OCAwIDUuMDQ2IDIuMjk1IDUuMDQ2IDUuMTEgMCAyLjc0My0yLjE1MiA0Ljk5MS00LjgzMyA1LjEwNWwtLjIxMy4wMDRoLTEuNDlWMHptMzkuNzIgNC41NDFjLS45MjYgMC0xLjcxOS42MS0xLjk5OSAxLjQ2MWEyLjE1IDIuMTUgMCAwIDAgMCAxLjM0NiAyLjExIDIuMTEgMCAwIDAgMiAxLjQ2M2MxLjE1NyAwIDIuMTA4LS45NSAyLjEwOC0yLjEzNSAwLTEuMTcyLS45NTEtMi4xMzUtMi4xMDgtMi4xMzV6bS0xMC44MzMgMGMtMS4xNTcgMC0yLjEwOS45NS0yLjEwOSAyLjEzNCAwIDEuMTcyLjkzOSAyLjEzNSAyLjEwOSAyLjEzNSAxLjE1NyAwIDIuMTA4LS45NSAyLjEwOC0yLjEzNSAwLTEuMTcxLS45NTEtMi4xMzUtMi4xMDgtMi4xMzV6bS05LjMyLTIuOTkyaC0yLjExNFY4LjY3aDIuMTE1YzEuOTM3IDAgMy41MTYtMS41OTkgMy41MTYtMy41NnMtMS41OC0zLjU2LTMuNTE2LTMuNTZ6Ii8+PHRleHQgeD0iOS43MiIgeT0iMjAuNDgiIGZpbGw9ImN1cnJlbnRDb2xvciIgZm9udC1mYW1pbHk9IidBdmVuaXJOZXh0LURlbWlCb2xkJywgJ0F2ZW5pck5leHRMVFByby1NZWRpdW0nLCAnQXZlbmlyIE5leHQnLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjkuNSIgZm9udC13ZWlnaHQ9IjYwMCIgbGV0dGVyLXNwYWNpbmc9Ii43IiB0cmFuc2Zvcm09InNjYWxlKDEgMS4wNSkiPkFVRElPPC90ZXh0Pjwvc3ZnPg==",
    "dts-x":
      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjQwLjkgMzcgMTM5IDQwLjgiPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+LnN0MHtmaWxsOm5vbmU7fQoJLnN0MXtmaWxsOmN1cnJlbnRDb2xvcjt9PC9zdHlsZT48cGF0aCBkPSJtMTI4LjkgNjQuNS00LjUtNC41Yy0uNi0uNi0uOS0xLjQtLjktMi4zIDAtMS44IDEuNC0zLjIgMy4yLTMuMmgyLjJjLjcgMCAxLjMtLjYgMS4zLTEuM3YtMi40aC0xOC40Yy0zLjEgMC01LjYgMi41LTUuNiA1LjYgMCAxLjYuNiAzIDEuNiA0bDQuNSA0LjVjLjYuNi45IDEuNC45IDIuMyAwIDEuOC0xLjQgMy4yLTMuMiAzLjJoLTYuOWMtMi43IDAtNC45LTIuMi00LjktNC45VjU0LjZoNC4yYy43IDAgMS4zLS42IDEuMy0xLjN2LTIuNGgtNS41di0xMmwtMTQuNCA2LjN2NS43aC03VjM3SDY2Yy0yLjEgMC0zLjcgMS43LTMuNyAzLjd2MTBoLTcuN2MtOCAwLTEzLjcgNC40LTEzLjcgMTEuNyAwIDYuNSA2LjYgMTEuNiAxMy43IDExLjZoMTcuMmMyLjcgMCA0LjktMi4yIDQuOS00LjlWNTQuNWg3VjY0YzAgNS40IDMuMyAxMCA5LjkgMTBoMzEuMmMzLjEgMCA1LjYtMi41IDUuNi01LjYuMS0xLjUtLjUtMi45LTEuNS0zLjltLTY2LjYgNS4xYzAgLjQtLjQuOC0uOC44SDYxYy01IDAtNi45LTMuNS02LjktNy45LjEtNC42IDItNy45IDYuOS03LjloMS4zek0xNTUuNSA1NS4ybC00LjUtNC40aC0xMi40bDEwLjYgMTAuN3pNMTc5LjkgNDcuMUgxNjhsLTMwLjcgMzAuN2gxMS45bDguMi04LjIgNC40IDQuNWgxMi41bC0xMC43LTEwLjd6IiBjbGFzcz0ic3QxIi8+PC9zdmc+",
    dts: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHJvbGU9ImltZyIgdmlld0JveD0iMCA3IDI0IDEwIj48dGl0bGU+RFRTPC90aXRsZT48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Im0yMy41NTYgMTQuMzQ2LTEuMTk0LTEuMTczYS44NDEuODQxIDAgMCAxIC42MDQtMS40NDVoLjU5YS4zNDYuMzQ2IDAgMCAwIC4zNDktLjM0M3YtLjYzNkgxOC45N2ExLjQ5IDEuNDkgMCAwIDAtMS41MDcgMS40Nzd2LjAwM2MwIC4zOTYuMTYuNzc1LjQ0NCAxLjA1bDEuMjAxIDEuMThhLjg0MS44NDEgMCAwIDEtLjYwNCAxLjQ0NmgtMS44NDlhMS4zMDYgMS4zMDYgMCAwIDEtMS4zMTctMS4yOTR2LTIuODc2aDEuMTM1YS4zNDYuMzQ2IDAgMCAwIC4zNS0uMzQzdi0uNjM2aC0xLjQ4NVY3LjU4N2wtMy44NjYgMS42NnYxLjQ5NGgtMS44N1Y3LjEyM2gtMi44N2EuOTg2Ljk4NiAwIDAgMC0uOTk3Ljk4djIuNjM4SDMuNjdDMS41MTQgMTAuNzQxIDAgMTEuODkzIDAgMTMuODFjMCAxLjcxIDEuNzc2IDMuMDY4IDMuNjc2IDMuMDY4aDQuNjE1YTEuMzA2IDEuMzA2IDAgMCAwIDEuMzE4LTEuMjk0di0zLjg1NWgxLjg2M3YyLjUwM2MwIDEuNDIzLjg3NCAyLjY0NiAyLjY1IDIuNjQ2aDguMzcxQTEuNDkgMS40OSAwIDAgMCAyNCAxNS40di0uMDAzYTEuNDQgMS40NCAwIDAgMC0uNDQ0LTEuMDUxTTUuNzI5IDE1LjY4M2EuMjE3LjIxNyAwIDAgMS0uMjE5LjIxNGgtLjEzYy0xLjM0IDAtMS44MzUtLjkwOC0xLjg1LTIuMDg4LjAxNS0xLjIxNi41MjUtMi4wODggMS44NS0yLjA4OGguMzQ5eiIvPjwvc3ZnPg==",
  })
  const POSTER_BADGE_LABELS = Object.freeze({
    "4k": "4K",
    hd: "HD",
    sd: "SD",
    imax: "IMAX",
    "hdr10-plus": "HDR10+",
    hdr: "HDR",
    "dolby-vision": "Dolby Vision",
    av1: "AV1",
    "dolby-atmos": "Dolby Atmos",
    "dolby-audio": "Dolby Audio",
    "dts-x": "DTS:X",
    dts: "DTS",
  })
  const POSTER_BADGE_ASPECT_RATIOS = Object.freeze({
    "4k": "26 / 15",
    hd: "26 / 15",
    sd: "26 / 15",
    imax: "489.22 / 94.727",
    "hdr10-plus": "54 / 15",
    hdr: "34 / 15",
    "dolby-vision": "52 / 22",
    av1: "278 / 155",
    "dolby-atmos": "52 / 22",
    "dolby-audio": "52 / 22",
    "dts-x": "139 / 40.8",
    dts: "24 / 10",
  })
  const IMDB_PRIMARY_LOGO_DATA_URI =
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjEzMCAxMjIgNjYzIDI1NiI+PHBhdGggZmlsbD0iI2Y1YzUxOCIgZD0iTTE5NyAxMjIuN3YyNTUuNGgtNjYuMlYxMjIuN3ptMTQxLjQgMC0xNS4zIDExOS40LTkuNC02NC45Yy0yLjgtMjAuOC01LjQtMzktOC01NC41aC04NS45djI1NS40aDU4LjFsLjMtMTY4LjYgMjQuNCAxNjguNkgzNDRsMjMuMy0xNzIuM3YxNzIuM2g1OC4xVjEyMi43aC04Ni43Wm0xMDkuMyAyNTUuNFYxMjIuN2g0OS40YzMyLjEgMCA1MC42IDEuNSA2MS45IDQuNXMxOS45IDcuOCAyNS43IDE0LjVjNiA2LjcgOS43IDE0LjIgMTEuMSAyMi40IDEuNCA4LjMgMi40IDI0LjUgMi40IDQ4Ljd2ODkuNmMwIDIyLjktMS4yIDM4LjMtMy41IDQ1LjktMi4xIDcuNy01LjkgMTMuNy0xMS4zIDE4LjEtNS4zIDQuNS0xMiA3LjQtMTkuOCA5LjItNy45IDEuNy0xOS44IDIuNi0zNS43IDIuNmgtODAuNFptNjYuMi0yMTEuN1YzMzRjOS41IDAgMTUuNC0xLjkgMTcuNi01LjdzMy40LTE0LjIgMy40LTMxLjN2LTk4LjljMC0xMS41LS40LTE4LjktMS4xLTIyLjJzLTIuNS01LjctNS4xLTcuMmMtMi42LTEuNi03LjYtMi4zLTE0LjctMi4zWm0xNzAuOC00My43djgzLjFjNS4zLTYuMSAxMS4zLTEwLjYgMTcuNy0xMy42IDYuNi0zLjEgMTYuMy00LjYgMjMuOS00LjZzMTYuNCAxLjQgMjIuOSA0LjFjNi40IDIuNyAxMS4zIDYuNiAxNC43IDExLjUgMy4zIDUgNS40IDkuOCA2LjEgMTQuNXMxIDE0LjcgMSAzMC4ydjcxLjdjMCAxNS4yLTEgMjYuNi0zLjEgMzQuMi0yIDcuNC02LjggMTQtMTQuNSAxOS40LTcuNiA1LjYtMTYuNyA4LjMtMjcuMSA4LjNzLTE3LjItMS42LTIzLjgtNC44Yy02LjYtMy40LTEyLjUtOC4yLTE3LjgtMTQuN2wtNC4yIDE2LjJoLTU5LjdWMTIyLjd6bTIyLjQgMTI4YzAtMTAuOC0uNy0xNy44LTIuMS0yMS4yLTEuNC0zLjItNi44LTUtMTAuOS01cy02LjQgMS41LTcuNyA0LjNjLTEuMSAzLTEuNyAxMC4yLTEuNyAyMS44djY3LjVjMCAxMS4zLjcgMTguNCAyIDIxLjUgMS40IDMuMiA0IDQuNyA3LjkgNC43czkuNC0xLjYgMTAuNy00LjhjMS4yLTMuMiAxLjktMTEuMSAxLjktMjMuNHYtNjUuNVoiLz48L3N2Zz4="

  // src/shared/quality.js
  const QUALITY_LABELS = Object.freeze({
    all: "All",
    "4k": "4K (2160p)",
    hd: "HD (1080p)",
    sd: "SD (720p or 480p)",
  })
  const RELEASE_QUALITY_PATTERNS = [
    ["4k", /(?:^|[^A-Z0-9])(?:2160P|DS4K|RM4K|4K)(?=$|[^A-Z0-9])/i],
    ["hd", /(?:^|[^A-Z0-9])1080P(?=$|[^A-Z0-9])/i],
    ["sd", /(?:^|[^A-Z0-9])(?:720P|480P)(?=$|[^A-Z0-9])/i],
  ]
  const getReleaseQuality = (value) => {
    return (
      RELEASE_QUALITY_PATTERNS.find(([, pattern]) =>
        pattern.test(value)
      )?.[0] || "unknown"
    )
  }

  // src/shared/storage.js
  const storageGet = (key) => {
    try {
      return window.localStorage.getItem(key)
    } catch {
      return null
    }
  }
  const storageSet = (key, value) => {
    try {
      if (value === null || value === undefined) {
        window.localStorage.removeItem(key)
      } else {
        window.localStorage.setItem(key, String(value))
      }
    } catch {}
  }
  let openedReleasesKey = ""
  const initStorage = (context) => {
    openedReleasesKey = context.openedReleasesKey
  }
  const getOpenedReleases = () => {
    try {
      const raw = storageGet(openedReleasesKey)
      if (!raw) {
        return new Set()
      }
      const parsed = JSON.parse(raw)
      return new Set(Array.isArray(parsed) ? parsed : [])
    } catch {
      return new Set()
    }
  }
  const saveOpenedRelease = (...identifiers) => {
    const valid = identifiers.filter(
      (id) => Boolean(id) && typeof id === "string"
    )
    if (!valid.length) {
      return
    }
    const items = getOpenedReleases()
    for (const identifier of valid) {
      items.delete(identifier)
      items.add(identifier)
    }
    storageSet(openedReleasesKey, JSON.stringify([...items].slice(-1e3)))
  }
  const markReleaseOpened = (row, item) => {
    if (row) {
      row.dataset.userpatchOpened = "true"
    }
    if (item) {
      item.dataset.userpatchOpened = "true"
    }
  }
  const isReleaseOpened = (identifier, linksRoot, openedReleases) => {
    if (identifier && openedReleases.has(identifier)) {
      return true
    }
    if (linksRoot) {
      for (const anchor of linksRoot.querySelectorAll("a[href]")) {
        if (openedReleases.has(anchor.href)) {
          return true
        }
      }
    }
    return false
  }

  // src/shared/icons.js
  const LUCIDE_ICON_TEMPLATES = new Map()
  const createLucideIcon$1 = (name, shapes, decorate) => {
    const cached = LUCIDE_ICON_TEMPLATES.get(name)
    if (cached) {
      return cached.cloneNode(true)
    }
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    svg.setAttribute("width", "24")
    svg.setAttribute("height", "24")
    svg.setAttribute("viewBox", "0 0 24 24")
    svg.setAttribute("fill", "none")
    svg.setAttribute("stroke", "currentColor")
    svg.setAttribute("stroke-width", "2")
    svg.setAttribute("stroke-linecap", "round")
    svg.setAttribute("stroke-linejoin", "round")
    svg.setAttribute("aria-hidden", "true")
    svg.setAttribute("focusable", "false")
    if (decorate) {
      decorate(svg, name)
    }
    for (const [tagName, attributes] of shapes[name] || []) {
      const shape = document.createElementNS(
        "http://www.w3.org/2000/svg",
        tagName
      )
      for (const [attribute, value] of Object.entries(attributes)) {
        shape.setAttribute(attribute, value)
      }
      svg.append(shape)
    }
    LUCIDE_ICON_TEMPLATES.set(name, svg)
    return svg.cloneNode(true)
  }

  // src/hdhub4u/icons.js
  const LUCIDE_ICON_SHAPES = {
    info: [
      [
        "circle",
        {
          cx: "12",
          cy: "12",
          r: "10",
        },
      ],
      ["path", { d: "M12 16v-4" }],
      ["path", { d: "M12 8h.01" }],
    ],
    "arrow-left": [
      ["path", { d: "m12 19-7-7 7-7" }],
      ["path", { d: "M19 12H5" }],
    ],
    "arrow-right": [
      ["path", { d: "M5 12h14" }],
      ["path", { d: "m12 5 7 7-7 7" }],
    ],
    "audio-lines": [
      ["path", { d: "M2 10v3" }],
      ["path", { d: "M6 6v11" }],
      ["path", { d: "M10 3v18" }],
      ["path", { d: "M14 8v7" }],
      ["path", { d: "M18 5v13" }],
      ["path", { d: "M22 10v3" }],
    ],
    "chevron-down": [["path", { d: "m6 9 6 6 6-6" }]],
    "external-link": [
      ["path", { d: "M15 3h6v6" }],
      ["path", { d: "M10 14 21 3" }],
      [
        "path",
        { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" },
      ],
    ],
    film: [
      [
        "rect",
        {
          width: "18",
          height: "18",
          x: "3",
          y: "3",
          rx: "2",
        },
      ],
      ["path", { d: "M7 3v18" }],
      ["path", { d: "M3 7.5h4" }],
      ["path", { d: "M3 12h18" }],
      ["path", { d: "M3 16.5h4" }],
      ["path", { d: "M17 3v18" }],
      ["path", { d: "M17 7.5h4" }],
      ["path", { d: "M17 16.5h4" }],
    ],
    "file-archive": [
      [
        "path",
        {
          d: "M13.659 22H18a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v11.5",
        },
      ],
      ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5" }],
      ["path", { d: "M8 12v-1" }],
      ["path", { d: "M8 18v-2" }],
      ["path", { d: "M8 7V6" }],
      [
        "circle",
        {
          cx: "8",
          cy: "20",
          r: "2",
        },
      ],
    ],
    "file-play": [
      [
        "path",
        {
          d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
        },
      ],
      ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5" }],
      [
        "path",
        {
          d: "M15.033 13.44a.647.647 0 0 1 0 1.12l-4.065 2.352a.645.645 0 0 1-.968-.56v-4.704a.645.645 0 0 1 .967-.56z",
        },
      ],
    ],
    download: [
      ["path", { d: "M12 15V3" }],
      ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }],
      ["path", { d: "m7 10 5 5 5-5" }],
    ],
    "loader-2": [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56" }]],
    menu: [
      ["path", { d: "M4 5h16" }],
      ["path", { d: "M4 12h16" }],
      ["path", { d: "M4 19h16" }],
    ],
    play: [
      [
        "path",
        {
          d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",
        },
      ],
    ],
    search: [
      ["path", { d: "m21 21-4.34-4.34" }],
      [
        "circle",
        {
          cx: "11",
          cy: "11",
          r: "8",
        },
      ],
    ],
    x: [
      ["path", { d: "M18 6 6 18" }],
      ["path", { d: "m6 6 12 12" }],
    ],
    zap: [
      [
        "path",
        {
          d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
        },
      ],
    ],
  }
  const createLucideIcon = (name) =>
    createLucideIcon$1(name, LUCIDE_ICON_SHAPES, (svg, iconName) => {
      svg.dataset.userpatchLucideIcon = iconName
    })

  // src/hdhub4u/download-rows.js
  const getDetailBadgeNames = (data) => {
    const pool = [
      data.title,
      data.metaRows.map(([, value]) => value).join(" "),
      ...data.releases.map((row) => `${row.title} ${row.size || ""}`),
      ...data.episodes.flatMap((episode) =>
        episode.groups.map(
          (group) =>
            `${group.quality} ${group.links.map((link) => link.tooltip).join(" ")}`
        )
      ),
    ]
      .join(" ")
      .toUpperCase()
    const hasToken = (token) =>
      new RegExp(`(?:^|[^A-Z0-9])${token}(?=$|[^A-Z0-9])`).test(pool)
    const hasAnyToken = (tokens) => tokens.some(hasToken)
    const badges = []
    for (const [badge, pattern] of RELEASE_QUALITY_PATTERNS) {
      if (pattern.test(pool)) {
        badges.push(badge)
      }
    }
    if (hasToken("IMAX")) {
      badges.push("imax")
    }
    if (hasAnyToken(["HDR10P", "HDR10PLUS", "HDRP10\\+", "HDR10\\+"])) {
      badges.push("hdr10-plus")
    } else if (hasAnyToken(["HDR", "HDR10"])) {
      badges.push("hdr")
    }
    if (hasToken("AV1")) {
      badges.push("av1")
    }
    const hasDolbyVision = hasAnyToken(["DV", "DOVI"])
    const hasAtmos = hasToken("ATMOS")
    const hasDtsX = /(?:^|[^A-Z0-9])DTS(?:[:._ -]*X)(?=$|[^A-Z0-9])/.test(pool)
    const hasDts = hasToken("DTS") || hasDtsX
    const hasDolby =
      hasAnyToken(["DOLBY", "AC3", "EAC3"]) ||
      /(?:^|[^A-Z0-9])DDP?(?=$|[^A-Z0-9])/.test(pool) ||
      /(?:^|[^A-Z0-9])DD[0-9]/.test(pool)
    if (hasDolbyVision) {
      badges.push("dolby-vision")
    }
    if (hasAtmos) {
      badges.push("dolby-atmos")
    } else if (hasDolby && !hasDts) {
      badges.push("dolby-audio")
    }
    if (hasDtsX) {
      badges.push("dts-x")
    } else if (hasDts) {
      badges.push("dts")
    }
    return badges
  }
  const buildPosterBadges = (badges) => {
    const list = document.createElement("div")
    list.className = "userpatch-poster-badges"
    list.setAttribute("role", "list")
    list.setAttribute("aria-label", "Release format badges")
    for (const name of badges) {
      const item = document.createElement("span")
      item.className = "userpatch-media-badge"
      item.setAttribute("role", "listitem")
      item.title = POSTER_BADGE_LABELS[name]
      const image = document.createElement("img")
      image.src = USERPATCH_BADGE_DATA[name]
      image.alt = POSTER_BADGE_LABELS[name]
      image.width = 52
      image.height = 22
      image.decoding = "async"
      image.style.aspectRatio = POSTER_BADGE_ASPECT_RATIOS[name]
      item.append(image)
      list.append(item)
    }
    return list
  }
  const buildReleaseRow = (row, openedReleases) => {
    const item = document.createElement("a")
    item.className = "userpatch-release-item"
    item.href = row.href
    item.target = "_blank"
    item.rel = "noopener noreferrer nofollow"
    item.dataset.userpatchFilename = row.title
    item.dataset.userpatchQuality = getReleaseQuality(
      `${row.title} ${row.size || ""}`
    )
    const rowLayout = document.createElement("div")
    rowLayout.className = "userpatch-release-row"
    if (isReleaseOpened(row.href, null, openedReleases)) {
      markReleaseOpened(rowLayout, item)
    }
    const copy = document.createElement("div")
    copy.className = "userpatch-release-copy"
    const title = document.createElement("div")
    title.className = "userpatch-release-file-title"
    title.textContent = row.title
    copy.append(title)
    const meta = document.createElement("div")
    meta.className = "userpatch-release-meta"
    if (row.external) {
      const source = document.createElement("span")
      source.textContent = "More formats on 4KHDHub"
      meta.append(source)
    } else if (row.size) {
      const size = document.createElement("span")
      size.textContent = row.size
      meta.append(size)
    }
    if (row.audio) {
      const audioBadge = document.createElement("span")
      audioBadge.className = "userpatch-series-language-badge"
      audioBadge.setAttribute("aria-label", `Audio: ${row.audio}`)
      const audioIcon = createLucideIcon("audio-lines")
      audioIcon.classList.add("userpatch-series-language-icon")
      const audioText = document.createElement("span")
      audioText.className = "userpatch-series-language-text"
      audioText.textContent = row.audio
      audioBadge.append(audioIcon, audioText)
      meta.append(audioBadge)
    }
    if (meta.childElementCount) {
      copy.append(meta)
    }
    const action = document.createElement("span")
    action.className = "userpatch-release-action"
    action.setAttribute("aria-hidden", "true")
    if (row.provider) {
      const image = document.createElement("img")
      image.src = row.provider.logo
      image.alt = ""
      image.width = 36
      image.height = 36
      image.decoding = "async"
      action.append(image)
    } else {
      let actionIcon = "download"
      if (row.external) {
        actionIcon = "external-link"
      } else if (row.isWatch) {
        actionIcon = "play"
      }
      action.append(createLucideIcon(actionIcon))
    }
    rowLayout.append(copy, action)
    item.append(rowLayout)
    return item
  }
  const buildEpisodeRow = (episode, group, openedReleases) => {
    const item = document.createElement("div")
    item.className = "userpatch-release-item"
    const label = `Episode ${episode.number}`
    item.dataset.userpatchFilename = `${label} ${group.quality}`.trim()
    item.dataset.userpatchQuality = getReleaseQuality(
      `${group.quality} ${label}`
    )
    const rowLayout = document.createElement("div")
    rowLayout.className = "userpatch-release-row"
    const opened =
      openedReleases.has(item.dataset.userpatchFilename) ||
      group.links.some((link) => openedReleases.has(link.href))
    if (opened) {
      markReleaseOpened(rowLayout, item)
    }
    const copy = document.createElement("div")
    copy.className = "userpatch-release-copy"
    const title = document.createElement("div")
    title.className = "userpatch-release-file-title"
    title.textContent = label
    copy.append(title)
    const meta = document.createElement("div")
    meta.className = "userpatch-release-meta"
    if (group.quality) {
      const quality = document.createElement("span")
      quality.textContent = group.quality.toUpperCase()
      meta.append(quality)
    }
    if (group.size) {
      const size = document.createElement("span")
      size.textContent = group.size
      meta.append(size)
    }
    if (meta.childElementCount) {
      copy.append(meta)
    }
    const actions = document.createElement("div")
    actions.className = "userpatch-release-actions"
    for (const link of group.links) {
      const anchor = document.createElement("a")
      anchor.className = "userpatch-provider-link"
      anchor.href = link.href
      anchor.target = "_blank"
      anchor.rel = "noopener noreferrer nofollow"
      anchor.dataset.tooltip = link.tooltip
      anchor.setAttribute("aria-label", link.tooltip)
      if (link.provider) {
        const image = document.createElement("img")
        image.src = link.provider.logo
        image.alt = ""
        image.width = 36
        image.height = 36
        image.decoding = "async"
        anchor.append(image)
      } else {
        anchor.append(createLucideIcon(link.icon))
      }
      if (isReleaseOpened(link.href, null, openedReleases)) {
        markReleaseOpened(null, anchor)
      }
      actions.append(anchor)
    }
    rowLayout.append(copy, actions)
    item.append(rowLayout)
    return item
  }
  let detailTooltipCleanup = null
  const clearDetailTooltipCleanup = () => {
    detailTooltipCleanup?.()
    detailTooltipCleanup = null
  }
  const setDetailTooltipCleanup = (cleanup) => {
    clearDetailTooltipCleanup()
    detailTooltipCleanup = cleanup
  }

  // src/shared/provider-logos.js
  const makeSvgDataUri$1 = (svg) =>
    `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
  const HUBCLOUD_LOGO_SVG = String.raw`<svg xmlns="http://www.w3.org/2000/svg" viewBox="-0.043 0.659 177.311 122.029" width="177" height="123">
  <defs>
    <linearGradient id="grad-left" gradientUnits="userSpaceOnUse" x1="31.00" y1="47.00" x2="11.00" y2="117.00">
      <stop offset="0" stop-color="#00aaef"/>
      <stop offset="1" stop-color="#0084e9"/>
    </linearGradient>
    <linearGradient id="grad-cyan" gradientUnits="userSpaceOnUse" x1="82.00" y1="-6.00" x2="59.60" y2="101.00">
      <stop offset="0" stop-color="#00f1f2"/>
      <stop offset="1" stop-color="#00a5ec"/>
    </linearGradient>
    <linearGradient id="grad-mid" gradientUnits="userSpaceOnUse" x1="138.00" y1="0.00" x2="65.30" y2="103.00">
      <stop offset="0" stop-color="#00d5f2"/>
      <stop offset="1" stop-color="#0064e3"/>
    </linearGradient>
    <linearGradient id="grad-white" gradientUnits="userSpaceOnUse" x1="123.00" y1="51.00" x2="123.00" y2="121.00" gradientTransform="matrix(1, 0, 0, 1.001083, 0, -0.055333)">
      <stop offset="0" stop-color="#fcfafb"/>
      <stop offset="1" stop-color="#f7f7f7"/>
    </linearGradient>
    <path id="left-blue-path" d="M 39.20 44.60 A 38.99 38.99 0 0 0 33.22 122.10 L 71.00 122.10 L 71.00 44.60 Z"/>
    <path id="cyan-dome-path" d="M 128.40 27.85 C 118.50 11.20, 100.50 0.93, 82.50 1.05 C 53.60 0.02, 28.14 26.14, 27.57 54.50 C 26.56 70.83, 36.41 86.79, 51.31 93.50 C 58.00 96.40, 66.00 98.00, 78.00 98.60 L 113.00 69.00 Z"/>
    <path id="mid-blue-path" d="M 131.80 27.73 L 128.40 27.85 C 99.62 27.66, 73.17 48.02, 63.30 74.50 C 57.02 89.28, 56.34 107.24, 64.40 122.10 L 145.00 122.10 L 169.17 98.00 A 45.07 45.07 0 0 0 131.80 27.73 Z"/>
    <path id="white-cloud-path" d="M 96.00 122.05 C 83.84 120.65, 73.97 109.64, 73.33 96.30 A 24.98 24.98 0 0 1 96.06 71.41 A 28.49 28.49 0 0 1 150.56 71.19 A 25.30 25.30 0 0 1 168.43 102.55 A 28.55 28.55 0 0 1 143.00 122.05 Z"/>
    <clipPath id="blue-silhouette">
      <path d="M 39.20 44.60 A 38.99 38.99 0 0 0 33.22 122.10 L 71.00 122.10 L 71.00 44.60 Z"/>
      <path d="M 128.40 27.85 C 118.50 11.20, 100.50 0.93, 82.50 1.05 C 53.60 0.02, 28.14 26.14, 27.57 54.50 C 26.56 70.83, 36.41 86.79, 51.31 93.50 C 58.00 96.40, 66.00 98.00, 78.00 98.60 L 113.00 69.00 Z"/>
      <path d="M 131.80 27.73 L 128.40 27.85 C 99.62 27.66, 73.17 48.02, 63.30 74.50 C 57.02 89.28, 56.34 107.24, 64.40 122.10 L 145.00 122.10 L 169.17 98.00 A 45.07 45.07 0 0 0 131.80 27.73 Z"/>
    </clipPath>
    <filter id="white-shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="1.1" result="blur"/>
      <feOffset in="blur" dx="-0.6" dy="-0.2" result="offsetBlur"/>
      <feFlood flood-color="#001950" flood-opacity="0.42" result="shadowColor"/>
      <feComposite in="shadowColor" in2="offsetBlur" operator="in"/>
    </filter>
  </defs>
  <path d="M 39.20 44.60 A 38.99 38.99 0 0 0 33.22 122.10 L 71.00 122.10 L 71.00 44.60 Z" fill="url(#grad-left)"/>
  <path d="M 128.40 27.85 C 118.50 11.20, 100.50 0.93, 82.50 1.05 C 53.60 0.02, 28.14 26.14, 27.57 54.50 C 26.56 70.83, 36.41 86.79, 51.31 93.50 C 58.00 96.40, 66.00 98.00, 78.00 98.60 L 113.00 69.00 Z" fill="url(#grad-cyan)"/>
  <path d="M 131.80 27.73 L 128.40 27.85 C 99.62 27.66, 73.17 48.02, 63.30 74.50 C 57.02 89.28, 56.34 107.24, 64.40 122.10 L 145.00 122.10 L 169.17 98.00 A 45.07 45.07 0 0 0 131.80 27.73 Z" fill="url(#grad-mid)"/>
  <path d="M 58.52 95.50 C 64.00 97.40, 70.00 98.20, 79.00 98.80 L 90.00 122.10 L 64.40 122.10 C 59.92 113.83, 58.14 104.61, 58.52 95.50 Z" fill="#005fd8"/>
  <g clip-path="url(#blue-silhouette)">
    <path d="M 96.00 122.05 C 83.84 120.65, 73.97 109.64, 73.33 96.30 A 24.98 24.98 0 0 1 96.06 71.41 A 28.49 28.49 0 0 1 150.56 71.19 A 25.30 25.30 0 0 1 168.43 102.55 A 28.55 28.55 0 0 1 143.00 122.05 Z" fill="#000000" filter="url(#white-shadow)"/>
  </g>
  <path d="M 96 122.127 C 83.84 120.725 73.97 109.703 73.33 96.349 C 73.324 83.406 83.184 72.598 96.06 71.432 C 102.375 50.406 129.058 44.108 144.089 60.096 C 147.064 63.259 149.277 67.061 150.56 71.212 C 164.237 74.834 172.289 88.98 168.43 102.606 C 164.745 113.711 156.691 121.445 145.022 122.127 L 96 122.127 Z" fill="url(#grad-white)" style=""/>
</svg>`
  const HUBCLOUD_LOGO_DATA_URI = makeSvgDataUri$1(HUBCLOUD_LOGO_SVG)
  const HUBDRIVE_LOGO_SVG = String.raw`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 249 249" width="249" height="249">
  <defs>
    <linearGradient id="bg-blue" gradientUnits="userSpaceOnUse" x1="35.36" y1="35.07" x2="165.36" y2="165.07">
      <stop offset="0" stop-color="#5492f0"/>
      <stop offset="1" stop-color="#468aef"/>
    </linearGradient>
    <linearGradient id="long-shadow" gradientUnits="userSpaceOnUse" x1="116.86" y1="162.07" x2="156.86" y2="231.37">
      <stop offset="0" stop-color="#001450" stop-opacity="0.068"/>
      <stop offset="1" stop-color="#001450" stop-opacity="0"/>
    </linearGradient>
    <clipPath id="circle-clip">
      <circle cx="124.50" cy="124.50" r="123.88"/>
    </clipPath>
  </defs>
  <circle cx="124.50" cy="124.50" r="123.88" fill="url(#bg-blue)"/>
  <g clip-path="url(#circle-clip)">
    <path d="M 310.50 227.06 L 160.50 77.06 A 50.95 50.95 0 0 1 175.12 107.56 A 33.99 33.99 0 1 1 175.18 175.54 L 79.38 175.54 A 39.62 39.62 0 0 1 51.36 163.94 L 201.36 313.94 Z" fill="url(#long-shadow)"/>
  </g>
  <path d="M 175.18 175.54 L 79.38 175.54 A 39.62 39.62 0 0 1 76.32 96.42 A 50.95 50.95 0 0 1 175.12 107.56 A 33.99 33.99 0 1 1 175.18 175.54 Z M 108.39 97.26 H 141.59 V 125.44 H 158.42 L 125.09 158.69 L 91.83 125.44 H 108.39 Z" fill="#ffffff" fill-rule="evenodd"/>
</svg>`
  const HUBDRIVE_LOGO_DATA_URI = makeSvgDataUri$1(HUBDRIVE_LOGO_SVG)
  const HUBCDN_LOGO_SVG = String.raw`<svg width="216" height="260" viewBox="0 0 216 260" xmlns="http://www.w3.org/2000/svg"><title>undraw_handcrafts_heart</title><g fill="none"><path d="M94.612 259.442c-52.87-27.61-89.83-83.546-94.497-143.008-2.677-34.116 42-57.722 73.18-43.618s45.416 52.377 42.057 86.433c-3.36 34.055-20.522 64.984-20.74 100.193" fill="#b9fff4"/><path d="m180.8 59.136-.002-.002.022.057.002.002z" fill="#000"/><path d="M210.18 49.32c-9.959-27.16-41.17-31.961-64.158-17.966a102 102 0 0 0-10.83 7.159C126.986 22.216 114.311 6.342 96.626.665c-18.734-3.47-38.053 7.13-50.715 20.369C34.808 33.217 29.554 49.242 23.814 64.39c-7.425 19.42-5.637 40.524-.681 60.308 5.518 24.51 19.25 46.018 34.14 65.883 17.341 23.568 36.811 45.456 55.79 67.695-16.404-27.606-34.051-54.514-48.789-83.074-9.574-18.305-15.647-32.086-19.093-55.445a155 155 0 0 1-1.548-21.374c.179-8.247.613-8.191.746-9.59 2.97-15.129 15.054-38.773 20.212-45.34a39 39 0 0 1 4.92-4.745 27 27 0 0 1 3.381-2.086c4.253-2.02 2.698-2 12.054-4.589h.004c.699-.03 1.345-.032 1.868-.023.23.134.461.265.686.407 8.802 8.28 6.196 6.106 10.328 11.3l1.05 1.484a87.4 87.4 0 0 1 6.546 11.272c1.768 2.63 7.162 26.82 29.194 21.615a28.8 28.8 0 0 0 10.114-5.904 574 574 0 0 0 7.158-5.542c2.509-1.853 7.729-5.67 9.68-6.699a48 48 0 0 1 5.05-2.73 40 40 0 0 1 6.261-1.897c.41-.025.818-.085 1.228-.079.167.002.332.031.498.037.793.196 1.903.478 3.011.821.21.12.422.236.627.365a34 34 0 0 1 1.71 1.71q.766 1.148 1.387 2.381c1.5 4.087 2.738 8.265 3.704 12.51 3.598 14.583 2.86 25.085.322 37.42-10.04 46.747-36.895 82.132-64.628 125.968a621 621 0 0 1-9.546 13.878c10.995-10.373 21.466-21.286 31.577-32.52 21.612-23.877 43.757-47.96 57.517-77.437 7.013-14.537 13.001-29.855 14.723-46.011a112.4 112.4 0 0 0-4.835-45.038" fill="#6366f1"/></g></svg>`
  const HUBCDN_LOGO_DATA_URI = makeSvgDataUri$1(HUBCDN_LOGO_SVG)

  // src/hdhub4u/provider-marks.js
  const HUB_PROVIDERS = Object.freeze([
    Object.freeze({
      name: "HubCloud",
      slug: "hubcloud",
      logo: HUBCLOUD_LOGO_DATA_URI,
    }),
    Object.freeze({
      name: "HubDrive",
      slug: "hubdrive",
      logo: HUBDRIVE_LOGO_DATA_URI,
    }),
    Object.freeze({
      name: "HubCDN",
      slug: "hubcdn",
      logo: HUBCDN_LOGO_DATA_URI,
    }),
  ])
  /**
   * Resolves a download link to its provider entry. Host prefixes win because
   * the domains rotate TLDs constantly (hubcloud.pw, hubcloud.mov, ...); when
   * the host is masked by a redirect service, a provider name in the link
   * text is still identifiable. Returns null for anything else.
   */
  const getHubProvider = (href, text = "") => {
    let host = ""
    try {
      host = new URL(href, location.href).hostname.toLowerCase()
    } catch {}
    for (const provider of HUB_PROVIDERS) {
      if (new RegExp(`(?:^|\\.)${provider.slug}\\.`).test(host)) {
        return provider
      }
    }
    const label = text.toLowerCase()
    for (const provider of HUB_PROVIDERS) {
      if (label.includes(provider.slug)) {
        return provider
      }
    }
    return null
  }

  // src/shared/provider-tooltip.js
  const setupProviderTooltip = (root) => {
    const tooltip = document.createElement("div")
    tooltip.id = "userpatch-provider-tooltip"
    tooltip.className = "userpatch-provider-tooltip"
    tooltip.setAttribute("role", "tooltip")
    tooltip.setAttribute("aria-hidden", "true")
    tooltip.hidden = true
    document.body.append(tooltip)
    let hoveredTrigger = null
    let focusedTrigger = null
    let activeTrigger = null
    let openFrame = 0
    let closeTimer = 0
    const getTrigger = (target) => {
      if (!(target instanceof Element)) {
        return null
      }
      const trigger = target.closest(
        ".userpatch-provider-link, .userpatch-hblinks-action"
      )
      return trigger instanceof HTMLElement && root.contains(trigger)
        ? trigger
        : null
    }
    const positionTooltip = () => {
      if (!activeTrigger?.isConnected) {
        return
      }
      const triggerRect = activeTrigger.getBoundingClientRect()
      const tooltipRect = tooltip.getBoundingClientRect()
      if (
        triggerRect.bottom < 0 ||
        triggerRect.top > window.innerHeight ||
        triggerRect.right < 0 ||
        triggerRect.left > window.innerWidth
      ) {
        closeTooltip()
        return
      }
      const offset = 8
      const side =
        triggerRect.top >= tooltipRect.height + offset ? "top" : "bottom"
      const halfWidth = tooltipRect.width / 2
      const center = triggerRect.left + triggerRect.width / 2
      const left = Math.min(
        Math.max(center, halfWidth + 4),
        window.innerWidth - halfWidth - 4
      )
      const top =
        side === "top"
          ? triggerRect.top - tooltipRect.height - offset
          : triggerRect.bottom + offset
      tooltip.dataset.side = side
      tooltip.style.left = `${left}px`
      tooltip.style.top = `${Math.max(4, top)}px`
    }
    const closeTooltip = () => {
      if (!activeTrigger) {
        return
      }
      activeTrigger.removeAttribute("aria-describedby")
      activeTrigger = null
      tooltip.dataset.state = "closed"
      tooltip.setAttribute("aria-hidden", "true")
      window.clearTimeout(closeTimer)
      closeTimer = window.setTimeout(() => {
        if (!activeTrigger) {
          tooltip.hidden = true
        }
      }, 140)
    }
    const syncTooltip = () => {
      const nextTrigger = hoveredTrigger || focusedTrigger
      if (!nextTrigger) {
        closeTooltip()
        return
      }
      window.clearTimeout(closeTimer)
      if (activeTrigger !== nextTrigger) {
        activeTrigger?.removeAttribute("aria-describedby")
        activeTrigger = nextTrigger
        tooltip.textContent = nextTrigger.dataset.tooltip || ""
        nextTrigger.setAttribute("aria-describedby", tooltip.id)
      }
      tooltip.hidden = false
      tooltip.setAttribute("aria-hidden", "false")
      positionTooltip()
      window.cancelAnimationFrame(openFrame)
      openFrame = window.requestAnimationFrame(() => {
        if (activeTrigger === nextTrigger) {
          tooltip.dataset.state = "open"
        }
      })
    }
    const onPointerOver = (event) => {
      if (
        (event.pointerType !== "mouse" && event.pointerType !== "pen") ||
        !window.matchMedia("(hover: hover) and (pointer: fine)").matches
      ) {
        return
      }
      const trigger = getTrigger(event.target)
      if (!trigger || trigger.contains(event.relatedTarget)) {
        return
      }
      hoveredTrigger = trigger
      syncTooltip()
    }
    const onPointerOut = (event) => {
      const trigger = getTrigger(event.target)
      if (
        !trigger ||
        trigger !== hoveredTrigger ||
        trigger.contains(event.relatedTarget)
      ) {
        return
      }
      hoveredTrigger = null
      syncTooltip()
    }
    const onFocusIn = (event) => {
      focusedTrigger = getTrigger(event.target)
      if (focusedTrigger) {
        syncTooltip()
      }
    }
    const onFocusOut = (event) => {
      const trigger = getTrigger(event.target)
      if (
        trigger &&
        trigger === focusedTrigger &&
        !trigger.contains(event.relatedTarget)
      ) {
        focusedTrigger = null
        syncTooltip()
      }
    }
    const onProviderClick = (event) => {
      if (event.type === "auxclick" && event.button !== 1) {
        return
      }
      const trigger = getTrigger(event.target)
      if (!trigger) {
        return
      }
      const item = trigger.closest(".userpatch-release-item")
      const row =
        trigger.closest(".userpatch-release-row") ||
        item?.querySelector(".userpatch-release-row")
      markReleaseOpened(row, item)
      const filename = item?.dataset.userpatchFilename
      const href = trigger instanceof HTMLAnchorElement ? trigger.href : ""
      saveOpenedRelease(filename, href)
    }
    root.addEventListener("click", onProviderClick, true)
    root.addEventListener("auxclick", onProviderClick, true)
    root.addEventListener("pointerover", onPointerOver)
    root.addEventListener("pointerout", onPointerOut)
    root.addEventListener("focusin", onFocusIn)
    root.addEventListener("focusout", onFocusOut)
    window.addEventListener("resize", positionTooltip)
    document.addEventListener("scroll", positionTooltip, true)
    return () => {
      root.removeEventListener("click", onProviderClick, true)
      root.removeEventListener("auxclick", onProviderClick, true)
      root.removeEventListener("pointerover", onPointerOver)
      root.removeEventListener("pointerout", onPointerOut)
      root.removeEventListener("focusin", onFocusIn)
      root.removeEventListener("focusout", onFocusOut)
      window.removeEventListener("resize", positionTooltip)
      document.removeEventListener("scroll", positionTooltip, true)
      window.cancelAnimationFrame(openFrame)
      window.clearTimeout(closeTimer)
      activeTrigger?.removeAttribute("aria-describedby")
      tooltip.remove()
    }
  }

  // src/hblinks/branding.js
  const LOGO_SVG = `<svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg"><g filter="url(#a)" clip-path="url(#c)"><rect x=".5" y=".358" width="44" height="44" rx="9.5" fill="#e67401"/><rect x="1.417" y="1.275" width="42.167" height="42.167" rx="8.583" stroke="url(#d)" stroke-width="1.833"/><path fill-rule="evenodd" clip-rule="evenodd" d="M17.244 22.054c-1.502-1.34-3.59-1.824-5.94-1.824v-5.872c3.003 0 6.8.596 9.847 3.313a12.3 12.3 0 0 1 2.141 2.506v-5.819c3.002 0 6.8.596 9.846 3.313C36.246 20.441 38 24.895 38 31.352h-5.871c0-5.438-1.457-8.014-2.898-9.298-1.494-1.333-3.57-1.82-5.905-1.824 1.738 2.709 2.686 6.374 2.686 11.122h-5.87c0-5.438-1.458-8.014-2.898-9.298m-5.848 1.723-.093-.059-.094.059c-.152.095-.422.264-.536.345a9.5 9.5 0 0 0-1.074.884C8.827 25.746 8 26.828 8 28.087c0 1.805 1.479 3.268 3.303 3.268s3.302-1.463 3.302-3.268c0-1.26-.827-2.34-1.598-3.081a9.5 9.5 0 0 0-1.074-.884c-.115-.081-.385-.25-.537-.345" fill="#fff"/></g><rect x=".431" y=".29" width="44.138" height="44.138" rx="9.569" stroke="#000" stroke-opacity=".6" stroke-width=".138"/><defs><linearGradient id="d" x1="22.5" y1=".358" x2="22.5" y2="44.358" gradientUnits="userSpaceOnUse"><stop stop-color="#f4820f"/><stop offset="1" stop-color="#d86600"/></linearGradient><clipPath id="c"><rect x=".5" y=".358" width="44" height="44" rx="9.5" fill="#fff"/></clipPath><filter id="a" x=".5" y="-17.517" width="44" height="61.875" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset dy="-17.875"/><feGaussianBlur stdDeviation="30"/><feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/><feColorMatrix values="0 0 0 0 0.901961 0 0 0 0 0.454902 0 0 0 0 0.00392157 0 0 0 0.2 0"/><feBlend in2="shape" result="effect1_innerShadow_467_3292"/></filter></defs></svg>`
  const LOGO_URI = `data:image/svg+xml,${encodeURIComponent(LOGO_SVG)}`
  const ensureHblinksBranding = () => {
    const brand = document.querySelector("#masthead .site-branding a")
    if (!brand || brand.querySelector(".userpatch-hblinks-logo")) {
      return
    }
    const logo = document.createElement("img")
    logo.className = "userpatch-hblinks-logo"
    logo.src = LOGO_URI
    logo.alt = ""
    logo.width = 38
    logo.height = 38
    brand.replaceChildren(logo, document.createTextNode("HUBLinks"))
  }

  // src/hblinks/page.js
  const isHblinksHost = () =>
    location.hostname.toLowerCase().replace(/^www\./, "") === "hblinks.lol"
  const isHblinksArchiveRoute = () =>
    isHblinksHost() && /^\/archives\/\d+\/?$/.test(location.pathname)
  const getHblinksEntryContent = () =>
    document.querySelector("main#main.site-main article.post .entry-content")
  const HUB_FAMILY_HOST_PATTERN = /(?:^|\.)hub[a-z]+\./
  const isHubFamilyAnchor = (anchor) => {
    try {
      return HUB_FAMILY_HOST_PATTERN.test(
        new URL(anchor.href).hostname.toLowerCase()
      )
    } catch {
      return false
    }
  }
  const collectHblinksRows = (content) =>
    Array.from(content.querySelectorAll("h2, h3, h4, h5, h6, p")).filter(
      (element) => {
        if (!/^H[2-6]$/.test(element.tagName) && element.tagName !== "P") {
          return false
        }
        const anchors = Array.from(element.querySelectorAll(":scope > a[href]"))
        if (!anchors.length) {
          return false
        }
        return (
          /\b(?:480p|720p|1080p|2160p|4k)\b/i.test(element.textContent || "") ||
          (anchors.every(isHubFamilyAnchor) &&
            (element.tagName !== "P" ||
              anchors.every((anchor) => anchor.querySelector("img"))))
        )
      }
    )
  const countRowLinks = (rows) =>
    rows.reduce(
      (count, row) => count + row.querySelectorAll(":scope > a[href]").length,
      0
    )
  const isEnoughHblinksRows = (rows) =>
    rows.length >= 2 && countRowLinks(rows) >= 3
  const isHblinksArchivePage = () => {
    if (
      !isHblinksArchiveRoute() ||
      !document.body?.classList.contains("single-post") ||
      !document.querySelector("#masthead.site-header")
    ) {
      return false
    }
    const content = getHblinksEntryContent()
    if (content?.dataset.userpatchHblinksReady === "true") {
      return true
    }
    if (!content) {
      return false
    }
    return isEnoughHblinksRows(collectHblinksRows(content))
  }
  const ensureHblinksPage = () => {
    const content = getHblinksEntryContent()
    if (!content) {
      return false
    }
    ensureHblinksBranding()
    if (content.dataset.userpatchHblinksReady === "true") {
      return true
    }
    const rows = collectHblinksRows(content)
    if (!isEnoughHblinksRows(rows)) {
      return false
    }
    const titleText = normalizeText(
      document.title
        .replace(/\s*[–—-]\s*HUBLinks\s*$/i, "")
        .replaceAll(/[._]+/g, " ")
    )
    const episodeMatch = titleText.match(/\bS(\d{1,2})E(\d{1,2})\b/i)
    const displayTitle =
      normalizeText(titleText.replace(/\bS\d{1,2}E\d{1,2}\b/i, "")) ||
      "Download options"
    const pageHeader = document.createElement("header")
    pageHeader.className = "userpatch-hblinks-titlebar"
    const title = document.createElement("h1")
    title.className = "userpatch-hblinks-title"
    title.textContent = displayTitle
    pageHeader.append(title)
    if (episodeMatch) {
      const episode = document.createElement("p")
      episode.className = "userpatch-hblinks-episode"
      const seasonLabel = document.createElement("span")
      seasonLabel.textContent = `Season ${Number(episodeMatch[1])}`
      const episodeLabel = document.createElement("span")
      episodeLabel.textContent = `Episode ${Number(episodeMatch[2])}`
      episode.append(seasonLabel, episodeLabel)
      pageHeader.append(episode)
    }
    const note = Array.from(content.children).find(
      (element) =>
        element.tagName === "P" &&
        /^note\b/i.test(normalizeText(element.textContent))
    )
    note?.remove()
    const options = document.createElement("div")
    options.className = "userpatch-hblinks-options"
    content.append(options)
    const getProviderLabel = (anchor) => {
      let hostname = ""
      try {
        hostname = new URL(anchor.href).hostname.toLowerCase()
      } catch {}
      if (hostname.endsWith("hubdrive.blog")) {
        return "Drive"
      }
      if (hostname.endsWith("hubcdn.club")) {
        return "Instant"
      }
      if (hostname.endsWith("hubcloud.pw")) {
        return "Direct"
      }
      return "Open link"
    }
    for (const row of rows) {
      const anchors = Array.from(row.querySelectorAll(":scope > a[href]"))
      const firstAnchor = anchors[0]
      let leadingText = ""
      for (const child of row.childNodes) {
        if (
          child === firstAnchor ||
          (child instanceof Element && child.contains(firstAnchor))
        ) {
          break
        }
        leadingText += child.textContent || ""
      }
      const heading = normalizeText(leadingText).replace(/[\s|–—:-]+$/, "")
      const isStandaloneLink = !heading
      const optionTitle = document.createElement("span")
      optionTitle.className = "userpatch-hblinks-option-title"
      optionTitle.textContent =
        heading ||
        normalizeText(firstAnchor.textContent) ||
        getHubProvider(firstAnchor.href, "")?.name ||
        getProviderLabel(firstAnchor)
      const actions = document.createElement("span")
      actions.className = "userpatch-hblinks-actions"
      const providerOrder = (anchor) => {
        const provider = getHubProvider(anchor.href, anchor.textContent)
        const index = HUB_PROVIDERS.indexOf(provider)
        return index < 0 ? HUB_PROVIDERS.length : index
      }
      anchors.sort((a, b) => providerOrder(a) - providerOrder(b))
      for (const anchor of anchors) {
        anchor.classList.add("userpatch-hblinks-action")
        const hubProvider = getHubProvider(anchor.href, anchor.textContent)
        if (hubProvider) {
          const image = document.createElement("img")
          image.src = hubProvider.logo
          image.alt = ""
          image.width = 36
          image.height = 36
          image.decoding = "async"
          anchor.replaceChildren(image)
          anchor.dataset.tooltip = hubProvider.name
          anchor.setAttribute("aria-label", hubProvider.name)
        } else if (isStandaloneLink) {
          anchor.textContent = getProviderLabel(anchor)
        }
        if (anchor.target === "_blank") {
          anchor.relList.add("noopener", "noreferrer")
        }
        actions.append(anchor)
      }
      row.classList.add("userpatch-hblinks-option-row")
      row.replaceChildren(optionTitle, actions)
      options.append(row)
    }
    for (const wrapper of content.querySelectorAll(":scope > div")) {
      if (
        !wrapper.querySelector("a, img") &&
        !normalizeText(wrapper.textContent)
      ) {
        wrapper.remove()
      }
    }
    content.prepend(pageHeader)
    for (const separator of content.querySelectorAll(":scope > hr")) {
      separator.remove()
    }
    content.dataset.userpatchHblinksReady = "true"
    setDetailTooltipCleanup(setupProviderTooltip(content))
    return true
  }

  // src/shared/cloudflare.js
  const isCloudflareChallenge = () => {
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

  // src/shared/loading-cover.mjs
  function installLoadingCover(force = false, timeoutMs = 8e3) {
    const root = document.documentElement
    if (!root) {
      return null
    }
    const isChallenge = () =>
      /just a moment|attention required|checking your browser/i.test(
        document.title
      ) ||
      location.pathname.startsWith("/cdn-cgi/") ||
      Boolean(
        document.querySelector(
          "#challenge-form, #challenge-running, #cf-challenge-running, .cf-turnstile"
        )
      )
    if (isChallenge()) {
      return null
    }
    if (
      !force &&
      (!/(^|\.)(4khdhub|hdhub4u|hblinks|hubcloud|hubcdn)\./i.test(
        location.hostname
      ) ||
        /\.(mkv|mp4|avi|mov|webm|zip|rar|7z|iso|mp3|flac)$/i.test(
          location.pathname
        ))
    ) {
      return null
    }
    const existing = document.getElementById("userpatch-page-loader")
    if (existing) {
      return existing
    }
    let style = document.getElementById("userpatch-page-loader-style")
    if (!style) {
      style = document.createElement("style")
      style.id = "userpatch-page-loader-style"
      style.textContent = `
      html[data-userpatch-loading] { background: #0a0a0a !important; }
      html[data-userpatch-loading] > body { visibility: hidden !important; }
      #userpatch-page-loader {
        all: initial !important; position: fixed !important; inset: 0 !important;
        z-index: 2147483647 !important; display: grid !important;
        place-items: center !important; visibility: visible !important;
        background: #0a0a0a !important; color: #fafafa !important;
      }
      #userpatch-page-loader progress, progress.userpatch-loading-spinner {
        appearance: none !important; display: block !important;
        inline-size: 2rem !important; block-size: 2rem !important;
        box-sizing: border-box !important; margin: auto !important;
        border: 2px solid #444 !important; border-block-start-color: #fafafa !important;
        border-radius: 50% !important; background: transparent !important;
        animation: userpatch-loader-spin 1s linear infinite !important;
      }
      #userpatch-page-loader progress::-webkit-progress-bar,
      progress.userpatch-loading-spinner::-webkit-progress-bar { display: none; }
      #userpatch-page-loader progress::-moz-progress-bar,
      progress.userpatch-loading-spinner::-moz-progress-bar { background: transparent; }
      @keyframes userpatch-loader-spin { to { transform: rotate(360deg); } }
      @media (prefers-reduced-motion: reduce) {
        #userpatch-page-loader progress, progress.userpatch-loading-spinner { animation-duration: 6s !important; }
      }
    `
      root.append(style)
    }
    const cover = document.createElement("div")
    cover.id = "userpatch-page-loader"
    cover.setAttribute("aria-busy", "true")
    const spinner = document.createElement("progress")
    spinner.setAttribute("aria-label", "Loading page")
    cover.append(spinner)
    root.dataset.userpatchLoading = ""
    root.append(cover)
    let timer = 0
    const cleanup = () => {
      delete root.dataset.userpatchLoading
      cover.remove()
      observer.disconnect()
      window.clearTimeout(timer)
    }
    const observer = new MutationObserver(() => {
      if (!Object.hasOwn(root.dataset, "userpatchLoading") || isChallenge()) {
        cleanup()
        return
      }
      if (!style.isConnected) {
        root.append(style)
      }
      if (!cover.isConnected) {
        root.append(cover)
      }
    })
    observer.observe(document, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["data-userpatch-loading"],
    })
    timer = window.setTimeout(cleanup, timeoutMs)
    window.addEventListener(
      "pagehide",
      () => {
        observer.disconnect()
        window.clearTimeout(timer)
      },
      { once: true }
    )
    window.addEventListener("pageshow", (event) => {
      if (event.persisted) {
        cleanup()
      }
    })
    return cover
  }

  // src/shared/page-loader.js
  const PAGE_LOADER_ID = "userpatch-page-loader"
  const PAGE_LOADER_HIDDEN_CLASS = "userpatch-page-loader-hidden"
  const PAGE_SPINNER_CLASS = "userpatch-page-spinner"
  let revealPending = false
  const showRedesignLoader = (hostPattern) => {
    if (hostPattern.test(location.hostname)) {
      installLoadingCover()
    }
  }
  const showInitialPageLoader = (guard, _buildSpinner, timeoutMs) => {
    if (guard()) {
      installLoadingCover(true, timeoutMs)
    }
  }
  const dismissPageLoader = (immediate = false) => {
    if (immediate) {
      delete document.documentElement?.dataset.userpatchLoading
      document.getElementById(PAGE_LOADER_ID)?.remove()
      revealPending = false
      return
    }
    if (revealPending || !document.getElementById("userpatch-page-loader")) {
      return
    }
    revealPending = true
    const reveal = () =>
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => dismissPageLoader(true))
      })
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", reveal, { once: true })
    } else {
      reveal()
    }
  }

  // src/shared/bootstrap.js
  let pageLoop = null
  const initPageLoop = (context) => {
    pageLoop = context
  }
  let pageObserver = null
  let waitTimer = 0
  let pageProcessingTimer = 0
  const stopWaiting = () => {
    if (pageObserver) {
      pageObserver.disconnect()
      pageObserver = null
    }
    if (waitTimer) {
      window.clearTimeout(waitTimer)
      waitTimer = 0
    }
    if (pageProcessingTimer) {
      window.clearTimeout(pageProcessingTimer)
      pageProcessingTimer = 0
    }
  }
  const runPageProcessing = () => {
    pageObserver?.disconnect()
    try {
      if (pageLoop.processPage()) {
        dismissPageLoader()
      }
      if (isCloudflareChallenge()) {
        stopWaiting()
      }
    } catch {
      dismissPageLoader(true)
    } finally {
      pageObserver?.observe(document, {
        attributes: true,
        attributeFilter: pageLoop.attributeFilter,
        characterData: pageLoop.characterData,
        childList: true,
        subtree: true,
      })
    }
  }
  const schedulePageProcessing = () => {
    if (pageProcessingTimer) {
      return
    }
    pageProcessingTimer = window.setTimeout(() => {
      pageProcessingTimer = 0
      runPageProcessing()
    }, 0)
  }
  const watchCurrentPage = () => {
    stopWaiting()
    pageObserver = new MutationObserver(schedulePageProcessing)
    waitTimer = window.setTimeout(() => {
      runPageProcessing()
      stopWaiting()
      dismissPageLoader()
    }, pageLoop.discoveryTimeoutMs)
    runPageProcessing()
  }

  // src/shared/site-discovery.js
  const discoverSite = (signature, start) => {
    let timeout = 0
    const observer = new MutationObserver(check)
    function check() {
      if (!signature()) {
        return
      }
      observer.disconnect()
      window.clearTimeout(timeout)
      start()
    }
    observer.observe(document, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["class"],
    })
    timeout = window.setTimeout(() => observer.disconnect(), 3e4)
    check()
    window.addEventListener(
      "pagehide",
      () => {
        observer.disconnect()
        window.clearTimeout(timeout)
      },
      { once: true }
    )
  }

  // src/shared/styles.js
  let maiaStyles = null
  const initMaiaStyles = (context) => {
    maiaStyles = context
  }
  const MAIA_CLASS = "userpatch-maia"
  const FONT_STYLESHEET_URL =
    "https://cdn.jsdelivr.net/npm/@fontsource-variable/inter@5.3.0/index.css"
  const ensureStyles = () => {
    try {
      if (isCloudflareChallenge() || !maiaStyles.siteSignature()) {
        return false
      }
      const styleTarget = document.head || document.documentElement
      if (!styleTarget) {
        return false
      }
      if (maiaStyles.preInject) {
        maiaStyles.preInject()
      }
      if (!document.getElementById(maiaStyles.fontStyleId)) {
        const fontStylesheet = document.createElement("link")
        fontStylesheet.id = maiaStyles.fontStyleId
        fontStylesheet.rel = "stylesheet"
        fontStylesheet.href = FONT_STYLESHEET_URL
        fontStylesheet.crossOrigin = "anonymous"
        styleTarget.append(fontStylesheet)
      }
      if (document.head) {
        const ensureManagedMeta = (id, name, content) => {
          let meta = document.getElementById(id)
          if (!meta) {
            meta = document.querySelector(`meta[name="${name}"]`)
            if (meta) {
              meta.dataset.originalId = meta.id
              meta.id = id
              meta.dataset.originalContent = meta.content || ""
            } else {
              meta = document.createElement("meta")
              meta.id = id
              meta.name = name
              document.head.append(meta)
            }
          }
          meta.content = content
        }
        ensureManagedMeta(maiaStyles.colorSchemeMetaId, "color-scheme", "dark")
        ensureManagedMeta(
          maiaStyles.themeColorMetaId,
          "theme-color",
          maiaStyles.themeColor
        )
        const viewportMeta = document.querySelector('meta[name="viewport"]')
        if (viewportMeta) {
          const current = viewportMeta.content || ""
          const tokens = current
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean)
          const missing = [
            "viewport-fit=cover",
            "interactive-widget=resizes-content",
          ].filter((token) => !tokens.includes(token))
          if (missing.length) {
            if (viewportMeta.dataset.originalContent === undefined) {
              viewportMeta.dataset.originalContent = current
            }
            viewportMeta.content = [...tokens, ...missing].join(", ")
          }
        }
      }
      const existingStyle = document.getElementById(maiaStyles.styleId)
      if (existingStyle) {
        if (existingStyle.textContent !== maiaStyles.css) {
          existingStyle.textContent = maiaStyles.css
        }
        document.documentElement.classList.add(MAIA_CLASS)
        return true
      }
      const style = document.createElement("style")
      style.id = maiaStyles.styleId
      style.textContent = maiaStyles.css
      styleTarget.append(style)
      document.documentElement.classList.add(MAIA_CLASS)
      return true
    } catch {
      return false
    }
  }

  // src/hdhub4u/branding.js
  const makeSvgDataUri = (svg) =>
    `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
  const HEADER_WORDMARK_SVG = String.raw`<svg xmlns="http://www.w3.org/2000/svg" viewBox="10.435 7.939 224.971 68.462" width="260" height="82">
  <defs>
    <filter id="outer-shadow" filterUnits="userSpaceOnUse" x="-10" y="-10" width="280" height="102">
      <feMorphology in="SourceAlpha" operator="dilate" radius="1.35" result="haloMask"/>
      <feGaussianBlur in="SourceAlpha" stdDeviation="2.9" result="blur"/>
      <feOffset in="blur" dx="0" dy="1.3" result="offsetBlur"/>
      <feFlood flood-color="#000000" flood-opacity="0.28" result="shadowColor"/>
      <feComposite in="shadowColor" in2="offsetBlur" operator="in" result="softShadow"/>
      <feComposite in="softShadow" in2="haloMask" operator="out" result="maskedShadow"/>
      <feMerge>
        <feMergeNode in="maskedShadow"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    <filter id="bevel-red" filterUnits="userSpaceOnUse" x="-5" y="-5" width="270" height="92">
      <feOffset in="SourceAlpha" dx="-1.1" dy="1.1" result="offHL"/>
      <feComposite in="SourceAlpha" in2="offHL" operator="out" result="edgeHL"/>
      <feGaussianBlur in="edgeHL" stdDeviation="0.3" result="blurHL"/>
      <feComposite in="blurHL" in2="SourceAlpha" operator="in" result="clipHL"/>
      <feFlood flood-color="#ff857a" flood-opacity="0.9" result="colHL"/>
      <feComposite in="colHL" in2="clipHL" operator="in" result="highlight"/>
      <feOffset in="SourceAlpha" dx="1.1" dy="-1.1" result="offSH"/>
      <feComposite in="SourceAlpha" in2="offSH" operator="out" result="edgeSH"/>
      <feGaussianBlur in="edgeSH" stdDeviation="0.3" result="blurSH"/>
      <feComposite in="blurSH" in2="SourceAlpha" operator="in" result="clipSH"/>
      <feFlood flood-color="#7a0000" flood-opacity="0.72" result="colSH"/>
      <feComposite in="colSH" in2="clipSH" operator="in" result="bevelShadow"/>
      <feOffset in="SourceAlpha" dx="-0.65" dy="0.65" result="offRim"/>
      <feFlood flood-color="#261212" flood-opacity="0.58" result="colRim"/>
      <feComposite in="colRim" in2="offRim" operator="in" result="darkRim"/>
      <feMerge>
        <feMergeNode in="darkRim"/>
        <feMergeNode in="SourceGraphic"/>
        <feMergeNode in="bevelShadow"/>
        <feMergeNode in="highlight"/>
      </feMerge>
    </filter>
    <filter id="bevel-white" filterUnits="userSpaceOnUse" x="-5" y="-5" width="270" height="92">
      <feOffset in="SourceAlpha" dx="-1.1" dy="1.1" result="offHL"/>
      <feComposite in="SourceAlpha" in2="offHL" operator="out" result="edgeHL"/>
      <feGaussianBlur in="edgeHL" stdDeviation="0.3" result="blurHL"/>
      <feComposite in="blurHL" in2="SourceAlpha" operator="in" result="clipHL"/>
      <feFlood flood-color="#ffffff" flood-opacity="0.98" result="colHL"/>
      <feComposite in="colHL" in2="clipHL" operator="in" result="highlight"/>
      <feOffset in="SourceAlpha" dx="1.1" dy="-1.1" result="offSH"/>
      <feComposite in="SourceAlpha" in2="offSH" operator="out" result="edgeSH"/>
      <feGaussianBlur in="edgeSH" stdDeviation="0.3" result="blurSH"/>
      <feComposite in="blurSH" in2="SourceAlpha" operator="in" result="clipSH"/>
      <feFlood flood-color="#969696" flood-opacity="0.72" result="colSH"/>
      <feComposite in="colSH" in2="clipSH" operator="in" result="bevelShadow"/>
      <feOffset in="SourceAlpha" dx="-0.65" dy="0.65" result="offRim"/>
      <feFlood flood-color="#2b2525" flood-opacity="0.55" result="colRim"/>
      <feComposite in="colRim" in2="offRim" operator="in" result="darkRim"/>
      <feMerge>
        <feMergeNode in="darkRim"/>
        <feMergeNode in="SourceGraphic"/>
        <feMergeNode in="bevelShadow"/>
        <feMergeNode in="highlight"/>
      </feMerge>
    </filter>
    <filter id="bevel-orange" filterUnits="userSpaceOnUse" x="-5" y="-5" width="270" height="92">
      <feOffset in="SourceAlpha" dx="-0.95" dy="0.95" result="offHL"/>
      <feComposite in="SourceAlpha" in2="offHL" operator="out" result="edgeHL"/>
      <feGaussianBlur in="edgeHL" stdDeviation="0.22" result="blurHL"/>
      <feComposite in="blurHL" in2="SourceAlpha" operator="in" result="clipHL"/>
      <feFlood flood-color="#ffd200" flood-opacity="0.95" result="colHL"/>
      <feComposite in="colHL" in2="clipHL" operator="in" result="highlight"/>
      <feOffset in="SourceAlpha" dx="0.95" dy="-0.95" result="offSH"/>
      <feComposite in="SourceAlpha" in2="offSH" operator="out" result="edgeSH"/>
      <feGaussianBlur in="edgeSH" stdDeviation="0.22" result="blurSH"/>
      <feComposite in="blurSH" in2="SourceAlpha" operator="in" result="clipSH"/>
      <feFlood flood-color="#9e2a00" flood-opacity="0.78" result="colSH"/>
      <feComposite in="colSH" in2="clipSH" operator="in" result="bevelShadow"/>
      <feMerge>
        <feMergeNode in="SourceGraphic"/>
        <feMergeNode in="bevelShadow"/>
        <feMergeNode in="highlight"/>
      </feMerge>
    </filter>
  </defs>
  <g filter="url(#outer-shadow)">
    <path filter="url(#bevel-orange)" fill="#ff7800" d="M 12.0 11.1 C 12.0 10.1 12.7 9.5 13.6 9.5 H 50.8 C 51.8 9.5 52.4 10.1 52.4 11.05 C 52.4 12.0 51.8 12.6 50.8 12.6 H 15.1 V 36.8 C 15.1 37.8 14.5 38.4 13.55 38.4 C 12.6 38.4 12.0 37.8 12.0 36.8 Z"/>
    <g filter="url(#bevel-red)" fill="#d7201e" fill-rule="evenodd">
      <path d="M 24.4 20.8 H 33.4 V 33.8 H 45.0 V 24.3 L 41.5 20.8 H 50.8 V 65.4 L 45.0 67.4 V 39.8 H 33.4 V 65.4 L 27.8 67.4 V 24.3 Z"/>
      <path d="M 52.0 20.8 H 69.5 C 76.2 20.8 83.6 29.0 83.6 42.5 C 83.6 52.5 80.2 57.2 74.0 60.2 L 55.3 67.4 V 24.3 Z M 61.0 26.2 V 58.2 C 70.2 55.4 78.2 51.5 78.2 42.0 C 78.2 31.8 73.6 26.2 67.2 26.2 Z"/>
      <path d="M 188.9 20.8 H 190.2 V 53.6 H 192.8 Q 193.9 53.2 194.6 50.9 H 195.4 V 58.6 C 195.2 59.8 194.9 61.2 194.9 62.4 C 194.9 63.5 193.6 63.5 193.6 62.4 C 193.6 61.2 193.3 59.6 192.6 58.8 H 190.0 V 64.2 C 190.9 65.8 192.2 66.8 193.6 67.6 H 180.2 C 181.8 66.8 183.2 65.7 184.0 64.2 V 58.8 H 182.3 C 181.6 59.6 181.5 61.2 181.5 62.4 C 181.5 63.5 180.3 63.5 180.3 62.4 C 180.3 61.2 180.1 59.6 179.4 58.8 H 178.3 C 177.9 60.9 176.3 60.9 175.9 58.8 H 175.0 C 174.4 59.6 174.3 62.2 174.3 64.4 C 174.3 65.6 173.1 65.6 173.1 64.4 C 173.1 62.2 173.0 59.6 172.4 58.8 H 171.9 C 171.5 61.0 170.1 61.0 169.7 58.8 H 168.3 Z M 184.0 40.4 L 182.3 43.6 V 50.7 C 182.3 51.8 181.1 51.8 181.1 50.7 V 45.8 L 177.2 53.6 H 184.0 Z"/>
      <path d="M 198.2 29.2 H 206.8 V 48.6 L 217.8 44.8 V 29.2 H 224.2 V 54.3 L 217.8 56.6 V 51.4 L 201.2 56.6 V 33.0 Z"/>
    </g>
    <g filter="url(#bevel-white)" fill="#e0e0e0" fill-rule="evenodd">
      <path d="M 82.6 20.8 H 91.6 V 33.8 H 103.2 V 24.3 L 99.7 20.8 H 109.0 V 65.4 L 103.2 67.4 V 39.8 H 91.6 V 65.4 L 86.0 67.4 V 24.3 Z"/>
      <path d="M 110.2 29.2 H 118.8 V 48.6 L 129.8 44.8 V 29.2 H 136.2 V 54.3 L 129.8 56.6 V 51.4 L 113.2 56.6 V 33.0 Z"/>
      <path d="M 136.8 20.6 H 156.0 C 161.2 20.6 163.0 24.4 163.0 29.2 C 163.0 32.5 161.6 34.0 160.4 34.8 C 163.8 36.2 166.3 40.2 166.3 46.5 C 166.3 54.0 163.4 57.8 157.8 60.4 L 140.2 67.4 V 24.3 Z M 147.2 26.2 V 33.8 H 152.8 C 155.8 33.8 157.5 32.0 157.5 29.6 C 157.5 27.2 155.8 26.2 152.8 26.2 Z M 147.2 39.8 V 58.2 C 154.2 55.4 161.6 52.2 161.6 46.2 C 161.6 41.4 158.6 39.8 153.8 39.8 Z"/>
    </g>
    <path filter="url(#bevel-orange)" fill="#ff7800" d="M 232.2 47.2 C 233.15 47.2 233.75 47.8 233.75 48.75 V 73.2 C 233.75 74.2 233.1 74.8 232.15 74.8 H 198.6 C 197.6 74.8 197.0 74.2 197.0 73.25 C 197.0 72.3 197.6 71.7 198.6 71.7 H 230.65 V 48.75 C 230.65 47.8 231.25 47.2 232.2 47.2 Z"/>
  </g>
</svg>`
  const SITE_ICON_SVG = String.raw`<svg xmlns="http://www.w3.org/2000/svg" viewBox="3.442 15.457 185.245 159.194" width="192" height="192">
  <defs>
    <filter id="outer-shadow" filterUnits="userSpaceOnUse" x="-16" y="-16" width="224" height="224">
      <feMorphology in="SourceAlpha" operator="dilate" radius="2.0" result="haloMask"/>
      <feGaussianBlur in="SourceAlpha" stdDeviation="4.8" result="blur"/>
      <feOffset in="blur" dx="0" dy="2.2" result="offsetBlur"/>
      <feFlood flood-color="#000000" flood-opacity="0.28" result="shadowColor"/>
      <feComposite in="shadowColor" in2="offsetBlur" operator="in" result="softShadow"/>
      <feComposite in="softShadow" in2="haloMask" operator="out" result="maskedShadow"/>
      <feMerge>
        <feMergeNode in="maskedShadow"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    <filter id="bevel-red" filterUnits="userSpaceOnUse" x="-10" y="-10" width="212" height="212">
      <feOffset in="SourceAlpha" dx="-2.4" dy="2.4" result="offHL"/>
      <feComposite in="SourceAlpha" in2="offHL" operator="out" result="edgeHL"/>
      <feGaussianBlur in="edgeHL" stdDeviation="0.65" result="blurHL"/>
      <feComposite in="blurHL" in2="SourceAlpha" operator="in" result="clipHL"/>
      <feFlood flood-color="#ff857a" flood-opacity="0.9" result="colHL"/>
      <feComposite in="colHL" in2="clipHL" operator="in" result="highlight"/>
      <feOffset in="SourceAlpha" dx="2.4" dy="-2.4" result="offSH"/>
      <feComposite in="SourceAlpha" in2="offSH" operator="out" result="edgeSH"/>
      <feGaussianBlur in="edgeSH" stdDeviation="0.65" result="blurSH"/>
      <feComposite in="blurSH" in2="SourceAlpha" operator="in" result="clipSH"/>
      <feFlood flood-color="#7a0000" flood-opacity="0.72" result="colSH"/>
      <feComposite in="colSH" in2="clipSH" operator="in" result="bevelShadow"/>
      <feOffset in="SourceAlpha" dx="-1.3" dy="1.3" result="offRim"/>
      <feFlood flood-color="#261212" flood-opacity="0.58" result="colRim"/>
      <feComposite in="colRim" in2="offRim" operator="in" result="darkRim"/>
      <feMerge>
        <feMergeNode in="darkRim"/>
        <feMergeNode in="SourceGraphic"/>
        <feMergeNode in="bevelShadow"/>
        <feMergeNode in="highlight"/>
      </feMerge>
    </filter>
    <filter id="bevel-orange" filterUnits="userSpaceOnUse" x="-10" y="-10" width="212" height="212">
      <feOffset in="SourceAlpha" dx="-2.0" dy="2.0" result="offHL"/>
      <feComposite in="SourceAlpha" in2="offHL" operator="out" result="edgeHL"/>
      <feGaussianBlur in="edgeHL" stdDeviation="0.45" result="blurHL"/>
      <feComposite in="blurHL" in2="SourceAlpha" operator="in" result="clipHL"/>
      <feFlood flood-color="#ffd200" flood-opacity="0.95" result="colHL"/>
      <feComposite in="colHL" in2="clipHL" operator="in" result="highlight"/>
      <feOffset in="SourceAlpha" dx="2.0" dy="-2.0" result="offSH"/>
      <feComposite in="SourceAlpha" in2="offSH" operator="out" result="edgeSH"/>
      <feGaussianBlur in="edgeSH" stdDeviation="0.45" result="blurSH"/>
      <feComposite in="blurSH" in2="SourceAlpha" operator="in" result="clipSH"/>
      <feFlood flood-color="#9e2a00" flood-opacity="0.78" result="colSH"/>
      <feComposite in="colSH" in2="clipSH" operator="in" result="bevelShadow"/>
      <feMerge>
        <feMergeNode in="SourceGraphic"/>
        <feMergeNode in="bevelShadow"/>
        <feMergeNode in="highlight"/>
      </feMerge>
    </filter>
  </defs>
  <g filter="url(#outer-shadow)">
    <path filter="url(#bevel-orange)" fill="#ff7800" d="M 6.0 21.4 C 6.0 19.3 7.4 18.0 9.4 18.0 H 78.6 C 80.7 18.0 82.0 19.3 82.0 21.3 C 82.0 23.3 80.7 24.6 78.6 24.6 H 12.6 V 86.6 C 12.6 88.7 11.3 90.0 9.3 90.0 C 7.3 90.0 6.0 88.7 6.0 86.6 Z"/>
    <g filter="url(#bevel-red)" fill="#d7201e" fill-rule="evenodd">
      <path transform="translate(-31.5, -10.0) scale(2.25, 2.4)" d="M 24.4 20.8 H 33.4 V 33.8 H 45.0 V 24.3 L 41.5 20.8 H 50.8 V 65.4 L 45.0 67.4 V 39.8 H 33.4 V 65.4 L 27.8 67.4 V 24.3 Z"/>
      <path transform="translate(-21.0, -10.0) scale(2.25, 2.4)" d="M 52.0 20.8 H 69.5 C 76.2 20.8 83.6 29.0 83.6 42.5 C 83.6 52.5 80.2 57.2 74.0 60.2 L 55.3 67.4 V 24.3 Z M 61.0 26.2 V 58.2 C 70.2 55.4 78.2 51.5 78.2 42.0 C 78.2 31.8 73.6 26.2 67.2 26.2 Z"/>
    </g>
    <path filter="url(#bevel-orange)" fill="#ff7800" d="M 182.7 98.0 C 184.7 98.0 186.0 99.3 186.0 101.4 V 168.6 C 186.0 170.7 184.6 172.0 182.6 172.0 H 113.4 C 111.3 172.0 110.0 170.7 110.0 168.7 C 110.0 166.7 111.3 165.4 113.4 165.4 H 179.4 V 101.4 C 179.4 99.3 180.7 98.0 182.7 98.0 Z"/>
  </g>
</svg>`
  const HEADER_WORDMARK_DATA_URI = makeSvgDataUri(HEADER_WORDMARK_SVG)
  const SITE_ICON_DATA_URI = makeSvgDataUri(SITE_ICON_SVG)
  const applySiteBranding = () => {
    try {
      for (const iconLink of document.querySelectorAll('link[rel~="icon"]')) {
        if (iconLink.getAttribute("href") !== SITE_ICON_DATA_URI) {
          iconLink.type = "image/svg+xml"
          iconLink.removeAttribute("sizes")
          iconLink.setAttribute("href", SITE_ICON_DATA_URI)
        }
      }
    } catch {
      return false
    }
    return true
  }

  // src/hdhub4u/config.js
  const CONFIG = Object.freeze({
    themeColor: "#0a0a0a",
    pageDiscoveryTimeoutMs: 4e3,
    pageLoaderTimeoutMs: 4e3,
    mobileLayoutBreakpointRem: 52,
    searchPagePath: "/search.html",
    mobileMenuWidth: "280px",
    mobileMenuPopoverId: "userpatch-mobile-menu",
    mobileNavigationWidth: "260px",
    storageKeys: Object.freeze({
      movieQualityTab: "userpatch-hdhub4u-quality-tab",
      seriesTab: "userpatch-hdhub4u-series-tab",
      openedReleases: "userpatch-hdhub4u-opened-releases",
    }),
    mobileNavigationItems: Object.freeze([
      Object.freeze(["/", "Home"]),
      Object.freeze(["menu", "Menu"]),
      Object.freeze(["search", "Search"]),
    ]),
  })
  const STYLE_ID = "userpatch-hdhub4u-maia-style"
  const FONT_STYLE_ID = "userpatch-hdhub4u-inter-font"
  const COLOR_SCHEME_META_ID = "userpatch-hdhub4u-color-scheme"
  const THEME_COLOR_META_ID = "userpatch-hdhub4u-theme-color"
  const DETAIL_PAGE_CLASS = "userpatch-detail-page"
  const HBLINKS_PAGE_CLASS = "userpatch-hblinks-page"
  const LISTING_READY_CLASS = "userpatch-listing-ready"
  const KEEP_CLASS = "userpatch-keep"

  // src/hblinks/css.js
  const HBLINKS_CSS = `
/* HUBLinks archive pages share the same dark surfaces, spacing, and type. */
html.userpatch-maia.userpatch-hblinks-page,
html.userpatch-maia.userpatch-hblinks-page body {
  min-block-size: 100%;
  margin: 0 !important;
  background: var(--maia-background) !important;
}

html.userpatch-maia.userpatch-hblinks-page body {
  min-block-size: 100dvh;
}

html.userpatch-maia.userpatch-hblinks-page #page {
  inline-size: 100%;
  max-inline-size: 100%;
  min-block-size: 100dvh;
  margin: 0;
  background: transparent;
}

/* The brand sits centered above the title, and the
   zeroed margins keep it from collapsing a gap through #page at the top. */
html.userpatch-maia.userpatch-hblinks-page #masthead.site-header {
  position: static;
  z-index: auto;
  inline-size: 100% !important;
  max-inline-size: 42rem !important;
  margin: 0 auto;
  padding: 1.25rem 1rem 0.5rem !important;
  border: 0;
  background: transparent;
}

html.userpatch-maia.userpatch-hblinks-page #masthead #header-top {
  display: flex;
  inline-size: 100% !important;
  min-block-size: 0;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin: 0 !important;
  padding: 0;
  border: 0;
  border-radius: 0;
  background: transparent;
  box-shadow: none;
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
}

html.userpatch-maia.userpatch-hblinks-page #masthead #header-middle {
  display: none !important;
}

html.userpatch-maia.userpatch-hblinks-page #masthead .site-branding,
html.userpatch-maia.userpatch-hblinks-page #masthead .site-branding a {
  margin: 0;
  /* Brand sizing matches the HubCloud redesign header. */
  color: var(--maia-foreground) !important;
  font-size: 1.35rem !important;
  font-weight: 700 !important;
  letter-spacing: -0.025em;
  text-decoration: none;
}

html.userpatch-maia.userpatch-hblinks-page #masthead .site-branding :is(p, h1, h2) {
  margin: 0;
  text-align: center;
}

html.userpatch-maia.userpatch-hblinks-page #masthead :is(.site-description, .social-top) {
  display: none !important;
}

html.userpatch-maia.userpatch-hblinks-page #masthead .menu-toggle-container {
  display: none !important;
}

html.userpatch-maia.userpatch-hblinks-page #content {
  display: block !important;
  inline-size: 100% !important;
  max-inline-size: 42rem !important;
  margin-inline: auto;
  padding-inline: calc(clamp(0.75rem, 3vw, 1.25rem) + 0.25rem) !important;
}

html.userpatch-maia.userpatch-hblinks-page #primary.content-area {
  inline-size: 100% !important;
  max-inline-size: 42rem !important;
  min-inline-size: 0;
  flex: 1 1 auto;
  margin-inline: auto;
}

html.userpatch-maia.userpatch-hblinks-page main.site-main {
  inline-size: 100% !important;
  max-inline-size: 42rem !important;
  margin: 0 auto !important;
  padding: 0;
}

html.userpatch-maia.userpatch-hblinks-page main.site-main > article.post {
  overflow: visible;
  inline-size: 100%;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 0;
  background: transparent;
  color: var(--maia-foreground);
  box-shadow: none;
}

html.userpatch-maia.userpatch-hblinks-page .entry-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 0 !important;
  padding: 0;
  border: 0 !important;
  background: transparent !important;
  color: var(--maia-foreground);
}

html.userpatch-maia.userpatch-hblinks-page .userpatch-hblinks-titlebar {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  margin: 0;
  text-align: start;
}

html.userpatch-maia.userpatch-hblinks-page .userpatch-hblinks-title {
  margin: 0;
  color: var(--maia-foreground) !important;
  font-size: 1.125rem !important;
  font-weight: 400 !important;
  font-family: inherit !important;
  letter-spacing: -0.025em;
  line-height: 1.45;
  overflow-wrap: anywhere;
}

html.userpatch-maia.userpatch-hblinks-page .userpatch-hblinks-episode {
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
  margin: 0;
}

html.userpatch-maia.userpatch-hblinks-page .userpatch-hblinks-episode span {
  display: inline-flex;
  min-block-size: 1.75rem;
  align-items: center;
  padding-inline: 0.625rem;
  border: 1px solid var(--maia-border);
  border-radius: 9999px;
  background: var(--maia-muted);
  color: var(--maia-muted-foreground);
  font-size: 0.8125rem !important;
  line-height: 1;
}

html.userpatch-maia.userpatch-hblinks-page .userpatch-hblinks-options {
  inline-size: 100%;
  min-inline-size: 0;
  box-sizing: border-box;
  margin: 0 !important;
  padding: 0 !important;
  border-block-start: 1px solid var(--maia-border);
}

html.userpatch-maia.userpatch-hblinks-page .userpatch-hblinks-option-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: 0.75rem 1rem;
  margin: 0 !important;
  padding: 16px 0 !important;
  min-block-size: 4rem;
  min-inline-size: 0;
  border: 0 !important;
  border-block-end: 1px solid var(--maia-border) !important;
  background: transparent !important;
  color: var(--maia-foreground) !important;
  font-size: 1rem !important;
  font-weight: 500 !important;
  /* The theme's display font stylizes digits ("480p" becomes glyph soup);
     the list reads like 4KHDHub's rows, so it uses the clean sans stack. */
  font-family: "Inter Variable", ui-sans-serif, system-ui, -apple-system,
    BlinkMacSystemFont, "Segoe UI", sans-serif !important;
  line-height: 1.4;
  text-align: start !important;
}

html.userpatch-maia.userpatch-hblinks-page .userpatch-hblinks-option-title {
  min-inline-size: 0;
  overflow-wrap: anywhere;
  font-family: ui-sans-serif, system-ui, sans-serif !important;
}

html.userpatch-maia.userpatch-hblinks-page .userpatch-hblinks-actions {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: flex-end;
  gap: 0.75rem;
}

/* Flat icon actions like the 4KHDHub release rows: no pill chrome, the
   provider mark is the button. */
html.userpatch-maia.userpatch-hblinks-page a.userpatch-hblinks-action {
  display: inline-flex;
  min-inline-size: 2.75rem;
  min-block-size: 2.75rem;
  align-items: center;
  justify-content: center;
  padding: 0 !important;
  border: 0 !important;
  border-radius: 0 !important;
  background: transparent !important;
  color: var(--maia-foreground) !important;
  font-size: 0.875rem !important;
  font-weight: 500;
  line-height: 1;
  text-decoration: none !important;
  overflow: visible !important;
  transition:
    opacity 140ms ease,
    transform 140ms var(--ease-out);
}

@media (hover: hover) and (pointer: fine) {
  html.userpatch-maia.userpatch-hblinks-page a.userpatch-hblinks-action:hover {
    opacity: 0.78;
  }
}

html.userpatch-maia.userpatch-hblinks-page a.userpatch-hblinks-action:active {
  transform: scale(0.95);
}

html.userpatch-maia.userpatch-hblinks-page a.userpatch-hblinks-action img {
  display: block !important;
  margin: 0 !important;
  inline-size: 36px !important;
  block-size: 36px !important;
  object-fit: contain;
}

@media (max-width: 40rem) {
  html.userpatch-maia.userpatch-hblinks-page #content {
    padding-inline: calc(clamp(0.75rem, 3vw, 1.25rem) + 0.25rem) !important;
  }

}

html.userpatch-maia.userpatch-hblinks-page #content {
  margin-block: 0 !important;
  box-sizing: border-box;
  padding-block: 1rem 0.5rem !important;
}
html.userpatch-maia.userpatch-hblinks-page :is(#secondary, #colophon, .entry-header, .entry-footer, .post-navigation, #comments) {
  display: none !important;
}
html.userpatch-maia.userpatch-hblinks-page #masthead .site-branding a {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.65rem;
  font-family: "Inter Variable", ui-sans-serif, system-ui, sans-serif !important;
  line-height: 38px;
}
html.userpatch-maia.userpatch-hblinks-page #masthead .userpatch-hblinks-logo {
  display: block;
  inline-size: 38px;
  block-size: 38px;
  flex: none;
  margin: 0;
}
html.userpatch-maia.userpatch-hblinks-page #page > br {
  display: none !important;
}
`

  // src/shared/detail-info.js
  const createDetailInfoList = (entries) => {
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
  const DETAIL_INFO_CSS = `
html.userpatch-maia.userpatch-detail-page body .userpatch-detail-info {
  container: detail-info / inline-size;
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

  // src/shared/progressive-images.js
  const preparedImages = new WeakSet()
  const pendingImages = new Map()
  let imageObserver = null
  const getSmallImageUrl = (source) => {
    try {
      const url = new URL(source, location.href)
      if (
        url.hostname === "image.tmdb.org" &&
        /^\/t\/p\/(w\d+|original)\//.test(url.pathname)
      ) {
        url.pathname = url.pathname.replace(/^\/t\/p\/[^/]+\//, "/t/p/w92/")
        return url.href
      }
    } catch {}
    return source
  }
  const setupProgressiveImage = (img, highResUrl) => {
    if (!(img instanceof HTMLImageElement) || preparedImages.has(img)) {
      return
    }
    preparedImages.add(img)
    img.classList.add("userpatch-progressive-image")
    img.draggable = false
    img.decoding = "async"
    const original = img.src
    const full = highResUrl || original
    const finish = () => img.classList.add("userpatch-image-loaded")
    if (img.complete && img.naturalWidth && full === original) {
      finish()
      return
    }
    const start = () => {
      const small =
        highResUrl || img.srcset ? original : getSmallImageUrl(original)
      let upgrading = false
      const upgrade = () => {
        if (upgrading) {
          return
        }
        upgrading = true
        img.removeEventListener("load", upgrade)
        img.removeEventListener("error", upgrade)
        const high = new Image()
        high.decoding = "async"
        high.fetchPriority = img.fetchPriority
        high.addEventListener(
          "load",
          async () => {
            try {
              await high.decode()
            } catch {}
            if (img.isConnected) {
              img.src = full
              finish()
            }
          },
          { once: true }
        )
        high.addEventListener("error", finish, { once: true })
        high.src = full
      }
      if (small !== full) {
        img.addEventListener("load", upgrade, { once: true })
        img.addEventListener("error", upgrade, { once: true })
        img.src = small
        if (img.complete && img.naturalWidth) {
          img.removeEventListener("load", upgrade)
          img.removeEventListener("error", upgrade)
          upgrade()
        }
      } else if (img.complete && img.naturalWidth) {
        finish()
      } else {
        img.addEventListener("load", finish, { once: true })
        img.addEventListener("error", finish, { once: true })
      }
    }
    if (img.loading === "lazy" && "IntersectionObserver" in window) {
      imageObserver ||= new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              imageObserver.unobserve(entry.target)
              pendingImages.get(entry.target)?.()
              pendingImages.delete(entry.target)
            }
          }
        },
        { rootMargin: "200px" }
      )
      pendingImages.set(img, start)
      imageObserver.observe(img)
    } else {
      start()
    }
  }
  const PROGRESSIVE_IMAGE_CSS = `
html.userpatch-maia img.userpatch-progressive-image {
  filter: blur(10px) !important;
  opacity: 0.85;
  transition: filter 280ms ease, opacity 280ms ease !important;
}
html.userpatch-maia img.userpatch-progressive-image.userpatch-image-loaded {
  filter: none !important;
  opacity: 1 !important;
}
@media (prefers-reduced-motion: reduce) {
  html.userpatch-maia img.userpatch-progressive-image { transition: none !important; }
}
`
  window.addEventListener("pagehide", () => imageObserver?.disconnect())
  window.addEventListener("pageshow", (event) => {
    if (event.persisted) {
      for (const image of pendingImages.keys()) {
        if (image.isConnected) {
          imageObserver?.observe(image)
        } else {
          pendingImages.delete(image)
        }
      }
    }
  })

  // src/hdhub4u/screenshot-viewer.js
  let viewer = null
  const resetScreenshotViewer = () => {
    if (viewer?.open) {
      viewer.close()
    }
    viewer?.remove()
    viewer = null
  }
  const openScreenshotViewer = (source, alt, fallback) => {
    if (!viewer) {
      viewer = document.createElement("dialog")
      viewer.className = "userpatch-screenshot-viewer"
      viewer.setAttribute("aria-label", "Screenshot viewer")
      const close = document.createElement("button")
      close.type = "button"
      close.autofocus = true
      close.setAttribute("aria-label", "Close fullscreen screenshot")
      const image = document.createElement("img")
      image.decoding = "async"
      image.addEventListener("error", () => {
        const fallbackUrl = image.dataset.fallback
        if (fallbackUrl && image.src !== fallbackUrl) {
          image.src = fallbackUrl
        }
      })
      close.append(image)
      close.addEventListener("click", () => viewer.close())
      viewer.append(close)
      document.body.append(viewer)
    }
    const image = viewer.querySelector("img")
    image.alt = alt || "Screenshot"
    image.dataset.fallback = fallback || ""
    image.src = source
    viewer.showModal()
  }
  const SCREENSHOT_VIEWER_CSS = `
html.userpatch-maia dialog.userpatch-screenshot-viewer {
  position: fixed; inset: 0; inline-size: 100%; block-size: 100dvh;
  max-inline-size: none; max-block-size: none; margin: 0; padding: 0;
  border: 0; background: #0a0a0a; color: #fafafa;
}
html.userpatch-maia dialog.userpatch-screenshot-viewer:modal { overscroll-behavior: contain; }
html.userpatch-maia dialog.userpatch-screenshot-viewer::backdrop {
  background: #0a0a0a; overflow: hidden; overscroll-behavior: contain;
}
html.userpatch-maia dialog.userpatch-screenshot-viewer button {
  display: grid; place-items: center; inline-size: 100%; block-size: 100%;
  max-inline-size: none; margin: 0; padding: 0; border: 0; border-radius: 0;
  background: transparent; cursor: zoom-out;
}
html.userpatch-maia dialog.userpatch-screenshot-viewer button:focus-visible {
  outline: 2px solid #fafafa; outline-offset: -4px;
}
html.userpatch-maia dialog.userpatch-screenshot-viewer img {
  display: block; inline-size: 100%; block-size: 100%;
  max-inline-size: 100% !important; max-block-size: 100dvh !important;
  margin: 0; object-fit: contain;
}
html.userpatch-maia .userpatch-screenshot { cursor: zoom-in; }
`

  // src/hdhub4u/css.js
  const MAIA_CSS = `
${HBLINKS_CSS}
html.userpatch-maia {
  --maia-background: oklch(0.145 0 0);
  --maia-gutter: clamp(0.75rem, 1.5vw, 1rem);
  background: var(--maia-background) !important;
  --maia-foreground: oklch(0.985 0 0);
  --maia-card: oklch(0.205 0 0);
  --maia-card-foreground: oklch(0.985 0 0);
  --maia-popover: oklch(0.205 0 0);
  --maia-popover-foreground: oklch(0.985 0 0);
  --maia-primary: oklch(0.922 0 0);
  --maia-primary-foreground: oklch(0.205 0 0);
  --maia-secondary: oklch(0.269 0 0);
  --maia-secondary-foreground: oklch(0.985 0 0);
  --maia-muted: oklch(0.269 0 0);
  --maia-muted-foreground: oklch(0.708 0 0);
  --maia-accent: oklch(0.269 0 0);
  --maia-accent-foreground: oklch(0.985 0 0);
  --maia-border: oklch(1 0 0 / 10%);
  --maia-input: oklch(1 0 0 / 15%);
  --maia-ring: oklch(0.556 0 0);
  --maia-opened-blue: oklch(0.58 0.2 250);
  --ease-out: cubic-bezier(0.23, 1, 0.32, 1);
  --ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);
  --maia-radius: 0.625rem;
  --maia-card-depth-shadow: inset 0 1px 2px rgb(255 255 255 / 0.09),
    0 2px 4px rgb(0 0 0 / 0.5), 0 4px 8px rgb(0 0 0 / 0.3);
  --maia-radius-xl: calc(var(--maia-radius) * 1.4);
  --maia-radius-2xl: calc(var(--maia-radius) * 1.8);
  --maia-radius-4xl: calc(var(--maia-radius) * 2.6);
}

/* Base */

html.userpatch-maia {
  -webkit-tap-highlight-color: transparent;
  -webkit-text-size-adjust: 100%;
  color-scheme: dark;
}

html.userpatch-maia button,
html.userpatch-maia [role="button"],
html.userpatch-maia .userpatch-nav-link,
html.userpatch-maia .userpatch-header-action,
html.userpatch-maia .userpatch-mobile-nav-item,
html.userpatch-maia .userpatch-quality-tab,
html.userpatch-maia .userpatch-mode-tab,
html.userpatch-maia .userpatch-provider-link,
html.userpatch-maia .userpatch-mobile-menu-link,
html.userpatch-maia .userpatch-mobile-menu-summary,
html.userpatch-maia .userpatch-mobile-menu-close {
  touch-action: manipulation;
  user-select: none;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
}

@media (pointer: coarse) {
  html.userpatch-maia input,
  html.userpatch-maia textarea,
  html.userpatch-maia select {
    font-size: 16px !important;
  }
}

html.userpatch-maia,
html.userpatch-maia body {
  color: var(--maia-foreground) !important;
  font-size: 1rem !important;
  line-height: 1.5;
  overscroll-behavior-x: auto;
  overscroll-behavior-y: none;
  font-family: "Inter Variable", ui-sans-serif, system-ui, -apple-system,
    BlinkMacSystemFont, "Segoe UI", sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

html.userpatch-maia,
html.userpatch-maia body,
html.userpatch-maia :where(*) {
  scrollbar-width: none !important;
  -ms-overflow-style: none !important;
}

html.userpatch-maia::-webkit-scrollbar,
html.userpatch-maia body::-webkit-scrollbar,
html.userpatch-maia :where(*)::-webkit-scrollbar {
  display: none !important;
  inline-size: 0 !important;
  block-size: 0 !important;
}

html.userpatch-maia body {
  background: var(--maia-background) !important;
  color: var(--maia-foreground) !important;
}

/* The site clamps html/body overflow (overflow-x:hidden plus an
   overflow:hidden rule), which turns the body into a clipped scroll box and
   stops position:sticky from ever engaging. clip on the horizontal axis
   keeps the cutoff without creating a scroll box, and the vertical axis is
   returned to visible so the viewport scrolls normally again. */
html.userpatch-maia,
html.userpatch-maia body {
  overflow-x: clip !important;
  overflow-y: visible !important;
}

/* Normalize the theme's scattered 14px/15px/17px sizes to the interface's
   single reading size, exactly like the sibling redesign does. Rules that
   need a different size are prefixed with html.userpatch-maia, so they
   out-rank this zero-specificity sweep. */
html.userpatch-maia body :where(
    p,
    span,
    div,
    a,
    li,
    td,
    th,
    strong,
    b,
    em,
    i,
    u,
    label,
    figcaption,
    blockquote,
    dd,
    dt
  ) {
  font-size: 1rem !important;
}

html.userpatch-maia body :where(.text-xs, .text-sm, .small, small) {
  font-size: 1rem !important;
}

html.userpatch-maia body,
html.userpatch-maia main#main-content {
  transition: none !important;
}

html.userpatch-maia a:focus-visible,
html.userpatch-maia button:focus-visible,
html.userpatch-maia summary:focus-visible,
html.userpatch-maia [role="button"]:focus-visible {
  outline: 1px solid var(--maia-ring) !important;
  outline-offset: 0;
  box-shadow: 0 0 0 3px color-mix(in oklch, var(--maia-ring) 50%, transparent) !important;
}

html.userpatch-maia button,
html.userpatch-maia input,
html.userpatch-maia select,
html.userpatch-maia textarea {
  font-family: inherit;
}

html.userpatch-maia svg[data-userpatch-lucide-icon] {
  fill: none !important;
  stroke: currentColor !important;
  flex: none;
}

/* Legacy chrome that the redesign replaces or silences */

html.userpatch-maia header.primary-header,
html.userpatch-maia footer.primay-footer,
html.userpatch-maia ins,
html.userpatch-maia body > br,
html.userpatch-maia .hd-dns-notice,
html.userpatch-maia section.sitewide-notice,
html.userpatch-maia .home-categories,
html.userpatch-maia .code-block,
html.userpatch-maia #wpd-editor-source-code-wrapper {
  display: none !important;
}

/* Header pill */

html.userpatch-maia .userpatch-header {
  position: sticky;
  inset-block-start: 3rem;
  z-index: 100;
  display: flex;
  justify-content: safe center;
  margin-block: 2.5rem;
  padding: 0;
  pointer-events: none;
}

html.userpatch-maia .userpatch-header-inner {
  position: relative;
  display: flex;
  inline-size: fit-content;
  max-inline-size: calc(100% - 1.5rem);
  block-size: 3.75rem;
  min-block-size: 3.75rem;
  box-sizing: border-box;
  align-items: center;
  isolation: isolate;
  overflow: visible;
  margin-inline: auto;
  border-radius: 1.25rem;
  /* 6px inset keeps the 14px brand radius concentric with the 20px pill */
  padding: 0.375rem;
  pointer-events: auto;
}

html.userpatch-maia .userpatch-header-inner::before {
  position: absolute;
  z-index: -1;
  inset: 0;
  border-radius: inherit;
  background: color-mix(in oklch, var(--maia-card) 60%, transparent);
  box-shadow: 0 10px 40px rgb(0 0 0 / 0.2);
  backdrop-filter: saturate(2.2) blur(16px);
  -webkit-backdrop-filter: saturate(2.2) blur(16px);
  content: "";
  pointer-events: none;
}

html.userpatch-maia .userpatch-header-inner::after {
  position: absolute;
  z-index: 1;
  inset: 0;
  border-radius: inherit;
  box-shadow:
    inset 0.5px 0.5px var(--maia-foreground),
    inset 0.5px -0.5px var(--maia-foreground),
    inset -0.5px 0.5px var(--maia-foreground),
    inset -0.5px -0.5px var(--maia-foreground);
  opacity: 0.2;
  content: "";
  pointer-events: none;
}

html.userpatch-maia .userpatch-header-container {
  position: relative;
  z-index: 3;
  display: flex;
  inline-size: fit-content;
  max-inline-size: 100%;
  block-size: 100%;
  min-block-size: 100%;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  isolation: isolate;
  margin: 0;
  padding: 0;
  border-radius: inherit;
}

html.userpatch-maia .userpatch-brand {
  position: relative;
  z-index: 1;
  display: inline-flex;
  box-sizing: border-box !important;
  min-inline-size: 3rem;
  block-size: 3rem !important;
  min-block-size: 3rem;
  align-items: center;
  justify-content: center;
  padding-inline: 0.375rem;
  border-radius: 0.875rem;
  text-decoration: none;
  transition: transform 140ms var(--ease-out);
}

html.userpatch-maia .userpatch-brand img {
  display: block;
  inline-size: 6.375rem;
  max-inline-size: none;
  max-block-size: 2.25rem;
  object-fit: contain;
}

html.userpatch-maia .userpatch-nav-list {
  position: relative;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  gap: 0.1875rem;
  margin: 0;
  padding: 0;
  list-style: none;
  overflow: visible;
  min-inline-size: 0;
  isolation: isolate;
}

html.userpatch-maia .userpatch-brand,
html.userpatch-maia .userpatch-header-action {
  flex: none;
}

/* Measured against the real nav width: full padding needs ~84rem, compact
   padding fits down to ~68rem, and below that the drawer takes over. */
@media (max-width: 68rem) {
  html.userpatch-maia .userpatch-nav {
    display: none !important;
  }
}

html.userpatch-maia .userpatch-nav-item {
  position: relative;
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
}

html.userpatch-maia .userpatch-nav-item.dropdown.open,
html.userpatch-maia .userpatch-nav-item.dropdown:hover,
html.userpatch-maia .userpatch-nav-item.dropdown:focus-within {
  z-index: 100;
}

html.userpatch-maia .userpatch-nav-item.dropdown::after {
  position: absolute;
  inset-block-start: calc(100% - 0.125rem);
  inset-inline: 0;
  z-index: 2;
  block-size: 0.75rem;
  content: "";
}

/* Fallback for links the redesign does not rebuild (raw mirror-homepage
   cards): give their keyboard focus the same ring the styled cards use. */
html.userpatch-maia main a:focus-visible {
  outline: none !important;
  box-shadow:
    0 0 0 2px var(--maia-background),
    0 0 0 4px var(--maia-ring) !important;
}

html.userpatch-maia .userpatch-nav-link {
  position: relative;
  z-index: 1;
  display: inline-flex;
  box-sizing: border-box !important;
  margin: 0;
  block-size: auto !important;
  min-block-size: 3rem;
  align-items: center;
  justify-content: center;
  gap: 0.375rem;
  padding: 0.625rem 1.125rem !important;
  border: 0 !important;
  border-radius: 0.875rem !important;
  background: transparent !important;
  color: var(--maia-foreground) !important;
  font: inherit;
  font-size: 1rem !important;
  font-weight: 500 !important;
  line-height: 1.25 !important;
  text-decoration: none !important;
  white-space: nowrap !important;
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  transition:
    transform 140ms var(--ease-out),
    background-color 140ms ease,
    color 140ms var(--ease-out);
}

@media (hover: hover) and (pointer: fine) {
  html.userpatch-maia .userpatch-header-action:hover {
    background: color-mix(in oklch, var(--maia-foreground) 9%, transparent) !important;
    color: var(--maia-foreground) !important;
  }
}

/* The shared header indicator supplies this hover fill where it is visible. */
@media (min-width: 46.01rem) and (hover: hover) and (pointer: fine) {
  html.userpatch-maia .userpatch-header-action:hover {
    background: transparent !important;
  }
}

html.userpatch-maia .userpatch-nav-link svg {
  inline-size: 1rem;
  block-size: 1rem;
  color: var(--maia-muted-foreground);
}

@media (min-width: 68.01rem) and (max-width: 84rem) {
  html.userpatch-maia .userpatch-nav-link {
    padding: 0.625rem 0.625rem !important;
    font-size: 0.875rem !important;
  }

  html.userpatch-maia .userpatch-brand {
    padding-inline: 0.25rem;
  }
}

html.userpatch-maia .userpatch-nav-indicator {
  position: absolute;
  z-index: 0;
  inset-block-start: 0;
  inset-inline-start: 0;
  display: block;
  inline-size: 6.25rem;
  block-size: 2.75rem;
  border-radius:
    var(--userpatch-nav-radius-x, 0.875rem) /
    var(--userpatch-nav-radius-y, 0.875rem);
  background: color-mix(in oklch, var(--maia-foreground) 9%, transparent);
  box-shadow: inset 0 1px 2px color-mix(in oklch, var(--maia-foreground) 12%, transparent);
  opacity: 0;
  pointer-events: none;
  transform: translate3d(
      var(--userpatch-nav-x, 0px),
      var(--userpatch-nav-y, 0px),
      0
    )
    scale(
      var(--userpatch-nav-scale-x, 1),
      var(--userpatch-nav-scale-y, 1)
    );
  transform-origin: left top;
  transition: opacity 160ms var(--ease-out);
}

html.userpatch-maia .userpatch-nav-indicator[data-ready="true"] {
  opacity: 1;
}

html.userpatch-maia .userpatch-nav-indicator[data-animate="true"] {
  transition:
    transform 240ms cubic-bezier(0.77, 0, 0.175, 1),
    opacity 160ms var(--ease-out);
}

html.userpatch-maia .userpatch-dropdown-menu {
  position: absolute;
  /* 1px below the trigger, matching 4K-HDHub's flush dropdowns. */
  inset-block-start: calc(100% + 1px);
  inset-inline-start: 0;
  z-index: 1000;
  min-inline-size: 12rem;
  /* Keep long menus scrollable without letting them run below the viewport. */
  max-block-size: min(24rem, calc(100dvh - 7rem));
  overflow-y: auto;
  margin: 0;
  padding: 0.375rem;
  border-radius: var(--maia-radius-2xl);
  background: var(--maia-popover);
  color: var(--maia-popover-foreground);
  box-shadow:
    0 25px 50px -12px rgb(0 0 0 / 0.5),
    0 0 0 1px color-mix(in oklch, var(--maia-foreground) 10%, transparent);
  list-style: none;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transform: translateY(4px);
  transition:
    opacity 140ms var(--ease-out),
    transform 140ms var(--ease-out),
    visibility 140ms var(--ease-out);
}

html.userpatch-maia .userpatch-nav-item.dropdown.open > .userpatch-dropdown-menu,
html.userpatch-maia .userpatch-nav-item.dropdown:hover > .userpatch-dropdown-menu,
html.userpatch-maia .userpatch-nav-item.dropdown:focus-within > .userpatch-dropdown-menu {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
  transform: translateY(0);
}

html.userpatch-maia .userpatch-dropdown-item {
  display: flex;
  min-block-size: 2.25rem;
  align-items: center;
  padding: 0.5rem 0.75rem;
  border-radius: var(--maia-radius-xl);
  color: var(--maia-popover-foreground);
  font-size: 1rem;
  font-weight: 400;
  text-decoration: none;
  white-space: nowrap;
}

html.userpatch-maia .userpatch-dropdown-item:focus-visible {
  background: var(--maia-muted);
  color: var(--maia-foreground);
}

@media (hover: hover) and (pointer: fine) {
  html.userpatch-maia .userpatch-dropdown-item:hover {
    background: var(--maia-muted);
    color: var(--maia-foreground);
  }
}

html.userpatch-maia .userpatch-dropdown-item:active {
  background: var(--maia-accent);
  color: var(--maia-foreground);
}

html.userpatch-maia .userpatch-header-action {
  position: relative;
  z-index: 1;
  display: inline-flex;
  inline-size: 3rem;
  min-inline-size: 3rem;
  block-size: 3rem;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
  border: 0 !important;
  border-radius: 0.875rem !important;
  background: transparent !important;
  color: var(--maia-foreground) !important;
  cursor: pointer;
  transition:
    transform 140ms var(--ease-out),
    color 140ms var(--ease-out);
}

html.userpatch-maia .userpatch-menu-toggle {
  display: none;
}

@media (max-width: 68rem) {
  html.userpatch-maia .userpatch-menu-toggle {
    display: inline-flex;
  }
}

html.userpatch-maia .userpatch-header-action svg {
  inline-size: 1.25rem;
  block-size: 1.25rem;
}

html.userpatch-maia .userpatch-header-action:active {
  transform: scale(0.96);
}

html.userpatch-maia .userpatch-header-action:focus-visible {
  outline: 2px solid var(--maia-ring);
  outline-offset: -2px;
}

@media (max-width: 46rem) {
  html.userpatch-maia .userpatch-header {
    inset-block-start: 1rem;
    block-size: auto;
    min-block-size: 0;
    margin-block: 1rem 1.5rem;
    padding: 0;
    overflow: visible;
  }

  html.userpatch-maia .userpatch-header-inner {
    inline-size: calc(100% - 2rem);
    max-inline-size: calc(100% - 2rem);
    margin-inline: auto;
  }

  html.userpatch-maia .userpatch-header-container {
    inline-size: 100% !important;
    max-inline-size: 100%;
    justify-content: space-between;
    gap: 0.25rem;
  }

  html.userpatch-maia .userpatch-nav-indicator {
    display: none !important;
  }

  html.userpatch-maia .userpatch-brand {
    margin-inline-end: auto;
    padding-inline: 0.25rem;
  }
}

/* Search dialog */

html.userpatch-maia dialog.userpatch-search-dialog[open] {
  position: fixed;
  inset-block-start: 50%;
  inset-inline-start: 50%;
  display: flex;
  inline-size: min(45rem, calc(100dvw - 2rem));
  max-inline-size: none;
  max-block-size: calc(100dvh - 2rem);
  margin: 0;
  padding: 0;
  overflow: visible;
  transform: translate(-50%, -50%) scale(1);
  opacity: 1;
  border: 0;
  background: transparent;
  color: var(--maia-foreground);
  transition:
    transform 160ms var(--ease-out),
    opacity 160ms var(--ease-out);
}

@starting-style {
  html.userpatch-maia dialog.userpatch-search-dialog[open] {
    transform: translate(-50%, -50%) scale(0.96);
    opacity: 0;
  }
}

html.userpatch-maia dialog.userpatch-search-dialog::backdrop {
  overflow: hidden;
  background: rgb(0 0 0 / 80%);
  backdrop-filter: blur(2px);
  overscroll-behavior-x: auto;
  overscroll-behavior-y: contain;
  -webkit-backdrop-filter: blur(2px);
  transition: opacity 160ms var(--ease-out);
}

html.userpatch-maia dialog.userpatch-search-dialog:modal {
  overscroll-behavior-x: auto;
  overscroll-behavior-y: contain;
}

html.userpatch-maia dialog.userpatch-search-dialog .search-form {
  display: flex;
  flex: 1 1 auto;
  inline-size: 100%;
  min-inline-size: 0;
  margin: 0;
  padding: 0;
}

html.userpatch-maia dialog.userpatch-search-dialog .search-input-container {
  display: flex;
  box-sizing: border-box;
  inline-size: 100%;
  min-inline-size: 0;
  block-size: 3.5rem;
  min-block-size: 3.5rem;
  align-items: center;
  gap: 0;
  padding: 0 0.25rem 0 0;
  border: 1px solid rgb(255 255 255 / 20%);
  border-radius: 20px;
  background: rgb(38 38 40 / 60%);
  backdrop-filter: saturate(2.2) blur(16px);
  -webkit-backdrop-filter: saturate(2.2) blur(16px);
  transition: border-color 140ms ease-out;
}

html.userpatch-maia dialog.userpatch-search-dialog .search-input-container:has(
  .search-input-overlay:focus-visible
) {
  border-color: transparent;
  outline: 2px solid var(--maia-ring);
  outline-offset: 0;
}

@media (hover: hover) and (pointer: fine) {
  html.userpatch-maia dialog.userpatch-search-dialog .search-input-container:hover:not(:focus-within) {
    border-color: color-mix(in oklch, var(--maia-foreground) 38%, transparent);
  }
}

html.userpatch-maia .userpatch-input-group-addon {
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  padding-inline-start: 1rem;
}

html.userpatch-maia dialog.userpatch-search-dialog .search-icon-overlay {
  flex: 0 0 1.25rem;
  inline-size: 1.25rem;
  block-size: 1.25rem;
  color: #a1a1aa;
  pointer-events: none;
}

html.userpatch-maia dialog.userpatch-search-dialog .search-input-overlay {
  appearance: none;
  -webkit-appearance: none;
  flex: 1 1 auto;
  inline-size: auto;
  min-inline-size: 0;
  block-size: 100%;
  min-block-size: 0;
  padding: 0 0.75rem;
  border: 0;
  border-radius: 0;
  background: transparent;
  color: var(--maia-foreground);
  font-family: inherit;
  font-size: 1.125rem;
  font-weight: 400;
  line-height: 1.4;
  box-shadow: none;
  outline: 0;
}

html.userpatch-maia dialog.userpatch-search-dialog .search-input-overlay::placeholder {
  color: #a1a1aa;
  font-size: inherit;
  opacity: 1;
}

html.userpatch-maia dialog.userpatch-search-dialog .search-input-overlay::-webkit-search-cancel-button {
  display: none;
}

html.userpatch-maia dialog.userpatch-search-dialog .search-submit[hidden] {
  display: none !important;
}

@media (max-width: ${CONFIG.mobileLayoutBreakpointRem}rem) {
  html.userpatch-maia dialog.userpatch-search-dialog[open] {
    inset-block-start: calc(12px + env(safe-area-inset-top, 0px));
    max-block-size: calc(100dvh - 12px - 1rem - env(safe-area-inset-top, 0px));
    transform: translateX(-50%);
  }
}

/* Mobile bottom navigation and menu drawer */

html.userpatch-maia .userpatch-mobile-nav {
  display: none !important;
}

@media (max-width: ${CONFIG.mobileLayoutBreakpointRem}rem) {
  html.userpatch-maia:not(.userpatch-detail-page) .userpatch-mobile-nav {
    position: fixed;
    z-index: 2147483600;
    inset-inline: 0;
    inset-block-end: calc(20px + env(safe-area-inset-bottom, 0px));
    display: flex !important;
    inline-size: min(${CONFIG.mobileNavigationWidth}, calc(100vw - 48px));
    min-block-size: 72px;
    block-size: 72px;
    align-items: center;
    gap: 4px;
    box-sizing: border-box;
    margin-inline: auto;
    padding: 5px;
    border: 1px solid color-mix(in oklch, var(--maia-foreground) 10%, transparent);
    border-radius: 20px;
    background: color-mix(in oklch, var(--maia-card) 98%, transparent);
    box-shadow: 0 8px 30px rgb(0 0 0 / 0.38);
    backdrop-filter: saturate(1.8) blur(20px);
    -webkit-backdrop-filter: saturate(1.8) blur(20px);
  }
}

@media (max-width: ${CONFIG.mobileLayoutBreakpointRem}rem) {
  html.userpatch-maia:not(.userpatch-detail-page) .userpatch-header {
    display: none !important;
  }
}

html.userpatch-maia .userpatch-mobile-nav-item {
  display: flex;
  min-inline-size: 0;
  min-block-size: 62px;
  flex: 1 1 0;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  margin-block: 0 !important;
  margin-inline: 0 !important;
  padding: 4px 2px;
  border: 0;
  border-radius: 16px;
  background: transparent;
  color: var(--maia-muted-foreground);
  font: inherit;
  font-size: 0.75rem;
  line-height: 1.25;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition:
    transform 140ms var(--ease-out),
    background-color 140ms ease,
    color 140ms ease;
}

html.userpatch-maia .userpatch-mobile-nav-item:focus-visible {
  background: color-mix(in oklch, var(--maia-foreground) 10%, transparent);
  color: var(--maia-foreground);
  outline: 2px solid var(--maia-ring);
  outline-offset: -2px;
}

@media (hover: hover) and (pointer: fine) {
  html.userpatch-maia .userpatch-mobile-nav-item:hover {
    background: color-mix(in oklch, var(--maia-foreground) 10%, transparent);
    color: var(--maia-foreground);
  }
}

html.userpatch-maia .userpatch-mobile-nav-item:active {
  transform: scale(0.95);
  background: color-mix(in oklch, var(--maia-foreground) 12%, transparent);
}

html.userpatch-maia .userpatch-mobile-nav-item[aria-current="page"] {
  background: color-mix(in oklch, var(--maia-foreground) 9%, transparent);
  box-shadow: inset 0 1px 2px
    color-mix(in oklch, var(--maia-foreground) 12%, transparent);
  color: var(--maia-foreground);
}

html.userpatch-maia .userpatch-mobile-nav-icon {
  display: inline-flex;
  inline-size: 2rem;
  block-size: 2rem;
  flex: none;
  align-items: center;
  justify-content: center;
}

html.userpatch-maia .userpatch-mobile-nav-icon svg,
html.userpatch-maia .userpatch-mobile-nav-icon img {
  display: block;
  inline-size: 1.5rem;
  block-size: 1.5rem;
  object-fit: contain;
}

html.userpatch-maia .userpatch-mobile-nav-icon-brand {
  inline-size: 2rem;
  block-size: 2rem;
}

html.userpatch-maia .userpatch-mobile-nav-brand-logo {
  inline-size: 2rem !important;
  block-size: 2rem !important;
}

html.userpatch-maia .userpatch-mobile-menu:popover-open {
  position: fixed;
  inset-block: 0;
  inset-inline-start: 0;
  display: flex;
  inline-size: min(${CONFIG.mobileMenuWidth}, calc(100dvw - 2rem));
  block-size: 100dvh;
  max-block-size: 100dvh;
  max-inline-size: none;
  flex-direction: column;
  gap: 0;
  box-sizing: border-box;
  margin: 0 auto 0 0;
  padding: max(0.75rem, env(safe-area-inset-top, 0px)) 0.75rem
    max(0.75rem, env(safe-area-inset-bottom, 0px));
  overflow: hidden;
  overscroll-behavior-x: auto;
  overscroll-behavior-y: contain;
  border: 1px solid var(--maia-border);
  border-inline-start: 0;
  border-radius: 0 var(--maia-radius-2xl) var(--maia-radius-2xl) 0;
  background: var(--maia-card);
  color: var(--maia-foreground);
  box-shadow: 0 24px 64px rgb(0 0 0 / 0.45);
  transform: translateX(0);
  transition: transform 220ms var(--ease-drawer);
}

@starting-style {
  html.userpatch-maia .userpatch-mobile-menu:popover-open {
    transform: translateX(-100%);
  }
}

html.userpatch-maia .userpatch-mobile-menu:popover-open::backdrop {
  background: rgb(0 0 0 / 80%);
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
  transition: opacity 220ms var(--ease-out);
}

html.userpatch-maia .userpatch-mobile-menu-header {
  display: flex;
  min-block-size: 3.5rem;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0 0.5rem 0.75rem;
  border-bottom: 1px solid var(--maia-border);
}

html.userpatch-maia .userpatch-mobile-menu-title {
  margin: 0;
  color: var(--maia-foreground);
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.25;
}

html.userpatch-maia .userpatch-mobile-menu-close {
  display: inline-flex;
  inline-size: 2.5rem;
  block-size: 2.5rem;
  flex: none;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
  border: 1px solid var(--maia-border);
  border-radius: var(--maia-radius-xl);
  background: var(--maia-muted);
  color: var(--maia-foreground);
  cursor: pointer;
}

html.userpatch-maia .userpatch-mobile-menu-close svg,
html.userpatch-maia .userpatch-mobile-menu-summary svg {
  inline-size: 1.25rem;
  block-size: 1.25rem;
}

html.userpatch-maia .userpatch-mobile-menu-nav {
  min-block-size: 0;
  flex: 1 1 auto;
  overflow-x: hidden;
  overflow-y: auto;
  overscroll-behavior-x: auto;
  overscroll-behavior-y: contain;
  padding-block: 0.75rem;
}

html.userpatch-maia .userpatch-mobile-menu-list,
html.userpatch-maia .userpatch-mobile-menu-sublist {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

html.userpatch-maia .userpatch-mobile-menu-item {
  min-inline-size: 0;
  margin: 0;
  padding: 0;
}

html.userpatch-maia .userpatch-mobile-menu-link,
html.userpatch-maia .userpatch-mobile-menu-summary {
  display: flex;
  inline-size: 100%;
  min-block-size: 3rem;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  box-sizing: border-box;
  padding: 0.75rem 0.875rem;
  border: 0;
  border-radius: var(--maia-radius-xl);
  background: transparent;
  color: var(--maia-foreground);
  font: inherit;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.25;
  text-align: start;
  text-decoration: none;
  cursor: pointer;
  list-style: none;
}

html.userpatch-maia .userpatch-mobile-menu-summary::-webkit-details-marker {
  display: none;
}

html.userpatch-maia .userpatch-mobile-menu-link:focus-visible,
html.userpatch-maia .userpatch-mobile-menu-summary:focus-visible,
html.userpatch-maia .userpatch-mobile-menu-close:focus-visible {
  background: color-mix(in oklch, var(--maia-foreground) 9%, transparent);
  color: var(--maia-foreground);
  outline: 2px solid var(--maia-ring);
  outline-offset: -2px;
}

@media (hover: hover) and (pointer: fine) {
  html.userpatch-maia .userpatch-mobile-menu-link:hover,
  html.userpatch-maia .userpatch-mobile-menu-summary:hover {
    background: color-mix(in oklch, var(--maia-foreground) 9%, transparent);
    color: var(--maia-foreground);
  }
}

html.userpatch-maia .userpatch-mobile-menu-link:active,
html.userpatch-maia .userpatch-mobile-menu-summary:active,
html.userpatch-maia .userpatch-mobile-menu-close:active {
  background: color-mix(in oklch, var(--maia-foreground) 14%, transparent);
}

html.userpatch-maia .userpatch-mobile-menu-summary svg {
  flex: none;
  transition: transform 140ms ease-out;
}

html.userpatch-maia .userpatch-mobile-menu-group[open]
  .userpatch-mobile-menu-summary svg {
  transform: rotate(180deg);
}

html.userpatch-maia .userpatch-mobile-menu-sublist {
  gap: 0.125rem;
  padding: 0.125rem 0.25rem 0.5rem 0.75rem;
}

html.userpatch-maia .userpatch-mobile-menu-sublist .userpatch-mobile-menu-link {
  min-block-size: 2.5rem;
  padding-inline: 0.75rem;
  color: var(--maia-muted-foreground);
  font-size: 0.9375rem;
  font-weight: 400;
}

/* Listing pages (home, categories, search landings, pagination) */

html.userpatch-maia main#main-content.userpatch-listing-ready {
  display: block;
  inline-size: 100%;
  max-inline-size: 88rem;
  margin-inline: auto;
  padding: 0 var(--maia-gutter) clamp(2rem, 5vw, 4rem);
  padding-block-start: 1.5rem;
}

html.userpatch-maia main#main-content.userpatch-listing-ready > :not(.userpatch-keep) {
  display: none !important;
}

html.userpatch-maia main#main-content.userpatch-listing-ready > .userpatch-keep {
  float: none !important;
  inline-size: 100% !important;
  max-inline-size: none !important;
  box-sizing: border-box;
  margin: 0 !important;
  padding: 0 !important;
  background: transparent !important;
  box-shadow: none !important;
}

html.userpatch-maia main#main-content.userpatch-listing-ready h2.category-name {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  margin-block: 0.25rem 1rem !important;
  padding: 0 !important;
  border-radius: 0 !important;
  background: transparent !important;
  box-shadow: none !important;
  color: var(--maia-foreground) !important;
  font-size: 1.25rem !important;
  font-weight: 600 !important;
  letter-spacing: -0.02em;
  line-height: 1.3;
  height: auto !important;
  white-space: normal;
  overflow: visible;
  text-overflow: clip;
}

html.userpatch-maia main#main-content.userpatch-listing-ready h2.category-name i.material-icons {
  display: none !important;
}

html.userpatch-maia main#main-content.userpatch-listing-ready h2.category-name .material-text {
  color: var(--maia-foreground) !important;
  font-size: inherit !important;
}

html.userpatch-maia main#main-content.userpatch-listing-ready ul.recent-movies {
  display: grid !important;
  grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
  align-items: stretch;
  column-gap: 1rem !important;
  row-gap: 2rem !important;
  margin: 0 !important;
  padding: 0 !important;
  list-style: none !important;
}

@media (min-width: 40rem) {
  html.userpatch-maia main#main-content.userpatch-listing-ready ul.recent-movies {
    grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
  }
}

@media (min-width: 48rem) {
  html.userpatch-maia main#main-content.userpatch-listing-ready ul.recent-movies {
    grid-template-columns: repeat(5, minmax(0, 1fr)) !important;
  }
}

@media (min-width: 64rem) {
  html.userpatch-maia main#main-content.userpatch-listing-ready ul.recent-movies {
    grid-template-columns: repeat(6, minmax(0, 1fr)) !important;
  }
}

html.userpatch-maia main#main-content.userpatch-listing-ready ul.recent-movies li.thumb {
  position: static !important;
  float: none !important;
  inline-size: auto !important;
  /* The mirror theme forces min-width: 208px !important on these cards;
     without this reset the cards overflow their grid tracks and overlap. */
  min-inline-size: 0 !important;
  margin: 0 !important;
  padding: 0 !important;
  background: transparent !important;
  border: 0 !important;
  box-shadow: none !important;
  list-style: none !important;
}

html.userpatch-maia h2.category-name,
html.userpatch-maia .category-name,
html.userpatch-maia .page-title,
html.userpatch-maia .widget-title,
html.userpatch-maia .left-wrapper > h2,
html.userpatch-maia .home-wrapper > h2,
html.userpatch-maia .home-categories,
html.userpatch-maia .userpatch-detail-chips,
html.userpatch-maia .userpatch-metadata-card,
html.userpatch-maia .kp-header,
html.userpatch-maia .page-meta {
  display: none !important;
}

html.userpatch-maia main#main-content.userpatch-listing-ready li.thumb figure,
html.userpatch-maia .thumbnail-wrapper figure,
html.userpatch-maia figure {
  margin: 0 !important;
  padding: 0 !important;
  border: 0 !important;
  box-shadow: none !important;
  outline: none !important;
  background: transparent !important;
  border-radius: 0 !important;
  overflow: visible !important;
  }

html.userpatch-maia main#main-content.userpatch-listing-ready li.thumb figure > a {
  position: relative;
  display: block;
  aspect-ratio: 2 / 3;
  overflow: hidden;
  border: 1px solid color-mix(in oklch, var(--maia-foreground) 15%, transparent) !important;
  border-radius: 1rem !important;
  background: var(--maia-muted);
  box-shadow: var(--maia-card-depth-shadow);
  transition: box-shadow 140ms ease;
  text-decoration: none !important;
  user-select: none !important;
  -webkit-user-select: none !important;
  -webkit-user-drag: none !important;
  outline: none !important;
}

/* Keep the poster border steady against the source theme's hover styling. */
html.userpatch-maia main#main-content.userpatch-listing-ready li.thumb figure > a:hover {
  border-color: color-mix(in oklch, var(--maia-foreground) 15%, transparent) !important;
}

html.userpatch-maia main#main-content.userpatch-listing-ready li.thumb figure > a:focus,
html.userpatch-maia main#main-content.userpatch-listing-ready li.thumb figure > a:active {
  outline: none !important;
  box-shadow: var(--maia-card-depth-shadow) !important;
}

/* The focus ring lives on the card (not the poster link) so it wraps the
   poster and its title together, matching 4K-HDHub's listing cards. */
html.userpatch-maia main#main-content.userpatch-listing-ready li.thumb:focus-within {
  border-radius: 1rem !important;
  box-shadow:
    0 0 0 2px var(--maia-background),
    0 0 0 4px var(--maia-ring) !important;
}

html.userpatch-maia main#main-content.userpatch-listing-ready li.thumb figure > a:focus-visible {
  outline: none !important;
  box-shadow: none !important;
}

html.userpatch-maia main#main-content.userpatch-listing-ready li.thumb,
html.userpatch-maia main#main-content.userpatch-listing-ready li.thumb *,
html.userpatch-maia li.thumb figure a:focus,
html.userpatch-maia li.thumb figure a:active {
  outline: none !important;
  -webkit-user-drag: none !important;
  user-drag: none !important;
}

html.userpatch-maia main#main-content.userpatch-listing-ready li.thumb figure > a > img {
  position: absolute;
  inset: 0;
  display: block;
  inline-size: 100%;
  block-size: 100% !important;
  max-inline-size: none;
  object-fit: cover;
  user-select: none !important;
  -webkit-user-select: none !important;
  -webkit-user-drag: none !important;
  pointer-events: none !important;
  transition: none !important;
}

/* The theme scales card images to 1.2 on hover; the redesign keeps posters
   still, so kill every transform the theme can apply. */
html.userpatch-maia main#main-content.userpatch-listing-ready li.thumb img,
html.userpatch-maia main#main-content.userpatch-listing-ready li.thumb:hover img,
html.userpatch-maia main#main-content.userpatch-listing-ready li.thumb figure:hover img,
html.userpatch-maia main#main-content.userpatch-listing-ready li.thumb figure a:hover img {
  transform: none !important;
}

html.userpatch-maia main#main-content.userpatch-listing-ready li.thumb .thumb-hover,
html.userpatch-maia main#main-content.userpatch-listing-ready li.thumb .sr-only {
  display: none !important;
}

html.userpatch-maia li.thumb figcaption,
html.userpatch-maia .thumbnail-wrapper figcaption {
  position: static !important;
  top: auto !important;
  bottom: auto !important;
  inset: auto !important;
  height: auto !important;
  min-height: 0 !important;
  max-height: none !important;
  padding: 0.75rem 0.25rem 0 !important;
  background: transparent !important;
  border: 0 !important;
  border-radius: 0 !important;
  box-shadow: none !important;
}

html.userpatch-maia li.thumb figcaption a,
html.userpatch-maia .thumbnail-wrapper figcaption a {
  color: inherit !important;
  text-decoration: none !important;
}

html.userpatch-maia li.thumb figcaption p,
html.userpatch-maia .thumbnail-wrapper figcaption p {
  display: -webkit-box !important;
  overflow: hidden !important;
  margin: 0 !important;
  padding: 0 !important;
  border: 0 !important;
  background: transparent !important;
  box-shadow: none !important;
  color: var(--maia-foreground) !important;
  font-size: 1rem !important;
  font-weight: 400 !important;
  line-height: 1.4 !important;
  height: auto !important;
  text-align: center !important;
  text-overflow: ellipsis !important;
  -webkit-box-orient: vertical !important;
  -webkit-line-clamp: 2 !important;
  line-clamp: 2 !important;
}

@media (min-width: 40rem) {
  html.userpatch-maia main#main-content.userpatch-listing-ready li.thumb figure > a {
    border-radius: 1.5rem !important;
  }
}

html.userpatch-maia main#main-content.userpatch-listing-ready .pagination-wrapper {
  display: flex !important;
  justify-content: center;
  margin-block: 2rem 1rem !important;
}

html.userpatch-maia main#main-content.userpatch-listing-ready .pagination-wrap,
html.userpatch-maia main#main-content.userpatch-listing-ready ul.pagination {
  display: flex;
  align-items: center;
  gap: 0.375rem !important;
  margin: 0 !important;
  padding: 0 !important;
  border: 0 !important;
  background: transparent !important;
  box-shadow: none !important;
}

html.userpatch-maia .pagination-wrapper .material-left,
html.userpatch-maia .pagination-wrapper .material-icons,
html.userpatch-maia .page-numbers .material-left,
html.userpatch-maia .page-numbers .material-icons,
html.userpatch-maia ul.pagination .material-left,
html.userpatch-maia ul.pagination .material-icons {
  display: none !important;
}

html.userpatch-maia main#main-content.userpatch-listing-ready ul.pagination > li {
  display: flex;
  float: none !important;
  margin: 0 !important;
  padding: 0 !important;
}

html.userpatch-maia main#main-content.userpatch-listing-ready .page-numbers {
  display: inline-flex;
  inline-size: 2.5rem;
  min-inline-size: 2.5rem;
  block-size: 2.5rem;
  min-block-size: 2.5rem;
  align-items: center;
  justify-content: center;
  padding: 0 !important;
  border: 1px solid transparent !important;
  border-radius: var(--maia-radius-xl) !important;
  background: transparent !important;
  box-shadow: none !important;
  color: var(--maia-foreground) !important;
  font-size: 1rem !important;
  font-weight: 500 !important;
  text-decoration: none !important;
  transition:
    transform 140ms var(--ease-out),
    background-color 140ms ease,
    border-color 140ms ease;
}

html.userpatch-maia .pagination-wrapper .page-numbers.next,
html.userpatch-maia .pagination-wrapper .page-numbers.prev,
html.userpatch-maia main#main-content.userpatch-listing-ready .page-numbers.next,
html.userpatch-maia main#main-content.userpatch-listing-ready .page-numbers.prev,
html.userpatch-maia .page-numbers.next,
html.userpatch-maia .page-numbers.prev {
  inline-size: 2.5rem !important;
  min-inline-size: 2.5rem !important;
  max-inline-size: 2.5rem !important;
  block-size: 2.5rem !important;
  min-block-size: 2.5rem !important;
  padding: 0 !important;
  font-size: 0 !important;
  line-height: 0 !important;
  color: transparent !important;
  overflow: hidden !important;
  position: relative !important;
}

html.userpatch-maia .page-numbers.next *,
html.userpatch-maia .page-numbers.prev * {
  display: none !important;
}

html.userpatch-maia main#main-content.userpatch-listing-ready .page-numbers svg,
html.userpatch-maia .pagination-wrapper .page-numbers svg,
html.userpatch-maia .page-numbers.next svg,
html.userpatch-maia .page-numbers.prev svg {
  display: block !important;
  inline-size: 1rem !important;
  block-size: 1rem !important;
  color: var(--maia-foreground) !important;
  margin: auto !important;
}

@media (hover: hover) and (pointer: fine) {
  html.userpatch-maia main#main-content.userpatch-listing-ready .page-numbers:hover {
    background: var(--maia-muted) !important;
  }
}

html.userpatch-maia main#main-content.userpatch-listing-ready .page-numbers:active {
  transform: scale(0.96);
  background: var(--maia-muted) !important;
}

html.userpatch-maia main#main-content.userpatch-listing-ready .page-numbers.current {
  border-color: var(--maia-border) !important;
  background: color-mix(in oklch, var(--maia-input) 30%, transparent) !important;
}

html.userpatch-maia main#main-content.userpatch-listing-ready .page-numbers.dots {
  min-inline-size: 1.5rem;
  color: var(--maia-muted-foreground);
  pointer-events: none;
}

@media (max-width: ${CONFIG.mobileLayoutBreakpointRem}rem) {
  html.userpatch-maia main#main-content.userpatch-listing-ready {
    padding-block-start: 1rem !important;
    padding-block-end: calc(120px + env(safe-area-inset-bottom, 0px)) !important;
  }

  html.userpatch-maia main#main-content.userpatch-listing-ready .pagination-wrapper {
    margin-block-end: calc(112px + env(safe-area-inset-bottom, 0px)) !important;
  }

  html.userpatch-maia main#main-content.userpatch-listing-ready ul.recent-movies {
    column-gap: 0.75rem !important;
    row-gap: 1.5rem !important;
  }
}

/* Detail pages */

html.userpatch-maia.userpatch-detail-page main#main-content,
html.userpatch-maia.userpatch-detail-page .userpatch-header,
html.userpatch-maia.userpatch-detail-page .userpatch-mobile-nav {
  display: none !important;
}

@media (min-width: ${CONFIG.mobileLayoutBreakpointRem + 0.01}rem) {
  html.userpatch-maia.userpatch-detail-page,
  html.userpatch-maia.userpatch-detail-page body {
    block-size: 100%;
    overflow: hidden;
  }
}

html.userpatch-maia .userpatch-detail-root {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  align-items: start;
  gap: var(--maia-gutter);
  inline-size: 100%;
  max-inline-size: 88rem;
  box-sizing: border-box;
  margin-inline: auto;
  padding: 1rem var(--maia-gutter) clamp(2rem, 5vw, 4rem);
}

@media (min-width: ${CONFIG.mobileLayoutBreakpointRem + 0.01}rem) {
  html.userpatch-maia .userpatch-detail-root {
    grid-template-columns: minmax(17rem, min(21rem, 30vw)) minmax(0, 1fr);
    align-items: stretch;
    gap: var(--maia-gutter);
    block-size: 100dvh;
    padding-block: 0;
  }
}

/* Keep the poster stack and its viewport-aware sizing in step with 4KHDHub. */
html.userpatch-maia .userpatch-poster-panel {
  display: flex;
  inline-size: min(100%, 21rem, 42dvh);
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  box-sizing: border-box;
  margin-inline: 0;
  padding: 0;
  border: 0;
  border-radius: 0;
  background: transparent;
  box-shadow: none;
}

@media (min-width: ${CONFIG.mobileLayoutBreakpointRem + 0.01}rem) {
  html.userpatch-maia .userpatch-poster-panel {
    position: sticky;
    inset-block-start: 1rem;
    align-self: start;
    inline-size: min(100%, 21rem, 42dvh);
    max-block-size: calc(100dvh - 2rem);
    overflow: auto;
    overscroll-behavior-x: auto;
  overscroll-behavior-y: contain;
  }

  /* Overflow scrolls inside the panel; children must never flex-shrink. */
  html.userpatch-maia .userpatch-poster-panel > * {
    flex: none;
  }
}

html.userpatch-maia .userpatch-detail-brand {
  display: flex;
  inline-size: min(100%, 18rem);
  block-size: 4rem;
  min-block-size: 4rem;
  flex: none;
  align-items: center;
  justify-content: center;
}

html.userpatch-maia .userpatch-detail-brand img {
  display: block;
  inline-size: 100%;
  block-size: 4rem;
  max-block-size: 4rem;
  object-fit: contain;
}

html.userpatch-maia .userpatch-poster-frame {
  inline-size: min(100%, min(21rem, max(9rem, calc(66.667dvh - 7.333rem))));
  aspect-ratio: 2 / 3;
  overflow: hidden;
  border: 1px solid color-mix(in oklch, var(--maia-foreground) 15%, transparent);
  border-radius: 1rem;
  background: var(--maia-muted);
  box-shadow: var(--maia-card-depth-shadow);
}

html.userpatch-maia .userpatch-poster-frame[hidden] {
  display: none !important;
}

html.userpatch-maia .userpatch-poster-frame img {
  display: block;
  inline-size: 100%;
  block-size: 100%;
  object-fit: cover;
}

@media (min-width: 40rem) {
  html.userpatch-maia .userpatch-poster-frame {
    border-radius: 1.5rem;
  }
}

@media (max-width: ${CONFIG.mobileLayoutBreakpointRem}rem) {
  html.userpatch-maia .userpatch-poster-panel {
    inline-size: min(100%, 28rem);
    margin-inline: auto;
  }

  html.userpatch-maia .userpatch-poster-frame {
    inline-size: min(65vw, 17rem);
  }
}

html.userpatch-maia .userpatch-detail-title {
  max-inline-size: 100%;
  margin: 0;
  color: var(--maia-foreground) !important;
  font-size: 1.25rem !important;
  font-weight: 500 !important;
  letter-spacing: -0.02em;
  line-height: 1.25;
  text-align: center;
  overflow-wrap: anywhere;
}

html.userpatch-maia .userpatch-detail-date {
  margin: 0;
  color: var(--maia-muted-foreground);
  font-size: 0.8125rem !important;
}

html.userpatch-maia .userpatch-imdb-score {
  display: inline-flex;
  min-block-size: 1.5rem;
  align-items: center;
  gap: 0.375rem;
  color: var(--maia-foreground);
  font-size: 1rem;
  line-height: 1;
}

html.userpatch-maia .userpatch-imdb-score a {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  color: inherit;
  text-decoration: none;
}

html.userpatch-maia .userpatch-imdb-score img {
  display: block;
  inline-size: auto;
  block-size: 1rem;
  object-fit: contain;
}

html.userpatch-maia .userpatch-imdb-rating {
  font-size: 1rem;
  font-weight: 500;
}

html.userpatch-maia .userpatch-poster-badges {
  display: flex;
  max-inline-size: 100%;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-block-start: 0.125rem;
}

html.userpatch-maia .userpatch-poster-badges[hidden] {
  display: none !important;
}

html.userpatch-maia .userpatch-media-badge {
  display: inline-flex;
  min-inline-size: 0;
  min-block-size: 0;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: 0;
  border-radius: 0;
  background: transparent;
  box-shadow: none;
}

html.userpatch-maia .userpatch-media-badge img {
  display: block;
  inline-size: auto;
  max-inline-size: none;
  block-size: 1rem;
  object-fit: contain;
  filter: invert(1) grayscale(1);
}


html.userpatch-maia .userpatch-detail-main {
  display: flex;
  flex-direction: column;
  min-inline-size: 0;
  min-block-size: 0;
  gap: 1rem;
}

@media (min-width: ${CONFIG.mobileLayoutBreakpointRem + 0.01}rem) {
  html.userpatch-maia .userpatch-detail-main {
    block-size: 100%;
    box-sizing: border-box;
    /* Reserves the tab-bar band at the top of the scroll column, the way
       4KHDHub's grid rows do, so the list never rides up against it. */
    padding-block-start: 1rem;
    overflow-x: hidden;
    overflow-y: auto;
    overscroll-behavior-x: auto;
  overscroll-behavior-y: contain;
    scrollbar-gutter: auto;
  }
}

html.userpatch-maia .userpatch-detail-toolbar {
  position: sticky;
  /* The scroll column reserves a gutter band for this bar (see
     .userpatch-detail-main), so it rests level with 4KHDHub's tab bar and
     pins there when the list scrolls under it. */
  inset-block-start: 0;
  z-index: 5;
  display: flex;
  max-inline-size: 100%;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem 1rem;
  margin-block-end: 0;
  box-sizing: border-box;
  min-block-size: 4rem;
  flex: none;
  padding: 0;
  scrollbar-width: none;
}

html.userpatch-maia .userpatch-detail-toolbar > .userpatch-quality-tabs {
  margin-inline-start: auto;
}

@media (max-width: ${CONFIG.mobileLayoutBreakpointRem}rem) {
  html.userpatch-maia .userpatch-detail-toolbar {
    justify-content: center;
  }
  html.userpatch-maia .userpatch-detail-toolbar > .userpatch-quality-tabs {
    margin-inline: auto;
  }
}

html.userpatch-maia .userpatch-detail-info[hidden] { display: none !important; }

html.userpatch-maia .userpatch-detail-toolbar > :only-child {
  margin-inline-start: auto;
}

html.userpatch-maia .userpatch-mode-tabs,
html.userpatch-maia .userpatch-quality-tabs {
  position: relative;
  display: inline-flex;
  inline-size: fit-content;
  max-inline-size: 100%;
  align-items: center;
  gap: 2px;
  overflow: hidden !important;
  padding: 0.25rem;
  border-radius: 1rem;
  isolation: isolate;
  box-sizing: border-box;
}

html.userpatch-maia .userpatch-mode-tabs::before,
html.userpatch-maia .userpatch-quality-tabs::before {
  position: absolute;
  z-index: -1;
  inset: 0;
  border-radius: inherit;
  background: color-mix(in oklch, var(--maia-card) 60%, transparent);
  box-shadow: 0 10px 40px rgb(0 0 0 / 0.2);
  backdrop-filter: saturate(2.2) blur(16px);
  -webkit-backdrop-filter: saturate(2.2) blur(16px);
  content: "";
  pointer-events: none;
}

html.userpatch-maia .userpatch-mode-tabs::after,
html.userpatch-maia .userpatch-quality-tabs::after {
  position: absolute;
  z-index: 1;
  inset: 0;
  border-radius: inherit;
  box-shadow:
    inset 0.5px 0.5px var(--maia-foreground),
    inset 0.5px -0.5px var(--maia-foreground),
    inset -0.5px 0.5px var(--maia-foreground),
    inset -0.5px -0.5px var(--maia-foreground);
  opacity: 0.2;
  content: "";
  pointer-events: none;
}

html.userpatch-maia .userpatch-mode-tab,
html.userpatch-maia .userpatch-quality-tab {
  position: relative;
  z-index: 2;
  display: inline-flex;
  margin: 0;
  block-size: 2.25rem !important;
  min-block-size: 2.25rem !important;
  max-block-size: 2.25rem !important;
  box-sizing: border-box !important;
  flex: none;
  align-items: center;
  justify-content: center;
  gap: 0.375rem;
  padding: 0 0.875rem !important;
  border: 0 !important;
  border-radius: 0.75rem !important;
  background: transparent !important;
  color: var(--maia-muted-foreground) !important;
  font: inherit;
  font-size: 0.875rem !important;
  font-weight: 500 !important;
  line-height: 1 !important;
  white-space: nowrap !important;
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  transition:
    transform 140ms var(--ease-out),
    color 140ms var(--ease-out);
}

html.userpatch-maia .userpatch-mode-tab[aria-pressed="true"],
html.userpatch-maia .userpatch-quality-tab[aria-pressed="true"] {
  border-color: transparent !important;
  background: transparent !important;
  color: var(--maia-foreground) !important;
}

html.userpatch-maia .userpatch-mode-tab svg {
  flex: 0 0 1rem;
  inline-size: 1rem;
  block-size: 1rem;
  color: currentColor;
  fill: none;
}

html.userpatch-maia .userpatch-mode-indicator,
html.userpatch-maia .userpatch-quality-indicator {
  position: absolute;
  z-index: 0;
  inset-block-start: 0;
  inset-inline-start: 0;
  display: block;
  inline-size: 100px;
  block-size: 36px;
  border-radius:
    var(--userpatch-quality-radius-x, var(--userpatch-mode-radius-x, 0.75rem)) /
    var(--userpatch-quality-radius-y, var(--userpatch-mode-radius-y, 0.75rem));
  opacity: 0;
  pointer-events: none;
  transform-origin: left top;
  transition: opacity 160ms var(--ease-out);
}

html.userpatch-maia .userpatch-mode-indicator {
  background: color-mix(in oklch, var(--maia-foreground) 9%, transparent);
  box-shadow: inset 0 1px 2px color-mix(in oklch, var(--maia-foreground) 12%, transparent);
  transform: translate3d(
      var(--userpatch-mode-x, 0px),
      var(--userpatch-mode-y, 0px),
      0
    )
    scale(
      var(--userpatch-mode-scale-x, 1),
      var(--userpatch-mode-scale-y, 1)
    );
}

html.userpatch-maia .userpatch-quality-indicator {
  background: rgb(255 255 255 / 0.15);
  box-shadow: inset 0 1px 2px rgb(255 255 255 / 0.12);
  transform: translate3d(
      var(--userpatch-quality-x, 0px),
      var(--userpatch-quality-y, 0px),
      0
    )
    scale(
      var(--userpatch-quality-scale-x, 1),
      var(--userpatch-quality-scale-y, 1)
    );
}

html.userpatch-maia .userpatch-mode-tabs .userpatch-mode-indicator[data-ready="true"],
html.userpatch-maia .userpatch-mode-tabs .userpatch-quality-indicator[data-ready="true"],
html.userpatch-maia .userpatch-quality-tabs .userpatch-quality-indicator[data-ready="true"] {
  opacity: 1;
}

html.userpatch-maia .userpatch-mode-tabs .userpatch-mode-indicator[data-animate="true"],
html.userpatch-maia .userpatch-mode-tabs .userpatch-quality-indicator[data-animate="true"],
html.userpatch-maia .userpatch-quality-tabs .userpatch-quality-indicator[data-animate="true"] {
  transition:
    transform 240ms cubic-bezier(0.77, 0, 0.175, 1),
    opacity 160ms var(--ease-out);
}

html.userpatch-maia .userpatch-quality-tabs[hidden] {
  display: none !important;
}

html.userpatch-maia .userpatch-quality-tab[data-tab-content="label"] {
  min-inline-size: 3rem;
}

@media (hover: hover) and (pointer: fine) {
  html.userpatch-maia .userpatch-mode-tab:hover:not(:disabled),
  html.userpatch-maia .userpatch-quality-tab:hover:not(:disabled) {
    color: var(--maia-foreground);
  }
}

html.userpatch-maia .userpatch-mode-tab:active:not(:disabled),
html.userpatch-maia .userpatch-quality-tab:active:not(:disabled) {
  transform: scale(0.96);
}

html.userpatch-maia .userpatch-mode-tab:focus-visible,
html.userpatch-maia .userpatch-quality-tab:focus-visible {
  outline: 2px solid var(--maia-ring);
  outline-offset: -2px;
}

html.userpatch-maia .userpatch-quality-tab:disabled {
  color: var(--maia-muted-foreground);
  cursor: not-allowed;
}

html.userpatch-maia .userpatch-quality-tab {
  font-weight: 600 !important;
  letter-spacing: 0.02em;
}

html.userpatch-maia .userpatch-quality-tab img {
  display: block;
  inline-size: auto;
  block-size: 1.125rem;
  filter: invert(1);
}

html.userpatch-maia .userpatch-quality-tab:disabled img {
  filter: invert(1) grayscale(1) opacity(0.45);
}

/* Release rows */

html.userpatch-maia .userpatch-release-list {
  display: flex;
  flex-direction: column;
  border-block-start: 1px solid color-mix(in oklch, var(--maia-foreground) 16%, transparent);
}

html.userpatch-maia .userpatch-release-item {
  display: block;
  min-inline-size: 0;
  color: var(--maia-foreground);
  text-decoration: none;
}

html.userpatch-maia a.userpatch-release-item {
  cursor: pointer;
}

html.userpatch-maia .userpatch-release-row {
  display: flex;
  inline-size: 100%;
  min-block-size: 4rem;
  align-items: center;
  gap: 12px;
  box-sizing: border-box;
  padding: 16px;
  border-block-end: 1px solid color-mix(in oklch, var(--maia-foreground) 16%, transparent);
  color: var(--maia-foreground);
  transition: background 160ms var(--ease-out);
}

@media (hover: hover) and (pointer: fine) {
  html.userpatch-maia .userpatch-release-row:hover {
    background: color-mix(in oklch, var(--maia-muted) 42%, transparent);
  }
}

html.userpatch-maia .userpatch-release-row[data-userpatch-opened="true"],
html.userpatch-maia .userpatch-release-item[data-userpatch-opened="true"] .userpatch-release-row {
  background: color-mix(in oklch, var(--maia-opened-blue) 30%, transparent) !important;
}

@media (hover: hover) and (pointer: fine) {
  html.userpatch-maia .userpatch-release-row[data-userpatch-opened="true"]:hover,
  html.userpatch-maia .userpatch-release-item[data-userpatch-opened="true"]:hover .userpatch-release-row {
    background: color-mix(in oklch, var(--maia-opened-blue) 38%, transparent) !important;
  }
}

html.userpatch-maia .userpatch-release-copy {
  display: flex;
  min-inline-size: 0;
  flex: 1;
  flex-direction: column;
  gap: 4px;
}

html.userpatch-maia .userpatch-release-file-title {
  color: var(--maia-foreground);
  font-size: 14px !important;
  font-weight: 400;
  line-height: 1.45;
  overflow-wrap: anywhere;
}

@media (min-width: 761px) {
  html.userpatch-maia .userpatch-release-file-title {
    font-size: 18px !important;
  }
}

html.userpatch-maia .userpatch-release-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  color: var(--maia-muted-foreground);
  font-size: 0.875rem !important;
  font-weight: 400;
  line-height: 1.4;
  overflow-wrap: anywhere;
}

/* The 1rem sweep inflates the plain size spans past the 14px filename on
   small screens; keep them secondary below the desktop breakpoint. */
@media (max-width: 760px) {
  html.userpatch-maia
    .userpatch-release-meta
    > span:not(.userpatch-series-language-badge) {
    font-size: 0.75rem !important;
  }
}

html.userpatch-maia .userpatch-series-language-badge {
  display: inline-flex;
  min-inline-size: 0;
  align-items: center;
  isolation: isolate;
  gap: 0.375rem;
  min-block-size: 1.25rem;
  padding: 0.125rem 0.5rem;
  border: 1px solid color-mix(in oklch, var(--maia-foreground) 10%, transparent);
  border-radius: var(--maia-radius-4xl);
  background: transparent;
  color: var(--maia-foreground);
  font-size: 0.875rem !important;
  font-weight: 400;
  line-height: 1.25;
}

html.userpatch-maia .userpatch-series-language-text {
  max-inline-size: 100%;
  min-inline-size: 0;
  overflow-wrap: anywhere;
}

html.userpatch-maia .userpatch-series-language-icon {
  inline-size: 1rem;
  block-size: 1rem;
  flex: none;
}

html.userpatch-maia .userpatch-release-actions {
  position: relative;
  z-index: 1;
  display: flex;
  flex: none;
  align-items: center;
  gap: 12px;
}

html.userpatch-maia .userpatch-release-action {
  display: inline-flex;
  inline-size: 40px;
  block-size: 40px;
  align-items: center;
  justify-content: center;
  color: var(--maia-foreground);
}

html.userpatch-maia .userpatch-release-action svg {
  inline-size: 20px;
  block-size: 20px;
}

html.userpatch-maia .userpatch-release-action img {
  inline-size: 36px;
  block-size: 36px;
  object-fit: contain;
}

html.userpatch-maia .userpatch-provider-link {
  position: relative;
  display: inline-flex;
  inline-size: 40px;
  block-size: 40px;
  align-items: center;
  justify-content: center;
  padding: 0 !important;
  border: 0 !important;
  border-radius: 0 !important;
  outline-offset: 3px;
  background: transparent !important;
  color: inherit;
  box-shadow: none !important;
  text-decoration: none;
  transition:
    transform 140ms var(--ease-out),
    opacity 140ms var(--ease-out);
}

@media (hover: hover) and (pointer: fine) {
  html.userpatch-maia .userpatch-provider-link:hover {
    background: transparent !important;
    opacity: 0.78;
  }
}

html.userpatch-maia .userpatch-provider-link:active {
  transform: scale(0.95);
  opacity: 0.6;
}

html.userpatch-maia .userpatch-provider-link:focus-visible {
  outline: 2px solid var(--maia-ring);
}

html.userpatch-maia .userpatch-provider-link svg {
  inline-size: 20px;
  block-size: 20px;
}

html.userpatch-maia .userpatch-provider-link img {
  inline-size: 36px;
  block-size: 36px;
  object-fit: contain;
}

html.userpatch-maia body .userpatch-provider-tooltip {
  position: fixed;
  z-index: 2147483647;
  display: inline-flex;
  width: max-content;
  max-width: 20rem;
  align-items: center;
  padding: 0.375rem 0.75rem;
  border-radius: 1rem;
  background: var(--maia-foreground);
  color: var(--maia-background);
  font-size: 0.75rem !important;
  font-weight: 400;
  line-height: 1.25;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transform: translate(-50%, 2px) scale(0.95);
  transform-origin: center bottom;
  pointer-events: none;
  transition:
    opacity 120ms var(--ease-out),
    transform 120ms var(--ease-out),
    visibility 120ms var(--ease-out);
}

html.userpatch-maia body .userpatch-provider-tooltip[hidden] {
  display: none !important;
}

html.userpatch-maia body .userpatch-provider-tooltip[data-state="open"] {
  opacity: 1;
  visibility: visible;
  transform: translate(-50%, 0) scale(1);
}

html.userpatch-maia body .userpatch-provider-tooltip::after {
  position: absolute;
  z-index: 0;
  inline-size: 0.625rem;
  block-size: 0.625rem;
  background: inherit;
  content: "";
  transform: translateX(-50%) rotate(45deg);
}

html.userpatch-maia body .userpatch-provider-tooltip[data-side="top"]::after {
  inset-block-start: calc(100% - 0.3125rem);
  inset-inline-start: 50%;
}

html.userpatch-maia body .userpatch-provider-tooltip[data-side="bottom"] {
  transform-origin: center top;
}

html.userpatch-maia body .userpatch-provider-tooltip[data-side="bottom"]::after {
  inset-block-end: calc(100% - 0.3125rem);
  inset-inline-start: 50%;
}

html.userpatch-maia .userpatch-release-item.userpatch-filter-hidden {
  display: none !important;
}

html.userpatch-maia .userpatch-screens[hidden],
html.userpatch-maia .userpatch-release-list[hidden],
html.userpatch-maia .userpatch-mode-tabs[hidden] {
  display: none !important;
}

html.userpatch-maia .userpatch-detail-empty {
  padding: 1.5rem 0.25rem;
  color: var(--maia-muted-foreground);
  font-size: 0.9375rem;
  text-align: center;
}

/* Detail sections */

html.userpatch-maia .userpatch-detail-section {
  margin-block: 1.75rem 0;
}

html.userpatch-maia .userpatch-section-title {
  margin-block: 0 1rem;
  padding-block-end: 0.75rem;
  border-bottom: 1px solid var(--maia-border);
  color: var(--maia-foreground) !important;
  font-size: 1.25rem !important;
  font-weight: 600 !important;
  letter-spacing: -0.02em;
  line-height: 1.3;
}

/* One screenshot per row, full width — a vertical stack, not a grid. */
html.userpatch-maia .userpatch-screens {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-block: 0;
  margin-inline: 0;
}

html.userpatch-maia .userpatch-screenshot {
  position: relative;
  display: block;
  aspect-ratio: 16 / 9;
  min-block-size: 14rem;
  overflow: hidden;
  border: 0 !important;
  border-radius: 1rem;
  background: var(--maia-muted);
  text-decoration: none !important;
  transition: none !important;
}

html.userpatch-maia .userpatch-screenshot:hover {
  border-color: transparent !important;
  transform: none !important;
}

html.userpatch-maia .userpatch-screenshot img {
  display: block;
  inline-size: 100%;
  block-size: 100%;
  object-fit: cover;
}

html.userpatch-maia .userpatch-trailer {
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border: 1px solid var(--maia-border);
  border-radius: var(--maia-radius-2xl);
  background: var(--maia-muted);
}

html.userpatch-maia .userpatch-trailer iframe {
  position: absolute;
  inset: 0;
  inline-size: 100%;
  block-size: 100%;
  border: 0;
}

html.userpatch-maia .userpatch-story {
  max-inline-size: 72ch;
  margin: 0;
  color: var(--maia-muted-foreground) !important;
  font-size: 1rem !important;
  line-height: 1.7 !important;
}

@media (max-width: ${CONFIG.mobileLayoutBreakpointRem}rem) {
  html.userpatch-maia .userpatch-release-row {
    padding: 16px 8px;
  }

  html.userpatch-maia .userpatch-release-actions {
    gap: 8px;
  }

  html.userpatch-maia .userpatch-provider-link,
  html.userpatch-maia .userpatch-release-action {
    inline-size: 34px;
    block-size: 34px;
  }

  html.userpatch-maia .userpatch-mode-tabs {
    inline-size: 100%;
  }

  html.userpatch-maia .userpatch-mode-tab {
    flex: 1 1 auto;
  }

}

@media (prefers-reduced-motion: reduce) {
  html.userpatch-maia .userpatch-nav-link,
  html.userpatch-maia .userpatch-header-action,
  html.userpatch-maia .userpatch-brand,
  html.userpatch-maia .userpatch-nav-indicator,
  html.userpatch-maia .userpatch-quality-tab,
  html.userpatch-maia .userpatch-mode-tab,
  html.userpatch-maia .userpatch-provider-link,
  html.userpatch-maia .userpatch-provider-tooltip,
  html.userpatch-maia .userpatch-mobile-nav-item,
  html.userpatch-maia .userpatch-mobile-menu,
  html.userpatch-maia dialog.userpatch-search-dialog,
  html.userpatch-maia .page-numbers,
  html.userpatch-maia .userpatch-release-row {
    transform: none !important;
    transition:
      opacity 120ms ease,
      background-color 120ms ease,
      color 120ms ease !important;
  }
}

#userpatch-page-loader {
  position: fixed;
  inset: 0;
  z-index: 2147483640;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--maia-background, #0a0a0a);
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
  transition: opacity 250ms ease, visibility 250ms ease;
}

#userpatch-page-loader.userpatch-page-loader-hidden {
  opacity: 0 !important;
  visibility: hidden !important;
  pointer-events: none !important;
}

.userpatch-page-spinner {
  inline-size: 2.75rem;
  block-size: 2.75rem;
  color: var(--maia-foreground, #ffffff);
  animation: userpatch-page-spin 0.8s linear infinite;
}

@keyframes userpatch-page-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  #userpatch-page-loader {
    transition: none !important;
  }
  .userpatch-page-spinner {
    animation-duration: 1.5s !important;
  }
}

${PROGRESSIVE_IMAGE_CSS}

${SCREENSHOT_VIEWER_CSS}
${DETAIL_INFO_CSS}
`

  // src/shared/quality-tabs.js
  const QUALITY_TAB_KEYS = ["all", "4k", "hd", "sd"]
  const positionSelectionIndicator = (indicator, container, target, kind) => {
    if (!target || !container.contains(target)) {
      indicator.dataset.ready = "false"
      return
    }
    const containerRect = container.getBoundingClientRect()
    const targetRect = target.getBoundingClientRect()
    if (
      !indicator.offsetWidth ||
      !indicator.offsetHeight ||
      !targetRect.width ||
      !targetRect.height
    ) {
      return
    }
    const scaleX = targetRect.width / indicator.offsetWidth
    const scaleY = targetRect.height / indicator.offsetHeight
    const radius =
      Number.parseFloat(getComputedStyle(target).borderTopLeftRadius) || 12
    const prefix = `--userpatch-${kind}`
    indicator.style.setProperty(
      `${prefix}-x`,
      `${targetRect.left - containerRect.left - container.clientLeft}px`
    )
    indicator.style.setProperty(
      `${prefix}-y`,
      `${targetRect.top - containerRect.top - container.clientTop}px`
    )
    indicator.style.setProperty(`${prefix}-scale-x`, String(scaleX))
    indicator.style.setProperty(`${prefix}-scale-y`, String(scaleY))
    indicator.style.setProperty(`${prefix}-radius-x`, `${radius / scaleX}px`)
    indicator.style.setProperty(`${prefix}-radius-y`, `${radius / scaleY}px`)
    if (indicator.dataset.ready === "true") {
      indicator.dataset.animate = "true"
    }
    indicator.dataset.ready = "true"
  }
  const createQualityTabs = ({ storageKey, onQualityChange }) => {
    const element = document.createElement("div")
    element.className = "userpatch-quality-tabs"
    element.setAttribute("role", "group")
    element.setAttribute("aria-label", "Filter releases by quality")
    const indicator = document.createElement("span")
    indicator.className = "userpatch-quality-indicator"
    indicator.setAttribute("aria-hidden", "true")
    indicator.dataset.ready = "false"
    element.append(indicator)
    const buttons = new Map()
    for (const quality of QUALITY_TAB_KEYS) {
      const button = document.createElement("button")
      button.type = "button"
      button.className = "userpatch-quality-tab"
      button.dataset.quality = quality
      button.dataset.tabContent = quality === "all" ? "label" : "icon"
      button.setAttribute("aria-pressed", quality === "all" ? "true" : "false")
      const label = QUALITY_LABELS[quality]
      button.setAttribute("aria-label", label)
      button.title = label
      if (quality === "all") {
        button.textContent = "All"
      } else {
        const icon = document.createElement("img")
        icon.src = USERPATCH_BADGE_DATA[quality]
        icon.alt = ""
        icon.width = 26
        icon.height = 15
        icon.decoding = "async"
        button.append(icon)
      }
      element.append(button)
      buttons.set(quality, button)
    }
    const savedQuality = storageGet(storageKey)
    let activeQuality =
      savedQuality && QUALITY_TAB_KEYS.includes(savedQuality)
        ? savedQuality
        : "all"
    const positionIndicator = (target) => {
      if (!element.hidden) {
        positionSelectionIndicator(
          indicator,
          element,
          target || buttons.get(activeQuality) || buttons.get("all"),
          "quality"
        )
      }
    }
    const positionActiveIndicator = () => {
      positionIndicator()
    }
    const getEventButton = (target) => {
      if (!(target instanceof Element)) {
        return null
      }
      const button = target.closest(".userpatch-quality-tab")
      return button instanceof HTMLElement && element.contains(button)
        ? button
        : null
    }
    const onPointerOver = (event) => {
      if (
        (event.pointerType !== "mouse" && event.pointerType !== "pen") ||
        !window.matchMedia("(hover: hover) and (pointer: fine)").matches
      ) {
        return
      }
      const button = getEventButton(event.target)
      if (button && !button.disabled) {
        positionIndicator(button)
      }
    }
    const onFocusIn = (event) => {
      const button = getEventButton(event.target)
      if (button && !button.disabled) {
        positionIndicator(button)
      }
    }
    const onFocusOut = (event) => {
      if (
        !(event.relatedTarget instanceof Node) ||
        !element.contains(event.relatedTarget)
      ) {
        positionActiveIndicator()
      }
    }
    const onClick = (event) => {
      const button = getEventButton(event.target)
      if (!button || button.disabled) {
        return
      }
      const newQuality = button.dataset.quality || "all"
      activeQuality = newQuality
      storageSet(storageKey, newQuality)
      for (const [q, btn] of buttons) {
        btn.setAttribute("aria-pressed", q === activeQuality ? "true" : "false")
      }
      positionIndicator()
      onQualityChange?.(activeQuality)
    }
    element.addEventListener("click", onClick)
    element.addEventListener("pointerover", onPointerOver)
    element.addEventListener("pointerleave", positionActiveIndicator)
    element.addEventListener("focusin", onFocusIn)
    element.addEventListener("focusout", onFocusOut)
    element.addEventListener("scroll", positionActiveIndicator, {
      passive: true,
    })
    const resizeObserver =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver(positionActiveIndicator)
    resizeObserver?.observe(element)
    for (const button of buttons.values()) {
      resizeObserver?.observe(button)
    }
    if (!resizeObserver) {
      window.addEventListener("resize", positionActiveIndicator)
    }
    const refreshButtons = (availableQualities) => {
      const availableSet =
        availableQualities instanceof Set
          ? availableQualities
          : new Set(availableQualities)
      const saved = storageGet(storageKey)
      if (saved && QUALITY_TAB_KEYS.includes(saved)) {
        if (saved === "all" || availableSet.has(saved)) {
          activeQuality = saved
        } else if (!availableSet.has(activeQuality)) {
          activeQuality = "all"
        }
      } else if (activeQuality !== "all" && !availableSet.has(activeQuality)) {
        activeQuality = "all"
      }
      for (const [quality, button] of buttons) {
        const unavailable = quality !== "all" && !availableSet.has(quality)
        button.disabled = unavailable
        if (unavailable) {
          button.dataset.status = "unavailable"
        } else {
          delete button.dataset.status
        }
        button.setAttribute(
          "aria-pressed",
          quality === activeQuality ? "true" : "false"
        )
      }
      positionIndicator()
      return activeQuality
    }
    const cleanup = () => {
      element.removeEventListener("click", onClick)
      element.removeEventListener("pointerover", onPointerOver)
      element.removeEventListener("pointerleave", positionActiveIndicator)
      element.removeEventListener("focusin", onFocusIn)
      element.removeEventListener("focusout", onFocusOut)
      element.removeEventListener("scroll", positionActiveIndicator)
      if (resizeObserver) {
        resizeObserver.disconnect()
      } else {
        window.removeEventListener("resize", positionActiveIndicator)
      }
    }
    return {
      element,
      getActiveQuality: () => activeQuality,
      positionIndicator,
      refreshButtons,
      cleanup,
    }
  }

  // src/hdhub4u/download-parsing.js
  const extractSize = (text) => {
    const match = text.match(/(\d[\d.,]*)\s*(GB|MB)\b/i)
    return match ? `${match[1]}${match[2].toUpperCase()}` : ""
  }
  const cleanRowTitle = (text, size) => {
    let out = size ? text.replace(size, " ") : text
    out = out.replaceAll(/\[([^[\]]*)\]/g, (_match, inner) => {
      const cleaned = normalizeText(inner.replaceAll(/[-–—|]/g, " "))
      return cleaned ? ` ${cleaned} ` : " "
    })
    out = out.replaceAll(/\p{Extended_Pictographic}/gu, " ")
    out = out.replaceAll(/\s*[-–—|]\s*$/g, "")
    return normalizeText(out)
  }
  const RELEASE_PROVIDERS = Object.freeze({
    drive: {
      label: "Drive",
      icon: "download",
    },
    instant: {
      label: "Instant",
      icon: "zap",
    },
    watch: {
      label: "Watch online",
      icon: "play",
    },
    download: {
      label: "Download",
      icon: "download",
    },
  })
  const classifyHost = (href) => {
    try {
      const host = new URL(href, location.href).hostname.toLowerCase()
      if (/(?:^|\.)hubdrive\./.test(host)) {
        return "drive"
      }
      if (/(?:^|\.)hubcdn\./.test(host)) {
        return "instant"
      }
      if (/(?:^|\.)(?:playdrive|hdstream4u)\./.test(host)) {
        return "watch"
      }
      return ""
    } catch {
      return ""
    }
  }
  const isReleaseAnchor = (anchor) => {
    try {
      if (!/^https?:/i.test(anchor.getAttribute("href") || "")) {
        return false
      }
      const url = new URL(anchor.href, location.href)
      if (url.origin === location.origin) {
        return false
      }
      const text = normalizeText(anchor.textContent)
      return (
        /(?:hubdrive|hubcdn|playdrive|hdstream4u|greenmotors|4khdhub)\./.test(
          url.hostname.toLowerCase()
        ) ||
        /download|watch|trailer|(?:^|[^a-z0-9])(?:2160p|1080p|720p|480p|4k)(?=$|[^a-z0-9])|[\d.]+\s*(?:gb|mb)\b/i.test(
          text
        )
      )
    } catch {
      return false
    }
  }
  const parseReleaseAnchor = (anchor) => {
    const text = normalizeText(anchor.textContent)
    const href = anchor.href
    const size = extractSize(text)
    const title = cleanRowTitle(text, size) || text
    const isWatch = /watch|player/i.test(text) || classifyHost(href) === "watch"
    const external = /4khdhub\.one/i.test(href)
    const hubProvider = getHubProvider(href, text)
    return {
      title,
      href,
      size,
      isWatch,
      external,
      audio: "",
      provider: hubProvider,
    }
  }
  const classifyEpisodeLink = (anchor) => {
    const text = normalizeText(anchor.textContent)
    const lower = text.toLowerCase()
    let kind = classifyHost(anchor.href)
    if (!kind) {
      if (/watch/.test(lower)) {
        kind = "watch"
      } else {
        kind = "download"
      }
    }
    let host = ""
    try {
      host = new URL(anchor.href, location.href).hostname
    } catch {}
    const provider = RELEASE_PROVIDERS[kind] || RELEASE_PROVIDERS.download
    const hubProvider = getHubProvider(anchor.href, text)
    return {
      href: anchor.href,
      kind,
      icon: provider.icon,
      provider: hubProvider,
      tooltip: hubProvider
        ? hubProvider.name
        : `${provider.label}${host ? ` · ${host}` : ""}`,
    }
  }

  // src/hdhub4u/detail.js
  const extractDetail = () => {
    try {
      const main = document.querySelector("main#main-content.content-wrapper")
      const heading = main?.querySelector("h1.page-title")
      const body = main?.querySelector("main.page-body")
      if (!main || !heading || !body) {
        return null
      }
      const title = normalizeText(
        heading.querySelector(".material-text")?.textContent ||
          heading.textContent
      ).replace(
        /\s*[|–-]\s*(?:Full\s+(?:Movie|Series|Show)\s*)?HDHub4u.*$/i,
        ""
      )
      if (!title) {
        return null
      }
      const metaBox = main.querySelector(".page-meta")
      const date = normalizeText(
        metaBox?.querySelector("span")?.textContent || ""
      )
      const categories = []
      for (const link of metaBox?.querySelectorAll("a[href]") || []) {
        const label = normalizeText(
          link.querySelector("em")?.textContent || link.textContent
        )
        const href = link.getAttribute("href")
        if (label && href) {
          categories.push({
            label,
            href,
          })
        }
      }
      let poster = ""
      for (const image of body.querySelectorAll("img")) {
        const src = image.getAttribute("src") || ""
        if (!src || image.closest("h3") || /\.th\.jpg$/i.test(src)) {
          continue
        }
        if (image.closest(".code-block") || image.closest(".kp-header")) {
          continue
        }
        poster = image.src || src
        break
      }
      const metaValues = new Map()
      for (const strong of body.querySelectorAll(".kp-header strong")) {
        const cell = strong.closest("div")
        if (!cell) {
          continue
        }
        const label = normalizeText(strong.textContent).replace(/:$/, "")
        const full = normalizeText(cell.textContent)
        const value =
          label && full.startsWith(label)
            ? normalizeText(full.slice(label.length).replace(/^:/, ""))
            : full
        if (label && value && !metaValues.has(label)) {
          metaValues.set(label, value)
        }
      }
      const ratingValue =
        metaValues.get("iMDB Rating") || metaValues.get("IMDb Rating") || ""
      const ratingMatch = ratingValue.match(/([0-9]+(?:\.[0-9]+)?)\s*\/\s*10/)
      const imdbLink = body.querySelector('.kp-header a[href*="imdb.com"]')
      const metaRows = []
      for (const key of [
        "Stars",
        "Creator",
        "Director",
        "Genre",
        "Language",
        "Quality",
      ]) {
        const value = metaValues.get(key)
        if (value) {
          metaRows.push([key, value])
        }
      }
      if (date) {
        metaRows.push(["Posted", date])
      }
      const releases = []
      const episodes = []
      const screenshots = []
      let episodeHint = false
      const headingNodes = Array.from(body.querySelectorAll("h2, h3, h4, h5"))
      for (const node of headingNodes) {
        const text = normalizeText(node.textContent)
        const lower = text.toLowerCase()
        if (/screen\s*-?\s*shots?/.test(lower)) {
          continue
        }
        if (/download\s*links/.test(lower)) {
          continue
        }
        if (/single\s*episode/.test(lower)) {
          episodeHint = true
          continue
        }
        const anchors = Array.from(node.querySelectorAll("a[href]"))
        if (
          anchors.length &&
          anchors.every((anchor) => anchor.querySelector("img"))
        ) {
          for (const anchor of anchors) {
            const image = anchor.querySelector("img")
            if (image?.src) {
              const full = image.src.replace(/\.th(\.[a-z]+)$/i, "$1")
              screenshots.push({
                href: anchor.href,
                src: image.src,
                full: full === image.src ? "" : full,
                alt: image?.alt || "",
              })
            }
          }
          continue
        }
        const episodeMatch = text.match(
          /episodes?\s*0*(\d{1,3})(?:\s*(?:[-–—&]|to|and)\s*0*(\d{1,3}))?/i
        )
        const isEpisodeRow =
          Boolean(episodeMatch) || (episodeHint && node.matches("h3, h4"))
        if (isEpisodeRow) {
          if (
            !episodeMatch &&
            (!anchors.length || !/drive|instant|watch|download/i.test(text))
          ) {
            continue
          }
          let number = ""
          if (episodeMatch) {
            number = episodeMatch[2]
              ? `${episodeMatch[1]}-${episodeMatch[2]}`
              : episodeMatch[1]
          }
          let current = episodes.at(-1)
          if (!current || (number && current.number !== number)) {
            current = {
              number: number || `${episodes.length + 1}`,
              groups: [],
            }
            episodes.push(current)
          }
          if (!anchors.length) {
            continue
          }
          const qualityToken =
            text.match(/(?:2160p|1080p|720p|480p|4k)/i)?.[0] || ""
          const size = extractSize(text)
          let group = current.groups.at(-1)
          if (!group || group.quality !== qualityToken) {
            group = {
              quality: qualityToken,
              size,
              links: [],
            }
            current.groups.push(group)
          }
          for (const anchor of anchors) {
            group.links.push(classifyEpisodeLink(anchor))
          }
          continue
        }
        if (!anchors.length) {
          continue
        }
        const releaseAnchors = anchors.filter(isReleaseAnchor)
        if (!releaseAnchors.length) {
          continue
        }
        const rows = releaseAnchors.map(parseReleaseAnchor)
        const next = node.nextElementSibling
        if (next?.matches("h5")) {
          const note = normalizeText(next.textContent)
            .replace(/^\[/, "")
            .replace(/\]$/, "")
            .trim()
          if (note && rows.length) {
            rows.at(-1).audio = note
          }
        }
        releases.push(...rows)
      }
      let storyline = ""
      for (const node of headingNodes) {
        if (!/storyline/i.test(node.textContent)) {
          continue
        }
        let cursor = node.nextElementSibling
        for (let hops = 0; cursor && hops < 6; hops += 1) {
          const desc = cursor.matches(".kno-rdesc")
            ? cursor
            : cursor.querySelector(".kno-rdesc")
          if (desc) {
            const clone = desc.cloneNode(true)
            for (const label of clone.querySelectorAll("strong, em, span")) {
              label.remove()
            }
            storyline = normalizeText(clone.textContent)
            break
          }
          cursor = cursor.nextElementSibling
        }
        break
      }
      if (storyline.length < 24 || /^n\/?a\b/i.test(storyline)) {
        storyline = ""
      }
      const isSeries =
        episodes.length > 0 || /\b(?:season|series|episode)\b/i.test(title)
      return {
        title,
        date,
        categories,
        poster,
        rating: ratingMatch
          ? {
              score: `${ratingMatch[1]}/10`,
              href: imdbLink?.href || "",
            }
          : null,
        metaRows,
        releases,
        episodes,
        isSeries,
        screenshots,
        storyline,
      }
    } catch (error) {
      console.warn("userpatch extract failed:", error)
      return null
    }
  }
  const buildDetailPage = (data) => {
    const root = document.createElement("div")
    root.className = "userpatch-detail-root"
    const panel = document.createElement("aside")
    panel.className = "userpatch-poster-panel"
    const brand = document.createElement("a")
    brand.className = "userpatch-detail-brand"
    brand.href = "/"
    brand.setAttribute("aria-label", "HDHub4u home")
    const brandImage = document.createElement("img")
    brandImage.src = HEADER_WORDMARK_DATA_URI
    brandImage.alt = "HDHub4u"
    brandImage.decoding = "async"
    brand.append(brandImage)
    panel.append(brand)
    const frame = document.createElement("div")
    frame.className = "userpatch-poster-frame"
    if (data.poster) {
      const image = document.createElement("img")
      image.src = data.poster
      image.alt = ""
      image.decoding = "async"
      image.fetchPriority = "high"
      image.loading = "eager"
      setupProgressiveImage(image)
      frame.append(image)
      panel.append(frame)
    }
    const title = document.createElement("h1")
    title.className = "userpatch-detail-title"
    title.textContent = data.title
    panel.append(title)
    if (data.rating) {
      const score = document.createElement("div")
      score.className = "userpatch-imdb-score"
      const link = document.createElement("a")
      if (data.rating.href) {
        link.href = data.rating.href
        link.target = "_blank"
        link.rel = "noopener noreferrer"
      }
      link.setAttribute("aria-label", `IMDb rating ${data.rating.score}`)
      const logo = document.createElement("img")
      logo.src = IMDB_PRIMARY_LOGO_DATA_URI
      logo.alt = "IMDb"
      logo.decoding = "async"
      const value = document.createElement("span")
      value.className = "userpatch-imdb-rating"
      value.textContent = data.rating.score
      link.append(logo, value)
      score.append(link)
      panel.append(score)
    }
    const badges = getDetailBadgeNames(data)
    if (badges.length) {
      panel.append(buildPosterBadges(badges))
    }
    const mainColumn = document.createElement("div")
    mainColumn.className = "userpatch-detail-main"
    const toolbar = document.createElement("div")
    toolbar.className = "userpatch-detail-toolbar"
    const list = document.createElement("div")
    list.className = "userpatch-release-list"
    const emptyNote = document.createElement("p")
    emptyNote.className = "userpatch-detail-empty"
    emptyNote.hidden = true
    emptyNote.textContent = "No links match this filter"
    const qualityTabs = createQualityTabs({
      storageKey: CONFIG.storageKeys.movieQualityTab,
      onQualityChange: () => {
        applyQualityFilter()
      },
    })
    const applyQualityFilter = () => {
      const items = Array.from(list.querySelectorAll(".userpatch-release-item"))
      const available = new Set(
        items
          .map((item) => item.dataset.userpatchQuality)
          .filter((quality) => quality && quality !== "unknown")
      )
      const activeQuality = qualityTabs.refreshButtons(available)
      let visible = 0
      for (const item of items) {
        const quality = item.dataset.userpatchQuality || "unknown"
        const hidden = activeQuality !== "all" && quality !== activeQuality
        item.classList.toggle("userpatch-filter-hidden", hidden)
        if (!hidden) {
          visible += 1
        }
      }
      emptyNote.hidden = visible > 0
    }
    const hasLinksTab = !data.isSeries
    const hasArchiveTab =
      data.isSeries && data.releases.some((row) => !row.external)
    const hasEpisodesTab = data.isSeries && data.episodes.length > 0
    let activeMode = "archive"
    if (data.isSeries && !hasArchiveTab) {
      activeMode = "episodes"
    }
    if (hasArchiveTab && hasEpisodesTab) {
      const savedMode = storageGet(CONFIG.storageKeys.seriesTab)
      if (savedMode === "archive" || savedMode === "episodes") {
        activeMode = savedMode
      }
    }
    const tabDefs = [
      ["info", "Info", "info"],
      ...(data.screenshots.length
        ? [["screenshot", "Screenshot", "film"]]
        : []),
      ...(hasLinksTab ? [["links", "Links", "download"]] : []),
      ...(hasArchiveTab ? [["archive", "Archive", "file-archive"]] : []),
      ...(hasEpisodesTab ? [["episodes", "Single Episode", "file-play"]] : []),
    ]
    let activeTab = "info"
    const tabs = document.createElement("div")
    tabs.className = "userpatch-mode-tabs"
    tabs.setAttribute("role", "group")
    tabs.setAttribute("aria-label", "Switch detail sections")
    const tabIndicator = document.createElement("span")
    tabIndicator.className = "userpatch-mode-indicator"
    tabIndicator.setAttribute("aria-hidden", "true")
    tabIndicator.dataset.ready = "false"
    tabs.append(tabIndicator)
    const tabButtons = new Map()
    for (const [tab, label, iconName] of tabDefs) {
      const button = document.createElement("button")
      button.type = "button"
      button.className = "userpatch-mode-tab"
      button.dataset.tab = tab
      button.setAttribute("aria-pressed", tab === activeTab ? "true" : "false")
      const text = document.createElement("span")
      text.textContent = label
      button.append(text, createLucideIcon(iconName))
      tabs.append(button)
      tabButtons.set(tab, button)
    }
    if (tabButtons.size < 2) {
      tabs.hidden = true
    }
    const screenshotsPane = document.createElement("div")
    screenshotsPane.className = "userpatch-screens"
    screenshotsPane.hidden = activeTab !== "screenshot"
    for (const screenshot of data.screenshots) {
      const link = document.createElement("a")
      link.className = "userpatch-screenshot"
      link.href = screenshot.href
      link.target = "_blank"
      link.rel = "noopener noreferrer nofollow"
      const image = document.createElement("img")
      image.src = screenshot.src || screenshot.full
      image.alt = screenshot.alt || "Screenshot"
      image.loading = "lazy"
      image.fetchPriority = "low"
      image.decoding = "async"
      setupProgressiveImage(image, screenshot.full)
      image.addEventListener(
        "error",
        () => {
          if (screenshot.src && image.src !== screenshot.src) {
            image.src = screenshot.src
          }
        },
        { once: true }
      )
      link.addEventListener("click", (event) => {
        if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) {
          return
        }
        event.preventDefault()
        openScreenshotViewer(
          screenshot.full || screenshot.src,
          screenshot.alt,
          screenshot.src
        )
      })
      link.setAttribute("aria-haspopup", "dialog")
      link.append(image)
      screenshotsPane.append(link)
    }
    const positionTabIndicator = (target) => {
      positionSelectionIndicator(
        tabIndicator,
        tabs,
        target || tabButtons.get(activeTab),
        "mode"
      )
    }
    const getEventButton = (target) => {
      if (!(target instanceof Element)) {
        return null
      }
      const button = target.closest(".userpatch-mode-tab")
      return button instanceof HTMLElement && tabs.contains(button)
        ? button
        : null
    }
    const onPointerOver = (event) => {
      if (
        (event.pointerType !== "mouse" && event.pointerType !== "pen") ||
        !window.matchMedia("(hover: hover) and (pointer: fine)").matches
      ) {
        return
      }
      const button = getEventButton(event.target)
      if (button) {
        positionTabIndicator(button)
      }
    }
    const onFocusIn = (event) => {
      const button = getEventButton(event.target)
      if (button) {
        positionTabIndicator(button)
      }
    }
    const onFocusOut = (event) => {
      if (
        !(event.relatedTarget instanceof Node) ||
        !tabs.contains(event.relatedTarget)
      ) {
        positionTabIndicator()
      }
    }
    const renderModeRows = () => {
      const openedReleases = getOpenedReleases()
      const fragment = document.createDocumentFragment()
      if (activeMode === "episodes") {
        for (const episode of data.episodes) {
          for (const group of episode.groups) {
            if (group.links.length) {
              fragment.append(buildEpisodeRow(episode, group, openedReleases))
            }
          }
        }
        if (!hasArchiveTab) {
          for (const row of data.releases) {
            fragment.append(buildReleaseRow(row, openedReleases))
          }
        }
      } else {
        for (const row of data.releases) {
          fragment.append(buildReleaseRow(row, openedReleases))
        }
      }
      list.replaceChildren(fragment)
    }
    const applyTab = (tab) => {
      activeTab = tab
      for (const [key, button] of tabButtons) {
        button.setAttribute("aria-pressed", key === tab ? "true" : "false")
      }
      const showLinks = tab !== "screenshot" && tab !== "info"
      infoPane.hidden = tab !== "info"
      screenshotsPane.hidden = tab !== "screenshot"
      list.hidden = !showLinks
      emptyNote.hidden = !showLinks
      qualityTabs.element.hidden = !showLinks
      if (showLinks) {
        if ((tab === "archive" || tab === "episodes") && tab !== activeMode) {
          activeMode = tab
          storageSet(CONFIG.storageKeys.seriesTab, activeMode)
          renderModeRows()
        }
        applyQualityFilter()
      }
      positionTabIndicator()
    }
    const onClick = (event) => {
      const button = getEventButton(event.target)
      if (!button || button.dataset.tab === activeTab) {
        return
      }
      applyTab(button.dataset.tab)
    }
    const positionActiveTabIndicator = () => {
      requestAnimationFrame(() => {
        if (tabs.isConnected) {
          positionTabIndicator()
        }
      })
    }
    const tabResizeObserver =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver(positionActiveTabIndicator)
    tabResizeObserver?.observe(tabs)
    for (const button of tabButtons.values()) {
      tabResizeObserver?.observe(button)
    }
    if (!tabResizeObserver) {
      window.addEventListener("resize", positionActiveTabIndicator)
    }
    document.fonts?.ready.then(positionActiveTabIndicator)
    tabs.addEventListener("click", onClick)
    tabs.addEventListener("pointerover", onPointerOver)
    tabs.addEventListener("pointerleave", () => positionTabIndicator())
    tabs.addEventListener("focusin", onFocusIn)
    tabs.addEventListener("focusout", onFocusOut)
    const infoPane = document.createElement("section")
    infoPane.className = "userpatch-detail-info"
    infoPane.hidden = true
    toolbar.append(tabs, qualityTabs.element)
    mainColumn.append(toolbar, infoPane, screenshotsPane, list, emptyNote)
    renderModeRows()
    applyTab(activeTab)
    const infoEntries = [
      ["Posted", data.date],
      ...data.metaRows.filter(([label]) => label !== "Posted"),
      ["Storyline", data.storyline],
    ]
    infoPane.append(createDetailInfoList(infoEntries))
    root.append(panel, mainColumn)
    document.body.append(root)
    const onReleaseClick = (event) => {
      if (event.target.closest(".userpatch-provider-link")) {
        return
      }
      const item = event.target.closest("a.userpatch-release-item")
      if (!item) {
        return
      }
      markReleaseOpened(item.querySelector(".userpatch-release-row"), item)
      saveOpenedRelease(item.dataset.userpatchFilename, item.href)
    }
    root.addEventListener("click", onReleaseClick, true)
    setDetailTooltipCleanup(setupProviderTooltip(root))
  }
  const ensureDetailPage = () => {
    if (document.querySelector(".userpatch-detail-root")) {
      return true
    }
    const data = extractDetail()
    if (!data) {
      return false
    }
    if (!data.releases.length && !data.episodes.length) {
      return false
    }
    buildDetailPage(data)
    return true
  }

  // src/shared/dom.js
  const normalizePathname = (path) => {
    try {
      return new URL(path, location.href).pathname.replace(/\/+$/, "") || "/"
    } catch {
      return ""
    }
  }

  // src/hdhub4u/search-dialog.js
  let searchDialog = null
  const openSearchDialog = () => {
    if (
      typeof HTMLDialogElement === "undefined" ||
      !(searchDialog instanceof HTMLDialogElement) ||
      typeof searchDialog.showModal !== "function" ||
      !searchDialog.isConnected
    ) {
      return false
    }
    if (!searchDialog.open) {
      searchDialog.showModal()
    }
    return true
  }
  const ensureSearchDialog = () => {
    if (!document.body || searchDialog?.isConnected) {
      return false
    }
    if (typeof HTMLDialogElement === "undefined") {
      return false
    }
    const dialog = document.createElement("dialog")
    dialog.id = "userpatch-search-dialog"
    dialog.className = "userpatch-search-dialog"
    dialog.setAttribute("aria-label", "Search movies and TV shows")
    dialog.setAttribute("closedby", "any")
    const form = document.createElement("form")
    form.className = "search-form"
    form.setAttribute("role", "search")
    form.method = "get"
    form.action = CONFIG.searchPagePath
    const inputGroup = document.createElement("div")
    inputGroup.className = "search-input-container"
    inputGroup.setAttribute("role", "group")
    const addon = document.createElement("span")
    addon.className = "userpatch-input-group-addon"
    addon.setAttribute("aria-hidden", "true")
    const icon = document.createElement("span")
    icon.className = "search-icon-overlay"
    icon.append(createLucideIcon("search"))
    addon.append(icon)
    const input = document.createElement("input")
    input.className = "search-input-overlay"
    input.type = "search"
    input.name = "q"
    input.placeholder = "Search movies and TV shows"
    input.setAttribute("aria-label", "Search movies and TV shows")
    input.setAttribute("autocomplete", "off")
    input.setAttribute("autocapitalize", "none")
    input.setAttribute("autocorrect", "off")
    input.setAttribute("spellcheck", "false")
    input.setAttribute("enterkeyhint", "search")
    input.maxLength = 200
    const submit = document.createElement("button")
    submit.type = "submit"
    submit.className = "search-submit"
    submit.hidden = true
    submit.setAttribute("aria-hidden", "true")
    inputGroup.append(addon, input, submit)
    form.append(inputGroup)
    dialog.append(form)
    document.body.append(dialog)
    searchDialog = dialog
    let pointerStartedOutside = false
    const isOutsideDialog = (event) => {
      const rect = dialog.getBoundingClientRect()
      return (
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom
      )
    }
    const onPointerDown = (event) => {
      pointerStartedOutside = isOutsideDialog(event)
    }
    const onPointerUp = (event) => {
      const shouldDismiss =
        pointerStartedOutside && isOutsideDialog(event) && dialog.open
      pointerStartedOutside = false
      if (shouldDismiss) {
        dialog.close()
      }
    }
    if (!("closedBy" in HTMLDialogElement.prototype)) {
      dialog.addEventListener("pointerdown", onPointerDown)
      dialog.addEventListener("pointerup", onPointerUp)
    }
    return true
  }
  const resetSearchDialog = () => {
    searchDialog = null
  }

  // src/hdhub4u/header-nav.js
  const NAV_LABEL_WORD_FIXES = [
    [/\bbollywood\b/gi, "Bollywood"],
    [/\bhollywood\b/gi, "Hollywood"],
    [/\bgenres\b/gi, "Genres"],
  ]
  const normalizeNavItemLabel = (label) => {
    let text = label
    for (const [pattern, replacement] of NAV_LABEL_WORD_FIXES) {
      text = text.replace(pattern, replacement)
    }
    return text
  }
  const NAV_INDICATOR_CLASS = "userpatch-nav-indicator"
  const collectNavigation = () => {
    const items = []
    const links = document.querySelector("#category-links")
    if (links) {
      for (const item of links.children) {
        if (item.id === "mobile-search") {
          continue
        }
        const trigger = item.querySelector(":scope > a")
        const submenu = item.querySelectorAll(":scope > .dropdown-menu a[href]")
        if (submenu.length && trigger) {
          const label = normalizeNavItemLabel(
            normalizeText(trigger.textContent.replace("▾", ""))
          )
          const children = []
          for (const link of submenu) {
            const childLabel = normalizeNavItemLabel(
              normalizeText(link.textContent)
            )
            const href = link.getAttribute("href")
            if (childLabel && href && href !== "#") {
              children.push({
                label: childLabel,
                href,
              })
            }
          }
          if (label && children.length) {
            items.push({
              label,
              children,
            })
          }
          continue
        }
        if (!(trigger instanceof HTMLAnchorElement)) {
          continue
        }
        const label = normalizeNavItemLabel(
          normalizeText(
            trigger.textContent.replace("🏠", "").replace(/HDHub4u\s+/i, "")
          )
        )
        const href = trigger.getAttribute("href")
        if (label && href && href !== "#") {
          if (
            label.toLowerCase() === "home" ||
            href === "/" ||
            href === location.origin ||
            href === `${location.origin}/`
          ) {
            continue
          }
          items.push({
            label,
            href,
          })
        }
      }
    }
    const fourKButton = document.querySelector(
      ".navbar-header-custom a.custom-button[href]"
    )
    if (fourKButton) {
      const label =
        normalizeNavItemLabel(normalizeText(fourKButton.textContent)) ||
        "4K Movies"
      items.push({
        label,
        href: fourKButton.getAttribute("href"),
      })
    }
    return items
  }
  const matchesCurrentPage = (href) => {
    if (!href || href === "#") {
      return false
    }
    try {
      const url = new URL(href, location.href)
      if (url.origin !== location.origin) {
        return false
      }
      const targetPath = normalizePathname(url.pathname).toLowerCase()
      const currentPath = normalizePathname(location.pathname).toLowerCase()
      return (
        targetPath === currentPath ||
        (targetPath !== "/" && currentPath.startsWith(`${targetPath}/`))
      )
    } catch {
      return false
    }
  }
  let headerElement = null
  let headerNavContainer = null
  let headerNavIndicator = null
  let headerNavResizeObserver = null
  let refreshHeaderIndicator = () => {}
  const positionHeaderIndicator = (target) => {
    if (!headerNavIndicator || !headerNavContainer) {
      return
    }
    if (
      !target ||
      !headerNavContainer.contains(target) ||
      !window.matchMedia("(min-width: 46.01rem)").matches
    ) {
      headerNavIndicator.dataset.ready = "false"
      return
    }
    positionSelectionIndicator(
      headerNavIndicator,
      headerNavContainer,
      target,
      "nav"
    )
  }
  const positionActiveHeaderIndicator = () => {
    if (!headerNavContainer) {
      return
    }
    for (const item of headerNavContainer.querySelectorAll(
      ".userpatch-brand, .userpatch-nav-link"
    )) {
      item.classList.remove("userpatch-nav-active")
    }
    let activeItem =
      normalizePathname(location.pathname).toLowerCase() === "/"
        ? headerNavContainer.querySelector(".userpatch-brand")
        : null
    if (!activeItem) {
      for (const link of headerNavContainer.querySelectorAll(
        "a.userpatch-nav-link[href]"
      )) {
        if (matchesCurrentPage(link.getAttribute("href"))) {
          activeItem = link
          break
        }
      }
    }
    if (!activeItem) {
      for (const dropdown of headerNavContainer.querySelectorAll(
        ".userpatch-nav-item.dropdown"
      )) {
        const childMatches = [
          ...dropdown.querySelectorAll(".userpatch-dropdown-item[href]"),
        ].some((link) => matchesCurrentPage(link.getAttribute("href")))
        if (childMatches) {
          activeItem = dropdown.querySelector(":scope > .userpatch-nav-link")
          break
        }
      }
    }
    if (activeItem) {
      activeItem.classList.add("userpatch-nav-active")
    }
    positionHeaderIndicator(activeItem)
  }
  const setupHeaderIndicator = (container) => {
    headerNavContainer = container
    headerNavIndicator = document.createElement("span")
    headerNavIndicator.className = NAV_INDICATOR_CLASS
    headerNavIndicator.setAttribute("aria-hidden", "true")
    headerNavIndicator.dataset.ready = "false"
    container.prepend(headerNavIndicator)
    const getEventItem = (target) => {
      if (!(target instanceof Element)) {
        return null
      }
      return target.closest(
        ".userpatch-brand, .userpatch-nav-link, .userpatch-header-action"
      )
    }
    const onPointerOver = (event) => {
      if (
        (event.pointerType !== "mouse" && event.pointerType !== "pen") ||
        !window.matchMedia("(hover: hover) and (pointer: fine)").matches
      ) {
        return
      }
      const item = getEventItem(event.target)
      if (item) {
        positionHeaderIndicator(item)
      }
    }
    const onFocusIn = (event) => {
      const item = getEventItem(event.target)
      if (item) {
        positionHeaderIndicator(item)
      }
    }
    const onFocusOut = (event) => {
      if (
        !(event.relatedTarget instanceof Node) ||
        !container.contains(event.relatedTarget)
      ) {
        positionActiveHeaderIndicator()
      }
    }
    container.addEventListener("pointerover", onPointerOver)
    container.addEventListener("pointerleave", positionActiveHeaderIndicator)
    container.addEventListener("focusin", onFocusIn)
    container.addEventListener("focusout", onFocusOut)
    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", positionActiveHeaderIndicator)
    } else {
      headerNavResizeObserver = new ResizeObserver(
        positionActiveHeaderIndicator
      )
      headerNavResizeObserver.observe(container)
    }
    refreshHeaderIndicator = positionActiveHeaderIndicator
    positionActiveHeaderIndicator()
  }
  const ensureHeader = () => {
    if (!document.body) {
      return false
    }
    if (headerElement?.isConnected) {
      refreshHeaderIndicator()
      return true
    }
    const items = collectNavigation()
    const header = document.createElement("header")
    header.className = "userpatch-header"
    const inner = document.createElement("div")
    inner.className = "userpatch-header-inner"
    const container = document.createElement("div")
    container.className = "userpatch-header-container"
    const brand = document.createElement("a")
    brand.className = "userpatch-brand"
    brand.href = "/"
    brand.setAttribute("aria-label", "HDHub4u home")
    const brandImage = document.createElement("img")
    brandImage.src = HEADER_WORDMARK_DATA_URI
    brandImage.alt = "HDHub4u"
    brandImage.decoding = "async"
    brand.append(brandImage)
    container.append(brand)
    if (items.length) {
      const nav = document.createElement("nav")
      nav.className = "userpatch-nav"
      nav.setAttribute("aria-label", "Site navigation")
      const list = document.createElement("ul")
      list.className = "userpatch-nav-list"
      for (const item of items) {
        const listItem = document.createElement("li")
        listItem.className = "userpatch-nav-item"
        if (item.children) {
          listItem.classList.add("dropdown")
          const trigger = document.createElement("button")
          trigger.type = "button"
          trigger.className = "userpatch-nav-link"
          trigger.setAttribute("aria-haspopup", "true")
          trigger.setAttribute("aria-expanded", "false")
          const text = document.createElement("span")
          text.textContent = item.label
          trigger.append(text, createLucideIcon("chevron-down"))
          const submenu = document.createElement("ul")
          submenu.className = "userpatch-dropdown-menu"
          for (const child of item.children) {
            const childItem = document.createElement("li")
            const link = document.createElement("a")
            link.className = "userpatch-dropdown-item"
            link.href = child.href
            link.textContent = child.label
            childItem.append(link)
            submenu.append(childItem)
          }
          trigger.addEventListener("click", (event) => {
            event.stopPropagation()
            const willOpen = !listItem.classList.contains("open")
            for (const other of header.querySelectorAll(
              ".userpatch-nav-item.dropdown.open"
            )) {
              if (other !== listItem) {
                other.classList.remove("open")
                other
                  .querySelector(":scope > .userpatch-nav-link")
                  ?.setAttribute("aria-expanded", "false")
              }
            }
            listItem.classList.toggle("open", willOpen)
            trigger.setAttribute("aria-expanded", String(willOpen))
          })
          listItem.append(trigger, submenu)
        } else {
          const link = document.createElement("a")
          link.className = "userpatch-nav-link"
          link.href = item.href
          if (!item.href.startsWith("/")) {
            link.target = "_blank"
            link.rel = "noopener noreferrer"
          }
          link.textContent = item.label
          listItem.append(link)
        }
        list.append(listItem)
      }
      nav.append(list)
      container.append(nav)
    }
    const searchToggle = document.createElement("button")
    searchToggle.type = "button"
    searchToggle.className = "userpatch-header-action userpatch-search-toggle"
    searchToggle.setAttribute("aria-label", "Search")
    searchToggle.setAttribute("aria-haspopup", "dialog")
    searchToggle.append(createLucideIcon("search"))
    searchToggle.addEventListener("click", () => {
      openSearchDialog()
    })
    const menuToggle = document.createElement("button")
    menuToggle.type = "button"
    menuToggle.className = "userpatch-header-action userpatch-menu-toggle"
    menuToggle.setAttribute("aria-label", "Menu")
    menuToggle.setAttribute("popovertarget", CONFIG.mobileMenuPopoverId)
    menuToggle.append(createLucideIcon("menu"))
    container.append(menuToggle, searchToggle)
    inner.append(container)
    header.append(inner)
    document.body.prepend(header)
    headerElement = header
    setupHeaderIndicator(container)
    document.addEventListener("click", (event) => {
      if (!event.target.closest(".userpatch-nav-item.dropdown")) {
        for (const openDropdown of header.querySelectorAll(
          ".userpatch-nav-item.dropdown.open"
        )) {
          openDropdown.classList.remove("open")
          openDropdown
            .querySelector(":scope > .userpatch-nav-link")
            ?.setAttribute("aria-expanded", "false")
        }
      }
    })
    return true
  }
  const resetHeaderNavigation = () => {
    headerElement = null
    headerNavContainer = null
    headerNavIndicator = null
    refreshHeaderIndicator = () => {}
    if (headerNavResizeObserver) {
      headerNavResizeObserver.disconnect()
      headerNavResizeObserver = null
    }
  }

  // src/hdhub4u/listing.js
  const normalizePagination = (root = document) => {
    for (const arrow of root.querySelectorAll(
      "a.page-numbers.next, a.next, .pagination-next a, a[rel='next']"
    )) {
      if (!arrow.dataset.userpatchNormalized) {
        arrow.dataset.userpatchNormalized = "true"
        arrow.textContent = ""
        arrow.setAttribute("aria-label", "Next page")
        arrow.append(createLucideIcon("arrow-right"))
      }
    }
    for (const arrow of root.querySelectorAll(
      "a.page-numbers.prev, a.prev, .pagination-prev a, a[rel='prev']"
    )) {
      if (!arrow.dataset.userpatchNormalized) {
        arrow.dataset.userpatchNormalized = "true"
        arrow.textContent = ""
        arrow.setAttribute("aria-label", "Previous page")
        arrow.append(createLucideIcon("arrow-left"))
      }
    }
  }
  const ensureListingPage = () => {
    const main = document.querySelector("main#main-content.content-wrapper")
    if (!main) {
      return false
    }
    normalizePagination(main)
    if (main.classList.contains("userpatch-listing-ready")) {
      return true
    }
    const grid = main.querySelector("ul.recent-movies")
    if (!grid) {
      return false
    }
    for (const child of main.children) {
      if (child.matches("section.home-wrapper, .pagination-wrapper")) {
        child.classList.add(KEEP_CLASS)
      }
    }
    if (!main.querySelector(`.userpatch-keep ul.recent-movies`)) {
      for (const child of main.children) {
        child.classList.remove(KEEP_CLASS)
      }
      return false
    }
    for (const heading of main.querySelectorAll(
      "h2, .category-name, .page-title, .widget-title, .left-wrapper > h2, .home-wrapper > h2, .latest-releases-header"
    )) {
      heading.remove()
    }
    normalizePagination(main)
    for (const link of main.querySelectorAll(
      "li.thumb figure > a, li.thumb a"
    )) {
      link.setAttribute("draggable", "false")
    }
    let imageIndex = 0
    for (const img of main.querySelectorAll(
      "li.thumb figure > a > img, li.thumb img"
    )) {
      img.setAttribute("draggable", "false")
      if (imageIndex === 0) {
        img.fetchPriority = "high"
        img.loading = "eager"
      } else if (!img.hasAttribute("loading")) {
        img.loading = "lazy"
      }
      imageIndex += 1
      setupProgressiveImage(img)
    }
    for (const captionLink of main.querySelectorAll("li.thumb figcaption a")) {
      captionLink.tabIndex = -1
    }
    main.classList.add(LISTING_READY_CLASS)
    return true
  }

  // src/hdhub4u/mobile-nav.js
  let mobileMenuPopover = null
  const ensureMobileMenuPopover = () => {
    if (!document.body) {
      return null
    }
    if (mobileMenuPopover?.isConnected) {
      return mobileMenuPopover
    }
    if (!("popover" in HTMLElement.prototype)) {
      return null
    }
    const items = collectNavigation()
    const popover = document.createElement("div")
    popover.className = "userpatch-mobile-menu"
    popover.id = CONFIG.mobileMenuPopoverId
    popover.setAttribute("popover", "auto")
    const header = document.createElement("header")
    header.className = "userpatch-mobile-menu-header"
    const title = document.createElement("h2")
    title.className = "userpatch-mobile-menu-title"
    title.textContent = "Menu"
    const closeButton = document.createElement("button")
    closeButton.type = "button"
    closeButton.className = "userpatch-mobile-menu-close"
    closeButton.setAttribute("aria-label", "Close menu")
    closeButton.setAttribute("popovertarget", CONFIG.mobileMenuPopoverId)
    closeButton.setAttribute("popovertargetaction", "hide")
    closeButton.append(createLucideIcon("x"))
    header.append(title, closeButton)
    const nav = document.createElement("nav")
    nav.className = "userpatch-mobile-menu-nav"
    nav.setAttribute("aria-label", "Site navigation")
    const list = document.createElement("ul")
    list.className = "userpatch-mobile-menu-list"
    let groupIndex = 0
    for (const item of items) {
      const listItem = document.createElement("li")
      listItem.className = "userpatch-mobile-menu-item"
      if (item.children) {
        const group = document.createElement("details")
        group.className = "userpatch-mobile-menu-group"
        const summary = document.createElement("summary")
        summary.className = "userpatch-mobile-menu-summary"
        const label = document.createElement("span")
        label.textContent = item.label
        const submenuId = `userpatch-mobile-menu-sublist-${groupIndex}`
        summary.setAttribute("aria-controls", submenuId)
        summary.append(label, createLucideIcon("chevron-down"))
        const submenu = document.createElement("ul")
        submenu.className = "userpatch-mobile-menu-sublist"
        submenu.id = submenuId
        for (const child of item.children) {
          const childItem = document.createElement("li")
          const link = document.createElement("a")
          link.className = "userpatch-mobile-menu-link"
          link.href = child.href
          link.textContent = child.label
          childItem.append(link)
          submenu.append(childItem)
        }
        group.append(summary, submenu)
        listItem.append(group)
        groupIndex += 1
      } else {
        const link = document.createElement("a")
        link.className = "userpatch-mobile-menu-link"
        link.href = item.href
        if (!item.href.startsWith("/")) {
          link.target = "_blank"
          link.rel = "noopener noreferrer"
        }
        link.textContent = item.label
        listItem.append(link)
      }
      list.append(listItem)
    }
    nav.append(list)
    popover.append(header, nav)
    popover.addEventListener("click", (event) => {
      if (event.target instanceof Element && event.target.closest("a[href]")) {
        popover.hidePopover()
      }
    })
    document.body.append(popover)
    mobileMenuPopover = popover
    return popover
  }
  let mobileNavigationElement = null
  const ensureMobileNavigation = () => {
    if (!document.body) {
      return false
    }
    if (mobileNavigationElement?.isConnected) {
      return true
    }
    const popover = ensureMobileMenuPopover()
    if (!popover) {
      return false
    }
    const navigation = document.createElement("nav")
    navigation.className = "userpatch-mobile-nav"
    navigation.setAttribute("aria-label", "Mobile navigation")
    for (const [destination, label] of CONFIG.mobileNavigationItems) {
      const isAction = destination === "menu" || destination === "search"
      const item = document.createElement(isAction ? "button" : "a")
      item.className = "userpatch-mobile-nav-item"
      item.setAttribute("aria-label", label)
      if (isAction) {
        item.type = "button"
        if (destination === "menu") {
          item.setAttribute("popovertarget", CONFIG.mobileMenuPopoverId)
          item.setAttribute("aria-controls", CONFIG.mobileMenuPopoverId)
        } else {
          item.addEventListener("click", () => {
            if (!openSearchDialog()) {
              location.href = CONFIG.searchPagePath
            }
          })
        }
      } else {
        item.href = destination
      }
      const icon = document.createElement("span")
      icon.className = "userpatch-mobile-nav-icon"
      icon.setAttribute("aria-hidden", "true")
      if (label === "Home") {
        icon.classList.add("userpatch-mobile-nav-icon-brand")
        const image = document.createElement("img")
        image.className = "userpatch-mobile-nav-brand-logo"
        image.src = SITE_ICON_DATA_URI
        image.alt = ""
        image.width = 20
        image.height = 20
        image.decoding = "async"
        icon.append(image)
      } else {
        icon.append(
          createLucideIcon(destination === "menu" ? "menu" : "search")
        )
      }
      const text = document.createElement("span")
      text.textContent = label
      item.append(icon, text)
      navigation.append(item)
    }
    document.body.append(navigation)
    mobileNavigationElement = navigation
    const currentPath = normalizePathname(location.pathname)
    for (const link of navigation.querySelectorAll("a[href]")) {
      const targetPath = normalizePathname(link.href)
      if (targetPath === currentPath) {
        link.setAttribute("aria-current", "page")
      } else {
        link.removeAttribute("aria-current")
      }
    }
    return true
  }
  const resetMobileNavigationState = () => {
    mobileMenuPopover = null
    mobileNavigationElement = null
  }

  // src/shared/managed-meta.js
  const restoreManagedMeta = (metaIds) => {
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

  // src/hdhub4u/teardown.js
  const removeBookmarkOverlay = () => {
    try {
      for (const overlay of document.querySelectorAll("[id^='bb-overlay-']")) {
        overlay.remove()
      }
      const body = document.body
      if (body) {
        const classNames = (body.getAttribute("class") || "").split(/\s+/)
        for (const className of classNames) {
          if (className.startsWith("bb-")) {
            body.classList.remove(className)
          }
        }
      }
    } catch {}
  }
  const removeAppChrome = () => {
    dismissPageLoader(true)
    resetHeaderNavigation()
    resetSearchDialog()
    resetMobileNavigationState()
    clearDetailTooltipCleanup()
    resetScreenshotViewer()
    for (const node of document.querySelectorAll(
      ".userpatch-header, dialog.userpatch-search-dialog, .userpatch-mobile-nav, .userpatch-mobile-menu, .userpatch-detail-root, .userpatch-provider-tooltip"
    )) {
      node.remove()
    }
    const main = document.querySelector("main#main-content")
    if (main) {
      main.classList.remove(LISTING_READY_CLASS)
      for (const child of main.querySelectorAll(`.${KEEP_CLASS}`)) {
        child.classList.remove(KEEP_CLASS)
      }
    }
    restoreManagedMeta([COLOR_SCHEME_META_ID, THEME_COLOR_META_ID])
    document.getElementById(FONT_STYLE_ID)?.remove()
    document.getElementById(STYLE_ID)?.remove()
    document.documentElement?.classList.remove(
      MAIA_CLASS,
      DETAIL_PAGE_CLASS,
      HBLINKS_PAGE_CLASS
    )
  }

  // src/hdhub4u/main.js
  showRedesignLoader(/(^|\.)(hdhub4u|hblinks)\./i)
  const processCurrentPage = () => {
    if (isCloudflareChallenge()) {
      dismissPageLoader(true)
      removeAppChrome()
      return true
    }
    if (!ensureStyles()) {
      if (document.documentElement?.classList.contains("userpatch-maia")) {
        removeAppChrome()
      }
      return false
    }
    if (isHblinksArchivePage()) {
      const pageReady = ensureHblinksPage()
      document.documentElement.classList.toggle(HBLINKS_PAGE_CLASS, pageReady)
      document.documentElement.classList.remove(DETAIL_PAGE_CLASS)
      return pageReady
    }
    document.documentElement.classList.remove(HBLINKS_PAGE_CLASS)
    removeBookmarkOverlay()
    applySiteBranding()
    const isDetail = Boolean(document.body?.classList.contains("single"))
    let detailBuilt = false
    if (isDetail) {
      detailBuilt = ensureDetailPage()
    }
    document.documentElement.classList.toggle(DETAIL_PAGE_CLASS, detailBuilt)
    ensureHeader()
    ensureSearchDialog()
    ensureMobileNavigation()
    if (!isDetail) {
      const listingReady = ensureListingPage()
      normalizePagination(document)
      return listingReady
    }
    return detailBuilt
  }
  const hasSiteSignature = () =>
    isHblinksArchivePage() ||
    (document.body?.classList.contains("wp-theme-9xhd") &&
      document.querySelector("main#main-content.content-wrapper"))
  discoverSite(hasSiteSignature, () => {
    initStorage({ openedReleasesKey: CONFIG.storageKeys.openedReleases })
    initPageLoop({
      processPage: processCurrentPage,
      attributeFilter: ["href", "src"],
      discoveryTimeoutMs: CONFIG.pageDiscoveryTimeoutMs,
    })
    initMaiaStyles({
      styleId: STYLE_ID,
      fontStyleId: FONT_STYLE_ID,
      colorSchemeMetaId: COLOR_SCHEME_META_ID,
      themeColorMetaId: THEME_COLOR_META_ID,
      themeColor: CONFIG.themeColor,
      css: MAIA_CSS,
      siteSignature: hasSiteSignature,
    })
    if (!isCloudflareChallenge() && !isHblinksHost()) {
      showInitialPageLoader(
        () => document.body || document.documentElement,
        () => {
          const spinner = createLucideIcon("loader-2")
          spinner.classList.add(PAGE_SPINNER_CLASS)
          return spinner
        },
        CONFIG.pageLoaderTimeoutMs
      )
    }
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", schedulePageProcessing, {
        once: true,
      })
    }
    document.addEventListener(
      "dragstart",
      (event) => {
        if (
          event.target instanceof Element &&
          event.target.closest(
            "li.thumb, .userpatch-screenshot, figure, img, a"
          )
        ) {
          event.preventDefault()
        }
      },
      true
    )
    watchCurrentPage()
    window.addEventListener("pagehide", () => {
      stopWaiting()
    })
    window.addEventListener("pageshow", (event) => {
      if (event.persisted) {
        watchCurrentPage()
      }
    })
  })
})()
