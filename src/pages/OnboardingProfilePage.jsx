import { useEffect, useMemo, useState } from "react";
import { useUser } from "@clerk/react";
import { Navigate, useSearchParams } from "react-router-dom";
import { readStoredProfile, writeStoredProfile } from "../services/profileStore";

const PAYMENT_COMPLETE_STORAGE_KEY = "philosift_onboarding_payment_complete";

function readPaymentComplete() {
  try {
    return localStorage.getItem(PAYMENT_COMPLETE_STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

function readMetadataProfile(user) {
  const meta = user?.unsafeMetadata?.profile;
  if (!meta || typeof meta !== "object") {
    return null;
  }

  return {
    firstName: typeof meta.firstName === "string" ? meta.firstName : "",
    lastName: typeof meta.lastName === "string" ? meta.lastName : "",
    birthDate: typeof meta.birthDate === "string" ? meta.birthDate : "",
  };
}

export default function OnboardingProfilePage() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [searchParams] = useSearchParams();
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const paymentCompleted = readPaymentComplete();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
  });

  const returnTo = useMemo(() => searchParams.get("returnTo") || "/dashboard", [searchParams]);

  useEffect(() => {
    if (!isLoaded || !user?.id) {
      return;
    }

    const fromStorage = readStoredProfile(user.id);
    const fromMetadata = readMetadataProfile(user);
    const source = fromStorage || fromMetadata;

    if (source) {
      setForm({
        firstName: source.firstName || "",
        lastName: source.lastName || "",
        birthDate: source.birthDate || "",
      });
    }
  }, [isLoaded, user]);

  if (!paymentCompleted) {
    return <Navigate to="/payment" replace />;
  }

  if (isLoaded && !isSignedIn) {
    return <Navigate to="/onboarding-signin" replace />;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!user?.id) {
      return;
    }

    const payload = {
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      birthDate: form.birthDate,
    };

    if (!payload.firstName || !payload.lastName || !payload.birthDate) {
      setErrorMessage("Please complete first name, last name, and birth date.");
      return;
    }

    setIsSaving(true);
    setErrorMessage("");

    writeStoredProfile(user.id, payload);

    try {
      await user.update({
        unsafeMetadata: {
          ...(user.unsafeMetadata || {}),
          profile: payload,
        },
      });
    } catch {
      // Local profile persistence is enough for launch; metadata sync can fail silently.
    }

    window.location.assign(returnTo);
  }

  return (
    <div className="font-body min-h-[100svh] bg-[#131313] text-on-surface antialiased" style={{ backgroundImage: "radial-gradient(#201f1f 0.5px, transparent 0.5px)", backgroundSize: "24px 24px" }}>
      <main className="mx-auto flex min-h-[100svh] w-full max-w-3xl flex-col justify-center px-4 py-10 sm:px-6 lg:px-8">
        <section className="relative overflow-hidden border border-primary/30 bg-surface-container-low/90 p-6 sm:p-8">
          <div className="pointer-events-none absolute -top-24 right-[-5rem] h-52 w-52 rounded-full bg-primary/10 blur-2xl" />

          <div className="relative space-y-6">
            <div className="space-y-3">
              <p className="font-label text-[10px] uppercase tracking-[0.24em] text-primary/90">Profile Setup</p>
              <h1 className="font-headline text-3xl italic text-on-surface sm:text-4xl">Make the experience yours.</h1>
              <p className="text-sm leading-relaxed text-on-surface-variant">
                Add your details so the Archive can personalize your flow and records from day one.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border border-outline-variant/25 bg-surface-container-high/70 p-4 sm:p-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs uppercase tracking-[0.12em] text-on-surface-variant">First name</label>
                  <input
                    type="text"
                    value={form.firstName}
                    onChange={(event) => setForm((current) => ({ ...current, firstName: event.target.value }))}
                    className="w-full border border-outline-variant/35 bg-surface-container-high/80 px-3 py-3 text-sm text-on-surface outline-none transition-colors focus:border-primary/50"
                    placeholder="Avery"
                    required
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs uppercase tracking-[0.12em] text-on-surface-variant">Last name</label>
                  <input
                    type="text"
                    value={form.lastName}
                    onChange={(event) => setForm((current) => ({ ...current, lastName: event.target.value }))}
                    className="w-full border border-outline-variant/35 bg-surface-container-high/80 px-3 py-3 text-sm text-on-surface outline-none transition-colors focus:border-primary/50"
                    placeholder="Wren"
                    required
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs uppercase tracking-[0.12em] text-on-surface-variant">Birth date</label>
                  <input
                    type="date"
                    value={form.birthDate}
                    onChange={(event) => setForm((current) => ({ ...current, birthDate: event.target.value }))}
                    className="w-full border border-outline-variant/35 bg-surface-container-high/80 px-3 py-3 text-sm text-on-surface outline-none transition-colors focus:border-primary/50"
                    required
                  />
                </div>
              </div>

              {errorMessage ? <p className="text-sm text-red-300">{errorMessage}</p> : null}

              <button
                type="submit"
                disabled={isSaving}
                className="block w-full border border-primary/45 bg-primary/15 px-5 py-3 text-center font-label text-xs uppercase tracking-[0.16em] text-primary transition-colors hover:bg-primary/25 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSaving ? "Saving profile..." : "Save and continue"}
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
