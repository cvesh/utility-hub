import React from 'react';
import { useState } from 'react';
import { convertCase } from '../../lib/utils/textUtils';

const cases = ['upper', 'lower', 'title', 'sentence', 'camel', 'pascal', 'snake', 'kebab'] as const;

export default function CaseConverter() {
  const [text, setText] = useState('');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = (val: string, index: number) => {
    navigator.clipboard.writeText(val);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  return (
    <div className="card animate-fadeInUp" style={{ maxWidth: '42rem', margin: '2rem auto' }}>
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-pink-100 text-pink-600">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 15 4-8 4 8"/><path d="M4 13h6"/><circle cx="18" cy="12" r="3"/><path d="M15 19v-6"/></svg>
        </div>
        <h2 className="text-xl font-bold text-gray-900">Case Converter</h2>
      </div>

      <div>
        <label className="label">Enter Text</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to convert..."
          rows={4}
          className="textarea"
        />
      </div>

      <div className="mt-5 space-y-2">
        {cases.map((c, index) => {
          const converted = text ? convertCase(text, c) : '';
          return (
            <div key={c} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group">
              <span className="w-20 text-sm font-semibold text-gray-500 uppercase tracking-wide shrink-0">{c}</span>
              <div className="flex-1 px-3 py-2 bg-gray-50 rounded-lg text-sm font-mono truncate border border-gray-100 group-hover:border-gray-200 transition-colors">{converted || '—'}</div>
              {converted && (
                <button
                  onClick={() => copyToClipboard(converted, index)}
                  className={`copy-btn shrink-0 ${copiedIndex === index ? 'copied' : ''}`}
                >
                  {copiedIndex === index ? 'Copied!' : 'Copy'}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}