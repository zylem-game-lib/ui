import { describe, expect, it } from 'vitest';
import { arcPath } from '../src/components/Mixer/Knob';
import { formatDb, formatPan } from '../src/components/Mixer/MixerStrip';
import { formatTransportTime } from '../src/components/TransportBar/TransportBar';

describe('formatTransportTime', () => {
  it('reads as a clock in seconds and as bar.beat in beats', () => {
    expect(formatTransportTime(65.5, 'seconds')).toBe('1:05.5');
    expect(formatTransportTime(0, 'seconds')).toBe('0:00');
    expect(formatTransportTime(4, 'beats')).toBe('2.1');
    expect(formatTransportTime(5.5, 'beats')).toBe('2.2.50');
  });

  it('honours the bar length for beat readouts', () => {
    expect(formatTransportTime(3, 'beats', 3)).toBe('2.1');
    expect(formatTransportTime(6, 'beats', 6)).toBe('2.1');
  });
});

describe('formatDb', () => {
  it('prints one decimal with a sign, and -inf at the floor', () => {
    expect(formatDb(0)).toBe('0.0 dB');
    expect(formatDb(3.25)).toBe('+3.3 dB');
    expect(formatDb(-6.04)).toBe('-6.0 dB');
    expect(formatDb(-60)).toBe('-inf');
    expect(formatDb(-80)).toBe('-inf');
    expect(formatDb(Number.NEGATIVE_INFINITY)).toBe('-inf');
    expect(formatDb(-20, -18)).toBe('-inf');
  });
});

describe('formatPan', () => {
  it('names the side with a percentage, and the centre as C', () => {
    expect(formatPan(0)).toBe('C');
    expect(formatPan(0.004)).toBe('C');
    expect(formatPan(-1)).toBe('L100');
    expect(formatPan(0.5)).toBe('R50');
    expect(formatPan(-0.25)).toBe('L25');
  });
});

describe('arcPath', () => {
  const parse = (path: string) => {
    const numbers = path.match(/-?\d+(?:\.\d+)?/g)?.map(Number) ?? [];
    return {
      start: { x: numbers[0], y: numbers[1] },
      radius: numbers[2],
      largeArc: numbers[5],
      end: { x: numbers[7], y: numbers[8] },
    };
  };

  it('starts at 12 o\'clock and sweeps clockwise', () => {
    const arc = parse(arcPath(50, 50, 40, 0, 90));
    expect(arc.start.x).toBeCloseTo(50, 3);
    expect(arc.start.y).toBeCloseTo(10, 3);
    expect(arc.end.x).toBeCloseTo(90, 3);
    expect(arc.end.y).toBeCloseTo(50, 3);
    expect(arc.radius).toBe(40);
    expect(arc.largeArc).toBe(0);
  });

  it('orders reversed angles and flags arcs past a half turn', () => {
    expect(arcPath(50, 50, 40, 90, 0)).toBe(arcPath(50, 50, 40, 0, 90));
    expect(parse(arcPath(50, 50, 40, -135, 135)).largeArc).toBe(1);
    expect(parse(arcPath(50, 50, 40, -135, 0)).largeArc).toBe(0);
  });
});
