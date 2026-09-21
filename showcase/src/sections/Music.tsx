import { createMemo, createSignal, For } from 'solid-js';
import { createStore, produce } from 'solid-js/store';
import {
  Knob,
  MixerStrip,
  PianoRoll,
  type PianoRollNote,
  TransportBar,
  Waveform,
} from '../../../src/components';

interface Channel {
  id: string;
  name: string;
  color: string;
  volume: number;
  pan: number;
  mute: boolean;
  solo: boolean;
}

/** A fake stereo file: a decaying pluck with a second hit, for the waveform demo. */
function fakePeaks(bins: number): number[] {
  return Array.from({ length: bins }, (_, i) => {
    const t = i / bins;
    const hit1 = Math.exp(-t * 6) * (0.6 + 0.4 * Math.sin(i * 1.7));
    const hit2 = t > 0.55 ? Math.exp(-(t - 0.55) * 8) * (0.5 + 0.5 * Math.sin(i * 2.3)) : 0;
    return Math.min(1, Math.abs(hit1 + hit2));
  });
}

export function Music() {
  const [notes, setNotes] = createStore<PianoRollNote[]>([
    { id: 'n1', pitch: 60, start: 0, duration: 1, velocity: 0.9 },
    { id: 'n2', pitch: 64, start: 1, duration: 1, velocity: 0.7 },
    { id: 'n3', pitch: 67, start: 2, duration: 1, velocity: 0.8 },
    { id: 'n4', pitch: 72, start: 3, duration: 0.5, velocity: 1 },
    { id: 'n5', pitch: 71, start: 3.5, duration: 0.5, velocity: 0.6 },
    { id: 'n6', pitch: 55, start: 0, duration: 4, velocity: 0.5 },
  ]);
  const [selected, setSelected] = createSignal<string[]>(['n4']);
  const [playing, setPlaying] = createSignal(false);
  const [time, setTime] = createSignal(1.5);
  const [bpm, setBpm] = createSignal(120);
  const [signature, setSignature] = createSignal({ numerator: 4, denominator: 4 });
  const [region, setRegion] = createSignal({ start: 0.4, end: 3.1 });
  const [cutoff, setCutoff] = createSignal(1200);
  const peaks = createMemo(() => fakePeaks(600));

  const [channels, setChannels] = createStore<Channel[]>([
    { id: 'lead', name: 'Lead', color: '#61a6e8', volume: -3, pan: -0.2, mute: false, solo: false },
    { id: 'bass', name: 'Bass', color: '#f0a35e', volume: -6, pan: 0, mute: false, solo: false },
    { id: 'drums', name: 'Drums', color: '#8fd18b', volume: 0, pan: 0.1, mute: true, solo: false },
    { id: 'pad', name: 'Pad', color: '#b48ef0', volume: -12, pan: 0.4, mute: false, solo: false },
  ]);
  const [master, setMaster] = createSignal(0);

  const applyNotes = (changed: PianoRollNote[]) =>
    setNotes(
      produce((list) => {
        for (const next of changed) {
          const index = list.findIndex((note) => note.id === next.id);
          if (index >= 0) list[index] = next;
        }
      }),
    );

  return (
    <div class="section" id="music">
      <h2>Music</h2>

      <h3>Transport in beats</h3>
      <div class="demo-row">
        <div class="demo-container music-transport">
          <TransportBar
            unit="beats"
            playing={playing()}
            onTogglePlay={() => setPlaying(!playing())}
            onStop={() => {
              setPlaying(false);
              setTime(0);
            }}
            time={time()}
            length={16}
            onSeek={setTime}
            bpm={bpm()}
            onBpmChange={setBpm}
            timeSignature={signature()}
            onTimeSignatureChange={setSignature}
          />
        </div>
      </div>

      <h3>Piano roll</h3>
      <p class="code-label">
        Double-click a cell to add a note, drag to move (pitch and time), drag the right edge to
        trim, Shift-click to multi-select, Delete to remove, arrows to nudge and transpose. The
        velocity lane below edits loudness.
      </p>
      <div class="demo-row">
        <div class="demo-container music-roll">
          <PianoRoll
            notes={notes}
            length={4}
            minPitch={48}
            maxPitch={84}
            pixelsPerBeat={72}
            playhead={time() % 4}
            selectedIds={selected()}
            onSelect={setSelected}
            onAddNote={(note) =>
              setNotes(notes.length, { id: `n${Date.now()}`, velocity: 0.8, ...note })
            }
            onChangeNotes={applyNotes}
            onCommitNotes={applyNotes}
            onDeleteNotes={(ids) => {
              setNotes((list) => list.filter((note) => !ids.includes(note.id)));
              setSelected([]);
            }}
            showVelocity
          />
        </div>
      </div>

      <h3>Mixer strips and knobs</h3>
      <div class="demo-row">
        <div class="demo-container music-mixer">
          <For each={channels}>
            {(channel, index) => (
              <MixerStrip
                name={channel.name}
                color={channel.color}
                volume={channel.volume}
                onVolumeChange={(volume) => setChannels(index(), 'volume', volume)}
                pan={channel.pan}
                onPanChange={(pan) => setChannels(index(), 'pan', pan)}
                muted={channel.mute}
                onToggleMute={() => setChannels(index(), 'mute', (mute) => !mute)}
                solo={channel.solo}
                onToggleSolo={() => setChannels(index(), 'solo', (solo) => !solo)}
                level={channel.mute ? 0 : 0.35 + index() * 0.15}
              />
            )}
          </For>
          <MixerStrip
            name="Master"
            master
            volume={master()}
            onVolumeChange={setMaster}
            level={0.7}
          />
          <div class="music-knobs">
            <Knob value={cutoff()} min={20} max={20000} step={10} defaultValue={1200} label="Cutoff" format={(v) => `${Math.round(v)} Hz`} onChange={setCutoff} size={44} />
            <Knob value={0.35} min={0} max={1} step={0.01} label="Reverb" size={44} />
          </div>
        </div>
      </div>

      <h3>Waveform with trim region</h3>
      <div class="demo-row">
        <div class="demo-container music-waveform">
          <Waveform
            peaks={peaks()}
            duration={3.5}
            region={region()}
            onRegionChange={setRegion}
            playhead={(time() / 16) * 3.5}
            onSeek={(seconds) => setTime((seconds / 3.5) * 16)}
            height={72}
          />
          <p class="code-label">
            Trim {region().start.toFixed(2)}s – {region().end.toFixed(2)}s
          </p>
        </div>
      </div>
    </div>
  );
}
