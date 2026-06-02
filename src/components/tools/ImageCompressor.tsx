import React from 'react';
import { useState, useRef } from 'react';

export default function ImageCompressor() {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedUrl, setCompressedUrl] = useState('');
  const [compressedSize, setCompressedSize] = useState(0);
  const [quality, setQuality] = useState(70);
  const [loading, setLoading] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setOriginalFile(file);
    setOriginalSize(file.size);
    setCompressedUrl('');
  };

  const compressImage = () => {
    if (!originalFile) return;
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
            setCompressedUrl(URL.createObjectURL(blob));
            setCompressedSize(blob.size);
          }
          setLoading(false);
        },
        'image/jpeg',
        quality / 100
      );
    };
    img.src = URL.createObjectURL(originalFile);
  };

  const downloadCompressed = () => {
    const link = document.createElement('a');
    link.download = `compressed-${originalFile?.name || 'image'}.jpg`;
    link.href = compressedUrl;
    link.click();
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 max-w-xl mx-auto my-8">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Image Compressor</h2>
      <input type="file" accept="image/*" onChange={handleFile} className="w-full mb-3 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
      {originalFile && (
        <div className="text-sm text-gray-500 mb-3">
          Original: {(originalSize / 1024).toFixed(1)} KB
        </div>
      )}
      <div className="flex items-center gap-3 mb-3">
        <label className="text-sm font-medium text-gray-600">Quality: {quality}%</label>
        <input type="range" min={10} max={100} value={quality} onChange={(e) => setQuality(parseInt(e.target.value))} className="flex-1" />
      </div>
      <button onClick={compressImage} disabled={!originalFile || loading} className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium mb-3">
        {loading ? 'Compressing...' : 'Compress Image'}
      </button>
      <canvas ref={canvasRef} className="hidden" />
      {compressedUrl && (
        <div className="text-center">
          <img src={compressedUrl} alt="Compressed preview" className="mx-auto max-h-48 rounded-lg mb-2" />
          <div className="text-sm text-gray-500 mb-2">
            Compressed: {(compressedSize / 1024).toFixed(1)} KB ({Math.round((1 - compressedSize / originalSize) * 100)}% reduction)
          </div>
          <button onClick={downloadCompressed} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
            Download Compressed
          </button>
        </div>
      )}
    </div>
  );
}