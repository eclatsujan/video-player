"use client"

import { useEffect, useRef, useState } from "react"
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

export default function VideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const playerRef = useRef<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadVideoJS = async () => {
      try {
        // Dynamically import video.js only on the client side
        // console.log(videojs);
        // Import the HLS plugin
        // await import("videojs-contrib-hls")

        // Get the presigned URL from our API
        // const { url } = await getPresignedUrl("example-video.m3u8")
        // console.log("Presigned URL:", url)
        const url = "https://d3j9ndgxu92u8b.cloudfront.net/output.m3u8"; 
        if (!videoRef.current) return

        // Initialize video.js player
        const player = videojs(videoRef.current, {
          controls: true,
          fluid: true,
          responsive: true,
          html5: {
            hls: {
              overrideNative: true,
            },
          },
          sources: [
            {
              src: url,
              type: "application/x-mpegURL",
            },
          ],
        })

        playerRef.current = player
        setIsLoading(false)

        // Clean up function
        return () => {
          if (playerRef.current) {
            playerRef.current.dispose()
          }
        }
      } catch (err) {
        console.error("Failed to load video player:", err)
        setError("Failed to load video player. Please try again later.")
        setIsLoading(false)
      }
    }

    loadVideoJS()
  }, [])

  return (
    <div className="video-player-container">
      {isLoading && (
        <div className="flex justify-center items-center h-64 bg-gray-100 rounded-lg">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      )}

      {error && <div className="flex justify-center items-center h-64 bg-red-50 text-red-500 rounded-lg">{error}</div>}

      <div className={isLoading ? "hidden" : ""}>
        <video
          ref={videoRef}
          className="video-js vjs-big-play-centered"
          controls
          preload="auto"
          width="100%"
          height="auto"
        />
      </div>
    </div>
  )
}
