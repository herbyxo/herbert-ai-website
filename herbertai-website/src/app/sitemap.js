const BASE = 'https://herbert-aisolutions.com'

export default function sitemap() {
  const lastModified = new Date()
  const routes = [
    { path: '', priority: 1.0 },
    { path: '/services', priority: 0.9 },
    { path: '/industries', priority: 0.9 },
    { path: '/pricing', priority: 0.9 },
    { path: '/about', priority: 0.8 },
    { path: '/start', priority: 0.95 },
    { path: '/contact', priority: 0.8 },
    { path: '/faq', priority: 0.7 },
    { path: '/privacy', priority: 0.3 },
    { path: '/web-design-adelaide', priority: 0.85 },
    { path: '/ai-receptionist', priority: 0.85 },
    { path: '/google-ads-adelaide', priority: 0.85 },
    { path: '/pilot', priority: 0.95 },
    { path: '/work', priority: 0.85 },
    { path: '/industries/accountants', priority: 0.8 },
    { path: '/industries/allied-health', priority: 0.8 },
    { path: '/industries/trades', priority: 0.8 },
    { path: '/industries/real-estate', priority: 0.8 },
  ]
  return routes.map((r) => ({
    url: `${BASE}${r.path}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: r.priority,
  }))
}
