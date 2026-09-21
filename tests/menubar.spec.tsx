import { render } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Menubar } from '../src/components/Menubar/Menubar';
import { LayerProvider } from '../src/layers';
import { afterListenersAttach } from './helpers/shadow-root';

afterEach(() => {
  document.body.innerHTML = '';
});

describe('Menubar', () => {
  it('renders a trigger per menu and opens one on click', async () => {
    const onSave = vi.fn();
    const { container } = render(() => (
      <LayerProvider>
        <Menubar
          menus={[
            { id: 'file', label: 'File', items: [{ id: 'save', label: 'Save', onSelect: onSave }] },
            { id: 'edit', label: 'Edit', items: [{ id: 'undo', label: 'Undo' }] },
          ]}
        />
      </LayerProvider>
    ));
    const triggers = container.querySelectorAll<HTMLButtonElement>('.zylem-menubar-trigger');
    expect(Array.from(triggers).map((t) => t.textContent)).toEqual(['File', 'Edit']);
    expect(container.querySelector('[role="menubar"]')).not.toBeNull();

    triggers[0]!.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, button: 0 }));
    triggers[0]!.click();
    await afterListenersAttach();

    const content = document.querySelector('.zylem-menubar-content');
    expect(content).not.toBeNull();
    expect(content?.textContent).toContain('Save');
  });

  it('reads item accessors on render so checks follow state without rebuilding the bar', async () => {
    const [stage, setStage] = createSignal(0);
    const { container } = render(() => (
      <LayerProvider>
        <Menubar
          menus={[
            {
              id: 'stage',
              label: 'Stage',
              items: () =>
                ['A', 'B'].map((name, index) => ({
                  id: name,
                  label: name,
                  checked: stage() === index,
                  onSelect: () => setStage(index),
                })),
            },
          ]}
        />
      </LayerProvider>
    ));
    const trigger = container.querySelector<HTMLButtonElement>('.zylem-menubar-trigger')!;
    trigger.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, button: 0 }));
    trigger.click();
    await afterListenersAttach();

    const rows = () =>
      Array.from(document.querySelectorAll<HTMLElement>('.zylem-menubar-content .zylem-dropdown-item'));
    expect(rows()).toHaveLength(2);
    expect(rows().map((row) => row.getAttribute('role'))).toEqual([
      'menuitemcheckbox',
      'menuitemcheckbox',
    ]);
    expect(rows()[0]!.getAttribute('aria-checked')).toBe('true');
    expect(rows()[1]!.getAttribute('aria-checked')).toBe('false');
    // Every row reserves the check column so labels line up.
    expect(document.querySelectorAll('.zylem-menubar-content .zylem-dropdown-check')).toHaveLength(2);

    setStage(1);
    expect(rows()[0]!.getAttribute('aria-checked')).toBe('false');
    expect(rows()[1]!.getAttribute('aria-checked')).toBe('true');
  });
});
