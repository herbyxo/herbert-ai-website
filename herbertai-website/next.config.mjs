/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
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
