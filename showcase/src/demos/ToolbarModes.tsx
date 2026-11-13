import Box from 'lucide-solid/icons/box';
import BrickWall from 'lucide-solid/icons/brick-wall';
import Bug from 'lucide-solid/icons/bug';
import Circle from 'lucide-solid/icons/circle';
import Copy from 'lucide-solid/icons/copy';
import Crosshair from 'lucide-solid/icons/crosshair';
import Cylinder from 'lucide-solid/icons/cylinder';
import Grid2x2 from 'lucide-solid/icons/grid-2x2';
import Grid3x3 from 'lucide-solid/icons/grid-3x3';
import Image from 'lucide-solid/icons/image';
import Link from 'lucide-solid/icons/link';
import Magnet from 'lucide-solid/icons/magnet';
import MapIcon from 'lucide-solid/icons/map';
import MousePointer from 'lucide-solid/icons/mouse-pointer';
import Move3d from 'lucide-solid/icons/move-3d';
import MoveRight from 'lucide-solid/icons/move-right';
import Paintbrush from 'lucide-solid/icons/paintbrush';
import Pause from 'lucide-solid/icons/pause';
import Play from 'lucide-solid/icons/play';
import Plus from 'lucide-solid/icons/plus';
import Pyramid from 'lucide-solid/icons/pyramid';
import RectangleHorizontal from 'lucide-solid/icons/rectangle-horizontal';
import Redo2 from 'lucide-solid/icons/redo-2';
import Rotate3d from 'lucide-solid/icons/rotate-3d';
import Scale3d from 'lucide-solid/icons/scale-3d';
import Scissors from 'lucide-solid/icons/scissors';
import Shield from 'lucide-solid/icons/shield';
import Spline from 'lucide-solid/icons/spline';
import SplinePointer from 'lucide-solid/icons/spline-pointer';
import SprayCan from 'lucide-solid/icons/spray-can';
import Square from 'lucide-solid/icons/square';
import SquareDashed from 'lucide-solid/icons/square-dashed';
import Torus from 'lucide-solid/icons/torus';
import Trash from 'lucide-solid/icons/trash';
import Undo2 from 'lucide-solid/icons/undo-2';
import UnfoldHorizontal from 'lucide-solid/icons/unfold-horizontal';
import { type JSX, createSignal } from 'solid-js';
import {
  CameraToggle,
  type CameraToggleId,
  Separator,
  Toolbar,
  ToolbarButton,
  ToolbarDropdownMenu,
  type ToolbarMode,
} from '../../../src/components';

const BRUSHES = [
  { id: 'box', label: 'Box', icon: Box },
  { id: 'wedge', label: 'Wedge', icon: Pyramid },
  { id: 'cylinder', label: 'Cylinder', icon: Cylinder },
  { id: 'arch', label: 'Arch', icon: Torus },
];

const TRIGGERS = [
  { id: 'box', label: 'Box', icon: SquareDashed },
  { id: 'sphere', label: 'Sphere', icon: Circle },
  { id: 'cylinder', label: 'Cylinder', icon: Cylinder },
];

function Rule() {
  return <Separator orientation="vertical" />;
}

function SelectTool() {
  return (
    <ToolbarButton label="Select" selected>
      <MousePointer class="zylem-icon" />
    </ToolbarButton>
  );
}

function DebugTool(props: { on?: boolean }) {
  const [on, setOn] = createSignal(props.on ?? false);
  return (
    <ToolbarButton label="Debug" on={on()} onClick={() => setOn(!on())}>
      <Bug class="zylem-icon" />
    </ToolbarButton>
  );
}

function PlayTool() {
  const [paused, setPaused] = createSignal(false);
  return (
    <ToolbarButton
      label={paused() ? 'Play' : 'Pause'}
      selected={paused()}
      onClick={() => setPaused(!paused())}
    >
      {paused() ? <Play class="zylem-icon" /> : <Pause class="zylem-icon" />}
    </ToolbarButton>
  );
}

function SnapTool() {
  const [on, setOn] = createSignal(true);
  return (
    <ToolbarButton label="Snap to grid" on={on()} onClick={() => setOn(!on())}>
      <Magnet class="zylem-icon" />
    </ToolbarButton>
  );
}

function GridTool() {
  const [on, setOn] = createSignal(false);
  return (
    <ToolbarButton label="Show grid" on={on()} onClick={() => setOn(!on())}>
      <Grid3x3 class="zylem-icon" />
    </ToolbarButton>
  );
}

function Gizmos() {
  return (
    <>
      <ToolbarButton label="Move">
        <Move3d class="zylem-icon" />
      </ToolbarButton>
      <ToolbarButton label="Rotate">
        <Rotate3d class="zylem-icon" />
      </ToolbarButton>
      <ToolbarButton label="Scale">
        <Scale3d class="zylem-icon" />
      </ToolbarButton>
    </>
  );
}

function History() {
  return (
    <>
      <ToolbarButton label="Undo">
        <Undo2 class="zylem-icon" />
      </ToolbarButton>
      <ToolbarButton label="Redo">
        <Redo2 class="zylem-icon" />
      </ToolbarButton>
    </>
  );
}

function ModeCamera(props: { initial: CameraToggleId }) {
  const [camera, setCamera] = createSignal(props.initial);
  return <CameraToggle value={camera()} on={camera() !== 'game'} onChange={setCamera} />;
}

function BrushMenu() {
  const [shape, setShape] = createSignal('box');
  return <ToolbarDropdownMenu items={BRUSHES} value={shape()} selected={false} onChange={setShape} />;
}

