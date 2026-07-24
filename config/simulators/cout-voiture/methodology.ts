import type { MethodologyContent } from "@/types/simulator";

export const coutVoitureMethodology: MethodologyContent = {
  title: "Comment est calculé le coût d'une voiture ?",
  description:
    "La méthode derrière notre simulateur de coût total de possession (TCO) : dépréciation, carburant, assurance, entretien, pneus. Hypothèses, limites et sources.",

  intro: [
    "Le vrai coût d'une voiture ne se limite pas à son prix d'achat. Notre simulateur estime le coût total de possession (TCO) : tout ce que le véhicule vous coûte réellement pendant la durée où vous le gardez.",
    "Cette page détaille la méthode, les hypothèses retenues et leurs limites. C'est une estimation indicative, pas un devis.",
  ],

  method: [
    {
      heading: "La dépréciation : le coût invisible",
      paragraphs: [
        "C'est souvent le premier poste, surtout pour un véhicule neuf. On calcule la valeur de revente en appliquant une décote la première année (plus forte pour le neuf) puis une décote annuelle, selon l'état à l'achat.",
        "La dépréciation est la différence entre le prix payé et la valeur de revente estimée à la fin de la période.",
      ],
    },
    {
      heading: "Les coûts d'usage",
      paragraphs: [
        "Le carburant (ou l'électricité) dépend de votre kilométrage annuel, de la consommation de la motorisation et du prix de l'énergie. L'assurance dépend de la formule choisie. L'entretien dépend de la motorisation et de l'âge du véhicule.",
        "On ajoute les pneus (au kilomètre) et le contrôle technique. Le tout est multiplié par la durée de possession.",
      ],
    },
    {
      heading: "Coût par an et par kilomètre",
      paragraphs: [
        "Le coût total est ramené au mois, à l'année et au kilomètre — l'indicateur le plus parlant pour comparer deux véhicules ou deux usages.",
      ],
    },
  ],

  assumptions: [
    { label: "Décote 1ʳᵉ année (neuf)", value: "22 %", note: "puis ≈ 11 %/an — L'Argus" },
    { label: "Décote occasion récente", value: "≈ 10 %/an" },
    { label: "Consommation essence", value: "6,8 L/100 km", note: "diesel 5,3 · hybride 4,5" },
    { label: "Électrique", value: "18 kWh/100 km", note: "ADEME (≈ 19,8 en moyenne)" },
    { label: "Prix carburant 2025", value: "1,75 €/L", note: "diesel 1,65 · électricité 0,19 €/kWh" },
    { label: "Assurance / an", value: "460 à 980 €", note: "tiers → tous risques" },
    { label: "Entretien / an", value: "350 à 900 €", note: "électrique → thermique âgé" },
    { label: "Pneus", value: "0,012 €/km" },
    { label: "Contrôle technique", value: "≈ 45 €/an" },
  ],

  limits: [
    "Les prix de l'énergie et la cote des véhicules varient dans le temps : l'estimation reflète des moyennes récentes.",
    "La décote dépend fortement du modèle, de la marque et de l'état réel du véhicule — le simulateur raisonne sur des moyennes.",
    "Le financement (crédit, LOA/LLD) et ses intérêts ne sont pas modélisés : le calcul suppose un achat comptant.",
    "Les frais de stationnement, péages et éventuelles amendes ne sont pas inclus.",
    "L'assurance réelle dépend de votre profil (bonus, âge, zone) ; les montants sont des moyennes par formule.",
  ],

  updated: "juillet 2026",
};
