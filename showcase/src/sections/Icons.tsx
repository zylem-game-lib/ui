import { For } from 'solid-js';
import { CAMERA_ICONS } from '../../../src/components';
import { CameraToolbar } from '../demos/CameraToolbar';

export function Icons() {
  return (
    <div class="section" id="icons">
      <h2>Camera icons</h2>
      <p class="code-label">
        Original Zylem glyphs that sit next to Lucide: 24×24, currentColor stroke. Import from{' '}
        <code>@zylem/ui/icons</code> or <code>@zylem/ui/components</code>.
      </p>
      <h3>Toolbar</h3>
      <p class="code-label">Click to select a camera mode (exclusive). Hover for the tooltip.</p>
      <div class="demo-container">
        <CameraToolbar />
      </div>
      <h3>Sizes</h3>
      <div class="demo-row icon-size-row">
        <For each={[16, 24, 32, 48] as const}>
          {(size) => (
            <div class="demo-container icon-size-card">
              <span class="code-label">{size}px</span>
              <div class="icon-size-grid">
                <For each={CAMERA_ICONS}>
                  {(item) => (
                    <span title={item.label}>
                      <item.Icon size={size} />
                    </span>
                  )}
                </For>
              </div>
            </div>
          )}
        </For>
      </div>
    </div>
  );
}
