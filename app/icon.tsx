import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
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
          borderRadius: 7,
          background: "linear-gradient(140deg, #6d5efc, #b4a7ff)",
          color: "#ffffff",
          fontSize: 23,
          fontWeight: 700,
        }}
      >
        B
      </div>
    ),
    { ...size },
  );
}
