export const HBLINKS_CSS = `
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
  font-weight: 400 !important;
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
  font-family: inherit !important;
  font-weight: 400 !important;
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
