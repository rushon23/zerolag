"use client"

import { useState, useEffect } from "react"

interface LogoProps {
  className?: string
  imageOnly?: boolean
  size?: "small" | "medium" | "large"
}

export function Logo({ className = "", imageOnly = false, size = "medium" }: LogoProps) {
  const [isClient, setIsClient] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  // Size mapping with safe defaults
  const sizeMap = {
    small: { width: 24, height: 24, textClass: "text-lg" },
    medium: { width: 32, height: 32, textClass: "text-xl md:text-2xl" },
    large: { width: 48, height: 48, textClass: "text-3xl md:text-4xl font-bold" },
  }

  // Safely get dimensions with fallback
  const dimensions = size && sizeMap[size] ? sizeMap[size] : sizeMap.medium

  // Check if we're on the client side
  useEffect(() => {
    try {
      setIsClient(true)

      // Preload the logo image to check if it's available
      const img = new Image()
      img.onload = () => {
        setImageLoaded(true)
        setImageError(false)
      }
      img.onerror = () => {
        console.warn("Logo image failed to load, using fallback")
        setImageError(true)
      }
      img.src = "/images/logo.png"
    } catch (error) {
      console.error("Error in logo component:", error)
      setImageError(true)
    }
  }, [])

  // Handle image error
  const handleImageError = () => {
    console.warn("Failed to load logo image")
    setImageError(true)
  }

  // Handle image load
  const handleImageLoad = () => {
    setImageLoaded(true)
  }

  // Fallback image URL as a data URI - a simple teal square with "ZL" text
  const fallbackDataUri = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${dimensions.width}' height='${dimensions.height}' viewBox='0 0 ${dimensions.width} ${dimensions.height}'%3E%3Crect width='100%25' height='100%25' fill='%230CCEA9' /%3E%3Ctext x='50%25' y='50%25' dominantBaseline='middle' textAnchor='middle' fontFamily='Arial' fontWeight='bold' fontSize='${dimensions.width / 3}' fill='white'%3EZL%3C/text%3E%3C/svg%3E`

  // Render with defensive checks
  return (
    <div className={`flex items-center ${className || ""}`}>
      {/* Logo image with standard img tag for maximum compatibility */}
      <div className="relative" style={{ width: dimensions.width, height: dimensions.height }}>
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {!imageError ? (
          <img
            src="/images/logo.png"
            alt="ZeroLag Logo"
            width={dimensions.width}
            height={dimensions.height}
            className={`object-contain transition-opacity duration-300 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
            style={{ transform: "scale(1.2)" }}
            onError={handleImageError}
            onLoad={handleImageLoad}
          />
        ) : (
          // Fallback for error - using data URI
          <img
            src={fallbackDataUri || "/placeholder.svg"}
            alt="ZeroLag Logo"
            width={dimensions.width}
            height={dimensions.height}
            className="object-contain rounded-full"
          />
        )}
      </div>

      {!imageOnly && (
        <span className={`font-bold ${dimensions.textClass || ""} ml-2`}>
          <span className="text-white">Zero</span>
          <span className="text-primary">Lag</span>
        </span>
      )}
    </div>
  )
}