"use client";

import type { FieldProps } from "./types";
import type { SelectQuestion } from "@/types/simulator";

/** Menu déroulant natif (accessible), stylé selon le design system. */
export function SelectField({ question, value, onChange }: FieldProps<SelectQuestion, string>) {
  return (
    <div className="max-w-[440px]">
      <select
        value={value ?? ""}
        aria-label={question.title}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border-[1.5px] border-border bg-bg px-4 py-3 text-[15px] text-fg outline-none focus:border-accent-border"
      >
        {question.placeholder ? (
          <option value="" disabled>
            {question.placeholder}
          </option>
        ) : null}
        {question.options.map((o) => (
          <option key={o.id} value={o.id}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}
