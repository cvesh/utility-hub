import React from 'react';
import { useState } from 'react';

export default function CharacterCounter() {
  const [text, setText] = useState('');

  const chars = text.length;
  const charsNoSpaces = text.replace(/\s/g, '').length;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const lines = text ? text.split('\n').length : 0;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 max-w-xl mx-auto my-8">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Character Counter</h2>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type or paste your text to count characters..."
        rows={8}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-y"
      />
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
        <div className="bg-blue-50 p-3 rounded-lg text-center">
          <div className="text-lg font-bold text-blue-600">{chars.toLocaleString()}</div>
          <div className="text-xs text-gray-500">Total Characters</div>
        </div>
        <div className="bg-green-50 p-3 rounded-lg text-center">
          <div className="text-lg font-bold text-green-600">{charsNoSpaces.toLocaleString()}</div>
          <div className="text-xs text-gray-500">No Spaces</div>
        </div>
        <div className="bg-purple-50 p-3 rounded-lg text-center">
          <div className="text-lg font-bold text-purple-600">{words.toLocaleString()}</div>
          <div className="text-xs text-gray-500">Words</div>
        </div>
        <div className="bg-orange-50 p-3 rounded-lg text-center">
          <div className="text-lg font-bold text-orange-600">{lines.toLocaleString()}</div>
          <div className="text-xs text-gray-500">Lines</div>
        </div>
      </div>
      {text.length > 0 && (
        <div className="mt-2 text-xs text-gray-400 text-right">
          {text.length >= 5000 && <span className="text-red-500">Warning: Over 5000 characters</span>}
        </div>
      )}
    </div>
  );
}