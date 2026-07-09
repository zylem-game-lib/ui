import { Checkbox as KCheckbox } from '@kobalte/core';
import Check from 'lucide-solid/icons/check';
import { Show } from 'solid-js';

export interface CheckboxProps {
  label?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  name?: string;
  class?: string;
}

/**
 * HyperGlass checkbox: square glass jewel with a beveled checked state.
 */
export function Checkbox(props: CheckboxProps) {
  return (
    <KCheckbox.Root
      class={props.class ? `zylem-checkbox-root ${props.class}` : 'zylem-checkbox-root'}
      checked={props.checked}
      defaultChecked={props.defaultChecked}
      onChange={props.onChange}
      disabled={props.disabled}
      name={props.name}
    >
      <KCheckbox.Input class="zylem-checkbox-input" />
      <KCheckbox.Control class="zylem-checkbox-control">
        <KCheckbox.Indicator>
          <Check class="zylem-checkbox-icon" />
        </KCheckbox.Indicator>
      </KCheckbox.Control>
      <Show when={props.label}>
        <KCheckbox.Label class="zylem-checkbox-label">
          {props.label}
        </KCheckbox.Label>
      </Show>
    </KCheckbox.Root>
  );
}
