'use client';
import React, { useEffect, useRef } from 'react';
import { Stage, Layer, Rect } from 'react-konva';

export default function CacheDemo() {
  const rectRef = useRef();

  useEffect(() => {
    rectRef.current.cache(); // Cache after first render
  }, []);

  return (
    <Stage width={600} height={400} className="bg-white shadow-md">
      <Layer>
        <Rect
          ref={rectRef}
          x={150}
          y={100}
          width={200}
          height={120}
          fillLinearGradientStartPoint={{ x: 0, y: 0 }}
          fillLinearGradientEndPoint={{ x: 200, y: 120 }}
          fillLinearGradientColorStops={[0, 'red', 1, 'yellow']}
          shadowBlur={20}
          draggable
        />
      </Layer>
    </Stage>
  );
}

//cashing group
groupRef.current.cache();

//Optimize Large Canvases

//✔ Use Multiple Layers – Redraw only changed layers instead of the whole stage.
//✔ Destroy Unused Shapes – Remove elements you don’t need:


shape.destroy();
layer.batchDraw();


// Image optimization

import { Image } from 'react-konva';
import useImage from 'use-image';

export default function OptimizedImage() {
  const [image] = useImage('https://picsum.photos/400', 'Anonymous');

  return (
    <Image
      image={image}
      x={100}
      y={100}
      width={200}
      height={200}
      filters={[Konva.Filters.Blur]}
      blurRadius={10}
      onLoad={(e) => e.target.cache()} // Cache after applying filters
    />
  );
}
