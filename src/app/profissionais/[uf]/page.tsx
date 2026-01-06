// src/app/profissionais/[uf]/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import AdCtaProfissionaisCard from "@/components/AdCtaProfissionaisCard";
import { citiesByUF, getByUF, normalizeUF, normalizeCity } from "@/content/profissionais";

const STATES: Record<string, string> = {
  ac: "Acre",
  al: "Alagoas",
  ap: "Amapá",
  am: "Amazonas",
  ba: "Bahia",
  ce: "Ceará",
  df: "Distrito Federal",
  es: "Espírito Santo",
  go: "Goiás",
  ma: "Maranhão",
  mt: "Mato Grosso",
  ms: "Mato Grosso do Sul",
  mg: "Minas Gerais",
  pa: "Pará",
  pb: "Paraíba",
  pr: "Paraná",
  pe: "Pernambuco",
  pi: "Piauí",
  rj: "Rio de Janeiro",
  rn: "Rio Grande do Norte",
  rs: "Rio Grande do Sul",
  ro: "Rondônia",
  rr: "Roraima",
  sc: "Santa Catarina",
  sp: "São Paulo",
  se: "Sergipe",
  to: "Tocantins",
};

type PageProps = {
  params: Promise<{ uf: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { uf: ufParam } = await params;

  // ✅ garante compatibilidade com STATES (chaves minúsculas)
  const uf = normalizeUF(ufParam).toLowerCase();
  const name = STATES[uf] ?? "Estado";
  const UF = uf.toUpperCase();

  return {
    title: `${name} (${UF}) | Profissionais | Reciclativa`,
    description: `Encontre profissionais e serviços ligados à reciclagem e sustentabilidade em ${name} (${UF}), por cidade e categoria.`,
    alternates: { canonical: `/profissionais/${uf}` },
    openGraph: {
      title: `${name} (${UF}) | Profissionais | Reciclativa`,
      description: `Encontre profissionais e serviços ligados à reciclagem e sustentabilidade em ${name} (${UF}), por cidade e categoria.`,
      url: `/profissionais/${uf}`,
      type: "website",
    },
  };
}

function normalizeText(s: string) {
  return (s ?? "")
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function readQueryQ(v: string | string[] | undefined) {
  if (!v) return "";
  if (Array.isArray(v)) return (v[0] ?? "").toString();
  return v.toString();
}

export default async function ProfissionaisUFPage({ params, searchParams }: PageProps) {
  const { uf: ufParam } = await params;
  const sp = searchParams ? await searchParams : undefined;

  // ✅ garante compatibilidade com STATES (chaves minúsculas)
  const uf = normalizeUF(ufParam).toLowerCase();
  const name = STATES[uf] ?? "Estado";
  const UF = uf.toUpperCase();

  const isValidUF = Boolean(STATES[uf]);

  const list = isValidUF ? getByUF(uf) : [];
  const citiesRaw = isValidUF ? citiesByUF(uf) : [];

  const q = readQueryQ(sp?.q);
  const qNorm = normalizeText(q);
  const hasSearch = qNorm.length >= 2;

  // Contagem por cidade (a partir da lista real do estado)
  const cityCount = new Map<string, number>();
  for (const item of list) {
    const c = (item?.city ?? "").toString().trim();
    if (!c) continue;
    cityCount.set(c, (cityCount.get(c) ?? 0) + 1);
  }

  // Cidades: dedup + ordenação (pt-BR)
  const cities = Array.from(
    new Set(
      citiesRaw
        .map((c: any) => (c ?? "").toString().trim())
        .filter(Boolean)
    )
  ).sort((a, b) => a.localeCompare(b, "pt-BR", { sensitivity: "base" }));

  const citiesWithCount = cities.map((city) => ({
    city,
    count: cityCount.get(city) ?? 0,
    slug: normalizeCity(city),
  }));

  // Filtrar cidades pela busca (?q=...)
  const filteredCities =
    hasSearch ? citiesWithCount.filter(({ city }) => normalizeText(city).includes(qNorm)) : citiesWithCount;

  const totalCitiesWithAny = Array.from(cityCount.values()).filter((n) => n > 0).length;

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
          Profissionais
        </p>

        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">
          Serviços em {name} <span className="text-slate-500">({UF})</span>
        </h1>

        <p className="mt-4 max-w-3xl text-base text-slate-700 sm:text-lg">
          Selecione uma cidade para filtrar ou veja todos os profissionais do estado.
        </p>

        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            href="/profissionais"
            className="rounded-md border border-black/5 bg-white px-4 py-2 text-sm font-semibold hover:bg-slate-50"
          >
            Trocar estado
          </Link>

          <Link
            href="/anuncie"
            className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-500"
          >
            Cadastrar meu serviço
          </Link>
        </div>

        <nav className="mt-8 text-sm text-slate-600">
          <ol className="flex flex-wrap gap-2">
            <li>
              <Link href="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-slate-400">/</span>
              <Link href="/profissionais" className="hover:underline">
                Profissionais
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-slate-400">/</span>
              <span className="font-medium text-slate-700">{UF}</span>
            </li>
          </ol>
        </nav>
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-3 lg:items-start">
        <aside className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold tracking-tight">Cidades</h2>
              <p className="mt-2 text-sm text-slate-600">
                {hasSearch ? (
                  <>
                    Resultados para <span className="font-semibold text-slate-900">“{q}”</span>.
                  </>
                ) : (
                  <>Escolha uma cidade para ver apenas os profissionais dessa região.</>
                )}
              </p>
            </div>

            {isValidUF ? (
              <div className="text-right text-xs text-slate-600">
                <div>
                  <span className="font-semibold text-slate-900">{cities.length}</span> cidades
                </div>
                <div>
                  <span className="font-semibold text-slate-900">{totalCitiesWithAny}</span> com cadastro
                </div>
              </div>
            ) : null}
          </div>

    {isValidUF ? (
      <form className="mt-5" action={`/profissionais/${uf}`} method="get">
        <label htmlFor="q" className="sr-only">
          Buscar cidade
        </label>

        <div className="flex gap-2">
          <input
            id="q"
            name="q"
            placeholder={
              cities.length
                ? "Buscar cidade (ex.: Salvador, Feira de Santana)…"
                : "Busca disponível quando houver cidades cadastradas"
            }
            className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-600 disabled:cursor-not-allowed disabled:bg-slate-50"
            defaultValue={q}
            disabled={!cities.length}
          />

          <button
            type="submit"
            disabled={!cities.length}
            className="rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-500 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            Buscar
          </button>
        </div>

        <div className="mt-2 flex items-center justify-between gap-3">
          <p className="text-xs text-slate-500">Dica: digite ao menos 2 letras.</p>

          {hasSearch ? (
            <Link
              href={`/profissionais/${uf}`}
              className="text-xs font-semibold text-emerald-700 hover:underline"
            >
              Limpar busca
            </Link>
          ) : null}
        </div>
      </form>
    ) : null}

          {isValidUF ? (
            <>
              {citiesWithCount.length ? (
                <>
                  <div className="mt-4 flex items-center justify-between text-xs text-slate-600">
                    <span>
                      {hasSearch ? (
                        <>
                          <span className="font-semibold text-slate-900">{filteredCities.length}</span> resultados
                        </>
                      ) : (
                        <>
                          <span className="font-semibold text-slate-900">{citiesWithCount.length}</span> cidades listadas
                        </>
                      )}
                    </span>
                  </div>

                  {filteredCities.length ? (
                    <div className="mt-3 space-y-2">
                      {filteredCities.map(({ city, count, slug }) => (
                        <Link
                          key={slug}
                          href={`/profissionais/${uf}/${slug}`}
                          className="flex items-center justify-between rounded-xl border border-black/5 bg-white px-4 py-3 text-sm font-semibold hover:bg-slate-50"
                        >
                          <span className="min-w-0 truncate">{city}</span>
                          <span className="ml-3 rounded-full border border-black/5 bg-slate-50 px-2 py-0.5 text-xs font-semibold text-slate-700">
                            {count}
                          </span>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="mt-4 rounded-xl border border-black/5 bg-slate-50 p-4 text-sm text-slate-700">
                      Nenhuma cidade encontrada para <strong>“{q}”</strong>.
                      <div className="mt-2 text-slate-600">
                        Dica: tente apenas uma parte do nome (ex.: “rio”, “são”, “fort”).
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="mt-5 rounded-xl border border-black/5 bg-slate-50 p-4 text-sm text-slate-700">
                  Ainda não temos cidades cadastradas para <strong>{name}</strong>.
                  <div className="mt-2 text-slate-600">Se você presta serviços aí, cadastre-se para aparecer nas buscas.</div>
                </div>
              )}
            </>
          ) : (
            <div className="mt-5 rounded-xl border border-black/5 bg-slate-50 p-4 text-sm text-slate-700">
              UF inválida: <strong>{UF}</strong>. Volte e selecione um estado válido.
            </div>
          )}

          <div className="mt-6">
            <AdCtaProfissionaisCard />
          </div>
        </aside>

        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <h2 className="text-xl font-bold tracking-tight">
                Todos no estado <span className="text-slate-500">({isValidUF ? list.length : 0})</span>
              </h2>

              {isValidUF ? (
                <div className="text-sm text-slate-600">
                  {list.length ? (
                    <>
                      Atendimentos em <span className="font-semibold text-slate-900">{totalCitiesWithAny}</span> cidades
                    </>
                  ) : (
                    <>Seja o primeiro a cadastrar</>
                  )}
                </div>
              ) : null}
            </div>

            {isValidUF && list.length ? (
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {list.map((item: any) => (
                  <div
                    key={item?.id ?? `${item?.name ?? "item"}-${item?.city ?? ""}`}
                    className="rounded-2xl border border-black/5 bg-white p-5 hover:bg-slate-50"
                  >
                    <div className="text-sm font-semibold text-slate-900">{item?.name ?? "Profissional"}</div>

                    <div className="mt-1 text-sm text-slate-600">
                      {item?.city ? <span className="font-semibold text-slate-800">{item.city}</span> : null}
                      {item?.category ? <span> · {item.category}</span> : null}
                    </div>

                    {item?.city ? (
                      <div className="mt-4">
                        <Link
                          href={`/profissionais/${uf}/${normalizeCity(item.city)}`}
                          className="text-sm font-semibold text-emerald-700 hover:underline"
                        >
                          Ver mais em {item.city}
                        </Link>
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-6 rounded-xl border border-black/5 bg-slate-50 p-4 text-sm text-slate-700">
                {isValidUF ? (
                  <>
                    Ainda não há profissionais cadastrados para <strong>{name}</strong>.
                    <div className="mt-2 text-slate-600">
                      Clique em <strong>Cadastrar meu serviço</strong> para aparecer nas buscas.
                    </div>
                  </>
                ) : (
                  <>
                    UF inválida: <strong>{UF}</strong>. Volte e selecione um estado válido.
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
