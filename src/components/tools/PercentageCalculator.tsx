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
    <div className="card animate-fadeInUp" style={{ maxWidth: '36rem', margin: '2rem auto' }}>
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-green-100 text-green-600">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" x2="5" y1="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>
        </div>
        <h2 className="text-xl font-bold text-gray-900">Percentage Calculator</h2>
      </div>

      <div className="flex flex-wrap gap-2 mb-5">
        {(['of', 'what-percent', 'change'] as Mode[]).map((m) => (
          <button
            key={m}
            onClick={() => { setMode(m); setResult(''); }}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${mode === m ? 'bg-green-600 text-white shadow-sm' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            {m === 'of' ? '% of' : m === 'what-percent' ? 'What %' : '% Change'}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        <div>
          <label className="label">{labels[mode].v1}</label>
          <input
            type="number"
            value={value1}
            onChange={(e) => setValue1(e.target.value)}
            placeholder={`Enter ${labels[mode].v1.toLowerCase()}`}
            className="input"
          />
        </div>
        <div>
          <label className="label">{labels[mode].v2}</label>
          <input
            type="number"
            value={value2}
            onChange={(e) => setValue2(e.target.value)}
            placeholder={`Enter ${labels[mode].v2.toLowerCase()}`}
            className="input"
          />
        </div>
        <button onClick={handleCalculate} className="btn btn-success w-full">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" x2="5" y1="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>
          Calculate
        </button>
      </div>

      {result && (
        <div className="mt-6 animate-fadeInUp">
          <div className="divider"></div>
          <div className="stat-box bg-green-50">
            <div className="stat-value text-green-600">{result}</div>
          </div>
        </div>
      )}
    </div>
  );
}