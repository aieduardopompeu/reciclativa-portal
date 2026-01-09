"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Priority = "P0" | "P1" | "P2";
type Status = "done" | "todo";

type ChecklistItem = {
  id: string;
  p: Priority;
  title: string;
  detail?: string;
  status: Status;
};

type ChecklistState = {
  version: number;
  savedAt: number | null;
  notes: string;
  items: ChecklistItem[];
};

const STORAGE_KEY = "reciclativa_adsense_checklist_v1";

function nowTs() {
  return Date.now();
}

function formatBR(ts: number) {
  try {
    return new Date(ts).toLocaleString("pt-BR");
  } catch {
    return "";
  }
}

function downloadJson(filename: string, obj: unknown) {
  const blob = new Blob([JSON.stringify(obj, null, 2)], { type: "application/json;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function clsBadgeBase() {
  return "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold";
}

function clsPriority(p: Priority) {
  if (p === "P0") return `${clsBadgeBase()} border-red-200 bg-red-50 text-red-700`;
  if (p === "P1") return `${clsBadgeBase()} border-yellow-200 bg-yellow-50 text-yellow-700`;
  return `${clsBadgeBase()} border-slate-200 bg-slate-50 text-slate-700`;
}

function clsStatus(isApto: boolean) {
  if (isApto) return "inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800";
  return "inline-flex items-center rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-semibold text-red-800";
}

const DEFAULT_ITEMS: ChecklistItem[] = [
  // P0 — Bloqueadores
  {
    id: "p0-profissionais-ssr",
    p: "P0",
    title: "/profissionais com conteúdo SSR (sem depender de JS)",
    detail: "Adicionar fallback SSR com texto editorial + lista de UFs + CTA. Evita “Carregando...” para crawler.",
    status: "todo",
  },
  {
    id: "p0-anuncie-noindex",
    p: "P0",
    title: "/anuncie com noindex + sem anúncios",
    detail: "Página de formulário não deve indexar nem renderizar ads. Alto risco de reprovação por thin content.",
    status: "todo",
  },
  {
    id: "p0-privacidade-termos-cookies",
    p: "P0",
    title: "Política de Privacidade, Cookies e Termos: acessíveis e coerentes",
    detail: "Coerência com cookies/GA4/formulários/diretório e publicidade.",
    status: "todo",
  },
  {
    id: "p0-contato-claro",
    p: "P0",
    title: "Contato: e-mail visível + canal funcional",
    detail: "Contato é item de confiança para revisão manual.",
    status: "todo",
  },
  {
    id: "p0-sobre-editorial",
    p: "P0",
    title: "Sobre: texto humano e completo (confiança editorial)",
    detail: "Missão, escopo do site, como o conteúdo é produzido e como o diretório funciona.",
    status: "todo",
  },
  {
    id: "p0-conteudo-forte",
    p: "P0",
    title: "Conteúdo editorial forte (pelo menos 5 páginas/postagens robustas)",
    detail: "Evitar site parecer “só diretório”. Manter guias/artigos com 800–1200+ palavras quando aplicável.",
    status: "todo",
  },
  {
    id: "p0-sem-thin-indexado",
    p: "P0",
    title: "Nenhuma página fraca indexada (thin content → melhorar ou noindex)",
    detail: "Especialmente rotas de listagem vazias, formulários e páginas com pouco texto útil.",
    status: "todo",
  },
  {
    id: "p0-redirect-www",
    p: "P0",
    title: "Canônico www: non-www → www com redirect permanente",
    detail: "Evita duplicação e rastreamento inconsistente. (Vercel 308).",
    status: "done",
  },
  {
    id: "p0-sitemap-limpo",
    p: "P0",
    title: "Sitemap não lista páginas vazias/finas",
    detail: "Se listar, revisar: tirar do sitemap ou noindex.",
    status: "todo",
  },

  // P1 — Reforços
  {
    id: "p1-diretorio-sem-mvp",
    p: "P1",
    title: "/diretorio sem linguagem de placeholder (“MVP”, “em breve”)",
    detail: "Trocar por linguagem editorial e utilidade atual. Ajuda revisão manual.",
    status: "todo",
  },
  {
    id: "p1-ux-navegacao",
    p: "P1",
    title: "Navegação clara: usuário encontra conteúdo sem ser “forçado” a converter",
    detail: "Menu e links internos equilibrados. Evitar excesso de CTAs comerciais acima da dobra.",
    status: "todo",
  },
  {
    id: "p1-cookie-banner",
    p: "P1",
    title: "Cookie banner não cobre conteúdo nem força clique",
    detail: "Evitar UX agressiva (piora percepção e pode gerar reclamações).",
    status: "todo",
  },
  {
    id: "p1-ads-places",
    p: "P1",
    title: "Ads posicionados com moderação (sem poluição visual)",
    detail: "Principalmente no mobile. Evitar empurrar conteúdo principal.",
    status: "todo",
  },

  // P2 — Higiene técnica
  {
    id: "p2-robots-ok",
    p: "P2",
    title: "robots.txt não bloqueia páginas importantes",
    detail: "Home/Guias/Blog/Posts/Políticas devem ser rastreáveis.",
    status: "todo",
  },
  {
    id: "p2-sem-soft404",
    p: "P2",
    title: "Sem soft-404 (URL válida com conteúdo vazio)",
    detail: "Listagens vazias precisam de texto/CTA e não parecer “sem conteúdo”.",
    status: "todo",
  },
  {
    id: "p2-sem-cloaking",
    p: "P2",
    title: "Sem redirecionamentos enganosos/cloaking",
    detail: "Nada de conteúdo diferente para bots vs usuários.",
    status: "todo",
  },
];

const DEFAULT_STATE: ChecklistState = {
  version: 1,
  savedAt: null,
  notes: "",
  items: DEFAULT_ITEMS,
};

export default function ChecklistClient() {
  const [state, setState] = useState<ChecklistState>(DEFAULT_STATE);
  const saveTimer = useRef<number | null>(null);

  // load
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as ChecklistState;
      if (parsed?.items?.length) {
        setState({
          version: 1,
          savedAt: parsed.savedAt ?? null,
          notes: parsed.notes ?? "",
          items: parsed.items,
        });
      }
    } catch {
      // ignore
    }
  }, []);

  // save (debounced)
  useEffect(() => {
    if (saveTimer.current) window.clearTimeout(saveTimer.current);
    saveTimer.current = window.setTimeout(() => {
      try {
        const next = { ...state, savedAt: nowTs() };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        setState((s) => ({ ...s, savedAt: next.savedAt }));
      } catch {
        // ignore
      }
    }, 350);

    return () => {
      if (saveTimer.current) window.clearTimeout(saveTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.items, state.notes]);

  const grouped = useMemo(() => {
    const p0 = state.items.filter((i) => i.p === "P0");
    const p1 = state.items.filter((i) => i.p === "P1");
    const p2 = state.items.filter((i) => i.p === "P2");
    return { p0, p1, p2 };
  }, [state.items]);

  const stats = useMemo(() => {
    const total = state.items.length;
    const done = state.items.filter((i) => i.status === "done").length;

    const p0 = grouped.p0.length;
    const p0Done = grouped.p0.filter((i) => i.status === "done").length;

    const missingP0 = grouped.p0.filter((i) => i.status !== "done").length;

    return { total, done, p0, p0Done, missingP0 };
  }, [state.items, grouped]);

  const isApto = stats.missingP0 === 0;

  const reason = useMemo(() => {
    if (!isApto) return "Conteúdo de baixo valor";
    // Se quiser, pode refinar depois por heurística
    return "Pronto para pedir revisão";
  }, [isApto]);

  function toggleItem(id: string) {
    setState((s) => ({
      ...s,
      items: s.items.map((it) =>
        it.id === id ? { ...it, status: it.status === "done" ? "todo" : "done" } : it
      ),
    }));
  }

  function setAll(p: Priority, value: Status) {
    setState((s) => ({
      ...s,
      items: s.items.map((it) => (it.p === p ? { ...it, status: value } : it)),
    }));
  }

  function exportJson() {
    const payload = { ...state, exportedAt: nowTs() };
    downloadJson(`reciclativa-adsense-checklist.json`, payload);
  }

  function resetAll() {
    const ok = confirm("Zerar checklist e observações? Isso apaga o progresso salvo neste navegador.");
    if (!ok) return;
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
    setState(DEFAULT_STATE);
  }

  function printPage() {
    window.print();
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold">Checklist AdSense — Reciclativa</h1>

        <div className="mt-2 text-sm text-slate-600">
          <span className="font-semibold">Motivo atual:</span> {reason} •{" "}
          <span className="font-semibold">Progresso:</span> {stats.done}/{stats.total} •{" "}
          <span className="font-semibold">P0:</span> {stats.p0Done}/{stats.p0} •{" "}
          <span className="font-semibold">Salvo:</span>{" "}
          {state.savedAt ? formatBR(state.savedAt) : "—"}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <span className={clsStatus(isApto)}>
            {isApto ? "APTO (P0 completo)" : "NÃO APTO (faltam itens P0)"}
          </span>

          <div className="ml-auto flex flex-wrap gap-2">
            <button
              type="button"
              onClick={printPage}
              className="rounded-lg border border-black/10 bg-white px-4 py-2 text-sm font-semibold hover:bg-slate-50"
            >
              Imprimir
            </button>
            <button
              type="button"
              onClick={exportJson}
              className="rounded-lg border border-black/10 bg-white px-4 py-2 text-sm font-semibold hover:bg-slate-50"
            >
              Exportar JSON
            </button>
            <button
              type="button"
              onClick={resetAll}
              className="rounded-lg border border-black/10 bg-white px-4 py-2 text-sm font-semibold hover:bg-slate-50"
            >
              Zerar
            </button>
          </div>
        </div>

        <p className="mt-3 text-sm text-slate-600">
          Dica: mantenha esta rota sem link no menu (uso interno).
        </p>
      </div>

      {/* P0 */}
      <section className="mt-8 rounded-2xl border border-black/10 bg-white p-6">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-lg font-bold">P0 — Bloqueadores (não pedir revisão se faltar)</h2>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setAll("P0", "done")}
              className="rounded-lg border border-black/10 bg-white px-3 py-2 text-sm font-semibold hover:bg-slate-50"
            >
              Marcar tudo
            </button>
            <button
              type="button"
              onClick={() => setAll("P0", "todo")}
              className="rounded-lg border border-black/10 bg-white px-3 py-2 text-sm font-semibold hover:bg-slate-50"
            >
              Desmarcar
            </button>
          </div>
        </div>

        <div className="mt-4 divide-y divide-black/5">
          {grouped.p0.map((it) => (
            <label key={it.id} className="flex gap-3 py-4">
              <input
                type="checkbox"
                checked={it.status === "done"}
                onChange={() => toggleItem(it.id)}
                className="mt-1 h-4 w-4 accent-emerald-600"
              />
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={clsPriority(it.p)}>{it.p}</span>
                  <span className="font-semibold">{it.title}</span>
                </div>
                {it.detail && <p className="mt-1 text-sm text-slate-600">{it.detail}</p>}
              </div>
            </label>
          ))}
        </div>
      </section>

      {/* P1 */}
      <section className="mt-6 rounded-2xl border border-black/10 bg-white p-6">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-lg font-bold">P1 — Reforços (melhoram percepção de valor)</h2>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setAll("P1", "done")}
              className="rounded-lg border border-black/10 bg-white px-3 py-2 text-sm font-semibold hover:bg-slate-50"
            >
              Marcar tudo
            </button>
            <button
              type="button"
              onClick={() => setAll("P1", "todo")}
              className="rounded-lg border border-black/10 bg-white px-3 py-2 text-sm font-semibold hover:bg-slate-50"
            >
              Desmarcar
            </button>
          </div>
        </div>

        <div className="mt-4 divide-y divide-black/5">
          {grouped.p1.map((it) => (
            <label key={it.id} className="flex gap-3 py-4">
              <input
                type="checkbox"
                checked={it.status === "done"}
                onChange={() => toggleItem(it.id)}
                className="mt-1 h-4 w-4 accent-emerald-600"
              />
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={clsPriority(it.p)}>{it.p}</span>
                  <span className="font-semibold">{it.title}</span>
                </div>
                {it.detail && <p className="mt-1 text-sm text-slate-600">{it.detail}</p>}
              </div>
            </label>
          ))}
        </div>
      </section>

      {/* P2 */}
      <section className="mt-6 rounded-2xl border border-black/10 bg-white p-6">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-lg font-bold">P2 — Higiene técnica (remove ruído)</h2>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setAll("P2", "done")}
              className="rounded-lg border border-black/10 bg-white px-3 py-2 text-sm font-semibold hover:bg-slate-50"
            >
              Marcar tudo
            </button>
            <button
              type="button"
              onClick={() => setAll("P2", "todo")}
              className="rounded-lg border border-black/10 bg-white px-3 py-2 text-sm font-semibold hover:bg-slate-50"
            >
              Desmarcar
            </button>
          </div>
        </div>

        <div className="mt-4 divide-y divide-black/5">
          {grouped.p2.map((it) => (
            <label key={it.id} className="flex gap-3 py-4">
              <input
                type="checkbox"
                checked={it.status === "done"}
                onChange={() => toggleItem(it.id)}
                className="mt-1 h-4 w-4 accent-emerald-600"
              />
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={clsPriority(it.p)}>{it.p}</span>
                  <span className="font-semibold">{it.title}</span>
                </div>
                {it.detail && <p className="mt-1 text-sm text-slate-600">{it.detail}</p>}
              </div>
            </label>
          ))}
        </div>
      </section>

      {/* Observações */}
      <section className="mt-6 rounded-2xl border border-black/10 bg-white p-6">
        <h2 className="text-lg font-bold">Observações</h2>
        <textarea
          value={state.notes}
          onChange={(e) => setState((s) => ({ ...s, notes: e.target.value }))}
          placeholder="Ex.: páginas ajustadas, rotas com noindex, pendências, datas, links..."
          className="mt-3 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-600"
          rows={6}
        />
        <p className="mt-2 text-xs text-slate-500">
          O progresso fica salvo no seu navegador (localStorage). Para compartilhar, use “Exportar JSON”.
        </p>
      </section>
    </main>
  );
}
