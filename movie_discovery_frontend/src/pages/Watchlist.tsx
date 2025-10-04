import React, { useState } from "react";
import { useAppState, Movie } from "../context/AppState";
import MovieGrid from "../components/MovieGrid";
import MovieModal from "../components/MovieModal";
import { fetchMovieDetails } from "../services/tmdbClient";

export default function WatchlistPage() {
  const { watchlist } = useAppState();
  const movies = Object.values(watchlist);
  const [open, setOpen] = useState<Movie | undefined>(undefined);
  const [trailerKey, setTrailerKey] = useState<string | undefined>(undefined);

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
      <h1 className="text-2xl md:text-3xl font-extrabold">Your Watchlist</h1>
      {movies.length === 0 ? (
        <div className="card p-6 text-white/70">Your watchlist is empty. Add some movies!</div>
      ) : (
        <MovieGrid movies={movies} onOpen={onOpen} />
      )}
      {open && <MovieModal movie={open} trailerKey={trailerKey} onClose={() => setOpen(undefined)} />}
    </section>
  );
}
