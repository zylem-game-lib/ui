import { fireEvent, render } from '@solidjs/testing-library';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Waveform } from '../src/components/Waveform/Waveform';

afterEach(() => {
  document.body.innerHTML = '';
});

const peaks = [0.2, 0.6, 0.4, 0.8];

describe('Waveform trim edges', () => {
  it('are tab stops whose range stops short of the other edge', () => {
    const { getByRole } = render(() => (
      <Waveform peaks={peaks} duration={10} region={{ start: 2, end: 8 }} />
    ));
    const start = getByRole('slider', { name: 'Trim start' });
    const end = getByRole('slider', { name: 'Trim end' });
    expect(start.tabIndex).toBe(0);
    expect(end.tabIndex).toBe(0);
    expect(start.getAttribute('aria-valuetext')).toBe('2 seconds');
    expect([start.getAttribute('aria-valuemin'), start.getAttribute('aria-valuemax')]).toEqual([
      '0',
      '7.99',
    ]);
    expect([end.getAttribute('aria-valuemin'), end.getAttribute('aria-valuemax')]).toEqual([
      '2.01',
      '10',
    ]);
  });

  it('step from the keyboard, reporting each key as a change and a commit', () => {
    const onRegionChange = vi.fn();
    const onRegionCommit = vi.fn();
    const { getByRole } = render(() => (
      <Waveform
        peaks={peaks}
        duration={10}
        region={{ start: 2, end: 8 }}
        onRegionChange={onRegionChange}
        onRegionCommit={onRegionCommit}
      />
    ));
    const start = getByRole('slider', { name: 'Trim start' });
    const end = getByRole('slider', { name: 'Trim end' });

    // 1% of the duration per arrow, 10% with Shift.
    fireEvent.keyDown(start, { key: 'ArrowRight' });
    expect(onRegionChange).toHaveBeenLastCalledWith({ start: 2.1, end: 8 });
    expect(onRegionCommit).toHaveBeenLastCalledWith({ start: 2.1, end: 8 });
    fireEvent.keyDown(end, { key: 'ArrowLeft', shiftKey: true });
    expect(onRegionCommit).toHaveBeenLastCalledWith({ start: 2, end: 7 });

    // Home and End go as far as the other edge allows.
    fireEvent.keyDown(start, { key: 'End' });
    expect(onRegionCommit).toHaveBeenLastCalledWith({ start: 7.99, end: 8 });
    fireEvent.keyDown(end, { key: 'Home' });
    expect(onRegionCommit).toHaveBeenLastCalledWith({ start: 2, end: 2.01 });
    expect(onRegionChange).toHaveBeenCalledTimes(4);
    expect(onRegionCommit).toHaveBeenCalledTimes(4);
  });

  it('keep the keys they use from page shortcuts, and let others through', () => {
    const onPageKey = vi.fn();
    window.addEventListener('keydown', onPageKey);
    const { getByRole } = render(() => (
      <Waveform peaks={peaks} duration={10} region={{ start: 2, end: 8 }} onRegionChange={() => {}} />
    ));
    const start = getByRole('slider', { name: 'Trim start' });
    fireEvent.keyDown(start, { key: 'Home' });
    fireEvent.keyDown(start, { key: 'ArrowLeft' });
    fireEvent.keyDown(start, { key: ' ' });
    window.removeEventListener('keydown', onPageKey);
    expect(onPageKey).toHaveBeenCalledTimes(1);
    expect(onPageKey.mock.calls[0]![0].key).toBe(' ');
  });

  it('ignore the keyboard while disabled', () => {
    const onRegionCommit = vi.fn();
    const { getByRole } = render(() => (
      <Waveform
        peaks={peaks}
        duration={10}
        region={{ start: 2, end: 8 }}
        onRegionCommit={onRegionCommit}
        disabled
      />
    ));
    const start = getByRole('slider', { name: 'Trim start' });
    expect(start.tabIndex).toBe(-1);
    expect(start.getAttribute('aria-disabled')).toBe('true');
    fireEvent.keyDown(start, { key: 'ArrowRight' });
    expect(onRegionCommit).not.toHaveBeenCalled();
  });
});
