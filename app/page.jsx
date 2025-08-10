'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import SupabaseConnect from '@/components/SupabaseConnect.jsx'






const Canvas = dynamic(() => import('../components/Canvas.jsx'), { ssr: false })

const Shapes = dynamic(() => import('../components/practice/Shapes.jsx'), { ssr: false })
const GroupShapes = dynamic(() => import('../components/practice/GroupShapes.jsx'), { ssr: false })
const EventHandel = dynamic(() => import('../components/practice/EventHandel.jsx'), { ssr: false })
const ShapeManipulation = dynamic(() => import('../components/practice/ShapeManipulation.jsx'), { ssr: false })
const Image = dynamic(() => import('../components/practice/Image.jsx'), { ssr: false })
const FreeHandDrawing = dynamic(() => import('../components/practice/FreeDrawingErase.jsx'), { ssr: false })
const CustomShapes = dynamic(() => import('../components/practice/CustomShape.jsx'), { ssr: false })
const AdvancedFill = dynamic(() => import('../components/practice/AdvancedFills.jsx'), { ssr: false })
const Animation = dynamic(() => import('../components/practice/Animation.jsx'), { ssr: false })
const Layers = dynamic(() => import('../components/practice/Layers.jsx'), { ssr: false })
const SaveLoadDemo = dynamic(() => import('../components/practice/SavingLoadingCanvas.jsx'), { ssr: false })
const MyPractice = dynamic(() => import('../components/practice/MyPractice.jsx'), { ssr: false })



export default function Page() {


  return (
    <main className="min-h-screen bg-gray-600">
        <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Konva Canvas Editor</h1>
      <SupabaseConnect />
    </div>
    </main>
  )
}
