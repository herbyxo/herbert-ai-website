import ROUTES from './seo-routes.json'
import DATES from './seo-dates.json'

const BASE = 'https://herbert-aisolutions.com'

// The organic pages, from seo-routes.json (one list for this sitemap and for
// scripts/seo-dates.mjs). lastModified is the date the page last changed in
// git, written to seo-dates.json by `npm run seo:dates`, not the build time:
// a lastmod that moves on every deploy teaches engines to ignore it.
export default function sitemap() {
  return ROUTES.map((r) => ({
    url: `${BASE}${r.path}`,
    lastModified: DATES[r.path || '/'] || undefined,
    changeFrequency: 'monthly',
    priority: r.priority,
  }))
}
