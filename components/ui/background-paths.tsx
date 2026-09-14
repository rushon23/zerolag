"use client"

import { useEffect, useState } from "react"

function FloatingPaths({ position }: { position: number }) {
  // Use a much smaller number of paths to prevent CPU lag
  const paths = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 15 * position} -${189 + i * 18}C-${
      380 - i * 15 * position
    } -${189 + i * 18} -${312 - i * 15 * position} ${216 - i * 18} ${
      152 - i * 15 * position
    } ${343 - i * 18}C${616 - i * 15 * position} ${470 - i * 18} ${
      684 - i * 15 * position
    } ${875 - i * 18} ${684 - i * 15 * position} ${875 - i * 18}`,
    width: 0.5 + i * 0.05,
    delay: i * 0.5,
    duration: 15 + (i % 5),
  }))

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg className="w-full h-full text-primary" viewBox="0 0 696 316" fill="none">
        <title>Background Paths</title>
        {paths.map((path) => (
          <path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={0.1 + path.id * 0.03}
            className="path-animated"
            style={{
              strokeDasharray: "1500",
              strokeDashoffset: "1500",
              animation: `drawPath ${path.duration}s linear infinite`,
              animationDelay: `${path.delay}s`,
            }}
          />
        ))}
      </svg>
    </div>
  )
}

export default function BackgroundPaths() {
  // Prevent SSR hydration mismatch by only rendering after mount
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="absolute inset-0 bg-[#0A1428]" />
  }

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#0A1428]">
      <div className="absolute inset-0 opacity-50">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>
    </div>
  )
}
