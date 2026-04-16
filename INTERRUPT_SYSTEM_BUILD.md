# PhiloSift Interrupt System — Complete Build Prompt

## 🎯 EXECUTIVE SUMMARY

You are building the core interaction system for PhiloSift, a PWA that helps users interrupt recurring behavioral patterns in real time.

The system has:
- **One fixed interruption flow** (same for all users)
- **Dynamic prompt layer** (changes per archetype)
- **Event logging** (tracks user behavior)

This is a single-session, zero-AI, predefined-prompt system. No personalization. No generation. No complexity.

---

## 🏗️ DATA MODEL (SUPABASE)

### Table: `users`
```
id (uuid, primary key)
clerk_id (text, unique)
archetype (text)
sub_archetype (text)
pattern_name (text)
pattern_description (text)
created_at (timestamp)
```

### Table: `pattern_events`
```
id (uuid, primary key)
user_id (uuid, foreign key → users.id)
created_at (timestamp)
trigger_type (text)
predicted_outcome (text)
action_taken (text: "acted" | "delayed" | "avoided")
note (text, optional)
```

### Table: `archetype_prompts`
**This table is the heart of the system. It powers all dynamic behavior.**

```
id (uuid, primary key)
sub_archetype (text, unique)
recognition_prompt (text)
trigger_options (json array of strings)
loop_prompt (text)
consequence_options (json array of strings)
interruption_statement (text)
micro_actions (json array of strings)
created_at (timestamp)
```

**Example row:**
```json
{
  "sub_archetype": "Self-Sabotaging Architect",
  "recognition_prompt": "You are about to repeat a familiar mistake.",
  "trigger_options": [
    "Avoiding responsibility",
    "Making an impulsive choice",
    "Ignoring something important"
  ],
  "loop_prompt": "This is where you usually lose control.",
  "consequence_options": [
    "I regret it later",
    "I reset progress",
    "I repeat the cycle"
  ],
  "interruption_statement": "This is the pattern—not who you are.",
  "micro_actions": [
    "Pause for 10 seconds",
    "Do the opposite action",
    "Continue with intention"
  ]
}
```

---

## 🧩 INTERRUPTION FLOW (EXACT IMPLEMENTATION)

### STEP 1 — RECOGNITION

**Display:**
- User's current pattern name (from `users.pattern_name`)
- Dynamic: `archetype_prompts.recognition_prompt`

**Interaction:**
- Show buttons for: `archetype_prompts.trigger_options`
- User selects one

**Save:**
- `trigger_type` = selected option

---

### STEP 2 — LOOP EXPOSURE

**Display:**
- Dynamic: `archetype_prompts.loop_prompt`
- Static text: "If nothing changes, what happens next?"

**Interaction:**
- Show buttons for: `archetype_prompts.consequence_options`
- User selects one

**Save:**
- `predicted_outcome` = selected option

---

### STEP 3 — INTERRUPTION

**Display:**
- Dynamic: `archetype_prompts.interruption_statement`
- Static text: "What is the smallest action you can take right now?"

**Interaction:**
- Show buttons for: `archetype_prompts.micro_actions`
- User selects one (or can enter custom text)

**Save:**
- `action_suggested` = selected/entered action (do not save to DB yet)

---

### STEP 4 — DECISION

**Display:**
- Static text: "What did you do?"

**Interaction:**
- Show 3 buttons:
  - "Acted"
  - "Delayed"
  - "Avoided"
- User selects one

**Save:**
- `action_taken` = selected value

---

### STEP 5 — FEEDBACK

**Display:**
- If `action_taken === "acted"`:
  - "You interrupted the pattern. ✓"
- If `action_taken === "delayed"` OR `action_taken === "avoided"`:
  - "You observed the pattern."

**Interaction:**
- Button: "Back to Dashboard"

---

### STEP 6 — SAVE EVENT

**Insert into `pattern_events`:**
```json
{
  "user_id": current_user_id,
  "created_at": now(),
  "trigger_type": trigger_type,
  "predicted_outcome": predicted_outcome,
  "action_taken": action_taken,
  "note": null
}
```

---

## 🎨 UI REQUIREMENTS

### Dashboard Entry Point
- Large circular button (from DashboardPage redesign)
- Label: "Interrupt Pattern" (or hidden, icon-only)
- Action: Navigate to `/interrupt`

