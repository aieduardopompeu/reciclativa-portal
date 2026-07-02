import { ImageResponse } from "next/og";

export const POST_IMAGE_SIZE = { width: 1200, height: 630 };

type Shape = (strokeWidth: number) => React.ReactNode;

// Cada ícone é desenhado centrado em (0,0), com raio aproximado de 45-50
// unidades, para que escala/rotação/posição sejam feitas via transform.
const ICONS: Record<string, Shape> = {
  Reciclagem: (sw) => (
    <g fill="none" strokeLinejoin="round">
      <polygon points="0,-46 40,26 -40,26" strokeWidth={sw} />
      <polygon points="0,-14 22,26 -22,26" strokeWidth={sw * 0.75} opacity={0.65} />
    </g>
  ),
  Guias: (sw) => (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M-46,32 L8,-32 L46,32" strokeWidth={sw} />
      <circle cx="30" cy="-6" r="15" strokeWidth={sw * 0.85} opacity={0.65} />
    </g>
  ),
  "Economia circular": (sw) => (
    <g fill="none" strokeLinecap="round">
      <path d="M18,-46 A46,46 0 1 1 -34,30" strokeWidth={sw} />
      <path d="M-46,14 L-34,30 L-16,18" strokeWidth={sw} strokeLinejoin="round" />
    </g>
  ),
  Sustentabilidade: (sw) => (
    <path
      d="M0,-48 C-30,-26 -30,26 0,54 C30,26 30,-26 0,-48 Z"
      fill="none"
      strokeWidth={sw}
      strokeLinejoin="round"
    />
  ),
};

type ScatterPoint = { x: number; y: number; scale: number; rotate: number; opacity: number };

// Padrão fixo (não aleatório, para o resultado ser estável entre requisições).
const SCATTER: ScatterPoint[] = [
  { x: 90, y: 90, scale: 0.55, rotate: -18, opacity: 0.16 },
  { x: 230, y: 480, scale: 0.4, rotate: 12, opacity: 0.14 },
  { x: 60, y: 320, scale: 0.3, rotate: 30, opacity: 0.12 },
  { x: 340, y: 130, scale: 0.32, rotate: -8, opacity: 0.13 },
  { x: 420, y: 400, scale: 0.5, rotate: 22, opacity: 0.15 },
  { x: 610, y: 60, scale: 0.36, rotate: -25, opacity: 0.13 },
  { x: 980, y: 520, scale: 0.42, rotate: 15, opacity: 0.15 },
  { x: 1120, y: 150, scale: 0.3, rotate: -30, opacity: 0.12 },
  { x: 700, y: 560, scale: 0.28, rotate: 8, opacity: 0.12 },
  { x: 550, y: 260, scale: 0.24, rotate: -12, opacity: 0.1 },
];

const CATEGORY_ART: Record<string, { bg: string; stroke: string }> = {
  Reciclagem: { bg: "#E1F5EE", stroke: "#085041" },
  Guias: { bg: "#EEEDFE", stroke: "#3C3489" },
  "Economia circular": { bg: "#FAEEDA", stroke: "#633806" },
  Sustentabilidade: { bg: "#E6F1FB", stroke: "#042C53" },
};

export function generatePostImage(category: string) {
  const art = CATEGORY_ART[category] ?? CATEGORY_ART.Reciclagem;
  const icon = ICONS[category] ?? ICONS.Reciclagem;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: art.bg,
        }}
      >
        <svg viewBox="0 0 1200 630" width="1200" height="630">
          {SCATTER.map((p, i) => (
            <g
              key={i}
              transform={`translate(${p.x} ${p.y}) rotate(${p.rotate}) scale(${p.scale})`}
              stroke={art.stroke}
              opacity={p.opacity}
            >
              {icon(6)}
            </g>
          ))}

          <g transform="translate(860 300) rotate(-6) scale(4.6)" stroke={art.stroke} opacity={0.92}>
            {icon(4.2)}
          </g>
        </svg>
      </div>
    ),
    { ...POST_IMAGE_SIZE }
  );
}
