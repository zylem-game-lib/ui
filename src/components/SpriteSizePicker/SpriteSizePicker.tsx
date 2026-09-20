import { For, Show, onCleanup } from 'solid-js';
import { Button } from '../Button/Button';
import { NumberField } from '../NumberField/NumberField';
import { PixelGrid } from '../PixelGrid/PixelGrid';
import { SPRITE_SIZE_PRESETS, type SpriteSize, snapSize } from './snap-size';

export interface SpriteSizePickerProps {
  width: number;
  height: number;
  onChange: (size: SpriteSize) => void;
  /** Square presets; each sets both dimensions. */
  presets?: readonly number[];
  /** Smallest dimension reachable by dragging or typing. */
  min?: number;
  /** Largest dimension; also sets the size of the 1:1 preview stage. */
  max?: number;
  /** Drag increment in source pixels. */
  step?: number;
  /** Render Width / Height number fields under the preview. */
  showFields?: boolean;
  class?: string;
}

type Edge = 'right' | 'bottom' | 'corner';

/** Extra room around the stage so the largest size still shows its handles. */
const STAGE_GUTTER = 24;

/**
 * Sprite canvas size chooser: power-of-two presets, a 1:1 preview of the
 * actual pixel footprint with drag handles that grow it in `step` increments,
 * and optional numeric fields for exact values.
 */
export function SpriteSizePicker(props: SpriteSizePickerProps) {
  const min = () => props.min ?? 2;
  const max = () => props.max ?? 256;
  const step = () => props.step ?? 2;
  const presets = () => props.presets ?? SPRITE_SIZE_PRESETS;
  const snap = (value: number) => snapSize(value, { min: min(), max: max(), step: step() });

  const emit = (width: number, height: number) => {
    if (width !== props.width || height !== props.height) {
      props.onChange({ width, height });
    }
  };

  let release: (() => void) | undefined;
  onCleanup(() => release?.());

  const startDrag = (edge: Edge) => (event: PointerEvent) => {
    if (event.button !== 0) return;
    const handle = event.currentTarget as HTMLElement;
    const originX = event.clientX;
    const originY = event.clientY;
    const startWidth = props.width;
    const startHeight = props.height;
    // Capture keeps the drag alive when the pointer outruns the handle; a
    // synthetic event has no active pointer to capture, so tolerate that.
    try {
      handle.setPointerCapture(event.pointerId);
    } catch {
      /* no active pointer */
    }
    handle.dataset.dragging = '';

    const onMove = (move: PointerEvent) => {
      const dx = move.clientX - originX;
      const dy = move.clientY - originY;
      const width = edge === 'bottom' ? props.width : snap(startWidth + dx);
      const height = edge === 'right' ? props.height : snap(startHeight + dy);
      emit(width, height);
    };
    const onUp = () => release?.();
    release = () => {
      handle.removeEventListener('pointermove', onMove);
      handle.removeEventListener('pointerup', onUp);
      handle.removeEventListener('pointercancel', onUp);
      delete handle.dataset.dragging;
      if (handle.hasPointerCapture(event.pointerId)) {
        handle.releasePointerCapture(event.pointerId);
      }
      release = undefined;
    };
    handle.addEventListener('pointermove', onMove);
    handle.addEventListener('pointerup', onUp);
    handle.addEventListener('pointercancel', onUp);
    event.preventDefault();
  };

  const stageSize = () => `${max() + STAGE_GUTTER}px`;

  return (
    <div class={props.class ? `zylem-size-picker ${props.class}` : 'zylem-size-picker'}>
      <div class="zylem-size-picker-presets" role="group" aria-label="Size presets">
        <For each={presets()}>
          {(preset) => (
            <Button
              size="sm"
              variant={props.width === preset && props.height === preset ? 'primary' : 'default'}
              aria-pressed={props.width === preset && props.height === preset}
              onClick={() => emit(preset, preset)}
            >
              {preset}
            </Button>
          )}
        </For>
      </div>

      <div class="zylem-size-picker-stage" style={{ width: stageSize(), height: stageSize() }}>
        <div
          class="zylem-size-picker-frame"
          style={{ width: `${props.width}px`, height: `${props.height}px` }}
        >
          <PixelGrid width={props.width} height={props.height} checkerCell={4} />
          <div
            class="zylem-size-picker-handle"
            data-edge="right"
            aria-hidden="true"
            onPointerDown={startDrag('right')}
          />
          <div
            class="zylem-size-picker-handle"
            data-edge="bottom"
            aria-hidden="true"
            onPointerDown={startDrag('bottom')}
          />
          <div
            class="zylem-size-picker-handle"
            data-edge="corner"
            aria-hidden="true"
            onPointerDown={startDrag('corner')}
          />
        </div>
        <output class="zylem-size-picker-readout" aria-live="polite">
          {props.width} × {props.height} px
        </output>
      </div>

      <Show when={props.showFields ?? true}>
        <div class="zylem-size-picker-fields">
          <NumberField
            label="Width"
            value={props.width}
            minValue={min()}
            maxValue={max()}
            step={step()}
            onChange={(width) => emit(snap(width), props.height)}
          />
          <NumberField
            label="Height"
            value={props.height}
            minValue={min()}
            maxValue={max()}
            step={step()}
            onChange={(height) => emit(props.width, snap(height))}
          />
        </div>
      </Show>
    </div>
  );
}
