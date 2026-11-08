import type { Component } from 'solid-js';
import { createZylemIcon, type ZylemIconProps } from './create-icon';
import {
  DockNode,
  FreePerspectiveNode,
  GameCameraNode,
  IsometricPerspectiveNode,
  PerspectiveNode,
  SideviewPerspectiveNode,
  TopDownPerspectiveNode,
  ViewBottomNode,
  ViewIsoLeftBottomNode,
  ViewIsoLeftTopNode,
  ViewIsoRightBottomNode,
  ViewIsoRightTopNode,
  ViewLeftNode,
  ViewRightNode,
  ViewTopNode,
} from './icon-nodes';

export type { IconNode, CameraIconName } from './icon-nodes';
export {
  cameraIconNodes,
  FreePerspectiveNode,
  GameCameraNode,
  IsometricPerspectiveNode,
  PerspectiveNode,
  SideviewPerspectiveNode,
  TopDownPerspectiveNode,
  ViewBottomNode,
  ViewIsoLeftBottomNode,
  ViewIsoLeftTopNode,
  ViewIsoRightBottomNode,
  ViewIsoRightTopNode,
  ViewLeftNode,
  ViewRightNode,
  ViewTopNode,
} from './icon-nodes';
export { createZylemIcon, type ZylemIconOptions, type ZylemIconProps } from './create-icon';

export type CameraIcon = Component<ZylemIconProps>;

/** Recorder with diverging FOV rays. */
export const Perspective = createZylemIcon('Perspective', PerspectiveNode);
/** Recorder facing a vertical view plane (side / ortho). */
export const SideviewPerspective = createZylemIcon(
  'SideviewPerspective',
  SideviewPerspectiveNode,
);
/** Downward recorder facing a horizontal plane (top-down). */
export const TopDownPerspective = createZylemIcon(
  'TopDownPerspective',
  TopDownPerspectiveNode,
);
/** Isometric camera body with lens (from camera-isometric.svg). */
export const IsometricPerspective = createZylemIcon(
  'IsometricPerspective',
  IsometricPerspectiveNode,
);/** Recorder with two orbit arrows (free / orbit camera). */
export const FreePerspective = createZylemIcon('FreePerspective', FreePerspectiveNode);
/** Recorder with controller buttons (game camera). */
export const GameCamera = createZylemIcon('GameCamera', GameCameraNode);

/** Side camera on the left, looking right. */
export const ViewLeft = createZylemIcon('ViewLeft', ViewLeftNode);
/** Side camera on the right, looking left. */
export const ViewRight = createZylemIcon('ViewRight', ViewRightNode);
/** Camera above the subject, looking down. */
export const ViewTop = createZylemIcon('ViewTop', ViewTopNode);
/** Camera below the subject, looking up. */
export const ViewBottom = createZylemIcon('ViewBottom', ViewBottomNode);
/** Camera at the upper left, the iso left/top angle. */
export const ViewIsoLeftTop = createZylemIcon('ViewIsoLeftTop', ViewIsoLeftTopNode);
/** Camera at the upper right, the iso right/top angle. */
export const ViewIsoRightTop = createZylemIcon('ViewIsoRightTop', ViewIsoRightTopNode);
/** Camera at the lower right, the iso right/bottom angle. */
export const ViewIsoRightBottom = createZylemIcon('ViewIsoRightBottom', ViewIsoRightBottomNode);
/** Camera at the lower left, the iso left/bottom angle. */
export const ViewIsoLeftBottom = createZylemIcon('ViewIsoLeftBottom', ViewIsoLeftBottomNode);

/** Filled window frame. Skips the 18px toolbar metric so `size` matches a chevron. */
export const Dock = createZylemIcon('Dock', DockNode, {
  className: 'zylem-dock',
  filled: true,
  viewBox: '0 0 16 16',
});

export const CAMERA_ICONS = [
  { name: 'perspective', label: 'Perspective', Icon: Perspective },
  { name: 'sideview-perspective', label: 'Side view', Icon: SideviewPerspective },
  { name: 'top-down-perspective', label: 'Top down', Icon: TopDownPerspective },
  { name: 'isometric-perspective', label: 'Isometric', Icon: IsometricPerspective },
  { name: 'free-perspective', label: 'Free / orbit', Icon: FreePerspective },
  { name: 'game-camera', label: 'Game camera', Icon: GameCamera },
] as const;

/**
 * The eight angles around the view cube, clockwise from the top-left corner.
 * Free, game, and perspective already live on `CAMERA_ICONS`.
 */
export const CAMERA_VIEWS = [
  { name: 'view-iso-left-top', label: 'Iso left/top', Icon: ViewIsoLeftTop },
  { name: 'view-top', label: 'Top', Icon: ViewTop },
  { name: 'view-iso-right-top', label: 'Iso right/top', Icon: ViewIsoRightTop },
  { name: 'view-right', label: 'Right', Icon: ViewRight },
  { name: 'view-iso-right-bottom', label: 'Iso right/bottom', Icon: ViewIsoRightBottom },
  { name: 'view-bottom', label: 'Bottom', Icon: ViewBottom },
  { name: 'view-iso-left-bottom', label: 'Iso left/bottom', Icon: ViewIsoLeftBottom },
  { name: 'view-left', label: 'Left', Icon: ViewLeft },
] as const;
