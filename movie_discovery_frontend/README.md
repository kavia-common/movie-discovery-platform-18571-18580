# Movie Discovery Frontend

Bold, dark-themed React app to discover movies via TMDB: search, recommendations, trailers, ratings, watchlist, and Jira visualization.

## Stack

- Vite + React + TypeScript
- Tailwind CSS (Ocean Professional theme)
- React Router v6
- Context + Reducer with localStorage

## Features

- Header with search bar
- Tabs: Recommendations, Search Results, Watchlist, Jira
- Movie detail modal with YouTube trailer
- Local ratings and watchlist (persisted to localStorage)
- Jira board visualization (columns by status)
- Loading skeletons and error states

## Getting Started

1) Install dependencies:
   npm install

2) Create .env from .env.example:
   cp .env.example .env
   # Put your TMDB API key in VITE_TMDB_API_KEY

3) Run in development (port 3000):
   npm run dev
   # Open http://localhost:3000

4) Build for production:
   npm run build
   npm run preview  # serves build on port 3000

## Environment Variables

- VITE_TMDB_API_KEY: Your TMDB API key (required for search/recommendations)
- VITE_TMDB_API_BASE: Defaults to https://api.themoviedb.org/3
- VITE_TMDB_IMAGE_BASE: Defaults to https://image.tmdb.org/t/p
- VITE_YOUTUBE_EMBED_BASE: Defaults to https://www.youtube.com/embed/
- VITE_JIRA_BASE_URL: Jira base URL, e.g., https://your-domain.atlassian.net
- VITE_JIRA_EMAIL: Jira account email
- VITE_JIRA_API_TOKEN: Jira API token
- VITE_JIRA_PROJECT_KEY: Jira project key (e.g., MDP)

If Jira env vars are not set, the Jira page shows placeholder demo data.

Note: Calling Jira directly from the browser with Basic Auth may fail due to CORS. In production, use a server-side proxy to handle Jira credentials and requests.

## Project Structure

- src/index.tsx: Entry with Router and AppStateProvider
- src/App.tsx: App shell + header + tabs
- src/routes.tsx: Route definitions
- src/context/AppState.tsx: Watchlist/ratings state with localStorage persistence
- src/components/*: UI components (HeaderSearch, MovieCard, MovieGrid, RatingStars, WatchlistButton, TrailerPlayer, MovieModal)
- src/pages/*: Page components (Home, SearchResults, Watchlist, JiraView)
- src/services/*: tmdbClient and jiraClient

## Theme

Ocean Professional (Bold):
- Background: #000000
- Surface: #1F2937
- Text: #FFFFFF
- Primary: #F97316
- Secondary/Success: #10B981
- Error: #EF4444
- Gradient: from-orange-500/20 to-black

Tailwind is configured accordingly; see tailwind.config.js and src/styles/tailwind.css.

## Routing

- /: Home with recommendations (TMDB Popular)
- /search?q=: Search results
- /watchlist: Your locally saved watchlist
- /jira: Jira board visualization

## Accessibility

- Buttons and form controls include labels and roles where applicable.
- Modal is focusable via buttons and can be closed with the Close button.

## Notes

- Keep your TMDB key in .env; never commit secrets.
- Jira integration is read-only and designed for proxy-based usage in production.

