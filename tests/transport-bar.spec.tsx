import { render } from '@solidjs/testing-library';
import { afterEach, describe, expect, it } from 'vitest';
import { MixerStrip } from '../src/components/Mixer/MixerStrip';
import { Slider } from '../src/components/Slider/Slider';
import { TransportBar } from '../src/components/TransportBar/TransportBar';

afterEach(() => {
  document.body.innerHTML = '';
});

/** Kobalte renders a slider twice: the focusable thumb, and a hidden range input. */
const valueTexts = (sliders: HTMLElement[]) =>
  sliders.map((slider) => slider.getAttribute('aria-valuetext'));

describe('TransportBar position', () => {
  it('is a named slider that reads the time in seconds', () => {
    const { getAllByRole } = render(() => (
      <TransportBar playing={false} onTogglePlay={() => {}} time={2} length={16} onSeek={() => {}} />
    ));
    expect(valueTexts(getAllByRole('slider', { name: 'Position' }))).toEqual([
      '2 seconds',
      '2 seconds',
    ]);
  });

  it('reads the time as bar and beat in beats', () => {
    const { getAllByRole } = render(() => (
      <TransportBar
        playing={false}
        onTogglePlay={() => {}}
        unit="beats"
        beatsPerBar={3}
        time={4.5}
        length={16}
        onSeek={() => {}}
      />
    ));
    expect(valueTexts(getAllByRole('slider', { name: 'Position' }))).toEqual([
      'bar 2, beat 2.5',
      'bar 2, beat 2.5',
    ]);
  });
});

describe('slider names and values', () => {
  it('names both parts of a Slider from aria-label', () => {
    const { getAllByRole } = render(() => <Slider aria-label="Opacity" value={40} />);
    expect(getAllByRole('slider', { name: 'Opacity' })).toHaveLength(2);
  });

  it('reads a fader in decibels', () => {
    const { getAllByRole } = render(() => <MixerStrip name="Lead" volume={-3} />);
    expect(valueTexts(getAllByRole('slider', { name: 'Lead volume' }))).toEqual([
      '-3.0 dB',
      '-3.0 dB',
    ]);
  });
});
