import { useRoutes } from "react-router-dom";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import WatchlistPage from "./pages/Watchlist";
import JiraView from "./pages/JiraView";

// PUBLIC_INTERFACE
export default function RoutesView() {
  const routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/search", element: <SearchResults /> },
    { path: "/watchlist", element: <WatchlistPage /> },
    { path: "/jira", element: <JiraView /> }
  ]);
  return routes;
}
