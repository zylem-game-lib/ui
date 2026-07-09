import { createSignal } from 'solid-js';
import { Checkbox, Slider, Switch } from '../../../src/components';

export function Toggles() {
  const [speed, setSpeed] = createSignal(125);
  const [volume, setVolume] = createSignal(0.75);

  return (
    <div class="section" id="toggles">
      <h2>Checkbox / Switch / Slider</h2>
      <div class="demo-container">
        <div
          style={{
            display: 'flex',
            'flex-direction': 'column',
            gap: 'var(--zylem-spacing-md)',
            'max-width': '360px',
          }}
        >
          <Checkbox label="Show grid" defaultChecked />
          <Checkbox label="Snap to grid" />
          <Checkbox label="Physics debug (disabled)" disabled />
          <Switch label="Toggle on" defaultChecked />
          <Switch label="Toggle off" />
          <Slider
            label="Speed"
            value={speed()}
            onChange={setSpeed}
            minValue={0}
            maxValue={500}
            step={5}
            showValue
          />
          <Slider
            label="Volume"
            value={volume()}
            onChange={setVolume}
            minValue={0}
            maxValue={1}
            step={0.01}
            showValue
          />
        </div>
      </div>
    </div>
  );
}
