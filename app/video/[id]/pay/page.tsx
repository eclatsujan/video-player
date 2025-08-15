import { useState } from "react"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import CheckoutForm from "@/components/CheckoutForm"
import PaymentElement from "@/components/PaymentElement"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default async function VideoPayPage({ params }: { params:Promise< { id: string } >}) {
  const awaitedParams = await params;


  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-4">Rent this video for 24 hours</h1>
      <p className="mb-8 text-lg">Pay $5.00 to unlock this video for 24 hours.</p>
      <PaymentElement videoId={awaitedParams.id} />
    </div>
  )
}