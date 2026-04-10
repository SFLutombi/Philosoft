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
