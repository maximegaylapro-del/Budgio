import type { AnySimulatorConfig } from "@/types/simulator";
import { defineSimulator } from "@/lib/engine/define-simulator";
import { coutEnfantConfig } from "./cout-enfant/config";
import { coutVoitureConfig } from "./cout-voiture/config";

/**
 * Liste des simulateurs enregistrés.
 * Pour ajouter un simulateur : créer son dossier puis l'ajouter ici via
 * defineSimulator(). Aucune autre modification du noyau n'est nécessaire.
 */
export const SIMULATORS: AnySimulatorConfig[] = [
  defineSimulator(coutEnfantConfig),
  defineSimulator(coutVoitureConfig),
];
