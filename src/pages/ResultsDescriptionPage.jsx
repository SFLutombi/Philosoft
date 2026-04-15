import { useMemo } from "react";
import { Link, Navigate } from "react-router-dom";
import { PILLARS } from "../data/quizData";
import { buildResultDisplay, loadStoredResult, resolveProfile } from "../data/resultFlow";

export default function ResultsDescriptionPage() {
  const storedResult = useMemo(() => loadStoredResult(), []);
  const resolvedProfile = useMemo(() => resolveProfile(storedResult), [storedResult]);
  const view = useMemo(() => buildResultDisplay(storedResult, resolvedProfile), [storedResult, resolvedProfile]);

  const reasoningTemperament = resolvedProfile?.reasoningTemperament || "Your stable thinking pattern is the way you make sense of uncertainty, choose a direction, and stay coherent when pressure rises.";
  const pillarEntries = PILLARS.map((pillar) => ({
    ...pillar,
    score: resolvedProfile?.pillars?.[pillar.id] ?? 50
  }));

  if (!storedResult) {
    return <Navigate to="/quiz" replace />;
  }

  return (
    <div className="font-body min-h-[100svh] bg-[#131313] text-on-surface antialiased" style={{ backgroundImage: "radial-gradient(#201f1f 0.5px, transparent 0.5px)", backgroundSize: "24px 24px" }}>
      <main className="mx-auto flex min-h-[100svh] w-full max-w-6xl flex-col px-4 pb-20 pt-10 sm:px-6 lg:px-8">
        <section className="mb-10 text-center md:mb-14">
          <span className="font-label mb-4 block text-xs uppercase tracking-[0.28em] text-primary">Archive Record</span>
          <h2 className="font-headline mb-5 text-4xl italic leading-[0.95] tracking-tighter text-on-surface sm:text-5xl md:text-7xl">{view.displayName}</h2>
          <p className="mx-auto max-w-3xl px-2 font-headline text-[1.05rem] leading-relaxed italic text-on-surface-variant sm:text-xl md:text-2xl">
            "{view.displaySummary}"
          </p>
        </section>

        <section className="mb-12 rounded-lg border border-outline-variant/20 bg-surface-container-low/80 p-5 sm:p-7">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h3 className="font-headline text-2xl italic text-on-surface sm:text-3xl">Reasoning Temperament</h3>
            <span className="material-symbols-outlined text-primary/80">hub</span>
          </div>
          <p className="text-sm leading-relaxed text-on-surface-variant sm:text-base">{reasoningTemperament}</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-5">
            {pillarEntries.map((pillar) => (
              <div key={pillar.id} className="border border-primary/20 bg-surface-container-high/60 p-3 text-center">
                <p className="font-label text-[9px] uppercase tracking-[0.2em] text-primary/90">{pillar.label}</p>
                <p className="mt-1 font-headline text-2xl italic text-on-surface">{pillar.score}%</p>
              </div>
            ))}
          </div>
        </section>

        <div className="flex justify-center sm:justify-end">
          <Link to="/results-philosophers" className="inline-flex items-center justify-center gap-2 border border-primary/45 bg-primary/15 px-5 py-3 font-label text-xs uppercase tracking-[0.16em] text-primary transition-colors hover:bg-primary/25">
            <span className="material-symbols-outlined text-base">arrow_forward</span>
            Continue
          </Link>
        </div>
      </main>
    </div>
  );
}
