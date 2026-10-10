# userpatch

A collection of browser userscripts by **luminalreason** — each one removes a real annoyance (gate countdowns, redirect hops, ad traps) instead of adding one. Install and forget.

## Scripts

| Script       | Version | Description                                                                 |
| ------------ | ------- | --------------------------------------------------------------------------- |
| [hub-helper] | 0.1.0   | Skips "please wait" gate pages and opens the page the countdown was hiding. |
| [xd-helper]  | 0.1.0   | Clicks through XD gate pages for you — no waiting, no extra clicks.         |

[hub-helper]: https://github.com/luminalreason/userpatch/raw/main/scripts/hub-helper.user.js
[xd-helper]: https://github.com/luminalreason/userpatch/raw/main/scripts/xd-helper.user.js

## Installation

These scripts use standard userscript APIs, so any userscript manager can run them.

> [!TIP]
> Use [Violentmonkey](https://violentmonkey.github.io/). It is fully open source.

1. Install [Violentmonkey](https://violentmonkey.github.io/) for your browser.

2. Open a script's raw URL — Violentmonkey will prompt to install it:

   ```text
   https://github.com/luminalreason/userpatch/raw/main/scripts/<script-name>.user.js
   ```

   Alternatively, open the file above, copy its contents into a new Violentmonkey script, and save.

> [!CAUTION]
> Do not use Tampermonkey if source transparency matters to you. It is closed source, so its implementation cannot be independently reviewed. Use Violentmonkey instead.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).
