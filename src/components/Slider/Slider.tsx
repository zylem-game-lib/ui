import { Slider as KSlider } from '@kobalte/core';
import { Show } from 'solid-js';

export interface SliderProps {
  label?: string;
  value?: number;
  onChange?: (value: number) => void;
  minValue?: number;
  maxValue?: number;
  step?: number;
  disabled?: boolean;
  showValue?: boolean;
  class?: string;
}

/**
 * HyperGlass slider: inset glass track, blue glass fill, and a glowing
 * glossy thumb.
 */
export function Slider(props: SliderProps) {
  return (
    <KSlider.Root
      class={props.class ? `zylem-slider-root ${props.class}` : 'zylem-slider-root'}
      value={props.value !== undefined ? [props.value] : undefined}
      onChange={(values) => props.onChange?.(values[0])}
      minValue={props.minValue}
      maxValue={props.maxValue}
      step={props.step}
      disabled={props.disabled}
    >
      <Show when={props.label || props.showValue}>
        <div class="zylem-slider-header">
          <Show when={props.label}>
            <KSlider.Label class="zylem-slider-label">
              {props.label}
            </KSlider.Label>
          </Show>
          <Show when={props.showValue}>
            <KSlider.ValueLabel class="zylem-slider-value" />
          </Show>
        </div>
      </Show>
      <KSlider.Track class="zylem-slider-track">
        <KSlider.Fill class="zylem-slider-fill" />
        <KSlider.Thumb class="zylem-slider-thumb">
          <KSlider.Input class="zylem-slider-thumb-input" />
        </KSlider.Thumb>
      </KSlider.Track>
    </KSlider.Root>
  );
}
