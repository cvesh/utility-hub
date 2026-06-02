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
    setError(v.valid ? 'Valid JSON' : `Invalid: ${v.error}`);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="card animate-fadeInUp" style={{ maxWidth: '42rem', margin: '2rem auto' }}>
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-yellow-100 text-yellow-600">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m8 3 4 8 5-5 5 15H2L8 3z"/></svg>
        </div>
        <h2 className="text-xl font-bold text-gray-900">JSON Formatter</h2>
      </div>

      <div>
        <label className="label">Input JSON</label>
        <textarea
          value={input}
          onChange={(e) => { setInput(e.target.value); setError(''); }}
          placeholder='Paste your JSON here...'
          rows={6}
          className="textarea font-mono text-sm"
        />
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        <button onClick={handleFormat} className="btn btn-primary flex-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7V4h16v3"/><path d="M9 20h6"/><path d="M12 4v16"/></svg>
          Format
        </button>
        <button onClick={handleMinify} className="btn btn-secondary flex-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
          Minify
        </button>
        <button onClick={validate} className="btn btn-success flex-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          Validate
        </button>
      </div>

      {error && (
        <div className={`mt-4 p-3 rounded-xl text-sm font-medium ${error === 'Valid JSON' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
          <div className="flex items-center gap-2">
            {error === 'Valid JSON' ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
            )}
            {error === 'Valid JSON' ? 'Valid JSON' : error}
          </div>
        </div>
      )}

      {output && (
        <div className="mt-4 animate-fadeInUp">
          <div className="flex items-center justify-between mb-2">
            <label className="label" style={{ marginBottom: 0 }}>Output</label>
            <button onClick={copyToClipboard} className={`copy-btn ${copied ? 'copied' : ''}`}>
              {copied ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
              )}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <textarea readOnly value={output} rows={8} className="textarea font-mono text-sm" style={{ background: 'var(--gray-50)', borderColor: 'var(--green-200)' }} />
        </div>
      )}
    </div>
  );
}