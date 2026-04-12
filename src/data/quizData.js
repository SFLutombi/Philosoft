export const RESULTS_STORAGE_KEY = "philosift-result-v2";

export const PHILOSOPHERS = {
  socrates: {
    id: "socrates",
    name: "Socrates",
    title: "The Questioning Flame",
    statement: "I would rather be unsettled by truth than comforted by certainty.",
    summary: "You test assumptions and expose hidden contradictions before committing to an answer."
  },
  epictetus: {
    id: "epictetus",
    name: "Epictetus",
    title: "The Disciplined Core",
    statement: "I do not control outcomes, but I always control my response.",
    summary: "You focus on inner control, practical discipline, and emotional steadiness in uncertainty."
  },
  nietzsche: {
    id: "nietzsche",
    name: "Friedrich Nietzsche",
    title: "The Value Forger",
    statement: "When old values collapse, I create my own and move forward.",
    summary: "You reject inherited scripts and define meaning through strength, authorship, and self-overcoming."
  },
  camus: {
    id: "camus",
    name: "Albert Camus",
    title: "The Lucid Rebel",
    statement: "Even without cosmic guarantees, I choose to act with clarity and dignity.",
    summary: "You face ambiguity directly and still choose engagement over resignation."
  },
  arendt: {
    id: "arendt",
    name: "Hannah Arendt",
    title: "The Civic Mind",
    statement: "Thinking must become action in the shared world, not private comfort.",
    summary: "You connect ideas to responsibility and evaluate choices through public consequences."
  },
  kant: {
    id: "kant",
    name: "Immanuel Kant",
    title: "The Principle Keeper",
    statement: "A choice is right only if it could be a universal rule.",
    summary: "You lean on coherent principles and moral consistency before short-term gain."
  },
  de_beauvoir: {
    id: "de_beauvoir",
    name: "Simone de Beauvoir",
    title: "The Becoming Self",
    statement: "Identity is not found; it is built through lived commitment.",
    summary: "You see identity as an active project and resist fixed labels imposed from outside."
  },
  william_james: {
    id: "william_james",
    name: "William James",
    title: "The Pragmatic Navigator",
    statement: "I judge ideas by the life they create, not by abstraction alone.",
    summary: "You optimize for real-world consequences and adapt quickly when evidence changes."
  }
};

