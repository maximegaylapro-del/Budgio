import type { RecommendationRule } from "@/lib/calculators/types";
import type { CalculationResult } from "@/types/calculation";
import { formatCurrency } from "@/lib/utils/format";
import { carCalculator } from "./calculator";
import type { CarAnswers } from "./assumptions";

function totalWith(answers: CarAnswers, overrides: Partial<CarAnswers>): number {
  return carCalculator.compute({
    answers: { ...answers, ...overrides } as CarAnswers,
    partial: false,
    locale: "fr_FR",
  }).headline.value;
}

export const carRecommendations: RecommendationRule<CalculationResult, CarAnswers>[] = [
  {
    id: "occasion-vs-neuf",
    when: (_r, a) => a.etat === "neuf",
    build: (result, a) => {
      const saving = result.headline.value - totalWith(a, { etat: "occasion_recente" });
      return {
        id: "occasion-vs-neuf",
        icon: "trending-down",
        title: "La décote du neuf",
        body: `Une occasion récente évite la forte perte de valeur de la première année : environ ${formatCurrency(saving)} d'économie sur la durée, à modèle équivalent.`,
      };
    },
  },
  {
    id: "motorisation-gros-rouleur",
    when: (_r, a) => a.km >= 18000 && a.motorisation === "essence",
    build: (result, a) => {
      const saving = result.headline.value - totalWith(a, { motorisation: "diesel" });
      return {
        id: "motorisation-gros-rouleur",
        icon: "fuel",
        title: "Gros rouleur : la motorisation compte",
        body:
          saving > 0
            ? `Avec votre kilométrage, une motorisation plus sobre pourrait alléger le budget carburant d'environ ${formatCurrency(saving)} sur la durée.`
            : "Avec votre kilométrage, comparez bien les motorisations : le carburant devient un poste majeur.",
      };
    },
  },
  {
    id: "assurance-vehicule-ancien",
    when: (_r, a) => a.etat === "occasion_ancienne" && a.assurance === "tousrisques",
    build: (result, a) => {
      const saving = result.headline.value - totalWith(a, { assurance: "intermediaire" });
      return {
        id: "assurance-vehicule-ancien",
        icon: "shield-check",
        title: "Tous risques sur un véhicule ancien ?",
        body: `Sur un véhicule dont la valeur a baissé, une formule intermédiaire suffit souvent : jusqu'à ${formatCurrency(saving)} d'économie sur la durée.`,
      };
    },
  },
  {
    id: "entretien-preventif",
    when: () => true,
    build: () => ({
      id: "entretien-preventif",
      icon: "wrench",
      title: "L'entretien préventif paie",
      body: "Un entretien régulier limite les grosses réparations et protège la valeur de revente.",
    }),
  },
  {
    id: "revente",
    when: () => true,
    build: () => ({
      id: "revente",
      icon: "coins",
      title: "Anticipez la revente",
      body: "Un véhicule bien entretenu, avec carnet à jour et kilométrage maîtrisé, se revend nettement mieux.",
    }),
  },
];
