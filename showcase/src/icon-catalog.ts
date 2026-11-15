import type { Component } from 'solid-js';
import {
  BEHAVIOR_ICONS,
  CAMERA_ICONS,
  CAMERA_VIEWS,
  Dock,
  GENRE_ICONS,
} from '../../src/icons';
import { USED_LUCIDE_ICONS } from './used-icons';

export const ICON_CATEGORIES = ['Genres', 'Behaviors', 'Camera', 'Interface', 'Lucide'] as const;
export type IconCategory = (typeof ICON_CATEGORIES)[number];

export interface ShowcaseIcon {
  id: string;
  label: string;
  category: IconCategory;
  source: string;
  importCode: string;
  description: string;
  searchText: string;
  Icon: Component<{ size?: number }>;
}

function entry(item: Omit<ShowcaseIcon, 'searchText'>, aliases: readonly string[] = []): ShowcaseIcon {
  return {
    ...item,
    searchText: [item.id, item.label, item.category, item.source, item.importCode, ...aliases].join(' ').toLowerCase(),
  };
}

const cameraExport = (name: string) =>
  name.split('-').map((word) => word[0].toUpperCase() + word.slice(1)).join('');

/** Only icons actually shipped by Zylem or imported by this repository. */
export const ICON_CATALOG: readonly ShowcaseIcon[] = [
  ...[...GENRE_ICONS, ...BEHAVIOR_ICONS].map((item) => entry({
    id: item.key,
    label: item.label,
    category: item.category === 'genres' ? 'Genres' : 'Behaviors',
    source: '@zylem/ui/icons',
    importCode: `import { ${item.exportName} } from '@zylem/ui/icons';`,
    description: item.description,
    Icon: item.Icon,
  }, item.aliases)),
  ...[...CAMERA_ICONS, ...CAMERA_VIEWS].map((item) => entry({
    id: item.name,
    label: item.label,
    category: 'Camera',
    source: '@zylem/ui/icons',
    importCode: `import { ${cameraExport(item.name)} } from '@zylem/ui/icons';`,
    description: 'Zylem camera and view glyph.',
    Icon: item.Icon,
  })),
  entry({
    id: 'dock',
    label: 'Dock',
    category: 'Interface',
    source: '@zylem/ui/icons',
    importCode: "import { Dock } from '@zylem/ui/icons';",
    description: 'Window docking control.',
    Icon: Dock,
  }),
  ...USED_LUCIDE_ICONS.map((item) => entry({
    id: `lucide/${item.name}`,
    label: item.label,
    category: 'Lucide',
    source: 'lucide-solid',
    importCode: `import Icon from 'lucide-solid/icons/${item.name}';`,
    description: 'Lucide icon used by the library or showcase.',
    Icon: item.Icon,
  })),
];

export function filterIcons(query: string, category: string): ShowcaseIcon[] {
  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  return ICON_CATALOG.filter((item) =>
    (category === 'All' || category === item.category) &&
    terms.every((term) => item.searchText.includes(term)),
  );
}
