import React from 'react';
import { useState } from 'react';
import { testRegex } from '../../lib/utils/devUtils';

export default function RegexTester() {
  const [pattern, setPattern] = useState('');
  const [flags, setFlags] = useState('g');
  const [testString, setTestString] = useState('');
  const [result, setResult] = useState<ReturnType<typeof testRegex> | null>(null);

  const handleTest = () => {
    if (!pattern) return;
    setResult(testRegex(pattern, flags, testString));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 max-w-xl mx-auto my-8">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Regex Tester</h2>
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Regular Expression</label>
          <input type="text" value={pattern} onChange={(e) => setPattern(e.target.value)} placeholder="/pattern/flags" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none font-mono text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Flags</label>
          <input type="text" value={flags} onChange={(e) => setFlags(e.target.value)} placeholder="g, i, m, s, u, y" maxLength={6} className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none font-mono text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Test String</label>
          <textarea value={testString} onChange={(e) => setTestString(e.target.value)} placeholder="Enter test string..." rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-y font-mono text-sm" />
        </div>
        <button onClick={handleTest} className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
          Test Regex
        </button>
      </div>
      {result && (
        <div className="mt-4 space-y-2">
          {result.error ? (
            <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm">{result.error}</div>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-600">Matches found:</span>
                <span className="text-lg font-bold text-blue-600">{result.count}</span>
              </div>
              {result.matches.length > 0 && (
                <div className="border rounded-lg overflow-hidden">
                  <div className="max-h-40 overflow-y-auto">
                    {result.matches.map((m, i) => (
                      <div key={i} className="px-3 py-1.5 border-b last:border-b-0 text-sm font-mono bg-gray-50 hover:bg-gray-100">
                        {i + 1}. "{m}"
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {testString && (
                <div className="mt-3">
                  <div className="text-xs text-gray-500 mb-1">Highlighted match:</div>
                  <div className="p-3 bg-gray-50 rounded-lg text-sm leading-relaxed break-all">
                    {(() => {
                      try {
                        const regex = new RegExp(pattern, flags);
                        return testString.replace(regex, (m) => `<mark class="bg-yellow-200 px-0.5">${m}</mark>`);
                      } catch { return testString; }
                    })()}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}