export const AXES = [
  {
    id: "meaning",
    label: "Axis I: Meaning",
    protocol: "Initiation Protocol Alpha",
    candidates: ["socrates", "epictetus", "nietzsche", "camus"],
    questions: [
      {
        id: "m1",
        prompt: "When your plans collapse, what do you do first?",
        options: [
          { id: "a", label: "Interrogate assumptions before rebuilding.", weights: { socrates: 2, camus: 1 } },
          { id: "b", label: "Stabilize what is in my control.", weights: { epictetus: 2 } },
          { id: "c", label: "Use the disruption to reinvent direction.", weights: { nietzsche: 2 } },
          { id: "d", label: "Accept absurdity and keep moving.", weights: { camus: 2, epictetus: 1 } }
        ]
      },
      {
        id: "m2",
        prompt: "Meaning feels most real when it is...",
        options: [
          { id: "a", label: "Examined through persistent questioning.", weights: { socrates: 2 } },
          { id: "b", label: "Lived through disciplined action.", weights: { epictetus: 2 } },
          { id: "c", label: "Self-authored against convention.", weights: { nietzsche: 2 } },
          { id: "d", label: "Chosen despite uncertainty.", weights: { camus: 2 } }
        ]
      },
      {
        id: "m3",
        prompt: "Your deepest fear in life is...",
        options: [
          { id: "a", label: "Living on borrowed beliefs.", weights: { socrates: 2 } },
          { id: "b", label: "Becoming reactive to chaos.", weights: { epictetus: 2 } },
          { id: "c", label: "Never testing my highest potential.", weights: { nietzsche: 2 } },
          { id: "d", label: "Losing courage in an indifferent world.", weights: { camus: 2 } }
        ]
      },
      {
        id: "m4",
        prompt: "In moments of doubt, you trust...",
        options: [
          { id: "a", label: "Critical dialogue.", weights: { socrates: 2 } },
          { id: "b", label: "Inner governance.", weights: { epictetus: 2 } },
          { id: "c", label: "Creative will.", weights: { nietzsche: 2 } },
          { id: "d", label: "Lucid acceptance.", weights: { camus: 2 } }
        ]
      },
      {
        id: "m5",
        prompt: "A meaningful life is best described as...",
        options: [
          { id: "a", label: "A long inquiry.", weights: { socrates: 2 } },
          { id: "b", label: "A disciplined practice.", weights: { epictetus: 2 } },
          { id: "c", label: "A work of authorship.", weights: { nietzsche: 2 } },
          { id: "d", label: "A revolt with dignity.", weights: { camus: 2 } }
        ]
      }
    ]
  },
  {
    id: "ethics",
    label: "Axis II: Ethics",
    protocol: "Initiation Protocol Beta",
    candidates: ["arendt", "kant", "de_beauvoir", "william_james"],
    questions: [
      {
        id: "e1",
        prompt: "When making hard decisions, you prioritize...",
        options: [
          { id: "a", label: "Public responsibility.", weights: { arendt: 2 } },
          { id: "b", label: "Universal principles.", weights: { kant: 2 } },
          { id: "c", label: "Freedom with accountability.", weights: { de_beauvoir: 2 } },
          { id: "d", label: "Practical outcomes.", weights: { william_james: 2 } }
        ]
      },
      {
        id: "e2",
        prompt: "A moral failure is mostly...",
        options: [
          { id: "a", label: "Refusing to think critically in public life.", weights: { arendt: 2 } },
          { id: "b", label: "Breaking duty for convenience.", weights: { kant: 2 } },
          { id: "c", label: "Abandoning your chosen commitments.", weights: { de_beauvoir: 2 } },
          { id: "d", label: "Ignoring real consequences.", weights: { william_james: 2 } }
        ]
      },
      {
        id: "e3",
        prompt: "In conflict, your compass is...",
        options: [
          { id: "a", label: "Shared world impact.", weights: { arendt: 2 } },
          { id: "b", label: "Coherence of rule.", weights: { kant: 2 } },
          { id: "c", label: "Authentic responsibility.", weights: { de_beauvoir: 2 } },
          { id: "d", label: "What improves life now.", weights: { william_james: 2 } }
        ]
      },
      {
        id: "e4",
        prompt: "You admire people who are...",
        options: [
          { id: "a", label: "Courageous in civic action.", weights: { arendt: 2 } },
          { id: "b", label: "Unshakeable in principle.", weights: { kant: 2 } },
          { id: "c", label: "Committed to becoming.", weights: { de_beauvoir: 2 } },
          { id: "d", label: "Useful and adaptive.", weights: { william_james: 2 } }
        ]
      },
      {
        id: "e5",
        prompt: "You trust an ethical system when...",
        options: [
          { id: "a", label: "It prevents thoughtless harm at scale.", weights: { arendt: 2 } },
          { id: "b", label: "It holds under universal application.", weights: { kant: 2 } },
          { id: "c", label: "It protects freedom and chosen duty.", weights: { de_beauvoir: 2 } },
          { id: "d", label: "It works in lived reality.", weights: { william_james: 2 } }
        ]
      }
    ]
  },
  {
    id: "self",
    label: "Axis III: Self",
    protocol: "Initiation Protocol Gamma",
    candidates: ["socrates", "de_beauvoir", "nietzsche", "epictetus"],
    questions: [
      {
        id: "s1",
        prompt: "Identity to you is...",
        options: [
          { id: "a", label: "A dialogue with the self.", weights: { socrates: 2 } },
          { id: "b", label: "A project under construction.", weights: { de_beauvoir: 2 } },
          { id: "c", label: "A force to be forged.", weights: { nietzsche: 2 } },
          { id: "d", label: "A disciplined interior life.", weights: { epictetus: 2 } }
        ]
      },
      {
        id: "s2",
        prompt: "When you feel misunderstood, you...",
        options: [
          { id: "a", label: "Ask sharper questions.", weights: { socrates: 2 } },
          { id: "b", label: "Reassert chosen commitments.", weights: { de_beauvoir: 2 } },
          { id: "c", label: "Double down on self-definition.", weights: { nietzsche: 2 } },
          { id: "d", label: "Detach from external judgment.", weights: { epictetus: 2 } }
        ]
      },
      {
        id: "s3",
        prompt: "Growth comes mostly from...",
        options: [
          { id: "a", label: "Intellectual friction.", weights: { socrates: 2 } },
          { id: "b", label: "Lived commitment over time.", weights: { de_beauvoir: 2 } },
          { id: "c", label: "Transformative struggle.", weights: { nietzsche: 2 } },
          { id: "d", label: "Consistent self-command.", weights: { epictetus: 2 } }
        ]
      },
      {
        id: "s4",
        prompt: "Your inner narrative should be...",
        options: [
          { id: "a", label: "Questioned often.", weights: { socrates: 2 } },
          { id: "b", label: "Owned intentionally.", weights: { de_beauvoir: 2 } },
          { id: "c", label: "Written boldly.", weights: { nietzsche: 2 } },
          { id: "d", label: "Steady and measured.", weights: { epictetus: 2 } }
        ]
      },
      {
        id: "s5",
        prompt: "A strong self is one that...",
        options: [
          { id: "a", label: "Can challenge itself.", weights: { socrates: 2 } },
          { id: "b", label: "Can become itself.", weights: { de_beauvoir: 2 } },
          { id: "c", label: "Can surpass itself.", weights: { nietzsche: 2 } },
          { id: "d", label: "Can govern itself.", weights: { epictetus: 2 } }
        ]
      }
    ]
  },
  {
    id: "action",
    label: "Axis IV: Action",
    protocol: "Initiation Protocol Delta",
    candidates: ["arendt", "william_james", "camus", "kant"],
    questions: [
      {
        id: "a1",
        prompt: "When urgency hits, your first move is...",
        options: [
          { id: "a", label: "Clarify civic consequences.", weights: { arendt: 2 } },
          { id: "b", label: "Test what works quickly.", weights: { william_james: 2 } },
          { id: "c", label: "Act with courage despite absurdity.", weights: { camus: 2 } },
          { id: "d", label: "Apply principle before speed.", weights: { kant: 2 } }
        ]
      },
      {
        id: "a2",
        prompt: "You feel most effective when you...",
        options: [
          { id: "a", label: "Shape shared reality.", weights: { arendt: 2 } },
          { id: "b", label: "Iterate through outcomes.", weights: { william_james: 2 } },
          { id: "c", label: "Refuse passivity.", weights: { camus: 2 } },
          { id: "d", label: "Honor duty under pressure.", weights: { kant: 2 } }
        ]
      },
      {
        id: "a3",
        prompt: "A decision is complete when...",
        options: [
          { id: "a", label: "Its public cost is owned.", weights: { arendt: 2 } },
          { id: "b", label: "It proves useful in life.", weights: { william_james: 2 } },
          { id: "c", label: "It is made with lucid defiance.", weights: { camus: 2 } },
          { id: "d", label: "It could be universally justified.", weights: { kant: 2 } }
        ]
      },
      {
        id: "a4",
        prompt: "When others hesitate, you...",
        options: [
          { id: "a", label: "Frame the collective stakes.", weights: { arendt: 2 } },
          { id: "b", label: "Prototype a working path.", weights: { william_james: 2 } },
          { id: "c", label: "Choose action over despair.", weights: { camus: 2 } },
          { id: "d", label: "Anchor to duty and proceed.", weights: { kant: 2 } }
        ]
      },
      {
        id: "a5",
        prompt: "Your default style of action is...",
        options: [
          { id: "a", label: "Public-minded.", weights: { arendt: 2 } },
          { id: "b", label: "Pragmatic.", weights: { william_james: 2 } },
          { id: "c", label: "Defiant.", weights: { camus: 2 } },
          { id: "d", label: "Principled.", weights: { kant: 2 } }
        ]
      }
    ]
  }
];

