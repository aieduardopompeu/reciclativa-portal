"use client";

import * as React from "react";

type Props = {
  value?: string; // UF selecionada (ex: "RJ")
  onSelect: (uf: string) => void;
  src?: string; // default: "/maps/brazil-states.svg"
  className?: string;
  showStatus?: boolean;
};

type StateInfo = { uf: string; name: string };

/**
 * IMPORTANTe:
 * - As chaves aqui são IDs possíveis no seu SVG.
 * - Coloque quantas variações precisar (underscore, camelCase, etc).
 */
const STATE_ID_TO_INFO: Record<string, StateInfo> = {
  Acre: { uf: "AC", name: "Acre" },
  Alagoas: { uf: "AL", name: "Alagoas" },
  Amapa: { uf: "AP", name: "Amapá" },
  Amazonas: { uf: "AM", name: "Amazonas" },
  Bahia: { uf: "BA", name: "Bahia" },
  Ceara: { uf: "CE", name: "Ceará" },
  BrasiliaDistritoFederal: { uf: "DF", name: "Distrito Federal" },
  EspiritoSanto: { uf: "ES", name: "Espírito Santo" },
  Goias: { uf: "GO", name: "Goiás" },
  Maranhao: { uf: "MA", name: "Maranhão" },
  MatoGrosso: { uf: "MT", name: "Mato Grosso" },
  MatoGrosso_do_Sul: { uf: "MS", name: "Mato Grosso do Sul" },
  MatoGrosso_doSul: { uf: "MS", name: "Mato Grosso do Sul" },
  MatoGrossoDoSul: { uf: "MS", name: "Mato Grosso do Sul" },
  MinasGerais: { uf: "MG", name: "Minas Gerais" },
  Para: { uf: "PA", name: "Pará" },
  Paraiba: { uf: "PB", name: "Paraíba" },
  Parana: { uf: "PR", name: "Paraná" },
  Pernambuco: { uf: "PE", name: "Pernambuco" },
  Piaui: { uf: "PI", name: "Piauí" },

  // RJ (você encontrou Rio_deJaneiro)
  RioDeJaneiro: { uf: "RJ", name: "Rio de Janeiro" },
  Rio_deJaneiro: { uf: "RJ", name: "Rio de Janeiro" },
  Rio_de_Janeiro: { uf: "RJ", name: "Rio de Janeiro" },

  Rondonia: { uf: "RO", name: "Rondônia" },
  Roraima: { uf: "RR", name: "Roraima" },
  SantaCatarina: { uf: "SC", name: "Santa Catarina" },
  SaoPaulo: { uf: "SP", name: "São Paulo" },
  Sergipe: { uf: "SE", name: "Sergipe" },
  Tocantins: { uf: "TO", name: "Tocantins" },

  // RN (variações comuns — seu arquivo pode estar em qualquer uma dessas)
  RioGrande_do_Norte: { uf: "RN", name: "Rio Grande do Norte" },
  RioGrande_doNorte: { uf: "RN", name: "Rio Grande do Norte" },
  RioGrandeDoNorte: { uf: "RN", name: "Rio Grande do Norte" },
  Rio_Grande_do_Norte: { uf: "RN", name: "Rio Grande do Norte" },
  Rio_Grande_doNorte: { uf: "RN", name: "Rio Grande do Norte" },
  Rio_Grande_Do_Norte: { uf: "RN", name: "Rio Grande do Norte" },

  // RS (variações comuns)
  RioGrande_do_Sul: { uf: "RS", name: "Rio Grande do Sul" },
  RioGrande_doSul: { uf: "RS", name: "Rio Grande do Sul" },
  RioGrandeDoSul: { uf: "RS", name: "Rio Grande do Sul" },
  Rio_Grande_do_Sul: { uf: "RS", name: "Rio Grande do Sul" },
  Rio_Grande_doSul: { uf: "RS", name: "Rio Grande do Sul" },
  Rio_Grande_Do_Sul: { uf: "RS", name: "Rio Grande do Sul" },
};

function normalizeUF(v?: string) {
  return (v || "").trim().toUpperCase();
}

/** Sobe a árvore do DOM a partir do alvo do mouse e procura um `id` conhecido de estado. */
function findStateInfoFromTarget(target: EventTarget | null, root: HTMLElement): { id: string; info: StateInfo } | null {
  if (!(target instanceof Element)) return null;

  let el: Element | null = target;
  for (let i = 0; i < 30 && el && el !== root; i++) {
    const id = el.getAttribute?.("id");
    if (id && STATE_ID_TO_INFO[id]) return { id, info: STATE_ID_TO_INFO[id] };
    el = el.parentElement;
  }
  return null;
}

