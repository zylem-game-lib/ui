import {
  type Accessor,
  createContext,
  createMemo,
  createSignal,
  For,
  type JSX,
  Show,
  splitProps,
  useContext,
} from 'solid-js';
import {
  type ClipBounds,
  clamp,
  resolveClipDrag,
  rulerTicks,
  snapTime,
  type TimeScale,
} from './lanes-math';

export type { TimeScale, TimeUnit, RulerTick, ClipBounds } from './lanes-math';

/** Room past the end of the timeline so the last clip's edge is grabbable. */
const END_PADDING = 48;
const DEFAULT_HEADER_WIDTH = 168;
const DEFAULT_LANE_HEIGHT = 48;

export interface TimelineContextValue {
  scale: Accessor<TimeScale>;
  /** Timeline length in units. */
  length: Accessor<number>;
  snap: Accessor<number | undefined>;
  headerWidth: Accessor<number>;
  disabled: Accessor<boolean>;
  timeToPx: (time: number) => number;
  /** Pixel offset from the start of a lane body → time. */
  pxToTime: (px: number) => number;
  /** Pixel travel → unit travel, for drags. */
  deltaToTime: (dx: number) => number;
  snapTime: (time: number) => number;
}

const TimelineContext = createContext<TimelineContextValue>();

/** The scale and helpers of the enclosing `TimelineLanes`, for custom lane content. */
export function useTimeline(): TimelineContextValue {
  const context = useContext(TimelineContext);
  if (!context) throw new Error('useTimeline must be used inside <TimelineLanes>');
  return context;
}

export interface TimelineRange {
  start: number;
  end: number;
}

export interface TimelineLanesProps {
  scale: TimeScale;
  /** Timeline length in units. */
  length: number;
  playhead?: number;
  /** Fires while the ruler is clicked or dragged. */
  onSeek?: (time: number) => void;
  /** Drag snap in units, applied to clips and markers (not to seeking). */
  snap?: number;
  /** Width of the sticky header column. */
  headerWidth?: number;
  /** Rendered in the corner above the headers. */
  corner?: JSX.Element;
  /** Highlighted span on the ruler (a loop or selection). */
  range?: TimelineRange;
  /** Ctrl/⌘ + wheel zoom; receives the next pixels-per-unit. */
  onZoom?: (pixelsPerUnit: number) => void;
  minPixelsPerUnit?: number;
  maxPixelsPerUnit?: number;
  disabled?: boolean;
  children?: JSX.Element;
  class?: string;
  ref?: (element: HTMLDivElement) => void;
}

/**
 * Multi-track timeline: a sticky ruler with labelled ticks, a sticky header
 * column, lanes that scroll together, and a playhead across all of them.
 * Lanes hold `TimelineClip`s and `KeyframeMarker`s, which read the scale
 * from context; anything else can via `useTimeline()`.
 */
