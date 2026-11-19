// Interface:
// Exports: makeSvgDataUri, HUBCLOUD_LOGO_DATA_URI, HUBDRIVE_LOGO_DATA_URI
// Options: makeSvgDataUri takes trusted SVG source for dependency-free marks.
// Invariants: marks are encoded inline; importing performs no DOM or network work.
// Error modes: encoding errors propagate for malformed SVG input strings.

export const makeSvgDataUri = (svg) =>
  `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`

const HUBCLOUD_LOGO_SVG = String.raw`<svg xmlns="http://www.w3.org/2000/svg" viewBox="-0.043 0.659 177.311 122.029" width="177" height="123">
  <defs>
    <linearGradient id="grad-left" gradientUnits="userSpaceOnUse" x1="31.00" y1="47.00" x2="11.00" y2="117.00">
      <stop offset="0" stop-color="#00aaef"/>
      <stop offset="1" stop-color="#0084e9"/>
    </linearGradient>
    <linearGradient id="grad-cyan" gradientUnits="userSpaceOnUse" x1="82.00" y1="-6.00" x2="59.60" y2="101.00">
      <stop offset="0" stop-color="#00f1f2"/>
      <stop offset="1" stop-color="#00a5ec"/>
    </linearGradient>
    <linearGradient id="grad-mid" gradientUnits="userSpaceOnUse" x1="138.00" y1="0.00" x2="65.30" y2="103.00">
      <stop offset="0" stop-color="#00d5f2"/>
      <stop offset="1" stop-color="#0064e3"/>
    </linearGradient>
    <linearGradient id="grad-white" gradientUnits="userSpaceOnUse" x1="123.00" y1="51.00" x2="123.00" y2="121.00" gradientTransform="matrix(1, 0, 0, 1.001083, 0, -0.055333)">
      <stop offset="0" stop-color="#fcfafb"/>
      <stop offset="1" stop-color="#f7f7f7"/>
    </linearGradient>
    <path id="left-blue-path" d="M 39.20 44.60 A 38.99 38.99 0 0 0 33.22 122.10 L 71.00 122.10 L 71.00 44.60 Z"/>
    <path id="cyan-dome-path" d="M 128.40 27.85 C 118.50 11.20, 100.50 0.93, 82.50 1.05 C 53.60 0.02, 28.14 26.14, 27.57 54.50 C 26.56 70.83, 36.41 86.79, 51.31 93.50 C 58.00 96.40, 66.00 98.00, 78.00 98.60 L 113.00 69.00 Z"/>
    <path id="mid-blue-path" d="M 131.80 27.73 L 128.40 27.85 C 99.62 27.66, 73.17 48.02, 63.30 74.50 C 57.02 89.28, 56.34 107.24, 64.40 122.10 L 145.00 122.10 L 169.17 98.00 A 45.07 45.07 0 0 0 131.80 27.73 Z"/>
    <path id="white-cloud-path" d="M 96.00 122.05 C 83.84 120.65, 73.97 109.64, 73.33 96.30 A 24.98 24.98 0 0 1 96.06 71.41 A 28.49 28.49 0 0 1 150.56 71.19 A 25.30 25.30 0 0 1 168.43 102.55 A 28.55 28.55 0 0 1 143.00 122.05 Z"/>
    <clipPath id="blue-silhouette">
      <path d="M 39.20 44.60 A 38.99 38.99 0 0 0 33.22 122.10 L 71.00 122.10 L 71.00 44.60 Z"/>
      <path d="M 128.40 27.85 C 118.50 11.20, 100.50 0.93, 82.50 1.05 C 53.60 0.02, 28.14 26.14, 27.57 54.50 C 26.56 70.83, 36.41 86.79, 51.31 93.50 C 58.00 96.40, 66.00 98.00, 78.00 98.60 L 113.00 69.00 Z"/>
      <path d="M 131.80 27.73 L 128.40 27.85 C 99.62 27.66, 73.17 48.02, 63.30 74.50 C 57.02 89.28, 56.34 107.24, 64.40 122.10 L 145.00 122.10 L 169.17 98.00 A 45.07 45.07 0 0 0 131.80 27.73 Z"/>
    </clipPath>
    <filter id="white-shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="1.1" result="blur"/>
      <feOffset in="blur" dx="-0.6" dy="-0.2" result="offsetBlur"/>
      <feFlood flood-color="#001950" flood-opacity="0.42" result="shadowColor"/>
      <feComposite in="shadowColor" in2="offsetBlur" operator="in"/>
    </filter>
  </defs>
  <path d="M 39.20 44.60 A 38.99 38.99 0 0 0 33.22 122.10 L 71.00 122.10 L 71.00 44.60 Z" fill="url(#grad-left)"/>
  <path d="M 128.40 27.85 C 118.50 11.20, 100.50 0.93, 82.50 1.05 C 53.60 0.02, 28.14 26.14, 27.57 54.50 C 26.56 70.83, 36.41 86.79, 51.31 93.50 C 58.00 96.40, 66.00 98.00, 78.00 98.60 L 113.00 69.00 Z" fill="url(#grad-cyan)"/>
  <path d="M 131.80 27.73 L 128.40 27.85 C 99.62 27.66, 73.17 48.02, 63.30 74.50 C 57.02 89.28, 56.34 107.24, 64.40 122.10 L 145.00 122.10 L 169.17 98.00 A 45.07 45.07 0 0 0 131.80 27.73 Z" fill="url(#grad-mid)"/>
  <path d="M 58.52 95.50 C 64.00 97.40, 70.00 98.20, 79.00 98.80 L 90.00 122.10 L 64.40 122.10 C 59.92 113.83, 58.14 104.61, 58.52 95.50 Z" fill="#005fd8"/>
  <g clip-path="url(#blue-silhouette)">
    <path d="M 96.00 122.05 C 83.84 120.65, 73.97 109.64, 73.33 96.30 A 24.98 24.98 0 0 1 96.06 71.41 A 28.49 28.49 0 0 1 150.56 71.19 A 25.30 25.30 0 0 1 168.43 102.55 A 28.55 28.55 0 0 1 143.00 122.05 Z" fill="#000000" filter="url(#white-shadow)"/>
  </g>
  <path d="M 96 122.127 C 83.84 120.725 73.97 109.703 73.33 96.349 C 73.324 83.406 83.184 72.598 96.06 71.432 C 102.375 50.406 129.058 44.108 144.089 60.096 C 147.064 63.259 149.277 67.061 150.56 71.212 C 164.237 74.834 172.289 88.98 168.43 102.606 C 164.745 113.711 156.691 121.445 145.022 122.127 L 96 122.127 Z" fill="url(#grad-white)" style=""/>
</svg>`

