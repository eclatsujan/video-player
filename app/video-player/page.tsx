import VideoPlayer from "@/components/video-player"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default function Home() {
   // Check if user is logged in
   const isLoggedIn = cookies().has("auth_token")

   // If not logged in, redirect to login page
   if (!isLoggedIn) {
     redirect("/")
   }
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-center">HLS Video Player</h1>
        <VideoPlayer />
      </div>
    </main>
  )
}
