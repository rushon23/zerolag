import { NextResponse } from "next/server"
import { submitContactForm } from "@/app/actions/contact-form"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const result = await submitContactForm(body)

    if (result.success) {
      return NextResponse.json({ message: "Message sent successfully" }, { status: 200 })
    } else {
      return NextResponse.json({ message: result.message, errors: result.errors }, { status: 400 })
    }
  } catch (error) {
    console.error("Contact API error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
