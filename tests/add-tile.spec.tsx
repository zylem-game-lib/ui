import { render } from '@solidjs/testing-library';
import { afterEach, describe, expect, it } from 'vitest';
import { AddTile } from '../src/components/AddTile/AddTile';
import { Panel } from '../src/components/Panel/Panel';

afterEach(() => {
  document.body.innerHTML = '';
});

describe('AddTile', () => {
  it('names the square tile with its label and shows no text', () => {
    const { container } = render(() => <AddTile label="Color" />);
    const tile = container.querySelector('button')!;
    expect(tile.dataset.variant).toBe('square');
    expect(tile.getAttribute('aria-label')).toBe('Color');
    expect(tile.querySelector('.zylem-add-tile-label')).toBeNull();
  });

  it('shows the label as text for tall and fill tiles', () => {
    const { container } = render(() => (
      <>
        <AddTile variant="tall" label="Frame" />
        <AddTile variant="fill" label="New project" />
      </>
    ));
    const [tall, fill] = Array.from(container.querySelectorAll('button'));
    expect(tall.querySelector('.zylem-add-tile-label')!.textContent).toBe('Frame');
    expect(tall.getAttribute('aria-label')).toBeNull();
    expect(fill.dataset.variant).toBe('fill');
    expect(fill.querySelector('.zylem-add-tile-label')!.textContent).toBe('New project');
  });
});

describe('Panel', () => {
  it('applies bodyClass to the body and keeps it off the root', () => {
    const { container } = render(() => (
      <Panel class="root" bodyClass="column" flush>
        body
      </Panel>
    ));
    const root = container.querySelector('.zylem-panel')!;
    expect(root.classList.contains('root')).toBe(true);
    expect(root.classList.contains('column')).toBe(false);
    expect(root.hasAttribute('bodyclass')).toBe(false);
    const body = container.querySelector('.zylem-panel-body')!;
    expect(body.className).toBe('zylem-panel-body zylem-panel-body--flush column');
  });
});
