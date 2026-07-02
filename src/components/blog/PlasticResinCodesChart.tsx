type ResinCode = {
  number: number;
  code: string;
  material: string;
};

const CODES: ResinCode[] = [
  { number: 1, code: "PET", material: "Garrafas de bebida" },
  { number: 2, code: "PEAD (HDPE)", material: "Frascos rígidos de limpeza" },
  { number: 3, code: "PVC", material: "Tubos e alguns filmes" },
  { number: 4, code: "PEBD (LDPE)", material: "Sacolas e plásticos flexíveis" },
  { number: 5, code: "PP", material: "Potes e tampas" },
  { number: 6, code: "PS", material: "Isopor e descartáveis" },
  { number: 7, code: "Outros", material: "Misturas e compostos" },
];

function TriangleBadge({ number }: { number: number }) {
  return (
    <svg viewBox="0 0 48 48" className="h-10 w-10 flex-shrink-0" aria-hidden="true">
      <polygon
        points="24,4 44,40 4,40"
        fill="none"
        stroke="#059669"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <text x="24" y="33" textAnchor="middle" fontSize="16" fontWeight="700" fill="#059669">
        {number}
      </text>
    </svg>
  );
}

// Diagrama visual dos códigos de identificação de resina plástica (1-7).
// Usa span/div em vez de p/ul/li para não herdar a tipografia do artigo.
export function PlasticResinCodesChart() {
  return (
    <div
      role="list"
      aria-label="Códigos de identificação de resina plástica"
      className="my-6 grid grid-cols-1 gap-3 sm:grid-cols-2"
    >
      {CODES.map((item) => (
        <div
          key={item.number}
          role="listitem"
          className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm"
        >
          <TriangleBadge number={item.number} />
          <div>
            <span className="block text-sm font-semibold text-slate-900">
              {item.number} — {item.code}
            </span>
            <span className="block text-xs text-slate-600">{item.material}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
