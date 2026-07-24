import Link from "next/link";
import type { Source } from "@/types/seo";
import { Icon } from "@/components/shared/icon";

interface SourcesBarProps {
  sources: Source[];
  updatedLabel?: string;
  /** Lien vers la page méthodologie complète, si elle existe. */
  methodologyHref?: string;
}

/** « Comment calculons-nous ces estimations ? » — confiance + sources + méthodo. */
export function SourcesBar({
  sources,
  updatedLabel = "Mis à jour · juillet 2026",
  methodologyHref,
}: SourcesBarProps) {
  return (
    <div className="rounded-xl border border-border bg-surface px-6 py-5">
      <div className="flex items-center gap-[9px]">
        <Icon name="shield-check" size={18} strokeWidth={2} className="text-accent" />
        <span className="text-[15px] font-semibold">Comment calculons-nous ces estimations ?</span>
      </div>
      <p className="mt-2 max-w-[640px] text-[13.5px] leading-[1.55] text-fg-muted">
        Nos estimations combinent plusieurs sources publiques. Les chiffres sont indicatifs, jamais un
        relevé comptable individuel.
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-x-[18px] gap-y-2">
        {sources.map((s) =>
          s.url ? (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer nofollow"
              title={s.scope}
              className="flex items-center gap-[6px] text-[13px] text-fg-muted underline decoration-border-strong underline-offset-2 hover:text-fg hover:decoration-accent"
            >
              <Icon name="badge-check" size={14} strokeWidth={2} className="text-fg-subtle" />
              {s.name}
            </a>
          ) : (
            <span key={s.name} title={s.scope} className="flex items-center gap-[6px] text-[13px] text-fg-muted">
              <Icon name="badge-check" size={14} strokeWidth={2} className="text-fg-subtle" />
              {s.name}
            </span>
          ),
        )}
        <span className="font-mono text-[11.5px] text-fg-subtle">{updatedLabel}</span>
      </div>
      {methodologyHref ? (
        <Link
          href={methodologyHref}
          className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-semibold text-accent hover:text-accent-hover"
        >
          Méthodologie complète
          <Icon name="arrow-right" size={15} strokeWidth={2.1} />
        </Link>
      ) : null}
    </div>
  );
}
