import { describe, expect, it } from 'vitest';
import {
  cellStart,
  isBlackKey,
  pitchName,
  pitchToRow,
  resolveNoteDrag,
} from '../src/components/PianoRoll/piano-roll-math';
import { computePeaks } from '../src/components/Waveform/peaks';

describe('pitch helpers', () => {
  it('names pitches with their octave', () => {
    expect(pitchName(60)).toBe('C4');
    expect(pitchName(61)).toBe('C#4');
    expect(pitchName(69)).toBe('A4');
    expect(pitchName(0)).toBe('C-1');
  });

  it('knows which keys are black', () => {
    expect(isBlackKey(60)).toBe(false);
    expect(isBlackKey(61)).toBe(true);
    expect(isBlackKey(70)).toBe(true);
  });

  it('puts the highest pitch on the top row', () => {
    expect(pitchToRow(96, 96)).toBe(0);
    expect(pitchToRow(36, 96)).toBe(60);
  });
});

describe('resolveNoteDrag', () => {
  const notes = [
    { id: 'a', pitch: 60, start: 1, duration: 1 },
    { id: 'b', pitch: 64, start: 2, duration: 0.5 },
  ];
  const range = { length: 8, minPitch: 36, maxPitch: 96, snap: 0.25 };

  it('moves the group together, snapped, and transposes by rows', () => {
    const moved = resolveNoteDrag({ mode: 'move', deltaBeats: 0.6, deltaRows: -2, origin: notes, ...range });
    expect(moved.map((note) => note.start)).toEqual([1.5, 2.5]);
    expect(moved.map((note) => note.pitch)).toEqual([62, 66]);
  });

  it('clamps the group to the clip and the pitch range', () => {
    const moved = resolveNoteDrag({ mode: 'move', deltaBeats: 100, deltaRows: 100, origin: notes, ...range });
    expect(moved.map((note) => note.start)).toEqual([6.5, 7.5]);
    expect(moved.map((note) => note.pitch)).toEqual([36, 40]);
  });

  it('resizes every note by the same snapped amount, never below the minimum', () => {
    const resized = resolveNoteDrag({ mode: 'resize', deltaBeats: -0.9, deltaRows: 0, origin: notes, ...range });
    expect(resized.map((note) => note.duration)).toEqual([0.25, 0.25]);
  });
});

describe('cellStart', () => {
  it('floors to the grid and keeps a cell inside the clip', () => {
    expect(cellStart(1.9, 0.5, 8)).toBe(1.5);
    expect(cellStart(7.9, 0.5, 8)).toBe(7.5);
    expect(cellStart(-1, 0.5, 8)).toBe(0);
  });
});

describe('computePeaks', () => {
  it('takes the loudest sample per bin and normalises to the loudest bin', () => {
    const samples = Float32Array.from([0, 0.1, 0.5, -0.2, 0.25, 0, -1, 0.3]);
    const peaks = Array.from(computePeaks(samples, 4)).map((value) => Math.round(value * 100) / 100);
    expect(peaks).toEqual([0.1, 0.5, 0.25, 1]);
  });

  it('mixes channels by max and handles silence', () => {
    const left = Float32Array.from([0.2, 0, 0, 0]);
    const right = Float32Array.from([0, 0, 0.4, 0]);
    expect(Array.from(computePeaks({ channels: [left, right] }, 2))).toEqual([0.5, 1]);
    expect(Array.from(computePeaks(new Float32Array(8), 2))).toEqual([0, 0]);
  });
});
