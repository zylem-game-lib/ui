import { Show } from 'solid-js';
import type { JSX } from 'solid-js';

export interface EmptyStateProps {
  title?: JSX.Element;
  children?: JSX.Element;
  /** Optional action (e.g. a Button). */
  action?: JSX.Element;
  class?: string;
}

/**
 * HyperGlass empty state: dashed glass placeholder card for empty lists and
 * unbuilt modes.
 */
export function EmptyState(props: EmptyStateProps) {
  return (
    <div
      class={
        props.class ? `zylem-empty-state ${props.class}` : 'zylem-empty-state'
      }
    >
      <Show when={props.title}>
        <div class="zylem-empty-state-title">{props.title}</div>
      </Show>
      <Show when={props.children}>
        <div class="zylem-empty-state-message">{props.children}</div>
      </Show>
      {props.action}
    </div>
  );
}
