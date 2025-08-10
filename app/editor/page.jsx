"use client"

import dynamic from "next/dynamic";

// Lazy load components with SSR disabled for performance
const EditorCanvas = dynamic(() => import("../../components/EditorCanvas"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full text-gray-500">
      Loading Canvas…
    </div>
  ),
});

const LeftPanel = dynamic(() => import("../../components/LeftPanel"), {
  ssr: false,
});
const RightPanel = dynamic(() => import("../../components/RightPanel"), {
  ssr: false,
});
const Timeline = dynamic(() => import("../../components/Timeline"), {
  ssr: false,
});

export default function EditorPage() {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Main editor row */}
      <div className="flex flex-1 overflow-hidden">
        <div className="w-[250px] min-w-[200px] max-w-[20%] bg-gray-100 overflow-auto">
          <LeftPanel />
        </div>

        {/* Canvas section */}
        <div className="flex-1 flex flex-col bg-white rounded shadow overflow-hidden">
          <div className="flex-1 border rounded overflow-hidden">
            <EditorCanvas />
          </div>
        </div>

        <div className="w-[250px] min-w-[200px] max-w-[20%] bg-gray-100 overflow-auto">
          <RightPanel />
        </div>
      </div>

      {/* Timeline always at bottom, fixed height */}
      <div className="h-[120px] bg-gray-50 border-t overflow-hidden">
        <Timeline />
      </div>
    </div>
  );
}
