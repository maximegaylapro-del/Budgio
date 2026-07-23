/**
 * Hypothèses chiffrées du simulateur « coût d'un enfant ».
 * TOUTES les valeurs métier sont ici : modifiables sans toucher au moteur.
 *
 * Chaque valeur est ancrée sur une source publique identifiée (voir SOURCES).
 * Le modèle combine plusieurs références — c'est une estimation, pas un relevé
 * comptable. Les montants de garde et de scolarité sont des restes à charge
 * (après aides / crédit d'impôt).
 */

/** Catalogue des sources citées, réutilisé par la config et l'UI (bandeau Sources). */
export const CHILD_SOURCES = {
  hcfea: {
    id: "hcfea",
    name: "HCFEA",
    scope: "Rapport « Le coût de l'enfant » (déc. 2025) — budgets de référence ONPES/DREES",
    url: "https://hcfea.gouv.fr/sites/hcfea/files/2025-12/rapport_cout_de_l_enfant_def_0.pdf",
  },
  drees: {
    id: "drees",
    name: "DREES / ONPES",
    scope: "Coût additionnel d'un enfant par tranche d'âge (budgets de référence)",
    url: "https://hcfea.gouv.fr/sites/hcfea/files/2025-12/rapport_cout_de_l_enfant_def_0.pdf",
  },
  insee: {
    id: "insee",
    name: "INSEE",
    scope: "Enquête Budget de famille 2017 — structure des dépenses des ménages",
    url: "https://www.insee.fr/fr/statistiques/4764315",
  },
  unef: {
    id: "unef",
    name: "UNEF / Union étudiante",
    scope: "Coût de la vie étudiante 2024 (logement, alimentation)",
    url: "https://www.letudiant.fr/lifestyle/aides-financieres/rentree-2024-selon-lunef-et-lunion-etudiante-le-cout-de-la-vie-augmente-pour-les-etudiants.html",
  },
  prive: {
    id: "prive",
    name: "Établissements sous contrat",
    scope: "Contribution familiale moyenne (collège / lycée) — estimation",
    url: "https://trouverecole.fr/blog/cout-scolarite-ecole-privee-france/",
  },
} as const;

export const CHILD_ASSUMPTIONS = {
  /**
   * Coût de base annuel par tranche d'âge (hors garde et scolarité).
   * Calé sur les budgets de référence ONPES/DREES (HCFEA 2025) : ~713 €/mois
   * pour un enfant de 3-10 ans (couple, parc public), coût croissant après 14 ans,
   * 0-2 ans un peu inférieur à 3-10 ans. Source : [hcfea], [drees].
   */
  baseCostByAge: [
    { maxAge: 3, cost: 5800 },
    { maxAge: 6, cost: 7400 },
    { maxAge: 11, cost: 7400 },
    { maxAge: 15, cost: 8400 },
    { maxAge: 18, cost: 10200 },
    { maxAge: Infinity, cost: 10200 }, // 18 ans et +
  ],

  /**
   * Multiplicateur selon le niveau de vie.
   * L'échelle d'équivalence OCDE (utilisée par l'INSEE) rend le coût de l'enfant
   * proportionnel au revenu des parents. Source : [hcfea].
   */
  lifestyleMultiplier: { econome: 0.85, equilibre: 1, confort: 1.25 } as Record<string, number>,

  /**
   * Multiplicateur géographique. Le logement (poste majeur du coût de l'enfant)
   * varie fortement : +250 €/mois en Île-de-France vs hors IDF pour un couple
   * avec deux enfants (UNAF, cité par le HCFEA). Source : [hcfea].
   */
  regionMultiplier: { grande: 1.15, ville: 1, rural: 0.9 } as Record<string, number>,

  /**
   * Coût annuel de garde avant 3 ans = reste à charge mensuel APRÈS crédit
   * d'impôt (HCFEA / SG HCF, famille à 2 SMIC, 162 h/mois) :
   * crèche/EAJE 120 €/mois, assistante maternelle 288 €/mois. Source : [hcfea].
   * Grands-parents : coût symbolique. Parent au foyer : nul.
   */
  childcareAnnual: { creche: 1440, assmat: 3456, gp: 600, foyer: 0 } as Record<string, number>,

  /**
   * Surcoût scolarité privée sous contrat (6-18 ans), contribution familiale
   * annuelle moyenne (collège 650-1200 €, lycée ~1176 €). Source : [prive].
   */
  privateSchoolAnnual: 1100,

  /**
   * Coût annuel des études supérieures (18 ans et +) = soutien parental estimé,
   * calé sur le coût de la vie étudiante (UNEF 2024, ~1 226 €/mois dont ~560 €
   * de logement). Source : [unef].
   */
  higherEducationAnnual: 6000,

  /**
   * Ventilation du coût de base en postes de dépense.
   * Structure inspirée de l'INSEE, Enquête Budget de famille 2017. Source : [insee].
   */
  baseSplit: [
    { id: "logement", label: "Logement", share: 0.22 },
    { id: "alimentation", label: "Alimentation", share: 0.18 },
    { id: "loisirs", label: "Loisirs & vacances", share: 0.15 },
    { id: "transport", label: "Transport", share: 0.13 },
    { id: "autres", label: "Autres", share: 0.18 },
    { id: "vetements", label: "Vêtements", share: 0.08 },
    { id: "sante", label: "Santé", share: 0.06 },
  ],

  /** Tranches d'âge affichées dans le graphique de projection. */
  ageBands: [
    { label: "0–3 ans", lo: 0, hi: 3 },
    { label: "3–6 ans", lo: 3, hi: 6 },
    { label: "6–11 ans", lo: 6, hi: 11 },
    { label: "11–15 ans", lo: 11, hi: 15 },
    { label: "15–18 ans", lo: 15, hi: 18 },
    { label: "18 +", lo: 18, hi: 26 },
  ],
} as const;

/** Forme typée des réponses de ce simulateur. */
export interface ChildAnswers {
  name: string;
  ageMax: number;
  region: "grande" | "ville" | "rural";
  garde: "creche" | "assmat" | "gp" | "foyer";
  ecole: "public" | "prive" | "superieur";
  niveau: "econome" | "equilibre" | "confort";
  [key: string]: string | number | boolean | string[];
}
