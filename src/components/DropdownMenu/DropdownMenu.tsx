import { DropdownMenu as KDropdownMenu } from '@kobalte/core';
import { For, Show } from 'solid-js';
import type { JSX } from 'solid-js';
import { createDismissGuard, useLayer } from '../../layers';

export interface DropdownMenuItemConfig {
  id: string;
  label: JSX.Element;
  onSelect?: () => void;
  shortcut?: string;
  disabled?: boolean;
  danger?: boolean;
  /** Render a separator line above this item. */
  separatorAbove?: boolean;
}

export interface DropdownMenuProps {
  /** Trigger element; rendered inside a Kobalte trigger button. */
  trigger: JSX.Element;
  items: DropdownMenuItemConfig[];
  placement?: 'bottom-start' | 'bottom-end' | 'bottom' | 'top-start' | 'top-end' | 'top' | 'right-start' | 'left-start';
  /** Class applied to the trigger button. */
  triggerClass?: string;
}

/**
 * HyperGlass dropdown menu: floating glass sheet with highlight rows.
 *
 * Portals into the layer container for its tree at the `menu` tier, so it opens
 * over panels and dialogs and stays styled inside a shadow root.
 */
export function DropdownMenu(props: DropdownMenuProps) {
  const layer = useLayer('menu');
  const dismiss = createDismissGuard();

  const items = () => (
    <For each={props.items}>
      {(item) => (
        <>
          <Show when={item.separatorAbove}>
            <KDropdownMenu.Separator class="zylem-dropdown-separator" />
          </Show>
          <KDropdownMenu.Item
            class={
              item.danger
                ? 'zylem-dropdown-item zylem-dropdown-item--danger'
                : 'zylem-dropdown-item'
            }
            disabled={item.disabled}
            onSelect={item.onSelect}
          >
            <span>{item.label}</span>
            <Show when={item.shortcut}>
              <span class="zylem-dropdown-shortcut">{item.shortcut}</span>
            </Show>
          </KDropdownMenu.Item>
        </>
      )}
    </For>
  );

  return (
    <KDropdownMenu.Root placement={props.placement ?? 'bottom-start'}>
      <KDropdownMenu.Trigger ref={layer.anchorRef} class={props.triggerClass}>
        {props.trigger}
      </KDropdownMenu.Trigger>
      <Show when={layer.mount()} keyed>
        {(mount) => (
          <KDropdownMenu.Portal mount={mount}>
            <KDropdownMenu.Content
              ref={dismiss.ref}
              class="zylem-dropdown-content"
              onInteractOutside={dismiss.onInteractOutside}
            >
              {items()}
            </KDropdownMenu.Content>
          </KDropdownMenu.Portal>
        )}
      </Show>
    </KDropdownMenu.Root>
  );
}
