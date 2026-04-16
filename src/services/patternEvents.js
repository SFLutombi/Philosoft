import { hasSupabaseConfig, supabase } from "./supabase";

const LOCAL_EVENT_STORAGE_KEY = "philosift_pattern_events";

function loadLocalEvents() {
  try {
    const raw = localStorage.getItem(LOCAL_EVENT_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveLocalEvents(events) {
  try {
    localStorage.setItem(LOCAL_EVENT_STORAGE_KEY, JSON.stringify(events));
  } catch {
    // Ignore storage errors in restricted browser modes.
  }
}

function createLocalEventId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `evt_${Date.now()}_${Math.floor(Math.random() * 100000)}`;
}

function normalizeEvent(event) {
  return {
    ...event,
    trigger_type: event.trigger_type || event.pattern_type || "unknown",
    predicted_outcome: event.predicted_outcome || null,
    action_taken: event.action_taken || (event.action === "interrupt" ? "acted" : event.action === "follow" ? "delayed" : "delayed"),
    pattern_type: event.pattern_type || event.trigger_type || "unknown",
    action: event.action || (event.action_taken === "acted" ? "interrupt" : "follow"),
  };
}

export async function createPatternEvent({
  userId,
  triggerType,
  predictedOutcome = null,
  actionTaken,
  action,
  patternType,
  note = "",
}) {
  const resolvedTriggerType = triggerType || patternType || "unknown";
  const resolvedActionTaken = actionTaken || (action === "interrupt" ? "acted" : action === "follow" ? "delayed" : action || "delayed");
  const legacyAction = resolvedActionTaken === "acted" ? "interrupt" : "follow";
  const event = {
    id: createLocalEventId(),
    user_id: userId,
    created_at: new Date().toISOString(),
    trigger_type: resolvedTriggerType,
    predicted_outcome: predictedOutcome,
    action_taken: resolvedActionTaken,
    note: note || null,
    pattern_type: resolvedTriggerType,
    action: legacyAction,
  };

  if (!hasSupabaseConfig || !supabase) {
    const localEvents = loadLocalEvents();
    localEvents.unshift(event);
    saveLocalEvents(localEvents);
    return normalizeEvent(event);
  }

  const { data, error } = await supabase
    .from("pattern_events")
    .insert({
      user_id: event.user_id,
      trigger_type: event.trigger_type,
      predicted_outcome: event.predicted_outcome,
      action_taken: event.action_taken,
      note: event.note,
      pattern_type: event.pattern_type,
      action: event.action,
    })
    .select("id, user_id, created_at, trigger_type, predicted_outcome, action_taken, note, pattern_type, action")
    .single();

  if (error) {
    throw error;
  }

  return normalizeEvent(data);
}

export async function listPatternEvents(userId, limit = 50) {
  if (!userId) {
    return [];
  }

  if (!hasSupabaseConfig || !supabase) {
    return loadLocalEvents().filter((event) => event.user_id === userId).slice(0, limit).map(normalizeEvent);
  }

  const { data, error } = await supabase
    .from("pattern_events")
    .select("id, user_id, created_at, trigger_type, predicted_outcome, action_taken, note, pattern_type, action")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    throw error;
  }

  return (data || []).map(normalizeEvent);
}
