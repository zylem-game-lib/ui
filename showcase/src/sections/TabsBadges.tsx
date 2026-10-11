import { For, createSignal } from 'solid-js';
import { Badge, Button, Callout, Kbd, Separator, Tabs, Toast } from '../../../src/components';

interface Doc {
  id: string;
  title: string;
  dirty?: boolean;
}

export function TabsBadges() {
  const [docs, setDocs] = createSignal<Doc[]>([
    { id: 'hero', title: 'hero.sprite.json', dirty: true },
    { id: 'tiles', title: 'tiles.sprite.json' },
    { id: 'robot', title: 'robot.model.json' },
  ]);
  const [active, setActive] = createSignal('hero');
  const [toast, setToast] = createSignal<string | null>(null);
  let toastTimer: ReturnType<typeof setTimeout> | undefined;

  const closeDoc = (id: string) => {
    const remaining = docs().filter((doc) => doc.id !== id);
    setDocs(remaining);
    if (active() === id) setActive(remaining[0]?.id ?? '');
  };
  const flash = (message: string) => {
    setToast(message);
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => setToast(null), 1800);
  };

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
      <h3>Document tabs</h3>
      <p class="code-label">
        <code>onClose</code> closes the focused tab on Delete (Backspace on a Mac keyboard) and
        adds a close affordance for the pointer; neither selects the tab.{' '}
        <code>dirty</code> marks unsaved changes.
      </p>
      <div class="demo-container">
        <Tabs value={active()} onChange={setActive} aria-label="Open documents">
          <Tabs.List>
            <For each={docs()}>
              {(doc) => (
                <Tabs.Trigger
                  value={doc.id}
                  dirty={doc.dirty}
                  onClose={() => closeDoc(doc.id)}
                  closeLabel={`Close ${doc.title}`}
                >
                  {doc.title}
                </Tabs.Trigger>
              )}
            </For>
          </Tabs.List>
        </Tabs>
      </div>
      <h3>Toast</h3>
      <div class="demo-container" style={{ position: 'relative', 'min-height': '96px' }}>
        <div class="demo-row">
          <Button onClick={() => flash('Saved hero.sprite.json')}>Flash a message</Button>
          <Button variant="danger" onClick={() => flash('Could not apply shader')}>
            Flash an error
          </Button>
        </div>
        <Toast message={toast()} tone={toast()?.startsWith('Could') ? 'error' : 'info'} />
      </div>
      <h3>Badges</h3>
      <div class="demo-row">
        <Badge tone="info">Info</Badge>
        <Badge tone="warning">Warning</Badge>
        <Badge tone="error">Error</Badge>
        <Badge tone="success">Success</Badge>
        <Badge tone="neutral">Neutral</Badge>
      </div>
      <h3>Callouts</h3>
      <div class="demo-container" style={{ display: 'flex', 'flex-direction': 'column', gap: '8px', 'max-width': '420px' }}>
        <Callout>Left at their defaults, none of these are written to your code.</Callout>
        <Callout tone="warning" title="Left alone">
          The file sets <code>material.color</code> to something this form cannot show.
        </Callout>
        <Callout tone="error">This project has no createStage() call to add an entity to.</Callout>
        <Callout tone="success">Spritesheet exported.</Callout>
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
