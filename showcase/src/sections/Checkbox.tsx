import { Checkbox as UICheckbox } from '../../../src/components';

export function Checkbox() {
  return (
    <div class="section" id="checkbox">
      <h2>Checkbox</h2>
      <h3>Checkbox component (Kobalte + .zylem-checkbox-*)</h3>
      <div class="demo-container">
        <div style={{ display: 'flex', 'flex-direction': 'column', gap: 'var(--zylem-spacing-md)' }}>
          <UICheckbox label="Show grid" defaultChecked />
          <UICheckbox label="Snap to grid" />
          <UICheckbox label="Physics debug (disabled)" disabled />
        </div>
      </div>
    </div>
  );
}
