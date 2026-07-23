"use client";

import { useEffect } from "react";
import { useSimulator } from "@/hooks/use-simulator";
import { getSimulator } from "@/config/registry";
import { CATEGORY_LABELS } from "@/config/categories";
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

  useEffect(() => {
    if (autoStart) sim.start();
    // Démarrage unique au montage.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          onRestart={sim.restart}
        />
      ) : null}
    </div>
  );
}
