import React from 'react';
import { useState } from 'react';
import { convertCase } from '../../lib/utils/textUtils';

const cases = ['upper', 'lower', 'title', 'sentence', 'camel', 'pascal', 'snake', 'kebab'] as const;

export default function CaseConverter() {
  const [text, setText] = useState('');

  const copyToClipboard = (val: string) => navigator.clipboard.writeText(val);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 max-w-xl mx-auto my-8">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Case Converter</h2>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to convert..."
        rows={4}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-y mb-4"
      />
      <div className="space-y-2">
        {cases.map((c) => {
          const converted = text ? convertCase(text, c) : '';
          return (
            <div key={c} className="flex items-center gap-2">
              <span className="w-20 text-sm font-medium text-gray-600 capitalize">{c}</span>
              <div className="flex-1 px-3 py-1.5 bg-gray-50 rounded text-sm font-mono truncate">{converted || '—'}</div>
              {converted && (
                <button onClick={() => copyToClipboard(converted)} className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200">
                  Copy
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}