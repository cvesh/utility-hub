import React from 'react';
import { useState } from 'react';
import { formatTimestamp } from '../../lib/utils/devUtils';

export default function TimestampConverter() {
  const [timestamp, setTimestamp] = useState('');
  const [unit, setUnit] = useState<'seconds' | 'milliseconds'>('seconds');
  const [date, setDate] = useState('');
  const [converted, setConverted] = useState('');
  const [error, setError] = useState('');

  const handleTimestampToDate = () => {
    const ts = parseInt(timestamp);
    if (isNaN(ts)) { setError('Invalid timestamp'); return; }
    setError('');
    setConverted(formatTimestamp(ts, unit));
    setDate(new Date(unit === 'seconds' ? ts * 1000 : ts).toISOString().split('T')[0]);
  };

  const handleDateToTimestamp = () => {
    if (!date) { setError('Select a date'); return; }
    setError('');
    const ts = Math.floor(new Date(date).getTime() / 1000);
    setTimestamp(ts.toString());
    setConverted(ts.toString());
  };

  const copyToClipboard = () => navigator.clipboard.writeText(converted);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 max-w-xl mx-auto my-8">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Timestamp Converter</h2>

      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-600 mb-2">Timestamp to Date</h3>
        <div className="flex gap-2 mb-2">
          <input type="number" value={timestamp} onChange={(e) => setTimestamp(e.target.value)} placeholder="Enter timestamp..." className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
          <select value={unit} onChange={(e) => setUnit(e.target.value as 'seconds' | 'milliseconds')} className="w-28 px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm">
            <option value="seconds">Seconds</option>
            <option value="milliseconds">Milliseconds</option>
          </select>
        </div>
        <button onClick={handleTimestampToDate} className="w-full bg-blue-600 text-white py-1.5 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
          Convert to Date
        </button>
      </div>

      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-600 mb-2">Date to Timestamp</h3>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none mb-2" />
        <button onClick={handleDateToTimestamp} className="w-full bg-green-600 text-white py-1.5 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
          Convert to Timestamp
        </button>
      </div>

      {error && <div className="p-2 bg-red-50 text-red-700 rounded-lg text-sm mb-3">{error}</div>}
      {converted && (
        <div className="bg-green-50 p-3 rounded-lg flex items-center justify-between">
          <div>
            <div className="text-xs text-gray-500">Result</div>
            <div className="font-mono text-sm font-bold text-green-700">{converted}</div>
          </div>
          <button onClick={copyToClipboard} className="px-2 py-1 text-xs bg-green-200 text-green-800 rounded hover:bg-green-300">Copy</button>
        </div>
      )}
    </div>
  );
}