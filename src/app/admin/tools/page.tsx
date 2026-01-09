export const dynamic = "force-dynamic";

const tools = [
  {
    title: "Checklist AdSense",
    desc: "Acompanhar P0/P1/P2 para aprovação e manutenção de qualidade.",
    href: "/admin/tools/adsense-checklist",
    tag: "Checklist",
  },
  // Futuro:
  // { title: "Aprovação AdSense (status)", desc: "Checklist + evidências + links", href: "/admin/tools/adsense-approval", tag: "Operação" },
  // { title: "Checklist SEO", desc: "Auditoria de indexação e conteúdo", href: "/admin/tools/seo-checklist", tag: "Checklist" },
];

export default function ToolsHome() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Ferramentas internas</h1>
          <p className="mt-2 text-slate-600">
            Central de checklists e funções restritas.
          </p>
        </div>

        <a
          href="/admin"
          className="rounded-lg border border-black/10 bg-white px-4 py-2 text-sm font-semibold hover:bg-slate-50"
        >
          Voltar
        </a>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {tools.map((t) => (
          <a
            key={t.href}
            href={t.href}
            className="rounded-2xl border border-black/10 bg-white p-5 hover:bg-slate-50"
          >
            <div className="flex items-center gap-2">
              <span className="rounded-full border border-black/10 bg-slate-50 px-2 py-0.5 text-xs font-semibold text-slate-700">
                {t.tag}
              </span>
            </div>
            <h2 className="mt-2 text-lg font-semibold">{t.title}</h2>
            <p className="mt-1 text-sm text-slate-600">{t.desc}</p>
          </a>
        ))}
      </div>
    </main>
  );
}
