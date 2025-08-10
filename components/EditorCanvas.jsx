"use client";
import { Stage, Layer, Rect, Text } from "react-konva";
import { useState } from "react";

export default function EditorCanvas() {
  const [rectProps, setRectProps] = useState({
    x: 50,
    y: 50,
    width: 100,
    height: 100,
    fill: "red",
    draggable: true
  });

  return (
    <div className="w-full h-[80vh] bg-gray-100 border rounded-lg overflow-hidden">
      <Stage width={window.innerWidth} height={window.innerHeight * 0.7}>
        <Layer>
          <Text text="Loomotion MVP Canvas" fontSize={20} x={20} y={20} />
          <Rect
            {...rectProps}
            onDragEnd={(e) => {
              setRectProps({
                ...rectProps,
                x: e.target.x(),
                y: e.target.y()
              });
            }}
          />
        </Layer>
      </Stage>
    </div>
  );
}
