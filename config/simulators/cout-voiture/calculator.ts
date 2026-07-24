import type { Calculator } from "@/lib/calculators/types";
import type { CalculationInput, CalculationResult, ChartSeries, Insight } from "@/types/calculation";
import { buildBreakdown } from "@/lib/calculators/helpers";
import { formatCurrency } from "@/lib/utils/format";
import { CAR_ASSUMPTIONS as A, type CarAnswers } from "./assumptions";

function normalize(answers: CalculationInput<CarAnswers>["answers"]): CarAnswers {
  return {
    motorisation: (answers.motorisation as CarAnswers["motorisation"]) ?? "essence",
    prix: Number(answers.prix ?? 18000),
    etat: (answers.etat as CarAnswers["etat"]) ?? "occasion_recente",
    km: Number(answers.km ?? 13000),
    duree: Number(answers.duree ?? 5),
    assurance: (answers.assurance as CarAnswers["assurance"]) ?? "intermediaire",
  };
}

/** Décote annuelle : renvoie la valeur résiduelle après chaque année de possession. */
function residualValues(price: number, etat: string, years: number): number[] {
  const values: number[] = [];
  let value = price;
  for (let year = 1; year <= years; year++) {
    const drop = year === 1 ? (A.firstYearDrop[etat] ?? 0.12) : (A.annualDrop[etat] ?? 0.11);
    value = value * (1 - drop);
    values.push(value);
  }
  return values;
}

export const carCalculator: Calculator<CarAnswers> = {
  assumptions: A,

  compute({ answers }: CalculationInput<CarAnswers>): CalculationResult {
    const a = normalize(answers);
    const years = Math.max(1, Math.min(a.duree, 15));
    const totalKm = a.km * years;

    // Dépréciation (poste le plus lourd, surtout en neuf).
    const residuals = residualValues(a.prix, a.etat, years);
    const resale = residuals[residuals.length - 1] ?? a.prix;
    const depreciation = a.prix - resale;

    // Coûts d'usage annuels.
    const annualFuel = (a.km / 100) * (A.consumption[a.motorisation] ?? 6.8) * (A.energyPrice[a.motorisation] ?? 1.9);
    const evFactor = a.motorisation === "electrique" ? A.insuranceEvFactor : 1;
    const annualInsurance = (A.insuranceAnnual[a.assurance] ?? 650) * evFactor;
    const annualMaintenance =
      (A.maintenanceAnnual[a.motorisation] ?? 700) * (A.maintenanceStateFactor[a.etat] ?? 1.2);
    const annualTires = a.km * A.tiresPerKm;

    const fuel = annualFuel * years;
    const insurance = annualInsurance * years;
    const maintenance = annualMaintenance * years;
    const tires = annualTires * years;
    const inspection = A.inspectionAnnual * years;

    const total = depreciation + fuel + insurance + maintenance + tires + inspection;
    const annual = total / years;
    const monthly = annual / 12;
    const perKm = totalKm > 0 ? total / totalKm : 0;

    const breakdown = buildBreakdown([
      { id: "depreciation", label: "Dépréciation", value: depreciation, icon: "trending-down" },
      { id: "carburant", label: "Carburant / énergie", value: fuel, icon: "fuel" },
      { id: "assurance", label: "Assurance", value: insurance, icon: "shield-check" },
      { id: "entretien", label: "Entretien", value: maintenance, icon: "wrench" },
      { id: "pneus", label: "Pneus", value: tires, icon: "disc-3" },
      { id: "controle", label: "Contrôle technique", value: inspection, icon: "clipboard-check" },
    ]);

    // Coût par année de possession (la 1ʳᵉ année absorbe le gros de la décote).
    const usageAnnual = annualFuel + annualInsurance + annualMaintenance + annualTires + A.inspectionAnnual;
    const points = residuals.map((value, i) => {
      const prev = i === 0 ? a.prix : residuals[i - 1]!;
      return { x: `Année ${i + 1}`, y: prev - value + usageAnnual };
    });
    const series: ChartSeries[] = [
      { id: "par-annee", label: "Coût par année de possession", type: "bar", points },
    ];

    const summary = `Posséder cette voiture pendant ${years} ans revient à environ ${formatCurrency(
      total,
    )}, soit ${formatCurrency(monthly)} par mois.`;

    const takeaways: Insight[] = [];
    const top = breakdown[0];
    if (top) {
      takeaways.push({
        id: "top-poste",
        icon: top.icon ?? "coins",
        text: `${top.label} est votre premier poste (${Math.round(top.pct)} % du coût total).`,
      });
    }
    takeaways.push({
      id: "cout-km",
      icon: "gauge",
      text: `Chaque kilomètre vous coûte environ ${perKm.toFixed(2).replace(".", ",")} €.`,
    });
    if (a.etat === "neuf") {
      takeaways.push({
        id: "decote-an1",
        icon: "trending-down",
        text: "La première année concentre la plus forte perte de valeur (décote du neuf).",
      });
    } else {
      takeaways.push({
        id: "usage",
        icon: "fuel",
        text: `Les frais d'usage (carburant, assurance, entretien) pèsent ${formatCurrency(
          usageAnnual,
        )} par an.`,
      });
    }

    return {
      headline: { id: "total", label: "Coût total de possession", value: total, format: "currency" },
      metrics: [
        { id: "monthly", label: "Par mois", value: monthly, format: "currency" },
        { id: "annual", label: "Par an", value: annual, format: "currency" },
        { id: "duration", label: "Durée", value: years, format: "duration", unit: "ans" },
      ],
      breakdown,
      series,
      summary,
      takeaways,
    };
  },
};
