import { Show } from 'solid-js';
import type { JSX } from 'solid-js';

export type CalloutTone = 'info' | 'warning' | 'error' | 'success';

export interface CalloutProps {
  tone?: CalloutTone;
  /** Short bold lead-in before the message. */
  title?: JSX.Element;
  children: JSX.Element;
  class?: string;
}

/**
 * Inline note: a tinted strip with a coloured left rule for hints, warnings,
 * and errors that belong next to the thing they describe (a form, a footer).
 * For transient messages use `Toast`; for one-word labels use `Badge`.
 */
export function Callout(props: CalloutProps) {
  return (
    <div
      class={props.class ? `zylem-callout ${props.class}` : 'zylem-callout'}
      role={props.tone === 'error' ? 'alert' : 'note'}
      data-tone={props.tone ?? 'info'}
    >
      <Show when={props.title}>
        <span class="zylem-callout-title">{props.title}</span>
      </Show>
      <span class="zylem-callout-message">{props.children}</span>
    </div>
  );
}
