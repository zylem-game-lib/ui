import { DropdownMenu as KDropdownMenu } from '@kobalte/core';
import { For, Show } from 'solid-js';
import type { JSX } from 'solid-js';

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
 */
export function DropdownMenu(props: DropdownMenuProps) {
  return (
    <KDropdownMenu.Root placement={props.placement ?? 'bottom-start'}>
      <KDropdownMenu.Trigger class={props.triggerClass}>
        {props.trigger}
      </KDropdownMenu.Trigger>
      <KDropdownMenu.Portal>
        <KDropdownMenu.Content class="zylem-dropdown-content">
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
        </KDropdownMenu.Content>
      </KDropdownMenu.Portal>
    </KDropdownMenu.Root>
  );
}
