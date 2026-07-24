"use client";

import { useCallback, useEffect, useMemo, useReducer } from "react";
import type { Answers, CalculationResult, Recommendation } from "@/types/calculation";
import type { AnySimulatorConfig } from "@/types/simulator";
import {
  reducer,
  initState,
  visibleGroups,
  type MachineState,
  type MachineAction,
} from "@/lib/engine/simulator-machine";
import { computeProgress } from "@/lib/engine/progress";
import { SITE } from "@/lib/seo/site";

/** Applique les règles de recommandation de la config au résultat. */
function withRecommendations(
  config: AnySimulatorConfig,
  result: CalculationResult,
  answers: Answers,
): CalculationResult {
  if (!config.recommendations?.length) return result;
  const recs: Recommendation[] = [];
  for (const rule of config.recommendations) {
    if (rule.when(result, answers)) recs.push(rule.build(result, answers));
  }
  return { ...result, recommendations: recs.slice(0, 4) };
}

export function useSimulator(config: AnySimulatorConfig, seededAnswers?: Answers) {
  const storageKey = `budgio_${config.slug}_v1`;

  const [state, rawDispatch] = useReducer(
    (s: MachineState, a: MachineAction) => reducer(s, a, currentTotal(config, s.answers)),
    seededAnswers,
    (seed) =>
      seed
        ? { phase: "result" as const, stepIndex: 0, answers: { ...config.defaults, ...seed } }
        : initState(config.defaults),
  );

  // Réhydratation depuis localStorage — ignorée si les réponses viennent d'un lien partagé.
  useEffect(() => {
    if (seededAnswers) return;
    try {
      const raw = localStorage.getItem(storageKey);
      if (!raw) return;
      const saved = JSON.parse(raw) as Partial<MachineState>;
      if (saved.answers) {
        for (const [id, value] of Object.entries(saved.answers)) {
          rawDispatch({ type: "ANSWER", id, value });
        }
      }
    } catch {
      /* stockage indisponible — on ignore */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey]);

  // Persistance à chaque changement — pas en mode lien partagé (ne pas écraser sa propre session).
  useEffect(() => {
    if (seededAnswers) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify({ answers: state.answers }));
    } catch {
      /* ignore */
    }
  }, [state.answers, storageKey, seededAnswers]);

  const groups = useMemo(() => visibleGroups(config.groups, state.answers), [config, state.answers]);
  const totalSteps = groups.length;
  const currentGroup = groups[Math.min(state.stepIndex, totalSteps - 1)];
  const progress = computeProgress(state, totalSteps);

  // Estimation en direct (réponses partielles).
  const liveResult = useMemo(
    () => config.calculator.compute({ answers: state.answers, partial: true, locale: SITE.locale }),
    [config, state.answers],
  );

  // Résultat final + recommandations (phase result).
  const finalResult = useMemo(() => {
    const base = config.calculator.compute({ answers: state.answers, partial: false, locale: SITE.locale });
    return withRecommendations(config, base, state.answers);
  }, [config, state.answers]);

  const answer = useCallback((id: string, value: Answers[string]) => {
    rawDispatch({ type: "ANSWER", id, value });
  }, []);

  return {
    state,
    answers: state.answers,
    phase: state.phase,
    groups,
    currentGroup,
    totalSteps,
    progress,
    liveResult,
    finalResult,
    isLastStep: state.stepIndex >= totalSteps - 1,
    start: () => rawDispatch({ type: "START" }),
    next: () => rawDispatch({ type: "NEXT" }),
    back: () => rawDispatch({ type: "BACK" }),
    answer,
    restart: () => rawDispatch({ type: "RESTART", defaults: config.defaults }),
  };
}

function currentTotal(config: AnySimulatorConfig, answers: Answers): number {
  return visibleGroups(config.groups, answers).length;
}
