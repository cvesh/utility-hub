import React from 'react';
import { useState } from 'react';
import { calculateBMI } from '../../lib/utils/bmiCalculator';

export default function BMICalculator() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [result, setResult] = useState<ReturnType<typeof calculateBMI> | null>(null);

  const handleCalculate = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    if (isNaN(w) || isNaN(h)) return;
    setResult(calculateBMI(w, h));
  };

  const categoryColor = (cat: string) => {
    if (cat.includes('Under')) return 'text-blue-600 bg-blue-50';
    if (cat.includes('Normal')) return 'text-green-600 bg-green-50';
    if (cat.includes('Over')) return 'text-orange-600 bg-orange-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 max-w-xl mx-auto my-8">
      <h2 className="text-xl font-bold text-gray-800 mb-4">BMI Calculator</h2>
      <div className="space-y-3">
        <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="Weight (kg)" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
        <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="Height (cm)" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
        <button onClick={handleCalculate} className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">Calculate BMI</button>
      </div>
      {result && (
        <div className="mt-6 space-y-3">
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-800">{result.bmi}</div>
            <div className="text-sm text-gray-500">Your BMI</div>
          </div>
          <div className={`text-center p-3 rounded-lg font-semibold ${categoryColor(result.category)}`}>
            {result.category}
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="text-sm text-gray-500">Healthy Weight Range</div>
            <div className="font-semibold text-gray-700">{result.healthyRange}</div>
          </div>
          <div className="bg-blue-50 p-3 rounded-lg text-sm text-blue-800">
            {result.advice}
          </div>
          {/* BMI Scale */}
          <div className="h-3 rounded-full overflow-hidden flex mt-4">
            <div className="bg-blue-400 flex-1" title="Underweight" />
            <div className="bg-green-400 flex-[2]" title="Normal" />
            <div className="bg-orange-400 flex-[1.5]" title="Overweight" />
            <div className="bg-red-400 flex-[1.5]" title="Obese" />
          </div>
          <div className="flex justify-between text-xs text-gray-400">
            <span>16</span><span>18.5</span><span>25</span><span>30</span><span>40</span>
          </div>
        </div>
      )}
    </div>
  );
}