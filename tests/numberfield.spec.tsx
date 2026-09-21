import { fireEvent, render } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { NumberField } from '../src/components/NumberField/NumberField';

afterEach(() => {
  document.body.innerHTML = '';
});

describe('NumberField', () => {
  it('does not report the initial value as a change', async () => {
    const onChange = vi.fn();
    render(() => <NumberField value={8} onChange={onChange} />);
    await Promise.resolve();
    expect(onChange).not.toHaveBeenCalled();
  });

  it('reports edits and stepper presses', () => {
    const [value, setValue] = createSignal(8);
    const onChange = vi.fn((next: number) => setValue(next));
    const { container } = render(() => <NumberField value={value()} step={1} onChange={onChange} />);
    const input = container.querySelector<HTMLInputElement>('input')!;
    fireEvent.input(input, { target: { value: '12' } });
    expect(onChange).toHaveBeenLastCalledWith(12);
    fireEvent.click(container.querySelector('[aria-label="Increment"]')!);
    expect(onChange).toHaveBeenLastCalledWith(13);
    expect(onChange).toHaveBeenCalledTimes(2);
  });
});
