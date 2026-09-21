import { globalStyle } from '@vanilla-extract/css';
import { vars } from '../../theme.css';

globalStyle('.zylem-menubar', {
  display: 'flex',
  alignItems: 'center',
  gap: '2px',
  minWidth: 0,
});

// Flat chrome (see DESIGN.md): transparent at rest, a tint on hover and a
// stronger tint while the menu is open. No gloss, so the bar's glossy title
// surfaces and primary buttons stay the focal points.
globalStyle('.zylem-menubar-trigger', {
  display: 'inline-flex',
  alignItems: 'center',
  gap: vars.spacing.xs,
  padding: `${vars.spacing.xs} ${vars.spacing.sm}`,
  border: '1px solid transparent',
  borderRadius: vars.radii.button,
  background: 'transparent',
  color: vars.colors.textSecondary,
  fontFamily: vars.typography.fontFamily,
  fontSize: `calc(${vars.typography.fontSize} - 1px)`,
  fontWeight: 600,
  letterSpacing: '0.02em',
  lineHeight: 1.2,
  cursor: 'pointer',
  userSelect: 'none',
  outline: 'none',
  transition: `background ${vars.motion.fast} ${vars.motion.easeOut}, color ${vars.motion.fast} ${vars.motion.easeOut}`,
});

globalStyle('.zylem-menubar-trigger:hover', {
  background: 'rgba(97, 166, 232, 0.12)',
  color: vars.colors.text,
});

globalStyle('.zylem-menubar-trigger[data-expanded]', {
  background: 'rgba(97, 166, 232, 0.22)',
  borderColor: 'rgba(97, 166, 232, 0.35)',
  color: '#F4FAFF',
});

globalStyle('.zylem-menubar-trigger:focus-visible', {
  boxShadow: vars.effects.focusRing,
});

globalStyle('.zylem-menubar-trigger[data-disabled]', {
  opacity: 0.45,
  cursor: 'not-allowed',
});
