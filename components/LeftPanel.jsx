'use client';
export default function LeftPanel() {
  return (
    <aside className="w-64 bg-white rounded shadow p-3 flex flex-col gap-3">
      <div className="font-medium">Layers</div>
      <div className="flex flex-col gap-2">
        <div className="p-2 bg-slate-50 rounded">Layer 1</div>
        <div className="p-2 bg-slate-50 rounded">Layer 2</div>
      </div>

      <div className="mt-4 font-medium">Tools</div>
      <div className="flex gap-2">
        <button className="px-2 py-1 rounded bg-slate-100">Rect</button>
        <button className="px-2 py-1 rounded bg-slate-100">Text</button>
        <button className="px-2 py-1 rounded bg-slate-100">Pen</button>
      </div>
    </aside>
  );
}