export function TimelineLanes(props: TimelineLanesProps) {
  const headerWidth = () => props.headerWidth ?? DEFAULT_HEADER_WIDTH;
  const ppu = () => props.scale.pixelsPerUnit;
  const timeToPx = (time: number) => time * ppu();
  const pxToTime = (px: number) => px / ppu();
  const context: TimelineContextValue = {
    scale: () => props.scale,
    length: () => props.length,
    snap: () => props.snap,
    headerWidth,
    disabled: () => Boolean(props.disabled),
    timeToPx,
    pxToTime,
    deltaToTime: (dx) => dx / ppu(),
    snapTime: (time) => snapTime(time, props.snap),
  };

  const ticks = createMemo(() => rulerTicks({ scale: props.scale, length: props.length }));
  const minorStep = createMemo(() => {
    const list = ticks();
    return list.length > 1 ? (list[1]!.time - list[0]!.time) * ppu() : 0;
  });
  const majorStep = createMemo(() => {
    const majors = ticks().filter((tick) => tick.major);
    return majors.length > 1 ? (majors[1]!.time - majors[0]!.time) * ppu() : 0;
  });
  const bodyWidth = () => timeToPx(props.length) + END_PADDING;

  let ruler: HTMLDivElement | undefined;
  const seekFromPointer = (event: PointerEvent) => {
    if (!ruler) return;
    const rect = ruler.getBoundingClientRect();
    props.onSeek?.(clamp(pxToTime(event.clientX - rect.left), 0, props.length));
  };
  const startSeek = (event: PointerEvent) => {
    if (props.disabled || !props.onSeek || event.button !== 0) return;
    event.preventDefault();
    seekFromPointer(event);
    const move = (moveEvent: PointerEvent) => seekFromPointer(moveEvent);
    const stop = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', stop);
      window.removeEventListener('pointercancel', stop);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', stop);
    window.addEventListener('pointercancel', stop);
  };

  const handleWheel = (event: WheelEvent) => {
    if (!props.onZoom || !(event.ctrlKey || event.metaKey)) return;
    event.preventDefault();
    const factor = Math.exp(-event.deltaY * 0.002);
    const next = clamp(
      ppu() * factor,
      props.minPixelsPerUnit ?? 4,
      props.maxPixelsPerUnit ?? 400,
    );
    props.onZoom(next);
  };

  return (
    <TimelineContext.Provider value={context}>
      <div
        ref={props.ref}
        class={props.class ? `zylem-lanes ${props.class}` : 'zylem-lanes'}
        data-disabled={props.disabled ? '' : undefined}
        data-unit={props.scale.unit}
        onWheel={handleWheel}
      >
        <div
          class="zylem-lanes-content"
          style={{
            width: `${headerWidth() + bodyWidth()}px`,
            '--zylem-lanes-header': `${headerWidth()}px`,
            '--zylem-lanes-minor': `${minorStep()}px`,
            '--zylem-lanes-major': `${majorStep()}px`,
          }}
        >
          <div class="zylem-lanes-ruler-row">
            <div class="zylem-lanes-corner">{props.corner}</div>
            <div
              ref={ruler}
              class="zylem-lanes-ruler"
              style={{ width: `${bodyWidth()}px` }}
              onPointerDown={startSeek}
              role={props.onSeek ? 'slider' : undefined}
              aria-label={props.onSeek ? 'Playhead' : undefined}
              aria-valuemin={props.onSeek ? 0 : undefined}
              aria-valuemax={props.onSeek ? props.length : undefined}
              aria-valuenow={props.onSeek ? props.playhead : undefined}
            >
              <Show when={props.range}>
                {(range) => (
                  <div
                    class="zylem-lanes-range"
                    style={{
                      left: `${timeToPx(range().start)}px`,
                      width: `${Math.max(0, timeToPx(range().end - range().start))}px`,
                    }}
                  />
                )}
              </Show>
              <For each={ticks()}>
                {(tick) => (
                  <div
                    class="zylem-lanes-tick"
                    data-major={tick.major ? '' : undefined}
                    style={{ left: `${timeToPx(tick.time)}px` }}
                  >
                    <Show when={tick.label}>
                      <span class="zylem-lanes-tick-label">{tick.label}</span>
                    </Show>
                  </div>
                )}
              </For>
              <Show when={props.playhead !== undefined}>
                <div
                  class="zylem-lanes-playhead-head"
                  style={{ left: `${timeToPx(props.playhead ?? 0)}px` }}
                />
              </Show>
            </div>
          </div>
          <div class="zylem-lanes-rows">{props.children}</div>
          <Show when={props.playhead !== undefined}>
            <div
              class="zylem-lanes-playhead"
              style={{ left: `${headerWidth() + timeToPx(props.playhead ?? 0)}px` }}
              aria-hidden="true"
            />
          </Show>
        </div>
      </div>
    </TimelineContext.Provider>
  );
}

export interface TimelineLaneProps {
  /** Sticky header cell; usually a `TrackHeader`. */
  header?: JSX.Element;
  height?: number;
  selected?: boolean;
  /** Dims the lane body (muted track, locked track). */
  dimmed?: boolean;
  /** Double-click on empty lane space, with the (snapped) time under the pointer. */
  onCreate?: (time: number) => void;
  /** Pointer down on empty lane space (not on a clip or marker). */
  onSelectEmpty?: () => void;
  children?: JSX.Element;
  class?: string;
}

