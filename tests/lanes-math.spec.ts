import { describe, expect, it } from 'vitest';
import {
  formatBeats,
  formatClock,
  resolveClipDrag,
  rulerTicks,
  snapTime,
} from '../src/components/TimelineLanes/lanes-math';

describe('snapTime', () => {
  it('rounds to the nearest multiple of the snap', () => {
    expect(snapTime(1.13, 0.25)).toBe(1.25);
    expect(snapTime(1.12, 0.25)).toBe(1);
  });

  it('is a no-op without a positive snap', () => {
    expect(snapTime(1.13)).toBe(1.13);
    expect(snapTime(1.13, 0)).toBe(1.13);
  });
});

describe('resolveClipDrag', () => {
  const origin = { start: 2, length: 4 };

  it('moves a clip and keeps it inside the timeline', () => {
    expect(resolveClipDrag({ mode: 'move', delta: 1.1, origin, length: 16, snap: 0.5 })).toEqual({
      start: 3,
      length: 4,
    });
    expect(resolveClipDrag({ mode: 'move', delta: -10, origin, length: 16 })).toEqual({
      start: 0,
      length: 4,
    });
    expect(resolveClipDrag({ mode: 'move', delta: 100, origin, length: 16 })).toEqual({
      start: 12,
      length: 4,
    });
  });

  it('trims the end without going under the minimum length', () => {
    expect(
      resolveClipDrag({ mode: 'end', delta: -3.9, origin, length: 16, snap: 0.5, minLength: 0.5 }),
    ).toEqual({ start: 2, length: 0.5 });
    expect(resolveClipDrag({ mode: 'end', delta: 2, origin, length: 16 })).toEqual({
      start: 2,
      length: 6,
    });
  });

  it('trims the start and keeps the far edge fixed', () => {
    expect(resolveClipDrag({ mode: 'start', delta: 1, origin, length: 16 })).toEqual({
      start: 3,
      length: 3,
    });
    expect(resolveClipDrag({ mode: 'start', delta: -5, origin, length: 16 })).toEqual({
      start: 0,
      length: 6,
    });
  });
});

describe('rulerTicks', () => {
  it('labels whole seconds when there is room and subdivides with minors', () => {
    const ticks = rulerTicks({ scale: { unit: 'seconds', pixelsPerUnit: 80 }, length: 3 });
    const majors = ticks.filter((tick) => tick.major).map((tick) => tick.label);
    expect(majors).toEqual(['0:00', '0:01', '0:02', '0:03']);
    expect(ticks.some((tick) => !tick.major)).toBe(true);
  });

  it('spreads labels out when zoomed far out', () => {
    const ticks = rulerTicks({ scale: { unit: 'seconds', pixelsPerUnit: 4 }, length: 120 });
    const majors = ticks.filter((tick) => tick.major).map((tick) => tick.time);
    expect(majors[1]! - majors[0]!).toBeGreaterThanOrEqual(15);
  });

  it('labels bars on beat rulers', () => {
    const ticks = rulerTicks({
      scale: { unit: 'beats', pixelsPerUnit: 20, beatsPerBar: 4 },
      length: 8,
    });
    const majors = ticks.filter((tick) => tick.major);
    expect(majors.map((tick) => tick.label)).toEqual(['1', '2', '3']);
    expect(majors.map((tick) => tick.time)).toEqual([0, 4, 8]);
  });

  it('returns nothing for an empty timeline', () => {
    expect(rulerTicks({ scale: { unit: 'seconds', pixelsPerUnit: 10 }, length: 0 })).toEqual([]);
  });
});

describe('formatClock', () => {
  it('prints minutes and zero-padded seconds', () => {
    expect(formatClock(0)).toBe('0:00');
    expect(formatClock(65)).toBe('1:05');
    expect(formatClock(65.5)).toBe('1:05.5');
    expect(formatClock(5.25)).toBe('0:05.25');
  });
});

describe('formatBeats', () => {
  it('prints 1-based bar.beat positions', () => {
    expect(formatBeats(0, 4)).toBe('1.1');
    expect(formatBeats(4, 4)).toBe('2.1');
    expect(formatBeats(5.5, 4)).toBe('2.2.50');
    expect(formatBeats(2, 3)).toBe('1.3');
  });
});
