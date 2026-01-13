import type { MetadataRoute } from "next";
import fs from "node:fs";
import path from "node:path";

export const runtime = "nodejs";

const SITE_URL = "https://www.reciclativa.com";

// Ajuste se seu projeto não usa src/
const APP_DIR = path.join(process.cwd(), "src", "app");
// Onde estão seus posts (você tem src/content no projeto)
const BLOG_CONTENT_DIR = path.join(process.cwd(), "src", "content", "blog");

function existsFile(p: string) {
  try {
    return fs.statSync(p).isFile();
  } catch {
    return false;
  }
}

function existsDir(p: string) {
  try {
    return fs.statSync(p).isDirectory();
  } catch {
    return false;
  }
}

/**
 * Confirma se uma rota do App Router existe de fato.
 * Ex.: routeExists("/faq") checa src/app/faq/page.tsx|page.ts
 */
function routeExists(route: string): boolean {
  const clean = route.replace(/^\/+/, ""); // remove leading /
  const dir = path.join(APP_DIR, clean);
  if (!existsDir(dir)) return false;

  const pageTsx = path.join(dir, "page.tsx");
  const pageTs = path.join(dir, "page.ts");
  return existsFile(pageTsx) || existsFile(pageTs);
}

/**
 * Slugs do blog a partir de src/content/blog/*.md(x)
 * Gera: /blog/<slug>
 */
function getBlogSlugsFromContent(): string[] {
  if (!existsDir(BLOG_CONTENT_DIR)) return [];

  const files = fs.readdirSync(BLOG_CONTENT_DIR, { withFileTypes: true });
  return files
    .filter((e) => e.isFile())
    .map((e) => e.name)
    .filter((name) => name.endsWith(".md") || name.endsWith(".mdx"))
    .map((name) => name.replace(/\.(md|mdx)$/, ""))
    .filter((slug) => slug && !slug.startsWith("_"));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Rotas que você quer no sitemap (mas só entram se existirem de verdade)
  const desiredStatic = [
    "/",
    "/reciclagem",
    "/sustentabilidade",
    "/guias",
    "/diretorio",
    "/profissionais",
    "/blog",
    "/sobre",
    "/contato",
    "/faq",
    "/privacidade",
    "/termos",
    "/cookies",
    "/anuncie",
  ];

  const staticRoutes: MetadataRoute.Sitemap = desiredStatic
    .filter((route) => route === "/" || routeExists(route))
    .map((route) => {
      // prioridades simples e estáveis (não precisa “hiper-otimizar”)
      let priority = 0.6;
      let changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "weekly";

      if (route === "/") {
        priority = 1.0;
        changeFrequency = "daily";
      } else if (["/reciclagem", "/sustentabilidade", "/guias", "/blog"].includes(route)) {
        priority = 0.9;
        changeFrequency = "weekly";
      } else if (["/diretorio", "/profissionais"].includes(route)) {
        priority = 0.85;
        changeFrequency = "weekly";
      } else if (["/privacidade", "/termos", "/cookies"].includes(route)) {
        priority = 0.3;
        changeFrequency = "yearly";
      } else if (route === "/anuncie") {
        priority = 0.5;
        changeFrequency = "monthly";
      } else {
        priority = 0.6;
        changeFrequency = "monthly";
      }

      const url = route === "/" ? `${SITE_URL}/` : `${SITE_URL}${route}`;
      return { url, lastModified: now, changeFrequency, priority };
    });

  const blogSlugs = getBlogSlugsFromContent();

  const blogRoutes: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${SITE_URL}/blog/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...blogRoutes];
}
