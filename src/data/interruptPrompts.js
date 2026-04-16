const GENERIC_INTERRUPT_PROMPT = {
  subArchetypeId: "generic",
  recognitionPrompt: "You are stepping into a familiar loop.",
  triggerOptions: [
    "I am hesitating",
    "I am drifting",
    "I am about to repeat the pattern"
  ],
  loopPrompt: "This is the point where the pattern usually takes over.",
  consequenceOptions: [
    "I lose momentum",
    "I repeat the cycle",
    "I delay the next move"
  ],
  interruptionStatement: "The pattern is visible now.",
  microActions: [
    "Pause for 10 seconds",
    "Do the next visible step",
    "Move with intention"
  ]
};

export const INTERRUPT_PROMPTS = {
  stuck_aware: {
    subArchetypeId: "stuck_aware",
    recognitionPrompt: "You know the next step. You are stalling at the threshold.",
    triggerOptions: [
      "Opening the work and stopping",
      "Rewriting the plan again",
      "Waiting for a better moment"
    ],
    loopPrompt: "This is where momentum usually leaks out.",
    consequenceOptions: [
      "I lose the window",
      "I keep circling",
      "I push it to later"
    ],
    interruptionStatement: "The move is smaller than your fear.",
    microActions: [
      "Open the first file",
      "Do the next visible step",
      "Work for 2 minutes"
    ]
  },
  overthinker: {
    subArchetypeId: "overthinker",
    recognitionPrompt: "You are replacing action with analysis.",
    triggerOptions: [
      "Comparing options",
      "Checking one more detail",
      "Waiting for certainty"
    ],
    loopPrompt: "More analysis will not produce movement.",
    consequenceOptions: [
      "I stay stuck",
      "I delay the choice",
      "I talk myself out of it"
    ],
    interruptionStatement: "Decide with the information you already have.",
    microActions: [
      "Pick the simplest option",
      "Choose within 5 seconds",
      "Start before you feel ready"
    ]
  },
  identity_seeker: {
    subArchetypeId: "identity_seeker",
    recognitionPrompt: "Your self-image is clear, but your behavior is drifting.",
    triggerOptions: [
      "Explaining who I am",
      "Rehearsing the ideal version of me",
      "Trying to match the image"
    ],
    loopPrompt: "This is where identity stays abstract.",
    consequenceOptions: [
      "I postpone the real change",
      "I protect the image",
      "I repeat the old response"
    ],
    interruptionStatement: "Identity only matters when it changes the next move.",
    microActions: [
      "Do one concrete action",
      "Choose the harder truthful step",
      "Move before explaining yourself"
    ]
  },
  self_sabotaging: {
    subArchetypeId: "self_sabotaging",
    recognitionPrompt: "You are about to undo a real step forward.",
    triggerOptions: [
      "Shrinking the commitment",
      "Picking a distraction",
      "Creating a reason to quit"
    ],
    loopPrompt: "This is the familiar pullback.",
    consequenceOptions: [
      "I lose progress",
      "I reset the work",
      "I repeat the cycle"
    ],
    interruptionStatement: "Do not let the old reflex rename itself as prudence.",
    microActions: [
      "Keep the commitment",
      "Finish the current step",
      "Stay with the discomfort"
    ]
  },
  high_ambition_frustrated: {
    subArchetypeId: "high_ambition_frustrated",
    recognitionPrompt: "You are starting fast and losing sequence.",
    triggerOptions: [
      "Taking on too much",
      "Switching targets",
      "Pushing past structure"
    ],
    loopPrompt: "Speed is replacing direction.",
    consequenceOptions: [
      "I lose the thread",
      "I create more work",
      "I fail to finish cleanly"
    ],
    interruptionStatement: "Progress needs shape before it needs more force.",
    microActions: [
      "Pick one target",
      "Reduce the scope",
      "Finish the current sequence"
    ]
  },
  aftershock_witness: {
    subArchetypeId: "aftershock_witness",
    recognitionPrompt: "An old reaction is returning under a new surface.",
    triggerOptions: [
      "Reading into tone",
      "Preparing for conflict",
      "Reliving the last version"
    ],
    loopPrompt: "This is the replay.",
    consequenceOptions: [
      "I react to the past",
      "I lose the present",
      "I repeat the emotional pattern"
    ],
    interruptionStatement: "What happened before is not happening again yet.",
    microActions: [
      "Name the trigger",
      "Delay the reaction",
      "Respond to the present only"
    ]
  },
  divergent_mind: {
    subArchetypeId: "divergent_mind",
    recognitionPrompt: "You are holding two standards and acting from the weaker one.",
    triggerOptions: [
      "Saying one thing and doing another",
      "Protecting the exception",
      "Trying to keep both sides comfortable"
    ],
    loopPrompt: "The split becomes the pattern.",
    consequenceOptions: [
      "I stay divided",
      "I blur my standard",
      "I keep making exceptions"
    ],
    interruptionStatement: "Choose the standard you actually want to live by.",
    microActions: [
      "Pick one rule",
      "Act consistently once",
      "Stop defending the exception"
    ]
  },
  early_improvement: {
    subArchetypeId: "early_improvement",
    recognitionPrompt: "You are at the beginning again, before structure exists.",
    triggerOptions: [
      "Starting from scratch",
      "Changing systems too soon",
      "Jumping to a new method"
    ],
    loopPrompt: "Restarting feels productive, but it erases progress.",
    consequenceOptions: [
      "I lose traction",
      "I reset the work",
      "I never stabilize"
    ],
    interruptionStatement: "Keep the structure long enough for it to work.",
    microActions: [
      "Stay with one method",
      "Do the next two minutes",
      "Protect the current sequence"
    ]
  },
  pattern_nerd: {
    subArchetypeId: "pattern_nerd",
    recognitionPrompt: "You can see the pattern, but you are still watching it happen.",
    triggerOptions: [
      "Naming the loop",
      "Studying the sequence",
      "Waiting for proof"
    ],
    loopPrompt: "Insight is arriving late.",
    consequenceOptions: [
      "I keep observing",
      "I miss the intervention point",
      "I learn without changing"
    ],
    interruptionStatement: "Seeing it is not the same as interrupting it.",
    microActions: [
      "Act immediately",
      "Choose the first correction",
      "Interrupt before analyzing more"
    ]
  },
  lurker_passive: {
    subArchetypeId: "lurker_passive",
    recognitionPrompt: "You are collecting more input instead of making the move.",
    triggerOptions: [
      "Reading one more source",
      "Staying in observer mode",
      "Postponing the decision"
    ],
    loopPrompt: "Clarity keeps getting deferred.",
    consequenceOptions: [
      "I remain invisible to myself",
      "I delay the move",
      "I keep circling the same idea"
    ],
    interruptionStatement: "You already have enough to begin.",
    microActions: [
      "Make one visible choice",
      "Do the first action",
      "Stop gathering and move"
    ]
  }
};

export function getInterruptPromptSet(subArchetypeId) {
  return INTERRUPT_PROMPTS[subArchetypeId] || GENERIC_INTERRUPT_PROMPT;
}
