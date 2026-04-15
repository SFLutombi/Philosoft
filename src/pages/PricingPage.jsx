import { useMemo } from "react";
import { Link, Navigate } from "react-router-dom";
import { buildResultDisplay, loadStoredResult, resolveProfile, resolveSubarchetype } from "../data/resultFlow";
import LegalPolicyLinks from "../components/LegalPolicyLinks";

export default function PricingPage() {
  const storedResult = useMemo(() => loadStoredResult(), []);
  const resolvedProfile = useMemo(() => resolveProfile(storedResult), [storedResult]);
  const view = useMemo(() => buildResultDisplay(storedResult, resolvedProfile), [storedResult, resolvedProfile]);

  if (!storedResult) {
    return <Navigate to="/quiz" replace />;
  }

  return (
    <div className="font-body min-h-[100svh] bg-[#131313] text-on-surface antialiased" style={{ backgroundImage: "radial-gradient(#201f1f 0.5px, transparent 0.5px)", backgroundSize: "24px 24px" }}>
      <main className="mx-auto flex min-h-[100svh] w-full max-w-3xl flex-col justify-center px-4 py-10 sm:px-6 lg:px-8">
        <section className="relative overflow-hidden border border-primary/30 bg-surface-container-low/90 p-5 sm:p-7 md:p-8">
          <div className="pointer-events-none absolute -top-24 right-[-5rem] h-52 w-52 rounded-full bg-primary/10 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-20 left-[-4rem] h-40 w-40 rounded-full bg-primary/10 blur-2xl" />

          <div className="relative space-y-6">
            {/* PRICE FIRST */}
            <div className="rounded-lg border border-primary/35 bg-primary/10 p-5 sm:p-6">
              <p className="font-headline text-3xl italic text-on-surface">$4.99 / month</p>
              <p className="mt-2 text-sm text-on-surface-variant">Less than a coffee.</p>
            </div>

            {/* HEADER: TENSION, NOT EXPLANATION */}
            <div>
              <h1 className="font-headline text-3xl italic text-on-surface sm:text-4xl">The pattern is still active.</h1>
              <p className="mt-2 text-base text-on-surface-variant">Nothing changes unless you interrupt it.</p>
            </div>

            {/* CONTEXT: VERY SHORT, NO OVER-EXPLANATION */}
            <div className="rounded-lg border border-outline-variant/25 bg-surface-container-high/80 p-4 sm:p-5">
              <p className="text-sm leading-relaxed text-on-surface-variant">
                Your pattern: <span className="text-primary">{view.displayName}</span>.
              </p>
              <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
                You understand what to do—but at the moment of execution, the pattern takes over and resets your progress.
              </p>
            </div>

            {/* WHAT THIS DOES: CORE BEHAVIORAL PROOF */}
            <div className="rounded-lg border border-outline-variant/25 bg-surface-container-high/80 p-4 sm:p-5">
              <p className="font-label text-[9px] uppercase tracking-[0.22em] text-primary/90">This interrupts the exact moment you usually fail.</p>
              <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">In real life, you get:</p>
              <ul className="mt-2 space-y-2 ml-3 text-sm leading-relaxed text-on-surface-variant">
                <li>• Recognition right before your pattern takes over</li>
                <li>• A pause window before automatic behavior locks in</li>
                <li>• Clarity on which specific moments break your alignment</li>
                <li>• Evidence of what you actually did, not what you intended</li>
              </ul>
            </div>

            {/* WHY THIS MATTERS: LOSS + INEVITABILITY */}
            <div className="rounded-lg border border-primary/25 bg-primary/10 p-4 sm:p-5">
              <p className="text-sm leading-relaxed text-on-surface-variant">
                If nothing interrupts it, the same cycle repeats tomorrow.
              </p>
              <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
                Awareness alone does not change behavior.
              </p>
            </div>

            {/* TRIAL + BILLING: CLEAR + CALM */}
            <div className="rounded-lg border border-outline-variant/25 bg-surface-container-high/80 p-4 sm:p-5">
              <p className="text-sm leading-relaxed text-on-surface-variant">
                Start with a 3-day free trial.
              </p>
              <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
                You will not be charged during the trial.
              </p>
              <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
                After 3 days, billing begins automatically at $4.99/month unless cancelled.
              </p>
              <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
                Cancel anytime.
              </p>
            </div>

            {/* SOCIAL PROOF: BEHAVIORAL, NOT HYPE */}
            <div className="rounded-lg border border-outline-variant/25 bg-surface-container-high/80 p-4 sm:p-5">
              <p className="text-sm leading-relaxed text-on-surface-variant">
                Most users first notice their pattern being interrupted within 48 hours.
              </p>
            </div>

            {/* CREDIBILITY LAYER: BEHAVIORAL PSYCHOLOGY + PHILOSOPHY */}
            <div className="rounded-lg border border-outline-variant/20 bg-surface-container-high/50 p-3 sm:p-4">
              <p className="text-xs leading-relaxed text-on-surface-variant/80">
                Built using principles from behavioral psychology and decision theory. Rooted in philosophical frameworks that study the gap between intent and action.
              </p>
            </div>

            {/* FINAL CTA: DECISION POINT + BINARY CHOICE */}
            <div>
              <p className="text-sm leading-relaxed text-on-surface-variant mb-4">
                Continue with your alignment plan.
              </p>
              <p className="text-sm leading-relaxed text-on-surface-variant mb-4">
                The pattern will appear again tomorrow.
              </p>
              <p className="text-sm leading-relaxed text-on-surface-variant font-semibold mb-5">
                The only question is whether you catch it this time.
              </p>

              <div className="space-y-3">
                <Link to="/payment" className="block w-full border border-primary/45 bg-primary/15 px-5 py-3 text-center font-label text-xs uppercase tracking-[0.16em] text-primary transition-colors hover:bg-primary/25">
                  Start Free Trial
                </Link>
                <div>
                  <Link to="/dashboard" className="block w-full border border-outline-variant/30 px-5 py-3 text-center font-label text-xs uppercase tracking-[0.16em] text-on-surface-variant transition-colors hover:border-primary/35 hover:text-primary">
                    Exit Without Insight
                  </Link>
                  <p className="mt-2 text-xs uppercase tracking-[0.16em] text-on-surface-variant/70">
                    Your current pattern will continue unchanged.
                  </p>
                </div>
              </div>

              <p className="mt-5 text-xs uppercase tracking-[0.16em] text-primary/85">
                Activation begins immediately after signup.
              </p>
            </div>

            <LegalPolicyLinks className="pt-2" />
          </div>
        </section>
      </main>
    </div>
  );
}