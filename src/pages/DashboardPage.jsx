import { useEffect, useMemo, useRef, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserButton, useUser } from "@clerk/react";
import { loadStoredResult, resolveSubarchetype } from "../data/resultFlow";
import { listPatternEvents } from "../services/patternEvents";
import { getRevenueCatCustomerInfo, hasAlignmentSystemAccess } from "../services/revenuecat";
import ArchiveSidebar from "../components/ArchiveSidebar";

const INTRO_SEEN_KEY = "philosift_dashboard_intro_seen_v1";
const ALARMS_STORAGE_KEY = "philosift_alarm_schedule_v1";
const ALARM_LAST_FIRED_KEY = "philosift_alarm_last_fired_v1";

const DEFAULT_ALARMS = [
  { id: "morning", label: "Morning Checkpoint", time: "07:30", enabled: true },
  { id: "lunch", label: "Lunch Checkpoint", time: "12:30", enabled: true },
  { id: "evening", label: "Evening Checkpoint", time: "20:30", enabled: true },
];

const PROGRESSION_SPARKS = [
  { id: "p1", top: "8%", left: "12%", delay: "0ms" },
  { id: "p2", top: "24%", left: "82%", delay: "400ms" },
  { id: "p3", top: "58%", left: "90%", delay: "800ms" },
  { id: "p4", top: "74%", left: "18%", delay: "1200ms" },
  { id: "p5", top: "38%", left: "48%", delay: "1600ms" },
  { id: "p6", top: "16%", left: "62%", delay: "2000ms" },
  { id: "p7", top: "68%", left: "72%", delay: "2400ms" },
  { id: "p8", top: "50%", left: "8%", delay: "2800ms" },
];

function readIntroSeen() {
  try {
    return localStorage.getItem(INTRO_SEEN_KEY) === "1";
  } catch {
    return false;
  }
}

function writeIntroSeen() {
  try {
    localStorage.setItem(INTRO_SEEN_KEY, "1");
  } catch {
    // Ignore storage failures in restricted browser modes.
  }
}

