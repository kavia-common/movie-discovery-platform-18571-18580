import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./styles/tailwind.css";
import App from "./App";
import { AppStateProvider } from "./context/AppState";

// PUBLIC_INTERFACE
function startApp() {
  /** Mount the React app into #root element. */
  const container = document.getElementById("root");
  if (!container) {
    throw new Error("Root container not found");
  }
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <AppStateProvider>
          <App />
        </AppStateProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
}

startApp();
