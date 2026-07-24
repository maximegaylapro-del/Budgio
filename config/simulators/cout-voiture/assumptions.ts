/**
 * Hypothèses chiffrées du simulateur « coût d'une voiture » (coût total de
 * possession / TCO). Toutes les valeurs métier sont ici, facilement modifiables.
 * Sources : prix-carburants.gouv.fr, ADEME, L'Argus (cote), assureurs.
 */

export const CAR_SOURCES = {
  carburants: {
    id: "carburants",
    name: "Prix-carburants.gouv.fr / INSEE",
    scope: "Prix moyens des carburants 2025 (données officielles)",
    url: "https://www.prix-carburants.gouv.fr/",
  },
  ademe: {
    id: "ademe",
    name: "ADEME",
    scope: "Consommations et coût de l'énergie (dont électrique)",
    url: "https://www.ademe.fr/",
  },
  argus: {
    id: "argus",
    name: "L'Argus",
    scope: "Décote et valeur de revente des véhicules",
    url: "https://www.largus.fr/",
  },
  assurance: {
    id: "assurance",
    name: "Assureurs (moyennes)",
    scope: "Primes d'assurance auto moyennes par formule — estimation",
    url: "https://www.lelynx.fr/assurance-auto/prix/",
  },
} as const;

export const CAR_ASSUMPTIONS = {
  /**
   * Décote : chute la 1ʳᵉ année puis décote annuelle, selon l'état à l'achat.
   * Neuf : ~20-25 % la 1ʳᵉ année puis ~10 %/an (≈ moitié de la valeur perdue à 4 ans).
   * Source : L'Argus.
   */
  firstYearDrop: { neuf: 0.22, occasion_recente: 0.11, occasion_ancienne: 0.08 } as Record<string, number>,
  annualDrop: { neuf: 0.11, occasion_recente: 0.1, occasion_ancienne: 0.07 } as Record<string, number>,

  /** Consommation aux 100 km (L pour thermique, kWh pour électrique). Source : ADEME. */
  consumption: { essence: 6.8, diesel: 5.3, hybride: 4.5, electrique: 18 } as Record<string, number>,
  /**
   * Prix de l'énergie (€/L ou €/kWh) — moyennes 2025.
   * Carburants : prix-carburants.gouv.fr / INSEE. Électricité domicile : ~0,19 €/kWh.
   */
  energyPrice: { essence: 1.75, diesel: 1.65, hybride: 1.75, electrique: 0.19 } as Record<string, number>,

  /** Prime d'assurance annuelle par formule (€) — moyennes 2025. */
  insuranceAnnual: { tiers: 460, intermediaire: 650, tousrisques: 980 } as Record<string, number>,
  /** Majoration assurance pour l'électrique (valeur plus élevée). */
  insuranceEvFactor: 1.1,

  /**
   * Entretien annuel de base par motorisation (€).
   * L'électrique coûte nettement moins (pas de vidange/courroie, freins ménagés).
   */
  maintenanceAnnual: { essence: 800, diesel: 900, hybride: 700, electrique: 350 } as Record<string, number>,
  /** Majoration entretien selon l'âge du véhicule. */
  maintenanceStateFactor: { neuf: 1, occasion_recente: 1.2, occasion_ancienne: 1.5 } as Record<string, number>,

  /** Coût des pneus au kilomètre (€). */
  tiresPerKm: 0.012,
  /** Contrôle technique annualisé (€). */
  inspectionAnnual: 45,
} as const;

export interface CarAnswers {
  motorisation: "essence" | "diesel" | "hybride" | "electrique";
  prix: number;
  etat: "neuf" | "occasion_recente" | "occasion_ancienne";
  km: number;
  duree: number;
  assurance: "tiers" | "intermediaire" | "tousrisques";
  [key: string]: string | number | boolean | string[];
}
