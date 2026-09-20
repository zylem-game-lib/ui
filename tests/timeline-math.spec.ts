import { describe, expect, it } from 'vitest';
import {
  formatSeconds,
  intervalTicks,
  markerPercent,
} from '../src/components/TimelineTrack/timeline-math';

describe('markerPercent', () => {
  it('maps the range onto 0–100', () => {
    expect(markerPercent(0, 0, 10)).toBe(0);
    expect(markerPercent(5, 0, 10)).toBe(50);
    expect(markerPercent(10, 0, 10)).toBe(100);
    expect(markerPercent(7.5, 5, 10)).toBe(50);
  });

  it('clamps values outside the range', () => {
    expect(markerPercent(-1, 0, 10)).toBe(0);
    expect(markerPercent(11, 0, 10)).toBe(100);
  });

  it('pins a degenerate or non-finite input to 0', () => {
    expect(markerPercent(3, 5, 5)).toBe(0);
    expect(markerPercent(Number.NaN, 0, 10)).toBe(0);
  });
});

describe('intervalTicks', () => {
  it('yields one tick per interior boundary', () => {
    expect(intervalTicks(4, 0, 10)).toEqual([2.5, 5, 7.5]);
    expect(intervalTicks(2, 0, 10)).toEqual([5]);
  });

  it('returns nothing for fewer than two intervals or an empty range', () => {
    expect(intervalTicks(1, 0, 10)).toEqual([]);
    expect(intervalTicks(4, 10, 10)).toEqual([]);
  });
});

describe('formatSeconds', () => {
  it('prints whole seconds bare', () => {
    expect(formatSeconds(10)).toBe('10s');
    expect(formatSeconds(0)).toBe('0s');
  });

  it('prints fractions to two places without trailing zeros', () => {
    expect(formatSeconds(5.62)).toBe('5.62s');
    expect(formatSeconds(2.5)).toBe('2.5s');
    expect(formatSeconds(1.999)).toBe('2s');
  });

  it('falls back to 0s for non-finite input', () => {
    expect(formatSeconds(Number.NaN)).toBe('0s');
  });
});
