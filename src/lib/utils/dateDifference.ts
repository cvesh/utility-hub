export interface DateDiffResult {
  totalDays: number;
  totalWeeks: number;
  totalMonths: number;
  totalYears: number;
  weekdays: number;
  weekends: number;
}

export function calculateDateDiff(date1: Date, date2: Date): DateDiffResult {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffMs = Math.abs(d2.getTime() - d1.getTime());

  const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const totalWeeks = Math.round(totalDays / 7 * 10) / 10;
  const totalMonths = Math.round((totalDays / 30.44) * 10) / 10;
  const totalYears = Math.round((totalDays / 365.25) * 10) / 10;

  let weekdays = 0;
  let weekends = 0;
  const start = new Date(Math.min(d1.getTime(), d2.getTime()));
  const end = new Date(Math.max(d1.getTime(), d2.getTime()));

  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const day = d.getDay();
    if (day === 0 || day === 6) weekends++;
    else weekdays++;
  }

  return { totalDays, totalWeeks, totalMonths, totalYears, weekdays, weekends };
}