import { useState,useRef,useEffect } from "react";
import { Stage, Layer, Rect, Circle, RegularPolygon,Transformer } from "react-konva";


const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;

export default function Canvas() {
  
  const [shapes, setShapes] = useState([]);

  const addShape = (type) => {
    const newShape = {
      id: Date.now(),
      type,
      x: Math.random() * (CANVAS_WIDTH - 80),
      y: Math.random() * (CANVAS_HEIGHT - 60),
      // color: '#' + Math.floor(Math.random()*16777215).toString(16)
    };
    setShapes([...shapes, newShape]);
  };



  return (
    <div className="p-4">
      <div className="mb-4 flex gap-3">
        <button onClick={() => addShape("rect")} className="mr-2 bg-blue-500 text-white px-4 py-2 rounded">Add Rectangle</button>
      </div>
      <Stage width={CANVAS_WIDTH} height={CANVAS_HEIGHT} className="border border-gray-300 bg-gray-50">
        <Layer>
          <Rect
            x={0}
            y={0}
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
            fill="lightgray"
            stroke="black"
            strokeWidth={2}
          />
          {shapes.map((shape) => {
            switch (shape.type) {
              case "rect":
                return (
                  <Rect
                    key={shape.id}
                    x={shape.x}
                    y={shape.y}
                    width={80}
                    height={60}
                    fill="blue"
                    onClick={(e) => handleSelect(shape.id, e)}
                    draggable
                  />
                );
              
              default:
                return null;
            }
          })}
    
        </Layer>
      </Stage>
    </div>
  );
}
