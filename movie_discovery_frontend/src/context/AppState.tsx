import React, { createContext, useContext, useEffect, useMemo, useReducer } from "react";

export type Movie = {
  id: number;
  title: string;
  overview?: string;
  poster_path?: string | null;
  backdrop_path?: string | null;
  vote_average?: number;
  release_date?: string;
};

type State = {
  watchlist: Record<number, Movie>;
  ratings: Record<number, number>;
};

type Action =
  | { type: "TOGGLE_WATCHLIST"; movie: Movie }
  | { type: "RATE_MOVIE"; movieId: number; rating: number }
  | { type: "HYDRATE"; state: State };

const initialState: State = {
  watchlist: {},
  ratings: {}
};

const STORAGE_KEY = "mdp_state_v1";

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "TOGGLE_WATCHLIST": {
      const next = { ...state.watchlist };
      if (next[action.movie.id]) {
        delete next[action.movie.id];
      } else {
        next[action.movie.id] = action.movie;
      }
      return { ...state, watchlist: next };
    }
    case "RATE_MOVIE": {
      return {
        ...state,
        ratings: { ...state.ratings, [action.movieId]: action.rating }
      };
    }
    case "HYDRATE":
      return action.state;
    default:
      return state;
  }
}

type Ctx = State & {
  dispatch: React.Dispatch<Action>;
};

const AppStateContext = createContext<Ctx | undefined>(undefined);

// PUBLIC_INTERFACE
export const AppStateProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // hydrate from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as State;
        dispatch({ type: "HYDRATE", state: parsed });
      }
    } catch {
      // ignore
    }
  }, []);

  // persist to localStorage
  useEffect(() => {
    try {
      const toSave: State = { watchlist: state.watchlist, ratings: state.ratings };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    } catch {
      // ignore
    }
  }, [state.watchlist, state.ratings]);

  const value = useMemo(() => ({ ...state, dispatch }), [state]);

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
};

// PUBLIC_INTERFACE
export function useAppState() {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error("useAppState must be used within AppStateProvider");
  return ctx;
}
