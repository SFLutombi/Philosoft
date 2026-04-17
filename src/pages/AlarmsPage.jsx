import { useEffect, useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import ArchiveSidebar from "../components/ArchiveSidebar";
import { loadStoredResult } from "../data/resultFlow";

const ALARMS_STORAGE_KEY = "philosift_alarm_schedule_v1";

const DEFAULT_ALARMS = [
  { id: "morning", label: "Morning Checkpoint", time: "07:30", enabled: true },
  { id: "lunch", label: "Lunch Checkpoint", time: "12:30", enabled: true },
  { id: "evening", label: "Evening Checkpoint", time: "20:30", enabled: true },
];

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

export default function AlarmsPage() {
  const storedResult = loadStoredResult();
  const [alarms, setAlarms] = useState(() => readAlarms());
  const [notificationPermission, setNotificationPermission] = useState(typeof Notification === "undefined" ? "unsupported" : Notification.permission);
  const dragAlarmIdRef = useRef("");

  useEffect(() => {
    writeAlarms(alarms);
  }, [alarms]);

  if (!storedResult) {
    return <Navigate to="/quiz" replace />;
  }

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

  return (
    <div className="min-h-screen bg-background text-on-surface">
      <div className="grain-overlay fixed inset-0" />
      <ArchiveSidebar active="alarms" />

      <main className="min-h-screen bg-surface px-4 pt-20 pb-10 sm:px-6 lg:ml-64 lg:px-12 lg:pt-12 lg:pb-12">
        <section className="mx-auto w-full max-w-4xl space-y-6">
          <header className="space-y-2">
            <p className="font-label text-[10px] uppercase tracking-[0.2em] text-primary/90">Alarms</p>
            <h1 className="font-headline text-3xl sm:text-4xl italic">Checkpoint reminders</h1>
            <p className="text-sm text-on-surface-variant">Configure your daily interruption anchors. Drag alarms to reorder your rhythm.</p>
          </header>

          <section className="border border-primary/30 bg-surface-container-low p-5 sm:p-6">
            <div className="space-y-2">
              <p className="font-label text-[9px] uppercase tracking-[0.22em] text-primary/90">Notification Permission</p>
              <h2 className="font-headline text-2xl italic text-on-surface">Allow checkpoint reminders.</h2>
              <p className="text-sm text-on-surface-variant">
                Browser notifications let PhiloSift check in with you at the times you set. Without them, the alarms stay silent.
              </p>
            </div>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
              {notificationPermission === "granted" ? (
                <div className="rounded border border-primary/30 bg-primary/5 px-4 py-3 text-sm text-primary">
                  Notifications are enabled.
                </div>
              ) : notificationPermission === "denied" ? (
                <div className="rounded border border-outline-variant/35 bg-surface-container-high/60 px-4 py-3 text-sm text-on-surface-variant">
                  Notifications are blocked in your browser. Open browser settings to allow them for this site.
                </div>
              ) : (
                <button
                  type="button"
                  onClick={requestNotificationPermission}
                  className="rounded-full border border-primary/45 bg-primary px-5 py-3 text-xs uppercase tracking-[0.14em] text-surface transition-colors hover:bg-primary/90"
                >
                  Allow Notifications
                </button>
              )}

              {notificationPermission !== "granted" ? (
                <button
                  type="button"
                  onClick={requestNotificationPermission}
                  className="rounded-full border border-outline-variant/30 px-5 py-3 text-xs uppercase tracking-[0.14em] text-on-surface-variant hover:border-primary/35 hover:text-primary"
                >
                  {notificationPermission === "denied" ? "Try Again" : "Request Permission"}
                </button>
              ) : null}
            </div>
          </section>

          <div className="rounded-lg border border-outline-variant/20 bg-surface-container-low p-5 sm:p-6">
            <div className="space-y-3">
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
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
