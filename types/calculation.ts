import type { LucideIconName } from "./common";

/** Valeurs d'un formulaire de simulateur — sérialisable (localStorage, futur DB). */
export type Answers = Record<string, string | number | boolean | string[]>;

/** Entrée du moteur de calcul. */
export interface CalculationInput<TAnswers extends Answers = Answers> {
  answers: TAnswers;
  /** true pendant le wizard (estimation en direct sur réponses incomplètes). */
  partial: boolean;
  locale: string;
}

export type MetricFormat = "currency" | "number" | "percent" | "duration";

/** Un chiffre-clé à afficher (headline ou métrique secondaire). */
export interface Metric {
  id: string;
  label: string;
  value: number;
  format: MetricFormat;
  /** Unité pour format "number"/"duration" (ex. "ans", "kcal"). */
  unit?: string;
  hint?: string;
}

/** Un poste de dépense — alimente la barre empilée + la légende de répartition. */
export interface BreakdownItem {
  id: string;
  label: string;
  value: number;
  /** Pourcentage du total (0–100). */
  pct: number;
  /** Index dans l'échelle data-viz indigo. */
  colorIndex: number;
  /** Icône Lucide optionnelle pour la légende. */
  icon?: LucideIconName;
}

export type SeriesType = "bar" | "line" | "area" | "pie";

/** Série de points pour un graphique (tranches d'âge, projection…). */
export interface ChartSeries {
  id: string;
  label: string;
  type: SeriesType;
  points: ChartPoint[];
}
export interface ChartPoint {
  x: string | number;
  y: number;
}

/** Conseil personnalisé généré par les règles de recommandation. */
export interface Recommendation {
  id: string;
  icon: LucideIconName;
  title: string;
  body: string;
}

/** Fait marquant à retenir — langage naturel, pour « Ce qu'il faut retenir ». */
export interface Insight {
  id: string;
  icon: LucideIconName;
  text: string;
}

/** Résultat normalisé — indépendant du simulateur, consommé par le renderer. */
export interface CalculationResult {
  /** Le grand chiffre (coût total). */
  headline: Metric;
  /** Métriques secondaires (/mois, /an, durée…). */
  metrics: Metric[];
  /** Postes de dépense, triés décroissant. */
  breakdown: BreakdownItem[];
  /** Séries graphiques optionnelles. */
  series?: ChartSeries[];
  /** Commentaire automatique en langage naturel. */
  summary: string;
  /** Faits marquants « Ce qu'il faut retenir » (rempli par le calculateur). */
  takeaways?: Insight[];
  /** Conseils personnalisés (rempli par le moteur d'un simulateur). */
  recommendations?: Recommendation[];
}
