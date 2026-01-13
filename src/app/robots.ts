import type { MetadataRoute } from "next";

const SITE_URL = "https://www.reciclativa.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },

      // Opcional: regras explícitas por bot (mais compatível que “multi User-Agent” no mesmo bloco)
      {
        userAgent: "AhrefsBot",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
      {
        userAgent: "SemrushBot",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
      {
        userAgent: "MJ12bot",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
      {
        userAgent: "DotBot",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
