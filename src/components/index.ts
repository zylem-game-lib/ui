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
export { type HeadingLevel } from './shared/Heading';
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
  type TabsTriggerProps,
} from './Tabs/Tabs';
export {
  Accordion,
  type AccordionProps,
  type AccordionItemConfig,
} from './Accordion/Accordion';
export { Tooltip, type TooltipProps } from './Tooltip/Tooltip';
export {
  DropdownMenu,
  MenuItems,
  type DropdownMenuProps,
  type DropdownMenuItemConfig,
} from './DropdownMenu/DropdownMenu';
export { Menubar, type MenubarProps, type MenubarMenuConfig } from './Menubar/Menubar';
export {
  Dialog,
  ConfirmDialog,
  type DialogProps,
  type DialogSize,
  type ConfirmDialogProps,
} from './Dialog/Dialog';
export { Progress, type ProgressProps } from './Progress/Progress';
export { Badge, type BadgeProps, type BadgeTone } from './Badge/Badge';
export { Callout, type CalloutProps, type CalloutTone } from './Callout/Callout';
export { Toast, type ToastProps, type ToastTone } from './Toast/Toast';
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
export {
  ToolbarDropdownMenu,
  type ToolbarDropdownItem,
  type ToolbarDropdownMenuProps,
} from './ToolbarDropdownMenu/ToolbarDropdownMenu';
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
export { AddTile, type AddTileProps, type AddTileVariant } from './AddTile/AddTile';
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

// Timeline / Music (Creator director and music editors)
export {
  TimelineLanes,
  TimelineLane,
  TimelineLaneGroup,
  TimelineClip,
  KeyframeMarker,
  useTimeline,
  type TimelineLanesProps,
  type TimelineLaneProps,
  type TimelineLaneGroupProps,
  type TimelineClipProps,
  type TimelineClipChange,
  type TimelineContextValue,
  type TimelineRange,
  type KeyframeMarkerProps,
  type TimeScale,
  type TimeUnit,
  type RulerTick,
  type ClipBounds,
} from './TimelineLanes/TimelineLanes';
export {
  snapTime,
  resolveClipDrag,
  rulerTicks,
  majorTickTimes,
  formatClock,
  formatBeats,
} from './TimelineLanes/lanes-math';
export { TrackHeader, type TrackHeaderProps } from './TrackHeader/TrackHeader';
export { PianoRoll, type PianoRollProps, type PianoRollNote } from './PianoRoll/PianoRoll';
export {
  pitchName,
  isBlackKey,
  resolveNoteDrag,
  cellStart,
} from './PianoRoll/piano-roll-math';
export { Knob, arcPath, type KnobProps } from './Mixer/Knob';
export { MixerStrip, formatDb, formatPan, type MixerStripProps } from './Mixer/MixerStrip';
export { Waveform, type WaveformProps, type WaveformRegion } from './Waveform/Waveform';
export { computePeaks, peaksFromAudioBuffer, type PeakSource } from './Waveform/peaks';
export {
  TransportBar,
  formatTransportTime,
  type TransportBarProps,
  type TransportTimeSignature,
} from './TransportBar/TransportBar';

// Camera icons (Lucide-shaped originals; also `@zylem/ui/icons`)
export {
  CAMERA_ICONS,
  FreePerspective,
  GameCamera,
  IsometricPerspective,
  Perspective,
  SideviewPerspective,
  TopDownPerspective,
  cameraIconNodes,
  createZylemIcon,
  type CameraIcon,
  type CameraIconName,
  type IconNode,
  type ZylemIconProps,
} from '../icons';
