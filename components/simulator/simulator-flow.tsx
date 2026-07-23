"use client";

import { useEffect, useRef } from "react";
import { useSimulator } from "@/hooks/use-simulator";
import { getSimulator } from "@/config/registry";
import { CATEGORY_LABELS } from "@/config/categories";
import { track, setAnalyticsTag } from "@/lib/analytics";
import { SimulatorTopbar } from "./simulator-topbar";
import { SimulatorIntro } from "./simulator-intro";
import { QuestionScreen } from "./question-screen";
import { ResultView } from "./result-view";

interface SimulatorFlowProps {
  config: NonNullable<ReturnType<typeof getSimulator>>;
  onClose?: () => void;
  /** Démarre directement aux questions (l'intro vit sur la landing SEO). */
  autoStart?: boolean;
}

/**
 * Déroulé interactif d'un simulateur (intro → questions → résultat).
 * Générique : piloté par la config, ignore quel simulateur il exécute.
 */
export function SimulatorFlow({ config, onClose, autoStart = true }: SimulatorFlowProps) {
  const sim = useSimulator(config);
  const lastStepRef = useRef<string | null>(null);
  const completedRef = useRef(false);

  useEffect(() => {
    if (autoStart) sim.start();
    setAnalyticsTag("simulateur", config.slug);
    track({ name: "simulator_start", props: { slug: config.slug } });
    // Démarrage unique au montage.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Funnel : une étape franchie = un événement (jusqu'où les gens remplissent).
  useEffect(() => {
    if (sim.phase === "question" && sim.currentGroup) {
      const key = `${sim.state.stepIndex}:${sim.currentGroup.id}`;
      if (lastStepRef.current !== key) {
        lastStepRef.current = key;
        track({
          name: "simulator_step",
          props: {
            slug: config.slug,
            step: sim.state.stepIndex + 1,
            total: sim.totalSteps,
            step_id: sim.currentGroup.id,
          },
        });
      }
    }
    if (sim.phase === "result" && !completedRef.current) {
      completedRef.current = true;
      track({ name: "simulator_complete", props: { slug: config.slug } });
    }
    if (sim.phase !== "result") completedRef.current = false;
  }, [sim.phase, sim.state.stepIndex, sim.currentGroup, sim.totalSteps, config.slug]);

  return (
    <div className="min-h-screen bg-bg">
      <SimulatorTopbar
        progress={sim.progress}
        showProgress={sim.phase === "question"}
        onClose={onClose}
      />

      {sim.phase === "intro" ? (
        <SimulatorIntro
          config={config}
          intro={config.intro}
          categoryLabel={CATEGORY_LABELS[config.category]}
          onStart={sim.start}
        />
      ) : null}

      {sim.phase === "question" && sim.currentGroup ? (
        <QuestionScreen
          group={sim.currentGroup}
          answers={sim.answers}
          progress={sim.progress}
          liveResult={sim.liveResult}
          isLastStep={sim.isLastStep}
          onAnswer={sim.answer}
          onNext={sim.next}
          onBack={sim.back}
        />
      ) : null}

      {sim.phase === "result" ? (
        <ResultView
          config={config}
          result={sim.finalResult}
          answers={sim.answers}
          onRestart={() => {
            track({ name: "simulator_restart", props: { slug: config.slug } });
            sim.restart();
          }}
        />
      ) : null}
    </div>
  );
}
