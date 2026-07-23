"use client";

import type { FieldProps } from "./types";
import type { TextQuestion } from "@/types/simulator";
import { Icon } from "@/components/shared/icon";

/** Champ texte libre (ex. prénom facultatif). Entrée passe à l'étape suivante. */
export function TextField({
  question,
  value,
  onChange,
  onAutoAdvance,
}: FieldProps<TextQuestion, string>) {
  return (
    <div className="max-w-[440px]">
      <div className="flex items-center gap-3 rounded-lg border-[1.5px] border-border-strong bg-bg-elev py-1 pl-5 pr-1 shadow-sm focus-within:border-accent-border">
        {question.icon ? <Icon name={question.icon} size={20} className="text-fg-subtle" /> : null}
        <input
          type="text"
          value={value ?? ""}
          maxLength={question.maxLength}
          placeholder={question.placeholder}
          aria-label={question.title}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              onAutoAdvance?.();
            }
          }}
          className="flex-1 border-none bg-transparent py-[14px] text-[17px] text-fg outline-none"
        />
      </div>
    </div>
  );
}
