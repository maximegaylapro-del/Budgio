import type { CalculationResult } from "@/types/calculation";
import { StackedBar } from "@/components/charts/stacked-bar";
import { Icon } from "@/components/shared/icon";
import { chartColor } from "@/lib/charts/palette";
import { formatCurrency, formatMetric } from "@/lib/utils/format";

/** Répartition des dépenses : barre empilée horizontale + légende détaillée. */
export function BreakdownPanel({ result }: { result: CalculationResult }) {
  return (
    <div className="rounded-2xl border border-border bg-bg-elev p-7">
      <div className="flex items-baseline justify-between gap-4">
        <span className="text-[15px] font-semibold">Répartition des dépenses</span>
        <span className="text-[14px] text-fg-muted">
          Total <span className="font-semibold text-fg">{formatMetric(result.headline)}</span>
        </span>
      </div>

      <div className="mt-5">
        <StackedBar items={result.breakdown} />
      </div>

      <ul className="mt-6 flex flex-col gap-1">
        {result.breakdown.map((item) => {
          const color = chartColor(item.colorIndex);
          return (
            <li key={item.id} className="flex items-center gap-3 py-1.5">
              <span
                className="flex h-8 w-8 flex-none items-center justify-center rounded-md"
                style={{ background: color }}
              >
                {item.icon ? (
                  <Icon name={item.icon} size={16} className="text-white" strokeWidth={2} />
                ) : null}
              </span>
              <span className="flex-1 text-[14.5px]">{item.label}</span>
              <span className="text-[14px] font-semibold tracking-tight tabular-nums">
                {formatCurrency(item.value)}
              </span>
              <span className="w-12 text-right font-mono text-[12.5px] text-fg-subtle tabular-nums">
                {Math.round(item.pct)} %
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
