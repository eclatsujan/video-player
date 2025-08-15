"use client"
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function CheckoutForm({ videoId,clientSecret }: { videoId: string,clientSecret:string }) {
  const stripe = useStripe()
  const elements = useElements()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    if (!stripe || !elements) return

    // You need to fetch the clientSecret from your backend before this step
  
    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setError("Card element not found");
      setLoading(false);
      return;
    }
    console.log(clientSecret);
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
      },
    });

    if (result.error) {
      setError(result.error.message || "Payment failed")
      setLoading(false)
    } else if (result.paymentIntent?.status === "succeeded") {
      router.push(`/api/rental-callback/${videoId}?payment_intent=${result.paymentIntent.id}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <CardElement className="mb-4 p-2 border rounded" />
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <button
        type="submit"
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 w-full"
        disabled={loading}
      >
        {loading ? "Processing..." : "Pay"}
      </button>
    </form>
  )
}