import Square from 'lucide-solid/icons/square';
import { type JSX, Show } from 'solid-js';
import { NumberField } from '../NumberField/NumberField';
import { PlaybackControls } from '../PlaybackControls/PlaybackControls';
import { Select } from '../Select/Select';
import { formatBeats, formatClock, type TimeUnit } from '../TimelineLanes/lanes-math';
import { TimelineTrack } from '../TimelineTrack/TimelineTrack';
import { ToolbarButton } from '../ToolbarButton/ToolbarButton';

export interface TransportTimeSignature {
  numerator: number;
  denominator: number;
}

export interface TransportBarProps {
  playing: boolean;
  onTogglePlay: () => void;
  /** Adds a Stop button (pause and return to the start). */
  onStop?: () => void;
  onRewind?: () => void;
  onFastForward?: () => void;
  loop?: boolean;
  onToggleLoop?: () => void;
  /** Playhead, in `unit`s. */
  time: number;
  /** Timeline length, in `unit`s. */
  length: number;
  onSeek?: (time: number) => void;
  unit?: TimeUnit;
  /** Beats per bar, for the beat readout. */
  beatsPerBar?: number;
  /** Shows a BPM field when set. */
  bpm?: number;
  onBpmChange?: (bpm: number) => void;
  /** Shows a time-signature select when set. */
  timeSignature?: TransportTimeSignature;
  onTimeSignatureChange?: (signature: TransportTimeSignature) => void;
  /** Extra controls after the built-in ones. */
  children?: JSX.Element;
  disabled?: boolean;
  class?: string;
}

const SIGNATURES: TransportTimeSignature[] = [
  { numerator: 2, denominator: 4 },
  { numerator: 3, denominator: 4 },
  { numerator: 4, denominator: 4 },
  { numerator: 5, denominator: 4 },
  { numerator: 6, denominator: 8 },
  { numerator: 7, denominator: 8 },
  { numerator: 12, denominator: 8 },
];

const signatureKey = (signature: TransportTimeSignature) =>
  `${signature.numerator}/${signature.denominator}`;

/** Readout for the current position: `m:ss.ff` for seconds, `bar.beat` for beats. */
export function formatTransportTime(time: number, unit: TimeUnit, beatsPerBar = 4): string {
  return unit === 'beats' ? formatBeats(time, beatsPerBar) : formatClock(time);
}

/**
 * Transport strip for the Director and Music editors: playback controls, a
 * scrub track with a position readout, and optional BPM / time signature.
 */
export function TransportBar(props: TransportBarProps) {
  const unit = () => props.unit ?? 'seconds';
  const bpb = () => props.beatsPerBar ?? props.timeSignature?.numerator ?? 4;
  const signatureOptions = () => {
    const options = SIGNATURES.map((signature) => ({
      value: signatureKey(signature),
      label: signatureKey(signature),
    }));
    const current = props.timeSignature ? signatureKey(props.timeSignature) : null;
    if (current && !options.some((option) => option.value === current)) {
      options.push({ value: current, label: current });
    }
    return options;
  };

  return (
    <div
      class={props.class ? `zylem-transport ${props.class}` : 'zylem-transport'}
      data-unit={unit()}
    >
      <PlaybackControls
        playing={props.playing}
        onTogglePlay={props.onTogglePlay}
        onRewind={props.onRewind}
        onFastForward={props.onFastForward}
        loop={props.loop}
        onToggleLoop={props.onToggleLoop}
        disabled={props.disabled}
      >
        <Show when={props.onStop}>
          <ToolbarButton
            label="Stop"
            disabled={props.disabled}
            onClick={() => props.onStop?.()}
            class="zylem-transport-stop"
          >
            <Square class="zylem-icon" />
          </ToolbarButton>
        </Show>
        <TimelineTrack
          value={props.time}
          max={props.length}
          onChange={(value) => props.onSeek?.(value)}
          disabled={props.disabled || !props.onSeek}
          class="zylem-transport-track"
        />
        <span class="zylem-transport-time" aria-live="off">
          {formatTransportTime(props.time, unit(), bpb())}
          <span class="zylem-transport-time-total">
            {' / '}
            {formatTransportTime(props.length, unit(), bpb())}
          </span>
        </span>
        <Show when={props.bpm !== undefined}>
          <label class="zylem-transport-field">
            <span class="zylem-transport-field-label">BPM</span>
            <NumberField
              value={props.bpm}
              minValue={20}
              maxValue={300}
              step={1}
              disabled={props.disabled || !props.onBpmChange}
              onChange={(value) => props.onBpmChange?.(value)}
              class="zylem-transport-bpm"
            />
          </label>
        </Show>
        <Show when={props.timeSignature}>
          {(signature) => (
            <Select
              options={signatureOptions()}
              value={signatureKey(signature())}
              disabled={props.disabled || !props.onTimeSignatureChange}
              onChange={(value) => {
                if (!value) return;
                const [numerator, denominator] = value.split('/').map(Number);
                if (numerator && denominator) {
                  props.onTimeSignatureChange?.({ numerator, denominator });
                }
              }}
              class="zylem-transport-signature"
            />
          )}
        </Show>
        {props.children}
      </PlaybackControls>
    </div>
  );
}
