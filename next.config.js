/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "files.stripe.com"
      }
    ]
  },
  async exportPathMap(defaultPathMap, { dev, dir, outDir, distDir, buildId }) {
    return Object.keys(defaultPathMap).reduce((pathMap, path) => {
      if (path.includes('/api/')) {
        return pathMap;
      } else {
        return {
          ...pathMap,
          [path]: defaultPathMap[path],
        };
      }
    }, {});
  },
}

module.exports = nextConfig