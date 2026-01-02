import type { MetadataRoute } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://reciclativa.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const routes: Array<{ path: string; priority?: number }> = [
    { path: "/", priority: 1.0 },

    // Seções principais
    { path: "/reciclagem", priority: 0.9 },
    { path: "/sustentabilidade", priority: 0.9 },
    { path: "/guias", priority: 0.9 },
    { path: "/diretorio", priority: 0.85 },
    { path: "/profissionais", priority: 0.85 },
    { path: "/blog", priority: 0.9 },

    // Institucional / Legal
    { path: "/sobre", priority: 0.6 },
    { path: "/contato", priority: 0.6 },
    { path: "/faq", priority: 0.7 },
    { path: "/privacidade", priority: 0.4 },
    { path: "/termos", priority: 0.4 },
    { path: "/cookies", priority: 0.4 },

    // Monetização
    { path: "/anuncie", priority: 0.5 },
  ];

  return routes.map(({ path, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: path === "/" ? "daily" : "weekly",
    priority,
  }));
}
