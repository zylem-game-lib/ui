import Zap from 'lucide-solid/icons/zap';
import { Perspective } from '../../../src/icons';
import { createEffect, createSignal, For, onCleanup } from 'solid-js';
import { createStore, produce } from 'solid-js/store';
import {
  KeyframeMarker,
  TimelineClip,
  TimelineLane,
  TimelineLaneGroup,
  TimelineLanes,
  TrackHeader,
  TransportBar,
} from '../../../src/components';

interface Shot {
  id: string;
  camera: string;
  start: number;
  length: number;
  blend: number;
}

export function Timeline() {
  const [playing, setPlaying] = createSignal(false);
  const [loop, setLoop] = createSignal(true);
  const [time, setTime] = createSignal(3.2);
  const [zoom, setZoom] = createSignal(48);
  const [selected, setSelected] = createSignal<string | null>('shot-2');
  const duration = 16;
  const [shots, setShots] = createStore<Shot[]>([
    { id: 'shot-1', camera: 'Wide', start: 0, length: 5, blend: 0 },
    { id: 'shot-2', camera: 'Dolly', start: 5, length: 6, blend: 1.5 },
    { id: 'shot-3', camera: 'Close-up', start: 11, length: 5, blend: 0.5 },
  ]);
  const [keyframes, setKeyframes] = createSignal([0.5, 4, 7.25, 10]);
  const [events, setEvents] = createSignal([
    { id: 'e1', time: 2, label: 'Play song' },
    { id: 'e2', time: 8.5, label: 'Explosion' },
  ]);
  const [muted, setMuted] = createSignal(false);

  createEffect(() => {
    if (!playing()) return;
    let last = performance.now();
    let frame = requestAnimationFrame(function tick(now) {
      const dt = (now - last) / 1000;
      last = now;
      const next = time() + dt;
      if (next >= duration) {
        if (loop()) setTime(next - duration);
        else {
          setTime(duration);
          setPlaying(false);
          return;
        }
      } else setTime(next);
      frame = requestAnimationFrame(tick);
    });
    onCleanup(() => cancelAnimationFrame(frame));
  });

  const updateShot = (id: string, bounds: { start: number; length: number }) =>
    setShots(
      produce((list) => {
        const shot = list.find((candidate) => candidate.id === id);
        if (shot) Object.assign(shot, bounds);
      }),
    );

  return (
    <div class="section" id="timeline">
      <h2>Timeline lanes</h2>
      <p class="code-label">
        Sticky ruler and headers, clips that move and trim (with snap), keyframe diamonds and
        event pins that drag, a playhead across every lane. Ctrl/⌘ + wheel zooms.
      </p>
      <div class="demo-row">
        <div class="demo-container timeline-demo">
          <TransportBar
            playing={playing()}
            onTogglePlay={() => setPlaying(!playing())}
            onStop={() => {
              setPlaying(false);
              setTime(0);
            }}
            loop={loop()}
            onToggleLoop={() => setLoop(!loop())}
            time={time()}
            length={duration}
            onSeek={setTime}
          />
          <TimelineLanes
            scale={{ unit: 'seconds', pixelsPerUnit: zoom() }}
            length={duration}
            playhead={time()}
            onSeek={setTime}
            snap={0.25}
            onZoom={setZoom}
            range={loop() ? { start: 0, end: duration } : undefined}
            corner="Intro cutscene"
            class="timeline-demo-lanes"
          >
            <TimelineLane
              header={<TrackHeader name="Scenes" detail="3 scenes" />}
              height={32}
            >
              <TimelineClip start={0} length={5} label="Establishing" color="#7fd6d1" movable={false} resizable={false} />
              <TimelineClip start={5} length={6} label="Approach" color="#7fd6d1" movable={false} resizable={false} />
              <TimelineClip start={11} length={5} label="Reveal" color="#7fd6d1" movable={false} resizable={false} />
            </TimelineLane>
            <TimelineLane
              header={
                <TrackHeader
                  name="Cameras"
                  icon={<Perspective />}
                  detail="Shots + blends"
                  selected={selected() === 'cameras'}
                  onSelect={() => setSelected('cameras')}
                  locked={false}
                  onToggleLock={() => {}}
                />
              }
              selected={selected() === 'cameras' || (selected()?.startsWith('shot') ?? false)}
              onSelectEmpty={() => setSelected(null)}
            >
              <For each={shots}>
                {(shot) => (
                  <TimelineClip
                    start={shot.start}
                    length={shot.length}
                    blend={shot.blend}
                    label={shot.camera}
                    color="#61a6e8"
                    selected={selected() === shot.id}
                    onSelect={() => setSelected(shot.id)}
                    onChange={(change) => updateShot(shot.id, change)}
                    minLength={0.5}
                  />
                )}
              </For>
            </TimelineLane>
            <TimelineLaneGroup header={<span style={{ padding: '0 8px' }}>Dolly keyframes</span>}>
              <TimelineLane header={<TrackHeader name="Position" detail="4 keys" />} height={28}>
                <For each={keyframes()}>
                  {(t, index) => (
                    <KeyframeMarker
                      time={t}
                      label={`Key ${index() + 1}`}
                      selected={selected() === `key-${index()}`}
                      onSelect={() => setSelected(`key-${index()}`)}
                      onChange={(next) =>
                        setKeyframes((list) => list.map((k, i) => (i === index() ? next : k)))
                      }
                    />
                  )}
                </For>
              </TimelineLane>
            </TimelineLaneGroup>
            <TimelineLane
              header={
                <TrackHeader
                  name="Events"
                  icon={<Zap />}
                  muted={muted()}
                  onToggleMute={() => setMuted(!muted())}
                />
              }
              dimmed={muted()}
              height={36}
              onCreate={(t) =>
                setEvents((list) => [...list, { id: `e${list.length + 1}`, time: t, label: 'New event' }])
              }
            >
              <For each={events()}>
                {(event) => (
                  <KeyframeMarker
                    shape="pin"
                    time={event.time}
                    label={event.label}
                    selected={selected() === event.id}
                    onSelect={() => setSelected(event.id)}
                    onChange={(next) =>
                      setEvents((list) =>
                        list.map((item) => (item.id === event.id ? { ...item, time: next } : item)),
                      )
                    }
                  />
                )}
              </For>
            </TimelineLane>
          </TimelineLanes>
        </div>
      </div>
    </div>
  );
}
