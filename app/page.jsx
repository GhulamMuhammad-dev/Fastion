'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'





const Canvas = dynamic(() => import('../components/Canvas.jsx'), { ssr: false })


export default function Page() {


  return (
    <main className="min-h-screen bg-gray-600">
        <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Konva Canvas Editor</h1>
      <Canvas />
    </div>
    </main>
  )
}
