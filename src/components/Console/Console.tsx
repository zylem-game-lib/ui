import { Show } from 'solid-js';
import type { JSX } from 'solid-js';
import { Button } from '../Button/Button';

export interface ConsoleProps {
  /** Console text content. */
  value: string;
  /** Editable textarea input handler; omit for read-only display. */
  onInput?: (value: string) => void;
  onClear?: () => void;
  readOnly?: boolean;
  class?: string;
  /** Extra action buttons rendered next to Clear. */
  actions?: JSX.Element;
}

/**
 * HyperGlass console: dark low-gloss terminal field with a floating Clear
 * action.
 */
export function Console(props: ConsoleProps) {
  return (
    <div
      class={
        props.class
          ? `zylem-console-container ${props.class}`
          : 'zylem-console-container'
      }
    >
      <div class="zylem-console-wrapper">
        <textarea
          class="zylem-console zylem-scroll"
          value={props.value}
          spellcheck={false}
          readOnly={props.readOnly || !props.onInput}
          onInput={(event) => props.onInput?.(event.currentTarget.value)}
        />
        <Show when={props.onClear || props.actions}>
          <div class="zylem-console-actions">
            {props.actions}
            <Show when={props.onClear}>
              <Button size="sm" variant="ghost" onClick={() => props.onClear?.()}>
                Clear
              </Button>
            </Show>
          </div>
        </Show>
      </div>
    </div>
  );
}
