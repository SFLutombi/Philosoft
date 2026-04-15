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

export async function createPatternEvent({ userId, patternType, action, note = "" }) {
  const event = {
    id: createLocalEventId(),
    user_id: userId,
    created_at: new Date().toISOString(),
    pattern_type: patternType,
    action,
    note: note || null,
  };

  if (!hasSupabaseConfig || !supabase) {
    const localEvents = loadLocalEvents();
    localEvents.unshift(event);
    saveLocalEvents(localEvents);
    return event;
  }

  const { data, error } = await supabase
    .from("pattern_events")
    .insert({
      user_id: event.user_id,
      pattern_type: event.pattern_type,
      action: event.action,
      note: event.note,
    })
    .select("id, user_id, created_at, pattern_type, action, note")
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function listPatternEvents(userId, limit = 50) {
  if (!userId) {
    return [];
  }

  if (!hasSupabaseConfig || !supabase) {
    return loadLocalEvents().filter((event) => event.user_id === userId).slice(0, limit);
  }

  const { data, error } = await supabase
    .from("pattern_events")
    .select("id, user_id, created_at, pattern_type, action, note")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    throw error;
  }

  return data || [];
}
