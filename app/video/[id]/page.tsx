import { notFound, redirect } from "next/navigation"
import { cookies } from "next/headers"
import MuxPlayer from '@mux/mux-player-react'

async function getPresignedUrl(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/presigned-url?id=${id}`, {
    cache: "no-store",
  })
  if (!res.ok) return null
  const data = await res.json()
  return data as { url: string, id: string }
}

export default async function VideoPage({ params, searchParams }: { params: { id: string }, searchParams: { paid?: string } }) {
  const cookieKey = `rental_${params.id}`
  const cookieStore = await cookies();
  const rentalExpiry = cookieStore.get(cookieKey)?.value
  const now = Date.now()

  // If rental cookie exists and is valid, show video
  if (rentalExpiry && Number(rentalExpiry) > now) {
    const data = await getPresignedUrl(params.id)
    if (!data) return notFound()
    const { url, id } = data
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8">
        <div className="w-full">
          <MuxPlayer playbackId={id} streamType="on-demand" src={url} />
        </div>
      </div>
    )
  }
  // Otherwise, redirect to payment page or show payment button
  redirect(`/video/${params.id}/pay`)
}
