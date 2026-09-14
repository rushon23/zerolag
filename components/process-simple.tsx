"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ArrowRight } from "lucide-react"

const steps = [
  {
    number: "01",
    title: "Discovery & Strategy",
    description: "We engage in a comprehensive discussion to understand your project goals, ensuring a clear vision and setting the foundation for success.",
    highlight: "Goals → Vision → Foundation",
  },
  {
    number: "02",
    title: "Scope & Agreements",
    description: "Once the scope is defined, we establish transparent agreements and outline clear terms to ensure a smooth, reliable collaboration.",
    highlight: "Scope → Terms → Trust",
  },
  {
    number: "03",
    title: "MVP Construction",
    description: "Our skilled team kicks off rapid MVP construction, following agile sprints for adaptability and timely delivery of an impactful product.",
    highlight: "Sprints → Agile → Delivery",
  },
  {
    number: "04",
    title: "On-Time Deployment",
    description: "We pride ourselves on on-time deployment, ensuring your fully functional MVP reaches the market promptly and is ready for user interaction.",
    highlight: "Launch → Market → Live",
  },
  {
    number: "05",
    title: "Continuous Improvement",
    description: "Based on user feedback and market response, we iteratively refine and enhance your product, ensuring its ongoing success and relevance.",
    highlight: "Feedback → Refine → Grow",
  },
  {
    number: "06",
    title: "Maintenance & Support",
    description: "We provide dedicated, ongoing support to ensure your application runs flawlessly and to address any of your future needs.",
    highlight: "Monitor → Maintain → Support",
  },
]

export default function ProcessSimple() {
  const [activeIndex, setActiveIndex] = useState(0)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const goToNext = () => setActiveIndex((prev) => (prev + 1) % steps.length)
  const goToPrev = () => setActiveIndex((prev) => (prev - 1 + steps.length) % steps.length)

  // Auto-advance every 3.5s; reset on manual nav
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(goToNext, 3500)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [activeIndex])

  return (
    <section id="process" className="py-20 md:py-28 bg-[#0A101E] text-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-semibold border border-primary/20 mb-4 tracking-wide uppercase">
            Our Process
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our Path to <span className="text-primary">Excellence</span>
          </h2>
          <p className="text-gray-400 text-lg">
            A disciplined, agile process to transform ambitious ideas into market-leading digital products.
          </p>
        </div>

        {/* Step indicator strip */}
        <div className="flex items-center justify-center gap-0 mb-12 max-w-3xl mx-auto">
          {steps.map((s, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className="flex-1 flex flex-col items-center gap-2 group"
            >
              {/* Connector line + dot */}
              <div className="w-full flex items-center">
                {/* Left line */}
                <div className={`flex-1 h-px transition-colors duration-300 ${i <= activeIndex ? "bg-primary" : "bg-gray-700"}`} />
                {/* Dot */}
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all duration-300 shrink-0
                  ${i === activeIndex
                    ? "border-primary bg-primary text-black scale-125"
                    : i < activeIndex
                    ? "border-primary bg-primary/20 text-primary"
                    : "border-gray-600 text-gray-500"
                  }`}>
                  {i < activeIndex ? "✓" : i + 1}
                </div>
                {/* Right line */}
                <div className={`flex-1 h-px transition-colors duration-300 ${i < activeIndex ? "bg-primary" : "bg-gray-700"}`} />
              </div>
              {/* Step label hidden on mobile, shown md+ */}
              <span className={`hidden md:block text-xs font-medium transition-colors duration-300 ${i === activeIndex ? "text-primary" : "text-gray-600"}`}>
                {s.number}
              </span>
            </button>
          ))}
        </div>

        {/* Active card */}
        <div className="relative max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="bg-[#0d1d38] border border-gray-800 rounded-2xl p-10 text-center"
            >
              {/* Giant step number */}
              <div className="text-[80px] font-black leading-none text-primary/15 select-none mb-2">
                {steps[activeIndex].number}
              </div>

              {/* Highlight tag */}
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary text-xs font-semibold px-4 py-1.5 rounded-full mb-6 tracking-wide">
                {steps[activeIndex].highlight}
              </div>

              <h3 className="text-2xl md:text-3xl font-bold text-white mb-5">
                {steps[activeIndex].title}
              </h3>

              <p className="text-gray-400 text-lg leading-relaxed max-w-lg mx-auto">
                {steps[activeIndex].description}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Prev / Next */}
          <button
            onClick={goToPrev}
            className="absolute top-1/2 -translate-y-1/2 -left-14 w-10 h-10 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-gray-300 hover:text-primary hover:border-primary/50 transition-colors"
            aria-label="Previous step"
          >
            <ArrowLeft size={18} />
          </button>
          <button
            onClick={goToNext}
            className="absolute top-1/2 -translate-y-1/2 -right-14 w-10 h-10 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-gray-300 hover:text-primary hover:border-primary/50 transition-colors"
            aria-label="Next step"
          >
            <ArrowRight size={18} />
          </button>
        </div>

      </div>
    </section>
  )
}