"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

// Add this custom X logo component right after the imports
function XLogo({ className = "h-5 w-5 text-gray-300" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      {/* X (Twitter) logo shape */}
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

// Cursor Effect Component
export default function CursorEffect() {
  useEffect(() => {
    // Create the cursor dot element
    const cursorDot = document.createElement("div")
    cursorDot.className = "cursor-dot"
    document.body.appendChild(cursorDot)

    // Simple mouse move handler
    const onMouseMove = (e: MouseEvent) => {
      // Use CSS transform for better performance
      cursorDot.style.left = `${e.clientX}px`
      cursorDot.style.top = `${e.clientY}px`
    }

    // Simple mouse down/up handlers
    const onMouseDown = () => {
      cursorDot.classList.add("clicking")
    }

    const onMouseUp = () => {
      cursorDot.classList.remove("clicking")
    }

    // Add event listeners
    document.addEventListener("mousemove", onMouseMove)
    document.addEventListener("mousedown", onMouseDown)
    document.addEventListener("mouseup", onMouseUp)

    // Clean up
    return () => {
      document.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mousedown", onMouseDown)
      document.removeEventListener("mouseup", onMouseUp)
      if (cursorDot.parentNode) {
        document.body.removeChild(cursorDot)
      }
    }
  }, [])

  // No render - everything is handled in the effect
  return null
}

// Update the TechLoading component with additional safety checks:

// Loading Screen Component
export function TechLoading() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [fadeOut, setFadeOut] = useState(false)
  const [logoText, setLogoText] = useState("")
  const [showCursor, setShowCursor] = useState(true)

  // Logo animation
  useEffect(() => {
    if (!isLoading) return

    // Initialize with empty string
    setLogoText("")

    // Typing animation for the logo
    const fullText = "ZeroLag"
    let currentIndex = 0
    const typingDelay = 80 // Reduced from 150ms

    // Type out the text character by character
    const typingInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setLogoText((prev) => fullText.substring(0, currentIndex + 1))
        currentIndex++
      } else {
        clearInterval(typingInterval)
        // Stop the cursor blinking after typing is complete
        setTimeout(() => {
          setShowCursor(false)
        }, 300) // Reduced from 500ms
      }
    }, typingDelay)

    // Cursor blink effect - faster blinking
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 400) // Reduced from 530ms

    return () => {
      clearInterval(typingInterval)
      clearInterval(cursorInterval)
    }
  }, [isLoading])

  // Simulate loading progress
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isLoading) {
      // Start with a small initial progress
      setProgress(10)

      // Use a faster interval and larger increments
      interval = setInterval(() => {
        setProgress((prev) => {
          // More aggressive progress increments
          const increment = Math.random() * 25 + 5
          const newProgress = prev + increment

          if (newProgress >= 100) {
            clearInterval(interval)
            // Reduce the delay before fade out
            setTimeout(() => {
              setFadeOut(true)
              setTimeout(() => setIsLoading(false), 300) // Reduced from 500ms
            }, 200) // Reduced from 500ms
            return 100
          }
          return newProgress
        })
      }, 200) // Reduced from 400ms
    }

    return () => clearInterval(interval)
  }, [isLoading])

  // Canvas animation
  useEffect(() => {
    if (!canvasRef.current || !isLoading) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Create grid
    const gridSize = 40
    const rows = Math.ceil(canvas.height / gridSize)
    const cols = Math.ceil(canvas.width / gridSize)

    // Create grid lines
    const drawGrid = () => {
      ctx.strokeStyle = "rgba(12, 206, 169, 0.07)"
      ctx.lineWidth = 0.5

      // Draw horizontal lines
      for (let i = 0; i <= rows; i++) {
        const y = i * gridSize
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      // Draw vertical lines
      for (let i = 0; i <= cols; i++) {
        const x = i * gridSize
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }
    }

    // Animation loop
    let animationFrame: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw background gradient
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width / 2,
      )
      gradient.addColorStop(0, "rgba(15, 23, 42, 1)")
      gradient.addColorStop(1, "rgba(10, 15, 30, 1)")

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw grid
      drawGrid()

      animationFrame = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrame)
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [isLoading, progress])

  if (!isLoading) return null

  // Split the logo text to apply different colors
  const zeroText = logoText ? logoText.substring(0, 4) : ""
  const lagText = logoText ? logoText.substring(4) : ""

  return (
    <div
      className={`fixed inset-0 bg-background z-[100] flex flex-col items-center justify-center ${fadeOut ? "animate-fade-out" : ""}`}
    >
      {/* Canvas background */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      <div className="relative z-10 flex flex-col items-center">
        {/* Logo animation */}
        <div className="mb-16 flex flex-col items-center">
          <div className="relative w-32 h-32 mb-4">
            <div
              className={`w-full h-full transition-opacity duration-500 ${logoText.length > 0 ? "opacity-100" : "opacity-0"}`}
            >
              <img src="/images/logo.png" alt="ZeroLag Logo" className="w-full h-full object-contain" />
            </div>
          </div>
          <div className="text-3xl font-bold h-10 flex items-center">
            <span className="text-white">{zeroText}</span>
            <span className="text-primary">{lagText}</span>
            {showCursor && <span className="text-primary animate-pulse">|</span>}
          </div>
        </div>

        {/* Rectangular progress bar */}
        <div className="w-80 mb-8">
          {/* Progress bar container */}
          <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden relative">
            {/* Progress fill */}
            <div
              className="h-full bg-primary rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          {/* Progress percentage */}
          <div className="flex justify-center mt-2 text-xs">
            <span className="text-primary font-medium">{Math.round(progress)}%</span>
          </div>
        </div>

        {/* Loading text */}
        <div className="text-primary text-base font-semibold mt-4">Initializing high-performance environment</div>

        {/* Loading indicator */}
        <div className="text-gray-300 font-mono text-sm mt-4">Loading...</div>
      </div>
    </div>
  )
}