export function TimelineLane(props: TimelineLaneProps) {
  const timeline = useTimeline();
  const height = () => props.height ?? DEFAULT_LANE_HEIGHT;
  let body: HTMLDivElement | undefined;

  const timeAt = (event: MouseEvent) => {
    if (!body) return 0;
    const rect = body.getBoundingClientRect();
    return clamp(
      timeline.snapTime(timeline.pxToTime(event.clientX - rect.left)),
      0,
      timeline.length(),
    );
  };

  return (
    <div
      class={props.class ? `zylem-lane ${props.class}` : 'zylem-lane'}
      style={{ height: `${height()}px` }}
      data-selected={props.selected ? '' : undefined}
      data-dimmed={props.dimmed ? '' : undefined}
    >
      <div class="zylem-lane-header">{props.header}</div>
      <div
        ref={body}
        class="zylem-lane-body"
        style={{ width: `${timeline.timeToPx(timeline.length()) + END_PADDING}px` }}
        onPointerDown={(event) => {
          if (event.target === body) props.onSelectEmpty?.();
        }}
        onDblClick={(event) => {
          if (timeline.disabled() || event.target !== body) return;
          props.onCreate?.(timeAt(event));
        }}
      >
        <div class="zylem-lane-end" style={{ left: `${timeline.timeToPx(timeline.length())}px` }} />
        {props.children}
      </div>
    </div>
  );
}

export interface TimelineClipChange extends ClipBounds {
  /** How far the start moved (non-zero only for start-edge drags); lets hosts offset media. */
  startDelta: number;
}

export interface TimelineClipProps {
  start: number;
  length: number;
  label?: string;
  /** Any CSS color; tints the clip. */
  color?: string;
  selected?: boolean;
  /** Length in units of a lead-in region drawn hatched at the clip start (a shot blend). */
  blend?: number;
  minLength?: number;
  movable?: boolean;
  resizable?: boolean;
  disabled?: boolean;
  onSelect?: (event: PointerEvent) => void;
  /** Fires continuously while dragging. */
  onChange?: (change: TimelineClipChange) => void;
  /** Fires once when a drag ends, with the final bounds. */
  onCommit?: (change: TimelineClipChange) => void;
  onDoubleClick?: () => void;
  /** Content drawn inside the clip under the label (a note preview, a waveform). */
  children?: JSX.Element;
  class?: string;
}

type DragMode = 'move' | 'start' | 'end';

/** A block on a lane. Drag the body to move, the edges to trim. */
export function TimelineClip(props: TimelineClipProps) {
  const timeline = useTimeline();
  const [dragging, setDragging] = createSignal<DragMode | null>(null);
  const disabled = () => props.disabled || timeline.disabled();
  const movable = () => props.movable !== false;
  const resizable = () => props.resizable !== false;

  const beginDrag = (mode: DragMode) => (event: PointerEvent) => {
    if (event.button !== 0) return;
    event.stopPropagation();
    props.onSelect?.(event);
    if (disabled()) return;
    if (mode === 'move' && !movable()) return;
    if (mode !== 'move' && !resizable()) return;
    event.preventDefault();
    const target = event.currentTarget as HTMLElement;
    target.setPointerCapture?.(event.pointerId);
    const originX = event.clientX;
    const origin: ClipBounds = { start: props.start, length: props.length };
    let last: TimelineClipChange = { ...origin, startDelta: 0 };
    setDragging(mode);

    const resolve = (moveEvent: PointerEvent): TimelineClipChange => {
      const bounds = resolveClipDrag({
        mode,
        delta: timeline.deltaToTime(moveEvent.clientX - originX),
        origin,
        length: timeline.length(),
        snap: timeline.snap(),
        minLength: props.minLength ?? timeline.snap() ?? 0,
      });
      return { ...bounds, startDelta: mode === 'start' ? bounds.start - origin.start : 0 };
    };
    const move = (moveEvent: PointerEvent) => {
      last = resolve(moveEvent);
      props.onChange?.(last);
    };
    const stop = () => {
      target.removeEventListener('pointermove', move);
      target.removeEventListener('pointerup', stop);
      target.removeEventListener('pointercancel', stop);
      target.releasePointerCapture?.(event.pointerId);
      setDragging(null);
      props.onCommit?.(last);
    };
    target.addEventListener('pointermove', move);
    target.addEventListener('pointerup', stop);
    target.addEventListener('pointercancel', stop);
  };

  return (
    <div
      class={props.class ? `zylem-clip ${props.class}` : 'zylem-clip'}
      style={{
        left: `${timeline.timeToPx(props.start)}px`,
        width: `${Math.max(2, timeline.timeToPx(props.length))}px`,
        '--zylem-clip-color': props.color ?? 'var(--zylem-color-primary)',
      }}
      data-selected={props.selected ? '' : undefined}
      data-dragging={dragging() ?? undefined}
      data-disabled={disabled() ? '' : undefined}
      role="button"
      tabIndex={disabled() ? -1 : 0}
      aria-label={props.label}
      aria-pressed={props.selected ? 'true' : 'false'}
      onPointerDown={beginDrag('move')}
      onDblClick={(event) => {
        event.stopPropagation();
        props.onDoubleClick?.();
      }}
    >
      <Show when={props.blend && props.blend > 0}>
        <div
          class="zylem-clip-blend"
          style={{ width: `${timeline.timeToPx(props.blend ?? 0)}px` }}
          aria-hidden="true"
        />
      </Show>
      <Show when={props.label}>
        <span class="zylem-clip-label">{props.label}</span>
      </Show>
      <Show when={props.children}>
        <div class="zylem-clip-body">{props.children}</div>
      </Show>
      <Show when={resizable() && !disabled()}>
        <div class="zylem-clip-handle" data-edge="start" onPointerDown={beginDrag('start')} />
        <div class="zylem-clip-handle" data-edge="end" onPointerDown={beginDrag('end')} />
      </Show>
    </div>
  );
}

