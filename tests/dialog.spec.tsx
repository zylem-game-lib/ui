import { fireEvent, render } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ConfirmDialog, Dialog } from '../src/components/Dialog/Dialog';
import { MenuButton } from '../src/components/MenuButton/MenuButton';
import { LayerProvider } from '../src/layers';

afterEach(() => {
  document.body.innerHTML = '';
});

const describedBy = (element: Element) =>
  document.getElementById(element.getAttribute('aria-describedby') ?? '')?.textContent;

describe('Dialog', () => {
  it('renders a plain card by default', () => {
    render(() => (
      <LayerProvider>
        <Dialog open title="Plain">
          body
        </Dialog>
      </LayerProvider>
    ));
    const content = document.querySelector('.zylem-dialog-content')!;
    expect(content).not.toBeNull();
    expect(content.hasAttribute('data-size')).toBe(false);
    expect(document.querySelector('.zylem-dialog-subtitle')).toBeNull();
    expect(document.querySelector('.zylem-dialog-header-extra')).toBeNull();
  });

  it('exposes the size, subtitle, header slot and body class for browser-style pickers', () => {
    render(() => (
      <LayerProvider>
        <Dialog
          open
          size="fullscreen"
          title="Shaders"
          subtitle="Browse shaders"
          headerExtra={<input aria-label="Search" />}
          class="picker"
          bodyClass="picker-body"
        >
          body
        </Dialog>
      </LayerProvider>
    ));
    const content = document.querySelector('.zylem-dialog-content')!;
    expect(content.getAttribute('data-size')).toBe('fullscreen');
    expect(content.classList.contains('picker')).toBe(true);
    expect(document.querySelector('.zylem-dialog-subtitle')?.textContent).toBe('Browse shaders');
    expect(document.querySelector('.zylem-dialog-header-extra input')).not.toBeNull();
    expect(document.querySelector('.zylem-dialog-body')?.classList.contains('picker-body')).toBe(
      true,
    );
    // The header slot sits between the titles and the close control.
    const header = document.querySelector('.zylem-dialog-header')!;
    const order = Array.from(header.children).map((child) => child.className.split(' ')[0]);
    expect(order).toEqual([
      'zylem-dialog-titles',
      'zylem-dialog-header-extra',
      'zylem-window-controls',
    ]);
  });

  it('is an open native dialog, named by its title and described by its subtitle', () => {
    render(() => (
      <LayerProvider>
        <Dialog open title="Settings" subtitle="Project options">
          body
        </Dialog>
      </LayerProvider>
    ));
    const dialog = document.querySelector('dialog.zylem-dialog')!;
    expect(dialog).not.toBeNull();
    expect(dialog.hasAttribute('open')).toBe(true);
    const title = document.getElementById(dialog.getAttribute('aria-labelledby')!)!;
    expect(title.tagName).toBe('H2');
    expect(title.textContent).toBe('Settings');
    expect(describedBy(dialog)).toBe('Project options');
  });

  it('asks its owner to close on cancel, and stays open until told to', () => {
    const onOpenChange = vi.fn();
    render(() => (
      <LayerProvider>
        <Dialog open onOpenChange={onOpenChange} title="Settings">
          body
        </Dialog>
      </LayerProvider>
    ));
    const dialog = document.querySelector('dialog')!;
    // What Escape fires on a modal dialog.
    const cancel = new Event('cancel', { cancelable: true });
    dialog.dispatchEvent(cancel);
    expect(onOpenChange).toHaveBeenCalledWith(false);
    expect(cancel.defaultPrevented).toBe(true);
    expect(dialog.hasAttribute('open')).toBe(true);
  });

  it('closes while still in the document, so focus can return to the opener', () => {
    const [open, setOpen] = createSignal(true);
    const onOpenChange = vi.fn();
    render(() => (
      <LayerProvider>
        <Dialog open={open()} onOpenChange={onOpenChange} title="Settings">
          body
        </Dialog>
      </LayerProvider>
    ));
    const dialog = document.querySelector('dialog')!;
    const close = dialog.close.bind(dialog);
    let connectedAtClose: boolean | undefined;
    vi.spyOn(dialog, 'close').mockImplementation(() => {
      connectedAtClose = dialog.isConnected;
      close();
    });

    setOpen(false);
    expect(connectedAtClose).toBe(true);
    expect(document.querySelector('dialog')).toBeNull();
    // Closed by its owner, so there is nothing to report back.
    expect(onOpenChange).not.toHaveBeenCalled();
  });

  it('closes on a click outside the card, but not on a drag that ends there', () => {
    const onOpenChange = vi.fn();
    render(() => (
      <LayerProvider>
        <Dialog open onOpenChange={onOpenChange} title="Settings">
          body
        </Dialog>
      </LayerProvider>
    ));
    const dialog = document.querySelector('dialog')!;
    const card = document.querySelector('.zylem-dialog-content')!;

    fireEvent.pointerDown(card);
    fireEvent.click(dialog);
    expect(onOpenChange).not.toHaveBeenCalled();

    fireEvent.pointerDown(dialog);
    fireEvent.click(dialog);
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('lets a click outside dismiss an open menu without closing the dialog', () => {
    const onOpenChange = vi.fn();
    render(() => (
      <LayerProvider>
        <Dialog open onOpenChange={onOpenChange} title="Place">
          <MenuButton label="Add" tooltip={null} open menu={() => <span>palette</span>}>
            <span>icon</span>
          </MenuButton>
        </Dialog>
      </LayerProvider>
    ));
    const dialog = document.querySelector('dialog')!;
    fireEvent.pointerDown(dialog);
    fireEvent.click(dialog);
    expect(onOpenChange).not.toHaveBeenCalled();
  });

  it('mounts a menu opened inside it in the dialog, beside the card rather than in it', () => {
    render(() => (
      <LayerProvider>
        <Dialog open title="Place">
          <MenuButton
            label="Add"
            tooltip={null}
            open
            menu={() => <span class="probe">palette</span>}
          >
            <span>icon</span>
          </MenuButton>
        </Dialog>
      </LayerProvider>
    ));
    const probe = document.querySelector('.probe')!;
    expect(probe).not.toBeNull();
    // Outside the dialog it would sit under the top layer, and be inert...
    expect(probe.closest('dialog')).not.toBeNull();
    // ...and inside the card, its clipping and backdrop filter would cut it off.
    expect(probe.closest('.zylem-dialog-content')).toBeNull();
  });
});

describe('ConfirmDialog', () => {
  it('is an alertdialog described by its message, opening on Cancel when destructive', () => {
    render(() => (
      <LayerProvider>
        <ConfirmDialog
          open
          onOpenChange={() => {}}
          title="Delete project"
          message="This cannot be undone."
          confirmLabel="Delete"
          danger
          onConfirm={() => {}}
        />
      </LayerProvider>
    ));
    const dialog = document.querySelector('dialog')!;
    expect(dialog.getAttribute('role')).toBe('alertdialog');
    expect(describedBy(dialog)).toBe('This cannot be undone.');
    const [cancel, confirm] = Array.from(
      dialog.querySelectorAll<HTMLButtonElement>('.zylem-dialog-footer button'),
    );
    expect(cancel!.autofocus).toBe(true);
    expect(confirm!.autofocus).toBeFalsy();
  });

  it('opens on Confirm when the action is safe', () => {
    render(() => (
      <LayerProvider>
        <ConfirmDialog open onOpenChange={() => {}} message="Apply?" onConfirm={() => {}} />
      </LayerProvider>
    ));
    const [cancel, confirm] = Array.from(
      document.querySelectorAll<HTMLButtonElement>('.zylem-dialog-footer button'),
    );
    expect(cancel!.autofocus).toBeFalsy();
    expect(confirm!.autofocus).toBe(true);
  });
});
