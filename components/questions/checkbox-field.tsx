"use client";

import type { FieldProps } from "./types";
import type { CheckboxQuestion } from "@/types/simulator";
import { Icon } from "@/components/shared/icon";
import { cn } from "@/lib/utils/cn";

/** Sélection multiple sous forme de cartes cochables. */
export function CheckboxField({ question, value, onChange }: FieldProps<CheckboxQuestion, string[]>) {
  const selected = Array.isArray(value) ? value : [];

  function toggle(id: string) {
    onChange(selected.includes(id) ? selected.filter((v) => v !== id) : [...selected, id]);
  }

  return (
    <div className="grid max-w-[560px] grid-cols-1 gap-3 sm:grid-cols-2">
      {question.options.map((o) => {
        const on = selected.includes(o.id);
        return (
          <button
            key={o.id}
            type="button"
            role="checkbox"
            aria-checked={on}
            onClick={() => toggle(o.id)}
            className={cn(
              "flex items-center gap-[14px] rounded-lg border-[1.5px] p-4 text-left transition-transform hover:-translate-y-0.5",
              on ? "border-accent bg-accent-soft" : "border-border bg-bg-elev",
            )}
          >
            {o.icon ? (
              <span
                className={cn(
                  "flex h-11 w-11 flex-none items-center justify-center rounded-md",
                  on ? "bg-accent text-white" : "bg-surface text-fg-muted",
                )}
              >
                <Icon name={o.icon} size={21} />
              </span>
            ) : null}
            <span className="flex flex-1 flex-col gap-0.5">
              <span className="text-[15px] font-semibold tracking-tight">{o.label}</span>
              {o.desc ? <span className="text-[12.5px] text-fg-muted">{o.desc}</span> : null}
            </span>
            <span
              className={cn(
                "flex h-[22px] w-[22px] flex-none items-center justify-center rounded-sm border-2",
                on ? "border-accent bg-accent text-white" : "border-border-strong",
              )}
            >
              {on ? <Icon name="check" size={13} strokeWidth={2.6} /> : null}
            </span>
          </button>
        );
      })}
    </div>
  );
}
