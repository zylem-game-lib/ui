import { render } from '@solidjs/testing-library';
import { afterEach, describe, expect, it } from 'vitest';
import { Dialog } from '../src/components/Dialog/Dialog';
import { LayerProvider } from '../src/layers';

afterEach(() => {
  document.body.innerHTML = '';
});

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
});
