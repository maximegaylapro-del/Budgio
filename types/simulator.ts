import type { LucideIconName, CategoryId } from "./common";
import type { Answers, CalculationResult } from "./calculation";
import type { SeoConfig, Source, Faq } from "./seo";
import type { Calculator, RecommendationRule } from "@/lib/calculators/types";

/* ────────────────────────────── Questions ────────────────────────────── */

export type QuestionType = "radio" | "select" | "slider" | "number" | "text" | "checkbox";

interface QuestionBase {
  /** Clé dans l'objet answers. */
  id: string;
  type: QuestionType;
  title: string;
  subtitle?: string;
  icon?: LucideIconName;
  help?: string;
  optional?: boolean;
  /** Affiche la question conditionnellement selon les réponses déjà données. */
  showIf?: (answers: Answers) => boolean;
}

export interface ChoiceOption {
  id: string;
  label: string;
  desc?: string;
  icon?: LucideIconName;
}

export interface RadioQuestion extends QuestionBase {
  type: "radio";
  columns?: 2 | 3;
  options: ChoiceOption[];
  /** Avance automatiquement à l'étape suivante après sélection (cf. maquette). */
  autoAdvance?: boolean;
}

export interface SelectQuestion extends QuestionBase {
  type: "select";
  options: ChoiceOption[];
  placeholder?: string;
}

export interface SliderQuestion extends QuestionBase {
  type: "slider";
  min: number;
  max: number;
  step?: number;
  unit?: string;
  /** Texte contextuel dépendant de la valeur (ex. ageHint de la maquette). */
  hint?: (value: number) => string;
}

export interface NumberQuestion extends QuestionBase {
  type: "number";
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  placeholder?: string;
}

export interface TextQuestion extends QuestionBase {
  type: "text";
  placeholder?: string;
  maxLength?: number;
}

export interface CheckboxQuestion extends QuestionBase {
  type: "checkbox";
  options: ChoiceOption[];
}

export type Question =
  | RadioQuestion
  | SelectQuestion
  | SliderQuestion
  | NumberQuestion
  | TextQuestion
  | CheckboxQuestion;

/** Un écran du wizard = un groupe d'une ou plusieurs questions. */
export interface QuestionGroup {
  id: string;
  title?: string;
  questions: Question[];
}

/* ────────────────────────────── Présentation ─────────────────────────── */

export interface IntroConfig {
  eyebrow: string;
  title: string;
  description: string;
  /** Petits badges méta (durée, nb de questions, gratuité…). */
  meta: { icon: LucideIconName; label: string }[];
  ctaLabel: string;
  footnote?: string;
}

/** Blocs de la page de résultat à afficher, dans l'ordre. */
export type ResultBlock =
  | "hero"
  | "takeaways"
  | "breakdown"
  | "charts"
  | "recommendations"
  | "sources";

export interface ResultLayout {
  blocks: ResultBlock[];
  /** Sous-titre du hero, dérivé des réponses. */
  heroSubtitle?: (answers: Answers) => string;
}

/* ─────────────────────── Page de contenu « Méthodologie » ─────────────── */

export interface MethodologyBlock {
  heading: string;
  paragraphs: string[];
}

/** Une hypothèse chiffrée présentée de façon lisible. */
export interface MethodologyAssumption {
  label: string;
  value: string;
  note?: string;
}

/**
 * Contenu de la page « Comment est calculé … ? » d'un simulateur.
 * Page de fond (méthodologie / hypothèses / limites / sources), pensée SEO.
 */
export interface MethodologyContent {
  /** H1 & <title>, ex. « Comment est calculé le coût d'un enfant ? ». */
  title: string;
  /** meta description. */
  description: string;
  /** Paragraphes d'introduction. */
  intro: string[];
  /** Sections explicatives du modèle. */
  method: MethodologyBlock[];
  /** Table des hypothèses chiffrées. */
  assumptions: MethodologyAssumption[];
  /** Limites assumées du modèle. */
  limits: string[];
  /** Date de dernière mise à jour, ex. « juillet 2026 ». */
  updated: string;
}

/* ──────────────────────────── Config globale ─────────────────────────── */

/**
 * LE contrat qu'un simulateur remplit. Générique sur la forme des réponses
 * et du résultat. Aucune référence à l'UI : c'est de la donnée pure.
 */
export interface SimulatorConfig<
  TAnswers extends Answers = Answers,
  TResult extends CalculationResult = CalculationResult,
> {
  slug: string;
  title: string;
  shortTitle: string;
  category: CategoryId;
  icon: LucideIconName;
  description: string;
  tag?: "populaire" | "nouveau";
  estimatedTime: string;
  /** Métrique vitrine pour les cartes (homepage). */
  card: { metricLabel: string; metricValue: string };

  intro: IntroConfig;
  groups: QuestionGroup[];
  defaults: TAnswers;

  calculator: Calculator<TAnswers, TResult>;
  recommendations?: RecommendationRule<TResult, TAnswers>[];
  result: ResultLayout;

  seo: SeoConfig;
  faq?: Faq[];
  sources: Source[];
  /** Page de contenu « Comment est calculé … ? » (optionnelle). */
  methodology?: MethodologyContent;
}

/** Type utilitaire : n'importe quel simulateur, quelles que soient ses génériques. */
export type AnySimulatorConfig = SimulatorConfig;
