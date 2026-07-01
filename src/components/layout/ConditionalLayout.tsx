"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AppLegalFooter } from "@/components/layout/AppLegalFooter";
import CookieBanner from "@/components/cookies/CookieBanner";

export default function ConditionalLayout({
  children,
  isAppSubdomain,
}: {
  children: React.ReactNode;
  isAppSubdomain: boolean;
}) {
  const pathname = usePathname() || "/";

  const isAdminRoute = pathname.startsWith("/admin");
  const isAppHomeRoute = pathname === "/app-home";

  if (isAdminRoute) {
    return <>{children}</>;
  }

  if (isAppSubdomain || isAppHomeRoute) {
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
