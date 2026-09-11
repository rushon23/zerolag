"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowRight,
  ExternalLink,
  ArrowLeft,
  Wrench,
  Layers,
  BrainCircuit,
  Globe,
  MousePointerClick,
  Smartphone,
  ChevronDown,
} from "lucide-react"

// --- Data Interfaces and Constants --

interface Project {
  id: number
  title: string
  description: string
  image: string
  tags: string[]
  link?: string
  category: string // Corresponds to the category ID
}

const CATEGORIES = [
  { id: "full-stack", name: "Full Stack Apps", icon: Layers },
  { id: "ai-ml", name: "AI/ML", icon: BrainCircuit },
  { id: "websites", name: "Websites", icon: Globe },
  { id: "landing-pages", name: "Landing Pages", icon: MousePointerClick },
  { id: "mobile-apps", name: "Mobile Apps", icon: Smartphone },
]

// --- FIXED: Assigned a unique ID to the "GodamLelo" project ---
const allProjects: Project[] = [
    {
      id: 1,
      title: "LogiSetu - Logistics Revolution",
      description: "A comprehensive logistics platform revolutionizing India's logistics industry with digital efficiency.",
      image: "/projects/logisetu-screenshot.jpg",
      tags: ["Next.js", "Node.js", "Postgres", "AWS"],
      link: "https://www.logisetu.com/",
      category: "websites",
    },
    {
      id: 2,
      title: "SugarWise - Diabetes Management",
      description: "An AI-powered health platform for diabetes management featuring risk prediction, personalized diet recommendations, and tailored exercise plans.",
      image: "/projects/sugarwise-screenshot.jpg",
      tags: ["Next.js", "AI/ML", "Healthcare", "Python"],
      link: "https://csd-sugar-wise.vercel.app/",
      category: "ai-ml",
    },
    {
      id: 3,
      title: "Viirtrading - An institution teaching stock market",
      description: "A sleek and performant website for a trading company, featuring Meta Business Suite integration for seamless customer onboarding.",
      image: "/projects/viirtrading.png",
      tags: ["Next.js", "Meta API", "Adsense"],
      link: "https://viirtrading.com/",
      category: "websites",
    },
    {
      id: 4,
      title: "Webinar registration",
      description: "A sleek and performant landing page for conducting to register for the webinar conducted by viirtrading",
      image: "/projects/webinar-viirtrading.png",
      tags: ["Next.js", "Meta API", "Adsense"],
      link: "https://webinar.viirtrading.com/",
      category: "landing-pages",
    },
    {
      id: 5,
      title: "GodamLelo",
      description: "Made to find a perfect godams for your warehouses. Connect with verified warehouse owners across the country. Simplified search, transparent listings, and seamless transactions.",
      image: "/projects/godamlelo.png",
      tags: ["Next.js", "Express", "AWS Lambda", "S3 Storage", "Postgres"],
      link: "https://www.godamlelo.com/",
      category: "full-stack",
    },
    {
      id: 6,
      title: "C4D claculator",
      description: "Created a loan calculator and a DTI calculator with amortization, saved loans, and many other features for one of our clients. This app was an essential part of their business. It is a cross-platform application that can be used on both Android and iOS.",
      image: "/projects/loan.png",
      tags: ["Android Development", "IOS development", "React native", "Async Storage"],
      category: "mobile-apps",
    }
]

// --- Component ---

