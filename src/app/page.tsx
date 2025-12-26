import Link from "next/link";

function Section({
  title,
  desc,
  items,
}: {
  title: string;
  desc: string;
  items: { href: string; label: string; note?: string }[];
}) {
  return (
    <section className="mt-10">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="mt-1 text-sm text-slate-600">{desc}</p>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {items.map((i) => (
          <Link
            key={i.href}
            href={i.href}
            className="rounded-xl border border-slate-200 p-4 hover:bg-slate-50"
          >
            <div className="font-medium">{i.label}</div>
            {i.note ? (
              <div className="mt-1 text-sm text-slate-600">{i.note}</div>
            ) : null}
          </Link>
        ))}
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="rounded-2xl border border-slate-200 bg-white p-8">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Reciclagem, Sustentabilidade e Economia Circular no Brasil
        </h1>
        <p className="mt-3 max-w-2xl text-slate-600">
          Guias práticos, educação ambiental e soluções para pessoas e empresas.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/guias"
            className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
          >
            Ver Guias Práticos
          </Link>
          <Link
            href="/anuncie"
            className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-50"
          >
            Anuncie na Reciclativa
          </Link>
        </div>
      </div>

      <Section
        title="Guias essenciais"
        desc="Comece pelo conteúdo que já está publicado."
        items={[
          {
            href: "/reciclagem/o-que-pode-ser-reciclado",
            label: "O que pode e o que não pode ser reciclado",
            note: "Lista prática + dúvidas comuns respondidas.",
          },
          {
            href: "/reciclagem",
            label: "Ver a categoria Reciclagem",
            note: "Acesse todos os artigos publicados.",
          },
        ]}
      />

      <Section
        title="Reciclagem na prática"
        desc="Atalhos úteis para navegação."
        items={[
          {
            href: "/reciclagem",
            label: "Ver tudo em Reciclagem",
            note: "Artigos e guias práticos.",
          },
          {
            href: "/guias",
            label: "Ver todos os Guias",
            note: "Evergreen para consultar sempre.",
          },
        ]}
      />

      <Section
        title="Sustentabilidade & ESG"
        desc="Esta seção será preenchida após os próximos evergreen."
        items={[
          {
            href: "/sustentabilidade",
            label: "Ver tudo em Sustentabilidade",
            note: "Conceitos e aplicação no dia a dia e nas empresas.",
          },
          {
            href: "/blog",
            label: "Ir para o Blog",
            note: "Conteúdo complementar e atualizações.",
          },
        ]}
      />
    </main>
  );
}
