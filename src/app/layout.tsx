import type { Metadata } from "next";
import "./globals.css";
import { site } from "@/config/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";

const SITE_URL =
  (process.env.NEXT_PUBLIC_SITE_URL || "https://www.reciclativa.com").replace(/\/$/, "");

const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID || "";

export const metadata: Metadata = {
  title: {
    default: `${site.name} | Reciclagem e Sustentabilidade`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: SITE_URL },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-white text-slate-900">
        <GoogleAnalytics measurementId={GA4_ID} />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
