import { DropdownMenu as KDropdownMenu } from '@kobalte/core';
import Check from 'lucide-solid/icons/check';
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
  /**
   * Render as a checkable item showing this state. Selecting it still calls
   * `onSelect`; the owner decides what the new state is (a plain toggle, or
   * one-of-many the way a stage picker works).
   */
  checked?: boolean;
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
 * The rows of a menu. Shared by `DropdownMenu` and `Menubar`, whose Kobalte
 * parts are the same underlying menu primitives, so it may be rendered inside
 * either one's content.
 *
 * A menu with any checkable row reserves the check column on every row so
 * labels line up.
 */
export function MenuItems(props: { items: DropdownMenuItemConfig[] }) {
  const hasChecks = () => props.items.some((item) => item.checked !== undefined);

  const body = (item: DropdownMenuItemConfig) => (
    <>
      <Show when={hasChecks()}>
        <span class="zylem-dropdown-check" aria-hidden="true">
          <Show when={item.checked !== undefined}>
            <KDropdownMenu.ItemIndicator>
              <Check />
            </KDropdownMenu.ItemIndicator>
          </Show>
        </span>
      </Show>
      <span class="zylem-dropdown-label">{item.label}</span>
      <Show when={item.shortcut}>
        <span class="zylem-dropdown-shortcut">{item.shortcut}</span>
      </Show>
    </>
  );

  const itemClass = (item: DropdownMenuItemConfig) =>
    item.danger ? 'zylem-dropdown-item zylem-dropdown-item--danger' : 'zylem-dropdown-item';

  return (
    <For each={props.items}>
      {(item) => (
        <>
          <Show when={item.separatorAbove}>
            <KDropdownMenu.Separator class="zylem-dropdown-separator" />
          </Show>
          <Show
            when={item.checked !== undefined}
            fallback={
              <KDropdownMenu.Item
                class={itemClass(item)}
                disabled={item.disabled}
                onSelect={item.onSelect}
              >
                {body(item)}
              </KDropdownMenu.Item>
            }
          >
            <KDropdownMenu.CheckboxItem
              class={itemClass(item)}
              checked={item.checked}
              disabled={item.disabled}
              onSelect={item.onSelect}
            >
              {body(item)}
            </KDropdownMenu.CheckboxItem>
          </Show>
        </>
      )}
    </For>
  );
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
              <MenuItems items={props.items} />
            </KDropdownMenu.Content>
          </KDropdownMenu.Portal>
        )}
      </Show>
    </KDropdownMenu.Root>
  );
}
