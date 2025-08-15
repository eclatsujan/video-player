import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-07-30.basil",
})

export async function GET(request: NextRequest, { params }: { params: { videoId: string } }) {
  const url = new URL(request.url)
  const paymentIntentId = url.searchParams.get("payment_intent")
  if (!paymentIntentId) return NextResponse.redirect(`/video/${params.videoId}/pay?error=missing_payment_intent`)

  // Verify payment intent status
  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)
  if (paymentIntent.status !== "succeeded") {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/video/${params.videoId}/pay?error=payment_not_completed`)
  }

  // Set rental cookie for 24 hours
  const cookieKey = `rental_${params.videoId}`
  const expiry = Date.now() + 24 * 60 * 60 * 1000
  const response = NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/video/${params.videoId}`)
  response.cookies.set(cookieKey, String(expiry), {
    expires: new Date(expiry),
    httpOnly: false,
    path: "/",
  })
  return response
}