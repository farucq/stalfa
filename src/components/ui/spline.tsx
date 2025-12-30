'use client'

import { Suspense, lazy, useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  const ref = useRef<HTMLDivElement | null>(null)

  // FIX: Ensure spline canvas doesn't block spotlight
  useEffect(() => {
    const el = ref.current
    if (!el) return

    const t = setTimeout(() => {
      const canvas = el.querySelector('canvas')
      if (canvas) {
        canvas.style.position = 'relative'
        canvas.style.zIndex = '10'
        
      }
    }, 50)

    return () => clearTimeout(t)
  }, [])

  return (
    <div ref={ref} className="w-full h-full relative">
      <Suspense
        fallback={
          <div className="w-full h-full flex items-center justify-center">
            <span className="loader"></span>
          </div>
        }
      >
        <Spline scene={scene} className={cn("w-full h-full", className)} />
      </Suspense>
    </div>
  )
}