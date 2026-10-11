import { createMemo, createSignal, For, Index, Show } from 'solid-js';
import { clamp } from '../TimelineLanes/lanes-math';
import {
  cellStart,
  isBlackKey,
  type PianoRollNote,
  pitchName,
  pitchToRow,
  resolveNoteDrag,
  rowToPitch,
} from './piano-roll-math';

export type { PianoRollNote } from './piano-roll-math';

const DEFAULT_PPB = 36;
const DEFAULT_ROW = 14;
const KEYS_WIDTH = 56;
const END_PADDING = 24;
const VELOCITY_HEIGHT = 48;

export interface PianoRollProps {
  notes: readonly PianoRollNote[];
  /** Clip length in beats. */
  length: number;
  beatsPerBar?: number;
  pixelsPerBeat?: number;
  rowHeight?: number;
  /** Lowest visible pitch (default C2 = 36). */
  minPitch?: number;
  /** Highest visible pitch (default C7 = 96). */
  maxPitch?: number;
  /** Grid snap in beats (default a sixteenth). */
  snap?: number;
  /** Duration of notes added by double-click, in beats (default one beat). */
  newNoteDuration?: number;
  playhead?: number;
  selectedIds?: readonly string[];
  onSelect?: (ids: string[]) => void;
  /** Double-click on an empty cell. */
  onAddNote?: (note: { pitch: number; start: number; duration: number }) => void;
  /** Fires continuously while notes are dragged, with the changed notes. */
  onChangeNotes?: (notes: PianoRollNote[]) => void;
  /** Fires once when a drag or a keyboard edit ends, with the changed notes. */
  onCommitNotes?: (notes: PianoRollNote[]) => void;
  /** Delete / Backspace with a selection. */
  onDeleteNotes?: (ids: string[]) => void;
  /** Clicking a key on the left, for auditioning. */
  onPreviewPitch?: (pitch: number) => void;
  /** Show the velocity lane under the grid. */
  showVelocity?: boolean;
  disabled?: boolean;
  class?: string;
}

/**
 * Piano roll: pitch rows against a beat grid. Double-click adds a note, drag
 * moves (pitch and time), the right edge trims, Delete removes, arrows nudge
 * and transpose, and the optional velocity lane edits loudness per note.
 */
