/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/studio/data',
        permanent: true,
      },
    ]
  },
};

module.exports = nextConfig;
