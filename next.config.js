/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/", // automatically becomes /docs/with-basePath
        destination: "/storys-managent", // automatically becomes /docs/another
      },
    ];
  },
  images: {
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    domains: ["localhost", "scontent.fhan14-3.fna.fbcdn.net"],
  },
};

module.exports = nextConfig;
