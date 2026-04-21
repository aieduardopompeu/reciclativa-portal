"use client";

import { useEffect, useState } from "react";
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
  const [hostname, setHostname] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHostname(window.location.hostname);
    }
    setMounted(true);
  }, []);

  const isAdmin = pathname.startsWith("/admin");
  const isAppHome = pathname === "/app-home";
  const isAppSubdomain =
    hostname === "app.reciclativa.com" ||
    hostname.startsWith("app.") ||
    hostname === "localhost";

  if (isAdmin) {
    return <>{children}</>;
  }

  if (!mounted) {
    return <>{children}</>;
  }

  if (isAppHome || isAppSubdomain) {
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
