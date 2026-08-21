import { globalStyle } from '@vanilla-extract/css';
import { vars } from '../../theme.css';

/**
 * Searchable, grouped picker list. Sized to sit inside a MenuButton panel, but
 * width and height are capped rather than fixed so it also works as a sidebar
 * or dialog section.
 */

globalStyle('.zylem-picker', {
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.sm,
  width: '260px',
  maxHeight: '340px',
  padding: vars.spacing.sm,
  color: vars.colors.text,
  fontFamily: vars.typography.fontFamily,
});

globalStyle('.zylem-picker__search', {
  flexShrink: 0,
});

globalStyle('.zylem-picker__groups', {
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.md,
  overflowY: 'auto',
});

globalStyle('.zylem-picker__group-title', {
  margin: `0 0 ${vars.spacing.xs}`,
  fontSize: '9px',
  fontWeight: 600,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  opacity: 0.5,
});

globalStyle('.zylem-picker__item', {
  display: 'flex',
  gap: vars.spacing.sm,
  alignItems: 'center',
  width: '100%',
  padding: `${vars.spacing.xs} ${vars.spacing.xs}`,
  fontFamily: 'inherit',
  fontSize: `calc(${vars.typography.fontSize} - 2px)`,
  color: 'inherit',
  textAlign: 'left',
  background: 'transparent',
  border: '1px solid transparent',
  borderRadius: vars.radii.control,
  cursor: 'pointer',
  transition: `background ${vars.motion.fast} ${vars.motion.easeOut}`,
});

globalStyle('.zylem-picker__item:hover:not([disabled])', {
  background: 'rgba(255, 255, 255, 0.08)',
});

globalStyle('.zylem-picker__item:focus-visible', {
  outline: 'none',
  boxShadow: vars.effects.focusRing,
});

globalStyle('.zylem-picker__item[data-selected]', {
  background: 'rgba(120, 180, 255, 0.16)',
  borderColor: 'rgba(120, 180, 255, 0.45)',
});

globalStyle('.zylem-picker__item[disabled]', {
  opacity: 0.45,
  cursor: 'not-allowed',
});

globalStyle('.zylem-picker__item-glyph', {
  display: 'inline-flex',
  flexShrink: 0,
  alignItems: 'center',
  justifyContent: 'center',
  color: 'currentColor',
});

globalStyle('.zylem-picker__item-glyph svg', {
  width: vars.sizes.iconSm,
  height: vars.sizes.iconSm,
});

globalStyle('.zylem-picker__item-label', {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

globalStyle('.zylem-picker__empty', {
  margin: 0,
  padding: `${vars.spacing.sm} ${vars.spacing.xs}`,
  fontSize: `calc(${vars.typography.fontSize} - 3px)`,
  opacity: 0.6,
});
