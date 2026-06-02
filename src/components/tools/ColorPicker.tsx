import React from 'react';
import { useState } from 'react';

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const cleaned = hex.replace('#', '');
  if (!/^[0-9A-Fa-f]{6}$/.test(cleaned) && !/^[0-9A-Fa-f]{3}$/.test(cleaned)) return null;
  const full = cleaned.length === 3 ? cleaned.split('').map(c => c + c).join('') : cleaned;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  if (isNaN(r) || isNaN(g) || isNaN(b)) return null;
  return { r, g, b };
}

function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) => Math.round(n).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

export default function ColorPicker() {
  const [hex, setHex] = useState('#3498DB');
  const [rgb, setRgb] = useState({ r: 52, g: 152, b: 219 });
  const [color, setColor] = useState('#3498DB');

  const handleHexChange = (val: string) => {
    setHex(val);
    const result = hexToRgb(val);
    if (result) {
      setRgb(result);
      setColor(rgbToHex(result.r, result.g, result.b));
    }
  };

  const handleRgbChange = (channel: 'r' | 'g' | 'b', value: number) => {
    const newRgb = { ...rgb, [channel]: Math.min(255, Math.max(0, value)) };
    setRgb(newRgb);
    const newHex = rgbToHex(newRgb.r, newRgb.g, newRgb.b);
    setHex(newHex);
    setColor(newHex);
  };

  const handleColorInput = (val: string) => {
    setColor(val);
    const result = hexToRgb(val);
    if (result) {
      setHex(val.toUpperCase());
      setRgb(result);
    }
  };

  const copyToClipboard = (val: string) => navigator.clipboard.writeText(val);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 max-w-xl mx-auto my-8">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Color Picker & Converter</h2>

      <input type="color" value={color} onChange={(e) => handleColorInput(e.target.value)} className="w-full h-12 rounded-lg cursor-pointer mb-4" />

      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">HEX</label>
          <div className="flex gap-2">
            <input type="text" value={hex} onChange={(e) => handleHexChange(e.target.value)} placeholder="#000000" maxLength={7} className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none font-mono" />
            <button onClick={() => copyToClipboard(hex)} className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 text-sm font-medium">Copy</button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">RGB</label>
          <div className="flex gap-2">
            <input type="number" value={rgb.r} onChange={(e) => handleRgbChange('r', parseInt(e.target.value) || 0)} min={0} max={255} className="w-16 px-2 py-2 border border-gray-300 rounded-lg text-center text-sm" />
            <input type="number" value={rgb.g} onChange={(e) => handleRgbChange('g', parseInt(e.target.value) || 0)} min={0} max={255} className="w-16 px-2 py-2 border border-gray-300 rounded-lg text-center text-sm" />
            <input type="number" value={rgb.b} onChange={(e) => handleRgbChange('b', parseInt(e.target.value) || 0)} min={0} max={255} className="w-16 px-2 py-2 border border-gray-300 rounded-lg text-center text-sm" />
            <button onClick={() => copyToClipboard(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`)} className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 text-sm font-medium">Copy</button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <button onClick={() => handleHexChange('#FF0000')} className="h-10 rounded-lg" style={{ backgroundColor: '#FF0000' }} />
          <button onClick={() => handleHexChange('#00FF00')} className="h-10 rounded-lg" style={{ backgroundColor: '#00FF00' }} />
          <button onClick={() => handleHexChange('#0000FF')} className="h-10 rounded-lg" style={{ backgroundColor: '#0000FF' }} />
          <button onClick={() => handleHexChange('#FFFF00')} className="h-10 rounded-lg" style={{ backgroundColor: '#FFFF00' }} />
          <button onClick={() => handleHexChange('#FF00FF')} className="h-10 rounded-lg" style={{ backgroundColor: '#FF00FF' }} />
          <button onClick={() => handleHexChange('#00FFFF')} className="h-10 rounded-lg" style={{ backgroundColor: '#00FFFF' }} />
        </div>
      </div>

      <div className="mt-4 p-4 rounded-lg text-white text-center font-bold" style={{ backgroundColor: color }}>
        Preview: {hex}
      </div>
    </div>
  );
}