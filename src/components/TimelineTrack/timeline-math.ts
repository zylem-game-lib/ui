/**
 * Position of `t` along a track, as a 0–100 percentage clamped to the
 * track's range. A degenerate range (max <= min) pins everything to 0.
 */
export function markerPercent(t: number, min: number, max: number): number {
  if (!Number.isFinite(t) || max <= min) {
    return 0;
  }
  const ratio = (t - min) / (max - min);
  return Math.min(100, Math.max(0, ratio * 100));
}

/**
 * Evenly spaced tick times between `min` and `max` (exclusive of both ends),
 * one per interval boundary: `intervals = 4` yields three ticks.
 */
export function intervalTicks(intervals: number, min: number, max: number): number[] {
  if (!Number.isFinite(intervals) || intervals < 2 || max <= min) {
    return [];
  }
  const count = Math.floor(intervals);
  const span = max - min;
  const ticks: number[] = [];
  for (let i = 1; i < count; i += 1) {
    ticks.push(min + (span * i) / count);
  }
  return ticks;
}

/**
 * Seconds as a short readout: whole seconds bare (`10s`), fractions to two
 * places with trailing zeros trimmed (`5.62s`, `2.5s`).
 */
export function formatSeconds(seconds: number): string {
  if (!Number.isFinite(seconds)) {
    return '0s';
  }
  const rounded = Math.round(seconds * 100) / 100;
  if (Number.isInteger(rounded)) {
    return `${rounded}s`;
  }
  return `${rounded.toFixed(2).replace(/0+$/, '')}s`;
}
