export const SUBARCHETYPES = {
  stuck_aware: {
    id: "stuck_aware",
    name: "The Awareness-Execution Drift",
    patternLabel: "You know the next step, but delay when it is time to begin.",
    loopExplanation: "You pause to refine, reopen the plan, and postpone the same action again.",
    consequence: "Your schedule stays full while priority work barely moves.",
    cta: "See the Full Misalignment"
  },
  overthinker: {
    id: "overthinker",
    name: "The Overanalysis Loop",
    patternLabel: "You keep evaluating after the choice is already clear.",
    loopExplanation: "One more angle becomes one more delay, and execution never starts on time.",
    consequence: "High-stakes decisions lose force and turn into drift.",
    cta: "Reveal the Gap"
  },
  identity_seeker: {
    id: "identity_seeker",
    name: "The Identity-Action Gap",
    patternLabel: "You define yourself clearly, but react differently in real moments.",
    loopExplanation: "You refine identity language, then default to the old response when pressure rises.",
    consequence: "Self-understanding deepens while behavior stays unchanged.",
    cta: "Understand the Break Point"
  },
  self_sabotaging: {
    id: "self_sabotaging",
    name: "The Self-Interruption Loop",
    patternLabel: "You make progress, then pull back at the same stage of commitment.",
    loopExplanation: "As stakes rise, intention flips into avoidance and the reset happens again.",
    consequence: "You keep rebuilding momentum instead of compounding it.",
    cta: "Show What Is Breaking This Pattern"
  },
  high_ambition_frustrated: {
    id: "high_ambition_frustrated",
    name: "The Momentum Break Pattern",
    patternLabel: "You start fast, then lose sequence when pressure and complexity rise.",
    loopExplanation: "Early momentum is strong, but the handoff into disciplined execution keeps breaking.",
    consequence: "Effort is high, but progress fails to stack.",
    cta: "Reveal the Gap"
  },
  aftershock_witness: {
    id: "aftershock_witness",
    name: "The Emotional Replay Pattern",
    patternLabel: "The same emotional reaction returns in different situations.",
    loopExplanation: "You process what happened, then re-enter the same response when a similar trigger appears.",
    consequence: "Different context, same ending.",
    cta: "See the Full Misalignment"
  },
  divergent_mind: {
    id: "divergent_mind",
    name: "The Divergence Drift",
    patternLabel: "You describe one standard, then act against it under pressure.",
    loopExplanation: "You value independence and clarity, but stress triggers a familiar contradictory move.",
    consequence: "Your self-concept and daily behavior drift apart.",
    cta: "Understand the Break Point"
  },
  early_improvement: {
    id: "early_improvement",
    name: "The First-Step Drift",
    patternLabel: "You begin quickly, then lose direction once options expand.",
    loopExplanation: "You switch systems too soon, restart, and repeat the same early-phase cycle.",
    consequence: "Progress resets before it stabilizes.",
    cta: "Show What Is Breaking This Pattern"
  },
  pattern_nerd: {
    id: "pattern_nerd",
    name: "The Model-Action Split",
    patternLabel: "You spot the loop accurately, but intervention comes late.",
    loopExplanation: "You identify the sequence as it starts, then stay in observation mode instead of interrupting it.",
    consequence: "Accurate insight does not convert into control.",
    cta: "Reveal the Gap"
  },
  lurker_passive: {
    id: "lurker_passive",
    name: "The Insight-Action Delay",
    patternLabel: "You keep collecting insight, then postpone the move that matters.",
    loopExplanation: "You read one more perspective, feel brief clarity, and delay execution again.",
    consequence: "Understanding compounds while outcomes stay the same.",
    cta: "See the Full Misalignment"
  }
};

export const SUBARCHETYPE_QUESTION_MAPPING = {
  m6: { a: "lurker_passive", b: "stuck_aware", c: "pattern_nerd", d: "early_improvement" },
  m7: { a: "aftershock_witness", b: "self_sabotaging", c: "overthinker", d: "high_ambition_frustrated" },
  e6: { a: "self_sabotaging", b: "high_ambition_frustrated", c: "stuck_aware", d: "early_improvement" },
  e7: { a: "identity_seeker", b: "pattern_nerd", c: "divergent_mind", d: "overthinker" },
  s6: { a: "divergent_mind", b: "identity_seeker", c: "aftershock_witness", d: "pattern_nerd" },
  s7: { a: "stuck_aware", b: "self_sabotaging", c: "high_ambition_frustrated", d: "overthinker" },
  a6: { a: "overthinker", b: "lurker_passive", c: "high_ambition_frustrated", d: "early_improvement" },
  a7: { a: "pattern_nerd", b: "self_sabotaging", c: "aftershock_witness", d: "identity_seeker" }
};

export function computeSubarchetype(answersByQuestionId = {}) {
  const subarchetypeScores = {};

  Object.entries(SUBARCHETYPE_QUESTION_MAPPING).forEach(([questionId, optionMap]) => {
    const selectedOption = answersByQuestionId[questionId];
    if (selectedOption && optionMap[selectedOption]) {
      const subarchetypeId = optionMap[selectedOption];
      subarchetypeScores[subarchetypeId] = (subarchetypeScores[subarchetypeId] || 0) + 1;
    }
  });

  const topSubarchetypeId = Object.entries(subarchetypeScores).sort((a, b) => b[1] - a[1])[0]?.[0];
  const topSubarchetype = topSubarchetypeId ? SUBARCHETYPES[topSubarchetypeId] : null;

  return {
    id: topSubarchetypeId,
    ...topSubarchetype,
    scores: subarchetypeScores
  };
}
