import { ImageResponse } from "next/og";
import { getSimulator, getAllSlugs } from "@/config/registry";
import { CATEGORY_LABELS } from "@/config/categories";

export const alt = "Simulateur Budgio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Une image OG statique par simulateur. */
export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const config = getSimulator(slug);
  const title = config?.title ?? "Budgio";
  const category = config ? CATEGORY_LABELS[config.category] : "Simulateurs";
  // On évite les caractères hors latin (≈) qui déclenchent un fetch de police.
  const metric = (config?.card.metricValue ?? "").replace(/≈\s*/g, "");

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(150deg, #0b0b10 0%, #1a1730 60%, #2a2255 100%)",
          color: "#f5f5f8",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: "linear-gradient(140deg, #6d5efc, #b4a7ff)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 34,
              fontWeight: 700,
              color: "#fff",
            }}
          >
            B
          </div>
          <div style={{ fontSize: 30, fontWeight: 600, letterSpacing: -1 }}>Budgio</div>
          <div
            style={{
              marginLeft: 12,
              fontSize: 22,
              color: "#a99bff",
              border: "1px solid rgba(130,113,255,0.4)",
              borderRadius: 999,
              padding: "6px 18px",
            }}
          >
            {category}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 68, fontWeight: 700, letterSpacing: -2, lineHeight: 1.05, maxWidth: 960 }}>
            {title}
          </div>
          {metric ? (
            <div style={{ fontSize: 34, color: "#c9bfff", fontWeight: 500 }}>{metric}</div>
          ) : null}
        </div>

        <div style={{ fontSize: 26, color: "#a2a2ae" }}>Estimez avant de décider · budgio.fr</div>
      </div>
    ),
    { ...size },
  );
}
