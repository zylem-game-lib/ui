import {
  Button,
  Card,
  EmptyState,
  Panel,
  TitleBar,
  WindowControls,
} from '../../../src/components';

export function PanelsCards() {
  return (
    <div class="section" id="panels-cards">
      <h2>Panels / TitleBar / Cards / EmptyState</h2>
      <h3>Window controls (shared glass buttons)</h3>
      <div class="demo-row">
        <WindowControls onClose={() => {}} onCollapse={() => {}} />
        <WindowControls onClose={() => {}} onCollapse={() => {}} collapsed />
      </div>
      <h3>Panel with glossy header + TitleBar window</h3>
      <div class="demo-row">
        <Panel title="Component Preview" style={{ width: '280px' }}>
          Glass card body content.
        </Panel>
        <div style={{ width: '320px' }}>
          <Panel window flush>
            <TitleBar
              title="HyperGlass Panel"
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
      <h3>EmptyState</h3>
      <div style={{ 'max-width': '420px' }}>
        <EmptyState
          title="No assets yet"
          action={<Button size="sm">Upload asset</Button>}
        >
          Generated art and uploaded files will appear here.
        </EmptyState>
      </div>
    </div>
  );
}
