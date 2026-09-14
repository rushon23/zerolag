"use client"

import type React from "react"
import { Mail, MapPin } from "lucide-react"
import { useState, useEffect } from "react" // Add useEffect to the import
import { submitContactForm } from "@/app/actions/contact-form" // Assuming this path is correct

export default function Contact() {
  // Basic state for form inputs 
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const [emailError, setEmailError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }))

    // Clear error for this field when user starts typing
    if (fieldErrors[id]) {
      setFieldErrors((prev) => ({
        ...prev,
        [id]: "",
      }))
    }
  }

  // Handle form submission with better error handling
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)
    setFieldErrors({})
    setIsPreviewMode(false)
    setEmailError(null)

    try {
      // Call the server action with form data
      const result = await submitContactForm(formData)

      if (result && result.success) {
        setSubmitStatus("success")
        setFormData({ name: "", email: "", subject: "", message: "" }) // Clear form

        // Check if we're in preview mode based on the message
        if (result.message && (result.message.includes("preview mode") || result.message.includes("simulated"))) {
          setIsPreviewMode(true)
        }
      } else {
        // Safely handle field errors
        if (result && result.fieldErrors) {
          setFieldErrors(result.fieldErrors)
        }

        // Handle email-specific errors
        if (result && result.error) {
          setEmailError(result.error)
        }

        setSubmitStatus(`Error: ${result?.message || "Something went wrong"}`)
      }
    } catch (error) {
      console.error("Submission error:", error)
      setSubmitStatus("Error: Could not send message. Please try again later.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Add this useEffect to clear the status message after 5 seconds
  useEffect(() => {
    if (submitStatus) {
      const timer = setTimeout(() => {
        setSubmitStatus(null)
      }, 5000) // 5 seconds

      return () => clearTimeout(timer)
    }
  }, [submitStatus])

  return (
    <section id="contact" className="py-20 md:py-28 relative bg-gray-900">
      {/* Background pattern - Simplified slightly */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="circuit" width="20" height="20" patternUnits="userSpaceOnUse">
              <path
                d="M0,10 L7,10 M13,10 L20,10 M10,0 L10,7 M10,13 L10,20"
                fill="none"
                stroke="#0CCEA9" // Use primary color variable if available
                strokeWidth="0.5"
              />
              <circle cx="10" cy="10" r="1.5" fill="#0CCEA9" opacity="0.5" />{" "}
              {/* Use primary color variable if available */}
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Let's Discuss Your <span className="text-primary">Project</span>
          </h2>
          <p className="text-gray-300 text-lg">
            We believe in providing custom solutions that perfectly match your needs and budget. Schedule a call or send
            us a message.
          </p>
        </div>
        {/* Main Content Box */}
        <div className="bg-secondary/50 border border-gray-700 rounded-lg overflow-hidden max-w-5xl mx-auto backdrop-blur-sm shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Form Section */}
            <div className="p-8 lg:p-12">
              <h3 className="text-2xl font-semibold mb-6 text-white">Get in Touch</h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 bg-gray-800 border ${
                        fieldErrors.name ? "border-red-500" : "border-gray-700"
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-white placeholder-gray-500`}
                      placeholder="Your name"
                    />
                    {fieldErrors.name && <p className="mt-1 text-sm text-red-500">{fieldErrors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 bg-gray-800 border ${
                        fieldErrors.email ? "border-red-500" : "border-gray-700"
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-white placeholder-gray-500`}
                      placeholder="your@email.com"
                    />
                    {fieldErrors.email && <p className="mt-1 text-sm text-red-500">{fieldErrors.email}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-gray-800 border ${
                      fieldErrors.subject ? "border-red-500" : "border-gray-700"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-white placeholder-gray-500`}
                    placeholder="Project inquiry"
                  />
                  {fieldErrors.subject && <p className="mt-1 text-sm text-red-500">{fieldErrors.subject}</p>}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 bg-gray-800 border ${
                      fieldErrors.message ? "border-red-500" : "border-gray-700"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-white placeholder-gray-500`}
                    placeholder="Tell us about your project and requirements (minimum 10 characters)"
                  ></textarea>
                  {fieldErrors.message && <p className="mt-1 text-sm text-red-500">{fieldErrors.message}</p>}
                  <div className="text-xs text-gray-500 mt-1 flex justify-end">
                    {formData.message.length} / 10+ characters
                  </div>
                </div>

                {/* Display generic form error if it exists */}
                {fieldErrors._form && (
                  <div className="bg-red-900/30 border border-red-700 text-red-400 p-3 rounded-md">
                    {fieldErrors._form}
                  </div>
                )}

                <div>
                  {/* --- MODIFIED BUTTON: Applied 'button--pandora' class --- */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    // Replaced 'button--calypso' with 'button--pandora'
                    // Adjusted inner span structure to match old code's requirement for pandora effect
                    className={`button button--pandora w-full sm:w-auto ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                  </button>
                </div>

                {submitStatus && (
                  <div
                    className={`mt-4 p-4 rounded-md transition-opacity duration-500 ${
                      submitStatus === "success"
                        ? "bg-green-900/30 border border-green-700 text-green-400"
                        : "bg-red-900/30 border border-red-700 text-red-400"
                    }`}
                  >
                    {submitStatus === "success" ? (
                      <div className="flex flex-col items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 mb-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <p>Message sent successfully! We'll get back to you soon.</p>
                        {isPreviewMode && (
                          <p className="text-yellow-400 text-xs mt-1">(Preview mode: Email delivery was simulated)</p>
                        )}
                        {!isPreviewMode && <p className="text-xs mt-1">A notification has been sent to our team.</p>}
                      </div>
                    ) : (
                      <div>
                        <p>{submitStatus}</p>
                        {emailError && (
                          <div className="mt-2 text-sm">
                            <p className="font-semibold">Technical details:</p>
                            <p className="font-mono text-xs mt-1 bg-red-950/50 p-2 rounded">{emailError}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </form>
            </div>

            {/* Contact Info & Booking Section */}
            <div className="bg-gray-900 p-8 lg:p-12 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-semibold mb-8 text-white">Contact Information</h3>

                <div className="space-y-6 mb-12">
                  {/* Email */}
                  <div className="flex items-start group">
                    <div className="bg-primary/10 p-3 rounded-lg mr-4 transition-colors group-hover:bg-primary/20">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-white mb-1">Email</h4>
                      <a
                        href="mailto:tech.zerolag@gmail.com"
                        className="text-gray-400 hover:text-primary transition-colors break-all" // Added break-all for long emails
                      >
                        tech.zerolag@gmail.com
                      </a>
                    </div>
                  </div>


                  {/* Office */}
                  <div className="flex items-start group">
                    <div className="bg-primary/10 p-3 rounded-lg mr-4 transition-colors group-hover:bg-primary/20">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-white mb-1">Office</h4>
                      <p className="text-gray-400">Electronic city, Bengaluru</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Schedule Call Section */}
              <div className="mt-8 lg:mt-0">
                <h4 className="text-xl font-semibold text-white mb-5">Ready to Start?</h4>
                <p className="text-gray-300 mb-6">
                  Schedule a free 30-minute consultation to discuss your project in detail.
                </p>

                {/* --- MODIFIED BUTTON: Applied 'button--atlas' class and structure --- */}
                <a
                  href="https://cal.com/zerolag/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button button--atlas inline-block text-left border-2 border-primary px-4 py-2 text-sm rounded-md"
                  style={{
                    maxWidth: "fit-content",
                    boxShadow: "0 0 10px rgba(12, 206, 169, 0.5)",
                    borderColor: "#0CCEA9",
                    borderWidth: "2px",
                  }}
                >
                  <span>Book 30-minute free consultation</span>
                  <div className="marquee" aria-hidden="true">
                    <div className="marquee__inner">
                      <span>Book 30-minute free consultation</span>
                      <span>Book 30-minute free consultation</span>
                      <span>Book 30-minute free consultation</span>
                      <span>Book 30-minute free consultation</span>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
