/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  async redirects() {
    return [
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
