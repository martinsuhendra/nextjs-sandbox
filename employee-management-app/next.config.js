/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    MONGO_URI: process.env.MONGO_URI,
    BASE_URL: process.env.BASE_URL,
  },
}

module.exports = nextConfig
