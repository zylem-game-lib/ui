import { Tooltip as KTooltip } from '@kobalte/core';
import { Show, type JSX } from 'solid-js';
import { useLayer } from '../../layers';

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
 *
 * The portal target is resolved from the trigger rather than assumed to be
 * `document.body`, so a tooltip inside a web component's shadow root still
 * picks up the styles injected there.
 */
export function Tooltip(props: TooltipProps) {
  const layer = useLayer('tooltip');

  return (
    <KTooltip.Root placement={props.placement} openDelay={props.openDelay ?? 400}>
      <KTooltip.Trigger
        as="span"
        ref={layer.anchorRef}
        style={{ display: 'flex', width: '100%', height: '100%', 'min-width': 0 }}
      >
        {props.children}
      </KTooltip.Trigger>
      <Show when={layer.mount()}>
        {(mount) => (
          <KTooltip.Portal mount={mount()}>
            <KTooltip.Content class="zylem-tooltip">
              {props.content}
            </KTooltip.Content>
          </KTooltip.Portal>
        )}
      </Show>
    </KTooltip.Root>
  );
}
