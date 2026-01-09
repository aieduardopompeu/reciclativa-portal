"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Priority = "P0" | "P1" | "P2";

type Item = {
  id: string;
  p: Priority;
  title: string;
  detail?: string;
  done: boolean;
};

type Persisted = {
  v: number;
  savedAt: number;
  notes: string;
  doneMap: Record<string, boolean>;
};

const STORAGE_KEY = "reciclativa_admin_adsense_checklist_v1";
const VERSION = 1;

function formatBR(ts: number) {
  try {
    return new Date(ts).toLocaleString("pt-BR");
  } catch {
    return "";
  }
}

function downloadJson(filename: string, obj: unknown) {
  const blob = new Blob([JSON.stringify(obj, null, 2)], {
    type: "application/json;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

// ✅ ÚNICA implementação (evita erro ts(2393))
function clsBadge(p: Priority) {
  const base =
    "inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold";
  if (p === "P0") return `${base} border-red-200 bg-red-50 text-red-700`;
  if (p === "P1") return `${base} border-yellow-200 bg-yellow-50 text-yellow-700`;
  return `${base} border-slate-200 bg-slate-50 text-slate-700`;
}

const ITEMS: Item[] = [
  // P0 — Bloqueadores
  {
    id: "home-editorial",
    p: "P0",
    title:
      "Home: conteúdo editorial fixo (H2 + 3–5 parágrafos, informativo, não comercial)",
    detail:
      "A Home já é boa; garantir consistência editorial e evitar ‘página só de navegação’.",
    done: false,
  },
  {
    id: "profissionais-ssr",
    p: "P0",
    title: "/profissionais: conteúdo SSR (sem depender de JS)",
    detail:
      "Adicionar fallback SSR com texto editorial + lista de UFs + CTA. Evita ‘Carregando...’ no HTML inicial.",
    done: false,
  },
  {
    id: "anuncie-noindex",
    p: "P0",
    title: "/anuncie: noindex + sem anúncios",
    detail:
      "Página de formulário não deve indexar nem renderizar ads (thin content).",
    done: false,
  },
  {
    id: "politicas",
    p: "P0",
    title:
      "Privacidade + Cookies + Termos: acessíveis e coerentes (cookies, GA4, formulários, diretório)",
    done: false,
  },
  {
    id: "sobre-humano",
    p: "P0",
    title:
      "Sobre: texto humano e completo (quem é o projeto, objetivo, processo real) com 300+ palavras",
    done: false,
  },
  {
    id: "contato",
    p: "P0",
    title:
      "Contato: canal claro (e-mail) + instruções/horário (se houver) + cidade/UF (se fizer sentido)",
    done: false,
  },
  {
    id: "thin-indexado",
    p: "P0",
    title:
      "Não existe página fraca indexada (se fraca → melhorar ou noindex)",
    detail:
      "Um único ‘post raso’ ou listagem vazia pode derrubar a avaliação do site inteiro.",
    done: false,
  },
  {
    id: "sitemap-limpo",
    p: "P0",
    title:
      "Sitemap: não lista páginas vazias/thin; o que for fraco está noindex ou fora do sitemap",
    done: false,
  },
  {
    id: "subdominios-testes",
    p: "P0",
    title:
      "Subdomínios/testes: não existe placeholder/teste acessível (sem lixo indexável)",
    detail:
      "Garantir que não há rotas antigas com conteúdo genérico acessível.",
    done: false,
  },

  // P1 — Reforços
  {
    id: "cookie-banner",
    p: "P1",
    title: "Banner de cookies não cobre conteúdo e não força clique",
    done: false,
  },
  {
    id: "cta-flutuante",
    p: "P1",
    title: "CTA flutuante (se existir) não cobre texto em mobile",
    done: false,
  },
  {
    id: "navegacao",
    p: "P1",
    title:
      "Navegação clara: usuário encontra conteúdo sem ser ‘forçado’ a converter",
    done: false,
  },
  {
    id: "diretorio-copy",
    p: "P1",
    title:
      "/diretorio: evitar linguagem de ‘MVP/em breve’; reforçar utilidade e orientar o usuário",
    done: false,
  },

  // P2 — Higiene técnica
  {
    id: "robots",
    p: "P2",
    title:
      "robots.txt não bloqueia páginas importantes (Home/Guias/Blog/Posts)",
    done: false,
  },
  {
    id: "sem-soft404",
    p: "P2",
    title: "Sem soft-404: páginas com URL válida mas sem conteúdo real",
    done: false,
  },
  {
    id: "sem-cloaking",
    p: "P2",
    title: "Sem redirecionamentos enganosos/cloaking",
    done: false,
  },
];

export default function ChecklistClient() {
  const [doneMap, setDoneMap] = useState<Record<string, boolean>>({});
  const [notes, setNotes] = useState("");
  const [savedAt, setSavedAt] = useState<number | null>(null);
  const saveTimer = useRef<number | null>(null);

  // load
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as Persisted;
      if (parsed?.v !== VERSION) return;
      setDoneMap(parsed.doneMap || {});
      setNotes(parsed.notes || "");
      setSavedAt(parsed.savedAt || null);
    } catch {
      // ignore
    }
  }, []);

  // save (debounced)
  useEffect(() => {
    if (saveTimer.current) window.clearTimeout(saveTimer.current);
    saveTimer.current = window.setTimeout(() => {
      try {
        const payload: Persisted = {
          v: VERSION,
          savedAt: Date.now(),
          notes,
          doneMap,
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
        setSavedAt(payload.savedAt);
      } catch {
        // ignore
      }
    }, 350);

    return () => {
      if (saveTimer.current) window.clearTimeout(saveTimer.current);
    };
  }, [doneMap, notes]);

  const enriched = useMemo(() => {
    return ITEMS.map((it) => ({ ...it, done: Boolean(doneMap[it.id]) }));
  }, [doneMap]);

  const grouped = useMemo(() => {
    const p0 = enriched.filter((i) => i.p === "P0");
    const p1 = enriched.filter((i) => i.p === "P1");
    const p2 = enriched.filter((i) => i.p === "P2");
    return { p0, p1, p2 };
  }, [enriched]);

  const stats = useMemo(() => {
    const total = enriched.length;
    const done = enriched.filter((i) => i.done).length;
    const p0Total = grouped.p0.length;
    const p0Done = grouped.p0.filter((i) => i.done).length;
    const missingP0 = p0Total - p0Done;
    return { total, done, p0Total, p0Done, missingP0 };
  }, [enriched, grouped]);

  const isApto = stats.missingP0 === 0;
  const motivoAtual = isApto ? "Pronto para pedir revisão" : "Conteúdo de baixo valor";

  function toggle(id: string) {
    setDoneMap((m) => ({ ...m, [id]: !m[id] }));
  }

  function markAll(p: Priority, value: boolean) {
    setDoneMap((m) => {
      const next = { ...m };
      for (const it of ITEMS) {
        if (it.p === p) next[it.id] = value;
      }
      return next;
    });
  }

  function resetAll() {
    const ok = confirm(
      "Zerar checklist e observações? Isso apaga o progresso salvo neste navegador."
    );
    if (!ok) return;
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
    setDoneMap({});
    setNotes("");
    setSavedAt(null);
  }

  function exportJSON() {
    const payload = {
      meta: {
        project: "Reciclativa",
        type: "adsense-checklist",
        version: VERSION,
        exportedAt: Date.now(),
      },
      progress: {
        done: stats.done,
        total: stats.total,
        p0Done: stats.p0Done,
        p0Total: stats.p0Total,
        isApto,
        motivoAtual,
      },
      notes,
      items: enriched.map(({ id, p, title, detail, done }) => ({
        id,
        p,
        title,
        detail,
        done,
      })),
    };
    downloadJson("reciclativa-adsense-checklist.json", payload);
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold">Checklist AdSense — Reciclativa</h1>

        <div className="mt-2 text-sm text-slate-600">
          Motivo atual: <span className="font-semibold">{motivoAtual}</span> •{" "}
          Progresso:{" "}
          <span className="font-semibold">
            {stats.done}/{stats.total}
          </span>{" "}
          • P0:{" "}
          <span className="font-semibold">
            {stats.p0Done}/{stats.p0Total}
          </span>{" "}
          • Salvo:{" "}
          <span className="font-semibold">
            {savedAt ? formatBR(savedAt) : "—"}
          </span>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <span
            className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${
              isApto
                ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                : "border-red-200 bg-red-50 text-red-800"
            }`}
          >
            {isApto ? "APTO (P0 completo)" : "NÃO APTO (faltam itens P0)"}
          </span>

          <div className="ml-auto flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="rounded-lg border border-black/10 bg-white px-4 py-2 text-sm font-semibold hover:bg-slate-50"
            >
              Imprimir
            </button>
            <button
              type="button"
              onClick={exportJSON}
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
          Dica: mantenha esta rota sem link no menu público (uso interno).
        </p>
      </div>

      <Section
        title="P0 — Bloqueadores (não pedir revisão se faltar)"
        items={grouped.p0}
        onToggle={toggle}
        onMarkAll={() => markAll("P0", true)}
        onUnmarkAll={() => markAll("P0", false)}
      />

      <Section
        title="P1 — Reforços (melhoram percepção de valor)"
        items={grouped.p1}
        onToggle={toggle}
        onMarkAll={() => markAll("P1", true)}
        onUnmarkAll={() => markAll("P1", false)}
      />

      <Section
        title="P2 — Higiene técnica (remove ruído)"
        items={grouped.p2}
        onToggle={toggle}
        onMarkAll={() => markAll("P2", true)}
        onUnmarkAll={() => markAll("P2", false)}
      />

      <section className="mt-6 rounded-2xl border border-black/10 bg-white p-6">
        <h2 className="text-lg font-bold">Observações</h2>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Ex.: páginas ajustadas, noindex aplicados, pendências, datas, links..."
          className="mt-3 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-600"
          rows={6}
        />
        <p className="mt-2 text-xs text-slate-500">
          O progresso fica salvo no seu navegador (localStorage). Para
          compartilhar, use “Exportar JSON”.
        </p>
      </section>
    </main>
  );
}

function Section({
  title,
  items,
  onToggle,
  onMarkAll,
  onUnmarkAll,
}: {
  title: string;
  items: Item[];
  onToggle: (id: string) => void;
  onMarkAll: () => void;
  onUnmarkAll: () => void;
}) {
  return (
    <section className="mt-6 rounded-2xl border border-black/10 bg-white p-6">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-bold">{title}</h2>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onMarkAll}
            className="rounded-lg border border-black/10 bg-white px-3 py-2 text-sm font-semibold hover:bg-slate-50"
          >
            Marcar tudo
          </button>
          <button
            type="button"
            onClick={onUnmarkAll}
            className="rounded-lg border border-black/10 bg-white px-3 py-2 text-sm font-semibold hover:bg-slate-50"
          >
            Desmarcar
          </button>
        </div>
      </div>

      <div className="mt-4 divide-y divide-black/5">
        {items.map((it) => (
          <label key={it.id} className="flex gap-3 py-4">
            <input
              type="checkbox"
              checked={it.done}
              onChange={() => onToggle(it.id)}
              className="mt-1 h-4 w-4 accent-emerald-600"
            />
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className={clsBadge(it.p)}>{it.p}</span>
                <span className="font-semibold">{it.title}</span>
              </div>
              {it.detail && (
                <p className="mt-1 text-sm text-slate-600">{it.detail}</p>
              )}
            </div>
          </label>
        ))}
      </div>
    </section>
  );
}
