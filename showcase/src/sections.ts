import type { Component } from 'solid-js';
import type { PickerItem } from '../../src/components';
import { Accordion } from './sections/Accordion';
import { Buttons } from './sections/Buttons';
import { Checkbox } from './sections/Checkbox';
import { Colors } from './sections/Colors';
import { Console } from './sections/Console';
import { DetachedPanel } from './sections/DetachedPanel';
import { Director } from './sections/Director';
import { Entities } from './sections/Entities';
import { FloatingPanel } from './sections/FloatingPanel';
import { HyperGlass } from './sections/HyperGlass';
import { Icons } from './sections/Icons';
import { Inputs } from './sections/Inputs';
import { Layering } from './sections/Layering';
import { Menu } from './sections/Menu';
import { MenubarSection } from './sections/Menubar';
import { Music } from './sections/Music';
import { Overlays } from './sections/Overlays';
import { PanelsCards } from './sections/PanelsCards';
import { PropertyList } from './sections/PropertyList';
import { Sidebar } from './sections/Sidebar';
import { SpacingSizing } from './sections/SpacingSizing';
import { SpriteEditor } from './sections/SpriteEditor';
import { TabsBadges } from './sections/TabsBadges';
import { Timeline } from './sections/Timeline';
import { Toggles } from './sections/Toggles';
import { Toolbar } from './sections/Toolbar';
import { Toolbox } from './sections/Toolbox';
import { Typography } from './sections/Typography';

/** One showcase page: its sidebar link, extra search terms, and the section it renders. */
export interface ShowcaseSection extends PickerItem {
  group: string;
  component: Component;
}

/**
 * Every showcase page in sidebar order. Each id matches the `id` its section
 * renders, so it doubles as the URL hash (`#buttons`) and keeps old links working.
 */
export const SECTIONS: ShowcaseSection[] = [
  { id: 'hyperglass', label: 'HyperGlass', group: 'Overview', tags: ['editor', 'composite'], component: HyperGlass },

  { id: 'colors', label: 'Colors', group: 'Foundations', tags: ['tokens', 'palette'], component: Colors },
  {
    id: 'typography',
    label: 'Typography',
    group: 'Foundations',
    tags: ['font', 'Exo 2', 'JetBrains Mono', 'time', 'units'],
    component: Typography,
  },
  {
    id: 'spacing-sizing',
    label: 'Spacing & Sizing',
    group: 'Foundations',
    tags: ['tokens', 'radius'],
    component: SpacingSizing,
  },
  { id: 'icons', label: 'Icons', group: 'Foundations', tags: ['camera', 'perspective'], component: Icons },

  {
    id: 'buttons',
    label: 'Buttons',
    group: 'Controls',
    tags: ['Button', 'ToolbarButton', 'MenuButton', 'ToolboxButton', 'ToolButton', 'WindowControls', 'AddTile'],
    component: Buttons,
  },
  {
    id: 'inputs',
    label: 'Inputs',
    group: 'Controls',
    tags: ['TextField', 'NumberField', 'Select', 'SearchInput'],
    component: Inputs,
  },
  { id: 'checkbox', label: 'Checkbox', group: 'Controls', component: Checkbox },
  {
    id: 'toggles',
    label: 'Toggles & Sliders',
    group: 'Controls',
    tags: ['Checkbox', 'Switch', 'Slider'],
    component: Toggles,
  },
  {
    id: 'tabs-badges',
    label: 'Tabs & Badges',
    group: 'Controls',
    tags: ['Tabs', 'Badge', 'Callout', 'Toast', 'Kbd', 'Separator'],
    component: TabsBadges,
  },

  {
    id: 'overlays',
    label: 'Overlays',
    group: 'Overlays',
    tags: ['Tooltip', 'DropdownMenu', 'Dialog', 'ConfirmDialog', 'Progress'],
    component: Overlays,
  },
  { id: 'menubar', label: 'Menubar', group: 'Overlays', tags: ['menu bar'], component: MenubarSection },
  {
    id: 'layering',
    label: 'Layering & Portals',
    group: 'Overlays',
    tags: ['z-index', 'useLayer', 'Dialog', 'DropdownMenu', 'MenuButton', 'ItemPicker', 'Tooltip'],
    component: Layering,
  },

  {
    id: 'panels-cards',
    label: 'Panels & Cards',
    group: 'Layout',
    tags: ['Panel', 'TitleBar', 'WindowControls', 'Card', 'AddTile', 'EmptyState'],
    component: PanelsCards,
  },
  {
    id: 'sidebar',
    label: 'Sidebar',
    group: 'Layout',
    tags: ['SidebarSection', 'SidebarItem', 'navigation'],
    component: Sidebar,
  },
  { id: 'accordion', label: 'Accordion', group: 'Layout', tags: ['inspector'], component: Accordion },
  { id: 'toolbar', label: 'Toolbar', group: 'Layout', tags: ['ToolbarButton', 'camera'], component: Toolbar },
  {
    id: 'floating-panel',
    label: 'Floating Panel',
    group: 'Layout',
    tags: ['window', 'WindowControls'],
    component: FloatingPanel,
  },
  {
    id: 'detached-panel',
    label: 'Detached Panel',
    group: 'Layout',
    tags: ['drag', 'WindowControls'],
    component: DetachedPanel,
  },

  { id: 'menu', label: 'Menu', group: 'Editor', tags: ['zylem-menu', 'panel body'], component: Menu },
  {
    id: 'property-list',
    label: 'Property List',
    group: 'Editor',
    tags: ['PropertyRow', 'inspector'],
    component: PropertyList,
  },
  { id: 'console', label: 'Console', group: 'Editor', tags: ['log'], component: Console },
  { id: 'entities', label: 'Entities', group: 'Editor', tags: ['entity grid'], component: Entities },

  {
    id: 'sprite-editor',
    label: 'Sprite Editor',
    group: 'Creator',
    tags: [
      'art',
      'PixelGrid',
      'SpriteSizePicker',
      'ColorPalette',
      'ToolButton',
      'ToolGroup',
      'FrameStrip',
      'PlaybackControls',
    ],
    component: SpriteEditor,
  },
  {
    id: 'director',
    label: 'Director',
    group: 'Creator',
    tags: ['PlaybackControls', 'TimelineTrack', 'keyframe'],
    component: Director,
  },
  {
    id: 'timeline',
    label: 'Timeline',
    group: 'Creator',
    tags: ['TimelineLanes', 'TimelineClip', 'KeyframeMarker', 'TrackHeader', 'TransportBar'],
    component: Timeline,
  },
  {
    id: 'music',
    label: 'Music',
    group: 'Creator',
    tags: ['audio', 'PianoRoll', 'MixerStrip', 'Knob', 'Waveform', 'TransportBar'],
    component: Music,
  },
  {
    id: 'toolbox',
    label: 'Toolbox',
    group: 'Creator',
    tags: ['ToolboxButton', 'ToolboxGrid'],
    component: Toolbox,
  },
];
