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
      {
        protocol: 'https',
        hostname: 'img-1302605407.cos.ap-beijing.myqcloud.com',
        pathname: '/photography/**',
      },
      {
        protocol: 'https',
        hostname: '**.cos.ap-guangzhou.myqcloud.com',
        port: '',
        pathname: '/**',
      },
    ],
    minimumCacheTTL: 31536000, // 1年缓存
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp'],
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
  experimental: {
    turbo: true,
  },
};

module.exports = withMDX(nextConfig);
