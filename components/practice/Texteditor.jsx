//Example: Draggable Editable Text

'use client';
import React from 'react';
import { Stage, Layer, Text } from 'react-konva';

export default function BasicText() {
  return (
    <Stage width={600} height={400} className="bg-white shadow-md">
      <Layer>
        <Text
          text="Hello Konva!"
          x={100}
          y={150}
          fontSize={30}
          fontFamily="Arial"
          fill="blue"
          draggable
        />
      </Layer>
    </Stage>
  );
}

//Dynamic Text Controls (Font Size & Color)

'use client';
import React, { useState } from 'react';
import { Stage, Layer, Text } from 'react-konva';

export default function TextControls() {
  const [fontSize, setFontSize] = useState(30);
  const [color, setColor] = useState('black');

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <div className="flex gap-2 mb-3">
        <input
          type="number"
          value={fontSize}
          onChange={(e) => setFontSize(Number(e.target.value))}
          className="border px-2 rounded"
        />
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="border px-2 rounded"
        />
      </div>

      <Stage width={600} height={400} className="bg-white shadow-md">
        <Layer>
          <Text
            text="Dynamic Text"
            x={100}
            y={150}
            fontSize={fontSize}
            fill={color}
            draggable
          />
        </Layer>
      </Stage>
    </div>
  );
}


// Inline Editing (Figma/Canva-like Double-Click Edit)

'use client';
import React, { useRef, useState } from 'react';
import { Stage, Layer, Text } from 'react-konva';

export default function EditableText() {
  const stageRef = useRef();
  const textRef = useRef();
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState('Double-click to edit');

  const handleDblClick = () => {
    const textNode = textRef.current;
    const stage = stageRef.current;
    const textPosition = textNode.getAbsolutePosition(stage);

    const textarea = document.createElement('textarea');
    document.body.appendChild(textarea);

    textarea.value = textNode.text();
    textarea.style.position = 'absolute';
    textarea.style.top = textPosition.y + 'px';
    textarea.style.left = textPosition.x + 'px';
    textarea.style.width = textNode.width() + 'px';
    textarea.style.fontSize = textNode.fontSize() + 'px';
    textarea.focus();

    textarea.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        textNode.text(textarea.value);
        setValue(textarea.value);
        document.body.removeChild(textarea);
      }
    });

    textarea.addEventListener('blur', () => {
      textNode.text(textarea.value);
      setValue(textarea.value);
      document.body.removeChild(textarea);
    });
  };

  return (
    <Stage ref={stageRef} width={600} height={400} className="bg-white shadow-md">
      <Layer>
        <Text
          ref={textRef}
          text={value}
          x={100}
          y={150}
          fontSize={30}
          fontFamily="Arial"
          fill="black"
          draggable
          onDblClick={handleDblClick}
        />
      </Layer>
    </Stage>
  );
}
