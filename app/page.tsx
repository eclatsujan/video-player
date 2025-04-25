import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import LoginForm from "@/components/login-form"

export default function Home() {
  // Check if user is already logged in
  const isLoggedIn = cookies().has("auth_token")

  // If logged in, redirect to the video player
  if (isLoggedIn) {
    redirect("/video-player")
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Video Platform</h1>
        <LoginForm />
      </div>
    </main>
  )
}
