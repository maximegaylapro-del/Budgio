import type { SimulatorConfig } from "@/types/simulator";
import { carCalculator } from "./calculator";
import { carRecommendations } from "./recommendations";
import { coutVoitureMethodology } from "./methodology";
import { CAR_SOURCES, type CarAnswers } from "./assumptions";

/** Simulateur « Combien coûte une voiture ? » — coût total de possession (TCO). */
export const coutVoitureConfig: SimulatorConfig<CarAnswers> = {
  slug: "cout-voiture",
  title: "Combien coûte une voiture ?",
  shortTitle: "Le vrai coût de ma voiture",
  category: "auto",
  icon: "car",
  description: "Achat, carburant, assurance, entretien : le coût réel de possession.",
  estimatedTime: "2 min",
  card: { metricLabel: "Coût total de possession", metricValue: "≈ 5 000 €/an" },

  intro: {
    eyebrow: "Simulateur",
    title: "Combien coûte réellement votre voiture ?",
    description:
      "Au-delà du prix d'achat : dépréciation, carburant, assurance, entretien, pneus. Estimez le coût total de possession, ajusté à votre usage. En 6 questions.",
    meta: [
      { icon: "clock", label: "2 minutes" },
      { icon: "list-checks", label: "6 questions" },
      { icon: "gift", label: "Gratuit" },
    ],
    ctaLabel: "Estimer le coût",
    footnote: "Gratuit · sans inscription · données ADEME & L'Argus",
  },

  defaults: {
    motorisation: "essence",
    prix: 22000,
    etat: "occasion_recente",
    km: 13000,
    duree: 5,
    assurance: "intermediaire",
  },

  groups: [
    {
      id: "motorisation",
      questions: [
        {
          id: "motorisation",
          type: "radio",
          icon: "fuel",
          title: "Quelle motorisation ?",
          subtitle: "Elle détermine la consommation, l'entretien et l'assurance.",
          columns: 2,
          options: [
            { id: "essence", label: "Essence", desc: "La plus répandue", icon: "fuel" },
            { id: "diesel", label: "Diesel", desc: "Sobre sur autoroute", icon: "fuel" },
            { id: "hybride", label: "Hybride", desc: "Mixte électrique + thermique", icon: "leaf" },
            { id: "electrique", label: "Électrique", desc: "Recharge, pas de carburant", icon: "zap" },
          ],
        },
      ],
    },
    {
      id: "prix",
      questions: [
        {
          id: "prix",
          type: "slider",
          icon: "coins",
          title: "Quel prix d'achat ?",
          subtitle: "Le prix payé pour le véhicule.",
          min: 3000,
          max: 60000,
          step: 1000,
          unit: "€",
          hint: (v) =>
            v >= 35000
              ? "Segment haut : la dépréciation sera importante."
              : "Le prix influe surtout sur la dépréciation.",
        },
      ],
    },
    {
      id: "etat",
      questions: [
        {
          id: "etat",
          type: "radio",
          icon: "car",
          title: "Neuf ou occasion ?",
          subtitle: "L'état à l'achat change fortement la décote.",
          columns: 3,
          options: [
            { id: "neuf", label: "Neuf", desc: "Décote forte la 1ʳᵉ année", icon: "sparkles" },
            { id: "occasion_recente", label: "Occasion récente", desc: "Moins de 5 ans", icon: "car" },
            { id: "occasion_ancienne", label: "Occasion ancienne", desc: "Plus de 5 ans", icon: "wrench" },
          ],
        },
      ],
    },
    {
      id: "km",
      questions: [
        {
          id: "km",
          type: "slider",
          icon: "gauge",
          title: "Combien de kilomètres par an ?",
          subtitle: "Votre kilométrage annuel moyen.",
          min: 3000,
          max: 40000,
          step: 1000,
          unit: "km",
          hint: (v) =>
            v >= 20000
              ? "Gros rouleur : le carburant devient un poste majeur."
              : "Petit rouleur : la dépréciation domine souvent.",
        },
      ],
    },
    {
      id: "duree",
      questions: [
        {
          id: "duree",
          type: "slider",
          icon: "clock",
          title: "Combien de temps la garderez-vous ?",
          subtitle: "La durée de possession, en années.",
          min: 1,
          max: 15,
          unit: "ans",
          hint: (v) =>
            v <= 3
              ? "Sur une courte durée, la décote pèse très lourd."
              : "Plus vous la gardez, plus la décote se dilue.",
        },
      ],
    },
    {
      id: "assurance",
      questions: [
        {
          id: "assurance",
          type: "radio",
          icon: "shield-check",
          title: "Quelle formule d'assurance ?",
          subtitle: "Au tiers, intermédiaire ou tous risques.",
          columns: 3,
          options: [
            { id: "tiers", label: "Au tiers", desc: "Couverture minimale", icon: "shield-check" },
            { id: "intermediaire", label: "Intermédiaire", desc: "Tiers + vol, bris de glace", icon: "shield-check" },
            { id: "tousrisques", label: "Tous risques", desc: "Couverture maximale", icon: "shield-check" },
          ],
        },
      ],
    },
  ],

  calculator: carCalculator,
  recommendations: carRecommendations,

  result: {
    blocks: ["hero", "takeaways", "breakdown", "charts", "recommendations", "sources"],
    heroSubtitle: (answers) => {
      const duree = Number(answers.duree ?? 5);
      const km = Number(answers.km ?? 13000);
      return `sur ${duree} ans et ${(km * duree).toLocaleString("fr-FR")} km parcourus`;
    },
  },

  seo: {
    title: "Combien coûte une voiture ? Simulateur du coût total (TCO)",
    description:
      "Calculez le coût réel de votre voiture : dépréciation, carburant, assurance, entretien, pneus. Simulateur gratuit du coût total de possession, par an et par km.",
    keywords: ["coût d'une voiture", "coût total de possession", "TCO voiture", "budget automobile"],
    canonicalPath: "/simulateurs/cout-voiture",
  },

  faq: [
    {
      question: "Qu'est-ce que le coût total de possession (TCO) ?",
      answer:
        "C'est l'ensemble des dépenses liées à un véhicule sur la durée où vous le gardez : dépréciation, carburant, assurance, entretien, pneus et contrôle technique — pas seulement le prix d'achat.",
    },
    {
      question: "Pourquoi la dépréciation est-elle si importante ?",
      answer:
        "Une voiture perd de la valeur dès le premier jour, surtout neuve (jusqu'à 20 % la première année). Cette perte est souvent le premier poste de coût, bien avant le carburant.",
    },
    {
      question: "L'électrique revient-il moins cher ?",
      answer:
        "L'énergie et l'entretien sont généralement moins chers, mais le prix d'achat et l'assurance sont souvent plus élevés. Le simulateur permet de comparer selon votre kilométrage réel.",
    },
  ],

  sources: [
    { name: CAR_SOURCES.carburants.name, scope: CAR_SOURCES.carburants.scope, url: CAR_SOURCES.carburants.url },
    { name: CAR_SOURCES.ademe.name, scope: CAR_SOURCES.ademe.scope, url: CAR_SOURCES.ademe.url },
    { name: CAR_SOURCES.argus.name, scope: CAR_SOURCES.argus.scope, url: CAR_SOURCES.argus.url },
    { name: CAR_SOURCES.assurance.name, scope: CAR_SOURCES.assurance.scope, url: CAR_SOURCES.assurance.url },
  ],

  methodology: coutVoitureMethodology,
};
