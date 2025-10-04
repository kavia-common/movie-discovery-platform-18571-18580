import type { Movie } from "../context/AppState";

const API_BASE = import.meta.env.VITE_TMDB_API_BASE || "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

// INTERNAL fetch wrapper
async function apiGet<T>(path: string, params?: Record<string, string | number | undefined>): Promise<T> {
  if (!API_KEY) {
    throw new Error("TMDB API key missing. Set VITE_TMDB_API_KEY in .env.");
  }
  const usp = new URLSearchParams({ api_key: API_KEY as string, language: "en-US" });
  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined) usp.set(k, String(v));
    });
  }
  const url = `${API_BASE}${path}?${usp.toString()}`;
  const res = await fetch(url);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`TMDB error ${res.status}: ${text}`);
  }
  return res.json() as Promise<T>;
}

type Paginated<T> = { page: number; results: T[] };

// PUBLIC_INTERFACE
export async function fetchPopular(): Promise<Movie[]> {
  const data = await apiGet<Paginated<any>>("/movie/popular");
  return mapMovies(data.results);
}

// PUBLIC_INTERFACE
export async function searchMovies(query: string): Promise<Movie[]> {
  const data = await apiGet<Paginated<any>>("/search/movie", { query });
  return mapMovies(data.results);
}

// PUBLIC_INTERFACE
export async function fetchMovieDetails(id: number): Promise<Movie & { videos?: { results?: any[] } }> {
  return apiGet(`/movie/${id}`, { append_to_response: "videos" });
}

// PUBLIC_INTERFACE
export function mapMovies(results: any[]): Movie[] {
  return (results || []).map((r: any) => ({
    id: r.id,
    title: r.title || r.name,
    overview: r.overview,
    poster_path: r.poster_path,
    backdrop_path: r.backdrop_path,
    vote_average: r.vote_average,
    release_date: r.release_date
  })) as Movie[];
}
