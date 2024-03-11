/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn2.cellphones.com.vn",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
