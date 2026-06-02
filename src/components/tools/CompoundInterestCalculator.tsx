import React from 'react';
import { useState } from 'react';
import { calculateCompoundInterest } from '../../lib/utils/compoundInterest';

export default function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState('10000');
  const [rate, setRate] = useState('7');
  const [years, setYears] = useState('10');
  const [frequency, setFrequency] = useState(12);
  const [result, setResult] = useState<ReturnType<typeof calculateCompoundInterest> | null>(null);

  const handleCalculate = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate);
    const y = parseInt(years);
    if (isNaN(p) || isNaN(r) || isNaN(y)) return;
    setResult(calculateCompoundInterest(p, r, y, frequency));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 max-w-xl mx-auto my-8">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Compound Interest Calculator</h2>
      <div className="space-y-3">
        <input type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)} placeholder="Principal Amount" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
        <input type="number" value={rate} onChange={(e) => setRate(e.target.value)} placeholder="Annual Interest Rate (%)" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
        <input type="number" value={years} onChange={(e) => setYears(e.target.value)} placeholder="Time Period (Years)" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
        <select value={frequency} onChange={(e) => setFrequency(parseInt(e.target.value))} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
          <option value={1}>Annually</option>
          <option value={2}>Semi-annually</option>
          <option value={4}>Quarterly</option>
          <option value={12}>Monthly</option>
          <option value={365}>Daily</option>
        </select>
        <button onClick={handleCalculate} className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">Calculate</button>
      </div>
      {result && (
        <div className="mt-6">
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-green-50 p-3 rounded-lg text-center">
              <div className="text-xl font-bold text-green-600">${result.totalAmount.toLocaleString()}</div>
              <div className="text-xs text-gray-500">Total Amount</div>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg text-center">
              <div className="text-xl font-bold text-blue-600">${result.totalInterest.toLocaleString()}</div>
              <div className="text-xs text-gray-500">Total Interest</div>
            </div>
          </div>
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr><th className="px-3 py-2 text-left">Year</th><th className="px-3 py-2 text-right">Amount</th><th className="px-3 py-2 text-right">Interest</th></tr>
              </thead>
              <tbody>
                {result.yearlyBreakdown.map((y) => (
                  <tr key={y.year} className="border-t"><td className="px-3 py-2">{y.year}</td><td className="px-3 py-2 text-right">${y.amount.toLocaleString()}</td><td className="px-3 py-2 text-right">${y.interest.toLocaleString()}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}