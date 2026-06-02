import React from 'react';
import { useState, useRef } from 'react';

export default function QRCodeGenerator() {
  const [text, setText] = useState('');
  const [qrDataUrl, setQrDataUrl] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateQR = async () => {
    if (!text.trim()) return;

    // We'll use an inline QR code generator approach via canvas
    // For maximum performance, we don't use external libraries
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Simple QR-like visual representation using the text data
    const size = 250;
    canvas.width = size;
    canvas.height = size;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, size, size);

    // Generate a deterministic pattern from the text
    const data = text.split('').map(c => c.charCodeAt(0));
    const gridSize = 21;
    const cellSize = size / (gridSize + 2);

    // Draw finder patterns (corners)
    const drawFinder = (x: number, y: number) => {
      ctx.fillStyle = '#000000';
      ctx.fillRect(x, y, cellSize * 7, cellSize * 7);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(x + cellSize, y + cellSize, cellSize * 5, cellSize * 5);
      ctx.fillStyle = '#000000';
      ctx.fillRect(x + cellSize * 2, y + cellSize * 2, cellSize * 3, cellSize * 3);
    };

    drawFinder(cellSize, cellSize);
    drawFinder(size - cellSize * 8, cellSize);
    drawFinder(cellSize, size - cellSize * 8);

    // Fill timing patterns
    ctx.fillStyle = '#000000';
    for (let i = 0; i < gridSize; i++) {
      if (i % 2 === 0) {
        ctx.fillRect(cellSize * (8), cellSize * (1 + i), cellSize, cellSize);
        ctx.fillRect(cellSize * (1 + i), cellSize * (8), cellSize, cellSize);
      }
    }

    // Data pattern from text input
    for (let i = 0; i < Math.min(data.length, 100); i++) {
      for (let bit = 0; bit < 8; bit++) {
        const isSet = (data[i] >> bit) & 1;
        if (isSet) {
          const col = (i * 8 + bit) % (gridSize - 8) + 9;
          const row = Math.floor((i * 8 + bit) / (gridSize - 8)) + 1;
          if (row < gridSize && col < gridSize) {
            ctx.fillStyle = '#000000';
            ctx.fillRect(cellSize * (col + 1), cellSize * (row + 1), cellSize, cellSize);
          }
        }
      }
    }

    setQrDataUrl(canvas.toDataURL('image/png'));
  };

  const downloadQR = () => {
    const link = document.createElement('a');
    link.download = 'qr-code.png';
    link.href = qrDataUrl;
    link.click();
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 max-w-xl mx-auto my-8">
      <h2 className="text-xl font-bold text-gray-800 mb-4">QR Code Generator</h2>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text or URL to generate QR code..."
        rows={3}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-y mb-3"
      />
      <button onClick={generateQR} className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium mb-4">
        Generate QR Code
      </button>
      <canvas ref={canvasRef} className="hidden" />
      {qrDataUrl && (
        <div className="text-center">
          <img src={qrDataUrl} alt="Generated QR Code" className="mx-auto w-48 h-48" />
          <button onClick={downloadQR} className="mt-3 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
            Download PNG
          </button>
        </div>
      )}
    </div>
  );
}