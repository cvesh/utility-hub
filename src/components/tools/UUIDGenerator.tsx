import React from 'react';
import { useState } from 'react';
import { generateUUIDs } from '../../lib/utils/devUtils';

export default function UUIDGenerator() {
  const [count, setCount] = useState(5);
  const [uuids, setUuids] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleGenerate = () => setUuids(generateUUIDs(count));

  const copyToClipboard = (val: string, index: number) => {
    navigator.clipboard.writeText(val);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  return (
    <div className="card animate-fadeInUp" style={{ maxWidth: '42rem', margin: '2rem auto' }}>
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-purple-100 text-purple-600">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>
        </div>
        <h2 className="text-xl font-bold text-gray-900">UUID Generator</h2>
      </div>

      <div className="flex gap-3 mb-5">
        <div>
          <label className="label">Count</label>
          <input
            type="number"
            min={1}
            max={100}
            value={count}
            onChange={(e) => setCount(Math.min(100, Math.max(1, parseInt(e.target.value) || 1)))}
            className="input"
            style={{ width: '5rem' }}
          />
        </div>
        <div className="flex-1 flex items-end">
          <button onClick={handleGenerate} className="btn btn-primary w-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>
            Generate {count} UUID{count > 1 ? 's' : ''}
          </button>
        </div>
      </div>

      {uuids.length > 0 && (
        <div className="space-y-2 animate-fadeInUp">
          {uuids.map((uuid, i) => (
            <div key={i} className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors group">
              <code className="flex-1 px-3 py-2 bg-gray-50 rounded-lg text-sm font-mono truncate border border-gray-100 group-hover:border-gray-200 transition-colors">{uuid}</code>
              <button
                onClick={() => copyToClipboard(uuid, i)}
                className={`copy-btn shrink-0 ${copiedIndex === i ? 'copied' : ''}`}
              >
                {copiedIndex === i ? 'Copied!' : 'Copy'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}