import Bug from 'lucide-solid/icons/bug';
import MousePointer from 'lucide-solid/icons/mouse-pointer';
import Pause from 'lucide-solid/icons/pause';
import Play from 'lucide-solid/icons/play';
import Plus from 'lucide-solid/icons/plus';
import Trash2 from 'lucide-solid/icons/trash-2';
import { createSignal } from 'solid-js';
import { Toolbar, ToolbarButton } from '../../../src/components';

/** Interactive replica of the editor's toolbar: Debug, Delete, Add, Select, Play/Pause. */
export function ToolbarDemo() {
  const [debug, setDebug] = createSignal(false);
  const [mode, setMode] = createSignal<'add' | 'select' | null>('select');
  const [paused, setPaused] = createSignal(false);

  return (
    <Toolbar>
      <ToolbarButton label="Debug" selected={debug()} onClick={() => setDebug(!debug())}>
        <Bug class="zylem-icon" />
      </ToolbarButton>
      <ToolbarButton label="Delete" onClick={() => {}}>
        <Trash2 class="zylem-icon" />
      </ToolbarButton>
      <ToolbarButton
        label="Add"
        selected={mode() === 'add'}
        onClick={() => setMode(mode() === 'add' ? null : 'add')}
      >
        <Plus class="zylem-icon" />
      </ToolbarButton>
      <ToolbarButton
        label="Select"
        selected={mode() === 'select'}
        onClick={() => setMode(mode() === 'select' ? null : 'select')}
      >
        <MousePointer class="zylem-icon" />
      </ToolbarButton>
      <ToolbarButton
        label={paused() ? 'Play' : 'Pause'}
        selected={paused()}
        onClick={() => setPaused(!paused())}
      >
        {paused() ? <Play class="zylem-icon" /> : <Pause class="zylem-icon" />}
      </ToolbarButton>
    </Toolbar>
  );
}
