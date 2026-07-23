/**
 * Briques mathématiques réutilisables par plusieurs simulateurs.
 * Fonctions pures, sans état, testables.
 */

/** Capital après n années d'intérêts composés. */
export function compound(principal: number, annualRate: number, years: number): number {
  return principal * Math.pow(1 + annualRate, years);
}

/** Valeur future d'un versement mensuel régulier (intérêts composés mensuels). */
export function futureValueOfMonthly(monthly: number, annualRate: number, years: number): number {
  const r = annualRate / 12;
  const n = years * 12;
  if (r === 0) return monthly * n;
  return monthly * ((Math.pow(1 + r, n) - 1) / r);
}

/** Mensualité d'un prêt amortissable (formule des annuités constantes). */
export function loanMonthlyPayment(principal: number, annualRate: number, years: number): number {
  const r = annualRate / 12;
  const n = years * 12;
  if (r === 0) return principal / n;
  return (principal * r) / (1 - Math.pow(1 + r, -n));
}

/** Applique une inflation annuelle composée sur un montant. */
export function inflate(amount: number, annualInflation: number, years: number): number {
  return amount * Math.pow(1 + annualInflation, years);
}

/** Contraint une valeur dans un intervalle. */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** Somme d'un tableau. */
export function sum(values: number[]): number {
  return values.reduce((acc, v) => acc + v, 0);
}
