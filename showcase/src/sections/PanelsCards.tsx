import { createSignal } from 'solid-js';
import {
  AddTile,
  Button,
  Card,
  Dialog,
  EmptyState,
  Panel,
  TitleBar,
  WindowControls,
} from '../../../src/components';

export function PanelsCards() {
  const [settingsOpen, setSettingsOpen] = createSignal(false);

  return (
    <div class="section" id="panels-cards">
      <h2>Panels / TitleBar / Cards / EmptyState</h2>
      <h3>Window controls (shared ghost buttons)</h3>
      <div class="demo-row">
        <WindowControls
          onSettings={() => setSettingsOpen(true)}
          dock="float"
          onDock={() => {}}
          onClose={() => {}}
          onCollapse={() => {}}
        />
        <WindowControls onClose={() => {}} onCollapse={() => {}} collapsed />
      </div>
      <p>Hover the settings gear to turn it white, or click it to open panel settings.</p>
      <h3>Panel with glossy header + TitleBar window</h3>
      <div class="demo-row">
        <Panel title="Component Preview" style={{ width: '280px' }}>
          Glass card body content.
        </Panel>
        <div style={{ width: '320px' }}>
          <Panel window flush>
            <TitleBar
              title="HyperGlass Panel"
              onSettings={() => setSettingsOpen(true)}
              onClose={() => {}}
              onCollapse={() => {}}
            />
            <div style={{ padding: 'var(--zylem-spacing-md)' }}>
              Panels use thin glass, subtle borders, and soft glow.
            </div>
          </Panel>
        </div>
      </div>
      <h3>Cards</h3>
      <div class="demo-row">
        <Card title="PlayerShip" description="Entity card" interactive style={{ width: '160px' }} />
        <Card title="EnemyDrone" description="Selected" interactive selected style={{ width: '160px' }} />
        <Card title="Static card" description="Non-interactive" style={{ width: '160px' }} />
      </div>
      <h3>Card grid with a fill AddTile</h3>
      <div
        style={{
          display: 'grid',
          'grid-template-columns': 'repeat(3, 160px)',
          gap: 'var(--zylem-spacing-md)',
        }}
      >
        <AddTile variant="fill" label="New project" onClick={() => {}} />
        <Card title="Asteroids" description="updated today" interactive />
        <Card title="Invaders" description="updated yesterday" interactive />
      </div>
      <h3>EmptyState</h3>
      <div style={{ 'max-width': '420px' }}>
        <EmptyState
          title="No assets yet"
          action={<Button size="sm">Upload asset</Button>}
        >
          Generated art and uploaded files will appear here.
        </EmptyState>
      </div>
      <Dialog
        open={settingsOpen()}
        onOpenChange={setSettingsOpen}
        title="Panel settings"
      >
        Configure this panel's display and behavior here.
      </Dialog>
    </div>
  );
}
