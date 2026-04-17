const PROFILE_STORAGE_PREFIX = "philosift_profile_v1";

function getStorageKey(userId) {
  return `${PROFILE_STORAGE_PREFIX}:${userId || "anonymous"}`;
}

export function readStoredProfile(userId) {
  if (!userId) {
    return null;
  }

  try {
    const raw = localStorage.getItem(getStorageKey(userId));
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") {
      return null;
    }

    return {
      firstName: parsed.firstName || "",
      lastName: parsed.lastName || "",
      birthDate: parsed.birthDate || "",
    };
  } catch {
    return null;
  }
}

export function writeStoredProfile(userId, profile) {
  if (!userId) {
    return;
  }

  const payload = {
    firstName: (profile?.firstName || "").trim(),
    lastName: (profile?.lastName || "").trim(),
    birthDate: profile?.birthDate || "",
  };

  try {
    localStorage.setItem(getStorageKey(userId), JSON.stringify(payload));
  } catch {
    // Ignore localStorage failures in restrictive browser modes.
  }
}

export function hasCompletedProfile(userId) {
  const profile = readStoredProfile(userId);
  return Boolean(profile?.firstName && profile?.lastName && profile?.birthDate);
}
