import { fireEvent, render } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { NumberField } from '../src/components/NumberField/NumberField';

afterEach(() => {
  document.body.innerHTML = '';
});

/** Let a frame pass, so a field settling after a commit gives up waiting. */
function nextFrame(): Promise<void> {
  return new Promise((resolve) => requestAnimationFrame(() => resolve()));
}

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

  it('holds a draft and commits on Enter, blur, and a stepper', () => {
    const [value, setValue] = createSignal(8);
    // Even numbers only, so a commit is visible as a rewrite of what was typed.
    const onCommit = vi.fn((next: number) => setValue(Math.round(next / 2) * 2));
    const { container } = render(() => <NumberField value={value()} step={1} onCommit={onCommit} />);
    const input = container.querySelector<HTMLInputElement>('input')!;

    fireEvent.input(input, { target: { value: '11' } });
    expect(onCommit).not.toHaveBeenCalled();
    expect(input.value).toBe('11');
    expect(value()).toBe(8);

    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onCommit).toHaveBeenCalledTimes(1);
    expect(onCommit).toHaveBeenCalledWith(11);
    expect(value()).toBe(12);
    expect(input.value).toBe('12');

    fireEvent.input(input, { target: { value: '15' } });
    fireEvent.blur(input);
    expect(onCommit).toHaveBeenCalledTimes(2);
    expect(onCommit).toHaveBeenLastCalledWith(15);
    expect(value()).toBe(16);

    fireEvent.click(container.querySelector('[aria-label="Increment"]')!);
    expect(onCommit).toHaveBeenCalledTimes(3);
    expect(onCommit).toHaveBeenLastCalledWith(17);
    expect(value()).toBe(18);
  });

  it('keeps a draft while the value changes underneath it', () => {
    // A moving object updates `value` every frame, and the typing has to
    // survive that until it is committed.
    const [value, setValue] = createSignal(1);
    const onCommit = vi.fn();
    const { container } = render(() => <NumberField value={value()} step={1} onCommit={onCommit} />);
    const input = container.querySelector<HTMLInputElement>('input')!;

    fireEvent.input(input, { target: { value: '5' } });
    setValue(2);
    setValue(3);
    expect(input.value).toBe('5');

    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onCommit).toHaveBeenCalledWith(5);
  });

  it('keeps showing a commit until the new value lands', () => {
    // The owner answers a frame later, so showing `value` straight away would
    // flash the old number first.
    const [value, setValue] = createSignal(0);
    const { container } = render(() => <NumberField value={value()} step={1} onCommit={() => {}} />);
    const input = container.querySelector<HTMLInputElement>('input')!;

    fireEvent.input(input, { target: { value: '1.3' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(input.value).toBe('1.3');

    setValue(1.25);
    expect(input.value).toBe('1.25');
  });

  it('shows the value again after a commit the owner rounds back to it', async () => {
    // Snapping 1.3 onto a 0.25 grid lands on the value already there, so
    // nothing changes to replace the typed text.
    const onCommit = vi.fn();
    const { container } = render(() => <NumberField value={1.25} step={1} onCommit={onCommit} />);
    const input = container.querySelector<HTMLInputElement>('input')!;

    fireEvent.input(input, { target: { value: '1.3' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onCommit).toHaveBeenCalledWith(1.3);

    await nextFrame();
    expect(input.value).toBe('1.25');
  });

  it('drops the draft on Escape', () => {
    const onCommit = vi.fn();
    const { container } = render(() => <NumberField value={4} step={1} onCommit={onCommit} />);
    const input = container.querySelector<HTMLInputElement>('input')!;

    fireEvent.input(input, { target: { value: '9' } });
    fireEvent.keyDown(input, { key: 'Escape' });
    expect(input.value).toBe('4');

    fireEvent.blur(input);
    expect(onCommit).not.toHaveBeenCalled();
  });

  it('claims Escape only when it drops a draft', () => {
    // An accordion around the field collapses on any Escape left unhandled.
    const { container } = render(() => <NumberField value={4} step={1} onCommit={() => {}} />);
    const input = container.querySelector<HTMLInputElement>('input')!;

    expect(fireEvent.keyDown(input, { key: 'Escape' })).toBe(true);

    fireEvent.input(input, { target: { value: '9' } });
    expect(fireEvent.keyDown(input, { key: 'Escape' })).toBe(false);
    expect(input.value).toBe('4');
  });
});
