import { ImageResponse } from "next/og";

export const runtime = "nodejs";

/** Sépare les milliers avec une espace ASCII (évite les glyphes hors-police). */
function fmtEuro(raw: string | null): string {
  const n = Number(raw);
  if (!Number.isFinite(n)) return "";
  return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " €";
}

/**
 * Carte de partage téléchargeable : GET /api/share-image?title=&total=&monthly=&years=
 * Rendu serveur en PNG 1200×630, prête à poster sur les réseaux.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") ?? "Combien coûte un enfant ?";
  const total = fmtEuro(searchParams.get("total"));
  const monthly = fmtEuro(searchParams.get("monthly"));
  const years = searchParams.get("years") ?? "";

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
          <div style={{ fontSize: 30, fontWeight: 600 }}>Budgio</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ fontSize: 30, color: "#a99bff" }}>{title}</div>
          <div style={{ fontSize: 130, fontWeight: 700, letterSpacing: -4, lineHeight: 1 }}>{total}</div>
          <div style={{ fontSize: 32, color: "#a2a2ae", marginTop: 8 }}>
            {monthly} / mois {years ? `· sur ${years} ans` : ""}
          </div>
        </div>

        <div style={{ fontSize: 26, color: "#a2a2ae" }}>Estimez avant de décider · getbudgio.com</div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
