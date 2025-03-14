import type { Metadata } from "next";
import { Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { LayoutContextProvider } from "@store/layoutStore";
import NavBar from "@components/NavBar";
import Footer from "@components/Footer";
import defaultMetadata from "./metadata";
import "./styles/globals.css";

export const metadata: Metadata = defaultMetadata;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
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
