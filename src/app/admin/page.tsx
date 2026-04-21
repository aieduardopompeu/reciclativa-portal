import Link from "next/link";

export const dynamic = "force-dynamic";

export default function AdminHome() {
  return (
    <main className="mx-auto max-w-5xl">
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
        </div>
      </section>
    </main>
  );
}
