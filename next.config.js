/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/", // automatically becomes /docs/with-basePath
        destination: "/dashboard", // automatically becomes /docs/another
      },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "**" },
    ],
  },
};

module.exports = nextConfig;