// Navbar Component
export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Function to handle smooth scrolling to sections
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      // Close mobile menu if open
      if (isMenuOpen) {
        setIsMenuOpen(false)
      }

      // Calculate header height to offset scroll position
      const headerHeight = document.querySelector("header")?.offsetHeight || 0

      // Get the section's position relative to the top of the page
      const sectionTop = section.getBoundingClientRect().top + window.pageYOffset

      // Scroll to the section with offset for the header
      window.scrollTo({
        top: sectionTop - headerHeight,
        behavior: "smooth",
      })
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/90 backdrop-blur-md py-3 shadow-md" : "py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <span className="text-2xl font-bold text-white">
            Zero<span className="text-primary">Lag</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <button
            onClick={() => scrollToSection("about")}
            className="text-gray-300 hover:text-primary transition-colors"
          >
            About Us
          </button>
          <button
            onClick={() => scrollToSection("services")}
            className="text-gray-300 hover:text-primary transition-colors"
          >
            Services
          </button>
          <button
            onClick={() => scrollToSection("process")}
            className="text-gray-300 hover:text-primary transition-colors"
          >
            Process
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="text-gray-300 hover:text-primary transition-colors"
          >
            Contact
          </button>
          <button onClick={() => scrollToSection("contact")} className="button button--calypso">
            <span>Schedule a Call</span>
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-secondary/95 backdrop-blur-md">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <button
              onClick={() => scrollToSection("about")}
              className="text-gray-300 hover:text-primary transition-colors py-2 text-left"
            >
              About Us
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className="text-gray-300 hover:text-primary transition-colors py-2 text-left"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection("process")}
              className="text-gray-300 hover:text-primary transition-colors py-2 text-left"
            >
              Process
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-gray-300 hover:text-primary transition-colors py-2 text-left"
            >
              Contact
            </button>
            <button onClick={() => scrollToSection("contact")} className="button button--calypso w-full">
              <span>Schedule a Call</span>
            </button>
          </div>
        </div>
      )}
    </header>
  )
}

// Instead, export the XLogo component so it can be imported in footer.tsx
export { XLogo }