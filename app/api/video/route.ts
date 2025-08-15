import mux from "@/lib/mux/mux";
import { NextResponse } from "next/server";

export async function GET() {
  const { data: assets } = await mux.video.assets.list();
  return NextResponse.json(assets);
}