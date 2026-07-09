import { Tooltip as KTooltip } from '@kobalte/core';
import type { JSX } from 'solid-js';

export interface TooltipProps {
  /** Tooltip body. */
  content: JSX.Element;
  /** Trigger element(s). */
  children: JSX.Element;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  openDelay?: number;
}

/**
 * HyperGlass tooltip: small floating glass sheet.
 */
export function Tooltip(props: TooltipProps) {
  return (
    <KTooltip.Root placement={props.placement} openDelay={props.openDelay ?? 400}>
      <KTooltip.Trigger as="span">{props.children}</KTooltip.Trigger>
      <KTooltip.Portal>
        <KTooltip.Content class="zylem-tooltip">
          {props.content}
        </KTooltip.Content>
      </KTooltip.Portal>
    </KTooltip.Root>
  );
}
