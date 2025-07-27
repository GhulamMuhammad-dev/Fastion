import React, { useState, useRef } from "react";
import { Stage, Layer, Rect, Circle } from "react-konva";
import Toolbar from "./Toolbar";
import Shapes from "./Shapes";
import { v4 as uuidv4 } from "uuid";

const Canvas = () => {
  const [shapes, setShapes] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedTool, setSelectedTool] = useState(null);
  const [drawingShape, setDrawingShape] = useState(null);

  const [selectionBox, setSelectionBox] = useState(null); // <-- NEW

  const stageRef = useRef();

  const handleMouseDown = (e) => {
    const pos = e.target.getStage().getPointerPosition();

    if (selectedTool) {
      const newShape = {
        id: uuidv4(),
        type: selectedTool,
        x: pos.x,
        y: pos.y,
        width: 0,
        height: 0,
        radius: 0,
      };
      setDrawingShape(newShape);
    } else {
      if (e.target === e.target.getStage()) {
        // Start selection box if select mode
        setSelectionBox({ x: pos.x, y: pos.y, width: 0, height: 0 });
        setSelectedIds([]); // clear existing selection
      }
    }
  };

  const handleMouseMove = (e) => {
    const pos = e.target.getStage().getPointerPosition();

    if (drawingShape) {
      const { x, y } = drawingShape;
      const width = pos.x - x;
      const height = pos.y - y;
      setDrawingShape({
        ...drawingShape,
        width,
        height,
        radius: Math.sqrt(width * width + height * height) / 2,
      });
    }

    if (selectionBox) {
      const { x, y } = selectionBox;
      setSelectionBox({
        ...selectionBox,
        width: pos.x - x,
        height: pos.y - y,
      });
    }
  };

  const handleMouseUp = () => {
    if (drawingShape) {
      setShapes([...shapes, drawingShape]);
      setDrawingShape(null);
    }

    if (selectionBox) {
      const { x, y, width, height } = selectionBox;
      const box = {
        x: Math.min(x, x + width),
        y: Math.min(y, y + height),
        width: Math.abs(width),
        height: Math.abs(height),
      };

      const selected = shapes
        .filter((shape) => {
          const sx = shape.x;
          const sy = shape.y;
          const sw = shape.width || shape.radius * 2;
          const sh = shape.height || shape.radius * 2;

          return (
            sx >= box.x &&
            sy >= box.y &&
            sx + sw <= box.x + box.width &&
            sy + sh <= box.y + box.height
          );
        })
        .map((s) => s.id);

      setSelectedIds(selected);
      setSelectionBox(null);
    }
  };

  return (
    <div className="w-full h-[500px] border relative">
      <Toolbar
        onAddShape={() => {}}
        selectedTool={selectedTool}
        setSelectedTool={setSelectedTool}
      />
      <Stage
        ref={stageRef}
        width={window.innerWidth}
        height={500}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <Layer>
          <Shapes
            shapes={shapes}
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
          />

          {/* Live Drawing Preview */}
          {drawingShape && selectedTool === "rect" && (
            <Rect
              x={drawingShape.x}
              y={drawingShape.y}
              width={drawingShape.width}
              height={drawingShape.height}
              stroke="black"
              dash={[4, 4]}
            />
          )}
          {drawingShape && selectedTool === "circle" && (
            <Circle
              x={drawingShape.x + drawingShape.width / 2}
              y={drawingShape.y + drawingShape.height / 2}
              radius={drawingShape.radius}
              stroke="black"
              dash={[4, 4]}
            />
          )}

          {/* Selection Box */}
          {selectionBox && (
            <Rect
              x={selectionBox.x}
              y={selectionBox.y}
              width={selectionBox.width}
              height={selectionBox.height}
              stroke="blue"
              dash={[4, 4]}
              fill="rgba(0,0,255,0.1)"
            />
          )}
        </Layer>
      </Stage>
    </div>
  );
};

export default Canvas;
