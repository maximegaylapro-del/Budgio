import type { CalculationResult } from "@/types/calculation";
import { CostDonut } from "@/components/charts/cost-donut";
import { chartColor } from "@/lib/charts/palette";
import { formatCurrency, formatMetric } from "@/lib/utils/format";

/** Donut + détail par poste de dépense. */
export function BreakdownPanel({ result }: { result: CalculationResult }) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-[300px_1fr]">
      <div className="flex flex-col items-center rounded-2xl border border-border bg-bg-elev p-7">
        <span className="self-start text-[15px] font-semibold">Répartition</span>
        <div className="my-[22px]">
          <CostDonut
            items={result.breakdown}
            centerLabel="Total"
            centerValue={formatMetric(result.headline)}
          />
        </div>
      </div>
      <div className="rounded-2xl border border-border bg-bg-elev p-7">
        <span className="text-[15px] font-semibold">Détail par poste de dépense</span>
        <div className="mt-[18px] flex flex-col gap-[14px]">
          {result.breakdown.map((item) => (
            <div key={item.id} className="flex items-center gap-[14px]">
              <span
                className="h-[11px] w-[11px] flex-none rounded-sm"
                style={{ background: chartColor(item.colorIndex) }}
              />
              <span className="w-[150px] flex-none text-[14px]">{item.label}</span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-surface">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${item.pct}%`, background: chartColor(item.colorIndex) }}
                />
              </div>
              <span className="w-[88px] text-right text-[13.5px] font-semibold tracking-tight">
                {formatCurrency(item.value)}
              </span>
              <span className="w-[42px] text-right font-mono text-[12px] text-fg-subtle">
                {Math.round(item.pct)} %
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
