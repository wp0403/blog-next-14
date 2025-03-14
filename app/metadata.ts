import { Metadata } from "next";

const defaultMetadata: Metadata = {
  metadataBase: new URL('https://your-domain.com'),
  title: "个人博客 - 记录生活与技术",
  description: "一个记录生活、分享技术的个人博客网站",
  keywords: ["博客", "技术", "生活", "Next.js", "React", "前端开发"],
  authors: [{ name: "博主" }],
  creator: "博主",
  publisher: "博主",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "https://your-domain.com",
    siteName: "个人博客",
    title: "个人博客 - 记录生活与技术",
    description: "一个记录生活、分享技术的个人博客网站",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "个人博客封面图",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "个人博客 - 记录生活与技术",
    description: "一个记录生活、分享技术的个人博客网站",
    images: ["/twitter-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default defaultMetadata; 