import { fireEvent, render } from '@solidjs/testing-library';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { LayerProvider } from '../src/layers';
import { Knob } from '../src/components/Mixer/Knob';
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
});

describe('TrackHeader', () => {
  it('renders the toggles it has handlers for and reports renames', () => {
    const onToggleMute = vi.fn();
    const onRename = vi.fn();
    const { container, getByLabelText } = render(() => (
      <TrackHeader name="Lead" muted onToggleMute={onToggleMute} onRename={onRename} />
    ));
    expect(container.querySelectorAll('.zylem-track-toggle')).toHaveLength(1);
    getByLabelText('Unmute').click();
    expect(onToggleMute).toHaveBeenCalledTimes(1);

    fireEvent.dblClick(container.querySelector('.zylem-track-header-name')!);
    const input = container.querySelector<HTMLInputElement>('.zylem-track-header-input')!;
    fireEvent.input(input, { target: { value: 'Bass' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onRename).toHaveBeenCalledWith('Bass');
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
    const dial = getByRole('slider');
    fireEvent.keyDown(dial, { key: 'ArrowUp' });
    expect(onChange).toHaveBeenCalledWith(0.6);
    expect(onCommit).toHaveBeenCalledWith(0.6);
    fireEvent.keyDown(dial, { key: 'End' });
    expect(onCommit).toHaveBeenLastCalledWith(1);
  });
});
