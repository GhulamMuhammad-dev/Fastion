import React from "react";

import { Group, Rect, Circle, Layer,Stage } from "react-konva";

const GroupShapes = () => {
  return (
    <div>
      <Stage width={800} height={600}>
      <Layer>
        <Group x={250} y={100} draggable>
          <Rect x={0} y={0} width={120} height={80} fill="green" />
          <Circle x={60} y={40} radius={30} fill="white" />
        </Group>
      </Layer>
      </Stage>
    </div>
  );
};

export default GroupShapes;
