'use client';
import React from 'react';
import { Stage, Layer, Circle, Ellipse, Line, Star, RegularPolygon } from 'react-konva';

export default function Shapes() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Stage width={800} height={600}>
        <Layer>

          {/* Circle */}
          <Circle
            x={100}
            y={100}
            radius={50}
            fill="orange"
            stroke="black"
            strokeWidth={2}
          />

          {/* Ellipse */}
          <Ellipse
            x={300}
            y={100}
            radiusX={70}
            radiusY={40}
            fill="lightblue"
            stroke="black"
            strokeWidth={2}
          />

          {/* Line */}
          <Line
            points={[500, 50, 600, 100, 550, 150]}
            stroke="green"
            strokeWidth={4}
            lineCap="round"
            lineJoin="round"
          />

          {/* Star */}
          <Star
            x={150}
            y={300}
            numPoints={5}
            innerRadius={20}
            outerRadius={60}
            fill="gold"
            stroke="black"
            strokeWidth={2}
          />

          {/* RegularPolygon (e.g. Hexagon) */}
          <RegularPolygon
            x={400}
            y={300}
            sides={6}
            radius={50}
            fill="purple"
            stroke="black"
            strokeWidth={2}
          />

        </Layer>
      </Stage>
    </div>
  );
}
