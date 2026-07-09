import { globalStyle } from '@vanilla-extract/css';
import { vars } from '../../theme.css';

/**
 * Index card: small HyperCard-style tile with a blue glow on hover.
 */
globalStyle('.zylem-card', {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.xs,
  padding: vars.spacing.md,
  borderRadius: vars.radii.card,
  border: '1px solid rgba(97, 166, 232, 0.32)',
  background: vars.material.glassPanelDark,
  boxShadow:
    '0 8px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08)',
  color: vars.colors.text,
  fontFamily: vars.typography.fontFamily,
  transition: `transform ${vars.motion.fast} ${vars.motion.easeOut}, box-shadow ${vars.motion.fast} ${vars.motion.easeOut}, border-color ${vars.motion.fast} ${vars.motion.easeOut}`,
});

globalStyle('.zylem-card--interactive', {
  cursor: 'pointer',
  textAlign: 'left',
});

globalStyle('.zylem-card--interactive:hover', {
  borderColor: 'rgba(150, 210, 255, 0.6)',
  boxShadow: `0 8px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08), ${vars.effects.glowPrimary}`,
  transform: 'translateY(-1px)',
});

globalStyle('.zylem-card--interactive:active', {
  transform: 'translateY(1px)',
});

globalStyle('.zylem-card--interactive:focus-visible', {
  outline: 'none',
  boxShadow: `0 8px 20px rgba(0,0,0,0.3), ${vars.effects.focusRing}`,
});

globalStyle('.zylem-card--selected', {
  borderColor: 'rgba(20, 255, 60, 0.6)',
  boxShadow: `0 8px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08), ${vars.effects.glowActive}`,
});

globalStyle('.zylem-card-title', {
  fontSize: vars.typography.fontSize,
  fontWeight: 700,
  color: '#F4FAFF',
  textShadow: '0 1px 1px rgba(0,0,0,0.55)',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

globalStyle('.zylem-card-description', {
  fontSize: `calc(${vars.typography.fontSize} - 2px)`,
  color: vars.colors.textSecondary,
  lineHeight: 1.4,
});
