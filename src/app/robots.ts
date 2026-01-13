import type { MetadataRoute } from "next";

const SITE_URL = "https://www.reciclativa.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Regras gerais para bots comuns
      {
        userAgent: "*",
        allow: "/",

        // Bloqueia rotas internas/administrativas e APIs
        disallow: ["/admin/", "/api/"],
      },

      // Opcional: bots “agressivos” (mantém padrão, sem bloquear Google)
      // Você pode remover este bloco se preferir.
      {
        userAgent: ["AhrefsBot", "SemrushBot", "MJ12bot", "DotBot"],
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
    ],

    // Informa o sitemap canônico
    sitemap: `${SITE_URL}/sitemap.xml`,

    // Host é aceito por alguns crawlers (não é obrigatório)
    host: SITE_URL,
  };
}
