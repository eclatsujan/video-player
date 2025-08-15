import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"
import mux from "@/lib/mux/mux"

const SIGNING_KEY_ID = process.env.MUX_SIGNING_KEY_ID || ""
const SIGNING_KEY_SECRET = process.env.MUX_SIGNING_KEY_SECRET || ""

function generateSignedUrl(playbackId: string, signingKeyId: string, signingKeySecret: string, expiration: number = 3600) {
  const baseUrl = `https://stream.mux.com/${playbackId}.m3u8`
  const expires = Math.floor(Date.now() / 1000) + expiration
  const params = `exp=${expires}&kid=${signingKeyId}`
  const signatureBase = `/video/${playbackId}.m3u8?${params}`
  const signature = crypto
    .createHmac("sha256", signingKeySecret)
    .update(signatureBase)
    .digest("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "")
  return `${baseUrl}?${params}&sig=${signature}`
}


export async function GET(request: NextRequest) {
  try {
    // Get the assetId from the query parameters
    const { searchParams } = new URL(request.url);
    const assetId = searchParams.get("id")

    if (!assetId) {
      return NextResponse.json({ error: "Asset ID is required" }, { status: 400 })
    }

    // Fetch the asset details from Mux
    const asset = await mux.video.assets.retrieve(assetId)
    console.log(asset);
    // Get the first playback ID
    const playbackId = asset.playback_ids?.at(0)?.id;
    if (!playbackId) {
      return NextResponse.json({ error: "No playback ID found for asset" }, { status: 404 })
    }
    const url = `https://stream.mux.com/${playbackId}.m3u8`;
    // Generate signed URL
    // const signedUrl = generateSignedUrl(playbackId, SIGNING_KEY_ID, SIGNING_KEY_SECRET)

    return NextResponse.json({ url,id:playbackId })
  } catch (error) {
    console.error("Error generating Mux playback URL:", error)
    return NextResponse.json({ error: "Failed to generate Mux playback URL" }, { status: 500 })
  }
}
