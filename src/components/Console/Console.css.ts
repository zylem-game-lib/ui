import { globalStyle } from '@vanilla-extract/css';
import { vars } from '../../theme.css';

globalStyle('.zylem-console-container', {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  minHeight: 0,
  height: '100%',
  width: '100%',
  boxSizing: 'border-box',
  padding: vars.spacing.sm,
});

globalStyle('.zylem-console-wrapper', {
  position: 'relative',
  display: 'flex',
  flex: 1,
  minHeight: 0,
});

/** Dark low-gloss terminal field — owns the `.zylem-console` class. */
globalStyle('.zylem-console', {
  flex: 1,
  minHeight: '96px',
  width: '100%',
  height: '100%',
  boxSizing: 'border-box',
  margin: 0,
  padding: vars.spacing.sm,
  resize: 'none',
  overflowY: 'auto',
  borderRadius: vars.radii.control,
  border: '1px solid rgba(97, 166, 232, 0.28)',
  background: 'rgba(4, 12, 20, 0.72)',
  boxShadow: vars.effects.shadowInset,
  color: vars.colors.consoleText,
  fontFamily: "'Courier New', monospace",
  fontSize: `calc(${vars.typography.fontSize} - 1px)`,
  lineHeight: 1.45,
  outline: 'none',
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
});

globalStyle('.zylem-console:focus-visible', {
  boxShadow: `${vars.effects.shadowInset}, ${vars.effects.focusRing}`,
});

globalStyle('.zylem-console-actions', {
  position: 'absolute',
  top: vars.spacing.xs,
  right: vars.spacing.sm,
  display: 'flex',
  gap: vars.spacing.xs,
  zIndex: 1,
});

// Legacy hook used by the editor's clear button.
globalStyle('.zylem-console-clear', {
  position: 'absolute',
  top: vars.spacing.sm,
  right: vars.spacing.sm,
  zIndex: 1,
});
