import type { Answers } from "@/types/calculation";
import type { Question } from "@/types/simulator";

/** Contrat commun à tous les champs générés. */
export interface FieldProps<Q extends Question = Question, V = Answers[string]> {
  question: Q;
  value: V;
  onChange: (value: V) => void;
  /** Appelé quand un champ « à sélection » veut faire avancer le wizard. */
  onAutoAdvance?: () => void;
}
