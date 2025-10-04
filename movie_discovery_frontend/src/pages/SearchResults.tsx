import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies, fetchMovieDetails } from "../services/tmdbClient";
import { Movie } from "../context/AppState";
import MovieGrid from "../components/MovieGrid";
import MovieModal from "../components/MovieModal";

export default function SearchResults() {
  const [params] = useSearchParams();
  const q = params.get("q") || "";
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [open, setOpen] = useState<Movie | undefined>(undefined);
  const [trailerKey, setTrailerKey] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!q) return;
    let alive = true;
    setLoading(true);
    setError(undefined);
    searchMovies(q)
      .then((res) => {
        if (alive) setMovies(res);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
    return () => {
      alive = false;
    };
  }, [q]);

  const onOpen = async (m: Movie) => {
    setOpen(m);
    try {
      const full = await fetchMovieDetails(m.id);
      const yt = full.videos?.results?.find((v: any) => v.site === "YouTube" && v.type === "Trailer");
      setTrailerKey(yt?.key);
    } catch {
      setTrailerKey(undefined);
    }
  };

  return (
    <section className="space-y-6">
      <div className="flex items-end justify-between">
        <h1 className="text-2xl md:text-3xl font-extrabold">Search results</h1>
        <div className="text-white/60">for “{q}”</div>
      </div>
      {loading && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="card h-64 animate-pulse" />
          ))}
        </div>
      )}
      {error && <div className="card p-4 border border-error/50 text-error">{error}</div>}
      {!loading && !error && <MovieGrid movies={movies} onOpen={onOpen} />}
      {open && <MovieModal movie={open} trailerKey={trailerKey} onClose={() => setOpen(undefined)} />}
    </section>
  );
}
