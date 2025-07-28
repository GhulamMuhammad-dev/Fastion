"use client";
import React from "react";
import { Stage, Layer, Star, RegularPolygon, Arc } from "react-konva";

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
        </Layer>
      </Stage>
    </div>
  );
}
