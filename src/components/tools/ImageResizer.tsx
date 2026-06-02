import React from 'react';
import { useState, useRef, useEffect } from 'react';

export default function ImageResizer() {
  const [file, setFile] = useState<File | null>(null);
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);
  const [maintainRatio, setMaintainRatio] = useState(true);
  const [aspectRatio, setAspectRatio] = useState(1);
  const [resultUrl, setResultUrl] = useState('');
  const [resultSize, setResultSize] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const previewUrlRef = useRef<string>('');

  useEffect(() => {
    return () => {
      if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
      if (resultUrl) URL.revokeObjectURL(resultUrl);
    };
  }, [resultUrl]);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);

    const img = new Image();
    img.onload = () => {
      setWidth(img.width);
      setHeight(img.height);
      setAspectRatio(img.width / img.height);
      if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
    };
    previewUrlRef.current = URL.createObjectURL(f);
    img.src = previewUrlRef.current;
  };

  const handleWidthChange = (w: number) => {
    setWidth(w);
    if (maintainRatio) setHeight(Math.round(w / aspectRatio));
  };

  const handleHeightChange = (h: number) => {
    setHeight(h);
    if (maintainRatio) setWidth(Math.round(h * aspectRatio));
  };

  const resizeImage = () => {
    if (!file) return;
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob((blob) => {
        if (blob) {
          if (resultUrl) URL.revokeObjectURL(resultUrl);
          setResultUrl(URL.createObjectURL(blob));
          setResultSize(blob.size);
        }
      }, 'image/png');
      URL.revokeObjectURL(url);
    };
    img.src = url;
  };

  const downloadResized = () => {
    const link = document.createElement('a');
    link.download = `resized-${width}x${height}.png`;
    link.href = resultUrl;
    link.click();
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 max-w-xl mx-auto my-8">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Image Resizer</h2>
      <input type="file" accept="image/*" onChange={handleFile} className="w-full mb-3 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
      {file && (
        <div className="space-y-3 mb-3">
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block text-xs text-gray-500">Width (px)</label>
              <input type="number" value={width} onChange={(e) => handleWidthChange(parseInt(e.target.value) || 1)} min={1} className="w-full px-2 py-1.5 border border-gray-300 rounded-lg text-sm" />
            </div>
            <div className="flex-1">
              <label className="block text-xs text-gray-500">Height (px)</label>
              <input type="number" value={height} onChange={(e) => handleHeightChange(parseInt(e.target.value) || 1)} min={1} className="w-full px-2 py-1.5 border border-gray-300 rounded-lg text-sm" />
            </div>
          </div>
          <label className="flex items-center gap-2 text-sm text-gray-600">
            <input type="checkbox" checked={maintainRatio} onChange={(e) => setMaintainRatio(e.target.checked)} className="rounded" />
            Maintain aspect ratio
          </label>
          <button onClick={resizeImage} className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
            Resize Image
          </button>
        </div>
      )}
      <canvas ref={canvasRef} className="hidden" />
      {resultUrl && (
        <div className="text-center">
          <img src={resultUrl} alt="Resized preview" className="mx-auto max-h-48 rounded-lg mb-2" />
          <div className="text-sm text-gray-500 mb-2">Size: {(resultSize / 1024).toFixed(1)} KB</div>
          <button onClick={downloadResized} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
            Download Resized
          </button>
        </div>
      )}
    </div>
  );
}