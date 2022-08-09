/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    MONGO_URI: process.env.NEXT_PUBLIC_MONGO_URI,
  },
};

module.exports = nextConfig;
