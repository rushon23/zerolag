"use client"

import { useRef, useState, useEffect, useMemo } from "react"
import { useInView } from "framer-motion"
import { Code, Bot, Smartphone, Cpu, Rocket, Wrench, Layout, Layers, MessageSquare, ChevronLeft, ChevronRight } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"

// --- Configuration ---
const SVG_WIDTH = 1200
const SVG_HEIGHT = 700
const CENTER_X = SVG_WIDTH / 2
const CENTER_Y = SVG_HEIGHT / 2
const ELLIPSE_RX = SVG_WIDTH * 0.4
const ELLIPSE_RY = SVG_HEIGHT * 0.38
const NODE_RADIUS = 48
const LABEL_OFFSET_Y_BELOW = 63
const LABEL_OFFSET_Y_ABOVE = -63
const AUTO_CYCLE_INTERVAL = 4000
const LOADING_ANIMATION_DURATION = 4000 // Total animation duration
const FINAL_LOGO_SIZE = 75 // Final logo size in pixels

// Background effect configuration
const PARTICLE_COUNT = 15
const PARTICLE_MAX_SIZE = 120
const PARTICLE_MIN_SIZE = 40
const PARTICLE_LIFETIME = 8000 // ms
const PARTICLE_SPAWN_INTERVAL = 1000 // ms
const PARTICLE_COLORS = ["rgba(12, 206, 169, 0.03)", "rgba(12, 206, 169, 0.05)", "rgba(12, 206, 169, 0.02)"]

// Helper functions to calculate where lines should start (at the edge of the center circle)
const calculateLineStartX = (centerX: number, centerY: number, endX: number, endY: number, radius: number) => {
  const angle = Math.atan2(endY - centerY, endX - centerX)
  return centerX + radius * Math.cos(angle)
}

const calculateLineStartY = (centerX: number, centerY: number, endX: number, endY: number, radius: number) => {
  const angle = Math.atan2(endY - centerY, endX - centerX)
  return centerY + radius * Math.sin(angle)
}

// Particle class for background effects
class Particle {
  x: number
  y: number
  size: number
  color: string
  opacity: number
  createdAt: number
  lifetime: number

  constructor(x: number, y: number, size: number, color: string, lifetime: number) {
    this.x = x
    this.y = y
    this.size = size
    this.color = color
    this.opacity = 0
    this.createdAt = Date.now()
    this.lifetime = lifetime
  }

  isExpired(): boolean {
    return Date.now() - this.createdAt > this.lifetime
  }

  update(): void {
    const age = Date.now() - this.createdAt
    const progress = age / this.lifetime

    // Fade in during first 20% of lifetime, fade out during last 30%
    if (progress < 0.2) {
      this.opacity = progress * 5 // Fade in
    } else if (progress > 0.7) {
      this.opacity = (1 - progress) * 3.33 // Fade out
    } else {
      this.opacity = 1
    }
  }

  draw(ctx: CanvasRenderingContext2D): void {
    const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size)
    const colorWithOpacity = this.color.replace(/[\d.]+\)$/g, `${this.opacity})`)
    gradient.addColorStop(0, colorWithOpacity)
    gradient.addColorStop(1, "rgba(12, 206, 169, 0)")

    ctx.beginPath()
    ctx.fillStyle = gradient
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fill()
  }
}

