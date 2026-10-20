// Writes src/app/seo-dates.json: the date each sitemap route last changed,
// from git, so the sitemap's lastmod is true instead of the build time (search
// engines learn to ignore a lastmod that changes on every deploy). Run it
// before committing a page change: `npm run seo:dates`. A route's date is the
// newest commit touching its page folder or a component it names below.
import { execFileSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'

const ROUTES = JSON.parse(readFileSync(new URL('../src/app/seo-routes.json', import.meta.url)))
const out = {}
for (const r of ROUTES) {
  const paths = [r.path === '' ? 'src/app/page.js' : `src/app${r.path.replace(/\/(accountants|allied-health|trades|real-estate)$/, '/[slug]')}`, ...(r.also || [])]
  // :(literal) so the [slug] folder is not read as a glob.
  const iso = execFileSync('git', ['log', '-1', '--format=%cI', '--', ...paths.map((p) => `:(literal)${p}`)], { encoding: 'utf8' }).trim()
  out[r.path || '/'] = iso ? iso.slice(0, 10) : new Date().toISOString().slice(0, 10)
}
writeFileSync(new URL('../src/app/seo-dates.json', import.meta.url), JSON.stringify(out, null, 2) + '\n')
console.log(out)
