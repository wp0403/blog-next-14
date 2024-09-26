/*
 * @Author: wb_wangpeng32 75709526+wp0403@users.noreply.github.com
 * @Date: 2024-09-26 16:01:24
 * @LastEditors: wb_wangpeng32 75709526+wp0403@users.noreply.github.com
 * @LastEditTime: 2024-09-26 17:10:52
 * @FilePath: /blog-next-14/app/layout.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import type { Metadata } from "next";
import { Viewport } from "next";
import globby from "globby";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { LayoutContextProvider } from "@store/layoutStore";
import NavBar from "@components/NavBar";
import Footer from "@components/Footer";
import "./styles/globals.css";

export const metadata: Metadata = {
  title: "shimmer的博客",
  description: "shimmer的个人博客站，旨在记录生活，分享知识",
  keywords: ["shimmer博客", "shimmer的博客", "shimmer", "博客", "个人博客"],
  authors: [{ name: "shimmer", url: "https://wp-boke.work/about" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

const getCSSFiles = async () => {
  const paths = await globby("./path/to/your/css/directory/*.css");
  const cssFiles = paths.map(
    (path) =>
      css`
        @import url(${path});
      `
  );
  return cssFiles;
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh">
      <body>
        <LayoutContextProvider>
          <NavBar />
          {children}
          <Footer />
        </LayoutContextProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
