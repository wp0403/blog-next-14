/** @type {import('next').NextConfig} */

const withMDX = require("@next/mdx")();

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.myqcloud.com",
      },
      {
        protocol: "https",
        hostname: "img.foreverblog.cn",
      },
      {
        protocol: "http",
        hostname: "cdn-hw-static2.shanhutech.cn",
      },
      {
        protocol: "https",
        hostname: "api-render.wp-boke.work",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "github.githubassets.com",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/sitemap",
        destination: "/api/sitemap",
      },
      {
        source: "/sitemap.xml",
        destination: "/api/sitemap",
      },
      {
        source: "/dead-chain",
        destination: "/api/dead-chain",
      },
      {
        source: "/dead-chain.xml",
        destination: "/api/dead-chain",
      },
      {
        source: "/rss",
        destination: "/api/rss",
      },
      {
        source: "/rss.xml",
        destination: "/api/rss",
      },
      {
        source: "/js/:path*",
        destination:
          "https://wp-1302605407.cos.ap-beijing.myqcloud.com/js/:path*",
      },
    ];
  },
};

module.exports = withMDX(nextConfig);
