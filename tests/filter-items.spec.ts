import { describe, expect, it } from 'vitest';

import {
  filterItems,
  groupItems,
  UNGROUPED_LABEL,
  type PickerItem,
} from '../src/components/ItemPicker/filter-items';

const catalog: PickerItem[] = [
  { id: 'box', label: 'Box', group: 'Shapes', tags: ['cube', 'primitive'] },
  { id: 'sphere', label: 'Sphere', group: 'Shapes' },
  { id: 'camera-rig', label: 'Camera Rig', group: 'Cameras' },
  { id: 'light', label: 'Point Light' },
];

describe('filterItems', () => {
  it('returns everything for an empty query', () => {
    expect(filterItems(catalog, '')).toHaveLength(4);
  });

  it('treats a whitespace-only query as empty', () => {
    // An untouched search box should not be a filter.
    expect(filterItems(catalog, '   ')).toHaveLength(4);
  });

  it('matches the label case-insensitively', () => {
    expect(filterItems(catalog, 'sPHe').map((item) => item.id)).toEqual(['sphere']);
  });

  it('matches on a substring rather than a prefix', () => {
    expect(filterItems(catalog, 'light').map((item) => item.id)).toEqual(['light']);
  });

  it('matches the id, which is often what a developer types', () => {
    expect(filterItems(catalog, 'camera-rig').map((item) => item.id)).toEqual([
      'camera-rig',
    ]);
  });

  it('matches hidden tags, so synonyms find an item', () => {
    // "cube" appears nowhere in the label, which is the point of tags.
    expect(filterItems(catalog, 'cube').map((item) => item.id)).toEqual(['box']);
  });

  it('returns nothing when there is no match', () => {
    expect(filterItems(catalog, 'zzz')).toEqual([]);
  });

  it('preserves input order among the matches', () => {
    // `box` matches through its `cube` tag, the other two through their labels;
    // a match's source must not affect where it lands in the list.
    expect(filterItems(catalog, 'e').map((item) => item.id)).toEqual([
      'box',
      'sphere',
      'camera-rig',
    ]);
  });
});

describe('groupItems', () => {
  it('buckets items under their group', () => {
    const groups = groupItems(catalog);

    expect(groups.map((group) => group.group)).toEqual([
      'Shapes',
      'Cameras',
      UNGROUPED_LABEL,
    ]);
    expect(groups[0]!.items.map((item) => item.id)).toEqual(['box', 'sphere']);
  });

  it('files an item with no group under the fallback heading', () => {
    const groups = groupItems([{ id: 'light', label: 'Point Light' }]);

    expect(groups).toHaveLength(1);
    expect(groups[0]!.group).toBe(UNGROUPED_LABEL);
  });

  it('orders groups by first appearance, not alphabetically', () => {
    // The caller has already decided what belongs near the top; sorting here
    // would throw that away.
    const groups = groupItems([
      { id: 'z', label: 'Z', group: 'Zebra' },
      { id: 'a', label: 'A', group: 'Alpha' },
    ]);

    expect(groups.map((group) => group.group)).toEqual(['Zebra', 'Alpha']);
  });

  it('reunites items of one group that are not adjacent', () => {
    const groups = groupItems([
      { id: 'a', label: 'A', group: 'One' },
      { id: 'b', label: 'B', group: 'Two' },
      { id: 'c', label: 'C', group: 'One' },
    ]);

    expect(groups).toHaveLength(2);
    expect(groups[0]!.items.map((item) => item.id)).toEqual(['a', 'c']);
  });

  it('returns nothing for an empty list', () => {
    expect(groupItems([])).toEqual([]);
  });
});
