import { Show } from 'solid-js';
import type { JSX } from 'solid-js';

export type ToastTone = 'info' | 'success' | 'error';

export interface ToastProps {
  /** The message. Nothing renders while this is empty. */
  message?: JSX.Element | null | false;
  tone?: ToastTone;
  /** Edge of the positioned parent to float against. Defaults to `bottom`. */
  position?: 'top' | 'bottom';
  class?: string;
}

/**
 * Transient glass message floated over a stage (a game view, an editor
 * surface). It positions itself against the nearest positioned ancestor and
 * ignores the pointer, so it never gets in the way of what it reports on.
 *
 * Timing is the caller's: show it by passing a message and hide it by passing
 * none, which is how a store's `flashHint()` already works.
 */
export function Toast(props: ToastProps) {
  return (
    <Show when={props.message}>
      <div
        class={props.class ? `zylem-toast ${props.class}` : 'zylem-toast'}
        role="status"
        aria-live="polite"
        data-tone={props.tone}
        data-position={props.position}
      >
        {props.message}
      </div>
    </Show>
  );
}
