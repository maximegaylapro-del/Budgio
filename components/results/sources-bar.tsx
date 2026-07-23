import type { Source } from "@/types/seo";
import { Icon } from "@/components/shared/icon";

/** Bandeau des sources officielles utilisées. */
export function SourcesBar({ sources, updatedLabel = "Mis à jour · juillet 2026" }: { sources: Source[]; updatedLabel?: string }) {
  return (
    <div className="flex flex-wrap items-center gap-[18px] rounded-xl border border-border bg-surface px-6 py-5">
      <div className="flex items-center gap-[9px]">
        <Icon name="shield-check" size={18} strokeWidth={2} className="text-accent" />
        <span className="text-[13.5px] font-semibold">Sources</span>
      </div>
      {sources.map((s) => (
        <span key={s.name} className="flex items-center gap-[6px] text-[13px] text-fg-muted">
          <Icon name="badge-check" size={14} strokeWidth={2} className="text-fg-subtle" />
          {s.name}
        </span>
      ))}
      <span className="ml-auto font-mono text-[11.5px] text-fg-subtle">{updatedLabel}</span>
    </div>
  );
}
