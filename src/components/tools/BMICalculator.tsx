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
    <div className="card animate-fadeInUp" style={{ maxWidth: '36rem', margin: '2rem auto' }}>
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-red-100 text-red-600">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z"/><line x1="6" x2="18" y1="17" y2="17"/></svg>
        </div>
        <h2 className="text-xl font-bold text-gray-900">BMI Calculator</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="label">Weight (kg)</label>
          <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="Enter your weight" className="input" />
        </div>
        <div>
          <label className="label">Height (cm)</label>
          <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="Enter your height" className="input" />
        </div>
        <button onClick={handleCalculate} className="btn btn-primary w-full">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z"/></svg>
          Calculate BMI
        </button>
      </div>

      {result && (
        <div className="mt-6 animate-fadeInUp">
          <div className="divider"></div>
          <div className="text-center mb-4">
            <div className="text-5xl font-bold text-gray-900">{result.bmi}</div>
            <div className="text-sm text-gray-500 mt-1">Your BMI</div>
          </div>
          <div className={`stat-box text-center mb-4 ${categoryColor(result.category)}`}>
            <div className="stat-value">{result.category}</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl mb-3">
            <div className="text-sm text-gray-500">Healthy Weight Range</div>
            <div className="font-semibold text-gray-700">{result.healthyRange}</div>
          </div>
          <div className="p-4 bg-blue-50 rounded-xl text-sm text-blue-800">
            {result.advice}
          </div>
          {/* BMI Scale */}
          <div className="mt-4">
            <div className="h-3 rounded-full overflow-hidden flex">
              <div className="bg-blue-400 flex-1" title="Underweight" />
              <div className="bg-green-400 flex-[2]" title="Normal" />
              <div className="bg-orange-400 flex-[1.5]" title="Overweight" />
              <div className="bg-red-400 flex-[1.5]" title="Obese" />
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>16</span><span>18.5</span><span>25</span><span>30</span><span>40</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}