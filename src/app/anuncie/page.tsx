"use client";

import { useEffect, useMemo, useState } from "react";

const UFS = [
  "AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO",
];

// ✅ Categorias “padrão” do Reciclativa
const CATEGORIES = [
  "Coleta e Transporte",
  "Cooperativa / Reciclador",
  "Consultoria Ambiental",
  "Logística Reversa",
  "Resíduos Eletrônicos (ITAD / e-lixo)",
  "Educação Ambiental",
  "Compostagem / Orgânicos",
  "Gestão de Resíduos (PGRS / PGRCC)",
  "Indústria / Beneficiamento",
  "Outro",
] as const;

type Category = (typeof CATEGORIES)[number];

// ✅ Serviços gerais (quando não escolhe categoria)
const GENERAL_SERVICES = [
  "Coleta seletiva",
  "Triagem e reciclagem de materiais",
  "Logística reversa",
  "Consultoria ambiental / PGRS",
  "Educação ambiental / treinamentos",
  "Coleta de eletrônicos (e-lixo / ITAD)",
  "Coleta de óleo de cozinha",
  "Compostagem / orgânicos",
  "Destinação ambientalmente adequada",
  "Outro",
];

// ✅ Serviços por categoria (multi-seleção)
const SERVICES_BY_CATEGORY: Record<Category, string[]> = {
  "Coleta e Transporte": [
    "Coleta seletiva",
    "Coleta de recicláveis",
    "Coleta de óleo de cozinha",
    "Coleta de resíduos volumosos",
    "Transporte e logística",
    "Destinação ambientalmente adequada",
  ],
  "Cooperativa / Reciclador": [
    "Triagem de recicláveis",
    "Compra de recicláveis",
    "Prensagem / enfardamento",
    "Operação de ponto de entrega",
    "Recebimento de materiais",
  ],
  "Consultoria Ambiental": [
    "Consultoria para empresas",
    "Diagnóstico e plano de melhoria",
    "Treinamento e capacitação",
    "Inventário/gestão de resíduos",
    "Apoio a certificações e compliance",
  ],
  "Logística Reversa": [
    "Logística reversa para empresas",
    "Coleta de pós-consumo",
    "Gestão de pontos de coleta",
    "Relatórios e comprovações",
    "Parcerias com recicladores",
  ],
  "Resíduos Eletrônicos (ITAD / e-lixo)": [
    "Coleta de eletrônicos",
    "Descarte seguro de e-lixo",
    "Descaracterização / destruição",
    "ITAD / reuso e recondicionamento",
    "Emissão de comprovantes",
  ],
  "Educação Ambiental": [
    "Palestras e workshops",
    "Projetos em escolas",
    "Campanhas internas (empresas)",
    "Conteúdo e treinamento",
  ],
  "Compostagem / Orgânicos": [
    "Coleta de orgânicos",
    "Compostagem",
    "Implantação de composteira",
    "Treinamento e acompanhamento",
  ],
  "Gestão de Resíduos (PGRS / PGRCC)": [
    "PGRS",
    "PGRCC",
    "Auditoria de resíduos",
    "Plano de gerenciamento",
    "Acompanhamento e relatórios",
  ],
  "Indústria / Beneficiamento": [
    "Beneficiamento de materiais",
    "Moagem / granulação",
    "Lavagem",
    "Reprocessamento",
    "Compra de grandes volumes",
  ],
  "Outro": ["Outro"],
};

function titleCaseUF(uf: string) {
  return (uf || "").trim().slice(0, 2).toUpperCase();
}

type CityOption = { id: number; name: string };

