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
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 z-40 bg-black/20 md:hidden"
            aria-hidden
            onClick={() => setOpen(false)}
          />

          {/* Painel */}
          <div className="md:hidden">
            <div
              ref={panelRef}
              className="fixed left-4 right-4 top-[84px] z-50 overflow-hidden rounded-2xl border border-emerald-200/80 bg-white/95 shadow-lg backdrop-blur"
            >
              {/* Cabeçalho do painel */}
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

              {/* Links */}
              <div className="p-2">
                {nav.map((i) => {
                  const active = pathname === i.href;

                  const icon =
                    i.href === "/reciclagem" ? (
                      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                        <path
                          fill="currentColor"
                          d="M12 2a9 9 0 0 1 9 9h-2a7 7 0 0 0-7-7V2Zm-1 3.1 3.2 3.2-1.4 1.4-1-1v4.6h-2V8.7l-1 1-1.4-1.4L11 5.1ZM4 13a7 7 0 0 0 7 7v2a9 9 0 0 1-9-9h2Zm8.8 3.3 1-1 1.4 1.4-3.2 3.2-3.2-3.2 1.4-1.4 1 1V11h2v4.3Z"
                        />
                      </svg>
                    ) : i.href === "/sustentabilidade" ? (
                      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                        <path
                          fill="currentColor"
                          d="M12 2c4.4 0 8 3.6 8 8 0 6-8 12-8 12S4 16 4 10c0-4.4 3.6-8 8-8Zm0 2a6 6 0 0 0-6 6c0 4.4 5 8.9 6 9.7 1-.8 6-5.3 6-9.7a6 6 0 0 0-6-6Zm-2.5 7.2c1.2-1.2 2.9-1.9 4.7-2-1 1.8-2.5 3.2-4.3 4.2-.2.1-.4.3-.5.5-.2.5-.1 1 .2 1.4.3.4.8.6 1.3.5 2.1-.5 3.8-1.6 5.1-3.2-.3 3-2.9 5.4-6 5.4-3.3 0-6-2.7-6-6 0-1.4.5-2.8 1.5-3.8Z"
                        />
                      </svg>
                    ) : i.href === "/guias" ? (
                      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                        <path
                          fill="currentColor"
                          d="M6 2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm0 2v16h12V4H6Zm2 2h8v2H8V6Zm0 4h8v2H8v-2Zm0 4h6v2H8v-2Z"
                        />
                      </svg>
                    ) : i.href === "/blog" ? (
                      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                        <path
                          fill="currentColor"
                          d="M6 3h9l3 3v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm8 1.5V7h2.5L14 4.5ZM8 10h8v2H8v-2Zm0 4h8v2H8v-2Zm0 4h6v2H8v-2Z"
                        />
                      </svg>
                    ) : i.href === "/diretorio" ? (
                      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                        <path
                          fill="currentColor"
                          d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4 0-7 2-7 4.5V20h14v-1.5C19 16 16 14 12 14Z"
                        />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                        <path
                          fill="currentColor"
                          d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm1 17.9V20h-2v-.1a8 8 0 0 1-6.9-6.9H4v-2h.1A8 8 0 0 1 11 4.1V4h2v.1a8 8 0 0 1 6.9 6.9H20v2h-.1A8 8 0 0 1 13 19.9Z"
                        />
                      </svg>
                    );

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
                      <span className={cn("text-slate-500", active && "text-emerald-700")}>
                        {icon}
                      </span>
                      <span className="flex-1">{i.label}</span>

                      {/* chevron discreto */}
                      <svg viewBox="0 0 24 24" className="h-4 w-4 text-slate-400" aria-hidden="true">
                        <path fill="currentColor" d="M9 6l6 6-6 6-1.4-1.4L12.2 12 7.6 7.4 9 6Z" />
                      </svg>
                    </Link>
                  );
                })}
              </div>

              {/* CTA */}
              <div className="border-t border-slate-200 p-3">
                <Link
                  href="/guias"
                  className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-emerald-500"
                >
                  Ver guias
                  <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                    <path fill="currentColor" d="M10 6l6 6-6 6-1.4-1.4L13.2 12 8.6 7.4 10 6Z" />
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
