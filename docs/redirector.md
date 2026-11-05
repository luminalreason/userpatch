# Redirecting old HubCloud/HubDrive links

`hub-helper` already rewrites HubCloud/HubDrive links on pages and follows gate payloads. It can move you off an old domain only if that domain still loads a page. When DNS or TLS fails, no page exists, so use a browser-level redirector instead. It catches the navigation before DNS/TLS, which covers bookmarks, pasted URLs, and links opened from other apps. Redirector is a separate extension, not part of the userscript.

## Install

- Chrome, Edge, Brave: [Redirector](https://chromewebstore.google.com/detail/redirector/jegbdohdgebjljoljfeinojeobdabpjo)
- Firefox:
  [Redirector](https://addons.mozilla.org/firefox/addon/redirector/).

## Manual setup

Open Redirector's options page and click **Create new redirect**.

### HubCloud

- Description: `HubCloud hubcloud.bz -> hubcloud.ist`
- Example URL: `https://hubcloud.bz/drive/example`
- Include pattern: `^https?://(?:www\.)?hubcloud\.bz([/?#].*)?$`
- Redirect to: `https://hubcloud.ist$1`
- Pattern type: **Regular Expression**

Click **Save**.

### HubDrive

- Description: `HubDrive hubdrive.bz -> hubdrive.bar`
- Example URL: `https://hubdrive.bz/file/example`
- Include pattern: `^https?://(?:www\.)?hubdrive\.bz([/?#].*)?$`
- Redirect to: `https://hubdrive.bar$1`
- Pattern type: **Regular Expression**

Click **Save**.

The patterns name the exact dead hosts, not the whole family. A newly rotated domain is therefore never redirected to an older one, even if these rules are out of date.

## Import (optional)

Save this as `redirector-rules.json`, then use **Import** on the Redirector options page.

```json
{
  "redirects": [
    {
      "description": "HubCloud hubcloud.bz -> hubcloud.ist",
      "exampleUrl": "https://hubcloud.bz/drive/example",
      "includePattern": "^https?://(?:www\\.)?hubcloud\\.bz([/?#].*)?$",
      "redirectUrl": "https://hubcloud.ist$1",
      "patternType": "R",
      "processMatches": "noProcessing",
      "appliesTo": ["main_frame"]
    },
    {
      "description": "HubDrive hubdrive.bz -> hubdrive.bar",
      "exampleUrl": "https://hubdrive.bz/file/example",
      "includePattern": "^https?://(?:www\\.)?hubdrive\\.bz([/?#].*)?$",
      "redirectUrl": "https://hubdrive.bar$1",
      "patternType": "R",
      "processMatches": "noProcessing",
      "appliesTo": ["main_frame"]
    }
  ]
}
```

## Test

- `https://hubcloud.bz/drive/example` → `https://hubcloud.ist/drive/example`
- `https://hubdrive.bz/file/example` → `https://hubdrive.bar/file/example`
- `https://hubcloud.ist/` and `https://hubdrive.bar/` should not redirect.
- `https://hubcloud.example.com/` should not redirect.

`$1` keeps the path, query, and hash.

## When a domain rotates

1. In `OUTDATED_HOSTS` in [`../scripts/hub-helper.user.js`](../scripts/hub-helper.user.js), add the previous host as a key pointing to the new host, and repoint every existing entry to the new host.
2. In Redirector, add the previous host to an include pattern (or create another rule) and point every HubCloud/HubDrive rule at the new host.

If you update nothing, the rules simply stop matching the new domain. They never send it back to an older host.

## Notes

- Only standard ports. `https://hubcloud.bz:8443/...` is not matched.
