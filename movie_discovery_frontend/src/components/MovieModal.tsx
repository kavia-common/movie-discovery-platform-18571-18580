import React from "react";
import { Movie, useAppState } from "../context/AppState";
import TrailerPlayer from "./TrailerPlayer";
import RatingStars from "./RatingStars";
import WatchlistButton from "./WatchlistButton";

type Props = {
  movie?: Movie;
  onClose: () => void;
  trailerKey?: string;
};

// PUBLIC_INTERFACE
export default function MovieModal({ movie, onClose, trailerKey }: Props) {
  const { ratings, dispatch } = useAppState();
  if (!movie) return null;

  return (
    <div className="fixed inset-0 z-40">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="card max-w-4xl w-full overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <div className="font-extrabold text-xl">{movie.title}</div>
            <button
              className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20"
              onClick={onClose}
              aria-label="Close"
            >
              Close
            </button>
          </div>
          <div className="p-4 grid md:grid-cols-2 gap-4">
            <div>
              <TrailerPlayer youtubeKey={trailerKey} />
            </div>
            <div className="flex flex-col gap-4">
              <div className="text-white/80">{movie.overview || "No overview available."}</div>
              <div className="flex items-center gap-3">
                <span className="text-white/60">Your rating:</span>
                <RatingStars
                  value={ratings[movie.id] ?? 0}
                  onChange={(v) => dispatch({ type: "RATE_MOVIE", movieId: movie.id, rating: v })}
                />
              </div>
              <div>
                <WatchlistButton movie={movie} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
