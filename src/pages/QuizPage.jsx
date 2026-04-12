import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PHILOSOPHERS,
  RESULTS_STORAGE_KEY,
  buildFlow,
  computeArchetypeProfile,
  computeAxisWinners
} from "../data/quizData";

function toRoman(value) {
  const numerals = [
    [1000, "M"],
    [900, "CM"],
    [500, "D"],
    [400, "CD"],
    [100, "C"],
    [90, "XC"],
    [50, "L"],
    [40, "XL"],
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"]
  ];

  let num = Math.max(1, Number(value) || 1);
  let result = "";

  numerals.forEach(([arabic, roman]) => {
    while (num >= arabic) {
      result += roman;
      num -= arabic;
    }
  });

  return result;
}

function splitPrompt(prompt) {
  const text = String(prompt || "").trim();
  if (!text) return { lead: "", accent: "", breakLine: false };

  const commaIndex = text.indexOf(",");
  if (commaIndex !== -1) {
    return {
      lead: text.slice(0, commaIndex + 1),
      accent: text.slice(commaIndex + 1).trim(),
      breakLine: true
    };
  }

  const colonIndex = text.indexOf(":");
  if (colonIndex !== -1) {
    return {
      lead: text.slice(0, colonIndex),
      accent: text.slice(colonIndex).trim(),
      breakLine: false
    };
  }

  return { lead: text, accent: "", breakLine: false };
}

