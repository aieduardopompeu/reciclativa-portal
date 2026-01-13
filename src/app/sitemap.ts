import type { MetadataRoute } from "next";
import fs from "node:fs";
import path from "node:path";

export const runtime = "nodejs";

const SITE_URL = "https://www.reciclativa.com";
const APP_DIR = path.join(process.cwd(), "src", "app");
const BLOG_APP_DIR = path.join(APP_DIR, "blog");

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
  const clean = route.replace(/^\/+/, "");
  const dir = path.join(APP_DIR, clean);
  if (!existsDir(dir)) return false;

  const pageTsx = path.join(dir, "page.tsx");
  const pageTs = path.join(dir, "page.ts");
  return existsFile(pageTsx) || existsFile(pageTs);
}

/**
 * Lista slugs do blog a partir das pastas em src/app/blog/<slug>/page.tsx
 * Ignora:
 * - [slug] (rota dinâmica)
 * - pastas que não tenham page.tsx/page.ts
 */
function getBlogSlugsFromAppDir(): string[] {
  if (!existsDir(BLOG_APP_DIR)) return [];

  const entries = fs.readdirSync(BLOG_APP_DIR, { withFileTypes: true });

  const slugs = entries
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .filter((name) => name !== "[slug]" && !name.startsWith("_"))
    .filter((name) => {
      const dir = path.join(BLOG_APP_DIR, name);
      return existsFile(path.join(dir, "page.tsx")) || existsFile(path.join(dir, "page.ts"));
    });

  return slugs;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Rotas estáticas desejadas (só entram se existirem de verdade)
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

  // Posts do blog (rotas reais em src/app/blog/<slug>/page.tsx)
  const blogSlugs = getBlogSlugsFromAppDir();

  const blogRoutes: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${SITE_URL}/blog/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...blogRoutes];
}
