export interface PercentageResult {
  value: number;
  formula: string;
}

export function calculatePercentageOf(percentage: number, total: number): PercentageResult {
  const value = (percentage / 100) * total;
  return { value, formula: `${percentage}% of ${total} = ${value}` };
}

export function calculateWhatPercent(is_: number, of_: number): PercentageResult {
  const value = (is_ / of_) * 100;
  return { value: Math.round(value * 100) / 100, formula: `${is_} is ${Math.round(value * 100) / 100}% of ${of_}` };
}

export function calculatePercentageChange(oldValue: number, newValue: number): PercentageResult {
  const value = ((newValue - oldValue) / Math.abs(oldValue)) * 100;
  return { value: Math.round(value * 100) / 100, formula: `Change from ${oldValue} to ${newValue} = ${Math.round(value * 100) / 100}%` };
}