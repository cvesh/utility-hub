import React from 'react';
import { useState } from 'react';
import { removeExtraSpaces } from '../../lib/utils/textUtils';

export default function RemoveExtraSpaces() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleRemove = () => {
    setOutput(removeExtraSpaces(input));
  };

  const copyToClipboard = () => navigator.clipboard.writeText(output);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 max-w-xl mx-auto my-8">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Remove Extra Spaces</h2>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Paste text with extra spaces..."
        rows={6}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-y mb-3"
      />
      <button onClick={handleRemove} className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium mb-3">
        Clean Text
      </button>
      {output && (
        <div className="relative">
          <textarea
            readOnly
            value={output}
            rows={6}
            className="w-full px-3 py-2 border border-green-300 rounded-lg bg-green-50 outline-none resize-y"
          />
          <button onClick={copyToClipboard} className="absolute top-2 right-2 px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700">
            Copy
          </button>
        </div>
      )}
      {input && output && (
        <div className="mt-2 text-sm text-gray-500">
          Removed {input.length - output.length} characters
        </div>
      )}
    </div>
  );
}