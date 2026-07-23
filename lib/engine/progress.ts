import type { MachineState } from "./simulator-machine";

export interface Progress {
  /** Étape courante (1-indexée) pour l'affichage. */
  current: number;
  total: number;
  /** Pourcentage 0–100. */
  pct: number;
  label: string;
}

export function computeProgress(state: MachineState, totalSteps: number): Progress {
  const current = state.phase === "question" ? state.stepIndex + 1 : totalSteps;
  const pct = totalSteps > 0 ? (current / totalSteps) * 100 : 0;
  return { current, total: totalSteps, pct, label: `Étape ${current} / ${totalSteps}` };
}
