import { useMemo, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { PHILOSOPHERS } from "../data/quizData";
import { loadStoredResult, resolveAxisWinners } from "../data/resultFlow";

const AXIS_MATCH_COPY = {
  meaning: {
    headline: "This is your meaning axis.",
    detail: "It shows what you reach for when life stops feeling self-evident and you have to decide what still deserves your commitment."
  },
  ethics: {
    headline: "This is your ethics axis.",
    detail: "It shows the kind of moral reasoning you trust when consequences, principles, and responsibility all pull at once."
  },
  self: {
    headline: "This is your self axis.",
    detail: "It shows how you build identity, ownership, and inner coherence when you are trying to become more fully yourself."
  },
  action: {
    headline: "This is your action axis.",
    detail: "It shows how you move from judgment into behavior when the moment asks for a decision instead of another reflection."
  }
};

function getAxisWinnerInterpretation(axisId, philosopher) {
  const axisCopy = AXIS_MATCH_COPY[axisId] || AXIS_MATCH_COPY.meaning;

  return {
    headline: axisCopy.headline,
    detail: axisCopy.detail,
    meaning: `${philosopher?.title || philosopher?.name || "This thinker"} suggests that your ${axisId} pattern leans toward clear, deliberate judgment rather than reactive drift.`
  };
}

export default function ResultsPhilosophersPage() {
  const storedResult = useMemo(() => loadStoredResult(), []);
  const axisWinners = useMemo(() => resolveAxisWinners(storedResult), [storedResult]);
  const [activeIndex, setActiveIndex] = useState(0);

  if (!storedResult) {
    return <Navigate to="/quiz" replace />;
  }

  const total = axisWinners.length;
  const winner = axisWinners[activeIndex % Math.max(1, total)];
  const philosopher = winner?.philosopher || PHILOSOPHERS[winner?.philosopherId] || null;
  const interpretation = philosopher ? getAxisWinnerInterpretation(winner.axisId, philosopher) : null;

  function onCycle() {
    setActiveIndex((current) => (current + 1) % Math.max(1, total));
  }

  return (
    <div className="font-body min-h-[100svh] bg-[#131313] text-on-surface antialiased" style={{ backgroundImage: "radial-gradient(#201f1f 0.5px, transparent 0.5px)", backgroundSize: "24px 24px" }}>
      <main className="mx-auto flex min-h-[100svh] w-full max-w-5xl flex-col justify-center px-4 py-10 sm:px-6 lg:px-8">
        <section className="border border-outline-variant/20 bg-surface-container-low/80 p-5 sm:p-7 md:p-8">
          <div className="mb-5 flex items-start justify-between gap-4 sm:mb-6">
            <div>
              <p className="font-label text-[10px] uppercase tracking-[0.3em] text-primary">Philosophers with Similar Patterns</p>
              <h3 className="mt-2 font-headline text-2xl italic text-on-surface sm:text-3xl">Thinkers whose logic mirrors yours</h3>
            </div>
            <span className="material-symbols-outlined text-primary/80 text-3xl sm:text-4xl">psychology</span>
          </div>

          {philosopher && interpretation ? (
            <article className="border border-outline-variant/20 bg-surface-container-high p-5 sm:p-6 flex flex-col gap-4 min-h-[290px]">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="font-label text-[10px] uppercase tracking-[0.3em] text-primary">{winner.axisLabel}</span>
                  <h4 className="mt-2 font-headline text-2xl italic text-on-surface sm:text-3xl">{philosopher.name}</h4>
                </div>
                <span className="material-symbols-outlined text-primary/70 text-3xl">person</span>
              </div>

              <p className="text-sm leading-relaxed text-on-surface-variant">{philosopher.summary}</p>

              <div className="rounded-lg border border-primary/20 bg-surface-container-lowest/70 p-4">
                <p className="font-label text-[9px] uppercase tracking-[0.22em] text-primary/90">What this means</p>
                <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">{interpretation.headline} {interpretation.detail} {interpretation.meaning}</p>
              </div>

              <div className="mt-1 flex items-center justify-center gap-2">
                {axisWinners.map((item, index) => (
                  <span key={item.axisId} className={`h-1.5 w-6 ${index === activeIndex ? "bg-primary" : "bg-outline-variant/30"}`} />
                ))}
              </div>
            </article>
          ) : null}

          <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <button type="button" onClick={onCycle} className="inline-flex items-center justify-center gap-2 border border-primary/45 bg-primary/15 px-5 py-3 font-label text-xs uppercase tracking-[0.16em] text-primary transition-colors hover:bg-primary/25">
              <span className="material-symbols-outlined text-base">sync</span>
              Cycle Philosophers
            </button>
            <Link to="/results-subarchetype" className="inline-flex items-center justify-center gap-2 bg-primary px-5 py-3 font-label text-xs uppercase tracking-[0.16em] text-on-primary transition-colors hover:bg-on-primary-container">
              <span className="material-symbols-outlined text-base">hub</span>
              See Your Current Pattern
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
