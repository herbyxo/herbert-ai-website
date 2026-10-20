// Tells Bing (and every engine sharing IndexNow: Yandex, Seznam, Naver) that
// the site's pages changed, so they recrawl now instead of whenever. ChatGPT
// search and Copilot read Bing's index. Run after a deploy to main reaches
// production: `npm run seo:ping` (all sitemap URLs) or
// `npm run seo:ping -- /pilot /pricing` (just those). The key file is
// public/<KEY>.txt; the endpoint checks it is served from the site.
const HOST = 'herbert-aisolutions.com'
const KEY = 'b834a3207b0114710e54861bd69ac7d8'

const args = process.argv.slice(2)
let urls
if (args.length) urls = args.map((p) => `https://${HOST}${p.startsWith('/') ? p : `/${p}`}`)
else {
  const xml = await (await fetch(`https://${HOST}/sitemap.xml`)).text()
  urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1])
}
const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList: urls }),
})
console.log(`IndexNow ${res.status} ${res.statusText} for ${urls.length} URLs`)
if (res.status >= 400) {
  console.log(await res.text())
  process.exit(1)
}
