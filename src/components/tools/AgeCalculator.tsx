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
    <div className="card animate-fadeInUp" style={{ maxWidth: '36rem', margin: '2rem auto' }}>
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-100 text-blue-600">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>
        </div>
        <h2 className="text-xl font-bold text-gray-900">Calculate Your Age</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="label">Date of Birth</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="input"
          />
        </div>
        <button
          onClick={handleCalculate}
          className="btn btn-primary w-full"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/><line x1="16" x2="16" y1="14" y2="18"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/><path d="M12 14h.01"/><path d="M8 14h.01"/><path d="M12 18h.01"/><path d="M8 18h.01"/></svg>
          Calculate Age
        </button>
      </div>

      {result && (
        <div className="mt-6 animate-fadeInUp">
          <div className="divider"></div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Your Age</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="stat-box bg-blue-50">
              <div className="stat-value text-blue-600">{result.years}</div>
              <div className="stat-label">Years</div>
            </div>
            <div className="stat-box bg-green-50">
              <div className="stat-value text-green-600">{result.months}</div>
              <div className="stat-label">Months</div>
            </div>
            <div className="stat-box bg-purple-50">
              <div className="stat-value text-purple-600">{result.days}</div>
              <div className="stat-label">Days</div>
            </div>
            <div className="stat-box bg-orange-50">
              <div className="stat-value text-orange-600">{result.totalDays.toLocaleString()}</div>
              <div className="stat-label">Total Days</div>
            </div>
          </div>
          <div className="mt-3 p-4 bg-red-50 rounded-xl text-center animate-fadeInUp">
            <div className="flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>
              <span className="text-lg font-bold text-red-600">Next Birthday in {result.nextBirthdayDays} days</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}