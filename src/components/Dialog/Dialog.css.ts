import { globalStyle, keyframes } from '@vanilla-extract/css';
import { vars } from '../../theme.css';

const overlayEnter = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

const contentEnter = keyframes({
  from: { opacity: 0, transform: 'translateY(8px) scale(0.98)' },
  to: { opacity: 1, transform: 'translateY(0) scale(1)' },
});

globalStyle('.zylem-dialog-overlay', {
  position: 'fixed',
  inset: 0,
  zIndex: 10000,
  background: 'rgba(5, 10, 18, 0.6)',
  backdropFilter: 'blur(3px)',
  animation: `${overlayEnter} 0.15s ${vars.motion.easeOut}`,
});

globalStyle('.zylem-dialog-positioner', {
  position: 'fixed',
  inset: 0,
  zIndex: 10001,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: vars.spacing.lg,
});

globalStyle('.zylem-dialog-content', {
  width: '100%',
  maxWidth: '440px',
  borderRadius: vars.radii.window,
  border: '1px solid rgba(146, 205, 255, 0.54)',
  background: vars.material.glassPanelDark,
  boxShadow: vars.effects.shadowPanel,
  backdropFilter: `blur(${vars.effects.blurMd}) saturate(1.22)`,
  overflow: 'hidden',
  animation: `${contentEnter} 0.16s ${vars.motion.easeOut}`,
  '@supports': {
    'not (backdrop-filter: blur(1px))': {
      background: vars.colors.surface,
    },
  },
});

globalStyle('.zylem-dialog-header', {
  minHeight: '40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: vars.spacing.sm,
  padding: `0 ${vars.spacing.md}`,
  background: vars.material.glossyBar,
  borderBottom: '1px solid rgba(5, 18, 32, 0.85)',
  boxShadow:
    'inset 0 1px 0 rgba(255,255,255,0.62), inset 0 -1px 0 rgba(255,255,255,0.08)',
});

globalStyle('.zylem-dialog-title', {
  margin: 0,
  fontSize: '13px',
  fontWeight: 700,
  letterSpacing: '0.02em',
  color: '#F4FAFF',
  fontFamily: vars.typography.fontFamily,
  textShadow: '0 1px 1px rgba(0,0,0,0.65)',
});

globalStyle('.zylem-dialog-body', {
  padding: vars.spacing.lg,
  color: vars.colors.text,
  fontFamily: vars.typography.fontFamily,
  fontSize: vars.typography.fontSize,
  lineHeight: 1.45,
});

globalStyle('.zylem-dialog-footer', {
  display: 'flex',
  justifyContent: 'flex-end',
  gap: vars.spacing.sm,
  padding: `0 ${vars.spacing.lg} ${vars.spacing.lg}`,
});
