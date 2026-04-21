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
  const [checkedHost, setCheckedHost] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHostname(window.location.hostname.toLowerCase());
      setCheckedHost(true);
    }
  }, []);

  const isAdminRoute = pathname.startsWith("/admin");
  const isAppHomeRoute = pathname === "/app-home";
  const isAppSubdomain = hostname === "app.reciclativa.com";

  if (isAdminRoute) {
    return <>{children}</>;
  }

  if (!checkedHost) {
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
