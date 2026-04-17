import { useState, useEffect } from "react";

export default function FirstTimeExperienceModal({
  isOpen,
  alarms,
  onAlarmsChange,
  onComplete,
  notificationPermission,
  onRequestNotificationPermission,
}) {
  const [phase, setPhase] = useState("explain"); // explain | alarms | hidden
  const [tempAlarms, setTempAlarms] = useState(alarms);
  const [requestingNotification, setRequestingNotification] = useState(false);

  useEffect(() => {
    setTempAlarms(alarms);
  }, [alarms]);

  if (!isOpen) {
    return null;
  }

  async function handleRequestNotification() {
    setRequestingNotification(true);
    await onRequestNotificationPermission();
    setRequestingNotification(false);
  }

  function handleCompleteAlarms() {
    onAlarmsChange(tempAlarms);
    onComplete();
  }

  function updateAlarmTime(id, time) {
    setTempAlarms((current) =>
      current.map((alarm) => (alarm.id === id ? { ...alarm, time } : alarm))
    );
  }

  function toggleAlarm(id) {
    setTempAlarms((current) =>
      current.map((alarm) =>
        alarm.id === id ? { ...alarm, enabled: !alarm.enabled } : alarm
      )
    );
  }

  if (phase === "explain") {
    return (
      <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black">
        <div className="relative mx-4 max-w-md space-y-8 rounded-2xl border border-primary/30 bg-surface-container-low/95 p-8 text-center">
          {/* Decorative blur */}
          <div className="pointer-events-none absolute -top-20 right-[-3rem] h-40 w-40 rounded-full bg-primary/15 blur-3xl" />

          {/* Heading */}
          <div className="relative space-y-3">
            <p className="font-label text-[9px] uppercase tracking-[0.22em] text-primary/90">
              Your First Move
            </p>
            <h1 className="font-headline text-2xl italic text-on-surface sm:text-3xl">
              This button is everything.
            </h1>
          </div>

          {/* Big glowing button preview */}
          <div className="relative space-y-6 py-8">
            {/* Arrow pointing down */}
            <div className="flex justify-center">
              <div className="animate-bounce text-primary">
                <svg
                  className="h-8 w-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </div>
            </div>

            {/* Big glowing button mockup */}
            <div className="relative flex justify-center py-4">
              <div className="relative h-28 w-28">
                {/* Outer glow */}
                <div className="absolute inset-0 animate-pulse rounded-full bg-primary/20 blur-2xl" />
                {/* Inner glow */}
                <div className="absolute inset-2 animate-pulse rounded-full bg-primary/30 blur-lg" />
                {/* Button */}
                <button
                  disabled
                  className="relative flex h-full w-full items-center justify-center rounded-full border-2 border-primary bg-primary/10 font-headline text-xl font-semibold text-primary transition-all hover:bg-primary/20"
                >
                  <img src="/favicon.svg" alt="" className="h-12 w-12" />
                </button>
              </div>
            </div>

            {/* Arrow pointing up */}
            <div className="flex justify-center">
              <div className="animate-bounce text-primary" style={{ animationDelay: "200ms" }}>
                <svg
                  className="h-8 w-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 10l7-7m0 0l7 7m-7-7v18"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Explanation text */}
          <div className="space-y-4 text-left">
            <p className="text-sm leading-relaxed text-on-surface-variant">
              Tap this whenever you notice yourself in a pattern. It walks you through 5 simple steps to interrupt the loop.
            </p>
          </div>

          {/* CTA */}
          <button
            onClick={() => setPhase("alarms")}
            className="w-full border border-primary bg-primary/10 px-6 py-3 font-label text-sm uppercase tracking-[0.16em] text-primary transition-all hover:border-primary/70 hover:bg-primary/20"
          >
            I understand
          </button>
        </div>
      </div>
    );
  }

  if (phase === "alarms") {
    return (
      <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black">
        <div className="relative mx-4 max-w-md space-y-6 rounded-2xl border border-primary/30 bg-surface-container-low/95 p-8">
          <div className="pointer-events-none absolute -top-20 right-[-3rem] h-40 w-40 rounded-full bg-primary/15 blur-3xl" />

          {/* Heading */}
          <div className="relative space-y-2">
            <p className="font-label text-[9px] uppercase tracking-[0.22em] text-primary/90">
              Your Checkpoints
            </p>
            <h2 className="font-headline text-2xl italic text-on-surface">
              When should we check in?
            </h2>
            <p className="text-xs text-on-surface-variant">
              We'll send you a gentle notification at these times. You can adjust them anytime.
            </p>
          </div>

          {/* Alarm list */}
          <div className="space-y-3">
            {tempAlarms.map((alarm) => (
              <div
                key={alarm.id}
                className="flex items-center gap-3 rounded-lg border border-outline-variant/25 bg-surface-container-high/60 p-3"
              >
                <input
                  type="checkbox"
                  checked={alarm.enabled}
                  onChange={() => toggleAlarm(alarm.id)}
                  className="h-4 w-4 cursor-pointer accent-primary"
                />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium text-on-surface">{alarm.label}</p>
                </div>
                <input
                  type="time"
                  value={alarm.time}
                  onChange={(e) => updateAlarmTime(alarm.id, e.target.value)}
                  className="rounded border border-outline-variant/50 bg-surface-container-low px-2 py-1 text-xs text-on-surface"
                />
              </div>
            ))}
          </div>

          {/* Notification permission section */}
          <div className="space-y-3 border border-primary/40 bg-surface-container-high/60 p-4">
            <div className="space-y-1">
              <p className="font-label text-[9px] uppercase tracking-[0.22em] text-primary/90">
                Checkpoint Notifications
              </p>
              <p className="text-xs text-on-surface-variant">
                We'll send gentle reminders at your checkpoint times.
              </p>
            </div>
            {notificationPermission === "granted" ? (
              <div className="flex items-center gap-2 rounded border border-primary/30 bg-primary/5 px-2 py-2">
                <span className="text-primary">✓</span>
                <p className="text-xs text-on-surface-variant">Notifications enabled</p>
              </div>
            ) : notificationPermission === "denied" ? (
              <div className="rounded border border-outline-variant/40 bg-surface-container-low/60 px-2 py-2">
                <p className="text-xs text-on-surface-variant">
                  Notifications are blocked in your browser settings. You can enable them anytime.
                </p>
              </div>
            ) : (
              <button
                onClick={handleRequestNotification}
                disabled={requestingNotification}
                className="w-full border border-primary/50 bg-primary/15 px-3 py-2 font-label text-xs uppercase tracking-[0.14em] text-primary transition-all hover:border-primary hover:bg-primary/25 disabled:opacity-50"
              >
                {requestingNotification ? "Requesting..." : "Enable Notifications"}
              </button>
            )}
          </div>

          {/* CTA */}
          <button
            onClick={handleCompleteAlarms}
            className="w-full border border-primary bg-primary px-6 py-3 font-label text-sm uppercase tracking-[0.16em] text-surface transition-all hover:bg-primary/90"
          >
            Got it, let's start
          </button>
        </div>
      </div>
    );
  }

  return null;
}
