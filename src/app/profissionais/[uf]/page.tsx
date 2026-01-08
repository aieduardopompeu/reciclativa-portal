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

const STATE_BLURBS: Record<string, string> = {
  ac: "No Acre, iniciativas locais e negócios regionais buscam soluções práticas para reciclagem e gestão de resíduos com logística eficiente.",
  al: "Em Alagoas, serviços ambientais ganham força com foco em descarte correto, educação ambiental e soluções para cidades e empresas.",
  ap: "No Amapá, a demanda por sustentabilidade cresce com atenção à coleta, triagem e práticas responsáveis de destinação.",
  am: "No Amazonas, soluções de reciclagem e economia circular se destacam quando combinam impacto local e eficiência operacional.",
  ba: "Na Bahia, projetos e serviços de sustentabilidade avançam com foco em gestão de resíduos, compliance e soluções para comunidades e negócios.",
  ce: "No Ceará, reciclagem e economia circular ganham espaço com soluções para condomínios, comércios e operações locais.",
  df: "No Distrito Federal, cresce a busca por consultoria e serviços ambientais com foco em conformidade, redução de resíduos e boas práticas.",
  es: "No Espírito Santo, empresas e iniciativas locais buscam parceiros para reciclagem, logística reversa e gestão responsável de resíduos.",
  go: "Em Goiás, a sustentabilidade se fortalece com serviços voltados a resíduos, educação ambiental e suporte para negócios regionais.",
  ma: "No Maranhão, soluções ambientais locais se destacam quando conectam coleta, triagem e destinação com eficiência e transparência.",
  mt: "No Mato Grosso, cresce a procura por serviços ambientais que unam gestão de resíduos, eficiência e apoio a operações em diferentes cidades.",
  ms: "No Mato Grosso do Sul, serviços de reciclagem e sustentabilidade ganham relevância com foco em descarte correto e soluções sob medida.",
  mg: "Em Minas Gerais, a busca por reciclagem e economia circular aumenta com soluções para empresas, condomínios e iniciativas comunitárias.",
  pa: "No Pará, soluções ambientais locais ganham espaço com foco em reciclagem, destinação correta e fortalecimento de cadeias regionais.",
  pb: "Na Paraíba, práticas sustentáveis avançam com serviços voltados à gestão de resíduos e suporte a negócios e comunidades.",
  pr: "No Paraná, a economia circular se consolida com serviços especializados em reciclagem, logística reversa e boas práticas operacionais.",
  pe: "Em Pernambuco, soluções ambientais ganham tração com foco em reciclagem, educação ambiental e apoio a empresas e condomínios.",
  pi: "No Piauí, cresce a demanda por serviços que facilitem descarte correto, reciclagem e organização de rotinas sustentáveis.",
  rj: "No Rio de Janeiro, soluções de sustentabilidade se destacam quando combinam eficiência, conformidade e atendimento local por cidade.",
  rn: "No Rio Grande do Norte, reciclagem e gestão de resíduos avançam com serviços locais e apoio a iniciativas comunitárias e empresariais.",
  rs: "No Rio Grande do Sul, cresce a procura por serviços ambientais estruturados, com foco em reciclagem, redução de resíduos e conformidade.",
  ro: "Em Rondônia, soluções ambientais locais se fortalecem com foco em coleta, triagem e destinação responsável.",
  rr: "Em Roraima, cresce a necessidade de serviços que organizem o descarte correto e incentivem práticas sustentáveis no dia a dia.",
  sc: "Em Santa Catarina, reciclagem e economia circular avançam com serviços especializados e operação eficiente em diferentes cidades.",
  sp: "Em São Paulo, a demanda por soluções ambientais é alta, com foco em reciclagem, gestão de resíduos e serviços por cidade e segmento.",
  se: "Em Sergipe, serviços ambientais ganham relevância com foco em descarte correto, reciclagem e apoio a iniciativas locais.",
  to: "No Tocantins, cresce a busca por serviços sustentáveis que apoiem coleta, reciclagem e destinação responsável em escala regional.",
};

