import Link from "next/link";
import type { Source } from "@/types/seo";
import { Icon } from "@/components/shared/icon";

interface MethodologySectionProps {
  sources: Source[];
  /** Lien vers la page méthodologie complète (si le simulateur en a une). */
  methodologyHref?: string;
}

/** Section « Méthodologie & sources » visible et indexable, avec liens sortants. */
export function MethodologySection({ sources, methodologyHref }: MethodologySectionProps) {
  return (
    <section aria-labelledby="method-title" className="rounded-2xl border border-border bg-surface p-8">
      <div className="inline-flex items-center gap-[7px] rounded-full border border-accent-border bg-accent-soft px-3 py-[5px] font-mono text-[11.5px] text-accent">
        <Icon name="shield-check" size={14} strokeWidth={2} />
        MÉTHODOLOGIE
      </div>
      <h2 id="method-title" className="mt-4 text-[26px] font-semibold tracking-tight">
        D'où viennent ces chiffres ?
      </h2>
      <p className="mt-3 max-w-[640px] text-[15.5px] leading-[1.6] text-fg-muted text-pretty">
        Cette estimation est un modèle qui combine plusieurs sources publiques. Les montants de garde
        et de scolarité sont des restes à charge (après aides et crédit d'impôt). Il s'agit d'une
        estimation indicative, pas d'un relevé comptable individuel.
      </p>
      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {sources.map((s) => (
          <div key={s.name} className="flex gap-3 rounded-xl border border-border bg-bg-elev p-4">
            <Icon name="badge-check" size={18} strokeWidth={2} className="mt-0.5 flex-none text-accent" />
            <div className="flex flex-col gap-1">
              {s.url ? (
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-[15px] font-semibold underline decoration-border-strong underline-offset-2 hover:decoration-accent"
                >
                  {s.name}
                </a>
              ) : (
                <span className="text-[15px] font-semibold">{s.name}</span>
              )}
              {s.scope ? <span className="text-[13px] leading-[1.45] text-fg-muted">{s.scope}</span> : null}
            </div>
          </div>
        ))}
      </div>
      {methodologyHref ? (
        <Link
          href={methodologyHref}
          className="mt-6 inline-flex items-center gap-2 text-[14px] font-semibold text-accent hover:text-accent-hover"
        >
          Lire la méthodologie complète
          <Icon name="arrow-right" size={15} strokeWidth={2.1} />
        </Link>
      ) : null}
    </section>
  );
}
