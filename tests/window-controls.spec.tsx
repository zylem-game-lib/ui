import { fireEvent, render } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { WindowControls, type DockPosition } from '../src/components/WindowControls/WindowControls';
import { LayerProvider } from '../src/layers';

afterEach(() => {
  document.body.innerHTML = '';
});

describe('WindowControls dock', () => {
  it('hides the dock control unless a handler is given', () => {
    const { container } = render(() => (
      <LayerProvider>
        <WindowControls onClose={() => {}} />
      </LayerProvider>
    ));

    expect(container.querySelector('[aria-label="Dock panel"]')).toBeNull();
    expect(container.querySelector('[aria-label="Close panel"]')).not.toBeNull();
  });

  it('offers top, float, and bottom from a window control, checking the current one', async () => {
    const onDock = vi.fn();
    const [dock, setDock] = createSignal<DockPosition>('float');

    render(() => (
      <LayerProvider>
        <WindowControls
          dock={dock()}
          onDock={(position) => {
            onDock(position);
            setDock(position);
          }}
          onCollapse={() => {}}
          onClose={() => {}}
        />
      </LayerProvider>
    ));

    const trigger = document.querySelector('[aria-label="Dock panel"]') as HTMLElement;
    expect(trigger.classList.contains('zylem-window-control')).toBe(true);
    const icon = trigger.querySelector('svg');
    expect(icon?.classList.contains('zylem-icon-dock')).toBe(true);
    expect(icon?.getAttribute('width')).toBe('11');
    expect(icon?.getAttribute('viewBox')).toBe('0 0 16 16');
    expect(icon?.getAttribute('fill')).toBe('currentColor');
    // Dock sits with the other ghost controls, ahead of collapse and close.
    const controls = document.querySelector('.zylem-window-controls')!;
    expect(controls.firstElementChild).toBe(trigger);

    fireEvent.pointerDown(trigger, { button: 0, pointerType: 'mouse' });

    const labels = Array.from(document.querySelectorAll('.zylem-dropdown-label')).map(
      (label) => label.textContent,
    );
    expect(labels).toEqual(['Top', 'Float', 'Bottom']);

    const items = Array.from(document.querySelectorAll<HTMLElement>('.zylem-dropdown-item'));
    expect(items[1]?.getAttribute('aria-checked')).toBe('true');

    fireEvent.pointerUp(items[0]!, { button: 0 });

    expect(onDock).toHaveBeenCalledWith('top');
    expect(trigger.querySelector('.zylem-icon-dock')).not.toBeNull();
    // Closing waits a tick, and the exit animation keeps the node mounted.
    await new Promise((resolve) => setTimeout(resolve, 20));
    const menu = document.querySelector('.zylem-dropdown-content');
    expect(menu === null || menu.hasAttribute('data-closed')).toBe(true);
  });
});
