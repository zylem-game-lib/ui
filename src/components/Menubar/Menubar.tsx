import { Menubar as KMenubar } from '@kobalte/core';
import { For, Show } from 'solid-js';
import type { JSX } from 'solid-js';
import { createDismissGuard, useLayer } from '../../layers';
import { MenuItems, type DropdownMenuItemConfig } from '../DropdownMenu/DropdownMenu';

export interface MenubarMenuConfig {
  id: string;
  label: JSX.Element;
  /**
   * Rows of the menu. A function is read each time the menu renders, so a
   * menu whose rows depend on app state (the open stages, the dirty flag) can
   * hand over its accessor instead of rebuilding the whole bar on every change.
   */
  items: DropdownMenuItemConfig[] | (() => DropdownMenuItemConfig[]);
  disabled?: boolean;
}

export interface MenubarProps {
  menus: MenubarMenuConfig[];
  class?: string;
  'aria-label'?: string;
  /** Class applied to every trigger button. */
  triggerClass?: string;
}

/**
 * Desktop-style menu bar: a row of flat text triggers, one open at a time.
 * Moving the pointer onto a sibling trigger while a menu is open swaps menus,
 * and the arrow keys walk the bar — behaviour that comes from Kobalte's
 * Menubar. Each menu is a `DropdownMenu` sheet, portaled at the `menu` tier.
 */
export function Menubar(props: MenubarProps) {
  const layer = useLayer('menu');

  return (
    <KMenubar.Root
      ref={layer.anchorRef}
      class={props.class ? `zylem-menubar ${props.class}` : 'zylem-menubar'}
      aria-label={props['aria-label']}
    >
      <For each={props.menus}>
        {(menu) => {
          const dismiss = createDismissGuard();
          const items = () => (typeof menu.items === 'function' ? menu.items() : menu.items);
          return (
            <KMenubar.Menu>
              <KMenubar.Trigger
                class={
                  props.triggerClass
                    ? `zylem-menubar-trigger ${props.triggerClass}`
                    : 'zylem-menubar-trigger'
                }
                disabled={menu.disabled}
              >
                {menu.label}
              </KMenubar.Trigger>
              <Show when={layer.mount()} keyed>
                {(mount) => (
                  <KMenubar.Portal mount={mount}>
                    <KMenubar.Content
                      ref={dismiss.ref}
                      class="zylem-dropdown-content zylem-menubar-content"
                      onInteractOutside={dismiss.onInteractOutside}
                    >
                      <MenuItems items={items()} />
                    </KMenubar.Content>
                  </KMenubar.Portal>
                )}
              </Show>
            </KMenubar.Menu>
          );
        }}
      </For>
    </KMenubar.Root>
  );
}
