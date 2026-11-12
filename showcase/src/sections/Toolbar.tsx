import Grid3x3 from 'lucide-solid/icons/grid-3x3';
import Magnet from 'lucide-solid/icons/magnet';
import MousePointer from 'lucide-solid/icons/mouse-pointer';
import Plus from 'lucide-solid/icons/plus';
import { For, createSignal } from 'solid-js';
import {
  CAMERA_ICONS,
  CameraToggle,
  type CameraToggleId,
  Toolbar as ToolbarStrip,
  ToolbarButton,
  ToolbarDropdownMenu,
  type ToolbarMode,
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

const CAMERAS = CAMERA_ICONS.map((item) => ({
  id: item.name,
  label: item.label,
  icon: item.Icon,
}));

function CameraModes() {
  const [camera, setCamera] = createSignal('perspective');

  return (
    <ToolbarStrip>
      <ToolbarDropdownMenu items={CAMERAS} value={camera()} onChange={setCamera} />
    </ToolbarStrip>
  );
}

const TOOLBAR_MODES: Array<{ mode: ToolbarMode; label: string }> = [
  { mode: 'black', label: 'Game Preview' },
  { mode: 'primary', label: 'Stage Editor' },
  { mode: 'white', label: 'Level Mesh' },
  { mode: 'brown', label: 'Map Navigation' },
  { mode: 'yellow', label: 'Decorations' },
  { mode: 'magenta', label: 'HUD View' },
  { mode: 'purple', label: 'Entity Inspector' },
];

function ModeStrip(props: { mode: ToolbarMode }) {
  const [on, setOn] = createSignal(true);

  return (
    <ToolbarStrip mode={props.mode}>
      <ToolbarButton label="Add">
        <Plus class="zylem-icon" />
      </ToolbarButton>
      <ToolbarButton label="Select" selected>
        <MousePointer class="zylem-icon" />
      </ToolbarButton>
      <ToolbarButton label="Snap to grid" on={on()} onClick={() => setOn(!on())}>
        <Magnet class="zylem-icon" />
      </ToolbarButton>
    </ToolbarStrip>
  );
}

function CameraToggleDemo() {
  const [camera, setCamera] = createSignal<CameraToggleId>('game');
  const [editorCamera, setEditorCamera] = createSignal<CameraToggleId>('perspective');
  const choose = (id: CameraToggleId) => {
    if (id !== 'game') setEditorCamera(id);
    setCamera(id);
  };

  return (
    <ToolbarStrip>
      <CameraToggle
        value={camera()}
        on={camera() !== 'game'}
        onAction={() => choose(camera() === 'game' ? editorCamera() : 'game')}
        onChange={choose}
      />
    </ToolbarStrip>
  );
}

export function Toolbar() {
  return (
    <div class="section" id="toolbar">
      <h2>Toolbar</h2>
      <h3>Toolbar and ToolbarButton</h3>
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
      <h3>Modes</h3>
      <p class="code-label">
        The rail and resting buttons take the mode color. Selected stays live green, and a toggle
        that is on stays electric blue.
      </p>
      <div class="demo-container toolbar-modes">
        <For each={TOOLBAR_MODES}>
          {(item) => (
            <div>
              <p class="code-label">{item.label}</p>
              <ModeStrip mode={item.mode} />
            </div>
          )}
        </For>
      </div>
      <h3>Camera modes</h3>
      <p class="code-label">
        The face is the current camera. Open it to pick another perspective.
      </p>
      <div class="demo-container">
        <CameraModes />
      </div>
      <h3>Camera toggle</h3>
      <p class="code-label">
        The face switches between the game camera and the last editor camera, and turns electric
        blue while an editor camera is on. The chevron opens a square: free camera in the middle,
        orthographic views on the edges, isometric views on the corners, with game camera and
        perspective on the row above.
      </p>
      <div class="demo-container">
        <CameraToggleDemo />
      </div>
    </div>
  );
}
