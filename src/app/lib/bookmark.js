export const LAST_READ_KEY = "quran-last-read";
export const AUTO_PLAY_AYAT_KEY = "quran-auto-play-ayat";

export function saveLastRead({ suratNomor, suratNamaLatin, nomorAyat }) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(
      LAST_READ_KEY,
      JSON.stringify({ suratNomor, suratNamaLatin, nomorAyat })
    );
  } catch (e) {
    console.error("Failed to save last read:", e);
  }
}

export function getLastRead() {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(LAST_READ_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (
      parsed?.suratNomor &&
      parsed?.suratNamaLatin &&
      parsed?.nomorAyat
    ) {
      return parsed;
    }
    return null;
  } catch {
    return null;
  }
}

export function removeLastRead() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(LAST_READ_KEY);
}

export function getAutoPlayAyat() {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(AUTO_PLAY_AYAT_KEY) === "true";
}

export function setAutoPlayAyat(enabled) {
  if (typeof window === "undefined") return;
  localStorage.setItem(AUTO_PLAY_AYAT_KEY, enabled ? "true" : "false");
}
