import { NumberField as KNumberField } from '@kobalte/core';
import ChevronDown from 'lucide-solid/icons/chevron-down';
import ChevronUp from 'lucide-solid/icons/chevron-up';
import { createEffect, createSignal, on, onCleanup, Show } from 'solid-js';

export interface NumberFieldProps {
  label?: string;
  /** Accessible name when there is no visible `label`. */
  'aria-label'?: string;
  error?: string;
  value?: number;
  /** Fires on every edit. */
  onChange?: (value: number) => void;
  /**
   * Fires on blur, Enter, and a stepper press. While set, typing stays in the
   * field and only this reports it, so a parent that snaps or rounds the value
   * does not fight the typing. A draft also outlasts changes to `value`, and
   * Escape drops it; after each commit the field shows `value` again.
   */
  onCommit?: (value: number) => void;
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
  // A stepper press blurs the input before the click lands. Armed on pointer
  // down, so that blur does not commit the pre-step value, and the click commits
  // the stepped one.
  let stepper = false;
  // Enter commits, and the blur that follows it must not commit again.
  let committed = false;

  // Kobalte rewrites the input whenever `rawValue` changes, so a value that
  // moves every frame would overwrite the typing. A draft hands it `held`.
  const [drafting, setDrafting] = createSignal(false);
  let held: number | undefined;
  // A committed draft stays up until `value` changes, so the field does not
  // flash the old value while the owner's answer is on its way. One frame is
  // the limit, for an owner that rounds the commit back to the same value.
  let settling = false;
  let settleFrame = 0;

  const hold = (value: number | undefined) => {
    if (drafting() || value === undefined) return;
    held = value;
    setDrafting(true);
  };

  const stopSettling = () => {
    settling = false;
    if (settleFrame) cancelAnimationFrame(settleFrame);
    settleFrame = 0;
  };

  const release = () => {
    stopSettling();
    setDrafting(false);
  };

  createEffect(
    on(
      () => props.value,
      () => {
        if (settling) release();
      },
      { defer: true },
    ),
  );
  onCleanup(stopSettling);

  const commit = (value: number) => {
    if (!props.onCommit) return;
    if (Number.isNaN(value) || value === props.value) {
      release();
      return;
    }
    // A stepper commit has no draft yet. Held at the stepped value, the field
    // keeps showing it rather than the value it stepped from.
    hold(value);
    settling = true;
    props.onCommit(value);
    committed = true;
    if (settling) settleFrame = requestAnimationFrame(release);
  };

  const commitInput = (input: HTMLInputElement) => {
    const parsed = Number.parseFloat(input.value);
    commit(Number.isFinite(parsed) ? parsed : Number.NaN);
  };

  const armStepper = () => {
    stepper = true;
  };

  return (
    <KNumberField.Root
      class={props.class ? `zylem-field-root ${props.class}` : 'zylem-field-root'}
      rawValue={drafting() ? held : props.value}
      // Kobalte reports the parsed value on mount and after each format pass;
      // only real edits reach the owner, so a controlled form is not marked
      // dirty just by rendering.
      onRawValueChange={(value) => {
        if (Number.isNaN(value)) return;
        if (props.onCommit) {
          if (!stepper) return;
          stepper = false;
          commit(value);
          return;
        }
        if (!props.onChange || value === props.value) return;
        props.onChange(value);
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
          aria-label={props['aria-label']}
          placeholder={props.placeholder}
          onInput={() => {
            committed = false;
            if (!props.onCommit) return;
            // Typing again while a commit settles carries on with the draft, so
            // the value that lands does not overwrite the new keystrokes.
            stopSettling();
            hold(props.value);
          }}
          onBlur={(event) => {
            if (!props.onCommit || stepper || committed) {
              committed = false;
              return;
            }
            commitInput(event.currentTarget);
          }}
          onKeyDown={(event) => {
            if (!props.onCommit || event.defaultPrevented) return;
            if (event.key === 'Enter') commitInput(event.currentTarget);
            else if (event.key === 'Escape' && drafting()) {
              // Claimed, so an accordion or dialog around the field leaves this
              // Escape alone rather than collapsing or closing as well.
              event.preventDefault();
              release();
            }
          }}
        />
        <KNumberField.IncrementTrigger
          class="zylem-numberfield-stepper zylem-numberfield-stepper--up"
          aria-label="Increment"
          onPointerDown={armStepper}
          onClick={armStepper}
        >
          <ChevronUp aria-hidden="true" />
        </KNumberField.IncrementTrigger>
        <KNumberField.DecrementTrigger
          class="zylem-numberfield-stepper zylem-numberfield-stepper--down"
          aria-label="Decrement"
          onPointerDown={armStepper}
          onClick={armStepper}
        >
          <ChevronDown aria-hidden="true" />
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
