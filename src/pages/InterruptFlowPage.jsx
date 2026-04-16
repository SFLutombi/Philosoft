import { useEffect, useMemo, useState } from "react";
import { useUser } from "@clerk/react";
import { Navigate, useNavigate } from "react-router-dom";
import { loadStoredResult, resolveSubarchetype } from "../data/resultFlow";
import { createPatternEvent, listPatternEvents } from "../services/patternEvents";
import { getInterruptPromptSet } from "../data/interruptPrompts";
import ArchiveSidebar from "../components/ArchiveSidebar";

const DECISION_OPTIONS = [
  { id: "acted", label: "Acted" },
  { id: "delayed", label: "Delayed" },
  { id: "avoided", label: "Avoided" },
];

export default function InterruptFlowPage() {
  const navigate = useNavigate();
  const { user } = useUser();

  const storedResult = useMemo(() => loadStoredResult(), []);
  const subarchetype = useMemo(() => resolveSubarchetype(storedResult), [storedResult]);
  const promptSet = useMemo(() => getInterruptPromptSet(subarchetype?.id), [subarchetype?.id]);

  const [step, setStep] = useState(1);
  const [triggerType, setTriggerType] = useState("");
  const [predictedOutcome, setPredictedOutcome] = useState("");
  const [microAction, setMicroAction] = useState("");
  const [actionTaken, setActionTaken] = useState("");
  const [saveStatus, setSaveStatus] = useState("idle");
  const [completedSessionsBefore, setCompletedSessionsBefore] = useState(0);
  const [error, setError] = useState("");

  if (!storedResult) {
    return <Navigate to="/quiz" replace />;
  }

  useEffect(() => {
    let isMounted = true;

    async function run() {
      if (!user?.id) {
        return;
      }

      try {
        const history = await listPatternEvents(user.id, 300);
        if (!isMounted) {
          return;
        }
        setCompletedSessionsBefore(history.length);
      } catch {
        if (!isMounted) {
          return;
        }
        setCompletedSessionsBefore(0);
      }
    }

    run();

    return () => {
      isMounted = false;
    };
  }, [user?.id]);

  useEffect(() => {
    if (step !== 5 || saveStatus !== "idle") {
      return;
    }

    if (!user?.id || !triggerType || !predictedOutcome || !actionTaken) {
      return;
    }

    let isMounted = true;

    async function run() {
      setSaveStatus("saving");
      setError("");

      try {
        await createPatternEvent({
          userId: user.id,
          triggerType,
          predictedOutcome,
          actionTaken,
          note: microAction,
        });

        if (isMounted) {
          setSaveStatus("saved");
        }
      } catch {
        if (isMounted) {
          setSaveStatus("error");
          setError("Could not save this event yet. Try again.");
        }
      }
    }

    run();

    return () => {
      isMounted = false;
    };
  }, [actionTaken, microAction, predictedOutcome, saveStatus, step, triggerType, user?.id]);

  useEffect(() => {
    if (saveStatus !== "saved") {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      navigate("/dashboard", { replace: true });
    }, 1100);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [navigate, saveStatus]);

  function handleTriggerSelect(option) {
    setTriggerType(option);
    setStep(2);
  }

  function handleOutcomeSelect(option) {
    setPredictedOutcome(option);
    setStep(3);
  }

  function handleMicroActionSelect(option) {
    setMicroAction(option);
    setStep(4);
  }

  function handleDecisionSelect(option) {
    setActionTaken(option);
    setStep(5);
    setSaveStatus("idle");
  }

  const isSaving = saveStatus === "saving";
  const projectedSessions = completedSessionsBefore + 1;
  const feedbackMessage = actionTaken === "acted" ? "You interrupted the pattern." : "You observed the pattern.";
  const feedbackDetail = actionTaken === "acted"
    ? `Session ${projectedSessions} logged. You are already progressing, and that momentum is what matters.`
    : `Session ${projectedSessions} logged. Progress is cumulative; one fall never erases what you already built.`;

  return (
    <div className="min-h-[100svh] bg-[#131313] text-on-surface antialiased" style={{ backgroundImage: "radial-gradient(#201f1f 0.5px, transparent 0.5px)", backgroundSize: "24px 24px" }}>
      <ArchiveSidebar active="interrupt" />
      <main className="flex min-h-[100svh] items-center justify-center px-4 py-20 sm:px-6 lg:ml-64 lg:px-8 lg:py-8">
        <section className="relative w-full max-w-2xl overflow-hidden rounded-[2rem] border border-primary/20 bg-surface-container-low/90 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.35)] sm:p-8">
          <div className="pointer-events-none absolute -right-20 top-0 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
          <div className="pointer-events-none absolute -left-24 bottom-0 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />

          <div className="relative space-y-6 sm:space-y-8">
            <header className="space-y-2 text-center">
              <p className="font-label text-[10px] uppercase tracking-[0.24em] text-primary/90">Interrupt Flow</p>
              <h1 className="font-headline text-3xl italic sm:text-4xl">Interrupt pattern</h1>
              <p className="text-sm text-on-surface-variant">{subarchetype?.name || "Unlabeled Pattern"}</p>
              <p className="font-label text-[10px] uppercase tracking-[0.18em] text-on-surface-variant/75">Step {step} of 5</p>
            </header>

            {step === 1 ? (
              <div className="space-y-4 text-center">
                <p className="text-lg leading-relaxed text-on-surface">{promptSet.recognitionPrompt}</p>
                <div className="grid gap-3 sm:grid-cols-3">
                  {promptSet.triggerOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => handleTriggerSelect(option)}
                      className="min-h-14 rounded-full border border-outline-variant/30 bg-surface-container-high/75 px-4 py-3 text-sm text-on-surface transition-colors hover:border-primary/45 hover:text-primary"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            {step === 2 ? (
              <div className="space-y-4 text-center">
                <p className="text-lg leading-relaxed text-on-surface">{promptSet.loopPrompt}</p>
                <p className="text-sm text-on-surface-variant">If nothing changes, what happens next?</p>
                <div className="grid gap-3 sm:grid-cols-3">
                  {promptSet.consequenceOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => handleOutcomeSelect(option)}
                      className="min-h-14 rounded-full border border-outline-variant/30 bg-surface-container-high/75 px-4 py-3 text-sm text-on-surface transition-colors hover:border-primary/45 hover:text-primary"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            {step === 3 ? (
              <div className="space-y-4 text-center">
                <p className="text-lg leading-relaxed text-on-surface">{promptSet.interruptionStatement}</p>
                <p className="text-sm text-on-surface-variant">What is the smallest action you can take right now?</p>
                <div className="grid gap-3 sm:grid-cols-3">
                  {promptSet.microActions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => handleMicroActionSelect(option)}
                      className="min-h-14 rounded-full border border-primary/25 bg-primary/10 px-4 py-3 text-sm text-primary transition-colors hover:bg-primary/20"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            {step === 4 ? (
              <div className="space-y-4 text-center">
                <p className="text-lg leading-relaxed text-on-surface">What did you do?</p>
                <div className="grid gap-3 sm:grid-cols-3">
                  {DECISION_OPTIONS.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => handleDecisionSelect(option.id)}
                      className={`min-h-14 rounded-full border px-4 py-3 text-sm transition-colors ${option.id === "acted" ? "border-primary/45 bg-primary/15 text-primary hover:bg-primary/25" : "border-outline-variant/30 bg-surface-container-high/75 text-on-surface hover:border-primary/35 hover:text-primary"}`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            {step === 5 ? (
              <div className="space-y-4 text-center">
                <p className="text-lg leading-relaxed text-on-surface">{feedbackMessage}</p>
                <p className="text-sm text-on-surface-variant">{feedbackDetail}</p>
                <p className="text-sm text-on-surface-variant">{isSaving ? "Saving event..." : saveStatus === "saved" ? "Saved. Returning to your dashboard." : "Retrying save..."}</p>
                {error ? <p className="text-sm text-red-300">{error}</p> : null}
                {saveStatus === "error" ? (
                  <button
                    type="button"
                    onClick={() => {
                      setError("");
                      setSaveStatus("idle");
                    }}
                    className="min-h-14 w-full rounded-full border border-primary/45 bg-primary/15 px-5 py-3 font-label text-xs uppercase tracking-[0.16em] text-primary transition-colors hover:bg-primary/25"
                  >
                    Try Again
                  </button>
                ) : null}
              </div>
            ) : null}
          </div>
        </section>
      </main>
    </div>
  );
}
