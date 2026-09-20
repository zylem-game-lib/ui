import { For, createSignal, onMount } from 'solid-js';
import {
  ART_TOOLS,
  AddTile,
  Button,
  ColorPalette,
  Dialog,
  FrameActions,
  FrameStrip,
  FrameThumb,
  NumberField,
  PixelGrid,
  PlaybackControls,
  SpriteSizePicker,
  type ArtTool,
  type SpriteSize,
  TRANSPARENT,
  TextField,
  ToolButton,
  ToolGroup,
  Toolbar,
} from '../../../src/components';

const PALETTE = [
  '#1B1F2A',
  '#5E2A5E',
  '#C93A3A',
  '#F07A3A',
  '#F5C04A',
  '#8BD64A',
  '#3BA85A',
  '#2A7A6E',
  '#2A5FA8',
  '#3A4AC9',
  '#3A9AF0',
  '#5CE6F0',
  '#F4F8FF',
  '#9AA8B8',
  '#5C6878',
  '#2E3646',
];

const SHORTCUTS: Partial<Record<ArtTool, string>> = {
  pencil: 'B',
  fill: 'G',
  eraser: 'E',
  rectangle: 'U',
  ellipse: 'O',
  select: 'M',
  eyedropper: 'I',
  move: 'V',
};

/** Paint a tiny smiley so the checker reads through the transparent pixels. */
function paintSample(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#F5C04A';
  ctx.beginPath();
  ctx.arc(16, 16, 11, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#1B1F2A';
  ctx.fillRect(11, 12, 3, 3);
  ctx.fillRect(18, 12, 3, 3);
  ctx.fillRect(10, 19, 2, 2);
  ctx.fillRect(12, 21, 8, 2);
  ctx.fillRect(20, 19, 2, 2);
}

function NewSpriteForm(props: { size: SpriteSize; onSize: (size: SpriteSize) => void }) {
  return (
    <div class="sprite-new-form">
      <TextField label="Name" value="New sprite" />
      <span class="zylem-tool-group-label">Size presets</span>
      <SpriteSizePicker
        width={props.size.width}
        height={props.size.height}
        onChange={props.onSize}
      />
    </div>
  );
}

export function SpriteEditor() {
  const [size, setSize] = createSignal<SpriteSize>({ width: 32, height: 32 });
  const [dialogOpen, setDialogOpen] = createSignal(false);
  const [tool, setTool] = createSignal<ArtTool>('pencil');
  const [color, setColor] = createSignal<string>(PALETTE[4]!);
  const [colors, setColors] = createSignal<string[]>(PALETTE);
  const [frames, setFrames] = createSignal<number[]>([1, 2, 3]);
  const [current, setCurrent] = createSignal(0);
  const [playing, setPlaying] = createSignal(false);
  const [fps, setFps] = createSignal(8);
  let nextFrameId = 4;

  const addFrame = () => {
    setFrames([...frames(), nextFrameId++]);
    setCurrent(frames().length - 1);
  };
  const duplicateFrame = () => {
    const list = [...frames()];
    list.splice(current() + 1, 0, nextFrameId++);
    setFrames(list);
    setCurrent(current() + 1);
  };
  const deleteFrame = () => {
    if (frames().length <= 1) return;
    const list = frames().filter((_, i) => i !== current());
    setFrames(list);
    setCurrent(Math.min(current(), list.length - 1));
  };

  return (
    <div class="section" id="sprite-editor">
      <h2>Sprite Editor</h2>

      <h3>New sprite: size picker</h3>
      <p class="code-label">
        Presets set both dimensions; drag the right, bottom, or corner handle of the 1:1 preview in
        2px steps. Selected: {size().width} × {size().height}
      </p>
      <div class="demo-row">
        <div class="demo-container sprite-new-card">
          <NewSpriteForm size={size()} onSize={setSize} />
          <div class="sprite-new-actions">
            <Button onClick={() => setSize({ width: 32, height: 32 })}>Reset</Button>
            <Button variant="primary" onClick={() => setDialogOpen(true)}>
              Open as dialog
            </Button>
          </div>
        </div>
      </div>
      <Dialog
        open={dialogOpen()}
        onOpenChange={setDialogOpen}
        title="New sprite"
        footer={
          <>
            <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={() => setDialogOpen(false)}>
              Create
            </Button>
          </>
        }
      >
        <NewSpriteForm size={size()} onSize={setSize} />
      </Dialog>

      <h3>Pixel grid</h3>
      <p class="code-label">
        PixelGrid 32×32 at zoom 8 with a transparent canvas on top; the lighter checker marks empty
        pixels.
      </p>
      <div class="demo-row">
        <div class="demo-container sprite-canvas-stage">
          <PixelGrid width={32} height={32} zoom={8} checkerCell={8}>
            <canvas width={32} height={32} ref={(el) => onMount(() => paintSample(el))} />
          </PixelGrid>
        </div>
        <PixelGrid width={16} height={16} zoom={4} />
        <PixelGrid width={64} height={32} zoom={2} checkerCell={4} />
      </div>

      <h3>Tools and palette</h3>
      <div class="demo-row">
        <Toolbar class="sprite-rail">
          <ToolGroup label="Tools">
            <For each={ART_TOOLS}>
              {(id) => (
                <ToolButton
                  tool={id}
                  shortcut={SHORTCUTS[id]}
                  selected={tool() === id}
                  onClick={() => setTool(id)}
                />
              )}
            </For>
          </ToolGroup>
          <ToolGroup label="Palette">
            <ColorPalette
              colors={colors()}
              value={color()}
              onSelect={setColor}
              onAdd={() => {
                const hue = Math.floor(Math.random() * 360);
                setColors([...colors(), `hsl(${hue} 70% 55%)`]);
              }}
            />
          </ToolGroup>
        </Toolbar>
      </div>
      <p class="code-label">
        Tool: {tool()} · Color: {color() === TRANSPARENT ? 'transparent' : color()}
      </p>

      <h3>Frames and playback</h3>
      <div class="demo-row">
        <div class="demo-container sprite-timeline">
          <FrameStrip title="idle">
            <For each={frames()}>
              {(id, index) => (
                <FrameThumb
                  index={index() + 1}
                  selected={current() === index()}
                  onClick={() => setCurrent(index())}
                >
                  {index() === 0 ? (
                    <canvas width={32} height={32} ref={(el) => onMount(() => paintSample(el))} />
                  ) : null}
                </FrameThumb>
              )}
            </For>
            <AddTile variant="tall" label="Frame" onClick={addFrame} />
          </FrameStrip>
          <FrameActions
            onDuplicate={duplicateFrame}
            onDelete={deleteFrame}
            canDelete={frames().length > 1}
            onPrev={() => setCurrent(Math.max(0, current() - 1))}
            onNext={() => setCurrent(Math.min(frames().length - 1, current() + 1))}
            canPrev={current() > 0}
            canNext={current() < frames().length - 1}
          />
          <PlaybackControls
            playing={playing()}
            onTogglePlay={() => setPlaying(!playing())}
            onRewind={() => setCurrent(0)}
            onFastForward={() => setCurrent(frames().length - 1)}
          >
            <NumberField value={fps()} minValue={1} maxValue={60} onChange={setFps} />
            <span>
              FPS {current() + 1}/{frames().length}
            </span>
          </PlaybackControls>
        </div>
      </div>
    </div>
  );
}
