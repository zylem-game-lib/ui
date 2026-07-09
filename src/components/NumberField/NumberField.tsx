import { NumberField as KNumberField } from '@kobalte/core';
import { Show } from 'solid-js';

export interface NumberFieldProps {
  label?: string;
  error?: string;
  value?: number;
  onChange?: (value: number) => void;
  minValue?: number;
  maxValue?: number;
  step?: number;
  disabled?: boolean;
  placeholder?: string;
  name?: string;
  class?: string;
}

/**
 * HyperGlass number field: inset glass input with square jewel steppers.
 */
export function NumberField(props: NumberFieldProps) {
  return (
    <KNumberField.Root
      class={props.class ? `zylem-field-root ${props.class}` : 'zylem-field-root'}
      rawValue={props.value}
      onRawValueChange={(value) => {
        if (props.onChange && !Number.isNaN(value)) props.onChange(value);
      }}
      minValue={props.minValue}
      maxValue={props.maxValue}
      step={props.step}
      disabled={props.disabled}
      name={props.name}
      validationState={props.error ? 'invalid' : 'valid'}
    >
      <Show when={props.label}>
        <KNumberField.Label class="zylem-field-label">
          {props.label}
        </KNumberField.Label>
      </Show>
      <div class="zylem-numberfield-group">
        <KNumberField.Input
          class="zylem-field zylem-numberfield-input"
          placeholder={props.placeholder}
        />
        <KNumberField.IncrementTrigger
          class="zylem-numberfield-stepper zylem-numberfield-stepper--up"
          aria-label="Increment"
        >
          ▲
        </KNumberField.IncrementTrigger>
        <KNumberField.DecrementTrigger
          class="zylem-numberfield-stepper zylem-numberfield-stepper--down"
          aria-label="Decrement"
        >
          ▼
        </KNumberField.DecrementTrigger>
      </div>
      <Show when={props.error}>
        <KNumberField.ErrorMessage class="zylem-field-error">
          {props.error}
        </KNumberField.ErrorMessage>
      </Show>
    </KNumberField.Root>
  );
}
