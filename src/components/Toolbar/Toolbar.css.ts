import { assignVars, globalStyle } from '@vanilla-extract/css';
import { toolbarModes } from '../../theme/toolbar';
import { vars } from '../../theme.css';

/**
 * Molded command strip: a glossy horizontal rail that toolbar buttons sit in.
 * Owns the `.zylem-toolbar` class used by the editor.
 */
globalStyle('.zylem-toolbar', {
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing.sm,
  padding: vars.spacing.sm,
  borderRadius: vars.radii.control,
  border: `1px solid ${vars.toolbar.border}`,
  background: vars.toolbar.rail,
  boxShadow:
    'inset 0 1px 0 rgba(255,255,255,0.22), inset 0 -1px 0 rgba(0,0,0,0.35)',
});

globalStyle('.zylem-toolbar--vertical', {
  flexDirection: 'column',
});

// Legacy hook: editor uses `.zylem-toolbar.separator` for a bottom rule.
globalStyle('.zylem-toolbar.separator', {
  borderBottom: `1px solid ${vars.toolbar.separator}`,
});

// Modes reassign the chrome variables on this strip. Primary repeats the
// defaults so a labeled Stage Editor matches an unscoped toolbar. Recipes
// reference shade variables, so overriding a shade retints that mode.
for (const [mode, chrome] of Object.entries(toolbarModes)) {
  globalStyle(`.zylem-toolbar[data-mode="${mode}"]`, {
    vars: assignVars(vars.toolbar, chrome),
  });
}
