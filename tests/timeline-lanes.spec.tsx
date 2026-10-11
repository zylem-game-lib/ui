import { fireEvent, render } from '@solidjs/testing-library';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { LayerProvider } from '../src/layers';
import { Knob } from '../src/components/Mixer/Knob';
import { MixerStrip } from '../src/components/Mixer/MixerStrip';
import { PianoRoll } from '../src/components/PianoRoll/PianoRoll';
import {
  KeyframeMarker,
  TimelineClip,
  TimelineLane,
  TimelineLanes,
} from '../src/components/TimelineLanes/TimelineLanes';
import { TrackHeader } from '../src/components/TrackHeader/TrackHeader';

afterEach(() => {
  document.body.innerHTML = '';
});

const scale = { unit: 'seconds' as const, pixelsPerUnit: 10 };

describe('TimelineLanes', () => {
  it('lays clips out by the scale and reports snapped drags', () => {
    const onChange = vi.fn();
    const onCommit = vi.fn();
    const { container } = render(() => (
      <TimelineLanes scale={scale} length={20} snap={0.5}>
        <TimelineLane header={<span>Cam</span>}>
          <TimelineClip start={2} length={4} label="Shot" onChange={onChange} onCommit={onCommit} />
        </TimelineLane>
      </TimelineLanes>
    ));
    const clip = container.querySelector<HTMLElement>('.zylem-clip')!;
    expect(clip.style.left).toBe('20px');
    expect(clip.style.width).toBe('40px');

    fireEvent.pointerDown(clip, { button: 0, clientX: 100, pointerId: 1 });
    fireEvent.pointerMove(clip, { clientX: 113, pointerId: 1 });
    expect(onChange).toHaveBeenLastCalledWith({ start: 3.5, length: 4, startDelta: 0 });
    fireEvent.pointerUp(clip, { clientX: 113, pointerId: 1 });
    expect(onCommit).toHaveBeenCalledWith({ start: 3.5, length: 4, startDelta: 0 });
  });

  it('trims from the start edge and reports how far the start moved', () => {
    const onCommit = vi.fn();
    const { container } = render(() => (
      <TimelineLanes scale={scale} length={20}>
        <TimelineLane>
          <TimelineClip start={2} length={4} onCommit={onCommit} />
        </TimelineLane>
      </TimelineLanes>
    ));
    const handle = container.querySelector<HTMLElement>('.zylem-clip-handle[data-edge="start"]')!;
    fireEvent.pointerDown(handle, { button: 0, clientX: 0, pointerId: 1 });
    fireEvent.pointerMove(handle, { clientX: 10, pointerId: 1 });
    fireEvent.pointerUp(handle, { clientX: 10, pointerId: 1 });
    expect(onCommit).toHaveBeenCalledWith({ start: 3, length: 3, startDelta: 1 });
  });

  it('drags markers along the lane within the timeline', () => {
    const onCommit = vi.fn();
    const { container } = render(() => (
      <TimelineLanes scale={scale} length={10} snap={1}>
        <TimelineLane>
          <KeyframeMarker time={4} label="Key" onCommit={onCommit} />
        </TimelineLane>
      </TimelineLanes>
    ));
    const marker = container.querySelector<HTMLElement>('.zylem-marker')!;
    expect(marker.style.left).toBe('40px');
    fireEvent.pointerDown(marker, { button: 0, clientX: 0, pointerId: 1 });
    fireEvent.pointerMove(marker, { clientX: 500, pointerId: 1 });
    fireEvent.pointerUp(marker, { clientX: 500, pointerId: 1 });
    expect(onCommit).toHaveBeenCalledWith(10);
  });

  it('labels the ruler and positions the playhead', () => {
    const { container } = render(() => (
      <TimelineLanes scale={{ unit: 'seconds', pixelsPerUnit: 80 }} length={2} playhead={1.5} />
    ));
    const labels = Array.from(container.querySelectorAll('.zylem-lanes-tick-label')).map(
      (node) => node.textContent,
    );
    expect(labels).toEqual(['0:00', '0:01', '0:02']);
    const playhead = container.querySelector<HTMLElement>('.zylem-lanes-playhead')!;
    expect(playhead.style.left).toBe(`${168 + 120}px`);
  });

  it('is only a slider, and a tab stop, when it can seek', () => {
    const { container } = render(() => (
      <TimelineLanes scale={{ unit: 'seconds', pixelsPerUnit: 80 }} length={2} playhead={1} />
    ));
    const ruler = container.querySelector<HTMLElement>('.zylem-lanes-ruler')!;
    expect(ruler.hasAttribute('role')).toBe(false);
    expect(ruler.hasAttribute('tabindex')).toBe(false);
  });

  it('seeks from the keyboard by its ticks, by its labelled ticks with Shift', () => {
    const onSeek = vi.fn();
    const onPageKey = vi.fn();
    window.addEventListener('keydown', onPageKey);
    const { getByRole } = render(() => (
      // 80px per second: a tick every half second, a label every second.
      <TimelineLanes scale={{ unit: 'seconds', pixelsPerUnit: 80 }} length={4} playhead={1} onSeek={onSeek} />
    ));
    const ruler = getByRole('slider', { name: 'Playhead' });
    expect(ruler.tabIndex).toBe(0);
    expect(ruler.getAttribute('aria-valuenow')).toBe('1');
    expect(ruler.getAttribute('aria-valuetext')).toBe('1 second');

    fireEvent.keyDown(ruler, { key: 'ArrowRight' });
    expect(onSeek).toHaveBeenLastCalledWith(1.5);
    fireEvent.keyDown(ruler, { key: 'ArrowLeft', shiftKey: true });
    expect(onSeek).toHaveBeenLastCalledWith(0);
    fireEvent.keyDown(ruler, { key: 'End' });
    expect(onSeek).toHaveBeenLastCalledWith(4);
    fireEvent.keyDown(ruler, { key: 'Home' });
    expect(onSeek).toHaveBeenLastCalledWith(0);
    // Not a ruler key: left for the page.
    fireEvent.keyDown(ruler, { key: 'k' });
    window.removeEventListener('keydown', onPageKey);

    expect(onSeek).toHaveBeenCalledTimes(4);
    // The transport's own Home and arrow shortcuts must not seek a second time.
    expect(onPageKey).toHaveBeenCalledTimes(1);
    expect(onPageKey.mock.calls[0]![0].key).toBe('k');
  });

  it('reads beat positions as bars and beats', () => {
    const { getByRole } = render(() => (
      <TimelineLanes
        scale={{ unit: 'beats', pixelsPerUnit: 20, beatsPerBar: 4 }}
        length={16}
        playhead={5}
        onSeek={() => {}}
      />
    ));
    expect(getByRole('slider').getAttribute('aria-valuetext')).toBe('bar 2, beat 2');
  });

  it('selects a focused clip with Enter or Space, keeping the key from page shortcuts', () => {
    const onSelect = vi.fn();
    const onPageKey = vi.fn();
    window.addEventListener('keydown', onPageKey);
    const { getByRole } = render(() => (
      <TimelineLanes scale={scale} length={20}>
        <TimelineLane>
          <TimelineClip start={2} length={4} label="Shot" onSelect={onSelect} />
        </TimelineLane>
      </TimelineLanes>
    ));
    const clip = getByRole('button', { name: 'Shot' });
    fireEvent.keyDown(clip, { key: 'Enter' });
    // Space plays and pauses in the editors; on a focused clip it selects.
    fireEvent.keyDown(clip, { key: ' ' });
    window.removeEventListener('keydown', onPageKey);
    expect(onSelect).toHaveBeenCalledTimes(2);
    expect(onPageKey).not.toHaveBeenCalled();
  });

  it('selects on a click without a pointer down, as assistive tech activates', () => {
    const onClip = vi.fn();
    const onMarker = vi.fn();
    const { container } = render(() => (
      <TimelineLanes scale={scale} length={20}>
        <TimelineLane>
          <TimelineClip start={2} length={4} label="Shot" onSelect={onClip} />
          <KeyframeMarker time={8} label="Key" onSelect={onMarker} />
        </TimelineLane>
      </TimelineLanes>
    ));
    const clip = container.querySelector<HTMLElement>('.zylem-clip')!;
    const marker = container.querySelector<HTMLElement>('.zylem-marker')!;
    fireEvent.click(clip);
    fireEvent.click(marker);
    expect(onClip).toHaveBeenCalledTimes(1);
    expect(onMarker).toHaveBeenCalledTimes(1);

    // A pointer selects on pointer down, so its click does not select again.
    fireEvent.pointerDown(marker, { button: 0, pointerId: 1 });
    fireEvent.pointerUp(marker, { pointerId: 1 });
    fireEvent.click(marker, { detail: 1 });
    expect(onMarker).toHaveBeenCalledTimes(2);
  });
});