export const HUBCLOUD_LOGO_DATA_URI = makeSvgDataUri(HUBCLOUD_LOGO_SVG)

const HUBDRIVE_LOGO_SVG = String.raw`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 249 249" width="249" height="249">
  <defs>
    <linearGradient id="bg-blue" gradientUnits="userSpaceOnUse" x1="35.36" y1="35.07" x2="165.36" y2="165.07">
      <stop offset="0" stop-color="#5492f0"/>
      <stop offset="1" stop-color="#468aef"/>
    </linearGradient>
    <linearGradient id="long-shadow" gradientUnits="userSpaceOnUse" x1="116.86" y1="162.07" x2="156.86" y2="231.37">
      <stop offset="0" stop-color="#001450" stop-opacity="0.068"/>
      <stop offset="1" stop-color="#001450" stop-opacity="0"/>
    </linearGradient>
    <clipPath id="circle-clip">
      <circle cx="124.50" cy="124.50" r="123.88"/>
    </clipPath>
  </defs>
  <circle cx="124.50" cy="124.50" r="123.88" fill="url(#bg-blue)"/>
  <g clip-path="url(#circle-clip)">
    <path d="M 310.50 227.06 L 160.50 77.06 A 50.95 50.95 0 0 1 175.12 107.56 A 33.99 33.99 0 1 1 175.18 175.54 L 79.38 175.54 A 39.62 39.62 0 0 1 51.36 163.94 L 201.36 313.94 Z" fill="url(#long-shadow)"/>
  </g>
  <path d="M 175.18 175.54 L 79.38 175.54 A 39.62 39.62 0 0 1 76.32 96.42 A 50.95 50.95 0 0 1 175.12 107.56 A 33.99 33.99 0 1 1 175.18 175.54 Z M 108.39 97.26 H 141.59 V 125.44 H 158.42 L 125.09 158.69 L 91.83 125.44 H 108.39 Z" fill="#ffffff" fill-rule="evenodd"/>
</svg>`

export const HUBDRIVE_LOGO_DATA_URI = makeSvgDataUri(HUBDRIVE_LOGO_SVG)

