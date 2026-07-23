import type { Metric } from "@/types/calculation";

const LOCALE = "fr-FR";

/** Montant € arrondi à la centaine (cohérent avec la maquette). */
export function formatCurrency(n: number): string {
  return (Math.round(n / 100) * 100).toLocaleString(LOCALE) + " €";
}

/** Montant € compact pour les axes de graphiques (k€). */
export function formatCurrencyShort(n: number): string {
  if (n >= 1000) return Math.round(n / 1000) + " k€";
  return Math.round(n / 10) * 10 + " €";
}

export function formatNumber(n: number, unit?: string): string {
  const s = Math.round(n).toLocaleString(LOCALE);
  return unit ? `${s} ${unit}` : s;
}

export function formatPercent(n: number): string {
  return Math.round(n) + " %";
}

/** Rend une métrique selon son format déclaré. */
export function formatMetric(metric: Metric): string {
  switch (metric.format) {
    case "currency":
      return formatCurrency(metric.value);
    case "percent":
      return formatPercent(metric.value);
    case "duration":
      return formatNumber(metric.value, metric.unit ?? "ans");
    case "number":
    default:
      return formatNumber(metric.value, metric.unit);
  }
}
