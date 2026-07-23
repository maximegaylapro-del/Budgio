import type { MethodologyContent } from "@/types/simulator";

/**
 * Contenu de la page « Comment est calculé le coût d'un enfant ? ».
 * Page de fond SEO : méthodologie, hypothèses, limites, sources.
 * Les valeurs citées reflètent config/simulators/cout-enfant/assumptions.ts.
 */
export const coutEnfantMethodology: MethodologyContent = {
  title: "Comment est calculé le coût d'un enfant ?",
  description:
    "La méthode complète derrière notre simulateur : modèle de calcul, hypothèses chiffrées, limites et sources officielles (HCFEA, INSEE, DREES, UNEF).",

  intro: [
    "Notre simulateur estime le budget qu'un enfant représente pour un foyer, de la naissance jusqu'à l'âge choisi. Il ne s'agit pas d'un relevé comptable individuel mais d'un modèle : une estimation construite à partir de données publiques, ajustée à votre situation.",
    "Cette page détaille exactement comment le chiffre est obtenu — la méthode, les hypothèses retenues, ce que le modèle ne couvre pas, et les sources sur lesquelles il s'appuie. Tout est transparent et modifiable.",
  ],

  method: [
    {
      heading: "Un coût de base annuel selon l'âge",
      paragraphs: [
        "Le cœur du calcul est un coût de vie annuel par tranche d'âge (logement, alimentation, vêtements, loisirs, santé…), hors garde et scolarité qui sont traités à part.",
        "Ces montants sont calés sur les budgets de référence de l'ONPES repris par le HCFEA : le coût additionnel d'un premier enfant de 3 à 10 ans est d'environ 713 €/mois pour un couple (parc locatif public). Le coût est un peu plus faible avant 3 ans, et plus élevé après 14 ans.",
      ],
    },
    {
      heading: "Deux postes traités séparément : la garde et la scolarité",
      paragraphs: [
        "Avant 3 ans, le mode de garde est ajouté au coût de base. Les montants correspondent au reste à charge mensuel après crédit d'impôt : environ 120 €/mois en crèche et 288 €/mois pour une assistante maternelle (estimation HCFEA pour un foyer à 2 SMIC).",
        "La scolarité dans le privé sous contrat ajoute la contribution familiale moyenne (~1 100 €/an). Si vous incluez les études supérieures, un soutien parental annuel est ajouté après 18 ans, calé sur le coût de la vie étudiante.",
      ],
    },
    {
      heading: "Des ajustements selon votre situation",
      paragraphs: [
        "Deux multiplicateurs affinent le résultat. La zone géographique fait varier surtout le logement (jusqu'à +15 % en grande ville, -10 % en zone rurale). Le niveau de vie module l'ensemble des dépenses courantes de -15 % à +25 %.",
        "Enfin, le total est ventilé par poste de dépense selon la structure de l'Enquête Budget de famille de l'INSEE, pour produire la répartition affichée dans le résultat.",
      ],
    },
  ],

  assumptions: [
    { label: "Coût de base 0–3 ans", value: "5 800 €/an", note: "hors garde — HCFEA / ONPES" },
    { label: "Coût de base 3–11 ans", value: "7 400 €/an", note: "poste périscolaire inclus" },
    { label: "Coût de base 11–15 ans", value: "8 400 €/an" },
    { label: "Coût de base 15–18 ans", value: "10 200 €/an", note: "coût croissant à l'adolescence" },
    { label: "Garde en crèche", value: "≈ 120 €/mois", note: "reste à charge après crédit d'impôt" },
    { label: "Assistante maternelle", value: "≈ 288 €/mois", note: "reste à charge après crédit d'impôt" },
    { label: "Privé sous contrat", value: "≈ 1 100 €/an", note: "contribution familiale (collège/lycée)" },
    { label: "Études supérieures", value: "≈ 6 000 €/an", note: "soutien parental — coût de la vie étudiante" },
    { label: "Zone géographique", value: "×0,90 à ×1,15", note: "rural → grande ville" },
    { label: "Niveau de vie", value: "×0,85 à ×1,25", note: "économe → confort" },
  ],

  limits: [
    "C'est une moyenne : votre situation réelle peut s'en écarter sensiblement, notamment sur le logement dont le coût varie fortement d'une ville à l'autre.",
    "Le modèle ne tient pas compte des coûts indirects, comme la réduction du temps de travail d'un parent ou l'impact sur la retraite.",
    "Les allocations familiales de la CAF, qui dépendent de vos revenus et du nombre d'enfants, ne sont pas déduites automatiquement du total.",
    "Le coût par enfant diminue avec la taille de la fratrie (économies d'échelle) ; le simulateur raisonne aujourd'hui pour un enfant.",
    "L'estimation « privé » couvre les établissements sous contrat ; le hors-contrat est nettement plus coûteux et n'est pas modélisé.",
  ],

  updated: "juillet 2026",
};
