import { Icon } from "@/components/shared/icon";

const METHOD = [
  {
    icon: "database",
    title: "Données officielles",
    desc: "Chaque calcul s'appuie sur des sources publiques et vérifiées : INSEE, ADEME, Banque de France…",
  },
  {
    icon: "function-square",
    title: "Modèles transparents",
    desc: "Nos formules sont documentées et auditées régulièrement. Aucune boîte noire, tout est expliqué.",
  },
  {
    icon: "sliders-horizontal",
    title: "Ajusté à votre situation",
    desc: "Vous affinez chaque hypothèse — région, revenus, habitudes. Le résultat vous ressemble vraiment.",
  },
];

const SOURCES = [
  { name: "INSEE", scope: "Dépenses des ménages, inflation" },
  { name: "ADEME", scope: "Énergie, rendement solaire" },
  { name: "Banque de France", scope: "Taux de crédit, épargne" },
  { name: "Notaires de France", scope: "Prix de l'immobilier" },
  { name: "Sécurité sociale", scope: "Santé, prestations familiales" },
  { name: "ACOSS / URSSAF", scope: "Revenus, cotisations" },
];

/** Section méthodologie / crédibilité. */
export function Methodology() {
  return (
    <section id="methode" className="py-14">
      <div className="grid grid-cols-1 gap-10 rounded-2xl border border-border bg-surface p-10 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <div className="inline-flex items-center gap-[7px] rounded-full border border-accent-border bg-accent-soft px-3 py-[5px] font-mono text-[11.5px] text-accent">
            <Icon name="shield-check" size={14} strokeWidth={2} />
            MÉTHODOLOGIE
          </div>
          <h2 className="mt-4 text-[30px] font-semibold leading-[1.1] tracking-tight text-balance">
            Des chiffres en qui vous pouvez avoir confiance.
          </h2>
          <p className="mt-3.5 max-w-[480px] text-[15.5px] leading-[1.6] text-fg-muted text-pretty">
            Budgio n'invente rien. Chaque estimation repose sur des données publiques et des modèles
            documentés — pour que vous décidiez en connaissance de cause.
          </p>
          <div className="mt-6 flex flex-col gap-2.5">
            {METHOD.map((m) => (
              <div key={m.title} className="flex gap-[14px] rounded-lg border border-border bg-bg-elev p-4">
                <div className="flex h-10 w-10 flex-none items-center justify-center rounded-md bg-accent-soft text-accent">
                  <Icon name={m.icon} size={20} />
                </div>
                <div className="flex flex-col gap-[3px]">
                  <span className="text-[15px] font-semibold tracking-tight">{m.title}</span>
                  <span className="text-[13.5px] leading-[1.5] text-fg-muted">{m.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4 rounded-xl border border-border bg-bg-elev p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[15px] font-semibold">Nos sources</span>
            <span className="rounded-md bg-accent-soft px-[9px] py-1 font-mono text-[11px] text-accent">
              12 officielles
            </span>
          </div>
          <div className="flex flex-col">
            {SOURCES.map((s) => (
              <div key={s.name} className="flex items-center gap-3 border-b border-border px-1 py-[11px]">
                <Icon name="badge-check" size={17} strokeWidth={2} className="text-accent" />
                <div className="flex flex-1 flex-col leading-tight">
                  <span className="text-[14px] font-semibold">{s.name}</span>
                  <span className="text-[12px] text-fg-subtle">{s.scope}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
