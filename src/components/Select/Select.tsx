import { Select as KSelect } from '@kobalte/core';
import { Show } from 'solid-js';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string | null) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  name?: string;
  class?: string;
}

/**
 * HyperGlass select: inset glass trigger opening a floating glass sheet.
 */
export function Select(props: SelectProps) {
  const selected = () =>
    props.options.find((option) => option.value === props.value) ?? null;

  return (
    <KSelect.Root<SelectOption>
      class={props.class ? `zylem-field-root ${props.class}` : 'zylem-field-root'}
      options={props.options}
      optionValue="value"
      optionTextValue="label"
      optionDisabled="disabled"
      value={selected()}
      onChange={(option) => props.onChange?.(option?.value ?? null)}
      placeholder={props.placeholder}
      disabled={props.disabled}
      name={props.name}
      itemComponent={(itemProps) => (
        <KSelect.Item item={itemProps.item} class="zylem-select-item">
          <KSelect.ItemLabel>{itemProps.item.rawValue.label}</KSelect.ItemLabel>
          <KSelect.ItemIndicator class="zylem-select-item-indicator">
            ✓
          </KSelect.ItemIndicator>
        </KSelect.Item>
      )}
    >
      <Show when={props.label}>
        <KSelect.Label class="zylem-field-label">{props.label}</KSelect.Label>
      </Show>
      <KSelect.Trigger
        class="zylem-field zylem-select-trigger"
        aria-label={props.label}
      >
        <KSelect.Value<SelectOption> class="zylem-select-value">
          {(state) => state.selectedOption()?.label}
        </KSelect.Value>
        <KSelect.Icon class="zylem-select-icon">▼</KSelect.Icon>
      </KSelect.Trigger>
      <KSelect.Portal>
        <KSelect.Content class="zylem-select-content">
          <KSelect.Listbox class="zylem-select-listbox zylem-scroll" />
        </KSelect.Content>
      </KSelect.Portal>
    </KSelect.Root>
  );
}
