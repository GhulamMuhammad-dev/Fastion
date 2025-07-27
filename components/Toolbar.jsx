// components/Toolbar.jsx
import React from "react";

const Toolbar = ({ onAddShape, selectedTool, setSelectedTool }) => {
  return (
    <div className="flex gap-2 p-2">
      <button
        className={`px-4 py-2 rounded ${
          selectedTool === "rect" ? "bg-blue-700" : "bg-blue-500"
        } text-white`}
        onClick={() => setSelectedTool("rect")}
      >
        Rectangle
      </button>
      <button
        className={`px-4 py-2 rounded ${
          selectedTool === "circle" ? "bg-green-700" : "bg-green-500"
        } text-white`}
        onClick={() => setSelectedTool("circle")}
      >
        Circle
      </button>
      <button
        className="px-4 py-2 rounded bg-gray-400 text-white"
        onClick={() => setSelectedTool(null)}
      >
        Select
      </button>
    </div>
  );
};

export default Toolbar;