export default function PreviousProjects() {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0].id)
  const [activeProject, setActiveProject] = useState(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const projectsRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  const projectsInView = allProjects.filter((p) => p.category === activeCategory)
  const activeCategoryObject = CATEGORIES.find(c => c.id === activeCategory)
  
  // --- FIX: Get the current project safely ---
  // This ensures we don't try to access an index that is out of bounds.
  const currentProject = projectsInView[activeProject];


  // Reset active project index when category changes
  useEffect(() => {
    setActiveProject(0)
  }, [activeCategory])

  // Intersection observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setIsVisible(true)
      },
      { threshold: 0.1 },
    )
    const currentRef = projectsRef.current
    if (currentRef) observer.observe(currentRef)
    return () => {
      if (currentRef) observer.unobserve(currentRef)
    }
  }, [])

  // Auto-rotate projects effect
  useEffect(() => {
    if (!isVisible || projectsInView.length <= 1) return
    const interval = setInterval(() => {
      setActiveProject((prev) => (prev + 1) % projectsInView.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [isVisible, activeCategory, projectsInView.length])

  const handlePrev = () => setActiveProject((p) => (p - 1 + projectsInView.length) % projectsInView.length)
  const handleNext = () => setActiveProject((p) => (p + 1) % projectsInView.length)

  return (
    <section id="previous-projects" className="py-20 md:py-28 bg-gray-900 relative overflow-hidden" ref={projectsRef}>
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="project-grid" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                <path d="M 0 0 L 40 0" fill="none" stroke="#0CCEA9" strokeWidth="0.5" strokeOpacity="0.3" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#project-grid)" />
          </svg>
        </div>
        <div className="absolute top-1/4 right-1/4 w-[40vw] h-[40vw] rounded-full bg-primary opacity-5 blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
            <span className="inline-block mb-3 px-4 py-1.5 bg-primary/10 rounded-full border border-primary/20 text-primary font-medium text-sm">Our Work</span>
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }} className="text-3xl md:text-4xl font-bold mb-6">
            Previous <span className="text-primary">Projects</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }} className="text-gray-300 text-lg">
            Explore our portfolio of successful projects that showcase our expertise and commitment to quality.
          </motion.p>
        </div>

        {/* --- RESPONSIVE CATEGORY NAVIGATION --- */}
        <div className="flex justify-center mb-16">
          {/* Desktop */}
          <div className="hidden md:flex items-center p-1.5 space-x-1 bg-black/20 border border-white/10 rounded-full backdrop-blur-lg">
            {CATEGORIES.map((category) => (
              <button key={category.id} onClick={() => setActiveCategory(category.id)} className={`relative px-4 py-2.5 text-sm sm:text-base font-medium rounded-full transition-colors focus:outline-none ${activeCategory === category.id ? "text-white" : "text-gray-400 hover:text-white"}`}>
                <span className="relative z-10 flex items-center gap-2">
                  <category.icon size={16} />{category.name}
                </span>
                {activeCategory === category.id && (
                  <motion.div className="absolute inset-0 bg-primary/25 rounded-full" layoutId="active-category-pill" transition={{ type: "spring", stiffness: 300, damping: 30 }} />
                )}
              </button>
            ))}
          </div>
          {/* Mobile */}
          <div className="relative w-full max-w-xs md:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="w-full flex items-center justify-between p-3 bg-black/20 border border-white/10 rounded-lg backdrop-blur-lg text-white">
              <span className="flex items-center gap-2">
                {activeCategoryObject?.icon && <activeCategoryObject.icon size={16} />} {activeCategoryObject?.name}
              </span>
              <motion.div animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}>
                <ChevronDown size={20} />
              </motion.div>
            </button>
            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 10 }} exit={{ opacity: 0, y: -10 }} className="absolute top-0 z-20 w-full p-2 mt-1 bg-gray-800 border border-white/10 rounded-lg shadow-lg">
                  {CATEGORIES.map((category) => (
                    <button key={category.id} onClick={() => { setActiveCategory(category.id); setIsMobileMenuOpen(false); }} className="w-full flex items-center gap-3 p-3 text-left text-white rounded-md hover:bg-primary/20 transition-colors">
                      <category.icon size={16} />{category.name}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* --- Projects Showcase --- */}
        <AnimatePresence mode="wait">
          {/* --- FIX: Check for `currentProject`'s existence before rendering --- */}
          {currentProject ? (
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center max-w-7xl mx-auto"
            >
              {/* Project Image - FIXED Mobile Layout */}
              <div className="order-1 lg:order-1">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeProject}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 30 }}
                    transition={{ duration: 0.4 }}
                    className="relative rounded-xl overflow-hidden border-2 border-gray-800 shadow-2xl w-full bg-black flex items-center justify-center"
                    style={{ aspectRatio: '16/10' }}
                  >
                    {/* Use the safe `currentProject` variable */}
                    <img 
                      src={currentProject.image || "/placeholder.svg"} 
                      alt={currentProject.title} 
                      className="max-w-full max-h-full object-contain" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent" />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Project Details - FIXED Mobile Layout */}
              <div className="order-2 lg:order-2">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeProject}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.4 }}
                    className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-gray-700 flex flex-col justify-center min-h-[400px]"
                  >
                    {/* Content */}
                    <div className="text-center lg:text-left">
                      {/* Use the safe `currentProject` variable */}
                      <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 text-white">{currentProject.title}</h3>
                      <p className="text-gray-300 text-sm md:text-base lg:text-lg mb-6 leading-relaxed">{currentProject.description}</p>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-6">
                        {currentProject.tags.map((tag) => (
                          <span key={tag} className="px-3 py-1 bg-primary/20 text-primary text-xs font-medium rounded-full">{tag}</span>
                        ))}
                      </div>
                      
                      {/* View Project Link */}
                      {currentProject.link && (
                        <div className="mb-6 text-center lg:text-left">
                          <a 
                            href={currentProject.link} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="inline-flex items-center text-primary hover:text-primary/80 transition-colors font-medium"
                          >
                            <span className="mr-2">View Project</span>
                            <ExternalLink size={16} />
                          </a>
                        </div>
                      )}
                    </div>
                    
                    {/* Navigation Controls */}
                    {projectsInView.length > 1 && (
                      <div className="mt-auto pt-6">
                        <div className="flex items-center justify-between">
                          {/* Project Indicators */}
                          <div className="flex items-center justify-center lg:justify-start flex-1">
                            {projectsInView.map((_, index) => (
                              <button 
                                key={index} 
                                onClick={() => setActiveProject(index)} 
                                className={`w-2.5 h-2.5 rounded-full mx-1 transition-all ${
                                  activeProject === index ? "bg-primary scale-110" : "bg-gray-600 hover:bg-gray-500"
                                }`} 
                                aria-label={`View project ${index + 1}`} 
                              />
                            ))}
                          </div>
                          
                          {/* Navigation Arrows */}
                          <div className="flex items-center gap-2 ml-4">
                            <button 
                              onClick={handlePrev} 
                              className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors" 
                              aria-label="Previous project"
                            >
                              <ArrowLeft className="w-5 h-5 text-primary" />
                            </button>
                            <button 
                              onClick={handleNext} 
                              className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors" 
                              aria-label="Next project"
                            >
                              <ArrowRight className="w-5 h-5 text-primary" />
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="no-projects"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="text-center py-16 px-6 bg-gray-800/40 rounded-xl border border-gray-700 flex flex-col items-center justify-center min-h-[400px] max-w-4xl mx-auto"
            >
              <Wrench className="w-12 h-12 text-primary/50 mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">Work in Progress</h3>
              <p className="text-gray-400 max-w-md">A new project for this category is under development and will be showcased here soon. Stay tuned!</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
