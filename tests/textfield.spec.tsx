import { fireEvent, render } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { TextField } from '../src/components/TextField/TextField';

afterEach(() => {
  document.body.innerHTML = '';
});

describe('TextField', () => {
  it('reports every edit through onChange when uncontrolled by a draft', () => {
    const onChange = vi.fn();
    const { container } = render(() => <TextField value="a" onChange={onChange} />);
    const input = container.querySelector('input')!;
    fireEvent.input(input, { target: { value: 'ab' } });
    expect(onChange).toHaveBeenCalledWith('ab');
  });

  it('holds a draft and commits on Enter and blur when onCommit is set', () => {
    const [value, setValue] = createSignal('idle');
    const onCommit = vi.fn((next: string) => {
      // Parent normalises: trailing punctuation is dropped.
      setValue(next.replace(/[,\s]+$/, ''));
    });
    const { container } = render(() => <TextField value={value()} onCommit={onCommit} />);
    const input = container.querySelector('input')!;

    fireEvent.input(input, { target: { value: 'idle, ' } });
    // Typing is not normalised mid-way: the draft keeps the trailing ", ".
    expect(input.value).toBe('idle, ');
    expect(onCommit).not.toHaveBeenCalled();

    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onCommit).toHaveBeenCalledWith('idle, ');
    expect(input.value).toBe('idle');

    fireEvent.input(input, { target: { value: 'run' } });
    fireEvent.blur(input);
    expect(onCommit).toHaveBeenLastCalledWith('run');
    expect(input.value).toBe('run');
  });

  it('snaps the draft back when the parent rejects a commit', () => {
    const onCommit = vi.fn();
    const { container } = render(() => <TextField value="hero" onCommit={onCommit} />);
    const input = container.querySelector('input')!;
    fireEvent.input(input, { target: { value: '' } });
    fireEvent.blur(input);
    expect(onCommit).toHaveBeenCalledWith('');
    expect(input.value).toBe('hero');
  });
});
