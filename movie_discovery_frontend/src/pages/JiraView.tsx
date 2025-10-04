import React, { useEffect, useMemo, useState } from "react";
import { fetchProjectIssues, JiraIssue } from "../services/jiraClient";

function groupByStatus(issues: JiraIssue[]): Record<string, JiraIssue[]> {
  return issues.reduce((acc, i) => {
    const s = i.fields.status?.name || "Unknown";
    (acc[s] ||= []).push(i);
    return acc;
  }, {} as Record<string, JiraIssue[]>);
}

export default function JiraView() {
  const [issues, setIssues] = useState<JiraIssue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();

  useEffect(() => {
    let alive = true;
    setLoading(true);
    fetchProjectIssues()
      .then((res) => {
        if (alive) setIssues(res);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
    return () => {
      alive = false;
    };
  }, []);

  const grouped = useMemo(() => groupByStatus(issues), [issues]);
  const statuses = Object.keys(grouped);

  return (
    <section className="space-y-6">
      <div className="flex items-end justify-between">
        <h1 className="text-2xl md:text-3xl font-extrabold">Jira Board</h1>
        <div className="text-white/60 text-sm">
          {import.meta.env.VITE_JIRA_BASE_URL ? "Connected" : "Placeholder mode"}
        </div>
      </div>

      {loading && <div className="card p-6 animate-pulse">Loading issues…</div>}
      {error && <div className="card p-6 border border-error/50 text-error">{error}</div>}

      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {statuses.length === 0 && (
            <div className="card p-6 text-white/70">No issues found.</div>
          )}
          {statuses.map((status: string) => (
            <div key={status} className="card overflow-hidden">
              <div className="px-4 py-3 border-b border-white/10 font-bold bg-white/5">
                {status}
              </div>
              <div className="p-3 space-y-3">
                {(grouped[status] ?? []).map((iss: JiraIssue) => (
                  <div key={iss.id} className="rounded-xl border border-white/10 bg-surface/70 p-3">
                    <div className="text-sm text-white/50">{iss.key}</div>
                    <div className="font-semibold mt-1">{iss.fields.summary}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {!import.meta.env.VITE_JIRA_BASE_URL && (
        <div className="card p-4 text-white/70">
          Jira is in placeholder mode. To enable live data, provide VITE_JIRA_BASE_URL, VITE_JIRA_EMAIL,
          VITE_JIRA_API_TOKEN, and VITE_JIRA_PROJECT_KEY in .env. Note: direct calls from browser may be blocked by CORS; a proxy is recommended.
        </div>
      )}
    </section>
  );
}
