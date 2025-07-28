'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'






const Canvas = dynamic(() => import('../components/Canvas.jsx'), { ssr: false })

const Shapes = dynamic(() => import('../components/practice/Shapes.jsx'), { ssr: false })
const GroupShapes = dynamic(() => import('../components/practice/GroupShapes.jsx'), { ssr: false })
const EventHandel = dynamic(() => import('../components/practice/EventHandel.jsx'), { ssr: false })
const ShapeManipulation = dynamic(() => import('../components/practice/ShapeManipulation.jsx'), { ssr: false })
const Image = dynamic(() => import('../components/practice/Image.jsx'), { ssr: false })
const FreeHandDrawing = dynamic(() => import('../components/practice/FreeDrawingErase.jsx'), { ssr: false })
const CustomShapes = dynamic(() => import('../components/practice/CustomShape.jsx'), { ssr: false })



export default function Page() {


  return (
    <main className="min-h-screen bg-gray-600">
        <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Konva Canvas Editor</h1>
     <CustomShapes />
    </div>
    </main>
  )
}
