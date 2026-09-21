import { Slider as KSlider } from '@kobalte/core';
import { Show } from 'solid-js';
import { clamp } from '../TimelineLanes/lanes-math';
import { Knob } from './Knob';

export interface MixerStripProps {
  name: string;
  color?: string;
  /** Fader position in dB. */
  volume: number;
  onVolumeChange?: (volume: number) => void;
  onVolumeCommit?: (volume: number) => void;
  minVolume?: number;
  maxVolume?: number;
  /** -1 (left) … 1 (right). Omit to hide the pan knob. */
  pan?: number;
  onPanChange?: (pan: number) => void;
  onPanCommit?: (pan: number) => void;
  /** Mute / solo render only when their handler is given. */
  muted?: boolean;
  onToggleMute?: () => void;
  solo?: boolean;
  onToggleSolo?: () => void;
  /** Live output level, 0–1, drawn as a meter beside the fader. */
  level?: number;
  /** Wider strip with a stronger label; for the master bus. */
  master?: boolean;
  selected?: boolean;
  onSelect?: () => void;
  disabled?: boolean;
  class?: string;
}

/** `-60` (the floor) reads as `-inf`; otherwise one decimal with a sign. */
export function formatDb(value: number, floor = -60): string {
  if (!Number.isFinite(value) || value <= floor) return '-inf';
  const rounded = Math.round(value * 10) / 10;
  return `${rounded > 0 ? '+' : ''}${rounded.toFixed(1)} dB`;
}

/** `-1` → `L100`, `0` → `C`, `0.5` → `R50`. */
export function formatPan(value: number): string {
  const percent = Math.round(Math.abs(value) * 100);
  if (percent === 0) return 'C';
  return `${value < 0 ? 'L' : 'R'}${percent}`;
}

/**
 * Channel strip: pan knob, vertical fader with a level meter, mute/solo, and
 * the track name with its color. Compose several into a mixer row.
 */
export function MixerStrip(props: MixerStripProps) {
  const min = () => props.minVolume ?? -60;
  const max = () => props.maxVolume ?? 6;

  return (
    <div
      class={props.class ? `zylem-mixer-strip ${props.class}` : 'zylem-mixer-strip'}
      style={{ '--zylem-track-color': props.color ?? 'var(--zylem-color-primary)' }}
      data-master={props.master ? '' : undefined}
      data-selected={props.selected ? '' : undefined}
      data-disabled={props.disabled ? '' : undefined}
      data-muted={props.muted ? '' : undefined}
      onPointerDown={() => props.onSelect?.()}
    >
      <Show when={props.pan !== undefined}>
        <Knob
          value={props.pan ?? 0}
          min={-1}
          max={1}
          step={0.01}
          defaultValue={0}
          bipolar
          size={30}
          label="Pan"
          format={formatPan}
          disabled={props.disabled}
          onChange={(value) => props.onPanChange?.(value)}
          onCommit={(value) => props.onPanCommit?.(value)}
          class="zylem-mixer-pan"
        />
      </Show>
      <div class="zylem-mixer-fader-row">
        <KSlider.Root
          class="zylem-fader"
          orientation="vertical"
          value={[clamp(props.volume, min(), max())]}
          minValue={min()}
          maxValue={max()}
          step={0.1}
          disabled={props.disabled}
          onChange={(values) => props.onVolumeChange?.(values[0] ?? min())}
          onChangeEnd={(values) => props.onVolumeCommit?.(values[0] ?? min())}
          getValueLabel={(params) => formatDb(params.values[0] ?? min(), min())}
        >
          <KSlider.Label class="zylem-fader-sr">{`${props.name} volume`}</KSlider.Label>
          <KSlider.Track class="zylem-fader-track">
            <KSlider.Fill class="zylem-fader-fill" />
            <span class="zylem-fader-zero" aria-hidden="true" />
            <KSlider.Thumb class="zylem-fader-thumb">
              <KSlider.Input class="zylem-fader-sr" />
            </KSlider.Thumb>
          </KSlider.Track>
        </KSlider.Root>
        <div class="zylem-mixer-meter" aria-hidden="true">
          <div
            class="zylem-mixer-meter-fill"
            style={{ height: `${Math.round(clamp(props.level ?? 0, 0, 1) * 100)}%` }}
          />
        </div>
      </div>
      <span class="zylem-mixer-readout">{formatDb(props.volume, min())}</span>
      <div class="zylem-mixer-toggles">
        <Show when={props.onToggleMute}>
          <button
            type="button"
            class="zylem-track-toggle"
            data-kind="mute"
            aria-pressed={props.muted ? 'true' : 'false'}
            aria-label={props.muted ? 'Unmute' : 'Mute'}
            title={props.muted ? 'Unmute' : 'Mute'}
            disabled={props.disabled}
            onPointerDown={(event) => event.stopPropagation()}
            onClick={() => props.onToggleMute?.()}
          >
            M
          </button>
        </Show>
        <Show when={props.onToggleSolo}>
          <button
            type="button"
            class="zylem-track-toggle"
            data-kind="solo"
            aria-pressed={props.solo ? 'true' : 'false'}
            aria-label={props.solo ? 'Unsolo' : 'Solo'}
            title={props.solo ? 'Unsolo' : 'Solo'}
            disabled={props.disabled}
            onPointerDown={(event) => event.stopPropagation()}
            onClick={() => props.onToggleSolo?.()}
          >
            S
          </button>
        </Show>
      </div>
      <span class="zylem-mixer-name" title={props.name}>
        {props.name}
      </span>
    </div>
  );
}
