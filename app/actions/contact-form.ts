"use server"

import { z } from "zod"
import nodemailer from "nodemailer"

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().optional(),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
})

type FormData = z.infer<typeof formSchema>

export async function submitContactForm(formData: FormData) {
  try {
    // Validate form data
    const validatedData = formSchema.parse(formData)

    // Create email content
    const emailContent = `
      New contact form submission:
      
      Name: ${validatedData.name}
      Email: ${validatedData.email}
      Subject: ${validatedData.subject || "No subject provided"}
      
      Message:
      ${validatedData.message}
    `

    // Check if we're in a preview environment
    const isPreviewEnv =
      process.env.VERCEL_ENV === "preview" || process.env.NODE_ENV === "development" || typeof window !== "undefined"

    if (isPreviewEnv) {
      // In preview, just log the email content and simulate success
      console.log("Preview mode - Email would be sent to tech.zerolag@gmail.com with content:", emailContent)

      // Simulate a delay to mimic sending
      await new Promise((resolve) => setTimeout(resolve, 1000))

      return {
        success: true,
        message: "Message sent successfully! (Preview mode - email not actually sent)",
      }
    }

    // In production, actually send the email
    try {
      // Configure email transport using environment variables
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // Use TLS
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      })

      // Log that we're attempting to send an email
      console.log(`Attempting to send email using ${process.env.EMAIL_USER}`)

      // Send email to tech.zerolag@gmail.com
      const info = await transporter.sendMail({
        from: `"ZeroLag Website" <${process.env.EMAIL_USER}>`,
        to: "tech.zerolag@gmail.com", // Change this to the specified email
        subject: `New Contact Form: ${validatedData.subject || "No subject"}`,
        text: emailContent,
      })

      console.log("Email sent successfully:", info.messageId)

      // Return success
      return { success: true, message: "Message sent successfully!" }
    } catch (emailError) {
      console.error("Email sending error:", emailError)

      // If we're in development or preview, treat this as a non-fatal error
      if (isPreviewEnv) {
        return {
          success: true,
          message: "Message received! (Note: Email sending was simulated in preview mode)",
        }
      }

      // In production, return the error to the user
      return {
        success: false,
        message: "Failed to send email. Please try again later or contact us directly.",
        error: emailError instanceof Error ? emailError.message : "Unknown error",
      }
    }
  } catch (error) {
    console.error("Contact form submission error:", error)

    if (error instanceof z.ZodError) {
      // Return validation errors in a more structured way - with defensive coding
      const fieldErrors: Record<string, string> = {}

      // Safely process Zod errors
      error.errors.forEach((err) => {
        // Make sure path exists and has at least one element
        if (err.path && err.path.length > 0 && typeof err.path[0] === "string") {
          const field = err.path[0]
          fieldErrors[field] = err.message
        } else {
          // If we can't determine the field, use a generic key
          fieldErrors["_form"] = err.message
        }
      })

      return {
        success: false,
        message: "Please fix the errors in your form",
        fieldErrors,
      }
    }

    // Check for DNS lookup error specifically
    if (error instanceof Error && error.message.includes("dns.lookup is not implemented")) {
      return {
        success: true,
        message: "Message received! (Note: Email delivery was simulated in preview mode)",
      }
    }

    // Return generic error
    return { success: false, message: "Failed to send message. Please try again later." }
  }
}
