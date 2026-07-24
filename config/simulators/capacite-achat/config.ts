import type { SimulatorConfig } from "@/types/simulator";
import { immoCalculator } from "./calculator";
import { immoRecommendations } from "./recommendations";
import { capaciteAchatMethodology } from "./methodology";
import { IMMO_SOURCES, type ImmoAnswers } from "./assumptions";

/** Simulateur « Capacité d'achat immobilier » — combien puis-je emprunter/acheter. */
export const capaciteAchatConfig: SimulatorConfig<ImmoAnswers> = {
  slug: "capacite-achat-immobilier",
  title: "Quelle est ma capacité d'achat immobilier ?",
  shortTitle: "Ma capacité d'achat immobilier",
  category: "immobilier",
  icon: "home",
  description: "Capacité d'emprunt, mensualité et prix du bien accessible.",
  tag: "nouveau",
  estimatedTime: "2 min",
  card: { metricLabel: "Capacité d'achat", metricValue: "≈ 240 000 €" },

  intro: {
    eyebrow: "Simulateur",
    title: "Quel bien pouvez-vous vous offrir ?",
    description:
      "Selon la règle HCSF des 35 %, vos revenus, votre apport et les taux actuels : estimez votre capacité d'emprunt et le prix du bien accessible. En 6 questions.",
    meta: [
      { icon: "clock", label: "2 minutes" },
      { icon: "list-checks", label: "6 questions" },
      { icon: "gift", label: "Gratuit" },
    ],
    ctaLabel: "Calculer ma capacité",
    footnote: "Gratuit · sans inscription · règles HCSF & taux 2025",
  },

  defaults: {
    revenu: 3500,
    charges: 0,
    apport: 20000,
    duree: 25,
    bien: "ancien",
    endettement: "max",
  },

  groups: [
    {
      id: "revenu",
      questions: [
        {
          id: "revenu",
          type: "slider",
          icon: "banknote",
          title: "Quels sont vos revenus nets mensuels ?",
          subtitle: "L'ensemble des revenus stables du foyer, après prélèvements.",
          min: 1000,
          max: 12000,
          step: 100,
          unit: "€/mois",
          hint: (v) =>
            `À 35 % d'endettement, cela permet jusqu'à ${Math.round(v * 0.35).toLocaleString("fr-FR")} € de mensualité.`,
        },
      ],
    },
    {
      id: "charges",
      questions: [
        {
          id: "charges",
          type: "slider",
          icon: "credit-card",
          title: "Avez-vous des crédits en cours ?",
          subtitle: "Le total de vos mensualités actuelles (auto, conso…). 0 si aucun.",
          min: 0,
          max: 3000,
          step: 50,
          unit: "€/mois",
          hint: (v) =>
            v === 0 ? "Aucun crédit : toute votre capacité est disponible." : "Ces mensualités réduisent votre capacité d'emprunt.",
        },
      ],
    },
    {
      id: "apport",
      questions: [
        {
          id: "apport",
          type: "slider",
          icon: "piggy-bank",
          title: "Quel apport personnel ?",
          subtitle: "L'épargne que vous injectez dans le projet.",
          min: 0,
          max: 200000,
          step: 5000,
          unit: "€",
          hint: (v) =>
            v === 0 ? "Sans apport, les banques sont plus exigeantes." : "L'apport sert d'abord à couvrir les frais de notaire.",
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
          title: "Sur combien d'années emprunter ?",
          subtitle: "La durée maximale autorisée est de 25 ans.",
          min: 10,
          max: 25,
          unit: "ans",
          hint: (v) =>
            v >= 25 ? "Durée maximale : capacité élevée mais intérêts importants." : "Une durée plus courte réduit le coût total du crédit.",
        },
      ],
    },
    {
      id: "bien",
      questions: [
        {
          id: "bien",
          type: "radio",
          icon: "home",
          title: "Quel type de bien visez-vous ?",
          subtitle: "Les frais de notaire diffèrent fortement entre ancien et neuf.",
          columns: 2,
          options: [
            { id: "ancien", label: "Ancien", desc: "Frais de notaire ≈ 7,5 %", icon: "key" },
            { id: "neuf", label: "Neuf / VEFA", desc: "Frais de notaire ≈ 2,5 %", icon: "building-2" },
          ],
        },
      ],
    },
    {
      id: "endettement",
      questions: [
        {
          id: "endettement",
          type: "radio",
          icon: "percent",
          title: "Quel niveau d'endettement ?",
          subtitle: "Le HCSF plafonne à 35 %. Beaucoup de banques préfèrent 33 %.",
          columns: 2,
          options: [
            { id: "prudent", label: "Prudent (33 %)", desc: "Plus de reste à vivre", icon: "shield-check" },
            { id: "max", label: "Maximum (35 %)", desc: "Plafond HCSF", icon: "trending-up" },
          ],
        },
      ],
    },
  ],

  calculator: immoCalculator,
  recommendations: immoRecommendations,

  result: {
    blocks: ["hero", "takeaways", "breakdown", "recommendations", "sources"],
    heroSubtitle: (answers) => {
      const duree = Number(answers.duree ?? 25);
      return `pour un emprunt sur ${duree} ans, selon la règle HCSF des 35 %`;
    },
  },

  seo: {
    title: "Capacité d'achat immobilier : simulateur (règle HCSF 35 %)",
    description:
      "Calculez votre capacité d'emprunt et le prix du bien que vous pouvez acheter : règle HCSF des 35 %, taux 2025, apport, frais de notaire. Simulateur gratuit.",
    keywords: [
      "capacité d'emprunt",
      "capacité d'achat immobilier",
      "taux d'endettement 35",
      "combien puis-je emprunter",
    ],
    canonicalPath: "/simulateurs/capacite-achat-immobilier",
  },

  faq: [
    {
      question: "Quelle est la règle des 35 % ?",
      answer:
        "Depuis 2022, le HCSF impose que le total de vos mensualités de crédit (assurance comprise) ne dépasse pas 35 % de vos revenus nets. C'est la limite principale de votre capacité d'emprunt.",
    },
    {
      question: "L'apport est-il obligatoire ?",
      answer:
        "Pas légalement, mais les banques attendent souvent un apport couvrant au moins les frais de notaire (environ 8 % dans l'ancien). Un apport plus élevé améliore votre taux et votre dossier.",
    },
    {
      question: "Pourquoi les frais de notaire sont-ils si élevés dans l'ancien ?",
      answer:
        "Ils sont composés majoritairement de taxes (droits de mutation) reversées à l'État et aux collectivités : environ 7 à 8 % dans l'ancien, contre 2 à 3 % dans le neuf.",
    },
  ],

  sources: [
    { name: IMMO_SOURCES.hcsf.name, scope: IMMO_SOURCES.hcsf.scope, url: IMMO_SOURCES.hcsf.url },
    { name: IMMO_SOURCES.creditlogement.name, scope: IMMO_SOURCES.creditlogement.scope, url: IMMO_SOURCES.creditlogement.url },
    { name: IMMO_SOURCES.notaires.name, scope: IMMO_SOURCES.notaires.scope, url: IMMO_SOURCES.notaires.url },
    { name: IMMO_SOURCES.assurance.name, scope: IMMO_SOURCES.assurance.scope, url: IMMO_SOURCES.assurance.url },
  ],

  methodology: capaciteAchatMethodology,
};
