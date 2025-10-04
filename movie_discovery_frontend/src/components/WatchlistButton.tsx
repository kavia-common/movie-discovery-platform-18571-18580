import { Movie, useAppState } from "../context/AppState";

type Props = { movie: Movie };

// PUBLIC_INTERFACE
export default function WatchlistButton({ movie }: Props) {
  const { watchlist, dispatch } = useAppState();
  const inList = !!watchlist[movie.id];

  return (
    <button
      className={`px-3 py-2 rounded-xl font-bold transition-all ${
        inList ? "bg-white/10 text-white hover:bg-white/20" : "bg-primary text-black hover:brightness-110"
      }`}
      onClick={() => dispatch({ type: "TOGGLE_WATCHLIST", movie })}
      aria-pressed={inList}
      aria-label={inList ? "Remove from watchlist" : "Add to watchlist"}
    >
      {inList ? "Remove" : "Add"}
    </button>
  );
}