export function buildFlow() {
  return AXES.flatMap((axis) =>
    axis.questions.map((question, questionIndex) => ({
      ...question,
      axisId: axis.id,
      axisLabel: axis.label,
      axisProtocol: axis.protocol,
      axisCandidates: axis.candidates,
      axisQuestionIndex: questionIndex,
      axisQuestionTotal: axis.questions.length
    }))
  );
}

export function computeAxisWinners(answersByQuestionId, flow) {
  const axisScores = Object.fromEntries(
    AXES.map((axis) => [
      axis.id,
      Object.fromEntries(axis.candidates.map((candidate) => [candidate, 0]))
    ])
  );

  flow.forEach((question) => {
    const selectedOptionId = answersByQuestionId[question.id];
    if (!selectedOptionId) return;
    const selectedOption = question.options.find((option) => option.id === selectedOptionId);
    if (!selectedOption) return;

    Object.entries(selectedOption.weights || {}).forEach(([philosopherId, score]) => {
      if (axisScores[question.axisId] && Object.prototype.hasOwnProperty.call(axisScores[question.axisId], philosopherId)) {
        axisScores[question.axisId][philosopherId] += score;
      }
    });
  });

  const winners = AXES.map((axis) => {
    const leaderboard = Object.entries(axisScores[axis.id]);
    leaderboard.sort((a, b) => b[1] - a[1]);
    const winningId = leaderboard[0]?.[0] || axis.candidates[0];
    return {
      axisId: axis.id,
      axisLabel: axis.label,
      philosopherId: winningId,
      philosopher: PHILOSOPHERS[winningId],
      score: leaderboard[0]?.[1] || 0
    };
  });

  return { winners, axisScores };
}

