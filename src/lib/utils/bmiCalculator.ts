export interface BMIResult {
  bmi: number;
  category: string;
  healthyRange: string;
  advice: string;
}

export function calculateBMI(weightKg: number, heightCm: number): BMIResult {
  if (heightCm <= 0) {
    return { bmi: 0, category: 'Invalid', healthyRange: 'N/A', advice: 'Please enter a valid height greater than 0.' };
  }
  if (weightKg < 0) {
    return { bmi: 0, category: 'Invalid', healthyRange: 'N/A', advice: 'Please enter a valid weight.' };
  }
  const heightM = heightCm / 100;
  const bmi = Math.round((weightKg / (heightM * heightM)) * 10) / 10;

  let category: string;
  let advice: string;

  if (bmi < 18.5) {
    category = 'Underweight';
    advice = 'You may need to gain some weight. Consult a healthcare provider for guidance.';
  } else if (bmi < 25) {
    category = 'Normal weight';
    advice = 'You have a healthy body weight. Maintain your lifestyle with balanced diet and exercise.';
  } else if (bmi < 30) {
    category = 'Overweight';
    advice = 'Consider adopting a healthier diet and increasing physical activity.';
  } else {
    category = 'Obese';
    advice = 'It is recommended to consult a healthcare provider for personalized weight management.';
  }

  const minHealthyWeight = Math.round(18.5 * heightM * heightM * 10) / 10;
  const maxHealthyWeight = Math.round(24.9 * heightM * heightM * 10) / 10;
  const healthyRange = `${minHealthyWeight} kg - ${maxHealthyWeight} kg`;

  return { bmi, category, healthyRange, advice };
}