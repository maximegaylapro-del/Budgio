import { getAllSimulators } from "@/config/registry";
import { SimulatorCard } from "@/components/shared/simulator-card";

/** Maillage interne : autres simulateurs (même catégorie en priorité). */
export function RelatedSimulators({ currentSlug, category }: { currentSlug: string; category: string }) {
  const others = getAllSimulators().filter((s) => s.slug !== currentSlug);
  if (!others.length) return null;

  const ranked = [...others].sort((a, b) => {
    const aSame = a.category === category ? 0 : 1;
    const bSame = b.category === category ? 0 : 1;
    return aSame - bSame;
  });
  const related = ranked.slice(0, 4);

  return (
    <section aria-labelledby="related-title">
      <h2 id="related-title" className="text-[26px] font-semibold tracking-tight">
        Autres simulateurs
      </h2>
      <div className="mt-6 grid grid-cols-1 gap-[14px] sm:grid-cols-2 lg:grid-cols-4">
        {related.map((config) => (
          <SimulatorCard key={config.slug} config={config} />
        ))}
      </div>
    </section>
  );
}
