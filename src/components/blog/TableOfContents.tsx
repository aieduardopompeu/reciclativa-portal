// src/components/blog/TableOfContents.tsx
"use client";

import { useEffect, useMemo, useState } from "react";

type TocItem = {
  id: string;
  text: string;
  level: 2 | 3;
};

function slugify(input: string) {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function TableOfContents({
  contentSelector,
}: {
  contentSelector: string;
}) {
  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  const emptyState = useMemo(
    () => (
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
        Sem seções detectadas (use títulos H2/H3 no post).
      </div>
    ),
    []
  );

  useEffect(() => {
    const root = document.querySelector(contentSelector);
    if (!root) return;

    const headings = Array.from(
      root.querySelectorAll<HTMLHeadingElement>("h2, h3")
    );

    const used = new Map<string, number>();

    const toc: TocItem[] = headings
      .map((h) => {
        const level = h.tagName.toLowerCase() === "h2" ? 2 : 3;
        const text = (h.textContent || "").trim();
        if (!text) return null;

        // garante id estável
        let id = h.id?.trim();
        if (!id) id = slugify(text);

        const count = used.get(id) ?? 0;
        used.set(id, count + 1);
        if (count > 0) id = `${id}-${count + 1}`;

        if (!h.id) h.id = id;

        return { id, text, level };
      })
      .filter(Boolean) as TocItem[];

    setItems(toc);
  }, [contentSelector]);

  useEffect(() => {
    if (!items.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // pega o heading mais “visível” no topo
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (a.boundingClientRect.top > b.boundingClientRect.top ? 1 : -1));

        if (visible[0]?.target?.id) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: [0.1, 1.0] }
    );

    items.forEach((it) => {
      const el = document.getElementById(it.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  if (!items.length) return emptyState;

  return (
    <nav aria-label="Tabela de conteúdos">
      <ul className="space-y-2">
        {items.map((it) => (
          <li key={it.id} className={it.level === 3 ? "ml-3" : ""}>
            <a
              href={`#${it.id}`}
              className={`block rounded-xl px-3 py-2 text-sm transition ${
                activeId === it.id
                  ? "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200"
                  : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              {it.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
