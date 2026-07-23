"use client";

import { useSimulator } from "@/hooks/use-simulator";
import { getSimulator } from "@/config/registry";
import { CATEGORY_LABELS } from "@/config/categories";
import { SimulatorTopbar } from "./simulator-topbar";
import { SimulatorIntro } from "./simulator-intro";
import { QuestionScreen } from "./question-screen";
import { ResultView } from "./result-view";

/**
 * Orchestrateur générique d'un simulateur.
 * Reçoit uniquement le `slug` (les fonctions de la config ne peuvent pas
 * traverser la frontière RSC) et résout la config depuis le registre, qui est
 * du TS pur exécutable côté client. Délègue ensuite à l'écran de la phase.
 */
export function SimulatorRenderer({ slug }: { slug: string }) {
  const config = getSimulator(slug);
  if (!config) return null;
  return <SimulatorRuntime config={config} />;
}

function SimulatorRuntime({ config }: { config: NonNullable<ReturnType<typeof getSimulator>> }) {
  const sim = useSimulator(config);

  return (
    <div className="min-h-screen bg-bg">
      <SimulatorTopbar progress={sim.progress} showProgress={sim.phase === "question"} />

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
