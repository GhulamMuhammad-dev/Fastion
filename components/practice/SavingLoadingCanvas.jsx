'use client';
import React, { useRef, useState } from 'react';
import { Stage, Layer, Circle, Rect } from 'react-konva';
import Konva from 'konva';

export default function SaveLoadDemo() {
  const stageRef = useRef();
  const [savedData, setSavedData] = useState(null);

  const handleSave = () => {
    const json = stageRef.current.toJSON();
    setSavedData(json);
    localStorage.setItem('canvasData', json);
    alert('Canvas saved!');
  };

  const handleLoad = () => {
    const json = localStorage.getItem('canvasData');
    if (!json) return alert('No saved canvas found!');
    stageRef.current.destroyChildren(); // clear current shapes
    Konva.Node.create(json, stageRef.current);
    alert('Canvas loaded!');
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <div className="flex gap-2 mb-3">
        <button
          onClick={handleSave}
          className="px-3 py-1 bg-blue-500 text-white rounded"
        >
          Save Canvas
        </button>
        <button
          onClick={handleLoad}
          className="px-3 py-1 bg-green-500 text-white rounded"
        >
          Load Canvas
        </button>
      </div>

      <Stage
        ref={stageRef}
        width={600}
        height={400}
        className="bg-white shadow-md"
      >
        <Layer>
          <Circle x={100} y={200} radius={40} fill="red" draggable />
          <Rect x={200} y={150} width={100} height={100} fill="blue" draggable />
        </Layer>
      </Stage>
    </div>
  );
}
