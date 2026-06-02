import React from 'react';
import { useState } from 'react';
import { generateUUIDs } from '../../lib/utils/devUtils';

export default function UUIDGenerator() {
  const [count, setCount] = useState(5);
  const [uuids, setUuids] = useState<string[]>([]);

  const handleGenerate = () => setUuids(generateUUIDs(count));

  const copyToClipboard = (val: string) => navigator.clipboard.writeText(val);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 max-w-xl mx-auto my-8">
      <h2 className="text-xl font-bold text-gray-800 mb-4">UUID Generator</h2>
      <div className="flex gap-2 mb-4">
        <input type="number" min={1} max={100} value={count} onChange={(e) => setCount(Math.min(100, Math.max(1, parseInt(e.target.value) || 1)))} className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
        <button onClick={handleGenerate} className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
          Generate {count} UUID{count > 1 ? 's' : ''}
        </button>
      </div>
      {uuids.length > 0 && (
        <div className="space-y-1">
          {uuids.map((uuid, i) => (
            <div key={i} className="flex items-center gap-2">
              <code className="flex-1 px-3 py-1.5 bg-gray-50 rounded text-sm font-mono truncate">{uuid}</code>
              <button onClick={() => copyToClipboard(uuid)} className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 shrink-0">
                Copy
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}