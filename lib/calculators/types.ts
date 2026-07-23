import type { Answers, CalculationInput, CalculationResult, Recommendation } from "@/types/calculation";

/**
 * Contrat du moteur de calcul.
 * Fonction pure — AUCUN import React. Testable, exécutable serveur ou client.
 */
export interface Calculator<
  TAnswers extends Answers = Answers,
  TResult extends CalculationResult = CalculationResult,
> {
  compute(input: CalculationInput<TAnswers>): TResult;
  /** Hypothèses chiffrées exposées (transparence + tests). */
  assumptions: Record<string, unknown>;
}

/**
 * Règle de recommandation : évaluée après le calcul, produit un conseil
 * si sa condition est remplie. Déclarée dans la config du simulateur.
 */
export interface RecommendationRule<
  TResult extends CalculationResult = CalculationResult,
  TAnswers extends Answers = Answers,
> {
  id: string;
  when: (result: TResult, answers: TAnswers) => boolean;
  build: (result: TResult, answers: TAnswers) => Recommendation;
}
