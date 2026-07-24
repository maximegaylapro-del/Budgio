import type { Calculator } from "@/lib/calculators/types";
import type { CalculationInput, CalculationResult, Insight } from "@/types/calculation";
import { buildBreakdown } from "@/lib/calculators/helpers";
import { formatCurrency } from "@/lib/utils/format";
import { IMMO_ASSUMPTIONS as A, rateForDuration, type ImmoAnswers } from "./assumptions";

function normalize(answers: CalculationInput<ImmoAnswers>["answers"]): ImmoAnswers {
  return {
    revenu: Number(answers.revenu ?? 3500),
    charges: Number(answers.charges ?? 0),
    apport: Number(answers.apport ?? 20000),
    duree: Number(answers.duree ?? 25),
    bien: (answers.bien as ImmoAnswers["bien"]) ?? "ancien",
    endettement: (answers.endettement as ImmoAnswers["endettement"]) ?? "max",
  };
}

/** Facteur d'annuité : mensualité de crédit par euro emprunté. */
function annuityFactor(monthlyRate: number, months: number): number {
  if (monthlyRate === 0) return 1 / months;
  return monthlyRate / (1 - Math.pow(1 + monthlyRate, -months));
}

export const immoCalculator: Calculator<ImmoAnswers> = {
  assumptions: A,

  compute({ answers }: CalculationInput<ImmoAnswers>): CalculationResult {
    const a = normalize(answers);
    const years = Math.max(5, Math.min(a.duree, A.maxDurationYears));
    const months = years * 12;

    const ratio = A.debtRatio[a.endettement] ?? 0.35;
    const rate = rateForDuration(years);
    const monthlyRate = rate / 12;
    const insuranceMonthlyRate = A.insuranceRateAnnual / 12;

    // Mensualité maximale (assurance comprise, règle HCSF).
    const maxPayment = Math.max(0, a.revenu * ratio - a.charges);

    // Capital empruntable : la mensualité couvre crédit + assurance.
    const factor = annuityFactor(monthlyRate, months);
    const loan = maxPayment > 0 ? maxPayment / (factor + insuranceMonthlyRate) : 0;

    const creditPayment = loan * factor;
    const insurancePayment = loan * insuranceMonthlyRate;
    const totalInterest = creditPayment * months - loan;
    const totalInsurance = insurancePayment * months;

    // Budget : emprunt + apport financent le prix du bien + les frais de notaire.
    const notaryRate = A.notaryRate[a.bien] ?? 0.075;
    const propertyPrice = (loan + a.apport) / (1 + notaryRate);
    const notaryFees = propertyPrice * notaryRate;

    // Ce que l'on rembourse réellement : capital + intérêts + assurance.
    const breakdown = buildBreakdown([
      { id: "capital", label: "Capital emprunté", value: loan, icon: "banknote" },
      { id: "interets", label: "Intérêts", value: totalInterest, icon: "percent" },
      { id: "assurance", label: "Assurance emprunteur", value: totalInsurance, icon: "shield-check" },
    ]);

    const summary = `Avec ${formatCurrency(a.revenu)} de revenus mensuels, vous pouvez viser un bien d'environ ${formatCurrency(
      propertyPrice,
    )}, en empruntant ${formatCurrency(loan)} sur ${years} ans.`;

    const takeaways: Insight[] = [
      {
        id: "emprunt",
        icon: "landmark",
        text: `Vous pouvez emprunter environ ${formatCurrency(loan)} à ${(rate * 100)
          .toFixed(2)
          .replace(".", ",")} % sur ${years} ans.`,
      },
      {
        id: "cout-credit",
        icon: "percent",
        text: `Le crédit coûte ${formatCurrency(
          totalInterest + totalInsurance,
        )} en intérêts et assurance, en plus du capital.`,
      },
      {
        id: "notaire",
        icon: "file-text",
        text: `Prévoyez ${formatCurrency(notaryFees)} de frais de notaire (${a.bien === "neuf" ? "neuf" : "ancien"}).`,
      },
    ];

    return {
      headline: { id: "capacite", label: "Capacité d'achat", value: propertyPrice, format: "currency" },
      metrics: [
        { id: "monthly", label: "Mensualité", value: maxPayment, format: "currency" },
        { id: "loan", label: "Montant emprunté", value: loan, format: "currency" },
        { id: "duration", label: "Durée", value: years, format: "duration", unit: "ans" },
      ],
      breakdown,
      summary,
      takeaways,
    };
  },
};
