import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ animeId: string }> }
) {
  const { animeId } = await params;

  const url = `https://aniwatch-pi-smoky.vercel.app/api/v2/hianime/anime/${encodeURIComponent(animeId)}`;
  const res = await fetch(url);
  if (!res.ok) return NextResponse.error();

  const json = await res.json();
  return NextResponse.json(json);
}
