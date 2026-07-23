import type { Recommendation } from "@/types/calculation";
import { Icon } from "@/components/shared/icon";

/** Grille de conseils personnalisés. */
export function RecommendationsPanel({ recommendations }: { recommendations: Recommendation[] }) {
  if (!recommendations.length) return null;
  return (
    <div>
      <h3 className="mb-4 text-[19px] font-semibold tracking-tight">Conseils pour votre budget</h3>
      <div className="grid grid-cols-1 gap-[14px] sm:grid-cols-2 lg:grid-cols-3">
        {recommendations.map((r) => (
          <div key={r.id} className="flex flex-col gap-[11px] rounded-xl border border-border bg-bg-elev p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-accent-soft text-accent">
              <Icon name={r.icon} size={20} />
            </div>
            <span className="text-[15px] font-semibold tracking-tight">{r.title}</span>
            <span className="text-[13.5px] leading-[1.5] text-fg-muted">{r.body}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
