/**
 * Hypothèses chiffrées du simulateur « coût d'un enfant ».
 * TOUTES les valeurs métier sont ici : modifiables sans toucher au moteur.
 * Sources : INSEE (dépenses des ménages), CAF, Ministère de l'Éducation, DREES.
 */
export const CHILD_ASSUMPTIONS = {
  /** Coût de base annuel par tranche d'âge (hors garde et scolarité). */
  baseCostByAge: [
    { maxAge: 3, cost: 6200 },
    { maxAge: 6, cost: 4800 },
    { maxAge: 11, cost: 5200 },
    { maxAge: 15, cost: 6200 },
    { maxAge: 18, cost: 7200 },
    { maxAge: Infinity, cost: 9000 }, // 18 ans et +
  ],

  /** Multiplicateur selon le niveau de vie choisi. */
  lifestyleMultiplier: { econome: 0.85, equilibre: 1, confort: 1.25 } as Record<string, number>,

  /** Multiplicateur selon la zone géographique. */
  regionMultiplier: { grande: 1.15, ville: 1, rural: 0.9 } as Record<string, number>,

  /** Coût annuel de garde avant 3 ans (après aides), par mode. */
  childcareAnnual: { creche: 4800, assmat: 7000, gp: 600, foyer: 0 } as Record<string, number>,

  /** Surcoût scolarité privée (6–18 ans), annuel. */
  privateSchoolAnnual: 4200,
  /** Coût annuel des études supérieures (18 ans et +). */
  higherEducationAnnual: 6500,

  /** Ventilation du coût de base en postes de dépense. */
  baseSplit: [
    { id: "logement", label: "Logement", share: 0.24 },
    { id: "alimentation", label: "Alimentation", share: 0.22 },
    { id: "loisirs", label: "Loisirs & vacances", share: 0.2 },
    { id: "autres", label: "Autres", share: 0.15 },
    { id: "vetements", label: "Vêtements", share: 0.11 },
    { id: "sante", label: "Santé", share: 0.08 },
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
