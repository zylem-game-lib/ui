import { render } from '@solidjs/testing-library';
import { createSignal, type Component } from 'solid-js';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { ToolbarDropdownMenu } from '../src/components/ToolbarDropdownMenu/ToolbarDropdownMenu';
import { LayerProvider } from '../src/layers';

afterEach(() => {
  document.body.innerHTML = '';
});

const Mark: Component<{ class?: string }> = (props) => (
  <svg class={props.class} data-icon="mark" />
);

const ITEMS = [
  { id: 'perspective', label: 'Perspective', icon: Mark },
  { id: 'top', label: 'Top down', icon: Mark },
] as const;

describe('ToolbarDropdownMenu', () => {
  it('names the face after the selected item', () => {
    const { container } = render(() => (
      <LayerProvider>
        <ToolbarDropdownMenu items={ITEMS} value="top" onChange={() => {}} />
      </LayerProvider>
    ));

    const face = container.querySelector('.zylem-menu-button__face');
    expect(face?.getAttribute('aria-label')).toBe('Top down');
    expect(face?.hasAttribute('data-selected')).toBe(true);
    expect(face?.querySelector('svg')).not.toBeNull();
  });

  it('selects a menu item and closes', () => {
    const onChange = vi.fn();
    const [value, setValue] = createSignal('perspective');

    render(() => (
      <LayerProvider>
        <ToolbarDropdownMenu
          items={ITEMS}
          value={value()}
          onChange={(id) => {
            onChange(id);
            setValue(id);
          }}
        />
      </LayerProvider>
    ));

    (document.querySelector('.zylem-menu-button__face') as HTMLElement).click();
    const top = document.querySelector(
      '.zylem-menu-button__panel button[aria-label="Top down"]',
    ) as HTMLElement;
    expect(top).not.toBeNull();
    expect(top.hasAttribute('data-selected')).toBe(false);

    top.click();

    expect(onChange).toHaveBeenCalledWith('top');
    expect(document.querySelector('.zylem-menu-button__panel')).toBeNull();
    expect(document.querySelector('.zylem-menu-button__face')?.getAttribute('aria-label')).toBe(
      'Top down',
    );
  });
});
