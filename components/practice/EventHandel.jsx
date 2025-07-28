'use client';
import React, { useState } from 'react';
import { Stage, Layer, Rect, Text } from 'react-konva';

export default function EventHandel() {
  const [message, setMessage] = useState("Try interacting with the rectangle");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 space-y-4">
      <Stage width={500} height={400}>
        <Layer>
          <Rect
            x={150}
            y={100}
            width={200}
            height={100}
            fill="skyblue"
            stroke="black"
            strokeWidth={2}
            cornerRadius={10}
            draggable
            onClick={() => setMessage("🖱️ You clicked the rectangle")}
            onMouseEnter={(e) => {
              // Change cursor
              const container = e.target.getStage()?.container();
              if (container) container.style.cursor = "pointer";
              setMessage("👆 You're hovering over the rectangle");
            }}
            onMouseLeave={(e) => {
              const container = e.target.getStage()?.container();
              if (container) container.style.cursor = "default";
              setMessage("Moved mouse away");
            }}
            onDragStart={() => setMessage("🟦 Started dragging")}
            onDragMove={() => setMessage("🟦 Dragging...")}
            onDragEnd={() => setMessage("🟦 Dropped the rectangle")}
          />
        </Layer>
      </Stage>

      <div className="bg-white text-gray-800 p-2 rounded shadow text-sm w-[500px] text-center">
        {message}
      </div>
    </div>
  );
}
