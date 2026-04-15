import { useMemo } from "react";
import { Link, Navigate } from "react-router-dom";
import { buildResultDisplay, loadStoredResult, resolveProfile, resolveSubarchetype } from "../data/resultFlow";

export default function ResultsSubarchetypePage() {
  const storedResult = useMemo(() => loadStoredResult(), []);
  const resolvedProfile = useMemo(() => resolveProfile(storedResult), [storedResult]);
  const resolvedSubarchetype = useMemo(() => resolveSubarchetype(storedResult), [storedResult]);
  const view = useMemo(() => buildResultDisplay(storedResult, resolvedProfile), [storedResult, resolvedProfile]);

  if (!storedResult) {
    return <Navigate to="/quiz" replace />;
  }

  return (
    <div className="font-body min-h-[100svh] bg-[#131313] text-on-surface antialiased" style={{ backgroundImage: "radial-gradient(#201f1f 0.5px, transparent 0.5px)", backgroundSize: "24px 24px" }}>
      <main className="mx-auto flex min-h-[100svh] w-full max-w-5xl flex-col justify-center px-4 py-10 sm:px-6 lg:px-8">
        <section className="relative overflow-hidden border border-primary/30 bg-surface-container-low/90 p-5 sm:p-7 md:p-8">
          <div className="pointer-events-none absolute -top-24 right-[-5.5rem] h-56 w-56 rounded-full bg-primary/10 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-20 left-[-4rem] h-44 w-44 rounded-full bg-primary/10 blur-2xl" />

          <div className="relative mb-6 flex items-start justify-between gap-4">
            <div>
              <p className="font-label text-[10px] uppercase tracking-[0.3em] text-primary">Drift Pattern</p>
              <h2 className="mt-2 font-headline text-3xl italic text-on-surface sm:text-4xl">{resolvedSubarchetype?.name || "Break Point Pattern"}</h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-on-surface-variant sm:text-base">This is not who you are. This is what keeps happening when pressure rises.</p>
            </div>
            <span className="material-symbols-outlined text-primary/80 text-3xl">hub</span>
          </div>

          <div className="relative mb-5 rounded-lg border border-primary/25 bg-surface-container-high/70 p-4 sm:p-5">
            <p className="font-label text-[9px] uppercase tracking-[0.22em] text-primary/90">Core Thinking Pattern</p>
            <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">{view.displayName}</p>
          </div>

          <div className="relative rounded-lg border border-outline-variant/25 bg-surface-container-high/80 p-4 sm:p-5">
            <p className="font-label text-[9px] uppercase tracking-[0.22em] text-primary/90">What keeps happening</p>
            <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">{resolvedSubarchetype?.patternLabel || "You can describe what to do, but control drops when execution pressure rises."}</p>
          </div>

          <div className="mt-5 rounded-lg border border-outline-variant/25 bg-surface-container-high/80 p-4 sm:p-5">
            <p className="font-label text-[9px] uppercase tracking-[0.22em] text-primary/90">How it plays out</p>
            <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">{resolvedSubarchetype?.loopExplanation || "The same trigger appears, your execution sequence breaks, and the loop restarts in similar situations."}</p>
          </div>

          <div className="mt-5 rounded-lg border border-primary/25 bg-primary/10 p-4 sm:p-5">
            <p className="font-label text-[9px] uppercase tracking-[0.22em] text-primary/90">What it costs if unchanged</p>
            <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">{resolvedSubarchetype?.consequence || "Without intervention, this cycle repeats and progress fails to compound."}</p>
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Link to="/results-misalignment" className="inline-flex items-center justify-center gap-2 border border-primary/45 bg-primary/15 px-5 py-3 font-label text-xs uppercase tracking-[0.16em] text-primary transition-colors hover:bg-primary/25">
              <span className="material-symbols-outlined text-base">warning</span>
              {resolvedSubarchetype?.cta || "See the Full Misalignment"}
            </Link>
            <Link to="/dashboard" className="inline-flex items-center justify-center gap-2 border border-outline-variant/30 px-5 py-3 font-label text-xs uppercase tracking-[0.16em] text-on-surface-variant transition-colors hover:border-primary/35 hover:text-primary">
              <span className="material-symbols-outlined text-base">grid_view</span>
              Exit Without Insight
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
