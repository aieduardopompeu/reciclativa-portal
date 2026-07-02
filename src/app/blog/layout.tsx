"use client";

import { usePathname } from "next/navigation";
import AdUnit from "@/components/ads/AdUnit";
import { AD_SLOTS } from "@/config/ads";

// Este layout cobre todo /blog/*, mas os anúncios "article-*" são pensados só
// para posts individuais. A listagem (/blog) e os hubs de categoria/tag já têm
// seus próprios anúncios definidos nas respectivas páginas — sem essa exceção,
// eles ganhavam um segundo par de anúncios duplicado (e um espaço em branco
// grande sempre que o anúncio não é preenchido).
function isBlogListingRoute(pathname: string) {
  return (
    pathname === "/blog" ||
    pathname.startsWith("/blog/categorias") ||
    pathname.startsWith("/blog/tags")
  );
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "/blog";

  if (isBlogListingRoute(pathname)) {
    return <>{children}</>;
  }

  return (
    <>
      {/* article-leaderboard-top — acima de cada post */}
      <div className="mx-auto w-full max-w-3xl px-4 pt-6">
        <AdUnit slot={AD_SLOTS.ARTICLE_LEADERBOARD_TOP} format="horizontal" showLabel={false} />
      </div>

      {children}

      {/* article-bottom — rodapé de todos os posts */}
      <div className="mx-auto w-full max-w-3xl px-4 pb-10">
        <AdUnit slot={AD_SLOTS.ARTICLE_BOTTOM} format="auto" />
      </div>
    </>
  );
}
