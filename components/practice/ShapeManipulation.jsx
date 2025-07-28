'use client';
import React, { useRef, useState } from 'react';
import { Stage, Layer, Rect } from 'react-konva';

export default function ShapeManipulation() {
  const rectRef = useRef();
  const [angle, setAngle] = useState(0);
  const [scale, setScale] = useState(1);

  const rotateShape = () => {
    const newAngle = angle + 15;
    setAngle(newAngle);
    rectRef.current.rotation(newAngle); // Rotate 15° each click
  };

  const scaleUp = () => {
    const newScale = scale + 0.1;
    setScale(newScale);
    rectRef.current.scale({ x: newScale, y: newScale }); // Uniform scale
  };

  const scaleDown = () => {
    const newScale = scale - 0.1 > 0.2 ? scale - 0.1 : 0.2;
    setScale(newScale);
    rectRef.current.scale({ x: newScale, y: newScale });
  };

  const resizeShape = () => {
    rectRef.current.width(rectRef.current.width() + 10);
    rectRef.current.height(rectRef.current.height() + 5);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 space-y-3">
      <Stage width={500} height={400}>
        <Layer>
          <Rect
            ref={rectRef}
            x={150}
            y={100}
            width={100}
            height={80}
            fill="lightgreen"
            draggable
          />
        </Layer>
      </Stage>

      <div className="flex gap-2">
        <button
          className="px-3 py-1 bg-blue-500 text-white rounded"
          onClick={rotateShape}
        >
          Rotate 15°
        </button>
        <button
          className="px-3 py-1 bg-green-500 text-white rounded"
          onClick={scaleUp}
        >
          Scale +
        </button>
        <button
          className="px-3 py-1 bg-yellow-500 text-white rounded"
          onClick={scaleDown}
        >
          Scale -
        </button>
        <button
          className="px-3 py-1 bg-purple-500 text-white rounded"
          onClick={resizeShape}
        >
          Resize
        </button>
      </div>
    </div>
  );
}