### Flow Container
- Full-screen or modal overlay (mobile-first design)
- One step per screen
- Minimal text (only what's needed)
- Large, tappable buttons (44px+ min height)
- Dark theme (match brand: `#131313` background, `#e9c176` accents)

### Progress Indicator
- Optional: Show "Step X of 5" or progress bar
- Recommended: Keep it minimal or omit entirely

### Mobile Considerations
- No horizontal scroll
- Ample vertical padding
- Touch-friendly spacing
- Viewport-safe (no clipping)

---

## 🎯 ARCHETYPE PROMPT REFERENCE

Below are complete prompt sets for 3 core archetypes. Seed the `archetype_prompts` table with these + others as needed.

### 1. SELF-SABOTAGING ARCHITECT

```json
{
  "sub_archetype": "Self-Sabotaging Architect",
  "recognition_prompt": "You are about to repeat a familiar mistake.",
  "trigger_options": [
    "Avoiding responsibility",
    "Making an impulsive choice",
    "Ignoring something important"
  ],
  "loop_prompt": "This is where you usually lose control.",
  "consequence_options": [
    "I regret it later",
    "I reset progress",
    "I repeat the cycle"
  ],
  "interruption_statement": "This is the pattern—not who you are.",
  "micro_actions": [
    "Pause for 10 seconds",
    "Do the opposite action",
    "Continue with intention"
  ]
}
```

### 2. OVERTHINKER

```json
{
  "sub_archetype": "Overthinker",
  "recognition_prompt": "You are thinking instead of acting.",
  "trigger_options": [
    "Analyzing options",
    "Waiting for clarity",
    "Re-checking decisions"
  ],
  "loop_prompt": "This is where thinking replaces action.",
  "consequence_options": [
    "I delay",
    "I do nothing",
    "I revisit later"
  ],
  "interruption_statement": "More thinking will not solve this.",
  "micro_actions": [
    "Act within 5 seconds",
    "Choose the simplest option",
    "Move without certainty"
  ]
}
```

### 3. FIRST-STEP SEEKER

```json
{
  "sub_archetype": "First-Step Seeker",
  "recognition_prompt": "You are starting—but not structuring.",
  "trigger_options": [
    "Jumping into something new",
    "Switching tasks",
    "Losing direction"
  ],
  "loop_prompt": "This is where execution breaks.",
  "consequence_options": [
    "I restart later",
    "I lose progress",
    "I scatter effort"
  ],
  "interruption_statement": "Direction matters more than energy.",
  "micro_actions": [
    "Choose one path",
    "Define next step",
    "Continue for 2 minutes"
  ]
}
```

---

## 🔧 IMPLEMENTATION CHECKLIST

### Backend (Supabase)
- [ ] Create `archetype_prompts` table
- [ ] Seed with prompt sets (at least 3, ideally all 8 sub-archetypes)
- [ ] Verify `pattern_events` table exists and has correct schema
- [ ] Add index on `pattern_events.user_id` for fast queries

### Frontend (React/Vite)
- [ ] Create `InterruptFlowPage.jsx` (or split into separate components)
- [ ] Load user's sub-archetype from context/auth state
- [ ] Fetch `archetype_prompts` row matching `sub_archetype`
- [ ] Implement 5-step flow:
  - [ ] Recognition screen
  - [ ] Loop exposure screen
  - [ ] Interruption screen
  - [ ] Decision screen
  - [ ] Feedback + navigation
- [ ] Save event to `pattern_events` on completion
- [ ] Handle loading/error states gracefully

### UI/UX
- [ ] Center all text and buttons
- [ ] Use brand colors: `#e9c176` (primary), `#131313` (dark background)
- [ ] Ensure mobile-first responsiveness
- [ ] Test on small screens (min 320px width)
- [ ] Confirm tappable button sizes are 44px minimum

### Navigation
- [ ] Route: `/interrupt` → InterruptFlowPage
- [ ] After completion: redirect to `/dashboard`
- [ ] Allow skip/back button (optional but recommended for UX)

---

## 📋 SYSTEM RULES

### DO:
- ✅ Use predefined prompts ONLY (from `archetype_prompts`)
- ✅ Keep flow under 30 seconds total interaction time
- ✅ Log every event (even if user "delayed" or "avoided")
- ✅ Make buttons large and easy to tap
- ✅ Display one step per screen

### DO NOT:
- ❌ Use AI or LLM for prompt generation
- ❌ Allow free-form typing (except optional custom action)
- ❌ Add chat interface
- ❌ Build journaling system
- ❌ Build complex analytics dashboard
- ❌ Add notifications (for MVP)
- ❌ Over-explain the flow
- ❌ Add multi-step confirmations

---

## 🎯 SUCCESS CONDITION

**User presses button → completes 5-step flow → event is logged → redirected to dashboard**

That's it. Anything else is scope creep.

---

## 🔗 RELATED FILES

- **Dashboard entry point:** `src/pages/DashboardPage.jsx` (already redesigned)
- **Existing flow page:** `src/pages/InterruptFlowPage.jsx` (may need refactor)
- **Pattern events service:** `src/services/patternEvents.js` (use for logging)
- **Result flow helpers:** `src/data/resultFlow.js` (use to load user archetype)

---

## 📌 NOTES FOR DEVELOPER

1. **User context:** Get `sub_archetype` from loaded quiz results or user profile
2. **Error handling:** If `archetype_prompts` row not found, show generic fallback prompts
3. **Offline:** Flow should work offline (cache prompts on first load)
4. **Performance:** Fetch prompts once on page load, not per-step
5. **Analytics:** Event logging is the only metric you need for MVP

---

## 🚀 DEPLOYMENT READINESS

Before shipping:
- [ ] All `archetype_prompts` rows populated
- [ ] Supabase RLS policies configured (user can only log their own events)
- [ ] Tested on mobile (iOS Safari, Android Chrome)
- [ ] Tested with slow/offline connection
- [ ] Verified timestamps are UTC

---

**Version:** 1.0  
**Last Updated:** 2026-04-16  
**Status:** Ready to Build
