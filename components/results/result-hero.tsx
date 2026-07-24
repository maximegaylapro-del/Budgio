import type { Answers, CalculationResult } from "@/types/calculation";
import { Icon } from "@/components/shared/icon";
import { formatMetric } from "@/lib/utils/format";
import { ResultShareActions } from "./result-share-actions";

interface ResultHeroProps {
  result: CalculationResult;
  subtitle?: string;
  /** Si fourni, affiche le cluster de partage sous le montant. */
  share?: { slug: string; title: string; answers: Answers };
}

/** En-tête du résultat : grand chiffre + partage + métriques clés. */
export function ResultHero({ result, subtitle, share }: ResultHeroProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-bg-elev px-8 py-[52px] text-center shadow-lg">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[280px]" style={{ background: "var(--glow)" }} />
      <div className="relative">
        <div className="inline-flex items-center gap-[7px] rounded-full border border-accent-border bg-accent-soft px-[13px] py-[5px] text-[12.5px] text-accent">
          <Icon name="sparkles" size={14} strokeWidth={2} />
          Votre estimation personnalisée
        </div>
        {subtitle ? <p className="mt-5 text-[15px] text-fg-muted">{subtitle}</p> : null}
        <div className="mt-[10px] text-[72px] font-semibold leading-none tracking-tighter">
          {formatMetric(result.headline)}
        </div>

        {share ? (
          <div className="mt-6">
            <ResultShareActions
              slug={share.slug}
              title={share.title}
              answers={share.answers}
              result={result}
            />
          </div>
        ) : null}

        <div className="mt-[26px] flex flex-wrap justify-center gap-3">
          {result.metrics.map((m) => (
            <div key={m.id} className="min-w-[150px] rounded-lg border border-border bg-surface px-[22px] py-4">
              <div className="font-mono text-[10.5px] uppercase tracking-wide text-fg-subtle">{m.label}</div>
              <div className="mt-1 text-[24px] font-semibold tracking-tight">{formatMetric(m)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
