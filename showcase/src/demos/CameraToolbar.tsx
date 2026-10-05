import { For, createSignal } from 'solid-js';
import {
  CAMERA_ICONS,
  type CameraIconName,
  Toolbar,
  ToolbarButton,
} from '../../../src/components';

/** Exclusive camera-mode strip: perspective, side, top-down, orbit, game. */
export function CameraToolbar() {
  const [camera, setCamera] = createSignal<CameraIconName>('perspective');

  return (
    <Toolbar>
      <For each={CAMERA_ICONS}>
        {(item) => (
          <ToolbarButton
            label={item.label}
            selected={camera() === item.name}
            onClick={() => setCamera(item.name)}
          >
            <item.Icon class="zylem-icon" />
          </ToolbarButton>
        )}
      </For>
    </Toolbar>
  );
}
