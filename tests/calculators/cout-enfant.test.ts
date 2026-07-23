import { describe, it, expect } from "vitest";
import { childCalculator } from "@/config/simulators/cout-enfant/calculator";
import type { ChildAnswers } from "@/config/simulators/cout-enfant/assumptions";

function run(overrides: Partial<ChildAnswers>) {
  const answers: ChildAnswers = {
    name: "",
    ageMax: 18,
    region: "ville",
    garde: "creche",
    ecole: "public",
    niveau: "equilibre",
    ...overrides,
  };
  return childCalculator.compute({ answers, partial: false, locale: "fr_FR" });
}

describe("childCalculator", () => {
  it("produit un total, des métriques et une répartition cohérents", () => {
    const r = run({});
    expect(r.headline.value).toBeGreaterThan(0);
    expect(r.metrics.map((m) => m.id)).toEqual(["monthly", "annual", "duration"]);
    const pctSum = r.breakdown.reduce((s, b) => s + b.pct, 0);
    expect(pctSum).toBeCloseTo(100, 0);
  });

  it("mensuel = annuel / 12 et annuel = total / durée", () => {
    const r = run({ ageMax: 18 });
    const monthly = r.metrics.find((m) => m.id === "monthly")!.value;
    const annual = r.metrics.find((m) => m.id === "annual")!.value;
    expect(annual / 12).toBeCloseTo(monthly, 6);
    expect(r.headline.value / 18).toBeCloseTo(annual, 6);
  });

  it("la grande ville coûte plus cher que la zone rurale", () => {
    expect(run({ region: "grande" }).headline.value).toBeGreaterThan(
      run({ region: "rural" }).headline.value,
    );
  });

  it("le niveau confort coûte plus que le niveau économe", () => {
    expect(run({ niveau: "confort" }).headline.value).toBeGreaterThan(
      run({ niveau: "econome" }).headline.value,
    );
  });

  it("le parent au foyer supprime le poste de garde", () => {
    const foyer = run({ garde: "foyer" });
    expect(foyer.breakdown.find((b) => b.id === "garde")).toBeUndefined();
    expect(run({ garde: "creche" }).headline.value).toBeGreaterThan(foyer.headline.value);
  });

  it("les études supérieures n'apparaissent qu'au-delà de 18 ans", () => {
    expect(run({ ageMax: 15, ecole: "superieur" }).breakdown.find((b) => b.id === "scolarite")).toBeUndefined();
    expect(run({ ageMax: 22, ecole: "superieur" }).breakdown.find((b) => b.id === "scolarite")).toBeDefined();
  });

  it("le scénario par défaut reste dans la fourchette documentée (HCFEA/DREES)", () => {
    // Défaut : équilibré, ville moyenne, crèche, public, 0→18 ans.
    // DREES/ONPES situent le coût central autour de 7 000–9 000 €/an, soit
    // ~130 000–175 000 € au total et ~550–800 €/mois. Garde-fou de calibrage.
    const r = run({ ageMax: 18 });
    expect(r.headline.value).toBeGreaterThan(130_000);
    expect(r.headline.value).toBeLessThan(175_000);
    const monthly = r.metrics.find((m) => m.id === "monthly")!.value;
    expect(monthly).toBeGreaterThan(550);
    expect(monthly).toBeLessThan(800);
  });

  it("génère une série de projection par tranche d'âge", () => {
    const r = run({ ageMax: 18 });
    expect(r.series?.[0]?.type).toBe("bar");
    expect(r.series?.[0]?.points.length).toBeGreaterThan(0);
  });
});
