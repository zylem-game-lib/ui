import { render } from '@solidjs/testing-library';
import { describe, expect, it } from 'vitest';
import { Toolbar } from '../src/components/Toolbar/Toolbar';

describe('Toolbar', () => {
  it('sets data-mode when a mode is passed', () => {
    const { container } = render(() => <Toolbar mode="yellow" />);
    const toolbar = container.querySelector('[role="toolbar"]');
    expect(toolbar?.getAttribute('data-mode')).toBe('yellow');
  });

  it('omits data-mode when mode is not passed', () => {
    const { container } = render(() => <Toolbar />);
    const toolbar = container.querySelector('[role="toolbar"]');
    expect(toolbar?.hasAttribute('data-mode')).toBe(false);
  });
});
