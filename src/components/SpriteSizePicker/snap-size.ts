export interface SnapOptions {
  min: number;
  max: number;
  step: number;
}

/** Sprite dimensions in source pixels. */
export interface SpriteSize {
  width: number;
  height: number;
}

/** Powers of two from 8 through 256; the default preset row. */
export const SPRITE_SIZE_PRESETS: readonly number[] = [8, 16, 32, 64, 128, 256];

/**
 * Round a dragged dimension to the nearest step and keep it inside the
 * allowed range. Non-finite input (a NaN from an empty field) lands on `min`.
 */
export function snapSize(value: number, options: SnapOptions): number {
  const { min, max, step } = options;
  if (!Number.isFinite(value)) {
    return min;
  }
  const unit = step > 0 ? step : 1;
  const snapped = Math.round(value / unit) * unit;
  return Math.min(max, Math.max(min, snapped));
}
