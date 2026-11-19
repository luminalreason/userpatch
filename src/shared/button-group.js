// Primary buttons use Kumo's theme-aware brand blue. Provider mirrors
// override the base color, while every surface uses the same edge and gradient.
export const KUMO_PRIMARY_BUTTON_TOKENS = `
  --userpatch-btn-bg: light-dark(
    oklch(0.5772 0.2324 260),
    color-mix(in oklch, oklch(0.5772 0.2324 260), black 10%)
  );
  --userpatch-btn-color: #fff;
`

export const KUMO_MUTED_BUTTON_TOKENS = `
  --userpatch-btn-bg: color-mix(in oklch, var(--maia-muted, var(--secondary)), var(--maia-foreground, var(--foreground)) 10%);
  --userpatch-btn-color: var(--maia-foreground, var(--foreground));
`

export const KUMO_BUTTON_PAINT = `
  --userpatch-button-base: var(--userpatch-btn-bg, light-dark(#fff, #27272a));
  --userpatch-button-highlight: light-dark(rgb(255 255 255 / 75%), rgb(255 255 255 / 50%));
  --userpatch-button-tint: 15%;
  border: 1px solid color-mix(in oklch, var(--userpatch-button-base), black 10%) !important;
  border-radius: 0.625rem !important;
  background: linear-gradient(
    to bottom,
    color-mix(in oklch, var(--userpatch-button-base), white var(--userpatch-button-tint)),
    var(--userpatch-button-base)
  ) !important;
  color: var(--userpatch-btn-color, light-dark(#18181b, #f4f4f5)) !important;
  box-shadow: inset 0 1px var(--userpatch-button-highlight),
    0 1px 2px light-dark(rgb(0 0 0 / 9%), rgb(0 0 0 / 24%)) !important;
`

export const BUTTON_GROUP_CSS = `
.userpatch-btn-group > :is(button, a) + :is(button, a) {
  border-inline-start: 1px solid color-mix(in oklch, currentColor 22%, transparent) !important;
}
`