function readAlarms() {
  try {
    const raw = localStorage.getItem(ALARMS_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    if (!Array.isArray(parsed) || parsed.length === 0) {
      return DEFAULT_ALARMS;
    }

    return parsed.map((alarm, index) => ({
      id: alarm.id || `alarm_${index}_${Date.now()}`,
      label: alarm.label || `Checkpoint ${index + 1}`,
      time: alarm.time || "09:00",
      enabled: alarm.enabled !== false,
    }));
  } catch {
    return DEFAULT_ALARMS;
  }
}

function writeAlarms(alarms) {
  try {
    localStorage.setItem(ALARMS_STORAGE_KEY, JSON.stringify(alarms));
  } catch {
    // Ignore storage failures in restricted browser modes.
  }
}

function readLastFiredMap() {
  try {
    const raw = localStorage.getItem(ALARM_LAST_FIRED_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function writeLastFiredMap(value) {
  try {
    localStorage.setItem(ALARM_LAST_FIRED_KEY, JSON.stringify(value));
  } catch {
    // Ignore storage failures in restricted browser modes.
  }
}

function formatRelativeDate(value) {
  if (!value) {
    return "No sessions yet";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "No sessions yet";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function computeCurrentStreak(events) {
  if (!events.length) {
    return 0;
  }

  const uniqueDates = new Set(
    events.map((event) => {
      const d = new Date(event.created_at);
      return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
    })
  );

  let streak = 0;
  const cursor = new Date();

  while (true) {
    const key = `${cursor.getFullYear()}-${cursor.getMonth()}-${cursor.getDate()}`;
    if (!uniqueDates.has(key)) {
      break;
    }
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  return streak;
}

function reorderAlarms(alarms, draggedId, targetId) {
  if (!draggedId || !targetId || draggedId === targetId) {
    return alarms;
  }

  const draggedIndex = alarms.findIndex((alarm) => alarm.id === draggedId);
  const targetIndex = alarms.findIndex((alarm) => alarm.id === targetId);
  if (draggedIndex < 0 || targetIndex < 0) {
    return alarms;
  }

  const updated = [...alarms];
  const [dragged] = updated.splice(draggedIndex, 1);
  updated.splice(targetIndex, 0, dragged);
  return updated;
}

export default function DashboardPage() {
  const { user } = useUser();
  const storedResult = loadStoredResult();
  const [introPhase, setIntroPhase] = useState("hidden");
  const [alarms, setAlarms] = useState(() => readAlarms());
  const [isAlarmModalOpen, setIsAlarmModalOpen] = useState(false);
  const [notificationPermission, setNotificationPermission] = useState(typeof Notification === "undefined" ? "unsupported" : Notification.permission);
  const [events, setEvents] = useState([]);
  const [isLoadingEvents, setIsLoadingEvents] = useState(true);
  const [subscriptionLabel, setSubscriptionLabel] = useState("Checking access...");
  const [subscriptionManagementUrl, setSubscriptionManagementUrl] = useState("");
  const dragAlarmIdRef = useRef("");

  const subarchetype = useMemo(() => resolveSubarchetype(storedResult), [storedResult]);

  useEffect(() => {
    if (readIntroSeen()) {
      setIntroPhase("hidden");
      return;
    }

    setIntroPhase("explain");
    writeIntroSeen();

    const timeoutId = window.setTimeout(() => {
      setIntroPhase("alarms");
    }, 4300);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    writeAlarms(alarms);
  }, [alarms]);

  useEffect(() => {
    if (typeof Notification === "undefined") {
      return;
    }

    const intervalId = window.setInterval(() => {
      const now = new Date();
      const hh = String(now.getHours()).padStart(2, "0");
      const mm = String(now.getMinutes()).padStart(2, "0");
      const currentTime = `${hh}:${mm}`;
      const dayKey = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`;
      const firedMap = readLastFiredMap();

      let updated = false;
      alarms.forEach((alarm) => {
        if (!alarm.enabled || alarm.time !== currentTime) {
          return;
        }

        const fireKey = `${alarm.id}:${dayKey}:${alarm.time}`;
        if (firedMap[alarm.id] === fireKey) {
          return;
        }

        if (Notification.permission === "granted") {
          new Notification("PhiloSift Checkpoint", {
            body: `${alarm.label}: your interrupt window is open. Progress counts.`,
            icon: "/favicon.svg",
          });
        }

        firedMap[alarm.id] = fireKey;
        updated = true;
      });

      if (updated) {
        writeLastFiredMap(firedMap);
      }
    }, 30000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [alarms]);

  useEffect(() => {
    let isMounted = true;

    async function run() {
      if (!user?.id) {
        setIsLoadingEvents(false);
        return;
      }

      try {
        const data = await listPatternEvents(user.id, 100);
        if (!isMounted) {
          return;
        }
        setEvents(data);
      } catch {
        if (!isMounted) {
          return;
        }
        setEvents([]);
      } finally {
        if (isMounted) {
          setIsLoadingEvents(false);
        }
      }
    }

    run();

    return () => {
      isMounted = false;
    };
  }, [user?.id]);

  useEffect(() => {
    let isMounted = true;

    async function run() {
      try {
        const customerInfo = await getRevenueCatCustomerInfo();
        if (!isMounted) {
          return;
        }

        const hasAccess = hasAlignmentSystemAccess(customerInfo);
        setSubscriptionLabel(hasAccess ? "Alignment Access Active" : "No Active Access");
        setSubscriptionManagementUrl(customerInfo?.managementURL || "");
      } catch {
        if (!isMounted) {
          return;
        }
        setSubscriptionLabel("Subscription status unavailable");
        setSubscriptionManagementUrl("");
      }
    }

    run();

    return () => {
      isMounted = false;
    };
  }, []);

  const actedCount = events.filter((event) => event.action_taken === "acted").length;
  const avoidedCount = events.filter((event) => event.action_taken === "avoided").length;
  const delayedCount = events.filter((event) => event.action_taken === "delayed").length;
  const totalSessions = events.length;
  const actedRate = totalSessions > 0 ? Math.round((actedCount / totalSessions) * 100) : 0;
  const recentSession = events[0]?.created_at || "";
  const currentPattern = subarchetype?.name || "Unlabeled Pattern";
  const streakDays = computeCurrentStreak(events);
  const progressionTier = totalSessions >= 12 ? 2 : totalSessions >= 5 ? 1 : 0;
  const aliveMessage = progressionTier === 2 ? "The Archive is fully awake." : progressionTier === 1 ? "The Archive is waking up." : "Interruptions are building your field.";
  const enabledAlarms = alarms.filter((alarm) => alarm.enabled).length;
  const nextAlarm = alarms.find((alarm) => alarm.enabled)?.time || "--:--";

  async function requestNotificationPermission() {
    if (typeof Notification === "undefined") {
      setNotificationPermission("unsupported");
      return;
    }

    try {
      const permission = await Notification.requestPermission();
      setNotificationPermission(permission);
    } catch {
      setNotificationPermission("denied");
    }
  }

  function closeAlarmIntro() {
    setIntroPhase("hidden");
  }

  function addAlarm() {
    const newId = `alarm_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
    setAlarms((current) => [
      ...current,
      { id: newId, label: `Checkpoint ${current.length + 1}`, time: "15:00", enabled: true },
    ]);
  }

  function removeAlarm(id) {
    setAlarms((current) => current.filter((alarm) => alarm.id !== id));
  }

  function updateAlarm(id, field, value) {
    setAlarms((current) => current.map((alarm) => (alarm.id === id ? { ...alarm, [field]: value } : alarm)));
  }

  if (!storedResult) {
    return <Navigate to="/quiz" replace />;
  }

  return (
    <div className="min-h-[100svh] bg-[#131313] text-on-surface antialiased" style={{ backgroundImage: "radial-gradient(#201f1f 0.5px, transparent 0.5px)", backgroundSize: "24px 24px" }}>
      {progressionTier > 0 ? (
        <>
          <div className="pointer-events-none fixed inset-0 z-[1]">
            <div className="absolute -top-32 left-1/4 h-80 w-80 rounded-full bg-primary/10 blur-3xl animate-pulse" />
            <div className="absolute bottom-24 right-[-8rem] h-96 w-96 rounded-full bg-primary/8 blur-3xl animate-pulse" style={{ animationDelay: "700ms" }} />
            {PROGRESSION_SPARKS.map((spark) => (
              <span
                key={spark.id}
                className="absolute inline-flex h-2.5 w-2.5 rounded-full bg-primary/45 animate-pulse"
                style={{ top: spark.top, left: spark.left, animationDelay: spark.delay }}
              />
            ))}
          </div>
          <div className="pointer-events-none fixed left-1/2 top-3 z-[2] -translate-x-1/2 rounded-full border border-primary/35 bg-[#121111]/75 px-4 py-2 text-center backdrop-blur-md">
            <p className="font-label text-[10px] uppercase tracking-[0.2em] text-primary/90">{aliveMessage}</p>
          </div>
        </>
      ) : null}

      {introPhase === "explain" ? (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-[#111111]/92 px-4">
          <div className="relative w-full max-w-xl overflow-hidden rounded-[2rem] border border-primary/30 bg-[#161413] p-7 text-center shadow-[0_24px_90px_rgba(0,0,0,0.55)] sm:p-10">
            <div className="pointer-events-none absolute -top-24 right-[-4rem] h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 left-[-4rem] h-56 w-56 rounded-full bg-primary/10 blur-3xl" />

            <p className="font-label text-[10px] uppercase tracking-[0.26em] text-primary/85">Guided Start</p>
            <h2 className="mt-4 font-headline text-3xl italic text-on-surface sm:text-4xl">This is your Pattern Interrupt Button.</h2>
            <p className="mt-4 text-sm leading-relaxed text-on-surface-variant sm:text-base">
              Tap it the moment you feel the loop beginning. The flow is short, fast, and built to turn awareness into action.
            </p>

            <div className="mt-8 flex justify-center">
              <div className="relative flex h-40 w-40 items-center justify-center rounded-full border-2 border-primary/60 bg-primary/15 shadow-[0_0_40px_rgba(233,193,118,0.2)]">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full border border-primary/45" />
                <img src="/favicon.svg" alt="" className="relative h-20 w-20" />
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {introPhase === "alarms" ? (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-[#111111]/94 px-4">
          <div className="relative w-full max-w-2xl overflow-hidden rounded-[2rem] border border-primary/30 bg-[#161413] p-6 shadow-[0_24px_90px_rgba(0,0,0,0.55)] sm:p-8">
            <p className="font-label text-[10px] uppercase tracking-[0.24em] text-primary/85">Daily Alarms</p>
            <h2 className="mt-3 font-headline text-3xl italic text-on-surface">Set your 3 anchor reminders.</h2>
            <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">Drag to reorder and set times for morning, lunch, and evening. You can edit these anytime from the bottom bar.</p>

            <div className="mt-6 space-y-3">
              {alarms.map((alarm) => (
                <div
                  key={alarm.id}
                  draggable
                  onDragStart={() => {
                    dragAlarmIdRef.current = alarm.id;
                  }}
                  onDragOver={(event) => {
                    event.preventDefault();
                  }}
                  onDrop={() => {
                    setAlarms((current) => reorderAlarms(current, dragAlarmIdRef.current, alarm.id));
                  }}
                  className="grid grid-cols-[1fr_auto_auto] items-center gap-3 rounded-xl border border-outline-variant/25 bg-surface-container-high/70 px-3 py-3"
                >
                  <input
                    type="text"
                    value={alarm.label}
                    onChange={(event) => updateAlarm(alarm.id, "label", event.target.value.slice(0, 26))}
                    className="w-full rounded-md border border-transparent bg-transparent px-2 py-1 text-sm text-on-surface outline-none transition-colors focus:border-primary/35"
                  />
                  <input
                    type="time"
                    value={alarm.time}
                    onChange={(event) => updateAlarm(alarm.id, "time", event.target.value)}
                    className="rounded-md border border-outline-variant/35 bg-[#1a1a1a] px-2 py-1 text-sm text-on-surface"
                  />
                  <button
                    type="button"
                    onClick={() => updateAlarm(alarm.id, "enabled", !alarm.enabled)}
                    className={`rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.12em] ${alarm.enabled ? "border-primary/45 bg-primary/15 text-primary" : "border-outline-variant/30 text-on-surface-variant"}`}
                  >
                    {alarm.enabled ? "On" : "Off"}
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={async () => {
                  await requestNotificationPermission();
                  closeAlarmIntro();
                }}
                className="rounded-full border border-primary/45 bg-primary/15 px-5 py-3 text-xs uppercase tracking-[0.14em] text-primary transition-colors hover:bg-primary/25"
              >
                Enable and Continue
              </button>
              <button
                type="button"
                onClick={closeAlarmIntro}
                className="rounded-full border border-outline-variant/30 px-5 py-3 text-xs uppercase tracking-[0.14em] text-on-surface-variant transition-colors hover:border-primary/35 hover:text-primary"
              >
                Skip for now
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {isAlarmModalOpen ? (
        <div className="fixed inset-0 z-[75] flex items-center justify-center bg-[#0d0d0d]/88 px-4">
          <div className="w-full max-w-2xl rounded-2xl border border-outline-variant/25 bg-[#181818] p-5 sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-label text-[10px] uppercase tracking-[0.2em] text-primary/85">Alarm Settings</p>
                <h3 className="mt-2 font-headline text-2xl italic">Checkpoint Reminders</h3>
                <p className="mt-2 text-sm text-on-surface-variant">Add, remove, reorder, and retime reminders.</p>
              </div>
              <button type="button" onClick={() => setIsAlarmModalOpen(false)} className="rounded-full border border-outline-variant/30 px-3 py-2 text-xs uppercase tracking-[0.12em] text-on-surface-variant hover:border-primary/35 hover:text-primary">
                Close
              </button>
            </div>

            <div className="mt-5 space-y-3">
              {alarms.map((alarm) => (
                <div
                  key={alarm.id}
                  draggable
                  onDragStart={() => {
                    dragAlarmIdRef.current = alarm.id;
                  }}
                  onDragOver={(event) => {
                    event.preventDefault();
                  }}
                  onDrop={() => {
                    setAlarms((current) => reorderAlarms(current, dragAlarmIdRef.current, alarm.id));
                  }}
                  className="grid grid-cols-[1fr_auto_auto_auto] items-center gap-2 rounded-xl border border-outline-variant/25 bg-surface-container-high/70 px-3 py-3"
                >
                  <input
                    type="text"
                    value={alarm.label}
                    onChange={(event) => updateAlarm(alarm.id, "label", event.target.value.slice(0, 26))}
                    className="w-full rounded-md border border-transparent bg-transparent px-2 py-1 text-sm text-on-surface outline-none transition-colors focus:border-primary/35"
                  />
                  <input
                    type="time"
                    value={alarm.time}
                    onChange={(event) => updateAlarm(alarm.id, "time", event.target.value)}
                    className="rounded-md border border-outline-variant/35 bg-[#1a1a1a] px-2 py-1 text-sm text-on-surface"
                  />
                  <button
                    type="button"
                    onClick={() => updateAlarm(alarm.id, "enabled", !alarm.enabled)}
                    className={`rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.12em] ${alarm.enabled ? "border-primary/45 bg-primary/15 text-primary" : "border-outline-variant/30 text-on-surface-variant"}`}
                  >
                    {alarm.enabled ? "On" : "Off"}
                  </button>
                  <button
                    type="button"
                    onClick={() => removeAlarm(alarm.id)}
                    className="rounded-full border border-outline-variant/35 px-3 py-1 text-[10px] uppercase tracking-[0.12em] text-on-surface-variant hover:border-primary/35 hover:text-primary"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <button type="button" onClick={addAlarm} className="rounded-full border border-primary/45 bg-primary/15 px-4 py-2 text-xs uppercase tracking-[0.12em] text-primary hover:bg-primary/25">
                Add Alarm
              </button>
              <button type="button" onClick={requestNotificationPermission} className="rounded-full border border-outline-variant/30 px-4 py-2 text-xs uppercase tracking-[0.12em] text-on-surface-variant hover:border-primary/35 hover:text-primary">
                Notifications: {notificationPermission}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <ArchiveSidebar active="dashboard" />

      <div className="relative z-[3] mx-auto flex min-h-[100svh] w-full max-w-7xl gap-6 px-4 pb-28 pt-20 sm:px-6 lg:px-8 lg:pt-6">
        <aside className="hidden w-80 shrink-0 xl:block">
          <div className="sticky top-6 space-y-4">
            <section className="rounded-2xl border border-primary/20 bg-surface-container-low/85 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-label text-[10px] uppercase tracking-[0.18em] text-primary/85">Account</p>
                  <p className="mt-1 text-sm text-on-surface-variant">{user?.primaryEmailAddress?.emailAddress || "Signed in user"}</p>
                </div>
                <UserButton />
              </div>
            </section>

            <section className="rounded-2xl border border-outline-variant/20 bg-surface-container-low/80 p-5">
              <p className="font-label text-[10px] uppercase tracking-[0.18em] text-primary/85">Subscription</p>
              <p className="mt-2 text-sm text-on-surface-variant">{subscriptionLabel}</p>
              {subscriptionManagementUrl ? (
                <a href={subscriptionManagementUrl} target="_blank" rel="noreferrer" className="mt-4 inline-flex w-full items-center justify-center rounded-full border border-primary/40 bg-primary/10 px-4 py-3 text-xs uppercase tracking-[0.14em] text-primary transition-colors hover:bg-primary/20">
                  Manage Subscription
                </a>
              ) : (
                <Link to="/pricing" className="mt-4 inline-flex w-full items-center justify-center rounded-full border border-primary/40 bg-primary/10 px-4 py-3 text-xs uppercase tracking-[0.14em] text-primary transition-colors hover:bg-primary/20">
                  View Plans
                </Link>
              )}
            </section>

            <section className="rounded-2xl border border-outline-variant/20 bg-surface-container-low/80 p-5">
              <p className="font-label text-[10px] uppercase tracking-[0.18em] text-primary/85">Resources</p>
              <div className="mt-3 grid gap-2">
                <Link to="/history" className="rounded-full border border-outline-variant/30 px-4 py-2.5 text-xs uppercase tracking-[0.12em] text-on-surface-variant transition-colors hover:border-primary/35 hover:text-primary">
                  Session History
                </Link>
                <Link to="/privacy-policy" className="rounded-full border border-outline-variant/30 px-4 py-2.5 text-xs uppercase tracking-[0.12em] text-on-surface-variant transition-colors hover:border-primary/35 hover:text-primary">
                  Privacy Policy
                </Link>
                <Link to="/terms-of-service" className="rounded-full border border-outline-variant/30 px-4 py-2.5 text-xs uppercase tracking-[0.12em] text-on-surface-variant transition-colors hover:border-primary/35 hover:text-primary">
                  Terms Of Service
                </Link>
              </div>
            </section>

            <section className="rounded-2xl border border-outline-variant/20 bg-surface-container-low/80 p-5">
              <p className="font-label text-[10px] uppercase tracking-[0.18em] text-primary/85">Alarms</p>
              <p className="mt-2 text-sm text-on-surface-variant">Enabled: {enabledAlarms}</p>
              <p className="mt-1 text-sm text-on-surface-variant">Next: {nextAlarm}</p>
              <button
                type="button"
                onClick={() => setIsAlarmModalOpen(true)}
                className="mt-4 inline-flex w-full items-center justify-center rounded-full border border-primary/40 bg-primary/10 px-4 py-3 text-xs uppercase tracking-[0.14em] text-primary transition-colors hover:bg-primary/20"
              >
                Open Alarm Settings
              </button>
            </section>
          </div>
        </aside>

        <main className="flex-1">
          <section className="rounded-2xl border border-primary/20 bg-surface-container-low/85 p-5 sm:p-6">
            <header className="space-y-2">
              <p className="font-label text-[10px] uppercase tracking-[0.22em] text-primary/85">Dashboard</p>
              <h1 className="font-headline text-3xl italic text-on-surface sm:text-4xl">Pattern Command Center</h1>
              <p className="text-sm leading-relaxed text-on-surface-variant">Use the center button whenever you detect the loop beginning. The fastest interruption wins.</p>
            </header>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <article className="rounded-xl border border-outline-variant/20 bg-surface-container-high/70 p-4">
                <p className="font-label text-[9px] uppercase tracking-[0.18em] text-primary/80">Current Pattern</p>
                <p className="mt-2 text-sm text-on-surface">{currentPattern}</p>
              </article>
              <article className="rounded-xl border border-outline-variant/20 bg-surface-container-high/70 p-4">
                <p className="font-label text-[9px] uppercase tracking-[0.18em] text-primary/80">Total Sessions</p>
                <p className="mt-2 font-headline text-2xl italic text-on-surface">{isLoadingEvents ? "..." : totalSessions}</p>
              </article>
              <article className="rounded-xl border border-outline-variant/20 bg-surface-container-high/70 p-4">
                <p className="font-label text-[9px] uppercase tracking-[0.18em] text-primary/80">Acted Rate</p>
                <p className="mt-2 font-headline text-2xl italic text-on-surface">{isLoadingEvents ? "..." : `${actedRate}%`}</p>
              </article>
              <article className="rounded-xl border border-outline-variant/20 bg-surface-container-high/70 p-4">
                <p className="font-label text-[9px] uppercase tracking-[0.18em] text-primary/80">Last Session</p>
                <p className="mt-2 text-sm text-on-surface">{isLoadingEvents ? "Loading..." : formatRelativeDate(recentSession)}</p>
              </article>
              <article className="rounded-xl border border-outline-variant/20 bg-surface-container-high/70 p-4">
                <p className="font-label text-[9px] uppercase tracking-[0.18em] text-primary/80">Streak</p>
                <p className="mt-2 font-headline text-2xl italic text-on-surface">{isLoadingEvents ? "..." : `${streakDays}d`}</p>
              </article>
              <article className="rounded-xl border border-outline-variant/20 bg-surface-container-high/70 p-4">
                <p className="font-label text-[9px] uppercase tracking-[0.18em] text-primary/80">Delayed</p>
                <p className="mt-2 font-headline text-2xl italic text-on-surface">{isLoadingEvents ? "..." : delayedCount}</p>
              </article>
              <article className="rounded-xl border border-outline-variant/20 bg-surface-container-high/70 p-4">
                <p className="font-label text-[9px] uppercase tracking-[0.18em] text-primary/80">Avoided</p>
                <p className="mt-2 font-headline text-2xl italic text-on-surface">{isLoadingEvents ? "..." : avoidedCount}</p>
              </article>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <article className="rounded-xl border border-primary/25 bg-primary/10 p-5">
                <p className="font-label text-[10px] uppercase tracking-[0.2em] text-primary">How To Use</p>
                <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">When you notice hesitation, overanalysis, or avoidance, tap Interrupt. Complete the flow before the loop hardens.</p>
              </article>
              <article className="rounded-xl border border-outline-variant/20 bg-surface-container-high/70 p-5">
                <p className="font-label text-[10px] uppercase tracking-[0.2em] text-primary/85">Navigation</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Link to="/interrupt" className="rounded-full border border-primary/40 bg-primary/10 px-4 py-2 text-xs uppercase tracking-[0.14em] text-primary transition-colors hover:bg-primary/20">Start Interrupt</Link>
                  <Link to="/history" className="rounded-full border border-outline-variant/30 px-4 py-2 text-xs uppercase tracking-[0.14em] text-on-surface-variant transition-colors hover:border-primary/35 hover:text-primary">Open History</Link>
                  <Link to="/alarms" className="rounded-full border border-outline-variant/30 px-4 py-2 text-xs uppercase tracking-[0.14em] text-on-surface-variant transition-colors hover:border-primary/35 hover:text-primary">Manage Alarms</Link>
                </div>
              </article>
            </div>
          </section>
        </main>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-outline-variant/20 bg-[#111111]/92 px-4 pb-[calc(env(safe-area-inset-bottom)+0.9rem)] pt-3 backdrop-blur-xl">
        <div className="mx-auto grid w-full max-w-3xl grid-cols-3 items-end gap-3">
          <Link to="/history" className="flex min-h-12 items-center justify-center rounded-full border border-outline-variant/25 bg-surface-container-high/70 px-3 text-[10px] uppercase tracking-[0.14em] text-on-surface-variant transition-colors hover:border-primary/35 hover:text-primary">
            History
          </Link>

          <Link
            to="/interrupt"
            aria-label="Interrupt Pattern"
            className="-mt-8 flex h-20 w-full items-center justify-center rounded-full border-2 border-primary/55 bg-primary/15 shadow-[0_14px_38px_rgba(233,193,118,0.23)] transition-all duration-300 hover:border-primary hover:bg-primary/25 active:scale-95"
          >
            <img src="/favicon.svg" alt="" className="h-10 w-10" />
          </Link>

          <Link to="/alarms" className="flex min-h-12 items-center justify-center rounded-full border border-outline-variant/25 bg-surface-container-high/70 px-3 text-[10px] uppercase tracking-[0.14em] text-on-surface-variant transition-colors hover:border-primary/35 hover:text-primary">
            Alarms
          </Link>
        </div>
      </nav>
    </div>
  );
}
