import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";

import { site } from "@/config/site";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import CookieBanner from "@/components/cookies/CookieBanner";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.reciclativa.com").replace(
  /\/+$/,
  ""
);
const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID ?? "";
const ADSENSE_CLIENT = "ca-pub-4436420746304287";

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  title: {
    default: `${site.name} | Reciclagem e Sustentabilidade`,
    template: `%s | ${site.name}`,
  },
  description: site.description,

  metadataBase: new URL(SITE_URL),
  alternates: { canonical: `${SITE_URL}/` },

  // ✅ Manifest (PWA) — arquivo em /public/site.webmanifest
  manifest: "/site.webmanifest",

  // ✅ Favicons / Apple / PNGs
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },

  other: {
    "google-adsense-account": ADSENSE_CLIENT,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-white text-slate-900">
        <GoogleAnalytics measurementId={GA4_ID} />

        <Script
          id="adsense-base"
          async
          strategy="lazyOnload"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
          crossOrigin="anonymous"
        />

        <Header />
        {children}
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
