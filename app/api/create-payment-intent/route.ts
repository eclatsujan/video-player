import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-07-30.basil",
})

export async function POST(request: NextRequest) {
  const { videoId } = await request.json()
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 500, // $5.00
    currency: "usd",
    metadata: { videoId },
  })
  return NextResponse.json({ clientSecret: paymentIntent.client_secret })
}