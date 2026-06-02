import React from 'react';
import { useState } from 'react';
import { formatJSON, minifyJSON, validateJSON } from '../../lib/utils/devUtils';

export default function JSONFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleFormat = () => {
    try {
      setOutput(formatJSON(input));
      setError('');
    } catch (e) {
      setError((e as Error).message);
      setOutput('');
    }
  };

  const handleMinify = () => {
    try {
      setOutput(minifyJSON(input));
      setError('');
    } catch (e) {
      setError((e as Error).message);
      setOutput('');
    }
  };

  const validate = () => {
    const v = validateJSON(input);
    setError(v.valid ? 'Valid JSON ✓' : `Invalid: ${v.error}`);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 max-w-xl mx-auto my-8">
      <h2 className="text-xl font-bold text-gray-800 mb-4">JSON Formatter</h2>
      <textarea
        value={input}
        onChange={(e) => { setInput(e.target.value); setError(''); }}
        placeholder="Paste your JSON here..."
        rows={6}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-y font-mono text-sm mb-3"
      />
      <div className="flex flex-wrap gap-2 mb-3">
        <button onClick={handleFormat} className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
          Format
        </button>
        <button onClick={handleMinify} className="flex-1 bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium">
          Minify
        </button>
        <button onClick={validate} className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
          Validate
        </button>
      </div>
      {error && (
        <div className={`p-2 rounded-lg text-sm mb-3 ${error.includes('Valid') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          {error}
        </div>
      )}
      {output && (
        <div className="relative">
          <textarea readOnly value={output} rows={6} className="w-full px-3 py-2 border border-green-300 rounded-lg bg-green-50 outline-none resize-y font-mono text-sm" />
          <button onClick={copyToClipboard} className="absolute top-2 right-2 px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700">
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      )}
    </div>
  );
}