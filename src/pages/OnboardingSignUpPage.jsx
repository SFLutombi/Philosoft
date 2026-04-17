import { useEffect } from "react";
import { SignUp, useUser } from "@clerk/react";
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

export default function OnboardingSignUpPage() {
  const { isLoaded, isSignedIn } = useUser();
  const [searchParams] = useSearchParams();
  const paymentCompleted = readStorageValue(PAYMENT_COMPLETE_STORAGE_KEY) === "1";
  const billingEmail = readStorageValue(BILLING_EMAIL_STORAGE_KEY);
  const returnTo = searchParams.get("returnTo") || "/dashboard";
  const profileRedirect = `/onboarding-profile?returnTo=${encodeURIComponent(returnTo)}`;
  const signInUrl = `/onboarding-signin?returnTo=${encodeURIComponent(returnTo)}`;
  const clerkAppearance = {
    variables: {
      colorBackground: "#ffffff",
      colorText: "#1a1714",
      colorTextSecondary: "#5d554a",
      colorPrimary: "#1a1714",
      colorInputBackground: "#ffffff",
      colorInputText: "#1a1714",
      colorDanger: "#fca5a5",
    },
    elements: {
      rootBox: "relative z-30 w-full",
      cardBox: "relative z-30 w-full",
      card: "w-full rounded-xl border border-black/10 bg-white shadow-2xl",
      headerTitle: "text-[#1a1714]",
      headerSubtitle: "text-[#5d554a]",
      formFieldLabel: "text-[#5d554a]",
      formFieldInput: "border border-[#d8d3ca] bg-white text-[#1a1714]",
      footerActionText: "text-[#5d554a]",
      footerActionLink: "text-primary hover:text-primary/80",
      formButtonPrimary: "bg-[#1a1714] text-white hover:bg-[#2a2520]",
    },
  };

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
        <section className="relative bg-surface-container-low/90 p-4 sm:p-6 md:p-8">
          <div className="relative grid gap-6 lg:grid-cols-[1fr_1fr]">
            <div className="space-y-4">
              <p className="font-label text-[9px] uppercase tracking-[0.22em] text-primary/90">Final onboarding step</p>
              <h1 className="font-headline text-3xl italic text-on-surface sm:text-4xl">Create your account to unlock your dashboard.</h1>
              <p className="text-sm leading-relaxed text-on-surface-variant">
                Your trial setup is captured. Account creation is required before access is activated.
              </p>
              {billingEmail ? (
                <div className="rounded-lg border border-outline-variant/25 bg-surface-container-high/80 p-4 text-sm text-on-surface-variant">
                  Suggested email: {billingEmail}
                </div>
              ) : null}
              <Link to={signInUrl} className="block w-full border border-outline-variant/30 px-5 py-3 text-center font-label text-xs uppercase tracking-[0.16em] text-on-surface-variant transition-colors hover:border-primary/35 hover:text-primary">
                I already have an account
              </Link>
            </div>

            <div className="relative z-20 min-w-0 bg-transparent p-1 sm:p-2">
              <SignUp
                routing="path"
                path="/onboarding-signup"
                signInUrl={signInUrl}
                forceRedirectUrl={profileRedirect}
                fallbackRedirectUrl={profileRedirect}
                initialValues={billingEmail ? { emailAddress: billingEmail } : undefined}
                appearance={clerkAppearance}
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}