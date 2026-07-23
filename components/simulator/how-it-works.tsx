import { Icon } from "@/components/shared/icon";
import type { LucideIconName } from "@/types/common";

const STEPS: { icon: LucideIconName; title: string; desc: string }[] = [
  {
    icon: "list-checks",
    title: "Répondez à quelques questions",
    desc: "Votre situation, votre région, vos habitudes. Rien de personnel n'est demandé, aucune inscription.",
  },
  {
    icon: "sliders-horizontal",
    title: "Ajustez vos hypothèses",
    desc: "Chaque réponse affine l'estimation en direct. Vous voyez le résultat évoluer à mesure que vous avancez.",
  },
  {
    icon: "line-chart",
    title: "Obtenez une estimation détaillée",
    desc: "Coût total, par mois, par an, répartition par poste, projection dans le temps et conseils personnalisés.",
  },
];

/** Section « Comment ça marche » — générique à tous les simulateurs. */
export function HowItWorks() {
  return (
    <section aria-labelledby="how-title">
      <h2 id="how-title" className="text-[26px] font-semibold tracking-tight">
        Comment fonctionne ce simulateur ?
      </h2>
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        {STEPS.map((step, i) => (
          <div key={step.title} className="rounded-xl border border-border bg-bg-elev p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-accent-soft text-accent">
                <Icon name={step.icon} size={20} />
              </div>
              <span className="font-mono text-[13px] text-fg-subtle">0{i + 1}</span>
            </div>
            <h3 className="mt-4 text-[16px] font-semibold tracking-tight">{step.title}</h3>
            <p className="mt-2 text-[14px] leading-[1.55] text-fg-muted">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
