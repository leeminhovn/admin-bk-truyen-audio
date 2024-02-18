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
};

module.exports = nextConfig;
