"use client"

import { motion } from "framer-motion"
import { CheckIcon, Calendar } from "lucide-react"
import BackgroundPaths from "./ui/background-paths"
import { useState } from "react"

export default function Hero() {
  // Animation for the calendar icon
  const [isHovering, setIsHovering] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  const startAnimation = () => {
    if (!isAnimating) {
      setIsHovering(true)
      setIsAnimating(true)
      // Reset animation state after it complete
      setTimeout(() => {
        setIsAnimating(false)
      }, 1000) // Animation duration
    }
  }

  return (
    <div className="h-screen w-full pt-24 pb-16 md:pt-36 lg:pt-40 xl:pt-44 md:pb-32 overflow-hidden flex items-center justify-center">
      {/* Background Paths */}
      <BackgroundPaths />

      {/* Bottom gradient for smooth transition */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"
        style={{ zIndex: 2 }}
      />

      <div className="container mx-auto px-4 md:px-6 relative" style={{ zIndex: 10 }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-7xl 2xl:text-8xl font-bold mb-6 lg:mb-8 tracking-tight">
            <motion.span
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="block text-white"
            >
              Zero Lag.
            </motion.span>
            <motion.span
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="block text-primary"
            >
              Maximum Impact.
            </motion.span>
          </h1>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-xl md:text-xl lg:text-2xl xl:text-2xl text-gray-300 mb-8 lg:mb-10 max-w-2xl lg:max-w-3xl mx-auto"
          >
            Partner with us to transform your ideas into
            <span className="text-primary font-medium"> scalable</span> and
            <span className="text-primary font-medium"> intelligent</span> software solutions.
          </motion.p>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col sm:flex-row justify-center gap-6 mb-12 lg:mb-16"
          >
            <a
              href="https://cal.com/zerolag/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-md bg-gradient-to-r from-emerald-600 to-teal-600 px-3 sm:px-6 py-2.5 sm:py-3.5 text-sm md:text-base lg:text-lg font-medium text-white shadow-md transition-all duration-300 hover:shadow-lg hover:from-emerald-500 hover:to-teal-500 hover:scale-105 hover:-translate-y-1 active:scale-95 touch-manipulation w-auto max-w-[180px] sm:max-w-none mx-auto sm:mx-0 min-h-[40px] sm:min-h-[44px] flex items-center justify-center"
              onMouseEnter={startAnimation}
              onTouchStart={startAnimation}
            >
              <span className="flex items-center justify-center gap-2 w-full">
                <motion.div
                  animate={
                    isHovering
                      ? {
                          rotate: [0, -8, 8, -8, 8, 0],
                          transition: {
                            duration: 1,
                            repeat: 0,
                            ease: "easeInOut",
                          },
                        }
                      : { rotate: 0 }
                  }
                  onAnimationComplete={() => setIsHovering(false)}
                >
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.div>
                <span className="text-sm sm:text-base">Schedule a Call</span>
                <span className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300"></span>
              </span>
            </a>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex justify-center"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 text-center">
              {["AI-Driven Development", "Scalable Architecture", "Intelligent Automation"].map((feature, index) => (
                <div key={index} className="group flex items-center justify-center">
                  <CheckIcon className="w-5 h-5 lg:w-6 lg:h-6 text-primary mr-2 transition-all duration-300 ease-in-out group-hover:scale-125 group-hover:rotate-6" />
                  <span className="text-gray-300 group-hover:text-white transition-colors duration-300 text-sm md:text-sm lg:text-base">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
        {/* Animated Mouse Icon */}
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            delay: 1.2,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute -bottom-24 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex items-center justify-center p-1">
            <motion.div
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-1 h-2 bg-gray-300 rounded-full"
            />
          </div>
        </motion.div>
      </div>
    </div>
  )
}