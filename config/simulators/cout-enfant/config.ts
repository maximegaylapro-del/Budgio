import type { SimulatorConfig } from "@/types/simulator";
import { childCalculator } from "./calculator";
import { childRecommendations } from "./recommendations";
import { coutEnfantMethodology } from "./methodology";
import { CHILD_SOURCES, type ChildAnswers } from "./assumptions";

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
  card: { metricLabel: "Estimation moyenne", metricValue: "≈ 8 100 €/an" },

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
          options: [
            { id: "creche", label: "Crèche", desc: "≈ 120 €/mois après crédit d'impôt", icon: "blocks" },
            { id: "assmat", label: "Assistante maternelle", desc: "≈ 288 €/mois après crédit d'impôt", icon: "user-round" },
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
          options: [
            { id: "public", label: "Public", desc: "Scolarité gratuite", icon: "school" },
            { id: "prive", label: "Privé sous contrat", desc: "≈ 1 100 €/an de contribution", icon: "landmark" },
            { id: "superieur", label: "Études sup. incluses", desc: "Soutien parental étudiant", icon: "graduation-cap" },
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
    blocks: ["hero", "takeaways", "breakdown", "charts", "recommendations", "sources"],
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
        "Le modèle combine les budgets de référence du rapport « Le coût de l'enfant » du HCFEA (2025, calculs ONPES/DREES), la structure des dépenses de l'Enquête Budget de famille 2017 de l'INSEE, les restes à charge de garde du HCFEA et le coût de la vie étudiante de l'UNEF (2024). Chaque source est liée sous le résultat.",
    },
  ],

  sources: [
    { name: CHILD_SOURCES.hcfea.name, scope: CHILD_SOURCES.hcfea.scope, url: CHILD_SOURCES.hcfea.url },
    { name: CHILD_SOURCES.drees.name, scope: CHILD_SOURCES.drees.scope, url: CHILD_SOURCES.drees.url },
    { name: CHILD_SOURCES.insee.name, scope: CHILD_SOURCES.insee.scope, url: CHILD_SOURCES.insee.url },
    { name: CHILD_SOURCES.unef.name, scope: CHILD_SOURCES.unef.scope, url: CHILD_SOURCES.unef.url },
    { name: CHILD_SOURCES.prive.name, scope: CHILD_SOURCES.prive.scope, url: CHILD_SOURCES.prive.url },
  ],

  methodology: coutEnfantMethodology,
};
