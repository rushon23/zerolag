"use client"

import dynamic from "next/dynamic"
import { type ComponentType } from "react"

// Dynamically import the component and ensure correct resolution
const AnimatedTextLoading = dynamic(() =>
  import("@/components/ui/animated-text-loading").then((mod) => mod.default as ComponentType)
)

export default function ClientAnimatedLoader() {
  return <AnimatedTextLoading />
}
