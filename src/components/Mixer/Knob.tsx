import { createSignal, createUniqueId, Show } from 'solid-js';
import { clamp } from '../TimelineLanes/lanes-math';

export interface KnobProps {
  value: number;
  onChange?: (value: number) => void;
  /** Fires once when a drag ends or a key edit lands. */
  onCommit?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  /** Double-click resets to this. */
  defaultValue?: number;
  /** Caption under the knob, which also names it. */
  label?: string;
  /** Accessible name when there is no visible `label`. */
  'aria-label'?: string;
  /** Readout under the knob; defaults to the value with `step` precision. */
  format?: (value: number) => string;
  /** Draw the arc from the centre (for pan and other ±ranges). */
  bipolar?: boolean;
  size?: number;
  disabled?: boolean;
  class?: string;
}

const SWEEP = 270;
const START_ANGLE = -135;

function polar(cx: number, cy: number, radius: number, degrees: number) {
  const radians = ((degrees - 90) * Math.PI) / 180;
  return { x: cx + radius * Math.cos(radians), y: cy + radius * Math.sin(radians) };
}

/** SVG arc path from `from` to `to` degrees (clockwise, 12 o'clock = 0). */
export function arcPath(cx: number, cy: number, radius: number, from: number, to: number): string {
  const [a, b] = from <= to ? [from, to] : [to, from];
  const start = polar(cx, cy, radius, a);
  const end = polar(cx, cy, radius, b);
  const large = b - a > 180 ? 1 : 0;
  return `M ${start.x.toFixed(3)} ${start.y.toFixed(3)} A ${radius} ${radius} 0 ${large} 1 ${end.x.toFixed(3)} ${end.y.toFixed(3)}`;
}

/**
 * Rotary control: drag vertically (Shift for fine steps), arrow keys to
 * step, double-click to reset. The arc fills from the minimum, or from the
 * centre when `bipolar`.
 */
export function Knob(props: KnobProps) {
  const min = () => props.min ?? 0;
  const max = () => props.max ?? 1;
  const step = () => props.step ?? (max() - min()) / 100;
  const size = () => props.size ?? 36;
  const labelId = createUniqueId();
  const ratio = () => (max() > min() ? clamp((props.value - min()) / (max() - min()), 0, 1) : 0);
  const angle = () => START_ANGLE + ratio() * SWEEP;
  const zeroAngle = () =>
    START_ANGLE + clamp((0 - min()) / (max() - min() || 1), 0, 1) * SWEEP;
  const [dragging, setDragging] = createSignal(false);

  const quantize = (value: number) => {
    const s = step();
    const snapped = s > 0 ? Math.round((value - min()) / s) * s + min() : value;
    return clamp(Number(snapped.toFixed(6)), min(), max());
  };
  const readout = () => {
    if (props.format) return props.format(props.value);
    const decimals = Math.max(0, Math.min(3, -Math.floor(Math.log10(step() || 1))));
    return props.value.toFixed(decimals);
  };

  const beginDrag = (event: PointerEvent) => {
    if (props.disabled || event.button !== 0) return;
    event.preventDefault();
    const target = event.currentTarget as HTMLElement;
    target.focus({ preventScroll: true });
    target.setPointerCapture?.(event.pointerId);
    const originY = event.clientY;
    const originValue = props.value;
    let last = originValue;
    setDragging(true);
    const move = (moveEvent: PointerEvent) => {
      const pixels = moveEvent.shiftKey ? 600 : 150;
      const delta = ((originY - moveEvent.clientY) / pixels) * (max() - min());
      last = quantize(originValue + delta);
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

  const nudge = (direction: number, big: boolean) => {
    const next = quantize(props.value + direction * step() * (big ? 10 : 1));
    props.onChange?.(next);
    props.onCommit?.(next);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (props.disabled) return;
    switch (event.key) {
      case 'ArrowUp':
      case 'ArrowRight':
        event.preventDefault();
        nudge(1, event.shiftKey);
        break;
      case 'ArrowDown':
      case 'ArrowLeft':
        event.preventDefault();
        nudge(-1, event.shiftKey);
        break;
      case 'Home':
        event.preventDefault();
        props.onChange?.(min());
        props.onCommit?.(min());
        break;
      case 'End':
        event.preventDefault();
        props.onChange?.(max());
        props.onCommit?.(max());
        break;
      default:
    }
  };

  const reset = () => {
    if (props.disabled || props.defaultValue === undefined) return;
    const next = quantize(props.defaultValue);
    props.onChange?.(next);
    props.onCommit?.(next);
  };

  const radius = () => size() / 2 - 3;
  const center = () => size() / 2;

  return (
    <div
      class={props.class ? `zylem-knob ${props.class}` : 'zylem-knob'}
      data-disabled={props.disabled ? '' : undefined}
      data-dragging={dragging() ? '' : undefined}
    >
      <div
        class="zylem-knob-dial"
        role="slider"
        tabIndex={props.disabled ? -1 : 0}
        aria-labelledby={props.label ? labelId : undefined}
        aria-label={props.label ? undefined : props['aria-label']}
        aria-valuemin={min()}
        aria-valuemax={max()}
        aria-valuenow={props.value}
        aria-valuetext={readout()}
        aria-disabled={props.disabled ? 'true' : undefined}
        style={{ width: `${size()}px`, height: `${size()}px` }}
        onPointerDown={beginDrag}
        onKeyDown={handleKeyDown}
        onDblClick={reset}
      >
        <svg viewBox={`0 0 ${size()} ${size()}`} width={size()} height={size()} aria-hidden="true">
          <path
            class="zylem-knob-track"
            d={arcPath(center(), center(), radius(), START_ANGLE, START_ANGLE + SWEEP)}
          />
          <path
            class="zylem-knob-fill"
            d={arcPath(center(), center(), radius(), props.bipolar ? zeroAngle() : START_ANGLE, angle())}
          />
          <g transform={`rotate(${angle()} ${center()} ${center()})`}>
            <circle class="zylem-knob-cap" cx={center()} cy={center()} r={radius() - 4} />
            <line
              class="zylem-knob-pointer"
              x1={center()}
              y1={center() - radius() + 6}
              x2={center()}
              y2={center() - radius() / 2}
            />
          </g>
        </svg>
      </div>
      <Show when={props.label}>
        <span id={labelId} class="zylem-knob-label">
          {props.label}
        </span>
      </Show>
      <span class="zylem-knob-value">{readout()}</span>
    </div>
  );
}
