import type { Metadata } from "next";
import Link from "next/link";

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
      className="rounded-lg border border-black/10 bg-white px-3 py-2 text-sm font-semibold hover:bg-slate-50"
    >
      {label}
    </Link>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
              Admin • Reciclativa
            </div>
            <div className="text-2xl font-bold">Painel interno</div>

            <div className="mt-3 flex flex-wrap gap-2">
              <AdminNavLink href="/admin" label="Home" />
              <AdminNavLink href="/admin/tools" label="Ferramentas" />
              <AdminNavLink href="/admin/profissionais" label="Profissionais" />
              <AdminNavLink
                href="/admin/tools/adsense-checklist"
                label="Checklist AdSense"
              />
            </div>
          </div>

          <Link
            href="/admin/logout"
            className="rounded-lg border border-black/10 bg-white px-4 py-2 text-sm font-semibold hover:bg-slate-50"
          >
            Sair
          </Link>
        </div>

        {children}
      </div>
    </div>
  );
}
