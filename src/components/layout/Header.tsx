"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

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

/* Ícones outline (minimalistas, consistentes) */
function IconRecycleOutline() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        d="M12 3.5l2.2 3.8M9.8 4.6l-2.9 5h5.3M18.8 12.2l2 3.4-2.6 4.5H12.5M18.1 12.2h-5.6l1.6 2.7M6 11.7l-2 3.5 2.6 4.5h5.2M5.9 12.4l5.4-1-1.5 2.6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconLeafOutline() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        d="M20 4c-7 .5-11.8 3.6-14.3 7.6-1.5 2.4-2 5.1-1.6 7.8 2.7.4 5.4-.1 7.8-1.6C14.9 15.8 18 11 18.5 4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 16l7-7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconBookOutline() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        d="M7 4.5h10a2 2 0 0 1 2 2V20H8a3 3 0 0 0-3 3V6.5a2 2 0 0 1 2-2Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 20h11"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconBlogOutline() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        d="M7 4.5h10a2 2 0 0 1 2 2V18l-4 4H7a2 2 0 0 1-2-2V6.5a2 2 0 0 1 2-2Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 22v-4h4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 10h7M8.5 13.5H14"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconUsersOutline() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        d="M9 12a3 3 0 1 0-3-3 3 3 0 0 0 3 3Zm0 0c-3 0-5.5 1.7-5.5 3.8V19h11v-3.2C14.5 13.7 12 12 9 12Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.5 11.5a2.6 2.6 0 1 0-2.6-2.6 2.6 2.6 0 0 0 2.6 2.6Zm0 0c2.4 0 4.5 1.2 4.5 2.8V19h-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconFolderOutline() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        d="M4.5 6.5h5l2 2H19.5a2 2 0 0 1 2 2V18a2.5 2.5 0 0 1-2.5 2.5H6.5A2.5 2.5 0 0 1 4 18V8.5a2 2 0 0 1 2-2Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type NavItem = { href: string; label: string; icon: React.ReactNode };

const nav: NavItem[] = [
  { href: "/reciclagem", label: "Reciclagem", icon: <IconRecycleOutline /> },
  { href: "/sustentabilidade", label: "Sustentabilidade", icon: <IconLeafOutline /> },
  { href: "/guias", label: "Guias", icon: <IconBookOutline /> },
  { href: "/blog", label: "Blog", icon: <IconBlogOutline /> },
  { href: "/profissionais", label: "Profissionais", icon: <IconUsersOutline /> },
  { href: "/diretorio", label: "Diretório", icon: <IconFolderOutline /> },
];

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
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          aria-label="Reciclativa — página inicial"
          className="flex items-center gap-3"
        >
          {/* Removido priority para não competir com o preload do HERO (LCP). */}
          <Image src="/logo.png" alt="Reciclativa" width={140} height={36} />
        </Link>

        {/* Desktop nav (limpo; sem ícones) */}
        <nav aria-label="Navegação principal" className="hidden gap-2 md:flex">
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
          {/* Botão destacado (desktop) */}
          <Link
            href="/anuncie"
            className={cn(
              "hidden md:inline-flex items-center justify-center rounded-full px-4 py-2",
              "text-sm font-semibold text-white",
              "bg-emerald-700 shadow-sm transition hover:bg-emerald-800 hover:shadow",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
            )}
          >
            Anuncie
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

      {/* Mobile menu */}
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
              className="fixed left-4 right-4 top-[84px] z-50 overflow-hidden rounded-2xl border border-emerald-200/80 bg-white/95 shadow-lg backdrop-blur sm:left-6 sm:right-6"
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
                        "relative flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition",
                        active
                          ? "bg-emerald-50 text-emerald-900"
                          : "text-slate-800 hover:bg-slate-50"
                      )}
                    >
                      {active ? (
                        <span
                          className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-emerald-600"
                          aria-hidden="true"
                        />
                      ) : null}

                      <span
                        className={cn(
                          "shrink-0",
                          active ? "text-emerald-700" : "text-slate-500"
                        )}
                      >
                        {i.icon}
                      </span>

                      <span className="flex-1">{i.label}</span>

                      {active ? (
                        <span
                          className="h-2 w-2 rounded-full bg-emerald-600"
                          aria-label="Página atual"
                        />
                      ) : (
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
                      )}
                    </Link>
                  );
                })}
              </div>

              <div className="border-t border-slate-200 p-3">
                <Link
                  href="/anuncie"
                  className="flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-3 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800"
                >
                  Anuncie
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
