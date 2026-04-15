import { buildFlow, computeArchetypeProfile, computeAxisWinners, RESULTS_STORAGE_KEY } from "./quizData";
import { computeSubarchetype } from "./subarchetypes";

export const ARCHETYPE_CARD_IMAGES = {
  inquiry: "/cards/inner-examiner.jpg",
  discipline: "/cards/sharp-steward.jpg",
  self_authorship: "/cards/unbound-maker.jpg",
  existential_courage: "/cards/clear-rebel.jpg",
  civic_responsibility: "/cards/civic-builder.jpg",
  principle_logic: "/cards/principle-blade.jpg",
  freedom_commitment: "/cards/committed-self.jpg",
  pragmatic_adaptation: "/cards/practical-navigator.jpg"
};

export function loadStoredResult() {
  try {
    const raw = localStorage.getItem(RESULTS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function resolveProfile(storedResult) {
  if (!storedResult) return null;
  const storedProfile = storedResult?.archetypeProfile;
  const hasPlaceholderDomains = storedProfile?.personalGrowthPreview && storedProfile?.careerPreview && storedProfile?.relationshipPreview;
  if (storedProfile?.pillars && hasPlaceholderDomains) return storedProfile;

  return computeArchetypeProfile({
    answersByQuestionId: storedResult?.answersByQuestionId || {},
    flow: buildFlow(),
    winners: storedResult?.winners || [],
    axisScores: storedResult?.axisScores || {}
  });
}

export function resolveAxisWinners(storedResult) {
  if (Array.isArray(storedResult?.winners) && storedResult.winners.length) {
    return storedResult.winners;
  }

  const fallbackAnswers = storedResult?.answersByQuestionId || {};
  return computeAxisWinners(fallbackAnswers, buildFlow()).winners;
}

export function resolveSubarchetype(storedResult) {
  if (!storedResult) return null;
  if (storedResult?.subarchetype?.id) return storedResult.subarchetype;
  return computeSubarchetype(storedResult?.answersByQuestionId || {});
}

export function buildResultDisplay(storedResult, resolvedProfile) {
  const finalPhilosopher = storedResult?.finalPhilosopher;
  const displayName = resolvedProfile?.name || finalPhilosopher?.title || "The Lucid Witness";
  const displaySummary = resolvedProfile?.summary || finalPhilosopher?.summary || "You think with unusual intensity and pattern awareness. Your next step is to pair that gift with steadier execution in uncertain moments.";
  const displayCardTitle = resolvedProfile?.cardTitle || displayName.toUpperCase();
  const cardImageSrc = ARCHETYPE_CARD_IMAGES[resolvedProfile?.primaryStyle] || "/cards/default-archive.webp";
  const cardImageAlt = `${displayName} tarot-inspired thinker card`;
  const rarityPercent = Math.max(1, Math.min(99, Math.round((resolvedProfile?.styleDistribution?.[resolvedProfile?.primaryStyle] ?? 0.5) * 100)));

  return {
    displayName,
    displaySummary,
    displayCardTitle,
    cardImageSrc,
    cardImageAlt,
    rarityPercent
  };
}
