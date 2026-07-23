"use client";

import type { FieldProps } from "./types";
import type { SliderQuestion } from "@/types/simulator";
import { Icon } from "@/components/shared/icon";

/** Grand slider avec valeur mise en avant et indice contextuel. */
export function SliderField({ question, value, onChange }: FieldProps<SliderQuestion, number>) {
  const v = typeof value === "number" ? value : question.min;
  const hint = question.hint?.(v);

  return (
    <div className="max-w-[460px]">
      <div className="flex items-baseline gap-[10px]">
        <span className="text-[56px] font-semibold leading-none tracking-tighter text-accent">{v}</span>
        {question.unit ? <span className="text-[20px] font-medium text-fg-muted">{question.unit}</span> : null}
      </div>
      <input
        type="range"
        min={question.min}
        max={question.max}
        step={question.step ?? 1}
        value={v}
        aria-label={question.title}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-[18px] h-1.5 w-full cursor-pointer"
      />
      <div className="mt-2 flex justify-between font-mono text-[11.5px] text-fg-subtle">
        <span>{question.min}</span>
        <span>
          {question.max} {question.unit}
        </span>
      </div>
      {hint ? (
        <div className="mt-[18px] flex items-center gap-[9px] rounded-md bg-surface px-4 py-3 text-[13.5px] text-fg-muted">
          <Icon name="info" size={15} className="text-fg-subtle" />
          {hint}
        </div>
      ) : null}
    </div>
  );
}
