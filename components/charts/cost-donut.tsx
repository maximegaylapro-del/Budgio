"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import type { BreakdownItem } from "@/types/calculation";
import { chartColor } from "@/lib/charts/palette";
import { formatCurrency } from "@/lib/utils/format";

interface CostDonutProps {
  items: BreakdownItem[];
  centerLabel: string;
  centerValue: string;
}

/** Donut de répartition (Recharts) avec label central. */
export function CostDonut({ items, centerLabel, centerValue }: CostDonutProps) {
  return (
    <div className="relative mx-auto aspect-square w-[190px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={items}
            dataKey="value"
            nameKey="label"
            innerRadius="62%"
            outerRadius="100%"
            paddingAngle={1}
            stroke="none"
            startAngle={90}
            endAngle={-270}
            isAnimationActive
          >
            {items.map((item) => (
              <Cell key={item.id} fill={chartColor(item.colorIndex)} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-mono text-[10px] uppercase tracking-wide text-fg-subtle">{centerLabel}</span>
        <span className="text-[20px] font-semibold tracking-tight">{centerValue}</span>
      </div>
    </div>
  );
}

export { formatCurrency };
