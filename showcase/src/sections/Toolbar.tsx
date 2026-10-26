import { createSignal } from 'solid-js';
import {
  CAMERA_ICONS,
  Toolbar as ToolbarStrip,
  ToolbarDropdownMenu,
} from '../../../src/components';
import { ToolbarDemo } from '../demos/ToolbarDemo';

function CameraModes() {
  const [camera, setCamera] = createSignal('perspective');

  return (
    <ToolbarStrip>
      <ToolbarDropdownMenu
        items={CAMERA_ICONS.map((item) => ({
          id: item.name,
          label: item.label,
          icon: item.Icon,
        }))}
        value={camera()}
        onChange={setCamera}
      />
    </ToolbarStrip>
  );
}

export function Toolbar() {
  return (
    <div class="section" id="toolbar">
      <h2>Toolbar</h2>
      <h3>.zylem-toolbar + .zylem-toolbar-btn + .zylem-tooltip (hover for tooltip)</h3>
      <div class="demo-container">
        <ToolbarDemo />
      </div>
      <h3>Camera modes</h3>
      <p class="code-label">
        The face is the current camera. Open it to pick another perspective.
      </p>
      <div class="demo-container">
        <CameraModes />
      </div>
    </div>
  );
}
