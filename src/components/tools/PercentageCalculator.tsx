import React from 'react';
import { useState } from 'react';
import { calculatePercentageOf, calculateWhatPercent, calculatePercentageChange } from '../../lib/utils/percentageCalculator';

type Mode = 'of' | 'what-percent' | 'change';

export default function PercentageCalculator() {
  const [mode, setMode] = useState<Mode>('of');
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [result, setResult] = useState<string>('');

  const handleCalculate = () => {
    const v1 = parseFloat(value1);
    const v2 = parseFloat(value2);
    if (isNaN(v1) || isNaN(v2)) return;

    switch (mode) {
      case 'of': {
        const r = calculatePercentageOf(v1, v2);
        setResult(`${v1}% of ${v2} = ${r.value}`);
        break;
      }
      case 'what-percent': {
        const r = calculateWhatPercent(v1, v2);
        setResult(r.formula);
        break;
      }
      case 'change': {
        const r = calculatePercentageChange(v1, v2);
        setResult(r.formula);
        break;
      }
    }
  };

  const labels: Record<Mode, { v1: string; v2: string }> = {
    of: { v1: 'Percentage (%)', v2: 'Total' },
    'what-percent': { v1: 'Value', v2: 'Total' },
    change: { v1: 'Old Value', v2: 'New Value' },
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 max-w-xl mx-auto my-8">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Percentage Calculator</h2>
      <div className="flex flex-wrap gap-2 mb-4">
        {(['of', 'what-percent', 'change'] as Mode[]).map((m) => (
          <button
            key={m}
            onClick={() => { setMode(m); setResult(''); }}
            className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${mode === m ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            {m === 'of' ? '% of' : m === 'what-percent' ? 'What %' : '% Change'}
          </button>
        ))}
      </div>
      <div className="space-y-3">
        <input
          type="number"
          value={value1}
          onChange={(e) => setValue1(e.target.value)}
          placeholder={labels[mode].v1}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        />
        <input
          type="number"
          value={value2}
          onChange={(e) => setValue2(e.target.value)}
          placeholder={labels[mode].v2}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        />
        <button onClick={handleCalculate} className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
          Calculate
        </button>
      </div>
      {result && (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg text-center">
          <div className="text-xl font-bold text-blue-700">{result}</div>
        </div>
      )}
    </div>
  );
}