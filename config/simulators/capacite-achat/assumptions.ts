/**
 * Hypothèses du simulateur « capacité d'achat immobilier ».
 * Règles HCSF (contraignantes depuis 2022), taux de marché 2025, frais de notaire.
 * Sources : HCSF/Banque de France, Observatoire Crédit Logement/CSA, Notaires de France.
 */

export const IMMO_SOURCES = {
  hcsf: {
    id: "hcsf",
    name: "HCSF (Banque de France)",
    scope: "Règle des 35 % d'endettement et durée max 25 ans (norme contraignante)",
    url: "https://www.banque-france.fr/fr/le-haut-conseil-de-stabilite-financiere-hcsf",
  },
  creditlogement: {
    id: "creditlogement",
    name: "Observatoire Crédit Logement / CSA",
    scope: "Taux moyens des crédits immobiliers 2025 par durée",
    url: "https://lobservatoire.creditlogement.fr/",
  },
  notaires: {
    id: "notaires",
    name: "Notaires de France",
    scope: "Frais de notaire (droits de mutation) — ancien et neuf",
    url: "https://www.notaires.fr/fr/immobilier-fiscalite/achat-et-vente/les-frais-de-notaire",
  },
  assurance: {
    id: "assurance",
    name: "Assureurs (moyennes)",
    scope: "Taux moyen d'assurance emprunteur — estimation (0,10 à 0,50 %/an)",
    url: "https://www.meilleurtaux.com/assurance-de-pret/le-guide-de-l-assurance-de-pret/taux-assurance-pret-immobilier.html",
  },
} as const;

export const IMMO_ASSUMPTIONS = {
  /** Taux d'endettement maximal (mensualités / revenus nets), assurance comprise. HCSF. */
  debtRatio: { prudent: 0.33, max: 0.35 } as Record<string, number>,

  /** Durée maximale d'emprunt (HCSF : 25 ans, 27 avec gros travaux/VEFA). */
  maxDurationYears: 25,

  /**
   * Taux d'intérêt annuel moyen selon la durée (Observatoire Crédit Logement,
   * fin 2025 : ~3,15 % sur 15 ans, ~3,25 % sur 20 ans, ~3,35 % sur 25 ans).
   */
  ratesByDuration: [
    { maxYears: 15, rate: 0.0315 },
    { maxYears: 20, rate: 0.0325 },
    { maxYears: 25, rate: 0.0335 },
  ],

  /** Taux d'assurance emprunteur annuel moyen (% du capital). */
  insuranceRateAnnual: 0.0034,

  /** Frais de notaire (droits + émoluments) en % du prix du bien. */
  notaryRate: { ancien: 0.075, neuf: 0.025 } as Record<string, number>,
} as const;

/** Taux d'intérêt à retenir pour une durée donnée (en années). */
export function rateForDuration(years: number): number {
  const band = IMMO_ASSUMPTIONS.ratesByDuration.find((b) => years <= b.maxYears);
  return band?.rate ?? IMMO_ASSUMPTIONS.ratesByDuration[IMMO_ASSUMPTIONS.ratesByDuration.length - 1]!.rate;
}

export interface ImmoAnswers {
  revenu: number; // revenu net mensuel du foyer
  charges: number; // mensualités de crédits en cours
  apport: number; // apport personnel
  duree: number; // durée du prêt en années
  bien: "ancien" | "neuf";
  endettement: "prudent" | "max";
  [key: string]: string | number | boolean | string[];
}
