"use client";

import type { FieldProps } from "./types";
import type { RadioQuestion } from "@/types/simulator";
import { Icon } from "@/components/shared/icon";
import { cn } from "@/lib/utils/cn";

/** Cartes de choix (remplacent les radios classiques) — cf. design system. */
export function RadioCardField({ question, value, onChange, onAutoAdvance }: FieldProps<RadioQuestion>) {
  const cols = question.columns === 2 ? "sm:grid-cols-2" : "sm:grid-cols-3";

  function select(id: string) {
    onChange(id);
    if (question.autoAdvance && onAutoAdvance) {
      window.setTimeout(onAutoAdvance, 230);
    }
  }

  return (
    <div
      role="radiogroup"
      aria-label={question.title}
      className={cn("grid max-w-[560px] grid-cols-1 gap-3", cols)}
    >
      {question.options.map((o) => {
        const selected = value === o.id;
        return (
          <button
            key={o.id}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => select(o.id)}
            className={cn(
              "flex items-center gap-[14px] rounded-lg border-[1.5px] p-4 text-left transition-transform hover:-translate-y-0.5",
              selected ? "border-accent bg-accent-soft" : "border-border bg-bg-elev",
            )}
          >
            {o.icon ? (
              <span
                className={cn(
                  "flex h-11 w-11 flex-none items-center justify-center rounded-md",
                  selected ? "bg-accent text-white" : "bg-surface text-fg-muted",
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
                "flex h-[22px] w-[22px] flex-none items-center justify-center rounded-full border-2",
                selected ? "border-accent" : "border-border-strong",
              )}
            >
              <span
                className={cn("h-[10px] w-[10px] rounded-full", selected ? "bg-accent" : "bg-transparent")}
              />
            </span>
          </button>
        );
      })}
    </div>
  );
}
