import type { RecommendationRule } from "@/lib/calculators/types";
import type { CalculationResult } from "@/types/calculation";
import { formatCurrency } from "@/lib/utils/format";
import { childCalculator } from "./calculator";
import type { ChildAnswers } from "./assumptions";

/** Recalcule le coût total avec quelques réponses modifiées (scénario alternatif). */
function totalWith(answers: ChildAnswers, overrides: Partial<ChildAnswers>): number {
  return childCalculator.compute({
    answers: { ...answers, ...overrides } as ChildAnswers,
    partial: false,
    locale: "fr_FR",
  }).headline.value;
}

/**
 * Conseils personnalisés. Plusieurs règles comparent la situation à un scénario
 * alternatif et chiffrent l'écart — le conseil paraît « réfléchi » alors que
 * ce n'est qu'un recalcul.
 */
export const childRecommendations: RecommendationRule<CalculationResult, ChildAnswers>[] = [
  {
    id: "cout-grande-ville",
    when: (_r, a) => a.region === "grande",
    build: (result, a) => {
      const saving = result.headline.value - totalWith(a, { region: "ville" });
      return {
        id: "cout-grande-ville",
        icon: "map-pin",
        title: "Le poids de la grande ville",
        body: `Vivre en grande ville renchérit surtout le logement. À situation égale en ville moyenne, votre budget serait allégé d'environ ${formatCurrency(saving)} sur la période.`,
      };
    },
  },
  {
    id: "arbitrage-garde",
    when: (_r, a) => a.garde === "assmat",
    build: (result, a) => {
      const saving = result.headline.value - totalWith(a, { garde: "creche" });
      return {
        id: "arbitrage-garde",
        icon: "blocks",
        title: "Crèche vs assistante maternelle",
        body: `Une place en crèche coûte en moyenne moins cher que l'assistante maternelle : vous pourriez économiser près de ${formatCurrency(saving)} sur les 3 premières années.`,
      };
    },
  },
  {
    id: "credit-impot-garde",
    when: (_r, a) => a.garde === "creche" || a.garde === "assmat",
    build: () => ({
      id: "credit-impot-garde",
      icon: "badge-percent",
      title: "Crédit d'impôt garde",
      body: "La garde des moins de 6 ans ouvre droit à un crédit d'impôt de 50 %, déjà déduit de l'estimation.",
    }),
  },
  {
    id: "anticiper-scolarite",
    when: (_r, a) => a.ecole === "prive" || a.ecole === "superieur",
    build: () => ({
      id: "anticiper-scolarite",
      icon: "graduation-cap",
      title: "Anticipez la scolarité",
      body: "Un plan d'épargne lissé sur 15 ans réduit fortement l'effort mensuel au moment des études.",
    }),
  },
  {
    id: "allocations",
    when: () => true,
    build: () => ({
      id: "allocations",
      icon: "gift",
      title: "Allocations familiales",
      body: "Selon vos revenus et le nombre d'enfants, les aides de la CAF viennent réduire ces montants.",
    }),
  },
  {
    id: "epargne",
    when: () => true,
    build: (result) => {
      const monthly = result.metrics.find((m) => m.id === "monthly")?.value ?? 0;
      return {
        id: "epargne",
        icon: "piggy-bank",
        title: "Épargne régulière",
        body: `Mettre ${formatCurrency(monthly * 0.1)} de côté chaque mois crée un matelas confortable pour les imprévus.`,
      };
    },
  },
];
