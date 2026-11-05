# userpatch

userpatch is a collection of userscripts by **luminalreason** that automate link-shortener gate pages — countdown timers, redirect hops, focus locks, adblock traps — on movie/download sites. Every script is a single, dependency-free `.user.js` file that runs in [Violentmonkey](https://violentmonkey.github.io/).

## What makes these scripts worth using?

Every script here exists because a real, recurring annoyance needed solving — a countdown that only runs when the tab is focused, a redirect chain that wastes minutes, a gate that fights the browser at every step. The scripts are genuinely useful to people: each one removes a concrete technical problem the user actually has, not a hypothetical one.

Two design choices keep them that way. Gates are detected by pattern (DOM signatures, URL shapes, network payloads) instead of hardcoded domain lists, so a script keeps working when sites rotate domains. And the scripts stop where a human decision belongs: they never solve CAPTCHAs, bypass paywalls, or start downloads.

## Priorities

Stability and reliability come first. Treat site redesigns, renamed gate buttons, timing races, and changed payloads as normal product states — these sites change constantly, and a script must degrade to doing nothing rather than misfire on an unrelated page. If a tradeoff is required, choose correctness and robustness over short-term convenience. In the code itself, prioritize correctness and clarity; speed and efficiency are secondary unless the task says otherwise.

Long-term maintainability is a core priority. Each script is deliberately self-contained (a userscript cannot import across files), so within a file, lift repeated logic into helpers instead of pasting variants. Don't be afraid to change existing code. Don't take shortcuts by bolting a local fix onto a section that already has a helper for the job. Extend an existing script when its gate family is already covered; add a new script only for a genuinely new chain.

## A note from luminalreason

I like ambitious ideas, simple systems, and software that feels obvious. Do not preserve complexity just because it already exists. Do not introduce machinery because it looks architecturally impressive. Understand the real constraint, then fight for the smallest model that makes the correct behavior unsurprising.

Channel both "measure twice, cut once" and "yagni". Fight scope creep. Try to honor the dev's intent in both a minimal and realistic fashion.

The rest of this document is meant to help you navigate the codebase and make changes effectively. Think of these instructions less as "hard rules", more as "good defaults". The developer's preferences should be able to override anything here. If a rule in this file fights the task in front of you, say so loudly and get a human sign-off before breaking it.

## A small glossary

- **Userscript** — a single-file browser extension run by a userscript manager.
- **Manager** — the browser extension that runs userscripts. Ours is Violentmonkey.
- **Gate page** — an interstitial "please wait / verify / continue" page in a shortener chain.
- **Hop** — one intermediate page between the source link and the destination.
- **Metadata block** — the `// ==UserScript==` comment at the top of every script.

## Product invariants

- Every script keeps a valid metadata block: `@name`, `@namespace https://github.com/luminalreason/userpatch`, `@version`, `@description`, `@author luminalreason`, at least one `@match`, `@run-at document-start`, `@noframes`.
- Any behavior change bumps `@version` (patch for fixes, minor for new gates).
- `@grant none` unless a `GM_*` API is genuinely needed; prefer plain DOM/network APIs.
- Scripts must stand down on destination pages (file hosts, Cloudflare challenge pages) — a redirect loop on a destination page is a bug.
- Direct file links are never auto-opened (see `isDirectFileLink` in hub-helper).
- No `console.log` spam on every page load; log only when the script takes an action.

## Violentmonkey documentation

Consult the latest docs before writing or touching userscript behavior — do not rely on memory. The raw markdown sources (read them from the `source` branch so you always get the current version):

**Read before writing any new script:**

- Creating a userscript — <https://raw.githubusercontent.com/violentmonkey/violentmonkey.github.io/refs/heads/source/content/pages/guide/creating-a-userscript/index.md>
- Using modern syntax — <https://raw.githubusercontent.com/violentmonkey/violentmonkey.github.io/refs/heads/source/content/pages/guide/using-modern-syntax/index.md>

**API reference:**

- Metadata block keys — <https://raw.githubusercontent.com/violentmonkey/violentmonkey.github.io/refs/heads/source/content/pages/api/metadata-block.mdx>
- `@match` patterns — <https://raw.githubusercontent.com/violentmonkey/violentmonkey.github.io/refs/heads/source/content/pages/api/matching.md>
- Privileged APIs (`GM_*` / `GM.*`) — <https://raw.githubusercontent.com/violentmonkey/violentmonkey.github.io/refs/heads/source/content/pages/api/gm.mdx>

**Injection behavior:**

- Inject into context — <https://raw.githubusercontent.com/violentmonkey/violentmonkey.github.io/refs/heads/source/content/posts/inject-into-context.md>
- Inject scripts with blob URLs — <https://raw.githubusercontent.com/violentmonkey/violentmonkey.github.io/refs/heads/source/content/posts/inject-scripts-with-blob-urls.md>

**Development workflow:**

- Edit scripts with your favorite editor — <https://raw.githubusercontent.com/violentmonkey/violentmonkey.github.io/refs/heads/source/content/posts/how-to-edit-scripts-with-your-favorite-editor/index.md>
- Violentmonkey workflows — <https://raw.githubusercontent.com/violentmonkey/violentmonkey.github.io/refs/heads/source/content/posts/violentmonkey-workflows.md>
- Smart rules for blacklist — <https://raw.githubusercontent.com/violentmonkey/violentmonkey.github.io/refs/heads/source/content/posts/smart-rules-for-blacklist.md>

**Reference:**

- FAQ — <https://raw.githubusercontent.com/violentmonkey/violentmonkey.github.io/refs/heads/source/content/pages/faq/index.md>
- Localization — <https://raw.githubusercontent.com/violentmonkey/violentmonkey.github.io/refs/heads/source/content/pages/localization/index.md>
- Privacy — <https://raw.githubusercontent.com/violentmonkey/violentmonkey.github.io/refs/heads/source/content/pages/privacy/index.md>
- AI agent access (MCP) — optional; lets an agent manage installed scripts in the developer's browser directly (`npx -y @violentmonkey/mcp`). Only relevant for live install/test workflows, not for authoring. <https://raw.githubusercontent.com/violentmonkey/violentmonkey.github.io/refs/heads/source/content/pages/guide/ai-agent-access/index.md>
- Changelog — when a script behaves differently in a new Violentmonkey version, check <https://github.com/violentmonkey/violentmonkey/releases>

Rendered docs live at <https://violentmonkey.github.io/>.

## Hit every surface

Before considering a script change done:

- Metadata block is valid and `@version` bumped.
- Both the fast path (payload present at parse time) and the late path (injected after `DOMContentLoaded` / via `MutationObserver`) were considered.
- Destination and Cloudflare-challenge stand-down logic still correct.
- `pnpm check` passes.

## Ways to hurt yourself

- **Never commit unless the developer explicitly asks.** This repository was initialized under a "no commit unless told" rule.
- **Never delete or "clean up" `.temp/`.** It holds parked scripts that may come back.
- **Never "fix" a broken gate by hardcoding the site's current domains** while a DOM/network signature is still matchable.
- Manual verification happens in the developer's browser; do not claim a gate flow works without the developer confirming it.

## Linting and formatting

- `pnpm lint` / `pnpm lint:fix` — oxlint, config in `.oxlintrc.json`. Warnings are denied: a warning fails the run, so fix the code rather than silencing the rule.
- `pnpm fmt` / `pnpm fmt:check` — oxfmt, style pinned in `.oxfmtrc.json` (no semicolons, double quotes, 80 columns).
- `pnpm lint:markdown` — markdownlint-cli2, config in `.markdownlint-cli2.jsonc`.
- `pnpm check` — everything above in one command.

A husky pre-commit hook runs lint-staged (`.husky/pre-commit` + `lint-staged.config.mjs`): every staged `.js`, `.md`, and `package.json` is formatted and linted before the commit can land. Formatting never rewrites comments, so the metadata block survives untouched.

## Verifying

- `pnpm check` passes with zero warnings.
- The metadata block is intact and `@version` reflects the change.

## Pull requests

- Don't open a PR unless the developer explicitly asks.
- Title: clear, correctly capitalized, imperative, no trailing punctuation, no conventional-commit prefixes (`fix:`, `feat:`).
- Body: brief problem statement, then the fix. Close with the model and harness used.
- End with a `Release Notes:` section — blank line after the heading, exactly one bullet: `- Added ...` / `- Fixed ...` / `- Improved ...` / `- N/A`.
- Every claim in the body must be verifiable in the diff; never present intentions as done.
- Review the premise, not just the diff — spend a sentence asking whether the change should exist at all.
- One concern per PR; tightly coupled changes count as one concern; unrelated extras get raised with the developer, not smuggled in.
- No screenshots are required — these are userscripts with no UI to capture.
- When babysitting checks: poll for new comments/checks, verify bot findings, fix real ones, dismiss false positives with a written reason, and stop when checks are green.

## Rules hygiene

### After any agentic session

- The README table, every script's `@version`, and reality are in sync.

### High bar for new rules

A new rule belongs here only if it is all of: **non-obvious** (an experienced contributor would still get it wrong), **repeatedly encountered** (more than once), and **specific enough to act on**. If oxlint, oxfmt, or markdownlint can enforce it, it belongs in their config instead. Rules are traps to avoid, not maps to follow.

## Plans and work artifacts

- Never commit plans, scratch files, or anything from `.temp/`.
- Documentation is `README.md` with one table of all scripts, plus `CONTRIBUTING.md` for the development workflow. Optional how-to guides for setup outside the scripts can live in `docs/`, linked from README's Guides section. No per-script READMEs.

## Documentation

- `README.md` is the main user-facing doc: one table (script, version, one-line description written for normal people) plus install notes. The deep truth of how a script works lives in the script itself — don't duplicate it in the README.
- Installation instructions recommend Violentmonkey and link raw GitHub URLs.

## Where code lives

```text
scripts/    one .user.js per automation, named <site>-helper.user.js
.temp/      parked scripts (gitignored, never published)
```

## Taste

- Comments are plain sentences that explain _why_ — no banner rules, no decorative dashes.
- Prefer standing down over misfiring: when in doubt, do nothing.
- Guard cross-origin and cross-page assumptions; catch and return, never throw into the page.
- Observers and timers clean up after themselves (`observer.disconnect()`, bounded `setTimeout`).
- Explain the _why_ of every gate signature in a comment — the site won't explain itself later.
- No cleverness contests: the reader of this code six months from now is you at 2 a.m.
