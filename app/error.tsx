"use client"

import { useEffect } from "react"

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting 
    console.error("Application error:", error)

    // Check if this is a resource loading error
    const isResourceError =
      error.message &&
      (error.message.includes("loading") ||
        error.message.includes("failed to load") ||
        error.message.includes("vusercontent.net"))

    if (isResourceError) {
      console.warn("Resource loading error detected. This might be related to an image or asset.")
    }
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-primary mb-4">Something went wrong</h2>
        <p className="text-gray-300 mb-6">
          We've encountered an error while loading this page. Our team has been notified.
        </p>
        <div className="bg-gray-900/50 p-4 rounded mb-6 overflow-auto max-h-40">
          <p className="text-sm font-mono text-gray-400">{error.message}</p>
          {error.stack && (
            <details className="mt-2">
              <summary className="text-xs text-gray-500 cursor-pointer">View details</summary>
              <pre className="mt-2 text-xs text-gray-500 whitespace-pre-wrap">{error.stack}</pre>
            </details>
          )}
        </div>
        <button
          onClick={reset}
          className="w-full py-2 px-4 bg-primary text-black font-medium rounded hover:bg-primary/90 transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  )
}
