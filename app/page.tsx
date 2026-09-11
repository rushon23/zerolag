"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import dynamic from "next/dynamic"
import MinimalNavbar from "@/components/minimal-navbar"
import Footer from "@/components/footer"
import Hero from "@/components/hero"
import About from "@/components/about"
import EnhancedServices from "@/components/enhanced-services" // Direct import for SVG animation
import Team from "@/components/team"
import { TestimonialsSection } from "@/components/testimonials" // Updated import name
import PreviousProjects from "@/components/previous-projects"

const ProcessSimple = dynamic(() => import("@/components/process-simple").then((mod) => mod.default || mod), {
  ssr: false,
})
const Contact = dynamic(() => import("@/components/contact").then((mod) => mod.default || mod), { ssr: false })

// Error boundary component
function ErrorBoundary({ children }: { children: React.ReactNode }) {
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const errorHandler = (error: ErrorEvent) => {
      console.error("Caught error:", error)
      setHasError(true)
    }

    // Add specific handler for resource loading errors
    const resourceErrorHandler = (event: Event) => {
      // Check if this is a resource loading error (img, script, etc.)
      if (
        event.target &&
        (event.target as HTMLElement).tagName &&
        ["IMG", "SCRIPT", "LINK"].includes((event.target as HTMLElement).tagName)
      ) {
        console.warn(`Resource loading warning:`, event.target)

        // Only set error state for critical resources
        if ((event.target as HTMLElement).getAttribute("data-critical") === "true") {
          setHasError(true)
        }

        // Don't prevent default or stop propagation for all resource errors
        // as this can cause issues with normal resource error handling
        return false
      }
      return false
    }

    // Update event listener setup
    window.addEventListener("error", errorHandler)
    window.addEventListener("error", resourceErrorHandler, true) // Capture phase

    return () => {
      window.removeEventListener("error", errorHandler)
      window.removeEventListener("error", resourceErrorHandler, true)
    }
  }, [])

  if (hasError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A1428]">
        <div className="text-center p-8 max-w-md">
          <h1 className="text-4xl font-bold text-white mb-4">ZeroLag</h1>
          <p className="text-gray-300 mb-6">We're experiencing a technical issue. Please try refreshing the page.</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-primary text-black px-4 py-2 rounded-md hover:bg-primary/80 transition-colors"
          >
            Refresh Page
          </button>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

export default function Home() {
  const [scrollY, setScrollY] = useState(0)
  const [windowHeight, setWindowHeight] = useState(0)
  const [isClient, setIsClient] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)

  // Set client-side state and window height
  useEffect(() => {
    try {
      setIsClient(true)

      if (typeof window !== "undefined") {
        setWindowHeight(window.innerHeight)

        // Handle window resize
        const handleResize = () => {
          setWindowHeight(window.innerHeight)
        }

        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
      }
    } catch (error) {
      console.error("Error in window height effect:", error)
    }
    return () => {}
  }, [])

  // Handle scroll events with throttling for better performance
  useEffect(() => {
    try {
      let ticking = false

      const handleScroll = () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            if (typeof window !== "undefined") {
              setScrollY(window.scrollY)
            }
            ticking = false
          })
          ticking = true
        }
      }

      if (typeof window !== "undefined") {
        window.addEventListener("scroll", handleScroll, { passive: true })
        return () => window.removeEventListener("scroll", handleScroll)
      }
    } catch (error) {
      console.error("Error in scroll effect:", error)
    }

    return () => {}
  }, [])

  // Calculate about section transform with safety checks
  const aboutTransform = isClient && windowHeight > 0 ? Math.max(0, 100 - (scrollY || 0) * (100 / windowHeight)) : 100

  // Determine if hero should be visible
  const isHeroVisible = isClient && windowHeight > 0 && (scrollY || 0) < windowHeight

  // Don't render anything during SSR to prevent hydration issues
  if (!isClient) {
    return null
  }

  return (
    <ErrorBoundary>
      <main className="min-h-screen grid-pattern animate-fade-in">
        <MinimalNavbar />

        {/* Hero Section - Fixed position but only visible until fully overlapped */}
        {isHeroVisible && (
          <div ref={heroRef} className="fixed top-0 left-0 w-full h-screen z-10">
            <Hero />
          </div>
        )}

        {/* About Section - Slides up over hero as user scrolls */}
        <div
          ref={aboutRef}
          className="relative min-h-screen z-20 bg-gray-900/95 backdrop-blur-sm"
          style={{
            transform: `translateY(${aboutTransform}vh)`,
            marginTop: "100vh", // Start after hero
          }}
        >
          <About />
        </div>

        {/* The rest of the sections - Positioned after the sticky container */}
        <div className="relative z-20">
          {" "}
          {/* Ensure this content appears above the About section once scrolled */}
          {/* 3. Previous Projects Section */}
          <section id="projects">
            <PreviousProjects />
          </section>

          {/* 4. Services Section */}
          <section id="services" className="relative z-30">
            <EnhancedServices />
          </section>

          {/* 5. Testimonials Section */}
          <section id="testimonials">
            <TestimonialsSection />
          </section>

          {/* 6. Process Section */}
          <section id="process">
            <ProcessSimple />
          </section>

          {/* 7. Team Section */}
          <section id="team">
            <Team />
          </section>

          {/* 8. Contact Section */}
          <section id="contact">
            <Contact />
          </section>

          {/* 9. Footer */}
          <Footer />
        </div>
      </main>
    </ErrorBoundary>
  )
}
