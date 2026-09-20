import { render } from '@solidjs/testing-library';
import { afterEach, describe, expect, it } from 'vitest';
import { LayerProvider } from '../src/layers';
import { ART_TOOLS, ToolButton } from '../src/components/ToolButton/ToolButton';

afterEach(() => {
  document.body.innerHTML = '';
});

describe('ToolButton', () => {
  it('renders an icon and accessible name for every art tool', () => {
    for (const tool of ART_TOOLS) {
      const { container, unmount } = render(() => (
        <LayerProvider>
          <ToolButton tool={tool} />
        </LayerProvider>
      ));
      const button = container.querySelector('button.zylem-toolbar-btn.zylem-tool-btn');
      expect(button, tool).not.toBeNull();
      expect(button?.getAttribute('aria-label'), tool).toBeTruthy();
      expect(button?.querySelector(`svg[data-tool="${tool}"]`), tool).not.toBeNull();
      unmount();
    }
  });

  it('appends the shortcut to the tooltip label', () => {
    const { container } = render(() => (
      <LayerProvider>
        <ToolButton tool="pencil" shortcut="B" />
      </LayerProvider>
    ));
    expect(container.querySelector('button')?.getAttribute('aria-label')).toBe('Pencil (B)');
  });

  it('marks the selected tool', () => {
    const { container } = render(() => (
      <LayerProvider>
        <ToolButton tool="fill" selected />
      </LayerProvider>
    ));
    expect(container.querySelector('button')?.hasAttribute('data-selected')).toBe(true);
  });
});
