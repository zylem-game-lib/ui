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
 * HyperGlass tooltip: small floating glass sheet, portaled above page chrome
 * so it is not trapped by local stacking contexts (grids, panels, etc.).
 */
export function Tooltip(props: TooltipProps) {
  return (
    <KTooltip.Root placement={props.placement} openDelay={props.openDelay ?? 400}>
      <KTooltip.Trigger
        as="span"
        style={{ display: 'flex', width: '100%', height: '100%', 'min-width': 0 }}
      >
        {props.children}
      </KTooltip.Trigger>
      <KTooltip.Portal>
        <KTooltip.Content class="zylem-tooltip">
          {props.content}
        </KTooltip.Content>
      </KTooltip.Portal>
    </KTooltip.Root>
  );
}
