import { CameraToolbar } from '../demos/CameraToolbar';
import { ToolbarDemo } from '../demos/ToolbarDemo';

export function Toolbar() {
  return (
    <div class="section" id="toolbar">
      <h2>Toolbar</h2>
      <h3>.zylem-toolbar + .zylem-toolbar-btn + .zylem-tooltip (hover for tooltip)</h3>
      <div class="demo-container">
        <ToolbarDemo />
      </div>
      <h3>Camera modes</h3>
      <p class="code-label">
        Exclusive selection with the Zylem camera icons. Hover a button for its label.
      </p>
      <div class="demo-container">
        <CameraToolbar />
      </div>
    </div>
  );
}
