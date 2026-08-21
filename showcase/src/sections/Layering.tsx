import { createSignal } from 'solid-js';
import {
  Button,
  Dialog,
  DropdownMenu,
  ItemPicker,
  MenuButton,
  Tooltip,
  useLayer,
  type PickerItem,
} from '../../../src/components';

const TIERS = [
  { tier: 'base', value: 0, what: 'in-flow content' },
  { tier: 'panel', value: 1000, what: 'windows, floating and docked panels, drag ghosts' },
  { tier: 'modal', value: 2000, what: 'dialogs and their backdrop' },
  { tier: 'popover', value: 3000, what: 'popovers, palettes, pickers' },
  { tier: 'tooltip', value: 4000, what: 'tooltips' },
  { tier: 'menu', value: 5000, what: 'menus and context menus' },
] as const;

const SHAPES: PickerItem[] = [
  { id: 'box', label: 'Box', group: 'Primitives', tags: ['cube'] },
  { id: 'sphere', label: 'Sphere', group: 'Primitives', tags: ['ball'] },
  { id: 'plane', label: 'Plane', group: 'Primitives', tags: ['ground', 'floor'] },
  { id: 'camera', label: 'Camera', group: 'Scene' },
  { id: 'point-light', label: 'Point Light', group: 'Scene', tags: ['lamp'] },
  { id: 'sun', label: 'Directional Light', group: 'Scene', tags: ['sun'] },
  { id: 'text', label: 'Text', group: 'UI' },
  { id: 'sprite', label: 'Sprite', group: 'UI', disabled: true },
];

/**
 * A stand-in for the editor's floating panel: a positioned box on the `panel`
 * tier. Overlays opened over it have to win, which is the whole reason the ladder
 * exists.
 */
function StackedPanel(props: { rank?: number; children?: import('solid-js').JSX.Element }) {
  const layer = useLayer('panel', props.rank ?? 0);

  return (
    <div
      ref={layer.anchorRef}
      class="zylem-panel"
      style={{
        position: 'relative',
        'z-index': layer.zIndex(),
        padding: '12px',
        width: '300px',
      }}
    >
      <p class="code-label" style={{ margin: '0 0 8px' }}>
        panel tier{props.rank ? ` + rank ${props.rank}` : ''} — z-index: {layer.zIndex()}
      </p>
      {props.children}
    </div>
  );
}

