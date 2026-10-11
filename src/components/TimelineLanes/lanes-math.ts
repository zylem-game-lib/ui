/**
 * Pure helpers behind `TimelineLanes`: unit ↔ pixel mapping, snapping, and
 * ruler tick generation for seconds- and beats-based timelines.
 */

export type TimeUnit = 'seconds' | 'beats';

export interface TimeScale {
  unit: TimeUnit;
  /** Horizontal pixels per unit (per second or per beat). */
  pixelsPerUnit: number;
  /** Beats per bar; only read for `beats`. Defaults to 4. */
  beatsPerBar?: number;
}

export interface RulerTick {
  time: number;
  major: boolean;
  /** Present on major ticks. */
  label?: string;
}

/** Rounds `t` to the nearest multiple of `snap`; a missing or non-positive snap is a no-op. */
export function snapTime(t: number, snap?: number): number {
  if (!snap || snap <= 0 || !Number.isFinite(t)) return t;
  return Math.round(t / snap) * snap;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export interface SliderKeyOptions {
  value: number;
  min: number;
  max: number;
  step: number;
  /** Shift + arrow; defaults to ten steps. */
  bigStep?: number;
}

/**
 * Where a slider key moves `value`: arrows step (Shift for a big step), Home
 * and End jump to the ends. Null for any other key, which the slider should
 * let through.
 */
export function sliderKeyValue(
  event: Pick<KeyboardEvent, 'key' | 'shiftKey'>,
  options: SliderKeyOptions,
): number | null {
  const step = event.shiftKey ? (options.bigStep ?? options.step * 10) : options.step;
  switch (event.key) {
    case 'ArrowRight':
    case 'ArrowUp':
      return clamp(options.value + step, options.min, options.max);
    case 'ArrowLeft':
    case 'ArrowDown':
      return clamp(options.value - step, options.min, options.max);
    case 'Home':
      return options.min;
    case 'End':
      return options.max;
    default:
      return null;
  }
}

/** Seconds as spoken text for `aria-valuetext`: `1.5 seconds`. */
export function describeSeconds(seconds: number): string {
  const rounded = Math.round(Math.max(0, seconds) * 100) / 100;
  return `${rounded} ${rounded === 1 ? 'second' : 'seconds'}`;
}

/** A time on `scale` as spoken text: `1.5 seconds`, or `bar 2, beat 1` (both 1-based). */
export function describeTime(time: number, scale: Pick<TimeScale, 'unit' | 'beatsPerBar'>): string {
  if (scale.unit === 'seconds') return describeSeconds(time);
  const bpb = Math.max(1, scale.beatsPerBar ?? 4);
  const total = Math.round(Math.max(0, time) * 100) / 100;
  const bar = Math.floor(total / bpb) + 1;
  const beat = Math.round((total - (bar - 1) * bpb + 1) * 100) / 100;
  return `bar ${bar}, beat ${beat}`;
}

export interface ClipBounds {
  start: number;
  length: number;
}

export interface ResolveClipDragOptions {
  mode: 'move' | 'start' | 'end';
  /** Pointer travel in units since the drag began. */
  delta: number;
  origin: ClipBounds;
  /** Timeline length in units. */
  length: number;
  snap?: number;
  minLength?: number;
}

/**
 * Where a clip lands after a drag. Moves keep the length and stay inside the
 * timeline; edge drags keep the far edge fixed and respect `minLength`.
 */
export function resolveClipDrag(options: ResolveClipDragOptions): ClipBounds {
  const { mode, delta, origin, length } = options;
  const minLength = Math.max(options.minLength ?? 0, 0);
  const originEnd = origin.start + origin.length;
  if (mode === 'move') {
    const maxStart = Math.max(0, length - origin.length);
    const start = clamp(snapTime(origin.start + delta, options.snap), 0, maxStart);
    return { start, length: origin.length };
  }
  if (mode === 'end') {
    const end = clamp(
      snapTime(originEnd + delta, options.snap),
      origin.start + minLength,
      Math.max(length, origin.start + minLength),
    );
    return { start: origin.start, length: end - origin.start };
  }
  const start = clamp(
    snapTime(origin.start + delta, options.snap),
    0,
    Math.max(0, originEnd - minLength),
  );
  return { start, length: originEnd - start };
}

const SECOND_STEPS = [0.1, 0.25, 0.5, 1, 2, 5, 10, 15, 30, 60, 120, 300, 600];

function beatSteps(beatsPerBar: number): number[] {
  const bar = Math.max(1, beatsPerBar);
  return [0.25, 0.5, 1, bar, bar * 2, bar * 4, bar * 8, bar * 16, bar * 32, bar * 64];
}

/** Picks the smallest step whose pixel width clears `minSpacing`. */
function pickStep(steps: readonly number[], pixelsPerUnit: number, minSpacing: number): number {
  for (const step of steps) {
    if (step * pixelsPerUnit >= minSpacing) return step;
  }
  return steps[steps.length - 1] ?? 1;
}

/** `65.5` → `1:05.5`; whole minutes drop the fraction. */
export function formatClock(seconds: number): string {
  if (!Number.isFinite(seconds)) return '0:00';
  const total = Math.max(0, seconds);
  const minutes = Math.floor(total / 60);
  const rest = total - minutes * 60;
  const rounded = Math.round(rest * 100) / 100;
  const whole = Math.floor(rounded);
  const fraction = rounded - whole;
  const secondsText = `${whole < 10 ? '0' : ''}${whole}`;
  if (fraction < 0.005) return `${minutes}:${secondsText}`;
  return `${minutes}:${secondsText}${fraction.toFixed(2).slice(1).replace(/0+$/, '')}`;
}

/**
 * Beats as a `bar.beat` position, both 1-based: beat 4 in 4/4 is `2.1`. A
 * fractional beat adds a third part in sixteenths-of-a-beat hundredths
 * (`1.2.50` is halfway through the second beat).
 */
export function formatBeats(beats: number, beatsPerBar = 4): string {
  if (!Number.isFinite(beats)) return '1.1';
  const bpb = Math.max(1, beatsPerBar);
  const total = Math.max(0, beats);
  const bar = Math.floor(total / bpb) + 1;
  const beatInBar = total - (bar - 1) * bpb;
  const beat = Math.floor(beatInBar + 1e-9) + 1;
  const fraction = beatInBar - (beat - 1);
  if (fraction < 0.005) return `${bar}.${beat}`;
  return `${bar}.${beat}.${Math.round(fraction * 100)
    .toString()
    .padStart(2, '0')}`;
}

export interface RulerTickOptions {
  scale: TimeScale;
  /** Timeline length in units. */
  length: number;
  /** Minimum pixels between labelled ticks. */
  minLabelSpacing?: number;
  /** Minimum pixels between minor ticks. */
  minMinorSpacing?: number;
}

/**
 * Labelled major ticks and unlabelled minor ticks covering `0..length`. The
 * major step grows with zoom-out so labels never crowd; minors subdivide it
 * when there is room. Beat rulers label bars (`1`, `2`, …) once the major
 * step reaches a bar, and `bar.beat` before that.
 */
export function rulerTicks(options: RulerTickOptions): RulerTick[] {
  const { scale, length } = options;
  const ppu = scale.pixelsPerUnit;
  if (!Number.isFinite(length) || length <= 0 || !Number.isFinite(ppu) || ppu <= 0) return [];
  const minLabel = options.minLabelSpacing ?? 64;
  const minMinor = options.minMinorSpacing ?? 10;
  const bpb = scale.beatsPerBar ?? 4;
  const steps = scale.unit === 'beats' ? beatSteps(bpb) : SECOND_STEPS;
  const major = pickStep(steps, ppu, minLabel);
  const minorCandidates = steps.filter((step) => step < major && Number.isInteger(major / step));
  const minor = minorCandidates.reverse().find((step) => step * ppu >= minMinor);

  const ticks: RulerTick[] = [];
  const step = minor ?? major;
  const count = Math.floor(length / step + 1e-9);
  for (let i = 0; i <= count; i += 1) {
    const time = Math.round(i * step * 1e6) / 1e6;
    if (time > length + 1e-9) break;
    const isMajor = Math.abs(time / major - Math.round(time / major)) < 1e-6;
    ticks.push({
      time,
      major: isMajor,
      label: isMajor ? tickLabel(time, scale, major) : undefined,
    });
  }
  return ticks;
}

function tickLabel(time: number, scale: TimeScale, major: number): string {
  if (scale.unit === 'seconds') return formatClock(time);
  const bpb = scale.beatsPerBar ?? 4;
  if (major >= bpb) return `${Math.floor(time / bpb + 1e-9) + 1}`;
  return formatBeats(time, bpb);
}

/** Times of the ticks with a label, handy for `TimelineTrack`'s `ticks`. */
export function majorTickTimes(options: RulerTickOptions): number[] {
  return rulerTicks(options)
    .filter((tick) => tick.major)
    .map((tick) => tick.time);
}
