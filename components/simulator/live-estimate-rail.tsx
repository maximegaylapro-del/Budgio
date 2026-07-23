"use client";

import type { CalculationResult } from "@/types/calculation";
import { chartColor } from "@/lib/charts/palette";
import { formatCurrency, formatMetric } from "@/lib/utils/format";

/** Rail latéral d'estimation en direct, mis à jour à chaque réponse. */
export function LiveEstimateRail({ result }: { result: CalculationResult }) {
  const monthly = result.metrics.find((m) => m.id === "monthly");
  const top = result.breakdown.slice(0, 4);

  return (
    <aside className="sticky top-24 rounded-xl border border-border bg-bg-elev p-6 shadow-md">
      <div className="flex items-center gap-2">
        <span className="h-2 w-2 animate-livePulse rounded-full bg-success" />
        <span className="text-[13px] font-semibold text-fg-muted">Estimation en direct</span>
      </div>
      <div className="mt-4">
        <div className="font-mono text-[11px] uppercase tracking-wide text-fg-subtle">
          {result.headline.label}
        </div>
        <div className="mt-1 text-[34px] font-semibold tracking-tight">
          {formatMetric(result.headline)}
        </div>
        {monthly ? (
          <div className="mt-0.5 text-[13.5px] text-fg-muted">soit {formatCurrency(monthly.value)} / mois</div>
        ) : null}
      </div>
      <div className="my-5 h-px bg-border" />
      <div className="flex flex-col gap-3">
        {top.map((item) => (
          <div key={item.id} className="flex flex-col gap-1.5">
            <div className="flex justify-between text-[12.5px]">
              <span className="text-fg-muted">{item.label}</span>
              <span className="font-mono text-fg-subtle">{Math.round(item.pct)} %</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-surface">
              <div
                className="h-full rounded-full transition-[width] duration-500 ease-out"
                style={{ width: `${item.pct}%`, background: chartColor(item.colorIndex) }}
              />
            </div>
          </div>
        ))}
      </div>
      <p className="mt-[18px] text-[11.5px] leading-[1.5] text-fg-subtle text-pretty">
        S’affine à chaque réponse. Estimation indicative basée sur des moyennes officielles.
      </p>
    </aside>
  );
}
