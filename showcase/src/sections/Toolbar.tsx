import Grid3x3 from 'lucide-solid/icons/grid-3x3';
import Magnet from 'lucide-solid/icons/magnet';
import MousePointer from 'lucide-solid/icons/mouse-pointer';
import { createSignal } from 'solid-js';
import {
  CAMERA_ICONS,
  Toolbar as ToolbarStrip,
  ToolbarButton,
  ToolbarDropdownMenu,
} from '../../../src/components';
import { ToolbarDemo } from '../demos/ToolbarDemo';

function ViewToggles() {
  const [snap, setSnap] = createSignal(true);
  const [showGrid, setShowGrid] = createSignal(false);

  return (
    <ToolbarStrip>
      <ToolbarButton label="Select" selected>
        <MousePointer class="zylem-icon" />
      </ToolbarButton>
      <ToolbarButton label="Snap to grid" on={snap()} onClick={() => setSnap(!snap())}>
        <Magnet class="zylem-icon" />
      </ToolbarButton>
      <ToolbarButton label="Show grid" on={showGrid()} onClick={() => setShowGrid(!showGrid())}>
        <Grid3x3 class="zylem-icon" />
      </ToolbarButton>
    </ToolbarStrip>
  );
}

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
      <h3>On toggles</h3>
      <p class="code-label">
        Select stays live green. Snap to grid and Show grid turn electric blue while on.
      </p>
      <div class="demo-container">
        <ViewToggles />
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
