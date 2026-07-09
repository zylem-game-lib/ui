import { Progress as KProgress } from '@kobalte/core';
import { Show } from 'solid-js';

export interface ProgressProps {
  value?: number;
  minValue?: number;
  maxValue?: number;
  label?: string;
  showValue?: boolean;
  indeterminate?: boolean;
  class?: string;
}

/**
 * HyperGlass progress bar: inset glass track with a glowing blue glass fill.
 */
export function Progress(props: ProgressProps) {
  return (
    <KProgress.Root
      class={props.class ? `zylem-progress-root ${props.class}` : 'zylem-progress-root'}
      value={props.value}
      minValue={props.minValue}
      maxValue={props.maxValue}
      indeterminate={props.indeterminate}
    >
      <Show when={props.label || props.showValue}>
        <div class="zylem-progress-header">
          <Show when={props.label}>
            <KProgress.Label class="zylem-progress-label">
              {props.label}
            </KProgress.Label>
          </Show>
          <Show when={props.showValue}>
            <KProgress.ValueLabel class="zylem-progress-value" />
          </Show>
        </div>
      </Show>
      <KProgress.Track class="zylem-progress-track">
        <KProgress.Fill class="zylem-progress-fill" />
      </KProgress.Track>
    </KProgress.Root>
  );
}
