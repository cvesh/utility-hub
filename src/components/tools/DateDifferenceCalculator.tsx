import React from 'react';
import { useState } from 'react';
import { calculateDateDiff } from '../../lib/utils/dateDifference';

export default function DateDifferenceCalculator() {
  const [date1, setDate1] = useState('');
  const [date2, setDate2] = useState('');
  const [result, setResult] = useState<ReturnType<typeof calculateDateDiff> | null>(null);

  const handleCalculate = () => {
    if (!date1 || !date2) return;
    setResult(calculateDateDiff(new Date(date1), new Date(date2)));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 max-w-xl mx-auto my-8">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Date Difference Calculator</h2>
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Start Date</label>
          <input type="date" value={date1} onChange={(e) => setDate1(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">End Date</label>
          <input type="date" value={date2} onChange={(e) => setDate2(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
        </div>
        <button onClick={handleCalculate} className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
          Calculate Difference
        </button>
      </div>
      {result && (
        <div className="mt-6 grid grid-cols-2 gap-3">
          <div className="bg-blue-50 p-3 rounded-lg text-center">
            <div className="text-2xl font-bold text-blue-600">{result.totalDays.toLocaleString()}</div>
            <div className="text-xs text-gray-500">Total Days</div>
          </div>
          <div className="bg-green-50 p-3 rounded-lg text-center">
            <div className="text-2xl font-bold text-green-600">{result.totalWeeks}</div>
            <div className="text-xs text-gray-500">Weeks</div>
          </div>
          <div className="bg-purple-50 p-3 rounded-lg text-center">
            <div className="text-2xl font-bold text-purple-600">{result.totalMonths}</div>
            <div className="text-xs text-gray-500">Months</div>
          </div>
          <div className="bg-orange-50 p-3 rounded-lg text-center">
            <div className="text-2xl font-bold text-orange-600">{result.totalYears}</div>
            <div className="text-xs text-gray-500">Years</div>
          </div>
          <div className="bg-indigo-50 p-3 rounded-lg text-center">
            <div className="text-lg font-bold text-indigo-600">{result.weekdays} Weekdays</div>
          </div>
          <div className="bg-red-50 p-3 rounded-lg text-center">
            <div className="text-lg font-bold text-red-600">{result.weekends} Weekends</div>
          </div>
        </div>
      )}
    </div>
  );
}