export default function AnunciePage() {
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ✅ Serviços selecionados (multi)
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [otherService, setOtherService] = useState("");

  // ✅ cidades por UF (IBGE)
  const [cities, setCities] = useState<CityOption[]>([]);
  const [citiesLoading, setCitiesLoading] = useState(false);
  const [citiesError, setCitiesError] = useState<string | null>(null);
  const [manualCity, setManualCity] = useState(false);

  const [form, setForm] = useState({
    name: "",
    uf: "SP",
    city: "",
    cityId: null as number | null, // ✅ novo: IBGE city_id
    category: "" as Category | "",
    service: "", // será montado no submit
    description: "",
    whatsapp: "",
    email: "",
    website: "",
    companyWebsite: "", // honeypot (não visível)
    termsAccepted: false,
  });

  // Carrega cidades ao trocar UF
  useEffect(() => {
    const uf = titleCaseUF(form.uf);
    let cancelled = false;

    async function loadCities() {
      setCitiesLoading(true);
      setCitiesError(null);

      try {
        const res = await fetch(`/api/ibge/municipios/${uf}`, { method: "GET" });
        const data = await res.json().catch(() => ({}));

        if (!res.ok || !data?.ok) {
          throw new Error(data?.error || "Falha ao carregar cidades.");
        }

        const list: CityOption[] = Array.isArray(data?.cities)
          ? data.cities
              .filter((c: any) => c?.name)
              .map((c: any) => ({ id: Number(c.id), name: String(c.name) }))
          : [];

        if (!cancelled) {
          setCities(list);
        }
      } catch (e: any) {
        if (!cancelled) {
          setCities([]);
          setCitiesError(e?.message || "Falha ao carregar cidades.");
        }
      } finally {
        if (!cancelled) setCitiesLoading(false);
      }
    }

    // ao trocar UF, volta para modo select e limpa cidade (e cityId)
    setManualCity(false);
    setForm((v) => ({ ...v, city: "", cityId: null }));
    loadCities();

    return () => {
      cancelled = true;
    };
  }, [form.uf]);

  // ✅ Lógica nova:
  // - Sem categoria: serviços gerais
  // - Categoria "Outro": serviços gerais
  // - Categoria específica: serviços da categoria
  const serviceOptions = useMemo(() => {
    if (!form.category) return GENERAL_SERVICES;

    const cat = form.category as Category;
    if (cat === "Outro") return GENERAL_SERVICES;

    return SERVICES_BY_CATEGORY[cat] ?? GENERAL_SERVICES;
  }, [form.category]);

  const canSubmit = useMemo(() => {
    return (
      form.name.trim().length >= 2 &&
      form.city.trim().length >= 2 &&
      titleCaseUF(form.uf).length === 2 &&
      form.termsAccepted === true
    );
  }, [form]);

  function toggleService(s: string) {
    setSelectedServices((prev) => {
      if (prev.includes(s)) return prev.filter((x) => x !== s);
      return [...prev, s];
    });
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const parts = [
        ...selectedServices,
        otherService.trim().length ? otherService.trim() : null,
      ].filter(Boolean) as string[];

      const payload = {
        ...form,
        uf: titleCaseUF(form.uf),
        category: form.category === "" ? "Outro" : form.category,
        service: parts.join(" · "),
        // cityId já vai junto (número ou null) ✅
      };

      const res = await fetch("/api/profissionais", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || "Falha ao enviar.");
      }

      setOk(true);
    } catch (err: any) {
      setError(err?.message || "Falha ao enviar.");
    } finally {
      setLoading(false);
    }
  }

  function resetAll() {
    setError(null);
    setOk(false);
    setSelectedServices([]);
    setOtherService("");
    setManualCity(false);
    setForm({
      name: "",
      uf: "SP",
      city: "",
      cityId: null,
      category: "",
      service: "",
      description: "",
      whatsapp: "",
      email: "",
      website: "",
      companyWebsite: "",
      termsAccepted: false,
    });
  }

  if (ok) {
    return (
      <main className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm">
          <h1 className="text-3xl font-bold tracking-tight">Cadastro enviado</h1>
          <p className="mt-4 text-slate-700">
            Recebemos seu cadastro. Ele ficará em análise e, após aprovação, poderá aparecer nas
            páginas do seu estado e cidade.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="/profissionais"
              className="rounded-md border border-black/5 bg-white px-4 py-2 text-sm font-semibold hover:bg-slate-50"
            >
              Ver diretório
            </a>

            <button
              onClick={resetAll}
              className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-500"
            >
              Enviar outro cadastro
            </button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
          Diretório de Profissionais
        </p>

        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">
          Cadastrar meu serviço
        </h1>

        <p className="mt-4 text-slate-700">
          Envie seus dados para análise. Após aprovação, seu cadastro pode aparecer nas páginas do
          seu estado e cidade.
        </p>

        {error ? (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
            {error}
          </div>
        ) : null}

        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          {/* honeypot (invisível) */}
          <input
            value={form.companyWebsite}
            onChange={(e) => setForm((v) => ({ ...v, companyWebsite: e.target.value }))}
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
            aria-hidden="true"
          />

          <div>
            <label className="text-sm font-semibold text-slate-900">Nome / Empresa *</label>
            <input
              value={form.name}
              onChange={(e) => setForm((v) => ({ ...v, name: e.target.value }))}
              className="mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-600"
              placeholder="Ex.: Verde Consultoria"
              required
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="text-sm font-semibold text-slate-900">UF *</label>
              <select
                value={form.uf}
                onChange={(e) => setForm((v) => ({ ...v, uf: e.target.value }))}
                className="mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-600"
              >
                {UFS.map((u) => (
                  <option key={u} value={u}>
                    {u}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <div className="flex items-center justify-between gap-3">
                <label className="text-sm font-semibold text-slate-900">Cidade *</label>

                <button
                  type="button"
                  onClick={() => {
                    setManualCity((v) => !v);
                    setForm((prev) => ({ ...prev, city: "", cityId: null }));
                  }}
                  className="text-xs font-semibold text-emerald-700 hover:text-emerald-800"
                >
                  {manualCity ? "Selecionar da lista" : "Não encontrei minha cidade"}
                </button>
              </div>

              {!manualCity ? (
                <>
                  <select
                    value={form.cityId ? String(form.cityId) : ""}
                    onChange={(e) => {
                      const id = e.target.value ? Number(e.target.value) : null;
                      const found = id ? cities.find((c) => c.id === id) : undefined;

                      setForm((v) => ({
                        ...v,
                        cityId: id,
                        city: found?.name || "",
                      }));
                    }}
                    disabled={citiesLoading || !!citiesError}
                    className="mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-600 disabled:bg-slate-50"
                    required
                  >
                    <option value="">
                      {citiesLoading
                        ? "Carregando cidades..."
                        : citiesError
                        ? "Falha ao carregar cidades (clique em 'Não encontrei minha cidade')"
                        : "Selecione sua cidade"}
                    </option>

                    {cities.map((c) => (
                      <option key={c.id} value={String(c.id)}>
                        {c.name}
                      </option>
                    ))}
                  </select>

                  {citiesError ? (
                    <p className="mt-2 text-xs text-red-700">{citiesError}</p>
                  ) : (
                    <p className="mt-2 text-xs text-slate-500">
                      Lista carregada automaticamente por UF.
                    </p>
                  )}
                </>
              ) : (
                <>
                  <input
                    value={form.city}
                    onChange={(e) => setForm((v) => ({ ...v, city: e.target.value, cityId: null }))}
                    className="mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-600"
                    placeholder="Ex.: Belo Horizonte"
                    required
                  />
                  <p className="mt-2 text-xs text-slate-500">
                    Digite exatamente como você quer que apareça no diretório.
                  </p>
                </>
              )}
            </div>
          </div>

          {/* ✅ Categoria (select) */}
          <div>
            <label className="text-sm font-semibold text-slate-900">Categoria</label>
            <select
              value={form.category}
              onChange={(e) => {
                const cat = (e.target.value || "") as Category | "";
                setForm((v) => ({ ...v, category: cat }));
                setSelectedServices([]);
                setOtherService("");
              }}
              className="mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-600"
            >
              <option value="">Selecione uma categoria (opcional)</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <p className="mt-2 text-xs text-slate-500">
              Selecione uma categoria para ver serviços mais específicos (opcional).
            </p>
          </div>

          {/* ✅ Serviços (multi-select) */}
          <div>
            <label className="text-sm font-semibold text-slate-900">Serviços</label>

            <div className="mt-2 rounded-xl border border-black/10 bg-white p-4">
              <div className="flex flex-wrap gap-2">
                {serviceOptions.map((s) => {
                  const checked = selectedServices.includes(s);
                  return (
                    <label
                      key={s}
                      className={`inline-flex cursor-pointer items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${
                        checked
                          ? "border-emerald-600 bg-emerald-50 text-emerald-800"
                          : "border-black/10 bg-white text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <input
                        type="checkbox"
                        className="hidden"
                        checked={checked}
                        onChange={() => toggleService(s)}
                      />
                      {s}
                    </label>
                  );
                })}
              </div>

              <div className="mt-4">
                <label className="text-xs font-semibold text-slate-700">
                  Outro serviço (opcional)
                </label>
                <input
                  value={otherService}
                  onChange={(e) => setOtherService(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-600"
                  placeholder="Ex.: coleta de vidro em grandes volumes"
                />
                <p className="mt-2 text-xs text-slate-500">
                  Dica: selecione alguns serviços acima e use este campo só para complementar.
                </p>
              </div>
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-900">Descrição</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm((v) => ({ ...v, description: e.target.value }))}
              className="mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-600"
              placeholder="Em 2–4 linhas, descreva seu atendimento e público-alvo."
              rows={4}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="text-sm font-semibold text-slate-900">WhatsApp</label>
              <input
                value={form.whatsapp}
                onChange={(e) => setForm((v) => ({ ...v, whatsapp: e.target.value }))}
                className="mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-600"
                placeholder="Ex.: (31) 99999-9999"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-900">E-mail</label>
              <input
                value={form.email}
                onChange={(e) => setForm((v) => ({ ...v, email: e.target.value }))}
                className="mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-600"
                placeholder="contato@exemplo.com"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-900">Site</label>
              <input
                value={form.website}
                onChange={(e) => setForm((v) => ({ ...v, website: e.target.value }))}
                className="mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-600"
                placeholder="https://..."
              />
            </div>
          </div>

          {/* ✅ Checkbox obrigatório */}
          <div className="mt-6 rounded-xl border border-black/5 bg-slate-50 p-4">
            <label className="flex items-start gap-3 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={form.termsAccepted}
                onChange={(e) => setForm((v) => ({ ...v, termsAccepted: e.target.checked }))}
                required
                className="mt-1 h-4 w-4 accent-emerald-600"
              />
              <span>
                <strong>
                  Declaro que todas as informações fornecidas neste cadastro são verdadeiras e de
                  minha total responsabilidade.
                </strong>
                <br />
                Estou ciente de que o envio de informações falsas, incompletas ou enganosas poderá
                resultar na exclusão do cadastro e em medidas legais cabíveis, conforme a legislação
                vigente.
              </span>
            </label>
          </div>

          <div className="pt-2 flex flex-col gap-3 sm:flex-row">
            <button
              type="submit"
              disabled={!canSubmit || loading}
              className="w-full rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-500 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              {loading ? "Enviando..." : "Enviar para análise"}
            </button>

            <button
              type="button"
              disabled={loading}
              onClick={resetAll}
              className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Limpar
            </button>
          </div>

          <p className="mt-3 text-xs text-slate-500">
            Dica: quanto mais completo o cadastro, maior a chance de aparecer bem nas buscas.
          </p>
        </form>
      </section>
    </main>
  );
}
