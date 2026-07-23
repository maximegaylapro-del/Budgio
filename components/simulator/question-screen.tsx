"use client";

import type { Answers, CalculationResult } from "@/types/calculation";
import type { QuestionGroup } from "@/types/simulator";
import type { Progress } from "@/lib/engine/progress";
import { QuestionField } from "@/components/questions/question-field";
import { LiveEstimateRail } from "./live-estimate-rail";
import { Icon } from "@/components/shared/icon";
import { Button } from "@/components/ui/button";

interface QuestionScreenProps {
  group: QuestionGroup;
  answers: Answers;
  progress: Progress;
  liveResult: CalculationResult;
  isLastStep: boolean;
  onAnswer: (id: string, value: Answers[string]) => void;
  onNext: () => void;
  onBack: () => void;
}

export function QuestionScreen({
  group, answers, progress, liveResult, isLastStep, onAnswer, onNext, onBack,
}: QuestionScreenProps) {
  return (
    <div
      key={group.id}
      className="mx-auto grid max-w-content animate-floatUp grid-cols-1 items-start gap-11 px-7 py-14 lg:grid-cols-[1fr_320px]"
    >
      <div>
        {group.questions.map((q, i) => (
          <div key={q.id} className={i > 0 ? "mt-12" : undefined}>
            <div className="flex items-center gap-[14px]">
              {q.icon ? (
                <div className="flex h-[52px] w-[52px] flex-none items-center justify-center rounded-lg bg-accent-soft text-accent">
                  <Icon name={q.icon} size={26} strokeWidth={1.8} />
                </div>
              ) : null}
              <span className="font-mono text-[12px] uppercase tracking-wider text-fg-subtle">
                {progress.label}
              </span>
            </div>
            <h2 className="mt-[22px] text-[32px] font-semibold leading-[1.12] tracking-tight text-balance">
              {q.title}
            </h2>
            {q.subtitle ? (
              <p className="mt-3 max-w-[460px] text-[16px] leading-[1.55] text-fg-muted text-pretty">
                {q.subtitle}
              </p>
            ) : null}
            <div className="mt-8">
              <QuestionField
                question={q}
                value={answers[q.id] ?? ""}
                onChange={(value) => onAnswer(q.id, value)}
                onAutoAdvance={onNext}
              />
            </div>
          </div>
        ))}

        <div className="mt-10 flex items-center gap-3">
          <Button variant="outline" onClick={onBack}>
            <Icon name="arrow-left" size={16} strokeWidth={2.1} />
            Retour
          </Button>
          <Button onClick={onNext}>
            {isLastStep ? "Voir le résultat" : "Continuer"}
            <Icon name="arrow-right" size={16} strokeWidth={2.1} />
          </Button>
        </div>
      </div>

      <div className="hidden lg:block">
        <LiveEstimateRail result={liveResult} />
      </div>
    </div>
  );
}
