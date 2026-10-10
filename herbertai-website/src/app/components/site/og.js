// The share image every page points at. Pages that set their own openGraph
// lose the root opengraph-image, so they name it here. LinkedIn and Facebook
// cache images by URL: bump the version whenever src/app/opengraph-image.js
// changes, or the old card keeps showing.
export const OG_IMAGE = '/opengraph-image?v=2026-10-08'