function TriggerMenu() {
  const [shape, setShape] = createSignal('box');
  return (
    <ToolbarDropdownMenu items={TRIGGERS} value={shape()} selected={false} onChange={setShape} />
  );
}

function ModeRow(props: { mode: ToolbarMode; children: JSX.Element }) {
  return <Toolbar mode={props.mode}>{props.children}</Toolbar>;
}

function GamePreview() {
  return (
    <ModeRow mode="black">
      <PlayTool />
      <DebugTool />
    </ModeRow>
  );
}

function StageEditor() {
  return (
    <ModeRow mode="primary">
      <DebugTool on />
      <SelectTool />
      <ModeCamera initial="game" />
      <PlayTool />
      <Rule />
      <Gizmos />
      <SnapTool />
      <Rule />
      <ToolbarButton label="Add object">
        <Plus class="zylem-icon" />
      </ToolbarButton>
      <ToolbarButton label="Delete">
        <Trash class="zylem-icon" />
      </ToolbarButton>
      <Rule />
      <History />
    </ModeRow>
  );
}

function LevelMesh() {
  return (
    <ModeRow mode="white">
      <DebugTool on />
      <SelectTool />
      <ModeCamera initial="top" />
      <Rule />
      <SnapTool />
      <GridTool />
      <Rule />
      <BrushMenu />
      <ToolbarButton label="Clip">
        <Scissors class="zylem-icon" />
      </ToolbarButton>
      <ToolbarButton label="Vertex">
        <Spline class="zylem-icon" />
      </ToolbarButton>
      <ToolbarButton label="Edge">
        <SplinePointer class="zylem-icon" />
      </ToolbarButton>
      <ToolbarButton label="Face">
        <Square class="zylem-icon" />
      </ToolbarButton>
      <ToolbarButton label="Shear">
        <UnfoldHorizontal class="zylem-icon" />
      </ToolbarButton>
      <ToolbarButton label="Subdivide">
        <Grid2x2 class="zylem-icon" />
      </ToolbarButton>
      <Rule />
      <Gizmos />
      <ToolbarButton label="Duplicate">
        <Copy class="zylem-icon" />
      </ToolbarButton>
      <ToolbarButton label="Delete">
        <Trash class="zylem-icon" />
      </ToolbarButton>
      <Rule />
      <History />
    </ModeRow>
  );
}

function MapNavigation() {
  return (
    <ModeRow mode="brown">
      <DebugTool on />
      <SelectTool />
      <ModeCamera initial="top" />
      <Rule />
      <SnapTool />
      <GridTool />
      <Rule />
      <ToolbarButton label="Navigation brush">
        <MapIcon class="zylem-icon" />
      </ToolbarButton>
      <ToolbarButton label="Spawn point">
        <Crosshair class="zylem-icon" />
      </ToolbarButton>
      <TriggerMenu />
      <ToolbarButton label="Directional vector">
        <MoveRight class="zylem-icon" />
      </ToolbarButton>
      <ToolbarButton label="Obstacle brush">
        <BrickWall class="zylem-icon" />
      </ToolbarButton>
      <ToolbarButton label="Delete">
        <Trash class="zylem-icon" />
      </ToolbarButton>
      <Rule />
      <History />
    </ModeRow>
  );
}

function Decorations() {
  return (
    <ModeRow mode="yellow">
      <DebugTool on />
      <SelectTool />
      <ModeCamera initial="top" />
      <Rule />
      <SnapTool />
      <GridTool />
      <Rule />
      <ToolbarButton label="UV brush">
        <Paintbrush class="zylem-icon" />
      </ToolbarButton>
      <ToolbarButton label="Environment decal">
        <Image class="zylem-icon" />
      </ToolbarButton>
      <ToolbarButton label="Splat">
        <SprayCan class="zylem-icon" />
      </ToolbarButton>
      <Rule />
      <Gizmos />
      <Rule />
      <History />
    </ModeRow>
  );
}

function HudView() {
  return (
    <ModeRow mode="magenta">
      <SelectTool />
      <ModeCamera initial="game" />
      <Rule />
      <ToolbarButton label="Place HUD">
        <RectangleHorizontal class="zylem-icon" />
      </ToolbarButton>
      <ToolbarButton label="Bind variable">
        <Link class="zylem-icon" />
      </ToolbarButton>
    </ModeRow>
  );
}

function EntityInspector() {
  return (
    <ModeRow mode="purple">
      <SelectTool />
      <ModeCamera initial="free" />
      <Rule />
      <Gizmos />
      <Rule />
      <ToolbarButton label="Geometry">
        <Box class="zylem-icon" />
      </ToolbarButton>
      <ToolbarButton label="Collision">
        <Shield class="zylem-icon" />
      </ToolbarButton>
    </ModeRow>
  );
}

const MODES: Array<{ label: string; strip: () => JSX.Element }> = [
  { label: 'Game Preview', strip: GamePreview },
  { label: 'Stage Editor', strip: StageEditor },
  { label: 'Level Mesh', strip: LevelMesh },
  { label: 'Map Navigation', strip: MapNavigation },
  { label: 'Decorations', strip: Decorations },
  { label: 'HUD View', strip: HudView },
  { label: 'Entity Inspector', strip: EntityInspector },
];

/** One strip per editor mode, with that mode's tools and resting lights. */
export function ToolbarModes() {
  return (
    <>
      {MODES.map((item) => (
        <div class="toolbar-mode">
          <p class="code-label">{item.label}</p>
          <div class="toolbar-mode-scroll">{item.strip()}</div>
        </div>
      ))}
    </>
  );
}
