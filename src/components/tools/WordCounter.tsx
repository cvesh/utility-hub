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
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 max-w-xl mx-auto my-8">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Word Counter</h2>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type or paste your text here..."
        rows={8}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-y"
      />
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2">
        {stats.map((s) => (
          <div key={s.label} className={`${s.color} p-3 rounded-lg text-center`}>
            <div className="text-lg font-bold">{typeof s.value === 'number' ? s.value.toLocaleString() : s.value}</div>
            <div className="text-xs opacity-75">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}