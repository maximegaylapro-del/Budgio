import { ImageResponse } from "next/og";
import { SITE } from "@/lib/seo/site";

export const alt = SITE.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Image OG par défaut du site (home et pages sans image propre). */
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 28,
          padding: 80,
          background: "linear-gradient(150deg, #0b0b10 0%, #1a1730 60%, #2a2255 100%)",
          color: "#f5f5f8",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 18,
              background: "linear-gradient(140deg, #6d5efc, #b4a7ff)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 38,
              fontWeight: 700,
              color: "#fff",
            }}
          >
            B
          </div>
          <div style={{ fontSize: 40, fontWeight: 600, letterSpacing: -1 }}>{SITE.name}</div>
        </div>
        <div style={{ fontSize: 74, fontWeight: 700, letterSpacing: -2, lineHeight: 1.05, maxWidth: 1000 }}>
          Chaque grande décision a un coût. Budgio le calcule.
        </div>
        <div style={{ fontSize: 30, color: "#a99bff" }}>Simulateurs · sources officielles · 100% gratuit</div>
      </div>
    ),
    { ...size },
  );
}
