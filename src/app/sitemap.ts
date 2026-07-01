import type { MetadataRoute } from "next";
import fs from "node:fs";
import path from "node:path";
import {
  POSTS,
  getAllCategories,
  getAllTags,
  getPostsByCategorySlug,
  getPostsByTag,
  toSlug,
} from "@/content/blog/posts";
import { citiesByUF, normalizeCity, uniqueUFs } from "@/content/profissionais";

export const runtime = "nodejs";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.reciclativa.com").replace(
  /\/+$/,
  ""
);
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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Rotas principais (inclui apenas canônicas legais para evitar duplicidade)
  const desiredStatic = [
    "/",
    "/reciclagem",
    "/sustentabilidade",
    "/guias",
    "/guias/coleta-seletiva",
    "/guias/o-que-pode-reciclar",
    "/guias/compostagem",
    "/diretorio",
    "/profissionais",
    "/blog",
    "/sobre",
    "/contato",
    "/faq",
    "/gestao",

    // Hubs adicionais (importantes e rastreáveis)
    "/meio-ambiente",
    "/educacao-ambiental",
    "/economia-circular",
    "/residuos-solidos",
    "/simbolos-da-reciclagem",

    // Conversão / geração de leads
    "/anuncie",
    "/profissionais/saiba-mais",
    "/gestao/contato",

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
        ["/guias/coleta-seletiva", "/guias/o-que-pode-reciclar", "/guias/compostagem"].includes(
          route
        )
      ) {
        priority = 0.75;
        changeFrequency = "monthly";
      } else if (
        ["/economia-circular", "/residuos-solidos", "/simbolos-da-reciclagem"].includes(route)
      ) {
        priority = 0.7;
        changeFrequency = "monthly";
      } else if (["/anuncie", "/profissionais/saiba-mais"].includes(route)) {
        priority = 0.5;
        changeFrequency = "monthly";
      } else if (route === "/gestao/contato") {
        priority = 0.4;
        changeFrequency = "monthly";
      } else if (
        ["/politica-de-privacidade", "/politica-de-cookies", "/termos-de-uso"].includes(route)
      ) {
        priority = 0.3;
        changeFrequency = "yearly";
      } else {
        priority = 0.6;
        changeFrequency = "monthly";
      }

      const url = route === "/" ? `${SITE_URL}/` : `${SITE_URL}${route}`;
      const lastModified = getLastModifiedForRoute(route);

      return { url, lastModified, changeFrequency, priority };
    });

  // Posts do blog (pastas reais). lastModified vem da data real do post em POSTS
  // (dateISO), não do mtime do arquivo — mtime reflete a data do deploy, não da edição.
  const blogSlugs = getBlogSlugs();
  const postBySlug = new Map(POSTS.map((p) => [p.slug, p]));

  const blogRoutes: MetadataRoute.Sitemap = blogSlugs.map(({ slug, pageFile }) => {
    const post = postBySlug.get(slug);
    let lastModified: Date;
    if (post) {
      lastModified = new Date(post.dateISO);
    } else {
      try {
        lastModified = fs.statSync(pageFile).mtime;
      } catch {
        lastModified = new Date();
      }
    }

    return {
      url: `${SITE_URL}/blog/${slug}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    };
  });

  // Categorias e tags do blog (enumeráveis a partir de src/content/blog/posts.ts)
  const categoryRoutes: MetadataRoute.Sitemap = getAllCategories().map((category) => {
    const posts = getPostsByCategorySlug(toSlug(category));
    const dates = posts.map((p) => p.dateISO).sort();
    const lastModified = dates.length ? new Date(dates[dates.length - 1]) : new Date();

    return {
      url: `${SITE_URL}/blog/categorias/${toSlug(category)}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    };
  });

  const tagRoutes: MetadataRoute.Sitemap = getAllTags().map((tag) => {
    const posts = getPostsByTag(tag);
    const dates = posts.map((p) => p.dateISO).sort();
    const lastModified = dates.length ? new Date(dates[dates.length - 1]) : new Date();

    return {
      url: `${SITE_URL}/blog/tags/${tag}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.4,
    };
  });

  // Diretório de profissionais por UF / cidade (dados vêm do Postgres)
  let profissionaisRoutes: MetadataRoute.Sitemap = [];
  try {
    const ufs = await uniqueUFs();
    const perUF = await Promise.all(
      ufs.map(async (uf) => {
        const ufRoute: MetadataRoute.Sitemap[number] = {
          url: `${SITE_URL}/profissionais/${uf}`,
          lastModified: new Date(),
          changeFrequency: "weekly",
          priority: 0.5,
        };

        const cities = await citiesByUF(uf);
        const cityRoutes: MetadataRoute.Sitemap = cities.map((city) => ({
          url: `${SITE_URL}/profissionais/${uf}/${normalizeCity(city)}`,
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.45,
        }));

        return [ufRoute, ...cityRoutes];
      })
    );
    profissionaisRoutes = perUF.flat();
  } catch {
    // Se o banco não responder, o sitemap continua sem essas rotas dinâmicas
    profissionaisRoutes = [];
  }

  return [
    ...staticRoutes,
    ...blogRoutes,
    ...categoryRoutes,
    ...tagRoutes,
    ...profissionaisRoutes,
  ];
}
