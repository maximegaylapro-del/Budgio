import type { Config } from "tailwindcss";

/**
 * Les couleurs pointent vers les CSS variables du design system Budgio
 * (définies dans app/globals.css). Le thème sombre surcharge ces mêmes
 * variables via [data-theme="dark"], géré par next-themes.
 */
const config: Config = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./config/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        "bg-elev": "var(--bg-elev)",
        surface: "var(--surface)",
        "surface-2": "var(--surface-2)",
        border: "var(--border)",
        "border-strong": "var(--border-strong)",
        fg: "var(--fg)",
        "fg-muted": "var(--fg-muted)",
        "fg-subtle": "var(--fg-subtle)",
        accent: "var(--accent)",
        "accent-hover": "var(--accent-hover)",
        "accent-soft": "var(--accent-soft)",
        "accent-border": "var(--accent-border)",
        "on-accent": "var(--on-accent)",
        success: "var(--success)",
        "success-soft": "var(--success-soft)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        sm: "9px",
        md: "12px",
        lg: "15px",
        xl: "18px",
        "2xl": "22px",
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
      },
      maxWidth: {
        page: "1200px",
        content: "1080px",
      },
      keyframes: {
        floatUp: {
          from: { opacity: "0", transform: "translateY(14px)" },
          to: { opacity: "1", transform: "none" },
        },
        fadeIn: { from: { opacity: "0" }, to: { opacity: "1" } },
        growBar: { from: { transform: "scaleY(0)" }, to: { transform: "scaleY(1)" } },
        livePulse: {
          "0%,100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.25)" },
        },
        pulseGlow: { "0%,100%": { opacity: "0.6" }, "50%": { opacity: "1" } },
      },
      animation: {
        floatUp: "floatUp 0.4s ease both",
        fadeIn: "fadeIn 0.5s ease both",
        growBar: "growBar 0.6s cubic-bezier(0.4,0,0.2,1) both",
        livePulse: "livePulse 1.8s ease-in-out infinite",
        pulseGlow: "pulseGlow 6s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
