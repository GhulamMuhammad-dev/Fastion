//exporting canvas as png
'use client';
import React, { useRef } from 'react';
import { Stage, Layer, Circle, Rect } from 'react-konva';

export default function ExportImageDemo() {
  const stageRef = useRef();

  const downloadImage = (format = 'png') => {
    const uri = stageRef.current.toDataURL({ mimeType: `image/${format}`, pixelRatio: 2 });
    const link = document.createElement('a');
    link.download = `canvas.${format}`;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <div className="flex gap-2 mb-3">
        <button
          onClick={() => downloadImage('png')}
          className="px-3 py-1 bg-blue-500 text-white rounded"
        >
          Download PNG
        </button>
        <button
          onClick={() => downloadImage('jpeg')}
          className="px-3 py-1 bg-green-500 text-white rounded"
        >
          Download JPEG
        </button>
      </div>

      <Stage ref={stageRef} width={600} height={400} className="bg-white shadow-md">
        <Layer>
          <Circle x={150} y={200} radius={50} fill="red" draggable />
          <Rect x={300} y={150} width={100} height={100} fill="blue" draggable />
        </Layer>
      </Stage>
    </div>
  );
}


