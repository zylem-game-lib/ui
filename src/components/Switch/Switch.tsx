import { Switch as KSwitch } from '@kobalte/core';
import { Show } from 'solid-js';

export interface SwitchProps {
  label?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  name?: string;
  class?: string;
}

/**
 * HyperGlass switch: glass pill track with a glossy sliding thumb.
 */
export function Switch(props: SwitchProps) {
  return (
    <KSwitch.Root
      class={props.class ? `zylem-switch-root ${props.class}` : 'zylem-switch-root'}
      checked={props.checked}
      defaultChecked={props.defaultChecked}
      onChange={props.onChange}
      disabled={props.disabled}
      name={props.name}
    >
      <KSwitch.Input class="zylem-switch-input" />
      <KSwitch.Control class="zylem-switch-control">
        <KSwitch.Thumb class="zylem-switch-thumb" />
      </KSwitch.Control>
      <Show when={props.label}>
        <KSwitch.Label class="zylem-switch-label">{props.label}</KSwitch.Label>
      </Show>
    </KSwitch.Root>
  );
}
