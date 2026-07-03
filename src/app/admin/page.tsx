import Link from "next/link";
import { requireAdminMasterReady } from "../../lib/admin-master-auth";

export const dynamic = "force-dynamic";

export default async function AdminHome({
  searchParams,
}: {
  searchParams?: Promise<{ mfa_setup?: string }>;
}) {
  await requireAdminMasterReady("/admin");
  const sp = (await searchParams) ?? {};

  return (
    <main className="mx-auto max-w-5xl">
      {sp.mfa_setup === "ok" ? (
        <div className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
          MFA ativado com sucesso para este admin master.
        </div>
      ) : null}
      <section className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
          Painel interno
        </p>

        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
          Central administrativa
        </h1>

        <p className="mt-3 max-w-3xl text-slate-600">
          Área restrita para operações internas do Reciclativa, incluindo checklists,
          aprovações, auditorias e rotinas de apoio.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <Link
            href="/admin/tools"
            className="rounded-2xl border border-black/10 bg-slate-50 p-5 transition hover:bg-slate-100"
          >
            <h2 className="text-lg font-semibold text-slate-900">Ferramentas internas</h2>
            <p className="mt-2 text-sm text-slate-600">
              Checklists, páginas de apoio, auditorias e utilitários administrativos.
            </p>
          </Link>

          <Link
            href="/admin/profissionais"
            className="rounded-2xl border border-black/10 bg-slate-50 p-5 transition hover:bg-slate-100"
          >
            <h2 className="text-lg font-semibold text-slate-900">Aprovar profissionais</h2>
            <p className="mt-2 text-sm text-slate-600">
              Revisar e aprovar cadastros pendentes do diretório.
            </p>
          </Link>

          <Link
            href="/admin/cadastros-empresas"
            className="rounded-2xl border border-black/10 bg-slate-50 p-5 transition hover:bg-slate-100"
          >
            <h2 className="text-lg font-semibold text-slate-900">Cadastros de empresas</h2>
            <p className="mt-2 text-sm text-slate-600">
              Gerenciar solicitações enviadas para acesso à Reciclativa Gestão.
            </p>
          </Link>

          <Link
            href="/admin/radar"
            className="rounded-2xl border border-black/10 bg-slate-50 p-5 transition hover:bg-slate-100"
          >
            <h2 className="text-lg font-semibold text-slate-900">Radar Ambiental</h2>
            <p className="mt-2 text-sm text-slate-600">
              Aprovar, rejeitar e publicar matérias do clipping editorial.
            </p>
          </Link>
        </div>
      </section>
    </main>
  );
}
