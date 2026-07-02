function FlowArrow() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 flex-shrink-0 text-slate-400" aria-hidden="true">
      <path
        d="M4 12h13m0 0-4-4m4 4-4 4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FlowStep({ label, tone }: { label: string; tone: "linear" | "circular" }) {
  const toneClass =
    tone === "linear"
      ? "border-slate-300 bg-slate-50 text-slate-800"
      : "border-emerald-300 bg-emerald-50 text-emerald-900";

  return (
    <span
      className={`inline-block rounded-xl border px-3 py-2 text-center text-xs font-semibold sm:text-sm ${toneClass}`}
    >
      {label}
    </span>
  );
}

const LINEAR_STEPS = ["Extrair", "Produzir", "Consumir", "Descartar"];
const CIRCULAR_STEPS = ["Reduzir", "Reusar", "Reparar", "Reciclar"];

// Diagrama visual comparando o fluxo linear (mão única) com o circular
// (retorno ao início). Usa span/div em vez de p/ul/li/strong para não
// herdar a tipografia do artigo.
export function CircularVsLinearDiagram() {
  return (
    <div className="my-6 space-y-5">
      <div>
        <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          Modelo linear
        </span>
        <div className="flex flex-wrap items-center gap-2">
          {LINEAR_STEPS.map((step, i) => (
            <div key={step} className="flex items-center gap-2">
              <FlowStep label={step} tone="linear" />
              {i < LINEAR_STEPS.length - 1 ? <FlowArrow /> : null}
            </div>
          ))}
        </div>
      </div>

      <div>
        <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
          Modelo circular
        </span>
        <div className="flex flex-wrap items-center gap-2">
          {CIRCULAR_STEPS.map((step, i) => (
            <div key={step} className="flex items-center gap-2">
              <FlowStep label={step} tone="circular" />
              {i < CIRCULAR_STEPS.length - 1 ? (
                <FlowArrow />
              ) : (
                <span className="ml-1 text-xs font-semibold text-emerald-700">
                  ↻ volta ao início
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
