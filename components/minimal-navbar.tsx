"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

// Import the Logo component at the top of the file:
import { Logo } from "./logo"

// Define navigation items and scroll-spy order to prevent inconsistencies
const NAV_ITEMS = ["previous-projects", "services", "testimonials", "contact"]
const SCROLL_SPY_SECTIONS = ["services", "previous-projects", "testimonials", "contact"]

export default function MinimalNavbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") return

    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }

      // Determine active section using the defined order
      const sections = SCROLL_SPY_SECTIONS
      let currentSection = null

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 150 && rect.bottom >= 150) {
            currentSection = section
            break
          }
        }
      }

      setActiveSection(currentSection)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    if (typeof document === "undefined") return

    const section = document.getElementById(sectionId)
    if (section) {
      if (isMenuOpen) {
        setIsMenuOpen(false)
      }

      setActiveSection(sectionId)

      const header = document.querySelector("header")
      const headerHeight = header ? header.offsetHeight : 0
      const sectionTop = section.getBoundingClientRect().top + (window.pageYOffset || window.scrollY || 0)

      window.scrollTo({
        top: sectionTop - headerHeight,
        behavior: "smooth",
      })
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/90 backdrop-blur-md py-2 md:py-3 shadow-md" : "py-3 md:py-4 lg:py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Replace it with: */}
        <Link href="/" className="flex items-center">
          <Logo size="large" imageOnly={true} className="mr-2" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
          {NAV_ITEMS.map((section) => (
            <NavItem
              key={section}
              label={section === "previous-projects" ? "Our Projects" : section.replace("-", " ")}
              isActive={activeSection === section}
              onClick={() => scrollToSection(section)}
            />
          ))}

          <a
            href="https://cal.com/zerolag/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-transparent text-white border-2 border-primary px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base rounded-md hover:bg-primary/20 transition-colors inline-block"
          >
            Schedule a Call
          </a>
        </nav>

        {/* Mobile Menu Button with improved X icon */}
        <button
          className="md:hidden text-white p-2 rounded-md hover:bg-secondary/50 active:bg-secondary/70 transition-colors relative"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          <div className="w-[22px] h-[22px] relative flex items-center justify-center">
            {/* Menu Icon Bars with improved X transformation */}
            <span
              className={`absolute left-0 w-full h-[2px] bg-white rounded-full transform transition-all duration-300 ${
                isMenuOpen ? "top-[10px] rotate-45" : "top-[2px]"
              }`}
            />
            <span
              className={`absolute top-[10px] left-0 w-full h-[2px] bg-white rounded-full transition-all duration-300 ${
                isMenuOpen ? "opacity-0 scale-x-0" : "opacity-100 scale-x-100"
              }`}
            />
            <span
              className={`absolute left-0 w-full h-[2px] bg-white rounded-full transform transition-all duration-300 ${
                isMenuOpen ? "top-[10px] -rotate-45" : "bottom-[2px]"
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-secondary/95 backdrop-blur-md" role="menu" aria-label="Mobile navigation">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-3">
            {NAV_ITEMS.map((section) => (
              <div className="flex justify-start" key={section}>
                <MobileNavItem
                  label={section === "previous-projects" ? "Our Projects" : section.replace("-", " ")}
                  isActive={activeSection === section}
                  onClick={() => scrollToSection(section)}
                />
              </div>
            ))}

            <div className="flex justify-start">
              <MobileNavItem
                label="Schedule a Call"
                isSpecial={true}
                onClick={() => {
                  window.open("https://cal.com/zerolag/30min", "_blank")
                }}
              />
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

// Dedicated NavItem component with guaranteed hover effect
function NavItem({
  label,
  isActive = false,
  onClick,
  mobile = false,
}: {
  label: string
  isActive?: boolean
  onClick: () => void
  mobile?: boolean
}) {
  const [isHovering, setIsHovering] = useState(false)
  const [isTouched, setIsTouched] = useState(false)

  // Handle touch events for mobile version
  const handleTouchStart = () => {
    setIsTouched(true)
  }

  const handleTouchEnd = () => {
    // Delay resetting the touch state to allow the animation to complete
    setTimeout(() => setIsTouched(false), 300)
  }

  // Determine text color with better contrast
  const textColor = isActive ? "#0CCEA9" : "#FFFFFF"

  // Determine ARIA attributes
  const ariaAttributes = {
    role: "menuitem",
    "aria-current": (isActive ? "page" : undefined) as "page" | undefined,
  }

  return (
    <button
      className={`relative ${
        mobile
          ? "text-left py-4 px-3" // Removed w-full
          : "px-3 py-3 md:px-4 md:py-3" // Increased padding on desktop too
      } text-sm md:text-base font-medium transition-colors`}
      style={{
        color: textColor,
        transform: mobile && isTouched ? "scale(0.98)" : "scale(1)",
        transition: "transform 0.15s ease-out, color 0.2s ease", // Faster transitions for better performance
      }}
      onClick={onClick}
      onMouseEnter={() => !mobile && setIsHovering(true)} // Only trigger hover on non-mobile
      onMouseLeave={() => !mobile && setIsHovering(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      {...ariaAttributes}
    >
      <span className="relative z-10">
        {" "}
        {/* Wrapper for text to ensure it stays above effects */}
        {label.charAt(0).toUpperCase() + label.slice(1)}
      </span>

      {/* Active indicator */}
      {isActive && (
        <div
          className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"
          style={{
            boxShadow: "0 0 8px rgba(12, 206, 169, 0.5)",
            willChange: "transform", // Hint to browser for optimization
          }}
          aria-hidden="true"
        ></div>
      )}

      {/* Hover/Touch indicator - using CSS variables for better performance */}
      {!isActive && (
        <div
          className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"
          style={{
            transform: isHovering || (mobile && isTouched) ? "scaleX(1)" : "scaleX(0)",
            transformOrigin: "left",
            transition: "transform 0.2s ease-out", // Faster for mobile
            boxShadow: isHovering || (mobile && isTouched) ? "0 0 8px rgba(12, 206, 169, 0.5)" : "none",
            willChange: "transform, opacity", // Hint to browser for optimization
          }}
          aria-hidden="true"
        ></div>
      )}

      {/* Touch feedback - full button highlight for mobile */}
      {mobile && (
        <div
          className="absolute inset-0 rounded-md"
          style={{
            backgroundColor: "#0CCEA9",
            opacity: isTouched ? 0.15 : 0,
            transition: "opacity 0.15s ease-out",
            willChange: "opacity", // Hint to browser for optimization
          }}
          aria-hidden="true"
        ></div>
      )}
    </button>
  )
}

// Update the MobileNavItem component to include hover state handling

// Replace the existing MobileNavItem function with this updated version:

function MobileNavItem({
  label,
  isActive = false,
  isSpecial = false,
  onClick,
}: {
  label: string
  isActive?: boolean
  isSpecial?: boolean
  onClick: () => void
}) {
  const [isHovering, setIsHovering] = useState(false)
  const [isTouched, setIsTouched] = useState(false)

  // Handle touch events
  const handleTouchStart = () => {
    setIsTouched(true)
  }

  const handleTouchEnd = () => {
    setTimeout(() => setIsTouched(false), 200)
  }

  // Determine background color based on state
  const getBgColor = () => {
    if (isActive) return "bg-primary/20"
    if (isTouched) return "bg-secondary-foreground/10"
    if (isHovering) return "bg-secondary-foreground/5"
    return "bg-transparent"
  }

  return (
    <button
      className={`relative text-left rounded-lg transition-all duration-200 ${getBgColor()} ${
        isSpecial ? "border-2 border-primary py-3" : "py-3 px-4"
      }`}
      style={{
        transform: isTouched ? "scale(0.98)" : isHovering ? "scale(1.01)" : "scale(1)",
        padding: isSpecial ? "0.75rem 1rem" : undefined, // py-3 px-4 equivalent
        width: "auto", // Allow button to size to content
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      role="menuitem"
      aria-current={isActive ? "page" : undefined}
    >
      <span
        className={`text-base font-medium ${isActive ? "text-primary" : isHovering ? "text-primary/90" : "text-white"}`}
      >
        {label.charAt(0).toUpperCase() + label.slice(1)}
      </span>

      {/* Active state indicator (left border) */}
      {isActive && !isSpecial && (
        <div
          className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-l-md"
          style={{
            boxShadow: "0 0 8px rgba(12, 206, 169, 0.5)",
          }}
          aria-hidden="true"
        ></div>
      )}

      {/* Hover state indicator (left border with different opacity) */}
      {!isActive && !isSpecial && isHovering && (
        <div
          className="absolute left-0 top-0 bottom-0 w-1 bg-primary/70 rounded-l-md"
          style={{
            opacity: 0.7,
            transition: "opacity 0.2s ease-out",
          }}
          aria-hidden="true"
        ></div>
      )}

      {/* Touch feedback overlay */}
      <div
        className="absolute inset-0 bg-primary rounded-lg pointer-events-none"
        style={{
          opacity: isTouched ? 0.15 : isHovering ? 0.08 : 0,
          transition: "opacity 0.2s ease-out",
        }}
        aria-hidden="true"
      ></div>
    </button>
  )
}