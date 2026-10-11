/**
 * Bengali number and price formatting utilities — lib/format.js
 *
 * Preserves numeric values internally; formats for display only.
 */

const BN_LOCALE = "bn-BD";

/** Bengali digit map for manual conversion fallback */
const EN_TO_BN = {
  0: "০",
  1: "১",
  2: "২",
  3: "৩",
  4: "৪",
  5: "৫",
  6: "৬",
  7: "৭",
  8: "৮",
  9: "৯",
};

/**
 * Convert an English numeric string to Bengali digits.
 * @param {string} str
 * @returns {string}
 */
function toBengaliDigits(str) {
  return String(str).replace(/[0-9]/g, (d) => EN_TO_BN[d] ?? d);
}

/**
 * Format a number as a Bengali price string.
 * e.g. 1500 → "১,৫০০"
 * @param {number} value
 * @returns {string}
 */
export function formatPrice(value) {
  if (typeof value !== "number" || isNaN(value)) return "—";
  try {
    return new Intl.NumberFormat(BN_LOCALE).format(value);
  } catch {
    return toBengaliDigits(value.toLocaleString());
  }
}

/**
 * Format a percentage change for display.
 * e.g. 2.1 → "+২.১%", -2.9 → "−২.৯%"
 * @param {number} pct
 * @param {"up"|"down"|"flat"} dir
 * @returns {string}
 */
export function formatPct(pct, dir) {
  if (dir === "flat" || pct === 0) return "০%";
  try {
    const abs = Math.abs(pct);
    const formatted = new Intl.NumberFormat(BN_LOCALE, {
      maximumFractionDigits: 1,
    }).format(abs);
    return dir === "up" ? `+${formatted}%` : `−${formatted}%`;
  } catch {
    const abs = Math.abs(pct).toFixed(1);
    return dir === "up"
      ? `+${toBengaliDigits(abs)}%`
      : `−${toBengaliDigits(abs)}%`;
  }
}

/**
 * Format a count (product count, etc.) in Bengali numerals.
 * @param {number} n
 * @returns {string}
 */
export function formatCount(n) {
  if (typeof n !== "number") return "০";
  try {
    return new Intl.NumberFormat(BN_LOCALE).format(n);
  } catch {
    return toBengaliDigits(n);
  }
}

/**
 * Unit display map — translate API unit strings to Bengali.
 * @param {string} unit
 * @returns {string}
 */
export function formatUnit(unit) {
  const map = {
    kg: "কেজি",
    litre: "লিটার",
    dozen: "ডজন",
    piece: "পিস",
    gram: "গ্রাম",
  };
  return map[unit] ?? unit;
}

/**
 * Format the current date in Bengali locale for display in Bangladesh timezone.
 * @returns {string}  e.g. "রবিবার, ১২ অক্টোবর ২০২৫"
 */
export function formatBengaliDate() {
  try {
    return new Intl.DateTimeFormat("bn-BD", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "Asia/Dhaka",
    }).format(new Date());
  } catch {
    return new Date().toLocaleDateString("bn-BD", {
      timeZone: "Asia/Dhaka",
    });
  }
}
