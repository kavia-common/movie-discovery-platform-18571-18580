import React from "react";
import { Movie } from "../context/AppState";
import MovieCard from "./MovieCard";

type Props = {
  movies: Movie[];
  onOpen: (m: Movie) => void;
} & React.ComponentProps<"div">;

// PUBLIC_INTERFACE
export default function MovieGrid({ movies, onOpen }: Props) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
      {movies.map((m) => (
        <MovieCard key={m.id} movie={m} onOpen={onOpen} />
      ))}
    </div>
  );
}
