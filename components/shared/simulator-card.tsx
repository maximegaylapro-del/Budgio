import Link from "next/link";
import type { AnySimulatorConfig } from "@/types/simulator";
import { Icon } from "./icon";

/** Carte de simulateur — utilisée sur la home et l'index. */
export function SimulatorCard({ config }: { config: AnySimulatorConfig }) {
  return (
    <Link
      href={`/simulateurs/${config.slug}`}
      className="group flex flex-col gap-3 rounded-xl border border-border bg-bg-elev p-[18px] transition-all duration-200 hover:-translate-y-[3px] hover:border-accent-border hover:shadow-md"
    >
      <div className="flex items-start justify-between">
        <div className="flex h-[42px] w-[42px] items-center justify-center rounded-md bg-accent-soft text-accent">
          <Icon name={config.icon} size={21} />
        </div>
        {config.tag ? (
          <span className="rounded-sm bg-accent-soft px-2 py-[3px] font-mono text-[11px] font-semibold capitalize text-accent">
            {config.tag}
          </span>
        ) : null}
      </div>
      <div className="text-[15px] font-semibold leading-tight tracking-tight">{config.shortTitle}</div>
      <div className="flex-1 text-[13px] leading-[1.45] text-fg-muted">{config.description}</div>
      <div className="flex flex-col gap-[3px] rounded-md border border-border bg-surface px-3 py-[10px]">
        <span className="font-mono text-[10.5px] uppercase tracking-wide text-fg-subtle">
          {config.card.metricLabel}
        </span>
        <span className="text-[17px] font-semibold tracking-tight">{config.card.metricValue}</span>
      </div>
      <div className="flex items-center justify-between pt-0.5">
        <span className="flex items-center gap-[5px] text-[12px] text-fg-subtle">
          <Icon name="clock" size={13} strokeWidth={2} />
          {config.estimatedTime}
        </span>
        <span className="flex items-center gap-[5px] text-[13px] font-semibold text-accent">
          Lancer
          <Icon name="arrow-right" size={15} strokeWidth={2.1} />
        </span>
      </div>
    </Link>
  );
}
