import { For, Show, type Component } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import {
  FreePerspective,
  GameCamera,
  Perspective,
  ViewBottom,
  ViewIsoLeftBottom,
  ViewIsoLeftTop,
  ViewIsoRightBottom,
  ViewIsoRightTop,
  ViewLeft,
  ViewRight,
  ViewTop,
} from '../../icons';
import { MenuButton, type MenuButtonProps } from '../MenuButton/MenuButton';
import { ToolbarButton } from '../ToolbarButton/ToolbarButton';

/** Game and perspective sit above the cube. The square is row-major. */
const HEADER = ['game', 'perspective'] as const;
const SQUARE = [
  'iso-left-top',
  'top',
  'iso-right-top',
  'left',
  'free',
  'right',
  'iso-left-bottom',
  'bottom',
  'iso-right-bottom',
] as const;

export const CAMERA_TOGGLE_IDS = [...HEADER, ...SQUARE] as const;

export type CameraToggleId = (typeof CAMERA_TOGGLE_IDS)[number];

const VIEWS: Record<CameraToggleId, { label: string; icon: Component<{ class?: string }> }> = {
  game: { label: 'Game camera', icon: GameCamera },
  perspective: { label: 'Perspective', icon: Perspective },
  'iso-left-top': { label: 'Iso left/top', icon: ViewIsoLeftTop },
  top: { label: 'Top', icon: ViewTop },
  'iso-right-top': { label: 'Iso right/top', icon: ViewIsoRightTop },
  left: { label: 'Left', icon: ViewLeft },
  free: { label: 'Free camera', icon: FreePerspective },
  right: { label: 'Right', icon: ViewRight },
  'iso-left-bottom': { label: 'Iso left/bottom', icon: ViewIsoLeftBottom },
  bottom: { label: 'Bottom', icon: ViewBottom },
  'iso-right-bottom': { label: 'Iso right/bottom', icon: ViewIsoRightBottom },
};

export interface CameraToggleProps {
  /** The view the face shows. */
  value: CameraToggleId;
  onChange: (id: CameraToggleId) => void;
  /**
   * Draws the face as an on/off toggle. Electric blue while an editor camera
   * is showing; the game camera is the off state.
   */
  on?: boolean | undefined;
  /** Splits the button: the face fires this and the chevron opens the cube. */
  onAction?: (() => void) | undefined;
  /** Where the cube opens. Defaults to dropping down from the face. */
  placement?: MenuButtonProps['placement'];
}

/**
 * One camera button. The face is the current view. The chevron opens a square:
 * free camera in the middle, orthographic views on the edges, isometric views
 * on the corners, with the game camera and perspective on the row above.
 */
export function CameraToggle(props: CameraToggleProps) {
  const current = () => VIEWS[props.value] ?? VIEWS.game;

  const cell = (id: CameraToggleId, close: () => void) => {
    const view = VIEWS[id];
    return (
      <ToolbarButton
        label={view.label}
        selected={props.value === id}
        onClick={() => {
          props.onChange(id);
          close();
        }}
      >
        <Dynamic component={view.icon} class="zylem-icon" />
      </ToolbarButton>
    );
  };

  return (
    <Show when={current()} keyed>
      {(view) => (
        <MenuButton
          label={view.label}
          selected={props.on === undefined}
          on={props.on}
          onAction={props.onAction}
          placement={props.placement ?? 'bottom-start'}
          menu={(close) => (
            <div class="zylem-menu-button__compass">
              <div class="zylem-menu-button__compass-row">
                <For each={HEADER}>{(id) => cell(id, close)}</For>
              </div>
              <div class="zylem-menu-button__compass-square">
                <For each={SQUARE}>{(id) => cell(id, close)}</For>
              </div>
            </div>
          )}
        >
          <Dynamic component={view.icon} class="zylem-icon" />
        </MenuButton>
      )}
    </Show>
  );
}
