"use client";

import type { FieldProps } from "./types";
import type { NumberQuestion } from "@/types/simulator";

/** Saisie numérique avec unité optionnelle. */
export function NumberField({ question, value, onChange }: FieldProps<NumberQuestion, number>) {
  return (
    <div className="flex max-w-[280px] items-center gap-3 rounded-md border-[1.5px] border-border bg-bg px-4 py-1">
      <input
        type="number"
        value={Number.isFinite(value) ? value : ""}
        min={question.min}
        max={question.max}
        step={question.step ?? 1}
        placeholder={question.placeholder}
        aria-label={question.title}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full border-none bg-transparent py-3 text-[17px] text-fg outline-none"
      />
      {question.unit ? <span className="flex-none text-[15px] text-fg-muted">{question.unit}</span> : null}
    </div>
  );
}
