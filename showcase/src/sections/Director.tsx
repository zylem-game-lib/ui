import { createEffect, createSignal, onCleanup } from 'solid-js';
import { NumberField, PlaybackControls, TimelineTrack } from '../../../src/components';

const KEYFRAMES = [0, 1.5, 4, 6.25, 8.5];

export function Director() {
  const [playing, setPlaying] = createSignal(false);
  const [loop, setLoop] = createSignal(true);
  const [duration, setDuration] = createSignal(10);
  const [time, setTime] = createSignal(5.62);

  // Simple clock: advance while playing, stop or wrap at the end.
  createEffect(() => {
    if (!playing()) return;
    let last = performance.now();
    let frame = requestAnimationFrame(function tick(now) {
      const dt = (now - last) / 1000;
      last = now;
      const next = time() + dt;
      if (next >= duration()) {
        if (loop()) {
          setTime(next - duration());
        } else {
          setTime(duration());
          setPlaying(false);
          return;
        }
      } else {
        setTime(next);
      }
      frame = requestAnimationFrame(tick);
    });
    onCleanup(() => cancelAnimationFrame(frame));
  });

  const seekKeyframe = (direction: -1 | 1) => {
    const t = time();
    const candidates =
      direction < 0
        ? KEYFRAMES.filter((k) => k < t - 0.01)
        : KEYFRAMES.filter((k) => k > t + 0.01);
    if (candidates.length === 0) {
      setTime(direction < 0 ? 0 : duration());
      return;
    }
    setTime(direction < 0 ? candidates[candidates.length - 1]! : candidates[0]!);
  };

  return (
    <div class="section" id="director">
      <h2>Director</h2>

      <h3>Transport with loop and duration</h3>
      <div class="demo-row">
        <div class="demo-container director-panel">
          <div class="director-viewport" aria-hidden="true" />
          <div class="director-transport">
            <PlaybackControls
              playing={playing()}
              onTogglePlay={() => setPlaying(!playing())}
              onRewind={() => seekKeyframe(-1)}
              onFastForward={() => seekKeyframe(1)}
              loop={loop()}
              onToggleLoop={() => setLoop(!loop())}
            >
              <TimelineTrack
                value={time()}
                max={duration()}
                onChange={setTime}
                showTime
                aria-label="Position"
              />
              <NumberField
                aria-label="Duration in seconds"
                value={duration()}
                minValue={1}
                maxValue={120}
                onChange={(d) => {
                  setDuration(d);
                  if (time() > d) setTime(d);
                }}
              />
              <span class="zylem-mono">s</span>
            </PlaybackControls>
          </div>
        </div>
      </div>

      <h3>Keyframe track</h3>
      <p class="code-label">
        Diamonds mark keyframes (click one to jump), dots mark interval boundaries. Rewind and
        fast-forward above step between keyframes.
      </p>
      <div class="demo-row">
        <div class="demo-container director-track">
          <TimelineTrack
            label="Camera"
            value={time()}
            max={duration()}
            onChange={setTime}
            keyframes={KEYFRAMES}
            intervals={10}
            onKeyframeClick={setTime}
            showTime
          />
        </div>
      </div>
      <div class="demo-row">
        <div class="demo-container director-track">
          <TimelineTrack
            label="Ticks only"
            value={time()}
            max={duration()}
            onChange={setTime}
            ticks={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
          />
        </div>
      </div>
    </div>
  );
}
