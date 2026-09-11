"use client"

import { useState, useEffect, useRef } from "react"
import { Linkedin, Github, Twitter, Instagram, Globe } from "lucide-react"

// --- CORRECTED: Updated the interface for more flexible initials ---
interface Testimonial {
  // The initial can be a string OR an object for an image
  initial: string | { src: string; alt: string }
  name: string
  title: string
  quote: string
  rating: number
}

function Star({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z" />
    </svg>
  )
}

export function TestimonialsSection() {
  // Only Veeresh Shettar's testimonial
  const testimonials = [
    {
      initial: "V",
      name: "Veeresh Shettar",
      title: "Founder & CEO",
      quote:
        "ZeroLag delivered a robust website and admin panel with analytics ahead of schedule. Their team's deep understanding of DevOps and their proactive communication made them an invaluable partner in our success. We've seen a 40% increase in efficiency.",
      rating: 4,
    },
  ]

  return (
    <section id="testimonials" className="py-20 md:py-28 bg-[#0f1a2e] relative overflow-hidden">
      {/* Animated SVG Wave Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <style jsx>{`
          @keyframes wave-move {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes wave-gentle-float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
          }
        `}</style>
        <div className="absolute bottom-0 left-0 w-full">
          <svg className="absolute bottom-0 w-full" style={{ height: "18vh", animation: "wave-move 35s linear infinite", willChange: "transform" }} viewBox="0 0 1440 320" preserveAspectRatio="none"><path fill="rgba(12, 206, 169, 0.035)" d="M0,224L60,213.3C120,203,240,181,360,181.3C480,181,600,203,720,213.3C840,224,960,224,1080,208C1200,192,1320,160,1380,144L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z" /></svg>
        </div>
        <div className="absolute bottom-0 left-0 w-full">
          <svg className="absolute bottom-0 w-full" style={{ height: "14vh", animation: "wave-move 28s linear infinite reverse, wave-gentle-float 8s ease-in-out infinite", willChange: "transform" }} viewBox="0 0 1440 320" preserveAspectRatio="none"><path fill="rgba(12, 206, 169, 0.025)" d="M0,288L48,272C96,256,192,224,288,218.7C384,213,480,235,576,245.3C672,256,768,256,864,234.7C960,213,1056,171,1152,165.3C1248,160,1344,192,1392,208L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" /></svg>
        </div>
        <div className="absolute bottom-0 left-0 w-full">
          <svg className="absolute bottom-0 w-full" style={{ height: "22vh", animation: "wave-move 42s linear infinite", willChange: "transform", opacity: 0.7 }} viewBox="0 0 1440 320" preserveAspectRatio="none"><path fill="rgba(12, 206, 169, 0.02)" d="M0,256L48,261.3C96,267,192,277,288,261.3C384,245,480,203,576,197.3C672,192,768,224,864,224C960,224,1056,192,1152,176C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" /></svg>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-40 opacity-30" style={{ background: "linear-gradient(to top, rgba(12, 206, 169, 0.03) 0%, transparent 100%)" }}></div>
        <div className="absolute bottom-0 left-1/4 w-1/2 h-1/3 bg-primary opacity-[0.02] blur-3xl rounded-full" />
        <div className="absolute bottom-10 right-1/4 w-1/3 h-1/4 bg-primary opacity-[0.015] blur-3xl rounded-full" />
      </div>
      <div className="container mx-auto px-4 md:px-6 relative z-10 perspective-1000">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            CLIENT SUCCESS STORIES
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-2">
            What Our <span className="text-primary">Clients</span> Say
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto my-6" />
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Real feedback from businesses that have transformed their operations with our solutions
          </p>
        </div>
        <div className="max-w-6xl mx-auto relative">
          <div className="testimonial-3d-container bg-[#111827]/50 backdrop-blur-sm rounded-lg overflow-hidden border-t border-primary">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3 p-8 md:p-12 flex flex-col items-center md:items-start justify-center bg-[#0d1625]/80 backdrop-blur-sm">
                <div className="transition-all duration-500 ease-in-out">
                  <div className="w-24 h-24 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center mb-6 overflow-hidden">
                    <span className="text-primary text-4xl font-bold">{testimonials[0].initial}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2 text-center md:text-left">
                    {testimonials[0].name}
                  </h3>
                  <p className="text-primary mb-4 text-center md:text-left">{testimonials[0].title}</p>
                  <div className="flex space-x-1 justify-center md:justify-start">
                    {[...Array(testimonials[0].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                    ))}
                  </div>
                </div>
              </div>
              <div className="md:w-2/3 p-8 md:p-12 flex flex-col justify-center relative">
                <div className="text-primary text-6xl opacity-30 absolute top-4 left-8">"</div>
                <div className="transition-all duration-500 ease-in-out">
                  <p className="text-white text-lg md:text-xl italic leading-relaxed mb-8 mt-6 relative z-10">
                    {testimonials[0].quote}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}