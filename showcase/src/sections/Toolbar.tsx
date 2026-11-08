import Grid3x3 from 'lucide-solid/icons/grid-3x3';
import Magnet from 'lucide-solid/icons/magnet';
import MousePointer from 'lucide-solid/icons/mouse-pointer';
import { For, createSignal } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import {
  CAMERA_ICONS,
  CAMERA_VIEWS,
  MenuButton,
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

const ANGLE_ICONS = [...CAMERA_ICONS, ...CAMERA_VIEWS];

function angleIcon(name: string) {
  const icon = ANGLE_ICONS.find((item) => item.name === name);
  if (!icon) throw new Error(`Unknown camera angle: ${name}`);
  return icon;
}

/** Game and perspective sit above the cube. The square is row-major. */
const COMPASS_HEADER = ['game-camera', 'perspective'] as const;
const COMPASS_SQUARE = [
  'view-iso-left-top',
  'view-top',
  'view-iso-right-top',
  'view-left',
  'free-perspective',
  'view-right',
  'view-iso-left-bottom',
  'view-bottom',
  'view-iso-right-bottom',
] as const;

function CameraToggle() {
  const [camera, setCamera] = createSignal('game-camera');
  const [editorCamera, setEditorCamera] = createSignal('perspective');
  const choose = (id: string) => {
    if (id !== 'game-camera') setEditorCamera(id);
    setCamera(id);
  };
  const current = () => angleIcon(camera());

  return (
    <ToolbarStrip>
      <MenuButton
        label={current().label}
        on={camera() !== 'game-camera'}
        onAction={() => choose(camera() === 'game-camera' ? editorCamera() : 'game-camera')}
        menu={(close) => (
          <div class="zylem-menu-button__compass">
            <div class="zylem-menu-button__compass-row">
              <For each={COMPASS_HEADER}>
                {(name) => {
                  const item = angleIcon(name);
                  return (
                    <ToolbarButton
                      label={item.label}
                      selected={camera() === name}
                      onClick={() => {
                        choose(name);
                        close();
                      }}
                    >
                      <item.Icon class="zylem-icon" />
                    </ToolbarButton>
                  );
                }}
              </For>
            </div>
            <div class="zylem-menu-button__compass-square">
              <For each={COMPASS_SQUARE}>
                {(name) => {
                  const item = angleIcon(name);
                  return (
                    <ToolbarButton
                      label={item.label}
                      selected={camera() === name}
                      onClick={() => {
                        choose(name);
                        close();
                      }}
                    >
                      <item.Icon class="zylem-icon" />
                    </ToolbarButton>
                  );
                }}
              </For>
            </div>
          </div>
        )}
      >
        <Dynamic component={current().Icon} class="zylem-icon" />
      </MenuButton>
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
        <CameraToggle />
      </div>
    </div>
  );
}
