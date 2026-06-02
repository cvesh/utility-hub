export interface AgeResult {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  nextBirthdayDays: number;
}

export function calculateAge(birthDate: Date): AgeResult {
  const today = new Date();
  const birth = new Date(birthDate);

  let years = today.getFullYear() - birth.getFullYear();
  let months = today.getMonth() - birth.getMonth();
  let days = today.getDate() - birth.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  const totalDays = Math.floor(
    (today.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24)
  );

  const nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
  // Compare only dates (not time) by normalizing today to midnight
  const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  if (nextBirthday < todayMidnight) {
    nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
  }
  const nextBirthdayDays = Math.round(
    (nextBirthday.getTime() - todayMidnight.getTime()) / (1000 * 60 * 60 * 24)
  );

  return { years, months, days, totalDays, nextBirthdayDays };
}