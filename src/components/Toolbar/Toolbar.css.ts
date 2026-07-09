import { globalStyle } from '@vanilla-extract/css';
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
  border: '1px solid rgba(97, 166, 232, 0.3)',
  background:
    'linear-gradient(180deg, rgba(130, 180, 230, 0.2), rgba(30, 60, 95, 0.28) 50%, rgba(8, 22, 38, 0.4))',
  boxShadow:
    'inset 0 1px 0 rgba(255,255,255,0.22), inset 0 -1px 0 rgba(0,0,0,0.35)',
});

globalStyle('.zylem-toolbar--vertical', {
  flexDirection: 'column',
});

// Legacy hook: editor uses `.zylem-toolbar.separator` for a bottom rule.
globalStyle('.zylem-toolbar.separator', {
  borderBottom: '1px solid rgba(97, 166, 232, 0.4)',
});
