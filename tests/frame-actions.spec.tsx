import { render } from '@solidjs/testing-library';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { FrameActions } from '../src/components/FrameStrip/FrameStrip';
import { LayerProvider } from '../src/layers';

afterEach(() => {
  document.body.innerHTML = '';
});

const labels = (container: HTMLElement) =>
  Array.from(container.querySelectorAll('button')).map(
    (button) => button.getAttribute('aria-label') ?? button.textContent?.trim(),
  );

describe('FrameActions', () => {
  it('leaves the reorder pair out unless a move handler is given', () => {
    const { container } = render(() => (
      <LayerProvider>
        <FrameActions onDuplicate={() => {}} onDelete={() => {}} />
      </LayerProvider>
    ));
    expect(labels(container)).toEqual(['Duplicate', 'Delete', 'Previous frame', 'Next frame']);
  });

  it('renders the reorder pair between the commands and the step arrows', () => {
    const onMoveLeft = vi.fn();
    const onMoveRight = vi.fn();
    const { container } = render(() => (
      <LayerProvider>
        <FrameActions
          onMoveLeft={onMoveLeft}
          onMoveRight={onMoveRight}
          canMoveLeft={false}
          canMoveRight
        />
      </LayerProvider>
    ));
    expect(labels(container)).toEqual([
      'Duplicate',
      'Delete',
      'Move frame left',
      'Move frame right',
      'Previous frame',
      'Next frame',
    ]);
    const [left, right] = Array.from(
      container.querySelectorAll<HTMLButtonElement>('.zylem-frame-actions-group button'),
    );
    expect(left!.disabled).toBe(true);
    right!.click();
    expect(onMoveRight).toHaveBeenCalledTimes(1);
    expect(onMoveLeft).not.toHaveBeenCalled();
  });
});
