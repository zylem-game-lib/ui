import { render } from '@solidjs/testing-library';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Tabs } from '../src/components/Tabs/Tabs';

afterEach(() => {
  document.body.innerHTML = '';
});

describe('Tabs.Trigger', () => {
  it('renders a plain trigger without a close affordance by default', () => {
    const { container } = render(() => (
      <Tabs defaultValue="a">
        <Tabs.List>
          <Tabs.Trigger value="a">A</Tabs.Trigger>
        </Tabs.List>
      </Tabs>
    ));
    expect(container.querySelector('.zylem-tabs-close')).toBeNull();
    expect(container.querySelector('.zylem-tabs-dirty')).toBeNull();
  });

  it('closes without selecting the tab', () => {
    const onClose = vi.fn();
    const onChange = vi.fn();
    const { container } = render(() => (
      <Tabs value="a" onChange={onChange}>
        <Tabs.List>
          <Tabs.Trigger value="a">A</Tabs.Trigger>
          <Tabs.Trigger value="b" dirty onClose={onClose} closeLabel="Close B">
            B
          </Tabs.Trigger>
        </Tabs.List>
      </Tabs>
    ));
    const close = container.querySelector<HTMLElement>('.zylem-tabs-close')!;
    // Not a nested button: the trigger itself is the button.
    expect(close.tagName).toBe('SPAN');
    expect(close.getAttribute('role')).toBe('button');
    expect(close.getAttribute('aria-label')).toBe('Close B');
    expect(container.querySelector('.zylem-tabs-dirty')).not.toBeNull();

    close.click();
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(onChange).not.toHaveBeenCalled();
  });
});
