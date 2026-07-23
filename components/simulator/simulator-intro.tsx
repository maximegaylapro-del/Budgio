"use client";

import type { IntroConfig, SimulatorConfig } from "@/types/simulator";
import { Icon } from "@/components/shared/icon";
import { Button } from "@/components/ui/button";

interface SimulatorIntroProps {
  config: Pick<SimulatorConfig, "icon" | "category">;
  intro: IntroConfig;
  categoryLabel: string;
  onStart: () => void;
}

/** Écran d'accueil d'un simulateur (avant les questions). */
export function SimulatorIntro({ config, intro, categoryLabel, onStart }: SimulatorIntroProps) {
  return (
    <div className="relative mx-auto max-w-[640px] overflow-hidden px-7 py-20 text-center">
      <div className="pointer-events-none absolute -top-5 left-0 right-0 h-[360px] animate-pulseGlow" style={{ background: "var(--glow)" }} />
      <div className="relative animate-floatUp">
        <div className="mx-auto flex h-[72px] w-[72px] items-center justify-center rounded-2xl bg-accent-soft text-accent shadow-md">
          <Icon name={config.icon} size={36} strokeWidth={1.7} />
        </div>
        <div className="mt-[22px] inline-flex items-center gap-[7px] rounded-full border border-border bg-bg-elev px-3 py-[5px] text-[12.5px] text-fg-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          {intro.eyebrow} · {categoryLabel}
        </div>
        <h1 className="mt-[18px] text-[42px] font-semibold leading-[1.06] tracking-tighter text-balance">
          {intro.title}
        </h1>
        <p className="mx-auto mt-4 max-w-[460px] text-[17px] leading-[1.55] text-fg-muted text-pretty">
          {intro.description}
        </p>
        <div className="mt-[26px] flex flex-wrap justify-center gap-[10px]">
          {intro.meta.map((m) => (
            <div
              key={m.label}
              className="flex items-center gap-[7px] rounded-md border border-border bg-surface px-[14px] py-2 text-[13px] text-fg-muted"
            >
              <Icon name={m.icon} size={15} strokeWidth={2} className="text-accent" />
              {m.label}
            </div>
          ))}
        </div>
        <Button size="lg" onClick={onStart} className="mt-8 shadow-md">
          {intro.ctaLabel}
          <Icon name="arrow-right" size={18} strokeWidth={2.1} />
        </Button>
        {intro.footnote ? (
          <p className="mt-[18px] font-mono text-[11.5px] text-fg-subtle">{intro.footnote}</p>
        ) : null}
      </div>
    </div>
  );
}
