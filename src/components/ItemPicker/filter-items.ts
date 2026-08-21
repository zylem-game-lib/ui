/**
 * Search and grouping for {@link ItemPicker}, kept pure and separate so the
 * matching rules can be tested and reused without rendering anything.
 */

/**
 * Optional fields accept an explicit `undefined` so callers compiled with
 * `exactOptionalPropertyTypes` can map their own optional data straight across
 * without narrowing every field first.
 */
export interface PickerItem {
  id: string;
  label: string;
  /** Heading this item is filed under. Ungrouped items fall under `Other`. */
  group?: string | undefined;
  /**
   * Leading glyph. A string is treated as inline SVG or HTML markup, which is
   * what a host that does not share an icon library can realistically supply.
   */
  icon?: string | undefined;
  /** Shown as the row's title attribute. */
  description?: string | undefined;
  /** Extra search terms that are not visible on the row. */
  tags?: string[] | undefined;
  disabled?: boolean | undefined;
}

export interface PickerGroup<T extends PickerItem = PickerItem> {
  group: string;
  items: T[];
}

/** Heading for items that declare no group. */
export const UNGROUPED_LABEL = 'Other';

/**
 * Filter by a query matched against label, id, and tags. An empty or
 * whitespace-only query returns everything, so an unopened search box is not a
 * filter.
 */
export function filterItems<T extends PickerItem>(items: T[], query: string): T[] {
  const needle = query.trim().toLowerCase();
  if (!needle) return items;

  return items.filter((item) => {
    if (item.label.toLowerCase().includes(needle)) return true;
    if (item.id.toLowerCase().includes(needle)) return true;
    return item.tags?.some((tag) => tag.toLowerCase().includes(needle)) ?? false;
  });
}

/**
 * Bucket items under their group.
 *
 * Order comes from the input rather than the alphabet, for both the groups and
 * the items within them: the caller has already decided what should be near the
 * top, and sorting here would throw that away.
 */
export function groupItems<T extends PickerItem>(items: T[]): PickerGroup<T>[] {
  const groups: PickerGroup<T>[] = [];
  const byName = new Map<string, T[]>();

  for (const item of items) {
    const name = item.group ?? UNGROUPED_LABEL;
    let bucket = byName.get(name);
    if (!bucket) {
      bucket = [];
      byName.set(name, bucket);
      groups.push({ group: name, items: bucket });
    }
    bucket.push(item);
  }

  return groups;
}
