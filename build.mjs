import { execSync } from "node:child_process"
import { readFileSync, writeFileSync } from "node:fs"

import { rolldown } from "rolldown"

import { installLoadingCover } from "./src/shared/loading-cover.mjs"

const loadingPrelude = `(${installLoadingCover.toString()})();\n`

const sites = [
  { id: "4khdhub", artifact: "scripts/4khdhub-redesign.user.js" },
  { id: "hubcloud", artifact: "scripts/hubcloud-redesign.user.js" },
  { id: "hdhub4u", artifact: "scripts/hdhub4u-redesign.user.js" },
]

const artifacts = await Promise.all(
  sites.map(async ({ id, artifact }) => {
    const banner =
      readFileSync(
        new URL(`./src/${id}/header.js`, import.meta.url),
        "utf8"
      ).trimEnd() + "\n\n// Generated from src/ — do not edit by hand.\n"
    const bundle = await rolldown({
      input: `src/${id}/main.js`,
      platform: "browser",
      moduleTypes: { ".css": "text" },
      // Tree-shaking inlines single-use constants, breaking AST-verbatim equivalence.
      // Per-site shared-module imports limit export leakage instead.
      treeshake: false,
    })
    await bundle.write({
      file: artifact,
      format: "iife",
      minify: false,
      // Phase 2 removed source IIFEs, so the bundler must supply strict mode.
      strict: true,
      banner: banner + loadingPrelude,
    })
    return artifact
  })
)

for (const artifact of artifacts) {
  // oxfmt converges on rolldown's raw output only from the second pass on.
  let previous = ""
  for (let pass = 0; pass < 3; pass += 1) {
    execSync(`pnpm exec oxfmt ${artifact}`, { stdio: "inherit" })
    const current = readFileSync(artifact, "utf8")
    if (current === previous) {
      break
    }
    previous = current
  }
  if (readFileSync(artifact, "utf8") !== previous) {
    throw new Error(`oxfmt did not converge for ${artifact}`)
  }
  console.log(`built ${artifact}`)
}

// Keep each standalone IIFE intact, including its private shared-module state.
// Metadata-derived guards preserve the separate scripts' execution scopes.
const familyHeader = readFileSync("src/hubfamily/header.js", "utf8").trimEnd()
const familyParts = sites.map(({ id, artifact }) => {
  const header = readFileSync(`src/${id}/header.js`, "utf8")
  const matches = [...header.matchAll(/^\/\/ @match\s+(\S+)/gm)].map(
    ([, pattern]) =>
      "^" +
      pattern
        .split("*")
        .map((part) => part.replaceAll(/[.*+?^${}()|[\]\\]/g, "\\$&"))
        .join(".*") +
      "$"
  )
  const code = readFileSync(artifact, "utf8").replace(
    /^[\s\S]*?\/\/ ==\/UserScript==\s*/,
    ""
  )
  return `if (new RegExp(${JSON.stringify(matches.join("|"))}).test(location.href)) {\n${code}\n}`
})
const familyArtifact = "scripts/hubfamily-redesign.user.js"
writeFileSync(
  familyArtifact,
  `${familyHeader}\n\n// Generated from src/ — do not edit by hand.\n${loadingPrelude}${familyParts.join("\n")}\n`
)
execSync(`pnpm exec oxfmt ${familyArtifact}`, { stdio: "inherit" })
console.log(`built ${familyArtifact}`)
