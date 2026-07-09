import { Button as KButton, Tooltip as KTooltip } from '@kobalte/core';
import type { JSX } from 'solid-js';

export interface ToolbarButtonProps {
  label: string;
  onClick?: (event: MouseEvent) => void;
  selected?: boolean;
  disabled?: boolean;
  children: JSX.Element;
  class?: string;
}

/**
 * HyperGlass toolbar button: square glass icon button with a tooltip.
 * Selected state renders as a live-green jewel.
 */
export function ToolbarButton(props: ToolbarButtonProps) {
  return (
    <KTooltip.Root openDelay={400}>
      <KTooltip.Trigger as="span">
        <KButton.Root
          aria-label={props.label}
          onClick={props.onClick}
          disabled={props.disabled}
          class={
            props.class
              ? `zylem-toolbar-btn ${props.class}`
              : 'zylem-toolbar-btn'
          }
          data-selected={props.selected ? '' : undefined}
        >
          {props.children}
        </KButton.Root>
      </KTooltip.Trigger>
      <KTooltip.Portal>
        <KTooltip.Content class="zylem-tooltip">
          {props.label}
        </KTooltip.Content>
      </KTooltip.Portal>
    </KTooltip.Root>
  );
}
