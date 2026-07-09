import type { JSX } from 'solid-js';

export interface KbdProps {
  children: JSX.Element;
  class?: string;
}

/**
 * HyperGlass keyboard hint: tiny beveled glass key cap for shortcut hints.
 */
export function Kbd(props: KbdProps) {
  return (
    <kbd class={props.class ? `zylem-kbd ${props.class}` : 'zylem-kbd'}>
      {props.children}
    </kbd>
  );
}
