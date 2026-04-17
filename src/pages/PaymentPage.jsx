import { useEffect, useMemo, useState } from "react";
import { useUser } from "@clerk/react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { buildResultDisplay, loadStoredResult, resolveProfile, resolveSubarchetype } from "../data/resultFlow";
import LegalPolicyLinks from "../components/LegalPolicyLinks";

const PAYMENT_COMPLETE_STORAGE_KEY = "philosift_onboarding_payment_complete";
const BILLING_EMAIL_STORAGE_KEY = "philosift_onboarding_billing_email";

export default function PaymentPage() {
  const { isLoaded, isSignedIn } = useUser();
  const navigate = useNavigate();
  const storedResult = useMemo(() => loadStoredResult(), []);
  const resolvedProfile = useMemo(() => resolveProfile(storedResult), [storedResult]);
  const resolvedSubarchetype = useMemo(() => resolveSubarchetype(storedResult), [storedResult]);
  const view = useMemo(() => buildResultDisplay(storedResult, resolvedProfile), [storedResult, resolvedProfile]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(() => {
    try {
      return localStorage.getItem(PAYMENT_COMPLETE_STORAGE_KEY) === "1";
    } catch {
      return false;
    }
  });
  const [paymentReference, setPaymentReference] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [authLoadTimedOut, setAuthLoadTimedOut] = useState(false);

  const [billingEmail, setBillingEmail] = useState("");

  function handleDummyPaymentSubmit(event) {
    event.preventDefault();
    setErrorMessage("");
    setIsProcessing(true);

    const generatedReference = `PS-TRIAL-${Math.floor(Math.random() * 900000 + 100000)}`;
    setPaymentReference(generatedReference);
    setPaymentCompleted(true);
    try {
      localStorage.setItem(PAYMENT_COMPLETE_STORAGE_KEY, "1");
      if (billingEmail) {
        localStorage.setItem(BILLING_EMAIL_STORAGE_KEY, billingEmail);
      }
    } catch {
      // Non-fatal in private modes where storage may be restricted.
    }
    setIsProcessing(false);
  }

  function handleContinueToDashboard() {
    navigate("/onboarding-profile");
  }

  function handleContinueToAccountSetup() {
    navigate("/onboarding-signup");
  }

  useEffect(() => {
    if (!paymentCompleted) {
      return;
    }

    try {
      localStorage.setItem(PAYMENT_COMPLETE_STORAGE_KEY, "1");
    } catch {
      // Ignore persistence failures.
    }
  }, [paymentCompleted]);

  useEffect(() => {
    if (!paymentCompleted) {
      return;
    }

    if (isLoaded && isSignedIn) {
      navigate("/onboarding-profile", { replace: true });
      return;
    }

    if (isLoaded && !isSignedIn) {
      navigate("/onboarding-signup", { replace: true });
    }
  }, [isLoaded, isSignedIn, navigate, paymentCompleted]);

  useEffect(() => {
    if (!paymentCompleted || isLoaded) {
      setAuthLoadTimedOut(false);
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setAuthLoadTimedOut(true);
    }, 5000);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isLoaded, paymentCompleted]);

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
              <p className="font-label text-[10px] uppercase tracking-[0.28em] text-primary/90">Onboarding step</p>
              <h1 className="font-headline text-3xl leading-tight italic text-on-surface sm:text-4xl">Create your account to activate the session.</h1>
              <p className="max-w-xl text-sm leading-relaxed text-on-surface-variant sm:text-base">Dummy payment is captured for testing. The next step is account setup, then dashboard access.</p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-lg border border-primary/25 bg-primary/10 p-4">
                <p className="font-headline text-3xl italic text-on-surface">$4.99</p>
                <p className="mt-1 text-xs uppercase tracking-[0.14em] text-on-surface-variant">per month</p>
              </div>
              <div className="rounded-lg border border-outline-variant/25 bg-surface-container-high/70 p-4 sm:col-span-2">
                <p className="font-label text-[9px] uppercase tracking-[0.22em] text-primary/90">Your pattern</p>
                <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">{view.displayName}</p>
                <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">{resolvedSubarchetype?.patternLabel || "Your pattern becomes visible right before the loop closes."}</p>
              </div>
            </div>

            {!paymentCompleted ? (
              <form onSubmit={handleDummyPaymentSubmit} className="space-y-4 rounded-lg border border-outline-variant/25 bg-surface-container-high/70 p-4 sm:p-5">
                <div>
                  <label className="mb-1 block text-xs uppercase tracking-[0.12em] text-on-surface-variant">Billing email</label>
                  <input type="email" value={billingEmail} onChange={(event) => setBillingEmail(event.target.value)} className="w-full border border-outline-variant/35 bg-surface-container-high/80 px-3 py-3 text-sm text-on-surface outline-none transition-colors focus:border-primary/50" placeholder="you@example.com" />
                </div>
                <p className="text-xs leading-relaxed text-on-surface-variant/75">This is test mode. No real payment is processed here.</p>
                <button type="submit" disabled={isProcessing} className="block w-full border border-primary/45 bg-primary/15 px-5 py-3 text-center font-label text-xs uppercase tracking-[0.16em] text-primary transition-colors hover:bg-primary/25 disabled:cursor-not-allowed disabled:opacity-60">
                  {isProcessing ? "Processing..." : "Continue to account setup"}
                </button>
              </form>
            ) : (
              <div className="space-y-4 rounded-lg border border-outline-variant/25 bg-surface-container-high/70 p-4 sm:p-5">
                <p className="text-sm leading-relaxed text-on-surface-variant">Dummy payment captured.</p>
                <p className="text-sm leading-relaxed text-on-surface-variant">Reference: {paymentReference}</p>

                {!isLoaded && !authLoadTimedOut ? (
                  <p className="text-sm text-on-surface-variant">Checking account session...</p>
                ) : null}

                {!isLoaded && authLoadTimedOut ? (
                  <button type="button" onClick={handleContinueToAccountSetup} className="block w-full border border-amber-300/45 bg-amber-300/10 px-5 py-3 text-center font-label text-xs uppercase tracking-[0.16em] text-amber-100 transition-colors hover:bg-amber-300/20">
                    Continue to account setup
                  </button>
                ) : null}

                {isLoaded && !isSignedIn ? (
                  <div className="space-y-3">
                    <button type="button" onClick={handleContinueToAccountSetup} className="block w-full border border-primary/45 bg-primary/15 px-5 py-3 text-center font-label text-xs uppercase tracking-[0.16em] text-primary transition-colors hover:bg-primary/25">
                      Continue to account setup
                    </button>
                    <p className="text-xs uppercase tracking-[0.14em] text-on-surface-variant/75">Use the same email for a faster setup.</p>
                  </div>
                ) : null}

                {isLoaded && isSignedIn ? (
                  <button type="button" onClick={handleContinueToDashboard} className="block w-full border border-primary/45 bg-primary/15 px-5 py-3 text-center font-label text-xs uppercase tracking-[0.16em] text-primary transition-colors hover:bg-primary/25">
                    Continue to profile setup
                  </button>
                ) : null}
              </div>
            )}

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link to="/pricing" className="block w-full border border-outline-variant/30 px-5 py-3 text-center font-label text-xs uppercase tracking-[0.16em] text-on-surface-variant transition-colors hover:border-primary/35 hover:text-primary">
                Back to pricing
              </Link>
              <Link to="/dashboard" className="block w-full border border-outline-variant/30 px-5 py-3 text-center font-label text-xs uppercase tracking-[0.16em] text-on-surface-variant transition-colors hover:border-primary/35 hover:text-primary">
                Exit Without Insight
              </Link>
            </div>

            <LegalPolicyLinks />
          </div>
        </section>
      </main>
    </div>
  );
}