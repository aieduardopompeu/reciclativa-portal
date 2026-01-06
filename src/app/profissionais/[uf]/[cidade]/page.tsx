// src/app/profissionais/[uf]/[cidade]/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import AdCtaProfissionaisCard from "@/components/AdCtaProfissionaisCard";
import {
  citiesByUF,
  getByUFCity,
  getByUF,
  normalizeUF,
  normalizeCity,
} from "@/content/profissionais";

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
  params: Promise<{ uf: string; cidade: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

function titleFromSlug(slug: string) {
  const raw = (slug ?? "")
    .toString()
    .trim()
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ");

  if (!raw) return "Cidade";

  return raw
    .split(" ")
    .map((w) => (w.length ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");
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

function compareCityByRelevanceThenAlpha(
  a: { city: string; count: number },
  b: { city: string; count: number }
) {
  const diff = (b.count ?? 0) - (a.count ?? 0);
  if (diff !== 0) return diff;
  return a.city.localeCompare(b.city, "pt-BR", { sensitivity: "base" });
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { uf: ufParam, cidade: cidadeParam } = await params;

  const uf = normalizeUF(ufParam).toLowerCase();
  const UF = uf.toUpperCase();
  const stateName = STATES[uf] ?? "Estado";

  const cidadeSlug = (cidadeParam ?? "").toString().toLowerCase().trim();
  const list = (STATES[uf] ? getByUFCity(uf, cidadeSlug) : []) ?? [];

  const cidadeNome = (list[0]?.city ?? titleFromSlug(cidadeSlug)).toString();

  const title = `Serviços em ${cidadeNome} (${UF}) | Profissionais | Reciclativa`;
  const description = `Encontre profissionais e serviços ligados à reciclagem e sustentabilidade em ${cidadeNome} (${stateName}). Cadastre seu serviço para aparecer nas buscas.`;

  return {
    title,
    description,
    alternates: { canonical: `/profissionais/${uf}/${cidadeSlug}` },
    openGraph: {
      title,
      description,
      url: `/profissionais/${uf}/${cidadeSlug}`,
      type: "website",
    },
  };
}

export default async function ProfissionaisCidadePage({
  params,
  searchParams,
}: PageProps) {
  const { uf: ufParam, cidade: cidadeParam } = await params;
  const sp = searchParams ? await searchParams : undefined;

  const uf = normalizeUF(ufParam).toLowerCase();
  const UF = uf.toUpperCase();
  const stateName = STATES[uf] ?? "Estado";
  const isValidUF = Boolean(STATES[uf]);

  const cidadeSlug = (cidadeParam ?? "").toString().toLowerCase().trim();

  const q = readQueryQ(sp?.q);
  const qNorm = normalizeText(q);
  const hasSearch = qNorm.length >= 2;

  const list = isValidUF ? getByUFCity(uf, cidadeSlug) : [];
  const cidadeNome = (list[0]?.city ?? titleFromSlug(cidadeSlug)).toString();

  // Dados do estado
  const listUF = isValidUF ? getByUF(uf) : [];

  // Contagem por cidade no estado
  const cityCount = new Map<string, number>();
  for (const item of listUF) {
    const c = (item?.city ?? "").toString().trim();
    if (!c) continue;
    cityCount.set(c, (cityCount.get(c) ?? 0) + 1);
  }

  // Base de cidades: tenta citiesByUF; se vier vazio, deriva do listUF
  const citiesFromConfig = isValidUF ? (citiesByUF(uf) ?? []) : [];
  const citiesFallback = Array.from(new Set(Array.from(cityCount.keys())));

  const baseCities = (citiesFromConfig.length ? citiesFromConfig : citiesFallback)
    .map((c: any) => (c ?? "").toString().trim())
    .filter(Boolean);

  const currentCityNorm = normalizeText(cidadeNome);

  // Lista de cidades (remove cidade atual), aplica contagem e ordena por relevância
  const citiesWithCount = baseCities
    .map((city) => ({
      city,
      count: cityCount.get(city) ?? 0,
      slug: normalizeCity(city),
    }))
    .filter(
      ({ city, slug }) => normalizeText(city) !== currentCityNorm && slug !== cidadeSlug
    )
    .sort(compareCityByRelevanceThenAlpha);

  const filteredCities = hasSearch
    ? citiesWithCount.filter(({ city }) => normalizeText(city).includes(qNorm))
    : citiesWithCount;

  // Separação TOP vs ZERO (para o colapsável)
  const topCities = filteredCities.filter((c) => c.count > 0);
  const zeroCities = filteredCities.filter((c) => c.count === 0);

  const canSearchCities = isValidUF && citiesWithCount.length > 0;

  const totalCities = citiesWithCount.length;
  const totalCitiesWithAny = citiesWithCount.filter((c) => c.count > 0).length;

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
          Profissionais
        </p>

        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">
          Serviços em {cidadeNome} <span className="text-slate-500">({UF})</span>
        </h1>

        <p className="mt-4 max-w-3xl text-base text-slate-700 sm:text-lg">
          Profissionais e serviços ligados à reciclagem, sustentabilidade e economia circular
          na cidade.
        </p>

        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            href={`/profissionais/${uf}`}
            className="rounded-md border border-black/5 bg-white px-4 py-2 text-sm font-semibold hover:bg-slate-50"
          >
            Voltar para {stateName}
          </Link>

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
              <Link href={`/profissionais/${uf}`} className="hover:underline">
                {UF}
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-slate-400">/</span>
              <span className="font-medium text-slate-700">{cidadeNome}</span>
            </li>
          </ol>
        </nav>
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-3 lg:items-start">
        {/* SIDEBAR */}
        <aside className="space-y-6">
          <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold tracking-tight">Nesta cidade</h2>
            <p className="mt-2 text-sm text-slate-600">
              Total de cadastros em {cidadeNome}:{" "}
              <span className="font-semibold text-slate-900">{list.length}</span>
            </p>

            <div className="mt-5 rounded-xl border border-black/5 bg-slate-50 p-4 text-sm text-slate-700">
              Em {stateName}, já existem{" "}
              <span className="font-semibold text-slate-900">{listUF.length}</span> cadastros no
              total.
              <div className="mt-2 text-slate-600">
                Quer aparecer primeiro em {cidadeNome}? Cadastre seu serviço.
              </div>
              <div className="mt-3">
                <Link
                  href="/anuncie"
                  className="inline-flex rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-500"
                >
                  Cadastrar meu serviço
                </Link>
              </div>
            </div>
          </div>

          {/* OUTRAS CIDADES + BUSCA */}
          <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold tracking-tight">Outras cidades em {UF}</h2>
                <p className="mt-2 text-sm text-slate-600">
                  {hasSearch ? (
                    <>
                      Resultados para{" "}
                      <span className="font-semibold text-slate-900">“{q}”</span>.
                    </>
                  ) : (
                    <>Ordenadas por relevância (mais cadastros primeiro).</>
                  )}
                </p>
              </div>

              {isValidUF ? (
                <div className="text-right text-xs text-slate-600">
                  <div>
                    <span className="font-semibold text-slate-900">{totalCities}</span> cidades
                  </div>
                  <div>
                    <span className="font-semibold text-slate-900">{totalCitiesWithAny}</span>{" "}
                    com cadastro
                  </div>
                </div>
              ) : null}
            </div>

            {isValidUF ? (
              <form className="mt-5" action={`/profissionais/${uf}/${cidadeSlug}`} method="get">
                <label htmlFor="q" className="sr-only">
                  Buscar cidade
                </label>

                <div className="flex gap-2">
                  <input
                    id="q"
                    name="q"
                    placeholder={
                      canSearchCities
                        ? "Buscar cidade (ex.: Salvador, Campinas)…"
                        : "Busca disponível quando houver cidades cadastradas"
                    }
                    className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-600 disabled:cursor-not-allowed disabled:bg-slate-50"
                    defaultValue={q}
                    disabled={!canSearchCities}
                  />

                  <button
                    type="submit"
                    disabled={!canSearchCities}
                    className="rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-500 disabled:cursor-not-allowed disabled:bg-slate-300"
                  >
                    Buscar
                  </button>
                </div>

                <div className="mt-2 flex items-center justify-between gap-3">
                  <p className="text-xs text-slate-500">Dica: digite ao menos 2 letras.</p>

                  {hasSearch ? (
                    <Link
                      href={`/profissionais/${uf}/${cidadeSlug}`}
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
                            <span className="font-semibold text-slate-900">
                              {filteredCities.length}
                            </span>{" "}
                            resultados
                          </>
                        ) : (
                          <>
                            <span className="font-semibold text-slate-900">
                              {citiesWithCount.length}
                            </span>{" "}
                            cidades listadas
                          </>
                        )}
                      </span>
                    </div>

                    {hasSearch ? (
                      // Com busca: mostra filtradas (sem colapsar)
                      <div className="mt-3 space-y-2">
                        {filteredCities.slice(0, 24).map(({ city, count, slug }) => (
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

                        {filteredCities.length > 24 ? (
                          <div className="pt-1 text-xs text-slate-500">
                            Mostrando 24 de {filteredCities.length} cidades.
                          </div>
                        ) : null}
                      </div>
                    ) : (
                      <>
                        {/* TOP cidades (com cadastro) */}
                        {topCities.length ? (
                          <div className="mt-3 space-y-2">
                            {topCities.slice(0, 10).map(({ city, count, slug }) => (
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
                            Ainda não há cidades com cadastro neste estado.
                          </div>
                        )}

                        {/* Colapsável: cidades sem cadastro */}
                        {zeroCities.length ? (
                          <details className="mt-4">
                            <summary className="cursor-pointer select-none text-sm font-semibold text-emerald-700 hover:underline">
                              Ver mais cidades ({zeroCities.length})
                            </summary>

                            <div className="mt-3 space-y-2">
                              {zeroCities.slice(0, 24).map(({ city, count, slug }) => (
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

                              {zeroCities.length > 24 ? (
                                <div className="pt-1 text-xs text-slate-500">
                                  Mostrando 24 de {zeroCities.length} cidades sem cadastro.
                                </div>
                              ) : null}
                            </div>
                          </details>
                        ) : null}
                      </>
                    )}
                  </>
                ) : (
                  <div className="mt-5 rounded-xl border border-black/5 bg-slate-50 p-4 text-sm text-slate-700">
                    Ainda não temos cidades cadastradas para <strong>{stateName}</strong>.
                    <div className="mt-2 text-slate-600">
                      Se você presta serviços aí, cadastre-se para aparecer nas buscas.
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="mt-5 rounded-xl border border-black/5 bg-slate-50 p-4 text-sm text-slate-700">
                UF inválida: <strong>{UF}</strong>. Volte e selecione um estado válido.
              </div>
            )}
          </div>

          <div>
            <AdCtaProfissionaisCard />
          </div>
        </aside>

        {/* CONTEÚDO PRINCIPAL */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <h2 className="text-xl font-bold tracking-tight">
                Profissionais em {cidadeNome}{" "}
                <span className="text-slate-500">({list.length})</span>
              </h2>

              {isValidUF ? (
                <div className="text-sm text-slate-600">
                  {list.length ? <>Cadastros verificados por localização</> : <>Seja o primeiro a cadastrar</>}
                </div>
              ) : null}
            </div>

            {isValidUF && list.length ? (
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {list.map((p: any) => (
                  <div
                    key={p?.id ?? `${p?.name ?? "prof"}-${p?.city ?? ""}-${p?.service ?? ""}`}
                    className="rounded-2xl border border-black/5 bg-white p-5 hover:bg-slate-50"
                  >
                    <div className="text-sm font-semibold text-slate-900">
                      {p?.name ?? "Profissional"}
                    </div>

                    <div className="mt-1 text-sm text-slate-600">
                      {p?.service ? (
                        <span className="font-semibold text-slate-800">{p.service}</span>
                      ) : null}
                      {p?.category ? <span> · {p.category}</span> : null}
                    </div>

                    {p?.description ? (
                      <p className="mt-3 text-sm text-slate-600">{p.description}</p>
                    ) : null}

                    <div className="mt-4 flex flex-wrap gap-2">
                      {p?.whatsapp ? (
                        <a
                          className="rounded-md border border-black/5 bg-white px-3 py-2 text-sm font-semibold hover:bg-slate-50"
                          href={`https://wa.me/${String(p.whatsapp).replace(/\D/g, "")}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          WhatsApp
                        </a>
                      ) : null}

                      {p?.email ? (
                        <a
                          className="rounded-md border border-black/5 bg-white px-3 py-2 text-sm font-semibold hover:bg-slate-50"
                          href={`mailto:${p.email}`}
                        >
                          E-mail
                        </a>
                      ) : null}

                      {p?.website ? (
                        <a
                          className="rounded-md border border-black/5 bg-white px-3 py-2 text-sm font-semibold hover:bg-slate-50"
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
            ) : (
              <div className="mt-6 rounded-xl border border-black/5 bg-slate-50 p-4 text-sm text-slate-700">
                {isValidUF ? (
                  <>
                    Ainda não há profissionais cadastrados para <strong>{cidadeNome}</strong>.
                    <div className="mt-2 text-slate-600">
                      Clique em <strong>Cadastrar meu serviço</strong> para aparecer nas buscas desta
                      cidade.
                    </div>
                    <div className="mt-3">
                      <Link
                        href="/anuncie"
                        className="inline-flex rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-500"
                      >
                        Cadastrar meu serviço
                      </Link>
                    </div>
                  </>
                ) : (
                  <>
                    UF inválida: <strong>{UF}</strong>. Volte e selecione um estado válido.
                  </>
                )}
              </div>
            )}

            <div className="mt-8 border-t border-black/5 pt-6">
              <p className="text-sm text-slate-600">
                Prefere ver todos os profissionais do estado?
              </p>
              <div className="mt-3">
                <Link
                  href={`/profissionais/${uf}`}
                  className="inline-flex rounded-md border border-black/5 bg-white px-4 py-2 text-sm font-semibold hover:bg-slate-50"
                >
                  Ver {stateName} ({UF})
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
