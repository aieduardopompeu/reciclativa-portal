import Link from "next/link";
import { canAccessModule } from "@/lib/saas/permissions";
import { saasNavigation } from "@/lib/saas/navigation";
import type { SaaSSessionUser } from "@/types/saas";

export default function SaaSShell({
  user,
  children,
}: {
  user: SaaSSessionUser;
  children: React.ReactNode;
}) {
  const navItems = saasNavigation.filter((item) =>
    canAccessModule(user.role, item.module),
  );

  return (
    <div className="min-h-screen bg-[#f6faf7] text-slate-900">
      <div className="mx-auto flex w-full max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <aside className="hidden w-72 shrink-0 lg:block">
          <div className="sticky top-6 rounded-3xl border border-black/10 bg-white p-4 shadow-sm">
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

            <nav className="mt-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block rounded-2xl border border-black/5 bg-slate-50 px-4 py-3 transition hover:bg-slate-100"
                >
                  <div className="text-sm font-semibold text-slate-900">{item.label}</div>
                  <div className="mt-1 text-xs text-slate-600">{item.description}</div>
                </Link>
              ))}
            </nav>
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

              <div className="rounded-2xl bg-slate-50 px-4 py-2 text-sm text-slate-700">
                {user.email}
              </div>
            </div>
          </header>

          <main>{children}</main>
        </div>
      </div>
    </div>
  );
}
