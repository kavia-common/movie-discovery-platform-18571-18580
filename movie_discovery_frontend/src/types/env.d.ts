interface ImportMetaEnv {
  readonly VITE_TMDB_API_KEY?: string;
  readonly VITE_TMDB_API_BASE?: string;
  readonly VITE_TMDB_IMAGE_BASE?: string;
  readonly VITE_JIRA_BASE_URL?: string;
  readonly VITE_JIRA_EMAIL?: string;
  readonly VITE_JIRA_API_TOKEN?: string;
  readonly VITE_JIRA_PROJECT_KEY?: string;
  readonly VITE_YOUTUBE_EMBED_BASE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
