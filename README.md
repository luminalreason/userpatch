# userpatch

A collection of browser userscripts by **luminalreason** that make link-shortener gates less tedious and media sites easier to use.

## Scripts

| Script               | Version | Description                                                                                                                                                                                               |
| -------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [hubfamily-redesign] | 0.2.0   | A complete, responsive UI and UX redesign for 4K-HDHub, HDHub4u, HUBLinks, HubCloud, and their download pages, with consistent layouts, clearer movie and series details, and easier download navigation. |
| [hub-helper]         | 0.3.3   | Skips gate pages, updates old HubCloud/HubDrive share links, and returns reloaded download tabs to their share page.                                                                                      |
| [xd-helper]          | 0.1.0   | Clicks through XD gate pages for you — no waiting, no extra clicks.                                                                                                                                       |

### Standalone redesigns

These are the individual parts of HubFamily for people who only want selected sites. Install either HubFamily or the standalone redesigns you need; keep overlapping redesigns disabled.

HubFamily Redesign brings the sites into one consistent dark interface, from browsing movies and series to choosing a download server. It combines responsive poster and release layouts, structured Info sections, embedded trailers, click-to-expand screenshots, quality filters, saved series selections, progressive image loading, and loading feedback. Download pages use matching server buttons, copy and share controls, and an info dialog explaining mirror differences. It covers HUBLinks, HubCDN, and HubCloud's rotating link-generator pages as well as the main sites.

| Script              | Version | Description                                                                                                                                                                      |
| ------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [4khdhub-redesign]  | 0.3.0   | Redesigns 4K-HDHub with responsive movie and series layouts, structured Info with embedded trailers, saved season and quality filters, site search, and clearer release details. |
| [hdhub4u-redesign]  | 0.2.0   | Redesigns HDHub4u and HUBLinks with responsive poster and download layouts, Info and screenshot views, embedded trailers, quality filters, and consistent provider links.        |
| [hubcloud-redesign] | 0.2.2   | Redesigns HubCloud, HubCDN, and related link-generator pages with consistent server buttons, copy and share controls, loading feedback, and a server guide.                      |

HubFamily and HDHub4u/HUBLinks were first published at **0.1.0**. Their earlier local version bumps were development iterations, not published releases.

[hubfamily-redesign]: https://github.com/luminalreason/userpatch/raw/main/scripts/hubfamily-redesign.user.js
[hub-helper]: https://github.com/luminalreason/userpatch/raw/main/scripts/hub-helper.user.js
[xd-helper]: https://github.com/luminalreason/userpatch/raw/main/scripts/xd-helper.user.js
[hubcloud-redesign]: https://github.com/luminalreason/userpatch/raw/main/scripts/hubcloud-redesign.user.js
[4khdhub-redesign]: https://github.com/luminalreason/userpatch/raw/main/scripts/4khdhub-redesign.user.js
[hdhub4u-redesign]: https://github.com/luminalreason/userpatch/raw/main/scripts/hdhub4u-redesign.user.js

## Installation

These scripts use standard userscript APIs, so any userscript manager can run them.

> [!TIP]
> Use [Violentmonkey](https://violentmonkey.github.io/). It is fully open source.

Choose HubFamily Redesign for all sites, or install the separate redesigns you need. Keep only one option enabled to avoid running the same redesign twice.

To install a script, click its name in either table above. Violentmonkey will prompt you to install it.

> [!CAUTION]
> Tampermonkey is closed source, so its implementation cannot be independently reviewed. Its home page also displays ads.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).
