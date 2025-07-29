"use client";
import React from "react";
import { Stage, Layer, Star, RegularPolygon, Arc, Path,Shape } from "react-konva";

export default function StarPolygonDemo() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Stage width={600} height={400}>
        <Layer>
          {/* Star */}
          <Star
            x={100}
            y={100}
            numPoints={5}
            innerRadius={30}
            outerRadius={60}
            fill="gold"
            stroke="black"
            strokeWidth={2}
            draggable
          />

          {/* Regular Polygon (e.g., Hexagon) */}
          <RegularPolygon
            x={300}
            y={100}
            sides={6}
            radius={50}
            fill="lightblue"
            stroke="black"
            strokeWidth={2}
            draggable
          />

          <Arc
            x={500}
            y={100}
            innerRadius={40}
            outerRadius={60}
            angle={120} // how big the arc is
            fill="orange"
            stroke="black"
            strokeWidth={2}
            rotation={-60} // rotate arc
            draggable
          />

          <Path
            x={100}
            y={250}
            data="M20,20 C20,100 200,100 200,20" // SVG path data
            stroke="purple"
            strokeWidth={3}
            draggable
          />

          {/* customshape  */}

          <Shape
            sceneFunc={(context, shape) => {
              context.beginPath();
              context.moveTo(20, 50);
              context.lineTo(100, 150);
              context.quadraticCurveTo(150, 50, 200, 150);
              context.closePath();
              context.fillStrokeShape(shape);
            }}
            fill="pink"
            stroke="red"
            strokeWidth={3}
            draggable
          />
        </Layer>
      </Stage>
    </div>
  );
}
