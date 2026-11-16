# Contributing

## Developer setup

Requires [pnpm](https://pnpm.io/).

```sh
pnpm install
```

Tooling: [oxlint](https://oxc.rs/docs/guide/usage/linter) for linting, [oxfmt](https://oxc.rs/docs/guide/usage/formatter) for formatting, markdownlint-cli2 for markdown, husky + lint-staged for the pre-commit gate.

```sh
pnpm check         # fmt:check + lint + markdown lint — run before pushing
pnpm lint          # oxlint
pnpm lint:fix      # oxlint with auto-fix
pnpm lint:markdown # markdownlint
pnpm fmt           # oxfmt
pnpm fmt:check     # oxfmt --check
```

`pnpm install` also installs a Git pre-commit hook. It runs oxfmt, oxlint, and markdownlint on every staged file — warnings are denied, so a commit only lands on clean code.

## Editing the redesign scripts

The four `-redesign` scripts are **generated** from `src/` — never hand-edit `scripts/*-redesign.user.js`. The loop is: edit `src/<site>/`, run `pnpm build`, then update the script in Violentmonkey. Two ways to keep Violentmonkey in sync:

- **External-editor tracking** — drag the built `.user.js` from `scripts/` into a Violentmonkey installer tab, open the settings for the installed script, and enable "Track external editor file" (or serve `scripts/` over localhost; the filename must end in `.user.js` for Violentmonkey to pick it up). Violentmonkey then reloads the script from disk on every build.
- **`npx @violentmonkey/mcp`** — lets an agent manage installed scripts directly. Requires Violentmonkey ≥ 2.49.5 and Node ≥ 24; reconnect after browser restarts.

`hub-helper` and `xd-helper` are hand-written single files — edit them directly.

## Writing scripts

- One `.user.js` per automation in `scripts/`, named `<site>-helper.user.js`.
- Metadata block rules: `@namespace https://github.com/luminalreason/userpatch`, `@run-at document-start`, `@noframes`, `@grant none` unless a `GM_*` API is truly needed. Bump `@version` on every change.
- Read the Violentmonkey docs before writing userscript APIs — don't rely on memory:
  - [Creating a userscript](https://violentmonkey.github.io/guide/creating-a-userscript/)
  - [Using modern syntax](https://violentmonkey.github.io/guide/using-modern-syntax/)
  - [`@match` patterns](https://violentmonkey.github.io/api/matching/)
- Test in your own browser with Violentmonkey before opening a PR.
