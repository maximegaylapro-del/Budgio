import type { Insight } from "@/types/calculation";
import { Icon } from "@/components/shared/icon";

/**
 * « Ce qu'il faut retenir » — les conclusions en clair, juste après le chiffre.
 * La plupart des gens lisent les conclusions, pas les graphiques.
 */
export function TakeawaysCard({ takeaways }: { takeaways: Insight[] }) {
  if (!takeaways.length) return null;
  return (
    <section
      aria-labelledby="takeaways-title"
      className="rounded-2xl border border-accent-border bg-accent-soft p-6 sm:p-7"
    >
      <div className="flex items-center gap-2">
        <Icon name="star" size={17} strokeWidth={2} className="text-accent" />
        <h2 id="takeaways-title" className="text-[16px] font-semibold tracking-tight">
          Ce qu'il faut retenir
        </h2>
      </div>
      <ul className="mt-4 flex flex-col gap-3">
        {takeaways.map((item) => (
          <li key={item.id} className="flex items-start gap-3">
            <span className="mt-0.5 flex h-8 w-8 flex-none items-center justify-center rounded-md bg-bg-elev text-accent">
              <Icon name={item.icon} size={17} strokeWidth={2} />
            </span>
            <span className="pt-1 text-[15px] leading-[1.5] text-fg">{item.text}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
