import type { MetadataRoute } from "next";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.reciclativa.com").replace(
  /\/+$/,
  ""
);

// Área administrativa, área logada do SaaS, autenticação e API nunca devem ser indexadas
const DISALLOW = [
  "/admin/",
  "/admin-login",
  "/app/",
  "/api/",
  "/login",
  "/recuperar-senha",
  "/redefinir-senha",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: DISALLOW,
      },

      // Opcional: regras explícitas por bot (mais compatível que “multi User-Agent” no mesmo bloco)
      {
        userAgent: "AhrefsBot",
        allow: "/",
        disallow: DISALLOW,
      },
      {
        userAgent: "SemrushBot",
        allow: "/",
        disallow: DISALLOW,
      },
      {
        userAgent: "MJ12bot",
        allow: "/",
        disallow: DISALLOW,
      },
      {
        userAgent: "DotBot",
        allow: "/",
        disallow: DISALLOW,
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
