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

## Writing scripts

- One `.user.js` per automation in `scripts/`, named `<site>-helper.user.js`.
- Metadata block rules: `@namespace https://github.com/luminalreason/userpatch`, `@run-at document-start`, `@noframes`, `@grant none` unless a `GM_*` API is truly needed. Bump `@version` on every change.
- Read the Violentmonkey docs before writing userscript APIs — don't rely on memory:
  - [Creating a userscript](https://violentmonkey.github.io/guide/creating-a-userscript/)
  - [Using modern syntax](https://violentmonkey.github.io/guide/using-modern-syntax/)
  - [`@match` patterns](https://violentmonkey.github.io/api/matching/)
- Test in your own browser with Violentmonkey before opening a PR.
