import { TextField as KTextField } from '@kobalte/core';
import { createEffect, createSignal, on, Show, splitProps } from 'solid-js';
import type { JSX } from 'solid-js';

export interface TextFieldProps {
  label?: string;
  error?: string;
  placeholder?: string;
  value?: string;
  /** Fires on every edit. */
  onChange?: (value: string) => void;
  /**
   * Fires on blur and, for single-line fields, on Enter. While set, the field
   * edits a local draft and only reports it here, so a parent that normalises
   * or rejects values (rename, comma lists, keys) does not fight the typing;
   * the draft snaps back to `value` after each commit.
   */
  onCommit?: (value: string) => void;
  onInput?: JSX.EventHandlerUnion<HTMLInputElement | HTMLTextAreaElement, InputEvent>;
  onBlur?: JSX.EventHandlerUnion<HTMLInputElement | HTMLTextAreaElement, FocusEvent>;
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

function callHandler<T, E extends Event>(
  handler: JSX.EventHandlerUnion<T, E> | undefined,
  event: E & { currentTarget: T; target: Element },
) {
  if (!handler) return;
  if (typeof handler === 'function') handler(event);
  else handler[0](handler[1], event);
}

/**
 * HyperGlass text field: inset glass input with an uppercase HyperCard-style
 * label. Set `multiline` for a textarea.
 */
export function TextField(props: TextFieldProps) {
  const [local] = splitProps(props, ['label', 'error', 'multiline', 'class']);
  const [draft, setDraft] = createSignal(props.value ?? '');
  createEffect(on(() => props.value, (value) => setDraft(value ?? '')));

  const value = () => (props.onCommit ? draft() : props.value);
  const change = (next: string) => {
    setDraft(next);
    props.onChange?.(next);
  };
  const commit = () => {
    if (!props.onCommit) return;
    props.onCommit(draft());
    setDraft(props.value ?? '');
  };

  const blur = (event: FocusEvent & { currentTarget: HTMLInputElement | HTMLTextAreaElement; target: Element }) => {
    callHandler(props.onBlur, event);
    commit();
  };
  const keyDown = (
    event: KeyboardEvent & { currentTarget: HTMLInputElement | HTMLTextAreaElement; target: Element },
  ) => {
    callHandler(props.onKeyDown, event);
    if (event.key === 'Enter' && !local.multiline && !event.defaultPrevented) commit();
  };

  return (
    <KTextField.Root
      class={local.class ? `zylem-field-root ${local.class}` : 'zylem-field-root'}
      value={value()}
      onChange={change}
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
            onBlur={blur}
            onKeyDown={keyDown}
          />
        }
      >
        <KTextField.TextArea
          class="zylem-field zylem-textfield-textarea"
          placeholder={props.placeholder}
          rows={props.rows}
          autofocus={props.autofocus}
          onInput={props.onInput as JSX.EventHandlerUnion<HTMLTextAreaElement, InputEvent>}
          onBlur={blur}
          onKeyDown={keyDown}
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
