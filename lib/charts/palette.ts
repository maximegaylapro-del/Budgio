/** Échelle data-viz indigo du design system — partagée par tous les graphiques. */
export const CHART_PALETTE = [
  "#6d5efc",
  "#8b7bff",
  "#4d3fd6",
  "#a99bff",
  "#7c6cf0",
  "#b4a7ff",
  "#5a49f0",
  "#c9bfff",
] as const;

/** Couleur data-viz par index (cyclique). */
export function chartColor(index: number): string {
  return CHART_PALETTE[index % CHART_PALETTE.length]!;
}