export default function QuizPage() {
  const navigate = useNavigate();
  const flow = useMemo(() => buildFlow(), []);
  const autoAdvanceRef = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [inShadowAxis, setInShadowAxis] = useState(false);
  const [shadowChoice, setShadowChoice] = useState("");

  const currentQuestion = flow[currentIndex];
  const selectedAnswer = answers[currentQuestion?.id] || "";

  const { winners, axisScores } = useMemo(() => computeAxisWinners(answers, flow), [answers, flow]);

  const finalists = useMemo(() => {
    const usedPhilosophers = new Set();

    return winners.map((winner) => {
      const sortedAxisCandidates = Object.entries(axisScores?.[winner.axisId] || {})
        .sort((a, b) => b[1] - a[1])
        .map(([philosopherId]) => philosopherId);

      const pickedId =
        sortedAxisCandidates.find((philosopherId) => !usedPhilosophers.has(philosopherId))
        || sortedAxisCandidates[0]
        || winner.philosopherId;

      if (pickedId) {
        usedPhilosophers.add(pickedId);
      }

      return {
        axisId: winner.axisId,
        axisLabel: winner.axisLabel,
        philosopher: PHILOSOPHERS[pickedId] || winner.philosopher
      };
    }).filter((item) => item.philosopher);
  }, [winners, axisScores]);

  const canAdvanceQuiz = Boolean(selectedAnswer);
  const canAdvanceShadow = Boolean(shadowChoice);

  const totalQuestions = flow.length;
  const answeredCount = Object.keys(answers).length;

  useEffect(() => () => {
    if (autoAdvanceRef.current) {
      clearTimeout(autoAdvanceRef.current);
    }
  }, []);

  function queueAutoAdvance(action) {
    if (autoAdvanceRef.current) {
      clearTimeout(autoAdvanceRef.current);
    }

    autoAdvanceRef.current = setTimeout(() => {
      action();
      autoAdvanceRef.current = null;
    }, 180);
  }

  function persistAndGoToResults(choiceId) {
    const selectedFinalist = finalists.find((item) => `${item.axisId}-${item.philosopher.id}` === choiceId);
    const finalPhilosopher = selectedFinalist?.philosopher;
    if (!finalPhilosopher) return;

    const archetypeProfile = computeArchetypeProfile({
      answersByQuestionId: answers,
      flow,
      winners,
      axisScores
    });

    const payload = {
      finalPhilosopher,
      winners,
      shadowChoice: choiceId,
      axisScores,
      answersByQuestionId: answers,
      archetypeProfile,
      pillarScores: archetypeProfile.pillars,
      answeredAt: Date.now()
    };

    localStorage.setItem(RESULTS_STORAGE_KEY, JSON.stringify(payload));
    navigate("/results");
  }

  function onSelectOption(optionId) {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: optionId }));
    queueAutoAdvance(() => {
      if (currentIndex < totalQuestions - 1) {
        setCurrentIndex((prev) => prev + 1);
        return;
      }

      setInShadowAxis(true);
    });
  }

  function onSelectShadowChoice(choiceId) {
    setShadowChoice(choiceId);
    queueAutoAdvance(() => {
      persistAndGoToResults(choiceId);
    });
  }

  function onNext() {
    if (!inShadowAxis) {
      if (!canAdvanceQuiz) return;

      if (currentIndex < totalQuestions - 1) {
        setCurrentIndex((prev) => prev + 1);
        return;
      }

      setInShadowAxis(true);
      return;
    }

    if (!canAdvanceShadow) return;
    persistAndGoToResults(shadowChoice);
  }

  function onBack() {
    if (inShadowAxis) {
      setInShadowAxis(false);
      return;
    }

    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      return;
    }

    navigate("/landing");
  }

  const optionCards = inShadowAxis
    ? finalists.map((item, idx) => ({
      id: `${item.axisId}-${item.philosopher.id}`,
      label: item.philosopher.statement,
      kicker: `${String.fromCharCode(65 + idx)}`,
      selected: shadowChoice === `${item.axisId}-${item.philosopher.id}`,
      onSelect: () => onSelectShadowChoice(`${item.axisId}-${item.philosopher.id}`)
    }))
    : (currentQuestion?.options || []).map((option) => ({
      id: option.id,
      label: option.label,
      kicker: option.id.toUpperCase(),
      selected: selectedAnswer === option.id,
      onSelect: () => onSelectOption(option.id)
    }));

  const headerLabel = inShadowAxis ? "Shadow Axis" : currentQuestion?.axisLabel;
  const protocolLabel = inShadowAxis
    ? "Final Resonance Protocol"
    : currentQuestion?.axisProtocol;
  const progressText = inShadowAxis
    ? "I / I"
    : `${toRoman(currentIndex + 1)} / ${toRoman(totalQuestions)}`;
  const promptText = inShadowAxis
    ? "This statement resonates with me the most:"
    : currentQuestion?.prompt;
  const promptParts = splitPrompt(promptText);

  return (
    <div className="bg-background text-on-surface font-body selection:bg-primary/30 h-[100svh] overflow-hidden px-4 md:px-8 py-4 md:py-6 relative isolate">
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/question-gradient.svg')",
          backgroundRepeat: "repeat",
          backgroundSize: "880px 880px",
          opacity: 0.18
        }}
      />
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_72%_45%,rgba(84,140,146,0.12)_0%,rgba(9,11,13,0)_42%)]" />
      <main className="relative z-10 max-w-5xl mx-auto h-full flex flex-col justify-center">
        <div className="mb-4 md:mb-6">
          <div className="flex justify-between items-end mb-4">
            <div className="space-y-1">
              <span className="font-headline italic text-primary-fixed-dim text-base md:text-lg">{headerLabel}</span>
              <div className="font-label uppercase tracking-[0.3em] text-[9px] text-outline">{protocolLabel}</div>
            </div>
            <div className="font-headline text-2xl md:text-3xl font-light text-primary tracking-tighter">{progressText}</div>
          </div>
          <div className="w-full h-[1px] bg-surface-container-highest relative">
            <div
              className="absolute top-0 left-0 h-full bg-primary transition-all duration-700"
              style={{ width: inShadowAxis ? "100%" : `${(answeredCount / totalQuestions) * 100}%` }}
            />
          </div>
        </div>

        <section className="mb-6 md:mb-8">
          <h1 className="font-headline text-[2rem] md:text-5xl text-on-surface leading-tight tracking-tight mb-3">
            {inShadowAxis ? (
              <>
                Shadow Axis, <br />
                <span className="italic text-primary">choose one final resonance</span>
              </>
            ) : (
              <>
                <span className={promptParts.breakLine ? "block" : ""}>{promptParts.lead}{promptParts.breakLine ? "" : " "}</span>
                <span className={`italic text-primary ${promptParts.breakLine ? "block" : ""}`}>{promptParts.accent}</span>
              </>
            )}
          </h1>
          {!inShadowAxis ? null : (
            <p className="font-headline italic text-on-surface-variant text-lg md:text-xl">
              {promptText}
            </p>
          )}
          <div className="w-14 h-[2px] bg-primary/40 mt-4" />
        </section>

        <div className="grid grid-cols-2 gap-px bg-outline-variant/10">
          {optionCards.map((optionCard, idx) => (
            <button
              key={optionCard.id}
              type="button"
              onClick={optionCard.onSelect}
              className={`group relative p-4 md:p-8 bg-surface-container-lowest hover:bg-surface-container-low transition-all duration-300 text-left flex flex-col items-start gap-3 md:gap-5 ${idx === 0 ? "border-b border-r border-outline-variant/15" : ""} ${idx === 1 ? "border-b border-outline-variant/15" : ""} ${idx === 2 ? "border-r border-outline-variant/15" : ""} ${optionCard.selected ? "bg-surface-container-low ring-1 ring-primary/65 shadow-[inset_0_0_0_1px_rgba(233,193,118,0.2)]" : ""}`}
            >
              <span className={`font-label text-[10px] tracking-[0.4em] transition-colors ${optionCard.selected ? "text-primary" : "text-outline group-hover:text-primary"}`}>{optionCard.kicker}</span>
              <p className={`font-headline text-base md:text-xl leading-snug transition-colors ${optionCard.selected ? "text-on-surface" : "text-on-surface-variant group-hover:text-on-surface"}`}>{optionCard.label}</p>
              <div className={`absolute bottom-4 right-4 transition-opacity ${optionCard.selected ? "opacity-100" : "opacity-0"}`}>
                <span className="material-symbols-outlined text-primary">check_circle</span>
              </div>
            </button>
          ))}
        </div>

        <div className="flex justify-between items-center mt-6 md:mt-8">
          <button type="button" onClick={onBack} className="group flex items-center gap-4 px-6 py-3 text-outline hover:text-primary transition-all active:opacity-50">
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            <span className="font-label uppercase tracking-widest text-[10px]">{inShadowAxis ? "Back to Questions" : "Previous"}</span>
          </button>
          <div className="flex gap-2">
            <div className="w-1 h-1 bg-primary/20" />
            <div className="w-1 h-1 bg-primary/40" />
            <div className="w-1 h-1 bg-primary/60" />
            <div className="w-1 h-1 bg-primary/40" />
            <div className="w-1 h-1 bg-primary/20" />
          </div>
          <button
            type="button"
            onClick={onNext}
            disabled={inShadowAxis ? !canAdvanceShadow : !canAdvanceQuiz}
            className="group flex items-center gap-3 md:gap-4 px-6 md:px-10 py-3 md:py-4 bg-primary text-on-primary hover:bg-on-primary-container transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="font-label uppercase tracking-widest text-[10px] font-bold">{inShadowAxis ? "Reveal Result" : currentIndex === totalQuestions - 1 ? "Enter Shadow Axis" : "Next"}</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>

        {!inShadowAxis ? null : (
          <div className="mt-3 text-center font-label text-[10px] tracking-[0.25em] text-outline uppercase">
            This statement resonates with me the most.
          </div>
        )}

      </main>
    </div>
  );
}
