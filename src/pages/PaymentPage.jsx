import { useEffect, useMemo, useState } from "react";
import { useUser } from "@clerk/react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { buildResultDisplay, loadStoredResult, resolveProfile, resolveSubarchetype } from "../data/resultFlow";
import LegalPolicyLinks from "../components/LegalPolicyLinks";

const PAYMENT_COMPLETE_STORAGE_KEY = "philosift_onboarding_payment_complete";
const BILLING_EMAIL_STORAGE_KEY = "philosift_onboarding_billing_email";

function maskCardNumber(value) {
  const digits = value.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
}

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
  const [formData, setFormData] = useState({
    cardholderName: "",
    billingEmail: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
    country: "",
    consent: false,
  });

  function updateField(field, value) {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  function handleDummyPaymentSubmit(event) {
    event.preventDefault();
    // Test-mode shortcut: skip card detail validation and jump to post-payment state.
    setErrorMessage("");
    setIsProcessing(true);

    const generatedReference = `PS-TRIAL-${Math.floor(Math.random() * 900000 + 100000)}`;
    setPaymentReference(generatedReference);
    setPaymentCompleted(true);
    try {
      localStorage.setItem(PAYMENT_COMPLETE_STORAGE_KEY, "1");
      if (formData.billingEmail) {
        localStorage.setItem(BILLING_EMAIL_STORAGE_KEY, formData.billingEmail);
      }
    } catch {
      // Non-fatal in private modes where storage may be restricted.
    }
    setIsProcessing(false);
  }

  function handleContinueToDashboard() {
    navigate("/dashboard");
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
      navigate("/dashboard", { replace: true });
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
      <main className="mx-auto flex min-h-[100svh] w-full max-w-5xl flex-col justify-center px-4 py-10 sm:px-6 lg:px-8">
        <section className="relative overflow-hidden border border-primary/30 bg-surface-container-low/90 p-5 sm:p-7 md:p-8">
          <div className="pointer-events-none absolute -top-24 right-[-5rem] h-52 w-52 rounded-full bg-primary/10 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-20 left-[-4rem] h-40 w-40 rounded-full bg-primary/10 blur-2xl" />

          <div className="relative grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-6">
              <div className="rounded-lg border border-primary/35 bg-primary/10 p-5 sm:p-6">
                <p className="font-headline text-3xl italic text-on-surface">$4.99 / month</p>
                <p className="mt-2 text-sm text-on-surface-variant">Monthly access to Alignment System Access.</p>
              </div>

              <div>
                <h1 className="font-headline text-3xl italic text-on-surface sm:text-4xl">Continue with your alignment plan.</h1>
                <p className="mt-2 text-base text-on-surface-variant">The pattern will appear again tomorrow. The only question is whether you catch it this time.</p>
              </div>

              <div className="rounded-lg border border-outline-variant/25 bg-surface-container-high/80 p-4 sm:p-5">
                <p className="text-sm leading-relaxed text-on-surface-variant">
                  Your pattern: <span className="text-primary">{view.displayName}</span>.
                </p>
                <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
                  {resolvedSubarchetype?.patternLabel || "This page is configured to interrupt the exact moment your loop usually takes over."}
                </p>
              </div>

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

              <div className="rounded-lg border border-primary/25 bg-primary/10 p-4 sm:p-5">
                <p className="text-sm leading-relaxed text-on-surface-variant">Start with a 3-day free trial.</p>
                <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">You will not be charged during the trial.</p>
                <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">After 3 days, billing begins automatically at $4.99/month unless cancelled.</p>
                <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">Cancel anytime.</p>
              </div>

              <div className="rounded-lg border border-outline-variant/25 bg-surface-container-high/80 p-4 sm:p-5">
                <p className="text-sm leading-relaxed text-on-surface-variant">Most users first notice their pattern being interrupted within 48 hours.</p>
              </div>

              <div className="rounded-lg border border-outline-variant/20 bg-surface-container-high/50 p-3 sm:p-4">
                <p className="text-xs leading-relaxed text-on-surface-variant/80">Built using principles from behavioral psychology and decision theory. Rooted in philosophical frameworks that study the gap between intent and action.</p>
              </div>

              <div className="space-y-3">
                <Link to="/pricing" className="block w-full border border-outline-variant/30 px-5 py-3 text-center font-label text-xs uppercase tracking-[0.16em] text-on-surface-variant transition-colors hover:border-primary/35 hover:text-primary">
                  Back to pricing
                </Link>
                <p className="text-xs uppercase tracking-[0.14em] text-on-surface-variant/75">Onboarding mode is using dummy payment capture before account setup.</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-lg border border-outline-variant/25 bg-surface-container-high/80 p-4 sm:p-5">
                <p className="font-label text-[9px] uppercase tracking-[0.22em] text-primary/90">Onboarding Checkout (Dummy Mode)</p>
                <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">This step captures placeholder payment details for funnel testing only. No real charge is created in this mode.</p>
              </div>

              {errorMessage ? (
                <div className="rounded-lg border border-red-400/30 bg-red-400/10 p-4 sm:p-5 text-sm text-red-100">{errorMessage}</div>
              ) : null}

              <div className="rounded-lg border border-primary/25 bg-[#181512] p-5 sm:p-6">
                {!paymentCompleted ? (
                  <form onSubmit={handleDummyPaymentSubmit} className="space-y-4">
                    <div>
                      <label className="mb-1 block text-xs uppercase tracking-[0.12em] text-on-surface-variant">Cardholder name</label>
                      <input type="text" value={formData.cardholderName} onChange={(event) => updateField("cardholderName", event.target.value)} className="w-full border border-outline-variant/35 bg-surface-container-high/70 px-3 py-2 text-sm text-on-surface outline-none transition-colors focus:border-primary/50" placeholder="Alex Example" />
                    </div>

                    <div>
                      <label className="mb-1 block text-xs uppercase tracking-[0.12em] text-on-surface-variant">Billing email</label>
                      <input type="email" value={formData.billingEmail} onChange={(event) => updateField("billingEmail", event.target.value)} className="w-full border border-outline-variant/35 bg-surface-container-high/70 px-3 py-2 text-sm text-on-surface outline-none transition-colors focus:border-primary/50" placeholder="you@example.com" />
                    </div>

                    <div>
                      <label className="mb-1 block text-xs uppercase tracking-[0.12em] text-on-surface-variant">Card number</label>
                      <input type="text" value={formData.cardNumber} onChange={(event) => updateField("cardNumber", maskCardNumber(event.target.value))} className="w-full border border-outline-variant/35 bg-surface-container-high/70 px-3 py-2 text-sm text-on-surface outline-none transition-colors focus:border-primary/50" placeholder="4242 4242 4242 4242" />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="mb-1 block text-xs uppercase tracking-[0.12em] text-on-surface-variant">Expiry</label>
                        <input type="text" value={formData.expiry} onChange={(event) => updateField("expiry", event.target.value)} className="w-full border border-outline-variant/35 bg-surface-container-high/70 px-3 py-2 text-sm text-on-surface outline-none transition-colors focus:border-primary/50" placeholder="MM/YY" />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs uppercase tracking-[0.12em] text-on-surface-variant">CVC</label>
                        <input type="text" value={formData.cvc} onChange={(event) => updateField("cvc", event.target.value.replace(/\D/g, "").slice(0, 4))} className="w-full border border-outline-variant/35 bg-surface-container-high/70 px-3 py-2 text-sm text-on-surface outline-none transition-colors focus:border-primary/50" placeholder="123" />
                      </div>
                    </div>

                    <div>
                      <label className="mb-1 block text-xs uppercase tracking-[0.12em] text-on-surface-variant">Billing country</label>
                      <input type="text" value={formData.country} onChange={(event) => updateField("country", event.target.value)} className="w-full border border-outline-variant/35 bg-surface-container-high/70 px-3 py-2 text-sm text-on-surface outline-none transition-colors focus:border-primary/50" placeholder="Indonesia" />
                    </div>

                    <label className="flex items-start gap-2 text-xs leading-relaxed text-on-surface-variant">
                      <input type="checkbox" checked={formData.consent} onChange={(event) => updateField("consent", event.target.checked)} className="mt-0.5" />
                      <span>I understand this is a dummy onboarding paywall for flow testing. No real payment will be processed.</span>
                    </label>

                    <button type="submit" disabled={isProcessing} className="block w-full border border-primary/45 bg-primary/15 px-5 py-3 text-center font-label text-xs uppercase tracking-[0.16em] text-primary transition-colors hover:bg-primary/25 disabled:cursor-not-allowed disabled:opacity-60">
                      {isProcessing ? "Processing..." : "Skip payment details and continue"}
                    </button>
                  </form>
                ) : (
                  <div className="space-y-4">
                    <div className="rounded-lg border border-primary/30 bg-primary/10 p-4 text-sm text-on-surface-variant">
                      <p className="font-label text-[9px] uppercase tracking-[0.22em] text-primary/90">Dummy payment captured</p>
                      <p className="mt-2">Reference: {paymentReference}</p>
                      <p className="mt-1">Next step: create your account to activate your onboarding session.</p>
                    </div>

                    {!isLoaded && !authLoadTimedOut ? (
                      <div className="rounded-lg border border-outline-variant/25 bg-surface-container-high/70 p-4 text-sm text-on-surface-variant">
                        Checking account session...
                      </div>
                    ) : null}

                    {!isLoaded && authLoadTimedOut ? (
                      <div className="space-y-3 rounded-lg border border-amber-400/30 bg-amber-400/10 p-4 text-sm text-amber-100">
                        <p>Auth session check is taking longer than expected.</p>
                        <button type="button" onClick={handleContinueToAccountSetup} className="block w-full border border-amber-300/45 bg-amber-300/10 px-5 py-3 text-center font-label text-xs uppercase tracking-[0.16em] text-amber-100 transition-colors hover:bg-amber-300/20">
                          Continue to account setup
                        </button>
                      </div>
                    ) : null}

                    {isLoaded && !isSignedIn ? (
                      <div className="space-y-3">
                        <button type="button" onClick={handleContinueToAccountSetup} className="block w-full border border-primary/45 bg-primary/15 px-5 py-3 text-center font-label text-xs uppercase tracking-[0.16em] text-primary transition-colors hover:bg-primary/25">
                          Continue to account setup
                        </button>
                        <p className="text-xs uppercase tracking-[0.14em] text-on-surface-variant/75">
                          {formData.billingEmail ? `Use ${formData.billingEmail} for faster onboarding.` : "Use the same billing email for a faster onboarding flow."}
                        </p>
                      </div>
                    ) : null}

                    {isLoaded && isSignedIn ? (
                      <button type="button" onClick={handleContinueToDashboard} className="block w-full border border-primary/45 bg-primary/15 px-5 py-3 text-center font-label text-xs uppercase tracking-[0.16em] text-primary transition-colors hover:bg-primary/25">
                        Continue to dashboard
                      </button>
                    ) : null}

                    {isLoaded && isSignedIn ? (
                      <p className="text-xs uppercase tracking-[0.14em] text-primary/85">Account detected. You can continue.</p>
                    ) : isLoaded ? (
                      <p className="text-xs uppercase tracking-[0.14em] text-on-surface-variant/75">Sign up is required before onboarding activation.</p>
                    ) : null}
                  </div>
                )}
              </div>

              <LegalPolicyLinks className="pt-2" />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}