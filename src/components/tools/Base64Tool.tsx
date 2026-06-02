import React from 'react';
import { useState } from 'react';
import { base64Encode, base64Decode } from '../../lib/utils/devUtils';

export default function Base64Tool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isEncoding, setIsEncoding] = useState(true);
  const [error, setError] = useState('');

  const handleConvert = () => {
    if (!input) { setOutput(''); return; }
    try {
      setOutput(isEncoding ? base64Encode(input) : base64Decode(input));
      setError('');
    } catch (e) {
      setError('Invalid input for decoding');
      setOutput('');
    }
  };

  const copyToClipboard = () => navigator.clipboard.writeText(output);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 max-w-xl mx-auto my-8">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Base64 Encoder / Decoder</h2>
      <div className="flex gap-2 mb-4">
        <button onClick={() => { setIsEncoding(true); setOutput(''); setError(''); }} className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${isEncoding ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}>Encode</button>
        <button onClick={() => { setIsEncoding(false); setOutput(''); setError(''); }} className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${!isEncoding ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}>Decode</button>
      </div>
      <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder={isEncoding ? 'Enter text to encode...' : 'Enter Base64 to decode...'} rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-y font-mono text-sm mb-3" />
      <button onClick={handleConvert} className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium mb-3">
        {isEncoding ? 'Encode to Base64' : 'Decode from Base64'}
      </button>
      {error && <div className="p-2 bg-red-50 text-red-700 rounded-lg text-sm mb-3">{error}</div>}
      {output && (
        <div className="relative">
          <textarea readOnly value={output} rows={3} className="w-full px-3 py-2 border border-green-300 rounded-lg bg-green-50 outline-none resize-y font-mono text-sm" />
          <button onClick={copyToClipboard} className="absolute top-2 right-2 px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700">Copy</button>
        </div>
      )}
    </div>
  );
}