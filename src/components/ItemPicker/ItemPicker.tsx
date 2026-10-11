import { For, Show, createMemo, createSignal, createUniqueId, type JSX } from 'solid-js';
import { SearchInput } from '../SearchInput/SearchInput';
import { filterItems, groupItems, type PickerItem } from './filter-items';

export interface ItemPickerProps<T extends PickerItem = PickerItem> {
  items: T[];
  onSelect: (item: T) => void;
  /**
   * Marked as the current choice. Given at all (`null` for none), the items
   * become toggles that expose it as `aria-pressed`.
   */
  selectedId?: string | null | undefined;
  /** Hide the search field for a list short enough not to need one. */
  searchable?: boolean | undefined;
  searchPlaceholder?: string | undefined;
  /**
   * Focus the search field on mount. On by default: the picker is opened
   * deliberately, so typing straight into it is the expected behaviour.
   */
  autoFocus?: boolean | undefined;
  /** Shown when `items` is empty, as opposed to filtered down to nothing. */
  emptyMessage?: JSX.Element | undefined;
  class?: string | undefined;
}

/**
 * Searchable, grouped list of choices — the picker half of a MenuButton, and
 * usable on its own.
 *
 * Icons arrive as markup strings rather than components because the common case
 * is a list supplied at runtime by something that does not share an icon library
 * with the UI (the editor's entity catalog comes over a bridge from the running
 * game, for instance).
 */
export function ItemPicker<T extends PickerItem>(props: ItemPickerProps<T>) {
  const [query, setQuery] = createSignal('');

  const searchable = () => props.searchable !== false;
  const groups = createMemo(() => groupItems(filterItems(props.items, query())));
  /** Items are toggles only when the caller tracks a choice (`null` is "none yet"). */
  const pressed = (item: T) =>
    props.selectedId === undefined ? undefined : props.selectedId === item.id;

  return (
    <div class={props.class ? `zylem-picker ${props.class}` : 'zylem-picker'}>
      <Show when={searchable()}>
        <SearchInput
          class="zylem-picker__search"
          value={query()}
          onInput={setQuery}
          placeholder={props.searchPlaceholder ?? 'Search…'}
          ref={(element) => {
            if (props.autoFocus === false) return;
            // Deferred: the element is not focusable until it is in the document,
            // which for a portaled panel is after this ref runs.
            queueMicrotask(() => element.focus());
          }}
        />
      </Show>

      <Show
        when={props.items.length}
        fallback={
          <p class="zylem-picker__empty">
            {props.emptyMessage ?? 'Nothing to choose from.'}
          </p>
        }
      >
        <Show
          when={groups().length}
          fallback={
            <p class="zylem-picker__empty">No matches for “{query()}”.</p>
          }
        >
          <div class="zylem-picker__groups zylem-scroll">
            <For each={groups()}>
              {(group) => {
                const titleId = createUniqueId();
                return (
                  <div class="zylem-picker__group" role="group" aria-labelledby={titleId}>
                    <div id={titleId} class="zylem-picker__group-title">
                      {group.group}
                    </div>
                    <For each={group.items}>
                      {(item) => (
                        <button
                          type="button"
                          class="zylem-picker__item"
                          disabled={item.disabled}
                          data-selected={
                            props.selectedId === item.id ? '' : undefined
                          }
                          aria-pressed={pressed(item)}
                          title={item.description}
                          onClick={() => props.onSelect(item)}
                        >
                          <Show when={item.icon}>
                            {(icon) => (
                              <span
                                class="zylem-picker__item-glyph"
                                aria-hidden="true"
                                // Markup from the caller's own registry, in the
                                // caller's own realm; not a new trust boundary.
                                innerHTML={icon()}
                              />
                            )}
                          </Show>
                          <span class="zylem-picker__item-label">{item.label}</span>
                        </button>
                      )}
                    </For>
                  </div>
                );
              }}
            </For>
          </div>
        </Show>
      </Show>
    </div>
  );
}
