import { fireEvent, render } from '@solidjs/testing-library';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { LayerProvider } from '../src/layers';
import { ToolbarButton } from '../src/components/ToolbarButton/ToolbarButton';
import { ART_TOOLS, ToolButton } from '../src/components/ToolButton/ToolButton';

afterEach(() => {
  vi.useRealTimers();
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

  it('is a toggle, pressed for the selected tool', () => {
    const { container } = render(() => (
      <LayerProvider>
        <ToolButton tool="fill" selected />
        <ToolButton tool="pencil" />
      </LayerProvider>
    ));
    const [fill, pencil] = Array.from(container.querySelectorAll('button'));
    expect(fill!.getAttribute('aria-pressed')).toBe('true');
    expect(fill!.hasAttribute('data-selected')).toBe(true);
    expect(pencil!.getAttribute('aria-pressed')).toBe('false');
    expect(pencil!.hasAttribute('data-selected')).toBe(false);
  });
});

describe('ToolbarButton', () => {
  it('keeps selected a look only, for buttons whose label already says their state', () => {
    const { container } = render(() => (
      <LayerProvider>
        <ToolbarButton label="Pause" selected>
          <span />
        </ToolbarButton>
        <ToolbarButton label="Grid" pressed>
          <span />
        </ToolbarButton>
      </LayerProvider>
    ));
    const [pause, grid] = Array.from(container.querySelectorAll('button'));
    expect(pause!.hasAttribute('data-selected')).toBe(true);
    expect(pause!.hasAttribute('aria-pressed')).toBe(false);
    expect(grid!.hasAttribute('data-selected')).toBe(true);
    expect(grid!.getAttribute('aria-pressed')).toBe('true');
  });

  it('opens its tooltip beside the button and above other layers when inside a popup', async () => {
    vi.useFakeTimers();
    render(() => (
      <LayerProvider>
        <div data-popper-positioner="">
          <ToolbarButton label="Pencil">
            <span />
          </ToolbarButton>
        </div>
      </LayerProvider>
    ));

    fireEvent.pointerEnter(document.querySelector('button')!.parentElement!);
    await vi.advanceTimersByTimeAsync(400);

    const tooltip = document.querySelector('.zylem-tooltip');
    expect(tooltip).not.toBeNull();
    expect(tooltip!.classList.contains('zylem-tooltip--front')).toBe(true);
    // Origin on the left means the tooltip sits to the right of the button.
    // `flip="left"` is the only other side it may take.
    const origin = tooltip!
      .closest<HTMLElement>('[data-popper-positioner]')!
      .style.getPropertyValue('--kb-popper-content-transform-origin');
    expect(origin === 'left center' || origin === 'right center').toBe(true);
    vi.useRealTimers();
  });

  it('keeps the tooltip on the tooltip tier outside a popup', async () => {
    vi.useFakeTimers();
    render(() => (
      <LayerProvider>
        <ToolbarButton label="Pencil">
          <span />
        </ToolbarButton>
      </LayerProvider>
    ));

    fireEvent.pointerEnter(document.querySelector('button')!.parentElement!);
    await vi.advanceTimersByTimeAsync(400);

    const tooltip = document.querySelector('.zylem-tooltip');
    expect(tooltip).not.toBeNull();
    expect(tooltip!.classList.contains('zylem-tooltip--front')).toBe(false);
    vi.useRealTimers();
  });
});
