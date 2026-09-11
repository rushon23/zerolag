"use client"

import { useEffect, useRef, useState } from "react"

type ScrollDirection = "up" | "down" | null

interface UseScrollAnimationOptions {
  threshold?: number
  rootMargin?: string
  fadeOutOnLeave?: boolean
  fadeOutThreshold?: number
}

export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(options: UseScrollAnimationOptions = {}) {
  const { threshold = 0.1, rootMargin = "0px", fadeOutOnLeave = true, fadeOutThreshold = -0.1 } = options

  // Add validation to ensure threshold is between 0 and 1
  const validThreshold = typeof threshold === "number" ? Math.max(0, Math.min(1, threshold)) : 0.1
  const validFadeOutThreshold = typeof fadeOutThreshold === "number" ? Math.max(0, Math.min(1, fadeOutThreshold)) : 0.1

  const ref = useRef<T>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isFadingOut, setIsFadingOut] = useState(false)
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>(null)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // Track scroll direction
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollY.current) {
        setScrollDirection("down")
      } else if (currentScrollY < lastScrollY.current) {
        setScrollDirection("up")
      }
      lastScrollY.current = currentScrollY
    }

    // Intersection Observer for fade-in
    const observerEnter = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            setIsFadingOut(false)
          } else if (fadeOutOnLeave && entry.boundingClientRect.top > 0) {
            // Element is leaving the viewport from the top
            setIsFadingOut(true)
          }
        })
      },
      {
        threshold: validThreshold,
        rootMargin,
      },
    )

    // Separate observer for fade-out with positive threshold
    const observerLeave = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting && scrollDirection === "down") {
            setIsFadingOut(true)
          }
        })
      },
      {
        threshold: validFadeOutThreshold,
        rootMargin,
      },
    )

    observerEnter.observe(element)
    observerLeave.observe(element)
    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      observerEnter.disconnect()
      observerLeave.disconnect()
      window.removeEventListener("scroll", handleScroll)
    }
  }, [validThreshold, rootMargin, fadeOutOnLeave, validFadeOutThreshold, scrollDirection])

  return { ref, isVisible, isFadingOut }
}
