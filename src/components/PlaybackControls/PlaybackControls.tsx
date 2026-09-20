import FastForward from 'lucide-solid/icons/fast-forward';
import Pause from 'lucide-solid/icons/pause';
import Play from 'lucide-solid/icons/play';
import Repeat from 'lucide-solid/icons/repeat';
import Rewind from 'lucide-solid/icons/rewind';
import { type JSX, Show } from 'solid-js';
import { Button } from '../Button/Button';
import { ToolbarButton } from '../ToolbarButton/ToolbarButton';

export interface PlaybackControlsProps {
  playing: boolean;
  onTogglePlay: () => void;
  onRewind?: () => void;
  onFastForward?: () => void;
  /** When defined, a Loop toggle follows the transport buttons. */
  loop?: boolean;
  onToggleLoop?: () => void;
  disabled?: boolean;
  /** Trailing controls: an FPS field, a time readout, a duration field. */
  children?: JSX.Element;
  class?: string;
}

/**
 * Transport strip: rewind, play/pause, fast-forward as glass toolbar
 * buttons, an optional Loop toggle, then whatever the host wants alongside.
 */
export function PlaybackControls(props: PlaybackControlsProps) {
  return (
    <div
      class={props.class ? `zylem-playback ${props.class}` : 'zylem-playback'}
      role="group"
      aria-label="Playback"
    >
      <div class="zylem-playback-transport">
        <ToolbarButton
          label="Rewind"
          disabled={props.disabled || !props.onRewind}
          onClick={() => props.onRewind?.()}
          class="zylem-playback-btn"
        >
          <Rewind class="zylem-icon" />
        </ToolbarButton>
        <ToolbarButton
          label={props.playing ? 'Pause' : 'Play'}
          selected={props.playing}
          disabled={props.disabled}
          onClick={() => props.onTogglePlay()}
          class="zylem-playback-btn zylem-playback-btn--play"
        >
          {props.playing ? <Pause class="zylem-icon" /> : <Play class="zylem-icon" />}
        </ToolbarButton>
        <ToolbarButton
          label="Fast forward"
          disabled={props.disabled || !props.onFastForward}
          onClick={() => props.onFastForward?.()}
          class="zylem-playback-btn"
        >
          <FastForward class="zylem-icon" />
        </ToolbarButton>
      </div>
      <Show when={props.loop !== undefined}>
        <Button
          size="sm"
          variant={props.loop ? 'active' : 'default'}
          aria-pressed={props.loop ? 'true' : 'false'}
          disabled={props.disabled}
          onClick={() => props.onToggleLoop?.()}
          class="zylem-playback-loop"
        >
          <Repeat class="zylem-icon" aria-hidden="true" />
          Loop
        </Button>
      </Show>
      <Show when={props.children}>
        <div class="zylem-playback-extra">{props.children}</div>
      </Show>
    </div>
  );
}
