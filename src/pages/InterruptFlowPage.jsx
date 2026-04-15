import { useMemo, useState } from "react";
import { useUser } from "@clerk/react";
import { Navigate, useNavigate } from "react-router-dom";
import ArchiveSidebar from "../components/ArchiveSidebar";
import { loadStoredResult, resolveSubarchetype } from "../data/resultFlow";
import { createPatternEvent } from "../services/patternEvents";

const STEP1_OPTIONS = [
  { id: "avoiding", label: "I am avoiding something" },
  { id: "overthinking", label: "I am overthinking" },
  { id: "delaying", label: "I am about to delay" },
  { id: "other", label: "Other" },
];

export default function InterruptFlowPage() {
  const navigate = useNavigate();
  const { user } = useUser();

  const storedResult = useMemo(() => loadStoredResult(), []);
  const subarchetype = useMemo(() => resolveSubarchetype(storedResult), [storedResult]);
  const patternType = subarchetype?.id || "unknown_pattern";

  const [step, setStep] = useState(1);
  const [recognition, setRecognition] = useState("");
  const [actionChoice, setActionChoice] = useState("");
  const [note, setNote] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  if (!storedResult) {
    return <Navigate to="/quiz" replace />;
  }

  async function handleSave() {
    if (!actionChoice || !user?.id) {
      return;
    }

    setIsSaving(true);
    setError("");

    try {
      await createPatternEvent({
        userId: user.id,
        patternType: recognition || patternType,
        action: actionChoice,
        note,
      });
      navigate("/history", { replace: true });
    } catch {
      setError("Could not save this event yet. Try again.");
      setIsSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-background text-on-surface">
      <div className="grain-overlay fixed inset-0" />
      <ArchiveSidebar active="interrupt" />

      <main className="min-h-screen bg-surface px-4 sm:px-6 lg:ml-64 lg:px-12 pb-10 lg:pb-12 pt-6 lg:pt-12">
        <section className="mx-auto w-full max-w-3xl space-y-6">
          <header className="space-y-2">
            <p className="font-label text-[10px] uppercase tracking-[0.2em] text-primary/90">Interruption Flow</p>
            <h1 className="font-headline text-3xl sm:text-4xl italic">Interrupt pattern</h1>
            <p className="text-sm text-on-surface-variant">Pattern: {subarchetype?.name || "Unlabeled Pattern"}</p>
          </header>

          <div className="rounded-lg border border-primary/25 bg-surface-container-low p-5 sm:p-6">
            {step === 1 ? (
              <div className="space-y-4">
                <p className="text-base">You are in your pattern.</p>
                <p className="text-sm text-on-surface-variant">What is happening right now?</p>
                <div className="space-y-2">
                  {STEP1_OPTIONS.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => {
                        setRecognition(option.id);
                        setStep(2);
                      }}
                      className="block w-full border border-outline-variant/35 px-4 py-3 text-left text-sm text-on-surface transition-colors hover:border-primary/45 hover:text-primary"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            {step === 2 ? (
              <div className="space-y-4">
                <p className="text-base">This is where your pattern usually takes over.</p>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="w-full border border-primary/45 bg-primary/15 px-5 py-3 font-label text-xs uppercase tracking-[0.16em] text-primary transition-colors hover:bg-primary/25"
                >
                  Continue
                </button>
              </div>
            ) : null}

            {step === 3 ? (
              <div className="space-y-4">
                <p className="text-base">What will you do?</p>
                <div className="grid gap-2 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => {
                      setActionChoice("follow");
                      setStep(4);
                    }}
                    className="border border-outline-variant/35 px-4 py-3 text-sm text-on-surface-variant transition-colors hover:border-primary/35 hover:text-primary"
                  >
                    Follow the pattern
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setActionChoice("interrupt");
                      setStep(4);
                    }}
                    className="border border-primary/45 bg-primary/15 px-4 py-3 text-sm text-primary transition-colors hover:bg-primary/25"
                  >
                    Interrupt it
                  </button>
                </div>
              </div>
            ) : null}

            {step === 4 ? (
              <div className="space-y-4">
                <p className="text-base">
                  {actionChoice === "interrupt" ? "You broke the loop." : "You observed the pattern."}
                </p>
                <p className="text-sm text-on-surface-variant">Optional note</p>
                <textarea
                  value={note}
                  onChange={(event) => setNote(event.target.value.slice(0, 280))}
                  placeholder="What triggered this moment?"
                  className="min-h-24 w-full border border-outline-variant/35 bg-surface-container-high/70 px-3 py-2 text-sm text-on-surface outline-none transition-colors focus:border-primary/50"
                />
                {error ? <p className="text-sm text-red-300">{error}</p> : null}
                <button
                  type="button"
                  disabled={isSaving}
                  onClick={handleSave}
                  className="w-full border border-primary/45 bg-primary/15 px-5 py-3 font-label text-xs uppercase tracking-[0.16em] text-primary transition-colors hover:bg-primary/25 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSaving ? "Saving..." : "Save event"}
                </button>
              </div>
            ) : null}
          </div>
        </section>
      </main>
    </div>
  );
}
