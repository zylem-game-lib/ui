import type { Component } from 'solid-js';
import { createZylemIcon, type ZylemIconProps } from './create-icon';
import {
  FreePerspectiveNode,
  GameCameraNode,
  IsometricPerspectiveNode,
  PerspectiveNode,
  SideviewPerspectiveNode,
  TopDownPerspectiveNode,
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
} from './icon-nodes';
export { createZylemIcon, type ZylemIconProps } from './create-icon';

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

export const CAMERA_ICONS = [
  { name: 'perspective', label: 'Perspective', Icon: Perspective },
  { name: 'sideview-perspective', label: 'Side view', Icon: SideviewPerspective },
  { name: 'top-down-perspective', label: 'Top down', Icon: TopDownPerspective },
  { name: 'isometric-perspective', label: 'Isometric', Icon: IsometricPerspective },
  { name: 'free-perspective', label: 'Free / orbit', Icon: FreePerspective },
  { name: 'game-camera', label: 'Game camera', Icon: GameCamera },
] as const;
