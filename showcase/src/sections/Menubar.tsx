import { createSignal } from 'solid-js';
import { Menubar, type MenubarMenuConfig } from '../../../src/components';

const STAGES = ['Title', 'Overworld', 'Boss arena'];

/** Desktop menu bar as Creator's shell uses it: mode menus with a checked stage. */
export function MenubarSection() {
  const [stage, setStage] = createSignal(1);
  const [gridOn, setGridOn] = createSignal(true);
  const [last, setLast] = createSignal('none');

  const menus: MenubarMenuConfig[] = [
    {
      id: 'file',
      label: 'File',
      items: [
        { id: 'new', label: 'New sprite…', shortcut: '⌘N', onSelect: () => setLast('New sprite') },
        { id: 'save', label: 'Save', shortcut: '⌘S', onSelect: () => setLast('Save') },
        { id: 'export', label: 'Export spritesheet', disabled: true },
        {
          id: 'close',
          label: 'Close document',
          separatorAbove: true,
          onSelect: () => setLast('Close'),
        },
      ],
    },
    {
      id: 'stage',
      label: 'Stage',
      // Read on every render, so the check follows the signal without the bar
      // being rebuilt (which would close the open menu).
      items: () =>
        STAGES.map((name, index) => ({
          id: name,
          label: name,
          checked: stage() === index,
          onSelect: () => {
            setStage(index);
            setLast(`Stage: ${name}`);
          },
        })),
    },
    {
      id: 'view',
      label: 'View',
      items: () => [
        { id: 'grid', label: 'Show grid', checked: gridOn(), onSelect: () => setGridOn(!gridOn()) },
        { id: 'zoom-in', label: 'Zoom in', shortcut: '⌘+', onSelect: () => setLast('Zoom in') },
        { id: 'zoom-out', label: 'Zoom out', shortcut: '⌘-', onSelect: () => setLast('Zoom out') },
      ],
    },
    { id: 'help', label: 'Help', disabled: true, items: [] },
  ];

  return (
    <div class="section" id="menubar">
      <h2>Menubar</h2>
      <p class="code-label">
        Flat triggers; open one and slide across to the others. Rows with <code>checked</code>
        get a check column. Last action: {last()}
      </p>
      <div class="demo-container" style={{ 'align-self': 'flex-start' }}>
        <Menubar menus={menus} aria-label="Showcase menus" />
      </div>
    </div>
  );
}
