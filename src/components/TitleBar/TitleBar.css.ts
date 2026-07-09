import { globalStyle } from '@vanilla-extract/css';
import { vars } from '../../theme.css';

/**
 * Glossy molded title bar: vertical gradient glass with inner highlight,
 * like a bar of molded glass rather than a flat web header.
 */
globalStyle('.zylem-titlebar', {
  boxSizing: 'border-box',
  minHeight: '42px',
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing.sm,
  padding: `0 ${vars.spacing.md}`,
  background: vars.material.glossyBar,
  borderBottom: '1px solid rgba(5, 18, 32, 0.85)',
  boxShadow:
    'inset 0 1px 0 rgba(255,255,255,0.62), inset 0 -1px 0 rgba(255,255,255,0.08)',
  userSelect: 'none',
});

globalStyle('.zylem-titlebar--compact', {
  minHeight: '32px',
  padding: `0 ${vars.spacing.sm}`,
});

globalStyle('.zylem-titlebar-title', {
  flex: 1,
  fontSize: '13px',
  fontWeight: 700,
  letterSpacing: '0.02em',
  color: '#F4FAFF',
  fontFamily: vars.typography.fontFamily,
  textShadow: '0 1px 1px rgba(0,0,0,0.65)',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

globalStyle('.zylem-titlebar--draggable', {
  cursor: 'grab',
});

globalStyle('.zylem-titlebar--draggable:active', {
  cursor: 'grabbing',
});
