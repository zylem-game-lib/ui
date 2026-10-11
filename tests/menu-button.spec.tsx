import { render } from '@solidjs/testing-library';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { MenuButton } from '../src/components/MenuButton/MenuButton';

afterEach(() => {
  document.body.innerHTML = '';
});

const CHEVRON = '.zylem-menu-button__chevron';
const FACE = '.zylem-menu-button__face';

/** Rendered with no tooltip, to keep the assertions about this button alone. */
function renderMenuButton(onAction?: () => void) {
  return render(() => (
    <MenuButton
      label="Add"
      tooltip={null}
      menu={() => <span>palette</span>}
      onAction={onAction}
    >
      <span>icon</span>
    </MenuButton>
  ));
}

describe('MenuButton', () => {
  it('shows the chevron when the face carries its own action', () => {
    const { container } = renderMenuButton(() => {});
    const chevron = container.querySelector(CHEVRON)!;

    expect(container.querySelectorAll(CHEVRON)).toHaveLength(1);
    expect(chevron.querySelector('svg')).not.toBeNull();
  });

  it('shows the chevron when the whole button opens the menu', () => {
    // The chevron is the only sign that a button has a menu, so tying it to
    // `onAction` left the editor's Add button looking like a plain button until
    // something had been picked from the palette it was hiding.
    const { container } = renderMenuButton();

    expect(container.querySelectorAll(CHEVRON)).toHaveLength(1);
    expect(container.querySelector(`${CHEVRON} svg`)).not.toBeNull();
  });

  it('treats the chevron as decoration when the face is the trigger', () => {
    const { container } = renderMenuButton();
    const chevron = container.querySelector(CHEVRON)!;

    // A nested button would be invalid inside the trigger, and a second
    // Kobalte trigger under one root is unsupported — so it is a plain span
    // inside the face, and a click on it opens the menu via the face.
    expect(chevron.tagName).toBe('SPAN');
    expect(chevron.getAttribute('aria-hidden')).toBe('true');
    expect(chevron.closest(FACE)).not.toBeNull();
  });

  it('keeps the chevron its own trigger in split mode', () => {
    const onAction = vi.fn();
    const { container } = renderMenuButton(onAction);
    const chevron = container.querySelector(CHEVRON)!;

    expect(chevron.tagName).toBe('BUTTON');
    // Beside the face, not within it, so opening the menu does not also fire
    // the face's action.
    expect(chevron.closest(FACE)).toBeNull();

    (container.querySelector(FACE) as HTMLElement).click();
    expect(onAction).toHaveBeenCalledTimes(1);
  });

  it('names its panel after the button', () => {
    render(() => (
      <MenuButton label="Add" tooltip={null} open menu={() => <span>palette</span>}>
        <span>icon</span>
      </MenuButton>
    ));
    const panel = document.querySelector('.zylem-menu-button__panel')!;
    expect(panel).not.toBeNull();
    expect(panel.getAttribute('aria-label')).toBe('Add');
  });

  it('does not widen the button to make room for the chevron', () => {
    const { container } = renderMenuButton();

    // Overlapping the face's trailing corner is what keeps a MenuButton the
    // same width as its plain neighbours in a toolbar.
    expect(container.querySelector(CHEVRON)!.parentElement).not.toBe(
      container.querySelector('.zylem-menu-button'),
    );
  });
});
