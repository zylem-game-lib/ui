import { Button as KButton, Tooltip as KTooltip } from '@kobalte/core';
import { Show, createSignal, onMount, type JSX } from 'solid-js';
import { useLayer } from '../../layers';

export interface ToolbarButtonProps {
  label: string;
  onClick?: (event: MouseEvent) => void;
  /**
   * The selected look alone, for a button whose label already says its state
   * (Play / Pause). Live green. For a toggle with a constant label, use `on`.
   * With `danger`, the same state is the danger jewel instead.
   */
  selected?: boolean;
  /**
   * Draw `selected` as the danger jewel instead of live green. The button stays
   * ordinary glass until it is selected. Only Delete uses this.
   */
  danger?: boolean;
  /**
   * Checkbox-like toggle. Electric blue while on, and exposed as `aria-pressed`.
   * Pass `false` for a toggle that is off so the button still announces itself.
   */
  on?: boolean;
  /**
   * Toggle drawn as `on`, unless `selected` is also set, which keeps the
   * live-green jewel. Prefer `on` for new toggles.
   */
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
 * `selected` is the live-green jewel. `danger` swaps that jewel for the
 * danger one while selected. `on` is the electric-blue toggle.
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
          aria-pressed={props.on !== undefined ? props.on : props.pressed}
          onClick={props.onClick}
          disabled={props.disabled}
          class={
            props.class
              ? `zylem-toolbar-btn ${props.class}`
              : 'zylem-toolbar-btn'
          }
          data-selected={props.selected && !props.danger ? '' : undefined}
          data-danger={props.selected && props.danger ? '' : undefined}
          data-on={props.on || (props.pressed && !props.selected) ? '' : undefined}
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
