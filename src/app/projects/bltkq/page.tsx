'use client';

import React, { useRef, useEffect, useState } from 'react';

export default function BltkqPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [color, setColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(5);
  const isDrawing = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    const getPos = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      const x = (e.offsetX ?? e.clientX - rect.left) * scaleX;
      const y = (e.offsetY ?? e.clientY - rect.top) * scaleY;
      return { x, y };
    };

    const startDrawing = (e: MouseEvent) => {
      isDrawing.current = true;
      const { x, y } = getPos(e);
      ctx.beginPath();
      ctx.moveTo(x, y);
    };

    const draw = (e: MouseEvent) => {
      if (!isDrawing.current) return;
      const { x, y } = getPos(e);
      ctx.strokeStyle = color;
      ctx.lineWidth = brushSize;
      ctx.lineTo(x, y);
      ctx.stroke();
    };

    const stopDrawing = () => {
      isDrawing.current = false;
    };

    canvas.addEventListener('mousedown', startDrawing as any);
    canvas.addEventListener('mousemove', draw as any);
    window.addEventListener('mouseup', stopDrawing);

    return () => {
      canvas.removeEventListener('mousedown', startDrawing as any);
      canvas.removeEventListener('mousemove', draw as any);
      window.removeEventListener('mouseup', stopDrawing);
    };
  }, [color, brushSize]);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-200 p-8 pt-20">
      <div className="bg-white p-4 rounded shadow w-full max-w-3xl mb-4">
        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-2">
            <span>Color:</span>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </label>
          <label className="flex items-center space-x-2">
            <span>Brush:</span>
            <input
              type="range"
              min="1"
              max="50"
              value={brushSize}
              onChange={(e) => setBrushSize(parseInt(e.target.value))}
            />
            <span>{brushSize}px</span>
          </label>
          <button
            onClick={clearCanvas}
            className="px-3 py-1 bg-red-500 text-white rounded"
          >
            Clear
          </button>
        </div>
      </div>
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        className="border bg-white shadow"        
      />
    </div>
  );
}
