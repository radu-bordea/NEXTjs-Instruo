// lib/dates.ts
// Date helpers used in pages and forms.

// "2026-11-09" from a Date → for <input type="date" defaultValue=...>
export function toInputDate(date: Date | null | undefined): string {
  return date ? date.toISOString().slice(0, 10) : "";
}

// 09.11.2026 – Romanian format. timeZone UTC: dates are stored at UTC midnight,
// so without it some users would see the day before.
export function formatDate(date: Date | null | undefined): string {
  return date ? date.toLocaleDateString("ro-RO", { timeZone: "UTC" }) : "—";
}

// Status of an expiry date. Used for the medical badge now, and the dashboard on day 12.
export type ExpiryStatus = "none" | "expired" | "soon" | "ok";

export function getExpiryStatus(date: Date | null, today = new Date(), soonDays = 30): ExpiryStatus {
  if (!date) return "none";
  const msPerDay = 24 * 60 * 60 * 1000;
  const daysLeft = Math.floor((date.getTime() - today.getTime()) / msPerDay);
  if (daysLeft < 0) return "expired";
  if (daysLeft <= soonDays) return "soon";
  return "ok";
}