export function Layering() {
  const [scopedOpen, setScopedOpen] = createSignal(false);
  const [placed, setPlaced] = createSignal<PickerItem | null>(null);
  const [placements, setPlacements] = createSignal(0);

  const place = (item: PickerItem) => {
    setPlaced(item);
    setPlacements((count) => count + 1);
  };

  return (
    <div class="section" id="layering">
      <h2>Layering &amp; Portals</h2>

      <h3>The ladder</h3>
      <p class="code-label">
        Every overlay reads its z-index from a tier token, so the order is decided
        in one place rather than guessed per component. Bands are 1000 apart to
        leave room for a per-instance rank.
      </p>
      <div class="demo-container">
        <table class="showcase-table">
          <thead>
            <tr>
              <th>tier</th>
              <th>z-index</th>
              <th>holds</th>
            </tr>
          </thead>
          <tbody>
            {TIERS.map((row) => (
              <tr>
                <td>
                  <code>{row.tier}</code>
                </td>
                <td>{row.value}</td>
                <td>{row.what}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3>Overlays beat panels</h3>
      <p class="code-label">
        The panel below is on the <code>panel</code> tier. Open either overlay from
        inside it: both are portaled out and land on higher tiers, so neither is
        clipped or covered.
      </p>
      <div class="demo-container">
        <StackedPanel>
          <div class="demo-row">
            <Tooltip content="Tooltip tier — 4000">
              <Button variant="ghost">Hover me</Button>
            </Tooltip>
            <DropdownMenu
              trigger={<span class="zylem-button">Menu ▾</span>}
              items={[
                { id: 'a', label: 'Menu tier — 5000' },
                { id: 'b', label: 'Above the tooltip' },
              ]}
            />
          </div>
        </StackedPanel>
      </div>

      <h3>Rank within a tier</h3>
      <p class="code-label">
        Two panels on the same tier, ordered by rank. This is how a window manager
        raises whichever window was clicked last without leaving its tier.
      </p>
      <div class="demo-container" style={{ position: 'relative', height: '150px' }}>
        <div style={{ position: 'absolute', top: 0, left: 0 }}>
          <StackedPanel rank={0} />
        </div>
        <div style={{ position: 'absolute', top: '40px', left: '60px' }}>
          <StackedPanel rank={10} />
        </div>
      </div>

      <h3>Scoped reordering</h3>
      <p class="code-label">
        A dialog wraps its body in a <code>LayerScope</code>. Overlays opened
        inside it portal into the scope's own container and are capped by the
        dialog's stacking context, so they float over the dialog but never over
        page chrome behind it. Ranks still mean the same thing inside, which is how
        a panel can be lifted above the scope's tooltips while staying under its
        menus.
      </p>
      <div class="demo-container">
        <Button onClick={() => setScopedOpen(true)}>Open scoped dialog</Button>
      </div>

      <h3>MenuButton</h3>
      <p class="code-label">
        Split button: the face repeats the last choice, the chevron opens the
        picker. Ten of the same thing is one trip through the menu and ten clicks.
      </p>
      <div class="demo-container">
        <StackedPanel>
          <div class="demo-row">
            <MenuButton
              label={placed() ? `Add ${placed()!.label}` : 'Add'}
              onAction={placed() ? () => place(placed()!) : undefined}
              selected={Boolean(placed())}
              menu={(close) => (
                <ItemPicker
                  items={SHAPES}
                  selectedId={placed()?.id}
                  searchPlaceholder="Search entities…"
                  onSelect={(item) => {
                    place(item);
                    close();
                  }}
                />
              )}
            >
              +
            </MenuButton>
            <MenuButton label="No primary action" menu={() => <ItemPicker items={SHAPES} onSelect={() => {}} />}>
              ☰
            </MenuButton>
          </div>
          <p class="code-label" style={{ margin: '8px 0 0' }}>
            Armed: {placed()?.label ?? 'nothing'} · placements: {placements()}
          </p>
        </StackedPanel>
      </div>

      <h3>ItemPicker standalone</h3>
      <p class="code-label">
        Searchable and grouped over a generic item list. Search matches label, id
        and hidden tags — try <code>cube</code>, <code>lamp</code> or{' '}
        <code>floor</code>.
      </p>
      <div class="demo-container">
        <div class="zylem-panel" style={{ width: 'fit-content' }}>
          <ItemPicker items={SHAPES} autoFocus={false} onSelect={place} />
        </div>
      </div>

      <Dialog
        open={scopedOpen()}
        onOpenChange={setScopedOpen}
        title="Scoped overlays"
        footer={
          <Button variant="primary" onClick={() => setScopedOpen(false)}>
            Done
          </Button>
        }
      >
        <p style={{ margin: '0 0 12px' }}>
          These overlays portal into this dialog's scope, not the page's.
        </p>
        <div class="demo-row">
          <Tooltip content="Scoped to the dialog">
            <Button variant="ghost">Hover me</Button>
          </Tooltip>
          <DropdownMenu
            trigger={<span class="zylem-button">Menu ▾</span>}
            items={[{ id: 'a', label: 'Still above the dialog body' }]}
          />
          <MenuButton
            label="Add"
            menu={(close) => (
              <ItemPicker
                items={SHAPES}
                onSelect={(item) => {
                  place(item);
                  close();
                }}
              />
            )}
          >
            +
          </MenuButton>
        </div>
      </Dialog>
    </div>
  );
}
