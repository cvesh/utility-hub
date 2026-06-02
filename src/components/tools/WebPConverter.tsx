import React from 'react';
import { useState, useRef } from 'react';

export default function WebPConverter() {
  const [file, setFile] = useState<File | null>(null);
  const [resultUrl, setResultUrl] = useState('');
  const [resultSize, setResultSize] = useState(0);
  const [loading, setLoading] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setResultUrl('');
  };

  const convertToWebP = () => {
    if (!file) return;
    setLoading(true);

    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.drawImage(img, 0, 0);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            setResultUrl(URL.createObjectURL(blob));
            setResultSize(blob.size);
          }
          setLoading(false);
        },
        'image/webp',
        0.8
      );
    };
    img.src = URL.createObjectURL(file);
  };

  const downloadWebP = () => {
    const link = document.createElement('a');
    link.download = `${file?.name?.split('.')[0] || 'image'}.webp`;
    link.href = resultUrl;
    link.click();
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 max-w-xl mx-auto my-8">
      <h2 className="text-xl font-bold text-gray-800 mb-4">WebP Converter</h2>
      <input type="file" accept="image/*" onChange={handleFile} className="w-full mb-3 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
      {file && (
        <div className="text-sm text-gray-500 mb-3">
          File: {file.name} ({(file.size / 1024).toFixed(1)} KB)
        </div>
      )}
      <button onClick={convertToWebP} disabled={!file || loading} className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium mb-3">
        {loading ? 'Converting...' : 'Convert to WebP'}
      </button>
      <canvas ref={canvasRef} className="hidden" />
      {resultUrl && (
        <div className="text-center">
          <img src={resultUrl} alt="WebP preview" className="mx-auto max-h-48 rounded-lg mb-2" />
          <div className="text-sm text-gray-500 mb-2">
            WebP Size: {(resultSize / 1024).toFixed(1)} KB {file && <span>({Math.round((1 - resultSize / file.size) * 100)}% smaller)</span>}
          </div>
          <button onClick={downloadWebP} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
            Download WebP
          </button>
        </div>
      )}
    </div>
  );
}