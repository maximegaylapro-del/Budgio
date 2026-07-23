"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

/**
 * Bascule de thème « orbe » du design system.
 * L'orbe passe d'un disque plein (clair) à un croissant (sombre) via box-shadow.
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label="Basculer le thème"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-bg-elev transition-colors hover:border-border-strong"
    >
      <span
        className="block h-[17px] w-[17px] flex-none rounded-full transition-all duration-300"
        style={
          isDark
            ? { background: "transparent", boxShadow: "inset 7px -6px 0 0 var(--fg)" }
            : { background: "var(--fg)" }
        }
      />
    </button>
  );
}
