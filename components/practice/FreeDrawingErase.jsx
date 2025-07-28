'use client';
import React, { useState } from 'react';
import { Stage, Layer, Line } from 'react-konva';

export default function DrawingBoard() {
  const [lines, setLines] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState('pen'); // 'pen' or 'eraser'
  const [color, setColor] = useState('black');
  const [strokeWidth, setStrokeWidth] = useState(3);
  const [history, setHistory] = useState([]); // for undo/redo

  const handleMouseDown = (e) => {
    setIsDrawing(true);
    const pos = e.target.getStage().getPointerPosition();

    setLines([
      ...lines,
      {
        points: [pos.x, pos.y],
        stroke: tool === 'pen' ? color : 'white',
        strokeWidth: tool === 'pen' ? strokeWidth : 20, // big stroke for eraser
        globalCompositeOperation:
          tool === 'pen' ? 'source-over' : 'destination-out',
      },
    ]);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    const lastLine = lines[lines.length - 1];

    // add new point to last line
    lastLine.points = lastLine.points.concat([point.x, point.y]);
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    setHistory([]); // clear redo history when new drawing happens
  };

  // Undo & Redo
  const undo = () => {
    if (lines.length === 0) return;
    const last = lines.pop();
    setHistory([...history, last]);
    setLines(lines.concat());
  };

  const redo = () => {
    if (history.length === 0) return;
    const restored = history.pop();
    setLines([...lines, restored]);
    setHistory(history.concat());
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Toolbar */}
      <div className="flex gap-2 mb-3">
        <button
          onClick={() => setTool('pen')}
          className={`px-3 py-1 rounded ${tool === 'pen' ? 'bg-blue-500 text-white' : 'bg-white border'}`}
        >
          Pen
        </button>
        <button
          onClick={() => setTool('eraser')}
          className={`px-3 py-1 rounded ${tool === 'eraser' ? 'bg-red-500 text-white' : 'bg-white border'}`}
        >
          Eraser
        </button>

        <select
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="black">Black</option>
          <option value="red">Red</option>
          <option value="blue">Blue</option>
          <option value="green">Green</option>
        </select>

        <input
          type="range"
          min="1"
          max="20"
          value={strokeWidth}
          onChange={(e) => setStrokeWidth(Number(e.target.value))}
          className="w-32"
        />
        <span>{strokeWidth}px</span>

        <button onClick={undo} className="px-3 py-1 bg-yellow-500 text-white rounded">
          Undo
        </button>
        <button onClick={redo} className="px-3 py-1 bg-green-500 text-white rounded">
          Redo
        </button>
      </div>

      {/* Canvas */}
      <Stage
        width={600}
        height={400}
        className="bg-white shadow-md"
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
      >
        <Layer>
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke={line.stroke}
              strokeWidth={line.strokeWidth}
              tension={0.5}
              lineCap="round"
              lineJoin="round"
              globalCompositeOperation={line.globalCompositeOperation}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
}
