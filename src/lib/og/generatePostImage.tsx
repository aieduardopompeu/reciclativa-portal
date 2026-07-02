import { ImageResponse } from "next/og";

export const POST_IMAGE_SIZE = { width: 1200, height: 630 };

type CategoryArt = {
  bg: string;
  stroke: string;
  motif: (stroke: string) => React.ReactNode;
};

const CATEGORY_ART: Record<string, CategoryArt> = {
  Reciclagem: {
    bg: "#E1F5EE",
    stroke: "#085041",
    motif: (stroke) => (
      <g>
        <polygon
          points="100,20 170,160 30,160"
          fill="none"
          stroke={stroke}
          strokeWidth="7"
          strokeLinejoin="round"
        />
        <polygon
          points="100,60 145,150 55,150"
          fill="none"
          stroke={stroke}
          strokeWidth="5"
          strokeLinejoin="round"
          opacity="0.6"
        />
      </g>
    ),
  },
  Guias: {
    bg: "#EEEDFE",
    stroke: "#3C3489",
    motif: (stroke) => (
      <g>
        <path
          d="M25 155 L85 45 L145 155"
          fill="none"
          stroke={stroke}
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="140" cy="80" r="24" fill="none" stroke={stroke} strokeWidth="6" opacity="0.6" />
      </g>
    ),
  },
  "Economia circular": {
    bg: "#FAEEDA",
    stroke: "#633806",
    motif: (stroke) => (
      <g>
        <path
          d="M100 30 A70 70 0 1 1 38 135"
          fill="none"
          stroke={stroke}
          strokeWidth="7"
          strokeLinecap="round"
        />
        <path
          d="M22 118 L38 135 L58 122"
          fill="none"
          stroke={stroke}
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    ),
  },
  Sustentabilidade: {
    bg: "#E6F1FB",
    stroke: "#042C53",
    motif: (stroke) => (
      <path
        d="M100 25 C55 55 55 115 100 165 C145 115 145 55 100 25 Z"
        fill="none"
        stroke={stroke}
        strokeWidth="7"
        strokeLinejoin="round"
      />
    ),
  },
};

export function generatePostImage(category: string) {
  const art = CATEGORY_ART[category] ?? CATEGORY_ART.Reciclagem;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: art.bg,
        }}
      >
        <svg viewBox="0 0 200 200" width="360" height="360">
          {art.motif(art.stroke)}
        </svg>

        <div
          style={{
            display: "flex",
            position: "absolute",
            top: 32,
            left: 32,
            width: 28,
            height: 28,
            borderRadius: 9999,
            border: `5px solid ${art.stroke}`,
            opacity: 0.7,
          }}
        />
      </div>
    ),
    { ...POST_IMAGE_SIZE }
  );
}
