import { ImageResponse } from "next/og";

// 48×48 : taille minimale recommandée par Google pour l'afficher dans les résultats.
export const size = { width: 48, height: 48 };
export const contentType = "image/png";

/** Favicon (onglet navigateur, favoris, résultats Google) — le « B » de marque. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 11,
          background: "linear-gradient(140deg, #6d5efc, #b4a7ff)",
          color: "#ffffff",
          fontSize: 34,
          fontWeight: 700,
        }}
      >
        B
      </div>
    ),
    { ...size },
  );
}
