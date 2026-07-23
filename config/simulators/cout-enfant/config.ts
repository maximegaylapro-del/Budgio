import type { SimulatorConfig } from "@/types/simulator";
import { childCalculator } from "./calculator";
import { childRecommendations } from "./recommendations";
import type { ChildAnswers } from "./assumptions";

/** Simulateur « Combien coûte un enfant ? » — première brique de la plateforme. */
export const coutEnfantConfig: SimulatorConfig<ChildAnswers> = {
  slug: "cout-enfant",
  title: "Combien coûte un enfant ?",
  shortTitle: "Le coût réel d'un enfant",
  category: "famille",
  icon: "baby",
  description: "De la naissance à 18 ans, tout compris.",
  tag: "populaire",
  estimatedTime: "2 min",
  card: { metricLabel: "Estimation moyenne", metricValue: "≈ 9 200 €/an" },

  intro: {
    eyebrow: "Simulateur",
    title: "Combien coûte réellement un enfant ?",
    description:
      "De la naissance à l'âge adulte, estimez le budget réel — garde, scolarité, alimentation, loisirs — ajusté à votre situation. En 6 questions.",
    meta: [
      { icon: "clock", label: "2 minutes" },
      { icon: "list-checks", label: "6 questions" },
      { icon: "gift", label: "Gratuit" },
    ],
    ctaLabel: "Commencer l'estimation",
    footnote: "Gratuit · sans inscription · données INSEE & CAF",
  },

  defaults: {
    name: "",
    ageMax: 18,
    region: "ville",
    garde: "creche",
    ecole: "public",
    niveau: "equilibre",
  },

  groups: [
    {
      id: "prenom",
      questions: [
        {
          id: "name",
          type: "text",
          icon: "smile",
          title: "Comment s'appelle votre enfant ?",
          subtitle: "Facultatif — c'est juste pour personnaliser votre estimation.",
          placeholder: "Prénom (facultatif)",
          optional: true,
          maxLength: 30,
        },
      ],
    },
    {
      id: "age",
      questions: [
        {
          id: "ageMax",
          type: "slider",
          icon: "cake",
          title: "Jusqu'à quel âge voulez-vous estimer ?",
          subtitle: "De la naissance jusqu'à l'âge choisi.",
          min: 1,
          max: 25,
          unit: "ans",
          hint: (v) =>
            v >= 18
              ? "Au-delà de 18 ans, le coût des études supérieures est pris en compte."
              : v <= 3
                ? "La petite enfance concentre les frais de garde."
                : `Estimation de la naissance à ${v} ans.`,
        },
      ],
    },
    {
      id: "region",
      questions: [
        {
          id: "region",
          type: "radio",
          icon: "map-pin",
          title: "Où vivez-vous ?",
          subtitle: "Le coût de la vie varie fortement selon la zone géographique.",
          columns: 3,
          autoAdvance: true,
          options: [
            { id: "grande", label: "Grande ville", desc: "Paris, Lyon, Marseille…", icon: "building-2" },
            { id: "ville", label: "Ville moyenne", desc: "Urbaine ou périurbaine", icon: "building" },
            { id: "rural", label: "Zone rurale", desc: "Village, campagne", icon: "trees" },
          ],
        },
      ],
    },
    {
      id: "garde",
      questions: [
        {
          id: "garde",
          type: "radio",
          icon: "baby",
          title: "Quel mode de garde avant 3 ans ?",
          subtitle: "C'est souvent le poste le plus lourd des premières années.",
          columns: 2,
          autoAdvance: true,
          options: [
            { id: "creche", label: "Crèche", desc: "≈ 400 €/mois après aides", icon: "blocks" },
            { id: "assmat", label: "Assistante maternelle", desc: "≈ 580 €/mois après aides", icon: "user-round" },
            { id: "gp", label: "Grands-parents", desc: "Coût très réduit", icon: "users-round" },
            { id: "foyer", label: "Parent au foyer", desc: "Pas de frais de garde", icon: "house" },
          ],
        },
      ],
    },
    {
      id: "ecole",
      questions: [
        {
          id: "ecole",
          type: "radio",
          icon: "graduation-cap",
          title: "Quelle scolarité envisagez-vous ?",
          subtitle: "De la maternelle jusqu'aux études supérieures.",
          columns: 3,
          autoAdvance: true,
          options: [
            { id: "public", label: "Public", desc: "Scolarité gratuite", icon: "school" },
            { id: "prive", label: "Privé", desc: "≈ 350 €/mois de frais", icon: "landmark" },
            { id: "superieur", label: "Études sup. incluses", desc: "Coût du supérieur", icon: "graduation-cap" },
          ],
        },
      ],
    },
    {
      id: "niveau",
      questions: [
        {
          id: "niveau",
          type: "radio",
          icon: "wallet",
          title: "Quel niveau de dépenses au quotidien ?",
          subtitle: "Alimentation, vêtements, loisirs et vacances.",
          columns: 3,
          autoAdvance: true,
          options: [
            { id: "econome", label: "Économe", desc: "L'essentiel, maîtrisé", icon: "piggy-bank" },
            { id: "equilibre", label: "Équilibré", desc: "Un bon compromis", icon: "scale" },
            { id: "confort", label: "Confort", desc: "On ne se prive pas", icon: "gem" },
          ],
        },
      ],
    },
  ],

  calculator: childCalculator,
  recommendations: childRecommendations,

  result: {
    blocks: ["hero", "breakdown", "charts", "recommendations", "sources"],
    heroSubtitle: (answers) => {
      const name = String(answers.name ?? "");
      const ageMax = Number(answers.ageMax ?? 18);
      return name
        ? `de la naissance aux ${ageMax} ans de ${name}`
        : `de la naissance à ${ageMax} ans`;
    },
  },

  seo: {
    title: "Combien coûte un enfant ? Simulateur du coût réel (0–18 ans)",
    description:
      "Estimez le coût réel d'un enfant de la naissance à 18 ans : garde, scolarité, alimentation, loisirs. Simulateur gratuit basé sur les données INSEE et CAF.",
    keywords: ["coût d'un enfant", "budget enfant", "coût garde d'enfant", "prix éducation"],
    canonicalPath: "/simulateurs/cout-enfant",
  },

  faq: [
    {
      question: "Combien coûte un enfant par mois en moyenne ?",
      answer:
        "Selon la situation familiale et le mode de garde, un enfant coûte en moyenne entre 500 € et 900 € par mois. Le simulateur affine cette estimation selon votre région, votre mode de garde et votre niveau de vie.",
    },
    {
      question: "Le coût d'un enfant inclut-il les aides de la CAF ?",
      answer:
        "Les montants affichés sont des dépenses nettes. Les frais de garde tiennent compte du crédit d'impôt de 50 %. Les allocations familiales, variables selon les revenus, viennent en déduction supplémentaire.",
    },
    {
      question: "Quelles sources sont utilisées pour cette estimation ?",
      answer:
        "Le modèle s'appuie sur les données publiques de l'INSEE (dépenses des ménages), de la CAF, du Ministère de l'Éducation et de la DREES.",
    },
  ],

  sources: [
    { name: "INSEE", scope: "Dépenses des ménages" },
    { name: "CAF", scope: "Prestations familiales" },
    { name: "Ministère de l'Éducation", scope: "Coûts de scolarité" },
    { name: "DREES", scope: "Santé et petite enfance" },
  ],
};
