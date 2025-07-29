'use client';
import React, { useRef, useState } from 'react';
import { Stage, Layer, Circle, Rect } from 'react-konva';
import { v4 as uuidv4 } from 'uuid';

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function SortableLayer({ id, layer, activeLayerId, onSelect, onToggleVisibility, onToggleListening, onBringToFront }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`p-2 rounded border cursor-move ${
        activeLayerId === layer.id ? 'bg-blue-100 border-blue-400' : ''
      }`}
    >
      <div className="flex justify-between items-center mb-1">
        <button
          className="text-left font-medium w-full"
          onClick={() => onSelect(layer.id)}
        >
          {layer.name}
        </button>
      </div>
      <div className="flex flex-wrap gap-1 text-xs">
        <button
          onClick={() => onToggleVisibility(layer.id)}
          className="px-2 py-0.5 bg-gray-200 rounded"
        >
          {layer.visible ? 'Hide' : 'Show'}
        </button>
        <button
          onClick={() => onToggleListening(layer.id)}
          className="px-2 py-0.5 bg-gray-200 rounded"
        >
          {layer.listening ? 'Lock' : 'Unlock'}
        </button>
        <button
          onClick={() => onBringToFront(layer.id)}
          className="px-2 py-0.5 bg-gray-200 rounded"
        >
          Front
        </button>
      </div>
    </div>
  );
}

export default function LayerManager() {
  const [layers, setLayers] = useState([]);
  const [activeLayerId, setActiveLayerId] = useState(null);
  const stageRef = useRef();

  const sensors = useSensors(useSensor(PointerSensor));

  const createLayer = () => {
    const newLayer = {
      id: uuidv4(),
      name: `Layer ${layers.length + 1}`,
      visible: true,
      listening: true,
      ref: React.createRef(),
      shapes: [],
    };
    setLayers((prev) => [...prev, newLayer]);
    setActiveLayerId(newLayer.id);
  };

  const addShapeToActiveLayer = (shapeType) => {
    const updatedLayers = layers.map((layer) => {
      if (layer.id === activeLayerId) {
        const shape = {
          id: uuidv4(),
          type: shapeType,
          x: Math.random() * 400 + 50,
          y: Math.random() * 300 + 50,
          fill: shapeType === 'circle' ? 'red' : 'blue',
          size: 50,
        };
        return {
          ...layer,
          shapes: [...layer.shapes, shape],
        };
      }
      return layer;
    });
    setLayers(updatedLayers);
  };

  const toggleLayerVisibility = (id) => {
    const updated = layers.map((l) =>
      l.id === id ? { ...l, visible: !l.visible } : l
    );
    setLayers(updated);
  };

  const toggleLayerListening = (id) => {
    const updated = layers.map((l) =>
      l.id === id ? { ...l, listening: !l.listening } : l
    );
    setLayers(updated);
  };

  const bringLayerToFront = (id) => {
    const target = layers.find((l) => l.id === id);
    const others = layers.filter((l) => l.id !== id);
    setLayers([...others, target]);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = layers.findIndex((l) => l.id === active.id);
      const newIndex = layers.findIndex((l) => l.id === over.id);
      setLayers((layers) => arrayMove(layers, oldIndex, newIndex));
    }
  };

  return (
    <div className="flex flex-col md:flex-row p-4 gap-4 bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <div className="w-full md:w-60 p-3 bg-white rounded shadow">
        <h2 className="text-lg font-semibold mb-2">Layers</h2>
        <button
          onClick={createLayer}
          className="w-full mb-3 py-1 px-3 bg-green-500 text-white rounded"
        >
          + Add Layer
        </button>

        {/* Draggable Layers List */}
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={layers.map((l) => l.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-2">
              {layers.map((layer) => (
                <SortableLayer
                  key={layer.id}
                  id={layer.id}
                  layer={layer}
                  activeLayerId={activeLayerId}
                  onSelect={setActiveLayerId}
                  onToggleVisibility={toggleLayerVisibility}
                  onToggleListening={toggleLayerListening}
                  onBringToFront={bringLayerToFront}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>

        <div className="mt-5">
          <h3 className="font-semibold mb-1">Add Shape</h3>
          <div className="flex gap-2">
            <button
              className="w-full px-2 py-1 bg-red-500 text-white rounded"
              onClick={() => addShapeToActiveLayer('circle')}
            >
              + Circle
            </button>
            <button
              className="w-full px-2 py-1 bg-blue-500 text-white rounded"
              onClick={() => addShapeToActiveLayer('rect')}
            >
              + Rect
            </button>
          </div>
        </div>
      </div>

      {/* Canvas */}
      <div className="flex-1 bg-white rounded shadow">
        <Stage width={800} height={500} ref={stageRef}>
          {layers.map((layer) => (
            <Layer
              key={layer.id}
              ref={layer.ref}
              visible={layer.visible}
              listening={layer.listening}
            >
              {layer.shapes.map((shape) =>
                shape.type === 'circle' ? (
                  <Circle
                    key={shape.id}
                    x={shape.x}
                    y={shape.y}
                    radius={shape.size}
                    fill={shape.fill}
                    draggable
                  />
                ) : (
                  <Rect
                    key={shape.id}
                    x={shape.x}
                    y={shape.y}
                    width={shape.size}
                    height={shape.size}
                    fill={shape.fill}
                    draggable
                  />
                )
              )}
            </Layer>
          ))}
        </Stage>
      </div>
    </div>
  );
}
