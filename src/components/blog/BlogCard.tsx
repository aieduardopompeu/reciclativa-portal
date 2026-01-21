// src/components/blog/BlogCard.tsx
import Link from "next/link";
import type { BlogPost } from "@/content/blog/posts";

function formatDateBR(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return `${String(d).padStart(2, "0")}/${String(m).padStart(2, "0")}/${y}`;
}

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="block rounded-2xl border border-zinc-200 bg-white p-5 transition hover:shadow-sm"
    >
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-zinc-500">
        <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">
          {post.category}
        </span>

        <span aria-hidden="true">•</span>
        <span>{formatDateBR(post.dateISO)}</span>

        <span aria-hidden="true">•</span>
        <span>{post.readMin} min</span>
      </div>

      <h3 className="mt-3 text-base font-extrabold tracking-tight text-zinc-900">
        {post.title}
      </h3>

      <p className="mt-2 text-sm leading-relaxed text-zinc-700">
        {post.excerpt}
      </p>
    </Link>
  );
}
