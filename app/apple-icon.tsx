import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Icône Apple (ajout à l'écran d'accueil iOS). iOS masque les coins lui-même. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(140deg, #6d5efc, #b4a7ff)",
          color: "#ffffff",
          fontSize: 120,
          fontWeight: 700,
        }}
      >
        B
      </div>
    ),
    { ...size },
  );
}