export default function EnhancedServices() {
  const containerRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const svgContainerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number | null>(null)
  const particlesRef = useRef<Particle[]>([])
  const lastParticleSpawnRef = useRef<number>(0)

  // Using framer-motion's useInView for high-performance viewport detection
  const isInView = useInView(containerRef, {
    once: false,
    margin: "-100px 0px",
    amount: 0.3, // Trigger when 30% of the element is in view
  })

  // State management
  const [activeService, setActiveService] = useState(0)
  const [hoveredNode, setHoveredNode] = useState<number | null>(null)
  const [isClient, setIsClient] = useState(false)
  const [isAutoScrollPaused, setIsAutoScrollPaused] = useState(false)
  const isMobile = useMediaQuery("(max-width: 768px)")
  const [startNodeAnimation, setStartNodeAnimation] = useState(false)
  const [cursorText, setCursorText] = useState("")
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoading, setIsLoading] = useState(false)

  // Hover states for specific elements
  const [isHoveringLogo, setIsHoveringLogo] = useState(false)

  // Define services data inside the component
  const initialServices = [
    {
      id: 0,
      title: "Full-Stack Apps",
      icon: <Layers className="h-full w-full text-primary" />,
      description:
        "Robust, scalable full-stack applications using modern tech like React, Next.js, Node.js. Designed for high traffic and complex logic.",
      shortDescription: "Scalable applications built with modern technologies",
      benefits: ["High performance", "Scalable architecture", "Modern tech stack"],
    },
    {
      id: 1,
      title: "Custom Software",
      icon: <Code className="h-full w-full text-primary" />,
      description:
        "Tailored software solutions for specific business needs. Intuitive, efficient software to solve unique challenges and drive growth.",
      shortDescription: "Tailored solutions for your specific business needs",
      benefits: ["Customized workflows", "Business-specific features", "Competitive advantage"],
    },
    {
      id: 2,
      title: "Landing Pages",
      icon: <Layout className="h-full w-full text-primary" />,
      description:
        "High-converting landing pages to capture leads. Stunning visuals, strategic layouts, and compelling copy to maximize marketing ROI.",
      shortDescription: "High-converting pages to capture leads effectively",
      benefits: ["Increased conversion rates", "Professional design", "SEO optimized"],
    },
    {
      id: 3,
      title: "AI Agents",
      icon: <Bot className="h-full w-full text-primary" />,
      description:
        "Intelligent AI agents automating complex tasks. Agents learn, improve, and integrate seamlessly with existing systems.",
      shortDescription: "Intelligent automation for complex business tasks",
      benefits: ["24/7 operation", "Continuous learning", "Reduced manual work"],
    },
    {
      id: 4,
      title: "Chatbots",
      icon: <MessageSquare className="h-full w-full text-primary" />,
      description:
        "Engaging conversational chatbots for instant support. Using NLP to understand context and deliver personalized responses.",
      shortDescription: "Instant customer support with natural language processing",
      benefits: ["Instant responses", "Personalized interactions", "Reduced support costs"],
    },
    {
      id: 5,
      title: "Mobile Apps",
      icon: <Smartphone className="h-full w-full text-primary" />,
      description:
        "Native and cross-platform iOS/Android apps. Intuitive, feature-rich applications delivering exceptional user experiences.",
      shortDescription: "Intuitive, feature-rich mobile applications",
      benefits: ["Cross-platform compatibility", "Native performance", "Engaging UX"],
    },
    {
      id: 6,
      title: "Custom AI Models",
      icon: <Cpu className="h-full w-full text-primary" />,
      description:
        "Tailored AI models trained on your data. Leveraging cutting-edge ML for accurate, actionable business insights.",
      shortDescription: "AI models trained specifically on your business data",
      benefits: ["Accurate predictions", "Business-specific insights", "Competitive intelligence"],
    },
    {
      id: 7,
      title: "Maintenance",
      icon: <Wrench className="h-full w-full text-primary" />,
      description:
        "Ongoing support to keep applications running smoothly. Regular updates, security patches, and performance optimizations.",
      shortDescription: "Ongoing support and optimization for your applications",
      benefits: ["Reduced downtime", "Security updates", "Performance optimization"],
    },
    {
      id: 8,
      title: "Deployment",
      icon: <Rocket className="h-full w-full text-primary" />,
      description:
        "Seamless deployment to production. Handling infrastructure complexities for reliable, scalable, and secure deployments.",
      shortDescription: "Reliable, secure deployment to production environments",
      benefits: ["Automated processes", "Scalable infrastructure", "Minimal downtime"],
    },
  ]

  // Set isClient to true after component mounts
  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (isInView && !startNodeAnimation) {
      setStartNodeAnimation(true)
    }
  }, [isInView, startNodeAnimation])

  useEffect(() => {
    if (isHoveringLogo) {
      setCursorText("ZeroLag")
    } else if (hoveredNode !== null) {
      setCursorText("Services")
    } else {
      setCursorText("")
    }
  }, [isHoveringLogo, hoveredNode])

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY })
    }

    const container = containerRef.current
    container?.addEventListener("mousemove", handleMouseMove)

    return () => {
      container?.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  // Memoize services data for better performance
  const services = useMemo(() => {
    return initialServices.map((service, index) => {
      const angle = (index / initialServices.length) * 2 * Math.PI - Math.PI / 2
      const x = CENTER_X + ELLIPSE_RX * Math.cos(angle)
      const y = CENTER_Y + ELLIPSE_RY * Math.sin(angle)
      return { ...service, x, y }
    })
  }, [initialServices])

  // Initialize and manage background animation
  useEffect(() => {
    if (!isClient || !isInView || !canvasRef.current) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    // Set canvas dimensions to match container
    const resizeCanvas = () => {
      if (svgContainerRef.current && canvas) {
        const rect = svgContainerRef.current.getBoundingClientRect()
        canvas.width = rect.width
        canvas.height = rect.height
      }
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)
    // Animation function
    const animate = () => {
      if (!ctx || !canvas) return
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      // Spawn new particles at random intervals
      const now = Date.now()
      if (
        now - lastParticleSpawnRef.current > PARTICLE_SPAWN_INTERVAL &&
        particlesRef.current.length < PARTICLE_COUNT &&
        !isLoading
      ) {
        // Create a new particle at a random position
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        const size = PARTICLE_MIN_SIZE + Math.random() * (PARTICLE_MAX_SIZE - PARTICLE_MIN_SIZE)
        const color = PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)]
        particlesRef.current.push(new Particle(x, y, size, color, PARTICLE_LIFETIME))
        lastParticleSpawnRef.current = now
      }
      // Update and draw particles
      particlesRef.current.forEach((particle) => {
        particle.update()
        particle.draw(ctx)
      })
      // Remove expired particles
      particlesRef.current = particlesRef.current.filter((particle) => !particle.isExpired())
      // Continue animation loop
      animationFrameRef.current = requestAnimationFrame(animate)
    }
    // Start animation
    animationFrameRef.current = requestAnimationFrame(animate)
    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isClient, isInView, isLoading])

  // --- Handlers for user interaction ---

  // Handle clicking on a service node
  const handleNodeClick = (index: number) => {
    setActiveService(index)
    setIsAutoScrollPaused(true) // Pause auto-scrolling on interaction
  }

  // Handle hovering over a service node
  const handleNodeHover = (index: number | null) => {
    setHoveredNode(index)
  }

  // Auto-cycle through services
  useEffect(() => {
    // Only run auto-cycle when in view and not loading
    if (!isClient || !isInView || hoveredNode !== null || isAutoScrollPaused) return

    // Safety check for services array
    if (!services || services.length === 0) return

    const interval = setInterval(() => {
      setActiveService((prev) => (prev + 1) % services.length)
    }, AUTO_CYCLE_INTERVAL)

    return () => clearInterval(interval)
  }, [isClient, isInView, hoveredNode, services, isAutoScrollPaused])

  // Ensure activeService is always valid
  useEffect(() => {
    if (services && services.length > 0 && (activeService >= services.length || activeService < 0)) {
      setActiveService(0)
    }
  }, [activeService, services])

  // Safely get current service with fallback
  const currentService = useMemo(() => {
    try {
      // Check if services array exists and has items
      if (!Array.isArray(services) || services.length === 0) {
        return (
          initialServices[0] || {
            id: 0,
            title: "Service",
            icon: null,
            description: "Service description",
            shortDescription: "",
            benefits: [],
          }
        )
      }

      // Check if activeService index is valid
      if (activeService < 0 || activeService >= services.length) {
        return services[0]
      }

      return services[activeService]
    } catch (error) {
      console.error("Error getting current service:", error)
      return {
        id: 0,
        title: "Service",
        icon: null,
        description: "Service description",
        shortDescription: "",
        benefits: [],
      }
    }
  }, [services, activeService, initialServices])

  // Simplified SVG rendering for preview
  const renderSVG = () => {
    if (!services || services.length === 0) {
      return (
        <div className="h-[300px] flex items-center justify-center">
          <div className="text-primary">No services available to display</div>
        </div>
      )
    }

    // Mobile version of the SVG - creative card-based approach
    if (isMobile) {
      return (
        <div className="relative min-h-[600px] flex flex-col items-center justify-start overflow-hidden py-8">
          {/* ZeroLag Services Header with glow effect */}
          <div className="relative mb-8 z-10">
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full"></div>
            <div className="bg-gray-900/80 backdrop-blur-sm px-6 py-3 rounded-full border border-primary/30 shadow-lg shadow-primary/10 relative">
              <h3 className="text-xl font-bold text-white">
                ZeroLag <span className="text-primary">Services</span>
              </h3>
            </div>
          </div>

          {/* 3D Card Stack */}
          <div className="relative w-full max-w-xs h-[400px] perspective-1000">
            {services.map((service, index) => {
              const isActive = activeService === service.id
              // Calculate position in the stack
              const zIndex = isActive ? 50 : services.length - Math.abs(activeService - index)
              const opacity = isActive ? 1 : Math.max(0.5, 1 - Math.abs(activeService - index) * 0.2)
              const scale = isActive ? 1 : Math.max(0.85, 1 - Math.abs(activeService - index) * 0.05)
              const translateY = isActive ? 0 : Math.abs(activeService - index) * 10
              const translateZ = isActive ? 0 : -Math.abs(activeService - index) * 20
              const rotateX = isActive ? 0 : index < activeService ? -5 : 5

              return (
                <div
                  key={`mobile-service-card-${service.id}`}
                  className={`absolute inset-0 w-full rounded-xl border transition-all duration-500 ease-out ${
                    isActive ? "border-primary/50 shadow-lg shadow-primary/10" : "border-gray-700/50"
                  }`}
                  style={{
                    zIndex,
                    opacity,
                    transform: `translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) scale(${scale})`,
                    background: `radial-gradient(circle at 50% 30%, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.98))`,
                  }}
                  onClick={() => handleNodeClick(service.id)}
                >
                  <div className="p-6 h-full flex flex-col">
                    {/* Service Icon with glow */}
                    <div className="mb-4 relative">
                      <div className="absolute inset-0 bg-primary/10 blur-md rounded-full"></div>
                      <div className="bg-gray-900/80 p-3 rounded-full inline-flex items-center justify-center relative border border-primary/20">
                        <div className="h-6 w-6 text-primary">{service.icon}</div>
                      </div>
                    </div>

                    {/* Service Content */}
                    <h4 className="text-lg font-semibold text-primary mb-2">{service.title}</h4>
                    <p className="text-gray-300 text-sm mb-4 flex-grow">{service.shortDescription}</p>

                    {/* Benefits Tags */}
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {service.benefits.map((benefit, idx) => (
                        <span
                          key={`mobile-benefit-${service.id}-${idx}`}
                          className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary/90 border border-primary/20 benefit-tag"
                        >
                          {benefit}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom indicator showing position in stack */}
                  <div className="absolute bottom-3 left-0 right-0 flex justify-center space-x-1">
                    {services.map((_, idx) => (
                      <div
                        key={`indicator-${idx}`}
                        className={`w-1.5 h-1.5 rounded-full ${idx === activeService ? "bg-primary" : "bg-gray-600"}`}
                      ></div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-between w-full max-w-xs mt-6 px-4">
            <button
              onClick={() => {
                const newIndex = activeService > 0 ? activeService - 1 : services.length - 1
                handleNodeClick(newIndex)
              }}
              className="w-10 h-10 rounded-full bg-gray-800/80 border border-gray-700 flex items-center justify-center text-gray-300 hover:text-primary hover:border-primary/50 transition-colors"
              aria-label="Previous service"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              onClick={() => {
                const newIndex = activeService < services.length - 1 ? activeService + 1 : 0
                handleNodeClick(newIndex)
              }}
              className="w-10 h-10 rounded-full bg-gray-800/80 border border-gray-700 flex items-center justify-center text-gray-300 hover:text-primary hover:border-primary/50 transition-colors"
              aria-label="Next service"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Add swipe gesture support */}
          <style jsx>{`
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(10px); }
              to { opacity: 1; transform: translateY(0); }
            }
            
            .perspective-1000 {
              perspective: 1000px;
            }
          `}</style>
        </div>
      )
    }

    // Calculate the initial logo size to fill the container height
    const initialLogoSize = SVG_HEIGHT * 0.8
    // Calculate the scale factor from initial to final size
    const scaleFactor = FINAL_LOGO_SIZE / initialLogoSize
    // Calculate the half size for proper positioning
    const initialHalfSize = initialLogoSize / 2

    // Desktop version with loading animation
    return (
      <div
        ref={svgContainerRef}
        className="relative h-[420px] flex items-center justify-center overflow-hidden max-w-6xl mx-auto"
      >
        {/* Background canvas for dynamic effects */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0 max-w-full max-h-full" style={{display: 'block', width: '100%', height: '100%', borderRadius: '0.75rem'}} />

        <svg
          ref={svgRef}
          width="100%"
          height="100%"
          viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="overflow-visible w-full h-full bg-gradient-to-b from-gray-800/30 to-gray-900/50 rounded-lg border border-gray-800 relative z-10"
        >
          {/* Definitions */}
          <defs>
            <radialGradient id="centralGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
              <stop offset="0%" stopColor="#1E293B" />
              <stop offset="100%" stopColor="#0F172A" />
            </radialGradient>
            <radialGradient id="nodeGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
              <stop offset="0%" stopColor="#1E293B" />
              <stop offset="100%" stopColor="#0F172A" />
            </radialGradient>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
              <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#0CCEA9" floodOpacity="0.5" />
            </filter>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0CCEA9" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#0CCEA9" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#0CCEA9" stopOpacity="0.2" />
            </linearGradient>
            <filter id="pulse" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
              <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 18 -7" result="glow" />
              <feComposite in="SourceGraphic" in2="glow" operator="over" />
            </filter>
            <filter id="iconGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feFlood floodColor="#0CCEA9" floodOpacity="0.3" result="glowColor" />
              <feComposite in="glowColor" in2="blur" operator="in" result="softGlow" />
              <feComposite in="SourceGraphic" in2="softGlow" operator="over" />
            </filter>

            {/* Loading animation gradients */}
            <linearGradient id="loadingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0CCEA9" />
              <stop offset="50%" stopColor="#1E293B" />
              <stop offset="100%" stopColor="#0CCEA9" />
            </linearGradient>
            <filter id="loadingGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="#0CCEA9" floodOpacity="0.6" />
            </filter>

            {/* Logo mask for reveal animation */}
            <mask id="logoRevealMask">
              <rect width={SVG_WIDTH} height={SVG_HEIGHT} fill="white">
                <animate attributeName="y" from={SVG_HEIGHT} to="0" dur="1s" begin="0s" fill="freeze" />
              </rect>
            </mask>

            {/* Clip path for logo animation */}
            <clipPath id="logoClipPath">
              <circle cx={CENTER_X} cy={CENTER_Y} r="0">
                <animate
                  attributeName="r"
                  from="0"
                  to={Math.max(SVG_WIDTH, SVG_HEIGHT)}
                  dur="1s"
                  begin="1.5s"
                  fill="freeze"
                />
              </circle>
            </clipPath>
          </defs>

          {/* Main Content */}
          <g className="main-content">
            {/* Central hub with logo */}
            <g>
              {/* Central node circle */}
              <circle
                cx={CENTER_X}
                cy={CENTER_Y}
                r="75"
                fill="url(#centralGradient)"
                stroke="#0CCEA9"
                strokeWidth="2.5"
                style={{ filter: "url(#glow)" }}
                className="hover:stroke-[#0CCEA9] hover:stroke-[3px] transition-all duration-300"
                onMouseEnter={() => setIsHoveringLogo(true)}
                onMouseLeave={() => setIsHoveringLogo(false)}
              >
                <animate attributeName="opacity" values="0.8;1;0.8" dur="4s" repeatCount="indefinite" />
              </circle>

              {/* ZeroLag Logo in center */}
              <g
                transform={`translate(${CENTER_X}, ${CENTER_Y})`}
                style={{ transformOrigin: "center" }}
                onMouseEnter={() => setIsHoveringLogo(true)}
                onMouseLeave={() => setIsHoveringLogo(false)}
              >
                <image
                  href="/images/zerolag-logo.png"
                  x={-FINAL_LOGO_SIZE / 2}
                  y={-FINAL_LOGO_SIZE / 2}
                  width={FINAL_LOGO_SIZE}
                  height={FINAL_LOGO_SIZE}
                  preserveAspectRatio="xMidYMid meet"
                  opacity="0.9"
                  style={{ cursor: "pointer" }}
                />
              </g>
            </g>

            {/* Pulse animation */}
            <circle
              cx={CENTER_X}
              cy={CENTER_Y}
              r="85"
              stroke="#0CCEA9"
              strokeWidth="1"
              fill="none"
              strokeDasharray="4 8"
            >
              {/* Only animate when in view to save resources */}
              {isInView && (
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from={`0 ${CENTER_X} ${CENTER_Y}`}
                  to={`360 ${CENTER_X} ${CENTER_Y}`}
                  dur="30s"
                  repeatCount="indefinite"
                />
              )}
            </circle>

            {/* Connection lines and nodes */}
            {services.map((service, index) => {
              const isActive = activeService === service.id || hoveredNode === service.id
              // Calculate delay for staggered animation
              const delay = index * 0.15

              return (
                <g
                  key={`service-group-${service.id}`}
                  className="service-group"
                  style={
                    startNodeAnimation
                      ? { animation: `fadeIn 0.8s ease-out ${delay}s forwards`, opacity: 0 }
                      : { opacity: 0 }
                  }
                >
                  {/* Base connection line that stops at the edge of center circle */}
                  <line
                    x1={calculateLineStartX(CENTER_X, CENTER_Y, service.x, service.y, 75)}
                    y1={calculateLineStartY(CENTER_X, CENTER_Y, service.x, service.y, 75)}
                    x2={service.x}
                    y2={service.y}
                    stroke={isActive ? "#0CCEA9" : "#283f54"}
                    strokeWidth={isActive ? "3.5" : "2"}
                    opacity={isActive ? "1" : "0.6"}
                    style={{
                      transition: "stroke 0.3s ease, stroke-width 0.3s ease, opacity 0.3s ease",
                    }}
                  />

                  {/* Animated glow line for active service that stops at the edge of center circle */}
                  {isActive && isInView && (
                    <line
                      x1={calculateLineStartX(CENTER_X, CENTER_Y, service.x, service.y, 75)}
                      y1={calculateLineStartY(CENTER_X, CENTER_Y, service.x, service.y, 75)}
                      x2={service.x}
                      y2={service.y}
                      stroke="url(#lineGradient)"
                      strokeWidth="6"
                      opacity="0.6"
                      style={{ filter: "url(#pulse)" }}
                    >
                      <animate attributeName="opacity" values="0.2;0.6;0.2" dur="2s" repeatCount="indefinite" />
                    </line>
                  )}

                  {/* Service node */}
                  <g
                    transform={`translate(${service.x}, ${service.y})`}
                    onMouseEnter={() => {
                      handleNodeHover(service.id)
                    }}
                    onMouseLeave={() => {
                      handleNodeHover(null)
                    }}
                    onClick={() => {
                      handleNodeClick(service.id)
                    }}
                    style={{ cursor: "pointer" }}
                    className={`service-node service-node-${service.id}`}
                  >
                    {/* Node circle with animation */}
                    <circle
                      cx="0"
                      cy="0"
                      r={isActive ? NODE_RADIUS * 1.1 : NODE_RADIUS}
                      fill="url(#nodeGradient)"
                      stroke={isActive ? "#0CCEA9" : "rgba(12, 206, 169, 0.4)"}
                      strokeWidth={isActive ? "3" : "1.5"}
                      className="transition-all duration-300 hover:stroke-[#0CCEA9] hover:stroke-[3px]"
                    >
                      {isActive && isInView && (
                        <animate
                          attributeName="r"
                          values={`${NODE_RADIUS};${NODE_RADIUS * 1.1};${NODE_RADIUS}`}
                          dur="3s"
                          repeatCount="indefinite"
                        />
                      )}
                    </circle>

                    {/* Service icon */}
                    <foreignObject
                      x={-NODE_RADIUS * 0.45}
                      y={-NODE_RADIUS * 0.45}
                      width={NODE_RADIUS * 0.9}
                      height={NODE_RADIUS * 0.9}
                      style={{ overflow: "visible", pointerEvents: "none" }}
                    >
                      <div className="flex items-center justify-center h-full w-full">
                        <div
                          className={`h-full w-full ${isActive ? "text-primary" : "text-primary/70"}`}
                          style={{
                            transition: "color 0.3s ease, filter 0.3s ease",
                            filter: isActive ? "drop-shadow(0 0 5px rgba(12, 206, 169, 0.4))" : "none",
                            transform: "scale(1)",
                          }}
                        >
                          {service.icon}
                        </div>
                      </div>
                    </foreignObject>

                    {/* Service title */}
                    <text
                      x="0"
                      y={service.y > CENTER_Y + 20 ? LABEL_OFFSET_Y_BELOW : LABEL_OFFSET_Y_ABOVE}
                      textAnchor="middle"
                      fill={isActive ? "#FFFFFF" : "#a0aec0"}
                      fontSize="16"
                      fontWeight={isActive ? "600" : "400"}
                      className="pointer-events-none transition-all duration-300"
                      style={{
                        transition: "fill 0.3s ease, font-weight 0.3s ease",
                      }}
                    >
                      {service.title}
                    </text>
                  </g>
                </g>
              )
            })}
          </g>
        </svg>
        <style jsx>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          /* Add CSS-only hover effects for service nodes */
          .service-node:hover circle {
            stroke: #0CCEA9;
            stroke-width: 3px;
            filter: drop-shadow(0 0 8px rgba(12, 206, 169, 0.5));
            transform: scale(1.05);
          }
          
          .service-node:hover text {
            fill: white;
            font-weight: 600;
          }

          .bubble-anim {
            animation: bubble-pop 2.5s ease-in-out infinite alternate;
          }
          @keyframes bubble-pop {
            0% { opacity: 0; transform: scale(0.7); }
            10% { opacity: 0.7; transform: scale(1.05); }
            80% { opacity: 0.7; transform: scale(1); }
            100% { opacity: 0; transform: scale(0.7); }
          }
        `}</style>
      </div>
    )
  }

  // Render service details panel separately from SVG
  const renderServiceDetails = () => {
    if (!currentService) return null

    return (
      <div className="w-full max-w-2xl mx-auto px-4 mt-2 relative">
        {/* Navigation buttons outside the card, now using a flex container for perfect symmetry */}
        <div className="hidden md:flex absolute inset-y-0 -inset-x-12 items-center justify-between pointer-events-none">
          <button
            onClick={() => {
              const newIndex = activeService > 0 ? activeService - 1 : services.length - 1
              handleNodeClick(newIndex)
            }}
            className="w-10 h-10 rounded-full bg-gray-800/90 border border-gray-700 flex items-center justify-center text-gray-300 hover:text-primary hover:border-primary/50 transition-colors shadow-lg hover:shadow-primary/10 pointer-events-auto"
            aria-label="Previous service"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => {
              const newIndex = activeService < services.length - 1 ? activeService + 1 : 0
              handleNodeClick(newIndex)
            }}
            className="w-10 h-10 rounded-full bg-gray-800/90 border border-gray-700 flex items-center justify-center text-gray-300 hover:text-primary hover:border-primary/50 transition-colors shadow-lg hover:shadow-primary/10 pointer-events-auto"
            aria-label="Next service"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <div
          className="bg-gray-800/60 backdrop-blur-md rounded-xl p-3 md:p-4 border border-gray-700 shadow-xl transition-all duration-500"
          style={{
            boxShadow: activeService !== null ? "0 0 30px rgba(12, 206, 169, 0.1)" : "none",
            borderColor: activeService !== null ? "rgba(12, 206, 169, 0.3)" : "rgba(75, 85, 99, 0.5)",
            animation: isInView ? "fadeIn 0.5s ease-out forwards" : "none",
            opacity: isInView ? 1 : 0,
          }}
        >
          <div
            className="flex items-start"
            key={`desc-${currentService.id}`}
            style={{
              animation: "fadeIn 0.5s ease-out forwards",
            }}
          >
            <div className="flex-shrink-0 bg-gray-900/80 p-2 rounded-lg mr-4 backdrop-blur-sm border border-primary/20">
              {currentService.icon && <div className="h-6 w-6 text-primary">{currentService.icon}</div>}
            </div>
            <div className="flex-grow">
              <h3 className="text-xl md:text-2xl font-semibold text-primary mb-2">{currentService.title}</h3>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed">{currentService.description}</p>

              {/* Benefits list */}
              {currentService.benefits && currentService.benefits.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {currentService.benefits.map((benefit, idx) => (
                    <span
                      key={`benefit-${idx}`}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20 benefit-tag"
                      style={{
                        animation: `fadeIn 0.5s ease-out ${0.1 * idx}s forwards`,
                        opacity: 0,
                      }}
                    >
                      {benefit}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <section
      id="services"
      className="py-20 lg:py-32 xl:py-40 bg-[#0f1a25] text-white relative overflow-hidden"
      ref={containerRef}
    >
      {/* Background patterns & Gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                <path d="M 0 0 L 40 0" fill="none" stroke="#0CCEA9" strokeWidth="0.5" strokeOpacity="0.3" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] rounded-full bg-primary opacity-5 blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] rounded-full bg-primary opacity-5 blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 md:px-6 pt-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 lg:mb-32">
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
            style={{
              animation: "fadeIn 0.8s ease-out forwards",
            }}
          >
            Our <span className="text-primary">Services</span>
          </h2>
          <p
            className="text-gray-300 text-lg md:text-xl"
            style={{
              animation: "fadeIn 0.8s ease-out 0.2s forwards",
              opacity: 0,
            }}
          >
            We offer a comprehensive suite of services to help you build, deploy, and maintain cutting-edge applications
            and AI solutions.
          </p>
        </div>

        {/* SVG Visualization with dynamic loading state */}
        {renderSVG()}

        {/* Service details rendered OUTSIDE the SVG container */}
        { !isMobile && renderServiceDetails() }
      </div>

      {/* Render cursor text above the mouse and custom cursor only on desktop */}
      {isInView && !isMobile && cursorText && (
        <div
          className="pointer-events-none fixed z-50 transition-all duration-150 ease-out bg-gray-900/80 px-2 py-0.5 rounded-md border border-primary/30 text-primary text-xs font-medium"
          style={{
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y - 10}px`,
            transform: "translate(-50%, -100%)",
            backdropFilter: "blur(4px)",
            boxShadow: "0 0 10px rgba(12, 206, 169, 0.3)",
          }}
        >
          {cursorText}
        </div>
      )}
      {/* Custom cursor only on desktop */}
      {isInView && !isMobile && (
        <div
          id="services-cursor"
          className="fixed w-8 h-8 pointer-events-none z-[99999]"
          style={{ visibility: "hidden" }}
        >
          <div className="absolute inset-0 rounded-full bg-primary opacity-70 shadow-lg shadow-primary/30"></div>
        </div>
      )}

      {/* Pure JS implementation for cursor tracking, only on desktop */}
      {!isMobile && (
        <script
          dangerouslySetInnerHTML={{
            __html: `
      document.addEventListener('DOMContentLoaded', function() {
        const servicesSection = document.getElementById('services');
        const cursor = document.getElementById('services-cursor');
        
        if (!servicesSection || !cursor) return;
        
        // Make custom cursor visible only in services section
        servicesSection.addEventListener('mouseenter', function() {
          cursor.style.visibility = 'visible';
        });
        
        servicesSection.addEventListener('mouseleave', function() {
          cursor.style.visibility = 'hidden';
        });
        
        // Update cursor position
        document.addEventListener('mousemove', function(e) {
          // Only update if cursor is visible (in services section)
          if (cursor.style.visibility === 'visible') {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            cursor.style.transform = 'translate(-50%, -50%)';
            
            // Check if hovering over interactive element
            const target = e.target;
            const isInteractive = 
              target.closest('.service-node') || 
              target.closest('button') || 
              target.closest('.bg-gray-800\\/60') || 
              target.closest('.benefit-tag');
            
            if (isInteractive) {
              cursor.querySelector('div').style.opacity = '0.9';
              cursor.querySelector('div').style.transform = 'scale(1.2)';
            } else {
              cursor.querySelector('div').style.opacity = '0.7';
              cursor.querySelector('div').style.transform = 'scale(1)';
            }
          }
        });
        
        // Add click effect
        document.addEventListener('mousedown', function() {
          if (cursor.style.visibility === 'visible') {
            cursor.querySelector('div').style.transform = 'scale(0.8)';
          }
        });
        
        document.addEventListener('mouseup', function() {
          if (cursor.style.visibility === 'visible') {
            cursor.querySelector('div').style.transform = 'scale(1)';
          }
        });
      });
    `,
          }}
        />
      )}
    </section>
  )
}
