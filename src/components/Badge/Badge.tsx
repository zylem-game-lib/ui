import type { JSX } from 'solid-js';

export type BadgeTone = 'info' | 'warning' | 'error' | 'success' | 'neutral';

export interface BadgeProps {
  tone?: BadgeTone;
  children: JSX.Element;
  class?: string;
}

/**
 * HyperGlass badge: small beveled glass tag for statuses and counts.
 */
export function Badge(props: BadgeProps) {
  return (
    <span
      class={props.class ? `zylem-badge ${props.class}` : 'zylem-badge'}
      data-tone={props.tone ?? 'info'}
    >
      {props.children}
    </span>
  );
}
