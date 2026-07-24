import { describe, it, expect } from "vitest";
import { carCalculator } from "@/config/simulators/cout-voiture/calculator";
import type { CarAnswers } from "@/config/simulators/cout-voiture/assumptions";

function run(overrides: Partial<CarAnswers>) {
  const answers: CarAnswers = {
    motorisation: "essence",
    prix: 22000,
    etat: "occasion_recente",
    km: 13000,
    duree: 5,
    assurance: "intermediaire",
    ...overrides,
  };
  return carCalculator.compute({ answers, partial: false, locale: "fr_FR" });
}

describe("carCalculator", () => {
  it("produit un total, des métriques et une répartition cohérents", () => {
    const r = run({});
    expect(r.headline.value).toBeGreaterThan(0);
    expect(r.metrics.map((m) => m.id)).toEqual(["monthly", "annual", "duration"]);
    const pctSum = r.breakdown.reduce((s, b) => s + b.pct, 0);
    expect(pctSum).toBeCloseTo(100, 0);
  });

  it("mensuel = annuel / 12 et annuel = total / durée", () => {
    const r = run({ duree: 5 });
    const monthly = r.metrics.find((m) => m.id === "monthly")!.value;
    const annual = r.metrics.find((m) => m.id === "annual")!.value;
    expect(annual / 12).toBeCloseTo(monthly, 6);
    expect(r.headline.value / 5).toBeCloseTo(annual, 6);
  });

  it("le neuf coûte plus cher que l'occasion récente (décote)", () => {
    expect(run({ etat: "neuf" }).headline.value).toBeGreaterThan(
      run({ etat: "occasion_recente" }).headline.value,
    );
  });

  it("rouler plus augmente le coût (carburant + pneus)", () => {
    expect(run({ km: 30000 }).headline.value).toBeGreaterThan(run({ km: 8000 }).headline.value);
  });

  it("tous risques coûte plus que le tiers", () => {
    expect(run({ assurance: "tousrisques" }).headline.value).toBeGreaterThan(
      run({ assurance: "tiers" }).headline.value,
    );
  });

  it("la dépréciation est un poste identifié du breakdown", () => {
    expect(run({}).breakdown.find((b) => b.id === "depreciation")).toBeDefined();
  });

  it("le coût par an du défaut est dans une fourchette réaliste (3 000–8 000 €)", () => {
    const r = run({});
    const annual = r.metrics.find((m) => m.id === "annual")!.value;
    expect(annual).toBeGreaterThan(3000);
    expect(annual).toBeLessThan(8000);
  });

  it("génère une série coût par année", () => {
    const r = run({ duree: 5 });
    expect(r.series?.[0]?.points.length).toBe(5);
  });
});
