// src/app/profissionais/[uf]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  citiesByUF,
  getByUF,
  normalizeUF,
  normalizeCity,
} from "@/content/profissionais";

type PageProps = { params: { uf: string } };

// ✅ força runtime (não depende de build estático)
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function ProfissionaisUFPage({ params }: PageProps) {
  const uf = normalizeUF(params.uf);
  const list = getByUF(uf);

  if (!list.length) return notFound();

  const cities = citiesByUF(uf);

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:py-12">
      <section className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
          Profissionais · {uf}
        </p>

        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">
          Serviços em {uf}
        </h1>

        <p className="mt-4 max-w-3xl text-base text-muted-foreground sm:text-lg">
          Selecione uma cidade ou veja todos os profissionais do estado.
        </p>

        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            href="/profissionais"
            className="rounded-md border border-black/5 px-4 py-2 text-sm font-semibold hover:bg-black/5"
          >
            Trocar estado
          </Link>
        </div>
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-3 lg:items-start">
        <aside className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold tracking-tight">Cidades</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Escolha uma cidade para filtrar.
          </p>

          <div className="mt-5 space-y-2">
            {cities.map((city) => {
              const citySlug = normalizeCity(city);
              return (
                <Link
                  key={citySlug}
                  href={`/profissionais/${uf.toLowerCase()}/${citySlug}`}
                  className="flex items-center justify-between rounded-xl border border-black/5 px-4 py-3 text-sm font-semibold hover:bg-black/5"
                >
                  {city} <span aria-hidden>→</span>
                </Link>
              );
            })}
          </div>
        </aside>

        <div className="lg:col-span-2">
          <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
            Todos no estado ({list.length})
          </h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {list.map((p) => (
              <div
                key={p.id}
                className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
                  {p.city}
                </p>
                <h3 className="mt-2 text-lg font-semibold">{p.name}</h3>
                <p className="mt-1 text-sm font-semibold text-slate-900">
                  {p.service}
                </p>
                <p className="mt-3 text-sm text-muted-foreground">
                  {p.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {p.whatsapp ? (
                    <a
                      className="rounded-md border border-black/5 px-3 py-2 text-sm font-semibold hover:bg-black/5"
                      href={`https://wa.me/${p.whatsapp}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      WhatsApp
                    </a>
                  ) : null}
                  {p.email ? (
                    <a
                      className="rounded-md border border-black/5 px-3 py-2 text-sm font-semibold hover:bg-black/5"
                      href={`mailto:${p.email}`}
                    >
                      E-mail
                    </a>
                  ) : null}
                  {p.website ? (
                    <a
                      className="rounded-md border border-black/5 px-3 py-2 text-sm font-semibold hover:bg-black/5"
                      href={p.website}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Site
                    </a>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
