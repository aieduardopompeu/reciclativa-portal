import { ImageResponse } from "next/og";

export const alt = "Reciclativa — Reciclagem, sustentabilidade e economia circular";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #047857 0%, #059669 45%, #10b981 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 120,
            height: 120,
            borderRadius: 28,
            background: "rgba(255,255,255,0.16)",
            marginBottom: 44,
          }}
        >
          <div
            style={{
              display: "flex",
              width: 64,
              height: 64,
              borderRadius: 9999,
              border: "10px solid #ffffff",
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 76,
            fontWeight: 800,
            color: "#ffffff",
            letterSpacing: -2,
          }}
        >
          Reciclativa
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 22,
            fontSize: 30,
            color: "rgba(255,255,255,0.92)",
            textAlign: "center",
            maxWidth: 880,
          }}
        >
          Reciclagem, sustentabilidade e economia circular no Brasil
        </div>
      </div>
    ),
    { ...size }
  );
}
