import { clamp, snapTime } from '../TimelineLanes/lanes-math';

export interface PianoRollNote {
  id: string;
  /** MIDI pitch, 0–127. */
  pitch: number;
  /** Beats from the clip start. */
  start: number;
  /** Beats. */
  duration: number;
  /** 0–1; defaults to 0.8 when absent. */
  velocity?: number;
}

const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'] as const;

/** `60` → `C4`. */
export function pitchName(pitch: number): string {
  const index = ((Math.round(pitch) % 12) + 12) % 12;
  return `${NOTE_NAMES[index]}${Math.floor(Math.round(pitch) / 12) - 1}`;
}

export function isBlackKey(pitch: number): boolean {
  const index = ((Math.round(pitch) % 12) + 12) % 12;
  return index === 1 || index === 3 || index === 6 || index === 8 || index === 10;
}

/** Highest pitch is the top row. */
export function pitchToRow(pitch: number, maxPitch: number): number {
  return maxPitch - pitch;
}

export function rowToPitch(row: number, maxPitch: number): number {
  return maxPitch - row;
}

export interface NoteDragOptions {
  mode: 'move' | 'resize';
  /** Pointer travel in beats. */
  deltaBeats: number;
  /** Pointer travel in rows (positive = down = lower pitch). */
  deltaRows: number;
  /** The notes being dragged, as they were when the drag began. */
  origin: readonly PianoRollNote[];
  /** Clip length in beats. */
  length: number;
  minPitch: number;
  maxPitch: number;
  snap?: number;
  minDuration?: number;
}

/**
 * Where a set of notes lands after a drag. Moves shift every note by the same
 * snapped amount, clamped so the group stays inside the clip and the pitch
 * range; resizes change every note's duration by the same snapped amount.
 */
export function resolveNoteDrag(options: NoteDragOptions): PianoRollNote[] {
  const { origin, length, minPitch, maxPitch } = options;
  if (origin.length === 0) return [];
  const snap = options.snap;
  if (options.mode === 'resize') {
    const minDuration = Math.max(options.minDuration ?? snap ?? 0.0625, 0.0001);
    const delta = snapTime(options.deltaBeats, snap);
    return origin.map((note) => ({
      ...note,
      duration: clamp(note.duration + delta, minDuration, Math.max(minDuration, length - note.start)),
    }));
  }
  const first = origin.reduce((min, note) => Math.min(min, note.start), Number.POSITIVE_INFINITY);
  const last = origin.reduce((max, note) => Math.max(max, note.start + note.duration), 0);
  const lowest = origin.reduce((min, note) => Math.min(min, note.pitch), Number.POSITIVE_INFINITY);
  const highest = origin.reduce((max, note) => Math.max(max, note.pitch), Number.NEGATIVE_INFINITY);
  const rawShift = snapTime(first + options.deltaBeats, snap) - first;
  const shift = clamp(rawShift, -first, Math.max(-first, length - last));
  const rawTranspose = -Math.round(options.deltaRows);
  const transpose = clamp(rawTranspose, minPitch - lowest, maxPitch - highest);
  return origin.map((note) => ({
    ...note,
    start: note.start + shift,
    pitch: note.pitch + transpose,
  }));
}

/** Snaps a beat position down to the grid so a new note starts on the cell under the pointer. */
export function cellStart(beats: number, snap: number | undefined, length: number): number {
  const grid = snap && snap > 0 ? snap : 0.25;
  return clamp(Math.floor(beats / grid + 1e-9) * grid, 0, Math.max(0, length - grid));
}
