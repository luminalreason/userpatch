export const makeSvgDataUri = (svg) =>
  `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`

// Brand artwork for the dark interface: the header wordmark and the
// favicon replacement, rendered as self-contained inline SVG.
export const HEADER_WORDMARK_SVG = String.raw`<svg xmlns="http://www.w3.org/2000/svg" viewBox="10.435 7.939 224.971 68.462" width="260" height="82">
  <defs>
    <filter id="outer-shadow" filterUnits="userSpaceOnUse" x="-10" y="-10" width="280" height="102">
      <feMorphology in="SourceAlpha" operator="dilate" radius="1.35" result="haloMask"/>
      <feGaussianBlur in="SourceAlpha" stdDeviation="2.9" result="blur"/>
      <feOffset in="blur" dx="0" dy="1.3" result="offsetBlur"/>
      <feFlood flood-color="#000000" flood-opacity="0.28" result="shadowColor"/>
      <feComposite in="shadowColor" in2="offsetBlur" operator="in" result="softShadow"/>
      <feComposite in="softShadow" in2="haloMask" operator="out" result="maskedShadow"/>
      <feMerge>
        <feMergeNode in="maskedShadow"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    <filter id="bevel-red" filterUnits="userSpaceOnUse" x="-5" y="-5" width="270" height="92">
      <feOffset in="SourceAlpha" dx="-1.1" dy="1.1" result="offHL"/>
      <feComposite in="SourceAlpha" in2="offHL" operator="out" result="edgeHL"/>
      <feGaussianBlur in="edgeHL" stdDeviation="0.3" result="blurHL"/>
      <feComposite in="blurHL" in2="SourceAlpha" operator="in" result="clipHL"/>
      <feFlood flood-color="#ff857a" flood-opacity="0.9" result="colHL"/>
      <feComposite in="colHL" in2="clipHL" operator="in" result="highlight"/>
      <feOffset in="SourceAlpha" dx="1.1" dy="-1.1" result="offSH"/>
      <feComposite in="SourceAlpha" in2="offSH" operator="out" result="edgeSH"/>
      <feGaussianBlur in="edgeSH" stdDeviation="0.3" result="blurSH"/>
      <feComposite in="blurSH" in2="SourceAlpha" operator="in" result="clipSH"/>
      <feFlood flood-color="#7a0000" flood-opacity="0.72" result="colSH"/>
      <feComposite in="colSH" in2="clipSH" operator="in" result="bevelShadow"/>
      <feOffset in="SourceAlpha" dx="-0.65" dy="0.65" result="offRim"/>
      <feFlood flood-color="#261212" flood-opacity="0.58" result="colRim"/>
      <feComposite in="colRim" in2="offRim" operator="in" result="darkRim"/>
      <feMerge>
        <feMergeNode in="darkRim"/>
        <feMergeNode in="SourceGraphic"/>
        <feMergeNode in="bevelShadow"/>
        <feMergeNode in="highlight"/>
      </feMerge>
    </filter>
    <filter id="bevel-white" filterUnits="userSpaceOnUse" x="-5" y="-5" width="270" height="92">
      <feOffset in="SourceAlpha" dx="-1.1" dy="1.1" result="offHL"/>
      <feComposite in="SourceAlpha" in2="offHL" operator="out" result="edgeHL"/>
      <feGaussianBlur in="edgeHL" stdDeviation="0.3" result="blurHL"/>
      <feComposite in="blurHL" in2="SourceAlpha" operator="in" result="clipHL"/>
      <feFlood flood-color="#ffffff" flood-opacity="0.98" result="colHL"/>
      <feComposite in="colHL" in2="clipHL" operator="in" result="highlight"/>
      <feOffset in="SourceAlpha" dx="1.1" dy="-1.1" result="offSH"/>
      <feComposite in="SourceAlpha" in2="offSH" operator="out" result="edgeSH"/>
      <feGaussianBlur in="edgeSH" stdDeviation="0.3" result="blurSH"/>
      <feComposite in="blurSH" in2="SourceAlpha" operator="in" result="clipSH"/>
      <feFlood flood-color="#969696" flood-opacity="0.72" result="colSH"/>
      <feComposite in="colSH" in2="clipSH" operator="in" result="bevelShadow"/>
      <feOffset in="SourceAlpha" dx="-0.65" dy="0.65" result="offRim"/>
      <feFlood flood-color="#2b2525" flood-opacity="0.55" result="colRim"/>
      <feComposite in="colRim" in2="offRim" operator="in" result="darkRim"/>
      <feMerge>
        <feMergeNode in="darkRim"/>
        <feMergeNode in="SourceGraphic"/>
        <feMergeNode in="bevelShadow"/>
        <feMergeNode in="highlight"/>
      </feMerge>
    </filter>
    <filter id="bevel-orange" filterUnits="userSpaceOnUse" x="-5" y="-5" width="270" height="92">
      <feOffset in="SourceAlpha" dx="-0.95" dy="0.95" result="offHL"/>
      <feComposite in="SourceAlpha" in2="offHL" operator="out" result="edgeHL"/>
      <feGaussianBlur in="edgeHL" stdDeviation="0.22" result="blurHL"/>
      <feComposite in="blurHL" in2="SourceAlpha" operator="in" result="clipHL"/>
      <feFlood flood-color="#ffd200" flood-opacity="0.95" result="colHL"/>
      <feComposite in="colHL" in2="clipHL" operator="in" result="highlight"/>
      <feOffset in="SourceAlpha" dx="0.95" dy="-0.95" result="offSH"/>
      <feComposite in="SourceAlpha" in2="offSH" operator="out" result="edgeSH"/>
      <feGaussianBlur in="edgeSH" stdDeviation="0.22" result="blurSH"/>
      <feComposite in="blurSH" in2="SourceAlpha" operator="in" result="clipSH"/>
      <feFlood flood-color="#9e2a00" flood-opacity="0.78" result="colSH"/>
      <feComposite in="colSH" in2="clipSH" operator="in" result="bevelShadow"/>
      <feMerge>
        <feMergeNode in="SourceGraphic"/>
        <feMergeNode in="bevelShadow"/>
        <feMergeNode in="highlight"/>
      </feMerge>
    </filter>
  </defs>
  <g filter="url(#outer-shadow)">
    <path filter="url(#bevel-orange)" fill="#ff7800" d="M 12.0 11.1 C 12.0 10.1 12.7 9.5 13.6 9.5 H 50.8 C 51.8 9.5 52.4 10.1 52.4 11.05 C 52.4 12.0 51.8 12.6 50.8 12.6 H 15.1 V 36.8 C 15.1 37.8 14.5 38.4 13.55 38.4 C 12.6 38.4 12.0 37.8 12.0 36.8 Z"/>
    <g filter="url(#bevel-red)" fill="#d7201e" fill-rule="evenodd">
      <path d="M 24.4 20.8 H 33.4 V 33.8 H 45.0 V 24.3 L 41.5 20.8 H 50.8 V 65.4 L 45.0 67.4 V 39.8 H 33.4 V 65.4 L 27.8 67.4 V 24.3 Z"/>
      <path d="M 52.0 20.8 H 69.5 C 76.2 20.8 83.6 29.0 83.6 42.5 C 83.6 52.5 80.2 57.2 74.0 60.2 L 55.3 67.4 V 24.3 Z M 61.0 26.2 V 58.2 C 70.2 55.4 78.2 51.5 78.2 42.0 C 78.2 31.8 73.6 26.2 67.2 26.2 Z"/>
      <path d="M 188.9 20.8 H 190.2 V 53.6 H 192.8 Q 193.9 53.2 194.6 50.9 H 195.4 V 58.6 C 195.2 59.8 194.9 61.2 194.9 62.4 C 194.9 63.5 193.6 63.5 193.6 62.4 C 193.6 61.2 193.3 59.6 192.6 58.8 H 190.0 V 64.2 C 190.9 65.8 192.2 66.8 193.6 67.6 H 180.2 C 181.8 66.8 183.2 65.7 184.0 64.2 V 58.8 H 182.3 C 181.6 59.6 181.5 61.2 181.5 62.4 C 181.5 63.5 180.3 63.5 180.3 62.4 C 180.3 61.2 180.1 59.6 179.4 58.8 H 178.3 C 177.9 60.9 176.3 60.9 175.9 58.8 H 175.0 C 174.4 59.6 174.3 62.2 174.3 64.4 C 174.3 65.6 173.1 65.6 173.1 64.4 C 173.1 62.2 173.0 59.6 172.4 58.8 H 171.9 C 171.5 61.0 170.1 61.0 169.7 58.8 H 168.3 Z M 184.0 40.4 L 182.3 43.6 V 50.7 C 182.3 51.8 181.1 51.8 181.1 50.7 V 45.8 L 177.2 53.6 H 184.0 Z"/>
      <path d="M 198.2 29.2 H 206.8 V 48.6 L 217.8 44.8 V 29.2 H 224.2 V 54.3 L 217.8 56.6 V 51.4 L 201.2 56.6 V 33.0 Z"/>
    </g>
    <g filter="url(#bevel-white)" fill="#e0e0e0" fill-rule="evenodd">
      <path d="M 82.6 20.8 H 91.6 V 33.8 H 103.2 V 24.3 L 99.7 20.8 H 109.0 V 65.4 L 103.2 67.4 V 39.8 H 91.6 V 65.4 L 86.0 67.4 V 24.3 Z"/>
      <path d="M 110.2 29.2 H 118.8 V 48.6 L 129.8 44.8 V 29.2 H 136.2 V 54.3 L 129.8 56.6 V 51.4 L 113.2 56.6 V 33.0 Z"/>
      <path d="M 136.8 20.6 H 156.0 C 161.2 20.6 163.0 24.4 163.0 29.2 C 163.0 32.5 161.6 34.0 160.4 34.8 C 163.8 36.2 166.3 40.2 166.3 46.5 C 166.3 54.0 163.4 57.8 157.8 60.4 L 140.2 67.4 V 24.3 Z M 147.2 26.2 V 33.8 H 152.8 C 155.8 33.8 157.5 32.0 157.5 29.6 C 157.5 27.2 155.8 26.2 152.8 26.2 Z M 147.2 39.8 V 58.2 C 154.2 55.4 161.6 52.2 161.6 46.2 C 161.6 41.4 158.6 39.8 153.8 39.8 Z"/>
    </g>
    <path filter="url(#bevel-orange)" fill="#ff7800" d="M 232.2 47.2 C 233.15 47.2 233.75 47.8 233.75 48.75 V 73.2 C 233.75 74.2 233.1 74.8 232.15 74.8 H 198.6 C 197.6 74.8 197.0 74.2 197.0 73.25 C 197.0 72.3 197.6 71.7 198.6 71.7 H 230.65 V 48.75 C 230.65 47.8 231.25 47.2 232.2 47.2 Z"/>
  </g>
</svg>`
export const SITE_ICON_SVG = String.raw`<svg xmlns="http://www.w3.org/2000/svg" viewBox="3.442 15.457 185.245 159.194" width="192" height="192">
  <defs>
    <filter id="outer-shadow" filterUnits="userSpaceOnUse" x="-16" y="-16" width="224" height="224">
      <feMorphology in="SourceAlpha" operator="dilate" radius="2.0" result="haloMask"/>
      <feGaussianBlur in="SourceAlpha" stdDeviation="4.8" result="blur"/>
      <feOffset in="blur" dx="0" dy="2.2" result="offsetBlur"/>
      <feFlood flood-color="#000000" flood-opacity="0.28" result="shadowColor"/>
      <feComposite in="shadowColor" in2="offsetBlur" operator="in" result="softShadow"/>
      <feComposite in="softShadow" in2="haloMask" operator="out" result="maskedShadow"/>
      <feMerge>
        <feMergeNode in="maskedShadow"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    <filter id="bevel-red" filterUnits="userSpaceOnUse" x="-10" y="-10" width="212" height="212">
      <feOffset in="SourceAlpha" dx="-2.4" dy="2.4" result="offHL"/>
      <feComposite in="SourceAlpha" in2="offHL" operator="out" result="edgeHL"/>
      <feGaussianBlur in="edgeHL" stdDeviation="0.65" result="blurHL"/>
      <feComposite in="blurHL" in2="SourceAlpha" operator="in" result="clipHL"/>
      <feFlood flood-color="#ff857a" flood-opacity="0.9" result="colHL"/>
      <feComposite in="colHL" in2="clipHL" operator="in" result="highlight"/>
      <feOffset in="SourceAlpha" dx="2.4" dy="-2.4" result="offSH"/>
      <feComposite in="SourceAlpha" in2="offSH" operator="out" result="edgeSH"/>
      <feGaussianBlur in="edgeSH" stdDeviation="0.65" result="blurSH"/>
      <feComposite in="blurSH" in2="SourceAlpha" operator="in" result="clipSH"/>
      <feFlood flood-color="#7a0000" flood-opacity="0.72" result="colSH"/>
      <feComposite in="colSH" in2="clipSH" operator="in" result="bevelShadow"/>
      <feOffset in="SourceAlpha" dx="-1.3" dy="1.3" result="offRim"/>
      <feFlood flood-color="#261212" flood-opacity="0.58" result="colRim"/>
      <feComposite in="colRim" in2="offRim" operator="in" result="darkRim"/>
      <feMerge>
        <feMergeNode in="darkRim"/>
        <feMergeNode in="SourceGraphic"/>
        <feMergeNode in="bevelShadow"/>
        <feMergeNode in="highlight"/>
      </feMerge>
    </filter>
    <filter id="bevel-orange" filterUnits="userSpaceOnUse" x="-10" y="-10" width="212" height="212">
      <feOffset in="SourceAlpha" dx="-2.0" dy="2.0" result="offHL"/>
      <feComposite in="SourceAlpha" in2="offHL" operator="out" result="edgeHL"/>
      <feGaussianBlur in="edgeHL" stdDeviation="0.45" result="blurHL"/>
      <feComposite in="blurHL" in2="SourceAlpha" operator="in" result="clipHL"/>
      <feFlood flood-color="#ffd200" flood-opacity="0.95" result="colHL"/>
      <feComposite in="colHL" in2="clipHL" operator="in" result="highlight"/>
      <feOffset in="SourceAlpha" dx="2.0" dy="-2.0" result="offSH"/>
      <feComposite in="SourceAlpha" in2="offSH" operator="out" result="edgeSH"/>
      <feGaussianBlur in="edgeSH" stdDeviation="0.45" result="blurSH"/>
      <feComposite in="blurSH" in2="SourceAlpha" operator="in" result="clipSH"/>
      <feFlood flood-color="#9e2a00" flood-opacity="0.78" result="colSH"/>
      <feComposite in="colSH" in2="clipSH" operator="in" result="bevelShadow"/>
      <feMerge>
        <feMergeNode in="SourceGraphic"/>
        <feMergeNode in="bevelShadow"/>
        <feMergeNode in="highlight"/>
      </feMerge>
    </filter>
  </defs>
  <g filter="url(#outer-shadow)">
    <path filter="url(#bevel-orange)" fill="#ff7800" d="M 6.0 21.4 C 6.0 19.3 7.4 18.0 9.4 18.0 H 78.6 C 80.7 18.0 82.0 19.3 82.0 21.3 C 82.0 23.3 80.7 24.6 78.6 24.6 H 12.6 V 86.6 C 12.6 88.7 11.3 90.0 9.3 90.0 C 7.3 90.0 6.0 88.7 6.0 86.6 Z"/>
    <g filter="url(#bevel-red)" fill="#d7201e" fill-rule="evenodd">
      <path transform="translate(-31.5, -10.0) scale(2.25, 2.4)" d="M 24.4 20.8 H 33.4 V 33.8 H 45.0 V 24.3 L 41.5 20.8 H 50.8 V 65.4 L 45.0 67.4 V 39.8 H 33.4 V 65.4 L 27.8 67.4 V 24.3 Z"/>
      <path transform="translate(-21.0, -10.0) scale(2.25, 2.4)" d="M 52.0 20.8 H 69.5 C 76.2 20.8 83.6 29.0 83.6 42.5 C 83.6 52.5 80.2 57.2 74.0 60.2 L 55.3 67.4 V 24.3 Z M 61.0 26.2 V 58.2 C 70.2 55.4 78.2 51.5 78.2 42.0 C 78.2 31.8 73.6 26.2 67.2 26.2 Z"/>
    </g>
    <path filter="url(#bevel-orange)" fill="#ff7800" d="M 182.7 98.0 C 184.7 98.0 186.0 99.3 186.0 101.4 V 168.6 C 186.0 170.7 184.6 172.0 182.6 172.0 H 113.4 C 111.3 172.0 110.0 170.7 110.0 168.7 C 110.0 166.7 111.3 165.4 113.4 165.4 H 179.4 V 101.4 C 179.4 99.3 180.7 98.0 182.7 98.0 Z"/>
  </g>
</svg>`
export const HEADER_WORDMARK_DATA_URI = makeSvgDataUri(HEADER_WORDMARK_SVG)
export const SITE_ICON_DATA_URI = makeSvgDataUri(SITE_ICON_SVG)

// Badge artwork and the IMDb logo are shared with 4khdhub-redesign.user.js.
export const applySiteBranding = () => {
  try {
    for (const iconLink of document.querySelectorAll('link[rel~="icon"]')) {
      if (iconLink.getAttribute("href") !== SITE_ICON_DATA_URI) {
        iconLink.type = "image/svg+xml"
        iconLink.removeAttribute("sizes")
        iconLink.setAttribute("href", SITE_ICON_DATA_URI)
      }
    }
  } catch {
    return false
  }
  return true
}