export const PILLARS = [
  { id: "clarity", label: "Clarity" },
  { id: "agency", label: "Agency" },
  { id: "structure", label: "Structure" },
  { id: "imagination", label: "Imagination" },
  { id: "depth", label: "Depth" }
];

const PHILOSOPHER_PILLAR_SIGNATURES = {
  socrates: { clarity: 0.94, agency: 0.52, structure: 0.67, imagination: 0.58, depth: 0.88 },
  epictetus: { clarity: 0.78, agency: 0.7, structure: 0.95, imagination: 0.35, depth: 0.62 },
  nietzsche: { clarity: 0.58, agency: 0.98, structure: 0.34, imagination: 0.9, depth: 0.72 },
  camus: { clarity: 0.72, agency: 0.68, structure: 0.42, imagination: 0.79, depth: 0.93 },
  arendt: { clarity: 0.82, agency: 0.86, structure: 0.71, imagination: 0.44, depth: 0.64 },
  kant: { clarity: 0.86, agency: 0.59, structure: 0.98, imagination: 0.31, depth: 0.56 },
  de_beauvoir: { clarity: 0.67, agency: 0.84, structure: 0.5, imagination: 0.77, depth: 0.9 },
  william_james: { clarity: 0.74, agency: 0.87, structure: 0.57, imagination: 0.73, depth: 0.54 }
};

const PILLAR_COPY = {
  clarity: {
    strength: "You cut through noise fast and ask the question that actually matters.",
    weakness: "You can over-analyze and delay action while chasing the perfect frame."
  },
  agency: {
    strength: "You move ideas into reality and create momentum for people around you.",
    weakness: "You can push too hard and miss signals that the room needs a different pace."
  },
  structure: {
    strength: "You build dependable systems and keep your thinking coherent under pressure.",
    weakness: "You can protect order so tightly that useful surprises never get in."
  },
  imagination: {
    strength: "You generate original paths and see possibilities most people skip.",
    weakness: "You can drift into novelty and lose commitment to one direction."
  },
  depth: {
    strength: "You read emotional and existential layers with unusual honesty.",
    weakness: "You can get trapped in intensity and carry weight that is not yours to hold."
  }
};

const NAME_BANK = {
  clarity: {
    adjectives: ["Lucid", "Unclouded", "Silver-Eyed", "Keen"],
    nouns: ["Seer", "Witness", "Lens", "Cartographer"]
  },
  agency: {
    adjectives: ["Driven", "Catalytic", "Relentless", "Charging"],
    nouns: ["Forger", "Mover", "Spark", "Pathmaker"]
  },
  structure: {
    adjectives: ["Steady", "Architectural", "Measured", "Iron"],
    nouns: ["Architect", "Keeper", "Anchor", "Builder"]
  },
  imagination: {
    adjectives: ["Visionary", "Mythic", "Wild", "Luminous"],
    nouns: ["Dreamer", "Alchemist", "Composer", "Flame"]
  },
  depth: {
    adjectives: ["Abyssal", "Soulward", "Quiet", "Nightbound"],
    nouns: ["Diver", "Oracle", "Listener", "Mirror"]
  }
};

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function createHash(seed) {
  return String(seed || "").split("").reduce((acc, char, index) => acc + (char.charCodeAt(0) * (index + 17)), 0);
}

function normalizeAxisDistribution(axisScoreMap, fallbackCandidates) {
  const entries = Object.entries(axisScoreMap || {});
  const safeEntries = entries.length
    ? entries
    : (fallbackCandidates || []).map((candidate) => [candidate, 1]);
  const total = safeEntries.reduce((sum, [, score]) => sum + Math.max(0, Number(score) || 0), 0);

  if (!total) {
    const equal = 1 / Math.max(1, safeEntries.length);
    return Object.fromEntries(safeEntries.map(([id]) => [id, equal]));
  }

  return Object.fromEntries(
    safeEntries.map(([id, score]) => [id, (Math.max(0, Number(score) || 0) / total)])
  );
}

