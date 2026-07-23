import type { Answers, CalculationResult } from "@/types/calculation";
import type { AnySimulatorConfig, SimulatorConfig } from "@/types/simulator";

/**
 * Enregistre un simulateur fortement typé dans le registre.
 *
 * Les configs sont hétérogènes (chaque simulateur a sa propre forme de réponses),
 * or le registre est homogène. Ce helper est le SEUL point d'effacement de types :
 * l'auteur écrit une `SimulatorConfig<SesRéponses>` entièrement vérifiée, et on
 * l'expose au noyau comme `AnySimulatorConfig`. Le moteur de chaque simulateur
 * normalise les réponses en interne, donc l'effacement est sûr à l'exécution.
 */
export function defineSimulator<A extends Answers, R extends CalculationResult>(
  config: SimulatorConfig<A, R>,
): AnySimulatorConfig {
  return config as unknown as AnySimulatorConfig;
}
