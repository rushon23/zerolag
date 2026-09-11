"use client"

import type { ReactNode } from "react"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowLeft,
  ArrowRight,
  Layers,
  Handshake,
  Construction,
  Server,
  RefreshCw,
  LifeBuoy,
} from "lucide-react"

// Custom Animated Icon Component - Size has been reduced
const AnimatedProcessIcon = ({ children }: { children: ReactNode }) => (
  <div className="relative w-20 h-20"> {/* REDUCED SIZE */}
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0">
      <circle cx="50" cy="50" r="48" stroke="url(#paint0_linear_153_12)" strokeWidth="2"/>
      <circle cx="20" cy="20" r="3" fill="#0CCEA9" fillOpacity="0.5"/>
      <circle cx="80" cy="80" r="3" fill="#0CCEA9" fillOpacity="0.5"/>
      <circle cx="20" cy="80" r="3" fill="#0CCEA9" fillOpacity="0.5"/>
      <circle cx="80" cy="20" r="3" fill="#0CCEA9" fillOpacity="0.5"/>
      <defs>
        <linearGradient id="paint0_linear_153_12" x1="50" y1="0" x2="50" y2="100" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0CCEA9" stopOpacity="0.8"/>
          <stop offset="1" stopColor="#0CCEA9" stopOpacity="0"/>
        </linearGradient>
      </defs>
    </svg>
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      animate={{ rotate: 360 }}
      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
    >
        {children}
    </motion.div>
  </div>
);


const steps = [
  {
    icon: <Layers size={28} className="text-primary" />, // Icon size adjusted for smaller container
    title: "Discovery & Strategy",
    description: "We engage in a comprehensive discussion to understand your project goals, ensuring a clear vision and setting the foundation for success.",
  },
  {
    icon: <Handshake size={28} className="text-primary" />,
    title: "Scope & Agreements",
    description: "Once the scope is defined, we establish transparent agreements and outline clear terms to ensure a smooth, reliable collaboration.",
  },
  {
    icon: <Construction size={28} className="text-primary" />,
    title: "MVP Construction",
    description: "Our skilled team kicks off rapid MVP construction, following agile sprints for adaptability and timely delivery of an impactful product.",
  },
  {
    icon: <Server size={28} className="text-primary" />,
    title: "On-Time Deployment",
    description: "We pride ourselves on on-time deployment, ensuring your fully functional MVP reaches the market promptly and is ready for user interaction.",
  },
  {
    icon: <RefreshCw size={28} className="text-primary" />,
    title: "Continuous Improvement",
    description: "Based on user feedback and market response, we iteratively refine and enhance your MVP, ensuring its ongoing success and relevance.",
  },
  {
    icon: <LifeBuoy size={28} className="text-primary" />,
    title: "Maintenance & Support",
    description: "We provide dedicated, ongoing support to ensure your application runs flawlessly and to address any of your future needs.",
  },
]

export default function ProcessSimple() {
  const [activeIndex, setActiveIndex] = useState(0)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const AUTOPLAY_INTERVAL = 2000

  const goToNext = () => setActiveIndex((prev) => (prev + 1) % steps.length)
  const goToPrev = () => setActiveIndex((prev) => (prev - 1 + steps.length) % steps.length)

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(goToNext, AUTOPLAY_INTERVAL)
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [activeIndex])

  return (
    <section id="process" className="py-20 md:py-28 bg-[#0A101E] overflow-hidden font-sans">
      <div className="container mx-auto px-0 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Our Path to <span className="text-primary">Excellence</span>
          </h2>
          <p className="text-gray-300 text-lg">
            A disciplined, agile process to transform ambitious ideas into market-leading digital products.
          </p>
        </div>

        <div className="relative w-full h-[550px] md:h-[600px] flex items-center justify-center">
          <div className="relative w-full h-full" style={{ perspective: "1200px" }}>
            
            <AnimatePresence>
              {activeIndex !== null && (
                <motion.div
                  key={activeIndex}
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <motion.div
                    className="absolute w-full h-96 max-w-2xl bg-primary/10 rounded-full"
                    style={{ filter: "blur(120px)" }}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {steps.map((step, index) => {
              const offset = index - activeIndex
              const isVisible = Math.abs(offset) <= 2

              const scale = offset === 0 ? 1 : 0.85
              const zIndex = steps.length - Math.abs(offset)
              const translateX = offset * 50
              const rotateY = offset * 35

              return (
                <motion.div
                  key={index}
                  className="absolute w-full h-full flex items-center justify-center"
                  style={{ transformStyle: "preserve-3d", zIndex: zIndex }}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: isVisible ? 1 : 0,
                    transform: `translateX(${translateX}%) scale(${scale}) rotateY(${rotateY}deg)`,
                  }}
                  transition={{ type: "spring", stiffness: 100, damping: 20 }}
                >
                  <div className={`
                    relative w-[90%] max-w-lg h-[500px] rounded-2xl p-px
                    transition-all duration-300
                    ${offset === 0 ? "shimmer-border" : "bg-white/5"}
                  `}>
                    <div className={`
                      relative w-full h-full
                      bg-[#0F172A] sm:bg-[#0F172A]/60 sm:backdrop-blur-2xl
                      rounded-[15px] p-8 flex flex-col overflow-hidden
                    `}>
                      
                      {/* 1. NEW LAYERED HEADER */}
                      <header className="relative flex items-center h-20">
                        <p className="absolute right-0 top-1/2 -translate-y-1/2 text-[110px] font-black text-white/10 select-none pointer-events-none">
                          0{index + 1}
                        </p>
                        <h3 className="relative z-10 text-2xl font-bold text-white">
                          {step.title}
                        </h3>
                      </header>
                      
                      {/* 2. CENTRAL ANIMATED ICON (SMALLER) */}
                      <div className="flex-grow flex items-center justify-center my-4">
                        <AnimatePresence>
                          {offset === 0 && (
                            <motion.div
                                key={index}
                                className="relative flex items-center justify-center"
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.2 }}
                            >
                                <AnimatedProcessIcon>{step.icon}</AnimatedProcessIcon>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* 3. FOOTER WITH LARGER FONT */}
                      <footer className="text-left">
                        <p className="text-gray-300 text-lg leading-relaxed">{step.description}</p>
                      </footer>

                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          <button onClick={goToPrev} className="absolute top-1/2 -translate-y-1/2 left-0 sm:left-4 z-30 p-2 rounded-full text-white bg-white/10 hover:bg-white/20 transition-colors" aria-label="Previous"><ArrowLeft /></button>
          <button onClick={goToNext} className="absolute top-1/2 -translate-y-1/2 right-0 sm:right-4 z-30 p-2 rounded-full text-white bg-white/10 hover:bg-white/20 transition-colors" aria-label="Next"><ArrowRight /></button>
        </div>
        
        <div className="flex justify-center gap-3 mt-12">
          {steps.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${activeIndex === index ? "bg-primary scale-150" : "bg-gray-600 hover:bg-gray-500"}`}
              aria-label={`Go to step ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}