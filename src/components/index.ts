/**
 * @zylem/ui component library — HyperGlass Solid components.
 *
 * Behavior comes from Kobalte primitives where available; visuals come from
 * vanilla-extract recipes/styles driven by the Zylem token system.
 */

// Layering. Overlays here use it by default; consumers need it only to scope a
// subtree (a modal) or to layer their own chrome on the same ladder.
export {
  LayerProvider,
  LayerScope,
  useLayer,
  resolveLayerRoot,
  ensureLayerContainer,
  createDismissGuard,
  LAYER_PORTAL_CLASS,
  type DismissalEvent,
  type DismissGuard,
  type LayerProviderProps,
  type LayerScopeProps,
  type LayerTier,
  type ResolvedLayer,
} from '../layers';

// Primitives
export { Button, type ButtonProps, type ButtonVariant, type ButtonSize } from './Button/Button';
export { ToolbarButton, type ToolbarButtonProps } from './ToolbarButton/ToolbarButton';
export { TextField, type TextFieldProps } from './TextField/TextField';
export { NumberField, type NumberFieldProps } from './NumberField/NumberField';
export { Select, type SelectProps, type SelectOption } from './Select/Select';
export { Checkbox, type CheckboxProps } from './Checkbox/Checkbox';
export { Switch, type SwitchProps } from './Switch/Switch';
export { Slider, type SliderProps } from './Slider/Slider';
export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  type TabsProps,
} from './Tabs/Tabs';
export {
  Accordion,
  type AccordionProps,
  type AccordionItemConfig,
} from './Accordion/Accordion';
export { Tooltip, type TooltipProps } from './Tooltip/Tooltip';
export {
  DropdownMenu,
  type DropdownMenuProps,
  type DropdownMenuItemConfig,
} from './DropdownMenu/DropdownMenu';
export {
  Dialog,
  ConfirmDialog,
  type DialogProps,
  type ConfirmDialogProps,
} from './Dialog/Dialog';
export { Progress, type ProgressProps } from './Progress/Progress';
export { Badge, type BadgeProps, type BadgeTone } from './Badge/Badge';
export { Separator, type SeparatorProps } from './Separator/Separator';

// Composites
export { WindowControls, type WindowControlsProps } from './WindowControls/WindowControls';
export { TitleBar, type TitleBarProps } from './TitleBar/TitleBar';
export { Panel, type PanelProps } from './Panel/Panel';
export { Toolbar, type ToolbarProps } from './Toolbar/Toolbar';
export {
  PropertyList,
  PropertyRow,
  type PropertyListProps,
  type PropertyRowProps,
} from './Property/Property';
export { Console, type ConsoleProps } from './Console/Console';
export {
  Sidebar,
  SidebarSection,
  SidebarItem,
  sidebarItemClass,
  type SidebarProps,
  type SidebarSectionProps,
  type SidebarItemProps,
} from './Sidebar/Sidebar';
export { Card, type CardProps } from './Card/Card';
export { MenuButton, type MenuButtonProps } from './MenuButton/MenuButton';
export { ItemPicker, type ItemPickerProps } from './ItemPicker/ItemPicker';
export {
  filterItems,
  groupItems,
  UNGROUPED_LABEL,
  type PickerItem,
  type PickerGroup,
} from './ItemPicker/filter-items';
export { SearchInput, type SearchInputProps } from './SearchInput/SearchInput';
export { EmptyState, type EmptyStateProps } from './EmptyState/EmptyState';
export { ScrollArea, type ScrollAreaProps } from './ScrollArea/ScrollArea';
export { Kbd, type KbdProps } from './Kbd/Kbd';
export {
  BuildLabel,
  type BuildLabelProps,
} from './BuildLabel/BuildLabel';
export {
  mountBuildLabel,
  BUILD_LABEL_ID,
  type BuildLabelModel,
} from './BuildLabel/mount-build-label';
export {
  formatBuildLabel,
  resolveBuildVersion,
} from './BuildLabel/resolve-build-version';

// Art / Director (Creator sprite editor, director, toolbox)
export { PixelGrid, type PixelGridProps } from './PixelGrid/PixelGrid';
export {
  SpriteSizePicker,
  type SpriteSizePickerProps,
} from './SpriteSizePicker/SpriteSizePicker';
export {
  snapSize,
  SPRITE_SIZE_PRESETS,
  type SnapOptions,
  type SpriteSize,
} from './SpriteSizePicker/snap-size';
export { ToolGroup, type ToolGroupProps } from './ToolGroup/ToolGroup';
export {
  ToolButton,
  ART_TOOLS,
  ART_TOOL_ICONS,
  ART_TOOL_LABELS,
  type ArtTool,
  type ToolButtonProps,
} from './ToolButton/ToolButton';
export { AddTile, type AddTileProps } from './AddTile/AddTile';
export {
  ColorPalette,
  Swatch,
  TRANSPARENT,
  type ColorPaletteProps,
  type SwatchProps,
} from './ColorPalette/ColorPalette';
export {
  FrameStrip,
  FrameThumb,
  FrameActions,
  type FrameStripProps,
  type FrameThumbProps,
  type FrameActionsProps,
} from './FrameStrip/FrameStrip';
export {
  PlaybackControls,
  type PlaybackControlsProps,
} from './PlaybackControls/PlaybackControls';
export { TimelineTrack, type TimelineTrackProps } from './TimelineTrack/TimelineTrack';
export {
  formatSeconds,
  intervalTicks,
  markerPercent,
} from './TimelineTrack/timeline-math';
export {
  ToolboxButton,
  ToolboxGrid,
  type ToolboxButtonProps,
  type ToolboxGridProps,
  type ToolboxSize,
} from './ToolboxButton/ToolboxButton';
