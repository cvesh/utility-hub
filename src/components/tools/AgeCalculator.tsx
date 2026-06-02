import React from 'react';
import { useState } from 'react';
import { calculateAge } from '../../lib/utils/ageCalculator';

export default function AgeCalculator() {
  const [date, setDate] = useState('');
  const [result, setResult] = useState<ReturnType<typeof calculateAge> | null>(null);

  const handleCalculate = () => {
    if (!date) return;
    const birthDate = new Date(date);
    setResult(calculateAge(birthDate));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 max-w-xl mx-auto my-8">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Age Calculator</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Date of Birth</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>
        <button
          onClick={handleCalculate}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Calculate Age
        </button>
      </div>
      {result && (
        <div className="mt-6 grid grid-cols-2 gap-3">
          <div className="bg-blue-50 p-3 rounded-lg text-center">
            <div className="text-2xl font-bold text-blue-600">{result.years}</div>
            <div className="text-xs text-gray-500">Years</div>
          </div>
          <div className="bg-green-50 p-3 rounded-lg text-center">
            <div className="text-2xl font-bold text-green-600">{result.months}</div>
            <div className="text-xs text-gray-500">Months</div>
          </div>
          <div className="bg-purple-50 p-3 rounded-lg text-center">
            <div className="text-2xl font-bold text-purple-600">{result.days}</div>
            <div className="text-xs text-gray-500">Days</div>
          </div>
          <div className="bg-orange-50 p-3 rounded-lg text-center">
            <div className="text-2xl font-bold text-orange-600">{result.totalDays.toLocaleString()}</div>
            <div className="text-xs text-gray-500">Total Days</div>
          </div>
          <div className="col-span-2 bg-red-50 p-3 rounded-lg text-center">
            <div className="text-lg font-bold text-red-600">Next Birthday in {result.nextBirthdayDays} days</div>
          </div>
        </div>
      )}
    </div>
  );
}