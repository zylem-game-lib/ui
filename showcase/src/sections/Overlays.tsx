import { createSignal } from 'solid-js';
import {
  Button,
  ConfirmDialog,
  Dialog,
  DropdownMenu,
  EmptyState,
  Progress,
  SearchInput,
  Tooltip,
} from '../../../src/components';

export function Overlays() {
  const [dialogOpen, setDialogOpen] = createSignal(false);
  const [confirmOpen, setConfirmOpen] = createSignal(false);
  const [browserOpen, setBrowserOpen] = createSignal(false);
  const [query, setQuery] = createSignal('');
  const [lastAction, setLastAction] = createSignal('none');

  return (
    <div class="section" id="overlays">
      <h2>Tooltip / Menu / Dialog / Progress</h2>
      <div class="demo-container">
        <div class="demo-row">
          <Tooltip content="Panels use thin glass and soft glow">
            <Button variant="ghost">Hover for tooltip</Button>
          </Tooltip>
          <DropdownMenu
            trigger={<span class="zylem-button">File ▾</span>}
            items={[
              { id: 'new', label: 'New', shortcut: '⌘N', onSelect: () => setLastAction('New') },
              { id: 'open', label: 'Open...', shortcut: '⌘O', onSelect: () => setLastAction('Open') },
              { id: 'save', label: 'Save', shortcut: '⌘S', onSelect: () => setLastAction('Save') },
              {
                id: 'delete',
                label: 'Delete project',
                danger: true,
                separatorAbove: true,
                onSelect: () => setLastAction('Delete'),
              },
            ]}
          />
          <Button onClick={() => setDialogOpen(true)}>Open dialog</Button>
          <Button onClick={() => setBrowserOpen(true)}>Fullscreen dialog</Button>
          <Button variant="danger" onClick={() => setConfirmOpen(true)}>
            Confirm delete
          </Button>
        </div>
        <p class="code-label">
          Last menu action: {lastAction()} · <code>size="fullscreen"</code> fills the viewport
          with a subtitle and a header slot for search.
        </p>
        <div style={{ 'max-width': '360px', display: 'flex', 'flex-direction': 'column', gap: '12px' }}>
          <Progress label="Job progress" value={64} showValue />
          <Progress label="Loading" indeterminate value={40} />
        </div>
      </div>

      <Dialog
        open={dialogOpen()}
        onOpenChange={setDialogOpen}
        title="HyperGlass Panel"
        footer={
          <Button variant="primary" onClick={() => setDialogOpen(false)}>
            Learn More
          </Button>
        }
      >
        Panels use thin glass, subtle borders, and soft glow. Inspired by
        HyperCard stacks and futuristic HUDs.
      </Dialog>

      <Dialog
        open={browserOpen()}
        onOpenChange={setBrowserOpen}
        size="fullscreen"
        title="Shaders"
        subtitle="Browse shaders and apply them to the selection"
        headerExtra={
          <SearchInput value={query()} onInput={setQuery} placeholder="Search by name or tag" />
        }
        footer={
          <>
            <Button variant="ghost" onClick={() => setBrowserOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => setBrowserOpen(false)}>
              Add shader
            </Button>
          </>
        }
      >
        <EmptyState title="Nothing here yet">
          A browser-style picker lays its catalog and form out against the dialog's full height.
          {query() ? ` Searching for “${query()}”.` : ''}
        </EmptyState>
      </Dialog>

      <ConfirmDialog
        open={confirmOpen()}
        onOpenChange={setConfirmOpen}
        title="Delete project"
        message="This will permanently delete the project. This action cannot be undone."
        confirmLabel="Delete"
        danger
        onConfirm={() => setLastAction('Confirmed delete')}
      />
    </div>
  );
}
