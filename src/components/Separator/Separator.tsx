import { Separator as KSeparator } from '@kobalte/core';

export interface SeparatorProps {
  orientation?: 'horizontal' | 'vertical';
  class?: string;
}

/**
 * HyperGlass separator: soft electric-blue gradient rule.
 */
export function Separator(props: SeparatorProps) {
  return (
    <KSeparator.Root
      class={props.class ? `zylem-separator ${props.class}` : 'zylem-separator'}
      orientation={props.orientation}
    />
  );
}
