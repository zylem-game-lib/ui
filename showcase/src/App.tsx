import { For } from 'solid-js';
import { BuildLabel } from '../../src/components';
import { ZYLEM_PACKAGE_VERSIONS } from 'virtual:zylem-versions';
import { Accordion } from './sections/Accordion';
import { Buttons } from './sections/Buttons';
import { Icons } from './sections/Icons';
import { Checkbox } from './sections/Checkbox';
import { Colors } from './sections/Colors';
import { Console } from './sections/Console';
import { DetachedPanel } from './sections/DetachedPanel';
import { Director } from './sections/Director';
import { Entities } from './sections/Entities';
import { FloatingPanel } from './sections/FloatingPanel';
import { HyperGlass } from './sections/HyperGlass';
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
import { Toggles } from './sections/Toggles';
import { Timeline } from './sections/Timeline';
import { Toolbar } from './sections/Toolbar';
import { Toolbox } from './sections/Toolbox';
import { Typography } from './sections/Typography';

const navLinks = [
  { href: '#hyperglass', label: 'HyperGlass' },
  { href: '#colors', label: 'Colors' },
  { href: '#buttons', label: 'Buttons' },
  { href: '#icons', label: 'Icons' },
  { href: '#inputs', label: 'Inputs' },
  { href: '#toggles', label: 'Toggles & Sliders' },
  { href: '#tabs-badges', label: 'Tabs & Badges' },
  { href: '#overlays', label: 'Overlays' },
  { href: '#menubar', label: 'Menubar' },
  { href: '#layering', label: 'Layering & Portals' },
  { href: '#panels-cards', label: 'Panels & Cards' },
  { href: '#toolbar', label: 'Toolbar' },
  { href: '#floating-panel', label: 'Floating Panel' },
  { href: '#detached-panel', label: 'Detached Panel' },
  { href: '#menu', label: 'Menu' },
  { href: '#accordion', label: 'Accordion' },
  { href: '#property-list', label: 'Property List' },
  { href: '#console', label: 'Console' },
  { href: '#entities', label: 'Entities' },
  { href: '#checkbox', label: 'Checkbox' },
  { href: '#sidebar', label: 'Sidebar' },
  { href: '#sprite-editor', label: 'Sprite Editor' },
  { href: '#director', label: 'Director' },
  { href: '#timeline', label: 'Timeline' },
  { href: '#music', label: 'Music' },
  { href: '#toolbox', label: 'Toolbox' },
  { href: '#typography', label: 'Typography' },
  { href: '#spacing-sizing', label: 'Spacing & Sizing' },
];

export function App() {
  return (
    <div class="zylem-hyperglass-root">
      <BuildLabel packages={ZYLEM_PACKAGE_VERSIONS} />
      <div class="showcase">
        <h1>Zylem UI Showcase — HyperGlass</h1>
        <nav class="showcase-nav">
          <For each={navLinks}>{(link) => <a href={link.href}>{link.label}</a>}</For>
        </nav>
        <HyperGlass />
        <Colors />
        <Buttons />
        <Icons />
        <Inputs />
        <Toggles />
        <TabsBadges />
        <Overlays />
        <MenubarSection />
        <Layering />
        <PanelsCards />
        <Toolbar />
        <FloatingPanel />
        <DetachedPanel />
        <Menu />
        <Accordion />
        <PropertyList />
        <Console />
        <Entities />
        <Checkbox />
        <Sidebar />
        <SpriteEditor />
        <Director />
        <Timeline />
        <Music />
        <Toolbox />
        <Typography />
        <SpacingSizing />
      </div>
    </div>
  );
}
