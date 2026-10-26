import { For, Show, type Component } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { MenuButton, type MenuButtonProps } from '../MenuButton/MenuButton';
import { ToolbarButton } from '../ToolbarButton/ToolbarButton';

export interface ToolbarDropdownItem {
  id: string;
  label: string;
  /** Glyph for the face and for this row in the menu. */
  icon: Component<{ class?: string }>;
}

export interface ToolbarDropdownMenuProps {
  /** Choices. The face shows whichever matches `value`. */
  items: readonly ToolbarDropdownItem[];
  value: string;
  onChange: (id: string) => void;
  /** Where the menu opens. Defaults to dropping down from the face. */
  placement?: MenuButtonProps['placement'];
}

/**
 * A toolbar button that shows the current choice and opens a vertical menu of
 * the others. The face is the selected item; the rows are plain icon buttons,
 * and picking one updates the face and closes the menu.
 */
export function ToolbarDropdownMenu(props: ToolbarDropdownMenuProps) {
  const current = () =>
    props.items.find((item) => item.id === props.value) ?? props.items[0];

  return (
    <Show when={current()} keyed>
      {(item) => (
        <MenuButton
          label={item.label}
          selected
          placement={props.placement ?? 'bottom-start'}
          menu={(close) => (
            <div class="zylem-menu-button__stack">
              <For each={props.items}>
                {(entry) => (
                  <ToolbarButton
                    label={entry.label}
                    onClick={() => {
                      props.onChange(entry.id);
                      close();
                    }}
                  >
                    <Dynamic component={entry.icon} class="zylem-icon" />
                  </ToolbarButton>
                )}
              </For>
            </div>
          )}
        >
          <Dynamic component={item.icon} class="zylem-icon" />
        </MenuButton>
      )}
    </Show>
  );
}
