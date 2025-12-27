"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/reciclagem", label: "Reciclagem" },
  { href: "/sustentabilidade", label: "Sustentabilidade" },
  { href: "/guias", label: "Guias" },
  { href: "/blog", label: "Blog" },
  { href: "/diretorio", label: "Diretório" },
  { href: "/anuncie", label: "Anuncie" },
];

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function isActiveRoute(pathname: string, href: string) {
  if (!pathname) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        fill="currentColor"
        d="M4 6.5h16v1.8H4V6.5Zm0 4.6h16v1.8H4v-1.8Zm0 4.6h16v1.8H4v-1.8Z"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        fill="currentColor"
        d="M18.3 5.7 12 12l6.3 6.3-1.3 1.3L10.7 13.3 4.4 19.6 3.1 18.3 9.4 12 3.1 5.7 4.4 4.4l6.3 6.3 6.3-6.3 1.3 1.3Z"
      />
    </svg>
  );
}

export function Header() {
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    const onMouseDown = (e: MouseEvent) => {
      if (!open) return;
      const el = panelRef.current;
      if (!el) return;
      if (e.target instanceof Node && !el.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-emerald-200/80 bg-emerald-50/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Reciclativa"
            width={140}
            height={36}
            priority
          />
        </Link>

        {/* Desktop nav + ativo */}
        <nav className="hidden gap-2 md:flex">
          {nav.map((i) => {
            const active = isActiveRoute(pathname, i.href);
            return (
              <Link
                key={i.href}
                href={i.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-md px-3 py-2 text-sm transition",
                  active
                    ? "bg-white/70 text-emerald-900"
                    : "text-slate-700 hover:bg-white/50 hover:text-slate-950"
                )}
              >
                {i.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/guias"
            className={cn(
              "hidden md:inline-flex rounded-md border border-slate-300 bg-white/70 px-3 py-1.5",
              "text-sm font-medium text-slate-900 transition hover:bg-white"
            )}
          >
            Ver guias
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className={cn(
              "md:hidden inline-flex items-center justify-center rounded-md border border-slate-300 bg-white/70 px-3 py-1.5",
              "text-sm font-medium text-slate-900 transition hover:bg-white"
            )}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
          >
            <span className="mr-2">{open ? "Fechar" : "Menu"}</span>
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile menu final (como ficou ótimo) */}
      {open ? (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/20 md:hidden"
            aria-hidden
            onClick={() => setOpen(false)}
          />

          <div className="md:hidden">
            <div
              ref={panelRef}
              className="fixed left-4 right-4 top-[84px] z-50 overflow-hidden rounded-2xl border border-emerald-200/80 bg-white/95 shadow-lg backdrop-blur"
            >
              <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
                <p className="text-sm font-semibold text-slate-900">Menu</p>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  Fechar
                </button>
              </div>

              <div className="p-2">
                {nav.map((i) => {
                  const active = isActiveRoute(pathname, i.href);

                  return (
                    <Link
                      key={i.href}
                      href={i.href}
                      className={cn(
                        "flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition",
                        active
                          ? "bg-emerald-50 text-emerald-900"
                          : "text-slate-800 hover:bg-slate-50"
                      )}
                    >
                      <span className="flex-1">{i.label}</span>
                      <svg
                        viewBox="0 0 24 24"
                        className="h-4 w-4 text-slate-400"
                        aria-hidden="true"
                      >
                        <path
                          fill="currentColor"
                          d="M9 6l6 6-6 6-1.4-1.4L12.2 12 7.6 7.4 9 6Z"
                        />
                      </svg>
                    </Link>
                  );
                })}
              </div>

              <div className="border-t border-slate-200 p-3">
                <Link
                  href="/guias"
                  className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-emerald-500"
                >
                  Ver guias
                  <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                    <path
                      fill="currentColor"
                      d="M10 6l6 6-6 6-1.4-1.4L13.2 12 8.6 7.4 10 6Z"
                    />
                  </svg>
                </Link>

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Fechar menu
                </button>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </header>
  );
}
