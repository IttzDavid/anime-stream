import { notFound } from "next/navigation";
import VideoPlayer from "@/components/VideoPlayer";

const ANIWATCH_BASE = "https://aniwatch-pi-smoky.vercel.app";
const PROXY_BASE = "https://gogoanime-and-hianime-proxy-omega.vercel.app";

interface Params {
  params: Promise<{
    animeId: string;
    episodeId: string;
  }>;
}

export default async function WatchPage({ params }: Params) {
  const { animeId, episodeId } = await params;

  const srcUrl =
    `${ANIWATCH_BASE}/api/v2/hianime/episode/sources` +
    `?animeEpisodeId=${encodeURIComponent(episodeId)}` +
    `&server=hd-2&category=sub`;

  const srcRes = await fetch(srcUrl, { cache: "no-store" });
  if (!srcRes.ok) return notFound();
  const { data } = await srcRes.json();

  const firstSource = data.sources?.[0]?.url;
  if (!firstSource) return notFound();

  const proxiedUrl =
    `${PROXY_BASE}/m3u8-proxy?url=` + encodeURIComponent(firstSource);

  return (
    <main className="container mt-4">
      <h1 className="mb-4">
        Watching: {animeId.replace(/-/g, " ")} — Episode {episodeId}
      </h1>
      <div className="ratio ratio-16x9 mb-4">
        <VideoPlayer src={proxiedUrl} />
      </div>
      <a href={`/anime/${animeId}`} className="btn btn-secondary">
        ← Back to Details
      </a>
    </main>
  );
}
