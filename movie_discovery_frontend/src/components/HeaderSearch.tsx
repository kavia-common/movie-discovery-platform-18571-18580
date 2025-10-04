import React, { FormEvent, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

// PUBLIC_INTERFACE
export default function HeaderSearch() {
  const [params] = useSearchParams();
  const initial = params.get("q") ?? "";
  const [q, setQ] = useState(initial);
  const nav = useNavigate();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (q.trim().length === 0) return;
    nav(`/search?q=${encodeURIComponent(q.trim())}`);
  };

  return (
    <form onSubmit={onSubmit} className="flex items-center gap-2">
      <input
        className="input w-full"
        placeholder="Search movies..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
        aria-label="Search movies"
      />
      <button className="btn-primary px-4 py-3" type="submit">
        Search
      </button>
    </form>
  );
}
