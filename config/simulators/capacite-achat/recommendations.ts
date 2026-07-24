import type { RecommendationRule } from "@/lib/calculators/types";
import type { CalculationResult } from "@/types/calculation";
import { formatCurrency } from "@/lib/utils/format";
import { immoCalculator } from "./calculator";
import { IMMO_ASSUMPTIONS as A, type ImmoAnswers } from "./assumptions";

function capacityWith(answers: ImmoAnswers, overrides: Partial<ImmoAnswers>): number {
  return immoCalculator.compute({
    answers: { ...answers, ...overrides } as ImmoAnswers,
    partial: false,
    locale: "fr_FR",
  }).headline.value;
}

export const immoRecommendations: RecommendationRule<CalculationResult, ImmoAnswers>[] = [
  {
    id: "allonger-duree",
    when: (_r, a) => a.duree < A.maxDurationYears,
    build: (result, a) => {
      const gain = capacityWith(a, { duree: A.maxDurationYears }) - result.headline.value;
      return {
        id: "allonger-duree",
        icon: "clock",
        title: "Allonger la durée",
        body: `Emprunter sur ${A.maxDurationYears} ans augmenterait votre capacité d'environ ${formatCurrency(gain)} — au prix d'intérêts plus élevés au total.`,
      };
    },
  },
  {
    id: "solder-credits",
    when: (_r, a) => a.charges > 0,
    build: (result, a) => {
      const gain = capacityWith(a, { charges: 0 }) - result.headline.value;
      return {
        id: "solder-credits",
        icon: "credit-card",
        title: "Solder vos crédits en cours",
        body: `Vos ${formatCurrency(a.charges)}/mois de crédits pèsent sur votre taux d'endettement. Les solder libérerait environ ${formatCurrency(gain)} de capacité d'achat.`,
      };
    },
  },
  {
    id: "passer-35",
    when: (_r, a) => a.endettement === "prudent",
    build: (result, a) => {
      const gain = capacityWith(a, { endettement: "max" }) - result.headline.value;
      return {
        id: "passer-35",
        icon: "percent",
        title: "Jusqu'à 35 % d'endettement",
        body: `Le HCSF autorise jusqu'à 35 % d'endettement : votre capacité pourrait grimper d'environ ${formatCurrency(gain)}, si votre reste à vivre le permet.`,
      };
    },
  },
  {
    id: "apport-notaire",
    when: () => true,
    build: () => ({
      id: "apport-notaire",
      icon: "piggy-bank",
      title: "Visez les frais de notaire en apport",
      body: "Un apport couvrant au moins les frais de notaire (souvent 8 % dans l'ancien) rassure les banques et améliore votre taux.",
    }),
  },
  {
    id: "assurance-deleguee",
    when: () => true,
    build: () => ({
      id: "assurance-deleguee",
      icon: "shield-check",
      title: "Déléguez l'assurance emprunteur",
      body: "Choisir une assurance externe à la banque (délégation) peut réduire fortement son coût, surtout avant 40 ans.",
    }),
  },
];
