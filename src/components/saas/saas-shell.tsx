"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { canAccessModule } from "@/lib/saas/permissions";
import { saasNavigation, saasNavGroups, type SaaSNavGroupKey, type SaaSNavItem } from "@/lib/saas/navigation";
import type { SaaSSessionUser } from "@/types/saas";

function isItemActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className={`h-4 w-4 text-slate-500 transition-transform ${open ? "rotate-180" : "rotate-0"}`}
    >
      <path d="M5 7.5 10 12.5 15 7.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SidebarNav({ items }: { items: SaaSNavItem[] }) {
  const pathname = usePathname();

  const groupedItems = useMemo(
    () =>
      saasNavGroups
        .map((group) => ({
          ...group,
          items: items.filter((item) => item.group === group.key),
        }))
        .filter((group) => group.items.length > 0),
    [items],
  );

  const activeGroup =
    groupedItems.find((group) => group.items.some((item) => isItemActive(pathname, item.href)))?.key ??
    groupedItems[0]?.key ??
    null;

  const [openGroup, setOpenGroup] = useState<SaaSNavGroupKey | null>(activeGroup);

  return (
    <nav className="mt-4 space-y-3">
      {groupedItems.map((group) => {
        const isOpen = openGroup === group.key;
        const hasActiveItem = group.items.some((item) => isItemActive(pathname, item.href));

        return (
          <div key={group.key} className="rounded-2xl border border-black/5 bg-slate-50/80">
            <button
              type="button"
              onClick={() => setOpenGroup((current) => (current === group.key ? null : group.key))}
              className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left transition ${
                hasActiveItem ? "bg-emerald-50 text-emerald-800" : "hover:bg-slate-100"
              }`}
              aria-expanded={isOpen}
            >
              <span className="text-sm font-semibold uppercase tracking-[0.14em]">
                {group.label}
              </span>
              <Chevron open={isOpen} />
            </button>

            {isOpen ? (
              <div className="space-y-2 border-t border-black/5 px-3 py-3">
                {group.items.map((item) => {
                  const active = isItemActive(pathname, item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      prefetch={false}
                      className={`block rounded-2xl border px-4 py-3 transition ${
                        active
                          ? "border-emerald-200 bg-white shadow-sm"
                          : "border-transparent bg-white/70 hover:border-black/5 hover:bg-white"
                      }`}
                    >
                      <div className="text-sm font-semibold text-slate-900">{item.label}</div>
                      <div className="mt-1 text-xs text-slate-600">{item.description}</div>
                    </Link>
                  );
                })}
              </div>
            ) : null}
          </div>
        );
      })}
    </nav>
  );
}

export default function SaaSShell({
  user,
  children,
}: {
  user: SaaSSessionUser;
  children: React.ReactNode;
}) {
  const navItems = saasNavigation.filter((item) => canAccessModule(user.role, item.module));

  return (
    <div className="min-h-screen bg-[#f6faf7] text-slate-900">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:flex-row lg:px-8">
        <aside className="w-full shrink-0 lg:sticky lg:top-6 lg:block lg:h-fit lg:w-72">
          <div className="rounded-3xl border border-black/10 bg-white p-4 shadow-sm">
            <div className="border-b border-black/5 pb-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
                Reciclativa Gestão
              </p>
              <h2 className="mt-2 text-lg font-bold text-slate-900">
                {user.organization.tradeName ?? user.organization.legalName}
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                {user.name} • {user.role}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Unidade: {user.unit?.name ?? "Não definida"}
              </p>
            </div>

            <SidebarNav items={navItems} />
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <header className="mb-6 rounded-3xl border border-black/10 bg-white px-5 py-4 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
                  Área SaaS
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  Estrutura inicial para operação multiempresa da Reciclativa Gestão.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-slate-50 px-4 py-2 text-sm text-slate-700">
                  {user.email}
                </div>
                <Link
                  href="/app/logout"
                  prefetch={false}
                  className="rounded-2xl border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50"
                >
                  Sair
                </Link>
              </div>
            </div>
          </header>

          <main>{children}</main>
        </div>
      </div>
    </div>
  );
}
