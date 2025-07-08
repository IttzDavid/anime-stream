const API_URL = "https://consumet-sable.vercel.app/api/anime";

async function getAnimeList() {
  const res = await fetch(`${API_URL}/popular`); // example endpoint
  if (!res.ok) {
    throw new Error("Failed to fetch anime list");
  }
  const data = await res.json();
  return data.results; // adjust based on your API's response shape
}

async function getAnimeById(id: string) {
  const res = await fetch(`${API_URL}/info/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch anime details");
  }
  const data = await res.json();
  return data; // adjust as necessary
}

export { getAnimeList, getAnimeById };
