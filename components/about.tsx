"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useInView, useAnimation, AnimatePresence, useMotionValue, animate } from "framer-motion"
import { Zap, Cpu, Scale, Gauge, CheckCircle2 } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"

export default function About() {
  // Track if component is mounted for SSR compatibility
  const [isMounted, setIsMounted] = useState(false)

  // Track active feature for interactive showcase
  const [activeFeature, setActiveFeature] = useState<number>(0)

  // Track if content is loaded
  const [contentLoaded, setContentLoaded] = useState(false)

  // Animation controls
  const sectionRef = useRef<HTMLDivElement>(null)
  const showcaseRef = useRef<HTMLDivElement>(null)
  const controls = useAnimation()
  const isInView = useInView(sectionRef, { once: false, margin: "-100px 0px" })
  const showcaseInView = useInView(showcaseRef, { once: true, amount: 0.3 })

  // Optimized animation values
  const [isPaused, setIsPaused] = useState(false)
  const width = useMotionValue("0%")
  const animationRef = useRef<any>(null)

  // Responsive: detect if mobile
  const isMobile = useMediaQuery("(max-width: 767px)")

  // Set mounted state after component mounts
  useEffect(() => {
    setIsMounted(true)

    // Simulate content loading with a short delay
    const timer = setTimeout(() => {
      setContentLoaded(true)
    }, 300)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  // Start animations when section comes into view
  useEffect(() => {
    if (isInView && isMounted) {
      controls.start("visible")
    }
  }, [isInView, controls, isMounted])

  // Optimized auto-cycle for features
  useEffect(() => {
    if (!showcaseInView || !contentLoaded || isPaused) {
      animationRef.current?.stop()
      return
    }

    // Use a ref to track the current feature index
    const featureIndexRef = { current: activeFeature }

    const startAnimation = () => {
      const currentProgress = parseFloat(width.get()) / 100
      const duration = 30 * (1 - currentProgress)
      animationRef.current = animate(width, "100%", {
        duration,
        ease: "linear",
        onUpdate: (latestWidth) => {
          const progress = parseFloat(latestWidth) / 100
          const newActiveFeature = Math.min(Math.floor(progress * features.length), features.length - 1)
          if (featureIndexRef.current !== newActiveFeature) {
            featureIndexRef.current = newActiveFeature
            setActiveFeature(newActiveFeature)
          }
        },
        onComplete: () => {
          width.set("0%")
          startAnimation()
        },
      })
    }

    startAnimation()

    return () => animationRef.current?.stop()
  }, [showcaseInView, contentLoaded, isPaused])

  // Define features with enhanced content
  const features = [
    {
      title: "AI Integration",
      description:
        "Our advanced AI models enhance every aspect of your software, from development to user experience, creating intelligent systems that learn and adapt to changing conditions and user behaviors.",
      icon: <Cpu className="h-10 w-10 text-primary" />,
      timelineIcon: <Cpu className="h-8 w-8" />,
      benefits: [
        "Custom-trained models on your data",
        "Seamless integration with existing systems",
        "Continuous learning and improvement",
      ],
      stats: { value: "40%", label: "Efficiency Increase" },
    },
    {
      title: "Intelligent Automation",
      description:
        "Our automated agents handle complex tasks with precision, reducing manual intervention and accelerating processes across your business operations while maintaining consistent quality.",
      icon: <Zap className="h-10 w-10 text-primary" />,
      timelineIcon: <Zap className="h-8 w-8" />,
      benefits: [
        "24/7 operation without fatigue",
        "Consistent quality and performance",
        "Rapid adaptation to changing conditions",
      ],
      stats: { value: "70%", label: "Reduction in Manual Tasks" },
    },
    {
      title: "Infinite Scalability",
      description:
        "We build systems that grow seamlessly with your business, handling increased loads without performance degradation or service interruptions, ensuring your platform can support your growth trajectory.",
      icon: <Scale className="h-10 w-10 text-primary" />,
      timelineIcon: <Scale className="h-8 w-8" />,
      benefits: [
        "Elastic infrastructure that scales on demand",
        "Microservices architecture for flexibility",
        "Load balancing and redundancy built-in",
      ],
      stats: { value: "10x", label: "Growth Capacity" },
    },
    {
      title: "Optimized Performance",
      description:
        "Experience lightning-fast applications with our performance-first development approach, ensuring your users never experience lag or delays, even during peak usage periods or with complex operations.",
      icon: <Gauge className="h-10 w-10 text-primary" />,
      timelineIcon: <Gauge className="h-8 w-8" />,
      benefits: [
        "Sub-second response times",
        "Optimized database queries and caching",
        "Efficient resource utilization",
      ],
      stats: { value: "95%", label: "Performance Improvement" },
    },
  ]

  // Handle feature selection with direct crossfade
  const handleFeatureSelect = (index: number) => {
    if (index === activeFeature) return

    setIsPaused(true)
    setActiveFeature(index)
    width.set(`${(index / features.length) * 100}%`)

    // Resume auto-cycling after a delay
    setTimeout(() => {
      setIsPaused(false)
    }, 5000) // Pause for 5 seconds
  }

  // Icon animation variants
  const iconVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: {
      scale: 0.8,
      opacity: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  // Feature content animation variants
  const contentVariants = {
    initial: { opacity: 0, y: 10 },
    animate: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.1 * custom,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
    exit: {
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  // Add swipe gesture support for mobile
  const [touchStartX, setTouchStartX] = useState<number | null>(null)

  useEffect(() => {
    const sectionElement = sectionRef.current
    if (!isMounted || !sectionElement) return

    const handleTouchStart = (e: TouchEvent) => {
      setTouchStartX(e.touches[0].clientX)
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (touchStartX === null) return

      const currentTouch = e.touches[0].clientX
      const diff = touchStartX - currentTouch

      // Minimum swipe distance (in px)
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          // Swipe left, go to next
          handleFeatureSelect((activeFeature + 1) % features.length)
        } else {
          // Swipe right, go to previous
          handleFeatureSelect((activeFeature - 1 + features.length) % features.length)
        }

        setTouchStartX(null)
      }
    }

    const handleTouchEnd = () => {
      setTouchStartX(null)
    }

    sectionElement.addEventListener("touchstart", handleTouchStart)
    sectionElement.addEventListener("touchmove", handleTouchMove)
    sectionElement.addEventListener("touchend", handleTouchEnd)
    sectionElement.addEventListener("touchcancel", handleTouchEnd)

    return () => {
      sectionElement.removeEventListener("touchstart", handleTouchStart)
      sectionElement.removeEventListener("touchmove", handleTouchMove)
      sectionElement.removeEventListener("touchend", handleTouchEnd)
      sectionElement.removeEventListener("touchcancel", handleTouchEnd)
    }
  }, [isMounted, activeFeature, features.length, touchStartX])

  return (
    <div id="about" className="min-h-screen w-full py-20 md:pt-2 md:pb-56 lg:pt-4 lg:pb-72 relative overflow-hidden" ref={sectionRef}>
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/30 via-gray-900/70 to-gray-900/90 z-0"></div>

        {/* Grid pattern */}
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

        

        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] rounded-full bg-primary opacity-5 blur-[100px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[30vw] h-[30vw] rounded-full bg-primary opacity-5 blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 pt-2 relative z-10">
        {/* Heading section with animated reveal */}
        <motion.div
          className="text-center max-w-4xl mx-auto mb-16 md:mb-24"
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1,
              },
            },
          }}
        >
          <motion.div
            className="inline-block mb-3 px-4 py-1.5 bg-primary/10 rounded-full border border-primary/20"
            variants={{
              hidden: { opacity: 0, y: -10 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5 },
              },
            }}
          >
            <span className="text-primary font-medium text-sm">Why Choose ZeroLag</span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight"
            variants={{
              hidden: { opacity: 0, y: -10 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5 },
              },
            }}
          >
            <span className="block text-white">Transforming Ideas into</span>
            <span className="block text-primary mt-1">Intelligent Solutions</span>
          </motion.h2>

          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            variants={{
              hidden: { opacity: 0, y: -10 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5 },
              },
            }}
          >
            We combine cutting-edge AI with robust architecture to deliver software that scales effortlessly and
            performs with zero lag.
          </motion.p>
        </motion.div>

        {/* Enhanced interactive feature showcase */}
        <div className="mb-20 relative" ref={showcaseRef}>
          {/* Desktop timeline/animation (md and up) */}
          {!isMobile && (
            <motion.div
              className="relative h-32 mb-12 overflow-visible"
              initial={{ opacity: 0 }}
              animate={showcaseInView && contentLoaded ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative pt-4">
                <div className="hidden md:block">
                  <div className="absolute left-0 right-0 h-2 bg-gray-800 top-0 transform translate-y-[8px] rounded-full shadow-[0_0_8px_rgba(0,0,0,0.2)] z-0">
                    <motion.div
                      className="absolute h-full bg-primary origin-left rounded-full shadow-[0_0_10px_rgba(12,206,169,0.3)]"
                      style={{ width }}
                    />
                  </div>
                  <div className="flex justify-between items-center relative">
                    {features.map((feature, index) => {
                      const isActive = activeFeature === index
                      const currentProgress = parseFloat(width.get()) / 100
                      const isHighlighted =
                        currentProgress * features.length >= index && currentProgress * features.length < index + 1
                      return (
                        <motion.div
                          key={`selector-desktop-${index}`}
                          className={`relative cursor-pointer z-10 flex flex-col items-center pt-8
${isActive ? "z-20" : "opacity-100 hover:opacity-100"}`}
                          onClick={() => handleFeatureSelect(index)}
                          whileHover={{ scale: isActive ? 1.05 : 1.05 }}
                          animate={{
                            scale: isActive ? 1.15 : isHighlighted ? 1.05 : 1,
                          }}
                          transition={{
                            duration: 0.7,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                        >
                          <div
                            className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20
${isActive
    ? "bg-gray-900 border-2 border-primary text-primary shadow-lg shadow-primary/20"
    : isHighlighted
      ? "bg-gray-900 text-primary border-2 border-primary/50"
      : "bg-gray-900 text-primary border border-gray-700"
}`}
                          >
                            <motion.div
                              animate={{ rotate: 0 }}
                              transition={{ duration: 1.5, repeat: 0, repeatDelay: 2 }}
                            >
                              {feature.timelineIcon}
                            </motion.div>
                          </div>
                          <motion.div
                            className="text-center px-1 mt-8"
                            initial={{ opacity: 0, y: 5 }}
                            animate={{
                              opacity: 1,
                              y: 0,
                              color: isActive ? "rgb(12, 206, 169)" : "rgb(209, 213, 219)",
                            }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                          >
                            <span className={`text-sm font-medium ${isActive ? "text-primary" : "text-gray-300"}`}>
                              {feature.title}
                            </span>
                          </motion.div>
                        </motion.div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          {/* Mobile carousel (below md) */}
          {isMobile && (
            <div className="w-full flex flex-col items-center mb-8">
              <div className="flex items-center justify-center w-full">
                <button
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 text-white mr-2 disabled:opacity-40"
                  onClick={() => handleFeatureSelect((activeFeature - 1 + features.length) % features.length)}
                  disabled={activeFeature === 0}
                  aria-label="Previous feature"
                >
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" /></svg>
                </button>
                <div className="flex-1 flex justify-center">
                  <AnimatePresence initial={false} custom={activeFeature}>
                    <motion.div
                      key={`mobile-feature-${activeFeature}`}
                      className="w-full max-w-xs flex flex-col items-center"
                      initial={{ x: 60 * (activeFeature > 0 ? 1 : -1), opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -60 * (activeFeature > 0 ? 1 : -1), opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="w-16 h-16 rounded-full flex items-center justify-center mb-3 bg-gray-900 border-2 border-primary text-primary shadow-lg shadow-primary/20">
                        {features[activeFeature].timelineIcon}
                      </div>
                      <h4 className="text-lg font-semibold text-primary mb-2 text-center">{features[activeFeature].title}</h4>
                    </motion.div>
                  </AnimatePresence>
                </div>
                <button
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 text-white ml-2 disabled:opacity-40"
                  onClick={() => handleFeatureSelect((activeFeature + 1) % features.length)}
                  disabled={activeFeature === features.length - 1}
                  aria-label="Next feature"
                >
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" /></svg>
                </button>
              </div>
            </div>
          )}

          {/* Feature Showcase with refined fade-in animations */}
          <motion.div
            className="relative bg-gray-800/40 backdrop-blur-xl rounded-xl border border-gray-700 overflow-hidden"
            style={{ height: "auto", minHeight: "400px", maxHeight: "none" }}
            initial={{ opacity: 0, y: 20 }}
            animate={showcaseInView && contentLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {/* Background for the showcase */}
            <div className="absolute inset-0 overflow-hidden">
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 30% 30%, rgba(12, 206, 169, 0.4) 0%, transparent 50%), radial-gradient(circle at 70% 70%, rgba(12, 206, 169, 0.4) 0%, transparent 50%)",
                  backgroundSize: "100% 100%",
                }}
              />
            </div>

            {/* Feature content with refined crossfade transition */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`feature-${activeFeature}`}
                className="absolute inset-0 p-4 sm:p-6 md:p-8 lg:p-12 flex flex-col items-start"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {/* Feature details with animated elements */}
                <motion.div
                  className="flex flex-col sm:flex-row items-center gap-x-4 mb-4 sm:mb-6"
                  variants={contentVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  custom={1}
                >
                  <motion.div
                    className="p-2 sm:p-3 rounded-lg bg-gray-900 mb-3 sm:mb-0 sm:mr-4 border border-primary/20"
                    variants={iconVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    whileHover="hover"
                  >
                    {features[activeFeature].icon}
                  </motion.div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-white">{features[activeFeature].title}</h3>
                </motion.div>

                <motion.p
                  className="text-sm sm:text-base md:text-lg text-gray-300 mb-4 sm:mb-6 leading-relaxed max-w-3xl"
                  variants={contentVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  custom={2}
                >
                  {features[activeFeature].description}
                </motion.p>

                {/* Key benefits with staggered animation */}
                <motion.div
                  className="w-full mb-4 sm:mb-6 max-w-3xl"
                  variants={contentVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  custom={3}
                >
                  <h4 className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-4">Key Benefits</h4>
                  <ul className="space-y-2 sm:space-y-3">
                    {features[activeFeature].benefits.map((benefit, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.7,
                          delay: 0.4 + idx * 0.15,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="flex items-start"
                      >
                        <motion.div
                          className="flex-shrink-0 mr-2 mt-0.5 sm:mt-1"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{
                            scale: 1,
                            opacity: 1,
                            transition: {
                              duration: 0.5,
                              delay: 0.5 + idx * 0.15,
                              ease: [0.34, 1.56, 0.64, 1], // Spring-like effect
                            },
                          }}
                        >
                          <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                        </motion.div>
                        <span className="text-sm sm:text-base text-gray-300">{benefit}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

                {/* Stats section removed as it was being cut off on large screens */}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* CTA section with refined animations */}
        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="relative bg-gray-800/30 backdrop-blur-md rounded-xl border border-gray-700 p-8 md:p-12 overflow-hidden">
            {/* Background for CTA */}
            <div className="absolute inset-0 overflow-hidden">
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 30% 30%, rgba(12, 206, 169, 0.4) 0%, transparent 50%), radial-gradient(circle at 70% 70%, rgba(12, 206, 169, 0.4) 0%, transparent 50%)",
                  backgroundSize: "100% 100%",
                }}
              />
            </div>

            <div className="relative z-10 text-center">
              <motion.h3
                className="text-2xl md:text-3xl font-bold mb-6 text-white"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                Ready to <span className="text-primary">Transform</span> Your Business?
              </motion.h3>

              <motion.p
                className="text-gray-300 mb-8 max-w-xl mx-auto"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  delay: 0.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                Partner with us to leverage cutting-edge AI and scalable architecture for your next project.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  delay: 0.4,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <motion.a
                  href="https://cal.com/zerolag/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 bg-primary text-black font-medium rounded-lg"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 20px rgba(12, 206, 169, 0.4)",
                    transition: { duration: 0.4 },
                  }}
                  whileTap={{ scale: 0.98, transition: { duration: 0.2 } }}
                >
                  Start Your Journey
                </motion.a>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}