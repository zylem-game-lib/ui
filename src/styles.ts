/**
 * Side-effect entry that aggregates every vanilla-extract `globalStyle()`
 * registration plus the plain-CSS font sidecar. tsup uses this as one of
 * its entries so the resulting bundle ends up at `dist/styles.css` — the
 * single self-contained file the editor's web component injects into its
 * shadow DOM via `?raw` and that any consumer can import as plain CSS.
 */
import './fonts.css';
import './theme.css';
import './global/logo.css';
import './global/hyperglass-base.css';
import './global/common.css';
import './global/editor-base.css';
import './global/accordion.css';
import './global/menu.css';
import './global/entities.css';
import './global/detached-panel.css';

// Component styles (HyperGlass). Each file registers the global
// `.zylem-*` classes its component renders, so the raw CSS bundle carries
// the full component look without consumers compiling vanilla-extract.
import './components/shared/field.css';
import './components/Button/Button.css';
import './components/ToolbarButton/ToolbarButton.css';
import './components/TextField/TextField.css';
import './components/NumberField/NumberField.css';
import './components/Select/Select.css';
import './components/Checkbox/Checkbox.css';
import './components/Switch/Switch.css';
import './components/Slider/Slider.css';
import './components/Tabs/Tabs.css';
import './components/Tooltip/Tooltip.css';
import './components/DropdownMenu/DropdownMenu.css';
import './components/Dialog/Dialog.css';
import './components/Progress/Progress.css';
import './components/Badge/Badge.css';
import './components/Separator/Separator.css';
import './components/WindowControls/WindowControls.css';
import './components/TitleBar/TitleBar.css';
import './components/Panel/Panel.css';
import './components/Toolbar/Toolbar.css';
import './components/Property/Property.css';
import './components/Console/Console.css';
import './components/Sidebar/Sidebar.css';
import './components/Card/Card.css';
import './components/SearchInput/SearchInput.css';
import './components/EmptyState/EmptyState.css';
import './components/Kbd/Kbd.css';
