import React from 'react';
import { useState } from 'react';
import { decodeJWT } from '../../lib/utils/devUtils';

export default function JWTDecoder() {
  const [token, setToken] = useState('');
  const [result, setResult] = useState<ReturnType<typeof decodeJWT> | null>(null);
  const [error, setError] = useState('');

  const handleDecode = () => {
    try {
      setResult(decodeJWT(token));
      setError('');
    } catch (e) {
      setError((e as Error).message);
      setResult(null);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 max-w-xl mx-auto my-8">
      <h2 className="text-xl font-bold text-gray-800 mb-4">JWT Decoder</h2>
      <textarea
        value={token}
        onChange={(e) => setToken(e.target.value)}
        placeholder="Paste your JWT token here..."
        rows={3}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none font-mono text-sm mb-3"
      />
      <button onClick={handleDecode} className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium mb-3">
        Decode Token
      </button>
      {error && <div className="p-2 bg-red-50 text-red-700 rounded-lg text-sm mb-3">{error}</div>}
      {result && (
        <div className="space-y-3">
          <div>
            <h3 className="text-sm font-semibold text-gray-600 mb-1">Header</h3>
            <pre className="bg-gray-50 p-3 rounded-lg text-xs font-mono overflow-x-auto">{JSON.stringify(result.header, null, 2)}</pre>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-600 mb-1">Payload</h3>
            <pre className="bg-gray-50 p-3 rounded-lg text-xs font-mono overflow-x-auto">{JSON.stringify(result.payload, null, 2)}</pre>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-600 mb-1">Signature</h3>
            <div className="bg-gray-50 p-3 rounded-lg text-xs font-mono break-all">{result.signature}</div>
          </div>
        </div>
      )}
    </div>
  );
}