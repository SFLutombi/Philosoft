import { useEffect } from "react";
import { SignIn, useUser } from "@clerk/react";
import { Link, Navigate, useSearchParams } from "react-router-dom";

const PAYMENT_COMPLETE_STORAGE_KEY = "philosift_onboarding_payment_complete";
const BILLING_EMAIL_STORAGE_KEY = "philosift_onboarding_billing_email";

function readStorageValue(key) {
  try {
    return localStorage.getItem(key) || "";
  } catch {
    return "";
  }
}

export default function OnboardingSignInPage() {
  const { isLoaded, isSignedIn } = useUser();
  const [searchParams] = useSearchParams();
  const paymentCompleted = readStorageValue(PAYMENT_COMPLETE_STORAGE_KEY) === "1";
  const billingEmail = readStorageValue(BILLING_EMAIL_STORAGE_KEY);
  const returnTo = searchParams.get("returnTo") || "/dashboard";
  const profileRedirect = `/onboarding-profile?returnTo=${encodeURIComponent(returnTo)}`;
  const signUpUrl = `/onboarding-signup?returnTo=${encodeURIComponent(returnTo)}`;

  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Philosoft";

    return () => {
      document.title = previousTitle;
    };
  }, []);

  if (!paymentCompleted) {
    return <Navigate to="/payment" replace />;
  }

  if (isLoaded && isSignedIn) {
    return <Navigate to={profileRedirect} replace />;
  }

  return (
    <div className="font-body min-h-[100svh] bg-[#131313] text-on-surface antialiased" style={{ backgroundImage: "radial-gradient(#201f1f 0.5px, transparent 0.5px)", backgroundSize: "24px 24px" }}>
      <main className="mx-auto flex min-h-[100svh] w-full max-w-5xl flex-col justify-center px-3 py-6 sm:px-5 sm:py-8 lg:px-8">
        <section className="relative overflow-hidden bg-surface-container-low/90 p-4 sm:p-6 md:p-8">
          <div className="pointer-events-none absolute -top-24 right-[-5rem] h-52 w-52 rounded-full bg-primary/10 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-20 left-[-4rem] h-40 w-40 rounded-full bg-primary/10 blur-2xl" />

          <div className="relative grid gap-6 lg:grid-cols-[1fr_1fr]">
            <div className="space-y-4">
              <p className="font-label text-[9px] uppercase tracking-[0.22em] text-primary/90">Welcome back</p>
              <h1 className="font-headline text-3xl italic text-on-surface sm:text-4xl">Sign in to continue onboarding.</h1>
              <p className="text-sm leading-relaxed text-on-surface-variant">
                Complete sign in to access your dashboard and start the alignment sequence.
              </p>
              {billingEmail ? (
                <div className="rounded-lg border border-outline-variant/25 bg-surface-container-high/80 p-4 text-sm text-on-surface-variant">
                  Suggested email: {billingEmail}
                </div>
              ) : null}
              <Link to={signUpUrl} className="block w-full border border-outline-variant/30 px-5 py-3 text-center font-label text-xs uppercase tracking-[0.16em] text-on-surface-variant transition-colors hover:border-primary/35 hover:text-primary">
                Create a new account instead
              </Link>
            </div>

            <div className="min-w-0 bg-[#181512] p-2 sm:p-3">
              <SignIn
                routing="path"
                path="/onboarding-signin"
                signUpUrl={signUpUrl}
                forceRedirectUrl={profileRedirect}
                fallbackRedirectUrl={profileRedirect}
                initialValues={billingEmail ? { identifier: billingEmail } : undefined}
                appearance={{
                  elements: {
                    rootBox: "w-full",
                    cardBox: "w-full",
                    card: "w-full bg-transparent shadow-none border-0 rounded-none",
                  },
                }}
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}