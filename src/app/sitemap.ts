import type { MetadataRoute } from "next";
import fs from "node:fs";
import path from "node:path";

export const runtime = "nodejs";

// Ajuste se seu domínio canônico for outro
const SITE_URL = "https://www.reciclativa.com";

// Diretório do app router (ajuste se seu projeto não usa src/)
const APP_DIR = path.join(process.cwd(), "src", "app");

function isDir(p: string) {
  try {
    return fs.statSync(p).isDirectory();
  } catch {
    return false;
  }
}

function existsFile(p: string) {
  try {
    return fs.statSync(p).isFile();
  } catch {
    return false;
  }
}

function getBlogSlugs(): string[] {
  const blogDir = path.join(APP_DIR, "blog");
  if (!isDir(blogDir)) return [];

  const entries = fs.readdirSync(blogDir, { withFileTypes: true });

  // Slug = pasta dentro de /blog que contém page.tsx
  const slugs = entries
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .filter((name) => {
      // ignora pastas especiais comuns
      if (name.startsWith("(") || name.startsWith("_")) return false;
      // ignora rotas especiais
      if (name === "page.tsx" || name === "page.ts") return false;

      const pageTsx = path.join(blogDir, name, "page.tsx");
      const pageTs = path.join(blogDir, name, "page.ts");
      return existsFile(pageTsx) || existsFile(pageTs);
    });

  return slugs;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "daily", priority: 1.0 },

    { url: `${SITE_URL}/reciclagem`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/sustentabilidade`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/guias`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/diretorio`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${SITE_URL}/profissionais`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },

    { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },

    { url: `${SITE_URL}/sobre`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/contato`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },

    // Ajuste conforme seus slugs institucionais reais (você mostrou /privacidade /termos /cookies /anuncie)
    { url: `${SITE_URL}/privacidade`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    { url: `${SITE_URL}/termos`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    { url: `${SITE_URL}/cookies`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    { url: `${SITE_URL}/anuncie`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
  ];

  const blogSlugs = getBlogSlugs();

  const blogRoutes: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${SITE_URL}/blog/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...blogRoutes];
}
