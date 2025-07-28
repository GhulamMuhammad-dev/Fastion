'use client';
import React, { useRef, useState, useEffect } from 'react';
import { Stage, Layer, Rect, Transformer } from 'react-konva';

export default function TransformerDemo() {
  const [selectedId, setSelectedId] = useState(null);
  const transformerRef = useRef();

  const handleSelect = (id) => {
    setSelectedId(id);
  };

  useEffect(() => {
    if (transformerRef.current) {
      const stage = transformerRef.current.getStage();
      const selectedNode = stage.findOne(`#${selectedId}`);
      transformerRef.current.nodes(selectedNode ? [selectedNode] : []);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [selectedId]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Stage
        width={600}
        height={400}
        onClick={(e) => {
          // Deselect when clicking empty space
          if (e.target === e.target.getStage()) {
            setSelectedId(null);
          }
        }}
      >
        <Layer>
          {/* Rectangle 1 */}
          <Rect
            id="rect1"
            x={50}
            y={60}
            width={100}
            height={80}
            fill="skyblue"
            stroke="black"
            strokeWidth={2}
            draggable
            onClick={() => handleSelect('rect1')}
          />

          {/* Rectangle 2 */}
          <Rect
            id="rect2"
            x={200}
            y={150}
            width={120}
            height={100}
            fill="orange"
            stroke="black"
            draggable
            onClick={() => handleSelect('rect2')}
          />

          {/* Transformer */}
          <Transformer
            ref={transformerRef}
            rotateEnabled={true}
            boundBoxFunc={(oldBox, newBox) => {
              if (newBox.width < 20 || newBox.height < 20) {
                return oldBox;
              }
              return newBox;
            }}
          />
        </Layer>
      </Stage>
    </div>
  );
}
