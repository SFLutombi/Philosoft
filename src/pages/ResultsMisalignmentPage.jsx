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
      <main className="mx-auto flex min-h-[100svh] w-full max-w-3xl flex-col justify-center px-4 py-10 sm:px-6 lg:px-8">
        <section className="relative overflow-hidden border border-primary/30 bg-surface-container-low/90 p-6 sm:p-8">
          <div className="pointer-events-none absolute -top-24 right-[-5rem] h-44 w-44 rounded-full bg-primary/10 blur-2xl" />

          <div className="relative space-y-6">
            <div className="space-y-3">
              <p className="font-label text-[10px] uppercase tracking-[0.28em] text-primary/90">Contradiction Alert</p>
              <h1 className="font-headline text-3xl leading-tight italic text-on-surface sm:text-4xl">Your thinking is clear. Your behavior is still slipping.</h1>
              <p className="max-w-xl text-sm leading-relaxed text-on-surface-variant sm:text-base">
                Philosift isolates the break point so you can catch it before the loop closes.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-primary/25 bg-surface-container-high/70 p-4">
                <p className="font-label text-[9px] uppercase tracking-[0.22em] text-primary/90">Your pattern</p>
                <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">{view.displayName}</p>
              </div>
              <div className="rounded-lg border border-outline-variant/25 bg-surface-container-high/70 p-4">
                <p className="font-label text-[9px] uppercase tracking-[0.22em] text-primary/90">What repeats</p>
                <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">{resolvedSubarchetype?.patternLabel || "The same decision window keeps taking control."}</p>
              </div>
            </div>

            <div className="rounded-lg border border-primary/25 bg-primary/10 p-4 sm:p-5">
              <p className="text-sm leading-relaxed text-on-surface-variant">
                Tomorrow this contradiction will appear again. The only useful move now is to choose an interruption method.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link to="/pricing" className="inline-flex flex-1 items-center justify-center gap-2 border border-primary/45 bg-primary/15 px-5 py-3 font-label text-xs uppercase tracking-[0.16em] text-primary transition-colors hover:bg-primary/25">
                <span className="material-symbols-outlined text-base">workspace_premium</span>
                Start Free Trial
              </Link>
              <Link to="/dashboard" className="inline-flex flex-1 items-center justify-center gap-2 border border-outline-variant/30 px-5 py-3 font-label text-xs uppercase tracking-[0.16em] text-on-surface-variant transition-colors hover:border-primary/35 hover:text-primary">
                <span className="material-symbols-outlined text-base">grid_view</span>
                Go to Dashboard
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
