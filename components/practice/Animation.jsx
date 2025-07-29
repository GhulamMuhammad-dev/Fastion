'use client';
import React, { useEffect, useRef } from 'react';
import { Stage, Layer, Star, Rect,Circle  } from 'react-konva';
import Konva from 'konva';
import gsap from 'gsap';

export default function Animation() {
  const starRef = useRef();
   const rectRef = useRef();
   const circleRef = useRef();

    const CirclehandleClick = () => {
    gsap.to(circleRef.current, {
      duration: 2,
      x: 500,
      y: 300,
      scaleX: 2,
      scaleY: 2,
      rotation: 360,
      fill: 'red',
      ease: 'elastic.out(1, 0.5)',
      onComplete: () => console.log('Animation done!'),
    });
  };


   const handleClick = () => {
    new Konva.Tween({
      node: rectRef.current,
      duration: 1, // 1 second
      x: Math.random() * 400 + 50,
      y: Math.random() * 300 + 50,
      scaleX: Math.random() + 0.5,
      scaleY: Math.random() + 0.5,
      rotation: Math.random() * 360,
      fill: Konva.Util.getRandomColor(),
      easing: Konva.Easings.EaseInOut,
    }).play();
  };


  useEffect(() => {
    const anim = new Konva.Animation((frame) => {
      const star = starRef.current;
      if (!star) return;
      // Rotate smoothly
      star.rotation(star.rotation() + 1);
    }, starRef.current.getLayer());

    anim.start();

    return () => anim.stop(); // cleanup
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Stage width={600} height={400} className="bg-white shadow-md">
        <Layer>
          <Star
            ref={starRef}
            x={300}
            y={200}
            numPoints={5}
            innerRadius={40}
            outerRadius={80}
            fill="gold"
            stroke="black"
            strokeWidth={2}
            draggable
          />
          <Circle
          ref={circleRef}
          x={100}
          y={100}
          radius={40}
          fill="green"
          stroke="black"
          strokeWidth={2}
          onClick={CirclehandleClick}
          draggable
        />

           <Rect
          ref={rectRef}
          x={100}
          y={100}
          width={100}
          height={100}
          fill="blue"
          stroke="black"
          strokeWidth={2}
          onClick={handleClick}
          draggable
        />
        </Layer>
      </Stage>
    </div>
  );
}
