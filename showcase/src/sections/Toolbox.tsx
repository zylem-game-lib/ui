import Boxes from 'lucide-solid/icons/boxes';
import Globe from 'lucide-solid/icons/globe';
import PanelLeft from 'lucide-solid/icons/panel-left';
import Pause from 'lucide-solid/icons/pause';
import Play from 'lucide-solid/icons/play';
import RotateCcw from 'lucide-solid/icons/rotate-ccw';
import Waypoints from 'lucide-solid/icons/waypoints';
import { createSignal } from 'solid-js';
import { ToolboxButton, ToolboxGrid } from '../../../src/components';

export function Toolbox() {
  const [paused, setPaused] = createSignal(false);
  const [editor, setEditor] = createSignal(true);
  const [picker, setPicker] = createSignal<string | null>(null);

  return (
    <div class="section" id="toolbox">
      <h2>Toolbox</h2>
      <p class="code-label">
        Large toolbar-style tiles with the icon over the label; selected uses the live-green jewel.
      </p>
      <div class="demo-row">
        <div class="demo-container toolbox-rail">
          <ToolboxGrid label="Current tools">
            <ToolboxButton label="Restart" onClick={() => {}}>
              <RotateCcw />
            </ToolboxButton>
            <ToolboxButton
              label={paused() ? 'Resume' : 'Pause'}
              selected={paused()}
              onClick={() => setPaused(!paused())}
            >
              {paused() ? <Play /> : <Pause />}
            </ToolboxButton>
            <ToolboxButton label="Editor" selected={editor()} onClick={() => setEditor(!editor())}>
              <PanelLeft />
            </ToolboxButton>
          </ToolboxGrid>
          <ToolboxGrid label="Library">
            <ToolboxButton
              label="Entities"
              selected={picker() === 'entities'}
              onClick={() => setPicker(picker() === 'entities' ? null : 'entities')}
            >
              <Boxes />
            </ToolboxButton>
            <ToolboxButton
              label="Shaders"
              selected={picker() === 'shaders'}
              onClick={() => setPicker(picker() === 'shaders' ? null : 'shaders')}
            >
              <Globe />
            </ToolboxButton>
            <ToolboxButton
              label="Behaviors"
              selected={picker() === 'behaviors'}
              onClick={() => setPicker(picker() === 'behaviors' ? null : 'behaviors')}
            >
              <Waypoints />
            </ToolboxButton>
            <ToolboxButton label="Disabled" disabled>
              <Boxes />
            </ToolboxButton>
          </ToolboxGrid>
        </div>
        <div class="demo-container toolbox-rail">
          <ToolboxGrid label="Three columns" columns={3}>
            <ToolboxButton label="Restart">
              <RotateCcw />
            </ToolboxButton>
            <ToolboxButton label="Pause">
              <Pause />
            </ToolboxButton>
            <ToolboxButton label="Editor" selected>
              <PanelLeft />
            </ToolboxButton>
          </ToolboxGrid>
        </div>
      </div>

      <h3>Extra large</h3>
      <p class="code-label">
        <code>size="xl"</code> for two-column toolboxes, <code>size="lg"</code> for three; set on the
        grid or on an individual button.
      </p>
      <div class="demo-row">
        <div class="demo-container toolbox-rail toolbox-rail--wide">
          <ToolboxGrid label="Two columns, xl" columns={2} size="xl">
            <ToolboxButton label="Entities">
              <Boxes />
            </ToolboxButton>
            <ToolboxButton label="Shaders" selected>
              <Globe />
            </ToolboxButton>
            <ToolboxButton label="Behaviors">
              <Waypoints />
            </ToolboxButton>
            <ToolboxButton label="Editor">
              <PanelLeft />
            </ToolboxButton>
          </ToolboxGrid>
        </div>
        <div class="demo-container toolbox-rail toolbox-rail--wide">
          <ToolboxGrid label="Three columns, lg" columns={3} size="lg">
            <ToolboxButton label="Restart">
              <RotateCcw />
            </ToolboxButton>
            <ToolboxButton label="Pause">
              <Pause />
            </ToolboxButton>
            <ToolboxButton label="Editor" selected>
              <PanelLeft />
            </ToolboxButton>
            <ToolboxButton label="Entities">
              <Boxes />
            </ToolboxButton>
            <ToolboxButton label="Shaders">
              <Globe />
            </ToolboxButton>
            <ToolboxButton label="Behaviors">
              <Waypoints />
            </ToolboxButton>
          </ToolboxGrid>
        </div>
      </div>
    </div>
  );
}
