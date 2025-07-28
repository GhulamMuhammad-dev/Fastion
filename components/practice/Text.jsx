'use client';
import React from 'react';
import { Stage, Layer, Text } from 'react-konva';

export default function TextDemo() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Stage width={600} height={300}>
        <Layer>
          <Text
            text="Hello Konva!"
            x={50}
            y={60}
            fontSize={30}
            fontFamily="Calibri"
            fill="blue"
            fontStyle="bold"
          />
          <Text
            text="Centered Text"
            x={300}
            y={150}
            width={200}
            align="center"
            fontSize={24}
            fill="red"
          />
        </Layer>
      </Stage>
    </div>
  );
}


// Text with effacts 

// 'use client';
// import React from 'react';
// import { Stage, Layer, Text } from 'react-konva';

// export default function AdvancedTextDemo() {
//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <Stage width={600} height={300}>
//         <Layer>
//           {/* Shadow + Stroke */}
//           <Text
//             text="Styled Text"
//             x={50}
//             y={50}
//             fontSize={40}
//             fontFamily="Arial"
//             fill="orange"
//             stroke="black"
//             strokeWidth={1}
//             shadowColor="rgba(0,0,0,0.5)"
//             shadowBlur={10}
//             shadowOffset={{ x: 4, y: 4 }}
//             draggable
//           />

//           {/* Multi-line text */}
//           <Text
//             text="This is\nMulti-line\nText"
//             x={300}
//             y={100}
//             width={200}
//             align="center"
//             fontSize={24}
//             fill="blue"
//             lineHeight={1.5}
//             draggable
//           />
//         </Layer>
//       </Stage>
//     </div>
//   );
// }

// we can also add custom fonts

// <Text fontFamily="Bricolage Grotesque" />