function faqJsonLd(uf: string, name: string, UF: string) {
  const safeName = name || "o estado";
  const safeUF = UF || uf.toUpperCase();

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Como encontrar profissionais de reciclagem e sustentabilidade em ${safeName} (${safeUF})?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Use a lista de cidades para filtrar por região e encontre profissionais e serviços ligados à reciclagem, gestão de resíduos e sustentabilidade em ${safeName} (${safeUF}).`,
        },
      },
      {
        "@type": "Question",
        name: `Como cadastrar meu serviço para aparecer nas buscas em ${safeName} (${safeUF})?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Acesse a página de cadastro e envie seus dados. Após o cadastro, seu serviço pode aparecer nas listagens por estado e cidade no Reciclativa.`,
        },
      },
    ],
  };
}

type PageProps = {
  params: Promise<{ uf: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { uf: ufParam } = await params;
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

  const uf = normalizeUF(ufParam).toLowerCase();
  const name = STATES[uf] ?? "Estado";
  const UF = uf.toUpperCase();

  const isValidUF = Boolean(STATES[uf]);

  const list = isValidUF ? await getByUF(uf) : [];
  const citiesRaw = isValidUF ? await citiesByUF(uf) : [];

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
      (citiesRaw ?? [])
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
const tokens = qNorm.replace(/\s+/g, " ").split(" ").filter(Boolean);

const filteredCities = hasSearch
  ? citiesWithCount.filter(({ city }) => {
      const c = normalizeText(city).replace(/\s+/g, " ");
      return tokens.every((t) => c.includes(t));
    })
  : citiesWithCount;

  const totalCitiesWithAny = Array.from(cityCount.values()).filter((n) => n > 0).length;

  // ✅ Normalização “sem dados”
  const hasStateData = isValidUF && list.length > 0;
  const hasCities = isValidUF && citiesWithCount.length > 0;
  const canSearchCities = hasCities; // busca só quando há base

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd(uf, name, UF)),
        }}
      />

      <section className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
          Profissionais
        </p>

        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">
          Serviços em {name} <span className="text-slate-500">({UF})</span>
        </h1>

        <p className="mt-4 max-w-3xl text-sm text-slate-600 leading-relaxed">
          No estado de <strong>{name}</strong> (<strong>{UF}</strong>), você encontra profissionais e
          serviços ligados à reciclagem, gestão de resíduos, sustentabilidade e economia circular.
          Navegue pelas cidades para localizar soluções ambientais na sua região — de consultoria e
          coleta a apoio para empresas, condomínios e iniciativas locais — e cadastre seu serviço
          para aparecer nas buscas do Reciclativa.
        </p>

        <p className="mt-3 max-w-3xl text-sm text-slate-600">
          {STATE_BLURBS[uf] ??
            `Em ${name} (${UF}), serviços ambientais locais ajudam a conectar reciclagem e gestão de resíduos com soluções práticas para o dia a dia.`}
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

        <div className="mt-6 max-w-3xl">
          <h2 className="text-base font-bold tracking-tight text-slate-900">
            Perguntas frequentes em {name} ({UF})
          </h2>

          <div className="mt-3 space-y-3">
            <details className="rounded-xl border border-black/5 bg-white p-4">
              <summary className="cursor-pointer select-none text-sm font-semibold text-slate-900">
                Como encontrar profissionais de reciclagem e sustentabilidade em {name} ({UF})?
              </summary>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Use a lista de cidades para filtrar por região e encontre profissionais e serviços ligados
                à reciclagem, gestão de resíduos e sustentabilidade em {name} ({UF}).
              </p>
            </details>

            <details className="rounded-xl border border-black/5 bg-white p-4">
              <summary className="cursor-pointer select-none text-sm font-semibold text-slate-900">
                Como cadastrar meu serviço para aparecer nas buscas em {name} ({UF})?
              </summary>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Acesse a página de cadastro e envie seus dados. Após o cadastro, seu serviço pode aparecer
                nas listagens por estado e cidade no Reciclativa.
              </p>

              <div className="mt-3">
                <Link
                  href="/anuncie"
                  className="inline-flex rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-500"
                >
                  Cadastrar meu serviço
                </Link>
              </div>
            </details>
          </div>
        </div>
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-3 lg:items-start">
        <aside className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold tracking-tight">Cidades</h2>
              <p className="mt-2 text-sm text-slate-600">
                {hasCities ? (
                  hasSearch ? (
                    <>
                      Resultados para <span className="font-semibold text-slate-900">“{q}”</span>.
                    </>
                  ) : (
                    <>Escolha uma cidade para ver apenas os profissionais dessa região.</>
                  )
                ) : (
                  <>As cidades serão listadas aqui quando houver cadastros no estado.</>
                )}
              </p>
            </div>

            {isValidUF && hasCities ? (
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

          {/* ✅ Busca só quando há cidades listáveis */}
          {isValidUF && canSearchCities ? (
            <form className="mt-5" action={`/profissionais/${uf}`} method="get">
              <label htmlFor="q" className="sr-only">
                Buscar cidade
              </label>

              <div className="flex gap-2">
                <input
                  id="q"
                  name="q"
                  placeholder="Buscar cidade (ex.: Salvador, Feira de Santana)…"
                  className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-600"
                  defaultValue={q}
                />

                <button
                  type="submit"
                  className="rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-500"
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
              {hasCities ? (
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
                  Ainda não há profissionais cadastrados para <strong>{name}</strong>.
                  <div className="mt-2 text-slate-600">
                    Cadastre seu serviço para aparecer nas buscas do estado e por cidade.
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
              )}

              <div className="mt-6">
                <AdCtaProfissionaisCard />
              </div>
            </>
          ) : (
            <div className="mt-5 rounded-xl border border-black/5 bg-slate-50 p-4 text-sm text-slate-700">
              UF inválida: <strong>{UF}</strong>. Volte e selecione um estado válido.
            </div>
          )}
        </aside>

        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <h2 className="text-xl font-bold tracking-tight">
                Todos no estado{" "}
                {hasStateData ? <span className="text-slate-500">({list.length})</span> : null}
              </h2>

              {isValidUF ? (
                <div className="text-sm text-slate-600">
                  {hasStateData ? (
                    <>
                      Atendimentos em{" "}
                      <span className="font-semibold text-slate-900">{totalCitiesWithAny}</span> cidades
                    </>
                  ) : (
                    <>Seja o primeiro a cadastrar</>
                  )}
                </div>
              ) : null}
            </div>

            {hasStateData ? (
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
                      Cadastre seu serviço para aparecer nas buscas por estado e por cidade.
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
          </div>
        </div>
      </section>
    </main>
  );
}
