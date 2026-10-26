import { Button as KButton, Tooltip as KTooltip } from '@kobalte/core';
import { Show, createSignal, onMount, type JSX } from 'solid-js';
import { useLayer } from '../../layers';

export interface ToolbarButtonProps {
  label: string;
  onClick?: (event: MouseEvent) => void;
  /**
   * The selected look alone, for a button whose label already says its state
   * (Play / Pause). For a toggle with a constant label, use `pressed`.
   */
  selected?: boolean;
  /** Makes the button a toggle: the state is exposed as `aria-pressed` and drawn as selected. */
  pressed?: boolean;
  disabled?: boolean;
  children: JSX.Element;
  class?: string;
}

/**
 * A floating popup (menu, popover) wraps its panel in a popper positioner.
 * Tooltips inside one open beside the button, because a vertical stack has no
 * free room above or below an item.
 */
function insidePopup(element: Element | undefined): boolean {
  return Boolean(element?.closest('[data-popper-positioner]'));
}

/**
 * HyperGlass toolbar button: square glass icon button with a tooltip.
 * Selected and pressed states render as a live-green jewel.
 *
 * The tooltip portals into the layer container for its own tree, so it stays
 * styled when the toolbar lives inside a web component's shadow root.
 */
export function ToolbarButton(props: ToolbarButtonProps) {
  const layer = useLayer('tooltip');
  const [beside, setBeside] = createSignal(false);
  let trigger: HTMLElement | undefined;

  const syncPlacement = () => setBeside(insidePopup(trigger));
  onMount(syncPlacement);

  return (
    <KTooltip.Root
      openDelay={400}
      placement={beside() ? 'right' : undefined}
      flip={beside() ? 'left' : undefined}
      gutter={beside() ? 8 : undefined}
    >
      <KTooltip.Trigger
        as="span"
        ref={(element: HTMLElement) => {
          trigger = element;
          layer.anchorRef(element);
        }}
        onPointerEnter={syncPlacement}
      >
        <KButton.Root
          aria-label={props.label}
          aria-pressed={props.pressed}
          onClick={props.onClick}
          disabled={props.disabled}
          class={
            props.class
              ? `zylem-toolbar-btn ${props.class}`
              : 'zylem-toolbar-btn'
          }
          data-selected={props.selected || props.pressed ? '' : undefined}
        >
          {props.children}
        </KButton.Root>
      </KTooltip.Trigger>
      <Show when={layer.mount()} keyed>
        {(mount) => (
          <KTooltip.Portal mount={mount}>
            <KTooltip.Content
              class={beside() ? 'zylem-tooltip zylem-tooltip--front' : 'zylem-tooltip'}
            >
              {props.label}
            </KTooltip.Content>
          </KTooltip.Portal>
        )}
      </Show>
    </KTooltip.Root>
  );
}
