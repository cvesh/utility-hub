import React from 'react';
import { useState } from 'react';

export default function CharacterCounter() {
  const [text, setText] = useState('');

  const chars = text.length;
  const charsNoSpaces = text.replace(/\s/g, '').length;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const lines = text ? text.split('\n').length : 0;

  const stats = [
    { label: 'Total Characters', value: chars, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'No Spaces', value: charsNoSpaces, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Words', value: words, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Lines', value: lines, color: 'text-orange-600', bg: 'bg-orange-50' },
  ];

  return (
    <div className="card animate-fadeInUp" style={{ maxWidth: '42rem', margin: '2rem auto' }}>
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-indigo-100 text-indigo-600">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" x2="15" y1="20" y2="20"/><line x1="12" x2="12" y1="4" y2="20"/></svg>
        </div>
        <h2 className="text-xl font-bold text-gray-900">Character Counter</h2>
      </div>

      <div className="relative">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type or paste your text to count characters..."
          rows={8}
          className="textarea"
        />
        <div className="absolute top-3 right-3 text-xs text-gray-400 font-mono bg-white px-2 py-1 rounded-md border border-gray-100">
          {chars.toLocaleString()} chars
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
        {stats.map((s) => (
          <div key={s.label} className={`stat-box ${s.bg}`}>
            <div className={`stat-value ${s.color}`}>{s.value.toLocaleString()}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {text.length >= 5000 && (
        <div className="mt-3 p-3 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
          Warning: Over 5000 characters
        </div>
      )}
    </div>
  );
}