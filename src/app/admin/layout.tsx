import type { Metadata } from "next";
import Link from "next/link";
import { getCurrentAdminMasterSession } from "../../lib/admin-master-auth";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

function AdminNavLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-lg border border-black/10 bg-white px-3 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
    >
      {label}
    </Link>
  );
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getCurrentAdminMasterSession();

  if (!session) {
    return <div className="min-h-screen bg-slate-50 text-slate-900">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8 rounded-2xl border border-black/10 bg-white px-4 py-4 shadow-sm sm:px-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
                Admin master • Reciclativa
              </p>
              <p className="mt-1 text-sm text-slate-600">
                Área interna restrita para operação, aprovações e ferramentas administrativas.
              </p>
              <p className="mt-2 text-xs text-slate-500">
                Sessão: {session.email}
              </p>
            </div>

            <Link
              href="/admin/logout"
              className="inline-flex items-center rounded-lg border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
            >
              Sair
            </Link>
          </div>

          <nav className="mt-4 flex flex-wrap gap-2">
            <AdminNavLink href="/admin" label="Home" />
            <AdminNavLink href="/admin/tools" label="Ferramentas" />
            <AdminNavLink href="/admin/profissionais" label="Profissionais" />
            <AdminNavLink href="/admin/cadastros-empresas" label="Cadastros de empresas" />
            <AdminNavLink href="/admin/change-password" label="Alterar senha" />
            <AdminNavLink href="/admin/mfa/recovery/regenerate" label="Recovery codes" />
            <AdminNavLink href="/admin/tools/adsense-checklist" label="Checklist AdSense" />
          </nav>
        </header>

        {children}
      </div>
    </div>
  );
}
