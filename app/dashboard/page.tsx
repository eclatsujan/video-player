"use client"
import { getThumbnailImage } from "@/lib/mux/helper"
import { Asset } from "@mux/mux-node/resources/video/assets.mjs"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"


export default function Dashboard() {
  const [videos, setVideos] = useState<Asset[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchVideos() {
      const res = await fetch("/api/video")
      const data = await res.json()
      setVideos(data)
      setLoading(false)
    }
    fetchVideos()
  }, [])

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-8">Video Dashboard</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {videos.map(video => (
            <Link
              key={video.id}
              href={`/video/${video.id}`}
              className="hover:scale-[1.02] transition-transform"
            >
              <Card className="flex flex-col overflow-hidden cursor-pointer h-full">
                <Image
                  alt={video.meta?.title ?? ""}
                  src={getThumbnailImage(video.playback_ids?.at(0)?.id ?? "")}
                  width={500}
                  height={280}
                  className="object-cover w-full h-56"
                />
                <CardHeader>
                  <CardTitle>{video.meta?.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Add more video info or actions here if needed */}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}