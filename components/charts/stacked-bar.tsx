import type { BreakdownItem } from "@/types/calculation";
import { chartColor } from "@/lib/charts/palette";

/**
 * Barre horizontale empilée : compare des parts d'un tout par la LONGUEUR
 * (plus précis perceptuellement que les angles d'un donut — Cleveland & McGill).
 */
export function StackedBar({ items }: { items: BreakdownItem[] }) {
  if (!items.length) return null;
  return (
    <div className="flex h-9 w-full overflow-hidden rounded-full border border-border" role="img" aria-label="Répartition des dépenses par poste">
      {items.map((item, i) => (
        <div
          key={item.id}
          title={`${item.label} · ${Math.round(item.pct)} %`}
          style={{
            width: `${item.pct}%`,
            background: chartColor(item.colorIndex),
            boxShadow: i > 0 ? "inset 1.5px 0 0 var(--bg-elev)" : undefined,
          }}
        />
      ))}
    </div>
  );
}
