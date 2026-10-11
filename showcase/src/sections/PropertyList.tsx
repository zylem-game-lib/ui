import { createSignal } from 'solid-js';
import { PropertyList as List, PropertyRow } from '../../../src/components';

const IMAGE_PATH = '/assets/textures/backgrounds/space-nebula.png';

export function PropertyList() {
  const [revealed, setRevealed] = createSignal<string | null>(null);

  return (
    <div class="section" id="property-list">
      <h2>Property List</h2>
      <h3>PropertyList + PropertyRow</h3>
      <p class="code-label">
        Long paths keep their last segments; with <code>onPathClick</code> the truncated value is a
        button that reveals the full path.
      </p>
      <div class="demo-container" style={{ width: '400px' }}>
        <List>
          <PropertyRow label="ID" value="demo-game" />
          <PropertyRow label="Aspect Ratio" value="1.778" />
          <PropertyRow label="Gravity" value="X:0.00 Y:-9.81 Z:0.00" />
          <PropertyRow label="Image" value={IMAGE_PATH} onPathClick={setRevealed} />
        </List>
        <p class="code-label">{revealed() ? `Revealed: ${revealed()}` : 'Nothing revealed yet.'}</p>
      </div>
    </div>
  );
}
