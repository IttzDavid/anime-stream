/* src/app/page.tsx */
"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface AnimeResult {
  id: string;
  name: string;
  poster: string;
  type: string;
  rating: string;
}

interface ApiAnime {
  id: string;
  name: string;
  poster: string;
  type: string;
  rating?: string;
}

interface ApiPayload {
  status: number;
  data?: {
    animes?: ApiAnime[];
  };
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<AnimeResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/anime/search?q=${encodeURIComponent(query)}&page=1`);
      const payload: ApiPayload = await res.json();

      if (payload.status !== 200 || !Array.isArray(payload.data?.animes)) {
        setError("No results found");
        setResults([]);
      } else {
        const mapped = payload.data.animes.map((a) => ({
          id: a.id,
          name: a.name,
          poster: a.poster,
          type: a.type,
          rating: a.rating ?? "",
        }));
        setResults(mapped);
      }
    } catch (e) {
      console.error("Fetch error:", e);
      setError("Something went wrong");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container mt-4">
      <h1 className="mb-4">Aniwatch Search</h1>

      <div className="input-group mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search for anime…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button className="btn btn-primary" onClick={handleSearch}>
          Search
        </button>
      </div>

      {loading && <p>Loading…</p>}
      {error && <p className="text-danger">{error}</p>}

      <div className="row">
        {results.map((anime) => (
          <div key={anime.id} className="col-md-4 mb-4">
            <div className="card h-100">
              <Image
                src={anime.poster}
                alt={anime.name}
                width={300}
                height={250}
                style={{ objectFit: "cover" }}
                className="card-img-top"
                priority
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{anime.name}</h5>
                <p className="card-text mb-1">
                  <strong>Type:</strong> {anime.type}
                </p>
                <p className="card-text mb-3">
                  <strong>Rating:</strong> {anime.rating}
                </p>
                <Link href={`/anime/${anime.id}`} className="btn btn-outline-primary mt-auto">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
