export interface CompoundResult {
  totalAmount: number;
  totalInterest: number;
  yearlyBreakdown: { year: number; amount: number; interest: number }[];
}

export function calculateCompoundInterest(
  principal: number,
  rate: number,
  years: number,
  compoundPerYear: number = 12
): CompoundResult {
  const r = rate / 100 / compoundPerYear;
  const n = compoundPerYear * years;
  const totalAmount = principal * Math.pow(1 + r, n);
  const totalInterest = totalAmount - principal;

  const yearlyBreakdown: { year: number; amount: number; interest: number }[] = [];
  for (let y = 1; y <= years; y++) {
    const amount = principal * Math.pow(1 + rate / 100 / compoundPerYear, compoundPerYear * y);
    yearlyBreakdown.push({ year: y, amount: Math.round(amount * 100) / 100, interest: Math.round((amount - principal) * 100) / 100 });
  }

  return { totalAmount: Math.round(totalAmount * 100) / 100, totalInterest: Math.round(totalInterest * 100) / 100, yearlyBreakdown };
}