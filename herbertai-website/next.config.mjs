/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  // Security headers on every route (3 Nov 2026, after a pen test of the live
  // site found none beyond Vercel's HSTS). frame-ancestors and X-Frame-Options
  // stop other sites framing the forms; nosniff and the referrer policy are
  // standard hardening; HSTS now covers the subdomains, all of which (www,
  // dashboard, demo, app) were checked to serve HTTPS on Vercel first. The CSP
  // carries frame-ancestors only, so no script, style or font is affected.
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Content-Security-Policy', value: "frame-ancestors 'self'" },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
        ],
      },
    ]
  },
  async redirects() {
    return [
      // Canonical host — send www traffic to the apex domain.
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.herbert-aisolutions.com' }],
        destination: 'https://herbert-aisolutions.com/:path*',
        permanent: true,
      },
      // The automation page carried a competing free offer (an "automation
      // map"); the free AI audit replaced it on 16 Sep 2026. Keeps the
      // search equity (about 70 searches a month) pointed at the offer.
      {
        source: '/automation-adelaide',
        destination: '/pilot',
        permanent: true,
      },
      // Case-study pages removed 2026-06 (no client portfolio shown until
      // there's enough of one) — redirect any indexed URLs to the homepage.
      {
        source: '/case-studies',
        destination: '/',
        permanent: true,
      },
      {
        source: '/case-studies/:slug',
        destination: '/',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
