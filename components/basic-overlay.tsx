"use client"

import { useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function BasicOverlay() {
  useEffect(() => {
    // Basic pinning setup
    const pin = ScrollTrigger.create({
      trigger: "#panel1",
      start: "top top",
      endTrigger: "#panel2",
      end: "top top",
      pin: true,
      pinSpacing: false,
      markers: true, // Enable markers for debugging
    })

    console.log("ScrollTrigger setup complete")

    // Cleanup on component unmount
    return () => {
      pin?.kill()
    }
  }, [])

  return (
    <>
      {/* Very simple test panels with distinct colors and IDs */}
      <div id="panel1" className="h-screen bg-blue-900 flex items-center justify-center">
        <h1 className="text-5xl font-bold text-white">First Panel</h1>
      </div>
      <div id="panel2" className="h-screen bg-green-900 flex items-center justify-center">
        <h1 className="text-5xl font-bold text-white">Second Panel</h1>
      </div>
    </>
  )
}