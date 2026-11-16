# userpatch

A collection of browser userscripts by **luminalreason** that make link-shortener gates less tedious and media sites easier to use.

## Scripts

| Script               | Version | Description                                                                                                                                                                 |
| -------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [hubfamily-redesign] | 0.3.0   | Redesigns 4K-HDHub, HDHub4u, HUBLinks, HubCloud, and HubCDN with one consistent interface that follows your system’s light or dark theme for movies, series, and downloads. |
| [hub-helper]         | 0.3.3   | Skips link shortener wait pages, updates old HubCloud and HubDrive links, and returns a reloaded download tab to its share page.                                            |
| [xd-helper]          | 0.1.0   | Clicks through XD wait pages for you, so you don't have to.                                                                                                                 |

[hubfamily-redesign]: https://github.com/luminalreason/userpatch/raw/main/scripts/hubfamily-redesign.user.js
[hub-helper]: https://github.com/luminalreason/userpatch/raw/main/scripts/hub-helper.user.js
[xd-helper]: https://github.com/luminalreason/userpatch/raw/main/scripts/xd-helper.user.js

## Installation

Any userscript manager can run these scripts.

> [!TIP]
> Use [Violentmonkey](https://violentmonkey.github.io/). It is fully open source.

Install HubFamily to cover every supported site. To use only some sites, [install the standalone redesigns](docs/standalone-redesigns.md) instead. Don't enable both, because they change the same pages.

To install a script, click its name in the table above. Violentmonkey then asks you to confirm the install.

> [!CAUTION]
> Tampermonkey is closed source, so no one can independently review its code. Its home page also shows ads.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for developer setup and the checks to run before you push.
