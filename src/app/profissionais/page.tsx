// src/app/profissionais/page.tsx
import Link from "next/link";
import { uniqueUFs } from "@/content/profissionais";

export default function ProfissionaisHubPage() {
  const ufs = uniqueUFs();

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:py-12">
      <section className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
          Diretório · Profissionais
        </p>

        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">
          Profissionais e serviços por estado e cidade
        </h1>

        <p className="mt-4 max-w-3xl text-base text-muted-foreground sm:text-lg">
          Encontre coleta, consultoria, educação ambiental e serviços ligados à
          reciclagem e sustentabilidade. Comece escolhendo o estado.
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {ufs.map((uf) => (
            <Link
              key={uf}
              href={`/profissionais/${uf.toLowerCase()}`}
              className="rounded-2xl border border-black/5 bg-white px-4 py-4 text-sm font-semibold shadow-sm hover:bg-black/5"
            >
              {uf}
            </Link>
          ))}
        </div>

        {ufs.length === 0 ? (
          <p className="mt-6 text-sm text-muted-foreground">
            Ainda não há profissionais cadastrados. Você pode adicionar itens em{" "}
            <code>src/content/profissionais.ts</code>.
          </p>
        ) : null}
      </section>
    </main>
  );
}