const HUBCDN_LOGO_SVG = String.raw`<svg width="216" height="260" viewBox="0 0 216 260" xmlns="http://www.w3.org/2000/svg"><title>undraw_handcrafts_heart</title><g fill="none"><path d="M94.612 259.442c-52.87-27.61-89.83-83.546-94.497-143.008-2.677-34.116 42-57.722 73.18-43.618s45.416 52.377 42.057 86.433c-3.36 34.055-20.522 64.984-20.74 100.193" fill="#b9fff4"/><path d="m180.8 59.136-.002-.002.022.057.002.002z" fill="#000"/><path d="M210.18 49.32c-9.959-27.16-41.17-31.961-64.158-17.966a102 102 0 0 0-10.83 7.159C126.986 22.216 114.311 6.342 96.626.665c-18.734-3.47-38.053 7.13-50.715 20.369C34.808 33.217 29.554 49.242 23.814 64.39c-7.425 19.42-5.637 40.524-.681 60.308 5.518 24.51 19.25 46.018 34.14 65.883 17.341 23.568 36.811 45.456 55.79 67.695-16.404-27.606-34.051-54.514-48.789-83.074-9.574-18.305-15.647-32.086-19.093-55.445a155 155 0 0 1-1.548-21.374c.179-8.247.613-8.191.746-9.59 2.97-15.129 15.054-38.773 20.212-45.34a39 39 0 0 1 4.92-4.745 27 27 0 0 1 3.381-2.086c4.253-2.02 2.698-2 12.054-4.589h.004c.699-.03 1.345-.032 1.868-.023.23.134.461.265.686.407 8.802 8.28 6.196 6.106 10.328 11.3l1.05 1.484a87.4 87.4 0 0 1 6.546 11.272c1.768 2.63 7.162 26.82 29.194 21.615a28.8 28.8 0 0 0 10.114-5.904 574 574 0 0 0 7.158-5.542c2.509-1.853 7.729-5.67 9.68-6.699a48 48 0 0 1 5.05-2.73 40 40 0 0 1 6.261-1.897c.41-.025.818-.085 1.228-.079.167.002.332.031.498.037.793.196 1.903.478 3.011.821.21.12.422.236.627.365a34 34 0 0 1 1.71 1.71q.766 1.148 1.387 2.381c1.5 4.087 2.738 8.265 3.704 12.51 3.598 14.583 2.86 25.085.322 37.42-10.04 46.747-36.895 82.132-64.628 125.968a621 621 0 0 1-9.546 13.878c10.995-10.373 21.466-21.286 31.577-32.52 21.612-23.877 43.757-47.96 57.517-77.437 7.013-14.537 13.001-29.855 14.723-46.011a112.4 112.4 0 0 0-4.835-45.038" fill="#6366f1"/></g></svg>`

export const HUBCDN_LOGO_DATA_URI = makeSvgDataUri(HUBCDN_LOGO_SVG)

export const GDFLIX_LOGO_DATA_URI = makeSvgDataUri(
  String.raw`<svg xmlns="http://www.w3.org/2000/svg" viewBox="14 13.5 100 100"><defs><clipPath id="a"><rect x="14" y="13.5" width="100" height="100" rx="22" ry="22"/></clipPath></defs><g clip-path="url(#a)"><path fill="#377ef0" d="M14 13.5h100v100H14z"/><path fill="#52b529" d="M14 13.5v100l12-3.5 19-32 19-32-17-32.5z"/><path fill="#f8c63d" d="M47 13.5h67V78H83L64 46z"/><path fill="#439422" d="M47 13.5 64 46h-7z"/><path fill="#2d67c5" d="m26 110 19-32h8z"/><path fill="#d5a425" d="M114 78H83v-6z"/><path fill="#fff" d="m64 46 19 32H45z"/></g></svg>`
)

export const GOFILE_LOGO_DATA_URI = makeSvgDataUri(
  String.raw`<svg xmlns="http://www.w3.org/2000/svg" viewBox="1 55 294.5 189"><g fill="#e7af1e"><path d="M139 118h9v36h-12v-19.5l3-12z"/><path d="m40 128 99-5.5-3 12z"/></g><path fill="#e6e7e8" d="m74 62 83-5.5-2 11.5zm49 21 30-4-1 8zm35-28h98c0 13-2.5 27-5.5 35.5 14.5.5 27.5 2 37.5 3.5l-2 56H145z"/><path d="m256 55 32 39c-10-1.5-23-3-37.5-3.5C253.5 82 256 68 256 55" fill="#bdbfc1"/><g fill="#e7af1e"><path d="m77 167 38-4 1 8zM1 203l117-4 2 8z"/><path d="M114.5 154H168l20-17h107.5l-28 107h-144z"/></g></svg>`
)
