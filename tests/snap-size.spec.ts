import { describe, expect, it } from 'vitest';
import {
  SPRITE_SIZE_PRESETS,
  snapSize,
} from '../src/components/SpriteSizePicker/snap-size';

const range = { min: 2, max: 256, step: 2 };

describe('snapSize', () => {
  it('rounds to the nearest step', () => {
    expect(snapSize(33, range)).toBe(34);
    expect(snapSize(32.9, range)).toBe(32);
    expect(snapSize(31, range)).toBe(32);
  });

  it('clamps into the allowed range', () => {
    expect(snapSize(-40, range)).toBe(2);
    expect(snapSize(0, range)).toBe(2);
    expect(snapSize(1000, range)).toBe(256);
  });

  it('lands on min for a non-finite value', () => {
    expect(snapSize(Number.NaN, range)).toBe(2);
    expect(snapSize(Number.POSITIVE_INFINITY, range)).toBe(2);
  });

  it('treats a non-positive step as 1', () => {
    expect(snapSize(33, { min: 1, max: 64, step: 0 })).toBe(33);
  });

  it('keeps every preset on the grid', () => {
    for (const preset of SPRITE_SIZE_PRESETS) {
      expect(snapSize(preset, range)).toBe(preset);
    }
    expect(SPRITE_SIZE_PRESETS).toEqual([8, 16, 32, 64, 128, 256]);
  });
});
