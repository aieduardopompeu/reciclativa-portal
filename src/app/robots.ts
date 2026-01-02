import type { MetadataRoute } from "next";

const SITE_URL = "https://reciclativa.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Bloqueios úteis (evita indexar rotas internas que não devem ranquear)
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
