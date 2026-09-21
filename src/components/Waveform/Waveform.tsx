import { createEffect, createMemo, createSignal, onCleanup, onMount, Show } from 'solid-js';
import { clamp } from '../TimelineLanes/lanes-math';
import { computePeaks, peaksFromAudioBuffer } from './peaks';

export type { PeakSource } from './peaks';

export interface WaveformRegion {
  /** Seconds. */
  start: number;
  end: number;
}

export interface WaveformProps {
  /** Pre-computed peaks (0–1 per column); wins over `buffer`. */
  peaks?: ArrayLike<number>;
  /** Source audio; peaks are computed to match the drawn width. */
  buffer?: { duration: number; numberOfChannels: number; getChannelData(channel: number): Float32Array };
  /** Seconds the peaks span; defaults to `buffer.duration`. Needed for regions and the playhead. */
  duration?: number;
  /** Highlighted span with draggable edges. */
  region?: WaveformRegion;
  onRegionChange?: (region: WaveformRegion) => void;
  onRegionCommit?: (region: WaveformRegion) => void;
  /** Seconds. */
  playhead?: number;
  /** Any CSS color for the peaks. */
  color?: string;
  height?: number;
  /** Click anywhere to seek. */
  onSeek?: (seconds: number) => void;
  disabled?: boolean;
  class?: string;
}

/**
 * Canvas waveform with an optional trim region and playhead. Peaks are
 * redrawn on resize so the shape stays crisp at any width.
 */
export function Waveform(props: WaveformProps) {
  let canvas: HTMLCanvasElement | undefined;
  let host: HTMLDivElement | undefined;
  const [width, setWidth] = createSignal(0);
  const height = () => props.height ?? 64;
  const duration = () => props.duration ?? props.buffer?.duration ?? 0;

  const peaks = createMemo(() => {
    const bins = Math.max(1, Math.floor(width()));
    if (props.peaks) {
      const source = Float32Array.from(props.peaks as ArrayLike<number>);
      return source.length === bins ? source : resample(source, bins);
    }
    if (props.buffer) return peaksFromAudioBuffer(props.buffer, bins);
    return new Float32Array(bins);
  });

  onMount(() => {
    if (!host) return;
    setWidth(host.clientWidth);
    if (typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) setWidth(Math.floor(entry.contentRect.width));
    });
    observer.observe(host);
    onCleanup(() => observer.disconnect());
  });

  createEffect(() => {
    if (!canvas) return;
    const w = width();
    const h = height();
    const data = peaks();
    const color =
      props.color ??
      (getComputedStyle(canvas).getPropertyValue('--zylem-color-primary').trim() || '#61a6e8');
    const ratio = typeof devicePixelRatio === 'number' ? devicePixelRatio : 1;
    canvas.width = Math.max(1, Math.floor(w * ratio));
    canvas.height = Math.max(1, Math.floor(h * ratio));
    const context = canvas.getContext('2d');
    if (!context) return;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    context.clearRect(0, 0, w, h);
    const mid = h / 2;
    context.strokeStyle = 'rgba(205, 232, 255, 0.18)';
    context.beginPath();
    context.moveTo(0, mid + 0.5);
    context.lineTo(w, mid + 0.5);
    context.stroke();
    context.fillStyle = color;
    for (let x = 0; x < data.length; x += 1) {
      const amplitude = Math.max(1, (data[x] ?? 0) * (mid - 2));
      context.fillRect(x, mid - amplitude, 1, amplitude * 2);
    }
  });

  const secondsAt = (clientX: number) => {
    if (!host || duration() <= 0) return 0;
    const rect = host.getBoundingClientRect();
    return clamp(((clientX - rect.left) / rect.width) * duration(), 0, duration());
  };
  const percent = (seconds: number) => (duration() > 0 ? (seconds / duration()) * 100 : 0);

  const beginRegionDrag = (edge: 'start' | 'end') => (event: PointerEvent) => {
    const region = props.region;
    if (props.disabled || !region || event.button !== 0) return;
    event.preventDefault();
    event.stopPropagation();
    const target = event.currentTarget as HTMLElement;
    target.setPointerCapture?.(event.pointerId);
    let last = region;
    const move = (moveEvent: PointerEvent) => {
      const seconds = secondsAt(moveEvent.clientX);
      last =
        edge === 'start'
          ? { start: Math.min(seconds, region.end - 0.01), end: region.end }
          : { start: region.start, end: Math.max(seconds, region.start + 0.01) };
      props.onRegionChange?.(last);
    };
    const stop = () => {
      target.removeEventListener('pointermove', move);
      target.removeEventListener('pointerup', stop);
      target.removeEventListener('pointercancel', stop);
      target.releasePointerCapture?.(event.pointerId);
      props.onRegionCommit?.(last);
    };
    target.addEventListener('pointermove', move);
    target.addEventListener('pointerup', stop);
    target.addEventListener('pointercancel', stop);
  };

  return (
    <div
      ref={host}
      class={props.class ? `zylem-waveform ${props.class}` : 'zylem-waveform'}
      style={{ height: `${height()}px` }}
      data-disabled={props.disabled ? '' : undefined}
      onPointerDown={(event) => {
        if (props.disabled || !props.onSeek || event.button !== 0) return;
        props.onSeek(secondsAt(event.clientX));
      }}
    >
      <canvas ref={canvas} class="zylem-waveform-canvas" aria-hidden="true" />
      <Show when={props.region && duration() > 0}>
        {(_) => {
          const region = () => props.region!;
          return (
            <>
              <div
                class="zylem-waveform-shade"
                style={{ left: 0, width: `${percent(region().start)}%` }}
              />
              <div
                class="zylem-waveform-shade"
                style={{ left: `${percent(region().end)}%`, right: 0 }}
              />
              <div
                class="zylem-waveform-edge"
                data-edge="start"
                style={{ left: `${percent(region().start)}%` }}
                onPointerDown={beginRegionDrag('start')}
                role="slider"
                aria-label="Trim start"
                aria-valuenow={region().start}
                aria-valuemin={0}
                aria-valuemax={duration()}
              />
              <div
                class="zylem-waveform-edge"
                data-edge="end"
                style={{ left: `${percent(region().end)}%` }}
                onPointerDown={beginRegionDrag('end')}
                role="slider"
                aria-label="Trim end"
                aria-valuenow={region().end}
                aria-valuemin={0}
                aria-valuemax={duration()}
              />
            </>
          );
        }}
      </Show>
      <Show when={props.playhead !== undefined && duration() > 0}>
        <div
          class="zylem-waveform-playhead"
          style={{ left: `${percent(props.playhead ?? 0)}%` }}
          aria-hidden="true"
        />
      </Show>
    </div>
  );
}

function resample(source: Float32Array, bins: number): Float32Array {
  return computePeaks({ channels: [source] }, bins);
}
