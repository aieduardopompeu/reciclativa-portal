"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AppLegalFooter } from "@/components/layout/AppLegalFooter";
import CookieBanner from "@/components/cookies/CookieBanner";

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname() || "/";

  const isAdmin = pathname.startsWith("/admin");
  const isAppHome = pathname === "/app-home";

  if (isAdmin) {
    return <>{children}</>;
  }

  if (isAppHome) {
    return (
      <>
        {children}
        <AppLegalFooter />
        <CookieBanner />
      </>
    );
  }

  return (
    <>
      <Header />
      {children}
      <Footer />
      <CookieBanner />
    </>
  );
}
