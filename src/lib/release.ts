/** Release date of Jjodel 3.0, as a calendar day in UTC. */
export const RELEASE_DATE_ISO = '2026-09-15';

/** Fallback label rendered at build time, used when JavaScript is off. */
export const RELEASE_DATE_LABEL = '15 September 2026';

/**
 * Days from `now` to the release day, comparing UTC calendar days.
 * Negative when the release day has passed.
 */
export function daysToRelease(now: Date, releaseIso: string = RELEASE_DATE_ISO): number {
  const [y, m, d] = releaseIso.split('-').map(Number);
  const release = Date.UTC(y, m - 1, d);
  const today = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  return Math.round((release - today) / 86_400_000);
}

/** Short label for the countdown: "9 days to go", "Tomorrow", "Today", "Out now". */
export function countdownLabel(days: number): string {
  if (days > 1) return `${days} days to go`;
  if (days === 1) return 'Tomorrow';
  if (days === 0) return 'Today';
  return 'Out now';
}
