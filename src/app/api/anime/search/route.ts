// src/app/api/anime/search/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const q    = searchParams.get('q')    || '';
  const page = searchParams.get('page') || '1';

  const target = new URL(
    'https://aniwatch-pi-smoky.vercel.app/api/v2/hianime/search'
  );
  target.searchParams.set('q', q);
  target.searchParams.set('page', page);

  const resp = await fetch(target.toString());
  console.log(resp)
  if (!resp.ok) return NextResponse.error();

  const json = await resp.json();
  console.log(json)
  return NextResponse.json(json);
}
