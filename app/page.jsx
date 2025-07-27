'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'





const Canvas = dynamic(() => import('../components/Canvas.jsx'), { ssr: false })


export default function Page() {


  return (
    <main className="min-h-screen bg-gray-600">
      <Canvas />
 
    </main>
  )
}
