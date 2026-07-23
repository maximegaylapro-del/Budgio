import type { Answers } from "@/types/calculation";
import type { QuestionGroup } from "@/types/simulator";

export type Phase = "intro" | "question" | "result";

export interface MachineState {
  phase: Phase;
  /** Index dans la liste des groupes visibles. */
  stepIndex: number;
  answers: Answers;
}

export type MachineAction =
  | { type: "START" }
  | { type: "ANSWER"; id: string; value: Answers[string] }
  | { type: "NEXT" }
  | { type: "BACK" }
  | { type: "GOTO"; stepIndex: number }
  | { type: "RESTART"; defaults: Answers };

export function initState(defaults: Answers): MachineState {
  return { phase: "intro", stepIndex: 0, answers: { ...defaults } };
}

/**
 * Réducteur pur du wizard. Ne connaît pas les questions concrètes ;
 * `totalSteps` est fourni par l'appelant (groupes visibles après showIf).
 */
export function reducer(state: MachineState, action: MachineAction, totalSteps: number): MachineState {
  switch (action.type) {
    case "START":
      return { ...state, phase: "question", stepIndex: 0 };

    case "ANSWER":
      return { ...state, answers: { ...state.answers, [action.id]: action.value } };

    case "NEXT": {
      if (state.phase !== "question") return state;
      if (state.stepIndex >= totalSteps - 1) return { ...state, phase: "result" };
      return { ...state, stepIndex: state.stepIndex + 1 };
    }

    case "BACK": {
      if (state.phase === "result") return { ...state, phase: "question", stepIndex: totalSteps - 1 };
      if (state.stepIndex <= 0) return { ...state, phase: "intro", stepIndex: 0 };
      return { ...state, stepIndex: state.stepIndex - 1 };
    }

    case "GOTO":
      return { ...state, phase: "question", stepIndex: clampStep(action.stepIndex, totalSteps) };

    case "RESTART":
      return initState(action.defaults);

    default:
      return state;
  }
}

function clampStep(index: number, total: number): number {
  return Math.min(Math.max(index, 0), Math.max(total - 1, 0));
}

/** Filtre les groupes selon les conditions showIf de leurs questions. */
export function visibleGroups(groups: QuestionGroup[], answers: Answers): QuestionGroup[] {
  return groups
    .map((group) => ({
      ...group,
      questions: group.questions.filter((q) => !q.showIf || q.showIf(answers)),
    }))
    .filter((group) => group.questions.length > 0);
}
