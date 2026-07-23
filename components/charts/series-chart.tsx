"use client";

import {
  ResponsiveContainer, BarChart, Bar, LineChart, Line, AreaChart, Area,
  XAxis, YAxis, Tooltip, CartesianGrid,
} from "recharts";
import type { ChartSeries } from "@/types/calculation";
import { formatCurrencyShort } from "@/lib/utils/format";

const ACCENT = "var(--accent)";
const GRID = "var(--border)";
const AXIS = "var(--fg-subtle)";

const axisProps = {
  tick: { fill: AXIS, fontSize: 11, fontFamily: "var(--font-geist-mono)" },
  tickLine: false,
  axisLine: { stroke: GRID },
} as const;

/** Rend une série normalisée via Recharts selon son type (bar/line/area). */
export function SeriesChart({ series, height = 220 }: { series: ChartSeries; height?: number }) {
  const data = series.points.map((p) => ({ x: p.x, y: p.y }));

  return (
    <ResponsiveContainer width="100%" height={height}>
      {series.type === "line" ? (
        <LineChart data={data} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
          <CartesianGrid stroke={GRID} vertical={false} />
          <XAxis dataKey="x" {...axisProps} />
          <YAxis {...axisProps} tickFormatter={formatCurrencyShort} width={52} />
          <Tooltip content={<ChartTooltip />} />
          <Line type="monotone" dataKey="y" stroke={ACCENT} strokeWidth={2.4} dot={false} />
        </LineChart>
      ) : series.type === "area" ? (
        <AreaChart data={data} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
          <defs>
            <linearGradient id={`area-${series.id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={ACCENT} stopOpacity={0.35} />
              <stop offset="100%" stopColor={ACCENT} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke={GRID} vertical={false} />
          <XAxis dataKey="x" {...axisProps} />
          <YAxis {...axisProps} tickFormatter={formatCurrencyShort} width={52} />
          <Tooltip content={<ChartTooltip />} />
          <Area type="monotone" dataKey="y" stroke={ACCENT} strokeWidth={2.4} fill={`url(#area-${series.id})`} />
        </AreaChart>
      ) : (
        <BarChart data={data} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
          <CartesianGrid stroke={GRID} vertical={false} />
          <XAxis dataKey="x" {...axisProps} />
          <YAxis {...axisProps} tickFormatter={formatCurrencyShort} width={52} />
          <Tooltip cursor={{ fill: "var(--surface)" }} content={<ChartTooltip />} />
          <Bar dataKey="y" fill={ACCENT} radius={[8, 8, 4, 4]} maxBarSize={64} />
        </BarChart>
      )}
    </ResponsiveContainer>
  );
}

interface TooltipProps {
  active?: boolean;
  payload?: { value: number; payload: { x: string | number } }[];
}
function ChartTooltip({ active, payload }: TooltipProps) {
  if (!active || !payload?.length) return null;
  const point = payload[0]!;
  return (
    <div className="rounded-md border border-border bg-bg-elev px-3 py-2 shadow-md">
      <div className="font-mono text-[11px] text-fg-subtle">{String(point.payload.x)}</div>
      <div className="text-[13px] font-semibold">{formatCurrencyShort(point.value)}</div>
    </div>
  );
}
