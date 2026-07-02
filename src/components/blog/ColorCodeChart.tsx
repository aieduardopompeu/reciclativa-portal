type ColorCodeItem = {
  swatchClass: string;
  label: string;
  material: string;
};

const ITEMS: ColorCodeItem[] = [
  { swatchClass: "bg-blue-600", label: "Azul", material: "Papel e papelão" },
  { swatchClass: "bg-red-600", label: "Vermelho", material: "Plástico" },
  { swatchClass: "bg-green-600", label: "Verde", material: "Vidro" },
  { swatchClass: "bg-yellow-400", label: "Amarelo", material: "Metal" },
  { swatchClass: "bg-amber-800", label: "Marrom", material: "Orgânico" },
  { swatchClass: "bg-slate-500", label: "Cinza", material: "Rejeito (não reciclável)" },
  { swatchClass: "border border-slate-300 bg-white", label: "Branco", material: "Resíduos de saúde" },
  { swatchClass: "bg-slate-900", label: "Preto", material: "Madeira" },
  { swatchClass: "bg-orange-500", label: "Laranja", material: "Resíduos perigosos" },
];

// Diagrama visual do padrão de cores (Resolução CONAMA 275/2001). Usa
// span/div em vez de p/ul/li/strong para não herdar os estilos de
// tipografia do artigo (aplicados via seletor descendente [&_p] etc).
export function ColorCodeChart() {
  return (
    <div
      role="list"
      aria-label="Cores da coleta seletiva e seus materiais"
      className="my-6 grid grid-cols-1 gap-3 sm:grid-cols-3"
    >
      {ITEMS.map((item) => (
        <div
          key={item.label}
          role="listitem"
          className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm"
        >
          <span
            className={`h-8 w-8 flex-shrink-0 rounded-full ${item.swatchClass}`}
            aria-hidden="true"
          />
          <div>
            <span className="block text-sm font-semibold text-slate-900">{item.label}</span>
            <span className="block text-xs text-slate-600">{item.material}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
