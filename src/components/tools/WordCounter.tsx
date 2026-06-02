import React from 'react';
import { useState, useMemo } from 'react';
import { analyzeText } from '../../lib/utils/textUtils';

export default function WordCounter() {
  const [text, setText] = useState('');

  const result = useMemo(() => analyzeText(text), [text]);

  const stats = [
    { label: 'Words', value: result.words, color: 'text-blue-600 bg-blue-50' },
    { label: 'Characters', value: result.characters, color: 'text-green-600 bg-green-50' },
    { label: 'Characters (no spaces)', value: result.charactersNoSpaces, color: 'text-purple-600 bg-purple-50' },
    { label: 'Sentences', value: result.sentences, color: 'text-orange-600 bg-orange-50' },
    { label: 'Paragraphs', value: result.paragraphs, color: 'text-indigo-600 bg-indigo-50' },
    { label: 'Reading Time', value: `${result.readingTime} min`, color: 'text-red-600 bg-red-50' },
  ];

  return (
    <div className="card animate-fadeInUp" style={{ maxWidth: '42rem', margin: '2rem auto' }}>
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-teal-100 text-teal-600">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
        </div>
        <h2 className="text-xl font-bold text-gray-900">Word Counter</h2>
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type or paste your text here..."
        rows={8}
        className="textarea"
      />

      <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-3">
        {stats.map((s) => {
          const [textColor, bgColor] = s.color.split(' ');
          return (
            <div key={s.label} className={`stat-box ${bgColor}`}>
              <div className={`stat-value ${textColor}`}>{typeof s.value === 'number' ? s.value.toLocaleString() : s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}