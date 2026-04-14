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
        prompt: "When my plans collapse, what do I do first?",
        options: [
          { id: "a", label: "I interrogate assumptions before rebuilding.", weights: { socrates: 2, camus: 1 } },
          { id: "b", label: "I stabilize what is in my control.", weights: { epictetus: 2 } },
          { id: "c", label: "I use the disruption to reinvent my direction.", weights: { nietzsche: 2 } },
          { id: "d", label: "I accept absurdity and keep moving.", weights: { camus: 2, epictetus: 1 } }
        ]
      },
      {
        id: "m2",
        prompt: "Meaning feels most real to me when I...",
        options: [
          { id: "a", label: "Examine it through persistent questioning.", weights: { socrates: 2 } },
          { id: "b", label: "Live it through disciplined action.", weights: { epictetus: 2 } },
          { id: "c", label: "Self-author it against convention.", weights: { nietzsche: 2 } },
          { id: "d", label: "Choose it despite uncertainty.", weights: { camus: 2 } }
        ]
      },
      {
        id: "m3",
        prompt: "My deepest fear in life is...",
        options: [
          { id: "a", label: "Living on borrowed beliefs.", weights: { socrates: 2 } },
          { id: "b", label: "Becoming reactive to chaos.", weights: { epictetus: 2 } },
          { id: "c", label: "Never testing my highest potential.", weights: { nietzsche: 2 } },
          { id: "d", label: "Losing courage in an indifferent world.", weights: { camus: 2 } }
        ]
      },
      {
        id: "m4",
        prompt: "In moments of doubt, I trust...",
        options: [
          { id: "a", label: "Critical dialogue.", weights: { socrates: 2 } },
          { id: "b", label: "Inner governance.", weights: { epictetus: 2 } },
          { id: "c", label: "Creative will.", weights: { nietzsche: 2 } },
          { id: "d", label: "Lucid acceptance.", weights: { camus: 2 } }
        ]
      },
      {
        id: "m5",
        prompt: "For me, a meaningful life is best described as...",
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
        prompt: "When making hard decisions, I prioritize...",
        options: [
          { id: "a", label: "I prioritize public responsibility.", weights: { arendt: 2 } },
          { id: "b", label: "I prioritize universal principles.", weights: { kant: 2 } },
          { id: "c", label: "I prioritize freedom with accountability.", weights: { de_beauvoir: 2 } },
          { id: "d", label: "I prioritize practical outcomes.", weights: { william_james: 2 } }
        ]
      },
      {
        id: "e2",
        prompt: "For me, a moral failure is mostly...",
        options: [
          { id: "a", label: "Refusing to think critically in public life.", weights: { arendt: 2 } },
          { id: "b", label: "Breaking duty for convenience.", weights: { kant: 2 } },
          { id: "c", label: "Abandoning my chosen commitments.", weights: { de_beauvoir: 2 } },
          { id: "d", label: "Ignoring real consequences.", weights: { william_james: 2 } }
        ]
      },
      {
        id: "e3",
        prompt: "In conflict, my compass is...",
        options: [
          { id: "a", label: "Shared world impact.", weights: { arendt: 2 } },
          { id: "b", label: "Coherence of rule.", weights: { kant: 2 } },
          { id: "c", label: "Authentic responsibility.", weights: { de_beauvoir: 2 } },
          { id: "d", label: "What improves life now.", weights: { william_james: 2 } }
        ]
      },
      {
        id: "e4",
        prompt: "I admire people who are...",
        options: [
          { id: "a", label: "Courageous in civic action.", weights: { arendt: 2 } },
          { id: "b", label: "Unshakeable in principle.", weights: { kant: 2 } },
          { id: "c", label: "Committed to becoming.", weights: { de_beauvoir: 2 } },
          { id: "d", label: "Useful and adaptive.", weights: { william_james: 2 } }
        ]
      },
      {
        id: "e5",
        prompt: "I trust an ethical system when...",
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
        prompt: "Identity to me is...",
        options: [
          { id: "a", label: "A dialogue with the self.", weights: { socrates: 2 } },
          { id: "b", label: "A project under construction.", weights: { de_beauvoir: 2 } },
          { id: "c", label: "A force to be forged.", weights: { nietzsche: 2 } },
          { id: "d", label: "A disciplined interior life.", weights: { epictetus: 2 } }
        ]
      },
      {
        id: "s2",
        prompt: "When I feel misunderstood, I...",
        options: [
          { id: "a", label: "Ask sharper questions.", weights: { socrates: 2 } },
          { id: "b", label: "Reassert chosen commitments.", weights: { de_beauvoir: 2 } },
          { id: "c", label: "Double down on self-definition.", weights: { nietzsche: 2 } },
          { id: "d", label: "Detach from external judgment.", weights: { epictetus: 2 } }
        ]
      },
      {
        id: "s3",
        prompt: "For me, growth comes mostly from...",
        options: [
          { id: "a", label: "Intellectual friction.", weights: { socrates: 2 } },
          { id: "b", label: "Lived commitment over time.", weights: { de_beauvoir: 2 } },
          { id: "c", label: "Transformative struggle.", weights: { nietzsche: 2 } },
          { id: "d", label: "Consistent self-command.", weights: { epictetus: 2 } }
        ]
      },
      {
        id: "s4",
        prompt: "My inner narrative should be...",
        options: [
          { id: "a", label: "Questioned often.", weights: { socrates: 2 } },
          { id: "b", label: "Owned intentionally.", weights: { de_beauvoir: 2 } },
          { id: "c", label: "Written boldly.", weights: { nietzsche: 2 } },
          { id: "d", label: "Steady and measured.", weights: { epictetus: 2 } }
        ]
      },
      {
        id: "s5",
        prompt: "A strong self in me is one that...",
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
        prompt: "When urgency hits, my first move is...",
        options: [
          { id: "a", label: "I clarify civic consequences.", weights: { arendt: 2 } },
          { id: "b", label: "I test what works quickly.", weights: { william_james: 2 } },
          { id: "c", label: "I act with courage despite absurdity.", weights: { camus: 2 } },
          { id: "d", label: "I apply principle before speed.", weights: { kant: 2 } }
        ]
      },
      {
        id: "a2",
        prompt: "I feel most effective when I...",
        options: [
          { id: "a", label: "Shape shared reality.", weights: { arendt: 2 } },
          { id: "b", label: "Iterate through outcomes.", weights: { william_james: 2 } },
          { id: "c", label: "Refuse passivity.", weights: { camus: 2 } },
          { id: "d", label: "Honor duty under pressure.", weights: { kant: 2 } }
        ]
      },
      {
        id: "a3",
        prompt: "For me, a decision is complete when...",
        options: [
          { id: "a", label: "Its public cost is owned.", weights: { arendt: 2 } },
          { id: "b", label: "It proves useful in life.", weights: { william_james: 2 } },
          { id: "c", label: "It is made with lucid defiance.", weights: { camus: 2 } },
          { id: "d", label: "It could be universally justified.", weights: { kant: 2 } }
        ]
      },
      {
        id: "a4",
        prompt: "When others hesitate, I...",
        options: [
          { id: "a", label: "Frame the collective stakes.", weights: { arendt: 2 } },
          { id: "b", label: "Prototype a working path.", weights: { william_james: 2 } },
          { id: "c", label: "Choose action over despair.", weights: { camus: 2 } },
          { id: "d", label: "Anchor to duty and proceed.", weights: { kant: 2 } }
        ]
      },
      {
        id: "a5",
        prompt: "My default style of action is...",
        options: [
          { id: "a", label: "I am public-minded.", weights: { arendt: 2 } },
          { id: "b", label: "I am pragmatic.", weights: { william_james: 2 } },
          { id: "c", label: "I am defiant.", weights: { camus: 2 } },
          { id: "d", label: "I am principled.", weights: { kant: 2 } }
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

const STYLE_DEFINITIONS = {
  inquiry: {
    archetypeName: "The Inner Examiner",
    feel: "inward, precise, and truth-seeking",
    summaryLead: "You spot the hidden assumption before it turns into a decision.",
    summaryGift: "That makes you sharp at reading your own motives and asking the question nobody else has named.",
    summaryDaily: "In daily life, it shows up when you slow a rushed choice, rethink a conversation, or choose the clearer truth over the easier one.",
    summaryTension: "Your edge can narrow into over-checking if you wait for perfect certainty before you move."
  },
  discipline: {
    archetypeName: "The Sharp Steward",
    feel: "controlled, exacting, and dependable",
    summaryLead: "You bring order fast when life starts to fray.",
    summaryGift: "That gives you a steady hand with plans, routines, and the small systems that keep bigger things from slipping.",
    summaryDaily: "In daily life, it shows up when you keep your word, organize the mess before it spreads, or catch the weak point in a process early.",
    summaryTension: "Your edge can harden into rigidity if you treat every useful change like a threat."
  },
  self_authorship: {
    archetypeName: "The Unbound Maker",
    feel: "rebellious, self-directed, and transformative",
    summaryLead: "You do not just accept the script in front of you.",
    summaryGift: "You are more likely to reshape it, remix it, or build something that feels more yours.",
    summaryDaily: "In daily life, it shows up when you redesign a routine, change your mind without guilt, or turn a constraint into a new route forward.",
    summaryTension: "Your edge can scatter if you keep reaching for the next possibility before you have finished the last one."
  },
  existential_courage: {
    archetypeName: "The Clear Rebel",
    feel: "inward, brave, and defiant under pressure",
    summaryLead: "You keep your footing when the ground feels uncertain.",
    summaryGift: "That gives you a quiet kind of courage when you have to move without guarantees.",
    summaryDaily: "In daily life, it shows up when you keep going after disappointment, say the hard thing cleanly, or choose dignity over panic.",
    summaryTension: "Your edge can become isolation if you insist on carrying the pressure alone."
  },
  civic_responsibility: {
    archetypeName: "The Civic Builder",
    feel: "public-minded, responsible, and steady",
    summaryLead: "You naturally think beyond yourself.",
    summaryGift: "That makes you attentive to consequences, shared spaces, and the people affected by your choices.",
    summaryDaily: "In daily life, it shows up when you think about fairness, coordinate people well, or step into responsibility before anyone asks.",
    summaryTension: "Your edge can become over-responsibility if you keep absorbing what should be shared."
  },
  principle_logic: {
    archetypeName: "The Principle Blade",
    feel: "sharp, coherent, and duty-bound",
    summaryLead: "You cut through fog by asking what is right, not just what is convenient.",
    summaryGift: "That gives you a strong moral line and little patience for excuses when something should be done properly.",
    summaryDaily: "In daily life, it shows up when you check whether a choice can hold up under pressure, or when you refuse to trade integrity for speed.",
    summaryTension: "Your edge can become severe if you let principle outrun the human situation in front of you."
  },
  freedom_commitment: {
    archetypeName: "The Committed Self",
    feel: "authentic, inward, and self-owned",
    summaryLead: "You want your life to feel chosen, not inherited.",
    summaryGift: "That makes you serious about commitment, because you do not want to live as a version of yourself that does not fit.",
    summaryDaily: "In daily life, it shows up when you protect your values, name what you actually want, or stay loyal to a decision you made with care.",
    summaryTension: "Your edge can turn inward too sharply if you confuse self-possession with having to prove yourself all the time."
  },
  pragmatic_adaptation: {
    archetypeName: "The Practical Navigator",
    feel: "adaptable, grounded, and execution-focused",
    summaryLead: "You are strongest when the map changes and you still have to move.",
    summaryGift: "That gives you a calm, useful way of making decisions that work in the real world.",
    summaryDaily: "In daily life, it shows up when you improvise without panicking, choose the workable option, or adjust course before a small problem becomes a bigger one.",
    summaryTension: "Your edge can get too short-term if you only optimize for the next step and forget the destination."
  }
};

const QUESTION_SCORING_RULES = {
  m1: {
    a: { style: "inquiry", pillars: { clarity: 2, depth: 1 } },
    b: { style: "discipline", pillars: { structure: 2, clarity: 1 } },
    c: { style: "self_authorship", pillars: { agency: 2, imagination: 1 } },
    d: { style: "existential_courage", pillars: { depth: 2, agency: 1 } }
  },
  m2: {
    a: { style: "inquiry", pillars: { clarity: 2, depth: 1 } },
    b: { style: "discipline", pillars: { structure: 2, clarity: 1 } },
    c: { style: "self_authorship", pillars: { agency: 2, imagination: 1 } },
    d: { style: "existential_courage", pillars: { depth: 2, clarity: 1 } }
  },
  m3: {
    a: { style: "inquiry", pillars: { clarity: 2, depth: 1 } },
    b: { style: "discipline", pillars: { structure: 2, depth: 1 } },
    c: { style: "self_authorship", pillars: { agency: 2, imagination: 1 } },
    d: { style: "existential_courage", pillars: { depth: 2, agency: 1 } }
  },
  m4: {
    a: { style: "inquiry", pillars: { clarity: 2, depth: 1 } },
    b: { style: "discipline", pillars: { structure: 2, agency: 1 } },
    c: { style: "self_authorship", pillars: { agency: 2, imagination: 1 } },
    d: { style: "existential_courage", pillars: { depth: 2, clarity: 1 } }
  },
  m5: {
    a: { style: "inquiry", pillars: { clarity: 2, depth: 1 } },
    b: { style: "discipline", pillars: { structure: 2, depth: 1 } },
    c: { style: "self_authorship", pillars: { agency: 2, imagination: 1 } },
    d: { style: "existential_courage", pillars: { depth: 2, imagination: 1 } }
  },
  e1: {
    a: { style: "civic_responsibility", pillars: { structure: 1, agency: 2, clarity: 1 } },
    b: { style: "principle_logic", pillars: { structure: 2, clarity: 1 } },
    c: { style: "freedom_commitment", pillars: { agency: 2, depth: 1, imagination: 1 } },
    d: { style: "pragmatic_adaptation", pillars: { agency: 2, clarity: 1, structure: 1 } }
  },
  e2: {
    a: { style: "civic_responsibility", pillars: { structure: 2, depth: 1 } },
    b: { style: "principle_logic", pillars: { structure: 2, clarity: 1 } },
    c: { style: "freedom_commitment", pillars: { agency: 2, depth: 1 } },
    d: { style: "pragmatic_adaptation", pillars: { clarity: 2, agency: 1 } }
  },
  e3: {
    a: { style: "civic_responsibility", pillars: { agency: 2, structure: 1 } },
    b: { style: "principle_logic", pillars: { structure: 2, clarity: 1 } },
    c: { style: "freedom_commitment", pillars: { depth: 2, agency: 1 } },
    d: { style: "pragmatic_adaptation", pillars: { clarity: 1, agency: 2 } }
  },
  e4: {
    a: { style: "civic_responsibility", pillars: { agency: 2, depth: 1 } },
    b: { style: "principle_logic", pillars: { structure: 2, clarity: 1 } },
    c: { style: "freedom_commitment", pillars: { imagination: 2, depth: 1 } },
    d: { style: "pragmatic_adaptation", pillars: { agency: 2, clarity: 1 } }
  },
  e5: {
    a: { style: "civic_responsibility", pillars: { structure: 1, agency: 2 } },
    b: { style: "principle_logic", pillars: { structure: 2, clarity: 1 } },
    c: { style: "freedom_commitment", pillars: { depth: 1, imagination: 1, agency: 1 } },
    d: { style: "pragmatic_adaptation", pillars: { clarity: 2, agency: 1 } }
  },
  s1: {
    a: { style: "inquiry", pillars: { clarity: 2, depth: 1 } },
    b: { style: "freedom_commitment", pillars: { agency: 1, depth: 1, imagination: 1 } },
    c: { style: "self_authorship", pillars: { agency: 2, imagination: 1 } },
    d: { style: "discipline", pillars: { structure: 2, depth: 1 } }
  },
  s2: {
    a: { style: "inquiry", pillars: { clarity: 2, depth: 1 } },
    b: { style: "freedom_commitment", pillars: { agency: 2, depth: 1 } },
    c: { style: "self_authorship", pillars: { agency: 2, imagination: 1 } },
    d: { style: "discipline", pillars: { structure: 1, depth: 1 } }
  },
  s3: {
    a: { style: "inquiry", pillars: { clarity: 2, depth: 1 } },
    b: { style: "freedom_commitment", pillars: { depth: 2, agency: 1 } },
    c: { style: "self_authorship", pillars: { agency: 2, depth: 1 } },
    d: { style: "discipline", pillars: { structure: 2, clarity: 1 } }
  },
  s4: {
    a: { style: "inquiry", pillars: { clarity: 2, depth: 1 } },
    b: { style: "freedom_commitment", pillars: { agency: 1, depth: 1 } },
    c: { style: "self_authorship", pillars: { agency: 2, imagination: 1 } },
    d: { style: "discipline", pillars: { structure: 2, depth: 1 } }
  },
  s5: {
    a: { style: "inquiry", pillars: { clarity: 2, depth: 1 } },
    b: { style: "freedom_commitment", pillars: { agency: 2, depth: 1 } },
    c: { style: "self_authorship", pillars: { agency: 2, imagination: 1 } },
    d: { style: "discipline", pillars: { structure: 2, agency: 1 } }
  },
  a1: {
    a: { style: "civic_responsibility", pillars: { agency: 2, structure: 1 } },
    b: { style: "pragmatic_adaptation", pillars: { agency: 2, clarity: 1 } },
    c: { style: "existential_courage", pillars: { agency: 2, depth: 1 } },
    d: { style: "principle_logic", pillars: { structure: 2, clarity: 1 } }
  },
  a2: {
    a: { style: "civic_responsibility", pillars: { agency: 2, structure: 1 } },
    b: { style: "pragmatic_adaptation", pillars: { agency: 2, clarity: 1 } },
    c: { style: "existential_courage", pillars: { agency: 2, depth: 1 } },
    d: { style: "principle_logic", pillars: { structure: 2, agency: 1 } }
  },
  a3: {
    a: { style: "civic_responsibility", pillars: { structure: 2, agency: 1 } },
    b: { style: "pragmatic_adaptation", pillars: { agency: 2, clarity: 1 } },
    c: { style: "existential_courage", pillars: { depth: 2, agency: 1 } },
    d: { style: "principle_logic", pillars: { structure: 2, clarity: 1 } }
  },
  a4: {
    a: { style: "civic_responsibility", pillars: { agency: 2, structure: 1 } },
    b: { style: "pragmatic_adaptation", pillars: { agency: 2, clarity: 1 } },
    c: { style: "existential_courage", pillars: { depth: 2, agency: 1 } },
    d: { style: "principle_logic", pillars: { structure: 2, clarity: 1 } }
  },
  a5: {
    a: { style: "civic_responsibility", pillars: { agency: 2, structure: 1 } },
    b: { style: "pragmatic_adaptation", pillars: { agency: 2, clarity: 1 } },
    c: { style: "existential_courage", pillars: { depth: 2, agency: 1 } },
    d: { style: "principle_logic", pillars: { structure: 2, clarity: 1 } }
  }
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

const DOMAIN_INFLUENTIAL_TRAITS = {
  personal_growth: {
    clarity: ["Self-Observation", "Pattern Awareness"],
    agency: ["Follow-Through", "Self-Direction"],
    structure: ["Habit Discipline", "Consistency"],
    imagination: ["Reframing", "Creative Recovery"],
    depth: ["Emotional Honesty", "Inner Endurance"]
  },
  career: {
    clarity: ["Strategic Judgment", "Decision Hygiene"],
    agency: ["Initiative", "Execution Drive"],
    structure: ["Operational Reliability", "Process Thinking"],
    imagination: ["Innovation", "Concept Building"],
    depth: ["Meaning Alignment", "Pressure Maturity"]
  },
  relationships: {
    clarity: ["Boundary Clarity", "Direct Communication"],
    agency: ["Conflict Ownership", "Repair Effort"],
    structure: ["Relational Stability", "Trust Cadence"],
    imagination: ["Empathic Imagination", "Playfulness"],
    depth: ["Emotional Intimacy", "Attachment Awareness"]
  }
};

const DOMAIN_PLACEHOLDER_COPY = {
  personal_growth: {
    intros: [
      "Your growth pattern points to a strong inner engine. This section will map how your highest traits can become daily practices without burnout.",
      "Your profile suggests that growth comes from deliberate friction. This section will translate your top traits into repeatable self-development loops.",
      "Your next evolution is less about intensity and more about rhythm. This section will decode where discipline, rest, and identity-building should meet."
    ],
    lockedCards: [
      { title: "What Energizes You", body: "Placeholder: six high-leverage growth conditions personalized to your trait profile." },
      { title: "What Drains You", body: "Placeholder: six recurring energy leaks and how to reduce their impact." },
      { title: "Growth Protocol", body: "Placeholder: a phased 30-day reflection plan with practical prompts." }
    ]
  },
  career: {
    intros: [
      "Your work signature likely rewards roles with strategic ownership and visible impact. This section will map where your profile performs best.",
      "Your trait blend suggests specific environments where your judgment and drive compound quickly. This section will identify those conditions.",
      "Your strongest career edge appears in contexts that match your top pillars. This section will turn that edge into role-level direction."
    ],
    lockedCards: [
      { title: "Career Paths You Might Love", body: "Placeholder: ten role paths ranked by fit and long-term satisfaction potential." },
      { title: "Work Styles That Suit You", body: "Placeholder: six collaboration and workflow modes where you perform best." },
      { title: "Career Pitfalls", body: "Placeholder: six professional blind spots and mitigation strategies." }
    ]
  },
  relationships: {
    intros: [
      "Your relationship pattern balances depth with direction. This section will show where your connection style becomes your strongest advantage.",
      "Your profile indicates high relational potential when boundaries and honesty stay aligned. This section will unpack that dynamic.",
      "Your emotional architecture suggests specific attachment strengths and friction points. This section will convert them into practical moves."
    ],
    lockedCards: [
      { title: "Relationship Superpowers", body: "Placeholder: six relational strengths that support trust and long-term stability." },
      { title: "Relationship Pitfalls", body: "Placeholder: six repeating dynamics that can strain close bonds." },
      { title: "Repair and Reconnect", body: "Placeholder: tactical scripts for conflict repair and emotional reconnection." }
    ]
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

function normalizeScoreMap(scoreMap) {
  const entries = Object.entries(scoreMap || {});
  const total = entries.reduce((sum, [, score]) => sum + Math.max(0, Number(score) || 0), 0);

  if (!total) {
    const equal = 1 / Math.max(1, entries.length);
    return Object.fromEntries(entries.map(([key]) => [key, equal]));
  }

  return Object.fromEntries(entries.map(([key, score]) => [key, (Math.max(0, Number(score) || 0) / total)]));
}

function computeWeightedScoresFromAnswers(answersByQuestionId, flow) {
  const styleScores = Object.fromEntries(Object.keys(STYLE_DEFINITIONS).map((styleId) => [styleId, 0]));
  const pillarScores = Object.fromEntries(PILLARS.map((pillar) => [pillar.id, 0]));

  if (!answersByQuestionId || !flow?.length) {
    return { styleScores, pillarScores };
  }

  flow.forEach((question, questionIndex) => {
    const selectedOptionId = answersByQuestionId[question.id];
    const rule = QUESTION_SCORING_RULES[question.id]?.[selectedOptionId];
    if (!rule) return;

    styleScores[rule.style] += 1;

    const optionStrength = 1 + (questionIndex % 3 === 0 ? 0.1 : 0);
    Object.entries(rule.pillars || {}).forEach(([pillarId, score]) => {
      pillarScores[pillarId] += score * optionStrength;
    });
  });

  return { styleScores, pillarScores };
}

function scalePillarScores(rawScores) {
  const rawValues = PILLARS.map((pillar) => rawScores[pillar.id] || 0);
  const min = Math.min(...rawValues);
  const max = Math.max(...rawValues);
  const spread = Math.max(0.0001, max - min);

  return Object.fromEntries(
    PILLARS.map((pillar) => {
      const normalized = (rawScores[pillar.id] - min) / spread;
      const eased = Math.pow(clamp(normalized, 0, 1), 0.85);
      const scaled = 50 + (eased * 48);
      return [pillar.id, Math.round(clamp(scaled, 50, 98))];
    })
  );
}

function computeLegacyStyleScores(winners = []) {
  const styleScores = Object.fromEntries(Object.keys(STYLE_DEFINITIONS).map((styleId) => [styleId, 0]));
  const legacyMap = {
    socrates: "inquiry",
    epictetus: "discipline",
    nietzsche: "self_authorship",
    camus: "existential_courage",
    arendt: "civic_responsibility",
    kant: "principle_logic",
    de_beauvoir: "freedom_commitment",
    william_james: "pragmatic_adaptation"
  };

  (winners || []).forEach((winner) => {
    const styleId = legacyMap[winner?.philosopherId];
    if (styleId) styleScores[styleId] += 1;
  });

  return styleScores;
}

function computePillarScoresFromStyles(normalizedStyles) {
  const raw = Object.fromEntries(PILLARS.map((pillar) => [pillar.id, 0]));

  Object.entries(normalizedStyles || {}).forEach(([styleId, weight]) => {
    const signature = STYLE_PILLAR_WEIGHTS[styleId];
    if (!signature) return;

    PILLARS.forEach((pillar) => {
      raw[pillar.id] += signature[pillar.id] * weight;
    });
  });

  return scalePillarScores(raw);
}

function buildArchetypeName(topPillarId, secondPillarId, seedHash) {
  const primaryBank = NAME_BANK[topPillarId] || NAME_BANK.clarity;
  const secondaryBank = NAME_BANK[secondPillarId] || NAME_BANK.depth;

  const adjective = primaryBank.adjectives[seedHash % primaryBank.adjectives.length];
  const noun = secondaryBank.nouns[Math.floor(seedHash / 3) % secondaryBank.nouns.length];
  return `The ${adjective} ${noun}`;
}

function buildSummary(styleId) {
  const styleCopy = STYLE_DEFINITIONS[styleId] || STYLE_DEFINITIONS.inquiry;
  const stripTerminalPunctuation = (text) => String(text || "").trim().replace(/[.!?]+$/, "");
  const lead = stripTerminalPunctuation(styleCopy.summaryLead);
  const gift = stripTerminalPunctuation(styleCopy.summaryGift);
  const daily = stripTerminalPunctuation(styleCopy.summaryDaily);
  const tension = stripTerminalPunctuation(styleCopy.summaryTension).replace(/^your\s+/i, "your ");

  return `${lead}. ${gift} ${daily}. However, ${tension}.`;
}

function buildReasoningTemperament(styleId, topPillarLabel, secondPillarLabel, weakestPillarLabel) {
  const styleCopy = STYLE_DEFINITIONS[styleId] || STYLE_DEFINITIONS.inquiry;
  const stripTerminalPunctuation = (text) => String(text || "").trim().replace(/[.!?]+$/, "");

  const lead = stripTerminalPunctuation(styleCopy.summaryLead);
  const gift = stripTerminalPunctuation(styleCopy.summaryGift);
  const daily = stripTerminalPunctuation(styleCopy.summaryDaily).replace(/^In daily life,\s*/i, "");
  const weaknessConsequences = {
    clarity: "you start chasing the perfect frame instead of making the call that is already clear enough",
    agency: "you push your reasoning so hard that it loses nuance and becomes more force than judgment",
    structure: "you protect order so tightly that useful surprises cannot enter the thinking process",
    imagination: "you keep reaching for the next possibility and never fully commit to the one that could actually work",
    depth: "you carry the weight of meaning so deeply that it slows your best judgment and clouds your options"
  };

  const weaknessImpact = weaknessConsequences[weakestPillarLabel.toLowerCase()] || "it narrows your reasoning and keeps part of your potential out of reach";

  return [
    "Your stable thinking pattern is the way you make sense of uncertainty, choose a direction, and stay coherent when pressure rises.",
    `Clarity keeps you honest about what matters, structure keeps your thinking organized, agency turns insight into action, imagination widens the frame, and depth keeps the emotional cost in view.`,
    `In your case, ${topPillarLabel.toLowerCase()} and ${secondPillarLabel.toLowerCase()} carry the most weight, so your judgment naturally feels ${styleCopy.feel}.`,
    `${lead} ${gift}.`,
    `In practice, ${daily}.`,
    `However, when ${weakestPillarLabel.toLowerCase()} is stretched too thin, ${weaknessImpact}, which can hold your reasoning back and keep you from reaching the fuller version of your potential.`
  ].join(" ");
}

function buildDomainPreview(domainId, topPillars, seedHash) {
  const domainTraits = DOMAIN_INFLUENTIAL_TRAITS[domainId] || {};
  const domainCopy = DOMAIN_PLACEHOLDER_COPY[domainId];
  const traitPool = topPillars.flatMap((pillarId) => domainTraits[pillarId] || []);
  const uniqueTraits = [...new Set(traitPool)].slice(0, 4);

  return {
    intro: domainCopy?.intros?.[seedHash % domainCopy.intros.length] || "Placeholder section",
    influentialTraits: uniqueTraits,
    lockedCards: domainCopy?.lockedCards || []
  };
}

export function computeArchetypeProfile({ answersByQuestionId = {}, flow = [], winners = [] } = {}) {
  const hasAnswers = Object.keys(answersByQuestionId || {}).length > 0;
  const weightedScores = computeWeightedScoresFromAnswers(answersByQuestionId, flow);
  const styleScores = hasAnswers ? weightedScores.styleScores : computeLegacyStyleScores(winners);
  const normalizedStyles = normalizeScoreMap(styleScores);
  const pillars = hasAnswers
    ? scalePillarScores(weightedScores.pillarScores)
    : computePillarScoresFromStyles(normalizedStyles);

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

  const primaryStyle = Object.entries(styleScores)
    .sort((a, b) => b[1] - a[1])[0]?.[0] || "inquiry";
  const styleDef = STYLE_DEFINITIONS[primaryStyle] || STYLE_DEFINITIONS.inquiry;

  const seed = `${primaryStyle}|${topPillar.id}|${secondPillar.id}`;
  const seedHash = createHash(seed);
  const generatedName = buildArchetypeName(topPillar.id, secondPillar.id, seedHash);
  const name = styleDef.archetypeName || generatedName;
  const totalStyleScore = Object.values(styleScores).reduce((sum, score) => sum + score, 0);

  return {
    id: `archetype-v2-${primaryStyle}-${seedHash % 997}`,
    name,
    cardTitle: name.toUpperCase(),
    summary: buildSummary(primaryStyle),
    reasoningTemperament: buildReasoningTemperament(primaryStyle, topPillar.label, secondPillar.label, weakestPillar.label),
    strengths: topThree.map((pillar) => PILLAR_COPY[pillar.id].strength),
    weaknesses: weakestTwo.map((pillar) => PILLAR_COPY[pillar.id].weakness),
    pillars,
    topPillars: topThree.map((pillar) => pillar.id),
    weakPillars: weakestTwo.map((pillar) => pillar.id),
    primaryStyle,
    styleScores,
    styleDistribution: normalizedStyles,
    personalGrowthPreview: buildDomainPreview("personal_growth", topThree.map((pillar) => pillar.id), seedHash),
    careerPreview: buildDomainPreview("career", topThree.map((pillar) => pillar.id), seedHash),
    relationshipPreview: buildDomainPreview("relationships", topThree.map((pillar) => pillar.id), seedHash),
    totalStyleScore,
    modelVersion: 2
  };
}
