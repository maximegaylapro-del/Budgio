import { describe, it, expect } from "vitest";
import { immoCalculator } from "@/config/simulators/capacite-achat/calculator";
import type { ImmoAnswers } from "@/config/simulators/capacite-achat/assumptions";

function run(overrides: Partial<ImmoAnswers>) {
  const answers: ImmoAnswers = {
    revenu: 3500,
    charges: 0,
    apport: 20000,
    duree: 25,
    bien: "ancien",
    endettement: "max",
    ...overrides,
  };
  return immoCalculator.compute({ answers, partial: false, locale: "fr_FR" });
}

describe("immoCalculator", () => {
  it("produit une capacité, une mensualité et une répartition cohérentes", () => {
    const r = run({});
    expect(r.headline.value).toBeGreaterThan(0);
    expect(r.metrics.map((m) => m.id)).toEqual(["monthly", "loan", "duration"]);
    const pctSum = r.breakdown.reduce((s, b) => s + b.pct, 0);
    expect(pctSum).toBeCloseTo(100, 0);
  });

  it("respecte la règle des 35 % : mensualité = 35 % du revenu (sans charges)", () => {
    const r = run({ revenu: 4000, charges: 0, endettement: "max" });
    const monthly = r.metrics.find((m) => m.id === "monthly")!.value;
    expect(monthly).toBeCloseTo(4000 * 0.35, 0);
  });

  it("les charges en cours réduisent la capacité", () => {
    expect(run({ charges: 500 }).headline.value).toBeLessThan(run({ charges: 0 }).headline.value);
  });

  it("plus de revenus = plus de capacité", () => {
    expect(run({ revenu: 6000 }).headline.value).toBeGreaterThan(run({ revenu: 3000 }).headline.value);
  });

  it("une durée plus longue augmente le capital empruntable", () => {
    const loan25 = run({ duree: 25 }).metrics.find((m) => m.id === "loan")!.value;
    const loan15 = run({ duree: 15 }).metrics.find((m) => m.id === "loan")!.value;
    expect(loan25).toBeGreaterThan(loan15);
  });

  it("le neuf (frais de notaire plus faibles) donne un bien plus cher à emprunt égal", () => {
    expect(run({ bien: "neuf" }).headline.value).toBeGreaterThan(run({ bien: "ancien" }).headline.value);
  });

  it("le mode prudent (33 %) donne moins que le maximum (35 %)", () => {
    expect(run({ endettement: "prudent" }).headline.value).toBeLessThan(
      run({ endettement: "max" }).headline.value,
    );
  });

  it("capacité réaliste : 3 500 €/mois, 20 k€ apport, 25 ans → 180 k€–280 k€", () => {
    const r = run({});
    expect(r.headline.value).toBeGreaterThan(180000);
    expect(r.headline.value).toBeLessThan(280000);
  });
});