export default function BrazilStatesMap({
  value,
  onSelect,
  src = "/maps/brazil-states.svg",
  className,
  showStatus = true,
}: Props) {
  const [svgMarkup, setSvgMarkup] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");
  const [hover, setHover] = React.useState<{ id: string; info: StateInfo } | null>(null);
  const [mouse, setMouse] = React.useState<{ x: number; y: number } | null>(null);

  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const selectedUF = normalizeUF(value);

  React.useEffect(() => {
    let alive = true;

    (async () => {
      try {
        setError("");
        const res = await fetch(src, { cache: "no-store" });
        if (!res.ok) throw new Error(`Falha ao carregar SVG (${res.status}) em ${src}`);

        const ct = res.headers.get("content-type") || "";
        if (ct.includes("text/html")) throw new Error(`O caminho ${src} está retornando HTML (provável 404).`);

        const text = await res.text();
        const sanitized = text.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "");
        if (!sanitized.includes("<svg")) throw new Error(`Conteúdo em ${src} não parece um SVG válido.`);

        if (alive) setSvgMarkup(sanitized);
      } catch (e: any) {
        if (!alive) return;
        setSvgMarkup("");
        setError(e?.message || "Erro ao carregar o mapa.");
      }
    })();

    return () => {
      alive = false;
    };
  }, [src]);

  // Pós-processa o SVG para responsividade e para permitir hover/seleção via CSS
  React.useEffect(() => {
    const root = rootRef.current;
    if (!root || !svgMarkup) return;

    const svg = root.querySelector("svg");
    if (!svg) return;

    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "auto");
    svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
    (svg as any).style.display = "block";

    // Marcar IDs conhecidos (podem estar em <g> ou <path>)
    Object.keys(STATE_ID_TO_INFO).forEach((stateId) => {
      const node = svg.querySelector<SVGElement>(`#${CSS.escape(stateId)}`);
      if (!node) return;
      node.classList.add("br-state-hit");
      (node as any).style.pointerEvents = "auto";
      (node as any).style.cursor = "pointer";
    });

    // Garantir que paths internos também recebam eventos (quando o id está no <g>)
    svg.querySelectorAll<SVGPathElement>("path").forEach((p) => {
      (p as any).style.pointerEvents = "auto";
    });
  }, [svgMarkup]);

  const statusText = React.useMemo(() => {
    // Se já existe UF selecionada, mostramos UF apenas (ou você pode querer nome também)
    if (selectedUF) return `Selecionado: ${selectedUF}`;
    if (hover) return `Estado: ${hover.info.name} — ${hover.info.uf}`;
    return "Clique em um estado no mapa";
  }, [selectedUF, hover]);

  if (error) {
    return (
      <div className={className}>
        {showStatus ? <div className="mb-2 text-sm text-slate-600">Mapa indisponível</div> : null}
        <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-700">{error}</div>
      </div>
    );
  }

  if (!svgMarkup) {
    return (
      <div className={className}>
        {showStatus ? <div className="mb-2 text-sm text-slate-600">Carregando mapa…</div> : null}
        <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600">Carregando…</div>
      </div>
    );
  }

  return (
    <div className={className}>
      {showStatus ? <div className="mb-2 text-sm text-slate-600">{statusText}</div> : null}

      <div
        ref={rootRef}
        className="relative rounded-xl border border-slate-200 bg-white p-3"
        onClick={(e) => {
          const root = rootRef.current;
          if (!root) return;

          const found = findStateInfoFromTarget(e.target, root);
          if (!found) return;

          onSelect(found.info.uf);
        }}
        onMouseMove={(e) => {
          const root = rootRef.current;
          if (!root) return;

          const rect = root.getBoundingClientRect();
          setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });

          const found = findStateInfoFromTarget(e.target, root);
          setHover(found);
        }}
        onMouseLeave={() => {
          setHover(null);
          setMouse(null);
        }}
      >
        {/* Tooltip dentro do mapa */}
        {hover && mouse ? (
          <div
            className="pointer-events-none absolute z-10 rounded-lg border border-slate-200 bg-white/95 px-2 py-1 text-xs font-semibold text-slate-900 shadow-sm"
            style={{
              left: Math.min(mouse.x + 12, 520), // evita “estourar” para fora
              top: Math.max(mouse.y - 28, 8),
            }}
          >
            {hover.info.name} — {hover.info.uf}
          </div>
        ) : null}

        <style>{`
          .br-map svg { width: 100%; height: auto; }

          /* Hover/seleção: aplica no nó com id e também nos paths internos */
          .br-map .br-state-hit:hover,
          .br-map .br-state-hit:hover path {
            opacity: .92;
            filter: brightness(.95);
          }
        `}</style>

        <div className="br-map" dangerouslySetInnerHTML={{ __html: svgMarkup }} />
      </div>
    </div>
  );
}
