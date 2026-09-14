import MinimalNavbar from "@/components/minimal-navbar"
import Footer from "@/components/footer"
import Hero from "@/components/hero"
import About from "@/components/about"
import EnhancedServices from "@/components/enhanced-services"
import Team from "@/components/team"
import { TestimonialsSection } from "@/components/testimonials"
import PreviousProjects from "@/components/previous-projects"
import ProcessSimple from "@/components/process-simple"
import Contact from "@/components/contact"

export default function Home() {
  return (
    <main>
      <MinimalNavbar />

      {/*
        ┌──────────────────────────────────────────┐
        │  PARALLAX CONTAINER                      │
        │                                          │
        │  Hero is sticky — it stays behind.       │
        │  About scrolls naturally on top of it.   │
        │                                          │
        │  The container is exactly 2×100vh tall,  │
        │  so Hero stays visible for exactly one   │
        │  viewport before About fully covers it.  │
        └──────────────────────────────────────────┘
      */}
      <div style={{ position: "relative", height: "200vh" }}>
        {/* Section 1: sticky — glued to top until About has scrolled past */}
        <div style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          zIndex: 1,
        }}>
          <Hero />
        </div>

        {/* Section 2: sits at the bottom half of the 200vh container.
            As the user scrolls, it slides up and covers the sticky Hero. */}
        <div style={{
          position: "absolute",
          top: "100vh",
          left: 0,
          right: 0,
          zIndex: 2,
        }}>
          <About />
        </div>
      </div>

      {/* All remaining sections scroll normally below */}
      <div style={{ position: "relative", zIndex: 2, background: "#0A1428" }}>
        <section id="projects"><PreviousProjects /></section>
        <section id="services"><EnhancedServices /></section>
        <section id="testimonials"><TestimonialsSection /></section>
        <section id="process"><ProcessSimple /></section>
        <section id="team"><Team /></section>
        <section id="contact"><Contact /></section>
        <Footer />
      </div>
    </main>
  )
}
