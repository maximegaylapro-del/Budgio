import type { MethodologyContent } from "@/types/simulator";

export const capaciteAchatMethodology: MethodologyContent = {
  title: "Comment est calculée votre capacité d'achat immobilier ?",
  description:
    "La méthode derrière notre simulateur : règle HCSF des 35 %, taux de crédit 2025, frais de notaire et assurance. Hypothèses, limites et sources officielles.",

  intro: [
    "Votre capacité d'achat dépend d'abord de ce qu'une banque acceptera de vous prêter, encadré par des règles strictes. Le simulateur applique la réglementation HCSF et les taux de marché récents pour estimer le prix du bien que vous pouvez viser.",
    "C'est une estimation : la décision finale d'une banque tient compte de votre profil complet (stabilité des revenus, reste à vivre, saut de charge…).",
  ],

  method: [
    {
      heading: "La règle des 35 % (HCSF)",
      paragraphs: [
        "Depuis 2022, le taux d'endettement est plafonné à 35 % des revenus nets, assurance emprunteur comprise. Votre mensualité maximale est donc : revenus × 35 % − crédits déjà en cours.",
        "La durée d'emprunt est limitée à 25 ans (27 dans certains cas de travaux ou d'achat sur plan).",
      ],
    },
    {
      heading: "Du montant empruntable au prix du bien",
      paragraphs: [
        "À partir de la mensualité maximale, on calcule le capital empruntable selon le taux d'intérêt de la durée choisie (données Observatoire Crédit Logement) et l'assurance emprunteur.",
        "Le prix du bien accessible = (montant emprunté + apport), duquel on retire les frais de notaire, car ceux-ci se paient en plus du prix.",
      ],
    },
    {
      heading: "Le coût réel du crédit",
      paragraphs: [
        "On détaille ce que vous rembourserez réellement : le capital, les intérêts et l'assurance. Sur 20 à 25 ans, intérêts et assurance représentent une part importante du total.",
      ],
    },
  ],

  assumptions: [
    { label: "Taux d'endettement max", value: "35 %", note: "assurance comprise — HCSF" },
    { label: "Durée maximale", value: "25 ans", note: "27 ans avec gros travaux/VEFA" },
    { label: "Taux crédit 15 ans", value: "3,15 %", note: "20 ans 3,25 · 25 ans 3,35 (2025)" },
    { label: "Assurance emprunteur", value: "≈ 0,34 %/an", note: "du capital (0,10 à 0,50 selon l'âge)" },
    { label: "Frais de notaire (ancien)", value: "7,5 %", note: "neuf : 2,5 %" },
  ],

  limits: [
    "Le taux d'intérêt réel dépend de votre profil et de la banque : les taux utilisés sont des moyennes de marché.",
    "L'assurance emprunteur varie fortement avec l'âge et l'état de santé (de 0,10 % à plus de 0,50 %/an).",
    "La banque évalue aussi votre reste à vivre et le saut de charge, non modélisés ici.",
    "Les 35 % peuvent être dépassés dans une part limitée des dossiers (marge de flexibilité HCSF), non prise en compte.",
    "Le calcul suppose un prêt à taux fixe classique, hors prêts aidés (PTZ) et dispositifs spécifiques.",
  ],

  updated: "juillet 2026",
};
