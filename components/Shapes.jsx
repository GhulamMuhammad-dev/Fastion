import React, { useEffect, useRef } from "react";
import { Rect, Circle, Transformer } from "react-konva";

const Shapes = ({ shapes, selectedIds, setSelectedIds }) => {
  const shapeRefs = useRef({});
  const transformerRef = useRef();

  useEffect(() => {
    const transformer = transformerRef.current;
    if (transformer) {
      const selectedNodes = selectedIds
        .map((id) => shapeRefs.current[id])
        .filter(Boolean);
      transformer.nodes(selectedNodes);
      transformer.getLayer().batchDraw();
    }
  }, [selectedIds, shapes]);

  const handleClick = (e, shape) => {
    const isSelected = selectedIds.includes(shape.id);
    const isShift = e.evt.shiftKey;

    if (isShift) {
      // Toggle selection
      if (isSelected) {
        setSelectedIds(selectedIds.filter((id) => id !== shape.id));
      } else {
        setSelectedIds([...selectedIds, shape.id]);
      }
    } else {
      setSelectedIds([shape.id]);
    }
    e.cancelBubble = true;
  };

  return (
    <>
      {shapes.map((shape) => {
        const isSelected = selectedIds.includes(shape.id);

        const commonProps = {
          ref: (node) => {
            if (node) shapeRefs.current[shape.id] = node;
          },
          draggable: isSelected,
          stroke: isSelected ? "red" : "black",
          strokeWidth: 2,
          onClick: (e) => handleClick(e, shape),
          onTap: (e) => handleClick(e, shape),
          x: shape.x,
          y: shape.y,
          width: shape.width,
          height: shape.height,
        };

        if (shape.type === "rect") {
          return <Rect key={shape.id} {...commonProps} fill="blue" />;
        }

        if (shape.type === "circle") {
          return (
            <Circle
              key={shape.id}
              {...commonProps}
              radius={shape.radius}
              x={shape.x + shape.width / 2}
              y={shape.y + shape.height / 2}
              fill="green"
            />
          );
        }

        return null;
      })}

      <Transformer
        ref={transformerRef}
        rotateEnabled={true}
        enabledAnchors={["top-left", "top-right", "bottom-left", "bottom-right"]}
        boundBoxFunc={(oldBox, newBox) => {
          if (newBox.width < 5 || newBox.height < 5) return oldBox;
          return newBox;
        }}
      />
    </>
  );
};

export default Shapes;
