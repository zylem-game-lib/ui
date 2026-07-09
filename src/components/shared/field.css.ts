import { globalStyle } from '@vanilla-extract/css';
import { vars } from '../../theme.css';

/**
 * Shared HyperGlass "field" surface — the low-gloss inset glass used by
 * text inputs, number fields, select triggers, and textareas.
 */

globalStyle('.zylem-field', {
  boxSizing: 'border-box',
  minHeight: '28px',
  borderRadius: vars.radii.control,
  border: '1px solid rgba(97, 166, 232, 0.32)',
  background: vars.material.fieldGlass,
  boxShadow: vars.effects.shadowInset,
  color: vars.colors.text,
  fontFamily: vars.typography.fontFamily,
  fontSize: vars.typography.fontSize,
  padding: `0 ${vars.spacing.sm}`,
  outline: 'none',
  transition: `box-shadow ${vars.motion.fast} ${vars.motion.easeOut}, border-color ${vars.motion.fast} ${vars.motion.easeOut}`,
});

globalStyle('.zylem-field:focus, .zylem-field:focus-within', {
  boxShadow: `${vars.effects.shadowInset}, ${vars.effects.focusRing}`,
  borderColor: 'rgba(97, 166, 232, 0.6)',
});

globalStyle('.zylem-field::placeholder', {
  color: vars.colors.textSecondary,
});

globalStyle('.zylem-field[disabled], .zylem-field[data-disabled]', {
  opacity: 0.5,
  cursor: 'not-allowed',
});

globalStyle('.zylem-field-label', {
  display: 'block',
  fontSize: '11px',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: vars.colors.textSecondary,
  fontFamily: vars.typography.fontFamily,
  marginBottom: vars.spacing.xxs,
  userSelect: 'none',
});

globalStyle('.zylem-field-error', {
  fontSize: `calc(${vars.typography.fontSize} - 2px)`,
  color: vars.colors.accent,
  fontFamily: vars.typography.fontFamily,
  marginTop: vars.spacing.xxs,
});

globalStyle('.zylem-field-root', {
  display: 'flex',
  flexDirection: 'column',
  minWidth: 0,
});
