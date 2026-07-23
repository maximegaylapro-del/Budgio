import type { Calculator } from "@/lib/calculators/types";
import type { CalculationInput, CalculationResult, ChartSeries } from "@/types/calculation";
import { buildBreakdown } from "@/lib/calculators/helpers";
import { formatCurrency } from "@/lib/utils/format";
import { CHILD_ASSUMPTIONS as A, type ChildAnswers } from "./assumptions";

/** Coût d'une année donnée pour un enfant d'âge `age`. */
function yearCost(age: number, a: ChildAnswers) {
  const band = A.baseCostByAge.find((b) => age < b.maxAge) ?? A.baseCostByAge[A.baseCostByAge.length - 1]!;
  const nMult = A.lifestyleMultiplier[a.niveau] ?? 1;
  const rMult = A.regionMultiplier[a.region] ?? 1;
  const base = band.cost * nMult * rMult;

  let garde = 0;
  let scol = 0;
  if (age < 3) garde = (A.childcareAnnual[a.garde] ?? 0) * rMult;
  if (age >= 6 && age < 18 && a.ecole === "prive") scol = A.privateSchoolAnnual;
  if (age >= 18 && a.ecole === "superieur") scol = A.higherEducationAnnual;

  return { total: base + garde + scol, base, garde, scol };
}

function normalize(answers: CalculationInput<ChildAnswers>["answers"]): ChildAnswers {
  return {
    name: String(answers.name ?? ""),
    ageMax: Number(answers.ageMax ?? 18),
    region: (answers.region as ChildAnswers["region"]) ?? "ville",
    garde: (answers.garde as ChildAnswers["garde"]) ?? "creche",
    ecole: (answers.ecole as ChildAnswers["ecole"]) ?? "public",
    niveau: (answers.niveau as ChildAnswers["niveau"]) ?? "equilibre",
  };
}

export const childCalculator: Calculator<ChildAnswers> = {
  assumptions: A,

  compute({ answers }: CalculationInput<ChildAnswers>): CalculationResult {
    const a = normalize(answers);
    const years = Math.max(1, Math.min(a.ageMax, 25));

    let total = 0;
    let garde = 0;
    let scol = 0;
    for (let age = 0; age < years; age++) {
      const c = yearCost(age, a);
      total += c.total;
      garde += c.garde;
      scol += c.scol;
    }
    const baseSum = total - garde - scol;
    const annual = total / years;
    const monthly = annual / 12;

    // Postes de dépense : ventilation du socle + garde + scolarité.
    const breakdown = buildBreakdown([
      ...A.baseSplit.map((s) => ({ id: s.id, label: s.label, value: baseSum * s.share })),
      { id: "garde", label: "Garde", value: garde },
      { id: "scolarite", label: "Scolarité", value: scol },
    ]);

    // Série de projection par tranche d'âge.
    const bandPoints = A.ageBands
      .filter((b) => b.lo < years)
      .map((b) => {
        let v = 0;
        for (let age = b.lo; age < Math.min(b.hi, years); age++) v += yearCost(age, a).total;
        return { x: b.label, y: v };
      });
    const series: ChartSeries[] = [
      { id: "age-bands", label: "Coût par tranche d'âge", type: "bar", points: bandPoints },
    ];

    const summary = `Élever un enfant jusqu'à ${years} ans représente environ ${formatCurrency(
      total,
    )}, soit ${formatCurrency(monthly)} par mois en moyenne.`;

    return {
      headline: { id: "total", label: "Coût total estimé", value: total, format: "currency" },
      metrics: [
        { id: "monthly", label: "Par mois", value: monthly, format: "currency" },
        { id: "annual", label: "Par an", value: annual, format: "currency" },
        { id: "duration", label: "Durée", value: years, format: "duration", unit: "ans" },
      ],
      breakdown,
      series,
      summary,
    };
  },
};
