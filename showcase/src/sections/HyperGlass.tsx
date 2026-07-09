import Bug from 'lucide-solid/icons/bug';
import MousePointer from 'lucide-solid/icons/mouse-pointer';
import Play from 'lucide-solid/icons/play';
import Plus from 'lucide-solid/icons/plus';
import Trash2 from 'lucide-solid/icons/trash-2';
import { createSignal } from 'solid-js';
import {
  Accordion,
  Badge,
  Button,
  Card,
  Console,
  NumberField,
  Panel,
  PropertyList,
  PropertyRow,
  SearchInput,
  Select,
  TitleBar,
  Toolbar,
  ToolbarButton,
} from '../../../src/components';

const CONSOLE_LOG = [
  '12:11:02  INFO   Scene loaded successfully (2.1ms)',
  '12:11:08  INFO   PlayerShip spawned',
  '12:11:14  WARN   Missing texture: thruster.png',
  '12:11:27  ERROR  Failed to load audio: explosion.ogg',
  '12:11:31  INFO   Play mode started',
  '12:11:32  INFO   Entity PlayerShip position set to (120, 45, 0)',
].join('\n');

/**
 * Composite mock of the HyperGlass editor concept (concept art 03):
 * window chrome + toolbar + inspector + console + entity stack.
 */
export function HyperGlass() {
  const [tool, setTool] = createSignal('select');
  const [body, setBody] = createSignal<string | null>('dynamic');
  const [mass, setMass] = createSignal(1);
  const [consoleText, setConsoleText] = createSignal(CONSOLE_LOG);
  const [search, setSearch] = createSignal('');

  return (
    <div class="section" id="hyperglass">
      <h2>HyperGlass Editor Composite</h2>
      <h3>Window + toolbar + inspector + console + entity stack</h3>
      <Panel window flush>
        <TitleBar
          title="ZYLEM — HyperGlass"
          onClose={() => {}}
          onCollapse={() => {}}
        />
        <div
          style={{
            display: 'grid',
            'grid-template-columns': '1fr 320px',
            gap: 'var(--zylem-spacing-md)',
            padding: 'var(--zylem-spacing-md)',
          }}
        >
          <div style={{ display: 'flex', 'flex-direction': 'column', gap: 'var(--zylem-spacing-md)', 'min-width': 0 }}>
            <Toolbar>
              <ToolbarButton label="Select" selected={tool() === 'select'} onClick={() => setTool('select')}>
                <MousePointer class="zylem-icon" />
              </ToolbarButton>
              <ToolbarButton label="Add" selected={tool() === 'add'} onClick={() => setTool('add')}>
                <Plus class="zylem-icon" />
              </ToolbarButton>
              <ToolbarButton label="Debug" selected={tool() === 'debug'} onClick={() => setTool('debug')}>
                <Bug class="zylem-icon" />
              </ToolbarButton>
              <ToolbarButton label="Play" onClick={() => {}}>
                <Play class="zylem-icon" />
              </ToolbarButton>
              <ToolbarButton label="Delete" onClick={() => {}}>
                <Trash2 class="zylem-icon" />
              </ToolbarButton>
            </Toolbar>
            <div
              style={{
                flex: 1,
                'min-height': '220px',
                'border-radius': 'var(--zylem-radius-panel)',
                border: '1px solid rgba(97, 166, 232, 0.3)',
                background:
                  'radial-gradient(circle at 40% 30%, rgba(97,166,232,0.14), transparent 55%), linear-gradient(rgba(97,166,232,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(97,166,232,0.06) 1px, transparent 1px)',
                'background-size': '100% 100%, 24px 24px, 24px 24px',
                display: 'flex',
                'align-items': 'center',
                'justify-content': 'center',
                color: 'var(--zylem-color-text-secondary)',
              }}
            >
              3D viewport
            </div>
            <Panel title="Console" flush headerActions={<Badge tone="error">1 error</Badge>}>
              <div style={{ height: '160px' }}>
                <Console
                  value={consoleText()}
                  onInput={setConsoleText}
                  onClear={() => setConsoleText('')}
                />
              </div>
            </Panel>
          </div>
          <div style={{ display: 'flex', 'flex-direction': 'column', gap: 'var(--zylem-spacing-md)', 'min-width': 0 }}>
            <Panel
              title="Entity: PlayerShip"
              headerActions={<Badge tone="success">Live</Badge>}
              flush
            >
              <Accordion
                multiple
                defaultValue={['transform', 'physics']}
                items={[
                  {
                    id: 'transform',
                    title: 'Transform',
                    content: () => (
                      <div style={{ padding: 'var(--zylem-spacing-sm)' }}>
                        <PropertyList>
                          <PropertyRow label="Position" value="120.00, 45.00, 0.00" />
                          <PropertyRow label="Rotation" value="0.00, 90.00, 0.00" />
                          <PropertyRow label="Scale" value="1.00, 1.00, 1.00" />
                        </PropertyList>
                      </div>
                    ),
                  },
                  {
                    id: 'physics',
                    title: 'Physics',
                    content: () => (
                      <div
                        style={{
                          padding: 'var(--zylem-spacing-sm)',
                          display: 'flex',
                          'flex-direction': 'column',
                          gap: 'var(--zylem-spacing-sm)',
                        }}
                      >
                        <Select
                          label="Body"
                          options={[
                            { value: 'dynamic', label: 'Dynamic' },
                            { value: 'fixed', label: 'Fixed' },
                            { value: 'kinematic', label: 'Kinematic' },
                          ]}
                          value={body() ?? undefined}
                          onChange={setBody}
                        />
                        <NumberField label="Mass" value={mass()} onChange={setMass} step={0.25} minValue={0} />
                        <Button size="sm">+ Add Component</Button>
                      </div>
                    ),
                  },
                ]}
              />
            </Panel>
            <Panel title="Entities" flush>
              <div
                style={{
                  padding: 'var(--zylem-spacing-sm)',
                  display: 'flex',
                  'flex-direction': 'column',
                  gap: 'var(--zylem-spacing-sm)',
                }}
              >
                <SearchInput value={search()} onInput={setSearch} placeholder="Search entities..." />
                <div
                  style={{
                    display: 'grid',
                    'grid-template-columns': '1fr 1fr',
                    gap: 'var(--zylem-spacing-sm)',
                  }}
                >
                  <Card title="PlayerShip" interactive selected />
                  <Card title="EnemyDrone" interactive />
                  <Card title="Asteroid" interactive />
                  <Card title="PowerUp" interactive />
                </div>
                <Button size="sm" variant="ghost">
                  + New Entity
                </Button>
              </div>
            </Panel>
          </div>
        </div>
      </Panel>
    </div>
  );
}
