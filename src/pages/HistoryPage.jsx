import { useEffect, useMemo, useState } from "react";
import { useUser } from "@clerk/react";
import { Navigate } from "react-router-dom";
import ArchiveSidebar from "../components/ArchiveSidebar";
import { loadStoredResult, resolveSubarchetype } from "../data/resultFlow";
import { listPatternEvents } from "../services/patternEvents";

function formatDate(value) {
  try {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(new Date(value));
  } catch {
    return "Unknown time";
  }
}

function formatActionTaken(value) {
  if (value === "acted") return "Acted";
  if (value === "delayed") return "Delayed";
  if (value === "avoided") return "Avoided";
  return value || "Unknown";
}

export default function HistoryPage() {
  const { user } = useUser();
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const storedResult = useMemo(() => loadStoredResult(), []);
  const subarchetype = useMemo(() => resolveSubarchetype(storedResult), [storedResult]);

  useEffect(() => {
    let isMounted = true;

    async function run() {
      if (!user?.id) {
        setIsLoading(false);
        return;
      }

      try {
        const data = await listPatternEvents(user.id, 60);
        if (!isMounted) {
          return;
        }
        setEvents(data);
      } catch {
        if (!isMounted) {
          return;
        }
        setError("Could not load history right now.");
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    run();
    return () => {
      isMounted = false;
    };
  }, [user?.id]);

  if (!storedResult) {
    return <Navigate to="/quiz" replace />;
  }

  return (
    <div className="min-h-screen bg-background text-on-surface">
      <div className="grain-overlay fixed inset-0" />
      <ArchiveSidebar active="history" />

      <main className="min-h-screen bg-surface px-4 sm:px-6 lg:ml-64 lg:px-12 pb-10 lg:pb-12 pt-6 lg:pt-12">
        <section className="mx-auto w-full max-w-4xl space-y-6">
          <header className="space-y-2">
            <p className="font-label text-[10px] uppercase tracking-[0.2em] text-primary/90">History</p>
            <h1 className="font-headline text-3xl sm:text-4xl italic">Past interruptions</h1>
            <p className="text-sm text-on-surface-variant">Pattern: {subarchetype?.name || "Unlabeled Pattern"}</p>
          </header>

          <div className="rounded-lg border border-outline-variant/20 bg-surface-container-low p-5 sm:p-6">
            {isLoading ? <p className="text-sm text-on-surface-variant">Loading history...</p> : null}
            {error ? <p className="text-sm text-red-300">{error}</p> : null}
            {!isLoading && !error && events.length === 0 ? (
              <p className="text-sm text-on-surface-variant">No events yet. Press Interrupt Pattern on your dashboard to log your first moment.</p>
            ) : null}

            {!isLoading && !error && events.length > 0 ? (
              <ul className="space-y-3">
                {events.map((event) => (
                  <li key={event.id} className="flex flex-col gap-2 border border-outline-variant/20 bg-surface-container-high/60 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-label text-[10px] uppercase tracking-[0.16em] text-primary/90">{formatActionTaken(event.action_taken || event.action)}</p>
                      <p className="text-sm text-on-surface-variant">{event.trigger_type}</p>
                      {event.predicted_outcome ? <p className="mt-1 text-xs text-on-surface-variant/80">Outcome: {event.predicted_outcome}</p> : null}
                    </div>
                    <p className="text-xs uppercase tracking-[0.14em] text-on-surface-variant/80">{formatDate(event.created_at)}</p>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </section>
      </main>
    </div>
  );
}
