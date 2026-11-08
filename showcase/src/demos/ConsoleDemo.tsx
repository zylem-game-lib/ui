import { createSignal } from 'solid-js';
import { Console } from '../../../src/components';

const initialOutput = `[INFO] Game initialized
[INFO] Stage loaded: main-level
[DEBUG] Entity count: 15
[INFO] Frame rate: 60 FPS`;

/** Editor console: log text with an overlaid Clear action. */
export function ConsoleDemo() {
  const [content, setContent] = createSignal(initialOutput);

  return (
    <Console value={content()} onInput={setContent} onClear={() => setContent('')} />
  );
}