describe('TrackHeader', () => {
  it('renders the toggles it has handlers for and reports renames', () => {
    const onToggleMute = vi.fn();
    const onRename = vi.fn();
    const { container, getByLabelText } = render(() => (
      <TrackHeader name="Lead" muted onToggleMute={onToggleMute} onRename={onRename} />
    ));
    expect(container.querySelectorAll('.zylem-track-toggle')).toHaveLength(1);
    // The label stays put; the pressed state says whether it is on.
    const mute = getByLabelText('Mute');
    expect(mute.getAttribute('aria-pressed')).toBe('true');
    mute.click();
    expect(onToggleMute).toHaveBeenCalledTimes(1);

    fireEvent.dblClick(container.querySelector('.zylem-track-header-name')!);
    const input = container.querySelector<HTMLInputElement>('.zylem-track-header-input')!;
    fireEvent.input(input, { target: { value: 'Bass' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onRename).toHaveBeenCalledWith('Bass');
  });

  it('groups its controls under the track name', () => {
    const { getByRole } = render(() => (
      <TrackHeader name="Lead" onToggleMute={() => {}} onToggleSolo={() => {}} />
    ));
    const group = getByRole('group', { name: 'Lead' });
    expect(group.querySelectorAll('button[aria-pressed]')).toHaveLength(2);
  });

  it('makes the name a button that selects from the keyboard when the header selects', () => {
    const onSelect = vi.fn();
    const onRename = vi.fn();
    const { container, getByRole } = render(() => (
      <TrackHeader name="Lead" selected onSelect={onSelect} onRename={onRename} />
    ));
    const name = getByRole('button', { name: 'Lead' });
    expect(name.getAttribute('aria-current')).toBe('true');

    fireEvent.click(name);
    expect(onSelect).toHaveBeenCalledTimes(1);
    // The pointer selected on pointer down; the click that follows is not a second select.
    fireEvent.pointerDown(name);
    fireEvent.click(name, { detail: 1 });
    expect(onSelect).toHaveBeenCalledTimes(2);

    fireEvent.dblClick(name);
    expect(container.querySelector('.zylem-track-header-input')).not.toBeNull();
  });

  it('keeps the name plain text when the header does not select', () => {
    const { container } = render(() => <TrackHeader name="Lead" />);
    expect(container.querySelector('.zylem-track-header-name')!.tagName).toBe('SPAN');
  });
});

describe('MixerStrip', () => {
  it('groups the strip under the track name and selects from its name button', () => {
    const onSelect = vi.fn();
    const { getByRole } = render(() => (
      <MixerStrip name="Drums" volume={0} muted onToggleMute={() => {}} onSelect={onSelect} />
    ));
    const strip = getByRole('group', { name: 'Drums' });
    expect(strip.querySelector('[aria-label="Mute"]')!.getAttribute('aria-pressed')).toBe('true');
    const name = getByRole('button', { name: 'Drums' });
    expect(name.hasAttribute('aria-current')).toBe(false);
    fireEvent.click(name);
    expect(onSelect).toHaveBeenCalledTimes(1);
  });
});

describe('PianoRoll', () => {
  const notes = [{ id: 'n1', pitch: 60, start: 0, duration: 1 }];

  it('places notes on the grid and selects them', () => {
    const onSelect = vi.fn();
    const { container } = render(() => (
      <LayerProvider>
        <PianoRoll notes={notes} length={4} pixelsPerBeat={40} rowHeight={10} maxPitch={72} onSelect={onSelect} />
      </LayerProvider>
    ));
    const note = container.querySelector<HTMLElement>('.zylem-piano-roll-note')!;
    expect(note.style.left).toBe('0px');
    expect(note.style.top).toBe('120px');
    fireEvent.pointerDown(note, { button: 0, clientX: 0, clientY: 0, pointerId: 1 });
    expect(onSelect).toHaveBeenCalledWith(['n1']);
  });

  it('deletes and nudges the selection from the keyboard', () => {
    const onDelete = vi.fn();
    const onCommit = vi.fn();
    const { container } = render(() => (
      <PianoRoll
        notes={notes}
        length={4}
        selectedIds={['n1']}
        snap={0.5}
        onDeleteNotes={onDelete}
        onCommitNotes={onCommit}
      />
    ));
    const roll = container.querySelector<HTMLElement>('.zylem-piano-roll')!;
    fireEvent.keyDown(roll, { key: 'ArrowRight' });
    expect(onCommit).toHaveBeenCalledWith([{ id: 'n1', pitch: 60, start: 0.5, duration: 1 }]);
    fireEvent.keyDown(roll, { key: 'ArrowUp', shiftKey: true });
    expect(onCommit).toHaveBeenLastCalledWith([{ id: 'n1', pitch: 72, start: 0, duration: 1 }]);
    fireEvent.keyDown(roll, { key: 'Delete' });
    expect(onDelete).toHaveBeenCalledWith(['n1']);
  });
});

describe('Knob', () => {
  it('steps with the arrow keys and commits', () => {
    const onChange = vi.fn();
    const onCommit = vi.fn();
    const { getByRole } = render(() => (
      <Knob value={0.5} min={0} max={1} step={0.1} label="Pan" onChange={onChange} onCommit={onCommit} />
    ));
    // Named by its visible caption.
    const dial = getByRole('slider', { name: 'Pan' });
    expect(dial.hasAttribute('aria-label')).toBe(false);
    fireEvent.keyDown(dial, { key: 'ArrowUp' });
    expect(onChange).toHaveBeenCalledWith(0.6);
    expect(onCommit).toHaveBeenCalledWith(0.6);
    fireEvent.keyDown(dial, { key: 'End' });
    expect(onCommit).toHaveBeenLastCalledWith(1);
  });
});
