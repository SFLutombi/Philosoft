import { useEffect, useMemo, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import ArchiveSidebar from "../components/ArchiveSidebar";
import { buildResultDisplay, loadStoredResult, resolveSubarchetype } from "../data/resultFlow";
import { listPatternEvents } from "../services/patternEvents";
import { useUser } from "@clerk/react";

const TODAY_PROMPTS = [
  "Watch for the moment you hesitate before acting.",
  "Notice when planning starts replacing execution.",
  "Catch the first sign of delay and interrupt it.",
  "Track the trigger before your usual loop takes over.",
];

function pickTodayPrompt() {
  const dayIndex = new Date().getDate() % TODAY_PROMPTS.length;
  return TODAY_PROMPTS[dayIndex];
}

export default function DashboardPage() {
  const { user } = useUser();
  const [eventsToday, setEventsToday] = useState(0);

  const storedResult = useMemo(() => loadStoredResult(), []);
  const display = useMemo(() => buildResultDisplay(storedResult, null), [storedResult]);
  const subarchetype = useMemo(() => resolveSubarchetype(storedResult), [storedResult]);

  useEffect(() => {
    let isMounted = true;

    async function run() {
      if (!user?.id) {
        return;
      }

      try {
        const events = await listPatternEvents(user.id, 100);
        const today = new Date();
        const count = events.filter((event) => {
          const date = new Date(event.created_at);
          return (
            date.getFullYear() === today.getFullYear() &&
            date.getMonth() === today.getMonth() &&
            date.getDate() === today.getDate()
          );
        }).length;

        if (isMounted) {
          setEventsToday(count);
        }
      } catch {
        if (isMounted) {
          setEventsToday(0);
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
      <ArchiveSidebar active="dashboard" />

      <main className="min-h-screen bg-surface px-4 sm:px-6 lg:ml-64 lg:px-12 pb-10 lg:pb-12 pt-6 lg:pt-12">
        <section className="mx-auto w-full max-w-4xl space-y-6">
          <header className="space-y-2">
            <p className="font-label text-[10px] uppercase tracking-[0.2em] text-primary/90">Main App</p>
            <h1 className="font-headline text-3xl sm:text-4xl italic">Real-time interruption system</h1>
          </header>

          <Link
            to="/interrupt"
            className="flex min-h-48 w-full items-center justify-center rounded-lg border-2 border-primary/50 bg-primary/15 px-6 py-8 text-center transition-colors hover:bg-primary/25 sm:min-h-56"
          >
            <div className="space-y-2">
              <p className="font-label text-[10px] uppercase tracking-[0.2em] text-primary/90">Primary Action</p>
              <p className="font-headline text-4xl sm:text-5xl italic text-primary">Interrupt Pattern</p>
            </div>
          </Link>

          <div className="grid gap-4 sm:grid-cols-2">
            <article className="rounded-lg border border-outline-variant/20 bg-surface-container-low p-5 sm:p-6">
              <p className="font-label text-[10px] uppercase tracking-[0.16em] text-primary/90">Current pattern</p>
              <h2 className="mt-2 font-headline text-2xl italic">{subarchetype?.name || display.displayName}</h2>
              <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
                {subarchetype?.patternLabel || "You know the step, but your timing slips under pressure."}
              </p>
            </article>

            <article className="rounded-lg border border-outline-variant/20 bg-surface-container-low p-5 sm:p-6">
              <p className="font-label text-[10px] uppercase tracking-[0.16em] text-primary/90">Today prompt</p>
              <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">{pickTodayPrompt()}</p>
              <p className="mt-5 font-label text-[10px] uppercase tracking-[0.16em] text-on-surface-variant/80">
                Events logged today: {eventsToday}
              </p>
            </article>
          </div>

          <Link
            to="/history"
            className="inline-block border border-outline-variant/30 px-5 py-3 text-center font-label text-xs uppercase tracking-[0.16em] text-on-surface-variant transition-colors hover:border-primary/35 hover:text-primary"
          >
            View History
          </Link>
        </section>
      </main>
    </div>
  );
}