export interface KeyframeMarkerProps {
  time: number;
  label?: string;
  /** `diamond` for keyframes, `pin` for events/cues. */
  shape?: 'diamond' | 'pin';
  color?: string;
  selected?: boolean;
  disabled?: boolean;
  onSelect?: (event: PointerEvent) => void;
  /** Fires continuously while dragging. */
  onChange?: (time: number) => void;
  /** Fires once when a drag ends. */
  onCommit?: (time: number) => void;
  onDoubleClick?: () => void;
  class?: string;
}

/** A draggable point on a lane: a keyframe diamond or an event pin. */
export function KeyframeMarker(props: KeyframeMarkerProps) {
  const timeline = useTimeline();
  const [dragging, setDragging] = createSignal(false);
  const disabled = () => props.disabled || timeline.disabled();

  const beginDrag = (event: PointerEvent) => {
    if (event.button !== 0) return;
    event.stopPropagation();
    props.onSelect?.(event);
    if (disabled()) return;
    event.preventDefault();
    const target = event.currentTarget as HTMLElement;
    target.setPointerCapture?.(event.pointerId);
    const originX = event.clientX;
    const originTime = props.time;
    let last = originTime;
    setDragging(true);
    const move = (moveEvent: PointerEvent) => {
      last = clamp(
        timeline.snapTime(originTime + timeline.deltaToTime(moveEvent.clientX - originX)),
        0,
        timeline.length(),
      );
      props.onChange?.(last);
    };
    const stop = () => {
      target.removeEventListener('pointermove', move);
      target.removeEventListener('pointerup', stop);
      target.removeEventListener('pointercancel', stop);
      target.releasePointerCapture?.(event.pointerId);
      setDragging(false);
      props.onCommit?.(last);
    };
    target.addEventListener('pointermove', move);
    target.addEventListener('pointerup', stop);
    target.addEventListener('pointercancel', stop);
  };

  return (
    <button
      type="button"
      class={props.class ? `zylem-marker ${props.class}` : 'zylem-marker'}
      style={{
        left: `${timeline.timeToPx(props.time)}px`,
        '--zylem-marker-color': props.color ?? '',
      }}
      data-shape={props.shape ?? 'diamond'}
      data-selected={props.selected ? '' : undefined}
      data-dragging={dragging() ? '' : undefined}
      disabled={disabled()}
      aria-label={props.label ?? `Keyframe at ${props.time}`}
      aria-pressed={props.selected ? 'true' : 'false'}
      title={props.label}
      onPointerDown={beginDrag}
      onDblClick={(event) => {
        event.stopPropagation();
        props.onDoubleClick?.();
      }}
    >
      <span class="zylem-marker-glyph" aria-hidden="true" />
      <Show when={props.label && props.shape === 'pin'}>
        <span class="zylem-marker-label">{props.label}</span>
      </Show>
    </button>
  );
}

export interface TimelineLaneGroupProps {
  /** Header cell content for the group row. */
  header?: JSX.Element;
  collapsed?: boolean;
  children?: JSX.Element;
  class?: string;
}

/** A thin divider lane that titles the lanes below it (a camera's keyframe sub-lanes). */
export function TimelineLaneGroup(props: TimelineLaneGroupProps) {
  const [local] = splitProps(props, ['header', 'collapsed', 'children', 'class']);
  return (
    <>
      <TimelineLane header={local.header} height={24} class={`zylem-lane--group ${local.class ?? ''}`} />
      <Show when={!local.collapsed}>{local.children}</Show>
    </>
  );
}
