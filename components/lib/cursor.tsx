"use client"

import React, { useState, useEffect, useCallback, type ReactNode } from "react"

interface CursorProps {
  children: ReactNode
}

export const Cursor = ({ children }: CursorProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY })
  }, [])

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove)
    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
    }
  }, [handleMouseMove])

  const cursorStyle = {
    left: `${position.x}px`,
    top: `${position.y}px`,
    position: "fixed" as const,
    pointerEvents: "none" as const,
  }

  return (
    <>
      {children}
      <div className="custom-cursor" style={cursorStyle}></div>
    </>
  )
}