"use client";
import React, { useState, } from "react";
import useImage from "use-image";
import { Stage, Layer, Rect, Star, Circle } from "react-konva";
import Konva from "konva";

export default function AdvancedFills() {
  // Initial gradient color stops
  const [gradient, setGradient] = useState([0, "red", 1, "yellow"]);
  const [image] = useImage("images/instgramProfile.png");

  // Function to generate random gradient stops
  const randomGradient = () => [
    0,
    Konva.Util.getRandomColor(),
    1,
    Konva.Util.getRandomColor(),
  ];

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Stage width={600} height={400} className="bg-white shadow-md">
        <Layer>
          <Rect
            x={200}
            y={150}
            width={200}
            height={120}
            cornerRadius={15}
            fillLinearGradientStartPoint={{ x: 0, y: 0 }}
            fillLinearGradientEndPoint={{ x: 200, y: 120 }}
            fillLinearGradientColorStops={gradient}
            stroke="black"
            strokeWidth={3}
            onClick={() => setGradient(randomGradient())} // change gradient on click
            draggable
          />
          <Circle
            x={350}
            y={110}
            radius={60}
            fillRadialGradientStartPoint={{ x: 0, y: 0 }}
            fillRadialGradientStartRadius={0}
            fillRadialGradientEndPoint={{ x: 0, y: 0 }}
            fillRadialGradientEndRadius={60}
            fillRadialGradientColorStops={[0, "white", 1, "blue"]}
            stroke="black"
            strokeWidth={2}
            draggable
          />

          <Rect
            x={50}
            y={50}
            width={200}
            height={120}
            fillLinearGradientStartPoint={{ x: 0, y: 0 }}
            fillLinearGradientEndPoint={{ x: 200, y: 120 }}
            fillLinearGradientColorStops={[0, 'red', 1, 'yellow']}
            stroke="black"
            strokeWidth={2}
            cornerRadius={10}
            draggable
          />
          {/* Texture Fill */}
          <Star
            x={150}
            y={250}
            numPoints={5}
            innerRadius={30}
            outerRadius={70}
            fillPatternImage={image}
            fillPatternRepeat="repeat" // or 'no-repeat'
            stroke="black"
            strokeWidth={2}
            draggable
          />
        </Layer>
      </Stage>
    </div>
  );
}
