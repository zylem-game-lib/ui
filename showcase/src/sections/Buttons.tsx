import { Button } from '../../../src/components';

export function Buttons() {
  return (
    <div class="section" id="buttons">
      <h2>Buttons</h2>
      <h3>Variants</h3>
      <div class="demo-row">
        <Button>Default</Button>
        <Button variant="primary">Primary</Button>
        <Button variant="active">Run / Live</Button>
        <Button variant="danger">Delete</Button>
        <Button variant="ghost">Ghost</Button>
        <Button disabled>Disabled</Button>
      </div>
      <h3>Sizes</h3>
      <div class="demo-row">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
        <Button size="icon" aria-label="Add">
          +
        </Button>
      </div>
    </div>
  );
}
