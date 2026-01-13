import type { MetadataRoute } from "next";
import fs from "node:fs";
import path from "node:path";

export const runtime = "nodejs";

const SITE_URL = "https://www.reciclativa.com";

// Ajuste se seu projeto não usa src/
const APP_DIR = path.join(process.cwd(), "src", "app");

// Vamos procurar slugs do blog em alguns locais comuns.
// (Isso evita “sumir” em produção caso os posts estejam em outro path.)
const BLOG_DIR_CANDIDATES = [
  path.join(process.cwd(), "src", "content", "blog"),
  path.join(process.cwd(), "src", "content", "posts"),
  path.join(process.cwd(), "content", "blog"),
  path.join(process.cwd(), "content", "posts"),
];

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
 * Lê arquivos .md/.mdx recursivamente e retorna slugs relativos (sem extensão).
 */
function walkFiles(dir: string, baseDir: string, out: string[] = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const e of entries) {
    const full = path.join(dir, e.name);

    if (e.isDirectory()) {
      walkFiles(full, baseDir, out);
      continue;
    }

    if (e.isFile() && (e.name.endsWith(".md") || e.name.endsWith(".mdx"))) {
      const rel = path.relative(baseDir, full).replace(/\\/g, "/");
      const slug = rel.replace(/\.(md|mdx)$/, "");

      // Ignora rascunhos do tipo "_algo.mdx"
      if (!slug || slug.startsWith("_")) continue;

      out.push(slug);
    }
  }

  return out;
}

/**
 * Retorna slugs do blog do primeiro diretório que realmente exista e tenha posts.
 * IMPORTANTE: como sua rota é /blog/[slug], nós "achatamos" qualquer subpasta,
 * mantendo apenas o último segmento do caminho (basename).
 */
function getBlogSlugs(): string[] {
  for (const candidate of BLOG_DIR_CANDIDATES) {
    if (!existsDir(candidate)) continue;

    const slugs = walkFiles(candidate, candidate);

    if (slugs.length > 0) {
      // Achata subpastas: "pasta/meu-post" -> "meu-post"
      // Isso evita gerar /blog/pasta/meu-post (quebraria com [slug]).
      const flattened = slugs
        .map((s) => s.split("/").pop() || "")
        .filter(Boolean)
        .filter((s) => !s.startsWith("_"));

      // Dedup (caso existam nomes repetidos em subpastas)
      return Array.from(new Set(flattened));
    }
  }

  return [];
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

  const blogSlugs = getBlogSlugs();

  const blogRoutes: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${SITE_URL}/blog/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...blogRoutes];
}
