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
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);

  // Fecha ao trocar de rota
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Fecha com ESC
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Fecha ao clicar fora do painel
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

        {/* Desktop nav */}
        <nav className="hidden gap-5 md:flex">
          {nav.map((i) => (
            <Link
              key={i.href}
              href={i.href}
              className="text-sm text-slate-700 transition hover:text-slate-950"
            >
              {i.label}
            </Link>
          ))}
        </nav>

        {/* Direita: CTA desktop + botão menu mobile */}
        <div className="flex items-center gap-2">
          {/* CTA desktop */}
          <Link
            href="/guias"
            className={cn(
              "hidden md:inline-flex rounded-md border border-slate-300 bg-white/70 px-3 py-1.5",
              "text-sm font-medium text-slate-900 transition hover:bg-white"
            )}
          >
            Ver guias
          </Link>

          {/* Botão menu (mobile) */}
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

      {/* Dropdown mobile (no lugar dos chips) */}
      {open ? (
        <div className="md:hidden px-4 pb-4">
          <div
            ref={panelRef}
            className="rounded-xl border border-emerald-200/80 bg-emerald-50/90 shadow-sm backdrop-blur"
          >
            <div className="p-2">
              {nav.map((i) => {
                const active = pathname === i.href;
                return (
                  <Link
                    key={i.href}
                    href={i.href}
                    className={cn(
                      "block rounded-lg px-3 py-2 text-sm transition",
                      active
                        ? "bg-white/70 text-emerald-900"
                        : "text-slate-800 hover:bg-white/60"
                    )}
                  >
                    {i.label}
                  </Link>
                );
              })}
            </div>

            <div className="border-t border-emerald-200/70 p-2">
              <Link
                href="/guias"
                className="block rounded-lg bg-emerald-600 px-3 py-2 text-center text-sm font-semibold text-white transition hover:bg-emerald-500"
              >
                Ver guias
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
