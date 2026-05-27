const BASE = 'https://herbert-aisolutions.com'

export default function sitemap() {
  const lastModified = new Date()
  const routes = [
    { path: '', priority: 1.0 },
    { path: '/services', priority: 0.9 },
    { path: '/industries', priority: 0.9 },
    { path: '/pricing', priority: 0.9 },
    { path: '/about', priority: 0.8 },
    { path: '/contact', priority: 0.8 },
    { path: '/faq', priority: 0.7 },
    { path: '/property-managers', priority: 0.8 },
    { path: '/case-studies', priority: 0.85 },
    { path: '/case-studies/blendz', priority: 0.8 },
  ]
  return routes.map((r) => ({
    url: `${BASE}${r.path}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: r.priority,
  }))
}
