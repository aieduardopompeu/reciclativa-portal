import type { MetadataRoute } from "next";
import fs from "node:fs";
import path from "node:path";

export const runtime = "nodejs";

const SITE_URL = "https://www.reciclativa.com";
const APP_DIR = path.join(process.cwd(), "src", "app");

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
 * Retorna os "route roots" válidos:
 * - src/app (raiz)
 * - src/app/(qualquer-grupo)  ex.: src/app/(site)
 */
function getRouteRoots(): string[] {
  const roots = [APP_DIR];

  try {
    const entries = fs.readdirSync(APP_DIR, { withFileTypes: true });
    for (const e of entries) {
      if (!e.isDirectory()) continue;
      const name = e.name;
      // Route Groups: (site), (marketing), etc.
      if (name.startsWith("(") && name.endsWith(")")) {
        roots.push(path.join(APP_DIR, name));
      }
    }
  } catch {
    // ignore
  }

  return roots;
}

const ROUTE_ROOTS = getRouteRoots();

/**
 * Encontra o arquivo de página de uma rota em qualquer route root.
 * Ex.: /sobre -> src/app/(site)/sobre/page.tsx
 */
function findPageFileForRoute(route: string): string | null {
  const clean = route.replace(/^\/+/, "");
  // "/" (home) -> page.tsx na raiz de cada root
  const candidates =
    clean === ""
      ? ["page.tsx", "page.ts"]
      : [path.join(clean, "page.tsx"), path.join(clean, "page.ts")];

  for (const root of ROUTE_ROOTS) {
    for (const rel of candidates) {
      const abs = path.join(root, rel);
      if (existsFile(abs)) return abs;
    }
  }
  return null;
}

function routeExists(route: string): boolean {
  if (route === "/") return true;
  return findPageFileForRoute(route) !== null;
}

function getLastModifiedForRoute(route: string): Date {
  const file = findPageFileForRoute(route);
  if (!file) return new Date();
  try {
    return fs.statSync(file).mtime;
  } catch {
    return new Date();
  }
}

/**
 * Lista slugs do blog a partir de qualquer root:
 * - src/app/blog/<slug>/page.tsx
 * - src/app/(site)/blog/<slug>/page.tsx
 *
 * Ignora:
 * - [slug] (rota dinâmica)
 * - pastas que começam com "_"
 * - pastas sem page.tsx/page.ts
 */
function getBlogSlugs(): Array<{ slug: string; pageFile: string }> {
  const results: Array<{ slug: string; pageFile: string }> = [];

  for (const root of ROUTE_ROOTS) {
    const blogDir = path.join(root, "blog");
    if (!existsDir(blogDir)) continue;

    const entries = fs.readdirSync(blogDir, { withFileTypes: true });
    for (const e of entries) {
      if (!e.isDirectory()) continue;
      const name = e.name;

      if (name === "[slug]") continue;
      if (name.startsWith("_")) continue;

      const pageTsx = path.join(blogDir, name, "page.tsx");
      const pageTs = path.join(blogDir, name, "page.ts");

      const pageFile = existsFile(pageTsx) ? pageTsx : existsFile(pageTs) ? pageTs : null;
      if (!pageFile) continue;

      results.push({ slug: name, pageFile });
    }
  }

  // Remove duplicados caso existam em mais de um root (não deveria, mas prevenimos)
  const seen = new Set<string>();
  const unique: Array<{ slug: string; pageFile: string }> = [];
  for (const r of results) {
    if (seen.has(r.slug)) continue;
    seen.add(r.slug);
    unique.push(r);
  }

  return unique;
}

export default function sitemap(): MetadataRoute.Sitemap {
  // Rotas principais (inclui apenas canônicas legais para evitar duplicidade)
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
    "/anuncie",

    // Legais canônicas (mantém apenas estas 3)
    "/politica-de-privacidade",
    "/politica-de-cookies",
    "/termos-de-uso",
  ];

  const staticRoutes: MetadataRoute.Sitemap = desiredStatic
    .filter((route) => route === "/" || routeExists(route))
    .map((route) => {
      let priority = 0.6;
      let changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly";

      if (route === "/") {
        priority = 1.0;
        changeFrequency = "daily";
      } else if (["/reciclagem", "/sustentabilidade", "/guias", "/blog"].includes(route)) {
        priority = 0.9;
        changeFrequency = "weekly";
      } else if (["/diretorio", "/profissionais"].includes(route)) {
        priority = 0.85;
        changeFrequency = "weekly";
      } else if (
        ["/politica-de-privacidade", "/politica-de-cookies", "/termos-de-uso"].includes(route)
      ) {
        priority = 0.3;
        changeFrequency = "yearly";
      } else if (route === "/anuncie") {
        priority = 0.6;
        changeFrequency = "monthly";
      } else {
        priority = 0.6;
        changeFrequency = "monthly";
      }

      const url = route === "/" ? `${SITE_URL}/` : `${SITE_URL}${route}`;
      const lastModified = getLastModifiedForRoute(route);

      return { url, lastModified, changeFrequency, priority };
    });

  // Posts do blog (pastas reais)
  const blogSlugs = getBlogSlugs();

  const blogRoutes: MetadataRoute.Sitemap = blogSlugs.map(({ slug, pageFile }) => {
    let lastModified = new Date();
    try {
      lastModified = fs.statSync(pageFile).mtime;
    } catch {
      // ignore
    }

    return {
      url: `${SITE_URL}/blog/${slug}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    };
  });

  return [...staticRoutes, ...blogRoutes];
}
