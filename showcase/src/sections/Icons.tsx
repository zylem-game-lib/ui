import { For, type JSX } from 'solid-js';
import { CAMERA_ICONS } from '../../../src/components';
import { CameraToolbar } from '../demos/CameraToolbar';
import { USED_LUCIDE_ICONS } from '../used-icons';

function IconCard(props: { label: string; name: string; children: JSX.Element }) {
	return (
		<div class="icon-catalog-card">
			{props.children}
			<span>{props.label}</span>
			<span class="code-label">{props.name}</span>
		</div>
	);
}

export function Icons() {
  return (
    <div class="section" id="icons">
      <h2>Camera icons</h2>
      <p class="code-label">
        Original Zylem glyphs sit next to the Lucide icons this repo imports. Zylem glyphs
        come from <code>@zylem/ui/icons</code>. The Lucide row is that import set, not the whole
        library.
      </p>
      <h3>Toolbar</h3>
      <p class="code-label">Click to select a camera mode (exclusive). Hover for the tooltip.</p>
      <div class="demo-container">
        <CameraToolbar />
      </div>
      <h3>Zylem</h3>
      <div class="demo-row icon-catalog">
        <For each={CAMERA_ICONS}>
          {(item) => (
            <IconCard label={item.label} name={item.name}>
              <item.Icon size={32} />
            </IconCard>
          )}
        </For>
      </div>
      <h3>Lucide</h3>
      <div class="demo-row icon-catalog">
        <For each={USED_LUCIDE_ICONS}>
          {(item) => (
            <IconCard label={item.label} name={item.name}>
              <item.Icon size={32} />
            </IconCard>
          )}
        </For>
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
