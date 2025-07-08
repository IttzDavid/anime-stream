import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

interface Genre {
  name?: string;
  [key: string]: unknown;
}

interface Episode {
  episodeId: string;
  number: number | string;
}

interface AnimeData {
  name: string;
  poster: string;
  type: string;
  status: string;
  genres: (string | Genre)[];
  synopsis?: string;
}

interface EpisodesData {
  episodes: Episode[];
}

interface Params {
  params: Promise<{ animeId: string }>;
}

export default async function Page({ params }: Params) {
  const { animeId } = await params;

  // 1️⃣ Fetch “About” info
  const infoRes = await fetch(
    `https://aniwatch-pi-smoky.vercel.app/api/v2/hianime/anime/${encodeURIComponent(
      animeId
    )}`,
    { cache: "no-store" }
  );
  if (!infoRes.ok) return notFound();
  const { data }: { data: AnimeData } = await infoRes.json();

  // 2️⃣ Fetch Episodes list
  const epsRes = await fetch(
    `https://aniwatch-pi-smoky.vercel.app/api/v2/hianime/anime/${encodeURIComponent(
      animeId
    )}/episodes`,
    { cache: "no-store" }
  );
  if (!epsRes.ok) return notFound();
  const { data: epsData }: { data: EpisodesData } = await epsRes.json();

  // Safely format genres
  const genreList = Array.isArray(data.genres)
    ? data.genres
        .map((g) => (typeof g === "string" ? g : g.name ?? JSON.stringify(g)))
        .join(", ")
    : "Unknown";

  return (
    <main className="container mt-4">
      <h1 className="mb-3">{data.name}</h1>

      <div className="row mb-5">
        <div className="col-md-4">
          <Image
            src={data.poster}
            alt={data.name}
            width={300}
            height={450}
            className="rounded"
            priority
          />
        </div>
        <div className="col-md-8">
          <p>
            <strong>Type:</strong> {data.type}
          </p>
          <p>
            <strong>Status:</strong> {data.status}
          </p>
          <p>
            <strong>Genres:</strong> {genreList}
          </p>
          <p>
            <strong>Synopsis:</strong> {data.synopsis || "No synopsis available."}
          </p>
        </div>
      </div>

      <h2 className="mb-3">Episodes</h2>
      <ul className="list-group mb-5">
        {epsData.episodes.map((ep) => (
          <li
            key={ep.episodeId}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <span>Episode {ep.number}</span>
            <Link
              href={`/anime/${animeId}/episode/${encodeURIComponent(ep.episodeId)}`}
              className="btn btn-sm btn-outline-primary"
            >
              Watch
            </Link>
          </li>
        ))}
      </ul>

      <Link href="/" className="btn btn-secondary">
        ← Back to Search
      </Link>
    </main>
  );
}
