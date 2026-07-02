import { ImageResponse } from "next/og";

export const POST_IMAGE_SIZE = { width: 1200, height: 630 };

const CATEGORY_COLORS: Record<string, string> = {
  Reciclagem: "#059669",
  Sustentabilidade: "#0284c7",
  Guias: "#7c3aed",
  "Economia circular": "#b45309",
};

export function generatePostImage(title: string, category: string) {
  const accent = CATEGORY_COLORS[category] ?? "#059669";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          background: "linear-gradient(135deg, #f0fdf4 0%, #ffffff 60%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              width: 48,
              height: 48,
              borderRadius: 9999,
              border: `8px solid ${accent}`,
            }}
          />
          <div style={{ display: "flex", fontSize: 28, fontWeight: 800, color: "#065f46" }}>
            Reciclativa
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              fontSize: 22,
              fontWeight: 700,
              color: "#ffffff",
              background: accent,
              padding: "8px 22px",
              borderRadius: 9999,
            }}
          >
            {category}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 52,
              fontWeight: 800,
              color: "#0f172a",
              lineHeight: 1.15,
              maxWidth: 1020,
            }}
          >
            {title}
          </div>
        </div>
      </div>
    ),
    { ...POST_IMAGE_SIZE }
  );
}
