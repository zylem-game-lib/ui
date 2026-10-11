import Box from 'lucide-solid/icons/box';
import Menu from 'lucide-solid/icons/menu';
import MousePointer from 'lucide-solid/icons/mouse-pointer';
import Pause from 'lucide-solid/icons/pause';
import Plus from 'lucide-solid/icons/plus';
import {
  AddTile,
  Button,
  MenuButton,
  ToolButton,
  ToolbarButton,
  ToolboxButton,
  WindowControls,
} from '../../../src/components';

export function Buttons() {
  return (
    <div class="section" id="buttons">
      <h2>Buttons</h2>
      <h3>Button</h3>
      <div class="demo-row">
        <Button>Default</Button>
        <Button variant="primary">Primary</Button>
        <Button variant="active">Run / Live</Button>
        <Button variant="danger">Delete</Button>
        <Button variant="ghost">Ghost</Button>
        <Button disabled>Disabled</Button>
      </div>
      <div class="demo-row">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
        <Button size="icon" aria-label="Add" icon={<Plus />} />
        <Button icon={<Plus />}>Add</Button>
      </div>

      <h3>ToolbarButton</h3>
      <div class="demo-row">
        <ToolbarButton label="Select">
          <MousePointer class="zylem-icon" />
        </ToolbarButton>
        <ToolbarButton label="Select" selected>
          <MousePointer class="zylem-icon" />
        </ToolbarButton>
        <ToolbarButton label="Pause" pressed>
          <Pause class="zylem-icon" />
        </ToolbarButton>
        <ToolbarButton label="Add" disabled>
          <Plus class="zylem-icon" />
        </ToolbarButton>
      </div>

      <h3>MenuButton</h3>
      <div class="demo-row">
        <MenuButton
          label="Add"
          onAction={() => {}}
          menu={(close) => (
            <div class="demo-row" style={{ padding: '8px' }}>
              <Button size="sm" onClick={close}>
                Box
              </Button>
            </div>
          )}
        >
          <Plus />
        </MenuButton>
        <MenuButton
          label="Menu"
          menu={(close) => (
            <div class="demo-row" style={{ padding: '8px' }}>
              <Button size="sm" onClick={close}>
                Box
              </Button>
            </div>
          )}
        >
          <Menu />
        </MenuButton>
      </div>

      <h3>ToolboxButton</h3>
      <div class="demo-row">
        <ToolboxButton label="Primitives">
          <Box class="zylem-icon" />
        </ToolboxButton>
        <ToolboxButton label="Primitives" selected>
          <Box class="zylem-icon" />
        </ToolboxButton>
      </div>

      <h3>ToolButton</h3>
      <div class="demo-row">
        <ToolButton tool="pencil" selected />
        <ToolButton tool="fill" />
        <ToolButton tool="eraser" />
      </div>

      <h3>WindowControls</h3>
      <div class="demo-row">
        <WindowControls onCollapse={() => {}} onClose={() => {}} />
      </div>

      <h3>AddTile</h3>
      <div class="demo-row">
        <AddTile />
      </div>
    </div>
  );
}
