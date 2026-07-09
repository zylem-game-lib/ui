import { TextField as KTextField } from '@kobalte/core';
import { Show, splitProps } from 'solid-js';
import type { JSX } from 'solid-js';

export interface TextFieldProps {
  label?: string;
  error?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onInput?: JSX.EventHandlerUnion<HTMLInputElement | HTMLTextAreaElement, InputEvent>;
  type?: string;
  name?: string;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  multiline?: boolean;
  rows?: number;
  class?: string;
  autofocus?: boolean;
  onKeyDown?: JSX.EventHandlerUnion<HTMLInputElement | HTMLTextAreaElement, KeyboardEvent>;
}

/**
 * HyperGlass text field: inset glass input with an uppercase HyperCard-style
 * label. Set `multiline` for a textarea.
 */
export function TextField(props: TextFieldProps) {
  const [local] = splitProps(props, ['label', 'error', 'multiline', 'class']);

  return (
    <KTextField.Root
      class={local.class ? `zylem-field-root ${local.class}` : 'zylem-field-root'}
      value={props.value}
      onChange={props.onChange}
      name={props.name}
      disabled={props.disabled}
      readOnly={props.readOnly}
      required={props.required}
      validationState={local.error ? 'invalid' : 'valid'}
    >
      <Show when={local.label}>
        <KTextField.Label class="zylem-field-label">
          {local.label}
        </KTextField.Label>
      </Show>
      <Show
        when={local.multiline}
        fallback={
          <KTextField.Input
            class="zylem-field zylem-textfield-input"
            type={props.type ?? 'text'}
            placeholder={props.placeholder}
            autofocus={props.autofocus}
            onInput={props.onInput as JSX.EventHandlerUnion<HTMLInputElement, InputEvent>}
            onKeyDown={props.onKeyDown as JSX.EventHandlerUnion<HTMLInputElement, KeyboardEvent>}
          />
        }
      >
        <KTextField.TextArea
          class="zylem-field zylem-textfield-textarea"
          placeholder={props.placeholder}
          rows={props.rows}
          autofocus={props.autofocus}
          onInput={props.onInput as JSX.EventHandlerUnion<HTMLTextAreaElement, InputEvent>}
          onKeyDown={props.onKeyDown as JSX.EventHandlerUnion<HTMLTextAreaElement, KeyboardEvent>}
        />
      </Show>
      <Show when={local.error}>
        <KTextField.ErrorMessage class="zylem-field-error">
          {local.error}
        </KTextField.ErrorMessage>
      </Show>
    </KTextField.Root>
  );
}
