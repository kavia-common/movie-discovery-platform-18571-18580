import React, { Suspense } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import RoutesView from "./routes";
import HeaderSearch from "./components/HeaderSearch";

// PUBLIC_INTERFACE
export default function App() {
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen bg-[var(--bg)] text-white">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[var(--bg)]/60 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="h-10 w-10 rounded-2xl gradient-accent flex items-center justify-center border border-white/10">
              <span className="text-primary font-black text-xl">MD</span>
            </div>
            <div className="font-extrabold text-lg tracking-wide">
              Movie Discovery
            </div>
          </Link>
          <div className="flex-1">
            <HeaderSearch />
          </div>
          <nav className="hidden md:flex items-center gap-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `tab ${isActive && pathname === "/" ? "bg-white/10" : "hover:bg-white/5"}`
              }
            >
              Recommendations
            </NavLink>
            <NavLink
              to="/watchlist"
              className={({ isActive }) =>
                `tab ${isActive ? "bg-white/10" : "hover:bg-white/5"}`
              }
            >
              Watchlist
            </NavLink>
            <NavLink
              to="/jira"
              className={({ isActive }) =>
                `tab ${isActive ? "bg-white/10" : "hover:bg-white/5"}`
              }
            >
              Jira
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <Suspense
          fallback={
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="card h-56 animate-pulse" />
              ))}
            </div>
          }
        >
          <RoutesView />
        </Suspense>
      </main>

      <footer className="border-t border-white/10 py-6 text-center text-white/50">
        Built with the Ocean Professional theme
      </footer>
    </div>
  );
}
