import { fireEvent, render } from '@solidjs/testing-library';
import { createSignal, For } from 'solid-js';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Tabs } from '../src/components/Tabs/Tabs';

afterEach(() => {
  document.body.innerHTML = '';
});

describe('Tabs.Trigger', () => {
  it('renders a plain trigger without a close affordance by default', () => {
    const { container, getByRole } = render(() => (
      <Tabs defaultValue="a">
        <Tabs.List>
          <Tabs.Trigger value="a">A</Tabs.Trigger>
        </Tabs.List>
      </Tabs>
    ));
    expect(container.querySelector('.zylem-tabs-close')).toBeNull();
    expect(container.querySelector('.zylem-tabs-dirty')).toBeNull();
    expect(getByRole('tab').hasAttribute('aria-keyshortcuts')).toBe(false);
  });

  it('closes from the pointer without selecting the tab', () => {
    const onClose = vi.fn();
    const onChange = vi.fn();
    const { container } = render(() => (
      <Tabs value="a" onChange={onChange}>
        <Tabs.List>
          <Tabs.Trigger value="a">A</Tabs.Trigger>
          <Tabs.Trigger value="b" onClose={onClose} closeLabel="Close B">
            B
          </Tabs.Trigger>
        </Tabs.List>
      </Tabs>
    ));
    const close = container.querySelector<HTMLElement>('.zylem-tabs-close')!;
    // Not a control of its own: a button may not nest in the trigger button,
    // and the keyboard closes the tab with Delete instead.
    expect(close.getAttribute('aria-hidden')).toBe('true');
    expect(close.hasAttribute('role')).toBe(false);
    expect(close.hasAttribute('tabindex')).toBe(false);
    expect(close.getAttribute('title')).toBe('Close B');

    close.click();
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('closes the focused tab with Delete or Backspace, keeping the key from page shortcuts', () => {
    const onClose = vi.fn();
    const onChange = vi.fn();
    const onPageKey = vi.fn();
    window.addEventListener('keydown', onPageKey);
    const { getByRole } = render(() => (
      <Tabs value="a" onChange={onChange}>
        <Tabs.List>
          <Tabs.Trigger value="a">A</Tabs.Trigger>
          <Tabs.Trigger value="b" onClose={onClose}>
            B
          </Tabs.Trigger>
        </Tabs.List>
      </Tabs>
    ));
    const tab = getByRole('tab', { name: 'B' });
    expect(tab.getAttribute('aria-keyshortcuts')).toBe('Delete Backspace');

    fireEvent.keyDown(tab, { key: 'Delete' });
    fireEvent.keyDown(tab, { key: 'Backspace' });
    window.removeEventListener('keydown', onPageKey);
    expect(onClose).toHaveBeenCalledTimes(2);
    expect(onChange).not.toHaveBeenCalled();
    expect(onPageKey).not.toHaveBeenCalled();
  });

  it('hands focus to the selected tab once the focused one is gone', async () => {
    const [ids, setIds] = createSignal(['a', 'b']);
    const { getByRole } = render(() => (
      <Tabs value="a">
        <Tabs.List>
          <For each={ids()}>
            {(id) => (
              <Tabs.Trigger
                value={id}
                onClose={() => setIds((list) => list.filter((other) => other !== id))}
              >
                {id.toUpperCase()}
              </Tabs.Trigger>
            )}
          </For>
        </Tabs.List>
      </Tabs>
    ));
    const b = getByRole('tab', { name: 'B' });
    b.focus();
    fireEvent.keyDown(b, { key: 'Delete' });
    await Promise.resolve();
    expect(b.isConnected).toBe(false);
    expect(document.activeElement).toBe(getByRole('tab', { name: 'A' }));
  });

  it('puts unsaved changes in the tab name rather than in a label on the dot', () => {
    const { container, getByRole } = render(() => (
      <Tabs value="a">
        <Tabs.List>
          <Tabs.Trigger value="a" dirty>
            A
          </Tabs.Trigger>
        </Tabs.List>
      </Tabs>
    ));
    const dot = container.querySelector('.zylem-tabs-dirty')!;
    expect(dot.getAttribute('aria-hidden')).toBe('true');
    expect(dot.hasAttribute('aria-label')).toBe(false);
    expect(getByRole('tab').textContent).toBe('A(unsaved changes)');
    expect(container.querySelector('.zylem-visually-hidden')!.textContent).toBe(
      '(unsaved changes)',
    );
  });
});
