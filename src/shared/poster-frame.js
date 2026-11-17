// Paint the highlight above artwork; an inset shadow on its parent is covered
// by the image itself.
export const POSTER_FRAME_CSS = `
html.userpatch-maia :is(.movie-card-image, .content-sidebar .poster-image,
  .userpatch-poster-frame, main#main-content.userpatch-listing-ready li.thumb figure > a) {
  position: relative;
}

html.userpatch-maia :is(.movie-card-image, .content-sidebar .poster-image,
  .userpatch-poster-frame, main#main-content.userpatch-listing-ready li.thumb figure > a)::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 1;
  border-radius: inherit;
  box-shadow: var(--maia-poster-gloss);
  pointer-events: none;
}
`
