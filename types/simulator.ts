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
export type ResultBlock = "hero" | "breakdown" | "charts" | "recommendations" | "sources";

export interface ResultLayout {
  blocks: ResultBlock[];
  /** Sous-titre du hero, dérivé des réponses. */
  heroSubtitle?: (answers: Answers) => string;
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
}

/** Type utilitaire : n'importe quel simulateur, quelles que soient ses génériques. */
export type AnySimulatorConfig = SimulatorConfig;
