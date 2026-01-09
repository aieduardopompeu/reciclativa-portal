export const dynamic = "force-dynamic";

export default function AdminHome() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-3xl font-bold">Painel Interno</h1>
      <p className="mt-2 text-slate-600">
        Área restrita para operações internas do Reciclativa (checklists, auditorias, aprovações e rotinas).
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <a
          href="/admin/tools"
          className="rounded-2xl border border-black/10 bg-white p-5 hover:bg-slate-50"
        >
          <h2 className="text-lg font-semibold">Ferramentas internas</h2>
          <p className="mt-1 text-sm text-slate-600">
            Checklists, páginas de aprovação, auditorias, rotinas e utilitários.
          </p>
        </a>

        <a
          href="/admin/profissionais"
          className="rounded-2xl border border-black/10 bg-white p-5 hover:bg-slate-50"
        >
          <h2 className="text-lg font-semibold">Aprovar profissionais</h2>
          <p className="mt-1 text-sm text-slate-600">
            Revisar e aprovar cadastros pendentes do diretório.
          </p>
        </a>
      </div>
    </main>
  );
}
