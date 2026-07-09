/**
 * @zylem/ui component library — HyperGlass Solid components.
 *
 * Behavior comes from Kobalte primitives where available; visuals come from
 * vanilla-extract recipes/styles driven by the Zylem token system.
 */

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
export { SearchInput, type SearchInputProps } from './SearchInput/SearchInput';
export { EmptyState, type EmptyStateProps } from './EmptyState/EmptyState';
export { ScrollArea, type ScrollAreaProps } from './ScrollArea/ScrollArea';
export { Kbd, type KbdProps } from './Kbd/Kbd';
