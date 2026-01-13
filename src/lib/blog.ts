import fs from "fs";
import path from "path";

export type BlogFrontMatter = {
  title: string;
  description: string;
  date?: string; // YYYY-MM-DD
  updatedAt?: string; // YYYY-MM-DD
  coverImage?: string; // /og/... ou /images/...
  keywords?: string[];
};

export type BlogPost = {
  slug: string;
  frontMatter: BlogFrontMatter;
  contentRaw: string;
};

const BLOG_DIR = path.join(process.cwd(), "src", "content", "blog");

function safeReadDir(dir: string) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir);
}

export function getAllBlogSlugs(): string[] {
  const files = safeReadDir(BLOG_DIR);
  return files
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"))
    .map((f) => f.replace(/\.(md|mdx)$/, ""));
}

// Frontmatter simples: --- key: value ---
// (suficiente para SEO; mantém baixo risco sem libs novas)
export function parseFrontMatter(raw: string): { frontMatter: Partial<BlogFrontMatter>; body: string } {
  const fmMatch = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
  if (!fmMatch) return { frontMatter: {}, body: raw };

  const fmRaw = fmMatch[1];
  const body = fmMatch[2];

  const frontMatter: Record<string, any> = {};
  for (const line of fmRaw.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const idx = trimmed.indexOf(":");
    if (idx === -1) continue;

    const key = trimmed.slice(0, idx).trim();
    let value = trimmed.slice(idx + 1).trim();

    // remove aspas
    value = value.replace(/^"(.*)"$/, "$1").replace(/^'(.*)'$/, "$1");

    // lista simples: [a, b, c]
    if (value.startsWith("[") && value.endsWith("]")) {
      const list = value
        .slice(1, -1)
        .split(",")
        .map((v) => v.trim().replace(/^"(.*)"$/, "$1").replace(/^'(.*)'$/, "$1"))
        .filter(Boolean);
      frontMatter[key] = list;
    } else {
      frontMatter[key] = value;
    }
  }

  return { frontMatter, body };
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
  const mdPath = path.join(BLOG_DIR, `${slug}.md`);
  const mdxPath = path.join(BLOG_DIR, `${slug}.mdx`);

  const filepath = fs.existsSync(mdxPath) ? mdxPath : fs.existsSync(mdPath) ? mdPath : null;
  if (!filepath) return null;

  const raw = fs.readFileSync(filepath, "utf8");
  const parsed = parseFrontMatter(raw);

  const title = String(parsed.frontMatter.title || slug);
  const description = String(parsed.frontMatter.description || "");

  const frontMatter: BlogFrontMatter = {
    title,
    description,
    date: parsed.frontMatter.date ? String(parsed.frontMatter.date) : undefined,
    updatedAt: parsed.frontMatter.updatedAt ? String(parsed.frontMatter.updatedAt) : undefined,
    coverImage: parsed.frontMatter.coverImage ? String(parsed.frontMatter.coverImage) : undefined,
    keywords: Array.isArray(parsed.frontMatter.keywords) ? parsed.frontMatter.keywords : undefined,
  };

  return { slug, frontMatter, contentRaw: raw };
}
