import { useMemo } from "react";
import { Link, Navigate } from "react-router-dom";
import { buildResultDisplay, loadStoredResult, resolveProfile, resolveSubarchetype } from "../data/resultFlow";

export default function ResultsMisalignmentPage() {
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
          <div className="pointer-events-none absolute -top-28 right-[-7rem] h-64 w-64 rounded-full bg-primary/10 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-24 left-[-6rem] h-52 w-52 rounded-full bg-primary/10 blur-2xl" />

          <div className="relative mb-6 flex items-start justify-between gap-4">
            <div>
              <p className="font-label text-[10px] uppercase tracking-[0.3em] text-primary">Contradiction Alert</p>
              <h2 className="mt-2 font-headline text-3xl italic text-on-surface sm:text-4xl">Your thinking and behavior are not aligned</h2>
            </div>
            <span className="material-symbols-outlined text-primary/80 text-3xl">error</span>
          </div>

          <div className="relative grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-primary/25 bg-surface-container-high/80 p-4 sm:p-5">
              <p className="font-label text-[9px] uppercase tracking-[0.22em] text-primary/90">How you think</p>
              <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">{view.displayName}</p>
            </div>
            <div className="rounded-lg border border-primary/25 bg-surface-container-high/80 p-4 sm:p-5">
              <p className="font-label text-[9px] uppercase tracking-[0.22em] text-primary/90">What keeps happening</p>
              <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">{resolvedSubarchetype?.patternLabel || "Execution breaks in the same decision window, then the cycle resets."}</p>
            </div>
          </div>

          <p className="mt-5 text-sm leading-relaxed text-on-surface-variant sm:text-base">
            This is the live contradiction. Your judgment is clear, but the same break point keeps taking control when action is required.
          </p>

          <div className="mt-5 rounded-lg border border-outline-variant/25 bg-surface-container-high/80 p-4 sm:p-5">
            <p className="font-label text-[9px] uppercase tracking-[0.22em] text-primary/90">What repeats if this stays active</p>
            <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
              You begin, hesitate at the same break point, then restart the same cycle. This leads to repeated starts without compounding progress.
            </p>
          </div>

          <div className="mt-5 rounded-lg border border-primary/25 bg-primary/10 p-4 sm:p-5">
            <p className="font-label text-[9px] uppercase tracking-[0.22em] text-primary/90">Why PhiloSift matters now</p>
            <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
              Without intervention, this contradiction repeats in similar situations. PhiloSift isolates the trigger and gives you one interruption step before the loop closes.
            </p>
          </div>

          <p className="mt-5 text-sm leading-relaxed text-on-surface-variant">Tomorrow this contradiction will show up again. The only question is whether you will catch it in time.</p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Link to="/pricing" className="inline-flex items-center justify-center gap-2 border border-primary/45 bg-primary/15 px-5 py-3 font-label text-xs uppercase tracking-[0.16em] text-primary transition-colors hover:bg-primary/25">
              <span className="material-symbols-outlined text-base">workspace_premium</span>
              Start Free Trial
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
