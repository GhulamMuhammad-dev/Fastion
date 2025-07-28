"use client";
import React, { useEffect, useState } from "react";
import { Stage, Layer, Image as KonvaImage, Group } from "react-konva";

export default function Image() {
  const [img, setImg] = useState(null);

  useEffect(() => {
    const imageObj = new window.Image();
    imageObj.src = "/images/instgramProfile.png"; // Replace with your URL or local file
    imageObj.onload = () => {
      setImg(imageObj);
    };
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Stage width={600} height={400}>

      {/* simpleImage */}
        <Layer>
          {img && (
            <KonvaImage
              image={img}
              x={50}
              y={50}
              width={200}
              height={150}
              draggable
            />
          )}
        </Layer>
  
  {/* maskedImage */}

        <Layer>
          <Group clip={{ x: 0, y: 0, width: 200, height: 100 }}>
            {img && (
              <KonvaImage
                image={img}
                x={50}
                y={50}
                width={200}
                height={150}
                draggable
              />
            )}
          </Group>
        </Layer>

       {/* cropImage */}
        <Layer>
          <Group>
            {img && (
              <KonvaImage
                image={img}
                x={50}
                y={50}
                width={200}
                height={150}
                crop={{
                  x: 200, // start crop at 50px from left
                  y: 150, // start crop at 50px from top
                  width: 110,
                  height: 100,
                }}
                draggable
              />
            )}
          </Group>
        </Layer>
      </Stage>
    </div>
  );
}



// Image Filters
// 'use client';
// import React, { useEffect, useRef } from 'react';
// import { Stage, Layer, Image as KonvaImage } from 'react-konva';
// import useImage from 'use-image';
// import Konva from 'konva';

// export default function ImageFilterDemo() {
//   const [image] = useImage('https://konvajs.org/assets/lion.png');
//   const imgRef1 = useRef();
//   const imgRef2 = useRef();

//   useEffect(() => {
//     if (imgRef1.current) {
//       imgRef1.current.cache(); // ✅ REQUIRED for filters
//     }
//     if (imgRef2.current) {
//       imgRef2.current.cache();
//     }
//   }, [image]);

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <Stage width={700} height={400}>
//         <Layer>
//           {image && (
//             <KonvaImage
//               ref={imgRef1}
//               x={50}
//               y={50}
//               image={image}
//               width={250}
//               height={180}
//               filters={[Konva.Filters.Brighten, Konva.Filters.Contrast]}
//               brightness={0.2}
//               contrast={0.5}
//               draggable
//             />
//           )}

//           {image && (
//             <KonvaImage
//               ref={imgRef2}
//               x={350}
//               y={50}
//               image={image}
//               width={250}
//               height={180}
//               filters={[Konva.Filters.Grayscale, Konva.Filters.Blur]}
//               blurRadius={8}
//               draggable
//             />
//           )}
//         </Layer>
//       </Stage>
//     </div>
//   );
// }




// Combining Text and Image

// <Group x={50} y={250} draggable>
//   <KonvaImage image={image} width={200} height={120} />
//   <Text
//     text="WATERMARK"
//     fontSize={24}
//     fill="white"
//     stroke="black"
//     strokeWidth={1}
//     opacity={0.7}
//     x={20}
//     y={40}
//   />
// </Group>


// Working Local Image Solution

// 'use client';
// import React, { useEffect, useRef } from 'react';
// import { Stage, Layer, Image as KonvaImage } from 'react-konva';
// import useImage from 'use-image';
// import Konva from 'konva';

// export default function ImageFilterDemo() {
//   const [image] = useImage('/lion.png', 'anonymous'); // ✅ local image with CORS safe
//   const imgRef = useRef();

//   useEffect(() => {
//     if (imgRef.current) {
//       imgRef.current.cache();
//     }
//   }, [image]);

//   return (
//     <Stage width={700} height={400}>
//       <Layer>
//         {image && (
//           <KonvaImage
//             ref={imgRef}
//             x={50}
//             y={50}
//             image={image}
//             width={250}
//             height={180}
//             filters={[Konva.Filters.Brighten, Konva.Filters.Contrast]}
//             brightness={0.2}
//             contrast={0.5}
//             draggable
//           />
//         )}
//       </Layer>
//     </Stage>
//   );
// }
