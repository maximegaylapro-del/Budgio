import Link from "next/link";
import { getAllSimulators } from "@/config/registry";
import { SimulatorSearch } from "./simulator-search";

/** Hero de la home : accroche + recherche de simulateurs. */
export function Hero() {
  const chips = getAllSimulators().slice(0, 7);
  return (
    <div className="relative overflow-hidden py-[72px] text-center">
      <div className="pointer-events-none absolute -top-10 left-0 right-0 h-[420px] animate-pulseGlow" style={{ background: "var(--glow)" }} />
      <div className="relative">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-bg-elev px-[13px] py-[5px] text-[13px] text-fg-muted shadow-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          Simulateurs · sources officielles · 100% gratuit
        </div>
        <h1 className="mx-auto mt-[22px] max-w-[820px] text-[56px] font-semibold leading-[1.03] tracking-tighter text-balance">
          Chaque grande décision a un coût.
          <br />
          Budgio le calcule pour vous.
        </h1>
        <p className="mx-auto mt-5 max-w-[560px] text-[18px] leading-[1.55] text-fg-muted text-pretty">
          Enfant, voiture, maison, énergie… Budgio transforme vos questions de budget en réponses
          chiffrées, projetées sur plusieurs années et adaptées à votre situation.
        </p>

        <SimulatorSearch />

        <div className="mx-auto mt-4 flex max-w-[720px] flex-wrap justify-center gap-2">
          <span className="self-center text-[13px] text-fg-subtle">Populaire :</span>
          {chips.map((c) => (
            <Link
              key={c.slug}
              href={`/simulateurs/${c.slug}`}
              className="rounded-full border border-border bg-surface px-[14px] py-[7px] text-[13.5px] font-medium text-fg-muted transition-colors hover:border-border-strong hover:bg-surface-2 hover:text-fg"
            >
              {c.shortTitle}
            </Link>
          ))}
        </div>
        <p className="mt-[22px] font-mono text-[12px] text-fg-subtle">
          Un résultat en moins de 5 secondes — sans inscription.
        </p>
      </div>
    </div>
  );
}
