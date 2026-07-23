import type { RecommendationRule } from "@/lib/calculators/types";
import type { CalculationResult } from "@/types/calculation";
import { formatCurrency } from "@/lib/utils/format";
import type { ChildAnswers } from "./assumptions";

/** Règles de conseils personnalisés — évaluées après le calcul. */
export const childRecommendations: RecommendationRule<CalculationResult, ChildAnswers>[] = [
  {
    id: "credit-impot-garde",
    when: (_r, a) => a.garde === "creche" || a.garde === "assmat",
    build: () => ({
      id: "credit-impot-garde",
      icon: "badge-percent",
      title: "Crédit d'impôt garde",
      body: "La garde des moins de 6 ans ouvre droit à un crédit d'impôt de 50 %, déjà déduit ici.",
    }),
  },
  {
    id: "anticiper-scolarite",
    when: (_r, a) => a.ecole === "prive" || a.ecole === "superieur",
    build: () => ({
      id: "anticiper-scolarite",
      icon: "graduation-cap",
      title: "Anticipez la scolarité",
      body: "Un plan d'épargne lissé sur 15 ans réduit fortement l'effort mensuel.",
    }),
  },
  {
    id: "allocations",
    when: () => true,
    build: () => ({
      id: "allocations",
      icon: "gift",
      title: "Allocations familiales",
      body: "Selon vos revenus, les aides de la CAF couvrent une part de ces montants.",
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
        body: `Mettre ${formatCurrency(monthly * 0.1)} de côté par mois crée un matelas pour les imprévus.`,
      };
    },
  },
];
