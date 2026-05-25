export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/preview/', '/api/'],
      },
    ],
    sitemap: 'https://herbert-aisolutions.com/sitemap.xml',
    host: 'https://herbert-aisolutions.com',
  }
}
