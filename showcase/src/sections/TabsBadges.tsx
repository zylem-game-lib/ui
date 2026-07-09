import { Badge, Kbd, Separator, Tabs } from '../../../src/components';

export function TabsBadges() {
  return (
    <div class="section" id="tabs-badges">
      <h2>Tabs / Badges / Kbd / Separator</h2>
      <h3>Stack-card tabs</h3>
      <div class="demo-container">
        <Tabs defaultValue="card1" aria-label="Stack cards">
          <Tabs.List>
            <Tabs.Trigger value="card1">Card 1</Tabs.Trigger>
            <Tabs.Trigger value="card2">Card 2</Tabs.Trigger>
            <Tabs.Trigger value="card3">Card 3</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="card1">
            <strong>Card Title</strong>
            <p style={{ margin: '8px 0 0' }}>
              This is the content of the active card.
            </p>
          </Tabs.Content>
          <Tabs.Content value="card2">Second card content.</Tabs.Content>
          <Tabs.Content value="card3">Third card content.</Tabs.Content>
        </Tabs>
      </div>
      <h3>Badges</h3>
      <div class="demo-row">
        <Badge tone="info">Info</Badge>
        <Badge tone="warning">Warning</Badge>
        <Badge tone="error">Error</Badge>
        <Badge tone="success">Success</Badge>
        <Badge tone="neutral">Neutral</Badge>
      </div>
      <h3>Kbd + Separator</h3>
      <div class="demo-container">
        <div style={{ display: 'flex', 'align-items': 'center', gap: '8px' }}>
          <span>Apply</span>
          <Kbd>⌘</Kbd>
          <Kbd>Enter</Kbd>
          <Separator orientation="vertical" />
          <span>Reset</span>
          <Kbd>Esc</Kbd>
        </div>
        <Separator />
        <span class="code-label">Separator (horizontal) above</span>
      </div>
    </div>
  );
}