export function PianoRoll(props: PianoRollProps) {
  const ppb = () => props.pixelsPerBeat ?? DEFAULT_PPB;
  const rowHeight = () => props.rowHeight ?? DEFAULT_ROW;
  const minPitch = () => props.minPitch ?? 36;
  const maxPitch = () => props.maxPitch ?? 96;
  const snap = () => props.snap ?? 0.25;
  const bpb = () => props.beatsPerBar ?? 4;
  const rows = () => Math.max(1, maxPitch() - minPitch() + 1);
  const gridWidth = () => props.length * ppb() + END_PADDING;
  const gridHeight = () => rows() * rowHeight();
  const selected = createMemo(() => new Set(props.selectedIds ?? []));
  const [dragging, setDragging] = createSignal(false);
  let grid: HTMLDivElement | undefined;
  let root: HTMLDivElement | undefined;

  const pointerCell = (event: PointerEvent | MouseEvent) => {
    if (!grid) return null;
    const rect = grid.getBoundingClientRect();
    const beats = (event.clientX - rect.left) / ppb();
    const row = Math.floor((event.clientY - rect.top) / rowHeight());
    return {
      start: cellStart(beats, snap(), props.length),
      pitch: clamp(rowToPitch(row, maxPitch()), minPitch(), maxPitch()),
    };
  };

  const select = (ids: string[]) => props.onSelect?.(ids);

  const beginNoteDrag = (note: PianoRollNote, mode: 'move' | 'resize') => (event: PointerEvent) => {
    if (event.button !== 0) return;
    event.stopPropagation();
    root?.focus({ preventScroll: true });
    let ids: string[];
    if (event.shiftKey) {
      ids = selected().has(note.id)
        ? [...selected()].filter((id) => id !== note.id)
        : [...selected(), note.id];
    } else {
      ids = selected().has(note.id) ? [...selected()] : [note.id];
    }
    select(ids);
    if (props.disabled) return;
    event.preventDefault();
    const target = event.currentTarget as HTMLElement;
    target.setPointerCapture?.(event.pointerId);
    const idSet = new Set(ids);
    const origin = props.notes.filter((candidate) => idSet.has(candidate.id));
    const originX = event.clientX;
    const originY = event.clientY;
    let last: PianoRollNote[] = origin;
    let moved = false;
    setDragging(true);
    const move = (moveEvent: PointerEvent) => {
      moved = true;
      last = resolveNoteDrag({
        mode,
        deltaBeats: (moveEvent.clientX - originX) / ppb(),
        deltaRows: (moveEvent.clientY - originY) / rowHeight(),
        origin,
        length: props.length,
        minPitch: minPitch(),
        maxPitch: maxPitch(),
        snap: snap(),
      });
      props.onChangeNotes?.(last);
    };
    const stop = () => {
      target.removeEventListener('pointermove', move);
      target.removeEventListener('pointerup', stop);
      target.removeEventListener('pointercancel', stop);
      target.releasePointerCapture?.(event.pointerId);
      setDragging(false);
      if (moved) props.onCommitNotes?.(last);
    };
    target.addEventListener('pointermove', move);
    target.addEventListener('pointerup', stop);
    target.addEventListener('pointercancel', stop);
  };

  const beginVelocityDrag = (note: PianoRollNote) => (event: PointerEvent) => {
    if (event.button !== 0 || props.disabled) return;
    event.preventDefault();
    event.stopPropagation();
    if (!selected().has(note.id)) select([note.id]);
    const target = event.currentTarget as HTMLElement;
    const lane = target.parentElement!;
    target.setPointerCapture?.(event.pointerId);
    let last = note;
    const apply = (moveEvent: PointerEvent) => {
      const rect = lane.getBoundingClientRect();
      const velocity = clamp(1 - (moveEvent.clientY - rect.top) / rect.height, 0.05, 1);
      last = { ...note, velocity: Math.round(velocity * 100) / 100 };
      props.onChangeNotes?.([last]);
    };
    apply(event);
    const stop = () => {
      target.removeEventListener('pointermove', apply);
      target.removeEventListener('pointerup', stop);
      target.removeEventListener('pointercancel', stop);
      target.releasePointerCapture?.(event.pointerId);
      props.onCommitNotes?.([last]);
    };
    target.addEventListener('pointermove', apply);
    target.addEventListener('pointerup', stop);
    target.addEventListener('pointercancel', stop);
  };

  const handleGridDoubleClick = (event: MouseEvent) => {
    if (props.disabled || event.target !== grid) return;
    const cell = pointerCell(event);
    if (!cell) return;
    const duration = Math.min(props.newNoteDuration ?? 1, Math.max(snap(), props.length - cell.start));
    props.onAddNote?.({ pitch: cell.pitch, start: cell.start, duration });
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (props.disabled) return;
    const ids = [...selected()];
    if (event.key === 'Escape') {
      select([]);
      return;
    }
    if (ids.length === 0) return;
    if (event.key === 'Delete' || event.key === 'Backspace') {
      event.preventDefault();
      props.onDeleteNotes?.(ids);
      return;
    }
    const arrows: Record<string, { beats: number; rows: number }> = {
      ArrowLeft: { beats: -snap(), rows: 0 },
      ArrowRight: { beats: snap(), rows: 0 },
      ArrowUp: { beats: 0, rows: event.shiftKey ? -12 : -1 },
      ArrowDown: { beats: 0, rows: event.shiftKey ? 12 : 1 },
    };
    const arrow = arrows[event.key];
    if (!arrow) return;
    event.preventDefault();
    const idSet = new Set(ids);
    const origin = props.notes.filter((note) => idSet.has(note.id));
    props.onCommitNotes?.(
      resolveNoteDrag({
        mode: 'move',
        deltaBeats: arrow.beats,
        deltaRows: arrow.rows,
        origin,
        length: props.length,
        minPitch: minPitch(),
        maxPitch: maxPitch(),
        snap: snap(),
      }),
    );
  };

  const rowIndexes = createMemo(() => Array.from({ length: rows() }, (_, index) => index));

  return (
    <div
      ref={root}
      class={props.class ? `zylem-piano-roll ${props.class}` : 'zylem-piano-roll'}
      tabIndex={0}
      role="application"
      aria-label="Piano roll"
      aria-disabled={props.disabled ? 'true' : undefined}
      data-disabled={props.disabled ? '' : undefined}
      data-dragging={dragging() ? '' : undefined}
      onKeyDown={handleKeyDown}
    >
      <div
        class="zylem-piano-roll-scroll"
        style={{
          '--zylem-pr-ppb': `${ppb()}px`,
          '--zylem-pr-bar': `${ppb() * bpb()}px`,
          '--zylem-pr-snap': `${ppb() * snap()}px`,
          '--zylem-pr-row': `${rowHeight()}px`,
        }}
      >
        <div
          class="zylem-piano-roll-content"
          style={{ width: `${KEYS_WIDTH + gridWidth()}px`, height: `${gridHeight()}px` }}
        >
          <div class="zylem-piano-roll-keys" style={{ width: `${KEYS_WIDTH}px` }}>
            <Index each={rowIndexes()}>
              {(row) => {
                const pitch = () => rowToPitch(row(), maxPitch());
                return (
                  <button
                    type="button"
                    class="zylem-piano-roll-key"
                    style={{ height: `${rowHeight()}px` }}
                    data-black={isBlackKey(pitch()) ? '' : undefined}
                    data-c={pitch() % 12 === 0 ? '' : undefined}
                    aria-label={pitchName(pitch())}
                    tabIndex={-1}
                    disabled={props.disabled}
                    onPointerDown={(event) => {
                      event.preventDefault();
                      props.onPreviewPitch?.(pitch());
                    }}
                  >
                    <Show when={pitch() % 12 === 0}>
                      <span>{pitchName(pitch())}</span>
                    </Show>
                  </button>
                );
              }}
            </Index>
          </div>
          <div
            ref={grid}
            class="zylem-piano-roll-grid"
            style={{ width: `${gridWidth()}px`, height: `${gridHeight()}px` }}
            onPointerDown={(event) => {
              if (event.target === grid && !event.shiftKey) select([]);
              root?.focus({ preventScroll: true });
            }}
            onDblClick={handleGridDoubleClick}
          >
            <Index each={rowIndexes()}>
              {(row) => (
                <div
                  class="zylem-piano-roll-row"
                  style={{ top: `${row() * rowHeight()}px`, height: `${rowHeight()}px` }}
                  data-black={isBlackKey(rowToPitch(row(), maxPitch())) ? '' : undefined}
                  data-c={rowToPitch(row(), maxPitch()) % 12 === 0 ? '' : undefined}
                />
              )}
            </Index>
            <div class="zylem-piano-roll-end" style={{ left: `${props.length * ppb()}px` }} />
            <For each={props.notes}>
              {(note) => (
                <div
                  class="zylem-piano-roll-note"
                  role="button"
                  tabIndex={-1}
                  aria-label={`${pitchName(note.pitch)} at beat ${note.start + 1}`}
                  aria-pressed={selected().has(note.id) ? 'true' : 'false'}
                  data-selected={selected().has(note.id) ? '' : undefined}
                  style={{
                    left: `${note.start * ppb()}px`,
                    top: `${pitchToRow(note.pitch, maxPitch()) * rowHeight()}px`,
                    width: `${Math.max(3, note.duration * ppb() - 1)}px`,
                    height: `${rowHeight() - 1}px`,
                    '--zylem-pr-velocity': String(note.velocity ?? 0.8),
                  }}
                  onPointerDown={beginNoteDrag(note, 'move')}
                >
                  <Show when={note.duration * ppb() > 28}>
                    <span class="zylem-piano-roll-note-label">{pitchName(note.pitch)}</span>
                  </Show>
                  <div
                    class="zylem-piano-roll-note-handle"
                    onPointerDown={beginNoteDrag(note, 'resize')}
                  />
                </div>
              )}
            </For>
            <Show when={props.playhead !== undefined}>
              <div
                class="zylem-piano-roll-playhead"
                style={{ left: `${(props.playhead ?? 0) * ppb()}px` }}
                aria-hidden="true"
              />
            </Show>
          </div>
        </div>
        <Show when={props.showVelocity}>
          <div
            class="zylem-piano-roll-velocity"
            style={{ width: `${KEYS_WIDTH + gridWidth()}px`, height: `${VELOCITY_HEIGHT}px` }}
          >
            <div class="zylem-piano-roll-velocity-label" style={{ width: `${KEYS_WIDTH}px` }}>
              Vel
            </div>
            <div class="zylem-piano-roll-velocity-lane" style={{ width: `${gridWidth()}px` }}>
              <For each={props.notes}>
                {(note) => (
                  <div
                    class="zylem-piano-roll-velocity-bar"
                    data-selected={selected().has(note.id) ? '' : undefined}
                    style={{
                      left: `${note.start * ppb()}px`,
                      height: `${Math.round((note.velocity ?? 0.8) * 100)}%`,
                    }}
                    title={`Velocity ${Math.round((note.velocity ?? 0.8) * 100)}`}
                    onPointerDown={beginVelocityDrag(note)}
                  />
                )}
              </For>
            </div>
          </div>
        </Show>
      </div>
    </div>
  );
}
