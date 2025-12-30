// src/components/blog/BlockRenderer.tsx
import React from "react";
import type { BlogBlock } from "../../content/blog/posts";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function BlockRenderer({ blocks }: { blocks: BlogBlock[] }) {
  return (
    <div className="max-w-none">
      {blocks.map((block, i) => {
        if (block.type === "section") {
          return (
            <section key={i} className="mt-10">
              <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
                {block.title}
              </h2>

              <div className="mt-4 space-y-4">
                {block.body.map((b, j) => {
                  if (b.type === "p") {
                    return (
                      <p key={j} className="text-base leading-relaxed text-slate-700">
                        {b.text}
                      </p>
                    );
                  }
                  if (b.type === "h3") {
                    return (
                      <h3
                        key={j}
                        className="mt-6 text-lg font-bold tracking-tight text-slate-900"
                      >
                        {b.text}
                      </h3>
                    );
                  }
                  if (b.type === "list") {
                    return (
                      <ul key={j} className="ml-5 list-disc space-y-1 text-slate-700">
                        {b.items.map((item, k) => (
                          <li key={k} className="leading-relaxed">
                            {item}
                          </li>
                        ))}
                      </ul>
                    );
                  }
                  return null;
                })}
              </div>
            </section>
          );
        }

        if (block.type === "callout") {
          const ring =
            block.variant === "tip"
              ? "ring-emerald-200"
              : block.variant === "warning"
              ? "ring-amber-200"
              : "ring-sky-200";

          const titleColor =
            block.variant === "tip"
              ? "text-emerald-800"
              : block.variant === "warning"
              ? "text-amber-800"
              : "text-sky-800";

          const bg =
            block.variant === "tip"
              ? "bg-emerald-50"
              : block.variant === "warning"
              ? "bg-amber-50"
              : "bg-sky-50";

          return (
            <div
              key={i}
              className={cn("mt-8 rounded-2xl p-5 ring-1", ring, bg)}
            >
              <div className={cn("text-sm font-extrabold tracking-tight", titleColor)}>
                {block.title}
              </div>
              <div className="mt-2 text-sm leading-relaxed text-slate-700">{block.text}</div>

              {block.items?.length ? (
                <ul className="mt-3 ml-5 list-disc space-y-1 text-sm text-slate-700">
                  {block.items.map((it, idx) => (
                    <li key={idx}>{it}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          );
        }

        if (block.type === "faq") {
          return (
            <section key={i} className="mt-10">
              <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
                {block.title}
              </h2>

              <div className="mt-4 space-y-3">
                {block.items.map((qa, j) => (
                  <details
                    key={j}
                    className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                  >
                    <summary className="cursor-pointer list-none text-sm font-bold text-slate-900">
                      {qa.q}
                      <span className="ml-2 text-slate-400 group-open:hidden">+</span>
                      <span className="ml-2 hidden text-slate-400 group-open:inline">–</span>
                    </summary>
                    <div className="mt-3 text-sm leading-relaxed text-slate-700">{qa.a}</div>
                  </details>
                ))}
              </div>
            </section>
          );
        }

        return null;
      })}
    </div>
  );
}
