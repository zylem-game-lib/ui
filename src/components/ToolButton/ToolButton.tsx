import Circle from 'lucide-solid/icons/circle';
import Eraser from 'lucide-solid/icons/eraser';
import Hand from 'lucide-solid/icons/hand';
import PaintBucket from 'lucide-solid/icons/paint-bucket';
import Pencil from 'lucide-solid/icons/pencil';
import Pipette from 'lucide-solid/icons/pipette';
import Square from 'lucide-solid/icons/square';
import SquareDashed from 'lucide-solid/icons/square-dashed';
import { type Component, type JSX } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { ToolbarButton } from '../ToolbarButton/ToolbarButton';

/** Pixel-editor tools with a built-in icon and label. */
export type ArtTool =
  | 'pencil'
  | 'fill'
  | 'eraser'
  | 'rectangle'
  | 'ellipse'
  | 'select'
  | 'eyedropper'
  | 'move';

type IconComponent = Component<JSX.SvgSVGAttributes<SVGSVGElement>>;

export const ART_TOOL_ICONS: Record<ArtTool, IconComponent> = {
  pencil: Pencil,
  fill: PaintBucket,
  eraser: Eraser,
  rectangle: Square,
  ellipse: Circle,
  select: SquareDashed,
  eyedropper: Pipette,
  move: Hand,
};

export const ART_TOOL_LABELS: Record<ArtTool, string> = {
  pencil: 'Pencil',
  fill: 'Fill',
  eraser: 'Eraser',
  rectangle: 'Rectangle',
  ellipse: 'Ellipse',
  select: 'Select',
  eyedropper: 'Eyedropper',
  move: 'Move',
};

/** Every tool in the order the editor's strip shows them. */
export const ART_TOOLS: readonly ArtTool[] = [
  'pencil',
  'fill',
  'eraser',
  'rectangle',
  'ellipse',
  'select',
  'eyedropper',
  'move',
];

export interface ToolButtonProps {
  tool: ArtTool;
  /** Tooltip / accessible name; defaults to the tool's label. */
  label?: string;
  /** Keyboard shortcut shown after the label in the tooltip, e.g. `B`. */
  shortcut?: string;
  selected?: boolean;
  disabled?: boolean;
  onClick?: (event: MouseEvent) => void;
  class?: string;
}

/**
 * Toolbar button preset for one pixel-editor tool: same glass jewel as
 * `ToolbarButton`, with the tool's lucide icon and label filled in.
 */
export function ToolButton(props: ToolButtonProps) {
  const label = () => {
    const base = props.label ?? ART_TOOL_LABELS[props.tool];
    return props.shortcut ? `${base} (${props.shortcut})` : base;
  };
  return (
    <ToolbarButton
      label={label()}
      pressed={props.selected ?? false}
      disabled={props.disabled}
      onClick={props.onClick}
      class={props.class ? `zylem-tool-btn ${props.class}` : 'zylem-tool-btn'}
    >
      <Dynamic component={ART_TOOL_ICONS[props.tool]} class="zylem-icon" data-tool={props.tool} />
    </ToolbarButton>
  );
}
