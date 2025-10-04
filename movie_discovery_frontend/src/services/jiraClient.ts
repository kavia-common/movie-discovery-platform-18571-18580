export type JiraIssue = {
  id: string;
  key: string;
  fields: {
    summary: string;
    status: { name: string };
  };
};

const JIRA_BASE = import.meta.env.VITE_JIRA_BASE_URL as string | undefined;
const JIRA_EMAIL = import.meta.env.VITE_JIRA_EMAIL as string | undefined;
const JIRA_TOKEN = import.meta.env.VITE_JIRA_API_TOKEN as string | undefined;
const JIRA_PROJECT = import.meta.env.VITE_JIRA_PROJECT_KEY as string | undefined;

// INTERNAL: Build headers; warn if running in browser without proxy
function buildHeaders(): HeadersInit {
  if (!JIRA_EMAIL || !JIRA_TOKEN) {
    throw new Error("Jira credentials not configured.");
  }
  // WARNING: Direct basic auth from browser is generally not recommended.
  // Prefer a server-side proxy. This client will attempt direct calls if CORS allows.
  const auth = btoa(`${JIRA_EMAIL}:${JIRA_TOKEN}`);
  return {
    Authorization: `Basic ${auth}`,
    Accept: "application/json"
  };
}

async function jiraGet<T>(path: string, params?: Record<string, string>): Promise<T> {
  if (!JIRA_BASE) throw new Error("Jira base URL not configured.");
  const usp = new URLSearchParams(params);
  const url = `${JIRA_BASE}${path}?${usp.toString()}`;
  const res = await fetch(url, { headers: buildHeaders() });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Jira error ${res.status}: ${text}`);
  }
  return res.json() as Promise<T>;
}

// PUBLIC_INTERFACE
export async function fetchProjectIssues(): Promise<JiraIssue[]> {
  if (!JIRA_BASE || !JIRA_EMAIL || !JIRA_TOKEN || !JIRA_PROJECT) {
    // fallback demo issues for placeholder mode
    return [
      { id: "1", key: "DEMO-1", fields: { summary: "Enable trailer autoplay", status: { name: "To Do" } } },
      { id: "2", key: "DEMO-2", fields: { summary: "Add dark mode toggle", status: { name: "In Progress" } } },
      { id: "3", key: "DEMO-3", fields: { summary: "Fix mobile layout", status: { name: "Done" } } }
    ];
  }
  const jql = `project=${JIRA_PROJECT}`;
  const data = await jiraGet<{ issues: JiraIssue[] }>("/rest/api/3/search", { jql });
  return data.issues;
}
