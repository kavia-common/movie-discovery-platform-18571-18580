import React from "react";
import { Movie, useAppState } from "../context/AppState";
import WatchlistButton from "./WatchlistButton";
import RatingStars from "./RatingStars";

type Props = {
  movie: Movie;
  onOpen: (m: Movie) => void;
  imageBase?: string;
};

// PUBLIC_INTERFACE
export default function MovieCard({ movie, onOpen, imageBase }: Props) {
  const { ratings, dispatch } = useAppState();
  const rating = ratings[movie.id] ?? 0;
  const imgBase = imageBase || (import.meta.env.VITE_TMDB_IMAGE_BASE || "https://image.tmdb.org/t/p");
  const poster = movie.poster_path ? `${imgBase}/w500${movie.poster_path}` : undefined;

  return (
    <div className="card overflow-hidden group">
      <button className="block w-full text-left" onClick={() => onOpen(movie)}>
        {poster ? (
          <img
            src={poster}
            alt={movie.title}
            className="w-full h-72 object-cover group-hover:scale-[1.02] transition-transform"
            loading="lazy"
          />
        ) : (
          <div className="h-72 flex items-center justify-center text-white/40">No Image</div>
        )}
      </button>
      <div className="p-4 flex flex-col gap-3">
        <div className="font-bold text-lg line-clamp-1">{movie.title}</div>
        <div className="text-white/60 text-sm line-clamp-2">{movie.overview}</div>
        <div className="flex items-center justify-between gap-3">
          <RatingStars
            value={rating}
            onChange={(v) => dispatch({ type: "RATE_MOVIE", movieId: movie.id, rating: v })}
          />
          <WatchlistButton movie={movie} />
        </div>
      </div>
    </div>
  );
}
