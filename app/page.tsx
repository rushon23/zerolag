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
    <main className="min-h-screen grid-pattern animate-fade-in relative">
      <MinimalNavbar />

      {/* Sticky Parallax Container */}
      <div className="relative w-full">
        {/* Hero Section - Stays sticky while user scrolls past 100vh */}
        <div className="sticky top-0 left-0 w-full h-screen z-10">
          <Hero />
        </div>

        {/* About Section - Slides up over hero naturally using CSS margins */}
        <div className="relative min-h-screen z-20 bg-[#0A1428]/95 backdrop-blur-sm pt-24" style={{ marginTop: "100vh" }}>
          <About />
        </div>
      </div>

      {/* The rest of the sections */}
      <div className="relative z-20 bg-[#0A1428]">
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
  )
}
