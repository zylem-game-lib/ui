import { Slider as KSlider } from '@kobalte/core';
import { For, Show, createMemo } from 'solid-js';
import { formatSeconds, intervalTicks, markerPercent } from './timeline-math';

export interface TimelineTrackProps {
  value: number;
  onChange?: (value: number) => void;
  min?: number;
  max: number;
  step?: number;
  /** Times to mark with a diamond. */
  keyframes?: readonly number[];
  /** Explicit tick times to mark with a dot. */
  ticks?: readonly number[];
  /** Or split the range into this many equal intervals and dot the boundaries. */
  intervals?: number;
  onKeyframeClick?: (time: number) => void;
  /** Show `value / max` as seconds after the track. */
  showTime?: boolean;
  disabled?: boolean;
  label?: string;
  class?: string;
}

/**
 * Director scrub track: a taller inset glass rail with the playhead as a
 * glossy thumb, keyframes as diamonds, and interval boundaries as dots.
 */
export function TimelineTrack(props: TimelineTrackProps) {
  const min = () => props.min ?? 0;
  const ticks = createMemo(() => {
    if (props.ticks) return [...props.ticks];
    if (props.intervals) return intervalTicks(props.intervals, min(), props.max);
    return [];
  });
  const pct = (t: number) => `${markerPercent(t, min(), props.max)}%`;

  return (
    <div class={props.class ? `zylem-timeline ${props.class}` : 'zylem-timeline'}>
      <KSlider.Root
        class="zylem-timeline-root"
        value={[props.value]}
        onChange={(values) => props.onChange?.(values[0] ?? min())}
        minValue={min()}
        maxValue={props.max}
        step={props.step ?? 0.01}
        disabled={props.disabled}
        getValueLabel={(params) => formatSeconds(params.values[0] ?? 0)}
      >
        <Show when={props.label}>
          <KSlider.Label class="zylem-timeline-label">{props.label}</KSlider.Label>
        </Show>
        <KSlider.Track class="zylem-timeline-track">
          <KSlider.Fill class="zylem-timeline-fill" />
          <div class="zylem-timeline-markers" aria-hidden="true">
            <For each={ticks()}>
              {(t) => <span class="zylem-timeline-tick" style={{ left: pct(t) }} />}
            </For>
          </div>
          <Show when={props.keyframes?.length}>
            <div class="zylem-timeline-keyframes">
              <For each={props.keyframes}>
                {(t) => (
                  <button
                    type="button"
                    class="zylem-timeline-keyframe"
                    style={{ left: pct(t) }}
                    aria-label={`Keyframe at ${formatSeconds(t)}`}
                    data-active={Math.abs(t - props.value) < (props.step ?? 0.01) ? '' : undefined}
                    disabled={props.disabled}
                    onPointerDown={(event) => event.stopPropagation()}
                    onClick={() => props.onKeyframeClick?.(t)}
                  />
                )}
              </For>
            </div>
          </Show>
          <KSlider.Thumb class="zylem-timeline-thumb">
            <KSlider.Input class="zylem-timeline-thumb-input" />
          </KSlider.Thumb>
        </KSlider.Track>
      </KSlider.Root>
      <Show when={props.showTime}>
        <span class="zylem-timeline-time">
          {formatSeconds(props.value)} / {formatSeconds(props.max)}
        </span>
      </Show>
    </div>
  );
}
