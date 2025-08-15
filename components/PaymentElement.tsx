"use client";
import { Elements } from "@stripe/react-stripe-js"
import CheckoutForm from "@/components/CheckoutForm"
import { loadStripe } from "@stripe/stripe-js"
import { useEffect, useState } from "react"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function PaymentElement({ videoId }: { videoId: string }) {

    const [clientSecret, setClientSecret] = useState<string | null>(null);
    // Fetch PaymentIntent client secret on mount
    useEffect(() => {
        fetch("/api/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ videoId }),
        })
            .then(res => res.json())
            .then(data => setClientSecret(data.clientSecret))
    }, [videoId]);
    return (
        <>
            {clientSecret && (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <CheckoutForm videoId={videoId} clientSecret={clientSecret} />
                </Elements>
            )}
            {!clientSecret && <div>Loading payment form...</div>}
        </>
    )
}