function computePillarScores(axisScores, winners, finalPhilosopherId) {
  const raw = Object.fromEntries(PILLARS.map((pillar) => [pillar.id, 0]));

  winners.forEach((winner) => {
    const axis = AXES.find((item) => item.id === winner.axisId);
    const distribution = normalizeAxisDistribution(axisScores?.[winner.axisId], axis?.candidates || []);

    Object.entries(distribution).forEach(([philosopherId, weight]) => {
      const signature = PHILOSOPHER_PILLAR_SIGNATURES[philosopherId];
      if (!signature) return;

      PILLARS.forEach((pillar) => {
        raw[pillar.id] += signature[pillar.id] * weight;
      });
    });
  });

  const finalSignature = PHILOSOPHER_PILLAR_SIGNATURES[finalPhilosopherId];
  if (finalSignature) {
    PILLARS.forEach((pillar) => {
      raw[pillar.id] = (raw[pillar.id] * 0.82) + (finalSignature[pillar.id] * 0.18);
    });
  }

  const rawValues = PILLARS.map((pillar) => raw[pillar.id]);
  const min = Math.min(...rawValues);
  const max = Math.max(...rawValues);
  const spread = Math.max(0.0001, max - min);

  return Object.fromEntries(
    PILLARS.map((pillar) => {
      const scaled = 24 + (((raw[pillar.id] - min) / spread) * 70);
      return [pillar.id, Math.round(clamp(scaled, 10, 98))];
    })
  );
}

function buildArchetypeName(topPillarId, secondPillarId, seedHash) {
  const primaryBank = NAME_BANK[topPillarId] || NAME_BANK.clarity;
  const secondaryBank = NAME_BANK[secondPillarId] || NAME_BANK.depth;

  const adjective = primaryBank.adjectives[seedHash % primaryBank.adjectives.length];
  const noun = secondaryBank.nouns[Math.floor(seedHash / 3) % secondaryBank.nouns.length];
  return `The ${adjective} ${noun}`;
}

function buildSummary(topPillarLabel, secondPillarLabel, weakestPillarLabel, seedHash) {
  const openings = [
    `You think through ${topPillarLabel.toLowerCase()} first and it gives your voice unusual precision.`,
    `Your mind is led by ${topPillarLabel.toLowerCase()}, so you notice what others gloss over.`,
    `Your strongest pattern is ${topPillarLabel.toLowerCase()}, and people feel that steadiness when you speak.`
  ];
  const bridges = [
    `Then ${secondPillarLabel.toLowerCase()} enters and turns reflection into motion.`,
    `Your ${secondPillarLabel.toLowerCase()} keeps the profile from becoming passive.`,
    `You pair it with ${secondPillarLabel.toLowerCase()} to move from insight into action.`
  ];
  const tensions = [
    `The pressure point is ${weakestPillarLabel.toLowerCase()}, especially when decisions need flexibility.`,
    `The blind spot usually appears around ${weakestPillarLabel.toLowerCase()} in high-stakes moments.`,
    `Growth comes from protecting your gifts while strengthening ${weakestPillarLabel.toLowerCase()}.`
  ];

  return `${openings[seedHash % openings.length]} ${bridges[Math.floor(seedHash / 5) % bridges.length]} ${tensions[Math.floor(seedHash / 7) % tensions.length]}`;
}

export function computeArchetypeProfile({ winners = [], axisScores = {}, finalPhilosopherId = "" } = {}) {
  const safeWinners = Array.isArray(winners) ? winners : [];
  const pillars = computePillarScores(axisScores, safeWinners, finalPhilosopherId);

  const sorted = [...PILLARS]
    .map((pillar) => ({
      id: pillar.id,
      label: pillar.label,
      score: pillars[pillar.id]
    }))
    .sort((a, b) => b.score - a.score);

  const topThree = sorted.slice(0, 3);
  const weakestTwo = sorted.slice(-2).sort((a, b) => a.score - b.score);
  const topPillar = topThree[0] || PILLARS[0];
  const secondPillar = topThree[1] || PILLARS[1];
  const weakestPillar = weakestTwo[0] || PILLARS[4];

  const seed = `${finalPhilosopherId}|${safeWinners.map((winner) => winner.philosopherId || winner.axisId).join("-")}`;
  const seedHash = createHash(seed);
  const name = buildArchetypeName(topPillar.id, secondPillar.id, seedHash);

  return {
    id: `archetype-${topPillar.id}-${secondPillar.id}-${seedHash % 997}`,
    name,
    cardTitle: name.toUpperCase(),
    summary: buildSummary(topPillar.label, secondPillar.label, weakestPillar.label, seedHash),
    strengths: topThree.map((pillar) => PILLAR_COPY[pillar.id].strength),
    weaknesses: weakestTwo.map((pillar) => PILLAR_COPY[pillar.id].weakness),
    pillars,
    topPillars: topThree.map((pillar) => pillar.id),
    weakPillars: weakestTwo.map((pillar) => pillar.id)
  };
}
