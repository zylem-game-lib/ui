import { globalStyle } from '@vanilla-extract/css';
import { vars } from '../../theme.css';

/**
 * HyperGlass button — owns the `.zylem-button` class (previously defined in
 * global/editor-base.css.ts). Variants are selected via `data-variant` and
 * sizes via `data-size`, so the styles work from the raw CSS bundle without
 * requiring consumers to compile vanilla-extract.
 */

globalStyle('.zylem-button', {
  boxSizing: 'border-box',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: vars.spacing.xs,
  minHeight: '28px',
  padding: `0 ${vars.spacing.md}`,
  cursor: 'pointer',
  userSelect: 'none',
  whiteSpace: 'nowrap',
  borderRadius: vars.radii.button,
  border: '1px solid rgba(150, 210, 255, 0.55)',
  color: '#F4FAFF',
  background: vars.material.buttonGlass,
  boxShadow: vars.effects.shadowButton,
  textShadow: '0 1px 1px rgba(0,0,0,0.72)',
  fontFamily: vars.typography.fontFamily,
  fontSize: vars.typography.fontSize,
  fontWeight: 600,
  transition: `transform ${vars.motion.fast} ${vars.motion.easeOut}, box-shadow ${vars.motion.fast} ${vars.motion.easeOut}, filter ${vars.motion.fast} ${vars.motion.easeOut}, background ${vars.motion.fast} ${vars.motion.easeOut}`,
});

globalStyle('.zylem-button:hover:not([disabled])', {
  background: vars.material.buttonGlassHover,
  boxShadow: `${vars.effects.shadowButton}, ${vars.effects.glowPrimary}`,
  transform: 'translateY(-1px)',
  color: '#F4FAFF',
});

globalStyle('.zylem-button:active:not([disabled])', {
  transform: 'translateY(1px)',
  filter: 'brightness(0.92)',
});

globalStyle('.zylem-button:focus-visible', {
  outline: 'none',
  boxShadow: `${vars.effects.shadowButton}, ${vars.effects.focusRing}`,
});

globalStyle('.zylem-button[disabled], .zylem-button[data-disabled]', {
  opacity: 0.45,
  cursor: 'not-allowed',
});

// Variants

globalStyle('.zylem-button[data-variant="primary"]', {
  borderColor: 'rgba(178, 219, 255, 0.8)',
  background: vars.material.buttonGlassHover,
});

globalStyle('.zylem-button[data-variant="primary"]:hover:not([disabled])', {
  filter: 'brightness(1.08)',
});

globalStyle('.zylem-button[data-variant="active"]', {
  borderColor: 'rgba(20, 255, 60, 0.78)',
  background: vars.material.buttonGlassActive,
  boxShadow: `${vars.effects.shadowButton}, ${vars.effects.glowActive}`,
});

globalStyle('.zylem-button[data-variant="active"]:hover:not([disabled])', {
  background: vars.material.buttonGlassActive,
  boxShadow: `${vars.effects.shadowButton}, ${vars.effects.glowActive}`,
  filter: 'brightness(1.1)',
});

globalStyle('.zylem-button[data-variant="danger"]', {
  borderColor: 'rgba(255, 132, 114, 0.78)',
  background: vars.material.buttonGlassDanger,
  boxShadow: `${vars.effects.shadowButton}, ${vars.effects.glowDanger}`,
});

globalStyle('.zylem-button[data-variant="danger"]:hover:not([disabled])', {
  background: vars.material.buttonGlassDanger,
  boxShadow: `${vars.effects.shadowButton}, ${vars.effects.glowDanger}`,
  filter: 'brightness(1.1)',
});

globalStyle('.zylem-button[data-variant="ghost"]', {
  border: '1px solid rgba(97, 166, 232, 0.35)',
  background: 'transparent',
  boxShadow: 'none',
  color: vars.colors.primary,
  textShadow: 'none',
});

globalStyle('.zylem-button[data-variant="ghost"]:hover:not([disabled])', {
  background: 'rgba(97, 166, 232, 0.12)',
  boxShadow: vars.effects.glowPrimary,
  color: vars.colors.primary,
});

// Sizes

globalStyle('.zylem-button[data-size="sm"]', {
  minHeight: '22px',
  padding: `0 ${vars.spacing.sm}`,
  fontSize: `calc(${vars.typography.fontSize} - 2px)`,
});

globalStyle('.zylem-button[data-size="lg"]', {
  minHeight: '36px',
  padding: `0 ${vars.spacing.lg}`,
  fontSize: `calc(${vars.typography.fontSize} + 1px)`,
});

globalStyle('.zylem-button[data-size="icon"]', {
  minHeight: '28px',
  minWidth: '28px',
  padding: vars.spacing.xs,
  borderRadius: vars.radii.control,
});
